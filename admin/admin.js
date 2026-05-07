const STORAGE_BUCKET = 'item-images'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://wsfzybmrvuizmrjkvkpq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const SESSION_KEY = 'mk_tur_tourism_admin_session'
const fallbackImage = '../assets/logo.png'
const DEFAULT_BRAND_NAME = 'MK Group'
const LANGUAGES = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ru', label: 'RU' },
  { code: 'ar', label: 'AR' },
]

const localizedMetaUnits = {
  en: {
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    day: ['day', 'days'],
    person: ['person', 'people'],
  },
  de: {
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    day: ['Tag', 'Tage'],
    person: ['Person', 'Personen'],
  },
  ru: {
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
    day: ['день', 'дня', 'дней'],
    person: ['человек', 'человека', 'человек'],
  },
  ar: {
    hour: ['ساعة', 'ساعات'],
    minute: ['دقيقة', 'دقائق'],
    day: ['يوم', 'أيام'],
    person: ['شخص', 'أشخاص'],
  },
}

const localizedMetaPhrases = {
  en: [
    [/gidiş\s*dönüş/giu, 'round trip'],
    [/gidis\s*donus/giu, 'round trip'],
    [/tek\s*yön/giu, 'one way'],
    [/tek\s*yon/giu, 'one way'],
    [/yarım\s*gün/giu, 'half day'],
    [/yarim\s*gun/giu, 'half day'],
    [/tam\s*gün/giu, 'full day'],
    [/tam\s*gun/giu, 'full day'],
    [/özel/giu, 'private'],
    [/ozel/giu, 'private'],
  ],
  de: [
    [/gidiş\s*dönüş/giu, 'Hin- und Rückfahrt'],
    [/gidis\s*donus/giu, 'Hin- und Rückfahrt'],
    [/tek\s*yön/giu, 'einfache Fahrt'],
    [/tek\s*yon/giu, 'einfache Fahrt'],
    [/yarım\s*gün/giu, 'halber Tag'],
    [/yarim\s*gun/giu, 'halber Tag'],
    [/tam\s*gün/giu, 'ganzer Tag'],
    [/tam\s*gun/giu, 'ganzer Tag'],
    [/özel/giu, 'privat'],
    [/ozel/giu, 'privat'],
  ],
  ru: [
    [/gidiş\s*dönüş/giu, 'туда и обратно'],
    [/gidis\s*donus/giu, 'туда и обратно'],
    [/tek\s*yön/giu, 'в одну сторону'],
    [/tek\s*yon/giu, 'в одну сторону'],
    [/yarım\s*gün/giu, 'полдня'],
    [/yarim\s*gun/giu, 'полдня'],
    [/tam\s*gün/giu, 'полный день'],
    [/tam\s*gun/giu, 'полный день'],
    [/özel/giu, 'частный'],
    [/ozel/giu, 'частный'],
  ],
  ar: [
    [/gidiş\s*dönüş/giu, 'ذهاب وعودة'],
    [/gidis\s*donus/giu, 'ذهاب وعودة'],
    [/tek\s*yön/giu, 'اتجاه واحد'],
    [/tek\s*yon/giu, 'اتجاه واحد'],
    [/yarım\s*gün/giu, 'نصف يوم'],
    [/yarim\s*gun/giu, 'نصف يوم'],
    [/tam\s*gün/giu, 'يوم كامل'],
    [/tam\s*gun/giu, 'يوم كامل'],
    [/özel/giu, 'خاص'],
    [/ozel/giu, 'خاص'],
  ],
}

const loginCard = document.getElementById('loginCard')
const dashboard = document.getElementById('dashboard')
const loginBtn = document.getElementById('loginBtn')
const loginUsername = document.getElementById('loginUsername')
const loginPassword = document.getElementById('loginPassword')
const loginError = document.getElementById('loginError')
const logoutBtn = document.getElementById('logoutBtn')
const contentTableBody = document.getElementById('contentTableBody')
const tabBtns = document.querySelectorAll('.tab-btn')
const navBtns = document.querySelectorAll('.nav-btn')
const contentView = document.getElementById('contentView')
const settingsView = document.getElementById('settingsView')
const panelTitle = document.getElementById('panelTitle')
const openNewItem = document.getElementById('openNewItem')
const editorModal = document.getElementById('editorModal')
const editorTitle = document.getElementById('editorTitle')
const closeEditor = document.getElementById('closeEditor')
const cancelEditor = document.getElementById('cancelEditor')
const saveItemBtn = document.getElementById('saveItem')
const deleteItemBtn = document.getElementById('deleteItem')
const previewItemBtn = document.getElementById('previewItem')
const saveSettingsBtn = document.getElementById('saveSettings')
const whatsappNumberInput = document.getElementById('whatsappNumber')
const brandNameInput = document.getElementById('brandName')
const imageInput = document.getElementById('itemImages')
const editorLang = document.getElementById('editorLang')
const translateFromTurkishBtn = document.getElementById('translateFromTurkish')
const translateStatus = document.getElementById('translateStatus')
const imagePreviewGrid = document.getElementById('imagePreviewGrid')
const uploadError = document.getElementById('uploadError')
const previewModal = document.getElementById('previewModal')
const closePreview = document.getElementById('closePreview')
const previewImage = document.getElementById('previewImage')
const previewTitle = document.getElementById('previewTitle')
const previewDescription = document.getElementById('previewDescription')
const previewMeta = document.getElementById('previewMeta')
const previewPrice = document.getElementById('previewPrice')

const formFields = {
  category: document.getElementById('itemCategory'),
  order: document.getElementById('itemOrder'),
  title: document.getElementById('itemTitle'),
  short: document.getElementById('itemShort'),
  desc: document.getElementById('itemDesc'),
  price: document.getElementById('itemPrice'),
  duration: document.getElementById('itemDuration'),
  active: document.getElementById('itemActive'),
}

const state = {
  filter: 'all',
  editingId: null,
  gallery: [fallbackImage],
  settingsId: null,
  editorLang: 'tr',
  translations: null,
  isSavingItem: false,
}

function categoryLabel(category) {
  return ({ tour: 'Tur', transfer: 'Transfer & Rent-a-car', market: 'Market&Food' })[category] || category
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getPluralIndex(amount, lang) {
  const number = Number(String(amount).replace(',', '.'))

  if (lang === 'ru') {
    const integer = Math.abs(Math.trunc(number))
    const lastDigit = integer % 10
    const lastTwoDigits = integer % 100

    if (lastDigit === 1 && lastTwoDigits !== 11) return 0
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return 1
    return 2
  }

  return number === 1 ? 0 : 1
}

function getLocalizedUnit(unit, amount, lang) {
  const labels = localizedMetaUnits[lang]?.[unit]
  if (!labels) return ''

  return labels[Math.min(getPluralIndex(amount, lang), labels.length - 1)]
}

function localizeMetaText(value = '', lang = state.editorLang) {
  if (!value || lang === 'tr') return value

  let text = String(value)

  for (const [pattern, replacement] of localizedMetaPhrases[lang] || []) {
    text = text.replace(pattern, replacement)
  }

  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(saat|sa)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('hour', amount, lang)}`
  )
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(dakika|dk)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('minute', amount, lang)}`
  )
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(gün|gun)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('day', amount, lang)}`
  )
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(kişi|kisi)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('person', amount, lang)}`
  )

  return text
}

function hasTranslationContent(content = {}) {
  return Boolean(content.title?.trim() || content.short?.trim() || content.desc?.trim())
}

function languageContentFromItem(item, lang) {
  return {
    title: item[`title_${lang}`] || '',
    short: item[`short_desc_${lang}`] || '',
    desc: item[`detail_desc_${lang}`] || '',
  }
}

function missingLanguageLabels(translations = {}) {
  return LANGUAGES
    .filter(({ code }) => code !== 'tr' && !hasTranslationContent(translations[code]))
    .map(({ label }) => label)
}

function renderLanguageBadges(item) {
  return `
    <div class="language-badges" aria-label="Dil doluluk durumu">
      ${LANGUAGES.map(({ code, label }) => {
        const complete = hasTranslationContent(languageContentFromItem(item, code))
        return `<span class="language-badge ${complete ? 'complete' : 'missing'}">${label}</span>`
      }).join('')}
    </div>
  `
}

function mapDbItem(row) {
  const images = Array.isArray(row.images) && row.images.length ? row.images : [fallbackImage]

  return {
    id: row.id,
    category: row.category,
    order: row.sort_order ?? 1,

    title: row.title_tr || '',
    short: row.short_desc_tr || '',
    desc: row.detail_desc_tr || '',

    title_tr: row.title_tr || '',
    title_en: row.title_en || '',
    title_de: row.title_de || '',
    title_ru: row.title_ru || '',
    title_ar: row.title_ar || '',

    short_desc_tr: row.short_desc_tr || '',
    short_desc_en: row.short_desc_en || '',
    short_desc_de: row.short_desc_de || '',
    short_desc_ru: row.short_desc_ru || '',
    short_desc_ar: row.short_desc_ar || '',

    detail_desc_tr: row.detail_desc_tr || '',
    detail_desc_en: row.detail_desc_en || '',
    detail_desc_de: row.detail_desc_de || '',
    detail_desc_ru: row.detail_desc_ru || '',
    detail_desc_ar: row.detail_desc_ar || '',

    price: row.price || '',
    duration: row.duration || '',
    image: images[0] || fallbackImage,
    gallery: images,
    active: row.is_active ?? true,
  }
}
function emptyTranslations() {
  return {
    tr: { title: '', short: '', desc: '' },
    en: { title: '', short: '', desc: '' },
    de: { title: '', short: '', desc: '' },
    ru: { title: '', short: '', desc: '' },
    ar: { title: '', short: '', desc: '' },
  }
}

function buildTranslationsFromItem(item = null) {
  const base = emptyTranslations()

  if (!item) return base

  base.tr.title = item.title_tr || item.title || ''
  base.en.title = item.title_en || ''
  base.de.title = item.title_de || ''
  base.ru.title = item.title_ru || ''
  base.ar.title = item.title_ar || ''

  base.tr.short = item.short_desc_tr || item.short || ''
  base.en.short = item.short_desc_en || ''
  base.de.short = item.short_desc_de || ''
  base.ru.short = item.short_desc_ru || ''
  base.ar.short = item.short_desc_ar || ''

  base.tr.desc = item.detail_desc_tr || item.desc || ''
  base.en.desc = item.detail_desc_en || ''
  base.de.desc = item.detail_desc_de || ''
  base.ru.desc = item.detail_desc_ru || ''
  base.ar.desc = item.detail_desc_ar || ''

  return base
}

function syncCurrentLanguageInputsToState() {
  if (!state.translations) return
  const lang = state.editorLang || 'tr'

  state.translations[lang] = {
    title: formFields.title.value.trim(),
    short: formFields.short.value.trim(),
    desc: formFields.desc.value.trim(),
  }
}

function fillInputsFromLanguage(lang) {
  const content = state.translations?.[lang] || { title: '', short: '', desc: '' }

  formFields.title.value = content.title || ''
  formFields.short.value = content.short || ''
  formFields.desc.value = content.desc || ''
}

function setTranslateStatus(message = '', type = 'info') {
  if (!translateStatus) return

  translateStatus.textContent = message
  translateStatus.dataset.type = type
  translateStatus.classList.toggle('hidden', !message)
}

function setItemSaving(isSaving) {
  state.isSavingItem = isSaving
  saveItemBtn.disabled = isSaving
  cancelEditor.disabled = isSaving
  closeEditor.disabled = isSaving
  if (previewItemBtn) previewItemBtn.disabled = isSaving
  if (translateFromTurkishBtn) translateFromTurkishBtn.disabled = isSaving
  saveItemBtn.textContent = isSaving ? 'Kaydediliyor...' : 'Kaydet'
}

function getFriendlyTranslateError(message = '') {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('quota') || lowerMessage.includes('billing')) {
    return 'Otomatik ceviri icin OpenAI API kredisi veya odeme yontemi gerekiyor. Simdilik dilleri manuel doldurabilirsin.'
  }

  if (lowerMessage.includes('openai_api_key')) {
    return 'Otomatik ceviri icin Vercel OPENAI_API_KEY ayari eksik.'
  }

  return message || 'Ceviri sirasinda hata olustu.'
}

async function translateFromTurkish() {
  syncCurrentLanguageInputsToState()

  const source = state.translations?.tr || { title: '', short: '', desc: '' }
  const hasSourceText = Boolean(source.title || source.short || source.desc)

  if (!hasSourceText) {
    alert('Once Turkce baslik veya aciklama gir.')
    return
  }

  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token

  if (!token) {
    alert('Ceviri icin admin oturumu gerekiyor.')
    return
  }

  if (translateFromTurkishBtn) translateFromTurkishBtn.disabled = true
  setTranslateStatus('Cevriliyor...', 'info')

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: source,
        targets: ['en', 'de', 'ru', 'ar'],
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.error || 'Ceviri tamamlanamadi.')
    }

    for (const lang of ['en', 'de', 'ru', 'ar']) {
      if (result.translations?.[lang]) {
        state.translations[lang] = {
          title: result.translations[lang].title || '',
          short: result.translations[lang].short || '',
          desc: result.translations[lang].desc || '',
        }
      }
    }

    fillInputsFromLanguage(state.editorLang)
    setTranslateStatus('Ceviri hazir. Dilleri kontrol edip kaydedebilirsin.', 'success')
  } catch (err) {
    console.error('Ceviri hatasi:', err)
    const friendlyMessage = getFriendlyTranslateError(err.message)
    setTranslateStatus(friendlyMessage, 'error')
    alert(friendlyMessage)
  } finally {
    if (translateFromTurkishBtn) translateFromTurkishBtn.disabled = false
  }
}
async function getContent() {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('İçerikler çekilemedi:', error)
    return []
  }

  return (data || []).map(mapDbItem)
}

async function getSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Ayarlar çekilemedi:', error)
    return { id: null, whatsapp_number: '', brand_name: DEFAULT_BRAND_NAME }
  }

  return data || { id: null, whatsapp_number: '', brand_name: DEFAULT_BRAND_NAME }
}

async function renderTable() {
  const content = await getContent()
  const filtered = content
    .filter(item => state.filter === 'all' ? true : item.category === state.filter)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

  contentTableBody.innerHTML = filtered.map(item => `
    <tr>
      <td>${item.order}</td>
      <td>${categoryLabel(item.category)}</td>
      <td>
        <div class="table-title-cell">
          <img src="${escapeHtml((item.gallery && item.gallery[0]) || item.image || fallbackImage)}" alt="${escapeHtml(item.title)}" class="table-thumb" />
          <div>
            <strong>${escapeHtml(item.title)}</strong><br>
            <span class="muted small">${escapeHtml(item.short || '')}</span>
            ${renderLanguageBadges(item)}
          </div>
        </div>
      </td>
      <td>${escapeHtml(item.price || '-')}</td>
      <td><span class="status-pill ${item.active ? 'active' : 'passive'}">${item.active ? 'Aktif' : 'Pasif'}</span></td>
      <td>
        <div class="row-actions">
          <button class="mini-btn" data-action="toggle-active" data-id="${item.id}">${item.active ? 'Pasife al' : 'Aktif yap'}</button>
          <button class="mini-btn" data-action="edit" data-id="${item.id}">Düzenle</button>
          <button class="mini-btn" data-action="up" data-id="${item.id}">↑</button>
          <button class="mini-btn" data-action="down" data-id="${item.id}">↓</button>
        </div>
      </td>
    </tr>
  `).join('')

  contentTableBody.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      void handleRowAction(btn.dataset.action, btn.dataset.id)
    })
  })
}

async function handleRowAction(action, id) {
  const content = await getContent()
  const current = content.find(item => item.id === id)
  if (!current) return

  if (action === 'edit') {
    await openEditor(current)
    return
  }

  if (action === 'toggle-active') {
    await toggleItemActive(current)
    await renderTable()
    return
  }

  const sameCategory = content
    .filter(item => item.category === current.category)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

  const currentIndex = sameCategory.findIndex(item => item.id === id)
  if (currentIndex === -1) return

  if (action === 'up' && currentIndex > 0) {
    const target = sameCategory[currentIndex - 1]
    await swapItemOrders(current, target)
  }

  if (action === 'down' && currentIndex < sameCategory.length - 1) {
    const target = sameCategory[currentIndex + 1]
    await swapItemOrders(current, target)
  }

  await renderTable()
}

async function toggleItemActive(item) {
  const { error } = await supabase
    .from('items')
    .update({ is_active: !item.active })
    .eq('id', item.id)

  if (error) {
    console.error('Durum guncellenemedi:', error)
    alert(`Durum guncellenemedi: ${error.message}`)
  }
}

async function swapItemOrders(a, b) {
  const updates = [
    supabase.from('items').update({ sort_order: b.order }).eq('id', a.id),
    supabase.from('items').update({ sort_order: a.order }).eq('id', b.id),
  ]

  const [r1, r2] = await Promise.all(updates)
  if (r1.error) console.error('Sıra güncellenemedi:', r1.error)
  if (r2.error) console.error('Sıra güncellenemedi:', r2.error)
}

async function getNextOrder(category = null) {
  const content = await getContent()
  const filtered = content.filter(item => !category || item.category === category)
  return filtered.length ? Math.max(...filtered.map(item => item.order)) + 1 : 1
}

function resetUploadError() {
  uploadError.textContent = ''
  uploadError.classList.add('hidden')
}

function showUploadError(message) {
  uploadError.textContent = message
  uploadError.classList.remove('hidden')
}

function renderPreview() {
  imagePreviewGrid.innerHTML = state.gallery.map((src, index) => `
    <div class="preview-card ${index === 0 ? 'primary' : ''}">
      <img src="${src}" alt="Görsel ${index + 1}" class="preview-image" />
      <div class="preview-meta">${index === 0 ? 'Ana görsel' : `Ek görsel ${index}`}</div>
      <button class="remove-preview" data-index="${index}" ${state.gallery.length === 1 ? 'disabled' : ''}>Sil</button>
    </div>
  `).join('')

  imagePreviewGrid.querySelectorAll('.remove-preview').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index)
      state.gallery.splice(index, 1)
      if (state.gallery.length === 0) state.gallery = [fallbackImage]
      renderPreview()
    })
  })
}

async function uploadSingleImage(file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const safeName = `${crypto.randomUUID()}.${ext}`
  const path = `items/${safeName}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path)

  return data.publicUrl
}

async function readFiles(files) {
  const incoming = Array.from(files || []).filter(file => file.type.startsWith('image/'))
  if (!incoming.length) return

  const existing = state.gallery[0] === fallbackImage ? [] : [...state.gallery]
  const selectedFiles = incoming
  const largeFiles = selectedFiles.filter(file => file.size > 700 * 1024)

  if (largeFiles.length) {
    showUploadError('Secilen gorsellerden bazilari buyuk. Daha hizli site icin 700 KB altinda gorsel onerilir.')
  } else {
    resetUploadError()
  }

  try {
    const uploadedUrls = []
    for (const file of selectedFiles) {
      const publicUrl = await uploadSingleImage(file)
      uploadedUrls.push(publicUrl)
    }

    state.gallery = [...existing, ...uploadedUrls]
    if (!state.gallery.length) state.gallery = [fallbackImage]

    renderPreview()
    imageInput.value = ''
  } catch (err) {
    console.error('Storage upload hatası:', err)
    showUploadError('Görsel Supabase Storage’a yüklenemedi.')
  }
}

async function openEditor(item = null) {
  state.editingId = item?.id || null
  state.editorLang = 'tr'
  state.translations = buildTranslationsFromItem(item)

  editorTitle.textContent = item ? 'İçerik düzenle' : 'Yeni içerik'
  deleteItemBtn.classList.toggle('hidden', !item)

  const defaultCategory = item?.category || 'tour'
  const nextOrder = item?.order || await getNextOrder(defaultCategory)

  formFields.category.value = defaultCategory
  formFields.order.value = nextOrder
  formFields.price.value = item?.price || ''
  formFields.duration.value = item?.duration || ''
  formFields.active.checked = item?.active ?? true

  if (editorLang) {
    editorLang.value = 'tr'
  }

  fillInputsFromLanguage('tr')

  state.gallery = item?.gallery?.length ? [...item.gallery] : [fallbackImage]

  resetUploadError()
  setTranslateStatus('')
  renderPreview()
  editorModal.classList.remove('hidden')
}

function closeEditorModal() {
  if (state.isSavingItem) return

  editorModal.classList.add('hidden')
  state.editingId = null
  state.gallery = [fallbackImage]
  state.editorLang = 'tr'
  state.translations = null
  imageInput.value = ''
  setTranslateStatus('')
}

function getEditorPreviewItem() {
  syncCurrentLanguageInputsToState()

  const content = state.translations?.[state.editorLang] || state.translations?.tr || {}
  const gallery = (state.gallery || []).filter(Boolean)

  return {
    title: content.title || state.translations?.tr?.title || 'Baslik',
    desc: content.desc || content.short || state.translations?.tr?.desc || state.translations?.tr?.short || '',
    price: formFields.price.value.trim(),
    duration: formFields.duration.value.trim(),
    image: gallery[0] || fallbackImage,
    active: formFields.active.checked,
  }
}

function openItemPreview() {
  if (!previewModal) return

  const item = getEditorPreviewItem()
  previewImage.src = item.image
  previewTitle.textContent = item.title
  previewDescription.textContent = item.desc
  previewPrice.textContent = item.price || ''
  previewPrice.classList.toggle('hidden', !item.price)

  const chips = []
  if (item.duration) chips.push(`<span>${escapeHtml(localizeMetaText(item.duration))}</span>`)
  chips.push(`<span>${item.active ? 'Aktif' : 'Pasif'}</span>`)
  previewMeta.innerHTML = chips.join('')

  previewModal.classList.remove('hidden')
}

function closeItemPreview() {
  previewModal?.classList.add('hidden')
}

async function upsertItem() {
  if (state.isSavingItem) return

  syncCurrentLanguageInputsToState()

  const gallery = (state.gallery || []).filter(Boolean)
  const itemId = state.editingId || crypto.randomUUID()

  const payload = {
    category: formFields.category.value,
    sort_order: Number(formFields.order.value) || await getNextOrder(formFields.category.value),

    title_tr: state.translations.tr.title,
    title_en: state.translations.en.title,
    title_de: state.translations.de.title,
    title_ru: state.translations.ru.title,
    title_ar: state.translations.ar.title,

    short_desc_tr: state.translations.tr.short,
    short_desc_en: state.translations.en.short,
    short_desc_de: state.translations.de.short,
    short_desc_ru: state.translations.ru.short,
    short_desc_ar: state.translations.ar.short,

    detail_desc_tr: state.translations.tr.desc,
    detail_desc_en: state.translations.en.desc,
    detail_desc_de: state.translations.de.desc,
    detail_desc_ru: state.translations.ru.desc,
    detail_desc_ar: state.translations.ar.desc,

    price: formFields.price.value.trim(),
    duration: formFields.duration.value.trim(),
    is_active: formFields.active.checked,
    images: gallery.length ? gallery : [fallbackImage],
  }

  if (!payload.title_tr) {
    alert('Türkçe başlık zorunlu.')
    return
  }

  const missingLanguages = missingLanguageLabels(state.translations)
  if (missingLanguages.length) {
    const shouldContinue = confirm(
      `Bazi dil alanlari bos: ${missingLanguages.join(', ')}. Yine de kaydedilsin mi?`
    )

    if (!shouldContinue) return
  }

  setItemSaving(true)

  const request = state.editingId
    ? supabase.from('items').update(payload).eq('id', itemId)
    : supabase.from('items').insert({ id: itemId, ...payload })

  const { error } = await request

  if (error) {
    setItemSaving(false)
    console.error('Kayıt hatası:', error)
    alert(`Kayıt sırasında hata oluştu: ${error.message}`)
    return
  }

  await renderTable()
  setItemSaving(false)
  closeEditorModal()
}

async function deleteCurrentItem() {
  if (!state.editingId) return

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', state.editingId)

  if (error) {
    console.error('Silme hatası:', error)
    alert('Silme sırasında hata oluştu.')
    return
  }

  await renderTable()
  closeEditorModal()
}

async function renderSettings() {
  const settings = await getSettings()
  state.settingsId = settings.id || null
  whatsappNumberInput.value = settings.whatsapp_number || ''
  brandNameInput.value = settings.brand_name || DEFAULT_BRAND_NAME
}

async function saveSettingsFromForm() {
  const current = await getSettings()
  const payload = {
    whatsapp_number: whatsappNumberInput.value.trim(),
    brand_name: brandNameInput.value.trim() || DEFAULT_BRAND_NAME,
    updated_at: new Date().toISOString(),
  }

  if (!current?.id) {
    const { error } = await supabase
      .from('settings')
      .insert(payload)

    if (error) {
      console.error('Ayar kaydetme hatası:', error)
      alert('Ayarlar kaydedilemedi.')
      return
    }
  } else {
    const { error } = await supabase
      .from('settings')
      .update(payload)
      .eq('id', current.id)

    if (error) {
      console.error('Ayar güncelleme hatası:', error)
      alert('Ayarlar kaydedilemedi.')
      return
    }
  }

  alert('Ayarlar kaydedildi.')
  await renderSettings()
}

function setView(view) {
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view))
  contentView.classList.toggle('hidden', view !== 'content')
  settingsView.classList.toggle('hidden', view !== 'settings')
  openNewItem.classList.toggle('hidden', view !== 'content')
  panelTitle.textContent = view === 'content' ? 'İçerik Yönetimi' : 'Genel Ayarlar'
}

async function login() {
  const email = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data?.user) {
    console.error('Giriş hatası:', error);
    loginError.textContent = 'E-posta veya şifre hatalı.';
    loginError.classList.remove('hidden');
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();

  if (profileError || !profile || !profile.is_active || !['admin', 'staff'].includes(profile.role)) {
    await supabase.auth.signOut();
    loginError.textContent = 'Bu hesabın admin erişimi yok.';
    loginError.classList.remove('hidden');
    return;
  }

  sessionStorage.setItem(SESSION_KEY, 'true');
  loginCard.classList.add('hidden');
  dashboard.classList.remove('hidden');
  loginError.classList.add('hidden');

  await renderTable();
  await renderSettings();
}

async function logout() {
  await supabase.auth.signOut();
  sessionStorage.removeItem(SESSION_KEY);
  dashboard.classList.add('hidden');
  loginCard.classList.remove('hidden');
}

async function init() {
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    loginCard.classList.add('hidden');
    dashboard.classList.remove('hidden');
    await renderTable();
    await renderSettings();
  }
}

loginBtn.addEventListener('click', () => { void login() });
logoutBtn.addEventListener('click', () => { void logout() });
openNewItem.addEventListener('click', () => { void openEditor() })
closeEditor.addEventListener('click', closeEditorModal)
cancelEditor.addEventListener('click', closeEditorModal)
saveItemBtn.addEventListener('click', () => { void upsertItem() })
deleteItemBtn.addEventListener('click', () => { void deleteCurrentItem() })
saveSettingsBtn.addEventListener('click', () => { void saveSettingsFromForm() })
previewItemBtn?.addEventListener('click', openItemPreview)
closePreview?.addEventListener('click', closeItemPreview)
previewModal?.addEventListener('click', event => {
  if (event.target === previewModal) closeItemPreview()
})
if (translateFromTurkishBtn) {
  translateFromTurkishBtn.addEventListener('click', () => { void translateFromTurkish() })
}
imageInput.addEventListener('change', event => readFiles(event.target.files))

formFields.category.addEventListener('change', () => {
  if (!state.editingId) {
    void getNextOrder(formFields.category.value).then(order => {
      formFields.order.value = order
    })
  }
})

editorModal.addEventListener('click', event => {
  if (event.target === editorModal) closeEditorModal()
})

tabBtns.forEach(btn => btn.addEventListener('click', () => {
  state.filter = btn.dataset.category
  tabBtns.forEach(tab => tab.classList.toggle('active', tab === btn))
  void renderTable()
}))

navBtns.forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)))
if (editorLang) {
  editorLang.addEventListener('change', (e) => {
    syncCurrentLanguageInputsToState()
    state.editorLang = e.target.value
    fillInputsFromLanguage(state.editorLang)
  })
}
void init()
