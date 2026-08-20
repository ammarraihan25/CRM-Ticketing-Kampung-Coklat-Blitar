<template>
  <div class="landing-wrapper">
    <div class="landing-container">
      <div class="hub-header-accent"></div>
      
      <div class="logo-container">
        <!-- Ikon Logo -->
        <div class="logo-circle">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
          </svg>
        </div>
      </div>
      
      <h1 class="landing-title">Sistem CRM & Ticketing</h1>
      <h2 class="landing-subtitle">Kampung Coklat Blitar</h2>
      <p class="landing-desc">Silakan pilih modul aplikasi yang ingin Anda akses di bawah ini:</p>
      
      <div class="module-grid">
        <!-- Dashboard Utama -->
        <NuxtLink to="/dashboard" class="module-card card-hero">
          <div class="module-icon icon-hero">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          </div>
          <div class="module-info">
            <h3 class="text-hero">Dashboard Utama</h3>
            <p class="sub-hero">Executive &amp; Financial Overview</p>
          </div>
        </NuxtLink>

        <!-- Portal Masuk -->
        <NuxtLink to="/login" class="module-card">
          <div class="module-icon" style="background: #2C1A13; color: #FFFFFF; border: 1px solid #1F120B;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
          </div>
          <div class="module-info">
            <h3>Portal Masuk (Login)</h3>
            <p>Akses 4 Role Pengguna</p>
          </div>
        </NuxtLink>

        <!-- POS Kasir -->
        <NuxtLink to="/pos" class="module-card">
          <div class="module-icon" style="background: #eff6ff; color: #1D4ED8; border: 1px solid #bfdbfe;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <div class="module-info">
            <h3>POS Kasir Tiket</h3>
            <p>Sistem kasir tiket loket masuk</p>
          </div>
        </NuxtLink>
        
        <!-- Self Service -->
        <NuxtLink to="/ticketing_dan_gate/self-service" class="module-card">
          <div class="module-icon" style="background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div class="module-info">
            <h3>Kios Self Service</h3>
            <p>Pembelian tiket mandiri oleh pengunjung</p>
          </div>
        </NuxtLink>
        
        <!-- Guestbook -->
        <NuxtLink to="/guestbook" class="module-card">
          <div class="module-icon" style="background: #F5F3FF; color: #6D28D9; border: 1px solid #DDD6FE;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="module-info">
            <h3>Buku Tamu Digital</h3>
            <p>Registrasi CRM &amp; Kupon Promo</p>
          </div>
        </NuxtLink>
        
        <!-- Gate -->
        <NuxtLink to="/gate" class="module-card">
          <div class="module-icon" style="background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div class="module-info">
            <h3>Turnstile Gate</h3>
            <p>Pemindaian barcode/QR akses area</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Quick Admin Links -->
      <div class="admin-links">
        <NuxtLink to="/reports">Laporan &amp; Analitik CRM</NuxtLink>
        <span class="dot">&bull;</span>
        <NuxtLink to="/admin/config/tickets-rides">Konfigurasi Tarif</NuxtLink>
        <span class="dot">&bull;</span>
        <NuxtLink to="/admin/config/roles">RBAC Role Kasir</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Navigation Hub
</script>

<style scoped>
.landing-wrapper {
  background-color: #F8F5F0; /* Earthy cream background */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Jost', 'Inter', sans-serif;
  padding: 40px 20px;
}

.landing-container {
  background: #ffffff;
  padding: 50px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(44, 26, 19, 0.08);
  max-width: 900px;
  width: 100%;
  text-align: center;
  border: 1.5px solid rgba(232, 224, 215, 0.9);
  position: relative;
  overflow: hidden;
}

.hub-header-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #F29727 0%, #D97706 50%, #2C1A13 100%);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  margin-top: 10px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #F29727 0%, #D97706 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(242, 151, 39, 0.3);
  transform: rotate(-10deg);
}

.logo-circle svg {
  transform: rotate(10deg);
}

.landing-title {
  font-size: 20px;
  color: #6b7280;
  margin: 0 0 6px 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.landing-subtitle {
  font-size: 38px;
  color: #2c1a13;
  font-weight: 800;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.landing-desc {
  font-size: 16px;
  color: #4b5563;
  margin: 0 0 40px 0;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.module-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border: 1px solid #EAE2D8;
  padding: 24px;
  border-radius: 16px;
  text-decoration: none;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(44, 26, 19, 0.12);
  border-color: #f29727;
}

/* Premium Dashboard Card Styling */
.card-hero {
  background: linear-gradient(135deg, #F29727 0%, #D97706 100%);
  border: none;
}
.card-hero:hover {
  box-shadow: 0 12px 28px rgba(217, 119, 6, 0.4);
  border-color: transparent;
}
.icon-hero {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.text-hero {
  color: #1F120B !important;
}
.sub-hero {
  color: #3D2214 !important;
}

.module-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.module-info h3 {
  font-size: 18px;
  font-weight: 800;
  color: #2c1a13;
  margin: 0 0 6px 0;
}

.module-info p {
  font-size: 13.5px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.admin-links {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #EAE2D8;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #78655C;
}

.admin-links a {
  color: #78655C;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s;
}

.admin-links a:hover {
  color: #D97706;
  text-decoration: underline;
}

.admin-links .dot {
  opacity: 0.5;
}

@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: 1fr;
  }
  .landing-container {
    padding: 30px 20px;
  }
}
</style>
