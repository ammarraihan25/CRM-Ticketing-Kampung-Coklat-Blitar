const fs = require('fs');
const path = require('path');

const extracted = require('./extracted_discounts.json');
const promoPath = path.join(__dirname, 'app', 'pages', 'ticketing_dan_gate', 'self-service', 'promo.vue');

const newScript = `<script setup lang="ts">
import { useRouter } from 'vue-router'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

const router = useRouter()

const vouchersList = [
  {
    id: 1,
    targetSegment: 'PP',
    targetSegmentLabel: 'PP (JAMAAH PENGAJIAN)',
    name: 'VOUCHER FREE TIKET JAMAAH PENGAJIAN',
    description: 'Diberikan otomatis setelah scan QR Banner Digital Guestbook di hall pengajian.',
    code: 'PENGAJIAN-FREE',
    discountType: 'free',
    discountValue: 100,
    validUntil: '08.06.2026',
    isActive: true
  },
  {
    id: 2,
    targetSegment: 'PR',
    targetSegmentLabel: 'PR (PENGUNJUNG REGULER)',
    name: 'PROMO DOMISILI KEDIRI RAYA 15%',
    description: 'Potongan harga tiket masuk reguler khusus pengunjung domisili Kab & Kota Kediri.',
    code: 'KEDIRI-SERU15',
    discountType: 'percentage',
    discountValue: 15,
    validUntil: '30.09.2026',
    isActive: true
  },
  {
    id: 3,
    targetSegment: 'PT',
    targetSegmentLabel: 'PT (ROMBONGAN B2B)',
    name: 'INSENTIF ROMBONGAN TRAVEL AGENT 20%',
    description: 'Khusus kemitraan B2B dengan minimal pembelian 50 lembar tiket terusan wahana.',
    code: 'TOUR-BUS-20',
    discountType: 'percentage',
    discountValue: 20,
    validUntil: '31.12.2026',
    isActive: true
  },
  {
    id: 4,
    targetSegment: 'SEMUA',
    targetSegmentLabel: 'SEMUA PENGUNJUNG',
    name: 'FLASH PROMO HARI KERJA (SELASA - KAMIS)',
    description: 'Diskon 10% tiket reguler untuk meratakan traffic kunjungan di hari kerja.',
    code: 'WEEKDAY-COCOA10',
    discountType: 'percentage',
    discountValue: 10,
    validUntil: '15.10.2026',
    isActive: true
  }
]

const goBack = () => {
  router.push('/ticketing_dan_gate/self-service')
}

const copyCode = (code) => {
  navigator.clipboard.writeText(code)
  alert('Kode ' + code + ' disalin!')
}
</script>`;

let htmlTemplate = extracted.html;
// Replace the Detail Info + Action buttons with just "Gunakan Sekarang" button
htmlTemplate = htmlTemplate.replace(
  /<button \s*type="button" \s*class="btn-detail-link"[^>]*>[\s\S]*?<\/button>/,
  `<button 
                type="button" 
                class="btn-detail-link"
                @click="copyCode(v.code)"
                title="Gunakan Promo"
              >
                <span>Gunakan Sekarang</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>`
);
// Remove stub-hover-actions
htmlTemplate = htmlTemplate.replace(/<div class="stub-hover-actions">[\s\S]*?<\/div>/, '');

const newTemplate = `
<template>
  <div class="promo-page">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hashtag">#KAMPUNGCOKLAT</span>
        <h1 class="hero-title">Promo & Voucher Spesial</h1>
        <p class="hero-subtitle">
          Nikmati berbagai penawaran eksklusif dan diskon menarik untuk pengalaman liburan yang lebih hemat.
        </p>
        <button class="btn-outline-white mt-4" @click="goBack">
          Kembali ke Beranda
        </button>
      </div>
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill="#f8fafc" d="M 0,130 L 0,20 C 50,20 50,110 100,110 C 150,110 150,15 200,15 C 250,15 250,80 300,80 C 350,80 350,25 400,25 C 437,25 437,100 475,100 C 512,100 512,10 550,10 C 600,10 600,90 650,90 C 700,90 700,30 750,30 C 800,30 800,115 850,115 C 900,115 900,20 950,20 C 987,20 987,70 1025,70 C 1062,70 1062,15 1100,15 C 1125,15 1125,95 1150,95 C 1175,95 1175,25 1200,25 L 1200,130 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Promo Catalog -->
    <div class="promo-container">
${htmlTemplate}
    </div>
  </div>
</template>
`;

const newStyle = `
<style scoped>
.promo-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
}

/* Hero Section */
.hero-banner {
  position: relative;
  min-height: 350px;
  background-image: url('~/assets/assets_POS/POS/sewa_tempat/taman_edel.png'); /* fallback image */
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
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f29727;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 16px 0;
  color: #ffffff;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
.hero-subtitle {
  font-size: 16px;
  color: #e2e8f0;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}
.btn-outline-white {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}
.btn-outline-white:hover {
  background: white;
  color: #0f172a;
}
.mt-4 { margin-top: 24px; }
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

/* Promo Container */
.promo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

${extracted.css}
</style>
`;

fs.writeFileSync(promoPath, newScript + '\n' + newTemplate + '\n' + newStyle, 'utf8');
