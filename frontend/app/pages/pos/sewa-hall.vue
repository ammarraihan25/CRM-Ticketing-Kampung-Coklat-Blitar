<script setup lang="ts">
import { useCrmNonMember } from '~/composables/useCrmNonMember'
const { addVisitor } = useCrmNonMember()

import { ref, computed } from 'vue'

definePageMeta({
  layout: 'pos'
})

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

const { ticketRates } = useConfigSync()

const defaultHallTickets = [
  { id: 'bale-coklat', name: 'Bale Coklat', badge: 'SEMI-OUTDOOR', capacity: '100 - 250 Orang', highlights: ['Area Terbuka Rindang', 'Sound Standard & Kursi', 'Dekat Spot Restoran'], price: 500000, desc: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas atau acara santai.', image: bale_coklat },
  { id: 'coklat-caffe', name: 'Coklat Caffe', badge: 'CAFE LOUNGE', capacity: '30 - 80 Orang', highlights: ['Nuansa Alam Asri', 'Meja & Kursi Cafe', 'Dekat Outlet Minuman'], price: 300000, desc: 'Kafe bernuansa alam untuk acara santai atau kumpul komunitas kecil.', image: coklat_caffe },
  { id: 'coklat-garden', name: 'Coklat Garden', badge: 'OUTDOOR PARK', capacity: '50 - 150 Orang', highlights: ['Taman Hijau Terbuka', 'Suasana Segar Asri', 'Spot Foto Estetik'], price: 400000, desc: 'Area taman terbuka yang hijau, ideal untuk pesta kebun atau gathering outdoor.', image: coklat_garden },
  { id: 'joglo-jatimarto', name: 'Joglo Jatimarto', badge: 'TRADISIONAL JAWA', capacity: '150 - 400 Orang', highlights: ['Arsitektur Kayu Klasik', 'Panggung & Sound System', 'Ruang Transit VIP'], price: 750000, desc: 'Pendopo tradisional bernuansa klasik Jawa untuk acara keluarga atau pertemuan resmi.', image: joglo_jatimarto },
  { id: 'kampung-coklat-hall', name: 'Kampung Coklat Hall', badge: 'MAIN GRAND BALLROOM', capacity: '500 - 1500 Orang', highlights: ['Full AC & Megah', 'Panggung Utama & LED', 'Ruang Rias & Sound Pro'], price: 1500000, desc: 'Ruangan indoor eksklusif untuk acara besar pernikahan, wisuda, atau seminar perusahaan.', image: kampung_coklat_hall },
  { id: 'pbk', name: 'Private Business Room (PBR)', badge: 'VIP EXECUTIVE', capacity: '15 - 30 Orang', highlights: ['Full AC & Soundproof', 'Smart TV / Proyektor', 'Coffee Break Setup'], price: 1000000, desc: 'Ruang pertemuan VIP eksklusif untuk rapat direksi, bisnis dan negosiasi privasi tinggi.', image: pbk },
  { id: 'ruang-pertemuan', name: 'Ruang Pertemuan R1', badge: 'MEETING ROOM', capacity: '40 - 100 Orang', highlights: ['Full AC & Proyektor', 'Whiteboard & Sound System', 'Layout Fleksibel'], price: 500000, desc: 'Ruang rapat skala menengah dengan fasilitas meeting lengkap dan nyaman.', image: ruang_pertemuan },
  { id: 'taman-edel', name: 'Taman Edel', badge: 'GARDEN VENUE', capacity: '50 - 120 Orang', highlights: ['Taman Penuh Bunga', 'Peneduh Alami', 'Cocok Foto Prewedding'], price: 350000, desc: 'Taman eksotis dengan pepohonan rindang untuk acara santai bersama keluarga.', image: taman_edel },
  { id: 'theobromine-hall', name: 'Theobromine Hall', badge: 'BALLROOM INDOOR', capacity: '300 - 800 Orang', highlights: ['Full AC Berpendingin', 'Sound System Canggih', 'Dekat Parkir VIP'], price: 1200000, desc: 'Hall megah dengan arsitektur menawan untuk perayaan atau konferensi.', image: theobromine_hall },
  { id: 'trinitario-hall', name: 'Trinitario Hall', badge: 'PREMIUM CONVENTION', capacity: '800 - 2000 Orang', highlights: ['Hall Terbesar & Termewah', 'Panggung Konser & Lighting', 'Akses Pintu Ganda'], price: 2000000, desc: 'Hall paling luas dan premium dengan dekorasi mewah untuk resepsi akbar.', image: trinitario_hall },
  { id: 'wisma-criollo', name: 'Wisma Criollo', badge: 'VIP MANSION', capacity: '100 - 300 Orang', highlights: ['Desain Elegan Klasik', 'Ruang Tunggu Eksklusif', 'Full AC & Catering Ready'], price: 850000, desc: 'Gedung pertemuan eksklusif bernuansa elegan untuk acara VIP atau korporat.', image: wisma_criollo }
]

const searchQuery = ref('')

const rawHallTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'venue' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const match = defaultHallTickets.find(d => d.name.toLowerCase() === t.name.toLowerCase())
      return {
        id: t.id,
        name: t.name,
        badge: match?.badge || 'SEWA VENUE',
        capacity: match?.capacity || '50 - 500 Orang',
        highlights: match?.highlights || ['Fasilitas Acara Lengkap', 'Sound System & Kursi'],
        price: t.price,
        desc: t.description || match?.desc || 'Fasilitas sewa tempat / hall di Kampung Coklat.',
        image: t.imageUrl || match?.image || bale_coklat
      }
    })
  }
  return defaultHallTickets
})

const hallTickets = computed(() => {
  return rawHallTickets.value.filter(item => {
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const bookingData = ref({
  namaPemesan: '',
  instansi: '',
  telepon: '',
  tanggal: new Date().toISOString().split('T')[0],
  jamMulai: '08:00',
  jamSelesai: '12:00',
  isMember: false,
  memberId: ''
})

const cart = ref<any[]>([])

const paymentMethod = ref('cash')
const cashReceived = ref(0)
const showPaymentModal = ref(false)
const showSuccessModal = ref(false)

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
      if (member.data.nama) bookingData.value.namaPemesan = member.data.nama
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

const addToCart = (product: any) => {
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

const grandTotal = computed(() => {
  return subtotal.value
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
  if (!bookingData.value.namaPemesan || !bookingData.value.telepon || !bookingData.value.tanggal) {
    alert('Nama Pemesan, Nomor Telepon, dan Tanggal wajib diisi sebelum checkout!');
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
   showPaymentModal.value = false
   showSuccessModal.value = true
}

const finishTransaction = () => {
   cart.value = []
   bookingData.value = { namaPemesan: '', instansi: '', telepon: '', tanggal: new Date().toISOString().split('T')[0], jamMulai: '08:00', jamSelesai: '12:00' }
   cashReceived.value = 0
   showSuccessModal.value = false
}
</script>

<template>
  <div class="pos-wrapper">
    <!-- LEFT PANE: Form -->
    <div class="pos-form-pane">
      <h2 class="pane-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Data Penyewaan
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

        <!-- Nama Pemesan / PIC -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Nama Pemesan / PIC</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="text" v-model="bookingData.namaPemesan" placeholder="Nama Lengkap" class="pos-form-input" />
        </div>

        <!-- Instansi / Perusahaan -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Instansi / Perusahaan</span>
            <span class="pos-label-optional">(Opsional)</span>
          </label>
          <input type="text" v-model="bookingData.instansi" placeholder="PT. ABC / Komunitas..." class="pos-form-input" />
        </div>

        <!-- No WhatsApp -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>No. WhatsApp</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="tel" v-model="bookingData.telepon" placeholder="0812..." class="pos-form-input" />
        </div>

        <!-- Tanggal Acara -->
        <div class="pos-form-group">
          <label class="pos-form-label">
            <span>Tanggal Acara</span>
            <span class="pos-label-req">*</span>
          </label>
          <input type="date" v-model="bookingData.tanggal" class="pos-form-input" />
        </div>

        <!-- Jam Acara -->
        <div style="display: flex; gap: 10px;">
          <div class="pos-form-group" style="flex: 1; min-width: 0;">
            <label class="pos-form-label">
              <span>Mulai</span>
              <span class="pos-label-req">*</span>
            </label>
            <input type="time" v-model="bookingData.jamMulai" class="pos-form-input" />
          </div>
          <div class="pos-form-group" style="flex: 1; min-width: 0;">
            <label class="pos-form-label">
              <span>Selesai</span>
              <span class="pos-label-req">*</span>
            </label>
            <input type="time" v-model="bookingData.jamSelesai" class="pos-form-input" />
          </div>
        </div>
      </div>
    </div>

    <!-- MIDDLE PANE: Catalog -->
    <div class="pos-catalog-pane">
      <div class="step-2-products" style="display: flex; flex-direction: column; flex: 1; min-height: 0; height: 100%;">

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 class="pane-title" style="margin-bottom: 0; border-bottom: none; padding-bottom: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2c1a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Pilih Ruangan / Hall
            </h2>
            <span style="font-size: 12px; font-weight: 700; color: #64748B; background: #F1F5F9; padding: 4px 10px; border-radius: 20px;">
              {{ hallTickets.length }} Venue
            </span>
          </div>

          <!-- Quick Search -->
          <div style="position: relative;">
            <svg style="position: absolute; left: 12px; top: 11px; color: #94A3B8;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari nama gedung / kapasitas..." 
              style="width: 100%; padding: 8px 12px 8px 36px; border: 1.5px solid #E2E8F0; border-radius: 8px; font-size: 13px; outline: none; background: #F8FAFC;"
            />
          </div>
        </div>
          
        <div class="product-list-wrapper" style="overflow-y: auto; flex: 1; min-height: 0; padding-bottom: 20px; padding-right: 6px;">
          <div class="pos-products-stack">
            <div class="pos-card-full" v-for="product in hallTickets" :key="product.id">
              <div class="pos-thumb-wrap">
                <img :src="product.image" :alt="product.name" class="pos-thumb-img" />
              </div>
              
              <div class="pos-content-wrap">
                <div class="pos-header-block">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <h4 class="pos-item-title">{{ product.name }}</h4>
                    <span v-if="product.badge" class="pos-badge-tag">{{ product.badge }}</span>
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

                <!-- Action Bar -->
                <div class="pos-bottom-row">
                  <div class="pos-price-tag">
                    <span class="pos-curr">Rp</span>
                    <span class="pos-val">{{ product.price.toLocaleString('id-ID') }}</span>
                  </div>

                  <button class="pos-btn-tambah" @click="addToCart(product)">
                    <span class="pos-btn-plus">+</span>
                    <span>Tambah</span>
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

    <!-- Modals -->
    <!-- Payment Modal (2-Column Layout) -->
    <!-- Payment Modal (2-Column Layout) -->
    <!-- Payment Modal (2-Column Layout) -->
    <!-- Payment Modal (2-Column Layout) -->
    <!-- Payment Modal (2-Column Layout) -->
    <!-- Payment Modal (2-Column Layout) -->
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
              <!-- TUNAI -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'cash'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Tunai (Cash)</span>
                    <span class="pm-method-desc">Bayar langsung dengan uang tunai di kasir</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="cash" name="paymethod" class="pm-radio-custom" />
                </div>
                <div class="pm-method-body" v-if="paymentMethod === 'cash'">
                  <div class="pm-input-group">
                    <label>Nominal Diterima (Rp)</label>
                    <input type="number" v-model="cashReceived" class="pm-input" placeholder="0" />
                  </div>
                  <div class="pm-change-info" v-if="changeAmount > 0">
                    Kembalian: <strong>Rp {{ changeAmount.toLocaleString('id-ID') }}</strong>
                  </div>
                </div>
              </label>

              <!-- TRANSFER -->
              <label class="pm-method-card" :class="{'active': paymentMethod === 'transfer'}">
                <div class="pm-method-header">
                  <div class="pm-method-info">
                    <span class="pm-method-title">Transfer Bank / Virtual Account</span>
                    <span class="pm-method-desc">Verifikasi otomatis melalui mutasi</span>
                  </div>
                  <input type="radio" v-model="paymentMethod" value="transfer" name="paymethod" class="pm-radio-custom" />
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
                  <span class="pm-total-value">Rp {{ grandTotal.toLocaleString('id-ID') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Ticket/Success Modal -->
    <div class="modal-overlay" v-if="showSuccessModal">
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
          <button type="button" class="pm-btn-primary" @click="finishTransaction" style="margin-top: 0; flex: 1;">SELESAI</button>
        </div>

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
  letter-spacing: 0.4px;
  text-transform: uppercase;
  border: 1px solid #E2E8F0;
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
  gap: 3px;
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
.pos-btn-tambah:hover {
  background: #F59E0B;
  color: #ffffff;
  border-color: #F59E0B;
  box-shadow: 0 3px 10px rgba(245, 158, 11, 0.25);
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
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-card { background: #fff; border-radius: 12px; width: 500px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.modal-header { background: #2c1a13; color: #fff; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
.modal-header h2 { margin: 0; font-size: 18px; }
.close-btn { background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; }
.modal-body { padding: 20px; }
.pay-amount-display { text-align: center; font-size: 16px; font-weight: 600; color: #555; background: #fdfbf7; padding: 20px; border-radius: 8px; border: 1px solid #f5dfc6; margin-bottom: 20px; }
.pay-amount-display strong { font-size: 28px; display: block; margin-top: 10px; }
.payment-tabs { display: flex; gap: 10px; margin-bottom: 20px; }
.payment-tabs button { flex: 1; padding: 12px; font-weight: bold; border-radius: 6px; border: 1px solid #ccc; background: #eee; cursor: pointer; color: #555; }
.payment-tabs button.active { background: #2c1a13; color: #f29727; border-color: #2c1a13; }
.cash-section label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; }
.cash-input-row { display: flex; gap: 10px; margin-bottom: 10px; }
.large-input { flex: 1; padding: 15px; font-size: 20px; font-weight: bold; border-radius: 8px; border: 2px solid #f29727; }
.btn-exact { background: #e8f5e9; color: #2e7d32; border: 1px solid #81c784; font-weight: bold; padding: 0 20px; border-radius: 8px; cursor: pointer; }
.quick-cash-btns { display: flex; gap: 8px; margin-bottom: 20px; }
.quick-cash-btns button { flex: 1; padding: 10px 0; background: #fafafa; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; font-weight: 600; }
.change-display { text-align: center; padding: 15px; font-size: 18px; background: #eee; border-radius: 8px; color: #888; }
.change-display.has-change { background: #e8f5e9; color: #2e7d32; font-size: 22px; }
.transfer-section { text-align: center; }
.qr-placeholder { width: 200px; height: 200px; background-image: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 20px 20px; background-position: center; margin: 0 auto 20px auto; border: 5px solid #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-weight: bold; background-color: #fff; color: #fff;}
.modal-footer { padding: 20px; background: #fdfbf7; border-top: 1px solid #eee; }

.member-check-box { background: #fffdf5; border: 1px solid #fce4ce; padding: 15px; border-radius: 10px; margin-bottom: 20px; box-sizing: border-box; width: 100%; }
.member-checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; color: #2c1a13; font-size: 14px; }
.member-checkbox-label input { width: 18px; height: 18px; accent-color: #f29727; cursor: pointer; }
.member-input-area { margin-top: 15px; padding-top: 15px; border-top: 1px dashed #fce4ce; }
.member-input-row { display: flex; gap: 10px; margin-bottom: 10px; align-items: stretch; width: 100%; box-sizing: border-box; }
.member-input { flex: 1; min-width: 0; padding: 10px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box; }
.member-input:focus { border-color: #f29727; }
.btn-cek-id { background: #2c1a13; color: #fff; border: none; padding: 0 20px; font-weight: bold; border-radius: 8px; cursor: pointer; font-size: 13px; white-space: nowrap; display: flex; align-items: center; justify-content: center; }
.btn-cek-id:hover { background: #3d241a; }
.member-status { font-size: 13px; font-weight: 700; display: flex; align-items: center; }
.member-status.success { color: #2e7d32; }
.member-status.error { color: #d32f2f; }

/* Payment Modal Redesign */
.payment-modal-container { background: #f7f9fa; width: 1000px; max-width: 95vw; height: 90vh; max-height: 800px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: modalFadeIn 0.3s ease; }
@keyframes modalFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.pm-layout { display: flex; flex: 1; overflow: hidden; }
.pm-left { flex: 3; padding: 30px; overflow-y: auto; background: #f7f9fa; }
.pm-right { flex: 2; padding: 30px; background: #f0f2f5; border-left: 1px solid #e5e7eb; overflow-y: auto; }
.pm-back-btn { background: transparent; border: none; font-size: 16px; font-weight: 600; color: #555; display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 20px; padding: 0; }
.pm-back-btn:hover { color: #f29727; }
.pm-card { background: #fff; border-radius: 12px; border: 1px solid #eef0f2; box-shadow: 0 4px 15px rgba(0,0,0,0.03); padding: 25px; margin-bottom: 20px; }
.pm-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.pm-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.pm-icon.bg-green { background: #27ae60; }
.pm-card-header h3 { margin: 0; font-size: 18px; font-weight: 800; color: #2c1a13; }
.pm-total-row { display: flex; justify-content: space-between; align-items: center; background: #fdfdfd; padding: 15px; border-radius: 8px; border: 1px dashed #ccc; }
.pm-total-row span { font-weight: 600; color: #555; }
.pm-grand-total { font-size: 24px; color: #27ae60; font-weight: 900; }
.pm-methods-list { display: flex; flex-direction: column; gap: 15px; }
.pm-method-group { border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa; overflow: hidden; }
.pm-method-label { display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; cursor: pointer; background: #fff; transition: background 0.2s; }
.pm-method-label:hover { background: #fdfdfd; }
.pm-method-text { display: flex; flex-direction: column; gap: 4px; }
.pm-method-title { font-weight: 700; color: #333; font-size: 15px; }
.pm-method-desc { font-size: 12px; color: #888; }
.pm-radio { width: 20px; height: 20px; accent-color: #f29727; }
.pm-method-detail { padding: 20px; background: #fafafa; border-top: 1px solid #e5e7eb; }
.pm-input-text { width: 100%; padding: 12px 15px; font-size: 16px; border: 1.5px solid #ddd; border-radius: 8px; outline: none; font-weight: 600; background: #fff; margin-top: 8px; box-sizing: border-box; }
.pm-input-text:focus { border-color: #f29727; }
.pm-change-info { margin-top: 15px; padding: 12px; background: #e8f5e9; color: #2e7d32; border-radius: 8px; font-size: 16px; border: 1px solid #a5d6a7; display: flex; justify-content: space-between; }
.pm-bank-list { display: flex; flex-direction: column; gap: 10px; }
.pm-bank-option { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; }
.pm-bank-option:hover { border-color: #f29727; }
.bank-logo { font-size: 11px; font-weight: 900; color: #fff; padding: 4px 8px; border-radius: 4px; font-style: italic; }
.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }
.pm-qris-box { text-align: center; background: #fff; padding: 20px; border-radius: 8px; border: 1px dashed #ccc; }
.pm-qr-placeholder { width: 150px; height: 150px; margin: 0 auto 15px auto; background: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 20px 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border: 5px solid #eee; }
.pm-btn-bayar { width: 100%; background: #f29727; color: #fff; font-size: 18px; font-weight: 900; padding: 18px; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-top: 20px; box-shadow: 0 4px 15px rgba(242,151,39,0.3); }
.pm-btn-bayar:hover { background: #e08920; transform: translateY(-2px); }
.pm-order-list { flex: 1; overflow-y: auto; margin-bottom: 20px; padding-right: 5px; }
.pm-order-item { border-bottom: 1px dashed #e5e7eb; padding-bottom: 12px; margin-bottom: 12px; }
.pm-item-header { display: flex; justify-content: space-between; font-weight: 700; color: #333; margin-bottom: 5px; }
.pm-item-meta { font-size: 13px; color: #777; }
.pm-item-qty { font-weight: 800; color: #555; }
.pm-order-discount { display: flex; justify-content: space-between; padding: 10px; background: #fff3e0; color: #e65100; font-weight: bold; font-size: 14px; border-radius: 8px; margin-bottom: 15px; }
.pm-order-grandtotal { display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #2c1a13; font-size: 18px; font-weight: 900; color: #2c1a13; }

/* Aesthetic Payment Modal Redesign */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px); }
.payment-modal-container { background: transparent; width: 1050px; max-width: 95vw; height: 90vh; max-height: 750px; display: flex; animation: modalFadeIn 0.3s ease; }
@keyframes modalFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.pm-layout { display: flex; flex: 1; gap: 20px; overflow: hidden; }
.pm-left-panel, .pm-right-panel { background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); display: flex; flex-direction: column; overflow-y: auto; }
.pm-left-panel { flex: 6; }
.pm-right-panel { flex: 4; }

.pm-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
.pm-icon-circle { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.pm-icon-circle.bg-green { background: #27ae60; }
.pm-section-header h2 { margin: 0; font-size: 20px; font-weight: 800; color: #4a2c1d; }

.pm-methods-container { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.pm-method-card { display: block; border: 1px solid #eaeaea; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; background: #fff; }
.pm-method-card:hover { border-color: #d1d5db; }
.pm-method-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; }
.pm-method-info { display: flex; flex-direction: column; gap: 4px; }
.pm-method-title { font-weight: 700; color: #2c1a13; font-size: 15px; }
.pm-method-desc { font-size: 12px; color: #888; }
.pm-radio-custom { appearance: none; width: 20px; height: 20px; border: 2px solid #ccc; border-radius: 50%; outline: none; cursor: pointer; position: relative; }
.pm-radio-custom:checked { border-color: #f59e0b; }
.pm-radio-custom:checked::after { content: ''; position: absolute; top: 3px; left: 3px; width: 10px; height: 10px; background: #f59e0b; border-radius: 50%; }

.pm-method-body { padding: 0 20px 20px 20px; border-top: 1px dashed #eee; margin-top: 5px; padding-top: 15px; }
.pm-input-group label { display: block; font-size: 13px; color: #555; font-weight: 600; margin-bottom: 8px; }
.pm-input { width: 100%; padding: 12px 15px; font-size: 16px; font-weight: bold; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; transition: border 0.2s; box-sizing: border-box; }
.pm-input:focus { border-color: #f59e0b; }
.pm-change-info { margin-top: 15px; font-size: 15px; color: #2e7d32; background: #e8f5e9; padding: 12px; border-radius: 8px; border: 1px solid #c8e6c9; }

.pm-bank-list { display: flex; flex-direction: column; gap: 8px; }
.pm-bank-option { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #eaeaea; border-radius: 8px; cursor: pointer; }
.pm-bank-name { display: flex; align-items: center; gap: 12px; font-weight: 600; color: #333; }
.bank-logo { font-size: 10px; font-weight: 900; color: #fff; padding: 3px 6px; border-radius: 4px; font-style: italic; }
.bank-logo.bca { background: #0066AE; }
.bank-logo.mandiri { background: #003D79; }
.bank-logo.bni { background: #F15A23; }
.bank-logo.bri { background: #00529C; }

.pm-qris-box { text-align: center; color: #555; }
.pm-qr-placeholder { width: 120px; height: 120px; margin: 0 auto 10px auto; background: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 16px 16px; border: 4px solid #eaeaea; display: flex; align-items: center; justify-content: center; }

.pm-btn-primary { width: 100%; background: #f59e0b; color: #fff; font-size: 16px; font-weight: 800; padding: 16px; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.5px; }
.pm-btn-primary:hover { background: #d97706; }
.pm-btn-secondary { width: 100%; background: transparent; color: #888; font-size: 14px; font-weight: 600; padding: 12px; border: none; cursor: pointer; margin-top: 5px; }
.pm-btn-secondary:hover { color: #333; }

/* Order Summary */
.pm-order-items { flex: 1; display: flex; flex-direction: column; gap: 15px; }
.pm-order-item { border-bottom: 1px dashed #e5e7eb; padding-bottom: 15px; }
.pm-order-item:last-child { border-bottom: none; }
.pm-item-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
.pm-item-name { font-weight: 700; color: #2c1a13; font-size: 14px; }
.pm-item-price { font-weight: 700; color: #2c1a13; font-size: 14px; }
.pm-item-qty-row { font-size: 13px; color: #7f8c8d; }
.pm-item-qty { font-weight: 800; color: #555; }
.pm-discount-item .text-orange { color: #e65100; }

.pm-order-footer { margin-top: auto; padding-top: 20px; }
.pm-total-line { height: 2px; background: #2c1a13; margin-bottom: 15px; }
.pm-total-row { display: flex; justify-content: space-between; align-items: center; }
.pm-total-label { font-size: 18px; font-weight: 800; color: #2c1a13; }
.pm-total-value { font-size: 20px; font-weight: 900; color: #2c1a13; }

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
  body * { visibility: hidden !important; }
  .ticket-modal-container, .ticket-modal-container * { visibility: visible !important; }
  .ticket-modal-container { position: absolute; left: 0; top: 0; margin: 0; padding: 20px; border: none; box-shadow: none; width: 100%; height: auto; background: #fff; }
  .ticket-footer { display: none !important; }
  .pm-layout, .payment-modal-container { display: none !important; }
  .ticket-divider { border-top: 2px dashed #000; }
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
  body * { visibility: hidden !important; }
  .ticket-modal-container, .ticket-modal-container * { visibility: visible !important; }
  .ticket-modal-container { position: absolute; left: 0; top: 0; margin: 0; padding: 20px; border: none; box-shadow: none; width: 100%; height: auto; background: #fff; }
  .ticket-footer { display: none !important; }
  .pm-layout, .payment-modal-container { display: none !important; }
  .ticket-divider { border-top: 2px dashed #000; }
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
</style>


