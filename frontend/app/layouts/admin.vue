<template>
  <div class="admin-layout">
    <!-- Authentic Organic Wave Sidebar (Matching Reference Image 1:1) -->
    <aside class="sidebar-container">
      <div class="sidebar-curved-wrapper">
        <!-- Inner Cream Section (Houses Full Logo and Nav Icons) -->
        <div class="sidebar-cream-body">
          <!-- Full Brand Logo without Container -->
          <NuxtLink to="/dashboard" class="sidebar-brand-link" title="Kampung Coklat Blitar">
            <img :src="logoImg" alt="Kampung Coklat" class="sidebar-full-logo" />
          </NuxtLink>

          <!-- Navigation Icons List (Swapped Order: Reports Above Wahana) -->
          <nav class="sidebar-nav-list">
            <!-- 1. Dashboard Utama -->
            <div class="nav-item-wrap">
              <NuxtLink 
                to="/dashboard" 
                exact-active-class="active" 
                class="nav-link-btn"
              >
                <div class="nav-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                  </svg>
                </div>
              </NuxtLink>
              <div class="nav-tooltip">
                <div class="tooltip-arrow"></div>
                <span>Dashboard Overview</span>
              </div>
            </div>

            <!-- 2. Reports & Data Analytics (SWAPPED TO TOP) -->
            <div class="nav-item-wrap">
              <NuxtLink 
                to="/reports" 
                exact-active-class="active" 
                class="nav-link-btn"
              >
                <div class="nav-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
              </NuxtLink>
              <div class="nav-tooltip">
                <div class="tooltip-arrow"></div>
                <span>Laporan &amp; Rekonsiliasi</span>
              </div>
            </div>

            <!-- 3. Katalog Wahana & Tiket (SWAPPED BELOW REPORTS) -->
            <div class="nav-item-wrap">
              <NuxtLink 
                to="/admin/config/tickets-rides" 
                exact-active-class="active" 
                class="nav-link-btn"
              >
                <div class="nav-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
              </NuxtLink>
              <div class="nav-tooltip">
                <div class="tooltip-arrow"></div>
                <span>Katalog &amp; Tarif Wahana</span>
              </div>
            </div>

            <!-- 4. Diskon & Promo CRM -->
            <template v-if="currentRole === 'admin'">
              <div class="nav-item-wrap">
                <NuxtLink 
                  to="/admin/config/discounts" 
                  exact-active-class="active" 
                  class="nav-link-btn"
                >
                  <div class="nav-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="3" />
                      <circle cx="8" cy="12" r="1.5" />
                      <path d="M13 9l3 6" />
                      <circle cx="16" cy="12" r="1.5" />
                    </svg>
                  </div>
                </NuxtLink>
                <div class="nav-tooltip">
                  <div class="tooltip-arrow"></div>
                  <span>Voucher Diskon &amp; Promo</span>
                </div>
              </div>

              <!-- 5. Role & Permission -->
              <div class="nav-item-wrap">
                <NuxtLink 
                  to="/admin/config/roles" 
                  exact-active-class="active" 
                  class="nav-link-btn"
                >
                  <div class="nav-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                </NuxtLink>
                <div class="nav-tooltip">
                  <div class="tooltip-arrow"></div>
                  <span>Manajemen Role (RBAC)</span>
                </div>
              </div>
            </template>
          </nav>
        </div>

        <!-- Bottom Deep Cocoa Section with Clean Admin Illustration Icon -->
        <div class="sidebar-cocoa-bottom">
          <div class="user-profile-btn" @click="showUserMenu = !showUserMenu" title="Menu Akun & Keluar">
            <!-- Clean Aesthetic Vector Admin Illustration Disc -->
            <div class="user-avatar-disc">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" class="admin-vector-svg">
                <!-- Soft Warm Background -->
                <circle cx="40" cy="40" r="38" fill="#FAF5EE"/>
                <!-- Neck & Shoulders -->
                <path d="M18 72 C18 56 30 52 40 52 C50 52 62 56 62 72 Z" fill="#3D2214"/>
                <!-- Tie/Collar Accent -->
                <polygon points="40,54 44,68 40,72 36,68" fill="#D97706"/>
                <polygon points="35,52 40,57 45,52 40,51" fill="#FFFFFF"/>
                <!-- Head -->
                <ellipse cx="40" cy="35" rx="15" ry="17" fill="#F8D3B4"/>
                <!-- Styled Hair -->
                <path d="M25 32 C25 20 32 15 45 15 C54 15 56 22 55 28 C50 25 42 24 35 27 C30 29 27 31 25 32 Z" fill="#2C1A13"/>
                <!-- Eyes & Friendly Smile -->
                <circle cx="34" cy="34" r="1.8" fill="#2C1A13"/>
                <circle cx="46" cy="34" r="1.8" fill="#2C1A13"/>
                <path d="M36 41 Q40 45 44 41" stroke="#2C1A13" stroke-width="1.8" fill="none" stroke-linecap="round"/>
              </svg>
              <span class="user-online-pip"></span>
            </div>
            <div class="user-title-row">
              <span class="user-role-text">{{ user.roleTitle }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="chevron-svg">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          <!-- Aesthetic User Popover Menu -->
          <div v-if="showUserMenu" class="user-menu-popover" @click.stop>
            <div class="menu-user-header">
              <div class="menu-name">{{ user.name }}</div>
              <div class="menu-role-chip">
                <span class="online-dot-mini"></span>
                <span>{{ user.roleTitle }}</span>
              </div>
            </div>
            <div class="menu-divider"></div>
            <NuxtLink to="/login" class="menu-logout-action">
              <div class="logout-icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div class="logout-text-col">
                <span class="logout-title">Keluar Sistem</span>
                <span class="logout-sub">Ganti Akun / Sesi</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="content-area" @click="showUserMenu = false">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const { user, currentRole } = useAuth()
const showUserMenu = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800;900&display=swap');

.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #FAF5EE;
  background-image: url('~/assets/assets_admin/bg-center.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  font-family: 'Jost', sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* ========================================================================= */
/* AUTHENTIC ORGANIC WAVE SIDEBAR (1:1 REFERENCE DESIGN)                     */
/* ========================================================================= */
.sidebar-container {
  width: 82px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.sidebar-curved-wrapper {
  width: 100%;
  height: 100%;
  background: #3D2214; /* Deep Roasted Cocoa Outer Frame */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-shadow: 4px 0 20px rgba(44, 26, 19, 0.15);
}

/* Top/Middle Cream Body with Organic Curved Cutout */
.sidebar-cream-body {
  flex: 1;
  background: #FAF5EE;
  border-radius: 0 0 38px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 24px 0;
  gap: 18px;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.12);
}

/* Full Brand Logo without Container */
.sidebar-brand-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  padding: 0 10px;
}

.sidebar-full-logo {
  width: 58px;
  max-height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.1));
  transition: transform 0.25s ease;
}

.sidebar-brand-link:hover .sidebar-full-logo {
  transform: scale(1.06);
}

/* Nav Icons List */
.sidebar-nav-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.nav-item-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link-btn {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7A5034;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  background: transparent;
}

.nav-link-btn:hover {
  background: #EDE2D4;
  color: #2C1A13;
  transform: translateY(-1px);
}

/* Active Nav Button: Warm Brown Rounded Squircle */
.nav-link-btn.active {
  background: #7E4122; /* Warm Amber Cocoa matching reference */
  color: #FFFFFF;
  box-shadow: 0 6px 14px rgba(126, 65, 34, 0.35);
  transform: scale(1.05);
}

.nav-link-btn.active .nav-icon-box {
  color: #FFFFFF;
}

/* Tooltip Hint on Hover (Clean & Clear) */
.nav-tooltip {
  position: absolute;
  left: 60px;
  background: #2C1A13;
  color: #FFFFFF;
  border: 1.5px solid #D97706;
  font-size: 11.5px;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  z-index: 2000;
  display: flex;
  align-items: center;
}

.tooltip-arrow {
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 5px solid #D97706;
}

.nav-item-wrap:hover .nav-tooltip {
  opacity: 1;
  visibility: visible;
  left: 68px;
}

/* Bottom Deep Cocoa Section with Clean Admin Illustration */
.sidebar-cocoa-bottom {
  background: #3D2214;
  padding: 16px 8px 18px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.user-profile-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.user-profile-btn:hover {
  transform: scale(1.06);
}

.user-avatar-disc {
  width: 40px;
  height: 40px;
  background: #FAF5EE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  border: 1.5px solid #FAF5EE;
}

.admin-vector-svg {
  width: 100%;
  height: 100%;
}

.user-online-pip {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 9px;
  height: 9px;
  background: #10B981;
  border: 2px solid #3D2214;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
}

.user-title-row {
  display: flex;
  align-items: center;
  gap: 3px;
}

.user-role-text {
  font-size: 9.5px;
  font-weight: 800;
  color: #FAF5EE;
  letter-spacing: 0.3px;
  max-width: 65px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-svg {
  color: #F59E0B;
}

/* Aesthetic User Popover Menu */
.user-menu-popover {
  position: absolute;
  left: 88px;
  bottom: 12px;
  background: #2C1A13;
  border: 1.5px solid #D97706;
  border-radius: 16px;
  padding: 14px 16px;
  width: 200px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
  z-index: 2500;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.92) translateX(-6px); }
  to { opacity: 1; transform: scale(1) translateX(0); }
}

.menu-user-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-name {
  font-size: 13px;
  font-weight: 800;
  color: #FFFFFF;
}

.menu-role-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(217, 119, 6, 0.2);
  border: 1px solid #D97706;
  color: #FBBF24;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 800;
  width: fit-content;
}

.online-dot-mini {
  width: 5px;
  height: 5px;
  background: #10B981;
  border-radius: 50%;
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.menu-logout-action {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 8px 12px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.menu-logout-action:hover {
  background: #EF4444;
  border-color: #EF4444;
}

.menu-logout-action:hover .logout-icon-wrap {
  background: #FFFFFF;
  color: #DC2626;
}

.menu-logout-action:hover .logout-title,
.menu-logout-action:hover .logout-sub {
  color: #FFFFFF;
}

.logout-icon-wrap {
  width: 26px;
  height: 26px;
  background: rgba(239, 68, 68, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FCA5A5;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.logout-text-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.logout-title {
  font-size: 11.5px;
  font-weight: 800;
  color: #FCA5A5;
}

.logout-sub {
  font-size: 9.5px;
  color: #D1D5DB;
}

/* ========================================================================= */
/* CONTENT AREA                                                              */
/* ========================================================================= */
.content-area {
  flex: 1;
  margin-left: 82px;
  padding: 24px 36px 40px 36px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 82px);
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
