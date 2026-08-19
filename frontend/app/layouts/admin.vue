<template>
  <div class="admin-layout">
    <!-- Slim Luxury Icon Rail Sidebar (Reference Design with Curved Protrusion & Concise Chat Bubble Tooltips) -->
    <aside class="sidebar-rail">
      <!-- Top Miniature Brand Logo -->
      <div class="rail-top">
        <NuxtLink to="/dashboard" class="rail-brand-chip" title="Kampung Coklat Enterprise">
          <img :src="logoImg" alt="Kampung Coklat" class="rail-brand-img" />
          <span class="brand-live-dot"></span>
        </NuxtLink>
      </div>

      <!-- Navigation Menu (Icons Only with Concise Chat Bubble Tooltips) -->
      <nav class="rail-nav">
        <!-- 1. Dashboard Utama -->
        <div class="rail-item-wrapper">
          <NuxtLink 
            to="/dashboard" 
            exact-active-class="active" 
            class="rail-link"
          >
            <div class="active-bulge"></div>
            
            <div class="rail-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <span class="rail-active-dot"></span>
          </NuxtLink>

          <!-- Concise Chat Bubble Tooltip -->
          <div class="chat-bubble-tooltip">
            <div class="bubble-arrow"></div>
            <span class="bubble-title-concise">Dashboard Utama</span>
          </div>
        </div>

        <!-- 2. Reports & Analytics -->
        <div class="rail-item-wrapper">
          <NuxtLink 
            to="/reports" 
            exact-active-class="active" 
            class="rail-link"
          >
            <div class="active-bulge"></div>

            <div class="rail-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <span class="rail-active-dot"></span>
          </NuxtLink>

          <!-- Concise Chat Bubble Tooltip -->
          <div class="chat-bubble-tooltip">
            <div class="bubble-arrow"></div>
            <span class="bubble-title-concise">Reports &amp; Data Analytics</span>
          </div>
        </div>

        <!-- Section 3: Konfigurasi Admin (Only Super Admin) -->
        <template v-if="currentRole === 'admin'">
          <div class="rail-divider"></div>

          <!-- 3. Tarif Tiket & Wahana -->
          <div class="rail-item-wrapper">
            <NuxtLink 
              to="/admin/config/tickets-rides" 
              exact-active-class="active" 
              class="rail-link"
            >
              <div class="active-bulge"></div>

              <div class="rail-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M2 11a2 2 0 0 1 0 2M22 11a2 2 0 0 0 0 2M12 6v2M12 16v2"/>
                </svg>
              </div>
              <span class="rail-active-dot"></span>
            </NuxtLink>

            <!-- Concise Chat Bubble Tooltip -->
            <div class="chat-bubble-tooltip">
              <div class="bubble-arrow"></div>
              <span class="bubble-title-concise">Tarif Tiket &amp; Wahana</span>
            </div>
          </div>

          <!-- 4. Diskon & Promo CRM -->
          <div class="rail-item-wrapper">
            <NuxtLink 
              to="/admin/config/discounts" 
              exact-active-class="active" 
              class="rail-link"
            >
              <div class="active-bulge"></div>

              <div class="rail-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="M9 9h.01" />
                  <path d="M15 15h.01" />
                </svg>
              </div>
              <span class="rail-active-dot"></span>
            </NuxtLink>

            <!-- Concise Chat Bubble Tooltip -->
            <div class="chat-bubble-tooltip">
              <div class="bubble-arrow"></div>
              <span class="bubble-title-concise">Diskon &amp; Promo CRM</span>
            </div>
          </div>

          <!-- 5. Role & Permission -->
          <div class="rail-item-wrapper">
            <NuxtLink 
              to="/admin/config/roles" 
              exact-active-class="active" 
              class="rail-link"
            >
              <div class="active-bulge"></div>

              <div class="rail-icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span class="rail-active-dot"></span>
            </NuxtLink>

            <!-- Concise Chat Bubble Tooltip -->
            <div class="chat-bubble-tooltip">
              <div class="bubble-arrow"></div>
              <span class="bubble-title-concise">Role &amp; Permission</span>
            </div>
          </div>
        </template>
      </nav>

      <!-- Bottom User Profile & Logout -->
      <div class="rail-bottom">
        <!-- User Avatar with Bubble Tooltip -->
        <div class="rail-item-wrapper">
          <div class="rail-user-avatar">
            <span>{{ user.avatar }}</span>
          </div>

          <!-- Concise Chat Bubble Tooltip -->
          <div class="chat-bubble-tooltip">
            <div class="bubble-arrow"></div>
            <span class="bubble-title-concise">{{ user.name }} &bull; {{ user.roleTitle }}</span>
          </div>
        </div>

        <!-- Logout Action -->
        <div class="rail-item-wrapper">
          <NuxtLink to="/login" class="rail-logout-btn" title="Keluar dari sesi">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </NuxtLink>

          <!-- Concise Chat Bubble Tooltip -->
          <div class="chat-bubble-tooltip">
            <div class="bubble-arrow"></div>
            <span class="bubble-title-concise">Keluar / Ganti Peran</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area with Clean, Balanced Spacing -->
    <main class="content-area">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const { user, currentRole } = useAuth()
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #F8F5F0;
  font-family: 'Jost', sans-serif;
  overflow-x: hidden;
  position: relative;
}

/* ========================================================================= */
/* SLIM ICON RAIL SIDEBAR (With Reference Smooth Bulge & Chat Bubble Tooltips)*/
/* ========================================================================= */
.sidebar-rail {
  width: 68px;
  background: #3D2214; /* Warm Cocoa Brown matching reference */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  box-shadow: 3px 0 16px rgba(28, 14, 8, 0.18);
}

/* Top Miniature Brand Logo */
.rail-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.rail-brand-chip {
  width: 42px;
  height: 42px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1.5px solid #F29727;
  position: relative;
  transition: transform 0.25s ease;
  text-decoration: none;
}

.rail-brand-chip:hover {
  transform: scale(1.06);
}

.rail-brand-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-live-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: #10B981;
  border: 1.5px solid #3D2214;
  border-radius: 50%;
  box-shadow: 0 0 5px #10B981;
}

/* Navigation Links Rail */
.rail-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  flex: 1;
}

.rail-divider {
  width: 28px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
  border-radius: 2px;
}

/* Item Wrapper */
.rail-item-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Individual Rail Link */
.rail-link {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C9B8AF;
  text-decoration: none;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.rail-icon-box {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  position: relative;
  z-index: 2;
}

.rail-link:hover .rail-icon-box {
  color: #F29727;
  background: rgba(255, 255, 255, 0.08);
  transform: scale(1.06);
}

/* Active Indicator Dot */
.rail-active-dot {
  display: none;
  width: 4px;
  height: 4px;
  background: #F29727;
  border-radius: 50%;
  position: absolute;
  right: 6px;
  z-index: 3;
  box-shadow: 0 0 5px #F29727;
}

/* ========================================================================= */
/* ACTIVE TAB BULGE PROTRUSION (Matching Reference Screenshot)               */
/* ========================================================================= */
.rail-link.active {
  color: #FFFFFF;
}

.rail-link.active .rail-icon-box {
  color: #FFFFFF;
  background: #F29727;
  box-shadow: 0 3px 12px rgba(242, 151, 39, 0.45);
  transform: scale(1.05);
}

.rail-link.active .rail-active-dot {
  display: block;
}

/* Smooth Protrusion Tab on the Right Edge */
.rail-link.active .active-bulge {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 32px;
  background: #3D2214;
  border-radius: 0 16px 16px 0;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}

/* ========================================================================= */
/* CONCISE CHAT BUBBLE TOOLTIP POPOVER (Crisp, Single-Line, No Long Text)    */
/* ========================================================================= */
.chat-bubble-tooltip {
  position: absolute;
  left: 78px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  background: linear-gradient(135deg, #2C1A13 0%, #170C06 100%);
  border: 1px solid #F29727;
  border-radius: 10px;
  padding: 6px 14px;
  white-space: nowrap;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35), 0 0 10px rgba(242, 151, 39, 0.2);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 200;
  display: flex;
  align-items: center;
}

/* Arrow / Tail pointing left */
.bubble-arrow {
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 6px solid #F29727;
}

.bubble-title-concise {
  font-size: 12.5px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.2px;
}

/* Show Bubble on Hover */
.rail-item-wrapper:hover .chat-bubble-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
}

/* ========================================================================= */
/* RAIL BOTTOM: USER AVATAR & LOGOUT                                         */
/* ========================================================================= */
.rail-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.rail-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(217, 119, 6, 0.35);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease;
}

.rail-user-avatar:hover {
  transform: scale(1.06);
}

.rail-logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #D3C9C2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
}

.rail-logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #EF4444;
  color: #F87171;
  transform: scale(1.06);
}

/* ========================================================================= */
/* CONTENT AREA BALANCED PADDING (Clean separation, not too close / far)     */
/* ========================================================================= */
.content-area {
  flex: 1;
  margin-left: 68px;
  padding: 24px 36px 40px 36px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 68px);
  background: #F8F5F0;
}

@media (max-width: 768px) {
  .sidebar-rail {
    width: 56px;
  }
  .content-area {
    margin-left: 56px;
    padding: 16px 18px;
    width: calc(100% - 56px);
  }
  .chat-bubble-tooltip {
    left: 64px;
  }
}
</style>
