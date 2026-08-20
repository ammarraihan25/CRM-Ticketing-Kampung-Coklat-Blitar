<template>
  <div class="portal-root">
    <!-- Ambient Warm Cocoa & Vignette Effects -->
    <div class="cocoa-ambient-glow top-left"></div>
    <div class="cocoa-ambient-glow bottom-right"></div>

    <!-- Animated Cocoa Pod & Leaf in Top-Right Corner -->
    <div class="cocoa-corner-branch top-right-branch">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none" class="cocoa-branch-svg">
        <!-- Leaves -->
        <path d="M70 20C100 10 140 30 150 70C120 75 90 60 70 20Z" fill="#2D5A27" stroke="#1E3F1A" stroke-width="2.5"/>
        <path d="M70 20C110 45 135 60 150 70" stroke="#4ADE80" stroke-width="2" stroke-linecap="round"/>
        <path d="M100 65C130 60 155 85 155 125C130 120 105 100 100 65Z" fill="#3E7B35" stroke="#1E3F1A" stroke-width="2.5"/>
        <!-- Cocoa Pod -->
        <g class="pod-sway">
          <ellipse cx="65" cy="85" rx="35" ry="55" transform="rotate(-35 65 85)" fill="url(#cocoaGrad1)" stroke="#3D1F14" stroke-width="3"/>
          <path d="M40 50C55 75 60 105 45 130" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M60 40C75 75 80 105 65 135" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
          <path d="M80 50C90 75 95 95 85 120" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Pod Stem -->
          <path d="M75 35C85 25 100 20 110 15" stroke="#5A3825" stroke-width="5" stroke-linecap="round"/>
        </g>
        <defs>
          <radialGradient id="cocoaGrad1" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#D97706"/>
            <stop offset="45%" stop-color="#8B4513"/>
            <stop offset="90%" stop-color="#3D1F14"/>
          </radialGradient>
        </defs>
      </svg>
    </div>

    <!-- Animated Cocoa Pod & Leaf in Bottom-Left Corner -->
    <div class="cocoa-corner-branch bottom-left-branch">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" fill="none" class="cocoa-branch-svg">
        <!-- Leaves -->
        <path d="M90 140C60 150 20 130 10 90C40 85 70 100 90 140Z" fill="#2D5A27" stroke="#1E3F1A" stroke-width="2.5"/>
        <path d="M90 140C50 115 25 100 10 90" stroke="#4ADE80" stroke-width="2" stroke-linecap="round"/>
        <path d="M60 95C30 100 5 75 5 35C30 40 55 60 60 95Z" fill="#3E7B35" stroke="#1E3F1A" stroke-width="2.5"/>
        <!-- Cocoa Pod -->
        <g class="pod-sway-alt">
          <ellipse cx="95" cy="75" rx="35" ry="55" transform="rotate(145 95 75)" fill="url(#cocoaGrad2)" stroke="#3D1F14" stroke-width="3"/>
          <path d="M120 110C105 85 100 55 115 30" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M100 120C85 85 80 55 95 25" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
          <path d="M80 110C70 85 65 65 75 40" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Pod Stem -->
          <path d="M85 125C75 135 60 140 50 145" stroke="#5A3825" stroke-width="5" stroke-linecap="round"/>
        </g>
        <defs>
          <radialGradient id="cocoaGrad2" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#F29727"/>
            <stop offset="45%" stop-color="#964B00"/>
            <stop offset="90%" stop-color="#2C1A13"/>
          </radialGradient>
        </defs>
      </svg>
    </div>

    <!-- Main Parchment Frame Container (Fit Viewport, No Scroll) -->
    <main class="portal-center-box">
      <!-- Top Brand & Header Section -->
      <header class="portal-brand-header">
        <!-- Clean Transparent Brand Logo (No Round Container) -->
        <div class="brand-logo-wrap">
          <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
        </div>

        <h1 class="portal-title-vintage">PINTU MASUK PERKEBUNAN</h1>
        
        <div class="vintage-divider-row">
          <span class="divider-leaf">❧</span>
          <span class="divider-subtext">Pilih jalur akses sesuai peran Anda</span>
          <span class="divider-leaf">☙</span>
        </div>
      </header>

      <!-- 2x2 Grid Role Selection Cards (Rich Vintage Engraved Parchment Cards) -->
      <div class="role-vintage-grid">
        <!-- 1. Super Admin Card -->
        <NuxtLink to="/login/admin" class="vintage-role-card card-admin">
          <!-- Multi-line Antique Corner Filigrees -->
          <div class="card-ornament-corner top-left"></div>
          <div class="card-ornament-corner top-right"></div>
          <div class="card-ornament-corner bottom-left"></div>
          <div class="card-ornament-corner bottom-right"></div>
          <div class="card-inner-frame"></div>

          <div class="role-card-inner">
            <!-- Vintage Engraved Illustration Box (Antique Grimoire & Brass Key) -->
            <div class="role-illustration-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="role-svg-icon">
                <rect x="10" y="16" width="36" height="34" rx="4" fill="#3D2012" stroke="#241108" stroke-width="2.5"/>
                <path d="M10 44H46V49C46 51 44 53 42 53H14C11.8 53 10 51.2 10 49V44Z" fill="#FAF1E3" stroke="#241108" stroke-width="2"/>
                <path d="M12 20H44V42H12V20Z" fill="#F4E6D2" stroke="#5A341A" stroke-width="1.5"/>
                <rect x="22" y="24" width="14" height="14" rx="2" fill="#D97706" stroke="#241108" stroke-width="1.5"/>
                <!-- Antique Brass Key -->
                <circle cx="36" cy="20" r="6" fill="#F59E0B" stroke="#241108" stroke-width="2"/>
                <circle cx="36" cy="20" r="2.5" fill="#FAF1E3"/>
                <path d="M42 20L54 20M50 20V25M54 20V24" stroke="#241108" stroke-width="2.5" stroke-linecap="round"/>
                <!-- Page Ribbons -->
                <path d="M10 24L6 32L10 30" fill="#B45309"/>
              </svg>
            </div>

            <!-- Role Text Content -->
            <div class="role-meta-content">
              <div class="role-heading-group">
                <h2 class="role-title">SUPER ADMIN</h2>
                <div class="role-filigree-line">
                  <span class="line-wing"></span>
                  <span class="line-gem">◆</span>
                  <span class="line-wing"></span>
                </div>
              </div>
              <p class="role-desc">
                Pengelolaan sistem, pengguna, dan konfigurasi penuh.
              </p>
              <div class="role-action-strip">
                <span class="action-btn-text">Masuk Sebagai Admin &rarr;</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- 2. Operational Manager Card -->
        <NuxtLink to="/login/manager" class="vintage-role-card card-manager">
          <div class="card-ornament-corner top-left"></div>
          <div class="card-ornament-corner top-right"></div>
          <div class="card-ornament-corner bottom-left"></div>
          <div class="card-ornament-corner bottom-right"></div>
          <div class="card-inner-frame"></div>

          <div class="role-card-inner">
            <!-- Vintage Engraved Illustration Box (Antique Compass on Map) -->
            <div class="role-illustration-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="role-svg-icon">
                <!-- Old Folded Map -->
                <polygon points="8,22 24,14 42,20 56,12 56,46 42,54 24,48 8,56" fill="#F4E6D2" stroke="#5A341A" stroke-width="2"/>
                <path d="M24 14V48M42 20V54" stroke="#D1BBA2" stroke-width="1.5" stroke-dasharray="2 2"/>
                <!-- Brass Compass Housing -->
                <circle cx="34" cy="34" r="16" fill="#422513" stroke="#241108" stroke-width="2.5"/>
                <circle cx="34" cy="34" r="13" fill="#FFFDF9" stroke="#B45309" stroke-width="1.8"/>
                <circle cx="34" cy="34" r="11" fill="#FAF1E3" stroke="#D1BBA2" stroke-width="1" stroke-dasharray="2 1"/>
                <!-- Compass Rose Needle -->
                <polygon points="34,24 37,34 34,32 31,34" fill="#DC2626" stroke="#7F1D1D" stroke-width="0.8"/>
                <polygon points="34,44 37,34 34,36 31,34" fill="#241108" stroke="#1F2937" stroke-width="0.8"/>
                <circle cx="34" cy="34" r="2.5" fill="#D97706"/>
                <!-- Compass Loop -->
                <circle cx="34" cy="16" r="3.5" stroke="#241108" stroke-width="2" fill="none"/>
              </svg>
            </div>

            <div class="role-meta-content">
              <div class="role-heading-group">
                <h2 class="role-title">OPERATIONAL MANAGER</h2>
                <div class="role-filigree-line">
                  <span class="line-wing"></span>
                  <span class="line-gem">◆</span>
                  <span class="line-wing"></span>
                </div>
              </div>
              <p class="role-desc">
                Monitoring operasional, evaluasi kinerja, dan laporan kunjungan.
              </p>
              <div class="role-action-strip">
                <span class="action-btn-text">Masuk Sebagai Manager &rarr;</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- 3. Owner / Direksi Card -->
        <NuxtLink to="/login/owner" class="vintage-role-card card-owner">
          <div class="card-ornament-corner top-left"></div>
          <div class="card-ornament-corner top-right"></div>
          <div class="card-ornament-corner bottom-left"></div>
          <div class="card-ornament-corner bottom-right"></div>
          <div class="card-inner-frame"></div>

          <div class="role-card-inner">
            <!-- Vintage Engraved Illustration Box (Colonial Manor & Telescope) -->
            <div class="role-illustration-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="role-svg-icon">
                <!-- Plantation Colonial Manor -->
                <polygon points="12,28 32,14 52,28" fill="#3D2012" stroke="#241108" stroke-width="2"/>
                <rect x="16" y="28" width="32" height="24" fill="#F4E6D2" stroke="#241108" stroke-width="2"/>
                <rect x="20" y="32" width="6" height="7" fill="#E6C8A4" stroke="#5A341A" stroke-width="1.2"/>
                <rect x="38" y="32" width="6" height="7" fill="#E6C8A4" stroke="#5A341A" stroke-width="1.2"/>
                <rect x="28" y="40" width="8" height="12" fill="#3D2012" stroke="#241108" stroke-width="1.5"/>
                <!-- Pillars -->
                <path d="M19 28V52M45 28V52" stroke="#5A341A" stroke-width="1.5"/>
                <!-- Brass Telescope -->
                <g transform="rotate(-20 30 42)">
                  <polygon points="12,42 46,38 46,44 12,48" fill="#D97706" stroke="#241108" stroke-width="1.5"/>
                  <rect x="46" y="37" width="6" height="8" rx="1.5" fill="#F59E0B" stroke="#241108" stroke-width="1.5"/>
                  <path d="M26 43L22 54M32 43L36 54" stroke="#241108" stroke-width="1.8" stroke-linecap="round"/>
                </g>
              </svg>
            </div>

            <div class="role-meta-content">
              <div class="role-heading-group">
                <h2 class="role-title">OWNER / DIREKSI</h2>
                <div class="role-filigree-line">
                  <span class="line-wing"></span>
                  <span class="line-gem">◆</span>
                  <span class="line-wing"></span>
                </div>
              </div>
              <p class="role-desc">
                Tinjauan eksekutif, laporan bisnis, dan keputusan strategis.
              </p>
              <div class="role-action-strip">
                <span class="action-btn-text">Masuk Sebagai Owner &rarr;</span>
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- 4. Kasir Front Office Card -->
        <NuxtLink to="/login/kasir" class="vintage-role-card card-kasir">
          <div class="card-ornament-corner top-left"></div>
          <div class="card-ornament-corner top-right"></div>
          <div class="card-ornament-corner bottom-left"></div>
          <div class="card-ornament-corner bottom-right"></div>
          <div class="card-inner-frame"></div>

          <div class="role-card-inner">
            <!-- Vintage Engraved Illustration Box (Wooden Loket & Cash Register) -->
            <div class="role-illustration-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="role-svg-icon">
                <!-- Wooden Ticket Booth Canopy -->
                <polygon points="10,24 30,12 50,24" fill="#B45309" stroke="#241108" stroke-width="2"/>
                <rect x="14" y="24" width="32" height="28" fill="#F4E6D2" stroke="#241108" stroke-width="2"/>
                <!-- Signboard LOKET -->
                <rect x="18" y="27" width="24" height="9" rx="1.5" fill="#3D2012" stroke="#241108" stroke-width="1.5"/>
                <text x="21" y="34" fill="#FAF1E3" font-size="6" font-weight="900" font-family="'Cinzel', serif">LOKET</text>
                <!-- Service Window & Shelf -->
                <rect x="22" y="39" width="16" height="13" fill="#3D2012" stroke="#241108" stroke-width="1.5"/>
                <rect x="20" y="37" width="20" height="2.5" fill="#D97706" stroke="#241108" stroke-width="1.2"/>
                <!-- Vintage Brass Cash Register Beside Window -->
                <g transform="translate(18, 12)">
                  <polygon points="22,34 32,28 36,32 26,38" fill="#F59E0B" stroke="#241108" stroke-width="1.5"/>
                  <rect x="24" y="34" width="12" height="6" fill="#3D2012" stroke="#241108" stroke-width="1.5"/>
                  <circle cx="28" cy="37" r="1" fill="#10B981"/>
                  <circle cx="32" cy="37" r="1" fill="#DC2626"/>
                </g>
              </svg>
            </div>

            <div class="role-meta-content">
              <div class="role-heading-group">
                <h2 class="role-title">KASIR FRONT OFFICE</h2>
                <div class="role-filigree-line">
                  <span class="line-wing"></span>
                  <span class="line-gem">◆</span>
                  <span class="line-wing"></span>
                </div>
              </div>
              <p class="role-desc">
                Transaksi penjualan tiket, cetak QR tiket, dan laporan kasir.
              </p>
              <div class="role-action-strip">
                <span class="action-btn-text">Masuk Sebagai Kasir POS &rarr;</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom Archive Footer -->
      <footer class="portal-vintage-footer">
        <div class="footer-gate-arch">
          <span class="gate-sign-text">KAMPUNG COKLAT &bull; SISTEM TICKETING &amp; CRM</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'blank'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Jost:wght@400;500;600;700&display=swap');

/* ========================================================================= */
/* ROOT PORTAL (Aesthetic Custom Cocoa-Cream Gradient & Texture)            */
/* ========================================================================= */
.portal-root {
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  background: 
    radial-gradient(ellipse at top, #FAF5ED 0%, #EBDDCB 45%, #D4BEA6 80%, #C4AA8F 100%),
    linear-gradient(135deg, #FAF4EB 0%, #DFCEBB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Jost', sans-serif;
  padding: 16px 20px;
  overflow: hidden; /* No scrollbars / slider */
}

/* Ambient Cocoa Glow */
.cocoa-ambient-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.35;
}

.cocoa-ambient-glow.top-left {
  top: -60px;
  left: -60px;
  background: radial-gradient(circle, #F29727 0%, rgba(217, 119, 6, 0) 70%);
}

.cocoa-ambient-glow.bottom-right {
  bottom: -60px;
  right: -60px;
  background: radial-gradient(circle, #3D2214 0%, rgba(44, 26, 19, 0) 70%);
}

/* Corner Animated Cocoa Pods & Leaves */
.cocoa-corner-branch {
  position: absolute;
  width: 140px;
  height: 140px;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 6px 14px rgba(44, 26, 19, 0.25));
}

.top-right-branch {
  top: 10px;
  right: 15px;
  animation: floatBranchTop 6s ease-in-out infinite;
}

.bottom-left-branch {
  bottom: 10px;
  left: 15px;
  animation: floatBranchBottom 7s ease-in-out infinite;
}

.cocoa-branch-svg {
  width: 100%;
  height: 100%;
}

.pod-sway {
  transform-origin: 75px 35px;
  animation: swayPod 4s ease-in-out infinite alternate;
}

.pod-sway-alt {
  transform-origin: 85px 125px;
  animation: swayPodAlt 4.5s ease-in-out infinite alternate;
}

@keyframes floatBranchTop {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(2deg); }
}

@keyframes floatBranchBottom {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(6px) rotate(-2deg); }
}

@keyframes swayPod {
  0% { transform: rotate(-3deg); }
  100% { transform: rotate(4deg); }
}

@keyframes swayPodAlt {
  0% { transform: rotate(3deg); }
  100% { transform: rotate(-4deg); }
}

/* ========================================================================= */
/* MAIN CENTER BOX (Parchment Card with Ornate Frame - Fits Perfectly)       */
/* ========================================================================= */
.portal-center-box {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 940px;
  background: rgba(253, 249, 243, 0.96);
  border: 3px solid #6E442B;
  border-radius: 20px;
  box-shadow: 
    0 0 0 6px #FAF4EB,
    0 0 0 8px #8B5738,
    0 20px 45px -10px rgba(44, 26, 19, 0.35),
    inset 0 0 50px rgba(110, 68, 43, 0.08);
  padding: 22px 34px 18px 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Top Header */
.portal-brand-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 16px;
}

/* Clean Transparent Brand Logo */
.brand-logo-wrap {
  width: 180px;
  max-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.brand-logo-img {
  width: 100%;
  height: 100%;
  max-height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.15));
  transition: transform 0.25s ease;
}

.brand-logo-img:hover {
  transform: scale(1.04);
}

.portal-title-vintage {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  color: #2C1A13;
  letter-spacing: 2px;
  margin: 0;
  line-height: 1.15;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.vintage-divider-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.divider-leaf {
  font-size: 14px;
  color: #B45309;
}

.divider-subtext {
  font-size: 12.5px;
  font-weight: 600;
  color: #5A3A28;
  letter-spacing: 0.4px;
}

/* ========================================================================= */
/* 2X2 ROLE SELECTION GRID (Rich Vintage Engraved Parchment Cards)           */
/* ========================================================================= */
.role-vintage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 14px;
}

/* Authentic Vintage Parchment Card */
.vintage-role-card {
  position: relative;
  background: 
    radial-gradient(ellipse at 50% 0%, #FFFDF9 0%, #F5E8D6 65%, #E6D2B7 100%),
    linear-gradient(135deg, #FBF4E8 0%, #EBDBC5 100%);
  border: 2px solid #8B5738;
  border-radius: 14px;
  padding: 14px 18px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 
    0 4px 14px rgba(61, 34, 20, 0.12),
    inset 0 0 18px rgba(110, 68, 43, 0.08);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

/* Subtle Engraved Inner Border */
.card-inner-frame {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: 1px dashed rgba(139, 87, 56, 0.45);
  border-radius: 10px;
  pointer-events: none;
  transition: border-color 0.25s ease;
}

.vintage-role-card:hover {
  transform: translateY(-4px);
  border-color: #B45309;
  background: 
    radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #F8ECD9 60%, #E8D5BC 100%),
    linear-gradient(135deg, #FFF8ED 0%, #EFE1CD 100%);
  box-shadow: 
    0 12px 26px rgba(61, 34, 20, 0.22),
    0 0 18px rgba(242, 151, 39, 0.3),
    inset 0 0 22px rgba(180, 83, 9, 0.1);
}

.vintage-role-card:hover .card-inner-frame {
  border-color: rgba(217, 119, 6, 0.7);
}

/* Decorative Corner Filigrees (Antique Ornate Corners) */
.card-ornament-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #7A492A;
  border-style: solid;
  pointer-events: none;
  opacity: 0.85;
  z-index: 2;
  transition: border-color 0.25s ease;
}

.card-ornament-corner.top-left { top: 6px; left: 6px; border-width: 2px 0 0 2px; border-radius: 2px 0 0 0; }
.card-ornament-corner.top-right { top: 6px; right: 6px; border-width: 2px 2px 0 0; border-radius: 0 2px 0 0; }
.card-ornament-corner.bottom-left { bottom: 6px; left: 6px; border-width: 0 0 2px 2px; border-radius: 0 0 0 2px; }
.card-ornament-corner.bottom-right { bottom: 6px; right: 6px; border-width: 0 2px 2px 0; border-radius: 0 0 2px 0; }

.vintage-role-card:hover .card-ornament-corner {
  border-color: #D97706;
  opacity: 1;
}

/* Inner Layout */
.role-card-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 3;
}

/* Vintage Woodcut / Etching Illustration Box */
.role-illustration-box {
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  background: 
    radial-gradient(circle at center, #FFFDF9 0%, #F5E8D6 60%, #DFCEB7 100%);
  border: 2px solid #8C5935;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  box-shadow: 
    0 3px 10px rgba(61, 34, 20, 0.15),
    inset 0 1px 3px rgba(255, 255, 255, 0.8);
  transition: all 0.28s ease;
}

.vintage-role-card:hover .role-illustration-box {
  transform: scale(1.06) rotate(-2deg);
  border-color: #D97706;
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.28);
}

.role-svg-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.25));
}

/* Meta Content */
.role-meta-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.role-heading-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.role-title {
  font-family: 'Cinzel', serif;
  font-size: 15.5px;
  font-weight: 900;
  color: #241108;
  margin: 0;
  letter-spacing: 0.8px;
  line-height: 1.15;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
}

/* Filigree line under title */
.role-filigree-line {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 4px 0;
}

.line-wing {
  height: 1px;
  width: 24px;
  background: linear-gradient(90deg, transparent 0%, #8B5738 100%);
}

.line-wing:last-child {
  background: linear-gradient(90deg, #8B5738 0%, transparent 100%);
}

.line-gem {
  font-size: 7px;
  color: #B45309;
}

.role-desc {
  font-size: 11.5px;
  color: #4D2C17;
  line-height: 1.4;
  margin: 0;
  font-weight: 500;
}

/* Action Strip */
.role-action-strip {
  margin-top: 5px;
}

.action-btn-text {
  font-size: 11px;
  font-weight: 800;
  color: #8C4004;
  letter-spacing: 0.3px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.vintage-role-card:hover .action-btn-text {
  color: #D97706;
  transform: translateX(3px);
}

/* ========================================================================= */
/* BOTTOM ARCHIVE FOOTER                                                     */
/* ========================================================================= */
.portal-vintage-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  border-top: 1px dashed rgba(139, 87, 56, 0.3);
}

.footer-gate-arch {
  display: inline-flex;
  align-items: center;
  background: #FAF4EB;
  border: 1px solid #C4A287;
  padding: 3px 14px;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(61, 34, 20, 0.05);
}

.gate-sign-text {
  font-size: 10px;
  font-weight: 700;
  color: #6E442B;
  letter-spacing: 0.8px;
}

/* Responsive */
@media (max-width: 768px) {
  .portal-root {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
  }
  .portal-center-box {
    padding: 20px 16px;
  }
  .portal-title-vintage {
    font-size: 20px;
  }
  .role-vintage-grid {
    grid-template-columns: 1fr;
  }
  .brand-logo-wrap {
    width: 140px;
  }
  .role-illustration-box {
    width: 54px;
    height: 54px;
  }
}
</style>
