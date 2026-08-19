<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'pos'
})

const showPaymentModal = ref(false)
const paymentMethod = ref('transfer')
</script>

<template>
  <div class="pos-container">
    <div class="products-section">
      <div class="section-header">
        <h2>Tiket Rombongan (B2B)</h2>
      </div>
      
      <div class="b2b-form card">
        <h3>Informasi Rombongan</h3>
        <div class="form-group">
          <label>Nama Instansi / Agen</label>
          <input type="text" class="input" placeholder="Masukkan nama instansi..." />
        </div>
        <div class="form-group">
          <label>Pimpinan Rombongan</label>
          <input type="text" class="input" placeholder="Nama pimpinan..." />
        </div>
        <div class="form-group">
          <label>Jumlah Tiket</label>
          <input type="number" class="input" placeholder="0" min="20" />
        </div>
        <div class="form-group">
          <label>Tipe Tiket</label>
          <select class="input">
            <option>Tiket Reguler (Diskon B2B)</option>
            <option>Paket Terusan (Diskon B2B)</option>
            <option>Paket Edukasi Spesial</option>
          </select>
        </div>
        <button class="btn-secondary">Hitung Harga Khusus</button>
      </div>
    </div>
    
    <div class="cart-section">
      <div class="cart-header">
        <h2>Keranjang B2B</h2>
        <button class="btn-link text-error">Batal</button>
      </div>
      
      <div class="cart-items">
        <div class="cart-item">
          <div class="item-details">
            <h4>Tiket Reguler B2B (Instansi)</h4>
            <p>Rp 15.000 / tiket (Diskon 25%)</p>
          </div>
          <div class="item-qty">
            <span>50 Tiket</span>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal (50 x Rp 20.000)</span>
          <span>Rp 1.000.000</span>
        </div>
        <div class="summary-row">
          <span>Diskon B2B (25%)</span>
          <span class="text-error">- Rp 250.000</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>Rp 750.000</span>
        </div>
        <button class="btn-primary btn-block" @click="showPaymentModal = true">Proses Tagihan B2B</button>
      </div>
    </div>

    <!-- Payment Modal B2B -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Pembayaran B2B</h2>
          <button class="close-btn" @click="showPaymentModal = false">×</button>
        </div>
        <div class="modal-body">
          <p>Tagihan untuk rombongan <strong>Instansi</strong> sejumlah <strong>Rp 750.000</strong>.</p>
          <div class="payment-methods">
            <button class="payment-btn" :class="{active: paymentMethod === 'transfer'}" @click="paymentMethod = 'transfer'">Transfer Bank</button>
            <button class="payment-btn" :class="{active: paymentMethod === 'cash'}" @click="paymentMethod = 'cash'">Tunai</button>
          </div>
          
          <div v-if="paymentMethod === 'transfer'" class="qris-display">
             <p>Silakan transfer ke rekening:</p>
             <h3>BCA 1234567890</h3>
             <p>a.n Kampung Coklat</p>
          </div>

          <div v-if="paymentMethod === 'cash'" class="cash-input">
            <label>Uang Diterima (Rp)</label>
            <input type="number" class="input input-lg" placeholder="0" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary btn-block">Cetak Invoice & Selesaikan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pos-container {
  display: flex;
  height: 100%;
}

.products-section {
  flex: 2;
  padding: var(--spacing-lg);
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  background-color: var(--color-surface);
}

.section-header {
  margin-bottom: var(--spacing-lg);
}

.b2b-form {
  max-width: 600px;
}

.b2b-form h3 {
  margin-bottom: var(--spacing-md);
  font-size: var(--text-headline-sm);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  color: var(--color-primary);
  font-size: var(--text-label-md);
}

.cart-section {
  flex: 1;
  background-color: var(--color-neutral);
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-error {
  color: var(--color-error);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-sm);
}

.item-details h4 {
  font-size: var(--text-label-md);
  margin: 0;
}

.item-details p {
  color: var(--color-muted);
  font-size: var(--text-body-sm);
  margin: 0;
}

.item-qty {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 500;
}

.cart-summary {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: var(--text-body-md);
}

.summary-row.total {
  font-size: var(--text-headline-sm);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.btn-block {
  width: 100%;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: var(--color-neutral);
  width: 400px;
  border-radius: var(--rounded-md);
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.modal-header {
  background: var(--color-primary);
  color: var(--color-neutral);
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  color: var(--color-neutral);
  margin: 0;
  font-size: var(--text-headline-sm);
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-neutral);
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: var(--spacing-md);
}

.payment-methods {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.payment-btn {
  flex: 1;
  padding: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--rounded-sm);
  cursor: pointer;
  font-size: var(--text-label-md);
  transition: all 0.2s;
}

.payment-btn.active {
  background: var(--color-secondary);
  color: var(--color-primary);
  font-weight: bold;
  border-color: var(--color-secondary);
}

.cash-input label {
  display: block;
  margin-bottom: var(--spacing-xs);
}

.qris-display {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--rounded-sm);
  border: 1px solid var(--color-border);
}

.qris-display h3 {
  color: var(--color-primary);
  font-size: var(--text-headline-sm);
  margin: var(--spacing-sm) 0;
}

.modal-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}
</style>
