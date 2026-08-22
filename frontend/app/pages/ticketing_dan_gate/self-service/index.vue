<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false
})

const router = useRouter()

const selectCategory = (categoryName: string) => {
  router.push({
    path: '/ticketing_dan_gate/self-service/booking',
    query: { category: categoryName }
  })
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
          <span class="text-white">Self Service</span><br/>
          <span class="text-orange">Ticketing</span>
        </h1>
        <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.3s;">Pesan tiket secara mandiri, cepat dan mudah</p>
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
          <h3 class="card-title">PILIH KATEGORI TIKET ANDA</h3>
          <p class="card-desc">Silakan pilih salah satu kategori di bawah ini untuk memulai pesanan Anda</p>
        </div>

        <!-- Module Grid -->
        <div class="role-grid">
          
          <!-- Card 1 -->
          <div class="role-btn hover-elevate" @click="selectCategory('Tiket Masuk')">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="18" height="8" rx="2"/><path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/><circle cx="12" cy="14" r="1"/></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">TIKET MASUK (GATE)</span>
              <span class="rb-pill">Beli tiket reguler atau tiket terusan</span>
            </div>
          </div>
          
          <!-- Card 1b (Wahana) -->
          <div class="role-btn hover-elevate" @click="selectCategory('Wahana Permainan')">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">FASILITAS WAHANA</span>
              <span class="rb-pill">Pilih wahana favorit Anda secara terpisah</span>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="role-btn hover-elevate" @click="selectCategory('Sewa Tempat')">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">SEWA HALL / BALLROOM</span>
              <span class="rb-pill">Pilih tanggal & paket penyewaan ruangan</span>
            </div>
          </div>
          
          <!-- Card 3 -->
          <div class="role-btn hover-elevate" @click="selectCategory('Wisata Edukasi')">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">WISATA EDUKASI</span>
              <span class="rb-pill">Pilih paket edukasi & sesuaikan jumlah peserta</span>
            </div>
          </div>
          
          <!-- Card 4 -->
          <div class="role-btn hover-elevate full-width-btn" @click="selectCategory('Booking Rombongan')">
            <div class="rb-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div class="rb-text">
              <span class="rb-title">BOOKING ROMBONGAN</span>
              <span class="rb-pill">Input jumlah pax, perhitungan harga tier otomatis</span>
            </div>
          </div>

        </div>

        <div class="back-link">
          <NuxtLink to="/" class="btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Kembali ke Beranda
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  background-color: #FDFCFB;
  min-height: 100vh;
  position: relative;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-x: hidden;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
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
  filter: blur(6px) brightness(0.85);
  z-index: -1;
}

.hero-content {
  text-align: center;
  z-index: 2;
  margin-bottom: 40px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.hashtag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}
.line-dash { width: 48px; height: 2px; background-color: #D97706; }
.ht-text { color: #D97706; font-size: 14px; font-weight: 800; letter-spacing: 3px; }

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

.hero-wave {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  width: 100%;
  line-height: 0;
  z-index: 2;
}
.hero-wave svg { display: block; width: 100%; height: 140px; }

/* --- MAIN FLOATING CARD --- */
.main-card-container {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 45vh;
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

.card-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.logo-img { height: 56px; object-fit: contain; }

.card-header-text { margin-bottom: 48px; }
.card-title {
  font-size: 19px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
}
.card-desc { font-size: 15px; color: #6B7280; margin: 0; }

/* --- GRID --- */
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
  border: 1.5px solid #C49F7A;
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

.role-btn:hover .rb-icon {
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

.back-link {
  text-align: center;
  margin-top: 60px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: color 0.2s;
}

.btn-back:hover { color: #D97706; }

@media (max-width: 768px) {
  .role-grid { grid-template-columns: 1fr; }
  .full-width-btn { max-width: 100% !important; }
  .main-card { padding: 32px 20px; margin: 0 16px; border-radius: 20px; }
  .hero-title { font-size: 38px; }
  .main-card-container { padding-top: 30vh; }
  .hero-section { background-position: center; }
  
  /* Allow text to wrap on mobile instead of cutting off */
  .rb-title { white-space: normal; line-height: 1.3; }
  .rb-pill { white-space: normal; overflow: visible; text-overflow: clip; padding: 6px 10px; line-height: 1.4; }
  
  /* Adjust button padding and icon size slightly for narrow screens */
  .role-btn { padding: 16px; gap: 16px; min-height: 90px; }
  
  /* Adjust headers */
  .card-title { font-size: 17px; }
  .card-desc { font-size: 13px; }
  .hero-subtitle { font-size: 14px; padding: 0 16px; }
}
</style>
