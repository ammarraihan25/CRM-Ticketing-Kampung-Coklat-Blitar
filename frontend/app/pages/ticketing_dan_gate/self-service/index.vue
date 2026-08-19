<script setup lang="ts">
import { ref } from 'vue'

const cart = ref<any[]>([])
const selectedDate = ref('')
const showPaymentModal = ref(false)
const paymentSuccess = ref(false)

const addToCart = (product: any) => {
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.qty++
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

const removeFromCart = (id: string) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

const getCartTotal = () => {
  return cart.value.reduce((total, item) => total + (item.price * item.qty), 0)
}

import imgKolamDewasa from '~/assets/assets_POS/POS/wahana/kolam_renang_dewasa_idr.10k_freeterusan.jpg'
import imgKereta from '~/assets/assets_POS/POS/wahana/kereta_si_choco_idr.15k.jpg'

const entryTickets = [
  { id: 'reg', name: 'Tiket Reguler', label: '[PROMO] WEEKDAY', price: 20000, desc: 'Akses masuk area wisata Kampung Coklat. Menikmati indahnya kebun kakao dan edukasi dasar.', image: imgKolamDewasa },
  { id: 'ter', name: 'Tiket Terusan', label: 'ALL ACCESS', price: 75000, desc: 'Akses masuk bebas + 5 Wahana Pilihan sepuasnya untuk pengalaman liburan tanpa batas.', image: imgKereta }
]

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


const wahanaTickets = [
  { id: 'animal-feeding', name: 'Animal Feeding', label: 'IDR. 2K / Orang', price: 2000, desc: 'Bermain sambil belajar dan berinteraksi langsung dengan hewan-hewan lucu.', image: imgAnimalFeeding },
  { id: 'animal-toys', name: 'Animal Toys', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Mainan hewan tunggang yang seru untuk anak-anak mengelilingi area.', image: imgAnimalToys },
  { id: 'atv', name: 'ATV Ride', label: 'IDR. 25K / Orang', price: 25000, desc: 'Pacu adrenalin Anda di lintasan ATV Kampung Coklat yang menantang.', image: imgAtv },
  { id: 'bom-bom-car', name: 'Bom Bom Car', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Serunya tabrakan aman dan menyenangkan di arena bom bom car kami.', image: imgBomBomCar },
  { id: 'flying-fox', name: 'Flying Fox', label: 'IDR. 20K / Orang', price: 20000, desc: 'Meluncur bebas melintasi rindangnya kebun kakao dari ketinggian.', image: imgFlyingFox },
  { id: 'golf-car', name: 'Golf Car', label: 'IDR. 25K / Orang', price: 25000, desc: 'Berkeliling area wisata yang luas dengan nyaman tanpa perlu lelah berjalan.', image: imgGolfCar },
  { id: 'istana-balon', name: 'Istana Balon', label: 'IDR. 10K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 10000, desc: 'Arena melompat bebas yang sangat disukai balita dan anak-anak.', image: imgIstanaBalon },
  { id: 'karausel', name: 'Karausel', label: 'IDR. 15K / Orang', price: 15000, desc: 'Wahana komidi putar klasik dengan lampu-lampu indah yang selalu digemari.', image: imgKarausel },
  { id: 'kereta-lokomotif', name: 'Kereta Lokomotif', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Keliling area wisata bersama keluarga dengan kereta lokomotif santai.', image: imgKeretaLokomotif },
  { id: 'kereta-monorel', name: 'Kereta Monorel', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Melihat pemandangan Kampung Coklat dari atas rel monorel kami.', image: imgKeretaMonorel },
  { id: 'kolam-pemancingan', name: 'Kolam Pemancingan', label: 'GRATIS', price: 0, desc: 'Bersantai sejenak sambil memancing ikan di kolam yang asri dan sejuk.', image: imgKolamPemancingan },
  { id: 'kolam-renang-anak', name: 'Kolam Renang Anak', label: 'IDR. 10K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 10000, desc: 'Berenang dan bermain air aman di kolam khusus yang didesain untuk anak-anak.', image: imgKolamRenangAnak },
  { id: 'kursi-pijat', name: 'Kursi Pijat', label: 'IDR. 15K / 15 Menit', price: 15000, desc: 'Istirahatkan tubuh Anda dengan pijatan refleksi 15 menit setelah berkeliling.', image: imgKursiPijat },
  { id: 'mini-golf', name: 'Mini Golf', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Coba ketangkasan dan fokus Anda dalam memasukkan bola di area mini golf.', image: imgMiniGolf },
  { id: 'mini-jeep', name: 'Mini Jeep', label: 'IDR. 25K / Orang', price: 25000, desc: 'Biarkan si kecil mengemudikan jeep mininya sendiri melintasi trek aman.', image: imgMiniJeep },
  { id: 'mini-swinger', name: 'Mini Swinger', label: 'IDR. 15K / Orang', price: 15000, desc: 'Ayunan berputar yang dirancang khusus untuk memberikan keseruan aman.', image: imgMiniSwinger },
  { id: 'panahan', name: 'Panahan', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Latih konsentrasi dan ketepatan membidik target di area panahan kami.', image: imgPanahan },
  { id: 'pancingan-anak', name: 'Pancingan Anak', label: 'IDR. 10K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 10000, desc: 'Permainan memancing magnet yang seru dan melatih kesabaran anak.', image: imgPancinganAnak },
  { id: 'perahu-ceria', name: 'Perahu Ceria', label: 'IDR. 10K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 10000, desc: 'Mendayung perahu kecil khusus anak-anak dengan gembira di kolam aman.', image: imgPerahuCeria },
  { id: 'perahu-dayung', name: 'Perahu Dayung', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Nikmati suasana kolam asri dan romantis dengan mendayung perahu bersama.', image: imgPerahuDayung },
  { id: 'playground', name: 'Playground', label: 'IDR. 15K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 15000, desc: 'Arena bermain anak yang luas, dilengkapi dengan perosotan dan ayunan interaktif.', image: imgPlayground },
  { id: 'sepeda-listrik', name: 'Sepeda Listrik', label: 'IDR. 35K / Orang', price: 35000, desc: 'Eksplorasi area wisata lebih jauh dengan santai menggunakan sepeda listrik.', image: imgSepedaListrik },
  { id: 'sepeda-udara', name: 'Sepeda Udara', label: 'IDR. 20K / Orang', price: 20000, desc: 'Sensasi unik mengayuh sepeda di atas tali gantung dengan pemandangan menakjubkan.', image: imgSepedaUdara },
  { id: 'terapi-ikan', name: 'Terapi Ikan', label: 'IDR. 5K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 5000, desc: 'Rasakan geli dan relaksasi dari pijatan halus ribuan ikan terapi di kolam kami.', image: imgTerapiIkan },
  { id: 'trampolin', name: 'Trampolin', label: 'IDR. 10K / Orang', subLabel: 'Free Untuk Tiket Terusan', price: 10000, desc: 'Melompat bebas dan tinggi untuk menyalurkan energi si kecil di wahana trampolin.', image: imgTrampolin }
]

const processPayment = () => {
  paymentSuccess.value = true
  setTimeout(() => {
    cart.value = []
    paymentSuccess.value = false
    showPaymentModal.value = false
    alert('E-Ticket Anda telah diterbitkan! Silakan periksa WhatsApp Anda.')
  }, 3000)
}
</script>

<template>
  <div class="self-service-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hashtag">#KAMPUNGCOKLAT</span>
        <h1 class="hero-title">Wisata Edukasi &<br/>Petualangan Keluarga</h1>
        <p class="hero-subtitle">Bermain, belajar, dan ciptakan momen manis tak terlupakan!</p>
        <button class="btn-primary btn-lg btn-glow">Pesan Tiket Sekarang</button>
      </div>
      
      <!-- Wavy Bottom Edge -->
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Content Container -->
    <div class="main-container">
      
      <!-- Membership Banner (Full Width) -->
      <div class="membership-banner">
        <div class="membership-bg-pattern"></div>
        <div class="membership-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f29727" stroke-width="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
        </div>
        <div class="membership-text">
          <h3>Buka Keuntungan Eksklusif Member!</h3>
          <p>Bergabunglah dengan program keanggotaan kami untuk menikmati diskon spesial, akses awal ke produk baru, dan penawaran eksklusif khusus anggota.</p>
        </div>
        <button class="btn-member">Beli Membership</button>
      </div>

      <!-- Main Layout: 2 Columns -->
      <section class="ticketing-layout">
        
        <!-- Left Column: Headers, Booking Widget, Products -->
        <div class="left-column">

          <!-- Booking Widget -->
          <div class="booking-widget-card elegant-shadow">
            <div class="booking-fields-container">
              <div class="booking-field-item">
                <div class="field-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <div class="field-content">
                  <label>Pilih Produk</label>
                  <select class="input minimal-select">
                    <option>TICKETING & WAHANA</option>
                  </select>
                </div>
              </div>
              
              <div class="booking-divider"></div>
              
              <div class="booking-field-item">
                <div class="field-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div class="field-content">
                  <label>Tanggal Kunjungan</label>
                  <input type="date" class="input minimal-select" v-model="selectedDate" />
                </div>
              </div>
            </div>
            
            <button class="btn-primary btn-block btn-confirm">Konfirmasi Tanggal</button>
          </div>

          <!-- Product List -->
          <div class="product-list">
            <div class="section-heading">
              <h2 class="elegant-title">Tiket Masuk Utama</h2>
              <div class="title-underline"></div>
            </div>
            
            <div class="elegant-card" v-for="product in entryTickets" :key="product.id">
              <div class="card-image-wrapper">
                <img :src="product.image" :alt="product.name" class="card-image" />
              </div>
              <div class="card-content">
                <div class="card-price-label">{{ product.label }}</div>
                <h3 class="card-title">{{ product.name }}</h3>
                <div class="card-divider"></div>
                <p class="card-desc">{{ product.desc }}</p>
                <div class="card-footer">
                  <div class="card-price">
                    <span class="price-currency">Rp</span> {{ product.price.toLocaleString('id-ID') }}
                  </div>
                  <button class="btn-outline-primary" @click="addToCart(product)">+ Tambahkan</button>
                </div>
              </div>
            </div>

            <div class="section-heading mt-xxl">
              <h2 class="elegant-title">Tiket Fasilitas Wahana</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Pilih wahana favorit Anda untuk melengkapi pengalaman liburan keluarga.</p>
            </div>
            
            <div class="elegant-card" v-for="product in wahanaTickets" :key="product.id">
              <div class="card-image-wrapper">
                <img :src="product.image" :alt="product.name" class="card-image" />
              </div>
              <div class="card-content">
                <div class="card-price-label">{{ product.label }}</div>
                <div class="card-price-sublabel" v-if="product.subLabel">{{ product.subLabel }}</div>
                <h3 class="card-title">{{ product.name }}</h3>
                <div class="card-divider"></div>
                <p class="card-desc">{{ product.desc }}</p>
                <div class="card-footer">
                  <button class="btn-outline-primary" @click="addToCart(product)">+ Tambahkan</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Cart Sidebar -->
        <div class="right-column">
          <div class="cart-widget elegant-shadow">
            <div class="cart-header">
              <h3>Keranjang Anda</h3>
            </div>
            
            <div v-if="cart.length === 0" class="empty-cart">
              <div class="empty-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <p>Belum ada tiket yang dipilih.<br>Tambahkan tiket dari daftar di samping.</p>
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
              <div class="cart-total-row">
                <span>Total</span>
                <span class="total-amount">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
              </div>
              <button class="btn-primary btn-block btn-checkout" @click="showPaymentModal = true" :disabled="cart.length === 0">
                Pilih Pembayaran
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Payment Modal (QRIS) -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Pembayaran (QRIS)</h2>
          <button class="close-btn" @click="showPaymentModal = false">×</button>
        </div>
        <div class="modal-body text-center" v-if="!paymentSuccess">
          <p class="payment-subtitle">Selesaikan pembayaran Anda segera</p>
          <div class="total-box">Rp {{ getCartTotal().toLocaleString('id-ID') }}</div>
          
          <div class="qris-box">
             <div class="qris-placeholder">
               <div style="width:200px; height:200px; background:#fff; padding:10px; border:2px solid #000; display:inline-block;">
                 <div style="width:100%; height:100%; background:repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 50% / 20px 20px;"></div>
               </div>
             </div>
          </div>
          <p class="help-text">Gunakan aplikasi M-Banking atau E-Wallet untuk memindai kode QRIS.</p>
          <button class="btn-primary btn-block" @click="processPayment">Saya Sudah Bayar</button>
        </div>
        <div class="modal-body text-center" v-else>
          <div class="success-icon">✅</div>
          <h1 class="text-success">Pembayaran Berhasil!</h1>
          <p>E-Ticket Anda sedang diproses dan dikirimkan. Terima kasih!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.self-service-page {
  background-color: #ffffff; /* Clean white background */
  min-height: 100vh;
  font-family: var(--font-family);
}

/* Typography & Titles */
.elegant-title {
  font-family: 'Georgia', serif; /* Simulating the elegant serif of original web */
  color: #2c1a13;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 0.5px;
}
.title-underline {
  height: 3px;
  width: 60px;
  background-color: #f29727; /* Orange accent */
  margin: 10px 0 20px 0;
}
.section-heading {
  margin-bottom: 30px;
}
.section-desc {
  color: #666;
  font-size: 16px;
}
.mt-xxl { margin-top: 60px; }

/* Hero Banner */
.hero-banner {
  height: 500px;
  background-image: url('~/assets/assets_POS/POS/wahana/golf_car_idr.25k.jpg'); 
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 5%;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, rgba(26,16,11,0.9) 0%, rgba(44,26,19,0.5) 60%, rgba(0,0,0,0.1) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  color: #fff;
  padding-top: 80px; /* Offset for absolute navbar */
}

.hashtag {
  color: #f29727;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 14px;
  text-transform: uppercase;
}

.hero-title {
  font-size: 52px;
  line-height: 1.1;
  margin: 15px 0;
  color: #fff;
  font-family: 'Georgia', serif; 
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn-glow {
  background-color: #f29727 !important;
  color: #fff !important;
  border-radius: 4px;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-glow:hover {
  background-color: #d8811e !important;
  transform: translateY(-2px);
}

.torn-edge {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 3;
}
.torn-edge svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Main Container */
.main-container {
  max-width: 1250px;
  margin: 0 auto;
  padding: 30px 20px 80px 20px;
  position: relative;
  z-index: 4;
}

/* Membership Banner */
.membership-banner {
  background: linear-gradient(135deg, #4a2c1d 0%, #2c1a13 100%);
  border-radius: 12px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
}

.membership-bg-pattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(rgba(255,255,255,0.05) 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.5;
  pointer-events: none;
}

.membership-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.1);
  position: relative;
  z-index: 2;
}

.membership-text {
  flex: 1;
  position: relative;
  z-index: 2;
}

.membership-text h3 {
  margin: 0 0 5px 0;
  font-size: 20px;
  font-family: 'Georgia', serif;
  color: #fff;
}

.membership-text p {
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
}

.btn-member {
  background: white;
  color: #2c1a13;
  border: 1px solid #eaeaea;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-member::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23f29727"><path d="M2 19h20v2H2v-2zm18-7.5l-4-3.5-4 4.5-4-4.5-4 3.5v6h16v-6z"/></svg>');
}

.btn-member:hover {
  background: #fcfcfc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Layout Columns */
.ticketing-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.left-column {
  flex: 1;
}

.right-column {
  width: 350px;
  flex-shrink: 0;
  position: sticky;
  top: 100px;
}

/* Booking Widget Card */
.elegant-shadow {
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.04);
}

.booking-widget-card {
  background: #fff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 50px;
}

.booking-fields-container {
  display: flex;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 25px;
  align-items: stretch;
}

.booking-divider {
  width: 1px;
  background: #eaeaea;
  margin: 15px 0;
}

.booking-field-item {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px 25px;
}

.field-icon {
  margin-right: 15px;
  color: #888;
  display: flex;
  align-items: center;
}

.field-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-content label {
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

.minimal-select {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  font-size: 15px !important;
  font-weight: 600;
  color: #2c1a13 !important;
  box-shadow: none !important;
  cursor: pointer;
  width: 100%;
}
.minimal-select:focus { outline: none; }

.btn-confirm {
  background-color: #4a2c1d !important;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.btn-confirm:hover { background-color: #2c1a13 !important; }

/* Elegant Product Cards */
.elegant-card {
  display: flex;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 25px 0;
  gap: 25px;
}
.elegant-card:last-child { border-bottom: none; }

.card-image-wrapper {
  width: 260px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.elegant-card:hover .card-image { transform: scale(1.05); }

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-price-label {
  color: #4a2c1d; /* Dark brown to match image */
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.card-price-sublabel {
  color: #4a2c1d;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 5px;
  letter-spacing: 0.5px;
}

.card-title {
  font-size: 26px;
  color: #2c1a13;
  font-weight: bold;
  font-family: 'Georgia', serif;
  margin: 0;
}

.card-divider {
  height: 2px;
  width: 40px;
  background-color: #e0e0e0;
  margin: 15px 0;
}

.card-desc {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card-price {
  font-size: 24px;
  font-weight: bold;
  color: #2c1a13;
}
.price-currency { font-size: 16px; color: #888; }

.btn-outline-primary {
  background: transparent;
  border: 1px solid #2c1a13;
  color: #2c1a13;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-outline-primary:hover {
  background: #2c1a13;
  color: #fff;
}

/* Cart Widget */
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

/* Modal */
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
</style>
