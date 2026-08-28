<script setup lang="ts">
import { useCrmNonMember } from '~/composables/useCrmNonMember'
const { addVisitor } = useCrmNonMember()

import { ref, computed } from 'vue'

definePageMeta({
  layout: 'pos'
})

import paket_tk from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png'
import paket_sd from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'
import paket_smp from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png'
import paket_sma from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png'

import { useConfigSync } from '~/composables/useConfigSync'

const { ticketRates } = useConfigSync()

const edukasiTickets = computed(() => {
  return ticketRates.value
    .filter(t => t.category === 'edukasi' && t.isActive)
    .map(t => ({
      id: t.id,
      name: t.name,
      label: 'Wisata Edukasi',
      price: t.price,
      desc: t.description || 'Paket edukasi Kampung Coklat',
      image: t.imageUrl || paket_tk
    }))
})

const bookingData = ref({
  instansi: '',
  namaPerwakilan: '',
  estimasiPeserta: '',
  telepon: '',
  tanggal: new Date().toISOString().split('T')[0],
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
  if (!bookingData.value.instansi || !bookingData.value.namaPerwakilan || !bookingData.value.telepon) {
    alert('Nama Sekolah, Nama Perwakilan, dan Nomor Telepon wajib diisi sebelum checkout!');
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
   bookingData.value = { instansi: '', namaPerwakilan: '', estimasiPeserta: '', telepon: '', tanggal: new Date().toISOString().split('T')[0] }
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
        Data Pemesan
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
            <label>Asal Sekolah / Instansi <span class="req">*</span></label>
            <input type="text" v-model="bookingData.instansi" placeholder="Contoh: TK Kartika" />
          </div>
          <div class="form-group">
            <label>Nama Perwakilan / Guru <span class="req">*</span></label>
            <input type="text" v-model="bookingData.namaPerwakilan" placeholder="Nama Lengkap" />
          </div>
          <div class="form-group">
            <label>No. WhatsApp <span class="req">*</span></label>
            <input type="tel" v-model="bookingData.telepon" placeholder="0812..." />
          </div>
          <div class="form-group">
            <label>Estimasi Siswa (Pax)</label>
            <div class="input-with-suffix">
              <input type="number" v-model="bookingData.estimasiPeserta" placeholder="50" />
              <span class="suffix">Pax</span>
            </div>
          </div>
          <div class="form-group">
            <label>Tanggal Kunjungan <span class="req">*</span></label>
            <input type="date" v-model="bookingData.tanggal" />
          </div>
        </div>
      </div>
    </div>

    <!-- MIDDLE PANE: Catalog -->
    <div class="pos-catalog-pane">
      <div class="step-2-products" style="display: flex; flex-direction: column; flex: 1; min-height: 0; height: 100%;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h1 style="font-size: 32px; font-weight: 800; color: #2c1a13; margin: 0;">Pilih Paket: Edukasi</h1>
        </div>
          
          <div class="product-list-wrapper" style="overflow-y: auto; flex: 1; min-height: 0; padding-bottom: 20px; padding-right: 10px;">
            <div class="product-list" style="display: flex; flex-direction: column; gap: 20px;">
              <div class="elegant-card" v-for="product in edukasiTickets" :key="product.id">
                <div class="edukasi-image-wrapper">
                  <img :src="product.image" :alt="product.name" class="edukasi-image" />
                </div>
                <div class="card-content">
                  <div class="card-price-label"><span>{{ product.label }}</span></div>
                  <h3 class="card-title">{{ product.name }}</h3>
                  <div class="card-divider"></div>
                  <div class="card-desc" v-html="product.desc"></div>
                  <div class="card-footer">
                    <div class="card-price">
                      Mulai <span class="price-currency">Rp</span> {{ product.price.toLocaleString('id-ID') }}
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
.form-group input, .form-group select { width: 100%; padding: 14px 16px; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 14px; background: #f9fafb; outline: none; transition: all 0.2s ease; color: #111827; font-weight: 500; }
.form-group input::placeholder { color: #9ca3af; font-weight: 400; }
.form-group input:focus, .form-group select:focus { border-color: #f29727; background: #ffffff; box-shadow: 0 0 0 4px rgba(242, 151, 39, 0.15); }
.input-with-suffix { position: relative; display: flex; align-items: center; }
.input-with-suffix input { padding-right: 50px; }
.input-with-suffix .suffix { position: absolute; right: 15px; color: #888; font-weight: 600; font-size: 13px; }
.btn-primary-full { width: 100%; background: #2c1a13; color: #fff; padding: 16px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; }
.btn-primary-full:hover { background: #3d241a; }
.product-list-wrapper { overflow-y: auto; padding-bottom: 20px; }
.elegant-card { display: flex; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f0f0f0; padding: 12px; gap: 15px; }
.elegant-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(44,26,19,0.1); border-color: #fce4ce; }
.edukasi-image-wrapper { width: 220px; height: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.edukasi-image { width: 100%; height: auto; object-fit: contain; display: block; }
.elegant-card:hover .edukasi-image { transform: scale(1.02); }
.card-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.card-price-label { color: #4a2c1d; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; }
.card-title { font-size: 18px; color: #2c1a13; font-weight: bold; font-family: 'Georgia', serif; margin: 0; }
.card-divider { height: 2px; width: 40px; background-color: #e0e0e0; margin: 8px 0; }
.card-desc { color: #666; font-size: 13px; line-height: 1.4; margin: 0 0 12px 0; }
:deep(.desc-article strong) { display: block; margin-top: 10px; margin-bottom: 4px; color: #333; font-size: 11px; }
:deep(.desc-article ul) { margin: 0; padding-left: 15px; list-style-type: disc; }
:deep(.desc-article li) { margin-bottom: 2px; color: #666; font-size: 11px; }
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.card-price { font-size: 18px; font-weight: bold; color: #2c1a13; }
.price-currency { font-size: 15px; color: #888; }
.btn-outline-primary { background: transparent; border: 1px solid #2c1a13; color: #2c1a13; padding: 6px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
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



