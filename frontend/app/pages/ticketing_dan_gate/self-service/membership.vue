<script setup lang="ts">
import { ref } from 'vue'
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

// Use local state for self-service auth
const isUserLoggedIn = useState('selfServiceAuth', () => false)

const userName = ref('Sobat Coklat')
const points = ref(150)
const currentTier = ref('Gold Member')
const nextTier = ref('Platinum Member')
const pointsToNextTier = ref(350)
const progressPercent = ref(30) // (150 / 500) * 100

const logout = () => {
  isUserLoggedIn.value = false
  router.push('/ticketing_dan_gate/self-service/login')
}

const activeTab = ref('overview') // 'overview', 'history'

const promos = ref([
  { id: 1, title: 'Diskon 20% Tiket Terusan', cost: 50, icon: 'ticket', bg: 'bg-orange-100', color: 'text-orange-600' },
  { id: 2, title: 'Gratis Bibit Pohon Kakao', cost: 30, icon: 'leaf', bg: 'bg-green-100', color: 'text-green-600' },
  { id: 3, title: 'Potongan 50rb Gazebo VIP', cost: 100, icon: 'home', bg: 'bg-purple-100', color: 'text-purple-600' },
  { id: 4, title: 'Beli 1 Gratis 1 Es Coklat', cost: 20, icon: 'cup', bg: 'bg-blue-100', color: 'text-blue-600' }
])

const history = ref([
  { id: 1, date: '10 Agustus 2026', activity: 'Pembelian Tiket Terusan', pts: '+50', type: 'earn' },
  { id: 2, date: '12 Agustus 2026', activity: 'Tukar Voucher Edukasi', pts: '-20', type: 'spend' },
  { id: 3, date: '15 Agustus 2026', activity: 'Pembelian Oleh-oleh POS', pts: '+30', type: 'earn' },
])
</script>

<template>
  <div class="membership-wrapper">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" @click="router.push('/ticketing_dan_gate/self-service/')" style="cursor: pointer;">
          <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Kampung Coklat" class="logo-img" />
        </div>
        <div class="nav-title">
          <h3>Pengaturan Membership</h3>
        </div>
        <div class="nav-action">
          <button class="back-btn" @click="router.push('/ticketing_dan_gate/self-service/')">Kembali ke Beranda</button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="dashboard-container">
      <!-- Sidebar Profile -->
      <aside class="sidebar">
        <div class="profile-card clean-profile">
          <div class="avatar-ring">
            <div class="avatar">{{ userName.charAt(0) }}</div>
          </div>
          <h4 class="profile-name">{{ userName }}</h4>
          <span class="profile-tier">{{ currentTier }}</span>
          <div class="points-badge mt-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            {{ points }} Poin Tersedia
          </div>
        </div>

        <div class="sidebar-menu">
          <button class="menu-item" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">Dashboard Keanggotaan</button>
          <button class="menu-item" :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'">Riwayat Transaksi</button>
          <button class="menu-item text-red" @click="logout">Keluar Akun</button>
        </div>
      </aside>

      <!-- Content Area -->
      <main class="content-area">
        
        <!-- Tab: Overview / Dashboard -->
        <div v-if="activeTab === 'overview'" class="tab-pane fade-in">
          
          <!-- Tiering Progress Clean -->
          <div class="tier-card mb-8">
            <div class="tier-header">
              <div>
                <p class="tier-subtitle">Status Keanggotaan</p>
                <h3 class="tier-title">{{ currentTier }}</h3>
              </div>
              <div class="points-to-go">
                <strong>{{ pointsToNextTier }}</strong> poin menuju {{ nextTier }}
              </div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="progress-labels">
              <span>0 Poin</span>
              <span>500 Poin</span>
            </div>
          </div>

          <h2 class="pane-title mt-12">Tukar Poin dengan Reward</h2>
          <div class="promo-grid">
            <div v-for="promo in promos" :key="promo.id" class="promo-card">
              <div class="promo-icon" :class="[promo.bg, promo.color]">
                
                <svg v-if="promo.icon === 'ticket'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="18" height="8" rx="2"/><path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/><circle cx="12" cy="14" r="1"/></svg>
                
                <svg v-else-if="promo.icon === 'leaf'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                
                <svg v-else-if="promo.icon === 'home'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                
                <svg v-else-if="promo.icon === 'cup'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>

              </div>
              <div class="promo-details">
                <h4>{{ promo.title }}</h4>
                <span class="promo-cost">{{ promo.cost }} Poin</span>
              </div>
              <button class="claim-btn">Tukar</button>
            </div>
          </div>

          <!-- Tier Explanations Clean -->
          <div class="tier-info-section mt-12">
            <h2 class="pane-title">Tingkatan Member</h2>
            <div class="tier-info-grid">
              
              <div class="tier-info-card">
                <div class="tic-header">
                  <div class="tic-badge bg-slate-100 text-slate-600">Silver</div>
                  <span class="tic-range">0 - 200 Poin</span>
                </div>
                <ul class="tic-benefits">
                  <li><span class="check-icon">✓</span> Diskon 5% F&amp;B</li>
                  <li><span class="check-icon">✓</span> Info promo reguler</li>
                  <li><span class="check-icon">✓</span> Layanan dasar</li>
                </ul>
              </div>

              <div class="tier-info-card highlighted-tier">
                <div class="current-tier-tag">Anda Disini</div>
                <div class="tic-header">
                  <div class="tic-badge bg-orange-100 text-orange-700">Gold</div>
                  <span class="tic-range">201 - 500 Poin</span>
                </div>
                <ul class="tic-benefits">
                  <li><span class="check-icon">✓</span> Diskon 10% F&amp;B</li>
                  <li><span class="check-icon">✓</span> Antrean Prioritas</li>
                  <li><span class="check-icon">✓</span> Gratis 1 minuman</li>
                </ul>
              </div>

              <div class="tier-info-card">
                <div class="tic-header">
                  <div class="tic-badge bg-blue-50 text-blue-700">Platinum</div>
                  <span class="tic-range">501+ Poin</span>
                </div>
                <ul class="tic-benefits">
                  <li><span class="check-icon">✓</span> Diskon 20% F&amp;B</li>
                  <li><span class="check-icon">✓</span> Jalur VIP &amp; Parkir</li>
                  <li><span class="check-icon">✓</span> Voucher Ulang Tahun</li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        <!-- Tab: Riwayat Poin -->
        <div v-if="activeTab === 'history'" class="tab-pane">
          <h2 class="pane-title">Riwayat Transaksi & Poin</h2>
          <div class="card-glass">
            <ul class="history-list">
              <li v-for="item in history" :key="item.id" class="history-item">
                <div class="hi-info">
                  <p class="hi-activity">{{ item.activity }}</p>
                  <span class="hi-date">{{ item.date }}</span>
                </div>
                <div class="hi-points" :class="item.type === 'earn' ? 'text-green' : 'text-red'">
                  {{ item.pts }}
                </div>
              </li>
            </ul>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.membership-wrapper {
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #334155;
  line-height: 1.6;
}

.navbar {
  background-color: #ffffff;
  height: 80px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.logo-img { height: 40px; }

.nav-title h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}

.back-btn {
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  background: white;
  font-weight: 700;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #F1F5F9;
  color: #111827;
}

.dashboard-container {
  max-width: 1200px;
  margin: 48px auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}

@media (min-width: 992px) {
  .dashboard-container {
    grid-template-columns: 300px 1fr;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-card {
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
}

.clean-profile {
  background: white;
  border: 1px solid #F1F5F9;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

.avatar-ring {
  padding: 4px;
  border: 2px solid #FCD34D;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #FFFBEB;
  color: #D97706;
  font-size: 28px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-name {
  font-size: 20px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
}

.profile-tier {
  font-size: 14px;
  font-weight: 700;
  color: #64748B;
}

.points-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFBEB;
  color: #D97706;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.sidebar-menu {
  background: white;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #F8FAFC;
  color: #111827;
}

.menu-item.active {
  background: #EFF6FF;
  color: #2563EB;
}

.text-red { color: #EF4444 !important; }
.text-red:hover { background: #FEF2F2 !important; }
.text-green { color: #10B981; font-weight: 800; }

.pane-title {
  font-size: 28px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 28px 0;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.card-glass {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.mb-8 { margin-bottom: 32px; }
.mt-4 { margin-top: 16px; }

/* Tier Card Clean */
.tier-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid #F1F5F9;
}
.tier-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}
.tier-title {
  font-size: 32px;
  font-weight: 800;
  color: #0F172A;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.tier-subtitle {
  color: #9CA3AF;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin: 0 0 4px 0;
}
.points-to-go {
  font-size: 14px;
  color: #64748B;
  background: #F8FAFC;
  padding: 8px 16px;
  border-radius: 20px;
}
.points-to-go strong {
  color: #111827;
}
.progress-bar-container {
  height: 8px;
  background: #F1F5F9;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.progress-bar {
  height: 100%;
  background: #D97706;
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: #9CA3AF;
}

/* Promo Grid Clean */
.promo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 768px) {
  .promo-grid { grid-template-columns: 1fr 1fr; }
}
.promo-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  border: 1px solid #F8FAFC;
  transition: all 0.3s;
}
.promo-card:hover {
  border-color: #E2E8F0;
  box-shadow: 0 8px 24px rgba(0,0,0,0.04);
}
.promo-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.promo-details h4 {
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 6px 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
}
.promo-cost {
  font-size: 13px;
  font-weight: 700;
  color: #D97706;
  background: #FFFBEB;
  padding: 4px 10px;
  border-radius: 10px;
  display: inline-block;
}
.claim-btn {
  margin-left: auto;
  padding: 8px 16px;
  background: #F8FAFC;
  color: #111827;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.claim-btn:hover {
  background: #F1F5F9;
}

/* Utilities */
.bg-orange-100 { background: #FFEDD5; }
.text-orange-600 { color: #EA580C; }
.bg-green-100 { background: #DCFCE7; }
.text-green-600 { color: #16A34A; }
.bg-purple-100 { background: #F3E8FF; }
.text-purple-600 { color: #9333EA; }
.bg-blue-100 { background: #DBEAFE; }
.text-blue-600 { color: #2563EB; }

/* Tier Info Section Clean */
.mt-12 { margin-top: 48px; }

.tier-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 992px) {
  .tier-info-grid { grid-template-columns: repeat(3, 1fr); }
}

.tier-info-card {
  background: white;
  padding: 32px 24px;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  position: relative;
  transition: all 0.3s ease;
}

.tier-info-card:hover {
  border-color: #CBD5E1;
  box-shadow: 0 8px 24px rgba(0,0,0,0.04);
}

.highlighted-tier {
  background: #FFFBEE;
  border-color: #FCD34D;
  border-top: 4px solid #D97706;
}

.current-tier-tag {
  position: absolute;
  top: -12px;
  left: 16px;
  background: #D97706;
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tic-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 20px;
}

.tic-badge {
  font-size: 13px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 8px;
}

.bg-slate-100 { background: #F1F5F9; }
.text-slate-600 { color: #475569; }
.bg-orange-100 { background: #FFEDD5; }
.text-orange-700 { color: #C2410C; }
.bg-blue-50 { background: #EFF6FF; }
.text-blue-700 { color: #1D4ED8; }

.tic-range {
  font-size: 13px;
  font-weight: 700;
  color: #64748B;
}

.tic-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tic-benefits li {
  font-size: 14px;
  color: #64748B;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.5;
}

.check-icon {
  color: #D97706;
  font-weight: 800;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #F1F5F9;
}

.history-item:last-child {
  border-bottom: none;
}

.hi-activity {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.hi-date {
  font-size: 13px;
  color: #9CA3AF;
}

.hi-points {
  font-size: 18px;
}
</style>
