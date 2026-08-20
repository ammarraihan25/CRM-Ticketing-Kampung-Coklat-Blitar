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
      <!-- 3D Stacked Page Edges (Snow White Ivory) -->
      <div class="book-stacked-edges left-edges"></div>
      <div class="book-stacked-edges right-edges"></div>

      <!-- Outer Leather Binder Casing (Snow Cream Ivory & Warm Cocoa) -->
      <div class="book-leather-casing casing-kasir-snow">
        <!-- Leather Corner Metal Protectors -->
        <div class="book-metal-corner top-left"></div>
        <div class="book-metal-corner top-right"></div>
        <div class="book-metal-corner bottom-left"></div>
        <div class="book-metal-corner bottom-right"></div>

        <!-- Inner Parchment Double Spread (Snow Cream Frost Pages) -->
        <div class="book-pages-spread spread-snow">
          <!-- ============================================================= -->
          <!-- LEFT PAGE: 4 CORNERS & PERFECTLY CENTERED HERO                -->
          <!-- ============================================================= -->
          <div class="book-page page-left page-curved-wavy-left page-snow-left">
            <div class="page-gutter-shadow right-shadow"></div>
            <div class="page-curve-lighting left-light"></div>

            <!-- 1. Top Left Botanical Corner (Snow Cream & Cocoa Tones) -->
            <div class="botanical-corner top-left-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M0 0C30 18 60 48 80 90" stroke="#8C6D58" stroke-width="2" stroke-linecap="round"/>
                <path d="M18 10C42 5 66 18 72 42C48 48 30 34 18 10Z" fill="#FFFFFF" stroke="#6E442B" stroke-width="1.6"/>
                <path d="M18 10C42 24 58 34 72 42" stroke="#A88265" stroke-width="1.1"/>
                <g transform="rotate(-30 40 64)">
                  <ellipse cx="40" cy="64" rx="14" ry="24" fill="#FFFEFA" stroke="#5A351E" stroke-width="2"/>
                  <path d="M30 50C36 62 38 72 34 82" stroke="#A88265" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M40 46C46 62 47 74 42 84" stroke="#6E442B" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 2. Top Right Botanical Corner -->
            <div class="botanical-corner top-right-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M120 0C90 18 60 48 40 90" stroke="#8C6D58" stroke-width="2" stroke-linecap="round"/>
                <path d="M102 10C78 5 54 18 48 42C72 48 90 34 102 10Z" fill="#FFFFFF" stroke="#6E442B" stroke-width="1.6"/>
                <path d="M102 10C78 24 62 34 48 42" stroke="#A88265" stroke-width="1.1"/>
                <g transform="rotate(30 80 64)">
                  <ellipse cx="80" cy="64" rx="14" ry="24" fill="#FFFEFA" stroke="#5A351E" stroke-width="2"/>
                  <path d="M72 50C78 62 80 72 76 82" stroke="#A88265" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M80 46C86 62 87 74 82 84" stroke="#6E442B" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 3. Bottom Left Botanical Corner -->
            <div class="botanical-corner bottom-left-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M0 120C30 102 60 72 80 30" stroke="#8C6D58" stroke-width="2" stroke-linecap="round"/>
                <path d="M18 110C42 115 66 102 72 78C48 72 30 86 18 110Z" fill="#FFFFFF" stroke="#6E442B" stroke-width="1.6"/>
                <path d="M18 110C42 96 58 86 72 78" stroke="#A88265" stroke-width="1.1"/>
                <g transform="rotate(30 40 56)">
                  <ellipse cx="40" cy="56" rx="14" ry="24" fill="#FFFEFA" stroke="#5A351E" stroke-width="2"/>
                  <path d="M30 42C36 54 38 64 34 74" stroke="#A88265" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M40 38C46 54 47 66 42 76" stroke="#6E442B" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- 4. Bottom Right Botanical Corner -->
            <div class="botanical-corner bottom-right-corner">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" class="corner-svg">
                <path d="M120 120C90 102 60 72 40 30" stroke="#8C6D58" stroke-width="2" stroke-linecap="round"/>
                <path d="M102 110C78 115 54 102 48 78C72 72 90 86 102 110Z" fill="#FFFFFF" stroke="#6E442B" stroke-width="1.6"/>
                <path d="M102 110C78 96 62 86 48 78" stroke="#A88265" stroke-width="1.1"/>
                <g transform="rotate(-30 80 56)">
                  <ellipse cx="80" cy="56" rx="14" ry="24" fill="#FFFEFA" stroke="#5A351E" stroke-width="2"/>
                  <path d="M72 42C78 54 80 64 76 74" stroke="#A88265" stroke-width="1.4" stroke-dasharray="2 2"/>
                  <path d="M80 38C86 54 87 66 82 76" stroke="#6E442B" stroke-width="1.6"/>
                </g>
              </svg>
            </div>

            <!-- Centered Hero Content -->
            <div class="left-hero-center-box">
              <div class="dual-brand-logos-row">
                <div class="logo-crop-item">
                  <img :src="logoImg" alt="Kampung Coklat" class="brand-wordmark-img" />
                </div>
                <div class="logo-divider-sparkle sparkle-snow">✦</div>
                <div class="logo-crop-item">
                  <!-- Kasir POS Loket Register Emblem (Snow Cream Palette) -->
                  <div class="role-vector-emblem emblem-kasir-snow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="emblem-svg">
                      <circle cx="32" cy="32" r="28" fill="#3D2214" stroke="#C4AA8F" stroke-width="2.5"/>
                      <polygon points="14,24 32,14 50,24" fill="#E6D3BE" stroke="#6E442B" stroke-width="1.5"/>
                      <rect x="18" y="24" width="28" height="22" rx="2" fill="#FFFFFF" stroke="#6E442B" stroke-width="1.5"/>
                      <rect x="22" y="28" width="20" height="8" fill="#2C1A13" rx="1"/>
                      <text x="25" y="34.5" fill="#FAF4EB" font-size="5.5" font-weight="bold" font-family="sans-serif">LOKET</text>
                      <circle cx="26" cy="40" r="1.5" fill="#10B981"/>
                      <circle cx="38" cy="40" r="1.5" fill="#F29727"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="page-hero-text">
                <h1 class="book-main-title text-snow-cocoa">Login Kasir Front Office</h1>
                <p class="book-description text-snow-muted">
                  Transaksi penjualan tiket masuk &amp; wahana POS, cetak QR barcode struk tiket fisik, dan pencatatan kas shift.
                </p>
              </div>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- SPIRAL RING BINDER SPINE (Snow Platinum & Pearl Silver)       -->
          <!-- ============================================================= -->
          <div class="ring-binder-spine spine-snow">
            <div class="binder-metal-bar bar-snow"></div>
            
            <div v-for="n in 12" :key="n" class="binder-ring-unit">
              <div class="punch-hole hole-left"></div>
              <div class="metal-ring-loop ring-snow">
                <div class="ring-metallic-glint"></div>
                <div class="ring-under-shadow"></div>
              </div>
              <div class="punch-hole hole-right"></div>
            </div>
          </div>

          <!-- ============================================================= -->
          <!-- RIGHT PAGE: FORMULIR AKSES                                    -->
          <!-- ============================================================= -->
          <div class="book-page page-right page-curved-wavy-right page-snow-right">
            <div class="page-gutter-shadow left-shadow"></div>
            <div class="page-curve-lighting right-light"></div>

            <div class="page-inner-content right-content-aligned">
              <div class="page-top-header right-header-balanced">
                <h2 class="page-header-title text-snow-cocoa">Formulir Akses</h2>
                <div class="page-header-flourish">
                  <span class="flourish-line line-snow"></span>
                  <span class="flourish-icon icon-snow">❦</span>
                  <span class="flourish-line line-snow"></span>
                </div>
              </div>

              <!-- Top Ornate Auto-fill Button -->
              <div class="autofill-wrapper">
                <button type="button" class="btn-ornate-autofill fill-kasir-snow" @click="fillKasirCredentials">
                  <span class="bolt-icon">⚡</span>
                  <span>Auto-fill Kredensial Kasir POS</span>
                </button>
              </div>

              <!-- Input Form -->
              <form class="book-login-form" @submit.prevent="handleLogin">
                <!-- Field 1: Email Address -->
                <div class="form-vintage-group">
                  <div class="vintage-input-box box-snow">
                    <div class="input-icon-cell">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6E442B" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div class="input-field-cell">
                      <label for="kasir-email" class="vintage-label label-snow">ID Kasir / Email POS</label>
                      <input 
                        id="kasir-email"
                        v-model="email" 
                        type="email" 
                        class="vintage-input" 
                        placeholder="kasir@kampungcoklat.id" 
                        required
                      />
                    </div>
                  </div>
                </div>

                <!-- Field 2: Password -->
                <div class="form-vintage-group">
                  <div class="vintage-input-box box-snow">
                    <div class="input-icon-cell">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6E442B" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div class="input-field-cell">
                      <div class="label-split-row">
                        <label for="kasir-password" class="vintage-label label-snow">PIN / Sandi Kasir</label>
                        <a href="#" class="help-link link-snow" @click.prevent="alertHelp">Bantuan Akses</a>
                      </div>
                      <div class="password-input-flex">
                        <input 
                          id="kasir-password"
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
                    <span class="toggle-slider slider-snow"></span>
                  </label>
                  <span class="toggle-label-text">Ingat sesi Kasir di terminal POS ini</span>
                </div>

                <!-- Embossed Submit Button (Snow Cream & Deep Cocoa) -->
                <div class="submit-button-container">
                  <button type="submit" class="btn-embossed-submit submit-kasir-snow" :disabled="isLoading">
                    <span v-if="!isLoading">Buka Register &amp; Masuk POS</span>
                    <span v-else class="flex-loading">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-svg">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>Membuka Register Kasir...</span>
                    </span>
                  </button>
                </div>
              </form>

              <!-- Subtle Disclaimer -->
              <div class="page-bottom-disclaimer">
                <p>Akses Loket: Hanya untuk staf Kasir Front Office pada terminal register POS aktif.</p>
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

const fillKasirCredentials = () => {
  email.value = 'kasir@kampungcoklat.id'
  password.value = 'kasir123'
}

const handleLogin = () => {
  isLoading.value = true
  setTimeout(() => {
    loginAs('kasir')
    isLoading.value = false
    navigateTo('/pos')
  }, 400)
}

const alertHelp = () => {
  alert('[BANTUAN AKSES KASIR POS]\nEmail Demo: kasir@kampungcoklat.id\nSandi Demo: kasir123\n\nHubungi Supervisor FO jika terminal terkunci.')
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
  background-color: #352A22;
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
  background: rgba(255, 253, 250, 0.95);
  border: 1.5px solid #C4AA8F;
  color: #3D2214;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.btn-parchment-back:hover {
  background: #FFFFFF;
  border-color: #6E442B;
  color: #6E442B;
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
    #FFFFFF 0px,
    #FFFFFF 2px,
    #E5DDD3 2px,
    #E5DDD3 4px
  );
  border-radius: 4px;
  z-index: 1;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
}

.left-edges { left: -8px; transform: skewY(-2.5deg); }
.right-edges { right: -8px; transform: skewY(2.5deg); }

/* Leather Casing: Snow Cream Ivory with Soft Cocoa Trim */
.casing-kasir-snow {
  position: relative;
  width: 100%;
  background: linear-gradient(135deg, #3A291E 0%, #4D382B 50%, #2B1D14 100%);
  border: 4px solid #8C6D58;
  border-radius: 22px;
  padding: 12px;
  box-shadow: 
    0 25px 60px -10px rgba(0, 0, 0, 0.75),
    0 0 0 2px #C4AA8F,
    inset 0 0 35px rgba(0, 0, 0, 0.7);
  z-index: 2;
}

.book-metal-corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: #D4BEA6;
  border-style: solid;
  pointer-events: none;
  z-index: 5;
}

.book-metal-corner.top-left { top: 6px; left: 6px; border-width: 3px 0 0 3px; border-radius: 4px 0 0 0; }
.book-metal-corner.top-right { top: 6px; right: 6px; border-width: 3px 3px 0 0; border-radius: 0 4px 0 0; }
.book-metal-corner.bottom-left { bottom: 6px; left: 6px; border-width: 0 0 3px 3px; border-radius: 0 0 0 4px; }
.book-metal-corner.bottom-right { bottom: 6px; right: 6px; border-width: 0 3px 3px 0; border-radius: 0 0 4px 0; }

.spread-snow {
  background: #FCFAF6;
  border-color: #E2D9CE;
  box-shadow: 
    inset 0 0 50px rgba(110, 68, 43, 0.08),
    0 4px 15px rgba(0, 0, 0, 0.12);
}

.book-pages-spread {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-radius: 16px;
  border: 1px solid #E2D9CE;
  min-height: 490px;
  position: relative;
}

.book-page {
  padding: 24px 28px 20px 28px;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Snow Cream Organic Wavy Pages */
.page-snow-left {
  background: 
    radial-gradient(ellipse at 30% 0%, #FFFFFF 0%, #FAF6EE 60%, #EFE7DA 100%),
    linear-gradient(90deg, #FBF8F2 0%, #FFFFFF 88%, #F2EAE0 100%);
  border-radius: 18px 4px 4px 18px / 12px 4px 6px 14px;
  box-shadow: 
    inset -8px 0 16px rgba(110, 68, 43, 0.04),
    inset 4px 4px 12px rgba(255, 255, 255, 0.95),
    0 4px 8px rgba(110, 68, 43, 0.03);
}

.page-snow-right {
  background: 
    radial-gradient(ellipse at 70% 0%, #FFFFFF 0%, #FAF6EE 60%, #EFE7DA 100%),
    linear-gradient(270deg, #FBF8F2 0%, #FFFFFF 88%, #F2EAE0 100%);
  border-radius: 4px 18px 18px 4px / 4px 12px 14px 6px;
  box-shadow: 
    inset 8px 0 16px rgba(110, 68, 43, 0.04),
    inset -4px 4px 12px rgba(255, 255, 255, 0.95),
    0 4px 8px rgba(110, 68, 43, 0.03);
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
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
}

.right-light {
  right: 20px;
  background: linear-gradient(270deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
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
  background: linear-gradient(90deg, transparent 0%, rgba(61, 34, 20, 0.08) 100%);
}

.left-shadow {
  left: 0;
  background: linear-gradient(270deg, transparent 0%, rgba(61, 34, 20, 0.08) 100%);
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
  filter: drop-shadow(0 2px 5px rgba(44, 26, 19, 0.18));
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
  filter: drop-shadow(0 3px 8px rgba(110, 68, 43, 0.25));
  transition: transform 0.25s ease;
}

.role-vector-emblem:hover {
  transform: scale(1.08) rotate(3deg);
}

.emblem-svg { width: 100%; height: 100%; }

.sparkle-snow {
  color: #8C6D58;
  font-size: 18px;
  opacity: 0.9;
}

.page-hero-text {
  text-align: center;
}

.text-snow-cocoa {
  color: #2C1A13;
}

.text-snow-muted {
  color: #6E5343;
}

.book-main-title {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  margin: 0 0 10px 0;
  letter-spacing: 0.6px;
  line-height: 1.15;
}

.book-description {
  font-size: 13.5px;
  line-height: 1.55;
  margin: 0;
  max-width: 330px;
}

/* Snow Platinum Silver Spine */
.spine-snow {
  width: 32px;
  background: linear-gradient(90deg, #D6CDC2 0%, #A89C8F 50%, #D6CDC2 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  box-shadow: 
    inset 0 0 10px rgba(0, 0, 0, 0.4),
    0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 8;
}

.bar-snow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(90deg, #5A4333 0%, #3D291C 100%);
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
  background: #24160E;
  border-radius: 50%;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.9), 0 1px 1px rgba(255, 255, 255, 0.3);
  z-index: 2;
}

.hole-left { left: -4px; }
.hole-right { right: -4px; }

.ring-snow {
  position: relative;
  width: 28px;
  height: 12px;
  background: linear-gradient(
    180deg,
    #FFFFFF 0%,
    #EFEBE4 20%,
    #C4B7AA 45%,
    #7A6A5C 75%,
    #FFFEFA 100%
  );
  border-radius: 8px;
  border: 1px solid #5A4333;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.35),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
  z-index: 5;
}

.ring-metallic-glint {
  position: absolute;
  top: 1px;
  left: 4px;
  right: 4px;
  height: 2px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 2px;
}

.ring-under-shadow {
  position: absolute;
  bottom: -4px;
  left: 2px;
  right: 2px;
  height: 3px;
  background: rgba(0, 0, 0, 0.3);
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

.line-snow {
  height: 1px;
  width: 32px;
  background: #C4AA8F;
}

.icon-snow {
  font-size: 10px;
  color: #8C6D58;
}

.autofill-wrapper {
  margin-bottom: 10px;
}

.fill-kasir-snow {
  width: 100%;
  background: linear-gradient(135deg, #FAF6EE 0%, #EFE6D7 100%);
  border: 1.5px solid #C4AA8F;
  border-radius: 10px;
  padding: 7px 12px;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 700;
  color: #3D2214;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: 0 2px 6px rgba(110, 68, 43, 0.08);
  transition: all 0.2s ease;
}

.fill-kasir-snow:hover {
  background: linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%);
  border-color: #6E442B;
  color: #2C1A13;
  transform: translateY(-1px);
}

.bolt-icon { font-size: 12px; }

.book-login-form {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.box-snow {
  display: flex;
  background: #FFFFFF;
  border: 1.5px solid #D4C7BA;
  border-radius: 10px;
  padding: 6px 10px;
  gap: 10px;
  align-items: center;
  box-shadow: inset 0 1px 3px rgba(61, 34, 20, 0.04);
  transition: all 0.2s ease;
}

.vintage-input-box:focus-within {
  border-color: #6E442B;
  background: #FFFFFF;
  box-shadow: 0 0 0 2px rgba(110, 68, 43, 0.18), inset 0 1px 3px rgba(61, 34, 20, 0.04);
}

.input-icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
  border-right: 1px solid #EAE3D9;
}

.input-field-cell {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.label-snow {
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #8C6D58;
}

.label-split-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link-snow {
  font-size: 9.5px;
  font-weight: 700;
  color: #8C6D58;
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

.slider-snow {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #DCD4CB;
  transition: .3s;
  border-radius: 20px;
  border: 1px solid #B8A99B;
}

.slider-snow:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  left: 2px;
  bottom: 2px;
  background-color: #FFFFFF;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

input:checked + .slider-snow {
  background-color: #6E442B;
}

input:checked + .slider-snow:before {
  transform: translateX(14px);
}

.toggle-label-text {
  font-size: 10.5px;
  color: #6E5343;
  font-weight: 500;
}

.submit-button-container {
  margin-top: 6px;
  position: relative;
}

.submit-kasir-snow {
  width: 100%;
  background: linear-gradient(135deg, #3D2517 0%, #24140B 100%);
  color: #FAF6EE;
  border: 2px solid #8C6D58;
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
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.35);
  transition: all 0.2s ease;
}

.submit-kasir-snow:hover:not(:disabled) {
  background: linear-gradient(135deg, #4F3221 0%, #2F1A10 100%);
  box-shadow: 0 6px 16px rgba(110, 68, 43, 0.4);
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
  color: #8C6D58;
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
