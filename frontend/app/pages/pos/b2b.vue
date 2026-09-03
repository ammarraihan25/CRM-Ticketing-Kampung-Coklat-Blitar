<script setup lang="ts">
import { useCrmNonMember } from '~/composables/useCrmNonMember'
import { usePosTransactions } from '~/composables/usePosTransactions'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const { addVisitor } = useCrmNonMember()
const { addPosTransaction } = usePosTransactions()

import { ref, computed } from 'vue'
import AppDatePicker from '~/components/shared/AppDatePicker.vue'

definePageMeta({
  layout: 'pos'
})

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

// -- EDUKASI IMAGES --
import paket_tk from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png'
import paket_sd from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'
import paket_smp from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png'
import paket_sma from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png'

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

import { useConfigSync } from '~/composables/useConfigSync'

const { ticketRates, rides } = useConfigSync()

const defaultEntryTickets = [
  { id: 'tiket-reguler', name: 'Tiket Masuk Reguler', badge: 'TIKET UTAMA', price: 20000, unit: '/ orang', highlights: ['Akses Masuk Area Utama Kebun', 'Gratis Edukasi Pembibitan Kakao', 'Akses Spot Foto & Fasilitas Umum'], desc: 'Tiket masuk standar untuk rombongan wisata kebun kakao.', image: imgKolamDewasa },
  { id: 'tiket-terusan', name: 'Tiket Masuk Terusan', badge: 'BEST SELLER - ALL ACCESS', price: 35000, unit: '/ orang', highlights: ['Semua Akses Tiket Reguler', 'Free Puluhan Wahana Unlimited', 'Bebas Bermain Seharian Penuh'], desc: 'Paket lengkap bebas main puluhan wahana sepuasnya tanpa biaya tambahan.', image: imgKereta }
]

const defaultWahanaTickets = [
  { id: 'animal-feeding', name: 'Animal Feeding', categoryTag: 'Edukasi Satwa', isFreeTerusan: true, desc: 'Interaksi & memberi makan satwa lucu', image: imgAnimalFeeding, price: 2000, isMaintenance: false },
  { id: 'animal-toys', name: 'Animal Toys', categoryTag: 'Wahana Anak', isFreeTerusan: true, desc: 'Hewan tunggang keliling jalur aman', image: imgAnimalToys, price: 15000, isMaintenance: false },
  { id: 'atv', name: 'ATV Ride', categoryTag: 'Petualangan', isFreeTerusan: false, desc: 'Pacu adrenalin di lintasan outdoor', image: imgAtv, price: 25000, isMaintenance: false },
  { id: 'bom-bom-car', name: 'Bom Bom Car', categoryTag: 'Wahana Keluarga', isFreeTerusan: true, desc: 'Sensasi tabrakan aman dan seru', image: imgBomBomCar, price: 15000, isMaintenance: false },
  { id: 'flying-fox', name: 'Flying Fox', categoryTag: 'Petualangan', isFreeTerusan: false, desc: 'Meluncur di atas rimbunnya kebun kakao', image: imgFlyingFox, price: 20000, isMaintenance: false },
  { id: 'golf-car', name: 'Golf Car', categoryTag: 'Transportasi', isFreeTerusan: false, desc: 'Keliling area wisata santai sekeluarga', image: imgGolfCar, price: 25000, isMaintenance: false },
  { id: 'istana-balon', name: 'Istana Balon', categoryTag: 'Wahana Anak', isFreeTerusan: true, desc: 'Arena melompat riang gembira anak', image: imgIstanaBalon, price: 10000, isMaintenance: false },
  { id: 'karausel', name: 'Karausel', categoryTag: 'Keluarga', isFreeTerusan: false, desc: 'Kuda putar klasik lampu hias indah', image: imgKarausel, price: 15000, isMaintenance: false },
  { id: 'kereta-lokomotif', name: 'Kereta Lokomotif', categoryTag: 'Keluarga', isFreeTerusan: true, desc: 'Keliling kebun dengan kereta lokomotif', image: imgKeretaLokomotif, price: 15000, isMaintenance: false },
  { id: 'kereta-monorel', name: 'Kereta Monorel', categoryTag: 'Keluarga', isFreeTerusan: true, desc: 'Pemandangan panorama dari atas rel', image: imgKeretaMonorel, price: 15000, isMaintenance: false }
]

const defaultEdukasiTickets = [
  { id: 'paket-tk-paud', name: 'Paket Edukasi TK / PAUD', badge: 'TINGKAT TK / PAUD', price: 35000, unit: '/ pax', highlights: ['Menghias Coklat & Pengenalan Kakao', 'Fun Cooking & Wahana Perahu Ceria', 'Free Tour Guide & Dokumentasi Kegiatan'], desc: 'Program edukasi interaktif untuk anak usia dini.', image: paket_tk },
  { id: 'paket-sd', name: 'Paket Edukasi SD', badge: 'TINGKAT SD', price: 32000, unit: '/ pax', highlights: ['Santripreneur & Industri Coklat', 'Pembelajaran Mendalam & Ice Breaking', 'Makan Siang & Tour Guide Lapangan'], desc: 'Pengenalan budidaya kakao dan produksi coklat.', image: paket_sd },
  { id: 'paket-smp', name: 'Paket Edukasi SMP', badge: 'TINGKAT SMP', price: 32000, unit: '/ pax', highlights: ['Pasca Panen & Kewirausahaan Kakao', 'Paket LDKS & Outbound Team Building', 'Sertifikat Resmi & Makan Siang'], desc: 'Edukasi wirausaha dan kepemimpinan.', image: paket_smp },
  { id: 'paket-sma-univ', name: 'Paket Edukasi SMA / Mahasiswa', badge: 'SMA & UNIVERSITAS', price: 32000, unit: '/ pax', highlights: ['Presentasi Riset Kakao & Industri', 'Praktek Pengolahan Coklat Modern', 'Sertifikat Keahlian & Fasilitas LDKS'], desc: 'Studi komparasi rantai pasok industri coklat hulu ke hilir.', image: paket_sma }
]

const defaultHallTickets = [
  { id: 'kampung-coklat-hall', name: 'Kampung Coklat Hall', badge: 'MAIN GRAND BALLROOM', highlights: ['Kapasitas 500 - 1500 Orang', 'Full AC & Sound Pro', 'Panggung Utama & LED'], price: 1500000, desc: 'Ruangan indoor eksklusif untuk acara besar rombongan / wisuda.', image: kampung_coklat_hall },
  { id: 'joglo-jatimarto', name: 'Joglo Jatimarto', badge: 'TRADISIONAL JAWA', highlights: ['Kapasitas 150 - 400 Orang', 'Arsitektur Kayu Klasik', 'Panggung & Sound System'], price: 750000, desc: 'Pendopo tradisional bernuansa klasik Jawa untuk acara gathering.', image: joglo_jatimarto },
  { id: 'bale-coklat', name: 'Bale Coklat', badge: 'SEMI-OUTDOOR', highlights: ['Kapasitas 100 - 250 Orang', 'Area Terbuka Rindang', 'Sound Standard & Kursi'], price: 500000, desc: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas.', image: bale_coklat }
]

const entryTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'gate' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const isTerusan = t.name.toLowerCase().includes('terusan')
      return {
        id: t.id,
        name: t.name,
        badge: isTerusan ? 'BEST SELLER - ALL ACCESS' : 'TIKET UTAMA',
        price: t.price,
        unit: '/ orang',
        highlights: isTerusan ? ['Semua Akses Tiket Reguler', 'Free Puluhan Wahana Unlimited', 'Bebas Bermain Seharian Penuh'] : ['Akses Masuk Area Utama Kebun', 'Gratis Edukasi Pembibitan Kakao', 'Akses Spot Foto & Fasilitas Umum'],
        desc: t.description || 'Akses masuk area wisata kebun kakao Kampung Coklat.',
        image: t.imageUrl || (isTerusan ? imgKereta : imgKolamDewasa)
      }
    })
  }
  return defaultEntryTickets
})

const wahanaTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'wahana' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const rideData = rides.value.find(r => r.name.toLowerCase() === t.name.toLowerCase())
      const isMaintenance = rideData?.status === 'MAINTENANCE'
      return {
        id: t.id,
        name: t.name,
        badge: isMaintenance ? 'MAINTENANCE' : 'WAHANA',
        price: t.price,
        unit: '/ tiket',
        highlights: [isMaintenance ? 'Sedang Perbaikan' : 'Tersedia untuk Pengunjung'],
        desc: t.description || 'Fasilitas Wahana Kampung Coklat',
        image: t.imageUrl || imgAnimalFeeding,
        isMaintenance
      }
    })
  }
  return defaultWahanaTickets
})

const edukasiTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'edukasi' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const match = defaultEdukasiTickets.find(d => d.name.toLowerCase() === t.name.toLowerCase())
      return {
        id: t.id,
        name: t.name,
        badge: match?.badge || 'WISATA EDUKASI',
        price: t.price,
        unit: '/ pax',
        highlights: match?.highlights || ['Akses Masuk & Tour Kebun Kakao', 'Praktek Menghias Coklat', 'Free Trainer & Sertifikat'],
        desc: match?.desc || t.description || 'Paket edukasi Kampung Coklat',
        image: t.imageUrl || match?.image || paket_tk
      }
    })
  }
  return defaultEdukasiTickets
})

const hallTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'venue' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const match = defaultHallTickets.find(d => d.name.toLowerCase() === t.name.toLowerCase())
      return {
        id: t.id,
        name: t.name,
        badge: match?.badge || 'SEWA VENUE',
        price: t.price,
        unit: '/ sesi',
        highlights: match?.highlights || ['Fasilitas Acara Lengkap', 'Sound System & Kursi'],
        desc: t.description || match?.desc || 'Fasilitas sewa tempat / hall di Kampung Coklat.',
        image: t.imageUrl || match?.image || bale_coklat
      }
    })
  }
  return defaultHallTickets
})

const cart = ref<any[]>([])
const totalCartQuantity = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.qty || 1), 0)
})

const bookingData = ref({
  instansi: '',
  alamatInstansi: '',
  kategori: '',
  estimasiPeserta: '',
  nama: '',
  telepon: '',
  tanggal: new Date().toISOString().split('T')[0],
  isMember: false,
  memberId: ''
})

const bookingType = ref('rombongan')
const selectedCategory = ref('tiket') 
const bulkQty = ref(1)

const paymentMethod = ref('cash')
const cashReceived = ref(0)
const showPaymentModal = ref(false)
const showSuccessModal = ref(false)
const isProcessing = ref(false)
const transactionResult = ref<any>(null)

// Promo Voucher State
const appliedVoucher = ref<any>(null)
const availableVouchers = ref([
  { code: 'B2BROMBONGAN', name: 'Diskon Spesial Mitra B2B 10%', discount: 10, type: 'percent' },
  { code: 'PARTNERSHIP50', name: 'Potongan Kerjasama Rp 50.000', discount: 50000, type: 'fixed' },
  { code: 'MEGAEVENT100', name: 'Voucher Event Akbar Rp 100.000', discount: 100000, type: 'fixed' }
])
const isVoucherDropdownOpen = ref(false)

const selectVoucher = (voucher: any) => {
  appliedVoucher.value = voucher
  isVoucherDropdownOpen.value = false
}

const removeVoucher = () => {
  appliedVoucher.value = null
}

const memberStatus = ref('idle')
const checkMemberId = async () => {
  if (!bookingData.value.memberId) {
    memberStatus.value = 'idle'
    bookingData.value.isMember = false
    return
  }
  
  try {
    const member: any = await $fetch(`/api/v1/members/${bookingData.value.memberId}`)
    if (member && member.data) {
      memberStatus.value = 'valid'
      bookingData.value.isMember = true
      if (member.data.nama) bookingData.value.nama = member.data.nama
      if (member.data.whatsapp || member.data.telepon) bookingData.value.telepon = member.data.whatsapp || member.data.telepon
      if (member.data.instansi) bookingData.value.instansi = member.data.instansi
    } else {
      memberStatus.value = 'invalid'
      bookingData.value.isMember = false
    }
  } catch (e) {
    memberStatus.value = 'invalid'
    bookingData.value.isMember = false
  }
}

const allProducts = computed(() => {
  if (selectedCategory.value === 'tiket') return entryTickets.value
  if (selectedCategory.value === 'wahana') return wahanaTickets.value
  if (selectedCategory.value === 'edukasi') return edukasiTickets.value
  if (selectedCategory.value === 'sewa-tempat') return hallTickets.value
  return []
})

const addToCart = (product: any) => {
  if (product.isMaintenance) {
    alert(`Maaf, wahana ${product.name} sedang dalam perbaikan (Maintenance) dan tidak dapat dipesan saat ini.`)
    return
  }
  const existing = cart.value.find(item => item.id === product.id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.value.push({ ...product, qty: 1 })
  }
}

const increaseItem = (item: any) => { item.qty++ }
const decreaseItem = (item: any) => { 
  if(item.qty > 1) item.qty-- 
  else removeFromCart(item.id)
}
const removeFromCart = (id: string) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

// Auto discount 10% for active members
const memberDiscountAmount = computed(() => {
  if (!bookingData.value.isMember) return 0
  return Math.round(subtotal.value * 0.1)
})

// B2B Bulk Tier Discount (for non-member rombongan)
const bulkDiscountPercent = computed(() => {
  if (bookingData.value.isMember) return 0
  const pax = totalCartQuantity.value
  if (pax >= 100) return 15
  if (pax >= 50) return 10
  if (pax >= 20) return 5
  return 0
})

const bulkDiscountAmount = computed(() => {
  if (bulkDiscountPercent.value === 0) return 0
  return Math.round((subtotal.value * bulkDiscountPercent.value) / 100)
})

// Voucher discount
const voucherDiscountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  if (appliedVoucher.value.type === 'percent') {
    return Math.round((subtotal.value * appliedVoucher.value.discount) / 100)
  }
  return appliedVoucher.value.discount
})

const grandTotal = computed(() => {
  const total = subtotal.value - memberDiscountAmount.value - bulkDiscountAmount.value - voucherDiscountAmount.value
  return Math.max(0, total)
})

const changeAmount = computed(() => {
  return Math.max(0, cashReceived.value - grandTotal.value)
})

const addCash = (amount: number) => {
  cashReceived.value += amount
}

const setCashExact = () => {
  cashReceived.value = grandTotal.value
}

const processCheckout = () => {
  if (!bookingData.value.telepon || !bookingData.value.nama) {
    alert('Nomor Telepon dan Nama PIC wajib diisi sebelum checkout!');
    return;
  }
  if (cart.value.length === 0) {
    alert('Keranjang kosong!')
    return
  }
  showPaymentModal.value = true
}

const processPayment = () => {
  if (!bookingData.value.isMember) {
    addVisitor({
      nama: bookingData.value.nama || bookingData.value.instansi || 'Pelanggan Rombongan',
      whatsapp: bookingData.value.telepon || '-',
      domisili: 'Offline',
      source: 'POS',
      totalSpend: grandTotal.value
    })
  }

  if (paymentMethod.value === 'cash' && cashReceived.value < grandTotal.value) {
    alert('Uang yang diterima kurang!')
    return
  }

  isProcessing.value = true

  setTimeout(() => {
    const paymentLabel = paymentMethod.value === 'cash' ? 'Tunai' : (paymentMethod.value === 'qris' ? 'QRIS' : (paymentMethod.value === 'transfer' ? 'Transfer Bank' : 'EDC / Kartu'))
    const generatedTrxId = 'TRX-' + Math.floor(10000000 + Math.random() * 90000000)

    addPosTransaction({
      category: 'B2B',
      type: cart.value.map(i => `${i.qty}x ${i.name}`).join(', '),
      items: cart.value.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      qty: cart.value.reduce((sum, it) => sum + it.qty, 0),
      total: grandTotal.value,
      payment: paymentLabel,
      customer: bookingData.value.instansi || bookingData.value.nama || 'Rombongan B2B'
    })

    transactionResult.value = {
      pos_trx_id: generatedTrxId,
      total_amount: grandTotal.value,
      payment_method: paymentLabel,
      created_at: new Date().toISOString()
    }

    isProcessing.value = false
    showPaymentModal.value = false
    showSuccessModal.value = true
  }, 400)
}

const handlePrintTicket = () => {
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
        <title>E-Tiket-B2B-${transactionResult.value?.pos_trx_id || 'KC-TIKET'}</title>
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
            display: flex !important;
            flex-direction: row !important;
            width: 256mm !important;
            max-width: 256mm !important;
            max-height: 170mm !important;
            background: #FFFFFF !important;
            border-radius: 16px !important;
            border: 2px solid #CBD5E1 !important;
            overflow: hidden !important;
            box-shadow: none !important;
            position: relative !important;
            margin: auto !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .tpc-main {
            flex: 6.4 !important;
            padding: 18px 22px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            background: linear-gradient(180deg, #FFFFFF 0%, #FDFBF7 100%) !important;
          }
          .tpc-header-bar {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding-bottom: 10px !important;
            border-bottom: 1.5px solid #F1ECE4 !important;
          }
          .tpc-brand {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
          }
          .tpc-logo {
            height: 34px !important;
            object-fit: contain !important;
          }
          .tpc-brand-name {
            margin: 0 !important;
            font-size: 16px !important;
            font-weight: 900 !important;
            color: #2C1A13 !important;
            letter-spacing: 0.5px !important;
          }
          .tpc-brand-tag {
            font-size: 10px !important;
            font-weight: 800 !important;
            color: #D97706 !important;
            letter-spacing: 0.8px !important;
          }
          .tpc-service-badge {
            background: #ECFDF5 !important;
            color: #065F46 !important;
            font-size: 11px !important;
            font-weight: 900 !important;
            padding: 4px 12px !important;
            border-radius: 20px !important;
            border: 1px solid #A7F3D0 !important;
          }
          .tpc-title-row {
            display: flex !important;
            justify-content: space-between !important;
            align-items: flex-end !important;
          }
          .tpc-heading {
            margin: 0 !important;
            font-size: 20px !important;
            font-weight: 900 !important;
            color: #1E293B !important;
          }
          .tpc-code-sub {
            font-size: 11.5px !important;
            color: #64748B !important;
          }
          .tpc-code-sub strong {
            font-family: 'JetBrains Mono', monospace !important;
            color: #D97706 !important;
          }
          .tpc-status-verified {
            font-size: 10.5px !important;
            font-weight: 900 !important;
            color: #047857 !important;
            background: #D1FAE5 !important;
            padding: 3px 8px !important;
            border-radius: 6px !important;
            border: 1px solid #6EE7B7 !important;
          }
          .tpc-grid-card {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px 14px !important;
            background: #FFFDF9 !important;
            border: 1.5px dashed #E6D7C3 !important;
            border-radius: 14px !important;
            padding: 10px 14px !important;
          }
          .tpc-meta-col {
            display: flex !important;
            flex-direction: column !important;
            gap: 2px !important;
          }
          .tpc-meta-col.span-2 {
            grid-column: span 2 !important;
            border-top: 1px dashed #F1ECE4 !important;
            padding-top: 6px !important;
            margin-top: 2px !important;
          }
          .tpc-meta-label {
            font-size: 10.5px !important;
            font-weight: 700 !important;
            color: #8C6A4F !important;
            text-transform: uppercase !important;
          }
          .tpc-meta-value {
            font-size: 13.5px !important;
            font-weight: 800 !important;
            color: #2C1A13 !important;
          }
          .tpc-meta-value.highlight {
            color: #B45309 !important;
          }
          .tpc-meta-value.price {
            color: #059669 !important;
            font-weight: 900 !important;
          }
          .tpc-items-section {
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
          }
          .tpc-items-heading {
            font-size: 11.5px !important;
            font-weight: 800 !important;
            color: #475569 !important;
          }
          .tpc-items-badges {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .tpc-item-pill {
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
            background: #FFFFFF !important;
            border: 1.5px solid #E2E8F0 !important;
            padding: 4px 10px !important;
            border-radius: 8px !important;
            font-size: 12px !important;
          }
          .tpc-qty-tag {
            font-weight: 900 !important;
            color: #D97706 !important;
            background: #FEF3C7 !important;
            padding: 1px 5px !important;
            border-radius: 4px !important;
            font-size: 11px !important;
          }
          .tpc-item-label {
            font-weight: 700 !important;
            color: #1E293B !important;
          }
          .tpc-gate-notice {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            font-size: 11px !important;
            color: #64748B !important;
            background: #F8FAFC !important;
            padding: 8px 12px !important;
            border-radius: 8px !important;
            border: 1px solid #E2E8F0 !important;
          }
          .tpc-gate-notice svg {
            color: #D97706 !important;
            flex-shrink: 0 !important;
          }
          .tpc-perforation {
            width: 20px !important;
            position: relative !important;
            display: flex !important;
            justify-content: center !important;
            background: #FFFFFF !important;
          }
          .tpc-dash-line {
            width: 2px !important;
            height: 100% !important;
            border-left: 2.5px dashed #CBD5E1 !important;
          }
          .tpc-notch-top, .tpc-notch-bottom {
            position: absolute !important;
            width: 22px !important;
            height: 22px !important;
            background: #FFFFFF !important;
            border: 1.5px solid #CBD5E1 !important;
            border-radius: 50% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 5 !important;
          }
          .tpc-notch-top { top: -11px !important; }
          .tpc-notch-bottom { bottom: -11px !important; }
          .tpc-stub {
            flex: 3.6 !important;
            background: #064E3B !important;
            color: #FFFFFF !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 22px 16px !important;
            text-align: center !important;
          }
          .tpc-stub-header {
            display: flex !important;
            flex-direction: column !important;
            gap: 2px !important;
            margin-bottom: 12px !important;
          }
          .tpc-stub-title {
            font-size: 14px !important;
            font-weight: 900 !important;
            color: #FBBF24 !important;
            letter-spacing: 0.8px !important;
          }
          .tpc-stub-sub {
            font-size: 10px !important;
            font-weight: 800 !important;
            color: #A7F3D0 !important;
            letter-spacing: 0.5px !important;
          }
          .tpc-qr-card {
            background: #FFFFFF !important;
            padding: 8px !important;
            border-radius: 12px !important;
            margin-bottom: 8px !important;
          }
          .tpc-qr-code {
            width: 125px !important;
            height: 125px !important;
            display: block !important;
          }
          .tpc-qr-code-text {
            font-family: 'JetBrains Mono', monospace !important;
            font-size: 13px !important;
            font-weight: 800 !important;
            letter-spacing: 1px !important;
            color: #FEF3C7 !important;
            margin-bottom: 8px !important;
          }
          .tpc-stub-validity {
            display: flex !important;
            align-items: center !important;
            gap: 6px !important;
            background: rgba(16, 185, 129, 0.2) !important;
            border: 1px solid #34D399 !important;
            color: #6EE7B7 !important;
            font-size: 11px !important;
            font-weight: 800 !important;
            padding: 3px 10px !important;
            border-radius: 20px !important;
            margin-bottom: 4px !important;
          }
          .tpc-active-dot {
            width: 6px !important;
            height: 6px !important;
            background: #34D399 !important;
            border-radius: 50% !important;
          }
          .tpc-valid-date {
            font-size: 11px !important;
            color: #CBD5E1 !important;
            font-weight: 600 !important;
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

const finishTransaction = () => {
   cart.value = []
   bookingData.value = { telepon: '', nama: '', tanggal: new Date().toISOString().split('T')[0], alamatInstansi: '', instansi: '', kategori: '', estimasiPeserta: '', isMember: false, memberId: '' }
   cashReceived.value = 0
   appliedVoucher.value = null
   isVoucherDropdownOpen.value = false
   transactionResult.value = null
   showSuccessModal.value = false
}
</script>

<template>
  <div class="pos-wrapper">
    <!-- LEFT PANE: Form -->
    <div class="pos-form-pane">
      <h2 class="pane-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Data Pemesanan B2B
      </h2>
      
      <div class="pos-form-container">
        <!-- ID Member / No HP CRM (Input Biasa untuk Kasir) -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>ID Member / No. HP CRM</span>
            <span class="pos-label-optional">(Opsional)</span>
          </label>
          <div class="pos-member-field-wrap">
            <input 
              type="text" 
              v-model="bookingData.memberId" 
              placeholder="Scan / ketik ID atau No. HP..." 
              class="pos-form-input pos-member-input"
              @keyup.enter="checkMemberId"
              @input="if(!bookingData.memberId) { memberStatus = 'idle'; bookingData.isMember = false; }"
            />
            <button type="button" class="pos-btn-check-member" @click="checkMemberId">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>Cek</span>
            </button>
          </div>
          <div v-if="memberStatus === 'valid'" class="pos-member-alert success">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>Member Terverifikasi</span>
          </div>
          <div v-if="memberStatus === 'invalid'" class="pos-member-alert error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span>Member tidak ditemukan</span>
          </div>
        </div>

        <!-- Nama Instansi / Rombongan -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Nama Instansi / Rombongan</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="text" v-model="bookingData.instansi" placeholder="Contoh: SDN 1 Blitar" class="pos-form-input" />
        </div>

        <!-- Nama Penanggung Jawab -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Nama Penanggung Jawab / PIC</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="text" v-model="bookingData.nama" placeholder="Nama Lengkap" class="pos-form-input" />
        </div>

        <!-- No WhatsApp / Telepon -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>No. WhatsApp / Telepon</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="tel" v-model="bookingData.telepon" placeholder="0812..." class="pos-form-input" />
        </div>

        <!-- Kategori Rombongan & Estimasi -->
        <div style="display: flex; gap: 10px;">
          <div class="pos-form-group" style="flex: 1; min-width: 0;">
            <label class="pos-form-label">
              <span>Kategori</span>
            </label>
            <input type="text" v-model="bookingData.kategori" placeholder="Sekolah/Umum" class="pos-form-input" />
          </div>
          <div class="pos-form-group" style="flex: 1; min-width: 0;">
            <label class="pos-form-label">
              <span>Estimasi Pax</span>
            </label>
            <input type="number" v-model="bookingData.estimasiPeserta" placeholder="50" class="pos-form-input" />
          </div>
        </div>

        <!-- Alamat Instansi -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Alamat Instansi</span>
            <span class="pos-label-optional">(Opsional)</span>
          </label>
          <input type="text" v-model="bookingData.alamatInstansi" placeholder="Contoh: Jl. Merdeka No 1" class="pos-form-input" />
        </div>

        <!-- Tanggal Kunjungan -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Tanggal Kunjungan</span>
            <span class="pos-label-req">*</span>
          </label>
          <AppDatePicker 
            v-model="bookingData.tanggal" 
            placeholder="Pilih Tanggal Kunjungan"
          />
        </div>
      </div>
    </div>

    <!-- MIDDLE PANE: Catalog -->
    <div class="pos-catalog-pane">
      <div class="step-2-products" style="display: flex; flex-direction: column; flex: 1; min-height: 0; height: 100%;">

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 class="pane-title" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Pilih Produk Rombongan
            </h2>
            <span style="font-size: 12px; font-weight: 700; color: #64748B; background: #F1F5F9; padding: 4px 10px; border-radius: 20px;">
              {{ allProducts.length }} Produk
            </span>
          </div>
          
          <!-- Category Tabs -->
          <div class="pos-filter-pills" style="display: flex; gap: 8px;">
            <button type="button" class="pos-pill" :class="{'active': selectedCategory === 'tiket'}" @click="selectedCategory = 'tiket'">Tiket Masuk</button>
            <button type="button" class="pos-pill" :class="{'active': selectedCategory === 'wahana'}" @click="selectedCategory = 'wahana'">Wahana</button>
            <button type="button" class="pos-pill" :class="{'active': selectedCategory === 'edukasi'}" @click="selectedCategory = 'edukasi'">Wisata Edukasi</button>
            <button type="button" class="pos-pill" :class="{'active': selectedCategory === 'sewa-tempat'}" @click="selectedCategory = 'sewa-tempat'">Sewa Tempat</button>
          </div>
        </div>

        <!-- Product List -->
        <div class="product-list-wrapper" style="overflow-y: auto; flex: 1; min-height: 0; padding-bottom: 20px; padding-right: 6px;">
          <div class="pos-products-stack">
            <div class="pos-card-full" v-for="product in allProducts" :key="product.id">
              <div :class="selectedCategory === 'edukasi' ? 'pos-thumb-wrap-edukasi' : 'pos-thumb-wrap'">
                <img :src="product.image" :alt="product.name" class="pos-thumb-img" />
              </div>
              
              <div class="pos-content-wrap">
                <div class="pos-header-block">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h4 class="pos-item-title">{{ product.name }}</h4>
                    <span v-if="product.badge && selectedCategory !== 'edukasi'" class="pos-badge-tag" :class="{'badge-gold': product.badge && product.badge.includes('BEST SELLER')}">
                      {{ product.badge }}
                    </span>
                    <span v-if="product.isFreeTerusan" class="pos-badge-tag badge-green">Free Terusan</span>
                    <span v-if="product.capacity" style="font-size: 11px; font-weight: 700; color: #4B5563; background: #F3F4F6; padding: 2px 7px; border-radius: 4px; white-space: nowrap;">
                      {{ product.capacity }}
                    </span>
                  </div>
                  <p class="pos-item-desc">{{ product.desc }}</p>

                  <!-- Highlights -->
                  <div class="pos-highlights-list" v-if="product.highlights && product.highlights.length">
                    <div v-for="(hl, idx) in product.highlights" :key="idx" class="pos-highlight-chip">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <span>{{ hl }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="pos-bottom-row">
                  <div class="pos-price-tag">
                    <span class="pos-curr">Rp</span>
                    <span class="pos-val">{{ product.price.toLocaleString('id-ID') }}</span>
                  </div>

                  <button 
                    class="pos-btn-tambah" 
                    :disabled="product.isMaintenance" 
                    @click="addToCart(product)"
                  >
                    <span class="pos-btn-plus">+</span>
                    <span>{{ product.isMaintenance ? 'Perbaikan' : 'Tambah' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Pane: Cart -->
    <div class="pos-cart-pane">
      <div style="padding: 0; display: flex; flex-direction: column; height: 100%;">
        <h2 class="pane-title"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>Keranjang</h2>
        <div style="flex: 1; overflow-y: auto; padding-right: 10px;">
          <div v-if="cart.length === 0" style="color: #9CA3AF; font-size: 14px; text-align: center; padding: 60px 0; font-weight: 500; display: flex; flex-direction: column; align-items: center; gap: 12px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>Keranjang kosong</div>
          <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="cart-item-row">
            <div class="cart-item-top">
              <div class="cart-item-name">{{ item.name }}</div>
              <div class="cart-item-subtotal">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</div>
            </div>
            <div class="cart-item-bottom">
              <div class="cart-item-price">@ Rp {{ item.price.toLocaleString('id-ID') }}</div>
              <div class="cart-item-qty-control">
                <button @click="decreaseItem(item)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span>{{ item.qty }}</span>
                <button @click="increaseItem(item)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer-summary">
          <!-- B2B Tier Discount Info -->
          <div v-if="bulkDiscountPercent > 0" class="summary-row" style="display: flex; justify-content: space-between; color: #059669; font-size: 13px; font-weight: 700; margin-bottom: 8px; background: #ECFDF5; padding: 8px 12px; border-radius: 8px; border: 1px solid #A7F3D0;">
            <span>Diskon Rombongan B2B ({{ bulkDiscountPercent }}%)</span>
            <span>- Rp {{ bulkDiscountAmount.toLocaleString('id-ID') }}</span>
          </div>

          <div class="summary-row grand-total">
            <span>Total Tagihan</span>
            <span class="total-price">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
          </div>
          <button class="btn-checkout-premium" @click="processCheckout" :disabled="cart.length === 0">
            Proses Pembayaran
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Payment Modal (2-Column Layout - Self Service Style) -->
    <div class="modal-overlay" v-if="showPaymentModal" @click.self="showPaymentModal = false">
      <div class="payment-modal-container">
        
        <!-- Header Modal -->
        <div class="pm-modal-top-bar">
          <div class="pm-brand-title">
            <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Logo" class="pm-logo" />
            <div>
              <h3 class="pm-main-heading">Pembayaran & Konfirmasi Rombongan B2B</h3>
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
              <!-- CASH / TUNAI (POS EXCLUSIVE) -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'cash'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Tunai (Cash di Loket Kasir)</span>
                    <span class="pm-method-desc">Terima pembayaran tunai langsung dari perwakilan / pemesan</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="cash" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'cash'">
                  <div class="pm-cash-input-box">
                    <label class="pm-edc-field-label">Uang Diterima dari Pemesan (Rp)</label>
                    <div class="pm-cash-input-row">
                      <input type="number" v-model.number="cashReceived" class="pm-cash-input-control" placeholder="0" />
                      <button type="button" class="pm-btn-exact" @click="setCashExact">Uang Pas</button>
                    </div>
                    <div class="pm-cash-change-banner" :class="{'is-change': changeAmount > 0}">
                      <div class="pm-cc-item">
                        <span>Total Tagihan:</span>
                        <strong>Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
                      </div>
                      <div class="pm-cc-item">
                        <span>Kembalian:</span>
                        <strong class="text-change">Rp {{ changeAmount.toLocaleString('id-ID') }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </label>

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
                    <p class="pm-qris-hint">Scan kode QR di atas melalui aplikasi Mobile Banking atau E-Wallet Panitia/Pemesan</p>
                  </div>
                </div>
              </label>

              <!-- DEBIT/KREDIT -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'debit'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Kartu Debit / Kredit (Mesin EDC)</span>
                    <span class="pm-method-desc">Bayar di kasir menggunakan kartu debit/kredit</span>
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
              <button class="pm-btn-primary" @click="processPayment" :disabled="isProcessing">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>{{ isProcessing ? 'MEMPROSES TRANSAKSI...' : 'BAYAR & CETAK STRUK SEKARANG' }}</span>
              </button>
              <button class="pm-btn-secondary" @click="showPaymentModal = false">Batal & Kembali ke Transaksi</button>
            </div>
          </div>

          <!-- Right Column: Order Summary & Integrated Promo/Membership -->
          <div class="pm-right-panel">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <div>
                <h4 class="pm-panel-title">Detail Pesanan</h4>
                <p class="pm-panel-subtitle">Rincian rombongan, diskon tier & promo</p>
              </div>
            </div>
            
            <!-- Trip Information Capsule -->
            <div class="pm-trip-card">
              <div class="pm-trip-row">
                <span class="pm-trip-label">Layanan</span>
                <span class="pm-trip-val">Kemitraan & Rombongan B2B</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">Instansi / Rombongan</span>
                <span class="pm-trip-val highlight">{{ bookingData.instansi || '-' }}</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">PIC / Pemesan</span>
                <span class="pm-trip-val">{{ bookingData.nama || '-' }} ({{ bookingData.telepon || '-' }})</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">Tanggal Kunjungan</span>
                <span class="pm-trip-val">{{ bookingData.tanggal || 'Hari Ini' }}</span>
              </div>
            </div>

            <!-- PROMO & MEMBERSHIP INTEGRATION SECTION -->
            <div class="pm-promo-membership-box">
              <div class="pm-box-header">
                <span class="pm-box-title">Promo & Diskon Member / Mitra</span>
                <span class="pm-auto-tag">Otomatis Terintegrasi</span>
              </div>

              <!-- 1. Auto Membership Recognition -->
              <div v-if="bookingData.isMember" class="pm-member-active-card">
                <div class="pm-member-left">
                  <div class="pm-member-badge-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <div class="pm-member-info">
                    <div class="pm-member-title-row">
                      <span class="pm-member-status">MEMBER AKTIF</span>
                      <span class="pm-member-benefit">Diskon 10% Otomatis</span>
                    </div>
                    <span class="pm-member-name">{{ bookingData.nama }}</span>
                    <span class="pm-member-phone">{{ bookingData.telepon || bookingData.memberId }}</span>
                  </div>
                </div>
                <button type="button" class="pm-btn-member-edit" @click="bookingData.isMember = false; bookingData.memberId = ''" title="Ganti nomor member">
                  Ganti
                </button>
              </div>

              <!-- Manual Member Input if not detected -->
              <div v-else class="pm-member-manual-input">
                <div class="pm-input-label-row">
                  <label>Cek Nomor WhatsApp Membership / Mitra</label>
                </div>
                <div class="pm-input-btn-group">
                  <input type="text" v-model="bookingData.memberId" placeholder="Contoh: 081234567890" class="pm-text-input" />
                  <button type="button" class="pm-btn-action-sm" @click="checkMemberId">Verifikasi</button>
                </div>
              </div>

              <!-- 2. Custom Interactive Voucher Picker Dropdown -->
              <div class="pm-voucher-section">
                <div class="pm-input-label-row">
                  <label>Pilih Voucher Promo</label>
                  <span class="pm-link-promo">Lihat Semua Promo</span>
                </div>

                <!-- Custom Elegant Dropdown Trigger -->
                <div class="pm-custom-dropdown-container">
                  <div class="pm-custom-dropdown-trigger" 
                       :class="{ 'is-open': isVoucherDropdownOpen, 'has-value': appliedVoucher }" 
                       @click="isVoucherDropdownOpen = !isVoucherDropdownOpen">
                    <div class="pm-trigger-content">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pm-trigger-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                      <span v-if="appliedVoucher" class="pm-trigger-text selected">
                        <strong>{{ appliedVoucher.code }}</strong> — {{ appliedVoucher.name }}
                      </span>
                      <span v-else class="pm-trigger-text placeholder">
                        Pilih Voucher Promo dari Katalog...
                      </span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pm-arrow-icon" :class="{ 'rotate': isVoucherDropdownOpen }"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>

                  <!-- Dropdown Options Menu -->
                  <div v-if="isVoucherDropdownOpen" class="pm-custom-dropdown-menu">
                    <div v-for="v in availableVouchers" 
                         :key="v.code" 
                         class="pm-dropdown-option"
                         :class="{ 'is-selected': appliedVoucher && appliedVoucher.code === v.code }"
                         @click="selectVoucher(v)">
                      <div class="pm-opt-badge">{{ v.code }}</div>
                      <div class="pm-opt-info">
                        <span class="pm-opt-title">{{ v.name }}</span>
                        <span class="pm-opt-desc">{{ v.type === 'percent' ? `Diskon ${v.discount}% Total` : `Potongan Rp ${v.discount.toLocaleString('id-ID')}` }}</span>
                      </div>
                      <div class="pm-opt-action">
                        <span class="pm-opt-btn">{{ appliedVoucher && appliedVoucher.code === v.code ? 'Terpasang' : 'Gunakan' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Active Voucher Tag -->
                <div v-if="appliedVoucher" class="pm-voucher-applied-pill">
                  <div class="pm-vap-content">
                    <span class="pm-vap-code">{{ appliedVoucher.code }}</span>
                    <span class="pm-vap-text">Berhasil diterapkan (Hemat Rp {{ voucherDiscountAmount.toLocaleString('id-ID') }})</span>
                  </div>
                  <button type="button" class="pm-btn-voucher-remove" @click="removeVoucher" title="Hapus voucher">&times;</button>
                </div>
              </div>
            </div>

            <!-- Itemized Order List -->
            <div class="pm-order-items-box">
              <div class="pm-items-header">Rincian Item ({{ totalCartQuantity }} Tiket/Layanan)</div>
              
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
                  <span class="pm-calc-val">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Member -->
                <div v-if="memberDiscountAmount > 0" class="pm-calc-row discount emerald">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Diskon Member Kampung Coklat (10%)
                  </span>
                  <span class="pm-calc-val">- Rp {{ memberDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Tier Rombongan B2B -->
                <div v-if="bulkDiscountAmount > 0" class="pm-calc-row discount blue">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Diskon Rombongan B2B ({{ bulkDiscountPercent }}%)
                  </span>
                  <span class="pm-calc-val">- Rp {{ bulkDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>

                <!-- Diskon Voucher Promo -->
                <div v-if="voucherDiscountAmount > 0" class="pm-calc-row discount amber">
                  <span class="pm-calc-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Voucher Promo ({{ appliedVoucher.code }})
                  </span>
                  <span class="pm-calc-val">- Rp {{ voucherDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>

            <!-- Final Grand Total -->
            <div class="pm-order-footer">
              <div class="pm-total-card">
                <div class="pm-total-info">
                  <span class="pm-total-title">Total Tagihan</span>
                  <span class="pm-total-sub">Sudah termasuk PPN & paket rombongan</span>
                </div>
                <div class="pm-total-value">
                  Rp {{ grandTotal.toLocaleString('id-ID') }}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Ticket/Success Modal & Printable Boarding Pass (Self-Service Exact Match) -->
    <div class="ticket-modal-backdrop" v-if="showSuccessModal" @click.self="finishTransaction">
      
      <!-- Top Status Banner (Hidden in Print) -->
      <div class="ticket-modal-top-header no-print">
        <div class="tmt-check-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
          <h2 class="tmt-title">Pembayaran Berhasil!</h2>
          <p class="tmt-subtitle">E-Tiket resmi rombongan B2B telah terbit dan siap digunakan pada hari kunjungan</p>
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
                <span class="tpc-brand-tag">ROMBONGAN & MITRA B2B</span>
              </div>
            </div>
            <div class="tpc-service-badge">
              TIKET ROMBONGAN
            </div>
          </div>

          <div class="tpc-title-row">
            <div>
              <h2 class="tpc-heading">E-TIKET RESERVASI ROMBONGAN</h2>
              <span class="tpc-code-sub">NO. TIKET: <strong>#{{ transactionResult?.pos_trx_id || 'TRX-77189023' }}</strong></span>
            </div>
            <span class="tpc-status-verified">LUNAS / VERIFIED</span>
          </div>

          <!-- Metadata 4-Box Grid -->
          <div class="tpc-grid-card">
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Tanggal Kunjungan</span>
              <span class="tpc-meta-value highlight">{{ bookingData.tanggal || 'Hari Ini' }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Instansi / Rombongan</span>
              <span class="tpc-meta-value">{{ bookingData.instansi || 'Rombongan Mitra' }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">PIC Rombongan</span>
              <span class="tpc-meta-value">{{ bookingData.nama || 'PIC Rombongan' }} ({{ bookingData.telepon || '-' }})</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Total Pembayaran</span>
              <span class="tpc-meta-value price">Rp {{ (transactionResult?.total_amount || grandTotal).toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <!-- Items Badges -->
          <div class="tpc-items-section">
            <span class="tpc-items-heading">Rincian Layanan & Tiket ({{ totalCartQuantity }} Total Item):</span>
            <div class="tpc-items-badges">
              <div v-for="item in cart" :key="item.id || item.packageId || item.name" class="tpc-item-pill">
                <span class="tpc-qty-tag">{{ item.qty }}x</span>
                <span class="tpc-item-label">{{ item.name }}</span>
              </div>
            </div>
          </div>

          <!-- Gate Scanning Notice -->
          <div class="tpc-gate-notice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Tunjukkan e-tiket ini kepada petugas Gate Masuk & Loket Khusus Rombongan Kampung Coklat.</span>
          </div>
        </div>

        <!-- Middle Perforation with Semicircle Cutouts -->
        <div class="tpc-perforation">
          <div class="tpc-notch-top"></div>
          <div class="tpc-dash-line"></div>
          <div class="tpc-notch-bottom"></div>
        </div>

        <!-- Right Stub: QR Code & Fast Gate Pass -->
        <div class="tpc-stub">
          <div class="tpc-stub-header">
            <span class="tpc-stub-title">KAMPUNG COKLAT</span>
            <span class="tpc-stub-sub">B2B GROUP PASS</span>
          </div>

          <div class="tpc-qr-card">
            <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${transactionResult?.pos_trx_id || 'TRX-77189023'}`" alt="QR Code" class="tpc-qr-code" />
          </div>

          <span class="tpc-qr-code-text">{{ transactionResult?.pos_trx_id || 'TRX-77189023' }}</span>

          <div class="tpc-stub-validity">
            <span class="tpc-active-dot"></span>
            <span>ROMBONGAN AKTIF</span>
          </div>

          <span class="tpc-valid-date">TERVERIFIKASI</span>
        </div>
      </div>

      <!-- Action Buttons Below Ticket (Hidden in Print) -->
      <div class="ticket-modal-actions no-print">
        <button class="tma-btn-print" @click="handlePrintTicket">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>CETAK BOARDING PASS TIKET</span>
        </button>
        <button class="tma-btn-done" @click="finishTransaction">
          TRANSAKSI SELESAI
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.pos-wrapper { display: flex; height: calc(100vh - 60px); background-color: #F3F4F6; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; gap: 20px; padding: 20px; box-sizing: border-box; }
.pos-form-pane { width: 360px; min-width: 360px; background: #ffffff; padding: 24px; overflow-y: auto; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; }
.pos-catalog-pane { flex: 1; display: flex; flex-direction: column; padding: 24px; overflow: hidden; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
.pos-cart-pane { width: 360px; min-width: 360px; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; padding: 24px; }
.pane-title { font-size: 18px; font-weight: 800; color: #1F2937; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px; border-bottom: 2px solid #F3F4F6; padding-bottom: 12px; }
.pos-form-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pos-form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.pos-form-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin: 0;
}
.pos-label-req {
  color: #DC2626;
  font-weight: 900;
}
.pos-label-optional {
  font-size: 10px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: none;
}
.pos-form-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #E2E8F0;
  border-radius: 9px;
  font-size: 13.5px;
  font-weight: 600;
  background: #FFFFFF;
  color: #1E293B;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.pos-form-input:focus {
  border-color: #F59E0B;
  box-shadow: 0 0 0 3.5px rgba(245, 158, 11, 0.14);
}
.pos-member-field-wrap {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.pos-btn-check-member {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  padding: 0 16px;
  border-radius: 9px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  flex-shrink: 0;
}
.pos-member-alert {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 6px;
  margin-top: 2px;
}
.pos-member-alert.success {
  background: #F0FDF4;
  color: #166534;
  border: 1px solid #DCFCE7;
}
.pos-member-alert.error {
  background: #FEF2F2;
  color: #991B1B;
  border: 1px solid #FEE2E2;
}

.pos-filter-pills {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.pos-pill {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 800;
  background: #F1F5F9;
  color: #475569;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.pos-pill:hover {
  background: #E2E8F0;
}
.pos-pill.active {
  background: #D97706;
  color: #FFFFFF;
  border-color: #D97706;
}

.product-list-wrapper { overflow-y: auto; padding-bottom: 20px; }
.pos-products-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}
.pos-card-full {
  display: flex;
  align-items: stretch;
  gap: 14px;
  background: #ffffff;
  border: 1.5px solid #E5E7EB;
  border-radius: 14px;
  padding: 14px 16px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}
.pos-card-full:hover {
  border-color: #F59E0B;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
}
.pos-thumb-wrap {
  width: 95px;
  height: 95px;
  min-width: 95px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: #F1F5F9;
}
.pos-thumb-wrap-edukasi {
  width: 140px;
  min-width: 140px;
  height: auto;
  align-self: stretch;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pos-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pos-thumb-wrap-edukasi .pos-thumb-img {
  object-fit: contain;
}

.pos-badge-tag {
  display: inline-flex;
  align-items: center;
  background: #F1F5F9;
  color: #475569;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border: 1px solid #E2E8F0;
}
.badge-gold {
  background: #FEF3C7;
  color: #92400E;
  border-color: #FDE68A;
}
.badge-green {
  background: #ECFDF5;
  color: #065F46;
  border-color: #A7F3D0;
}

.pos-content-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  gap: 8px;
}
.pos-item-title {
  font-size: 15.5px;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
  line-height: 1.3;
}
.pos-item-desc {
  font-size: 12px;
  color: #64748B;
  margin: 0;
  line-height: 1.35;
}
.pos-highlights-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
.pos-highlight-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #F0FDF4;
  border: 1px solid #DCFCE7;
  color: #166534;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  line-height: 1.2;
}
.pos-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.pos-price-tag {
  display: flex;
  align-items: baseline;
  gap: 3px;
}
.pos-curr {
  font-size: 13px;
  font-weight: 800;
  color: #D97706;
}
.pos-val {
  font-size: 18px;
  font-weight: 900;
  color: #D97706;
}
.pos-btn-tambah {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FDE68A;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.pos-btn-tambah:hover:not(:disabled) {
  background: #F59E0B;
  color: #ffffff;
  border-color: #F59E0B;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.25);
}
.pos-btn-tambah:disabled {
  background: #F1F5F9;
  color: #94A3B8;
  border-color: #E2E8F0;
  cursor: not-allowed;
}
.pos-btn-plus {
  font-size: 15px;
  font-weight: 900;
  line-height: 1;
}

.cart-item-row { display: flex; flex-direction: column; gap: 10px; background: #ffffff; border: 1px solid #E5E7EB; padding: 16px; border-radius: 12px; margin-bottom: 12px; }
.cart-item-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
.cart-item-bottom { display: flex; justify-content: space-between; align-items: center; }
.cart-item-name { font-weight: 700; color: #1F2937; font-size: 15px; line-height: 1.3; }
.cart-item-price { font-size: 13px; color: #6B7280; font-weight: 500; }
.cart-item-qty-control { display: flex; align-items: center; border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; background: #F9FAFB; }
.cart-item-qty-control button { background: transparent; border: none; width: 32px; height: 32px; cursor: pointer; color: #4B5563; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.cart-item-qty-control button:hover { background: #E5E7EB; color: #1F2937; }
.cart-item-qty-control span { width: 36px; text-align: center; font-weight: 700; font-size: 14px; color: #1F2937; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; height: 32px; background: #ffffff; }
.cart-item-subtotal { font-weight: 800; color: #2C1A13; font-size: 16px; white-space: nowrap; }
.cart-footer-summary { margin-top: auto; padding-top: 16px; border-top: 2px solid #F3F4F6; }
.summary-row.grand-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-weight: 800; font-size: 15px; color: #1F2937; }
.summary-row.grand-total .total-price { font-size: 22px; color: #D97706; font-weight: 900; }
.btn-checkout-premium { width: 100%; background: #D97706; color: #ffffff; border: none; padding: 14px; font-size: 15px; font-weight: 800; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25); }
.btn-checkout-premium:hover:not(:disabled) { background: #B45309; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(217, 119, 6, 0.35); }
.btn-checkout-premium:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; box-shadow: none; }

/* Modal Overlay Backdrop */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* Payment Modal Container (2-Column) */
.payment-modal-container {
  background: #FFFFFF;
  border-radius: 20px;
  width: 1120px;
  max-width: 96vw;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: modalFadeIn 0.25s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.97) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Top Modal Bar */
.pm-modal-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px;
  background: #FDFBF7;
  border-bottom: 1px solid #F1ECE4;
}

.pm-brand-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.pm-logo {
  height: 38px;
  object-fit: contain;
}

.pm-main-heading {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: #2C1A13;
}

.pm-sub-heading {
  margin: 2px 0 0 0;
  font-size: 12px;
  color: #8C6A4F;
}

.pm-close-btn {
  background: #F1ECE4;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 18px;
  color: #64748B;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.pm-close-btn:hover {
  background: #E2E8F0;
  color: #0F172A;
}

/* 2-Column Layout */
.pm-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  flex: 1;
  overflow: hidden;
  background: #FFFFFF;
}

.pm-left-panel {
  padding: 24px 28px;
  overflow-y: auto;
  border-right: 1px solid #F1ECE4;
  display: flex;
  flex-direction: column;
}

.pm-right-panel {
  padding: 24px 28px;
  overflow-y: auto;
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
}

.pm-section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.pm-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pm-icon-circle.bg-amber { background: #FEF3C7; color: #D97706; }
.pm-icon-circle.bg-emerald { background: #D1FAE5; color: #059669; }

.pm-panel-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: #1E293B;
}

.pm-panel-subtitle {
  margin: 2px 0 0 0;
  font-size: 11.5px;
  color: #64748B;
}

/* Methods Container */
.pm-methods-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.pm-method-card {
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
}

.pm-method-card:hover {
  border-color: #CBD5E1;
}

.pm-method-card.active {
  border-color: #F59E0B;
  box-shadow: 0 0 0 1px #F59E0B;
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
  gap: 2px;
}

.pm-method-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #1E293B;
}

.pm-method-desc {
  font-size: 11.5px;
  color: #64748B;
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
}

.pm-radio-custom:checked {
  border-color: #D97706;
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
  padding: 0 18px 16px 18px;
  border-top: 1px dashed #F1ECE4;
  margin-top: 4px;
  padding-top: 14px;
}

/* Cash Input Box for POS */
.pm-cash-input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-cash-input-row {
  display: flex;
  gap: 10px;
}

.pm-cash-input-control {
  flex: 1;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 800;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  outline: none;
}

.pm-cash-input-control:focus {
  border-color: #F59E0B;
}

.pm-btn-exact {
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FDE68A;
  padding: 0 16px;
  font-size: 12px;
  font-weight: 800;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
}

.pm-quick-cash-row {
  display: flex;
  gap: 6px;
}

.pm-quick-chip {
  flex: 1;
  padding: 6px 0;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
}

.pm-quick-chip:hover {
  background: #F1F5F9;
  color: #0F172A;
}

.pm-cash-change-banner {
  display: flex;
  justify-content: space-between;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
}

.pm-cash-change-banner.is-change {
  background: #ECFDF5;
  border-color: #A7F3D0;
  color: #065F46;
}

.text-change {
  color: #059669;
  font-size: 14px;
  font-weight: 800;
}

/* Banks */
.pm-bank-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-bank-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
}

.pm-bank-option:hover {
  border-color: #F59E0B;
}

.pm-bank-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
}

.bank-logo {
  font-size: 10px;
  font-weight: 900;
  color: #FFFFFF;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.bank-logo.bca { background: #005690; }
.bank-logo.mandiri { background: #003366; }
.bank-logo.bni { background: #F15A24; }
.bank-logo.bri { background: #00529C; }

/* QRIS */
.pm-qris-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
}

.pm-qr-preview-card {
  background: #FFFFFF;
  padding: 12px;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.pm-qr-img {
  width: 140px;
  height: 140px;
}

.pm-qris-badge {
  font-size: 9px;
  font-weight: 900;
  color: #475569;
  letter-spacing: 0.5px;
}

.pm-qris-hint {
  font-size: 11.5px;
  color: #64748B;
  margin: 8px 0 0 0;
  text-align: center;
}

/* EDC */
.pm-edc-card-input-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-edc-field-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
}

.pm-edc-input-wrapper {
  display: flex;
  align-items: center;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  padding: 0 10px;
  background: #FFFFFF;
}

.pm-edc-input-wrapper:focus-within {
  border-color: #F59E0B;
}

.pm-edc-icon {
  color: #94A3B8;
  margin-right: 8px;
}

.pm-edc-input-control {
  border: none;
  outline: none;
  font-size: 13.5px;
  font-weight: 700;
  width: 100%;
  padding: 10px 0;
}

.pm-edc-hint {
  font-size: 11px;
  color: #94A3B8;
}

/* Left Footer */
.pm-left-footer {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-btn-primary {
  width: 100%;
  background: #D97706;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
}

.pm-btn-primary:hover:not(:disabled) {
  background: #B45309;
  transform: translateY(-1px);
}

.pm-btn-primary:disabled {
  background: #CBD5E1;
  cursor: not-allowed;
  box-shadow: none;
}

.pm-btn-secondary {
  background: transparent;
  border: none;
  color: #64748B;
  font-size: 12.5px;
  font-weight: 700;
  padding: 6px;
  cursor: pointer;
}

.pm-btn-secondary:hover {
  color: #1E293B;
}

/* Right Panel: Trip & Promo */
.pm-trip-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
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
  font-weight: 700;
  color: #1E293B;
}

.pm-trip-val.highlight {
  color: #D97706;
}

/* Promo & Member Box */
.pm-promo-membership-box {
  background: #FFFFFF;
  border: 1.5px solid #F1ECE4;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 14px;
}

.pm-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F8FAFC;
  padding-bottom: 6px;
}

.pm-box-title {
  font-size: 12px;
  font-weight: 800;
  color: #2C1A13;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.pm-auto-tag {
  font-size: 10px;
  font-weight: 800;
  color: #059669;
  background: #D1FAE5;
  padding: 2px 6px;
  border-radius: 4px;
}

.pm-member-active-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  padding: 10px 12px;
  border-radius: 8px;
}

.pm-member-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pm-member-badge-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #059669;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pm-member-info {
  display: flex;
  flex-direction: column;
}

.pm-member-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pm-member-status {
  font-size: 11px;
  font-weight: 900;
  color: #065F46;
}

.pm-member-benefit {
  font-size: 10px;
  font-weight: 700;
  color: #D97706;
}

.pm-member-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #1E293B;
}

.pm-member-phone {
  font-size: 11px;
  color: #64748B;
}

.pm-btn-member-edit {
  background: transparent;
  border: none;
  color: #059669;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: underline;
}

.pm-member-manual-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-input-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 700;
  color: #475569;
}

.pm-link-promo {
  font-size: 11px;
  color: #D97706;
  font-weight: 700;
}

.pm-input-btn-group {
  display: flex;
  gap: 6px;
}

.pm-text-input {
  flex: 1;
  padding: 8px 12px;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 600;
  outline: none;
}

.pm-text-input:focus {
  border-color: #F59E0B;
}

.pm-btn-action-sm {
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

/* Voucher Selector */
.pm-voucher-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-custom-dropdown-container {
  position: relative;
}

.pm-custom-dropdown-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  padding: 9px 12px;
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-custom-dropdown-trigger:hover {
  border-color: #CBD5E1;
}

.pm-custom-dropdown-trigger.is-open {
  border-color: #F59E0B;
}

.pm-trigger-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #64748B;
}

.pm-trigger-text.selected {
  color: #1E293B;
  font-weight: 700;
}

.pm-trigger-icon {
  color: #D97706;
}

.pm-arrow-icon {
  color: #94A3B8;
  transition: transform 0.2s;
}

.pm-arrow-icon.rotate {
  transform: rotate(180deg);
}

.pm-custom-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 4px;
}

.pm-dropdown-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.pm-dropdown-option:hover {
  background: #F8FAFC;
}

.pm-dropdown-option.is-selected {
  background: #FEF3C7;
}

.pm-opt-badge {
  font-size: 10px;
  font-weight: 900;
  background: #F1ECE4;
  color: #2C1A13;
  padding: 2px 6px;
  border-radius: 4px;
}

.pm-opt-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pm-opt-title {
  font-size: 12px;
  font-weight: 700;
  color: #1E293B;
}

.pm-opt-desc {
  font-size: 10.5px;
  color: #64748B;
}

.pm-opt-btn {
  font-size: 11px;
  font-weight: 800;
  color: #D97706;
}

.pm-voucher-applied-pill {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11.5px;
}

.pm-vap-code {
  font-weight: 900;
  color: #92400E;
  margin-right: 6px;
}

.pm-vap-text {
  color: #78350F;
}

.pm-btn-voucher-remove {
  background: transparent;
  border: none;
  color: #92400E;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
}

/* Order Items Box */
.pm-order-items-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.pm-items-header {
  font-size: 12px;
  font-weight: 800;
  color: #475569;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.pm-items-scroll {
  max-height: 140px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 4px;
  border-bottom: 1px dashed #E2E8F0;
  padding-bottom: 8px;
}

.pm-order-item {
  display: flex;
  flex-direction: column;
}

.pm-item-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: #1E293B;
}

.pm-item-qty-row {
  display: flex;
  gap: 4px;
  font-size: 11px;
  color: #64748B;
}

.pm-calc-breakdown {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
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
  font-weight: 700;
  color: #1E293B;
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

/* Total Card */
.pm-order-footer {
  margin-top: 12px;
}

.pm-total-card {
  background: #2C1A13;
  color: #FFFFFF;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pm-total-info {
  display: flex;
  flex-direction: column;
}

.pm-total-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.pm-total-sub {
  font-size: 10.5px;
  color: #E6D7C3;
}

.pm-total-value {
  font-size: 20px;
  font-weight: 900;
  color: #F59E0B;
}

/* SUCCESS MODAL & BOARDING PASS STYLES */
.ticket-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  overflow-y: auto;
}.ticket-modal-top-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  .cutout-left, .cutout-right { display: none; }
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
  @page { margin: 0; size: 80mm auto; }
  body { margin: 0; padding: 0; background: #fff; color: #000; }
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
</style>


