<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const selectCategory = (categoryName: string) => {
  router.push({
    path: '/ticketing_dan_gate/self-service/booking',
    query: { category: categoryName }
  })
}
</script>

<template>
  <div class="landing-page-wrapper">
    <div class="category-landing-container">
      <div class="category-header text-center">
        <h2 class="hero-title-main">Pilih Kategori Tiket Anda</h2>
        <p class="hero-subtitle-main">Pilih salah satu kategori di bawah ini untuk memulai pesanan Anda.</p>
      </div>

      <div class="category-grid">
        <!-- Card 1 -->
        <div class="category-card" @click="selectCategory('Tiket Masuk')">
          <div class="category-icon-wrapper">
            <div class="icon-blob"></div>
            <div class="category-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="18" height="8" rx="2"/><path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/><circle cx="12" cy="14" r="1"/></svg>
            </div>
          </div>
          <h4>Tiket Masuk (Gate)</h4>
          <p>Beli tiket reguler atau tiket terusan</p>
        </div>
        
        <!-- Card 1b (Wahana) -->
        <div class="category-card" @click="selectCategory('Wahana Permainan')">
          <div class="category-icon-wrapper">
            <div class="icon-blob"></div>
            <div class="category-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <h4>Fasilitas Wahana</h4>
          <p>Pilih wahana favorit Anda secara terpisah</p>
        </div>
        
        <!-- Card 2 -->
        <div class="category-card" @click="selectCategory('Sewa Tempat')">
          <div class="category-icon-wrapper">
            <div class="icon-blob"></div>
            <div class="category-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
            </div>
          </div>
          <h4>Sewa Hall / Ballroom</h4>
          <p>Pilih tanggal & paket penyewaan ruangan</p>
        </div>
        
        <!-- Card 3 -->
        <div class="category-card" @click="selectCategory('Wisata Edukasi')">
          <div class="category-icon-wrapper">
            <div class="icon-blob"></div>
            <div class="category-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
          </div>
          <h4>Wisata Edukasi</h4>
          <p>Pilih paket edukasi & sesuaikan jumlah peserta</p>
        </div>
        
        <!-- Card 4 -->
        <div class="category-card" @click="selectCategory('Booking Rombongan')">
          <div class="category-icon-wrapper">
            <div class="icon-blob"></div>
            <div class="category-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
          </div>
          <h4>Booking Rombongan</h4>
          <p>Input jumlah pax, perhitungan harga tier otomatis</p>
        </div>
      </div>
      
      <div class="back-link">
        <a href="javascript:history.back()" class="btn-back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Kembali ke Beranda
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page-wrapper {
  background-color: #fdfbf7; /* Very light cream/beige */
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 80px;
  font-family: 'Jost', sans-serif;
}

.category-landing-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center {
  text-align: center;
}

.category-header {
  margin-bottom: 50px;
}

.hero-title-main {
  font-size: 38px;
  font-weight: 800;
  color: #2c1a13; /* Kampung Coklat Dark Brown */
  margin: 0 0 15px 0;
  text-transform: capitalize;
}

.hero-subtitle-main {
  font-size: 16px;
  color: #6b5a54; /* Grayish brown */
  margin: 0;
  font-weight: 400;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;
}

.category-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 40px rgba(44, 26, 19, 0.05); /* Soft brown shadow */
  border: 1px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(44, 26, 19, 0.1);
  border-color: #f29727; /* Orange border on hover */
}

.category-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blob {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 45px;
  height: 45px;
  background-color: #fae8d4; /* Soft cream/orange blob */
  border-radius: 50%;
  z-index: 0;
}

.category-icon {
  position: relative;
  z-index: 1;
  color: #f29727; /* Brand Orange */
}

.category-card h4 {
  font-size: 20px;
  font-weight: 700;
  color: #2c1a13;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.category-card p {
  font-size: 13px;
  color: #8c7b75;
  margin: 0;
  line-height: 1.6;
  max-width: 90%;
}

.back-link {
  text-align: center;
  margin-top: 60px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #2c1a13;
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #f29727;
}

@media (max-width: 768px) {
  .landing-page-wrapper {
    padding-top: 40px;
  }
  .hero-title-main {
    font-size: 28px;
  }
  .category-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .category-card {
    padding: 30px 20px;
  }
}
</style>
