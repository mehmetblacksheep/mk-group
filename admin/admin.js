const STORAGE_BUCKET = 'item-images'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://wsfzybmrvuizmrjkvkpq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const SESSION_KEY = 'mk_tur_tourism_admin_session'
const fallbackImage = '../assets/logo.png'

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
const saveSettingsBtn = document.getElementById('saveSettings')
const whatsappNumberInput = document.getElementById('whatsappNumber')
const brandNameInput = document.getElementById('brandName')
const imageInput = document.getElementById('itemImages')
const editorLang = document.getElementById('editorLang')
const imagePreviewGrid = document.getElementById('imagePreviewGrid')
const uploadError = document.getElementById('uploadError')

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
}

function categoryLabel(category) {
  return ({ tour: 'Tur', transfer: 'Transfer', market: 'Market' })[category] || category
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
    return { id: null, whatsapp_number: '', brand_name: 'MK Tur Tourism' }
  }

  return data || { id: null, whatsapp_number: '', brand_name: 'MK Tur Tourism' }
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
          <img src="${(item.gallery && item.gallery[0]) || item.image || fallbackImage}" alt="${item.title}" class="table-thumb" />
          <div>
            <strong>${item.title}</strong><br>
            <span class="muted small">${item.short || ''}</span>
          </div>
        </div>
      </td>
      <td>${item.price || '-'}</td>
      <td><span class="status-pill ${item.active ? 'active' : 'passive'}">${item.active ? 'Aktif' : 'Pasif'}</span></td>
      <td>
        <div class="row-actions">
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
  const remainingSlots = Math.max(0, 3 - existing.length)

  if (!remainingSlots) {
    showUploadError('En fazla 3 görsel yükleyebilirsin.')
    imageInput.value = ''
    return
  }

  const selectedFiles = incoming.slice(0, remainingSlots)

  if (incoming.length > remainingSlots) {
    showUploadError(`Sadece ${remainingSlots} görsel daha ekleyebilirsin. İlk ${remainingSlots} görsel yüklenecek.`)
  } else {
    resetUploadError()
  }

  try {
    const uploadedUrls = []
    for (const file of selectedFiles) {
      const publicUrl = await uploadSingleImage(file)
      uploadedUrls.push(publicUrl)
    }

    state.gallery = [...existing, ...uploadedUrls].slice(0, 3)
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
  renderPreview()
  editorModal.classList.remove('hidden')
}

function closeEditorModal() {
  editorModal.classList.add('hidden')
  state.editingId = null
  state.gallery = [fallbackImage]
  state.editorLang = 'tr'
  state.translations = null
  imageInput.value = ''
}

async function upsertItem() {
  syncCurrentLanguageInputsToState()

  const gallery = (state.gallery || []).filter(Boolean).slice(0, 3)
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

  const request = state.editingId
    ? supabase.from('items').update(payload).eq('id', itemId)
    : supabase.from('items').insert({ id: itemId, ...payload })

  const { error } = await request

  if (error) {
    console.error('Kayıt hatası:', error)
    alert(`Kayıt sırasında hata oluştu: ${error.message}`)
    return
  }

  await renderTable()
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
  brandNameInput.value = settings.brand_name || 'MK Tur Tourism'
}

async function saveSettingsFromForm() {
  const current = await getSettings()

  if (!current?.id) {
    const { error } = await supabase
      .from('settings')
      .insert({
        whatsapp_number: whatsappNumberInput.value.trim(),
        brand_name: brandNameInput.value.trim() || 'MK Tur Tourism',
      })

    if (error) {
      console.error('Ayar kaydetme hatası:', error)
      alert('Ayarlar kaydedilemedi.')
      return
    }
  } else {
    const { error } = await supabase
      .from('settings')
      .update({
        whatsapp_number: whatsappNumberInput.value.trim(),
        brand_name: brandNameInput.value.trim() || 'MK Tur Tourism',
      })
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
