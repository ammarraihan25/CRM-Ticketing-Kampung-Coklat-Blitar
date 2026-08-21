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
        <div class="nav-group">
          <h4 class="nav-group-title">MAIN MENU</h4>
          <NuxtLink to="/dashboard" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="nav-icon">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
            </svg>
            <span>Dashboard Overview</span>
          </NuxtLink>
          <NuxtLink to="/crm" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>CRM Member</span>
          </NuxtLink>
          <NuxtLink to="/reports" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <span>Laporan &amp; Rekonsiliasi</span>
          </NuxtLink>
        </div>

        <!-- Konfigurasi -->
        <div class="nav-group">
          <h4 class="nav-group-title">KONFIGURASI</h4>
          <NuxtLink to="/admin/config/tickets-rides" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Tarif Tiket Masuk</span>
          </NuxtLink>

          <NuxtLink to="/admin/config/wahana" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
            </svg>
            <span>Status Wahana</span>
          </NuxtLink>
          
          <template v-if="currentRole === 'admin'">
            <NuxtLink to="/admin/config/discounts" exact-active-class="active" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
                <rect x="2" y="6" width="20" height="12" rx="3" />
                <circle cx="8" cy="12" r="1.5" />
                <path d="M13 9l3 6" />
                <circle cx="16" cy="12" r="1.5" />
              </svg>
              <span>Voucher Diskon &amp; Promo</span>
            </NuxtLink>

            <NuxtLink to="/admin/config/roles" exact-active-class="active" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Manajemen Role (RBAC)</span>
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- User Profile and Logout -->
      <div class="sidebar-footer">
        <div class="user-profile-btn" title="Profil Anda">
          <div class="user-avatar-disc">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" class="admin-vector-svg">
              <circle cx="40" cy="40" r="38" fill="#FAF5EE"/>
              <path d="M18 72 C18 56 30 52 40 52 C50 52 62 56 62 72 Z" fill="#3D2214"/>
              <polygon points="40,54 44,68 40,72 36,68" fill="#D97706"/>
              <polygon points="35,52 40,57 45,52 40,51" fill="#FFFFFF"/>
              <ellipse cx="40" cy="35" rx="15" ry="17" fill="#F8D3B4"/>
              <path d="M25 32 C25 20 32 15 45 15 C54 15 56 22 55 28 C50 25 42 24 35 27 C30 29 27 31 25 32 Z" fill="#2C1A13"/>
              <circle cx="34" cy="34" r="1.8" fill="#2C1A13"/>
              <circle cx="46" cy="34" r="1.8" fill="#2C1A13"/>
              <path d="M36 41 Q40 45 44 41" stroke="#2C1A13" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            </svg>
            <span class="user-online-pip"></span>
          </div>
          <div class="user-details">
            <span class="user-name-text">{{ user.name }}</span>
            <span class="user-role-text">{{ user.roleTitle }}</span>
          </div>
        </div>

        <NuxtLink to="/login" class="btn-tutup-kasir">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Tutup Kasir</span>
        </NuxtLink>
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

const { user, currentRole } = useAuth()
const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('dashboard')) return 'DASHBOARD KASIR'
  if (path.includes('crm')) return 'CRM MEMBER'
  if (path.includes('reports')) return 'LAPORAN & REKAP'
  if (path.includes('config')) return 'KONFIGURASI SISTEM'
  return 'TICKETING ADMIN'
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
  border-radius: 12px;
  background: #FEF2F2;
  color: #EF4444;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #FEE2E2;
  transition: all 0.2s ease;
}

.btn-tutup-kasir:hover {
  background: #FEE2E2;
  border-color: #FCA5A5;
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
</style>
