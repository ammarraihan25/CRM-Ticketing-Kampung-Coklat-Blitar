<script setup lang="ts">
definePageMeta({
  layout: 'pos'
})
</script>

<template>
  <div class="pos-container">
    <div class="products-section">
      <h2>Pilih Tiket</h2>
      <!-- Produk List akan ada di sini -->
    </div>
    <div class="cart-section">
      <h2>Keranjang</h2>
      <PosCart />
      <PosNumpad />
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
  padding: 1rem;
  border-right: 1px solid #ccc;
}
.cart-section {
  flex: 1;
  padding: 1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>
