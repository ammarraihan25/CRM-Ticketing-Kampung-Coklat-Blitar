<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'pos'
})

const showPaymentModal = ref(false)
const paymentMethod = ref('cash')
</script>

<template>
  <div class="pos-container">
    <div class="products-section">
      <div class="section-header">
        <h2>Tiket Reguler</h2>
        <div class="search-bar">
          <input type="text" class="input" placeholder="Cari tiket..." />
        </div>
      </div>
      
      <div class="product-grid">
        <div class="product-card" v-for="i in 6" :key="i">
          <div class="product-img">🎟️</div>
          <div class="product-info">
            <h3>Tiket Masuk Reguler</h3>
            <p class="price">Rp 20.000</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cart-section">
      <div class="cart-header">
        <h2>Keranjang</h2>
        <button class="btn-link text-error">Kosongkan</button>
      </div>
      
      <div class="cart-items">
        <div class="cart-item">
          <div class="item-details">
            <h4>Tiket Masuk Reguler</h4>
            <p>Rp 20.000</p>
          </div>
          <div class="item-qty">
            <button class="qty-btn">-</button>
            <span>2</span>
            <button class="qty-btn">+</button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>Rp 40.000</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>Rp 40.000</span>
        </div>
        <button class="btn-primary btn-block" @click="showPaymentModal = true">Bayar Sekarang</button>
      </div>
    </div>

    <!-- Payment Modal -->
    <div class="modal-overlay" v-if="showPaymentModal">
      <div class="modal-card">
        <div class="modal-header">
          <h2>Pilih Metode Pembayaran</h2>
          <button class="close-btn" @click="showPaymentModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="payment-methods">
            <button class="payment-btn" :class="{active: paymentMethod === 'cash'}" @click="paymentMethod = 'cash'">Tunai</button>
            <button class="payment-btn" :class="{active: paymentMethod === 'qris'}" @click="paymentMethod = 'qris'">QRIS</button>
          </div>
          
          <div v-if="paymentMethod === 'cash'" class="cash-input">
            <label>Uang Diterima (Rp)</label>
            <input type="number" class="input input-lg" placeholder="0" />
            <div class="change-info">
              <span>Kembalian:</span>
              <span class="text-error">Rp 0</span>
            </div>
          </div>

          <div v-if="paymentMethod === 'qris'" class="qris-display">
            <div class="qris-box">
              [ Gambar QRIS Dinamis ]
            </div>
            <p>Arahkan pelanggan untuk scan QR Code di atas menggunakan aplikasi e-wallet atau M-Banking.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary btn-block">Selesaikan Transaksi</button>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.product-card {
  background: var(--color-neutral);
  border: 1px solid var(--color-border);
  border-radius: var(--rounded-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: border-color 0.2s ease;
  text-align: center;
}

.product-card:hover {
  border-color: var(--color-secondary);
}

.product-img {
  font-size: 40px;
  margin-bottom: var(--spacing-sm);
}

.product-info h3 {
  font-size: var(--text-label-md);
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary);
}

.price {
  color: var(--color-secondary);
  font-weight: 500;
  margin: 0;
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
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--rounded-sm);
  border: 1px solid var(--color-border);
  background: var(--color-neutral);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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

.change-info {
  margin-top: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  font-size: var(--text-label-lg);
  font-weight: bold;
}

.qris-display {
  text-align: center;
}

.qris-box {
  background: #f0f0f0;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
  border-radius: var(--rounded-sm);
}

.modal-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}
</style>
