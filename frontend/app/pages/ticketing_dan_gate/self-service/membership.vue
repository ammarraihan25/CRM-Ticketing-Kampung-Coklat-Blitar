<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

// Import images directly for the tiers
import imgPengajian from '~/assets/assets_member/member pengajian.png'
import imgRegular from '~/assets/assets_member/member regular.png'
import imgTour from '~/assets/assets_member/member tour.png'

definePageMeta({
  layout: false
})

const router = useRouter()
const activeMemberships = useState<string[]>('selfServiceMembership', () => [])

const goToRegisterMembership = (type: string) => {
  router.push(`/ticketing_dan_gate/self-service/register-membership?type=${type}`)
}

const tiers = [
  {
    id: 'Pengajian',
    title: 'Member Pengajian',
    desc1: 'Member Pengajian adalah kartu anggota atau membership card yang dikeluarkan oleh program loyalitas Kampung Coklat. Kartu ini memberikan berbagai keuntungan dan promosi eksklusif bagi pemegangnya.',
    desc2: 'Tujuan utama dari Member Pengajian adalah untuk meningkatkan pengalaman pelanggan melalui akses area pengajian, info kajian rutin, serta diskon yang hanya tersedia bagi anggota.',
    promoTitle: 'Promo Spesial',
    promoDesc: 'Nikmati diskon <strong>10%</strong> untuk F&B dan Tiket setiap hari.',
    image: imgPengajian,
  },
  {
    id: 'Regular',
    title: 'Member Regular',
    desc1: 'Member Regular adalah kartu anggota atau membership card yang dikeluarkan oleh program loyalitas Kampung Coklat. Kartu ini memberikan berbagai keuntungan dan promosi eksklusif bagi pemegangnya.',
    desc2: 'Tujuan utama dari Member Regular adalah untuk meningkatkan pengalaman pelanggan melalui berbagai fasilitas, diskon, dan layanan khusus prioritas dasar yang hanya tersedia bagi anggota.',
    promoTitle: 'Promo Spesial',
    promoDesc: 'Nikmati diskon <strong>15%</strong> untuk F&B dan Tiket setiap hari.',
    image: imgRegular,
  },
  {
    id: 'Tour',
    title: 'Member Tour VIP',
    desc1: 'Member Tour VIP adalah kartu anggota atau membership card yang dikeluarkan oleh program loyalitas Kampung Coklat. Kartu ini memberikan berbagai keuntungan dan promosi eksklusif bagi pemegangnya.',
    desc2: 'Tujuan utama dari Member Tour VIP adalah untuk meningkatkan pengalaman pelanggan melalui akses jalur cepat (Fast Track), gratis pendamping tour, dan layanan khusus yang hanya tersedia bagi anggota.',
    promoTitle: 'Promo Spesial',
    promoDesc: 'Nikmati diskon <strong>20%</strong> untuk F&B dan Tiket setiap hari.',
    image: imgTour,
  }
]
</script>

<template>
  <div class="membership-wrapper">
    <!-- Navbar -->
    <SelfServiceNavbar activeMenu="membership" />

    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hashtag">#KAMPUNGCOKLAT</span>
        <h1 class="hero-title">Membership Card</h1>
        <p class="hero-subtitle">
          Nikmati berbagai keuntungan dan promosi eksklusif bagi pemegang Membership Card, kartu anggota loyalitas dari Kampung Coklat.
        </p>
      </div>
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill="#ffffff" d="M 0,130 L 0,20 C 50,20 50,110 100,110 C 150,110 150,15 200,15 C 250,15 250,80 300,80 C 350,80 350,25 400,25 C 437,25 437,100 475,100 C 512,100 512,10 550,10 C 600,10 600,90 650,90 C 700,90 700,30 750,30 C 800,30 800,115 850,115 C 900,115 900,20 950,20 C 987,20 987,70 1025,70 C 1062,70 1062,15 1100,15 C 1125,15 1125,95 1150,95 C 1175,95 1175,25 1200,25 L 1200,130 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <div class="membership-container">
      <div class="marketing-intro">
        <h2 class="marketing-title">Lebih dari Sekadar Liburan Biasa</h2>
        <p class="marketing-text">
          Jadikan setiap momen kunjungan Anda di Kampung Coklat lebih istimewa. Program loyalitas kami dirancang khusus untuk memberikan kenyamanan ekstra, layanan prioritas, dan berbagai penawaran eksklusif yang hanya bisa dinikmati oleh member. Pilih <i>tier</i> keanggotaan Anda sekarang dan nikmati pengalaman liburan tanpa batas!
        </p>
      </div>

      <div class="tier-list">
        <div class="tier-item" v-for="tier in tiers" :key="tier.id">
          <div class="tier-content">
            <div class="tier-text">
              <h2 class="tier-title">{{ tier.title }}</h2>
              <p class="tier-desc">{{ tier.desc1 }}</p>
              <p class="tier-desc">{{ tier.desc2 }}</p>
            </div>
            
            <div class="tier-actions">
              <div class="promo-box">
                <h3 class="promo-title">{{ tier.promoTitle }}</h3>
                <p class="promo-desc" v-html="tier.promoDesc"></p>
              </div>
              
              <button 
                class="btn-register"
                :class="{'is-registered': activeMemberships.includes(tier.id)}"
                @click="goToRegisterMembership(tier.id)"
                :disabled="activeMemberships.includes(tier.id)"
              >
                {{ activeMemberships.includes(tier.id) ? 'Sudah Terdaftar' : 'Daftar Membership' }}
              </button>
            </div>
          </div>
          <div class="tier-image">
            <img :src="tier.image" :alt="tier.name" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <SelfServiceFooter />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.membership-wrapper {
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.membership-container {
  max-width: 1200px;
  margin: 0 auto 100px; /* Reduced top margin since we have the banner and marketing text */
  padding: 0 24px;
  flex: 1;
}

.marketing-intro {
  text-align: center;
  max-width: 800px;
  margin: 60px auto 80px; /* Top margin provides space after the wavy banner */
}

.marketing-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: #3D2214;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}

.marketing-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16.5px;
  color: #64748B;
  line-height: 1.8;
  margin: 0;
}

/* Hero Section */
.hero-banner {
  position: relative;
  min-height: 380px;
  background-image: url('~/assets/assets_POS/POS/sewa_tempat/bale_coklat.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7));
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
}
.hashtag {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f29727;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 16px 0;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.hero-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  color: #e2e8f0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.torn-edge {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
}
.torn-edge svg {
  width: 100%;
  height: 100%;
}

.tier-list {
  display: flex;
  flex-direction: column;
  gap: 100px;
}

.tier-item {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.tier-content {
  width: 55%;
  display: flex;
  flex-direction: column;
}

.tier-image {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.tier-image {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.tier-image img {
  width: 100%;
  max-width: 520px;
  height: auto;
  object-fit: contain;
  /* drop-shadow hugs the actual non-transparent pixels of the PNG */
  filter: drop-shadow(0 12px 28px rgba(0,0,0,0.15));
}

.tier-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #d66b3b;
  margin: 0 0 16px 0;
}

.tier-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15.5px;
  color: #64748B;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.tier-actions {
  margin-top: auto;
  padding-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.promo-box {
  background-color: #fdfdf7;
  border: 1px solid #e8e4cd;
  padding: 20px 24px;
  margin-bottom: 24px;
  width: 100%;
  border-radius: 8px;
}

.promo-title {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 18px;
  color: #5a4f44;
  margin: 0 0 6px 0;
  font-weight: bold;
}

.promo-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  color: #64748B;
  margin: 0;
}

.btn-register {
  background-color: #d66b3b;
  color: #ffffff;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-register:hover:not(:disabled) {
  background-color: #b95a31;
}

.btn-register:disabled,
.btn-register.is-registered {
  background-color: #cbd5e1;
  color: #f1f5f9;
  cursor: not-allowed;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .marketing-intro {
    margin: 40px auto 60px;
  }
  .marketing-title {
    font-size: 28px;
  }
  .marketing-text {
    font-size: 15px;
  }
  .tier-item {
    flex-direction: column;
    gap: 40px;
  }
  .tier-content, .tier-image {
    width: 100%;
  }
  .tier-image {
    justify-content: center;
    order: -1;
  }
}

@media (max-width: 768px) {
  .membership-container {
    margin: 40px auto 80px;
  }
  .main-title {
    font-size: 32px;
  }
  .main-subtitle {
    font-size: 15px;
  }
}
</style>
