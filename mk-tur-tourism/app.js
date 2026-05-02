import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://wsfzybmrvuizmrjkvkpq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const placeholder = 'assets/logo.png';
const WHATSAPP_NUMBER = '905349172414';
const BRAND_NAME = 'MK Group';
const BRAND_SUBTITLE = 'Local Services';
const LANG_STORAGE_KEY = 'mk_group_selected_language';
const HISTORY_STATE_KEY = 'mk_group_history_state';

const translations = {
  tr: {
    subtitle: 'Hizmet seçin',
    tour: 'Tur',
    transfer: 'Transfer',
    market: 'Market',
    descTour: 'Tekne turları, safari ve aktiviteler',
    descTransfer: 'VIP transfer, havaalanı ve araç seçenekleri',
    descMarket: 'İçecekler, atıştırmalıklar ve ihtiyaç ürünleri',
    listHelp: 'Aşağıdan seçim yapın',
    back: 'Geri',
    whatsapp: 'WhatsApp ile iletişime geç',
    whatsappFloat: 'WhatsApp',
    detail: 'Detay',
    marketListTitle: 'Liste'
  },
  en: {
    subtitle: 'Choose a service',
    tour: 'Tours',
    transfer: 'Transfer',
    market: 'Market',
    descTour: 'Boat trips, safari and activities',
    descTransfer: 'VIP transfer, airport and car options',
    descMarket: 'Drinks, snacks and essentials',
    listHelp: 'Choose an item below',
    back: 'Back',
    whatsapp: 'Contact on WhatsApp',
    whatsappFloat: 'WhatsApp',
    detail: 'Details',
    marketListTitle: 'Menu / product list'
  },
  de: {
    subtitle: 'Service auswählen',
    tour: 'Touren',
    transfer: 'Transfer',
    market: 'Markt',
    descTour: 'Bootstouren, Safari und Aktivitäten',
    descTransfer: 'VIP-Transfer, Flughafen und Fahrzeugoptionen',
    descMarket: 'Getränke, Snacks und wichtige Produkte',
    listHelp: 'Bitte unten auswählen',
    back: 'Zurück',
    whatsapp: 'Über WhatsApp kontaktieren',
    whatsappFloat: 'WhatsApp',
    detail: 'Details',
    marketListTitle: 'Menü / Produktliste'
  },
  ru: {
    subtitle: 'Выберите услугу',
    tour: 'Туры',
    transfer: 'Трансфер',
    market: 'Маркет',
    descTour: 'Лодочные туры, сафари и активности',
    descTransfer: 'VIP трансфер, аэропорт и автомобили',
    descMarket: 'Напитки, снеки и необходимые товары',
    listHelp: 'Выберите ниже',
    back: 'Назад',
    whatsapp: 'Связаться в WhatsApp',
    whatsappFloat: 'WhatsApp',
    detail: 'Подробнее',
    marketListTitle: 'Список'
  },
  ar: {
    subtitle: 'اختر الخدمة',
    tour: 'الجولات',
    transfer: 'النقل',
    market: 'المتجر',
    descTour: 'رحلات القوارب والسفاري والأنشطة',
    descTransfer: 'نقل VIP والمطار وخيارات السيارات',
    descMarket: 'مشروبات ووجبات خفيفة واحتياجات أساسية',
    listHelp: 'اختر من الأسفل',
    back: 'رجوع',
    whatsapp: 'تواصل عبر واتساب',
    whatsappFloat: 'واتساب',
    detail: 'التفاصيل',
    marketListTitle: 'القائمة'
  }
};

const uiText = {
  tr: {
    loading: 'Yukleniyor...',
    emptyCategory: 'Bu kategoride aktif icerik yok.',
    quickWhatsapp: 'WhatsApp'
  },
  en: {
    loading: 'Loading...',
    emptyCategory: 'No active items in this category.',
    quickWhatsapp: 'WhatsApp'
  },
  de: {
    loading: 'Wird geladen...',
    emptyCategory: 'Keine aktiven Inhalte in dieser Kategorie.',
    quickWhatsapp: 'WhatsApp'
  },
  ru: {
    loading: 'Loading...',
    emptyCategory: 'No active items in this category.',
    quickWhatsapp: 'WhatsApp'
  },
  ar: {
    loading: 'Loading...',
    emptyCategory: 'No active items in this category.',
    quickWhatsapp: 'WhatsApp'
  }
};

const whatsappMessages = {
  tr: {
    item: (title) => `Merhaba, ${title} hakkinda bilgi almak istiyorum.`,
    generic: 'Merhaba, bilgi almak istiyorum.'
  },
  en: {
    item: (title) => `Hello, I would like to get information about ${title}.`,
    generic: 'Hello, I would like to get more information.'
  },
  de: {
    item: (title) => `Hallo, ich moechte Informationen zu ${title} erhalten.`,
    generic: 'Hallo, ich moechte mehr Informationen erhalten.'
  },
  ru: {
    item: (title) => `Здравствуйте, я хочу получить информацию о ${title}.`,
    generic: 'Здравствуйте, я хочу получить дополнительную информацию.'
  },
  ar: {
    item: (title) => `مرحبا، أود الحصول على معلومات حول ${title}.`,
    generic: 'مرحبا، أود الحصول على مزيد من المعلومات.'
  }
};

const localizedMetaUnits = {
  en: {
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    day: ['day', 'days'],
    person: ['person', 'people']
  },
  de: {
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    day: ['Tag', 'Tage'],
    person: ['Person', 'Personen']
  },
  ru: {
    hour: ['час', 'часа', 'часов'],
    minute: ['минута', 'минуты', 'минут'],
    day: ['день', 'дня', 'дней'],
    person: ['человек', 'человека', 'человек']
  },
  ar: {
    hour: ['ساعة', 'ساعات'],
    minute: ['دقيقة', 'دقائق'],
    day: ['يوم', 'أيام'],
    person: ['شخص', 'أشخاص']
  }
};

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
    [/ozel/giu, 'private']
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
    [/ozel/giu, 'privat']
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
    [/ozel/giu, 'частный']
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
    [/ozel/giu, 'خاص']
  ]
};

const state = {
  lang: 'tr',
  activeCategory: null,
  activeItem: null,
  activeItems: [],
  savedScrollY: 0,
  galleryIndex: 0,
  settings: {
    whatsappNumber: WHATSAPP_NUMBER,
    brandName: BRAND_NAME
  }
};

const categoryGrid = document.getElementById('categoryGrid');
const listSection = document.getElementById('listSection');
const itemList = document.getElementById('itemList');
const activeCategoryTitle = document.getElementById('activeCategoryTitle');
const activeCategoryDescription = document.getElementById('activeCategoryDescription');
const backToCategories = document.getElementById('backToCategories');
const langSelect = document.getElementById('langSelect');

const detailModal = document.getElementById('detailModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMarketList = document.getElementById('modalMarketList');
const modalMeta = document.getElementById('modalMeta');
const modalPrice = document.getElementById('modalPrice');
const modalWhatsapp = document.getElementById('modalWhatsapp');

const galleryDots = document.getElementById('galleryDots');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

const whatsappFloat = document.getElementById('whatsappFloat');

function buildWhatsAppUrl(message = '') {
  const phone = state.settings.whatsappNumber.replace(/\D/g, '') || WHATSAPP_NUMBER;
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function getUiText(key) {
  return uiText[state.lang]?.[key] || uiText.en[key] || key;
}

function getPluralIndex(amount, lang) {
  const number = Number(String(amount).replace(',', '.'));

  if (lang === 'ru') {
    const integer = Math.abs(Math.trunc(number));
    const lastDigit = integer % 10;
    const lastTwoDigits = integer % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return 0;
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return 1;
    return 2;
  }

  return number === 1 ? 0 : 1;
}

function getLocalizedUnit(unit, amount, lang) {
  const labels = localizedMetaUnits[lang]?.[unit];
  if (!labels) return '';

  return labels[Math.min(getPluralIndex(amount, lang), labels.length - 1)];
}

function localizeMetaText(value = '', lang = state.lang) {
  if (!value || lang === 'tr') return value;

  let text = String(value);

  for (const [pattern, replacement] of localizedMetaPhrases[lang] || []) {
    text = text.replace(pattern, replacement);
  }

  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(saat|sa)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('hour', amount, lang)}`
  );
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(dakika|dk)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('minute', amount, lang)}`
  );
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(gün|gun)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('day', amount, lang)}`
  );
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*(kişi|kisi)\b/giu, (_, amount) =>
    `${amount} ${getLocalizedUnit('person', amount, lang)}`
  );

  return text;
}

function buildItemWhatsAppMessage(item = null) {
  const messageSet = whatsappMessages[state.lang] || whatsappMessages.en;
  const itemTitle = item?.title?.trim();

  return itemTitle ? messageSet.item(itemTitle) : messageSet.generic;
}

function buildHomeHistoryState() {
  return { [HISTORY_STATE_KEY]: true, view: 'home' };
}

function buildCategoryHistoryState(category) {
  return { [HISTORY_STATE_KEY]: true, view: 'category', category };
}

function buildModalHistoryState(category, itemId) {
  return { [HISTORY_STATE_KEY]: true, view: 'modal', category, itemId };
}

function isManagedHistoryState(value) {
  return Boolean(value?.[HISTORY_STATE_KEY]);
}

function ensureHomeHistoryState() {
  if (!isManagedHistoryState(window.history.state)) {
    window.history.replaceState(buildHomeHistoryState(), '', window.location.href);
  }
}

function pushHistoryState(nextState) {
  window.history.pushState(nextState, '', window.location.href);
}

function applyWhatsAppLinks(item = null) {
  const itemText = buildItemWhatsAppMessage(item);

  if (whatsappFloat) {
    whatsappFloat.href = buildWhatsAppUrl();
  }

  if (modalWhatsapp) {
    modalWhatsapp.href = buildWhatsAppUrl(itemText);
  }
}

function showListStatus(message, type = 'loading') {
  itemList.innerHTML = `
    <div class="list-state ${type}">
      <span class="list-state-dot"></span>
      <p>${message}</p>
    </div>
  `;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pickLangValue(row, base, lang = 'tr') {
  const direct = row[`${base}_${lang}`];
  const fallback = row[`${base}_tr`];
  return direct || fallback || '';
}

function mapSupabaseItem(row, lang = 'tr') {
  return {
    id: row.id,
    category: row.category,
    title: pickLangValue(row, 'title', lang),
    shortDescription: pickLangValue(row, 'short_desc', lang),
    detailDescription: pickLangValue(row, 'detail_desc', lang),
    price: row.price || '',
    duration: row.duration || '',
    peopleCount: row.people_count || '',
    departureTime: row.departure_time || '',
    isActive: row.is_active,
    images: Array.isArray(row.images) ? row.images : []
  };
}

async function fetchItemsFromSupabase(category, lang = 'tr') {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`${category} içerikleri çekilemedi:`, error);
    return [];
  }

  return data.map((row) => mapSupabaseItem(row, lang));
}

async function getCategoryItems(category, lang = 'tr') {
  return await fetchItemsFromSupabase(category, lang);
}

async function fetchSettingsFromSupabase() {
  const { data, error } = await supabase
    .from('settings')
    .select('whatsapp_number, brand_name')
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Ayarlar cekilemedi:', error);
    return null;
  }

  return data;
}

async function loadSettings() {
  const settings = await fetchSettingsFromSupabase();

  if (!settings) return;

  state.settings = {
    whatsappNumber: settings.whatsapp_number || WHATSAPP_NUMBER,
    brandName: settings.brand_name || BRAND_NAME
  };
}

function applyBrandName() {
  const titleEl = document.querySelector('h1');
  if (titleEl) {
    titleEl.textContent = state.settings.brandName;
  }

  const subtitleEl = document.getElementById('screenSubtitle');
  if (subtitleEl && !state.activeCategory) {
    subtitleEl.textContent = BRAND_SUBTITLE;
  }
}

function setLanguage(lang) {
  state.lang = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage restrictions.
  }

  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  updateScreenSubtitle();
  document.getElementById('labelTour').textContent = t.tour;
  document.getElementById('labelTransfer').textContent = t.transfer;
  document.getElementById('labelMarket').textContent = t.market;
  document.getElementById('descTour').textContent = t.descTour;
  document.getElementById('descTransfer').textContent = t.descTransfer;
  document.getElementById('descMarket').textContent = t.descMarket;

  backToCategories.textContent = t.back;
  modalWhatsapp.textContent = t.whatsapp;
  whatsappFloat.textContent = t.whatsappFloat;
  applyWhatsAppLinks(state.activeItem);

  if (state.activeCategory) {
    void selectCategory(state.activeCategory, { pushHistory: false, scrollIntoView: false });
  }
}

function renderItems(items) {
  const t = translations[state.lang];
  const category = state.activeCategory;
  state.activeItems = items;

  activeCategoryTitle.textContent = t[category];
  activeCategoryDescription.textContent = t.listHelp;

  if (!items.length) {
    showListStatus(getUiText('emptyCategory'), 'empty');
    return;
  }

  itemList.innerHTML = items.map((item, index) => {
    const imageSrc =
      (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null) ||
      item.image ||
      placeholder;
    const quickWhatsappUrl = buildWhatsAppUrl(buildItemWhatsAppMessage(item));
    const durationText = localizeMetaText(item.duration);
    const thumbClassName = category === 'transfer' ? 'item-thumb item-thumb--contain' : 'item-thumb';

    return `
      <article class="item-card" data-index="${index}">
        <img class="${thumbClassName}" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.title)}" />
        <div class="item-body">
          <div class="item-title-row">
            <h3>${escapeHtml(item.title)}</h3>
            ${item.price ? `<span class="price-badge">${escapeHtml(item.price)}</span>` : ''}
          </div>
          <p class="item-desc">${escapeHtml(item.shortDescription || '')}</p>
          <div class="item-footer">
            <span class="meta-inline">${escapeHtml(durationText || '')}</span>
            <div class="item-actions">
              <a class="item-whatsapp-btn" href="${escapeHtml(quickWhatsappUrl)}" target="_blank" rel="noopener noreferrer">${getUiText('quickWhatsapp')}</a>
              <button class="secondary-btn" type="button">${t.detail}</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  itemList.querySelectorAll('.item-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.item-whatsapp-btn')) return;

      state.savedScrollY = window.scrollY;
      const selectedItem = items[Number(card.dataset.index)];
      openModal(selectedItem);
    });
  });
}

async function selectCategory(category, options = {}) {
  const { pushHistory = true, scrollIntoView = true } = options;
  state.activeCategory = category;

  categoryGrid.classList.add('hidden');
  listSection.classList.remove('hidden');
  updateScreenSubtitle();
  showListStatus(getUiText('loading'), 'loading');

  const items = await getCategoryItems(category, state.lang);

  renderItems(items);

  if (pushHistory) {
    pushHistoryState(buildCategoryHistoryState(category));
  }

  if (scrollIntoView) {
    listSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderGallery(item, nextIndex = 0) {
  const gallery =
    (Array.isArray(item?.images) && item.images.length ? item.images : null) ||
    (Array.isArray(item?.gallery) && item.gallery.length ? item.gallery : null) ||
    (item?.image ? [item.image] : [placeholder]);

  const safeIndex = Math.max(0, Math.min(nextIndex, gallery.length - 1));
  state.galleryIndex = safeIndex;

  modalImage.src = gallery[safeIndex];
  modalImage.alt = item?.title || 'Görsel';

  galleryPrev.classList.toggle('hidden', gallery.length <= 1);
  galleryNext.classList.toggle('hidden', gallery.length <= 1);

  if (galleryDots) {
    galleryDots.innerHTML = gallery.length > 8
      ? `<span class="gallery-counter">${safeIndex + 1} / ${gallery.length}</span>`
      : gallery
        .map((_, index) => `<span class="gallery-dot ${index === safeIndex ? 'active' : ''}"></span>`)
        .join('');
  }
}

function cleanMarketListLine(line = '') {
  return line.replace(/^(\s*[-*•]|\s*\d+[.)])\s*/, '').trim();
}

function looksLikeMarketListLine(line = '') {
  const text = line.trim();

  return /^([-*•]|\d+[.)])\s+/.test(text) ||
    /\s[-:]\s/.test(text) ||
    /(?:₺|€|\$)\s*\d|\d+(?:[.,]\d+)?\s*(?:tl|try|₺|eur|€|usd|\$)\b/i.test(text);
}

function getMarketDetailParts(description = '') {
  const text = String(description || '').trim();
  if (!text) return { intro: '', items: [] };

  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return { intro: text, items: [] };

  let introLines = [];
  let listLines = lines;

  if (blocks.length > 1) {
    const firstBlockLines = blocks[0].split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const firstBlockLooksLikeList = firstBlockLines.length > 1 || firstBlockLines.some(looksLikeMarketListLine);

    if (!firstBlockLooksLikeList) {
      introLines = firstBlockLines;
      listLines = blocks
        .slice(1)
        .flatMap((block) => block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
    }
  }

  const markedLineCount = listLines.filter(looksLikeMarketListLine).length;
  const shouldRenderList = listLines.length >= 3 || markedLineCount >= 2;

  if (!shouldRenderList) return { intro: text, items: [] };

  const items = listLines.map(cleanMarketListLine).filter(Boolean);

  return items.length >= 2
    ? { intro: introLines.join('\n'), items }
    : { intro: text, items: [] };
}

function renderMarketDetail(item) {
  const { intro, items } = getMarketDetailParts(item?.detailDescription || '');

  modalDescription.textContent = intro || '';
  modalDescription.classList.toggle('hidden', !intro);

  if (!modalMarketList) return;

  modalMarketList.classList.toggle('hidden', !items.length);
  modalMarketList.innerHTML = items.length
    ? `
      <div class="market-detail-list-title">${escapeHtml(translations[state.lang]?.marketListTitle || 'List')}</div>
      <ul>
        ${items.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}
      </ul>
    `
    : '';
}

function openModal(item, options = {}) {
  const { pushHistory = true } = options;
  state.activeItem = item;
  state.galleryIndex = 0;
  modalImage.classList.toggle('modal-image--contain', item?.category === 'transfer' || item?.category === 'market');

  modalTitle.textContent = item?.title || '';
  if (item?.category === 'market') {
    renderMarketDetail(item);
  } else {
    modalDescription.textContent = item?.detailDescription || '';
    modalDescription.classList.toggle('hidden', !item?.detailDescription);
    if (modalMarketList) {
      modalMarketList.classList.add('hidden');
      modalMarketList.innerHTML = '';
    }
  }
  modalPrice.textContent = item?.price || '';

  if (modalMeta) {
    const chips = [];

    if (item?.duration) chips.push(`<span class="meta-chip">${escapeHtml(localizeMetaText(item.duration))}</span>`);
    if (item?.peopleCount) chips.push(`<span class="meta-chip">${escapeHtml(localizeMetaText(item.peopleCount))}</span>`);
    if (item?.departureTime) chips.push(`<span class="meta-chip">${escapeHtml(localizeMetaText(item.departureTime))}</span>`);

    modalMeta.innerHTML = chips.join('');
  }

  applyWhatsAppLinks(item);
  renderGallery(item, 0);

  detailModal.classList.remove('hidden');
  detailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  if (pushHistory && state.activeCategory && item?.id) {
    pushHistoryState(buildModalHistoryState(state.activeCategory, item.id));
  }
}

function updateScreenSubtitle() {
  const subtitleEl = document.getElementById('screenSubtitle');
  if (!subtitleEl) return;

  subtitleEl.textContent = state.activeCategory
    ? translations[state.lang].listHelp
    : BRAND_SUBTITLE;
}

function closeLightboxFn() {
  lightbox.classList.add('hidden');
  closeModal.classList.remove('hidden');
}

function closeModalView(options = {}) {
  const { restoreScroll = true } = options;
  closeLightboxFn();
  detailModal.classList.add('hidden');
  detailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  state.activeItem = null;

  if (restoreScroll) {
    window.scrollTo({ top: state.savedScrollY, behavior: 'auto' });
  }
}

function closeModalFn(options = {}) {
  const { useHistory = true, restoreScroll = true } = options;

  if (useHistory && window.history.state?.view === 'modal') {
    window.history.back();
    return;
  }

  closeModalView({ restoreScroll });
}

function showHomeView(options = {}) {
  const { scrollToTop = true } = options;
  closeModalView({ restoreScroll: false });
  state.activeCategory = null;
  state.activeItems = [];
  listSection.classList.add('hidden');
  categoryGrid.classList.remove('hidden');
  updateScreenSubtitle();

  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

async function syncUiWithHistory(nextState = window.history.state) {
  if (!isManagedHistoryState(nextState) || nextState.view === 'home') {
    showHomeView();
    return;
  }

  if (nextState.view === 'category' && nextState.category) {
    closeModalView({ restoreScroll: false });
    await selectCategory(nextState.category, { pushHistory: false, scrollIntoView: false });
    return;
  }

  if (nextState.view === 'modal' && nextState.category) {
    await selectCategory(nextState.category, { pushHistory: false, scrollIntoView: false });
    const selectedItem = state.activeItems.find((item) => item.id === nextState.itemId);

    if (selectedItem) {
      openModal(selectedItem, { pushHistory: false });
      return;
    }
  }

  showHomeView();
}

document.querySelectorAll('.category-card').forEach((btn) =>
  btn.addEventListener('click', () => selectCategory(btn.dataset.category))
);

backToCategories.addEventListener('click', () => {
  if (window.history.state?.view === 'category') {
    window.history.back();
    return;
  }

  showHomeView();
});

langSelect.addEventListener('change', (e) => setLanguage(e.target.value));

closeModal.addEventListener('click', closeModalFn);

whatsappFloat.addEventListener('click', (e) => {
  e.stopPropagation();
  applyWhatsAppLinks();
});

modalWhatsapp.addEventListener('click', (e) => {
  e.stopPropagation();
  applyWhatsAppLinks(state.activeItem);
});

detailModal.addEventListener('click', (e) => {
  if (e.target === detailModal) closeModalFn();
});

galleryPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.activeItem) renderGallery(state.activeItem, state.galleryIndex - 1);
});

galleryNext.addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.activeItem) renderGallery(state.activeItem, state.galleryIndex + 1);
});

modalImage.addEventListener('click', () => {
  lightboxImage.src = modalImage.src;
  lightbox.classList.remove('hidden');
  closeModal.classList.add('hidden');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightboxFn();
  }
});

closeLightbox.addEventListener('click', () => {
  closeLightboxFn();
});

window.addEventListener('popstate', () => {
  void syncUiWithHistory();
});

async function init() {
  await loadSettings();
  ensureHomeHistoryState();
  applyBrandName();
  applyWhatsAppLinks();
  let savedLang = 'tr';
  try {
    savedLang = localStorage.getItem(LANG_STORAGE_KEY) || 'tr';
  } catch {
    savedLang = 'tr';
  }

  if (!translations[savedLang]) savedLang = 'tr';
  langSelect.value = savedLang;
  setLanguage(savedLang);
  await syncUiWithHistory(window.history.state);
}

void init();
