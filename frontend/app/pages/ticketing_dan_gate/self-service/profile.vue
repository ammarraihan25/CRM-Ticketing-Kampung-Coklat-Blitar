<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

definePageMeta({
  layout: false,
  middleware: [
    function (to, from) {
      const isUserLoggedIn = useState('selfServiceAuth', () => false)
      if (!isUserLoggedIn.value) {
        return navigateTo('/ticketing_dan_gate/self-service/login')
      }
    }
  ]
})

const router = useRouter()
const isUserLoggedIn = useState('selfServiceAuth', () => false)
const savedUserName = useState('selfServiceUserName', () => 'Sobat Coklat')

const userName = ref(savedUserName.value)
const userEmail = useState('selfServiceUserEmail', () => `${userName.value.toLowerCase().replace(/\s/g, '')}@gmail.com`)
const userPhone = useState('selfServiceUserPhone', () => '+62 812-3456-7890')

const activeMemberships = useState<string[]>('selfServiceMembership', () => [])
const membershipType = computed(() => {
  if (activeMemberships.value.length === 0) return 'Belum Ada Membership'
  return `Member ${activeMemberships.value.join(', ')}`
})

const logout = () => {
  isUserLoggedIn.value = false
  router.push('/ticketing_dan_gate/self-service/login')
}

// Edit Profile Logic
const isEditing = ref(false)
const editForm = ref({
  name: '',
  email: '',
  phone: ''
})

const startEdit = () => {
  editForm.value = {
    name: userName.value,
    email: userEmail.value,
    phone: userPhone.value
  }
  isEditing.value = true
}

const saveEdit = () => {
  userName.value = editForm.value.name
  savedUserName.value = editForm.value.name // sync with global state
  userEmail.value = editForm.value.email
  userPhone.value = editForm.value.phone
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}
</script>

<template>
  <div class="profile-wrapper">
    <!-- Navbar -->
    <SelfServiceNavbar />

    <!-- Main Content -->
    <div class="dashboard-container">
      <!-- Sidebar Profile -->
      <aside class="sidebar">
        <div class="profile-card premium-profile">
          <div class="avatar-ring">
            <div class="avatar">{{ userName.charAt(0).toUpperCase() }}</div>
          </div>
          <h4 class="profile-name">{{ userName }}</h4>
          <span class="profile-tier">{{ membershipType }}</span>
        </div>

        <div class="sidebar-menu mt-6">
          <button class="menu-item text-red" @click="logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="inline mr-2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Keluar Akun
          </button>
        </div>
      </aside>

      <!-- Content Area -->
      <main class="content-area">
        
        <!-- Info Grid moved above Membership Cards -->
        <div class="info-grid mb-8">
          <div class="card-glass premium-glass" style="height: 100%;">
            <div class="glass-header">
              <h2 class="pane-title" style="font-size: 20px;">Data Diri</h2>
              <button v-if="!isEditing" @click="startEdit" class="edit-btn-icon" title="Edit Data Diri">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </div>

            <!-- View Mode -->
            <div v-if="!isEditing" class="data-list mt-2">
              <div class="data-item">
                <span class="data-label">Nama Lengkap</span>
                <span class="data-value">{{ userName }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Email</span>
                <span class="data-value">{{ userEmail }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">No. WhatsApp</span>
                <span class="data-value">{{ userPhone }}</span>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="edit-form-mode mt-4">
              <div class="input-group">
                <label>Nama Lengkap</label>
                <input type="text" v-model="editForm.name" class="modern-input" />
              </div>
              <div class="input-group">
                <label>Email</label>
                <input type="email" v-model="editForm.email" class="modern-input" />
              </div>
              <div class="input-group">
                <label>No. WhatsApp</label>
                <input type="tel" v-model="editForm.phone" class="modern-input" />
              </div>
              <div class="form-actions mt-4">
                <button class="btn-cancel" @click="cancelEdit">Batal</button>
                <button class="btn-primary" style="padding: 10px 20px;" @click="saveEdit">Simpan</button>
              </div>
            </div>
          </div>

          <div class="card-glass premium-glass" style="height: 100%;">
            <h2 class="pane-title" style="font-size: 20px;">Statistik Kunjungan</h2>
            <div class="stats-grid mt-2">
              <div class="stat-box-modern">
                <div class="stat-icon bg-orange-100 text-orange-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-num">12</span>
                  <span class="stat-label">Total Visit</span>
                </div>
              </div>
              <div class="stat-box-modern">
                <div class="stat-icon bg-blue-100 text-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div class="stat-content">
                  <span class="stat-num">3</span>
                  <span class="stat-label">Bulan Ini</span>
                </div>
              </div>
            </div>
            <div class="last-visit-modern mt-6">
              <div class="lvm-dot"></div>
              <span class="data-label">Kunjungan Terakhir:</span>
              <span class="data-value" style="margin-left: auto;">15 Agustus 2026</span>
            </div>
          </div>
        </div>

        <div class="card-glass">
          <div class="header-flex">
            <h2 class="pane-title">Kartu Keanggotaan Digital</h2>
            <div class="verified-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Verified
            </div>
          </div>
          
          <div v-if="activeMemberships.length > 0" class="memberships-list">
            <div v-for="(membership, index) in activeMemberships" :key="membership" class="member-card-premium" :class="membership.toLowerCase()">
              
              <!-- Background Elements for Premium Look -->
              <div class="card-glow"></div>
              <div class="card-pattern"></div>
              <div class="card-glare"></div>

              <div class="mc-header">
                <span class="mc-brand">KAMPUNG COKLAT VIP</span>
                <div class="mc-tier">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                  Member {{ membership }}
                </div>
              </div>

              <div class="mc-chip-row">
                <!-- Smart Chip SVG -->
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" class="smart-chip">
                  <rect width="40" height="30" rx="4" fill="#D4AF37" />
                  <path d="M10 0v30M30 0v30M0 10h40M0 20h40" stroke="#B8860B" stroke-width="1.5" opacity="0.6"/>
                  <rect x="15" y="8" width="10" height="14" rx="2" fill="#B8860B" opacity="0.8"/>
                </svg>
                <!-- Wireless Icon -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(90deg); margin-left: 12px;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </div>

              <div class="mc-body">
                <div class="mc-info">
                  <p class="mc-id-label">CARD NUMBER</p>
                  <p class="mc-id-number">KC-{{ (index+1)*1234 }} {{ Math.floor(Math.random() * 9000 + 1000) }} {{ Math.floor(Math.random() * 9000 + 1000) }}</p>
                  <h3 class="mc-cardholder">{{ userName }}</h3>
                  <div class="mc-status-premium">Active</div>
                </div>
                
                <div class="mc-qr-premium">
                  <div class="qr-corners"></div>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h6v6H3V3m2 2v2h2V5H5m8-2h6v6h-6V3m2 2v2h2V5h-2M3 15h6v6H3v-6m2 2v2h2v-2H5m8-2h2v2h-2v-2m-2 2h2v2h-2v-2m4 0h2v2h-2v-2m2-4h2v2h-2v-2m-4 6h2v2h-2v-2m-2-2h2v2h-2v-2m-2-4h2v2h-2v-2m4-2h2v2h-2v-2m-6 2h2v2H9v-2m-2 4h2v2H7v-2M15 9h2v2h-2V9m-4 4h2v2h-2v-2m2-2h2v2h-2V9M9 9h2v2H9V9m4-6h2v2h-2V3z"/></svg>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <div class="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <p>Anda belum terdaftar dalam program membership manapun.</p>
            <button class="btn-primary mt-4" @click="router.push('/ticketing_dan_gate/self-service/membership')">Daftar Sekarang</button>
          </div>
        </div>

      </main>
    </div>
    
    <SelfServiceFooter />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@700&display=swap');

.profile-wrapper {
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #334155;
  line-height: 1.6;
}
.dashboard-container {
  max-width: 1440px;
  margin: 48px auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}
@media (min-width: 992px) {
  .dashboard-container {
    grid-template-columns: 350px 1fr;
  }
}
.sidebar {
  display: flex;
  flex-direction: column;
}
.premium-profile {
  background: white;
  border-radius: 24px;
  padding: 40px 24px;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
  border: 1px solid rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
}
.premium-profile::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 120px;
  background: linear-gradient(135deg, #FDF4E3 0%, #FEF3C7 100%);
  z-index: 0;
}
.avatar-ring {
  position: relative;
  z-index: 1;
  padding: 6px;
  border: 4px solid white;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 16px;
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.15);
  background: #FFFBEB;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: white;
  font-size: 36px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-name {
  position: relative;
  z-index: 1;
  font-size: 24px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 6px 0;
}
.profile-tier {
  position: relative;
  z-index: 1;
  font-size: 14px;
  font-weight: 700;
  color: #D97706;
  background: #FEF3C7;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

.sidebar-menu {
  background: white;
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
}
.menu-item {
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 700;
  color: #EF4444;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}
.menu-item:hover {
  background: #FEF2F2;
}

.card-glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.04);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.pane-title {
  font-size: 24px;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
}
.verified-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #D1FAE5;
  color: #059669;
  font-weight: 800;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 20px;
}

/* PREMIUM MEMBER CARD */
.memberships-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.member-card-premium {
  position: relative;
  border-radius: 20px;
  padding: 32px;
  color: white;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255,255,255,0.2);
}
.member-card-premium:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 30px 50px -15px rgba(0,0,0,0.3);
}
.card-glow {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
.card-pattern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
  background-size: 24px 24px;
  z-index: 0;
}
.card-glare {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%);
  z-index: 0;
}

/* Card Themes */
.member-card-premium.pengajian {
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
}
.member-card-premium.regular {
  background: linear-gradient(135deg, #78350F 0%, #D97706 100%);
}
.member-card-premium.tour {
  background: linear-gradient(135deg, #4C1D95 0%, #8B5CF6 100%);
}

.mc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
.mc-brand {
  font-weight: 900;
  letter-spacing: 3px;
  font-size: 15px;
  opacity: 0.95;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.mc-tier {
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
}

.mc-chip-row {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  margin-top: 4px;
}

.mc-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 2;
}
.mc-info {
  display: flex;
  flex-direction: column;
}
.mc-id-label {
  font-size: 10px;
  font-weight: 700;
  opacity: 0.7;
  margin: 0 0 4px 0;
  letter-spacing: 1px;
}
.mc-id-number {
  margin: 0 0 16px 0;
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  letter-spacing: 2.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.mc-cardholder {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.mc-status-premium {
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  align-self: flex-start;
}
.mc-qr-premium {
  background: rgba(255,255,255,0.95);
  padding: 8px;
  border-radius: 12px;
  color: #0F172A;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  position: relative;
}
.qr-corners {
  position: absolute;
  top: 4px; left: 4px; right: 4px; bottom: 4px;
  border: 1px dashed rgba(15, 23, 42, 0.2);
  border-radius: 8px;
  pointer-events: none;
}

/* GRIDS */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}
@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.premium-glass {
  background: white;
  border: 1px solid #F1F5F9;
  border-radius: 20px;
}
.glass-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.edit-btn-icon {
  background: #F1F5F9;
  border: none;
  border-radius: 50%;
  width: 36px; height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}
.edit-btn-icon:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.data-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #E2E8F0;
}
.data-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.data-label {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.data-value {
  font-size: 16px;
  color: #1E293B;
  font-weight: 700;
}

/* EDIT FORM STYLES */
.edit-form-mode {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-group label {
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.modern-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 15px;
  color: #0F172A;
  font-family: inherit;
  font-weight: 600;
  background: #F8FAFC;
  transition: all 0.2s;
}
.modern-input:focus {
  outline: none;
  border-color: #D97706;
  background: white;
  box-shadow: 0 0 0 4px rgba(217,119,6,0.1);
}
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
.btn-cancel {
  padding: 10px 20px;
  background: #F1F5F9;
  border: none;
  border-radius: 10px;
  color: #64748B;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover {
  background: #E2E8F0;
  color: #0F172A;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.stat-box-modern {
  background: #F8FAFC;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #F1F5F9;
  transition: transform 0.2s;
}
.stat-box-modern:hover {
  transform: translateY(-2px);
  background: #F1F5F9;
}
.stat-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-orange-100 { background: #FFEDD5; }
.text-orange-600 { color: #EA580C; }
.bg-blue-100 { background: #DBEAFE; }
.text-blue-600 { color: #2563EB; }

.stat-content {
  display: flex;
  flex-direction: column;
}
.stat-num {
  font-size: 24px;
  font-weight: 900;
  color: #0F172A;
  line-height: 1.2;
}
.stat-label {
  font-size: 13px;
  color: #64748B;
  font-weight: 600;
}

.last-visit-modern {
  display: flex;
  align-items: center;
  background: #F1F5F9;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
}
.lvm-dot {
  width: 8px; height: 8px;
  background: #10B981;
  border-radius: 50%;
  margin-right: 12px;
  box-shadow: 0 0 0 4px #D1FAE5;
}

.btn-primary {
  padding: 12px 24px;
  background-color: #D97706;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background-color: #B45309;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #F8FAFC;
  border-radius: 20px;
  border: 2px dashed #CBD5E1;
}
.empty-icon {
  color: #94A3B8;
  margin-bottom: 20px;
}
.empty-state p {
  color: #64748B;
  font-size: 16px;
  font-weight: 500;
}

.mb-8 { margin-bottom: 32px; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.inline { display: inline; }
.mr-2 { margin-right: 8px; }

@media (max-width: 768px) {
  .dashboard-container {
    margin: 24px auto;
    padding: 0 16px;
    gap: 24px;
  }
  .card-glass {
    padding: 24px 20px;
  }
  .premium-profile {
    padding: 32px 20px 24px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .member-card-premium {
    padding: 24px 20px;
    gap: 16px;
  }
  .mc-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .mc-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  .mc-id-number {
    font-size: 14px;
    letter-spacing: 1px;
  }
  .mc-cardholder {
    font-size: 16px;
  }
  .mc-qr-premium {
    align-self: center;
  }
}
</style>
