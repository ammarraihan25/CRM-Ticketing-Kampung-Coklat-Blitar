<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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

const route = useRoute()

const cart = ref<any[]>([])
const selectedDate = ref('')
const selectedProduct = ref(route.query.category as string || 'Tiket Masuk')
const showPaymentModal = ref(false)
const paymentSuccess = ref(false)
const showMobileCart = ref(false)
const isDateConfirmed = ref(false)

const showTicketModal = ref(false)
const transactionId = ref('')

const customerPhone = ref('')
const customerName = ref('')
const customerAddress = ref('')
const isMember = ref(false)
const memberId = ref('')
const isMemberVerified = ref(false)
const isCustomerDataComplete = ref(false)

const formErrorMessage = ref('')

const verifyMember = () => {
  formErrorMessage.value = ''
  if (String(memberId.value || '').trim().length >= 5) {
    isMemberVerified.value = true
    // Simulate auto-fill from member database
    customerName.value = 'Budi Santoso'
    customerPhone.value = '081234567890'
    customerAddress.value = 'Jl. Merdeka No. 10, Blitar'
  } else {
    formErrorMessage.value = 'Masukkan ID Member yang valid (min. 5 karakter).'
  }
}

const saveBookingData = () => {
  formErrorMessage.value = ''
  
  const phone = String(customerPhone.value || '').trim()
  const name = String(customerName.value || '').trim()
  
  if (phone.length === 0) { formErrorMessage.value = 'Nomor telepon harus diisi.'; return; }
  if (name.length === 0) { formErrorMessage.value = 'Nama lengkap harus diisi.'; return; }
  if (!selectedDate.value) { formErrorMessage.value = 'Tanggal kunjungan harus dipilih.'; return; }
  
  isCustomerDataComplete.value = true
  isDateConfirmed.value = true
}

const submitCustomerData = () => {
  if (customerPhone.value.trim().length < 10) {
    alert('Nomor telepon tidak valid.')
    return
  }
  if (customerName.value.trim().length < 3) {
    alert('Nama lengkap harus diisi.')
    return
  }
  isCustomerDataComplete.value = true
}

const resetCustomerData = () => {
  isCustomerDataComplete.value = false
}

const resetCustomer = () => {
  isCustomerVerified.value = false
  customerPhone.value = ''
  customerName.value = ''
}

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
  isCustomerDataComplete.value = false
  isDateConfirmed.value = false
  customerName.value = ''
  customerPhone.value = ''
  customerAddress.value = ''
  memberId.value = ''
  isMember.value = false
  isMemberVerified.value = false
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
        <button class="btn-member" @click="navigateTo('/membership')">Daftar Membership</button>
      </div>

      <!-- Main Layout: 2 Columns -->
      <section class="ticketing-layout">
        <div class="left-column">
        
        <!-- Category Header (Dynamic) -->
        <div class="category-header-title mb-md">
           <h3 style="color: #2c1a13; font-size: 20px; font-weight: 600; text-transform: uppercase;">Transaksi: {{ selectedProduct }}</h3>
        </div>

        <!-- Unified Booking Form -->
        <div class="unified-booking-card elegant-shadow" style="background: #fff; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
          <h4 style="margin: 0 0 25px 0; font-size: 18px; color: #2c1a13; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #fcfaf8; padding-bottom: 15px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f29727" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Data Pemesanan & Tanggal
          </h4>
          
          <div v-if="!isCustomerDataComplete || !isDateConfirmed" style="display: flex; flex-direction: column; gap: 20px;">
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <label style="font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; display: block;">Nomor Telepon <span style="color: red;">*</span></label>
                <input type="tel" class="input minimal-select-vertical" v-model="customerPhone" placeholder="Contoh: 081234567890" style="width: 100%; padding: 14px 15px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;" />
              </div>
              <div style="flex: 1; min-width: 200px;">
                <label style="font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; display: block;">Nama Lengkap <span style="color: red;">*</span></label>
                <input type="text" class="input minimal-select-vertical" v-model="customerName" placeholder="Masukkan nama" style="width: 100%; padding: 14px 15px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;" />
              </div>
            </div>
            
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <label style="font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; display: block;">Tanggal Kunjungan <span style="color: red;">*</span></label>
                <input type="date" class="input minimal-select-vertical" v-model="selectedDate" style="width: 100%; padding: 14px 15px; border: 1px solid #f29727; border-radius: 8px; background: #fffcf8; font-family: inherit; color: #2c1a13; font-weight: bold; cursor: pointer; box-shadow: 0 2px 8px rgba(242,151,39,0.15);" />
              </div>
              <div style="flex: 1; min-width: 200px;">
                <label style="font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; display: block;">Alamat (Opsional)</label>
                <input type="text" class="input minimal-select-vertical" v-model="customerAddress" placeholder="Masukkan alamat lengkap" style="width: 100%; padding: 14px 15px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;" />
              </div>
            </div>

            <!-- Member Checkbox Area -->
            <div style="background: #fdfbf7; border: 1px solid #f5dfc6; border-radius: 8px; padding: 15px; margin-top: 5px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; font-weight: 600; color: #2c1a13;">
                <input type="checkbox" v-model="isMember" style="width: 18px; height: 18px; accent-color: #f29727;" />
                Saya adalah Member Kampung Coklat
              </label>
              
              <div v-if="isMember" style="margin-top: 15px; display: flex; gap: 10px; align-items: flex-end; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px;">
                  <label style="font-size: 12px; font-weight: 600; color: #555; margin-bottom: 6px; display: block;">Masukkan ID Member</label>
                  <input type="text" class="input minimal-select-vertical" v-model="memberId" placeholder="Contoh: KC-12345" :disabled="isMemberVerified" style="width: 100%; padding: 12px 15px; border: 1px solid #ddd; border-radius: 8px;" />
                </div>
                <button v-if="!isMemberVerified" class="btn-primary" @click="verifyMember" style="padding: 10px 20px; border-radius: 8px; height: 46px;">Cek ID</button>
                <div v-else style="padding: 10px 15px; background: #e8f5e9; color: #2e7d32; border-radius: 8px; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 6px; height: 46px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  APPROVED!
                </div>
              </div>
            </div>

            <div v-if="formErrorMessage" style="background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 8px; font-size: 14px; font-weight: 600; text-align: center; margin-top: 10px;">
              {{ formErrorMessage }}
            </div>
            <button class="btn-primary" @click="saveBookingData" 
              style="width: 100%; padding: 16px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-top: 10px;">
              Simpan & Lanjutkan Transaksi
            </button>
          </div>
          
          <!-- Summary View when Data is Complete -->
          <div v-else class="summary-card">
            <div class="summary-content">
              <div class="summary-header">
                <div class="summary-name">{{ customerName }} <span v-if="isMemberVerified" class="member-badge">MEMBER</span></div>
                <button class="btn-edit-form" @click="() => { isCustomerDataComplete = false; isDateConfirmed = false; }">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  Ubah Data
                </button>
              </div>
              <div class="summary-details">
                <div class="detail-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <span>{{ customerPhone }}</span>
                </div>
                <div class="detail-item" v-if="customerAddress">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>{{ customerAddress }}</span>
                </div>
                <div class="detail-item detail-date">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f29727" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span>Kunjungan: <strong>{{ formatDate(selectedDate) }}</strong></span>
                </div>
              </div>
            </div>
          </div>
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
                <h3 class="card-title">{{ product.name }}</h3>
                <div class="card-divider"></div>
                <p class="card-desc">{{ product.desc }}</p>
                <div class="card-footer">
                  <button class="btn-outline-primary" @click="addToCart(product)">+ Tambahkan</button>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="selectedProduct === 'Booking Rombongan'">
            <div class="section-heading mt-md">
              <h2 class="elegant-title">Booking Rombongan Agen</h2>
              <div class="title-underline"></div>
              <p class="section-desc">Pilih tiket khusus rombongan dengan harga berjenjang (tier) berdasarkan jumlah Pax.</p>
            </div>
            <!-- Placeholder for Booking Rombongan -->
            <div class="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" class="empty-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              <p>Formulir Input Pax dan perhitungan tier harga otomatis akan ditampilkan di sini.</p>
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
/* Removed category grid styles */

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

/* Aesthetic Payment Modal Redesign */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px); }
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
