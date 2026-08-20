<template>
  <div class="book-login-root" :style="{ backgroundImage: `url(${bgCenter})` }">
    <!-- Top Floating Back Action -->
    <div class="top-nav-bar">
      <NuxtLink to="/login" class="btn-parchment-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>Kembali ke Pintu Masuk</span>
      </NuxtLink>
    </div>

    <!-- The Open Ring-Binder Book Container -->
    <div class="open-book-container">
      <!-- 3D Stacked Page Edges -->
      <div class="book-stacked-edges left-edges"></div>
      <div class="book-stacked-edges right-edges"></div>

      <!-- Outer Leather Binder Casing (Royal Amber Gold & Cocoa) -->
      <div class="book-leather-casing casing-owner">
        <!-- Leather Corner Metal Protectors -->
        <div class="book-metal-corner top-left"></div>
        <div class="book-metal-corner top-right"></div>
        <div class="book-metal-corner bottom-left"></div>
        <div class="book-metal-corner bottom-right"></div>

        <!-- Inner Parchment Double Spread -->
        <div class="book-pages-spread">
          <!-- ============================================================= -->
          <!-- LEFT PAGE: 4 CORNERS & PERFECTLY CENTERED HERO                -->
          <!-- ============================================================= -->
          <div class="book-page page-left page-curved-wavy-left">
            <div class="page-gutter-shadow right-shadow"></div>
            <div class="page-curve-lighting left-light"></div>

            <!-- 1. Top Left Botanical Corner -->
            <div class="botanical-corner top-left-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M0 0C30 18 60 48 80 90" stroke="#7A5034" stroke-width="2" stroke-linecap="round"/>
                <path d="M18 10C42 5 66 18 72 42C48 48 30 34 18 10Z" fill="#FDF3E3" stroke="#8C5310" stroke-width="1.6"/>
                <path d="M18 10C42 24 58 34 72 42" stroke="#B45309" stroke-width="1.1"/>
                <g transform="rotate(-30 40 64)">
                  <ellipse cx="40" cy="64" rx="14" ry="24" fill="#FEF9ED" stroke="#78350F" stroke-width="2"/>
                  <path d="M30 50C36 62 38 72 34 82" stroke="#B45309" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M40 46C46 62 47 74 42 84" stroke="#78350F" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 2. Top Right Botanical Corner -->
            <div class="botanical-corner top-right-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M120 0C90 18 60 48 40 90" stroke="#7A5034" stroke-width="2" stroke-linecap="round"/>
                <path d="M102 10C78 5 54 18 48 42C72 48 90 34 102 10Z" fill="#FDF3E3" stroke="#8C5310" stroke-width="1.6"/>
                <path d="M102 10C78 24 62 34 48 42" stroke="#B45309" stroke-width="1.1"/>
                <g transform="rotate(30 80 64)">
                  <ellipse cx="80" cy="64" rx="14" ry="24" fill="#FEF9ED" stroke="#78350F" stroke-width="2"/>
                  <path d="M72 50C78 62 80 72 76 82" stroke="#B45309" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M80 46C86 62 87 74 82 84" stroke="#78350F" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 3. Bottom Left Botanical Corner -->
            <div class="botanical-corner bottom-left-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M0 120C30 102 60 72 80 30" stroke="#7A5034" stroke-width="2" stroke-linecap="round"/>
                <path d="M18 110C42 115 66 102 72 78C48 72 30 86 18 110Z" fill="#FDF3E3" stroke="#8C5310" stroke-width="1.6"/>
                <path d="M18 110C42 96 58 86 72 78" stroke="#B45309" stroke-width="1.1"/>
                <g transform="rotate(30 40 56)">
                  <ellipse cx="40" cy="56" rx="14" ry="24" fill="#FEF9ED" stroke="#78350F" stroke-width="2"/>
                  <path d="M30 42C36 54 38 64 34 74" stroke="#B45309" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M40 38C46 54 47 66 42 76" stroke="#78350F" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 4. Bottom Right Botanical Corner -->
            <div class="botanical-corner bottom-right-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M120 120C90 102 60 72 40 30" stroke="#7A5034" stroke-width="2" stroke-linecap="round"/>
                <path d="M102 110C78 115 54 102 48 78C72 72 90 86 102 110Z" fill="#FDF3E3" stroke="#8C5310" stroke-width="1.6"/>
                <path d="M102 110C78 96 62 86 48 78" stroke="#B45309" stroke-width="1.1"/>
                <g transform="rotate(-30 80 56)">
                  <ellipse cx="80" cy="56" rx="14" ry="24" fill="#FEF9ED" stroke="#78350F" stroke-width="2"/>
                  <path d="M72 42C78 54 80 64 76 74" stroke="#B45309" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M80 38C86 54 87 66 82 76" stroke="#78350F" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- Centered Hero Content -->
            <div class="left-hero-center-box">
              <div class="dual-brand-logos-row">
                <div class="logo-crop-item">
                  <img :src="logoImg" alt="Kampung Coklat" class="brand-wordmark-img" />
                </div>
                <div class="logo-divider-sparkle sparkle-gold">✦</div>
                <div class="logo-crop-item">
                  <!-- Owner Crown & Manor Emblem -->
                  <div class="role-vector-emblem emblem-owner">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="emblem-svg">
                      <circle cx="32" cy="32" r="28" fill="#2E1B0E" stroke="#F59E0B" stroke-width="2.5"/>
                      <polygon points="16,36 20,24 28,30 32,20 36,30 44,24 48,36" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
                      <rect x="18" y="38" width="28" height="6" rx="2" fill="#D97706"/>
                      <circle cx="20" cy="24" r="2" fill="#FFFBEB"/>
                      <circle cx="32" cy="20" r="2.5" fill="#FFFBEB"/>
                      <circle cx="44" cy="24" r="2" fill="#FFFBEB"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="page-hero-text">
                <h1 class="book-main-title">Login Owner / Direksi</h1>
                <p class="book-description">
                  Tinjauan eksekutif kinerja bisnis keseluruhan, tren finansial harian/bulanan, rasio pengunjung, dan ekspor laporan PDF.
                </p>
              </div>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- SPIRAL RING BINDER SPINE (Polished Brass Gold)                -->
          <!-- ============================================================= -->
          <div class="ring-binder-spine spine-gold">
            <div class="binder-metal-bar bar-gold"></div>
            
            <div v-for="n in 12" :key="n" class="binder-ring-unit">
              <div class="punch-hole hole-left"></div>
              <div class="metal-ring-loop ring-gold">
                <div class="ring-metallic-glint"></div>
                <div class="ring-under-shadow"></div>
              </div>
              <div class="punch-hole hole-right"></div>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- RIGHT PAGE: FORMULIR AKSES                                    -->
          <!-- ============================================================= -->
          <div class="book-page page-right page-curved-wavy-right">
            <div class="page-gutter-shadow left-shadow"></div>
            <div class="page-curve-lighting right-light"></div>

            <div class="page-inner-content right-content-aligned">
              <div class="page-top-header right-header-balanced">
                <h2 class="page-header-title">Formulir Akses</h2>
                <div class="page-header-flourish">
                  <span class="flourish-line"></span>
                  <span class="flourish-icon icon-gold">❦</span>
                  <span class="flourish-line"></span>
                </div>
              </div>

              <!-- Top Ornate Auto-fill Button -->
              <div class="autofill-wrapper">
                <button type="button" class="btn-ornate-autofill fill-owner" @click="fillOwnerCredentials">
                  <span class="bolt-icon">⚡</span>
                  <span>Auto-fill Kredensial Owner</span>
                </button>
              </div>

              <!-- Input Form -->
              <form class="book-login-form" @submit.prevent="handleLogin">
                <!-- Field 1: Email Address -->
                <div class="form-vintage-group">
                  <div class="vintage-input-box">
                    <div class="input-icon-cell">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div class="input-field-cell">
                      <label for="owner-email" class="vintage-label">Alamat Email Owner / Direksi</label>
                      <input 
                        id="owner-email"
                        v-model="email" 
                        type="email" 
                        class="vintage-input" 
                        placeholder="owner@kampungcoklat.id" 
                        required
                      />
                    </div>
                  </div>
                </div>

                <!-- Field 2: Password -->
                <div class="form-vintage-group">
                  <div class="vintage-input-box">
                    <div class="input-icon-cell">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div class="input-field-cell">
                      <div class="label-split-row">
                        <label for="owner-password" class="vintage-label">Kata Sandi</label>
                        <a href="#" class="help-link link-gold" @click.prevent="alertHelp">Bantuan Akses</a>
                      </div>
                      <div class="password-input-flex">
                        <input 
                          id="owner-password"
                          v-model="password" 
                          :type="showPassword ? 'text' : 'password'" 
                          class="vintage-input" 
                          placeholder="••••••••" 
                          required
                        />
                        <button 
                          type="button" 
                          class="btn-eye-toggle" 
                          title="Tampilkan / Sembunyikan Sandi"
                          @click="showPassword = !showPassword"
                        >
                          {{ showPassword ? '🙈' : '👁️' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Remember Toggle -->
                <div class="vintage-toggle-row">
                  <label class="toggle-switch">
                    <input v-model="rememberMe" type="checkbox" />
                    <span class="toggle-slider slider-gold"></span>
                  </label>
                  <span class="toggle-label-text">Ingat sesi Owner di perangkat ini</span>
                </div>

                <!-- Embossed Submit Button -->
                <div class="submit-button-container">
                  <button type="submit" class="btn-embossed-submit submit-owner" :disabled="isLoading">
                    <span v-if="!isLoading">Masuk Sebagai Owner / Direksi</span>
                    <span v-else class="flex-loading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-svg">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>Memverifikasi Otoritas...</span>
                    </span>
                  </button>
                </div>
              </form>

              <!-- Subtle Disclaimer -->
              <div class="page-bottom-disclaimer">
                <p>Akses Eksekutif: Khusus untuk jajaran Direksi &amp; Pemilik Kampung Coklat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'
import bgCenter from '~/assets/assets_admin/bg-center.png'

definePageMeta({
  layout: 'blank'
})

const { loginAs } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(true)
const showPassword = ref(false)
const isLoading = ref(false)

const fillOwnerCredentials = () => {
  email.value = 'owner@kampungcoklat.id'
  password.value = 'owner123'
}

const handleLogin = () => {
  isLoading.value = true
  setTimeout(() => {
    loginAs('owner')
    isLoading.value = false
    navigateTo('/dashboard')
  }, 400)
}

const alertHelp = () => {
  alert('[BANTUAN AKSES OWNER / DIREKSI]\nEmail Demo: owner@kampungcoklat.id\nSandi Demo: owner123\n\nHubungi IT Operations jika akun Anda terkunci.')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Jost:wght@400;500;600;700&display=swap');

.book-login-root {
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #38210C;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Jost', sans-serif;
  padding: 16px;
  overflow: hidden;
}

.top-nav-bar {
  position: absolute;
  top: 14px;
  left: 20px;
  z-index: 10;
}

.btn-parchment-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(250, 244, 235, 0.94);
  border: 1.5px solid #8B5738;
  color: #3D2214;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}

.btn-parchment-back:hover {
  background: #FFFFFF;
  border-color: #D97706;
  color: #D97706;
  transform: translateX(-3px);
}

.open-book-container {
  width: 100%;
  max-width: 980px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  perspective: 1200px;
}

.book-stacked-edges {
  position: absolute;
  top: 12px;
  bottom: 12px;
  width: 14px;
  background: repeating-linear-gradient(
    180deg,
    #F3E6D3 0px,
    #F3E6D3 2px,
    #D1BBA2 2px,
    #D1BBA2 4px
  );
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.4);
}

.left-edges { left: -8px; transform: skewY(-2.5deg); }
.right-edges { right: -8px; transform: skewY(2.5deg); }

/* Leather Casing: Royal Amber Gold Cocoa */
.casing-owner {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #2E1A0C 0%, #4A2B14 50%, #201006 100%);
  border: 4px solid #8C5310;
  border-radius: 22px;
  padding: 12px;
  box-shadow: 
    0 25px 60px -10px rgba(0, 0, 0, 0.8),
    0 0 0 2px #B45309,
    inset 0 0 35px rgba(0, 0, 0, 0.85);
  z-index: 2;
}

.book-metal-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: #F59E0B;
  border-style: solid;
  pointer-events: none;
  z-index: 5;
}

.book-metal-corner.top-left { top: 6px; left: 6px; border-width: 3px 0 0 3px; border-radius: 4px 0 0 0; }
.book-metal-corner.top-right { top: 6px; right: 6px; border-width: 3px 3px 0 0; border-radius: 0 4px 0 0; }
.book-metal-corner.bottom-left { bottom: 6px; left: 6px; border-width: 0 0 3px 3px; border-radius: 0 0 0 4px; }
.book-metal-corner.bottom-right { bottom: 6px; right: 6px; border-width: 0 3px 3px 0; border-radius: 0 0 4px 0; }

.book-pages-spread {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  background: #FAF3E6;
  border-radius: 16px;
  box-shadow: 
    inset 0 0 50px rgba(180, 83, 9, 0.12),
    0 4px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid #D6B898;
  min-height: 490px;
  position: relative;
}

.book-page {
  padding: 24px 28px 20px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.page-curved-wavy-left {
  background: 
    radial-gradient(ellipse at 30% 0%, #FAF5EB 0%, #F8EEDB 60%, #EBD5B9 100%),
    linear-gradient(90deg, #F8EEDA 0%, #FAF4EB 88%, #EDE0CE 100%);
  border-radius: 18px 4px 4px 18px / 12px 4px 6px 14px;
  box-shadow: 
    inset -8px 0 16px rgba(217, 119, 6, 0.06),
    inset 4px 4px 12px rgba(255, 255, 255, 0.9),
    0 4px 8px rgba(217, 119, 6, 0.04);
}

.page-curved-wavy-right {
  background: 
    radial-gradient(ellipse at 70% 0%, #FAF5EB 0%, #F8EEDB 60%, #EBD5B9 100%),
    linear-gradient(270deg, #F8EEDA 0%, #FAF4EB 88%, #EDE0CE 100%);
  border-radius: 4px 18px 18px 4px / 4px 12px 14px 6px;
  box-shadow: 
    inset 8px 0 16px rgba(217, 119, 6, 0.06),
    inset -4px 4px 12px rgba(255, 255, 255, 0.9),
    0 4px 8px rgba(217, 119, 6, 0.04);
}

.page-curve-lighting {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 32px;
  pointer-events: none;
  z-index: 2;
}

.left-light {
  left: 20px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%);
}

.right-light {
  right: 20px;
  background: linear-gradient(270deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%);
}

.page-gutter-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 24px;
  pointer-events: none;
  z-index: 3;
}

.right-shadow {
  right: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(44, 26, 19, 0.12) 100%);
}

.left-shadow {
  left: 0;
  background: linear-gradient(270deg, transparent 0%, rgba(44, 26, 19, 0.12) 100%);
}

.botanical-corner {
  position: absolute;
  width: 105px;
  height: 105px;
  pointer-events: none;
  opacity: 0.85;
  z-index: 1;
}

.top-left-corner { top: 2px; left: 2px; }
.top-right-corner { top: 2px; right: 2px; }
.bottom-left-corner { bottom: 2px; left: 2px; }
.bottom-right-corner { bottom: 2px; right: 2px; }
.corner-svg { width: 100%; height: 100%; }

.left-hero-center-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  position: relative;
  z-index: 4;
  gap: 20px;
}

.dual-brand-logos-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.logo-crop-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-wordmark-img {
  max-width: 175px;
  max-height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 6px rgba(44, 26, 19, 0.22));
  transition: transform 0.25s ease;
}

.brand-wordmark-img:hover {
  transform: scale(1.04);
}

.role-vector-emblem {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 3px 8px rgba(217, 119, 6, 0.35));
  transition: transform 0.25s ease;
}

.role-vector-emblem:hover {
  transform: scale(1.08) rotate(3deg);
}

.emblem-svg {
  width: 100%;
  height: 100%;
}

.sparkle-gold {
  color: #D97706;
  font-size: 18px;
  opacity: 0.9;
}

.page-hero-text {
  text-align: center;
}

.book-main-title {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0 0 10px 0;
  letter-spacing: 0.6px;
  line-height: 1.15;
}

.book-description {
  font-size: 13.5px;
  color: #5A3A28;
  line-height: 1.55;
  margin: 0;
  max-width: 330px;
}

/* Polished Gold Spine */
.spine-gold {
  width: 32px;
  background: linear-gradient(90deg, #D4AF37 0%, #AA820A 50%, #D4AF37 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  box-shadow: 
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(217, 119, 6, 0.3);
  z-index: 8;
}

.bar-gold {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(90deg, #684E04 0%, #443202 100%);
}

.binder-ring-unit {
  position: relative;
  width: 100%;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.punch-hole {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #1A0E08;
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.9), 0 1px 1px rgba(255, 255, 255, 0.3);
  z-index: 2;
}

.hole-left { left: -4px; }
.hole-right { right: -4px; }

.ring-gold {
  position: relative;
  width: 28px;
  height: 12px;
  background: linear-gradient(
    180deg,
    #FFFBEB 0%,
    #FDE68A 20%,
    #D97706 45%,
    #78350F 75%,
    #FEF3C7 100%
  );
  border-radius: 8px;
  border: 1px solid #78350F;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.85);
  z-index: 5;
}

.ring-metallic-glint {
  position: absolute;
  top: 1px;
  left: 4px;
  right: 4px;
  height: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
}

.ring-under-shadow {
  position: absolute;
  bottom: -4px;
  left: 2px;
  right: 2px;
  height: 3px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 50%;
  filter: blur(1px);
}

.page-inner-content.right-content-aligned {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  position: relative;
  z-index: 4;
}

.page-top-header.right-header-balanced {
  text-align: center;
  margin-top: 12px;
  margin-bottom: 6px;
}

.page-header-title {
  font-family: 'Cinzel', serif;
  font-size: 20px;
  font-weight: 800;
  color: #2C1A13;
  letter-spacing: 1px;
  margin: 0;
}

.page-header-flourish {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 3px;
}

.flourish-line {
  height: 1px;
  width: 32px;
  background: #A07252;
}

.icon-gold {
  font-size: 10px;
  color: #D97706;
}

.autofill-wrapper {
  margin-bottom: 10px;
}

.fill-owner {
  width: 100%;
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border: 1.5px solid #F59E0B;
  border-radius: 10px;
  padding: 7px 12px;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 700;
  color: #78350F;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.1);
  transition: all 0.2s ease;
}

.fill-owner:hover {
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
  border-color: #D97706;
  color: #92400E;
  transform: translateY(-1px);
}

.bolt-icon { font-size: 12px; }

.book-login-form {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.vintage-input-box {
  display: flex;
  background: #FFFDF9;
  border: 1.5px solid #B8997D;
  border-radius: 10px;
  padding: 6px 10px;
  gap: 10px;
  align-items: center;
  box-shadow: inset 0 1px 3px rgba(61, 34, 20, 0.06);
  transition: all 0.2s ease;
}

.vintage-input-box:focus-within {
  border-color: #D97706;
  background: #FFFFFF;
  box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2), inset 0 1px 3px rgba(61, 34, 20, 0.06);
}

.input-icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
  border-right: 1px solid #E2D2C0;
}

.input-field-cell {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.vintage-label {
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #7A5034;
}

.label-split-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link-gold {
  font-size: 9.5px;
  font-weight: 700;
  color: #D97706;
  text-decoration: underline;
}

.vintage-input {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #2C1A13;
  outline: none;
  padding: 0;
  width: 100%;
}

.password-input-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-eye-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 0 3px;
}

.vintage-toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 2px 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 16px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider-gold {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBB49A;
  transition: .3s;
  border-radius: 20px;
  border: 1px solid #9C7756;
}

.slider-gold:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  left: 2px;
  bottom: 2px;
  background-color: #FAF4EB;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

input:checked + .slider-gold {
  background-color: #D97706;
}

input:checked + .slider-gold:before {
  transform: translateX(14px);
}

.toggle-label-text {
  font-size: 10.5px;
  color: #5A3A28;
  font-weight: 500;
}

.submit-button-container {
  margin-top: 6px;
  position: relative;
}

.submit-owner {
  width: 100%;
  background: linear-gradient(135deg, #381E09 0%, #1F0F03 100%);
  color: #FAF4EB;
  border: 2px solid #F59E0B;
  border-radius: 10px;
  padding: 10px 14px;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
  transition: all 0.2s ease;
}

.submit-owner:hover:not(:disabled) {
  background: linear-gradient(135deg, #4F2B0E 0%, #291405 100%);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.45);
  transform: translateY(-1px);
}

.flex-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-svg {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.page-bottom-disclaimer {
  text-align: center;
  font-size: 8.5px;
  color: #8A654E;
  margin-top: 8px;
  letter-spacing: 0.2px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .book-login-root {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    padding: 60px 14px 20px 14px;
  }
  .book-pages-spread {
    grid-template-columns: 1fr;
  }
  .ring-binder-spine {
    display: none;
  }
  .book-stacked-edges {
    display: none;
  }
  .page-left {
    border-radius: 10px 10px 0 0;
  }
  .page-right {
    border-radius: 0 0 10px 10px;
  }
}
</style>
