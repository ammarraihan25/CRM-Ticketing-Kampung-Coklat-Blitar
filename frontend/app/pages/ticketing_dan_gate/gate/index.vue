<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="gate-scanner">
    <h1>Gate Scanner</h1>
    <div class="scanner-box">
      <p>Arahkan QR Code Tiket ke Scanner</p>
      <!-- Integrasi Web Scanner / Barcode Scanner -->
    </div>
    <NuxtLink to="/">Kembali ke Dashboard</NuxtLink>
  </div>
</template>

<style scoped>
.gate-scanner {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.scanner-box {
  width: 300px;
  height: 300px;
  border: 2px dashed #27ae60;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
