<script setup lang="ts">
definePageMeta({
  layout: 'pos'
})
</script>

<template>
  <div class="pos-container">
    <div class="products-section">
      <div class="section-header">
        <h2>Tiket Terusan (Paket Wahana)</h2>
        <div class="search-bar">
          <input type="text" class="input" placeholder="Cari tiket terusan..." />
        </div>
      </div>
      
      <div class="product-grid">
        <div class="product-card" v-for="i in 4" :key="i">
          <div class="product-img">🎢</div>
          <div class="product-info">
            <h3>Paket Wisata Keluarga</h3>
            <p class="desc-text">Termasuk 5 wahana utama</p>
            <p class="price">Rp 75.000</p>
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
            <h4>Paket Wisata Keluarga</h4>
            <p>Rp 75.000</p>
          </div>
          <div class="item-qty">
            <button class="qty-btn">-</button>
            <span>1</span>
            <button class="qty-btn">+</button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>Rp 75.000</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>Rp 75.000</span>
        </div>
        <button class="btn-primary btn-block">Bayar Sekarang</button>
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
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

.desc-text {
  font-size: var(--text-body-sm);
  color: var(--color-muted);
  margin-bottom: var(--spacing-xs);
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
</style>
