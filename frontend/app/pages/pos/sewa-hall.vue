<script setup lang="ts">
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

const hallTickets = [
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
const checkMemberId = () => {
  if (bookingData.value.memberId === 'KC-12345') {
    memberStatus.value = 'valid'
  } else {
    memberStatus.value = 'invalid'
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
      <div class="form-section-box" style="margin-bottom: 0;">
        <!-- Member Check -->
        <div class="member-check-box">
          <label class="member-checkbox-label">
            <input type="checkbox" v-model="bookingData.isMember" @change="memberStatus = 'idle'" />
            <strong>Saya adalah Member Kampung Coklat</strong>
          </label>
          <div v-if="bookingData.isMember" class="member-input-area">
            <label style="font-size: 11px; font-weight: 800; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Masukkan ID Member</label>
            <div class="member-input-row">
              <input type="text" v-model="bookingData.memberId" placeholder="Contoh: KC-12345" class="member-input" />
              <button class="btn-cek-id" @click="checkMemberId">Cek ID</button>
            </div>
            <div v-if="memberStatus === 'valid'" class="member-status success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Member terdaftar
            </div>
            <div v-if="memberStatus === 'invalid'" class="member-status error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              Member tidak ditemukan
            </div>
          </div>
        </div>

        <div class="booking-form-grid-1">
          <div class="form-group">
            <label>Nama Pemesan / PIC <span class="req">*</span></label>
            <input type="text" v-model="bookingData.namaPemesan" placeholder="Nama Lengkap" />
          </div>
          <div class="form-group">
            <label>Instansi / Perusahaan</label>
            <input type="text" v-model="bookingData.instansi" placeholder="Opsional (PT. ABC)" />
          </div>
          <div class="form-group">
            <label>No. WhatsApp <span class="req">*</span></label>
            <input type="tel" v-model="bookingData.telepon" placeholder="0812..." />
          </div>
          <div class="form-group">
            <label>Tanggal Acara <span class="req">*</span></label>
            <input type="date" v-model="bookingData.tanggal" />
          </div>
          <div style="display: flex; gap: 10px;">
            <div class="form-group" style="flex: 1; min-width: 0;">
              <label>Jam Mulai <span class="req">*</span></label>
              <input type="time" v-model="bookingData.jamMulai" style="width: 100%;" />
            </div>
            <div class="form-group" style="flex: 1; min-width: 0;">
              <label>Jam Selesai <span class="req">*</span></label>
              <input type="time" v-model="bookingData.jamSelesai" style="width: 100%;" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MIDDLE PANE: Catalog -->
    <div class="pos-catalog-pane">
      <div class="step-2-products" style="display: flex; flex-direction: column; flex: 1; min-height: 0; height: 100%;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #2c1a13; margin: 0;">Pilih Ruangan / Hall</h1>
        </div>
          
          <div class="product-list-wrapper" style="overflow-y: auto; flex: 1; min-height: 0; padding-bottom: 20px; padding-right: 10px;">
            <div class="product-list" style="display: flex; flex-direction: column; gap: 15px;">
              <div class="elegant-card" v-for="product in hallTickets" :key="product.id">
                <div class="card-image-wrapper">
                  <img :src="product.image" :alt="product.name" class="card-image" />
                </div>
                <div class="card-content">
                  <div class="card-price-label"><span>{{ product.label }}</span></div>
                  <h3 class="card-title">{{ product.name }}</h3>
                  <div class="card-divider"></div>
                  <div class="card-desc">{{ product.desc }}</div>
                  <div class="card-footer">
                    <div class="card-price">
                      <span class="price-currency">Rp</span> {{ product.price.toLocaleString('id-ID') }}
                    </div>
                    <button class="btn-outline-primary" @click="addToCart(product)">+ Tambahkan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Pane: Cart -->
      <div class="pos-cart-pane" style="background: #ffffff; border-left: 1px solid #f0f0f0;">
        <div style="padding: 30px; display: flex; flex-direction: column; height: 100%;">
          <h1 style="font-size: 32px; font-weight: 800; color: #2c1a13; margin: 0 0 30px 0;">Keranjang</h1>
          <div style="flex: 1; overflow-y: auto; padding-right: 10px;">
            <div v-if="cart.length === 0" style="color: #aaa; font-size: 14px; text-align: center; padding: 40px 0;">Belum ada pesanan.</div>
            <div v-for="item in cart" :key="item.id" class="cart-item-row">
              <div class="cart-item-details">
                <div class="cart-item-name">{{ item.name }}</div>
                <div class="cart-item-price">Rp {{ item.price.toLocaleString('id-ID') }}</div>
              </div>
              <div class="cart-item-qty-control">
                <button @click="decreaseItem(item)">-</button>
                <span>{{ item.qty }}</span>
                <button @click="increaseItem(item)">+</button>
              </div>
              <div class="cart-item-subtotal">Rp {{ (item.price * item.qty).toLocaleString('id-ID') }}</div>
            </div>
          </div>
          <div style="border-bottom: 1px dotted #dcdcdc; margin: 20px 0;"></div>
          <h3 style="text-align: right; font-size: 22px; font-weight: 800; color: #2c1a13; margin: 0 0 20px 0;">
            Total: Rp {{ grandTotal.toLocaleString('id-ID') }}
          </h3>
          <button @click="processCheckout" :disabled="cart.length === 0" style="background: #27ae60; color: #ffffff; border: none; padding: 16px; font-size: 16px; font-weight: bold; border-radius: 6px; width: 100%; cursor: pointer; transition: background 0.2s;">
            Checkout
          </button>
        </div>
      </div>

    <!-- Modals -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="modal-card payment-modal">
        <div class="modal-header">
          <h2>Pembayaran Sewa Hall</h2>
          <button class="close-btn" @click="showPaymentModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="pay-amount-display">
            TOTAL TAGIHAN: <br/> 
            <strong style="color: #f29727;">Rp {{ grandTotal.toLocaleString('id-ID') }}</strong>
          </div>
          <div class="payment-tabs">
            <button :class="{active: paymentMethod === 'cash'}" @click="paymentMethod = 'cash'">TUNAI (CASH)</button>
            <button :class="{active: paymentMethod === 'transfer'}" @click="paymentMethod = 'transfer'">TRANSFER / QRIS</button>
          </div>
          <div v-if="paymentMethod === 'cash'" class="cash-section">
            <label>Nominal Diterima (Rp)</label>
            <div class="cash-input-row">
              <input type="number" v-model="cashReceived" class="large-input" />
              <button class="btn-exact" @click="setCashExact">UANG PAS</button>
            </div>
            <div class="quick-cash-btns">
              <button @click="addCash(50000)">+50k</button>
              <button @click="addCash(100000)">+100k</button>
              <button @click="addCash(500000)">+500k</button>
            </div>
            <div class="change-display" :class="{'has-change': changeAmount > 0}">
              KEMBALIAN: <strong>Rp {{ changeAmount.toLocaleString('id-ID') }}</strong>
            </div>
          </div>
          <div v-if="paymentMethod === 'transfer'" class="transfer-section">
             <div class="qris-box">
                <div class="qr-placeholder">( QRIS CODE )</div>
                <p>Transfer Bank:<br/><strong>BCA 1234567890</strong> a.n Kampung Coklat</p>
             </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-checkout" @click="processPayment">BAYAR & CETAK STRUK</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" v-if="showSuccessModal">
      <div class="modal-card success-modal">
        <div class="success-icon" style="font-size: 60px; text-align: center; margin-top: 20px;">✅</div>
        <h2 style="text-align: center; margin-bottom: 20px;">Transaksi Berhasil!</h2>
        <button class="btn-checkout" @click="finishTransaction">Transaksi Baru</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pos-wrapper { display: flex; height: calc(100vh - 60px); background-color: #f0f2f5; font-family: 'Inter', sans-serif; overflow: hidden; }
.pos-form-pane { width: 360px; min-width: 360px; background: #f8f9fa; padding: 25px; overflow-y: auto; border-right: 1px solid #e5e7eb; box-shadow: 2px 0 10px rgba(0,0,0,0.02); display: flex; flex-direction: column; z-index: 5; }
.pos-catalog-pane { flex: 1; display: flex; flex-direction: column; padding: 30px; overflow: hidden; background: transparent; }
.pos-cart-pane { width: 360px; min-width: 360px; background: #ffffff; border-left: 1px solid #e5e7eb; box-shadow: -4px 0 15px rgba(0,0,0,0.04); display: flex; flex-direction: column; z-index: 5; }
.pane-title { font-size: 18px; font-weight: 800; color: #2c1a13; margin: 0 0 25px 0; display: flex; align-items: center; gap: 8px; }
.form-section-box { background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.02); margin-bottom: 20px; }
.section-title { font-size: 13px; font-weight: 800; color: #2c1a13; text-transform: uppercase; margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; }
.booking-form-grid-1 { display: flex; flex-direction: column; gap: 20px; }
.booking-form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { display: block; font-size: 11px; font-weight: 800; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0; }
.form-group label .req { color: #e74c3c; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 14px 16px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 14px; background: #f9fafb; outline: none; transition: all 0.2s ease; color: #111827; font-weight: 500; }
.form-group input::placeholder, .form-group textarea::placeholder { color: #9ca3af; font-weight: 400; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #f29727; background: #ffffff; box-shadow: 0 0 0 4px rgba(242, 151, 39, 0.15); }
.btn-primary-full { width: 100%; background: #2c1a13; color: #fff; padding: 16px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary-full:hover { background: #3d241a; }
.product-list-wrapper { overflow-y: auto; padding-bottom: 20px; }
.elegant-card { display: flex; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f0f0f0; padding: 12px; gap: 15px; }
.elegant-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(44,26,19,0.1); border-color: #fce4ce; }
.card-image-wrapper { width: 180px; height: 120px; border-radius: 8px; overflow: hidden; position: relative; flex-shrink: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.elegant-card:hover .card-image { transform: scale(1.05); }
.card-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.card-price-label { color: #4a2c1d; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
.card-title { font-size: 18px; color: #2c1a13; font-weight: bold; font-family: 'Georgia', serif; margin: 0; }
.card-divider { height: 2px; width: 40px; background-color: #e0e0e0; margin: 8px 0; }
.card-desc { color: #666; font-size: 13px; line-height: 1.4; margin: 0 0 12px 0; }
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.card-price { font-size: 18px; font-weight: bold; color: #2c1a13; }
.price-currency { font-size: 15px; color: #888; }
.btn-outline-primary { background: transparent; border: 1px solid #2c1a13; color: #2c1a13; padding: 8px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
.btn-outline-primary:hover { background: #2c1a13; color: #fff; }
.cart-item-row { display: flex; align-items: center; gap: 15px; background: #fdfdfd; border: 1px solid #f0f0f0; padding: 15px; border-radius: 8px; margin-bottom: 10px; }
.cart-item-details { flex: 1; }
.cart-item-name { font-weight: 700; color: #333; margin-bottom: 4px; }
.cart-item-price { font-size: 13px; color: #888; }
.cart-item-qty-control { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; }
.cart-item-qty-control button { background: #f8f9fa; border: none; width: 30px; height: 30px; cursor: pointer; font-weight: bold; color: #555; }
.cart-item-qty-control button:hover { background: #e9ecef; }
.cart-item-qty-control span { width: 30px; text-align: center; font-weight: bold; font-size: 14px; }
.cart-item-subtotal { font-weight: 800; color: #2c1a13; min-width: 90px; text-align: right; }
.btn-checkout { width: 100%; background: #f29727; color: #fff; border: none; padding: 16px; font-size: 18px; font-weight: 900; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.btn-checkout:disabled { background: #ccc; cursor: not-allowed; }
.btn-checkout:hover:not(:disabled) { background: #e08920; }
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
</style>
