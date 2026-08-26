<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

definePageMeta({
  layout: false,
  middleware: [
    function (to, from) {
      const isUserLoggedIn = useState('selfServiceAuth', () => false)
      if (!isUserLoggedIn.value) {
        return navigateTo('/ticketing_dan_gate/self-service/login')
      }
    }
  ]
})

const router = useRouter()

// Use local state for self-service auth
const isUserLoggedIn = useState('selfServiceAuth', () => false)

// Mock user state (for UI display only)
const userName = ref('Sobat Coklat')
const points = ref(150)

// Slides
import slide1 from '~/assets/assets_POS/slide/slide1.jpg'
import slide2 from '~/assets/assets_POS/slide/slide2.jpg'
import slide3 from '~/assets/assets_POS/slide/slide3.jpg'
import slide4 from '~/assets/assets_POS/slide/slide4.jpg'

// Booking Widget State
const selectedService = ref('Tiket Masuk')
const bookingDate = ref('')
const visitType = ref('Regular')
const instansiName = ref('')
const picName = ref('')

const selectCategory = (categoryName: string) => {
  if (!isUserLoggedIn.value) {
    router.push('/ticketing_dan_gate/self-service/login')
    return
  }
  
  router.push({
    path: '/ticketing_dan_gate/self-service/booking',
    query: { category: categoryName }
  })
}

const handleQuickBook = () => {
  if (cart.value.length > 0) {
    showMobileCart.value = true
  } else {
    scrollToSection('pesan-tiket')
  }
}


// -- WAHANA & ENTRY TICKETS IMAGES --
import imgKolamDewasa from '~/assets/assets_POS/POS/wahana/kolam_renang_dewasa_idr.10k_freeterusan.jpg'
import imgKereta from '~/assets/assets_POS/POS/wahana/kereta_si_choco_idr.15k.jpg'
import imgAnimalFeeding from '~/assets/assets_POS/POS/wahana/Animal-Feeding_idr.2k.jpg'
import imgAnimalToys from '~/assets/assets_POS/POS/wahana/animal_toys_idr.15k_freeterusan.png'
import imgAtv from '~/assets/assets_POS/POS/wahana/atv_idr.25k.jpg'
import imgBomBomCar from '~/assets/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png'
import imgFlyingFox from '~/assets/assets_POS/POS/wahana/flying-fox_idr.20k.jpg'
import imgGolfCar from '~/assets/assets_POS/POS/wahana/golf_car_idr.25k.jpg'
import imgIstanaBalon from '~/assets/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png'
import imgKarausel from '~/assets/assets_POS/POS/wahana/Karausel_idr.15k.png'
import imgKeretaLokomotif from '~/assets/assets_POS/POS/wahana/kereta_lokomotif_idr.15k_freeterusan.jpg'
import imgKeretaMonorel from '~/assets/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png'
import imgKolamPemancingan from '~/assets/assets_POS/POS/wahana/kolam_pemancingan_idr.gratis.png'
import imgKolamRenangAnak from '~/assets/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png'
import imgKursiPijat from '~/assets/assets_POS/POS/wahana/Kursi-Pijat_15menit.jpg'
import imgMiniGolf from '~/assets/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg'
import imgMiniJeep from '~/assets/assets_POS/POS/wahana/mini_jeep_idr.25k.jpg'
import imgMiniSwinger from '~/assets/assets_POS/POS/wahana/mini_swinger_idr.15k.png'
import imgPanahan from '~/assets/assets_POS/POS/wahana/panahan_idr.15k_freeterusan.jpg'
import imgPancinganAnak from '~/assets/assets_POS/POS/wahana/pancingan_anak_idr.10k_freeterusan.jpg'
import imgPerahuCeria from '~/assets/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg'
import imgPerahuDayung from '~/assets/assets_POS/POS/wahana/Perahu_dayung_idr.15k_freeterusan.jpg'
import imgPlayground from '~/assets/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg'
import imgSepedaListrik from '~/assets/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png'
import imgSepedaUdara from '~/assets/assets_POS/POS/wahana/sepeda_udara_idr.20k.jpg'
import imgTerapiIkan from '~/assets/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg'
import imgTrampolin from '~/assets/assets_POS/POS/wahana/Trampolin_idr.10k_freeterusan.jpg'

// -- SEWA TEMPAT IMAGES --
import bale_coklat from '~/assets/assets_POS/POS/sewa_tempat/bale_coklat.jpg'
import coklat_caffe from '~/assets/assets_POS/POS/sewa_tempat/coklat_caffe.jpg'
import coklat_garden from '~/assets/assets_POS/POS/sewa_tempat/coklat_garden.jpg'
import joglo_jatimarto from '~/assets/assets_POS/POS/sewa_tempat/joglo_jatimarto.jpg'
import kampung_coklat_hall from '~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg'
import pbk from '~/assets/assets_POS/POS/sewa_tempat/private_business_keep(PBK).png'
import ruang_pertemuan from '~/assets/assets_POS/POS/sewa_tempat/ruang_pertemuan_R1.jpeg'
import taman_edel from '~/assets/assets_POS/POS/sewa_tempat/taman_edel.png'
import theobromine_hall from '~/assets/assets_POS/POS/sewa_tempat/theobromine_hall.jpg'
import trinitario_hall from '~/assets/assets_POS/POS/sewa_tempat/trinitario_hall.jpg'
import wisma_criollo from '~/assets/assets_POS/POS/sewa_tempat/wisma_criollo.jpg'

// -- EDUKASI IMAGES --
import paket_tk from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png'
import paket_sd from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'
import paket_smp from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png'
import paket_sma from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png'

// Mock Data Detail Tiket
import { useConfigSync } from '~/composables/useConfigSync'

const { ticketRates } = useConfigSync()

const categoryMap: Record<string, string> = {
  gate: 'Tiket Masuk',
  wahana: 'Wahana Permainan',
  edukasi: 'Wisata Edukasi',
  venue: 'Sewa Hall & Tempat'
}

const availableTickets = computed(() => {
  return ticketRates.value.filter(t => t.isActive).map(t => {
    let label = ''
    if (t.category === 'gate') label = 'Tiket Utama'
    else if (t.category === 'wahana') label = `IDR ${t.price}`
    else if (t.category === 'edukasi') label = 'Wisata Edukasi'
    else if (t.category === 'venue') label = 'Sewa Tempat'

    return {
      id: t.id,
      category: categoryMap[t.category] || 'Lainnya',
      name: t.name,
      label: label,
      subLabel: t.category === 'wahana' ? 'Tersedia' : '',
      price: t.price,
      desc: t.description || 'Fasilitas Kampung Coklat',
      image: t.imageUrl || imgKolamDewasa
    }
  })
})


const groupedTickets = computed(() => {
  const groups: Record<string, typeof availableTickets.value> = {}
  availableTickets.value.forEach(t => {
    if (!groups[t.category]) groups[t.category] = []
    groups[t.category].push(t)
  })
  return groups
})

// Slider Data
const sliderArticles = ref([
  {
    id: 1,
    image: slide1,
    title: 'Surga Coklat di Jantung Blitar',
    content: 'Nikmati hamparan kebun kakao yang sejuk sambil bersantai bersama keluarga. Kampung Coklat menawarkan pengalaman berwisata alam yang asri, asyik, dan sarat akan edukasi.'
  },
  {
    id: 2,
    image: slide2,
    title: 'Wahana Seru untuk Semua Umur',
    content: 'Dari kereta mini yang menggemaskan hingga kolam terapi ikan yang menenangkan. Selalu ada keceriaan yang menanti Anda di setiap sudut area wahana kami.'
  },
  {
    id: 3,
    image: slide3,
    title: 'Edukasi Budidaya Kakao',
    content: 'Ajak si kecil belajar langsung bagaimana merawat pohon kakao hingga mengolahnya menjadi coklat lezat yang siap dinikmati. Belajar sambil bermain di alam bebas!'
  },
  {
    id: 4,
    image: slide4,
    title: 'Momen Spesial Tak Terlupakan',
    content: 'Fasilitas lengkap mulai dari gazebo privat untuk keluarga hingga hall luas untuk acara pernikahan. Wujudkan momen berharga Anda dengan latar alam yang indah.'
  }
])

const currentSlideIndex = ref(0)
let slideInterval: any

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % sliderArticles.value.length
  }, 5000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})


// Cart & Payment Logic
const cart = ref<any[]>([])
const showPaymentModal = ref(false)
const paymentSuccess = ref(false)
const showMobileCart = ref(false)
const paymentMethod = ref('transfer')
const discountPercent = ref(0)
const discountAmount = ref(0)
const transactionId = ref('')
const showTicketModal = ref(false)
const showRombonganWarning = ref(false)

const showImageModal = ref(false)
const selectedImageUrl = ref('')

const openImageModal = (imageUrl: string) => {
  selectedImageUrl.value = imageUrl
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  selectedImageUrl.value = ''
}

const addToCart = (product: any) => {
  if (!isUserLoggedIn.value) {
    router.push('/ticketing_dan_gate/self-service/login')
    return
  }
  const existing = cart.value.find((item: any) => item.id === product.id)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

const removeFromCart = (id: string) => {
  cart.value = cart.value.filter((item: any) => item.id !== id)
}

const totalCartQuantity = computed(() => {
  return cart.value.reduce((total: number, item: any) => total + item.qty, 0)
})

const cartSubtotal = computed(() => {
  return cart.value.reduce((total: number, item: any) => total + (item.price * item.qty), 0)
})

const appliedDiscountPercent = computed(() => {
  if (visitType.value === 'Rombongan' && totalCartQuantity.value >= 20) {
    return 10 // 10% discount for Rombongan
  }
  return 0
})

const finalTotal = computed(() => {
  const base = cartSubtotal.value
  const discount = (base * appliedDiscountPercent.value) / 100
  return base - discount
})

const proceedToPayment = () => {
  if (visitType.value === 'Rombongan' && totalCartQuantity.value < 20) {
    showRombonganWarning.value = true
    return
  }
  showPaymentModal.value = true
  showMobileCart.value = false
}

const getCartTotal = () => {
  return finalTotal.value
}

const processPayment = () => {
  transactionId.value = 'TRX-' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
  paymentSuccess.value = true
  setTimeout(() => {
    showPaymentModal.value = false
    showTicketModal.value = true
  }, 1500)
}

const closeTicketModal = () => {
  showTicketModal.value = false
  cart.value = []
  paymentSuccess.value = false
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
}

// Navigation functionality
const activeMenu = ref('pesan-tiket')

const scrollToSection = (sectionId: string) => {
  activeMenu.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    // Account for fixed navbar height (80px)
    const y = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const logout = () => {
  isUserLoggedIn.value = false
  router.push('/ticketing_dan_gate/self-service/login')
}
</script>

<template>
  <div class="app-wrapper">
      
    <SelfServiceNavbar :activeMenu="activeMenu" />

    <!-- Hero Section with Curved Bottom -->
    <div class="hero-section">
      <div class="hero-bg" :style="{ backgroundImage: `url(${slide1})` }"></div>
      <div class="hero-overlay"></div>
      
      <div class="hero-content">
        <h1 class="hero-title">Temukan Manisnya Liburan Bersama Keluarga</h1>
        <p class="hero-subtitle">Eksplorasi wisata edukasi, wahana seru, dan nikmati coklat terbaik langsung dari kebunnya.</p>
      </div>

      <!-- Curve SVG matching the Disney reference (Convex Image) -->
      <div class="curve-container">
        <svg class="curve-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <!-- The white part covers the bottom corners, creating a convex shape for the image above -->
          <path d="M0,120 L0,0 C480,120 960,120 1440,0 L1440,120 Z" fill="#F8FAFC"></path>
        </svg>
      </div>
    </div>

    <!-- Floating Booking Widget -->
    <div class="widget-wrapper">
      <div class="booking-widget">
        
        <div class="widget-field">
          <label>Layanan</label>
          <div class="input-container">
            <select v-model="selectedService">
              <option value="Tiket Masuk">Tiket Masuk</option>
              <option value="Wahana Permainan">Wahana Permainan</option>
              <option value="Wisata Edukasi">Wisata Edukasi</option>
              <option value="Sewa Tempat">Sewa Hall / Tempat</option>
            </select>
          </div>
        </div>
        
        <div class="widget-divider"></div>

        <div class="widget-field">
          <label>Tanggal Kunjungan</label>
          <div class="input-container">
            <input type="date" v-model="bookingDate" />
          </div>
        </div>

        <div class="widget-divider"></div>

        <div class="widget-field">
          <label>Tipe Kunjungan</label>
          <div class="input-container">
            <select v-model="visitType">
              <option value="Regular">Regular (Individu/Keluarga)</option>
              <option value="Rombongan">Rombongan (Rombongan >20 Org)</option>
            </select>
          </div>
        </div>

        <div class="widget-action">
          <button class="cta-btn" @click="handleQuickBook">Pesan Sekarang</button>
        </div>

      </div>

      <!-- Extra fields for Rombongan -->
      <div v-if="visitType === 'Rombongan'" class="booking-widget rombongan-extra" style="margin-top: 16px;">
        <div class="widget-field">
          <label>Nama Instansi / Sekolah</label>
          <div class="input-container">
            <input type="text" v-model="instansiName" placeholder="Contoh: SD Negeri 1 Coklat" />
          </div>
        </div>
        <div class="widget-divider"></div>
        <div class="widget-field">
          <label>Nama Penanggung Jawab (PIC)</label>
          <div class="input-container">
            <input type="text" v-model="picName" placeholder="Contoh: Budi Santoso" />
          </div>
        </div>
      </div>

    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      
      <!-- Slider Artikel Singkat (Fasilitas) -->
      <div id="fasilitas" class="slider-section mt-12">
        <div class="section-header text-center">
          <h3 class="section-title">Eksplorasi Keajaiban Kami</h3>
          <p class="section-subtitle">Temukan cerita menarik dan keseruan dari setiap sudut Kampung Coklat</p>
        </div>

        <div class="slider-container">
          <div class="slider-track" :style="{ transform: `translateX(-${currentSlideIndex * 100}%)` }">
            
            <div v-for="article in sliderArticles" :key="article.id" class="slide-item">
              <div class="slide-content-wrapper">
                <div class="slide-image">
                  <img :src="article.image" :alt="article.title" />
                </div>
                <div class="slide-text">
                  <h4 class="slide-title">{{ article.title }}</h4>
                  <p class="slide-desc">{{ article.content }}</p>
                  <button class="slide-btn" @click="selectCategory('Tiket Masuk')">Jelajahi Sekarang</button>
                </div>
              </div>
            </div>

          </div>
          
          <div class="slider-indicators">
            <button v-for="(_, index) in sliderArticles" :key="index" 
                    class="indicator-dot" 
                    :class="{ active: currentSlideIndex === index }"
                    @click="currentSlideIndex = index">
            </button>
          </div>
        </div>
      </div>

      <!-- Daftar Detail Tiket per Kategori (Pesan Tiket) -->
      <div id="pesan-tiket" class="detailed-tickets-section mt-12">
        <div class="section-header text-center">
          <h3 class="section-title">Katalog Lengkap Kampung Coklat</h3>
          <p class="section-subtitle">Pesan berbagai kebutuhan liburan Anda dengan mudah dari satu tempat</p>
        </div>
        
        <!-- Loop per category -->
        <div v-for="(categoryTickets, categoryName) in groupedTickets" :key="categoryName" class="category-block">
          <div class="category-header">
            <h4 class="category-title">{{ categoryName }}</h4>
            <div class="category-line"></div>
          </div>

          <div class="dt-grid">
            <div v-for="ticket in categoryTickets" :key="ticket.id" class="dt-card">
              <div class="dt-img-container" :class="{ 'dt-img-edu': categoryName === 'Wisata Edukasi' }">
                <img :src="ticket.image" :alt="ticket.name" class="dt-img" />
              </div>
              <div class="dt-body">
                <h4 class="dt-title">{{ ticket.name }}</h4>
                <p class="dt-desc" v-html="ticket.desc"></p>
                <div class="dt-footer">
                  <div class="dt-price">
                    <span class="dt-price-val">{{ formatRupiah(ticket.price) }}</span>
                    <span class="dt-price-unit">/org</span>
                  </div>
                  <button class="dt-btn-add" @click="addToCart(ticket)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>



    </div>

    <!-- Footer Section (Membership) -->
    <SelfServiceFooter />

  </div>

    <!-- Warning Modal Rombongan -->
    <div class="modal-overlay" v-if="showRombonganWarning" @click="showRombonganWarning = false" style="z-index: 2000;">
      <div class="cart-widget elegant-shadow" @click.stop style="margin: auto; width: 90%; max-width: 400px; padding: 24px; text-align: center;">
        <div style="color: #f59e0b; margin-bottom: 16px;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <h3 style="margin-bottom: 12px; color: #1f2937; font-size: 20px;">Peringatan Rombongan</h3>
        <p style="color: #4b5563; font-size: 15px; margin-bottom: 24px; line-height: 1.5;">
          Pesanan rombongan membutuhkan minimal <strong>20 orang</strong>. Silakan tambah jumlah tiket atau ubah tipe kunjungan ke <strong>Regular</strong> di halaman utama.
        </p>
        <button class="btn-primary btn-block" @click="showRombonganWarning = false" style="border-radius: 12px;">
          Mengerti
        </button>
      </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal-overlay cart-modal-overlay" v-if="showMobileCart" @click="showMobileCart = false" style="z-index: 1000;">
      <div class="cart-widget elegant-shadow" @click.stop style="margin: auto; width: 90%; max-width: 450px;">
        <div class="cart-header" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <h3>Keranjang Anda</h3>
            <span v-if="visitType === 'Rombongan'" class="badge-rombongan">PAKET ROMBONGAN</span>
          </div>
          <button @click="showMobileCart = false" style="background: none; border: none; font-size: 28px; line-height: 1; cursor: pointer; color: #2c1a13;">&times;</button>
        </div>
        
        <div v-if="cart.length === 0" class="empty-cart">
          <div class="empty-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <p>Belum ada tiket yang dipilih.<br>Tambahkan tiket dari daftar.</p>
        </div>
        
        <div v-else class="cart-items">
          <div class="cart-item" v-for="item in cart" :key="item.id">
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-qty">{{ item.qty }}x</span>
            </div>
            <div class="item-price-action">
              <span class="item-subtotal">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
              <button class="btn-remove" @click="removeFromCart(item.id)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-footer">
          <div v-if="appliedDiscountPercent > 0" class="cart-total-row" style="color: #10b981; font-weight: 500; font-size: 14px; margin-bottom: 4px;">
            <span>Diskon Rombongan ({{ appliedDiscountPercent }}%)</span>
            <span>- Rp {{ ((cartSubtotal * appliedDiscountPercent) / 100).toLocaleString('id-ID') }}</span>
          </div>
          <div class="cart-total-row">
            <span>Total Tagihan</span>
            <span class="total-amount">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
          </div>
          <button class="btn-primary btn-block btn-checkout" @click="proceedToPayment" :disabled="cart.length === 0">
            Pilih Pembayaran
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Floating Cart Button -->
      <button class="floating-cart-btn" @click="showMobileCart = true" v-if="cart.length > 0">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <div class="cart-btn-text">
          <span style="font-weight: 600; font-size: 15px;">Lihat Keranjang ({{ cart.length }})</span>
          <span style="font-weight: bold; font-size: 18px;">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
        </div>
      </button>
    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-content" @click.stop>
        <button class="close-image-btn" @click="closeImageModal">&times;</button>
        <img :src="selectedImageUrl" alt="Full Image" class="modal-full-image" style="max-width: 100%; height: auto; display: block;" />
      </div>
    </div>

    <!-- Payment Modal (2-Column Layout) -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="payment-modal-container">
        
        <div class="pm-layout">
          <!-- Left Column: Payment Methods -->
          <div class="pm-left-panel">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              </div>
              <h2>Metode Pembayaran</h2>
            </div>
            
            <div class="pm-methods-container">
              <!-- TRANSFER -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'transfer'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Transfer Bank / Virtual Account</span>
                    <span class="pm-method-desc">Verifikasi otomatis melalui mutasi</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="transfer" checked name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'transfer'">
                  <div class="pm-bank-list">
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><div class="bank-logo bca">BCA</div> BCA</div>
                      <input type="radio" name="bank" checked class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><div class="bank-logo mandiri">MDR</div> Mandiri</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><div class="bank-logo bni">BNI</div> BNI</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><div class="bank-logo bri">BRI</div> BRI</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                  </div>
                </div>
              </label>

              <!-- QRIS -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'qris'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">QRIS</span>
                    <span class="pm-method-desc">Bayar menggunakan E-Wallet / Mobile Banking</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="qris" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'qris'">
                  <div class="pm-qris-box">
                    <div class="pm-qr-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#5c3d2e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="3"></rect><rect x="14" y="7" width="3" height="3"></rect><rect x="7" y="14" width="3" height="3"></rect><rect x="14" y="14" width="3" height="3"></rect></svg>
                    </div>
                    <p>Silakan scan QRIS di atas.</p>
                  </div>
                </div>
              </label>

              <!-- DEBIT/KREDIT -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'debit'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Kartu Debit / Kredit (EDC)</span>
                    <span class="pm-method-desc">Gesek kartu pada mesin EDC Kasir</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="debit" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'debit'">
                  <div class="pm-input-group">
                    <label>Nomor Referensi EDC (Opsional)</label>
                    <input type="text" class="pm-input" placeholder="Contoh: 123456" />
                  </div>
                </div>
              </label>
            </div>

            <button class="pm-btn-primary" @click="processPayment">BAYAR & CETAK STRUK</button>
            <button class="pm-btn-secondary" @click="showPaymentModal = false">Batal</button>
          </div>

          <!-- Right Column: Order Summary -->
          <div class="pm-right-panel">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h2>Detail Pesanan</h2>
            </div>
            
            <div style="padding: 16px; background: #f8fafc; border-radius: 12px; margin-bottom: 20px; font-size: 14px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #64748b; font-weight: 600;">Tanggal Kunjungan:</span>
                <span style="color: #0f172a; font-weight: 700;">{{ bookingDate ? formatDate(bookingDate) : 'Hari Ini' }}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b; font-weight: 600;">Tipe Kunjungan:</span>
                <span style="color: #0f172a; font-weight: 700;">{{ visitType }}</span>
              </div>
            </div>

            <div class="pm-order-items">
              <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="pm-order-item">
                <div class="pm-item-row">
                  <span class="pm-item-name">{{ item.name }}</span>
                  <span class="pm-item-price">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
                </div>
                <div class="pm-item-qty-row">
                  <span class="pm-item-qty">{{ item.qty }}x</span> <span class="pm-item-unit">@ Rp {{ item.price.toLocaleString('id-ID') }}</span>
                </div>
              </div>

              <!-- Discount for B2B -->
              <div v-if="typeof discountPercent !== 'undefined' && discountPercent > 0" class="pm-order-item pm-discount-item">
                <div class="pm-item-row">
                  <span class="pm-item-name">Diskon ({{ discountPercent }}%)</span>
                  <span class="pm-item-price">- Rp {{ discountAmount.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>

            <div class="pm-order-footer">
              <div class="pm-total-box">
                <div class="pm-total-row">
                  <span class="pm-total-label">Total Tagihan</span>
                  <span class="pm-total-value">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Ticket/Success Modal -->
    <div class="modal-overlay" v-if="showTicketModal">
      <div class="ticket-modal-container">
        
        <div class="ticket-header">
          <div class="ticket-success-check">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2>Pembayaran Berhasil!</h2>
          <p>Terima kasih, berikut adalah E-Tiket Anda</p>
        </div>

        <div class="ticket-body">
          <div class="ticket-qr-section">
            <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TIX-' + Math.floor(Math.random() * 1000000000)" alt="QR Code" class="ticket-qr-image" />
            <p class="ticket-scan-instruction">Scan QR Code ini di Gate Masuk</p>
          </div>
          
          <div class="ticket-divider">
            <div class="cutout-left"></div>
            <div class="cutout-right"></div>
          </div>

          <div class="ticket-details-section">
            <h3>Rincian Akses ({{ cart.reduce((acc, item) => acc + item.qty, 0) }} Item)</h3>
            <div class="ticket-items-list">
              <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="ticket-item">
                <div class="ticket-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#27ae60" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="ticket-item-info">
                  <span class="ticket-item-name">{{ item.name }}</span>
                  <span class="ticket-item-qty">{{ item.qty }}x Akses Penumpang/Peserta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ticket-footer" style="display: flex; gap: 10px;">
          <button type="button" class="pm-btn-secondary" onclick="window.print()" style="margin-top: 0; flex: 1; border: 2px solid #f59e0b; color: #f59e0b; font-weight: 800; padding: 16px; border-radius: 8px; text-transform: uppercase;">CETAK TIKET</button>
          <button type="button" class="pm-btn-primary" @click="closeTicketModal" style="margin-top: 0; flex: 1;">SELESAI</button>
        </div>

      </div>
    </div>
</template>

<style scoped>
.floating-cart-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: linear-gradient(135deg, #f29727, #e67e22);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 15px 35px rgba(242, 151, 39, 0.4), 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  z-index: 900;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.floating-cart-btn:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(242, 151, 39, 0.5), 0 8px 20px rgba(0,0,0,0.15);
}

.cart-btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .floating-cart-btn {
    bottom: 20px;
    right: 20px;
    left: 20px;
    padding: 16px 24px;
    border-radius: 16px;
  }
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.cart-widget {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  animation: slideUpFade 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Main Layout */
.app-wrapper {
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.nav-container {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 24px;
}

@media (min-width: 1200px) {
  .nav-container { padding: 0 5%; }
}

.logo {
  justify-self: start;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 48px;
  object-fit: contain;
}

.nav-links {
  display: none;
  gap: 32px;
  justify-self: center;
}

@media (min-width: 992px) {
  .nav-links { display: flex; }
}

.nav-link {
  text-decoration: none;
  color: #4B5563;
  font-weight: 600;
  font-size: 15px;
  transition: color 0.2s;
}

.nav-link:hover { color: #D97706; }
.nav-link.active { color: #D97706; }

.nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-self: end;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.user-greeting {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.user-points {
  font-size: 12px;
  font-weight: 700;
  color: #D97706;
}

.profile-btn {
  background: #F3F4F6;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.2s;
}

.profile-btn:hover {
  background: #E5E7EB;
  color: #111827;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 600px; /* Tall hero like Disney */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center 30%;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at center, rgba(44, 26, 19, 0.4) 0%, rgba(20, 10, 5, 0.8) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  color: #ffffff;
  max-width: 900px;
  padding: 0 24px;
  margin-top: -60px; /* Push up a bit to balance the curve */
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  margin: 0 0 20px 0;
  color: #ffffff;
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0,0,0,0.5);
  line-height: 1.15;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 20px;
  color: #f8fafc;
  font-weight: 500;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-section { height: 500px; }
  .hero-title { font-size: 32px; }
  .hero-subtitle { font-size: 15px; }
}

.curve-container {
  position: absolute;
  bottom: -2px; /* Prevent sub-pixel gap */
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 4;
}

.curve-svg {
  display: block;
  width: 100%;
  height: 8vw; /* Scales with screen width */
  min-height: 50px;
  max-height: 120px;
}

/* Floating Booking Widget */
.widget-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: -100px auto 0; /* Pull up over the curve */
  padding: 0 24px;
}

.booking-widget {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  padding: 16px;
}

@media (min-width: 992px) {
  .booking-widget {
    flex-direction: row;
    align-items: center;
    border-radius: 100px; /* Pill shape on desktop */
    padding: 12px 12px 12px 32px;
  }
}

.booking-widget.rombongan-extra {
  margin-top: 16px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.badge-rombongan {
  background: #f59e0b;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.widget-field {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.widget-field label {
  font-size: 12px;
  font-weight: 700;
  color: #0369A1; /* Brand accent similar to Disney blue */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-container select,
.input-container input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  padding: 4px 0;
  outline: none;
  font-family: inherit;
  cursor: pointer;
}

.widget-divider {
  display: none;
  width: 1px;
  height: 40px;
  background-color: #E5E7EB;
  margin: 0 16px;
}

@media (min-width: 992px) {
  .widget-divider { display: block; }
}

.guest-field {
  flex: 0.8;
}

.guest-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
  cursor: pointer;
}

.guest-val {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.widget-action {
  margin-top: 16px;
}

@media (min-width: 992px) {
  .widget-action {
    margin-top: 0;
    margin-left: 16px;
  }
}

.cta-btn {
  width: 100%;
  background: #0284C7; /* Disney-like blue */
  color: white;
  border: none;
  border-radius: 100px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.cta-btn:hover {
  background: #0369A1;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(2, 132, 199, 0.3);
}

.widget-footer {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
}

.text-muted { color: #6B7280; margin-right: 8px;}
.text-link { color: #0284C7; font-weight: 700; text-decoration: none; }
.text-link:hover { text-decoration: underline; }

/* Main Content Area */
.main-content {
  max-width: 1600px;
  margin: 60px auto 0;
  padding: 0 24px;
}

@media (min-width: 1200px) {
  .main-content { padding: 0 5%; }
}

.text-center { text-align: center; }
.mt-12 { margin-top: 60px; }

.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
}

.section-subtitle {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
}

/* Slider Section */
.slider-section {
  max-width: 1200px;
  margin: 60px auto 0;
}

.slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: white;
  box-shadow: 0 12px 32px rgba(0,0,0,0.05);
  border: 1px solid #F1F5F9;
}

.slider-track {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-item {
  min-width: 100%;
  box-sizing: border-box;
}

.slide-content-wrapper {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .slide-content-wrapper {
    flex-direction: row;
    height: 400px;
  }
}

.slide-image {
  flex: 1;
  overflow: hidden;
  position: relative;
  min-height: 250px;
}

.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.slide-item:hover .slide-image img {
  transform: scale(1.05);
}

.slide-text {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  position: relative;
}

.slide-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 16px 0;
}

.slide-desc {
  font-size: 16px;
  color: #64748B;
  line-height: 1.8;
  margin: 0 0 24px 0;
}

.slide-btn {
  align-self: flex-start;
  padding: 12px 24px;
  background: #F59E0B;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.slide-btn:hover {
  background: #D97706;
}

.slider-indicators {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

@media (min-width: 768px) {
  .slider-indicators {
    left: 75%;
  }
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #CBD5E1;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.indicator-dot.active {
  background: #F59E0B;
  width: 24px;
  border-radius: 8px;
}

.category-block {
  margin-bottom: 48px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category-title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  white-space: nowrap;
}

.category-line {
  height: 2px;
  flex: 1;
  background: #E2E8F0;
  border-radius: 2px;
}

/* Detailed Tickets Grid */
.dt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 576px) {
  .dt-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}

@media (min-width: 992px) {
  .dt-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
}

.dt-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  border: 1px solid #F1F5F9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.dt-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.08);
  border-color: #E2E8F0;
}

.dt-img-container {
  height: 120px;
  position: relative;
  overflow: hidden;
}
@media (min-width: 576px) {
  .dt-img-container {
    height: 180px;
  }
}

.dt-img-container.dt-img-edu {
  height: auto;
  min-height: 250px;
}

.dt-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dt-img-edu .dt-img {
  height: auto;
  object-fit: contain;
}

.dt-card:hover .dt-img {
  transform: scale(1.05);
}



.dt-body {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
@media (min-width: 576px) {
  .dt-body { padding: 20px; }
}

.dt-title {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px 0;
  line-height: 1.2;
}
@media (min-width: 576px) {
  .dt-title { font-size: 18px; margin: 0 0 8px 0; line-height: 1.4; }
}

.dt-desc {
  display: none;
}
@media (min-width: 576px) {
  .dt-desc {
    display: block;
    font-size: 13px;
    color: #64748B;
    margin: 0 0 20px 0;
    line-height: 1.5;
    flex: 1;
  }
}

.dt-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed #E2E8F0;
}

.dt-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.dt-price-val {
  font-size: 14px;
  font-weight: 900;
  color: #D97706;
}
@media (min-width: 576px) {
  .dt-price-val { font-size: 20px; }
}

.dt-price-unit {
  font-size: 10px;
  font-weight: 600;
  color: #94A3B8;
}
@media (min-width: 576px) {
  .dt-price-unit { font-size: 12px; }
}

.dt-btn-add {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #0284C7;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.dt-btn-add svg {
  width: 14px;
  height: 14px;
}
@media (min-width: 576px) {
  .dt-btn-add {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  .dt-btn-add svg {
    width: 20px;
    height: 20px;
  }
}

.dt-btn-add:hover {
  background: #0369A1;
  transform: scale(1.05);
}

/* Footer Section */
.kc-footer {
  margin-top: 80px;
}

.footer-bottom {
  background-color: #251814;
  padding: 32px 5%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.fb-brand {
  font-size: 20px;
  font-weight: 800;
  color: #F59E0B;
  margin: 0 0 8px 0;
}

.fb-desc {
  font-size: 14px;
  color: #9CA3AF;
  margin: 0;
}

.fb-right p {
  font-size: 14px;
  color: #9CA3AF;
  margin: 0;
}
/* Promo Section */
.promo-section {
  max-width: 1200px;
  margin: 80px auto 40px;
}

.promo-banner {
  background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
  gap: 24px;
  box-shadow: 0 20px 40px rgba(2, 132, 199, 0.2);
}

@media (min-width: 768px) {
  .promo-banner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 40px 56px;
  }
}

.promo-content h3 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 12px 0;
}

.promo-content p {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
  line-height: 1.6;
}

.promo-btn {
  background: #FCD34D;
  color: #92400E;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.3s, box-shadow 0.3s;
}

.promo-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(252, 211, 77, 0.4);
}



.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}
.modal-card {
  background: #fff;
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.modal-header {
  background: #2c1a13;
  color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h2 { margin: 0; font-size: 18px; color: #fff;}
.close-btn { background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; }
.modal-body { padding: 30px 20px; text-align: center; }
.payment-subtitle { color: #666; margin-bottom: 10px; }
.total-box { font-size: 28px; font-weight: bold; color: #f29727; margin-bottom: 20px; }
.qris-box { margin-bottom: 20px; }
.help-text { font-size: 13px; color: #888; margin-bottom: 20px; }
.success-icon { font-size: 60px; margin-bottom: 10px; }

/* E-Ticket Styles */
.ticket-card {
  background: #fff;
  width: 380px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

.ticket-header {
  background: #2c1a13;
  color: #fff;
  padding: 20px;
  text-align: center;
  border-bottom: 2px dashed #e0e0e0;
}

.ticket-body {
  padding: 30px 25px 20px 25px;
  text-align: center;
}

.ticket-status {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
}

.ticket-qr-container {
  margin-bottom: 25px;
}

.ticket-id {
  margin-top: 10px;
  font-family: monospace;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  letter-spacing: 1px;
}

.ticket-details {
  text-align: left;
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-label {
  color: #888;
  font-size: 13px;
}

.detail-value {
  color: #2c1a13;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  max-width: 60%;
}

.ticket-divider {
  border-top: 2px dashed #ddd;
  margin: 20px 0;
  position: relative;
}

.ticket-items {
  text-align: left;
}

.ticket-footer {
  background: #fdfbf7;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: #666;
  border-top: 1px solid #eee;
}

.cutout {
  position: absolute;
  top: 76px; /* Position exactly at the border-bottom of ticket-header */
  width: 30px;
  height: 30px;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  z-index: 10;
}

.cutout-left {
  left: -15px;
}

.cutout-right {
  right: -15px;
}

.cart-widget {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.cart-header {
  background: #fcfaf8;
  padding: 20px;
  border-bottom: 1px solid #eee;
}
.cart-header h3 {
  margin: 0;
  font-family: 'Georgia', serif;
  color: #2c1a13;
  font-size: 20px;
}

.empty-cart {
  padding: 40px 20px;
  text-align: center;
  color: #999;
}
.empty-icon {
  margin-bottom: 15px;
  color: #ccc;
}

.cart-items {
  max-height: 400px;
  overflow-y: auto;
}
.cart-item {
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.item-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.item-name {
  font-weight: 600;
  color: #2c1a13;
  font-size: 15px;
}
.item-qty {
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
}
.item-price-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-subtotal {
  color: #666;
  font-size: 15px;
}
.btn-remove {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-remove:hover { color: #d32f2f; }

.cart-footer {
  padding: 20px;
  background: #fcfaf8;
  border-top: 1px solid #eee;
}
.cart-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}
.total-amount {
  font-size: 24px;
  font-weight: bold;
  color: #f29727;
}

.btn-checkout {
  height: 50px !important;
  font-size: 16px !important;
  background-color: #2c1a13 !important;
  border-radius: 6px !important;
  color: #fff !important;
}
.btn-checkout:disabled {
  background-color: #ccc !important;
  cursor: not-allowed;
}

/* Image Modal */
.image-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  backdrop-filter: blur(5px);
  padding: 20px;
}
.image-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}
.modal-full-image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.close-image-btn {
  position: absolute;
  top: -40px;
  right: -20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  z-index: 3001;
}
/* Removed category grid styles */

/* Modal */

.payment-modal-container { background: transparent; width: 1050px; max-width: 95vw; height: 90vh; max-height: 750px; display: flex; animation: modalFadeIn 0.3s ease; }
@keyframes modalFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.pm-layout { display: flex; flex: 1; gap: 20px; overflow: hidden; }
.pm-left-panel, .pm-right-panel { background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); display: flex; flex-direction: column; overflow-y: auto; }
.pm-left-panel { flex: 6; }
.pm-right-panel { flex: 4; }

.pm-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
.pm-icon-circle { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.pm-icon-circle.bg-green { background: #27ae60; }
.pm-section-header h2 { margin: 0; font-size: 20px; font-weight: 900; color: #5c3d2e; }

.pm-methods-container { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.pm-method-card { display: block; border: 1px solid #eaeaea; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; background: #fff; }
.pm-method-card:hover { border-color: #d1d5db; }
.pm-method-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; }
.pm-method-info { display: flex; flex-direction: column; gap: 4px; }
.pm-method-title { font-weight: 800; color: #333; font-size: 15px; }
.pm-method-desc { font-size: 12px; color: #999; }
.pm-radio-custom { appearance: none; width: 22px; height: 22px; border: 2.5px solid #d1d5db; border-radius: 50%; outline: none; cursor: pointer; position: relative; margin: 0; }
.pm-radio-custom:checked { border-color: #f59e0b; }
.pm-radio-custom:checked::after { content: ''; position: absolute; top: 4px; left: 4px; width: 10px; height: 10px; background: #f59e0b; border-radius: 50%; }

.pm-method-body { padding: 0 20px 20px 20px; border-top: 1px dashed #eee; margin-top: 5px; padding-top: 15px; }
.pm-input-group label { display: block; font-size: 13px; color: #555; font-weight: 600; margin-bottom: 8px; }
.pm-input { width: 100%; padding: 12px 15px; font-size: 16px; font-weight: bold; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; transition: border 0.2s; box-sizing: border-box; }
.pm-input:focus { border-color: #f59e0b; }
.pm-change-info { margin-top: 15px; font-size: 15px; color: #2e7d32; background: #e8f5e9; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9; }

.pm-bank-list { display: flex; flex-direction: column; gap: 8px; }
.pm-bank-option { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #eaeaea; border-radius: 8px; cursor: pointer; }
.pm-bank-name { display: flex; align-items: center; gap: 12px; font-weight: 700; color: #333; }
.bank-logo { font-size: 10px; font-weight: 900; color: #fff; padding: 3px 6px; border-radius: 4px; font-style: italic; }
.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }

.pm-qris-box { text-align: center; color: #555; }
.pm-qr-placeholder { width: 120px; height: 120px; margin: 0 auto 10px auto; background: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 16px 16px; border: 4px solid #eaeaea; display: flex; align-items: center; justify-content: center; }

.pm-btn-primary { width: 100%; background: #f59e0b; color: #fff; font-size: 16px; font-weight: 800; padding: 16px; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
.pm-btn-primary:hover { background: #d97706; transform: translateY(-2px); }
.pm-btn-secondary { width: 100%; background: transparent; color: #888; font-size: 14px; font-weight: 600; padding: 12px; border: none; cursor: pointer; margin-top: 5px; }
.pm-btn-secondary:hover { color: #333; }

/* Order Summary */
.pm-order-items { flex: 1; display: flex; flex-direction: column; gap: 15px; }
.pm-order-item { border-bottom: 1px dashed #e5e7eb; padding-bottom: 15px; }
.pm-order-item:last-child { border-bottom: none; }
.pm-item-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
.pm-item-name { font-weight: 700; color: #333; font-size: 14px; }
.pm-item-price { font-weight: 700; color: #333; font-size: 14px; }
.pm-item-qty-row { font-size: 13px; color: #999; font-weight: 500; }
.pm-item-qty { font-weight: 800; color: #666; }
.pm-discount-item .text-orange { color: #e65100; }

.pm-order-footer { margin-top: auto; padding-top: 10px; }
.pm-total-box { border: 1px dashed #ccc; border-radius: 8px; padding: 15px; background: #fdfdfd; }
.pm-total-row { display: flex; justify-content: space-between; align-items: center; }
.pm-total-label { font-size: 16px; font-weight: 800; color: #5c3d2e; }
.pm-total-value { font-size: 20px; font-weight: 900; color: #333; }

/* E-Ticket Modal Styles */
.ticket-modal-container { background: #fff; width: 420px; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: modalFadeIn 0.3s ease; position: relative; }
.ticket-header { background: #27ae60; padding: 30px 20px 20px 20px; text-align: center; color: #fff; }
.ticket-success-check { width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px auto; }
.ticket-header h2 { margin: 0 0 5px 0; font-size: 22px; font-weight: 800; }
.ticket-header p { margin: 0; font-size: 14px; opacity: 0.9; }

.ticket-body { padding: 25px; background: #fff; }
.ticket-qr-section { text-align: center; margin-bottom: 25px; }
.ticket-qr-image { width: 160px; height: 160px; border: 4px solid #f4f6f8; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.ticket-scan-instruction { font-size: 14px; font-weight: 700; color: #5c3d2e; margin-top: 12px; text-transform: uppercase; letter-spacing: 1px; }

.ticket-divider { height: 0; border-top: 2px dashed #e2e8f0; position: relative; margin: 10px 0 25px 0; }
.cutout-left, .cutout-right { width: 24px; height: 24px; background: rgba(0,0,0,0.5); border-radius: 50%; position: absolute; top: -12px; }
.cutout-left { left: -37px; }
.cutout-right { right: -37px; }

.ticket-details-section h3 { margin: 0 0 15px 0; font-size: 15px; font-weight: 800; color: #5c3d2e; text-transform: uppercase; }
.ticket-items-list { display: flex; flex-direction: column; gap: 12px; max-height: 200px; overflow-y: auto; }
.ticket-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: #fdfdfd; border: 1px solid #eaeaea; border-radius: 8px; }
.ticket-item-icon { margin-top: 2px; }
.ticket-item-info { display: flex; flex-direction: column; gap: 4px; }
.ticket-item-name { font-weight: 700; font-size: 14px; color: #333; }
.ticket-item-qty { font-size: 12px; font-weight: 600; color: #7f8c8d; }

.ticket-footer { padding: 0 25px 25px 25px; background: #fff; }
@media print {
  @page { margin: 0; }
  html, body { margin: 0; padding: 0; background: #fff; color: #000; height: auto !important; min-height: auto !important; overflow: visible !important; }
  body * { visibility: hidden !important; }
  .ticket-modal-container, .ticket-modal-container * { visibility: visible !important; color: #000 !important; }
  
  /* Reset container for thermal printer (approx 80mm / 300px width) */
  .ticket-modal-container { 
    position: absolute; left: 0; top: 0; margin: 0; padding: 5px; 
    border: none; box-shadow: none; width: 100%; max-width: 300px; 
    height: auto; background: #fff; border-radius: 0; 
  }
  
  /* Hide non-essential UI elements */
  .ticket-footer, .pm-layout, .payment-modal-container, .ticket-success-check, .cutout-left, .cutout-right, .ticket-item-icon { display: none !important; }
  
  /* Compact Header */
  .ticket-header { padding: 10px 0 5px 0 !important; background: transparent !important; color: #000 !important; text-align: center; }
  .ticket-header h2 { font-size: 16px !important; margin: 0 0 2px 0 !important; color: #000 !important; }
  .ticket-header p { font-size: 10px !important; margin: 0 !important; color: #000 !important; }

  /* Compact Body */
  .ticket-body { padding: 5px 0 !important; }
  
  /* Smaller QR Code */
  .ticket-qr-section { margin-bottom: 10px !important; text-align: center; }
  .ticket-qr-image { width: 120px !important; height: 120px !important; border: none !important; box-shadow: none !important; margin: 0 auto; display: block; }
  .ticket-scan-instruction { font-size: 10px !important; margin-top: 5px !important; }

  /* Divider */
  .ticket-divider { border-top: 1px dashed #000 !important; margin: 8px 0 !important; }

  /* Ticket Details */
  .ticket-details-section h3 { font-size: 12px !important; margin: 0 0 5px 0 !important; text-align: center; }
  .ticket-items-list { max-height: none !important; gap: 4px !important; }
  
  /* Compact Items */
  .ticket-item { padding: 4px 0 !important; background: transparent !important; border: none !important; border-bottom: 1px dotted #ccc !important; border-radius: 0 !important; align-items: center; justify-content: center; text-align: center; }
  .ticket-item:last-child { border-bottom: none !important; }
  .ticket-item-info { width: 100%; align-items: center; gap: 2px !important; }
  .ticket-item-name { font-size: 12px !important; }
  .ticket-item-qty { font-size: 10px !important; }
}

/* Summary Card Styling */
.summary-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  margin-top: 10px;
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #e5e7eb;
}
.summary-name {
  font-weight: 800;
  color: #1f2937;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.member-badge {
  background: #f59e0b;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}
.btn-edit-form {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-edit-form:hover {
  background: #e5e7eb;
  color: #1f2937;
}
.summary-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
}
.detail-date {
  background: #fffbeb;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #fef3c7;
  color: #92400e;
  margin-top: 4px;
  width: fit-content;
}
.detail-date strong {
  font-weight: 700;
  color: #b45309;
}
</style>
