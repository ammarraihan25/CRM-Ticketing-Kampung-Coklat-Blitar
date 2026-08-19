<template>
  <div class="portal-root" :style="{ backgroundImage: `url(${bgPortal})` }">
    <!-- Dark Cocoa Vignette Overlay -->
    <div class="bg-vignette-overlay"></div>

    <!-- Main Central Container -->
    <div class="portal-main-content">
      <!-- Top Center Brand Header -->
      <div class="header-brand-container">
        <div class="golden-logo-squircle">
          <img :src="logoImg" alt="Kampung Coklat" class="logo-image" />
        </div>
        
        <div class="brand-text-block">
          <span class="brand-kicker">WISATA EDUKASI KAMPUNG COKLAT BLITAR</span>
          <h1 class="portal-main-heading">Portal Masuk</h1>
          <p class="portal-sub-desc">
            Pilih portal peran akun internal Anda untuk mengakses modul kerja yang sesuai:
          </p>
        </div>
      </div>

      <!-- 4 Glowing Glassmorphism Role Cards (Exact Match to Screenshot) -->
      <div class="role-cards-row">
        <!-- 1. Super Admin Card (Green Glass) -->
        <NuxtLink to="/login/admin" class="portal-card glass-green">
          <div class="card-top-flex">
            <div class="icon-avatar-badge avatar-bg-green">
              <!-- Admin Briefcase Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span class="role-pill-badge pill-green">FULL SYSTEM ACCESS</span>
          </div>

          <div class="card-center-info">
            <h3 class="role-name-title">Super Admin</h3>
            <p class="role-details-text">
              Atur harga tiket, kelola wahana, diskon &amp; voucher promo, manajemen staf, serta konfigurasi permission matrix.
            </p>
          </div>

          <div class="card-bottom-action">
            <span class="action-link-text link-green">Masuk Portal Admin &rarr;</span>
          </div>
        </NuxtLink>

        <!-- 2. Operational Manager Card (Blue Glass) -->
        <NuxtLink to="/login/manager" class="portal-card glass-blue">
          <div class="card-top-flex">
            <div class="icon-avatar-badge avatar-bg-blue">
              <!-- Manager Analytics / Tie Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
              </svg>
            </div>
            <span class="role-pill-badge pill-blue">MONITORING &amp; EVALUASI</span>
          </div>

          <div class="card-center-info">
            <h3 class="role-name-title">Operational Manager</h3>
            <p class="role-details-text">
              Monitoring omzet GTV real-time, evaluasi laporan historis penjualan tiket, database CRM member, dan demografi pengunjung.
            </p>
          </div>

          <div class="card-bottom-action">
            <span class="action-link-text link-blue">Masuk Portal Manager &rarr;</span>
          </div>
        </NuxtLink>

        <!-- 3. Owner / Direksi Card (Gold Glass) -->
        <NuxtLink to="/login/owner" class="portal-card glass-gold">
          <div class="card-top-flex">
            <div class="icon-avatar-badge avatar-bg-gold">
              <!-- Owner Crown Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
              </svg>
            </div>
            <span class="role-pill-badge pill-gold">EXECUTIVE READ-ONLY</span>
          </div>

          <div class="card-center-info">
            <h3 class="role-name-title">Owner / Direksi</h3>
            <p class="role-details-text">
              Tinjauan eksekutif kinerja bisnis keseluruhan, tren finansial harian/bulanan, rasio pengunjung, dan ekspor laporan PDF.
            </p>
          </div>

          <div class="card-bottom-action">
            <span class="action-link-text link-gold">Masuk Portal Owner &rarr;</span>
          </div>
        </NuxtLink>

        <!-- 4. Kasir Front Office Card (Silver Glass) -->
        <NuxtLink to="/login/kasir" class="portal-card glass-silver">
          <div class="card-top-flex">
            <div class="icon-avatar-badge avatar-bg-silver">
              <!-- Kasir Receipt / Register Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
                <path d="M16 8h-8M16 12h-8M12 16h-4"/>
              </svg>
            </div>
            <span class="role-pill-badge pill-silver">FRONTLINER KASIR POS</span>
          </div>

          <div class="card-center-info">
            <h3 class="role-name-title">Kasir Front Office</h3>
            <p class="role-details-text">
              Terminal transaksi penjualan tiket reguler &amp; terusan walk-in, cetak QR tiket, dan pencatatan penutupan shift kasir.
            </p>
          </div>

          <div class="card-bottom-action">
            <span class="action-link-text link-silver">Masuk Terminal Kasir &rarr;</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom System Credits & Watermark -->
      <footer class="portal-footer-row">
        <div class="footer-center-text">
          PT ABSYSTEM TECHNOLOGY SOLUTION &bull; Enterprise CRM &amp; Ticketing Engine v1.3
        </div>
        <div class="footer-right-brand">
          <img :src="logoImg" alt="Kampung Coklat" class="footer-mini-logo" />
          <span>Kampung Coklat</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'
import bgPortal from '~/assets/assets_POS/bg_portal.png'

definePageMeta({
  layout: 'blank'
})
</script>

<style scoped>
.portal-root {
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Jost', sans-serif;
  padding: 30px 24px;
  overflow-x: hidden;
}

/* Dark Cocoa Scrim for rich contrast */
.bg-vignette-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(26, 12, 6, 0.4) 0%, rgba(13, 5, 2, 0.85) 100%);
  pointer-events: none;
}

.portal-main-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  position: relative;
  z-index: 2;
}

/* Header Brand */
.header-brand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.golden-logo-squircle {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: linear-gradient(135deg, #FFFDF8 0%, #FFF5E6 100%);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(242, 151, 39, 0.5), 0 8px 20px rgba(0, 0, 0, 0.4);
  border: 2.5px solid #F29727;
  transition: transform 0.3s ease;
}

.golden-logo-squircle:hover {
  transform: scale(1.05);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-text-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-kicker {
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.8px;
  color: #F29727;
  text-transform: uppercase;
}

.portal-main-heading {
  font-size: 38px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
  letter-spacing: -0.6px;
  line-height: 1.15;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.portal-sub-desc {
  font-size: 14px;
  color: #E8DFD8;
  margin: 0;
  max-width: 580px;
  line-height: 1.45;
}

/* 4 Role Cards Row */
.role-cards-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  width: 100%;
}

.portal-card {
  border-radius: 18px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 270px;
}

.portal-card:hover {
  transform: translateY(-8px);
}

/* Green Glass (Super Admin) */
.glass-green {
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.18) 0%, rgba(6, 78, 59, 0.35) 100%);
  border: 1.5px solid rgba(52, 211, 153, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.1);
}

.glass-green:hover {
  border-color: #34D399;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.35);
}

.avatar-bg-green {
  background: linear-gradient(135deg, #059669 0%, #10B981 100%);
  color: #FFFFFF;
}

.pill-green {
  background: rgba(6, 78, 59, 0.7);
  border: 1px solid rgba(52, 211, 153, 0.5);
  color: #6EE7B7;
}

.link-green {
  color: #34D399;
}

/* Blue Glass (Manager) */
.glass-blue {
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.18) 0%, rgba(30, 58, 138, 0.35) 100%);
  border: 1.5px solid rgba(96, 165, 250, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.1);
}

.glass-blue:hover {
  border-color: #60A5FA;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.35);
}

.avatar-bg-blue {
  background: linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%);
  color: #FFFFFF;
}

.pill-blue {
  background: rgba(30, 58, 138, 0.7);
  border: 1px solid rgba(96, 165, 250, 0.5);
  color: #93C5FD;
}

.link-blue {
  color: #60A5FA;
}

/* Gold Glass (Owner) */
.glass-gold {
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.2) 0%, rgba(120, 53, 15, 0.4) 100%);
  border: 1.5px solid rgba(251, 191, 36, 0.55);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(245, 158, 11, 0.12);
}

.glass-gold:hover {
  border-color: #FBBF24;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.4);
}

.avatar-bg-gold {
  background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
  color: #FFFFFF;
}

.pill-gold {
  background: rgba(120, 53, 15, 0.7);
  border: 1px solid rgba(251, 191, 36, 0.55);
  color: #FDE68A;
}

.link-gold {
  color: #FBBF24;
}

/* Silver Glass (Kasir) */
.glass-silver {
  background: linear-gradient(180deg, rgba(156, 163, 175, 0.18) 0%, rgba(55, 65, 81, 0.4) 100%);
  border: 1.5px solid rgba(209, 213, 219, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.08);
}

.glass-silver:hover {
  border-color: #E5E7EB;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.25);
}

.avatar-bg-silver {
  background: linear-gradient(135deg, #4B5563 0%, #6B7280 100%);
  color: #FFFFFF;
}

.pill-silver {
  background: rgba(55, 65, 81, 0.7);
  border: 1px solid rgba(209, 213, 219, 0.5);
  color: #F3F4F6;
}

.link-silver {
  color: #E5E7EB;
}

/* Card Elements */
.card-top-flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.icon-avatar-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.role-pill-badge {
  font-size: 9.5px;
  font-weight: 800;
  padding: 4px 9px;
  border-radius: 14px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  white-space: nowrap;
}

.card-center-info {
  margin-bottom: 18px;
  flex: 1;
}

.role-name-title {
  font-size: 20px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  letter-spacing: -0.2px;
}

.role-details-text {
  font-size: 12.5px;
  color: #D3C9C2;
  line-height: 1.5;
  margin: 0;
}

.card-bottom-action {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 14px;
}

.action-link-text {
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s ease;
}

.portal-card:hover .action-link-text {
  transform: translateX(5px);
}

/* Footer Row */
.portal-footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
}

.footer-center-text {
  font-size: 11.5px;
  color: #A89489;
  letter-spacing: 0.2px;
}

.footer-right-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #F29727;
}

.footer-mini-logo {
  width: 18px;
  height: 18px;
  object-fit: contain;
  background: #FFFFFF;
  border-radius: 4px;
  padding: 1px;
}

@media (max-width: 1100px) {
  .role-cards-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .role-cards-row {
    grid-template-columns: 1fr;
  }
  .portal-main-heading { font-size: 28px; }
  .portal-footer-row { flex-direction: column; gap: 8px; text-align: center; }
}
</style>
