<template>
  <div class="landing-wrapper">
    <div class="landing-container">
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
        <!-- POS Kasir -->
        <NuxtLink to="/pos" class="module-card">
          <div class="module-icon" style="background: #fffdf5; color: #d35400; border: 1px solid #fce4ce;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <div class="module-info">
            <h3>Point of Sale (POS)</h3>
            <p>Sistem kasir tiket, wahana, edukasi, b2b & fasilitas</p>
          </div>
        </NuxtLink>
        
        <!-- Self Service -->
        <NuxtLink to="/ticketing_dan_gate/self-service" class="module-card">
          <div class="module-icon" style="background: #eefcf1; color: #166534; border: 1px solid #dcfce7;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div class="module-info">
            <h3>Kios Self-Service</h3>
            <p>Pembelian tiket mandiri oleh pengunjung</p>
          </div>
        </NuxtLink>
        
        <!-- Guestbook -->
        <NuxtLink to="/guestbook" class="module-card">
          <div class="module-icon" style="background: #fdf3eb; color: #d35400; border: 1px solid #fce4ce;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="module-info">
            <h3>Guestbook Digital</h3>
            <p>Buku tamu digital & registrasi kunjungan</p>
          </div>
        </NuxtLink>
        
        <!-- Gate -->
        <NuxtLink to="/gate" class="module-card">
          <div class="module-icon" style="background: #f3ece7; color: #4a2c1d; border: 1px solid #e5d5c5;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <div class="module-info">
            <h3>Sistem Gate Masuk</h3>
            <p>Pemindaian barcode/QR untuk akses area</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-wrapper {
  background-color: #f5f2eb; /* Earthy cream background */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
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
  border: 1px solid #fce4ce;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  background-color: #f29727; /* Kampung Coklat Orange */
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
  background: #fffdf5;
  border: 1px solid #fce4ce;
  padding: 24px;
  border-radius: 16px;
  text-decoration: none;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(242, 151, 39, 0.1);
  border-color: #f29727;
  background: #ffffff;
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

@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: 1fr;
  }
  .landing-container {
    padding: 30px 20px;
  }
}
</style>
