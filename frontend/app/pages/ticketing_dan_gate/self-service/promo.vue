<script setup lang="ts">
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
    targetSegment: 'ALL',
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
</script>

<template>
  <div class="promo-page">
    <SelfServiceNavbar activeMenu="promo" />
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
<div class="physical-vouchers-grid">
      <div 
        v-for="v in vouchersList" 
        :key="v.id" 
        class="pure-voucher-ticket"
        :class="[`theme-accent-${v.targetSegment.toLowerCase()}`, { 'ticket-disabled': !v.isActive }]"
      >
        <!-- Serrated/Scalloped Teeth Punch Holes on Left Outer Silhouette -->
        <div class="voucher-sawtooth-teeth">
          <span v-for="n in 11" :key="n" class="sawtooth-bite"></span>
        </div>

        <!-- ============================================================= -->
        <!-- 1. MAIN TICKET BODY (SEAMLESS NOTCHED MASK)                   -->
        <!-- ============================================================= -->
        <div class="voucher-main-body">
          <!-- Far Left Vertical Date -->
          <div class="ticket-vertical-edge">
            <span class="vertical-date-text">{{ v.validUntil }}</span>
          </div>

          <!-- Tiled Logo Watermark -->
          <div class="ticket-watermark-bg" :style="{ backgroundImage: `url(${logoImg})` }"></div>

          <!-- Main Text Content Area (Bold & Legible) -->
          <div class="ticket-text-content">
            <!-- Top Row: Segment Tag & Brand Logo -->
            <div class="content-header-row">
              <div class="segment-pill-tag" :class="`pill-${v.targetSegment.toLowerCase()}`">
                <span>{{ v.targetSegmentLabel }}</span>
              </div>
              <img :src="logoImg" alt="Kampung Coklat" class="ref-mini-logo" />
            </div>

            <!-- Big Bold Title with Decorative Accent Bar -->
            <div class="content-title-area">
              <h2 class="bold-ticket-title">{{ v.name }}</h2>
              <div class="title-underline-bar"></div>
            </div>

            <!-- Bold Crisp 2-Line Description -->
            <p class="concise-desc-text">{{ v.description }}</p>

            <!-- Bottom Row: Code & Detail Button -->
            <div class="ticket-action-footer">
              <div class="code-copy-badge" @click="copyCode(v.code)" title="Klik untuk menyalin kode">
                <span class="code-prefix">KODE:</span>
                <span class="code-mono">{{ v.code }}</span>
                <span class="copy-glyph">📋</span>
              </div>

              <button 
                type="button" 
                class="btn-detail-link"
                @click="copyCode(v.code)"
                title="Gunakan Promo"
              >
                <span>Gunakan Sekarang</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- 2. TEAR-OFF COUPON STUB (SEAMLESS NOTCHED MASK)              -->
        <!-- ============================================================= -->
        <div class="voucher-stub-body">
          <!-- Top Mini Logo -->
          <div class="stub-top-logo">
            <span class="stub-brand-kcb">KAMPUNG COKLAT</span>
            <span class="stub-tag-kcb">OFFICIAL VOUCHER</span>
          </div>

          <!-- Big Stub Callout Title -->
          <div class="stub-main-callout">
            <span class="stub-callout-text">{{ v.discountType === 'percentage' ? `${v.discountValue}% OFF` : 'FREE TIKET' }}</span>
          </div>

          <!-- Clean Crisp QR Code Graphic -->
          <div class="stub-qr-card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="#2C1A13" class="qr-code-vector">
              <rect x="2" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="5" y="5" width="4" height="4" fill="#2C1A13"/>
              <rect x="24" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="27" y="5" width="4" height="4" fill="#2C1A13"/>
              <rect x="2" y="24" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="5" y="27" width="4" height="4" fill="#2C1A13"/>
              <rect x="16" y="4" width="4" height="4" fill="#2C1A13"/>
              <rect x="16" y="16" width="6" height="6" fill="#2C1A13"/>
              <rect x="26" y="16" width="6" height="4" fill="#2C1A13"/>
              <rect x="16" y="26" width="4" height="6" fill="#2C1A13"/>
              <rect x="24" y="24" width="8" height="8" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <circle cx="28" cy="28" r="1.5" fill="#2C1A13"/>
            </svg>
          </div>

          <!-- Bottom Date & Quick Action Buttons -->
          <div class="stub-bottom-info">
            <span class="stub-date-val">{{ v.validUntil }}</span>
            
            
          </div>
        </div>
      </div>
    </div>
    </div>
    <SelfServiceFooter />
  </div>
</template>


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
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 40px 80px;
}

.physical-vouchers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 24px;
}

/* Root Voucher Card Silhouette */
.pure-voucher-ticket {
  display: flex;
  position: relative;
  filter: drop-shadow(0 8px 18px rgba(44, 26, 19, 0.12));
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), filter 0.28s ease;
  min-height: 215px;
}

.pure-voucher-ticket:hover {
  transform: translateY(-5px);
  filter: drop-shadow(0 16px 30px rgba(44, 26, 19, 0.22));
}

.ticket-disabled {
  opacity: 0.6;
  filter: grayscale(0.4);
}

/* Left Scalloped Serrated Teeth */
.voucher-sawtooth-teeth {
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 6;
  pointer-events: none;
}

.sawtooth-bite {
  width: 7px;
  height: 9px;
  background: #F8F5F0; /* Canvas Background */
  border-radius: 0 10px 10px 0;
  box-shadow: inset -1px 0 1.5px rgba(0, 0, 0, 0.2);
}

/* 1. Main Voucher Body (Left) */
.voucher-main-body {
  flex: 1;
  background: #FFFFFF;
  border-radius: 20px 0 0 20px;
  position: relative;
  display: flex;
  padding: 18px 18px 16px 0;
  overflow: hidden;
  mask-image: 
    radial-gradient(circle 11px at 100% 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 100% 100%, transparent 11px, black 11.5px);
  mask-composite: intersect;
  -webkit-mask-image: 
    radial-gradient(circle 11px at 100% 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 100% 100%, transparent 11px, black 11.5px);
  -webkit-mask-composite: source-in;
}

/* 2. Right Contrasting Tear Stub */
.voucher-stub-body {
  width: 144px;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 12px;
  text-align: center;
  border-left: 2px dashed rgba(255, 255, 255, 0.5);
  mask-image: 
    radial-gradient(circle 11px at 0 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 0 100%, transparent 11px, black 11.5px);
  mask-composite: intersect;
  -webkit-mask-image: 
    radial-gradient(circle 11px at 0 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 0 100%, transparent 11px, black 11.5px);
  -webkit-mask-composite: source-in;
}

/* ========================================================================= */
/* THEME ACCENTS                                                             */
/* ========================================================================= */
/* 1. PP Theme: Deep Forest Emerald */
.theme-accent-pp .voucher-stub-body {
  background: linear-gradient(145deg, #064E3B 0%, #065F46 100%);
  color: #FFFFFF;
}
.theme-accent-pp .bold-ticket-title { color: #064E3B; }
.theme-accent-pp .title-underline-bar { background: #065F46; }
.theme-accent-pp .pill-pp { background: #D1FAE5; color: #065F46; border: 1.5px solid #6EE7B7; }

/* 2. PR Theme: Deep Rich Roasted Cocoa */
.theme-accent-pr .voucher-stub-body {
  background: linear-gradient(145deg, #2C1A13 0%, #442212 100%);
  color: #FFFFFF;
}
.theme-accent-pr .bold-ticket-title { color: #2C1A13; }
.theme-accent-pr .title-underline-bar { background: #D97706; }
.theme-accent-pr .pill-pr { background: #FEF3C7; color: #92400E; border: 1.5px solid #FCD34D; }

/* 3. PT Theme: Deep Indigo Royal Navy */
.theme-accent-pt .voucher-stub-body {
  background: linear-gradient(145deg, #1E1B4B 0%, #312E81 100%);
  color: #FFFFFF;
}
.theme-accent-pt .bold-ticket-title { color: #1E1B4B; }
.theme-accent-pt .title-underline-bar { background: #6366F1; }
.theme-accent-pt .pill-pt { background: #EDE9FE; color: #5B21B6; border: 1.5px solid #C4B5FD; }

/* 4. ALL Theme: Warm Terracotta Coffee */
.theme-accent-all .voucher-stub-body {
  background: linear-gradient(145deg, #7C2D12 0%, #9A3412 100%);
  color: #FFFFFF;
}
.theme-accent-all .bold-ticket-title { color: #7C2D12; }
.theme-accent-all .title-underline-bar { background: #EA580C; }
.theme-accent-all .pill-all { background: #FFEDD5; color: #9A3412; border: 1.5px solid #FDBA74; }

/* Far Left Vertical Date Strip (Bolder) */
.ticket-vertical-edge {
    position: relative;
    z-index: 1;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #D6BFA8;
  margin-left: 10px;
  margin-right: 14px;
}

.vertical-date-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.8px;
  color: #2C1A13;
}

/* Floating Soft Cocoa Pod Illustration */
.ticket-watermark-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.12;
  background-size: 80px auto;
  background-repeat: repeat;
  background-position: center;
  z-index: 0;
  pointer-events: none;
}

/* Text Content Area */
.ticket-text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  padding-left: 14px;
}

/* Top Row */
.content-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.segment-pill-tag {
  font-size: 13.5px;
  font-weight: 900;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 12px;
  letter-spacing: 0.4px;
}

.ref-mini-logo {
  max-width: 92px;
  max-height: 24px;
  object-fit: contain;
}

/* Title Area (Bolder) */
.content-title-area {
  margin-bottom: 4px;
}

.bold-ticket-title {
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0 0 5px 0;
  line-height: 1.25;
}

.title-underline-bar {
  width: 56px;
  height: 3.5px;
  border-radius: 3px;
}

/* Description (Bolder & Darker) */
.concise-desc-text {
  font-size: 12.5px;
  font-weight: 700;
  color: #3D2214;
  margin: 0 0 10px 0;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Bottom Action Footer */
.ticket-action-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.code-copy-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FAF5ED;
  border: 1.8px dashed #B45309;
  border-radius: 7px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-copy-badge:hover {
  background: #FEF3C7;
  border-color: #D97706;
  transform: scale(1.03);
}

.code-prefix {
  font-size: 13px;
  font-weight: 900;
  color: #8C6D58;
}

.code-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  font-weight: 900;
  color: #B45309;
  letter-spacing: 0.6px;
}

.copy-glyph { font-size: 13.5px; }

.btn-detail-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 7px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail-link:hover {
  background: #D97706;
  transform: translateY(-1px);
}

/* Right Stub Inner Elements (Bolder) */
.stub-top-logo {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stub-brand-kcb {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.6px;
  color: #FFFFFF;
}

.stub-tag-kcb {
  font-size: 13.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.3px;
}

.stub-main-callout {
  margin: 2px 0;
}

.stub-callout-text {
  font-size: 14.5px;
  font-weight: 900;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #FBBF24;
}

.stub-qr-card {
  width: 54px;
  height: 54px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.qr-code-vector {
  width: 100%;
  height: 100%;
}

.stub-bottom-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.stub-date-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: 0.8px;
}

.stub-hover-actions {
  display: flex;
  gap: 4px;
  width: 100%;
}

.btn-stub-toggle-status {
  flex: 1;
  border: none;
  padding: 4px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-stub-toggle-status.is-active {
  background: #D1FAE5;
  color: #065F46;
}

.btn-stub-toggle-status.is-inactive {
  background: #FEE2E2;
  color: #991B1B;
}

.btn-stub-edit-quick {
  flex: 1;
  background: #FFFFFF;
  border: none;
  color: #2C1A13;
  padding: 4px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-stub-edit-quick:hover {
  background: #FEF3C7;
  color: #B45309;
}

/* ========================================================================= */
/* DETAIL MODAL STYLING                                                      */
/* ========================================================================= */
.modal-detail-card {
  background: #FFFDF9;
  border: 2.5px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 680px;
  box-shadow: 0 25px 60px rgba(44, 26, 19, 0.35);
  overflow: hidden;
  animation: modalPop 0.25s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-detail-body {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
}

.detail-hero-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAF4EB;
  border: 1.5px solid #D6BFA8;
  border-radius: 12px;
  padding: 12px 18px;
}

.detail-code-banner {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.banner-lbl {
  font-size: 13px;
  font-weight: 800;
  color: #8C6D58;
}

.banner-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 900;
  color: #B45309;
  letter-spacing: 0.5px;
}

.detail-discount-tag {
  background: #2C1A13;
  color: #F59E0B;
  font-size: 16px;
  font-weight: 900;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #F59E0B;
}

.detail-promo-title {
  font-size: 18px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.detail-promo-desc {
  font-size: 13px;
  color: #5A3A28;
  margin: 0;
  line-height: 1.5;
  font-weight: 600;
}

.detail-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #E6D7C3;
  border-radius: 10px;
  padding: 10px 12px;
}

.spec-icon { font-size: 18px; }

.spec-label {
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  color: #8C6D58;
}

.spec-value {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
}

.detail-quota-card {
  background: #FFFFFF;
  border: 1px solid #E6D7C3;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quota-head-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
}

.quota-head-title {
  font-weight: 700;
  color: #5A3A28;
}

.quota-head-stat {
  color: #7A5034;
}

.quota-head-stat strong {
  color: #2C1A13;
}

.quota-detail-track {
  width: 100%;
  height: 8px;
  background: #EAE0D0;
  border-radius: 10px;
  overflow: hidden;
}

.quota-detail-fill {
  height: 100%;
  background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
}

/* ========================================================================= */
/* LANDSCAPE CREATE / EDIT MODAL STYLING                                     */
/* ========================================================================= */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(36, 20, 13, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-landscape {
  background: #FFFDF9;
  border: 2.5px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 860px;
  box-shadow: 
    0 25px 60px rgba(44, 26, 19, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  animation: modalPop 0.25s ease-out;
  display: flex;
  flex-direction: column;
}

@keyframes modalPop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.modal-landscape-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #FAF4EB 0%, #EDE0CF 100%);
  border-bottom: 1.5px solid #D6BFA8;
}

.modal-brand-side {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-brand-logo-img {
  max-width: 140px;
  max-height: 42px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.15));
}

.modal-title-col h3 {
  font-size: 17px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.4px;
}

.modal-subtitle-text {
  font-size: 11.5px;
  color: #6E442B;
  margin: 2px 0 0 0;
  font-weight: 600;
}

.btn-close-modal {
  background: transparent;
  border: none;
  font-size: 26px;
  color: #6E442B;
  cursor: pointer;
  line-height: 1;
  transition: transform 0.2s ease;
}

.btn-close-modal:hover {
  transform: scale(1.15) rotate(90deg);
  color: #B45309;
}

/* Dual Column Landscape Layout */
.modal-landscape-body {
  padding: 22px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-height: 70vh;
  overflow-y: auto;
  background: #FFFDF9;
}

.modal-form-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-section-title {
  font-size: 11.5px;
  font-weight: 800;
  text-transform: uppercase;
  color: #B45309;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #E6D7C3;
  padding-bottom: 4px;
  margin-bottom: 2px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13.5px;
  font-weight: 700;
  color: #5A3A28;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.input-control {
  border: 1.5px solid #C4AA8F;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 7px 11px;
  font-family: inherit;
  font-size: 13px;
  color: #2C1A13;
  outline: none;
  transition: all 0.2s ease;
  font-weight: 600;
}

.input-control:focus {
  border-color: #D97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
}

.filter-select {
  border: 1.5px solid #C4AA8F;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 7px 11px;
  font-family: inherit;
  font-size: 13px;
  color: #2C1A13;
  outline: none;
  font-weight: 600;
}

.filter-select:focus {
  border-color: #D97706;
}

.textarea-control {
  resize: vertical;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Landscape Footer */
.modal-landscape-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: #FAF4EB;
  border-top: 1.5px solid #D6BFA8;
  gap: 16px;
}

.footer-tip {
  font-size: 13.5px;
  color: #6E442B;
  max-width: 500px;
  font-weight: 600;
}

.footer-btn-group {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.btn-cancel {
  background: #FFFFFF;
  border: 1.5px solid #C4AA8F;
  color: #5A3A28;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #FAF4EB;
  border-color: #8B5738;
}

.btn-save-primary {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  color: #FFFFFF;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(217, 119, 6, 0.3);
  transition: all 0.2s ease;
}

.btn-save-primary:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  transform: translateY(-1px);
}

/* ========================================================================= */
/* RESPONSIVE (< 768px)                                                      */
/* ========================================================================= */
@media (max-width: 768px) {
  .physical-vouchers-grid {
    grid-template-columns: 1fr;
  }
  .pure-voucher-ticket {
    zoom: 0.65;
    min-width: 540px;
  }

  .detail-specs-grid {
    grid-template-columns: 1fr;
  }
  .modal-landscape-body {
    grid-template-columns: 1fr;
  }
  .modal-landscape-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .footer-btn-group {
    justify-content: flex-end;
  }
}

</style>
