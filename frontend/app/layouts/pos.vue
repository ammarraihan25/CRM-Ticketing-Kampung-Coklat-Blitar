<script setup lang="ts">
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'
</script>

<template>
  <div class="pos-layout">
    <!-- Sidebar -->
    <aside class="pos-sidebar">
      <div class="sidebar-brand">
        <div class="logo-wrapper">
          <img :src="logoImg" alt="Kampung Coklat" class="sidebar-logo" />
        </div>
        <span class="badge-subtitle">Ticketing Admin</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li class="section-title">MAIN MENU</li>
          <li>
            <NuxtLink to="/pos/dashboard-kasir" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Dashboard Kasir
            </NuxtLink>
          </li>
          <li class="section-title">POS & GATE</li>
          <li>
            <NuxtLink to="/pos/tiket-masuk" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              Tiket Masuk (Gate)
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pos/wahana" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
              Fasilitas Wahana
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pos/sewa-hall" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Sewa Hall / Ballroom
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pos/edukasi" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              Wisata Edukasi
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pos/b2b" exact-active-class="active">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Booking Rombongan
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="pos-main-area">
      <!-- Header -->
      <header class="pos-header">
        <div class="header-title">
          <div class="header-text">
            <h2>Point of Sale</h2>
            <span>Sistem Kasir Terintegrasi</span>
          </div>
        </div>
        <div class="user-info">
          <div class="user-profile">
            <div class="avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="user-details">
              <span class="user-name">Kasir: Budi</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
          <div class="divider"></div>
          <NuxtLink to="/" class="btn-tutup-kasir">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Tutup Kasir
          </NuxtLink>
        </div>
      </header>
      
      <!-- Content -->
      <main class="pos-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.pos-layout {
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Sidebar Styling based on admin.vue / gate image */
.pos-sidebar {
  width: 240px;
  background-color: #2c1a13; /* Dark brown */
  color: #ffffff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 20;
}

.sidebar-brand {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sidebar-logo {
  height: 65px;
  object-fit: contain;
  display: block;
}

.badge-subtitle {
  background: rgba(242, 151, 39, 0.15);
  color: #f29727;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: 1px solid rgba(242, 151, 39, 0.2);
  width: 100%;
  text-align: center;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-nav .section-title {
  color: #8c7b75;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 15px;
  margin-bottom: 12px;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-nav .section-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.05);
}

.sidebar-nav ul li a {
  color: #e0d5d1;
  text-decoration: none;
  font-size: 14.5px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.menu-icon {
  opacity: 0.7;
  transition: opacity 0.25s, transform 0.25s;
}

.sidebar-nav ul li a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.sidebar-nav ul li a:hover .menu-icon {
  opacity: 1;
  transform: scale(1.1);
}

.sidebar-nav ul li a.active {
  background-color: rgba(242, 151, 39, 0.1);
  color: #f29727;
  font-weight: 600;
}

.sidebar-nav ul li a.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #f29727;
  border-radius: 0 4px 4px 0;
}

.sidebar-nav ul li a.active .menu-icon {
  opacity: 1;
  color: #f29727;
}

/* Main Area */
.pos-main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

/* Header Styling (unchanged, just adjusted padding) */
.pos-header {
  background-color: #ffffff;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.header-text h2 {
  color: #2c1a13;
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.2;
}

.header-text span {
  color: #8c7b75;
  font-size: 12px;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  background-color: #f29727;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(242, 151, 39, 0.2);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: #2c1a13;
  font-weight: 700;
  font-size: 14px;
}

.user-role {
  color: #8c7b75;
  font-size: 12px;
}

.divider {
  width: 1px;
  height: 32px;
  background-color: #eeeeee;
}

.btn-tutup-kasir {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff1f0;
  color: #e74c3c;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-tutup-kasir:hover {
  background-color: #e74c3c;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.2);
}

.pos-content {
  flex: 1;
  overflow: hidden;
}
</style>

<style>
/* Global CSS to hide scrollbars within the POS app for a cleaner UI */
.pos-layout *::-webkit-scrollbar {
  display: none !important;
}
.pos-layout * {
  -ms-overflow-style: none !important;  /* IE and Edge */
  scrollbar-width: none !important;  /* Firefox */
}
</style>
