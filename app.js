import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://wsfzybmrvuizmrjkvkpq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_MRfDEp6ZDZUo7rXpLoRK4A_SL-9PAPd'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
function pickLangValue(row, base, lang = 'tr') {
  const direct = row[`${base}_${lang}`]
  const fallback = row[`${base}_tr`]
  return direct || fallback || ''
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
  }
}

async function fetchSettingsFromSupabase() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('settings çekilemedi:', error)
    return null
  }

  return data
}
function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

async function loadSettingsIntoState() {
  const settings = await fetchSettingsFromSupabase()

  state.settings = {
    whatsappNumber: normalizePhone(settings?.whatsapp_number || settings?.whatsappNumber || ''),
    brandName: settings?.brand_name || settings?.brandName || 'MK Tur Tourism'
  }

  const titleEl = document.querySelector('h1')
  if (titleEl && state.settings.brandName) {
    titleEl.textContent = state.settings.brandName
  }
}
async function fetchItemsFromSupabase(category, lang = 'tr') {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error(`${category} içerikleri çekilemedi:`, error)
    return []
  }

  return data.map((row) => mapSupabaseItem(row, lang))
}
async function getCategoryItems(category, lang = 'tr') {
  return await fetchItemsFromSupabase(category, lang)
}
const STORAGE_KEY = 'mk_tur_tourism_content';
const SETTINGS_KEY = 'mk_tur_tourism_settings';
const placeholder = 'assets/logo.png';
const translations = {
  tr:{subtitle:'Hizmet seçin',tour:'Tur',transfer:'Transfer',market:'Market',descTour:'Tekne turları, safari ve aktiviteler',descTransfer:'VIP transfer, havaalanı ve araç seçenekleri',descMarket:'İçecekler, atıştırmalıklar ve ihtiyaç ürünleri',listHelp:'Aşağıdan seçim yapın',back:'Geri',whatsapp:'WhatsApp ile iletişime geç',whatsappFloat:'WhatsApp',detail:'Detay'},
  en:{subtitle:'Choose a service',tour:'Tours',transfer:'Transfer',market:'Market',descTour:'Boat trips, safari and activities',descTransfer:'VIP transfer, airport and car options',descMarket:'Drinks, snacks and essentials',listHelp:'Choose an item below',back:'Back',whatsapp:'Contact on WhatsApp',whatsappFloat:'WhatsApp',detail:'Details'},
  de:{subtitle:'Service auswählen',tour:'Touren',transfer:'Transfer',market:'Markt',descTour:'Bootstouren, Safari und Aktivitäten',descTransfer:'VIP-Transfer, Flughafen und Fahrzeugoptionen',descMarket:'Getränke, Snacks und wichtige Produkte',listHelp:'Bitte unten auswählen',back:'Zurück',whatsapp:'Über WhatsApp kontaktieren',whatsappFloat:'WhatsApp',detail:'Details'},
  ru:{subtitle:'Выберите услугу',tour:'Туры',transfer:'Трансфер',market:'Маркет',descTour:'Лодочные туры, сафари и активности',descTransfer:'VIP трансфер, аэропорт и автомобили',descMarket:'Напитки, снеки и необходимые товары',listHelp:'Выберите ниже',back:'Назад',whatsapp:'Связаться в WhatsApp',whatsappFloat:'WhatsApp',detail:'Подробнее'},
  ar:{subtitle:'اختر الخدمة',tour:'الجولات',transfer:'النقل',market:'المتجر',descTour:'رحلات القوارب والسفاري والأنشطة',descTransfer:'نقل VIP والمطار وخيارات السيارات',descMarket:'مشروبات ووجبات خفيفة واحتياجات أساسية',listHelp:'اختر من الأسفل',back:'رجوع',whatsapp:'تواصل عبر واتساب',whatsappFloat:'واتساب',detail:'التفاصيل'}
};
const fallbackData={tour:[{id:'tour-1',title:'Sunset Boat Tour',short:'Denizde gün batımı ve yüzme molaları.',desc:'Sunset Boat Tour için fiyat, süre, kişi sayısı ve kalkış saatini bu alanda yönetebilirsin.',price:'40€',duration:'6 saat',image:placeholder,gallery:[placeholder],active:true,order:1}],transfer:[{id:'transfer-1',title:'Airport Transfer',short:'Havalimanı ve otel arası özel transfer.',desc:'Transfer detayları ve özel istekler için WhatsApp yönlendirmesi.',price:'25€',duration:'Tek yön',image:placeholder,gallery:[placeholder],active:true,order:1}],market:[{id:'market-1',title:'Gazlı İçecekler',short:'Coca Cola, Fanta, Sprite ve daha fazlası.',desc:`• Coca Cola
• Fanta
• Sprite
• Pepsi`,price:'',duration:'',image:placeholder,gallery:[placeholder],active:true,order:1}]};
const state={lang:'tr',activeCategory:null,activeItem:null,savedScrollY:0,galleryIndex:0,settings: {
  whatsappNumber: '',
  brandName: 'MK Tur Tourism'
}}
const categoryGrid=document.getElementById('categoryGrid');const listSection=document.getElementById('listSection');const itemList=document.getElementById('itemList');const activeCategoryTitle=document.getElementById('activeCategoryTitle');const activeCategoryDescription=document.getElementById('activeCategoryDescription');const backToCategories=document.getElementById('backToCategories');const langSelect=document.getElementById('langSelect');const detailModal=document.getElementById('detailModal');const closeModal=document.getElementById('closeModal');const modalImage=document.getElementById('modalImage');const modalTitle=document.getElementById('modalTitle');const modalDescription=document.getElementById('modalDescription');const modalMeta=document.getElementById('modalMeta');const modalPrice=document.getElementById('modalPrice');const modalWhatsapp=document.getElementById('modalWhatsapp');const galleryDots=document.getElementById('galleryDots');const galleryPrev=document.getElementById('galleryPrev');const galleryNext=document.getElementById('galleryNext');const lightbox=document.getElementById('lightbox');const lightboxImage=document.getElementById('lightboxImage');const closeLightbox=document.getElementById('closeLightbox');const whatsappFloat=document.getElementById('whatsappFloat');
function getSettings(){try{return JSON.parse(localStorage.getItem(SETTINGS_KEY))||state.settings}catch{return state.settings}}
function getData(){try{const stored=JSON.parse(localStorage.getItem(STORAGE_KEY));if(!stored||!Array.isArray(stored)) throw new Error('no data');return {tour:stored.filter(i=>i.category==='tour'&&i.active).sort((a,b)=>a.order-b.order),transfer:stored.filter(i=>i.category==='transfer'&&i.active).sort((a,b)=>a.order-b.order),market:stored.filter(i=>i.category==='market'&&i.active).sort((a,b)=>a.order-b.order)}}catch{return fallbackData}}
function setLanguage(lang){state.lang=lang;if (state.activeCategory) {
  selectCategory(state.activeCategory);
}const t=translations[lang];document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.getElementById('screenSubtitle').textContent=t.subtitle;document.getElementById('labelTour').textContent=t.tour;document.getElementById('labelTransfer').textContent=t.transfer;document.getElementById('labelMarket').textContent=t.market;document.getElementById('descTour').textContent=t.descTour;document.getElementById('descTransfer').textContent=t.descTransfer;document.getElementById('descMarket').textContent=t.descMarket;backToCategories.textContent=t.back;modalWhatsapp.textContent=t.whatsapp;whatsappFloat.textContent=t.whatsappFloat;if(state.activeCategory){activeCategoryTitle.textContent=t[state.activeCategory];activeCategoryDescription.textContent=t.listHelp;renderItems(state.activeCategory)}}
function renderItems(items){
  const t = translations[state.lang];
  const category = state.activeCategory;

  activeCategoryTitle.textContent = t[category];
  activeCategoryDescription.textContent = t.listHelp;

  itemList.innerHTML = items.map((item, index) => {
    const imageSrc =
      (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null)
      || item.image
      || placeholder;

    return `
      <article class="item-card" data-index="${index}">
        <img class="item-thumb" src="${imageSrc}" alt="${item.title}" />
        <div class="item-body">
          <div class="item-title-row">
            <h3>${item.title}</h3>
            ${item.price ? `<span class="price-badge">${item.price}</span>` : ''}
          </div>
          <p class="item-desc">${item.shortDescription ||
item.short_desc_tr ||
item.short ||
''}</p>
          <div class="item-footer">
            <span class="meta-inline">${item.duration || ''}</span>
            <button class="secondary-btn">${t.detail}</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  itemList.querySelectorAll('.item-card').forEach(card =>
  card.addEventListener('click', () => {
    try {
      state.savedScrollY = window.scrollY;
      const selectedItem = items[Number(card.dataset.index)];
      console.log('DETAY TIKLANDI:', selectedItem);
      openModal(selectedItem);
    } catch (err) {
      console.error('OPEN MODAL HATASI:', err);
      alert('Detay açılırken hata oluştu. Console hatasına bak.');
    }
  })
);
}
async function selectCategory(category){
  state.activeCategory = category;

  categoryGrid.classList.add('hidden');
  listSection.classList.remove('hidden');

  const items = await getCategoryItems(category, state.lang || 'tr');

  renderItems(items);

  listSection.scrollIntoView({behavior:'smooth',block:'start'});
}
function currentGallery(item){return item.gallery?.length?item.gallery:[item.image||placeholder]}
function renderGallery(item, nextIndex = 0) {
  const gallery =
    (Array.isArray(item?.images) && item.images.length ? item.images : null) ||
    (Array.isArray(item?.gallery) && item.gallery.length ? item.gallery : null) ||
    (item?.image ? [item.image] : [placeholder]);

  const safeIndex = Math.max(0, Math.min(nextIndex, gallery.length - 1));
  state.galleryIndex = safeIndex;

  if (modalImage) {
    modalImage.src = gallery[safeIndex];
    modalImage.alt = item?.title || 'Görsel';
  }

  if (galleryPrev) {
    galleryPrev.classList.toggle('hidden', gallery.length <= 1);
  }

  if (galleryNext) {
    galleryNext.classList.toggle('hidden', gallery.length <= 1);
  }
}

function openModal(item) {
  state.activeItem = item;
  state.galleryIndex = 0;

  if (modalTitle) {
    modalTitle.textContent = item?.title || '';
  }

  if (modalDescription) {
    modalDescription.textContent =
  item?.detailDescription ||
  item?.detail_desc_tr ||
  item?.desc ||
  '';
  }

  if (modalPrice) {
    modalPrice.textContent = item?.price || '';
  }

  if (typeof modalDuration !== 'undefined' && modalDuration) {
  modalDuration.textContent = item?.duration || '';
}

  if (typeof modalPeople !== 'undefined' && modalPeople) {
  modalPeople.textContent = item?.peopleCount || '';
}

if (typeof modalDeparture !== 'undefined' && modalDeparture) {
  modalDeparture.textContent = item?.departureTime || '';
}

  renderGallery(item, 0);

  if (detailModal) {
    detailModal.classList.remove('hidden');
  }

  document.body.classList.add('modal-open');
}
function closeModalFn(){detailModal.classList.add('hidden');detailModal.setAttribute('aria-hidden','true');window.scrollTo({top:state.savedScrollY,behavior:'instant'})}
function openWhatsApp(item) {
  const phone = state.settings?.whatsappNumber
  if (!phone) return

  const itemTitle = item?.title || ''
  const message = encodeURIComponent(
    itemTitle
      ? `Merhaba, ${itemTitle} hakkında bilgi almak istiyorum.`
      : 'Merhaba, bilgi almak istiyorum.'
  )

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
}
document.querySelectorAll('.category-card').forEach(btn=>btn.addEventListener('click',()=>selectCategory(btn.dataset.category)));backToCategories.addEventListener('click',()=>{state.activeCategory=null;listSection.classList.add('hidden');categoryGrid.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})});langSelect.addEventListener('change',e=>setLanguage(e.target.value));closeModal.addEventListener('click',closeModalFn);detailModal.addEventListener('click',e=>{if(e.target===detailModal)closeModalFn()});modalWhatsapp.addEventListener('click',()=>state.activeItem&&openWhatsApp(state.activeItem));whatsappFloat.addEventListener('click', () => {
  const phone = state.settings?.whatsappNumber
  if (!phone) return
  window.open(`https://wa.me/${phone}`, '_blank')
});galleryPrev.addEventListener('click',e=>{e.stopPropagation();if(state.activeItem) renderGallery(state.activeItem,state.galleryIndex-1)});galleryNext.addEventListener('click',e=>{e.stopPropagation();if(state.activeItem) renderGallery(state.activeItem,state.galleryIndex+1)});modalImage.addEventListener('click', () => {
  lightboxImage.src = modalImage.src;
  lightbox.classList.remove('hidden');
  closeModal.classList.add('hidden');
});lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
    closeModal.classList.remove('hidden');
  }
});closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  closeModal.classList.remove('hidden');
});async function init() {
  await loadSettingsIntoState();
  setLanguage('tr');
}

init();
