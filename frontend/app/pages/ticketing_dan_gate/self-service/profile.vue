<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import imgPengajian from '~/assets/assets_member/member pengajian.png'
import imgRegular from '~/assets/assets_member/member regular.png'
import imgTour from '~/assets/assets_member/member tour.png'

const getMembershipImage = (type: string) => {
  const t = type.toLowerCase()
  if (t === 'pengajian') return imgPengajian
  if (t === 'regular' || t === 'reguler') return imgRegular
  if (t === 'tour') return imgTour
  return imgRegular
}

definePageMeta({
  layout: false,
  middleware: [
    function (to, from) {
      const authCookie = useCookie('selfServiceAuth')
      if (authCookie.value !== 'true') {
        return navigateTo('/ticketing_dan_gate/self-service/login')
      }
    }
  ]
})

const router = useRouter()
const authCookie = useCookie('selfServiceAuth')
const userCookie = useCookie('selfServiceUserName')

const savedUserName = useState('selfServiceUserName', () => userCookie.value || 'Sobat Coklat')
const userName = ref(savedUserName.value)
const userEmail = ref(`${userName.value.toLowerCase().replace(/\s/g, '')}@gmail.com`)
const userPhone = ref('+62 812-3456-7890')

const userPhoto = useState<string | null>('selfServiceUserPhoto', () => null)
const photoInput = ref<HTMLInputElement | null>(null)

const triggerPhotoUpload = () => {
  if (photoInput.value) {
    photoInput.value.click()
  }
}

const handlePhotoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    userPhoto.value = URL.createObjectURL(file)
  }
}

const activeMemberships = useState<string[]>('selfServiceMembership', () => [])
const membershipType = computed(() => {
  if (activeMemberships.value.length === 0) return 'Belum Ada Membership'
  return `Member ${activeMemberships.value.join(', ')}`
})

const logout = () => {
  authCookie.value = 'false'
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
  userCookie.value = editForm.value.name // sync with cookie
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
          <div class="profile-banner"></div>
          <div class="avatar-container">
            <div class="avatar-ring">
              <div class="avatar">
                <img v-if="userPhoto" :src="userPhoto" class="avatar-img" />
                <span v-else>{{ userName.charAt(0).toUpperCase() }}</span>
              </div>
            </div>
            <button class="edit-photo-badge" @click="triggerPhotoUpload" title="Ubah Foto Profil">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </button>
            <input type="file" ref="photoInput" @change="handlePhotoUpload" style="display:none" accept="image/*" />
          </div>
          <div class="profile-info">
            <h4 class="profile-name">{{ userName }}</h4>
            <span class="profile-tier">{{ membershipType }}</span>
          </div>
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
            <div v-if="!isEditing" class="data-list mt-4">
              <div class="data-item modern-data-item">
                <div class="di-icon bg-blue-50 text-blue-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div class="di-content">
                  <span class="data-label">Nama Lengkap</span>
                  <span class="data-value">{{ userName }}</span>
                </div>
              </div>
              <div class="data-item modern-data-item">
                <div class="di-icon bg-orange-50 text-orange-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="di-content">
                  <span class="data-label">Email</span>
                  <span class="data-value">{{ userEmail }}</span>
                </div>
              </div>
              <div class="data-item modern-data-item">
                <div class="di-icon bg-green-50 text-green-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="di-content">
                  <span class="data-label">No. WhatsApp</span>
                  <span class="data-value">{{ userPhone }}</span>
                </div>
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
            <div class="stats-grid mt-4">
              <div class="stat-card-gradient orange-grad">
                <div class="sc-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="sc-body">
                  <span class="sc-num">12</span>
                  <span class="sc-label">Total Visit</span>
                </div>
              </div>
              <div class="stat-card-gradient blue-grad">
                <div class="sc-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div class="sc-body">
                  <span class="sc-num">3</span>
                  <span class="sc-label">Bulan Ini</span>
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
            <div v-for="(membership, index) in activeMemberships" :key="membership" class="digital-card-container">
              <!-- Graphic Left -->
              <div class="dc-graphic">
                <img :src="getMembershipImage(membership)" class="dc-img" alt="Membership Card Graphic" />
              </div>
              
              <!-- Data Right -->
              <div class="dc-data">
                <div class="dc-header">
                  <h3 class="dc-brand">KAMPUNG COKLAT VIP</h3>
                  <div class="dc-status-badge">Active</div>
                </div>

                <div class="dc-info-row">
                  <div class="dc-details">
                    <p class="dc-label">CARD NUMBER</p>
                    <p class="dc-number">KC-{{ (index+1)*1234 }} {{ Math.floor(Math.random() * 9000 + 1000) }} {{ Math.floor(Math.random() * 9000 + 1000) }}</p>
                    <p class="dc-label mt-4">CARDHOLDER</p>
                    <h3 class="dc-name">{{ userName }}</h3>
                  </div>
                  
                  <div class="dc-qr-wrapper">
                    <div class="dc-qr-box">
                      <svg class="dc-qr-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h6v6H3V3m2 2v2h2V5H5m8-2h6v6h-6V3m2 2v2h2V5h-2M3 15h6v6H3v-6m2 2v2h2v-2H5m8-2h2v2h-2v-2m-2 2h2v2h-2v-2m4 0h2v2h-2v-2m2-4h2v2h-2v-2m-4 6h2v2h-2v-2m-2-2h2v2h-2v-2m-2-4h2v2h-2v-2m4-2h2v2h-2v-2m-6 2h2v2H9v-2m-2 4h2v2H7v-2M15 9h2v2h-2V9m-4 4h2v2h-2v-2m2-2h2v2h-2V9M9 9h2v2H9V9m4-6h2v2h-2V3z"/></svg>
                    </div>
                  </div>
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
  padding: 0 0 32px 0;
  text-align: center;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
  border: 1px solid rgba(255,255,255,0.8);
  position: relative;
  overflow: hidden;
}
.profile-banner {
  height: 120px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  position: relative;
}
.profile-banner::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40px;
  background: white;
  border-radius: 100% 100% 0 0;
}
.avatar-container {
  position: relative;
  display: inline-block;
  margin-top: -65px;
  margin-bottom: 16px;
  z-index: 2;
}
.avatar-ring {
  padding: 8px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 10px 25px rgba(217, 119, 6, 0.2);
  background: white;
}
.avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0F172A, #334155);
  color: white;
  font-size: 44px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.edit-photo-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 3;
}
.edit-photo-badge:hover {
  background: #F8FAFC;
  transform: scale(1.05);
  color: #B45309;
}
.profile-info {
  padding: 0 24px;
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
  color: #EA580C;
  background: #FFF7ED;
  border: 1px solid #FFEDD5;
  padding: 6px 14px;
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

/* DIGITAL MEMBER CARD (Matched with Membership Page) */
.memberships-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.digital-card-container {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 16px 32px rgba(0,0,0,0.06);
  border: 1px solid #F1F5F9;
  transition: transform 0.3s ease;
  padding: 24px;
  gap: 32px;
  align-items: center;
}

.digital-card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.dc-graphic {
  flex: 0 0 42%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dc-img {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 12px 28px rgba(0,0,0,0.15));
}

.dc-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px dashed #E2E8F0;
  padding-bottom: 16px;
}

.dc-brand {
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #64748B;
  margin: 0;
}

.dc-info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dc-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dc-status-badge {
  background: #10B981;
  color: white;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dc-label {
  font-size: 10px;
  font-weight: 700;
  color: #94A3B8;
  margin: 0 0 4px 0;
  letter-spacing: 1.5px;
}

.dc-number {
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  letter-spacing: 2px;
  color: #0F172A;
  margin: 0;
  font-weight: 700;
}

.dc-name {
  font-size: 16px;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dc-qr-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dc-qr-box {
  background: white;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  color: #0F172A;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.dc-qr-icon {
  width: 48px;
  height: 48px;
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
  border: 1px solid #E2E8F0;
  border-radius: 24px;
  box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.08);
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
  gap: 16px;
}
.modern-data-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
}
.modern-data-item:hover {
  background: white;
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  transform: translateY(-2px);
  border-color: #CBD5E1;
}
.di-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-blue-50 { background: #EFF6FF; }
.text-blue-600 { color: #2563EB; }
.bg-orange-50 { background: #FFF7ED; }
.text-orange-600 { color: #EA580C; }
.bg-green-50 { background: #F0FDF4; }
.text-green-600 { color: #16A34A; }
.di-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.data-label {
  font-size: 11px;
  color: #64748B;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.data-value {
  font-size: 15px;
  color: #0F172A;
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
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
}
.btn-cancel:hover {
  background: #E2E8F0;
  color: #0F172A;
  border-color: #CBD5E1;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.stat-card-gradient {
  padding: 20px;
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.stat-card-gradient:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
.orange-grad {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
}
.blue-grad {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
}
.sc-header {
  background: rgba(255,255,255,0.2);
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sc-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.sc-num {
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
}
.sc-label {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.9;
}

.last-visit-modern {
  display: flex;
  align-items: center;
  background: #F8FAFC;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
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
    padding: 0 0 24px 0;
  }
  .data-list {
    gap: 12px;
  }
  .modern-data-item {
    padding: 12px;
    gap: 12px;
    border-radius: 12px;
  }
  .di-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
  }
  .di-icon svg {
    width: 18px; height: 18px;
  }
  .data-label {
    font-size: 10px;
  }
  .data-value {
    font-size: 14px;
  }
  .stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .stat-card-gradient {
    padding: 16px;
    gap: 8px;
    border-radius: 16px;
  }
  .sc-header {
    width: 32px; height: 32px;
    border-radius: 8px;
  }
  .sc-header svg {
    width: 18px; height: 18px;
  }
  .sc-num {
    font-size: 20px;
  }
  .sc-label {
    font-size: 11px;
  }
  .last-visit-modern {
    padding: 12px 16px;
    font-size: 12px;
  }
  .digital-card-container {
    flex-direction: row;
    padding: 12px;
    gap: 8px;
    border-radius: 12px;
  }
  .dc-graphic {
    flex: 0 0 40%;
    width: auto;
  }
  .dc-img {
    max-width: 100%;
  }
  .dc-data {
    gap: 8px;
    padding: 0;
  }
  .dc-header {
    padding-bottom: 6px;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }
  .dc-brand {
    font-size: 8px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .dc-status-badge {
    font-size: 7px;
    padding: 2px 4px;
  }
  .dc-info-row {
    flex-direction: row;
    align-items: flex-end;
    gap: 6px;
  }
  .dc-details {
    min-width: 0;
    flex: 1;
  }
  .dc-number {
    font-size: 9px;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  .dc-name {
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dc-label {
    font-size: 7px;
    margin-bottom: 2px;
  }
  .dc-label.mt-4 {
    margin-top: 4px;
  }
  .dc-qr-wrapper {
    align-self: flex-end;
    flex: 0 0 auto;
  }
  .dc-qr-box {
    padding: 4px;
    border-radius: 6px;
  }
  .dc-qr-icon {
    width: 22px;
    height: 22px;
  }
}
</style>
