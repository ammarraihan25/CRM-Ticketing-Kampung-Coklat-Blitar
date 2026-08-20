<template>
  <div class="hub-page-container">
    <div class="hub-card">
      <div class="hub-header">
        <div class="hub-icon-badge">🍫</div>
        <h1 class="hub-title">CRM &amp; Ticketing Kampung Coklat</h1>
        <p class="hub-subtitle">Sistem Terpadu Penjualan Tiket, Kasir POS &amp; CRM Wisata Edukasi</p>
      </div>

      <div class="hub-grid">
        <NuxtLink to="/dashboard" class="hub-btn btn-hero">
          <span class="btn-icon">📊</span>
          <div class="btn-text">
            <span class="btn-primary-text">Dashboard Utama</span>
            <span class="btn-sub-text">Executive &amp; Financial Overview</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/login" class="hub-btn btn-dark">
          <span class="btn-icon">🚪</span>
          <div class="btn-text">
            <span class="btn-primary-text">Portal Masuk (Login)</span>
            <span class="btn-sub-text">Akses 4 Role Pengguna</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/pos" class="hub-btn btn-blue">
          <span class="btn-icon">🧾</span>
          <div class="btn-text">
            <span class="btn-primary-text">POS Kasir Tiket</span>
            <span class="btn-sub-text">Kasir Loket Masuk</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/ticketing_dan_gate/self-service" class="hub-btn btn-emerald">
          <span class="btn-icon">🎟️</span>
          <div class="btn-text">
            <span class="btn-primary-text">Kios Self Service</span>
            <span class="btn-sub-text">Pembelian Tiket Mandiri</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/guestbook" class="hub-btn btn-purple">
          <span class="btn-icon">📖</span>
          <div class="btn-text">
            <span class="btn-primary-text">Buku Tamu Digital</span>
            <span class="btn-sub-text">Registrasi CRM &amp; Kupon Promo</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/gate" class="hub-btn btn-amber">
          <span class="btn-icon">🚧</span>
          <div class="btn-text">
            <span class="btn-primary-text">Turnstile Gate</span>
            <span class="btn-sub-text">Pemindai Barcode Masuk</span>
          </div>
        </NuxtLink>
      </div>

      <div class="hub-footer">
        <NuxtLink to="/reports" class="footer-link">Laporan &amp; Analitik CRM</NuxtLink>
        <span class="footer-dot">&bull;</span>
        <NuxtLink to="/admin/config/tickets-rides" class="footer-link">Konfigurasi Tarif</NuxtLink>
        <span class="footer-dot">&bull;</span>
        <NuxtLink to="/admin/config/roles" class="footer-link">RBAC Role Kasir</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Navigation Hub
</script>

<style scoped>
.hub-page-container {
  min-height: 100vh;
  background: #F8F5F0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: 'Jost', sans-serif;
}

.hub-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(232, 224, 215, 0.9);
  border-radius: 24px;
  padding: 32px;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 10px 30px -5px rgba(44, 26, 19, 0.08);
  display: flex;
  flex-direction: column;
  gap: 22px;
  position: relative;
  overflow: hidden;
}

.hub-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #F29727 0%, #D97706 50%, #2C1A13 100%);
}

.hub-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.hub-icon-badge {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 4px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
}

.hub-title {
  font-size: 22px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.4px;
}

.hub-subtitle {
  font-size: 13px;
  color: #78655C;
  margin: 0;
  line-height: 1.4;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.hub-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.hub-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(44, 26, 19, 0.12);
}

.btn-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.btn-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.btn-primary-text {
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1.2;
}

.btn-sub-text {
  font-size: 10.5px;
  opacity: 0.85;
}

.btn-hero {
  background: linear-gradient(135deg, #F29727 0%, #D97706 100%);
  color: #2C1A13;
  grid-column: 1 / -1;
  padding: 14px 18px;
}

.btn-hero .btn-primary-text {
  font-size: 15px;
  color: #1F120B;
}

.btn-hero .btn-sub-text {
  color: #3D2214;
}

.btn-dark {
  background: #2C1A13;
  color: #FFFFFF;
}

.btn-blue {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
}

.btn-emerald {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.btn-purple {
  background: #F5F3FF;
  color: #6D28D9;
  border: 1px solid #DDD6FE;
}

.btn-amber {
  background: #FFFBEB;
  color: #B45309;
  border: 1px solid #FDE68A;
}

.hub-footer {
  border-top: 1px dashed #EAE2D8;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-link {
  font-size: 12px;
  font-weight: 700;
  color: #78655C;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #D97706;
  text-decoration: underline;
}

.footer-dot {
  color: #D6CCC2;
}

@media (max-width: 600px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
