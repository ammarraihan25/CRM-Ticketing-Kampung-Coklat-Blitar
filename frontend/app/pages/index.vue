<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div>
    <h1>Dashboard Utama</h1>
    <p>Ringkasan KPI dan Gross Transaction Value (GTV) harian/bulanan akan ditampilkan di sini.</p>
    
    <div class="kpi-cards">
      <div class="card">
        <h3>Total Transaksi Hari Ini</h3>
        <p>Rp 15.000.000</p>
      </div>
      <div class="card">
        <h3>Member Baru</h3>
        <p>120 Orang</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kpi-cards {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
}
.card h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #7f8c8d;
}
.card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}
</style>
