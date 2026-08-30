<script setup lang="ts">
// Navigation Hub / Landing Page (Jalur Akses)
import { useAuth } from '~/composables/useAuth'

const { setRole } = useAuth()

const handlePosAccess = () => {
  setRole('kasir')
}
</script>

<template>
  <div class="landing-wrapper">
    <!-- Dark Hero Background with Image -->
    <div class="hero-section">
      <!-- Title Text -->
      <div class="hero-content">
        <div class="hashtag animate-fade-in-up" style="animation-delay: 0.1s;">
          <span class="line-dash"></span>
          <span class="ht-text">#KAMPUNGCOKLAT</span>
          <span class="line-dash"></span>
        </div>
        <h1 class="hero-title animate-fade-in-up" style="animation-delay: 0.2s;">
          <span class="text-white">Portal Akses</span><br/>
          <span class="text-orange">Kampung Coklat</span>
        </h1>
        <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.3s;">Sistem Terpadu CRM, Tiket Masuk, Kasir POS & Manajemen Operasional</p>
      </div>

      <!-- Wavy SVG Separator -->
      <div class="hero-wave">
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none">
          <path fill="#FDFCFB" fill-opacity="1" d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>

    <!-- Floating White Card Container -->
    <div class="main-card-container">
      <div class="main-card animate-fade-in-up" style="animation-delay: 0.4s;">
        
        <!-- Logo Image -->
        <div class="card-logo">
          <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Logo Kampung Coklat" class="logo-img" />
        </div>

        <div class="card-header-text">
          <h3 class="card-title">PILIH MODUL APLIKASI</h3>
          <p class="card-desc">Silakan pilih modul aplikasi yang ingin Anda akses di bawah ini</p>
        </div>

        <!-- Module Grid -->
        <div class="role-grid">
          


          <!-- 2. Portal Masuk (Login) -->
          <NuxtLink to="/login" class="role-btn hover-elevate">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">PORTAL MASUK (LOGIN)</span>
              <span class="rb-pill">Akses 4 Role Pengguna</span>
            </div>
          </NuxtLink>

          <!-- 3. POS Kasir Tiket -->
          <NuxtLink to="/pos" class="role-btn hover-elevate" @click="handlePosAccess">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">POS KASIR TIKET</span>
              <span class="rb-pill">Sistem kasir tiket loket masuk</span>
            </div>
          </NuxtLink>

          <!-- 4. Kios Self Service -->
          <NuxtLink to="/ticketing_dan_gate/self-service" class="role-btn hover-elevate">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">KIOS SELF SERVICE</span>
              <span class="rb-pill">Pembelian tiket mandiri oleh pengunjung</span>
            </div>
          </NuxtLink>

          <!-- 5. Buku Tamu Digital -->
          <NuxtLink to="/guestbook" class="role-btn hover-elevate">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">BUKU TAMU DIGITAL</span>
              <span class="rb-pill">Registrasi CRM & Kupon Promo</span>
            </div>
          </NuxtLink>

          <!-- 6. Turnstile Gate -->
          <NuxtLink to="/gate" class="role-btn hover-elevate">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">TURNSTILE GATE</span>
              <span class="rb-pill">Pemindaian barcode/QR akses area</span>
            </div>
          </NuxtLink>

          <!-- 6. Manajemen Pelanggan (CRM) -->
          <NuxtLink to="/crm" class="role-btn hover-elevate">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">MANAJEMEN PELANGGAN (CRM)</span>
              <span class="rb-pill">Kelola data member, promo, & broadcast pesan</span>
            </div>
          </NuxtLink>

        </div>



      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  background-color: #FDFCFB; /* Very light subtle background matching the white card container */
  min-height: 100vh;
  position: relative;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

/* --- ANIMATIONS --- */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

/* --- HERO SECTION --- */
.hero-section {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  z-index: 1;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -10px; left: -10px; right: -10px; bottom: -10px;
  background: url('~/assets/assets_POS/bangunan1.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(6px) brightness(0.85); /* Slightly blur and darken the background to make text pop */
  z-index: -1;
}

.hero-content {
  text-align: center;
  z-index: 2;
  margin-bottom: 40px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6); /* Added shadow so white text remains readable on bright bg */
}

.hashtag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.line-dash {
  width: 48px;
  height: 2px;
  background-color: #D97706; /* Orange line */
}

.ht-text {
  color: #D97706;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 3px;
}

.hero-title {
  font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
  font-size: 58px;
  font-weight: 800;
  line-height: 1.05;
  margin: 0 0 16px 0;
  letter-spacing: -1.5px;
}

.text-white { color: #ffffff; }
.text-orange { color: #F59E0B; }

.hero-subtitle {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.2px;
}

/* Wavy Divider at bottom of hero */
.hero-wave {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  width: 100%;
  line-height: 0;
  z-index: 2;
}
.hero-wave svg {
  display: block;
  width: 100%;
  height: 140px;
}

/* --- MAIN FLOATING CARD --- */
.main-card-container {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 45vh; /* Places the card exactly over the wave */
  padding-bottom: 80px;
}

.main-card {
  background: #ffffff;
  width: 100%;
  max-width: 920px;
  border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
  padding: 56px 64px 80px 64px;
  text-align: center;
  margin: 0 24px;
}

/* Logo Image */
.card-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.logo-img {
  height: 56px;
  object-fit: contain;
}

/* Headings inside card */
.card-header-text { margin-bottom: 48px; }
.card-title {
  font-size: 19px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
}
.card-desc { font-size: 15px; color: #6B7280; margin: 0; }

/* --- 2x2 GRID ROLES --- */
.role-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.role-btn {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border: 1.5px solid #C49F7A; /* Brown border */
  border-radius: 16px;
  background: #ffffff;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  min-height: 110px;
}

.hover-elevate {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.hover-elevate:hover {
  border-color: #D97706;
  box-shadow: 0 12px 30px rgba(217, 119, 6, 0.12);
  transform: translateY(-4px);
}

.rb-icon {
  width: 52px;
  height: 52px;
  background: #F9FAFB;
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B5563;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.role-btn.highlight {
  background: #FFFBEB;
  border-color: #FDE68A;
}
.role-btn.highlight:hover {
  border-color: #F59E0B;
}

.icon-highlight {
  background: #F59E0B;
  color: #ffffff;
  border: none;
}

.role-btn:hover .rb-icon:not(.icon-highlight) {
  background: #FFFBEB;
  color: #D97706;
  border-color: #FDE68A;
}

.rb-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.rb-title {
  font-size: 14.5px;
  font-weight: 800;
  color: #111827;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rb-pill {
  font-size: 11px;
  font-weight: 700;
  color: #78350F;
  background: #FDF8F3;
  padding: 5px 12px;
  border-radius: 6px;
  align-self: flex-start;
  border: 1px solid #F5EAE1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.full-width-btn {
  grid-column: 1 / -1;
  max-width: 50%;
  margin: 0 auto;
  width: 100%;
}



/* Responsiveness */
@media (max-width: 768px) {
  .role-grid { grid-template-columns: 1fr; }
  .full-width-btn { max-width: 100% !important; }
  .main-card { padding: 40px 24px; }
  .hero-title { font-size: 40px; }
  .main-card-container { padding-top: 35vh; }
  .hero-section { background-position: center; }
}
</style>
