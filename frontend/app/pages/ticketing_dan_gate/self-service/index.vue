<script setup lang="ts">
import { ref } from 'vue'

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

const cart = ref<any[]>([])
const selectedDate = ref('')
const selectedProduct = ref('Tiket Masuk')
const showPaymentModal = ref(false)
const paymentSuccess = ref(false)
const showMobileCart = ref(false)
const isDateConfirmed = ref(false)

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

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

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

const entryTickets = [
  { id: 'reg', name: 'Tiket Reguler', label: '[PROMO] WEEKDAY', price: 20000, desc: 'Akses masuk area wisata Kampung Coklat. Menikmati indahnya kebun kakao dan edukasi dasar.', image: imgKolamDewasa },
  { id: 'ter', name: 'Tiket Terusan', label: 'ALL ACCESS', price: 75000, desc: 'Akses masuk bebas + 5 Wahana Pilihan sepuasnya untuk pengalaman liburan tanpa batas.', image: imgKereta }
]

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

const edukasiTickets = [
  { id: 'edu_1', name: 'Paket Edukasi TK / PAUD', label: 'Wisata Edukasi', price: 35000, desc: '<div style="font-size: 13px; line-height: 1.5;"><strong>Paket Reguler:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Pembelajaran Mendalam: Rp 38.000/pax</li><li>Kokurikuler (Binatang/Tumbuhan): Rp 39.000/pax</li><li>Fun Cooking: Rp 35.000/pax</li></ul><strong>Paket Kemah Ceria Prasiaga:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Kemah Ceria 1: Rp 50.000 | 2: Rp 37.000 | 3: Rp 32.000</li></ul><strong>Paket Outbound:</strong><ul style="padding-left: 15px; margin: 2px 0 0; list-style-type: disc;"><li>Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000</li><li>Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000</li></ul></div>', image: paket_tk },
  { id: 'edu_2', name: 'Paket Edukasi SD', label: 'Wisata Edukasi', price: 32000, desc: '<div style="font-size: 13px; line-height: 1.5;"><strong>Paket Reguler:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Santripreneur: Rp 32.000/pax</li><li>Industri Coklat: Rp 35.000/pax</li><li>Pembelajaran Mendalam: Rp 38.000/pax</li><li>Fun Cooking: Rp 35.000/pax</li></ul><strong>Paket Outbound:</strong><ul style="padding-left: 15px; margin: 2px 0 0; list-style-type: disc;"><li>Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000</li><li>Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000</li></ul></div>', image: paket_sd },
  { id: 'edu_3', name: 'Paket Edukasi SMP', label: 'Wisata Edukasi', price: 32000, desc: '<div style="font-size: 13px; line-height: 1.5;"><strong>Paket Reguler:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax</li><li>Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax</li><li>Pembelajaran Mendalam: Rp 40.000/pax</li></ul><strong>Paket LDKS:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Paket A: Rp 185.000 | Paket B: Rp 135.000 | Paket C: Rp 55.000</li></ul><strong>Paket Outbound:</strong><ul style="padding-left: 15px; margin: 2px 0 0; list-style-type: disc;"><li>Criollo (P1-P3): Rp 47.000 - Rp 97.000</li><li>Theo (P1-P5): Rp 103.000 - Rp 152.000</li></ul></div>', image: paket_smp },
  { id: 'edu_4', name: 'Paket Edukasi SMA / Mahasiswa', label: 'Wisata Edukasi', price: 32000, desc: '<div style="font-size: 13px; line-height: 1.5;"><strong>Paket Reguler:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax</li><li>Kewirausahaan: Rp 37.000/pax | KC Berdampak: Rp 37.000/pax</li><li>Pembelajaran Mendalam: Rp 50.000/pax</li></ul><strong>Paket LDKS:</strong><ul style="padding-left: 15px; margin: 2px 0 6px; list-style-type: disc;"><li>Paket A: Rp 185.000 | Paket B: Rp 135.000 | Paket C: Rp 55.000</li></ul><strong>Paket Outbound:</strong><ul style="padding-left: 15px; margin: 2px 0 0; list-style-type: disc;"><li>Criollo (P1-P3): Rp 47.000 - Rp 97.000</li><li>Theo (P1-P5): Rp 103.000 - Rp 152.000</li></ul></div>', image: paket_sma }
]

const sewaTempatTickets = [
  { id: 'sewa_1', name: 'Bale Coklat', label: 'Sewa Tempat', price: 500000, desc: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas atau acara santai keluarga besar.', image: bale_coklat },
  { id: 'sewa_2', name: 'Coklat Caffe', label: 'Sewa Tempat', price: 300000, desc: 'Kafe bernuansa alam untuk acara bersantai atau kumpul komunitas.', image: coklat_caffe },
  { id: 'sewa_3', name: 'Coklat Garden', label: 'Sewa Tempat', price: 400000, desc: 'Area taman terbuka yang hijau, ideal untuk pesta kebun atau acara outdoor.', image: coklat_garden },
  { id: 'sewa_4', name: 'Joglo Jatimarto', label: 'Sewa Tempat', price: 750000, desc: 'Pendopo tradisional bernuansa klasik Jawa untuk acara keluarga atau pertemuan.', image: joglo_jatimarto },
  { id: 'sewa_5', name: 'Kampung Coklat Hall', label: 'Sewa Tempat', price: 1500000, desc: 'Ruangan indoor eksklusif untuk acara besar, pernikahan, atau seminar perusahaan.', image: kampung_coklat_hall },
  { id: 'sewa_6', name: 'Private Business Keep (PBK)', label: 'Sewa Tempat', price: 1000000, desc: 'Ruangan privat eksklusif untuk pertemuan bisnis tingkat eksekutif.', image: pbk },
  { id: 'sewa_7', name: 'Ruang Pertemuan R1', label: 'Sewa Tempat', price: 500000, desc: 'Ruang rapat berkapasitas sedang dengan fasilitas meeting lengkap.', image: ruang_pertemuan },
  { id: 'sewa_8', name: 'Taman Edel', label: 'Sewa Tempat', price: 350000, desc: 'Taman asri nan sejuk untuk acara komunitas atau bersantai bersama keluarga.', image: taman_edel },
  { id: 'sewa_9', name: 'Theobromine Hall', label: 'Sewa Tempat', price: 1200000, desc: 'Hall menengah untuk acara resepsi, seminar, atau pertemuan perusahaan.', image: theobromine_hall },
  { id: 'sewa_10', name: 'Trinitario Hall', label: 'Sewa Tempat', price: 2000000, desc: 'Hall eksklusif berkapasitas besar dengan desain interior modern dan elegan.', image: trinitario_hall },
  { id: 'sewa_11', name: 'Wisma Criollo', label: 'Sewa Tempat', price: 850000, desc: 'Gedung pertemuan eksklusif bernuansa hangat untuk acara privat atau korporat.', image: wisma_criollo }
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
        <h1 class="hero-title">Liburan Seru<br/>Penuh Edukasi</h1>
        <p class="hero-subtitle">
          Pesan tiket masuk dan wahana favorit Anda secara online untuk pengalaman liburan keluarga yang tak terlupakan!
        </p>
        <button class="btn-primary btn-lg btn-glow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; display:inline-block; vertical-align:text-bottom;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Pesan Tiket Sekarang
        </button>
        <div class="hero-location">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#f29727" stroke="#2c1a13" stroke-width="2" style="margin-right:8px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>Jl. Banteng - Blorok No. 18, Desa Plosorejo, RT. 01/06, Kademangan, Blitar</span>
        </div>
      </div>
      
      <!-- Chocolate Drip Bottom Edge -->
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill="#ffffff" d="M 0,130 L 0,20 C 50,20 50,110 100,110 C 150,110 150,15 200,15 C 250,15 250,80 300,80 C 350,80 350,25 400,25 C 437,25 437,100 475,100 C 512,100 512,10 550,10 C 600,10 600,90 650,90 C 700,90 700,30 750,30 C 800,30 800,115 850,115 C 900,115 900,20 950,20 C 987,20 987,70 1025,70 C 1062,70 1062,15 1100,15 C 1125,15 1125,95 1150,95 C 1175,95 1175,25 1200,25 L 1200,130 Z"></path>
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
        <button class="btn-member">Daftar Membership</button>
      </div>

      <!-- Main Layout: 2 Columns -->
      <section class="ticketing-layout">
        
        <!-- Left Column: Headers, Booking Widget, Products -->
        <div class="left-column">
        <div class="booking-widget-card elegant-shadow">
          <div class="booking-fields-container-vertical">
            <div class="booking-field-item-vertical">
              <div class="field-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div class="field-content-vertical">
                <label>Product</label>
                <select v-if="!isDateConfirmed" class="input minimal-select-vertical" v-model="selectedProduct">
                  <option value="Tiket Masuk">Tiket Masuk</option>
                  <option value="Wahana Permainan">Wahana Permainan</option>
                  <option value="Wisata Edukasi">Wisata Edukasi</option>
                  <option value="Sewa Tempat">Sewa Tempat</option>
                </select>
                <div v-else class="confirmed-text">{{ selectedProduct }}</div>
              </div>
            </div>
            
            <div class="booking-field-item-vertical">
              <div class="field-icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><circle cx="16" cy="15" r="2"></circle></svg>
              </div>
              <div class="field-content-vertical">
                <label>Select Date</label>
                <input v-if="!isDateConfirmed" type="date" class="input minimal-select-vertical" v-model="selectedDate" />
                <div v-else class="confirmed-text">{{ formatDate(selectedDate) || 'Belum dipilih' }}</div>
              </div>
            </div>
          </div>
          
          <button v-if="!isDateConfirmed" class="btn-primary btn-block btn-confirm-reference" @click="isDateConfirmed = true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 10px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            Confirm Your Date
          </button>
          
          <button v-else class="btn-primary btn-block btn-confirm-reference btn-edit" @click="isDateConfirmed = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 10px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Ubah Tanggal & Produk
          </button>
        </div>

        <!-- Product List -->
        <div class="product-list">
          
          <template v-if="selectedProduct === 'Tiket Masuk'">
            <div class="section-heading mt-md">
              <h2 class="elegant-title">Tiket Masuk (Gate)</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Pilih tiket masuk reguler atau terusan untuk akses ke area Kampung Coklat.</p>
            </div>
            
            <div class="elegant-card" v-for="product in entryTickets" :key="product.id">
              <div class="card-image-wrapper" @click="openImageModal(product.image)">
                <img :src="product.image" :alt="product.name" class="card-image" style="cursor: pointer;" />
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
          </template>

          <template v-else-if="selectedProduct === 'Wahana Permainan'">
            <div class="section-heading mt-md">
              <h2 class="elegant-title">Tiket Fasilitas Wahana</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Pilih wahana favorit Anda untuk melengkapi pengalaman liburan keluarga.</p>
            </div>
            
            <div class="elegant-card" v-for="product in wahanaTickets" :key="product.id">
              <div class="card-image-wrapper" @click="openImageModal(product.image)">
                <img :src="product.image" :alt="product.name" class="card-image" style="cursor: pointer;" />
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
          </template>

          <template v-else-if="selectedProduct === 'Wisata Edukasi'">
            <div class="section-heading">
              <h2 class="elegant-title">Paket Edukasi</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Pilihan paket wisata edukasi terbaik untuk anak-anak hingga dewasa.</p>
            </div>
            
            <div class="elegant-card" v-for="product in edukasiTickets" :key="product.id">
              <div class="card-image-wrapper edukasi-image-wrapper" @click="openImageModal(product.image)">
                <img :src="product.image" :alt="product.name" class="card-image edukasi-image" style="cursor: pointer;" />
              </div>
              <div class="card-content">
                <div class="card-price-label">{{ product.label }}</div>
                <h3 class="card-title">{{ product.name }}</h3>
                <div class="card-divider"></div>
                <div class="card-desc" v-html="product.desc"></div>
                <div class="card-footer">
                  <div class="card-price">
                    <span class="price-currency">Rp</span> {{ product.price.toLocaleString('id-ID') }}
                  </div>
                  <button class="btn-outline-primary" @click="addToCart(product)">+ Tambahkan</button>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="selectedProduct === 'Sewa Tempat'">
            <div class="section-heading">
              <h2 class="elegant-title">Sewa Tempat / Venue</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Fasilitas venue eksklusif untuk berbagai kebutuhan acara Anda.</p>
            </div>
            
            <div class="elegant-card" v-for="product in sewaTempatTickets" :key="product.id">
              <div class="card-image-wrapper" @click="openImageModal(product.image)">
                <img :src="product.image" :alt="product.name" class="card-image" style="cursor: pointer;" />
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
          </template>

        </div>

        </div>

        <!-- Right Column: Cart Sidebar / Mobile Popup -->
        <div class="right-column" :class="{ 'show-mobile-cart': showMobileCart }">
          <div class="cart-overlay-bg mobile-only" @click="showMobileCart = false"></div>
          
          <div class="cart-widget elegant-shadow">
            <div class="cart-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Keranjang Anda</h3>
              <button class="mobile-only" @click="showMobileCart = false" style="background: none; border: none; font-size: 28px; line-height: 1; cursor: pointer; color: #2c1a13;">&times;</button>
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

      <!-- Mobile Floating Cart Button -->
      <button class="floating-cart-btn mobile-only" @click="showMobileCart = true" v-if="cart.length > 0">
        <div style="display: flex; align-items: center;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:10px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span style="font-weight: 600; font-size: 15px;">Lihat Keranjang ({{ cart.length }})</span>
        </div>
        <span style="font-weight: bold; font-size: 16px;">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
      </button>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-content" @click.stop>
        <button class="close-image-btn" @click="closeImageModal">&times;</button>
        <img :src="selectedImageUrl" alt="Full Image" class="modal-full-image" style="max-width: 100%; height: auto; display: block;" />
      </div>
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
  height: 700px;
  background-image: url('~/assets/assets_POS/bangunan1.jpg'); 
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 8%;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg, rgba(26,16,11,0.95) 0%, rgba(44,26,19,0.7) 45%, rgba(0,0,0,0) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: #fff;
  max-width: 650px;
  text-align: left;
}

.hashtag {
  color: #f29727;
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 14px;
  text-transform: uppercase;
  font-family: 'Jost', 'Segoe UI', sans-serif;
  margin-bottom: 10px;
  display: inline-block;
}

.hero-title {
  font-size: 60px;
  line-height: 1.1;
  margin: 10px 0 20px 0;
  color: #fff;
  font-weight: 700;
  font-family: 'Jost', 'Segoe UI', sans-serif;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 35px;
  opacity: 0.9;
  font-family: 'Jost', 'Segoe UI', sans-serif;
}

.hero-location {
  display: flex;
  align-items: center;
  margin-top: 35px;
  font-size: 14px;
  font-family: 'Jost', 'Segoe UI', sans-serif;
  color: #fff;
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
  height: 150px;
  z-index: 3;
}
.torn-edge::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #ffffff;
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

.booking-fields-container-vertical {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.booking-field-item-vertical {
  display: flex;
  align-items: center;
}

.field-icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #2c1a13;
  color: #2c1a13;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.field-content-vertical {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-content-vertical label {
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
}

.minimal-select-vertical {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  font-size: 16px !important;
  font-weight: 500;
  color: #002244 !important;
  box-shadow: none !important;
  cursor: pointer;
  width: 100%;
}
.minimal-select-vertical:focus { outline: none; }

.confirmed-text {
  font-size: 16px;
  font-weight: 600;
  color: #002244;
  margin-top: 2px;
}

.btn-confirm-reference {
  background-color: #2c1a13 !important;
  color: #fff !important;
  border-radius: 12px !important;
  height: 54px !important;
  font-size: 16px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-confirm-reference:hover {
  background-color: #3e261d !important;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.2);
}
.btn-edit {
  background-color: #fff !important;
  color: #2c1a13 !important;
  border: 2px solid #2c1a13 !important;
}
.btn-edit:hover {
  background-color: #fcfaf8 !important;
}

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

.edukasi-image-wrapper {
  width: 320px;
  height: auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.edukasi-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}
.elegant-card:hover .edukasi-image { transform: scale(1.02); }

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

/* Mobile Utilities */
.mobile-only { display: none; }

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

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .hero-banner { height: 100vh; min-height: 600px; }
  .hero-title { font-size: 48px; }
  .ticketing-layout { display: block; }
  .left-column { width: 100%; }
  
  /* Mobile Popup Cart */
  .right-column {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    z-index: 2000;
    display: none;
    align-items: flex-end;
    justify-content: center;
  }
  .right-column.show-mobile-cart {
    display: flex;
  }
  .cart-overlay-bg {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
  }
  .right-column .cart-widget {
    width: 100%; max-height: 85vh; position: relative; z-index: 2001;
    border-radius: 24px 24px 0 0;
  }
  
  .mobile-only { display: block; }
  
  .floating-cart-btn {
    display: flex;
    position: fixed; bottom: 20px; left: 20px; right: 20px;
    background: #f29727; color: #fff; border: none;
    border-radius: 12px; padding: 16px 20px;
    justify-content: space-between; align-items: center;
    z-index: 1000; box-shadow: 0 10px 25px rgba(242, 151, 39, 0.4);
    cursor: pointer;
  }
  .main-container { padding-bottom: 100px; }
}

@media (max-width: 768px) {
  .hero-banner { height: 100vh; padding: 0 5%; }
  .hero-overlay { background: rgba(26,16,11,0.75); }
  .hero-content { text-align: center; margin: 0 auto; align-items: center; display: flex; flex-direction: column; }
  .hero-title { font-size: 36px; margin: 10px 0; }
  .hero-subtitle { font-size: 16px; margin-bottom: 25px; }
  .hero-location { justify-content: center; text-align: center; }
  
  /* Form overrides if needed */
  
  .membership-banner { flex-direction: column; text-align: center; padding: 30px 20px; }
  .membership-icon { margin: 0 auto 15px auto; width: 50px; height: 50px; background: rgba(0,0,0,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .btn-member { margin: 20px auto 0 auto; width: 100%; justify-content: center; background: #fff; color: #2c1a13; font-weight: bold; }
  
  /* Miniaturized Desktop Cards for Mobile */
  .elegant-card { padding: 15px 0; gap: 12px; align-items: flex-start; }
  .card-image-wrapper { width: 120px; height: 90px; flex-shrink: 0; border-radius: 8px; }
  .edukasi-image-wrapper { height: auto; } /* Prevent cropping on mobile */
  .card-title { font-size: 16px; margin: 0 0 4px 0; }
  .card-price-label, .card-price-sublabel { font-size: 10px; margin-bottom: 2px; }
  .card-desc { font-size: 12px; margin-bottom: 8px; line-height: 1.4; display: block; } /* Remove truncation */
  .card-divider { display: none; }
  .card-footer { margin-top: 0; width: 100%; }
  .card-price { font-size: 16px; }
  .price-currency { font-size: 12px; }
  .btn-outline-primary { padding: 6px 12px; font-size: 12px; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 30px; }
  .torn-edge { height: 80px; }
  .elegant-title { font-size: 22px; }
  
  .card-image-wrapper { width: 90px; height: 80px; }
  .edukasi-image-wrapper { width: 100px; height: auto; } /* Ensure it's not too small and not cropped */
  .card-title { font-size: 14px; }
  .card-desc { font-size: 11px; }
  .card-price { font-size: 14px; }
  .btn-outline-primary { padding: 4px 10px; font-size: 11px; }
}
</style>
