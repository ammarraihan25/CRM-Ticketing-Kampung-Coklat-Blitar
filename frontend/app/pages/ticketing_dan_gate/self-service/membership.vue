<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

definePageMeta({
  layout: false
})

const router = useRouter()
const activeMemberships = useState<string[]>('selfServiceMembership', () => [])

const goToRegisterMembership = (type: string) => {
  router.push(`/ticketing_dan_gate/self-service/register-membership?type=${type}`)
}
</script>

<template>
  <div class="membership-wrapper">
    <!-- Navbar -->
    <SelfServiceNavbar activeMenu="membership" />

    <!-- Main Content -->
    <div class="membership-container">
      <div class="membership-header">
        <h1 class="page-title">Pilihan Keanggotaan Eksklusif</h1>
        <p class="page-subtitle">Tingkatkan pengalaman Anda di Kampung Coklat. Pilih tier yang sesuai dan nikmati berbagai keuntungan premium yang kami sediakan khusus untuk Anda.</p>
      </div>

      <div class="tier-info-grid">
        <!-- Member Pengajian (BLUE THEME) -->
        <div class="tier-card theme-blue">
          <div class="card-gradient-top"></div>
          <div class="tc-content">
            <div class="tc-header">
              <span class="tier-badge">Member Pengajian</span>
              <div class="discount-display">
                <span class="disc-val">10%</span>
                <span class="disc-lbl">Diskon</span>
              </div>
            </div>
            
            <div class="tc-divider"></div>
            
            <ul class="tc-benefits">
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Diskon 10% F&amp;B dan Tiket</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Akses Area Pengajian</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Info Kajian Rutin</span>
              </li>
            </ul>
            
            <button 
              class="btn-tier" 
              :class="{'is-registered': activeMemberships.includes('Pengajian')}"
              @click="goToRegisterMembership('Pengajian')"
              :disabled="activeMemberships.includes('Pengajian')"
            >
              {{ activeMemberships.includes('Pengajian') ? 'Anda terdaftar sebagai member' : 'Daftar Member' }}
            </button>
          </div>
        </div>

        <!-- Member Regular (ORANGE THEME) - HIGHLIGHTED -->
        <div class="tier-card theme-orange highlighted">
          <div class="popular-tag">Paling Diminati</div>
          <div class="card-gradient-top"></div>
          <div class="tc-content">
            <div class="tc-header">
              <span class="tier-badge">Member Regular</span>
              <div class="discount-display">
                <span class="disc-val">15%</span>
                <span class="disc-lbl">Diskon</span>
              </div>
            </div>
            
            <div class="tc-divider"></div>
            
            <ul class="tc-benefits">
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Diskon 15% F&amp;B dan Tiket</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Promo Reguler Khusus</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Layanan Prioritas Dasar</span>
              </li>
            </ul>
            
            <button 
              class="btn-tier" 
              :class="{'is-registered': activeMemberships.includes('Regular')}"
              @click="goToRegisterMembership('Regular')"
              :disabled="activeMemberships.includes('Regular')"
            >
              {{ activeMemberships.includes('Regular') ? 'Anda terdaftar sebagai member' : 'Daftar Member' }}
            </button>
          </div>
        </div>

        <!-- Member Tour (PURPLE THEME) -->
        <div class="tier-card theme-purple">
          <div class="card-gradient-top"></div>
          <div class="tc-content">
            <div class="tc-header">
              <span class="tier-badge">Member Tour VIP</span>
              <div class="discount-display">
                <span class="disc-val">20%</span>
                <span class="disc-lbl">Diskon</span>
              </div>
            </div>
            
            <div class="tc-divider"></div>
            
            <ul class="tc-benefits">
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Diskon 20% F&amp;B dan Tiket</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Akses Jalur Cepat (Fast Track)</span>
              </li>
              <li>
                <div class="icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                <span>Gratis Pendamping Tour</span>
              </li>
            </ul>
            
            <button 
              class="btn-tier" 
              :class="{'is-registered': activeMemberships.includes('Tour')}"
              @click="goToRegisterMembership('Tour')"
              :disabled="activeMemberships.includes('Tour')"
            >
              {{ activeMemberships.includes('Tour') ? 'Anda terdaftar sebagai member' : 'Daftar Member' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <SelfServiceFooter />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

.membership-wrapper {
  background-color: #F8FAFC;
  background-image: 
    radial-gradient(at 0% 0%, rgba(219, 234, 254, 0.5) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(254, 243, 199, 0.5) 0px, transparent 50%);
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #334155;
  display: flex;
  flex-direction: column;
}

.membership-container {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 24px;
  flex: 1;
}

.membership-header {
  text-align: center;
  margin-bottom: 72px;
}

.page-title {
  font-size: 44px;
  font-weight: 900;
  color: #0F172A;
  margin: 0 0 20px 0;
  letter-spacing: -0.03em;
}

.page-subtitle {
  font-size: 18px;
  color: #64748B;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.tier-info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center; /* helps with highlighted middle card */
}
@media (min-width: 992px) {
  .tier-info-grid { 
    grid-template-columns: repeat(3, 1fr); 
    gap: 40px;
  }
}

/* CARDS */
.tier-card {
  background: white;
  border-radius: 28px;
  border: 1px solid #F1F5F9;
  padding: 40px 32px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
}
.tier-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.card-gradient-top {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 6px;
  z-index: 0;
}

/* Card Content Z-Index */
.tc-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Highlighted (Middle) */
.tier-card.highlighted {
  border: 1px solid rgba(217, 119, 6, 0.2);
  transform: scale(1.03);
  box-shadow: 0 20px 50px rgba(217, 119, 6, 0.08);
}
.tier-card.highlighted:hover {
  transform: scale(1.03) translateY(-10px);
  box-shadow: 0 30px 60px rgba(217, 119, 6, 0.12);
}
.popular-tag {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: white;
  font-size: 13px;
  font-weight: 800;
  padding: 6px 16px;
  border-radius: 0 0 12px 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 3;
  box-shadow: 0 4px 12px rgba(217,119,6,0.3);
}

/* THEMES */
.theme-blue .card-gradient-top { background: linear-gradient(90deg, #60A5FA, #3B82F6); }
.theme-blue .tier-badge { color: #1D4ED8; background: #DBEAFE; border: 1px solid #BFDBFE; }
.theme-blue .icon-wrap { background: #EFF6FF; }
.theme-blue .check-icon { color: #3B82F6; }

.theme-orange .card-gradient-top { background: linear-gradient(90deg, #FBBF24, #D97706); }
.theme-orange .tier-badge { color: #B45309; background: #FEF3C7; border: 1px solid #FDE68A; }
.theme-orange .icon-wrap { background: #FFFBEB; }
.theme-orange .check-icon { color: #F59E0B; }

.theme-purple .card-gradient-top { background: linear-gradient(90deg, #A78BFA, #8B5CF6); }
.theme-purple .tier-badge { color: #6D28D9; background: #EDE9FE; border: 1px solid #DDD6FE; }
.theme-purple .icon-wrap { background: #F5F3FF; }
.theme-purple .check-icon { color: #8B5CF6; }

/* Header Elements */
.tc-header {
  margin-bottom: 24px;
}
.tier-badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}
.discount-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.disc-val {
  font-size: 56px;
  font-weight: 900;
  color: #0F172A;
  line-height: 1;
  letter-spacing: -1.5px;
}
.disc-lbl {
  font-size: 18px;
  font-weight: 700;
  color: #64748B;
}

.tc-divider {
  height: 1px;
  background: #F1F5F9;
  margin: 0 0 24px 0;
}

/* Benefits List */
.tc-benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.tc-benefits li {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
  color: #334155;
  font-weight: 600;
}
.icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.check-icon {
  width: 14px;
  height: 14px;
}

/* Action Button */
.btn-tier {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid #E2E8F0;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  color: #0F172A;
}
.btn-tier:hover {
  background: #F8FAFC;
  border-color: #CBD5E1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.theme-orange .btn-tier:not(.is-registered) {
  background: linear-gradient(135deg, #F59E0B, #D97706);
  border: none;
  color: white;
  box-shadow: 0 8px 20px rgba(217,119,6,0.25);
  padding: 18px; /* account for border removal */
}
.theme-orange .btn-tier:not(.is-registered):hover {
  background: linear-gradient(135deg, #FBBF24, #B45309);
  box-shadow: 0 12px 25px rgba(217,119,6,0.35);
}

.btn-tier.is-registered {
  background: #ECFDF5;
  color: #10B981;
  border: 2px solid #A7F3D0;
  box-shadow: none;
  cursor: default;
}
.btn-tier.is-registered:hover {
  transform: none;
  background: #ECFDF5;
  border-color: #A7F3D0;
}

/* ========================================================================= */
/* RESPONSIVE (< 768px)                                                      */
/* ========================================================================= */
@media (max-width: 768px) {
  .membership-container {
    margin: 40px auto;
    padding: 0 16px;
  }
  .membership-header {
    margin-bottom: 40px;
  }
  .page-title {
    font-size: 28px;
    margin-bottom: 12px;
  }
  .page-subtitle {
    font-size: 14px;
  }
  .tier-info-grid {
    gap: 20px;
  }
  .tier-card {
    padding: 24px 20px;
    border-radius: 20px;
  }
  .tier-card.highlighted {
    transform: none;
    padding-top: 44px;
  }
  .tier-card.highlighted:hover {
    transform: translateY(-5px);
  }
  .popular-tag {
    font-size: 11px;
    padding: 5px 14px;
  }
  .tc-header {
    margin-bottom: 16px;
  }
  .tier-badge {
    font-size: 11px;
    padding: 4px 10px;
    margin-bottom: 12px;
  }
  .disc-val {
    font-size: 40px;
  }
  .disc-lbl {
    font-size: 15px;
  }
  .tc-divider {
    margin: 0 0 16px 0;
  }
  .tc-benefits {
    gap: 12px;
    margin-bottom: 24px;
  }
  .tc-benefits li {
    font-size: 13px;
    gap: 12px;
  }
  .icon-wrap {
    width: 24px;
    height: 24px;
  }
  .check-icon {
    width: 12px;
    height: 12px;
  }
  .btn-tier {
    padding: 12px;
    font-size: 14px;
    border-radius: 12px;
  }
  .theme-orange .btn-tier:not(.is-registered) {
    padding: 14px;
  }
}
</style>
