<template>
  <div class="guestbook-page-wrapper">
    <!-- =========================================================
         HERO SECTION (1:1 MATCH WITH GUESTBOOK PATTERN)
    ========================================================== -->
    <section class="hero">
      <div class="hero-image"></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="brand-label">
          <span class="brand-line"></span>
          <span>#KAMPUNGCOKLAT</span>
          <span class="brand-line"></span>
        </div>

        <h1>
          Portal Akses
          <strong>Kampung Coklat</strong>
        </h1>

        <p>
          Sistem Terpadu CRM, Tiket Masuk, Kasir POS &amp; Manajemen Operasional
        </p>
      </div>

      <!-- Organic Wave (Exact Guestbook SVG Wave) -->
      <div class="hero-wave">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 55C180 110 360 110 540 65C720 20 900 20 1080 60C1260 100 1350 95 1440 65V120H0Z"
            fill="#fffaf5"
          />
        </svg>
      </div>
    </section>

    <!-- =========================================================
         MAIN PORTAL CARD SECTION (EXACT GUESTBOOK OVERLAP PATTERN)
    ========================================================== -->
    <section class="form-section">
      <div class="form-container">
        <div class="portal-main-card">
          <!-- Card Header -->
          <div class="card-header-box">
            <div class="brand-logo-wrap">
              <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
            </div>
            <h2 class="card-main-title">PILIH JALUR AKSES ANDA </h2>
            <p class="card-main-subtitle">Silakan pilih peran akun Anda untuk melanjutkan login</p>
          </div>

          <!-- 2x2 Harmonious Chocolate-Toned Role Cards Grid -->
          <div class="role-cards-grid">
            <!-- 1. Super Admin Card (Warm Caramel Amber) -->
            <NuxtLink to="/login/admin" class="vibrant-role-card">
              <div class="role-icon-blob">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="role-text-col">
                <h3 class="role-name-text">SUPER ADMIN</h3>
                <span class="role-tag-pill">Konfigurasi &amp; Pengguna</span>
              </div>
            </NuxtLink>

            <!-- 2. Operational Manager Card (Deep Roasted Cocoa) -->
            <NuxtLink to="/login/manager" class="vibrant-role-card">
              <div class="role-icon-blob">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <div class="role-text-col">
                <h3 class="role-name-text">OPERATIONAL MANAGER</h3>
                <span class="role-tag-pill">Monitoring &amp; Audit</span>
              </div>
            </NuxtLink>

            <!-- 3. Owner / Direksi Card (Mocha Espresso Bronze) -->
            <NuxtLink to="/login/owner" class="vibrant-role-card">
              <div class="role-icon-blob">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 21h18"/>
                  <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                  <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/>
                </svg>
              </div>
              <div class="role-text-col">
                <h3 class="role-name-text">OWNER / DIREKSI</h3>
                <span class="role-tag-pill">Laporan &amp; Strategis</span>
              </div>
            </NuxtLink>

            <!-- 4. Kasir Front Office Card (Cinnamon Terracotta Spice) -->
            <NuxtLink to="/login/kasir" class="vibrant-role-card">
              <div class="role-icon-blob">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                  <line x1="6" y1="15" x2="6.01" y2="15"/>
                  <line x1="10" y1="15" x2="10.01" y2="15"/>
                </svg>
              </div>
              <div class="role-text-col">
                <h3 class="role-name-text">KASIR FRONT OFFICE</h3>
                <span class="role-tag-pill">Tiket &amp; Penjualan POS</span>
              </div>
            </NuxtLink>
          </div>

          <!-- Bottom Footer Chip -->
          <div class="card-bottom-bar">
            <div class="bottom-badge-chip">
              <span>KAMPUNG COKLAT &bull; SISTEM TICKETING &amp; CRM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: false
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Jost:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.guestbook-page-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #fffaf5;
  color: #321d16;
  overflow-x: hidden;
  font-family: 'Plus Jakarta Sans', 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  padding: 0;
}

/* =========================================================
   HERO (EXACT GUESTBOOK PATTERN & PROPORTIONS)
========================================================= */
.hero {
  height: 520px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('~/assets/assets_digitalbook/kcb.png');
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(37, 20, 13, 0.76) 0%,
    rgba(48, 27, 19, 0.55) 50%,
    rgba(40, 22, 16, 0.84) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 92%);
  text-align: center;
  color: white;
  padding-bottom: 50px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #f49a24;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 20px;
}

.brand-line {
  width: 45px;
  height: 2px;
  background: #f49a24;
  opacity: 0.7;
}

.hero h1 {
  color: white;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1.08;
  letter-spacing: -1.5px;
  margin: 0;
  font-weight: 500;
}

.hero h1 strong {
  display: block;
  color: #f59b24;
  font-weight: 800;
}

.hero-content p {
  max-width: 700px;
  margin: 20px auto 0;
  font-size: clamp(16px, 1.8vw, 20px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 105px;
  z-index: 3;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* =========================================================
   FORM SECTION (EXACT GUESTBOOK OVERLAP STRUCTURE)
========================================================= */
.form-section {
  background: #fffaf5;
  padding-bottom: 80px;
  width: 100%;
}

.form-container {
  width: min(920px, calc(100% - 40px));
  margin: -130px auto 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.portal-main-card {
  width: 100%;
  background: white;
  border: 1px solid rgba(62, 36, 25, 0.08);
  border-radius: 28px;
  padding: 40px 48px 32px 48px;
  box-shadow:
    0 30px 80px rgba(48, 28, 20, 0.14),
    0 10px 25px rgba(48, 28, 20, 0.05);
}

/* Card Header */
.card-header-box {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
}

.brand-logo-wrap {
  margin-bottom: 10px;
}

.brand-logo-img {
  max-height: 48px;
  width: auto;
  object-fit: contain;
}

.card-main-title {
  font-size: 22px;
  font-weight: 800;
  color: #2c1a13;
  margin: 0 0 6px 0;
  letter-spacing: 0.5px;
}

.card-main-subtitle {
  font-size: 14px;
  color: #7a5843;
  margin: 0;
  font-weight: 500;
}

/* =========================================================
   PROFESSIONAL UNIFIED ROLE CARDS
========================================================= */
.role-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}

.vibrant-role-card {
  background: #FFFFFF;
  border: 1px solid rgba(44, 26, 19, 0.12);
  border-radius: 14px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.02);
}

.vibrant-role-card:hover {
  border-color: #F59E0B;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.12);
  transform: translateY(-2px);
}

/* Icon Blobs */
.role-icon-blob {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  background: #F8F5F1;
  color: #3D2214;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.vibrant-role-card:hover .role-icon-blob {
  background: #F59E0B;
  color: #FFFFFF;
  transform: scale(1.05);
}

/* Role Text Info */
.role-text-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
}

.role-name-text {
  font-size: 15px;
  font-weight: 700;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.3px;
  transition: color 0.25s ease;
}

.vibrant-role-card:hover .role-name-text {
  color: #D97706;
}

.role-tag-pill {
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  background: #F8F5F1;
  color: #5A3825;
  letter-spacing: 0.2px;
}

/* Card Bottom Footer */
.card-bottom-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.bottom-badge-chip {
  display: inline-flex;
  align-items: center;
  background: #FAF5EE;
  border: 1px solid #EFE4D6;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #8C6D58;
  letter-spacing: 0.6px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    height: 420px;
  }

  .form-container {
    margin-top: -80px;
    width: calc(100% - 24px);
  }

  .portal-main-card {
    padding: 28px 20px;
  }

  .role-cards-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
