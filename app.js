import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://wsfzybmrvuizmrjkvkpq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const placeholder = 'assets/logo.png';
const WHATSAPP_NUMBER = '905349172414';
const BRAND_NAME = 'MK Tur Tourism';

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
    detail: 'Detay'
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
    detail: 'Details'
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
    detail: 'Details'
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
    detail: 'Подробнее'
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
    detail: 'التفاصيل'
  }
};

const state = {
  lang: 'tr',
  activeCategory: null,
  activeItem: null,
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

function applyBrandName() {
  const titleEl = document.querySelector('h1');
  if (titleEl) {
    titleEl.textContent = state.settings.brandName;
  }
}

function setLanguage(lang) {
  state.lang = lang;

  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.getElementById('screenSubtitle').textContent = t.subtitle;
  document.getElementById('labelTour').textContent = t.tour;
  document.getElementById('labelTransfer').textContent = t.transfer;
  document.getElementById('labelMarket').textContent = t.market;
  document.getElementById('descTour').textContent = t.descTour;
  document.getElementById('descTransfer').textContent = t.descTransfer;
  document.getElementById('descMarket').textContent = t.descMarket;

  backToCategories.textContent = t.back;
  modalWhatsapp.textContent = t.whatsapp;
  whatsappFloat.textContent = t.whatsappFloat;

  if (state.activeCategory) {
    void selectCategory(state.activeCategory);
  }
}

function renderItems(items) {
  const t = translations[state.lang];
  const category = state.activeCategory;

  activeCategoryTitle.textContent = t[category];
  activeCategoryDescription.textContent = t.listHelp;

  itemList.innerHTML = items.map((item, index) => {
    const imageSrc =
      (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null) ||
      item.image ||
      placeholder;

    return `
      <article class="item-card" data-index="${index}">
        <img class="item-thumb" src="${imageSrc}" alt="${item.title}" />
        <div class="item-body">
          <div class="item-title-row">
            <h3>${item.title}</h3>
            ${item.price ? `<span class="price-badge">${item.price}</span>` : ''}
          </div>
          <p class="item-desc">${item.shortDescription || ''}</p>
          <div class="item-footer">
            <span class="meta-inline">${item.duration || ''}</span>
            <button class="secondary-btn" type="button">${t.detail}</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  itemList.querySelectorAll('.item-card').forEach((card) => {
    card.addEventListener('click', () => {
      state.savedScrollY = window.scrollY;
      const selectedItem = items[Number(card.dataset.index)];
      openModal(selectedItem);
    });
  });
}

async function selectCategory(category) {
  state.activeCategory = category;

  categoryGrid.classList.add('hidden');
  listSection.classList.remove('hidden');

  const items = await getCategoryItems(category, state.lang);

  renderItems(items);

  listSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    galleryDots.innerHTML = gallery
      .map((_, index) => `<span class="gallery-dot ${index === safeIndex ? 'active' : ''}"></span>`)
      .join('');
  }
}

function openModal(item) {
  state.activeItem = item;
  state.galleryIndex = 0;

  modalTitle.textContent = item?.title || '';
  modalDescription.textContent = item?.detailDescription || '';
  modalPrice.textContent = item?.price || '';

  if (modalMeta) {
    const chips = [];

    if (item?.duration) {
      chips.push(`<span class="meta-chip">${item.duration}</span>`);
    }

    if (item?.peopleCount) {
      chips.push(`<span class="meta-chip">${item.peopleCount}</span>`);
    }

    if (item?.departureTime) {
      chips.push(`<span class="meta-chip">${item.departureTime}</span>`);
    }

    modalMeta.innerHTML = chips.join('');
  }

  renderGallery(item, 0);

  detailModal.classList.remove('hidden');
  detailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModalFn() {
  detailModal.classList.add('hidden');
  detailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  window.scrollTo({ top: state.savedScrollY, behavior: 'instant' });
}


document.querySelectorAll('.category-card').forEach((btn) =>
  btn.addEventListener('click', () => selectCategory(btn.dataset.category))
);

backToCategories.addEventListener('click', () => {
  state.activeCategory = null;
  listSection.classList.add('hidden');
  categoryGrid.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

langSelect.addEventListener('change', (e) => setLanguage(e.target.value));

closeModal.addEventListener('click', closeModalFn);

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
    lightbox.classList.add('hidden');
    closeModal.classList.remove('hidden');
  }
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  closeModal.classList.remove('hidden');
});

async function init() {
  applyBrandName();
  setLanguage('tr');
}

void init();