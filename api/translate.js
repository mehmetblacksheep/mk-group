const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wsfzybmrvuizmrjkvkpq.supabase.co'
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd'

const TARGET_LANGUAGES = {
  en: 'English',
  de: 'German',
  ru: 'Russian',
  ar: 'Arabic',
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload)

  if (typeof res.status === 'function') {
    return res.status(status).json(payload)
  }

  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  return res.end(body)
}

async function readJsonBody(req) {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  }

  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization || ''
  const match = authHeader.match(/^Bearer\s+(.+)$/i)
  return match ? match[1] : ''
}

async function assertAdminUser(token) {
  if (!token) {
    const error = new Error('Admin oturumu bulunamadi.')
    error.status = 401
    throw error
  }

  const authHeaders = {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${token}`,
  }

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: authHeaders,
  })

  if (!userResponse.ok) {
    const error = new Error('Admin oturumu dogrulanamadi.')
    error.status = 401
    throw error
  }

  const user = await userResponse.json()
  const profileUrl =
    `${SUPABASE_URL}/rest/v1/profiles?select=role,is_active&id=eq.${encodeURIComponent(user.id)}&limit=1`

  const profileResponse = await fetch(profileUrl, {
    headers: authHeaders,
  })

  if (!profileResponse.ok) {
    const error = new Error('Admin profili okunamadi.')
    error.status = 403
    throw error
  }

  const profiles = await profileResponse.json()
  const profile = profiles[0]

  if (!profile?.is_active || !['admin', 'staff'].includes(profile.role)) {
    const error = new Error('Bu islem icin admin yetkisi gerekiyor.')
    error.status = 403
    throw error
  }
}

function normalizeFields(fields = {}) {
  return {
    title: String(fields.title || '').trim(),
    short: String(fields.short || '').trim(),
    desc: String(fields.desc || '').trim(),
  }
}

function buildResponseSchema(targets) {
  const translationSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
      title: { type: 'string' },
      short: { type: 'string' },
      desc: { type: 'string' },
    },
    required: ['title', 'short', 'desc'],
  }

  const properties = {}
  for (const lang of targets) {
    properties[lang] = translationSchema
  }

  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      translations: {
        type: 'object',
        additionalProperties: false,
        properties,
        required: targets,
      },
    },
    required: ['translations'],
  }
}

function extractOutputText(responseData) {
  if (responseData.output_text) return responseData.output_text

  for (const item of responseData.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) {
        return content.text
      }
    }
  }

  return ''
}

async function translateFields(fields, targets) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY Vercel ortam degiskeni eksik.')
    error.status = 500
    throw error
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_TRANSLATION_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text:
                'You translate Turkish tourism and local services content. Keep brand names, prices, times, ' +
                'place names, product names, and line breaks intact. If an input field is empty, return an empty string. ' +
                'Use natural, concise wording for tourists. Return only the requested JSON.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: JSON.stringify({
                sourceLanguage: 'Turkish',
                targetLanguages: targets.map((lang) => ({
                  code: lang,
                  name: TARGET_LANGUAGES[lang],
                })),
                fields,
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'mk_group_translations',
          strict: true,
          schema: buildResponseSchema(targets),
        },
      },
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data.error?.message || 'OpenAI ceviri istegi basarisiz oldu.'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  const outputText = extractOutputText(data)
  if (!outputText) {
    const error = new Error('Ceviri sonucu bos dondu.')
    error.status = 502
    throw error
  }

  return JSON.parse(outputText)
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true })
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Sadece POST desteklenir.' })
  }

  try {
    await assertAdminUser(getBearerToken(req))

    const body = await readJsonBody(req)
    const fields = normalizeFields(body.fields)
    const targets = Array.isArray(body.targets)
      ? body.targets.filter((lang) => TARGET_LANGUAGES[lang])
      : Object.keys(TARGET_LANGUAGES)

    const totalLength = fields.title.length + fields.short.length + fields.desc.length
    if (!totalLength) {
      return sendJson(res, 400, { error: 'Cevrilecek Turkce icerik bulunamadi.' })
    }

    if (totalLength > 8000) {
      return sendJson(res, 400, { error: 'Cevrilecek metin cok uzun. Lutfen kisaltip tekrar deneyin.' })
    }

    const result = await translateFields(fields, targets)
    return sendJson(res, 200, result)
  } catch (err) {
    console.error('Translate API error:', err)
    return sendJson(res, err.status || 500, {
      error: err.message || 'Ceviri sirasinda hata olustu.',
    })
  }
}
