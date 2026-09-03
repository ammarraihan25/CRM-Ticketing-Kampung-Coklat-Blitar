<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useState } from '#app'
import { useCrmNonMember } from '~/composables/useCrmNonMember'

const { addVisitor } = useCrmNonMember()

definePageMeta({
  layout: false,
  middleware: [
    function (to, from) {
      const authCookie = useCookie('selfServiceAuth')
      if (authCookie.value !== 'true') {
        return navigateTo('/ticketing_dan_gate/self-service/login')
      }
    }
  ]
})

const router = useRouter()
const route = useRoute()

// Use local state for self-service auth
const isUserLoggedIn = computed(() => useCookie('selfServiceAuth').value === 'true')

// Mock user state (for UI display only)
const userName = ref(useCookie('selfServiceUserName').value || 'Sobat Coklat')
const points = ref(150)

// Slides
import slide1 from '~/assets/assets_POS/slide/slide1.jpg'
import slide2 from '~/assets/assets_POS/slide/slide2.jpg'
import slide3 from '~/assets/assets_POS/slide/slide3.jpg'
import slide4 from '~/assets/assets_POS/slide/slide4.jpg'

// Booking Widget State
import AppDatePicker from '~/components/shared/AppDatePicker.vue'
import AppSelect from '~/components/shared/AppSelect.vue'

const selectedService = ref('Tiket Masuk')
const bookingDate = ref('')
const visitType = ref('Regular')

const serviceOptions = [
  { value: 'Tiket Masuk', label: 'Tiket Masuk' },
  { value: 'Wahana Permainan', label: 'Wahana Permainan' },
  { value: 'Wisata Edukasi', label: 'Wisata Edukasi' },
  { value: 'Sewa Tempat', label: 'Sewa Hall / Tempat' }
]

const visitTypeOptions = [
  { value: 'Regular', label: 'Regular (Individu/Keluarga)' },
  { value: 'Rombongan', label: 'Rombongan (>20 Org)' }
]
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
    // Scroll to the selected service category
    const categoryId = 'cat-' + selectedService.value.replace(/\s+/g, '-')
    const el = document.getElementById(categoryId)
    if (el) {
      activeMenu.value = 'pesan-tiket'
      const y = el.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      scrollToSection('pesan-tiket')
    }
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

const defaultCatalogTickets = [
  // Tiket Masuk
  { id: 'tiket-reguler', category: 'Tiket Masuk', name: 'Tiket Masuk Reguler', label: 'Tiket Utama', subLabel: '', price: 15000, desc: 'Akses masuk bebas mengeksplorasi area umum Kampung Coklat.', image: imgKolamDewasa },
  { id: 'tiket-terusan', category: 'Tiket Masuk', name: 'Tiket Masuk Terusan', label: 'Paket Spesial', subLabel: '', price: 35000, desc: 'Termasuk akses puluhan wahana permainan secara gratis dan tanpa batas (Unlimited).', image: imgKolamDewasa },
  
  // Wahana
  { id: 'animal-feeding', category: 'Wahana Permainan', name: 'Animal Feeding', label: 'IDR 2000', subLabel: 'Tersedia', price: 2000, desc: 'Bermain sambil belajar dan berinteraksi langsung dengan hewan-hewan lucu.', image: imgAnimalFeeding },
  { id: 'animal-toys', category: 'Wahana Permainan', name: 'Animal Toys', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Mainan hewan tunggang yang seru untuk anak-anak berkeliling di jalur aman.', image: imgAnimalToys },
  { id: 'atv', category: 'Wahana Permainan', name: 'ATV Ride', label: 'IDR 25000', subLabel: 'Tersedia', price: 25000, desc: 'Pacu adrenalin Anda di lintasan ATV Kampung Coklat yang menantang.', image: imgAtv },
  { id: 'bom-bom-car', category: 'Wahana Permainan', name: 'Bom Bom Car', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Serunya tabrakan aman dan menyenangkan di arena bom bom car berkeamanan canggih.', image: imgBomBomCar },
  { id: 'flying-fox', category: 'Wahana Permainan', name: 'Flying Fox', label: 'IDR 20000', subLabel: 'Tersedia', price: 20000, desc: 'Meluncur bebas melintasi rindangnya kebun kakao dari ketinggian.', image: imgFlyingFox },
  { id: 'golf-car', category: 'Wahana Permainan', name: 'Golf Car', label: 'IDR 25000', subLabel: 'Tersedia', price: 25000, desc: 'Berkeliling area wisata yang luas dengan nyaman bersama keluarga.', image: imgGolfCar },
  { id: 'istana-balon', category: 'Wahana Permainan', name: 'Istana Balon', label: 'IDR 10000', subLabel: 'Tersedia', price: 10000, desc: 'Arena melompat bebas berbahan balon tebal yang sangat disukai anak-anak.', image: imgIstanaBalon },
  { id: 'karausel', category: 'Wahana Permainan', name: 'Karausel', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Wahana komidi putar klasik dengan lampu-lampu indah dan musik menyenangkan.', image: imgKarausel },
  { id: 'kereta-lokomotif', category: 'Wahana Permainan', name: 'Kereta Lokomotif', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Keliling area wisata bersama keluarga dengan kereta lokomotif santai.', image: imgKeretaLokomotif },
  { id: 'kereta-monorel', category: 'Wahana Permainan', name: 'Kereta Monorel', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Menikmati pemandangan seluruh kawasan Kampung Coklat dari ketinggian rel monorel.', image: imgKeretaMonorel },
  { id: 'kolam-pemancingan', category: 'Wahana Permainan', name: 'Kolam Pemancingan', label: 'IDR 0', subLabel: 'Tersedia', price: 0, desc: 'Bersantai sejenak sambil memancing ikan di kolam yang asri dan sejuk.', image: imgKolamPemancingan },
  { id: 'kolam-renang-anak', category: 'Wahana Permainan', name: 'Kolam Renang Anak', label: 'IDR 10000', subLabel: 'Tersedia', price: 10000, desc: 'Berenang dan bermain air aman di kolam khusus kedalaman anak-anak.', image: imgKolamRenangAnak },
  { id: 'kursi-pijat', category: 'Wahana Permainan', name: 'Kursi Pijat', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Istirahatkan tubuh Anda dengan pijatan refleksi 15 menit.', image: imgKursiPijat },
  { id: 'mini-golf', category: 'Wahana Permainan', name: 'Mini Golf', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Coba ketangkasan dan fokus Anda dalam memasukkan bola di area mini golf.', image: imgMiniGolf },
  { id: 'mini-jeep', category: 'Wahana Permainan', name: 'Mini Jeep', label: 'IDR 25000', subLabel: 'Tersedia', price: 25000, desc: 'Biarkan si kecil mengemudikan jeep mininya sendiri melintasi trek aman.', image: imgMiniJeep },
  { id: 'mini-swinger', category: 'Wahana Permainan', name: 'Mini Swinger', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Ayunan berputar yang dirancang khusus untuk memberikan keseruan bagi si kecil.', image: imgMiniSwinger },
  { id: 'panahan', category: 'Wahana Permainan', name: 'Panahan', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Latih konsentrasi dan ketepatan membidik target di area panahan kami.', image: imgPanahan },
  { id: 'pancingan-anak', category: 'Wahana Permainan', name: 'Pancingan Anak', label: 'IDR 10000', subLabel: 'Tersedia', price: 10000, desc: 'Permainan memancing magnet yang seru dan melatih ketelitian anak.', image: imgPancinganAnak },
  { id: 'perahu-ceria', category: 'Wahana Permainan', name: 'Perahu Ceria', label: 'IDR 10000', subLabel: 'Tersedia', price: 10000, desc: 'Mendayung perahu kecil khusus anak-anak di kolam dangkal yang aman.', image: imgPerahuCeria },
  { id: 'perahu-dayung', category: 'Wahana Permainan', name: 'Perahu Dayung', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Nikmati suasana kolam asri dan sejuk dengan mendayung perahu bersama.', image: imgPerahuDayung },
  { id: 'playground', category: 'Wahana Permainan', name: 'Playground', label: 'IDR 15000', subLabel: 'Tersedia', price: 15000, desc: 'Arena bermain anak yang luas, perosotan, jembatan tali, dan ayunan.', image: imgPlayground },
  { id: 'sepeda-listrik', category: 'Wahana Permainan', name: 'Sepeda Listrik', label: 'IDR 35000', subLabel: 'Tersedia', price: 35000, desc: 'Eksplorasi area wisata lebih jauh dengan sepeda listrik ramah lingkungan.', image: imgSepedaListrik },
  { id: 'sepeda-udara', category: 'Wahana Permainan', name: 'Sepeda Udara', label: 'IDR 20000', subLabel: 'Tersedia', price: 20000, desc: 'Sensasi unik mengayuh sepeda di atas tali gantung dengan pemandangan kebun kakao.', image: imgSepedaUdara },
  { id: 'terapi-ikan', category: 'Wahana Permainan', name: 'Terapi Ikan', label: 'IDR 5000', subLabel: 'Tersedia', price: 5000, desc: 'Rasakan geli dan relaksasi dari pijatan halus ribuan ikan terapi di kolam kami.', image: imgTerapiIkan },
  { id: 'trampolin', category: 'Wahana Permainan', name: 'Trampolin', label: 'IDR 10000', subLabel: 'Tersedia', price: 10000, desc: 'Melompat bebas dan tinggi di wahana trampolin tertutup jaring pengaman.', image: imgTrampolin },

  // Wisata Edukasi
  {
    id: 'paket-tk-paud',
    category: 'Wisata Edukasi',
    name: 'Paket Edukasi TK / PAUD',
    label: 'Wisata Edukasi',
    subLabel: '',
    price: 35000,
    desc: 'Paket Reguler:\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Kokurikuler (Binatang/Tumbuhan): Rp 39.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Kemah Ceria Prasiaga:\n• Kemah Ceria 1: Rp 50.000 | 2: Rp 37.000 | 3: Rp 32.000\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000',
    image: paket_tk
  },
  {
    id: 'paket-sd',
    category: 'Wisata Edukasi',
    name: 'Paket Edukasi SD',
    label: 'Wisata Edukasi',
    subLabel: '',
    price: 32000,
    desc: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax\n• Industri Coklat: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000',
    image: paket_sd
  },
  {
    id: 'paket-smp',
    category: 'Wisata Edukasi',
    name: 'Paket Edukasi SMP',
    label: 'Wisata Edukasi',
    subLabel: '',
    price: 32000,
    desc: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000',
    image: paket_smp
  },
  {
    id: 'paket-sma-univ',
    category: 'Wisata Edukasi',
    name: 'Paket Edukasi SMA / Mahasiswa',
    label: 'Wisata Edukasi',
    subLabel: '',
    price: 32000,
    desc: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000',
    image: paket_sma
  },

  // Sewa Tempat
  { id: 'bale-coklat', category: 'Sewa Hall & Tempat', name: 'Bale Coklat', label: 'Sewa Tempat', subLabel: '', price: 500000, desc: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas atau keluarga.', image: bale_coklat },
  { id: 'coklat-caffe', category: 'Sewa Hall & Tempat', name: 'Coklat Caffe', label: 'Sewa Tempat', subLabel: '', price: 300000, desc: 'Kafe bernuansa alam untuk acara santai kumpul komunitas.', image: coklat_caffe },
  { id: 'coklat-garden', category: 'Sewa Hall & Tempat', name: 'Coklat Garden', label: 'Sewa Tempat', subLabel: '', price: 400000, desc: 'Area taman terbuka yang hijau, ideal untuk pesta kebun atau acara outdoor.', image: coklat_garden },
  { id: 'joglo-jatimarto', category: 'Sewa Hall & Tempat', name: 'Joglo Jatimarto', label: 'Sewa Tempat', subLabel: '', price: 750000, desc: 'Pendopo tradisional bernuansa klasik Jawa untuk pertemuan keluarga.', image: joglo_jatimarto },
  { id: 'kampung-coklat-hall', category: 'Sewa Hall & Tempat', name: 'Kampung Coklat Hall', label: 'Sewa Tempat', subLabel: '', price: 1500000, desc: 'Ruangan indoor eksklusif untuk acara besar pernikahan atau seminar.', image: kampung_coklat_hall },
  { id: 'pbk', category: 'Sewa Hall & Tempat', name: 'Private Business Room (PBR)', label: 'Sewa Tempat', subLabel: '', price: 1000000, desc: 'Ruang pertemuan VIP eksklusif untuk rapat bisnis dan negosiasi.', image: pbk },
  { id: 'ruang-pertemuan', category: 'Sewa Hall & Tempat', name: 'Ruang Pertemuan R1', label: 'Sewa Tempat', subLabel: '', price: 500000, desc: 'Ruang rapat skala menengah dengan fasilitas meeting lengkap.', image: ruang_pertemuan },
  { id: 'taman-edel', category: 'Sewa Hall & Tempat', name: 'Taman Edel', label: 'Sewa Tempat', subLabel: '', price: 350000, desc: 'Taman eksotis dengan pepohonan rindang untuk acara santai bersama keluarga.', image: taman_edel },
  { id: 'theobromine-hall', category: 'Sewa Hall & Tempat', name: 'Theobromine Hall', label: 'Sewa Tempat', subLabel: '', price: 1200000, desc: 'Hall megah dengan arsitektur menawan untuk perayaan atau konferensi.', image: theobromine_hall },
  { id: 'trinitario-hall', category: 'Sewa Hall & Tempat', name: 'Trinitario Hall', label: 'Sewa Tempat', subLabel: '', price: 2000000, desc: 'Hall paling luas dan premium dengan dekorasi mewah untuk resepsi.', image: trinitario_hall },
  { id: 'wisma-criollo', category: 'Sewa Hall & Tempat', name: 'Wisma Criollo', label: 'Sewa Tempat', subLabel: '', price: 850000, desc: 'Gedung pertemuan eksklusif bernuansa elegan untuk acara VIP atau korporat.', image: wisma_criollo }
]

const availableTickets = computed(() => {
  const allowedCategories = ['gate', 'wahana', 'edukasi', 'venue']
  const active = ticketRates.value.filter(t => t.isActive && allowedCategories.includes(t.category))
  if (active.length > 0) {
    return active.map(t => {
      let label = ''
      if (t.category === 'gate') label = 'Tiket Utama'
      else if (t.category === 'wahana') label = `IDR ${t.price}`
      else if (t.category === 'edukasi') label = 'Wisata Edukasi'
      else if (t.category === 'venue') label = 'Sewa Tempat'

      return {
        id: t.id,
        category: categoryMap[t.category],
        name: t.name,
        label: label,
        subLabel: t.category === 'wahana' ? 'Tersedia' : '',
        price: t.price,
        desc: t.description || 'Fasilitas Kampung Coklat',
        image: t.imageUrl || imgKolamDewasa
      }
    })
  }
  return defaultCatalogTickets
})


const formatArticleDesc = (desc: string) => {
  if (!desc) return ''
  if (desc.includes('<div style=') || desc.includes('<ul style=')) return desc

  // Process text with headings and bullets
  const sections = desc.split('\n\n')
  return sections
    .map(sec => {
      const lines = sec.split('\n').map(l => l.trim()).filter(Boolean)
      if (lines.length === 0) return ''
      
      let html = '<div class="article-desc-block">'
      lines.forEach(line => {
        if (line.endsWith(':') || (line.startsWith('Paket ') && line.includes(':'))) {
          html += `<div class="article-desc-heading">${line}</div>`
        } else if (line.startsWith('•') || line.startsWith('-')) {
          const cleanText = line.replace(/^[•\-]\s*/, '')
          html += `<div class="article-desc-item"><span class="item-bullet">•</span><span class="item-text">${cleanText}</span></div>`
        } else {
          html += `<p class="article-desc-paragraph">${line}</p>`
        }
      })
      html += '</div>'
      return html
    })
    .join('')
}

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

const resetSlideInterval = () => {
  if (slideInterval) clearInterval(slideInterval)
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % sliderArticles.value.length
  }, 6000)
}

const prevSlide = () => {
  if (currentSlideIndex.value > 0) {
    currentSlideIndex.value--
  } else {
    currentSlideIndex.value = sliderArticles.value.length - 1
  }
  resetSlideInterval()
}

const nextSlide = () => {
  if (currentSlideIndex.value < sliderArticles.value.length - 1) {
    currentSlideIndex.value++
  } else {
    currentSlideIndex.value = 0
  }
  resetSlideInterval()
}

const promoVouchersList = ref([
  {
    code: 'WEEKDAY-COCOA10',
    name: 'FLASH PROMO HARI KERJA (10% OFF)',
    discountType: 'percentage',
    discountValue: 10,
    desc: 'Diskon 10% tiket reguler untuk kunjungan hari kerja (Selasa - Kamis)'
  },
  {
    code: 'KEDIRI-SERU15',
    name: 'PROMO DOMISILI KEDIRI RAYA (15% OFF)',
    discountType: 'percentage',
    discountValue: 15,
    desc: 'Potongan 15% khusus pengunjung domisili Kab & Kota Kediri'
  },
  {
    code: 'TOUR-BUS-20',
    name: 'INSENTIF ROMBONGAN TRAVEL AGENT (20% OFF)',
    discountType: 'percentage',
    discountValue: 20,
    desc: 'Khusus kemitraan B2B rombongan bus / travel agent'
  },
  {
    code: 'PENGAJIAN-FREE',
    name: 'VOUCHER FREE TIKET PENGAJIAN (100% OFF)',
    discountType: 'free',
    discountValue: 100,
    desc: 'Free 1 tiket masuk khusus jamaah pengajian'
  }
])

const isVoucherDropdownOpen = ref(false)
const selectedVoucherDropdown = ref('')
const voucherCodeInput = ref('')
const memberWaInput = ref('')
const appliedVoucher = ref<any>(null)
const appliedMember = ref<any>(null)
const voucherError = ref('')
const memberError = ref('')
const isEditingMember = ref(false)

const selectVoucherOption = (voucher: any) => {
  voucherError.value = ''
  if (!voucher) {
    removeVoucher()
    selectedVoucherDropdown.value = ''
  } else if (voucher === 'CUSTOM') {
    selectedVoucherDropdown.value = 'CUSTOM'
    appliedVoucher.value = null
    voucherCodeInput.value = ''
  } else {
    selectedVoucherDropdown.value = voucher.code
    appliedVoucher.value = {
      code: voucher.code,
      name: voucher.name,
      type: voucher.discountType,
      value: voucher.discountValue,
      desc: voucher.desc
    }
    voucherCodeInput.value = voucher.code
  }
  isVoucherDropdownOpen.value = false
}

// Cart & Payment Logic
const cart = ref<any[]>([])
const showPaymentModal = ref(false)
const showMobileOrderDetails = ref(false)
const paymentSuccess = ref(false)
const showMobileCart = ref(false)
const paymentMethod = ref('transfer')
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

const checkAutoMembership = () => {
  const isAuth = useCookie('selfServiceAuth').value === 'true'
  const cookieUserName = useCookie('selfServiceUserName').value || 'Sobat Coklat'
  const cookiePhone = useCookie('selfServiceUserPhone').value || '081234567890'

  if (isAuth && !appliedMember.value) {
    appliedMember.value = {
      nama: cookieUserName,
      whatsapp: cookiePhone,
      tipeMember: 'Sobat Coklat Member',
      isAuto: true
    }
  }
}

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % sliderArticles.value.length
  }, 5000)

  checkAutoMembership()

  if (route.query.voucher) {
    voucherCodeInput.value = route.query.voucher as string;
    validateVoucher();
  }
})

const onSelectVoucherDropdown = () => {
  voucherError.value = ''
  if (!selectedVoucherDropdown.value) {
    removeVoucher()
    return
  }
  if (selectedVoucherDropdown.value === 'CUSTOM') {
    appliedVoucher.value = null
    voucherCodeInput.value = ''
    return
  }
  const found = promoVouchersList.value.find(v => v.code === selectedVoucherDropdown.value)
  if (found) {
    appliedVoucher.value = {
      code: found.code,
      name: found.name,
      type: found.discountType,
      value: found.discountValue,
      desc: found.desc
    }
    voucherCodeInput.value = found.code
  }
}

const validateVoucher = async () => {
  if (!voucherCodeInput.value) return;
  voucherError.value = '';
  
  // Local check first
  const localPromo = promoVouchersList.value.find(v => v.code.toUpperCase() === voucherCodeInput.value.trim().toUpperCase())
  if (localPromo) {
    appliedVoucher.value = {
      code: localPromo.code,
      name: localPromo.name,
      type: localPromo.discountType,
      value: localPromo.discountValue,
      desc: localPromo.desc
    }
    selectedVoucherDropdown.value = localPromo.code
    voucherError.value = ''
    return
  }

  try {
    const res = await fetch('/api/v1/voucher/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: voucherCodeInput.value, whatsapp: appliedMember.value?.whatsapp })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      appliedVoucher.value = data.data;
      voucherError.value = '';
    } else {
      voucherError.value = data.message || 'Voucher tidak valid atau sudah kedaluwarsa';
      appliedVoucher.value = null;
    }
  } catch (error) {
    voucherError.value = 'Kode voucher tidak ditemukan';
    appliedVoucher.value = null;
  }
}

const validateMember = async () => {
  if (!memberWaInput.value) return;
  memberError.value = '';
  try {
    const res = await fetch(`/api/v1/members/${memberWaInput.value}`);
    const data = await res.json();
    if (res.ok && data) {
      appliedMember.value = { ...data, whatsapp: memberWaInput.value, isAuto: false };
      memberError.value = '';
      isEditingMember.value = false;
    } else {
      memberError.value = data.message || 'Member tidak ditemukan';
      appliedMember.value = null;
    }
  } catch (error) {
    // Fallback: accept entered WA as active member
    appliedMember.value = {
      nama: 'Member (' + memberWaInput.value + ')',
      whatsapp: memberWaInput.value,
      tipeMember: 'Sobat Coklat Member',
      isAuto: false
    }
    memberError.value = '';
    isEditingMember.value = false;
  }
}

const removeVoucher = () => {
  appliedVoucher.value = null;
  voucherCodeInput.value = '';
  selectedVoucherDropdown.value = '';
}

const removeMember = () => {
  appliedMember.value = null;
  memberWaInput.value = '';
  isEditingMember.value = true;
}

// Diskon Member: 10%
const memberDiscountAmount = computed(() => {
  if (!appliedMember.value) return 0
  return Math.round((cartSubtotal.value * 10) / 100)
})

// Diskon Voucher: Percentage atau Free Tiket
const voucherDiscountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  if (appliedVoucher.value.type === 'percentage') {
    return Math.round((cartSubtotal.value * appliedVoucher.value.value) / 100)
  } else if (appliedVoucher.value.type === 'fixed') {
    return Math.min(appliedVoucher.value.value, cartSubtotal.value)
  } else if (appliedVoucher.value.type === 'free') {
    // Potongan harga setara 1 tiket masuk reguler (Rp 15.000)
    return Math.min(15000, cartSubtotal.value)
  }
  return 0
})

// Diskon Rombongan: 10% jika >= 20 item
const rombonganDiscountAmount = computed(() => {
  if (visitType.value === 'Rombongan' && totalCartQuantity.value >= 20) {
    return Math.round((cartSubtotal.value * 10) / 100)
  }
  return 0
})

const totalDiscountAmount = computed(() => {
  return Math.min(cartSubtotal.value, memberDiscountAmount.value + voucherDiscountAmount.value + rombonganDiscountAmount.value)
})

const finalTotal = computed(() => {
  return Math.max(0, cartSubtotal.value - totalDiscountAmount.value)
})

const proceedToPayment = () => {
  if (visitType.value === 'Rombongan' && totalCartQuantity.value < 20) {
    showRombonganWarning.value = true
    return
  }
  checkAutoMembership()
  showPaymentModal.value = true
  showMobileCart.value = false
}

const getCartTotal = () => {
  return finalTotal.value
}

const processPayment = () => {
  transactionId.value = 'TRX-' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
  paymentSuccess.value = true
  
  if (!appliedMember.value) {
    addVisitor({
      nama: useCookie('selfServiceUserName').value || 'Sobat Coklat',
      whatsapp: useCookie('selfServiceUserPhone').value || '-',
      domisili: 'Online',
      source: 'Self-Service',
      totalSpend: finalTotal.value
    })
  }

  setTimeout(() => {
    showPaymentModal.value = false
    showTicketModal.value = true
  }, 1500)
}

const closeTicketModal = () => {
  showTicketModal.value = false
  cart.value = []
  paymentSuccess.value = false
  // reset voucher and member after successful checkout
  removeVoucher()
  removeMember()
}

const printTicket = () => {
  const ticketElement = document.getElementById('printable-ticket-card')
  if (!ticketElement) {
    window.print()
    return
  }

  // Remove existing print frame if any
  const existingFrame = document.getElementById('ticket-print-frame')
  if (existingFrame) {
    existingFrame.remove()
  }

  const printIframe = document.createElement('iframe')
  printIframe.id = 'ticket-print-frame'
  printIframe.style.position = 'fixed'
  printIframe.style.right = '0'
  printIframe.style.bottom = '0'
  printIframe.style.width = '0'
  printIframe.style.height = '0'
  printIframe.style.border = '0'
  printIframe.style.visibility = 'hidden'
  document.body.appendChild(printIframe)

  const iframeDoc = printIframe.contentWindow?.document
  if (!iframeDoc) {
    window.print()
    return
  }

  iframeDoc.open()
  iframeDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>E-Tiket-${transactionId.value || 'Kampung-Coklat'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=JetBrains+Mono:wght@700;800&display=swap" rel="stylesheet">
        <style>
          @page {
            size: landscape A4;
            margin: 6mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: #FFFFFF;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .ticket-pass-card {
            display: flex;
            flex-direction: row;
            width: 256mm;
            max-width: 256mm;
            max-height: 170mm;
            background: #FFFFFF;
            border-radius: 16px;
            border: 2px solid #CBD5E1;
            overflow: hidden;
            box-shadow: none;
            position: relative;
            margin: auto;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .tpc-main {
            flex: 6.4;
            padding: 18px 22px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%);
          }
          .tpc-header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1.5px solid #F1ECE4;
          }
          .tpc-brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .tpc-logo {
            height: 34px;
            object-fit: contain;
          }
          .tpc-brand-name {
            margin: 0;
            font-size: 16px;
            font-weight: 900;
            color: #2C1A13;
            letter-spacing: 0.5px;
          }
          .tpc-brand-tag {
            font-size: 10px;
            font-weight: 800;
            color: #D97706;
            letter-spacing: 0.8px;
          }
          .tpc-service-badge {
            background: #ECFDF5;
            color: #065F46;
            font-size: 11px;
            font-weight: 900;
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid #A7F3D0;
          }
          .tpc-title-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .tpc-heading {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            color: #1E293B;
          }
          .tpc-code-sub {
            font-size: 11.5px;
            color: #64748B;
          }
          .tpc-code-sub strong {
            font-family: 'JetBrains Mono', monospace;
            color: #D97706;
          }
          .tpc-status-verified {
            font-size: 10.5px;
            font-weight: 900;
            color: #047857;
            background: #D1FAE5;
            padding: 3px 8px;
            border-radius: 6px;
            border: 1px solid #6EE7B7;
          }
          .tpc-grid-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 14px;
            background: #FFFDF9;
            border: 1.5px dashed #E6D7C3;
            border-radius: 14px;
            padding: 10px 14px;
          }
          .tpc-meta-col {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .tpc-meta-col.span-2 {
            grid-column: span 2;
            border-top: 1px dashed #F1ECE4;
            padding-top: 6px;
            margin-top: 2px;
          }
          .tpc-meta-label {
            font-size: 10.5px;
            font-weight: 700;
            color: #8C6A4F;
            text-transform: uppercase;
          }
          .tpc-meta-value {
            font-size: 13.5px;
            font-weight: 800;
            color: #2C1A13;
          }
          .tpc-meta-value.highlight {
            color: #B45309;
          }
          .tpc-meta-value.price {
            color: #059669;
            font-weight: 900;
          }
          .tpc-items-section {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .tpc-items-heading {
            font-size: 11.5px;
            font-weight: 800;
            color: #475569;
          }
          .tpc-items-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tpc-item-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            background: #FFFFFF;
            border: 1.5px solid #E2E8F0;
            padding: 4px 10px;
            border-radius: 8px;
            font-size: 12px;
          }
          .tpc-qty-tag {
            font-weight: 900;
            color: #D97706;
            background: #FEF3C7;
            padding: 1px 5px;
            border-radius: 4px;
            font-size: 11px;
          }
          .tpc-item-label {
            font-weight: 700;
            color: #1E293B;
          }
          .tpc-gate-notice {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 11px;
            color: #64748B;
            background: #F8FAFC;
            padding: 8px 12px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
          }
          .tpc-gate-notice svg {
            color: #D97706;
            flex-shrink: 0;
          }
          .tpc-perforation {
            width: 20px;
            position: relative;
            display: flex;
            justify-content: center;
            background: #FFFFFF;
          }
          .tpc-dash-line {
            width: 2px;
            height: 100%;
            border-left: 2.5px dashed #CBD5E1;
          }
          .tpc-notch-top, .tpc-notch-bottom {
            position: absolute;
            width: 22px;
            height: 22px;
            background: #FFFFFF;
            border: 1.5px solid #CBD5E1;
            border-radius: 50%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 5;
          }
          .tpc-notch-top { top: -11px; }
          .tpc-notch-bottom { bottom: -11px; }
          .tpc-stub {
            flex: 3.6;
            background: #064E3B;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 22px 16px;
            text-align: center;
          }
          .tpc-stub-header {
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-bottom: 12px;
          }
          .tpc-stub-title {
            font-size: 14px;
            font-weight: 900;
            color: #FBBF24;
            letter-spacing: 0.8px;
          }
          .tpc-stub-sub {
            font-size: 10px;
            font-weight: 800;
            color: #A7F3D0;
            letter-spacing: 0.5px;
          }
          .tpc-qr-card {
            background: #FFFFFF;
            padding: 8px;
            border-radius: 12px;
            margin-bottom: 8px;
          }
          .tpc-qr-code {
            width: 125px;
            height: 125px;
            display: block;
          }
          .tpc-qr-code-text {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 1px;
            color: #FEF3C7;
            margin-bottom: 8px;
          }
          .tpc-stub-validity {
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(16, 185, 129, 0.2);
            border: 1px solid #34D399;
            color: #6EE7B7;
            font-size: 11px;
            font-weight: 800;
            padding: 3px 10px;
            border-radius: 20px;
            margin-bottom: 4px;
          }
          .tpc-active-dot {
            width: 6px;
            height: 6px;
            background: #34D399;
            border-radius: 50%;
          }
          .tpc-valid-date {
            font-size: 11px;
            color: #CBD5E1;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        ${ticketElement.outerHTML}
      </body>
    </html>
  `)
  iframeDoc.close()

  setTimeout(() => {
    printIframe.contentWindow?.focus()
    printIframe.contentWindow?.print()
  }, 350)
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
          <label class="widget-field-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
            <span>LAYANAN</span>
          </label>
          <div class="input-container" style="min-width: 170px;">
            <AppSelect 
              v-model="selectedService" 
              :options="serviceOptions" 
              placeholder="Pilih Layanan"
            />
          </div>
        </div>
        
        <div class="widget-divider"></div>

        <div class="widget-field">
          <label class="widget-field-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>TANGGAL KUNJUNGAN</span>
          </label>
          <div class="input-container" style="min-width: 170px;">
            <AppDatePicker 
              v-model="bookingDate" 
              placeholder="Pilih Tanggal"
            />
          </div>
        </div>

        <div class="widget-divider"></div>

        <div class="widget-field">
          <label class="widget-field-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>TIPE KUNJUNGAN</span>
          </label>
          <div class="input-container" style="min-width: 170px;">
            <AppSelect 
              v-model="visitType" 
              :options="visitTypeOptions" 
              placeholder="Pilih Tipe"
            />
          </div>
        </div>

        <div class="widget-action">
          <button class="cta-btn" @click="handleQuickBook">
            <span>Pesan Sekarang</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>

      </div>

      <!-- Extra fields for Rombongan -->
      <div v-if="visitType === 'Rombongan'" class="booking-widget rombongan-extra" style="margin-top: 16px;">
        <div class="widget-field">
          <label class="widget-field-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span>NAMA INSTANSI / SEKOLAH</span>
          </label>
          <div class="input-container">
            <input type="text" v-model="instansiName" placeholder="Contoh: SD Negeri 1 Coklat" />
          </div>
        </div>
        <div class="widget-divider"></div>
        <div class="widget-field">
          <label class="widget-field-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="7" r="4"></circle><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path></svg>
            <span>NAMA PENANGGUNG JAWAB (PIC)</span>
          </label>
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
          <!-- Tombol Panah Geser Kiri & Kanan Melayang -->
          <button class="slider-arrow-btn prev" @click="prevSlide" aria-label="Slide Sebelumnya" title="Slide Sebelumnya">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button class="slider-arrow-btn next" @click="nextSlide" aria-label="Slide Selanjutnya" title="Slide Selanjutnya">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

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
                    @click="currentSlideIndex = index; resetSlideInterval()">
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
            <h4 class="category-title" :id="'cat-' + categoryName.replace(/\s+/g, '-')">{{ categoryName }}</h4>
            <div class="category-line"></div>
          </div>

          <div class="dt-grid">
            <div v-for="ticket in categoryTickets" :key="ticket.id" class="dt-card">
              <div class="dt-img-container" :class="{ 'dt-img-edu': categoryName === 'Wisata Edukasi' }">
                <img :src="ticket.image" :alt="ticket.name" class="dt-img" />
              </div>
              <div class="dt-body">
                <h4 class="dt-title">{{ ticket.name }}</h4>
                <div class="dt-desc" v-html="formatArticleDesc(ticket.desc)"></div>
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
    <div class="modal-overlay" v-if="showPaymentModal" @click.self="showPaymentModal = false">
      <div class="payment-modal-container">
        
        <!-- Header Modal -->
        <div class="pm-modal-top-bar">
          <div class="pm-brand-title">
            <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Logo" class="pm-logo" />
            <div>
              <h3 class="pm-main-heading">Pembayaran & Konfirmasi Tiket</h3>
              <p class="pm-sub-heading">Selesaikan transaksi untuk mendapatkan E-Tiket resmi Kampung Coklat</p>
            </div>
          </div>
          <button class="pm-close-btn" @click="showPaymentModal = false" aria-label="Tutup">&times;</button>
        </div>

        <div class="pm-layout">
          <!-- Left Column: Payment Methods -->
          <div class="pm-left-panel">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-amber">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              </div>
              <div>
                <h4 class="pm-panel-title">Pilih Metode Pembayaran</h4>
                <p class="pm-panel-subtitle">Metode terverifikasi otomatis dan instan</p>
              </div>
            </div>
            
            <div class="pm-methods-container">
              <!-- TRANSFER -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'transfer'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Transfer Bank / Virtual Account</span>
                    <span class="pm-method-desc">Verifikasi otomatis 24 jam tanpa upload bukti transfer</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="transfer" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'transfer'">
                  <div class="pm-bank-list">
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bca">BCA</span> Bank Central Asia (Virtual Account)</div>
                      <input type="radio" name="bank" checked class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo mandiri">MDR</span> Bank Mandiri (Virtual Account)</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bni">BNI</span> Bank Negara Indonesia (Virtual Account)</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                    <label class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bri">BRI</span> Bank Rakyat Indonesia (BRIVA)</div>
                      <input type="radio" name="bank" class="pm-radio-custom" />
                    </label>
                  </div>
                </div>
              </label>

              <!-- QRIS -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'qris'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">QRIS (Gopay, OVO, Dana, ShopeePay, BCA Mobile)</span>
                    <span class="pm-method-desc">Scan langsung dan bayar instan dari semua aplikasi E-Wallet</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="qris" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'qris'">
                  <div class="pm-qris-box">
                    <div class="pm-qr-preview-card">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=QRIS-KAMPUNG-COKLAT-OFFICIAL" alt="QRIS Code" class="pm-qr-img" />
                      <div class="pm-qris-badge">QRIS STANDAR NASIONAL</div>
                    </div>
                    <p class="pm-qris-hint">Buka aplikasi E-Wallet atau Mobile Banking Anda, lalu scan kode QR di atas</p>
                  </div>
                </div>
              </label>

              <!-- DEBIT/KREDIT -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'debit'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Kartu Debit / Kredit (Mesin EDC)</span>
                    <span class="pm-method-desc">Bayar di kasir self-service menggunakan kartu debit/kredit</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="debit" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'debit'">
                  <div class="pm-edc-card-input-box">
                    <label class="pm-edc-field-label">Nomor Referensi Kartu EDC (Opsional)</label>
                    <div class="pm-edc-input-wrapper">
                      <div class="pm-edc-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                      </div>
                      <input type="text" class="pm-edc-input-control" placeholder="Contoh: 4589 **** **** 1024" />
                    </div>
                    <span class="pm-edc-hint">Masukkan 4 digit terakhir kartu atau no. transaksi pada struk EDC</span>
                  </div>
                </div>
              </label>
            </div>

            <div class="pm-left-footer">
              <button class="pm-btn-primary" @click="processPayment">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>BAYAR & CETAK STRUK SEKARANG</span>
              </button>
              <button class="pm-btn-secondary" @click="showPaymentModal = false">Batal & Kembali ke Katalog</button>
            </div>
          </div>

          <!-- Mobile Toggle Detail Pesanan Button (Shown on mobile only) -->
          <div class="pm-mobile-detail-toggle-bar">
            <button type="button" class="pm-mobile-detail-toggle-btn" :class="{ 'active': showMobileOrderDetails }" @click="showMobileOrderDetails = !showMobileOrderDetails">
              <div class="pm-mdt-left">
                <div class="pm-mdt-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                </div>
                <div class="pm-mdt-info">
                  <span class="pm-mdt-title">Detail Pesanan & Diskon</span>
                  <span class="pm-mdt-badge">{{ totalCartQuantity }} Tiket • Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
                </div>
              </div>
              <div class="pm-mdt-action">
                <span>{{ showMobileOrderDetails ? 'Sembunyikan' : 'Lihat Detail' }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pm-mdt-arrow" :class="{ 'rotate': showMobileOrderDetails }"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </button>
          </div>

          <!-- Right Column: Order Summary & Integrated Promo/Membership (Collapsible on mobile) -->
          <div class="pm-right-panel" :class="{ 'mobile-visible': showMobileOrderDetails }">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <div>
                <h4 class="pm-panel-title">Detail Pesanan</h4>
                <p class="pm-panel-subtitle">Rincian tiket, diskon member & promo</p>
              </div>
            </div>
            
            <!-- Trip Information Capsule -->
            <div class="pm-trip-card">
              <div class="pm-trip-row">
                <span class="pm-trip-label">Layanan</span>
                <span class="pm-trip-val">{{ selectedService }}</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">Tanggal Kunjungan</span>
                <span class="pm-trip-val">{{ bookingDate ? formatDate(bookingDate) : 'Hari Ini' }}</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">Tipe Kunjungan</span>
                <span class="pm-trip-val highlight">{{ visitType }}</span>
              </div>
              <div v-if="visitType === 'Rombongan'" class="pm-trip-row">
                <span class="pm-trip-label">Instansi / Rombongan</span>
                <span class="pm-trip-val">{{ instansiName || '-' }}</span>
              </div>
              <div v-if="visitType === 'Rombongan'" class="pm-trip-row">
                <span class="pm-trip-label">PIC Rombongan</span>
                <span class="pm-trip-val">{{ picName || '-' }}</span>
              </div>
            </div>

            <!-- PROMO & MEMBERSHIP INTEGRATION SECTION -->
            <div class="pm-promo-membership-box">
              <div class="pm-box-header">
                <span class="pm-box-title">Promo & Diskon Member</span>
                <span class="pm-auto-tag">Otomatis Terintegrasi</span>
              </div>

              <!-- 1. Auto Membership Recognition -->
              <div v-if="appliedMember && !isEditingMember" class="pm-member-active-card">
                <div class="pm-member-left">
                  <div class="pm-member-badge-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div class="pm-member-info">
                    <div class="pm-member-title-row">
                      <span class="pm-member-status">MEMBER AKTIF</span>
                      <span class="pm-member-benefit">Diskon 10% Otomatis</span>
                    </div>
                    <span class="pm-member-name">{{ appliedMember.nama || userName }}</span>
                    <span class="pm-member-phone">{{ appliedMember.whatsapp || 'Akun Sobat Coklat' }}</span>
                  </div>
                </div>
                <button type="button" class="pm-btn-member-edit" @click="removeMember" title="Ganti nomor member">
                  Ganti
                </button>
              </div>

              <!-- Manual Member Input if editing / not detected -->
              <div v-else class="pm-member-manual-input">
                <div class="pm-input-label-row">
                  <label>Cek Nomor WhatsApp Membership</label>
                </div>
                <div class="pm-input-btn-group">
                  <input type="text" v-model="memberWaInput" placeholder="Contoh: 081234567890" class="pm-text-input" />
                  <button type="button" class="pm-btn-action-sm" @click="validateMember">Verifikasi</button>
                </div>
                <div v-if="memberError" class="pm-error-msg">{{ memberError }}</div>
              </div>

              <!-- 2. Custom Interactive Voucher Picker Dropdown -->
              <div class="pm-voucher-section">
                <div class="pm-input-label-row">
                  <label>Pilih Voucher Promo</label>
                  <NuxtLink to="/ticketing_dan_gate/self-service/promo" target="_blank" class="pm-link-promo">Lihat Semua Promo</NuxtLink>
                </div>

                <!-- Custom Elegant Dropdown Trigger -->
                <div class="pm-custom-dropdown-container">
                  <div class="pm-custom-dropdown-trigger" 
                       :class="{ 'is-open': isVoucherDropdownOpen, 'has-value': appliedVoucher }" 
                       @click="isVoucherDropdownOpen = !isVoucherDropdownOpen">
                    <div class="pm-trigger-content">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pm-trigger-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                      <span v-if="appliedVoucher" class="pm-trigger-text selected">
                        <strong>{{ appliedVoucher.code }}</strong> - {{ appliedVoucher.name }}
                      </span>
                      <span v-else-if="selectedVoucherDropdown === 'CUSTOM'" class="pm-trigger-text custom">
                        Mode Input Kode Voucher Manual
                      </span>
                      <span v-else class="pm-trigger-text placeholder">
                        Pilih Voucher Promo dari Katalog...
                      </span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pm-arrow-icon" :class="{ 'rotate': isVoucherDropdownOpen }"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>

                  <!-- Floating Custom Menu -->
                  <div v-if="isVoucherDropdownOpen" class="pm-custom-dropdown-menu">
                    <div class="pm-dropdown-header-tip">Pilih Voucher Tersedia:</div>
                    
                    <div class="pm-dropdown-option-item" 
                         v-for="v in promoVouchersList" 
                         :key="v.code"
                         :class="{ 'is-selected': appliedVoucher?.code === v.code }"
                         @click="selectVoucherOption(v)">
                      <div class="pm-opt-left">
                        <span class="pm-opt-code-badge">{{ v.code }}</span>
                        <div class="pm-opt-text">
                          <div class="pm-opt-title">{{ v.name }}</div>
                          <div class="pm-opt-desc">{{ v.desc }}</div>
                        </div>
                      </div>
                      <span class="pm-opt-badge-discount">
                        {{ v.discountType === 'percentage' ? `${v.discountValue}% OFF` : (v.discountType === 'free' ? 'FREE 1 TIKET' : `Rp ${v.discountValue.toLocaleString('id-ID')}`) }}
                      </span>
                    </div>

                    <div class="pm-dropdown-divider"></div>

                    <div class="pm-dropdown-option-item custom-btn-opt" 
                         :class="{ 'is-selected': selectedVoucherDropdown === 'CUSTOM' }"
                         @click="selectVoucherOption('CUSTOM')">
                      <div class="pm-opt-left">
                        <span class="pm-opt-plus-icon">+</span>
                        <span class="pm-opt-title font-bold">Masukkan Kode Voucher Manual...</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Custom Voucher Manual Input if selected -->
                <div v-if="selectedVoucherDropdown === 'CUSTOM'" class="pm-custom-voucher-row">
                  <input type="text" v-model="voucherCodeInput" placeholder="Ketik Kode Promo..." class="pm-text-input uppercase" />
                  <button type="button" class="pm-btn-action-sm amber" @click="validateVoucher">Terapkan</button>
                </div>

                <div v-if="voucherError" class="pm-error-msg">{{ voucherError }}</div>

                <!-- Active Voucher Pill -->
                <div v-if="appliedVoucher" class="pm-voucher-active-card">
                  <div class="pm-voucher-left">
                    <div class="pm-voucher-tag-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                    </div>
                    <div>
                      <div class="pm-voucher-code-title">
                        <strong>{{ appliedVoucher.code }}</strong>
                        <span class="pm-voucher-val-badge">
                          {{ appliedVoucher.type === 'percentage' ? `${appliedVoucher.value}% OFF` : (appliedVoucher.type === 'free' ? 'FREE 1 TIKET' : `POTONGAN Rp ${appliedVoucher.value.toLocaleString('id-ID')}`) }}
                        </span>
                      </div>
                      <p class="pm-voucher-desc">{{ appliedVoucher.desc || appliedVoucher.name }}</p>
                    </div>
                  </div>
                  <button type="button" class="pm-btn-voucher-remove" @click="removeVoucher" title="Hapus voucher">&times;</button>
                </div>
              </div>
            </div>

            <!-- Itemized Order List -->
            <div class="pm-order-items-box">
              <div class="pm-items-header">Rincian Item ({{ totalCartQuantity }} Tiket/Wahana)</div>
              
              <div class="pm-items-scroll">
                <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="pm-order-item">
                  <div class="pm-item-row">
                    <span class="pm-item-name">{{ item.name }}</span>
                    <span class="pm-item-price">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</span>
                  </div>
                  <div class="pm-item-qty-row">
                    <span class="pm-item-qty">{{ item.qty }}x</span>
                    <span class="pm-item-unit">@ Rp {{ item.price.toLocaleString('id-ID') }}</span>
                  </div>
                </div>
              </div>

              <!-- Calculation Breakdown -->
              <div class="pm-calc-breakdown">
                <div class="pm-calc-row">
                  <span class="pm-calc-label">Subtotal Pesanan</span>
                  <span class="pm-calc-val">Rp {{ cartSubtotal.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Member -->
                <div v-if="memberDiscountAmount > 0" class="pm-calc-row discount emerald">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Diskon Member Kampung Coklat (10%)
                  </span>
                  <span class="pm-calc-val">- Rp {{ memberDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Voucher Promo -->
                <div v-if="voucherDiscountAmount > 0" class="pm-calc-row discount amber">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Voucher Promo ({{ appliedVoucher.code }})
                  </span>
                  <span class="pm-calc-val">- Rp {{ voucherDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Rombongan -->
                <div v-if="rombonganDiscountAmount > 0" class="pm-calc-row discount blue">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Diskon Rombongan >= 20 Pax (10%)
                  </span>
                  <span class="pm-calc-val">- Rp {{ rombonganDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>

            <!-- Final Grand Total -->
            <div class="pm-order-footer">
              <div class="pm-total-card">
                <div class="pm-total-info">
                  <span class="pm-total-title">Total Tagihan</span>
                  <span class="pm-total-sub">Sudah termasuk PPN & potongan diskon</span>
                </div>
                <div class="pm-total-value">
                  Rp {{ getCartTotal().toLocaleString('id-ID') }}
                </div>
              </div>

              <!-- Mobile Pay & Cancel Buttons (Shown on mobile screens only) -->
              <div class="pm-mobile-action-buttons">
                <button class="pm-btn-primary" @click="processPayment">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>BAYAR & CETAK STRUK SEKARANG</span>
                </button>
                <button class="pm-btn-secondary" @click="showPaymentModal = false">Batal & Kembali ke Katalog</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Ticket/Success Modal & Printable Boarding Pass -->
    <div class="ticket-modal-backdrop" v-if="showTicketModal" @click.self="closeTicketModal">
      
      <!-- Top Status Banner (Hidden in Print) -->
      <div class="ticket-modal-top-header no-print">
        <div class="tmt-check-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
          <h2 class="tmt-title">Pembayaran Berhasil!</h2>
          <p class="tmt-subtitle">E-Tiket resmi telah terbit dan siap digunakan pada pintu masuk gerbang</p>
        </div>
      </div>

      <!-- The Official Boarding Pass (Printed Area) -->
      <div class="ticket-pass-card" id="printable-ticket-card">
        
        <!-- Left Main: Ticket Details -->
        <div class="tpc-main">
          <!-- Top Header Info -->
          <div class="tpc-header-bar">
            <div class="tpc-brand">
              <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Logo" class="tpc-logo" />
              <div>
                <h3 class="tpc-brand-name">KAMPUNG COKLAT</h3>
                <span class="tpc-brand-tag">WISATA EDUKASI & KELUARGA</span>
              </div>
            </div>
            <div class="tpc-service-badge">
              {{ selectedService.toUpperCase() }}
            </div>
          </div>

          <div class="tpc-title-row">
            <div>
              <h2 class="tpc-heading">E-TIKET MASUK & WAHANA</h2>
              <span class="tpc-code-sub">NO. TIKET: <strong>#{{ transactionId || 'KC-89240182' }}</strong></span>
            </div>
            <span class="tpc-status-verified">LUNAS / VERIFIED</span>
          </div>

          <!-- Metadata 4-Box Grid -->
          <div class="tpc-grid-card">
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Tanggal Kunjungan</span>
              <span class="tpc-meta-value highlight">{{ bookingDate ? formatDate(bookingDate) : 'Hari Ini (Berlaku Hari Ini)' }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Tipe Kunjungan</span>
              <span class="tpc-meta-value">{{ visitType }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Pemesan / Member</span>
              <span class="tpc-meta-value">{{ appliedMember?.nama || userName || 'Sobat Coklat' }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Total Pembayaran</span>
              <span class="tpc-meta-value price">Rp {{ getCartTotal().toLocaleString('id-ID') }}</span>
            </div>
            <div v-if="visitType === 'Rombongan'" class="tpc-meta-col span-2">
              <span class="tpc-meta-label">Instansi / PIC Rombongan</span>
              <span class="tpc-meta-value">{{ instansiName || '-' }} (PIC: {{ picName || '-' }})</span>
            </div>
          </div>

          <!-- Access Items -->
          <div class="tpc-items-section">
            <div class="tpc-items-heading">Rincian Akses Masuk & Wahana ({{ totalCartQuantity }} Item):</div>
            <div class="tpc-items-badges">
              <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="tpc-item-pill">
                <span class="tpc-qty-tag">{{ item.qty }}x</span>
                <span class="tpc-item-label">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- Gate Notice -->
          <div class="tpc-gate-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            <span>Scan barcode pada scanner Turnstile Gate di pintu masuk utama atau tunjukkan ke petugas kasir wahana.</span>
          </div>
        </div>

        <!-- Perforated Divider with Notches -->
        <div class="tpc-perforation">
          <div class="tpc-notch-top"></div>
          <div class="tpc-dash-line"></div>
          <div class="tpc-notch-bottom"></div>
        </div>

        <!-- Right Stub: QR Scanner & Validity -->
        <div class="tpc-stub">
          <div class="tpc-stub-header">
            <span class="tpc-stub-title">KAMPUNG COKLAT</span>
            <span class="tpc-stub-sub">OFFICIAL PASS</span>
          </div>

          <div class="tpc-qr-card">
            <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + (transactionId || 'KC-TIX-89240182')" 
                 alt="QR E-Tiket" 
                 class="tpc-qr-code" />
          </div>

          <div class="tpc-qr-code-text">
            {{ transactionId || 'KC-TIX-89240182' }}
          </div>

          <div class="tpc-stub-validity">
            <span class="tpc-active-dot"></span>
            <span>TIKET AKTIF</span>
          </div>
          
          <div class="tpc-valid-date">
            {{ bookingDate ? formatDate(bookingDate) : 'HARI INI' }}
          </div>
        </div>

      </div><!-- end .ticket-pass-card -->

      <!-- Action Buttons (Hidden in Print) -->
      <div class="ticket-modal-actions no-print">
        <button class="tma-btn-print" @click="printTicket">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>CETAK E-TIKET SEKARANG</span>
        </button>
        <button class="tma-btn-close" @click="closeTicketModal">
          Selesai & Tutup
        </button>
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
  max-width: 1240px;
  margin: -95px auto 0; /* Pull up over the curve */
  padding: 0 24px;
}

.booking-widget {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 20px 45px -10px rgba(44, 26, 19, 0.16), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1.5px solid #FDE68A;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: all 0.3s ease;
}

@media (min-width: 992px) {
  .booking-widget {
    flex-direction: row;
    align-items: center;
    border-radius: 100px; /* Pill shape on desktop */
    padding: 12px 18px 12px 32px;
    gap: 6px;
  }
}

.booking-widget:hover {
  box-shadow: 0 24px 50px -10px rgba(44, 26, 19, 0.22), 0 0 0 2px rgba(245, 158, 11, 0.3);
}

.booking-widget.rombongan-extra {
  margin-top: 16px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background: #FFFBEB;
  border-color: #FCD34D;
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
  min-width: 0;
  padding: 6px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.widget-field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  color: #B45309; /* Warm brown-gold accent */
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.input-container select,
.input-container input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 700;
  color: #1E293B;
  padding: 4px 6px 4px 0;
  outline: none;
  font-family: inherit;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.widget-divider {
  display: none;
  width: 1.5px;
  height: 40px;
  background: linear-gradient(to bottom, #F1F5F9, #E2E8F0, #F1F5F9);
  margin: 0 8px;
  flex-shrink: 0;
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
  margin-top: 18px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media (min-width: 992px) {
  .widget-action {
    margin-top: 0;
    margin-left: 14px;
    padding-right: 4px;
    width: auto;
  }
}

.cta-btn {
  background: linear-gradient(135deg, #D97706 0%, #B45309 50%, #92400E 100%);
  color: #ffffff;
  border: 1.5px solid #FCD34D;
  border-radius: 100px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 8px 20px -4px rgba(180, 83, 9, 0.45);
  margin: 0 auto;
}

.cta-btn:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 14px 28px -4px rgba(217, 119, 6, 0.55);
}

.cta-btn:active {
  transform: translateY(0) scale(0.99);
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

.slider-arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border: 1.5px solid #E2E8F0;
  color: #2C1A13;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 4px 16px rgba(44, 26, 19, 0.16);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.slider-arrow-btn.prev {
  left: 18px;
}

.slider-arrow-btn.next {
  right: 18px;
}

.slider-arrow-btn:hover {
  background: #2C1A13;
  color: #F59E0B;
  border-color: #2C1A13;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 22px rgba(44, 26, 19, 0.28);
}

.slider-arrow-btn:active {
  transform: translateY(-50%) scale(0.95);
}

@media (max-width: 768px) {
  .slider-arrow-btn {
    width: 36px;
    height: 36px;
  }
  .slider-arrow-btn.prev {
    left: 8px;
  }
  .slider-arrow-btn.next {
    right: 8px;
  }
}

.slider-track {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-item {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  flex-shrink: 0;
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
  padding: 40px 75px 40px 40px; /* 75px safe padding prevents arrow button from covering article text */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  position: relative;
  box-sizing: border-box;
}

.slide-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.slide-desc {
  font-size: 15.5px;
  color: #64748B;
  line-height: 1.8;
  margin: 0 0 24px 0;
}

.slide-btn {
  align-self: flex-start;
  padding: 12px 26px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: white;
  font-weight: 800;
  font-size: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

.slide-btn:hover {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4);
}

.slider-indicators {
  position: absolute;
  bottom: 24px;
  left: 75%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator-dot {
  width: 9px;
  height: 9px;
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
  font-size: 12.5px;
  color: #64748B;
  margin: 0 0 16px 0;
  line-height: 1.5;
  flex: 1;
}

:deep(.article-desc-block) {
  margin-bottom: 8px;
}

:deep(.article-desc-block:last-child) {
  margin-bottom: 0;
}

:deep(.article-desc-heading) {
  font-weight: 700;
  color: #1E293B;
  font-size: 12.5px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: block;
}

:deep(.article-desc-item) {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 3px;
}

:deep(.item-bullet) {
  color: #D97706;
  font-weight: 800;
  flex-shrink: 0;
  font-size: 13px;
}

:deep(.item-text) {
  flex: 1;
}

:deep(.article-desc-paragraph) {
  font-size: 12.5px;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 4px 0;
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

/* Payment Modal Enhanced Design */
.payment-modal-container {
  background: #FFFFFF;
  width: 1160px;
  max-width: 96vw;
  height: 90vh;
  max-height: 780px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  box-shadow: 0 25px 60px -15px rgba(44, 26, 19, 0.35), 0 0 0 1px rgba(226, 232, 240, 0.8);
  animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.96) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.pm-modal-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: linear-gradient(135deg, #FAF5ED 0%, #F5EBE1 100%);
  border-bottom: 1.5px solid #E6D7C3;
  flex-shrink: 0;
}

.pm-brand-title {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.pm-logo {
  height: 36px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.12));
  flex-shrink: 0;
}

.pm-main-heading {
  margin: 0;
  font-size: 17px;
  font-weight: 900;
  color: #2C1A13;
  letter-spacing: -0.2px;
}

.pm-sub-heading {
  margin: 2px 0 0 0;
  font-size: 11.5px;
  color: #78350F;
  font-weight: 600;
}

.pm-close-btn {
  background: #FFFFFF;
  border: 1px solid #D6BFA8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 20px;
  color: #6E442B;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
  flex-shrink: 0;
}

.pm-close-btn:hover {
  background: #2C1A13;
  color: #F59E0B;
  border-color: #2C1A13;
  transform: rotate(90deg) scale(1.08);
}

.pm-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  background: #F8FAFC;
}

.pm-left-panel {
  flex: 5.5;
  background: #FFFFFF;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: 1.5px solid #E2E8F0;
}

.pm-right-panel {
  flex: 4.5;
  background: #F8FAFC;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.pm-mobile-action-buttons {
  display: none;
}

.pm-mobile-detail-toggle-bar {
  display: none;
}

/* RESPONSIVE MOBILE & TABLET MODAL */
@media (max-width: 900px) {
  .payment-modal-container {
    width: 96vw;
    max-width: 96vw;
    height: 94vh;
    max-height: 94vh;
    border-radius: 20px;
  }

  .pm-modal-top-bar {
    padding: 12px 16px;
  }

  .pm-logo {
    height: 28px;
  }

  .pm-main-heading {
    font-size: 14.5px;
  }

  .pm-sub-heading {
    font-size: 10.5px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pm-close-btn {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }

  .pm-layout {
    flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .pm-left-panel {
    flex: none;
    width: 100%;
    overflow: visible;
    border-right: none;
    border-bottom: 1.5px solid #E2E8F0;
    padding: 16px;
    box-sizing: border-box;
  }

  /* Mobile Detail Pesanan Toggle Button */
  .pm-mobile-detail-toggle-bar {
    display: block;
    padding: 12px 16px;
    background: #F8FAFC;
    border-bottom: 1.5px solid #E2E8F0;
    box-sizing: border-box;
  }

  .pm-mobile-detail-toggle-btn {
    width: 100%;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 14px;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.25s ease;
  }

  .pm-mobile-detail-toggle-btn:hover,
  .pm-mobile-detail-toggle-btn.active {
    border-color: #10B981;
    background: #F0FDF4;
  }

  .pm-mdt-left {
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
  }

  .pm-mdt-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #D1FAE5;
    color: #059669;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pm-mdt-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pm-mdt-title {
    font-size: 13px;
    font-weight: 800;
    color: #1E293B;
  }

  .pm-mdt-badge {
    font-size: 11px;
    font-weight: 700;
    color: #059669;
  }

  .pm-mdt-action {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 800;
    color: #059669;
  }

  .pm-mdt-arrow {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .pm-mdt-arrow.rotate {
    transform: rotate(180deg);
  }

  /* Right Panel is hidden by default on mobile, revealed when toggle clicked */
  .pm-right-panel {
    display: none;
    flex: none;
    width: 100%;
    overflow: visible;
    padding: 16px;
    box-sizing: border-box;
    background: #F8FAFC;
    border-bottom: 2px solid #E2E8F0;
  }

  .pm-right-panel.mobile-visible {
    display: flex;
    animation: pmSlideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes pmSlideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .pm-left-footer {
    display: flex;
    margin-top: 18px;
  }

  .pm-mobile-action-buttons {
    display: none;
  }

  .pm-section-header {
    margin-bottom: 14px;
    gap: 10px;
  }

  .pm-icon-circle {
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .pm-panel-title {
    font-size: 14.5px;
  }

  .pm-panel-subtitle {
    font-size: 11px;
  }

  .pm-method-header {
    padding: 12px 14px;
  }

  .pm-method-title {
    font-size: 13px;
  }

  .pm-method-desc {
    font-size: 11px;
  }

  .pm-bank-option {
    padding: 8px 12px;
  }

  .pm-bank-name {
    font-size: 12px;
    gap: 8px;
  }

  .bank-logo {
    font-size: 9.5px;
    padding: 2px 6px;
  }

  .pm-member-active-card {
    padding: 10px 12px;
    gap: 8px;
  }

  .pm-member-left {
    gap: 8px;
  }

  .pm-member-name {
    font-size: 12px;
  }

  .pm-items-scroll {
    max-height: 180px;
  }

  .pm-total-card {
    padding: 12px 16px;
  }

  .pm-total-title {
    font-size: 13.5px;
  }

  .pm-total-value {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .pm-brand-title {
    gap: 8px;
  }

  .pm-main-heading {
    font-size: 13.5px;
  }

  .pm-sub-heading {
    display: none;
  }

  .pm-left-panel, .pm-right-panel {
    padding: 14px 12px;
  }

  .pm-member-title-row {
    flex-wrap: wrap;
  }

  .pm-total-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .pm-total-value {
    align-self: flex-end;
  }
}

.pm-section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.pm-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-icon-circle.bg-amber {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(217, 119, 6, 0.25);
}

.pm-icon-circle.bg-emerald {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
}

.pm-panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #1E293B;
}

.pm-panel-subtitle {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #64748B;
  font-weight: 500;
}

/* Left Panel: Payment Methods */
.pm-methods-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.pm-method-card {
  display: block;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: #FFFFFF;
  overflow: hidden;
}

.pm-method-card:hover {
  border-color: #CBD5E1;
  transform: translateY(-1px);
}

.pm-method-card.active {
  border-color: #F59E0B;
  background: #FFFDF9;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.12), 0 0 0 1px rgba(245, 158, 11, 0.2);
}

.pm-method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
}

.pm-method-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.pm-method-title {
  font-weight: 800;
  color: #1E293B;
  font-size: 14px;
}

.pm-method-desc {
  font-size: 11.5px;
  color: #64748B;
  font-weight: 500;
}

.pm-radio-custom {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #CBD5E1;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  margin: 0;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.pm-radio-custom:checked {
  border-color: #D97706;
  background: #FFF;
}

.pm-radio-custom:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  background: #D97706;
  border-radius: 50%;
}

.pm-method-body {
  padding: 0 18px 16px;
  border-top: 1px dashed #E2E8F0;
  margin-top: 2px;
  padding-top: 14px;
}

.pm-bank-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-bank-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pm-bank-option:hover {
  background: #F8FAFC;
  border-color: #CBD5E1;
}

.pm-bank-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 13px;
  color: #1E293B;
}

.bank-logo {
  font-size: 10px;
  font-weight: 900;
  color: #FFFFFF;
  padding: 3px 7px;
  border-radius: 5px;
  letter-spacing: 0.5px;
  font-family: 'JetBrains Mono', monospace;
}

.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }

/* EDC Debit / Kredit Card Input Styling */
.pm-edc-card-input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #FDFBF7;
  border: 1.5px solid #F3E8D6;
  border-radius: 12px;
  padding: 14px 16px;
}

.pm-edc-field-label {
  font-size: 12px;
  font-weight: 800;
  color: #5C3822;
  letter-spacing: 0.2px;
}

.pm-edc-input-wrapper {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 1.5px solid #E2D9CC;
  border-radius: 10px;
  padding: 2px 12px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.pm-edc-input-wrapper:focus-within {
  border-color: #D97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
}

.pm-edc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #92400E;
  margin-right: 10px;
  flex-shrink: 0;
}

.pm-edc-input-control {
  flex: 1;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  font-size: 13.5px;
  font-weight: 700;
  color: #1E293B;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
  padding: 8px 0;
  width: 100%;
}

.pm-edc-input-control::placeholder {
  color: #94A3B8;
  font-weight: 500;
}

.pm-edc-hint {
  font-size: 11px;
  color: #78350F;
  font-weight: 500;
}

.pm-qris-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  text-align: center;
}

.pm-qr-preview-card {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px 20px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.pm-qr-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  border-radius: 6px;
}

.pm-qris-badge {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #64748B;
  background: #F1F5F9;
  padding: 3px 8px;
  border-radius: 4px;
}

.pm-qris-hint {
  margin: 10px 0 0 0;
  font-size: 12px;
  color: #64748B;
  max-width: 320px;
  line-height: 1.45;
  font-weight: 500;
}

.pm-left-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #F1F5F9;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF;
  font-size: 14.5px;
  font-weight: 800;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(217, 119, 6, 0.3);
  letter-spacing: 0.3px;
}

.pm-btn-primary:hover {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.4);
}

.pm-btn-secondary {
  width: 100%;
  background: transparent;
  color: #64748B;
  font-size: 13px;
  font-weight: 700;
  padding: 8px;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.pm-btn-secondary:hover {
  color: #1E293B;
}

/* Right Panel: Trip & Breakdown */
.pm-trip-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}

.pm-trip-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
}

.pm-trip-label {
  color: #64748B;
  font-weight: 600;
}

.pm-trip-val {
  color: #1E293B;
  font-weight: 700;
}

.pm-trip-val.highlight {
  color: #D97706;
  font-weight: 800;
}

/* Promo & Membership Integration Box */
.pm-promo-membership-box {
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.03);
}

.pm-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}

.pm-box-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #1E293B;
}

.pm-auto-tag {
  font-size: 10.5px;
  font-weight: 800;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid #A7F3D0;
}

/* Active Member Card */
.pm-member-active-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: 12px;
  padding: 10px 14px;
}

.pm-member-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pm-member-badge-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #059669;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-member-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pm-member-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pm-member-status {
  font-size: 10px;
  font-weight: 900;
  color: #065F46;
  letter-spacing: 0.5px;
}

.pm-member-benefit {
  font-size: 10px;
  font-weight: 800;
  color: #047857;
  background: #FFFFFF;
  padding: 1px 6px;
  border-radius: 10px;
  border: 1px solid #6EE7B7;
}

.pm-member-name {
  font-size: 13px;
  font-weight: 800;
  color: #064E3B;
}

.pm-member-phone {
  font-size: 11px;
  color: #047857;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
}

.pm-btn-member-edit {
  background: #FFFFFF;
  border: 1px solid #A7F3D0;
  color: #047857;
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-btn-member-edit:hover {
  background: #065F46;
  color: #FFFFFF;
  border-color: #065F46;
}

.pm-input-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.pm-input-label-row label {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}

.pm-link-promo {
  font-size: 11.5px;
  font-weight: 700;
  color: #D97706;
  text-decoration: none;
}

.pm-link-promo:hover {
  text-decoration: underline;
}

.pm-input-btn-group, .pm-custom-voucher-row {
  display: flex;
  gap: 8px;
}

.pm-custom-voucher-row {
  margin-top: 8px;
}

.pm-text-input {
  flex: 1;
  border: 1.5px solid #E2E8F0;
  border-radius: 9px;
  padding: 8px 12px;
  font-size: 12.5px;
  color: #1E293B;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
  background: #FFFFFF;
}

.pm-text-input:focus {
  border-color: #F59E0B;
}

.pm-text-input.uppercase {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Custom Interactive Voucher Dropdown */
.pm-custom-dropdown-container {
  position: relative;
  width: 100%;
}

.pm-custom-dropdown-trigger {
  width: 100%;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  padding: 10px 14px;
  background: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  min-width: 0;
}

.pm-custom-dropdown-trigger:hover {
  border-color: #CBD5E1;
  background: #FAF5EE;
}

.pm-custom-dropdown-trigger.is-open {
  border-color: #D97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
  background: #FFFDF9;
}

.pm-custom-dropdown-trigger.has-value {
  border-color: #FBBF24;
  background: #FFFDF7;
}

.pm-trigger-content {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  flex: 1;
  min-width: 0;
}

.pm-trigger-icon {
  color: #D97706;
  flex-shrink: 0;
}

.pm-trigger-text {
  font-size: 12.5px;
  font-weight: 600;
  color: #1E293B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
  display: block;
}

.pm-trigger-text.placeholder {
  color: #64748B;
  font-weight: 500;
}

.pm-trigger-text.selected {
  color: #78350F;
}

.pm-trigger-text.selected strong {
  font-family: 'JetBrains Mono', monospace;
  color: #B45309;
}

.pm-trigger-text.custom {
  color: #D97706;
  font-style: italic;
}

.pm-arrow-icon {
  color: #64748B;
  transition: transform 0.25s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.pm-arrow-icon.rotate {
  transform: rotate(180deg);
  color: #D97706;
}

/* Floating Custom Menu */
.pm-custom-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  box-shadow: 0 16px 36px -8px rgba(44, 26, 19, 0.2), 0 0 0 1px rgba(0,0,0,0.02);
  z-index: 99;
  animation: dropdownAnim 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 6px;
  box-sizing: border-box;
}

@keyframes dropdownAnim {
  from { opacity: 0; transform: translateY(-8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.pm-dropdown-header-tip {
  font-size: 11px;
  font-weight: 800;
  color: #94A3B8;
  padding: 6px 10px 4px 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pm-dropdown-option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 8px;
}

.pm-dropdown-option-item:hover {
  background: #FAF5ED;
}

.pm-dropdown-option-item.is-selected {
  background: #FEF3C7;
}

.pm-opt-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  overflow: hidden;
}

.pm-opt-code-badge {
  font-size: 11px;
  font-weight: 900;
  color: #78350F;
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  padding: 3px 6px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}

.pm-opt-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.pm-opt-title {
  font-size: 12px;
  font-weight: 800;
  color: #1E293B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pm-opt-desc {
  font-size: 11px;
  color: #64748B;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pm-opt-badge-discount {
  font-size: 10.5px;
  font-weight: 900;
  color: #FFFFFF;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  padding: 3px 8px;
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.25);
}

.pm-dropdown-divider {
  height: 1px;
  background: #F1F5F9;
  margin: 4px 6px;
}

.custom-btn-opt {
  color: #D97706;
}

.custom-btn-opt .pm-opt-title {
  color: #D97706;
  font-weight: 800;
}

.pm-opt-plus-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 14px;
}

.pm-btn-action-sm {
  background: #1E293B;
  color: #FFFFFF;
  border: none;
  border-radius: 9px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.pm-btn-action-sm:hover {
  background: #D97706;
}

.pm-btn-action-sm.amber {
  background: #D97706;
}

.pm-btn-action-sm.amber:hover {
  background: #B45309;
}

.pm-error-msg {
  color: #DC2626;
  font-size: 11.5px;
  margin-top: 4px;
  font-weight: 600;
}

/* Active Voucher Card */
.pm-voucher-active-card {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border: 1.5px solid #FCD34D;
  border-radius: 12px;
  padding: 10px 14px;
}

.pm-voucher-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pm-voucher-tag-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #D97706;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-voucher-code-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pm-voucher-code-title strong {
  font-size: 13px;
  color: #78350F;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.5px;
}

.pm-voucher-val-badge {
  font-size: 10.5px;
  font-weight: 900;
  color: #FFFFFF;
  background: #B45309;
  padding: 1px 7px;
  border-radius: 10px;
}

.pm-voucher-desc {
  margin: 2px 0 0 0;
  font-size: 11.5px;
  color: #92400E;
  font-weight: 600;
}

.pm-btn-voucher-remove {
  background: transparent;
  border: none;
  color: #92400E;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  transition: transform 0.2s;
}

.pm-btn-voucher-remove:hover {
  transform: scale(1.2);
  color: #DC2626;
}

/* Order Itemized Box */
.pm-order-items-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.pm-items-header {
  font-size: 13px;
  font-weight: 800;
  color: #1E293B;
  padding-bottom: 8px;
  border-bottom: 1px solid #F1F5F9;
}

.pm-items-scroll {
  max-height: 140px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 4px;
}

.pm-order-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pm-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pm-item-name {
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
}

.pm-item-price {
  font-size: 13px;
  font-weight: 800;
  color: #1E293B;
}

.pm-item-qty-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #64748B;
}

.pm-item-qty {
  font-weight: 800;
  color: #D97706;
}

.pm-item-unit {
  color: #94A3B8;
}

/* Calculations Breakdown */
.pm-calc-breakdown {
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px dashed #E2E8F0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-calc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
  color: #64748B;
  font-weight: 600;
}

.pm-calc-val {
  color: #1E293B;
  font-weight: 700;
}

.pm-calc-row.discount {
  font-weight: 700;
}

.pm-calc-row.discount.emerald {
  color: #059669;
}

.pm-calc-row.discount.emerald .pm-calc-val {
  color: #059669;
}

.pm-calc-row.discount.amber {
  color: #D97706;
}

.pm-calc-row.discount.amber .pm-calc-val {
  color: #D97706;
}

.pm-calc-row.discount.blue {
  color: #2563EB;
}

.pm-calc-row.discount.blue .pm-calc-val {
  color: #2563EB;
}

.pm-calc-label {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Order Footer Total */
.pm-order-footer {
  margin-top: auto;
}

.pm-total-card {
  background: linear-gradient(135deg, #2C1A13 0%, #442212 100%);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 16px rgba(44, 26, 19, 0.2);
}

.pm-total-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pm-total-title {
  font-size: 14.5px;
  font-weight: 800;
  color: #FFFFFF;
}

.pm-total-sub {
  font-size: 11px;
  color: #D6BFA8;
  font-weight: 500;
}

.pm-total-value {
  font-size: 22px;
  font-weight: 900;
  color: #FBBF24;
  letter-spacing: -0.5px;
  font-family: inherit;
}

/* Luxury E-Ticket Boarding Pass Styles */
.ticket-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
  box-sizing: border-box;
}

.ticket-modal-top-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  color: #FFFFFF;
  text-align: left;
}

.tmt-check-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4);
  flex-shrink: 0;
}

.tmt-title {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.tmt-subtitle {
  margin: 2px 0 0 0;
  font-size: 13px;
  color: #E2E8F0;
  font-weight: 500;
}

/* Printable Boarding Pass Card */
.ticket-pass-card {
  display: flex;
  width: 860px;
  max-width: 95vw;
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(226, 232, 240, 0.6);
  overflow: hidden;
  position: relative;
  animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}


.tpc-main {
  flex: 6.5;
  padding: 26px 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%);
}

.tpc-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1.5px solid #F1ECE4;
}

.tpc-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tpc-logo {
  height: 34px;
  object-fit: contain;
}

.tpc-brand-name {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: #2C1A13;
  letter-spacing: 0.5px;
}

.tpc-brand-tag {
  font-size: 10px;
  font-weight: 800;
  color: #D97706;
  letter-spacing: 0.8px;
}

.tpc-service-badge {
  background: #ECFDF5;
  color: #065F46;
  font-size: 11px;
  font-weight: 900;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #A7F3D0;
  letter-spacing: 0.5px;
}

.tpc-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.tpc-heading {
  margin: 0;
  font-size: 20px;
  font-weight: 900;
  color: #1E293B;
  letter-spacing: -0.3px;
}

.tpc-code-sub {
  font-size: 11.5px;
  color: #64748B;
}

.tpc-code-sub strong {
  font-family: 'JetBrains Mono', monospace;
  color: #D97706;
}

.tpc-status-verified {
  font-size: 10.5px;
  font-weight: 900;
  color: #047857;
  background: #D1FAE5;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #6EE7B7;
  letter-spacing: 0.5px;
}

/* 4-box Metadata Grid */
.tpc-grid-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  background: #FFFDF9;
  border: 1.5px dashed #E6D7C3;
  border-radius: 14px;
  padding: 12px 16px;
}

.tpc-meta-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tpc-meta-col.span-2 {
  grid-column: span 2;
  border-top: 1px dashed #F1ECE4;
  padding-top: 6px;
  margin-top: 2px;
}

.tpc-meta-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #8C6A4F;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.tpc-meta-value {
  font-size: 13.5px;
  font-weight: 800;
  color: #2C1A13;
}

.tpc-meta-value.highlight {
  color: #B45309;
}

.tpc-meta-value.price {
  color: #059669;
  font-weight: 900;
}

/* Items Badges */
.tpc-items-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tpc-items-heading {
  font-size: 11.5px;
  font-weight: 800;
  color: #475569;
}

.tpc-items-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tpc-item-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}

.tpc-qty-tag {
  font-weight: 900;
  color: #D97706;
  background: #FEF3C7;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 11px;
}

.tpc-item-label {
  font-weight: 700;
  color: #1E293B;
}

.tpc-gate-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #64748B;
  background: #F8FAFC;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
  line-height: 1.4;
}

.tpc-gate-notice svg {
  color: #D97706;
  flex-shrink: 0;
}

/* Perforation with Semicircle Notches */
.tpc-perforation {
  width: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  background: #FFFFFF;
}

.tpc-dash-line {
  width: 2px;
  height: 100%;
  border-left: 2.5px dashed #CBD5E1;
}

.tpc-notch-top {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  background: rgba(15, 23, 42, 0.82);
  border-radius: 50%;
  z-index: 5;
}

.tpc-notch-bottom {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  background: rgba(15, 23, 42, 0.82);
  border-radius: 50%;
  z-index: 5;
}

/* Right Stub */
.tpc-stub {
  flex: 3.5;
  background: linear-gradient(135deg, #064E3B 0%, #04382A 100%);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px;
  text-align: center;
  position: relative;
}

.tpc-stub-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
}

.tpc-stub-title {
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.8px;
  color: #FBBF24;
}

.tpc-stub-sub {
  font-size: 10px;
  font-weight: 800;
  color: #A7F3D0;
  letter-spacing: 0.5px;
}

.tpc-qr-card {
  background: #FFFFFF;
  padding: 10px;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
  margin-bottom: 8px;
}

.tpc-qr-code {
  width: 130px;
  height: 130px;
  display: block;
  object-fit: contain;
}

.tpc-qr-code-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #FEF3C7;
  margin-bottom: 10px;
}

.tpc-stub-validity {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #34D399;
  color: #6EE7B7;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 4px;
}

.tpc-active-dot {
  width: 6px;
  height: 6px;
  background: #34D399;
  border-radius: 50%;
}

.tpc-valid-date {
  font-size: 11px;
  color: #CBD5E1;
  font-weight: 600;
}

/* Action Buttons */
.ticket-modal-actions {
  display: flex;
  gap: 14px;
  margin-top: 24px;
}

.tma-btn-print {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF;
  border: none;
  font-size: 14px;
  font-weight: 800;
  padding: 12px 28px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.4);
  transition: all 0.2s ease;
}

.tma-btn-print:hover {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(217, 119, 6, 0.5);
}

.tma-btn-close {
  background: rgba(255, 255, 255, 0.12);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tma-btn-close:hover {
  background: #FFFFFF;
  color: #1E293B;
}

/* =====================================================
   MOBILE TICKET — use zoom to scale card proportionally
   860px × 0.43 ≈ 370px → fits 390px screen with 10px padding
   zoom affects layout flow, so no margin tricks needed
   ===================================================== */
@media (max-width: 640px) {
  .ticket-modal-backdrop {
    padding: 10px !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
    overflow-x: hidden !important;
  }

  .ticket-modal-top-header {
    margin-bottom: 10px !important;
    gap: 10px !important;
    width: 100% !important;
  }

  .tmt-title { font-size: 17px !important; }
  .tmt-subtitle { font-size: 11px !important; }
  .tmt-check-icon { width: 34px !important; height: 34px !important; }

  /* Scale entire card proportionally — same shape as desktop/print */
  .ticket-pass-card {
    width: 860px !important;
    max-width: none !important;
    zoom: 0.43 !important;
    border-radius: 24px !important;
  }

  /* Action buttons stay full-width at natural size */
  .ticket-modal-actions {
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 12px !important;
    width: 100% !important;
  }

  .tma-btn-print,
  .tma-btn-close {
    width: 100% !important;
    justify-content: center !important;
    padding: 12px 20px !important;
    font-size: 13px !important;
  }
}
</style>

<!-- Global Print Styles for Perfect 1-Page E-Ticket Printing -->
<style>
@page {
  size: landscape A4;
  margin: 6mm;
}

@media print {
  *, *::before, *::after {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: #FFFFFF !important;
    height: 100% !important;
    overflow: hidden !important;
  }

  body * {
    visibility: hidden !important;
  }

  #printable-ticket-card,
  #printable-ticket-card * {
    visibility: visible !important;
  }

  #printable-ticket-card {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
    display: flex !important;
    flex-direction: row !important;
    width: 256mm !important;
    height: auto !important;
    max-height: 170mm !important;
    border: 2px solid #CBD5E1 !important;
    border-radius: 16px !important;
    box-shadow: none !important;
    background: #FFFFFF !important;
    overflow: hidden !important;
    z-index: 9999999 !important;
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
}
</style>
