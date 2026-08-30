<script setup lang="ts">
import { useCrmNonMember } from '~/composables/useCrmNonMember'
import { usePosTransactions } from '~/composables/usePosTransactions'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const { addVisitor } = useCrmNonMember()
const { addPosTransaction } = usePosTransactions()

import { ref, computed } from 'vue'
import AppDatePicker from '~/components/shared/AppDatePicker.vue'
import AppSelect from '~/components/shared/AppSelect.vue'

definePageMeta({
  layout: 'pos'
})

const ageCategoryOptions = [
  { value: 'Anak-Anak', label: 'Anak-Anak (< 12 Tahun)' },
  { value: 'Remaja', label: 'Remaja / Pelajar (12 - 24 Tahun)' },
  { value: 'Dewasa', label: 'Dewasa / Keluarga (25 - 49 Tahun)' },
  { value: 'Lansia', label: 'Lansia / Senior (50+ Tahun)' }
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

import { useConfigSync } from '~/composables/useConfigSync'

const { ticketRates, rides } = useConfigSync()

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
  { id: 'kereta-monorel', name: 'Kereta Monorel', categoryTag: 'Keluarga', isFreeTerusan: true, desc: 'Pemandangan panorama dari atas rel', image: imgKeretaMonorel, price: 15000, isMaintenance: false },
  { id: 'kolam-pemancingan', name: 'Kolam Pemancingan', categoryTag: 'Santai', isFreeTerusan: true, desc: 'Memancing di kolam alami yang asri', image: imgKolamPemancingan, price: 0, isMaintenance: false },
  { id: 'kolam-renang-anak', name: 'Kolam Renang Anak', categoryTag: 'Wahana Air', isFreeTerusan: true, desc: 'Bermain air di kolam dangkal anak', image: imgKolamRenangAnak, price: 10000, isMaintenance: false },
  { id: 'kursi-pijat', name: 'Kursi Pijat', categoryTag: 'Relaksasi', isFreeTerusan: false, desc: 'Pijatan relaksasi nyaman 15 menit', image: imgKursiPijat, price: 15000, isMaintenance: false },
  { id: 'mini-golf', name: 'Mini Golf', categoryTag: 'Ketangkasan', isFreeTerusan: true, desc: 'Uji fokus ketangkasan memasukkan bola', image: imgMiniGolf, price: 15000, isMaintenance: false },
  { id: 'mini-jeep', name: 'Mini Jeep', categoryTag: 'Wahana Anak', isFreeTerusan: false, desc: 'Mengemudi jeep mini di trek aman', image: imgMiniJeep, price: 25000, isMaintenance: false },
  { id: 'mini-swinger', name: 'Mini Swinger', categoryTag: 'Wahana Anak', isFreeTerusan: false, desc: 'Ayunan berputar ceria dan aman', image: imgMiniSwinger, price: 15000, isMaintenance: false },
  { id: 'panahan', name: 'Panahan', categoryTag: 'Ketangkasan', isFreeTerusan: true, desc: 'Latihan konsentrasi membidik sasaran', image: imgPanahan, price: 15000, isMaintenance: false },
  { id: 'pancingan-anak', name: 'Pancingan Anak', categoryTag: 'Wahana Anak', isFreeTerusan: true, desc: 'Memancing ikan magnet seru anak', image: imgPancinganAnak, price: 10000, isMaintenance: false },
  { id: 'perahu-ceria', name: 'Perahu Ceria', categoryTag: 'Wahana Air', isFreeTerusan: true, desc: 'Perahu dayung mini kolam dangkal', image: imgPerahuCeria, price: 10000, isMaintenance: false },
  { id: 'perahu-dayung', name: 'Perahu Dayung', categoryTag: 'Wahana Air', isFreeTerusan: true, desc: 'Mendayung perahu santai bersama', image: imgPerahuDayung, price: 15000, isMaintenance: false },
  { id: 'playground', name: 'Playground', categoryTag: 'Wahana Anak', isFreeTerusan: true, desc: 'Taman bermain perosotan dan ayunan', image: imgPlayground, price: 15000, isMaintenance: false },
  { id: 'sepeda-listrik', name: 'Sepeda Listrik', categoryTag: 'Transportasi', isFreeTerusan: false, desc: 'Sewa sepeda listrik keliling kebun', image: imgSepedaListrik, price: 35000, isMaintenance: false },
  { id: 'sepeda-udara', name: 'Sepeda Udara', categoryTag: 'Petualangan', isFreeTerusan: false, desc: 'Mengayuh sepeda di atas rel gantung', image: imgSepedaUdara, price: 20000, isMaintenance: false },
  { id: 'terapi-ikan', name: 'Terapi Ikan', categoryTag: 'Relaksasi', isFreeTerusan: true, desc: 'Pijatan geli ribuan ikan terapi', image: imgTerapiIkan, price: 5000, isMaintenance: false },
  { id: 'trampolin', name: 'Trampolin', categoryTag: 'Wahana Anak', isFreeTerusan: true, desc: 'Melompat bebas di jaring aman', image: imgTrampolin, price: 10000, isMaintenance: false }
]

const searchQuery = ref('')
const filterType = ref('all') // 'all' | 'free' | 'paid'

const rawWahanaTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'wahana' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const rideData = rides.value.find(r => r.name.toLowerCase() === t.name.toLowerCase())
      const isMaintenance = rideData?.status === 'MAINTENANCE'
      const isFree = t.description?.toLowerCase().includes('free') || rideData?.isFreeTerusan
      return {
        id: t.id,
        name: t.name,
        categoryTag: 'Wahana',
        isFreeTerusan: isFree,
        price: t.price,
        desc: t.description || 'Fasilitas Wahana Kampung Coklat',
        image: t.imageUrl || imgAnimalFeeding,
        isMaintenance
      }
    })
  }
  return defaultWahanaTickets
})

const wahanaTickets = computed(() => {
  return rawWahanaTickets.value.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    if (filterType.value === 'free') return matchSearch && item.isFreeTerusan
    if (filterType.value === 'paid') return matchSearch && !item.isFreeTerusan
    return matchSearch
  })
})

const bookingData = ref({
  nama: '',
  telepon: '',
  kategoriUmur: 'Dewasa',
  tanggalLahir: '',
  tanggal: new Date().toISOString().split('T')[0],
  isMember: false,
  memberId: ''
})

const cart = ref<any[]>([])

const paymentMethod = ref<'cash' | 'transfer' | 'qris' | 'debit'>('cash')
const cashReceived = ref(0)
const showPaymentModal = ref(false)
const showSuccessModal = ref(false)

// Voucher Promo State
const appliedVoucher = ref<any>(null)
const availableVouchers = ref([
  { code: 'COKLATHAPPY', title: 'Voucher Wisata Ceria', desc: 'Diskon 10% total pesanan', discountPercent: 10 },
  { code: 'FAMILYSERU', title: 'Voucher Liburan Keluarga', desc: 'Potongan langsung Rp 20.000', discountAmount: 20000 },
  { code: 'WEEKENDHEMAT', title: 'Promo Spesial Akhir Pekan', desc: 'Diskon 5% total pesanan', discountPercent: 5 }
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
    const member: any = await $fetch(`http://localhost:3001/api/v1/members/${bookingData.value.memberId}`)
    if (member && member.data) {
      memberStatus.value = 'valid'
      bookingData.value.isMember = true
      if (member.data.nama) bookingData.value.nama = member.data.nama
      if (member.data.whatsapp || member.data.telepon) bookingData.value.telepon = member.data.whatsapp || member.data.telepon
      if (member.data.kategoriUmur) bookingData.value.kategoriUmur = member.data.kategoriUmur
      if (member.data.tanggalLahir) bookingData.value.tanggalLahir = member.data.tanggalLahir
    } else {
      memberStatus.value = 'invalid'
      bookingData.value.isMember = false
    }
  } catch (e) {
    memberStatus.value = 'invalid'
    bookingData.value.isMember = false
  }
}

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

const memberDiscountAmount = computed(() => {
  if (!bookingData.value.isMember) return 0
  return Math.round(subtotal.value * 0.1) // 10% diskon member
})

const voucherDiscountAmount = computed(() => {
  if (!appliedVoucher.value) return 0
  if (appliedVoucher.value.discountAmount) return appliedVoucher.value.discountAmount
  if (appliedVoucher.value.discountPercent) return Math.round(subtotal.value * (appliedVoucher.value.discountPercent / 100))
  return 0
})

const grandTotal = computed(() => {
  return Math.max(0, subtotal.value - memberDiscountAmount.value - voucherDiscountAmount.value)
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
    alert('Nomor Telepon dan Nama Lengkap wajib diisi sebelum checkout!');
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
      nama: bookingData.value.nama || 'Pelanggan POS',
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

  const paymentLabel = paymentMethod.value === 'cash' ? 'Tunai' : (paymentMethod.value === 'qris' ? 'QRIS' : (paymentMethod.value === 'transfer' ? 'Transfer Bank' : 'EDC / Kartu'))
  addPosTransaction({
    category: 'Wahana',
    type: cart.value.map(i => `${i.qty}x ${i.name}`).join(', '),
    items: cart.value.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    qty: cart.value.reduce((sum, it) => sum + it.qty, 0),
    total: grandTotal.value,
    payment: paymentLabel,
    customer: bookingData.value.nama || 'Pengunjung Wahana'
  })

  showPaymentModal.value = false
  showSuccessModal.value = true
}

const finishTransaction = () => {
   cart.value = []
   bookingData.value = { nama: '', telepon: '', kategoriUmur: 'Dewasa', tanggalLahir: '', tanggal: new Date().toISOString().split('T')[0], isMember: false, memberId: '' }
   cashReceived.value = 0
   appliedVoucher.value = null
   showSuccessModal.value = false
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
        <title>E-Tiket-Wahana-${transactionResult.value?.pos_trx_id || 'KC-TIKET'}</title>
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
</script>

<template>
  <div class="pos-wrapper">
    <!-- LEFT PANE: Form -->
    <div class="pos-form-pane">
      <h2 class="pane-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Data Pengunjung
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

        <!-- Nama Pengunjung -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Nama Pengunjung</span>
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

        <!-- Kategori Usia (Segmentasi CRM) -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Kategori Usia (Segmentasi CRM)</span>
            <span class="pos-label-req">*</span>
          </label>
          <AppSelect 
            v-model="bookingData.kategoriUmur" 
            :options="ageCategoryOptions"
            placeholder="Pilih Kategori Usia"
          />
        </div>

        <!-- Tanggal Lahir (Opsional) -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Tanggal Lahir</span>
            <span class="pos-label-optional">(Opsional)</span>
          </label>
          <AppDatePicker 
            v-model="bookingData.tanggalLahir" 
            placeholder="Pilih Tanggal Lahir"
          />
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
              Pilih Produk: Wahana
            </h2>
            <span style="font-size: 12px; font-weight: 700; color: #64748B; background: #F1F5F9; padding: 4px 10px; border-radius: 20px;">
              {{ wahanaTickets.length }} Wahana
            </span>
          </div>

          <!-- Quick Search & Filter Toolbar -->
          <div style="display: flex; gap: 10px; align-items: center;">
            <div style="position: relative; flex: 1;">
              <svg style="position: absolute; left: 12px; top: 11px; color: #94A3B8;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Cari wahana permainan..." 
                style="width: 100%; padding: 8px 12px 8px 36px; border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 13px; outline: none; background: #F8FAFC;"
              />
            </div>
            
            <div class="pos-filter-pills" style="display: flex; gap: 6px;">
              <button type="button" class="pos-pill" :class="{'active': filterType === 'all'}" @click="filterType = 'all'">Semua</button>
              <button type="button" class="pos-pill" :class="{'active': filterType === 'free'}" @click="filterType = 'free'">Free Terusan</button>
              <button type="button" class="pos-pill" :class="{'active': filterType === 'paid'}" @click="filterType = 'paid'">Berbayar</button>
            </div>
          </div>
        </div>
          
        <div class="product-list-wrapper" style="overflow-y: auto; flex: 1; min-height: 0; padding-bottom: 20px; padding-right: 6px;">
          <div class="pos-products-stack">
            <div 
              class="pos-card-full" 
              v-for="product in wahanaTickets" 
              :key="product.id" 
              :class="{'card-maintenance': product.isMaintenance}"
            >
              <div class="pos-thumb-wrap">
                <img :src="product.image" :alt="product.name" class="pos-thumb-img" />
              </div>
              
              <div class="pos-content-wrap">
                <div class="pos-header-block">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h4 class="pos-item-title">{{ product.name }}</h4>
                    <span v-if="product.isFreeTerusan" class="pos-badge-tag badge-green">Free Terusan</span>
                    <span v-if="product.isMaintenance" class="pos-badge-tag badge-red">Perbaikan</span>
                  </div>
                  <p class="pos-item-desc">{{ product.desc }}</p>
                </div>

                <div class="pos-bottom-row">
                  <div class="pos-price-tag">
                    <span class="pos-curr">Rp</span>
                    <span class="pos-val" v-if="product.price === 0" style="color: #16A34A;">GRATIS</span>
                    <span class="pos-val" v-else>{{ product.price.toLocaleString('id-ID') }}</span>
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

    <!-- Payment Modal (2-Column Layout - Exact Self-Service Style) -->
    <div class="modal-overlay" v-if="showPaymentModal" @click.self="showPaymentModal = false">
      <div class="payment-modal-container">
        
        <!-- Header Bar with Logo -->
        <div class="pm-modal-top-bar">
          <div class="pm-brand-title">
            <img :src="logoImg" alt="Kampung Coklat" class="pm-logo" />
            <div>
              <h3 class="pm-main-heading">Pembayaran & Konfirmasi Tiket Wahana</h3>
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
                <p class="pm-panel-subtitle">Pilih salah satu metode pembayaran di bawah ini</p>
              </div>
            </div>
            
            <div class="pm-methods-container">
              <!-- TUNAI (CASH) -->
              <div class="pm-method-card" :class="{'active': paymentMethod === 'cash'}" @click="paymentMethod = 'cash'">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Tunai (Cash di Loket)</span>
                    <span class="pm-method-desc">Bayar langsung dengan uang tunai melalui kasir</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="cash" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'cash'" @click.stop>
                  <div class="pm-cash-input-box">
                    <label style="font-size: 11px; font-weight: 700; color: #64748B;">Nominal Uang Diterima (Rp)</label>
                    <div class="pm-cash-input-row">
                      <input 
                        type="number" 
                        v-model.number="cashReceived" 
                        class="pm-cash-input-control" 
                        placeholder="0" 
                        min="0"
                      />
                      <button type="button" class="pm-btn-exact" @click="setCashExact">Uang Pas</button>
                    </div>

                    <!-- Change Banner -->
                    <div class="pm-cash-change-banner" :class="{'is-change': changeAmount > 0}">
                      <div class="pm-cc-item">
                        <span>Total Tagihan:</span>
                        <strong>Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
                      </div>
                      <div class="pm-cc-item text-right">
                        <span>Kembalian:</span>
                        <strong class="text-change">Rp {{ changeAmount.toLocaleString('id-ID') }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- TRANSFER BANK / VA -->
              <div class="pm-method-card" :class="{'active': paymentMethod === 'transfer'}" @click="paymentMethod = 'transfer'">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Transfer Bank / Virtual Account</span>
                    <span class="pm-method-desc">BCA, Mandiri, BNI, BRI (Konfirmasi otomatis)</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="transfer" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'transfer'" @click.stop>
                  <div class="pm-bank-list">
                    <div class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bca">BCA</span> Bank BCA Virtual Account</div>
                      <input type="radio" name="bank_opt" checked class="pm-radio-custom" />
                    </div>
                    <div class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo mandiri">MDR</span> Bank Mandiri Virtual Account</div>
                      <input type="radio" name="bank_opt" class="pm-radio-custom" />
                    </div>
                    <div class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bni">BNI</span> Bank BNI Virtual Account</div>
                      <input type="radio" name="bank_opt" class="pm-radio-custom" />
                    </div>
                    <div class="pm-bank-option">
                      <div class="pm-bank-name"><span class="bank-logo bri">BRI</span> Bank BRI Virtual Account</div>
                      <input type="radio" name="bank_opt" class="pm-radio-custom" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- QRIS -->
              <div class="pm-method-card" :class="{'active': paymentMethod === 'qris'}" @click="paymentMethod = 'qris'">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">QRIS (GoPay, OVO, ShopeePay, BCA)</span>
                    <span class="pm-method-desc">Scan barcode cepat via aplikasi e-wallet / m-banking</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="qris" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'qris'" @click.stop>
                  <div class="pm-qris-box">
                    <div class="pm-qr-preview-card">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KAMPUNG-COKLAT-QRIS-OFFICIAL" alt="QRIS Code" class="pm-qr-img" />
                      <span class="pm-qris-badge">NMID: ID102003920194</span>
                    </div>
                    <p class="pm-qris-hint">Arahkan kamera smartphone pengunjung ke kode QR di atas</p>
                  </div>
                </div>
              </div>

              <!-- DEBIT / KREDIT (EDC) -->
              <div class="pm-method-card" :class="{'active': paymentMethod === 'debit'}" @click="paymentMethod = 'debit'">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Kartu Debit / Kredit (Mesin EDC)</span>
                    <span class="pm-method-desc">Gesek / Dip kartu debit/kredit pada mesin EDC</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="debit" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'debit'" @click.stop>
                  <div class="pm-edc-card-input-box">
                    <label class="pm-edc-field-label">Nomor Kartu / Approval Code EDC (Opsional)</label>
                    <div class="pm-edc-input-wrapper">
                      <span class="pm-edc-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                      </span>
                      <input type="text" placeholder="Contoh: 4111 •••• •••• 1234 / Appr: 894021" class="pm-edc-input-control" />
                    </div>
                    <span class="pm-edc-hint">Gesek kartu di mesin EDC kasir, lalu klik tombol bayar di bawah.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Button in Left Column -->
            <div class="pm-left-footer">
              <button 
                class="pm-btn-primary" 
                @click="processPayment" 
                :disabled="cart.length === 0 || (paymentMethod === 'cash' && cashReceived < grandTotal)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                BAYAR & CETAK STRUK SEKARANG
              </button>
              <button class="pm-btn-secondary" @click="showPaymentModal = false">Batal & Kembali ke Transaksi</button>
            </div>
          </div>

          <!-- Right Column: Order Summary & Member/Voucher Discounts -->
          <div class="pm-right-panel">
            <div class="pm-section-header">
              <div class="pm-icon-circle bg-emerald">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <h4 class="pm-panel-title">Detail Pesanan</h4>
                <p class="pm-panel-subtitle">Verifikasi rincian tiket & promo</p>
              </div>
            </div>

            <!-- Info Jadwal & Pengunjung -->
            <div class="pm-trip-card">
              <div class="pm-trip-row">
                <span class="pm-trip-label">Tanggal Kunjungan:</span>
                <span class="pm-trip-val">{{ bookingData.tanggal || new Date().toISOString().split('T')[0] }}</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">Nama Pembeli:</span>
                <span class="pm-trip-val highlight">{{ bookingData.nama || 'Pengunjung POS' }}</span>
              </div>
              <div class="pm-trip-row">
                <span class="pm-trip-label">No. Telepon:</span>
                <span class="pm-trip-val">{{ bookingData.telepon || '-' }}</span>
              </div>
            </div>

            <!-- Promo & Diskon Box (Membership & Voucher) -->
            <div class="pm-promo-membership-box">
              <div class="pm-box-header">
                <span class="pm-box-title">Promo & Diskon Member</span>
                <span v-if="bookingData.isMember" class="pm-auto-tag">Member Terverifikasi</span>
              </div>

              <!-- Membership Active Pill -->
              <div v-if="bookingData.isMember" class="pm-member-active-card">
                <div class="pm-member-left">
                  <div class="pm-member-badge-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div class="pm-member-info">
                    <div class="pm-member-title-row">
                      <span class="pm-member-status">VIP MEMBER</span>
                      <span class="pm-member-benefit">Diskon 10% Aktif</span>
                    </div>
                    <span class="pm-member-name">{{ bookingData.nama }}</span>
                    <span class="pm-member-phone">{{ bookingData.memberId || bookingData.telepon }}</span>
                  </div>
                </div>
                <button type="button" class="pm-btn-member-edit" @click="bookingData.isMember = false; bookingData.memberId = ''">Ganti</button>
              </div>

              <!-- Member Input (if not detected yet) -->
              <div v-else class="pm-member-manual-input">
                <div class="pm-input-label-row">
                  <span>Punya Kartu Member?</span>
                  <span class="pm-link-promo">Hemat 10% Tiket</span>
                </div>
                <div class="pm-input-btn-group">
                  <input 
                    type="text" 
                    v-model="bookingData.memberId" 
                    placeholder="Masukkan No. Member / WA" 
                    class="pm-text-input"
                  />
                  <button type="button" class="pm-btn-action-sm" @click="checkMemberId">Cek ID</button>
                </div>
              </div>

              <!-- Voucher Dropdown Picker -->
              <div class="pm-voucher-section">
                <div class="pm-custom-dropdown-container">
                  <div 
                    class="pm-custom-dropdown-trigger" 
                    :class="{'is-open': isVoucherDropdownOpen}" 
                    @click="isVoucherDropdownOpen = !isVoucherDropdownOpen"
                  >
                    <div class="pm-trigger-content">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pm-trigger-icon"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                      <span class="pm-trigger-text">{{ appliedVoucher ? appliedVoucher.title : 'Gunakan Voucher Promo' }}</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="pm-arrow-icon" :class="{'rotate': isVoucherDropdownOpen}"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>

                  <!-- Dropdown Menu -->
                  <div class="pm-custom-dropdown-menu" v-if="isVoucherDropdownOpen">
                    <div 
                      v-for="v in availableVouchers" 
                      :key="v.code" 
                      class="pm-dropdown-option"
                      @click="selectVoucher(v)"
                    >
                      <span class="pm-opt-badge">{{ v.code }}</span>
                      <div class="pm-opt-info">
                        <span class="pm-opt-title">{{ v.title }}</span>
                        <span class="pm-opt-desc">{{ v.desc }}</span>
                      </div>
                      <span class="pm-opt-btn">Pilih</span>
                    </div>
                  </div>
                </div>

                <!-- Applied Voucher Pill -->
                <div v-if="appliedVoucher" class="pm-voucher-applied-pill">
                  <div class="pm-vap-content">
                    <span class="pm-vap-code">{{ appliedVoucher.code }}</span>
                    <span class="pm-vap-text">{{ appliedVoucher.title }} (-Rp {{ voucherDiscountAmount.toLocaleString('id-ID') }})</span>
                  </div>
                  <button type="button" class="pm-btn-voucher-remove" @click="removeVoucher">&times;</button>
                </div>
              </div>
            </div>

            <!-- Itemized Order List -->
            <div class="pm-order-items-box">
              <div class="pm-items-header">Item Pembelian ({{ cart.reduce((acc, item) => acc + item.qty, 0) }})</div>
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

              <!-- Price Calculation Breakdown -->
              <div class="pm-calc-breakdown">
                <div class="pm-calc-row">
                  <span class="pm-calc-label">Subtotal</span>
                  <span class="pm-calc-val">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
                </div>
                <div v-if="memberDiscountAmount > 0" class="pm-calc-row discount emerald">
                  <span class="pm-calc-label">Diskon Member (10%)</span>
                  <span class="pm-calc-val">-Rp {{ memberDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>
                <div v-if="voucherDiscountAmount > 0" class="pm-calc-row discount amber">
                  <span class="pm-calc-label">Diskon Voucher</span>
                  <span class="pm-calc-val">-Rp {{ voucherDiscountAmount.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>

            <!-- Grand Total Card -->
            <div class="pm-order-footer">
              <div class="pm-total-card">
                <div class="pm-total-info">
                  <span class="pm-total-title">Total Pembayaran</span>
                  <span class="pm-total-sub">Sudah termasuk pajak & seluruh diskon</span>
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

    <!-- Success & Printable Ticket Modal (Exact Self-Service Perforated Boarding Pass Style) -->
    <div class="ticket-modal-backdrop" v-if="showSuccessModal" @click.self="finishTransaction">
      
      <!-- Top Title Notification -->
      <div class="ticket-modal-top-header">
        <div class="tmt-check-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
          <h2 class="tmt-title">Pembayaran Berhasil!</h2>
          <p class="tmt-subtitle">E-Tiket resmi telah terbit dan siap digunakan pada pintu masuk gerbang</p>
        </div>
      </div>

      <!-- Perforated Boarding Pass Ticket Card -->
      <div class="ticket-pass-card" id="printable-ticket-card">
        <!-- Main Card Section (Left) -->
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
              TIKET WAHANA
            </div>
          </div>

          <div class="tpc-title-row">
            <div>
              <h2 class="tpc-heading">E-TIKET MASUK & WAHANA</h2>
              <span class="tpc-code-sub">NO. TIKET: <strong>#{{ transactionResult?.pos_trx_id || 'TRX-23580041' }}</strong></span>
            </div>
            <span class="tpc-status-verified">LUNAS / VERIFIED</span>
          </div>

          <!-- Metadata 4-Box Grid -->
          <div class="tpc-grid-card">
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Tanggal Kunjungan</span>
              <span class="tpc-meta-value highlight">Hari Ini (Berlaku Hari Ini)</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Tipe Kunjungan</span>
              <span class="tpc-meta-value">Regular</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Pemesan / Member</span>
              <span class="tpc-meta-value">{{ bookingData.nama || 'Sobat Coklat' }}</span>
            </div>
            <div class="tpc-meta-col">
              <span class="tpc-meta-label">Total Pembayaran</span>
              <span class="tpc-meta-value price">Rp {{ (transactionResult?.total_amount || grandTotal).toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <!-- Items Badges -->
          <div class="tpc-items-section">
            <span class="tpc-items-heading">Rincian Akses Masuk & Wahana ({{ totalCartQuantity }} Item):</span>
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
            <span>Scan barcode pada scanner Turnstile Gate di pintu masuk utama atau tunjukkan ke petugas kasir wahana.</span>
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
            <span class="tpc-stub-sub">OFFICIAL PASS</span>
          </div>

          <div class="tpc-qr-card">
            <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${transactionResult?.pos_trx_id || 'TRX-23580041'}`" alt="QR Code" class="tpc-qr-code" />
          </div>

          <span class="tpc-qr-code-text">{{ transactionResult?.pos_trx_id || 'TRX-23580041' }}</span>

          <div class="tpc-stub-validity">
            <span class="tpc-active-dot"></span>
            <span>TIKET AKTIF</span>
          </div>

          <span class="tpc-valid-date">HARI INI</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="ticket-modal-actions no-print">
        <button type="button" class="tma-btn-print" @click="handlePrintTicket">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          CETAK E-TIKET SEKARANG
        </button>
        <button type="button" class="tma-btn-close" @click="finishTransaction">
          Selesai & Tutup
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.pos-wrapper { display: flex; height: calc(100vh - 60px); background-color: #F3F4F6; font-family: 'Plus Jakarta Sans', sans-serif; overflow: hidden; gap: 20px; padding: 20px; box-sizing: border-box; }
.pos-form-pane { width: 360px; min-width: 360px; background: #ffffff; padding: 24px; overflow-y: auto; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column; }
.pos-catalog-pane { flex: 1; display: flex; flex-direction: column; padding: 24px; overflow: hidden; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
.pos-cart-pane { width: 360px; min-width: 360px; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); display: flex; flex-direction: column;  padding: 24px;}
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

.pos-form-input, .pos-form-select {
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
.pos-form-input::placeholder {
  color: #94A3B8;
  font-weight: 400;
}
.pos-form-input:focus, .pos-form-select:focus {
  border-color: #F59E0B;
  box-shadow: 0 0 0 3.5px rgba(245, 158, 11, 0.14);
  background: #FFFFFF;
}

.pos-member-field-wrap {
  display: flex;
  gap: 8px;
  align-items: stretch;
}
.pos-member-input {
  flex: 1;
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
  transition: all 0.2s;
  flex-shrink: 0;
}
.pos-btn-check-member:hover {
  background: #452a1f;
  transform: translateY(-1px);
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

.product-list-wrapper { overflow-y: auto; padding-bottom: 20px; }
.pos-filter-pills .pos-pill {
  border: 1px solid #E2E8F0;
  background: #ffffff;
  color: #64748B;
  font-size: 11.5px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}
.pos-filter-pills .pos-pill.active {
  background: #2C1A13;
  color: #ffffff;
  border-color: #2C1A13;
}

.pos-products-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.pos-card-full {
  display: flex;
  align-items: stretch;
  gap: 14px;
  background: #ffffff;
  border: 1.5px solid #E5E7EB;
  border-radius: 14px;
  padding: 12px 14px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}
.pos-card-full:hover:not(.card-maintenance) {
  border-color: #F59E0B;
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
}
.pos-card-full.card-maintenance {
  opacity: 0.6;
  background: #F9FAFB;
}

.pos-thumb-wrap {
  width: 90px;
  height: 90px;
  min-width: 90px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: #F1F5F9;
}
.pos-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  letter-spacing: 0.3px;
  border: 1px solid #E2E8F0;
}
.pos-badge-tag.badge-green {
  background: #F0FDF4;
  color: #166534;
  border-color: #DCFCE7;
}
.pos-badge-tag.badge-red {
  background: #FEF2F2;
  color: #991B1B;
  border-color: #FEE2E2;
}

.pos-content-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  gap: 8px;
}

.pos-header-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pos-item-title {
  font-size: 15px;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  font-size: 17px;
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
  padding: 6px 14px;
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
  background: #E2E8F0;
  color: #94A3B8;
  border-color: #CBD5E1;
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
.cart-item-qty-control button:hover { background: #e9ecef; }
.cart-item-qty-control span { width: 36px; text-align: center; font-weight: 700; font-size: 14px; color: #1F2937; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center; height: 32px; background: #ffffff; }
.cart-item-subtotal { font-weight: 800; color: #2C1A13; font-size: 16px; white-space: nowrap; }

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
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
}

.pm-bank-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
}

.bank-logo {
  font-size: 10px;
  font-weight: 900;
  color: #FFFFFF;
  padding: 3px 6px;
  border-radius: 4px;
  font-style: italic;
}

.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }

/* QRIS */
.pm-qris-box {
  text-align: center;
}

.pm-qr-preview-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}

.pm-qr-img {
  width: 140px;
  height: 140px;
  display: block;
}

.pm-qris-badge {
  margin-top: 8px;
  font-size: 9px;
  font-weight: 800;
  color: #D97706;
  background: #FEF3C7;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.pm-qris-hint {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #64748B;
}

/* EDC / Kartu */
.pm-edc-card-input-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-edc-field-label {
  font-size: 11px;
  font-weight: 700;
  color: #475569;
}

.pm-edc-input-wrapper {
  display: flex;
  align-items: center;
  border: 1.5px solid #E2E8F0;
  border-radius: 8px;
  background: #FFFFFF;
  padding: 0 10px;
}

.pm-edc-icon {
  color: #94A3B8;
  display: flex;
  align-items: center;
}

.pm-edc-input-control {
  flex: 1;
  padding: 10px 8px;
  border: none;
  outline: none;
  font-size: 13px;
  font-weight: 600;
}

.pm-edc-hint {
  font-size: 10.5px;
  color: #94A3B8;
}

/* Left Footer Button */
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
  padding: 14px 20px;
  font-size: 13.5px;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(217, 119, 6, 0.35);
}

.pm-btn-primary:hover:not(:disabled) {
  background: #B45309;
  transform: translateY(-1px);
}

.pm-btn-secondary {
  width: 100%;
  background: transparent;
  border: none;
  color: #64748B;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
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
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}

.pm-trip-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.pm-trip-label { color: #64748B; font-weight: 600; }
.pm-trip-val { color: #0F172A; font-weight: 700; }
.pm-trip-val.highlight { color: #D97706; }

.pm-promo-membership-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.pm-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.pm-box-title {
  font-size: 12px;
  font-weight: 800;
  color: #1E293B;
}

.pm-auto-tag {
  font-size: 10px;
  font-weight: 800;
  color: #059669;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid #A7F3D0;
}

.pm-member-active-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 10px;
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
  font-size: 9.5px;
  font-weight: 900;
  color: #065F46;
}

.pm-member-benefit {
  font-size: 9.5px;
  font-weight: 800;
  color: #059669;
  background: #DCFCE7;
  padding: 1px 5px;
  border-radius: 4px;
}

.pm-member-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #0F172A;
}

.pm-member-phone {
  font-size: 10.5px;
  color: #64748B;
}

.pm-btn-member-edit {
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.pm-member-manual-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.pm-input-label-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
}

.pm-link-promo {
  color: #D97706;
  font-weight: 800;
  cursor: pointer;
}

.pm-input-btn-group {
  display: flex;
  gap: 6px;
}

.pm-text-input {
  flex: 1;
  padding: 8px 10px;
  border: 1.5px solid #E2E8F0;
  border-radius: 6px;
  font-size: 12px;
  outline: none;
}

.pm-btn-action-sm {
  background: #1E293B;
  color: #FFFFFF;
  border: none;
  font-size: 11.5px;
  font-weight: 700;
  padding: 0 12px;
  border-radius: 6px;
  cursor: pointer;
}

/* Voucher picker */
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
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  padding: 9px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.pm-custom-dropdown-trigger.is-open {
  border-color: #D97706;
}

.pm-trigger-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748B;
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
  bottom: 100%;
  left: 0;
  right: 0;
  margin-bottom: 6px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  max-height: 180px;
  overflow-y: auto;
  z-index: 100;
}

.pm-dropdown-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-bottom: 1px solid #F1F5F9;
  cursor: pointer;
}

.pm-dropdown-option:hover {
  background: #FFFBEB;
}

.pm-opt-badge {
  font-size: 10px;
  font-weight: 900;
  color: #D97706;
  background: #FEF3C7;
  padding: 2px 6px;
  border-radius: 4px;
}

.pm-opt-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pm-opt-title { font-size: 11.5px; font-weight: 800; color: #0F172A; }
.pm-opt-desc { font-size: 10px; color: #64748B; }
.pm-opt-btn { font-size: 10.5px; font-weight: 800; color: #D97706; }

.pm-voucher-applied-pill {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  color: #92400E;
}

.pm-vap-code { font-weight: 900; margin-right: 4px; }
.pm-btn-voucher-remove { background: none; border: none; font-size: 14px; color: #92400E; cursor: pointer; }

/* Itemized Order List */
.pm-order-items-box {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 14px;
}

.pm-items-header {
  font-size: 12px;
  font-weight: 800;
  color: #1E293B;
  margin-bottom: 8px;
}

.pm-items-scroll {
  max-height: 110px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  padding-right: 4px;
}

.pm-order-item {
  border-bottom: 1px dashed #F1F5F9;
  padding-bottom: 6px;
}

.pm-item-row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  font-weight: 700;
  color: #1E293B;
}

.pm-item-qty-row {
  display: flex;
  gap: 4px;
  font-size: 11px;
  color: #64748B;
}

.pm-item-qty { font-weight: 800; color: #D97706; }

.pm-calc-breakdown {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid #F1F5F9;
  padding-top: 8px;
}

.pm-calc-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  color: #64748B;
}

.pm-calc-val { font-weight: 700; color: #0F172A; }

.pm-calc-row.discount.emerald { color: #059669; }
.pm-calc-row.discount.emerald .pm-calc-val { color: #059669; font-weight: 800; }
.pm-calc-row.discount.amber { color: #D97706; }
.pm-calc-row.discount.amber .pm-calc-val { color: #D97706; font-weight: 800; }
.pm-calc-row.discount.blue { color: #2563EB; }
.pm-calc-row.discount.blue .pm-calc-val { color: #2563EB; font-weight: 800; }

/* Grand Total Card */
.pm-total-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  padding: 14px 18px;
}

.pm-total-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #0F172A;
  display: block;
}

.pm-total-sub {
  font-size: 10px;
  color: #64748B;
}

.pm-total-value {
  font-size: 20px;
  font-weight: 900;
  color: #059669;
}

/* ============================================================
   TICKET / SUCCESS MODAL & PRINTABLE BOARDING PASS (SELF SERVICE EXACT)
   ============================================================ */
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
}

.ticket-modal-top-header {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #FFFFFF;
  margin-bottom: 20px;
  text-align: left;
}

.tmt-check-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #059669;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(5, 150, 105, 0.5);
  flex-shrink: 0;
}

.tmt-title {
  margin: 0;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.tmt-subtitle {
  margin: 2px 0 0 0;
  font-size: 12.5px;
  color: #E2E8F0;
  font-weight: 500;
}

/* Boarding Pass Ticket Card */
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

/* 4-Box Grid */
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

/* Perforation */
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
  background: rgba(15, 23, 42, 0.85);
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
  background: rgba(15, 23, 42, 0.85);
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

@media print {
  .no-print {
    display: none !important;
  }
}

.cart-footer-summary { margin-top: auto; padding-top: 20px; border-top: 1px solid #E5E7EB; }
.summary-row.grand-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; background: #F9FAFB; padding: 16px 20px; border-radius: 12px; border: 1px solid #E5E7EB; }
.summary-row.grand-total span:first-child { font-size: 13px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; }
.summary-row.grand-total .total-price { font-size: 22px; font-weight: 900; color: #1F2937; }
.btn-checkout-premium { width: 100%; background: #2C1A13; color: #fff; border: none; padding: 18px; font-size: 15px; font-weight: 800; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(44,26,19,0.1); }
.btn-checkout-premium:hover:not(:disabled) { background: #3d241a; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(44,26,19,0.2); }
.btn-checkout-premium:disabled { background: #E5E7EB; color: #9CA3AF; cursor: not-allowed; box-shadow: none; }
</style>
