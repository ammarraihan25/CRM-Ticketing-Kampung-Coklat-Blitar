const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app', 'pages', 'ticketing_dan_gate', 'self-service', 'booking.vue');
let content = fs.readFileSync(file, 'utf8');

// The new script block
const newScript = `<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
const router = useRouter()
const selectedProduct = ref(route.query.category as string || 'Tiket Masuk')

const showArticleModal = ref(false)
const selectedArticleItem = ref<any>(null)

const openArticleModal = (item: any) => {
  selectedArticleItem.value = item
  showArticleModal.value = true
}

const closeArticleModal = () => {
  showArticleModal.value = false
  setTimeout(() => {
    selectedArticleItem.value = null
  }, 300)
}

const navigateTo = (path: string) => {
  router.push('/ticketing_dan_gate/self-service' + path)
}

const entryTickets = [
  { id: 'tiket-reguler', name: 'Tiket Masuk Reguler', label: 'Tiket Utama', desc: 'Akses masuk bebas mengeksplorasi area umum Kampung Coklat. Menikmati taman rindang, spot foto, restoran, dan berbagai fasilitas umum lainnya.', image: imgKolamDewasa },
  { id: 'tiket-terusan', name: 'Tiket Masuk Terusan', label: 'Paket Spesial', desc: 'Termasuk akses ke puluhan wahana permainan secara gratis dan tanpa batas (Unlimited). Sangat direkomendasikan untuk liburan keluarga seharian penuh.', image: imgKolamDewasa }
]

const wahanaTickets = [
  { id: 'animal-feeding', name: 'Animal Feeding', label: 'Edukasi Hewan', desc: 'Bermain sambil belajar dan berinteraksi langsung dengan hewan-hewan lucu di area kami.', image: imgAnimalFeeding },
  { id: 'animal-toys', name: 'Animal Toys', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Mainan hewan tunggang yang seru untuk anak-anak berkeliling di jalur aman yang disediakan.', image: imgAnimalToys },
  { id: 'atv', name: 'ATV Ride', label: 'Petualangan', desc: 'Pacu adrenalin Anda di lintasan ATV Kampung Coklat yang menantang namun tetap aman dipandu instruktur.', image: imgAtv },
  { id: 'bom-bom-car', name: 'Bom Bom Car', label: 'Wahana Keluarga', subLabel: 'Free Untuk Tiket Terusan', desc: 'Serunya tabrakan aman dan menyenangkan di arena bom bom car yang dilengkapi sistem keamanan canggih.', image: imgBomBomCar },
  { id: 'flying-fox', name: 'Flying Fox', label: 'Petualangan', desc: 'Meluncur bebas melintasi rindangnya kebun kakao dari ketinggian, rasakan sensasi terbang yang aman.', image: imgFlyingFox },
  { id: 'golf-car', name: 'Golf Car', label: 'Transportasi', desc: 'Berkeliling area wisata yang luas dengan nyaman bersama keluarga tanpa perlu lelah berjalan.', image: imgGolfCar },
  { id: 'istana-balon', name: 'Istana Balon', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Arena melompat bebas berbahan balon tebal yang sangat disukai balita dan anak-anak prasekolah.', image: imgIstanaBalon },
  { id: 'karausel', name: 'Karausel', label: 'Wahana Keluarga', desc: 'Wahana komidi putar klasik dengan lampu-lampu indah dan musik menyenangkan yang selalu digemari sepanjang masa.', image: imgKarausel },
  { id: 'kereta-lokomotif', name: 'Kereta Lokomotif', label: 'Wahana Keluarga', subLabel: 'Free Untuk Tiket Terusan', desc: 'Keliling area wisata bersama keluarga dengan kereta lokomotif santai melintasi perkebunan.', image: imgKeretaLokomotif },
  { id: 'kereta-monorel', name: 'Kereta Monorel', label: 'Wahana Keluarga', subLabel: 'Free Untuk Tiket Terusan', desc: 'Menikmati pemandangan seluruh kawasan Kampung Coklat dari ketinggian rel monorel kami.', image: imgKeretaMonorel },
  { id: 'kolam-pemancingan', name: 'Kolam Pemancingan', label: 'Wahana Keluarga', desc: 'Bersantai sejenak sambil memancing ikan di kolam yang asri dan sejuk. Cocok untuk semua umur.', image: imgKolamPemancingan },
  { id: 'kolam-renang-anak', name: 'Kolam Renang Anak', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Berenang dan bermain air aman di kolam khusus dengan kedalaman yang didesain untuk anak-anak.', image: imgKolamRenangAnak },
  { id: 'kursi-pijat', name: 'Kursi Pijat', label: 'Relaksasi', desc: 'Istirahatkan tubuh Anda dengan pijatan refleksi 15 menit setelah lelah berjalan berkeliling.', image: imgKursiPijat },
  { id: 'mini-golf', name: 'Mini Golf', label: 'Wahana Keluarga', subLabel: 'Free Untuk Tiket Terusan', desc: 'Coba ketangkasan dan fokus Anda dalam memasukkan bola di area mini golf yang didesain apik.', image: imgMiniGolf },
  { id: 'mini-jeep', name: 'Mini Jeep', label: 'Wahana Anak', desc: 'Biarkan si kecil mengemudikan jeep mininya sendiri melintasi trek aman layaknya petualang kecil.', image: imgMiniJeep },
  { id: 'mini-swinger', name: 'Mini Swinger', label: 'Wahana Anak', desc: 'Ayunan berputar yang dirancang khusus untuk memberikan keseruan aman bagi si kecil.', image: imgMiniSwinger },
  { id: 'panahan', name: 'Panahan', label: 'Ketangkasan', subLabel: 'Free Untuk Tiket Terusan', desc: 'Latih konsentrasi dan ketepatan membidik target di area panahan kami dengan pengawasan profesional.', image: imgPanahan },
  { id: 'pancingan-anak', name: 'Pancingan Anak', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Permainan memancing magnet yang seru dan melatih kesabaran serta motorik halus anak.', image: imgPancinganAnak },
  { id: 'perahu-ceria', name: 'Perahu Ceria', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Mendayung perahu kecil khusus anak-anak dengan gembira di kolam dangkal yang aman.', image: imgPerahuCeria },
  { id: 'perahu-dayung', name: 'Perahu Dayung', label: 'Wahana Keluarga', subLabel: 'Free Untuk Tiket Terusan', desc: 'Nikmati suasana kolam asri dan romantis dengan mendayung perahu bersama.', image: imgPerahuDayung },
  { id: 'playground', name: 'Playground', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Arena bermain anak yang luas, dilengkapi dengan perosotan, jembatan tali, dan ayunan interaktif.', image: imgPlayground },
  { id: 'sepeda-listrik', name: 'Sepeda Listrik', label: 'Transportasi', desc: 'Eksplorasi area wisata lebih jauh dengan santai dan ramah lingkungan menggunakan sepeda listrik.', image: imgSepedaListrik },
  { id: 'sepeda-udara', name: 'Sepeda Udara', label: 'Petualangan', desc: 'Sensasi unik mengayuh sepeda di atas tali gantung dengan pemandangan menakjubkan dari udara.', image: imgSepedaUdara },
  { id: 'terapi-ikan', name: 'Terapi Ikan', label: 'Relaksasi', subLabel: 'Free Untuk Tiket Terusan', desc: 'Rasakan geli dan relaksasi dari pijatan halus ribuan ikan terapi di kolam kami.', image: imgTerapiIkan },
  { id: 'trampolin', name: 'Trampolin', label: 'Wahana Anak', subLabel: 'Free Untuk Tiket Terusan', desc: 'Melompat bebas dan tinggi untuk menyalurkan energi si kecil di wahana trampolin tertutup jaring.', image: imgTrampolin }
]

const edukasiTickets = [
  { id: 'paket-tk-paud', name: 'Paket Edukasi TK/PAUD', label: 'Edukasi Sekolah', desc: '<strong>Fasilitas:</strong><br/>- Tiket Masuk<br/>- Menghias Coklat<br/>- Biji Coklat<br/>- Perahu Ceria<br/>- Tour Guide<br/><br/>Berlaku untuk anak dan pendamping.', image: paket_tk },
  { id: 'paket-sd', name: 'Paket Edukasi SD', label: 'Edukasi Sekolah', desc: '<strong>Fasilitas:</strong><br/>- Tiket Masuk<br/>- Biji Coklat<br/>- Edukasi Pembibitan<br/>- Ice Breaking<br/>- Makan Siang Spesial<br/>- Tour Guide', image: paket_sd },
  { id: 'paket-smp', name: 'Paket Edukasi SMP', label: 'Edukasi Menengah', desc: '<strong>Fasilitas:</strong><br/>- Tiket Masuk<br/>- Biji Coklat<br/>- Edukasi Pasca Panen<br/>- Fun Game Kebersamaan<br/>- Makan Siang Spesial<br/>- Tour Guide', image: paket_smp },
  { id: 'paket-sma-univ', name: 'Paket Edukasi SMA & Univ', label: 'Edukasi Lanjut', desc: '<strong>Fasilitas:</strong><br/>- Tiket Masuk<br/>- Presentasi Industri Coklat<br/>- Edukasi Pengolahan Biji Kakao<br/>- Makan Siang Spesial<br/>- Sertifikat<br/>- Tour Guide', image: paket_sma }
]

const sewaTempatTickets = [
  { id: 'bale-coklat', name: 'Bale Coklat', label: 'Venue Terbuka', desc: 'Area santai berbentuk gazebo panjang berbahan bambu, cocok untuk reuni atau kumpul keluarga besar.', image: bale_coklat },
  { id: 'coklat-caffe', name: 'Coklat Caffe', label: 'Cafe & Resto', desc: 'Kafe bertema coklat dengan menu lengkap, bisa direservasi sebagian area untuk acara kasual Anda.', image: coklat_caffe },
  { id: 'coklat-garden', name: 'Coklat Garden', label: 'Outdoor Garden', desc: 'Taman rindang dengan dekorasi alami, sangat pas untuk acara garden party atau intimate wedding.', image: coklat_garden },
  { id: 'joglo-jatimarto', name: 'Joglo Jatimarto', label: 'Pendopo Tradisional', desc: 'Bangunan pendopo berarsitektur Jawa kental, memberikan nuansa klasik dan sejuk untuk pertemuan.', image: joglo_jatimarto },
  { id: 'kampung-coklat-hall', name: 'Kampung Coklat Hall', label: 'Hall Utama', desc: 'Hall indoor terbesar kami, ber-AC, dengan panggung megah untuk resepsi pernikahan skala besar.', image: kampung_coklat_hall },
  { id: 'pbk', name: 'Private Business Keep', label: 'Meeting Room VIP', desc: 'Ruang meeting VIP kedap suara, dilengkapi proyektor dan fasilitas presentasi bisnis yang mumpuni.', image: pbk },
  { id: 'ruang-pertemuan', name: 'Ruang Pertemuan R1', label: 'Meeting Room', desc: 'Ruangan sedang untuk seminar atau workshop dengan kapasitas hingga 50 orang.', image: ruang_pertemuan },
  { id: 'taman-edel', name: 'Taman Edel', label: 'Venue Semi-Outdoor', desc: 'Taman semi terbuka dengan peneduh alami, memberikan kesan sejuk walau di siang hari.', image: taman_edel },
  { id: 'theobromine-hall', name: 'Theobromine Hall', label: 'Hall Eksekutif', desc: 'Gedung eksklusif untuk acara korporat, gathering, dan pesta tertutup dengan akustik ruangan sangat baik.', image: theobromine_hall },
  { id: 'trinitario-hall', name: 'Trinitario Hall', label: 'Hall Klasik', desc: 'Hall bergaya klasik industrial untuk pameran, pementasan seni, maupun acara formal lainnya.', image: trinitario_hall },
  { id: 'wisma-criollo', name: 'Wisma Criollo', label: 'Guest House', desc: 'Penginapan eksklusif di dalam kawasan wisata, dilengkapi fasilitas lengkap untuk rombongan VIP.', image: wisma_criollo }
]
</script>`;

const newTemplate = \`
<template>
  <div class="self-service-page catalog-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hashtag">#KAMPUNGCOKLAT</span>
        <h1 class="hero-title">Katalog Wahana<br/>& Informasi</h1>
        <p class="hero-subtitle">
          Eksplorasi ragam fasilitas, wahana seru, dan venue pilihan di Kampung Coklat.
        </p>
        <div class="hero-location mt-4" style="justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#f29727" stroke="#2c1a13" stroke-width="2" style="margin-right:8px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>Jl. Banteng - Blorok No. 18, Kademangan, Blitar</span>
        </div>
      </div>
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill="#ffffff" d="M 0,130 L 0,20 C 50,20 50,110 100,110 C 150,110 150,15 200,15 C 250,15 250,80 300,80 C 350,80 350,25 400,25 C 437,25 437,100 475,100 C 512,100 512,10 550,10 C 600,10 600,90 650,90 C 700,90 700,30 750,30 C 800,30 800,115 850,115 C 900,115 900,20 950,20 C 987,20 987,70 1025,70 C 1062,70 1062,15 1100,15 C 1125,15 1125,95 1150,95 C 1175,95 1175,25 1200,25 L 1200,130 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Main Container -->
    <div class="main-container catalog-container">
      
      <!-- Category Selection Tabs -->
      <div class="category-tabs">
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Tiket Masuk' }" @click="selectedProduct = 'Tiket Masuk'">Tiket Masuk</button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Wahana Permainan' }" @click="selectedProduct = 'Wahana Permainan'">Wahana Permainan</button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Wisata Edukasi' }" @click="selectedProduct = 'Wisata Edukasi'">Paket Edukasi</button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Sewa Tempat' }" @click="selectedProduct = 'Sewa Tempat'">Sewa Tempat</button>
      </div>

      <!-- Catalog Grid -->
      <div class="catalog-grid">
        <template v-if="selectedProduct === 'Tiket Masuk'">
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
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Wahana Permainan'">
          <div class="elegant-card" v-for="product in wahanaTickets" :key="product.id">
            <div class="card-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <p class="card-desc">{{ product.desc }}</p>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Wisata Edukasi'">
          <div class="elegant-card" v-for="product in edukasiTickets" :key="product.id">
            <div class="card-image-wrapper edukasi-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image edukasi-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <div class="card-desc" v-html="product.desc"></div>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Sewa Tempat'">
          <div class="elegant-card" v-for="product in sewaTempatTickets" :key="product.id">
            <div class="card-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <p class="card-desc">{{ product.desc }}</p>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>
      </div>

    </div>

    <!-- Slide Over Panel (Article Modal) -->
    <div class="slide-over-overlay" :class="{ 'active': showArticleModal }" @click="closeArticleModal">
      <div class="slide-over-panel" :class="{ 'open': showArticleModal }" @click.stop>
        <button class="close-panel-btn" @click="closeArticleModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        
        <template v-if="selectedArticleItem">
          <div class="panel-hero">
            <img :src="selectedArticleItem.image" :alt="selectedArticleItem.name" />
            <div class="panel-badge">{{ selectedArticleItem.label }}</div>
          </div>
          <div class="panel-content">
            <h2 class="panel-title">{{ selectedArticleItem.name }}</h2>
            <div v-if="selectedArticleItem.subLabel" class="panel-sublabel">{{ selectedArticleItem.subLabel }}</div>
            
            <div class="panel-body">
              <div v-html="selectedArticleItem.desc"></div>
              
              <div class="extra-info mt-6">
                <h4>Informasi Tambahan</h4>
                <p>Jam operasional: 08:00 - 16:30 WIB</p>
                <p>Untuk reservasi grup, hubungi layanan pelanggan kami melalui halaman kontak.</p>
              </div>
            </div>
            
            <button class="btn-primary btn-block mt-8" @click="closeArticleModal">Tutup Informasi</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
\`;

// Replace script and template blocks
const styleMatch = content.match(/<style scoped>/);
if (!styleMatch) throw new Error("Could not find style tag");

const oldStyle = content.substring(styleMatch.index);

// Create new CSS block for slide-over and single grid
const newCss = \`
.catalog-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f8fafc;
}
.catalog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}
.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}
.tab-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
}
.tab-btn.active {
  background: #f29727;
  color: white;
  border-color: #f29727;
  box-shadow: 0 4px 12px rgba(242, 151, 39, 0.3);
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Elegant Card without Price */
.elegant-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}
.elegant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.1);
}
.card-image-wrapper {
  height: 180px;
  overflow: hidden;
  position: relative;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.elegant-card:hover .card-image {
  transform: scale(1.05);
}
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-price-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #f29727;
  margin-bottom: 8px;
}
.card-title {
  font-size: 18px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 12px 0;
  line-height: 1.3;
}
.card-divider {
  width: 40px;
  height: 3px;
  background: #e2e8f0;
  border-radius: 3px;
  margin-bottom: 12px;
}
.card-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}
.card-footer {
  margin-top: auto;
}
.btn-outline-primary {
  width: 100%;
  padding: 10px;
  border: 2px solid #f29727;
  color: #f29727;
  background: transparent;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-primary:hover {
  background: #f29727;
  color: white;
}

/* Slide-over Panel (Drawer) */
.slide-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}
.slide-over-overlay.active {
  opacity: 1;
  visibility: visible;
}
.slide-over-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100%;
  background: white;
  box-shadow: -5px 0 25px rgba(0,0,0,0.1);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.slide-over-panel.open {
  transform: translateX(0);
}
.close-panel-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 10;
  color: #1e293b;
  transition: transform 0.2s;
}
.close-panel-btn:hover {
  transform: scale(1.1);
}
.panel-hero {
  position: relative;
  width: 100%;
  height: 250px;
}
.panel-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.panel-badge {
  position: absolute;
  bottom: -15px;
  left: 24px;
  background: #f29727;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(242, 151, 39, 0.3);
}
.panel-content {
  padding: 40px 24px 24px;
}
.panel-title {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
  line-height: 1.2;
}
.panel-sublabel {
  display: inline-block;
  background: #e0f2fe;
  color: #0284c7;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 20px;
}
.panel-body {
  font-size: 15px;
  color: #475569;
  line-height: 1.7;
}
.extra-info {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 16px;
  border-radius: 12px;
}
.extra-info h4 {
  margin: 0 0 8px 0;
  color: #0f172a;
  font-size: 14px;
}
.extra-info p {
  margin: 0 0 4px 0;
  font-size: 13px;
}
.btn-block {
  width: 100%;
  padding: 14px;
  border: none;
  background: #1e293b;
  color: white;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-block:hover {
  background: #0f172a;
}
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }

/* Existing Hero CSS from old layout */
.hero-banner {
  position: relative;
  min-height: 380px;
  background-image: url('~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(29,19,14,0.9), rgba(29,19,14,0.7));
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
  margin-top: -30px;
}
.hashtag {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f29727;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.hero-subtitle {
  font-size: 16px;
  color: #e2e8f0;
  max-width: 500px;
  margin: 0 auto 24px auto;
  line-height: 1.6;
}
.hero-location {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
}
.torn-edge {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
}
.torn-edge svg {
  width: 100%;
  height: 100%;
}
\`

const fullFile = newScript + '\\n\\n' + newTemplate + '\\n\\n<style scoped>\\n' + newCss + '\\n</style>\\n';
fs.writeFileSync(file, fullFile, 'utf8');
console.log('File successfully updated!');
