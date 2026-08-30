<template>
  <div class="admin-layout">
    <!-- Expanded Dark Theme Sidebar (Matches Reference Image 2) -->
    <aside class="sidebar-container">
      <div class="sidebar-brand-section">
        <NuxtLink to="/dashboard" class="brand-link" title="Kampung Coklat">
          <img :src="logoImg" alt="Kampung Coklat" class="brand-logo" />
        </NuxtLink>
        <div class="role-pill">
          {{ pageTitle }}
        </div>
      </div>

      <div class="sidebar-nav-section">
        <!-- Main Menu -->
        <div v-if="hasVisibleMainMenu" class="nav-group">
          <h4 class="nav-group-title">MAIN MENU</h4>
          
          <NuxtLink v-if="canAccessModule('dashboard')" to="/dashboard" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
            </svg>
            <span>{{ currentRole === 'owner' ? 'Dashboard Eksekutif' : 'Dashboard Overview' }}</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('diskon_promo')" to="/dashboard/crm" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>{{ currentRole === 'owner' ? 'CRM Member Analytics' : 'CRM Member' }}</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('diskon_promo') && currentRole !== 'owner'" to="/dashboard/daftar-membership" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Daftar Membership</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('diskon_promo')" to="/dashboard/crm-guestbook" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>CRM Guestbook</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('laporan_ekspor')" to="/reports" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>Laporan &amp; Rekonsiliasi</span>
          </NuxtLink>

          <!-- POS Kasir Terminal link for roles with pos_terminal permission -->
          <NuxtLink v-if="canAccessModule('pos_terminal') && currentRole !== 'kasir'" to="/pos/tiket-masuk" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
            <span>POS Kasir Tiket</span>
          </NuxtLink>
        </div>

        <!-- POS Cashier Modules for Kasir Role -->
        <div v-if="hasVisiblePosMenu" class="nav-group">
          <h4 class="nav-group-title">LOKET PENJUALAN POS</h4>
          
          <NuxtLink to="/pos/tiket-masuk" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
            </svg>
            <span>Tiket Masuk Reguler</span>
          </NuxtLink>

          <NuxtLink to="/pos/wahana" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
            <span>Wahana &amp; Atraksi</span>
          </NuxtLink>

          <NuxtLink to="/pos/edukasi" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"/>
            </svg>
            <span>Paket Edukasi</span>
          </NuxtLink>

          <NuxtLink to="/pos/sewa-hall" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M3 21h18M3 7v14M21 7v14M6 7V4a1 1 0 011-1h10a1 1 0 011 1v3M9 21v-6h6v6"/>
            </svg>
            <span>Sewa Hall &amp; Venue</span>
          </NuxtLink>

          <NuxtLink to="/pos/b2b" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Rombongan &amp; B2B</span>
          </NuxtLink>
        </div>

        <!-- Konfigurasi & Operasional -->
        <div v-if="hasVisibleConfigMenu" class="nav-group">
          <h4 class="nav-group-title">{{ currentRole === 'admin' ? 'KONFIGURASI SISTEM' : 'MANAJEMEN OPERASIONAL' }}</h4>
          
          <NuxtLink v-if="canAccessModule('tarif_wahana')" to="/admin/config/tickets-rides" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Tarif Tiket Masuk</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('tarif_wahana')" to="/admin/config/wahana" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
            <span>Status Wahana</span>
          </NuxtLink>
          
          <NuxtLink v-if="canAccessModule('diskon_promo') && canWriteModule('diskon_promo')" to="/admin/config/discounts" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <rect x="2" y="6" width="20" height="12" rx="3" />
              <circle cx="8" cy="12" r="1.5" />
              <path d="M13 9l3 6" />
              <circle cx="16" cy="12" r="1.5" />
            </svg>
            <span>Voucher Diskon &amp; Promo</span>
          </NuxtLink>

          <NuxtLink v-if="canAccessModule('manajemen_rbac')" to="/admin/config/roles" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Manajemen Role (RBAC)</span>
          </NuxtLink>
        </div>
      </div>

      <!-- User Profile and Logout -->
      <div class="sidebar-footer">
        <div class="user-profile-btn" style="padding: 12px; gap: 10px;">
          <div class="user-avatar-disc" style="background: linear-gradient(135deg, #F59E0B, #D97706); display: flex; justify-content: center; align-items: center; border-radius: 50%; color: #FFFFFF; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="user-online-pip"></span>
          </div>
          
          <div class="user-details" style="flex: 1; min-width: 0; display: flex; flex-direction: column;">
            <span class="user-name-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 13.5px;">{{ user.name }}</span>
            <span class="user-role-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 11.5px; opacity: 0.9;">{{ user.roleTitle }}</span>
          </div>
          
          <button type="button" @click="logout" class="btn-logout-icon" style="background: transparent; border: none; cursor: pointer; color: #A89382;" :title="currentRole === 'kasir' ? 'Tutup Kasir' : 'Keluar Sesi'">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="content-area">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRoute } from 'vue-router'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const { user, currentRole, canAccessModule, canWriteModule, logout } = useAuth()
const route = useRoute()

const pageTitle = computed(() => {
  if (currentRole.value === 'admin') return 'SUPER ADMIN'
  if (currentRole.value === 'manager') return 'OPERATIONAL MANAGER'
  if (currentRole.value === 'owner') return 'OWNER / DIREKSI'
  if (currentRole.value === 'kasir') return 'KASIR LOKET'
  return 'TICKETING ADMIN'
})

const hasVisibleMainMenu = computed(() => {
  return canAccessModule('dashboard') || 
         canAccessModule('diskon_promo') || 
         canAccessModule('laporan_ekspor') || 
         (canAccessModule('pos_terminal') && currentRole.value !== 'kasir')
})

const hasVisiblePosMenu = computed(() => {
  return canAccessModule('pos_terminal') && currentRole.value === 'kasir'
})

const hasVisibleConfigMenu = computed(() => {
  return canAccessModule('tarif_wahana') || 
         (canAccessModule('diskon_promo') && canWriteModule('diskon_promo')) || 
         canAccessModule('manajemen_rbac')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');

.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #F8F6F4;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* ========================================================================= */
/* EXPANDED DARK SIDEBAR (MATCHING REFERENCE 2)                              */
/* ========================================================================= */
.sidebar-container {
  width: 260px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: #23130C; /* Dark Brown */
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  justify-content: space-between;
}

.sidebar-brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.brand-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
}

.sidebar-collapsed .brand-top {
  justify-content: center;
}

.collapse-btn {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #A89382;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #FFF;
}

.brand-link {
  display: block;
}

.brand-logo {
  width: 140px;
  object-fit: contain;
}

.role-pill {
  background: #422918;
  color: #F59E0B;
  font-size: 11.5px;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 8px;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
}

.sidebar-nav-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-group-title {
  color: #8C786E;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.nav-group-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #422918;
  margin-left: 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #E6D5C3;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
}

.nav-link span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-icon {
  color: #A89382;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}

.nav-link:hover .nav-icon {
  color: #FFFFFF;
}

.nav-link.active {
  background: #3D2214;
  color: #FFFFFF;
  font-weight: 600;
}

.nav-link.active .nav-icon {
  color: #F59E0B;
}

/* ========================================================================= */
/* SIDEBAR FOOTER                                                            */
/* ========================================================================= */
.sidebar-footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-profile-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.user-avatar-disc {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.admin-vector-svg {
  width: 100%;
  height: 100%;
}

.user-online-pip {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #10B981;
  border: 2px solid #23130C;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.user-name-text {
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role-text {
  color: #A89382;
  font-size: 11px;
}

.btn-tutup-kasir {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: transparent;
  color: #EF4444;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(239, 68, 68, 0.3);
  transition: all 0.2s ease;
}

.btn-tutup-kasir:hover {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.5);
}

/* ========================================================================= */
/* CONTENT AREA                                                              */
/* ========================================================================= */
.content-area {
  flex: 1;
  margin-left: 260px;
  padding: 24px 36px 40px 36px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 260px);
}

@media (max-width: 768px) {
  .sidebar-container {
    width: 64px;
  }
  .content-area {
    margin-left: 64px;
    padding: 16px;
    width: calc(100% - 64px);
  }
  .user-role-text {
    display: none;
  }
}

.btn-logout-icon {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  color: #F87171;
  text-decoration: none;
  transition: all 0.2s ease;
}
.btn-logout-icon:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}
</style>
