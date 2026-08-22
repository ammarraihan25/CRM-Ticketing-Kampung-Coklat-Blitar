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
        <!-- CRM Menu -->
        <div class="nav-group">
          <h4 class="nav-group-title">MANAJEMEN CRM</h4>
          <NuxtLink to="/crm" exact-active-class="active" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="nav-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Data Member</span>
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
          
          <NuxtLink to="/login" class="btn-logout-icon" title="Tutup Kasir">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </NuxtLink>
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
  flex: 1;
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
