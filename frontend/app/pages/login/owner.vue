<template>
  <div class="login-role-page">
    <!-- =========================================================
         HERO BANNER (GUESTBOOK STYLE WITH ORGANIC WAVE)
    ========================================================== -->
    <section class="role-hero">
      <div class="hero-image"></div>
      <div class="hero-overlay"></div>

      <!-- Top Back Navigation -->
      <div class="top-nav-bar">
        <NuxtLink to="/login" class="btn-back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Kembali ke Pintu Masuk</span>
        </NuxtLink>
      </div>

      <div class="hero-content">
        <div class="brand-label">
          <span class="brand-line"></span>
          <span>#KAMPUNGCOKLAT</span>
          <span class="brand-line"></span>
        </div>

        <h1 class="hero-title">
          Portal <strong>Owner &amp; Direksi</strong>
        </h1>

        <p class="hero-desc">
          Sistem Terpadu CRM, Tiket Masuk, Kasir POS &amp; Manajemen Operasional
        </p>
      </div>

      <!-- Organic Wave Divider -->
      <div class="hero-wave">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 55C180 110 360 110 540 65C720 20 900 20 1080 60C1260 100 1350 95 1440 65V120H0Z"
            fill="#fffaf5"
          />
        </svg>
      </div>
    </section>

    <!-- =========================================================
         MAIN LOGIN CARD SECTION (OVERLAPPING ONTO WAVE)
    ========================================================== -->
    <section class="form-section">
      <div class="form-container">
        <div class="login-card-split">
          <!-- Left Column: Soft-Toned Intro Panel with Centered Brand Logo -->
          <div class="card-left-info">
            <div class="brand-logo-centered">
              <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
            </div>

            <h2 class="info-title">Autentikasi Owner &amp; Direksi</h2>
            <p class="info-desc">
              Masukkan kredensial akun direksi Anda untuk mengakses laporan eksekutif dan analisa strategis Kampung Coklat.
            </p>

            <!-- Quick Autofill Button -->
            <div class="autofill-box">
              <button type="button" class="btn-autofill" @click="fillOwnerCredentials">
                <span class="bolt-icon">⚡</span>
                <span>Auto-fill Akun Demo Owner</span>
              </button>
            </div>
          </div>

          <!-- Right Column: Clean Login Form -->
          <div class="card-right-form">
            <div class="form-header">
              <h3 class="form-title">Formulir Akses</h3>
              <p class="form-subtitle">Lengkapi email dan kata sandi direksi</p>
            </div>

            <form class="clean-auth-form" @submit.prevent="handleLogin">
              <!-- Field 1: Email Address -->
              <div class="form-group">
                <label for="owner-email" class="field-label">Alamat Email Owner / Direksi</label>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="owner-email"
                    v-model="email"
                    type="email"
                    class="field-input"
                    placeholder="owner@kampungcoklat.id"
                    required
                  />
                </div>
              </div>

              <!-- Field 2: Password -->
              <div class="form-group">
                <div class="label-row">
                  <label for="owner-password" class="field-label">Kata Sandi</label>
                  <a href="#" class="help-link" @click.prevent="alertHelp">Bantuan Akses</a>
                </div>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="owner-password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="field-input"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    class="btn-toggle-eye"
                    title="Tampilkan / Sembunyikan Sandi"
                    @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? '🙈' : '👁️' }}
                  </button>
                </div>
              </div>

              <!-- Remember Me Toggle -->
              <div class="remember-row">
                <label class="checkbox-label">
                  <input v-model="rememberMe" type="checkbox" class="custom-checkbox" />
                  <span class="checkbox-text">Ingat sesi Direksi di perangkat ini</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn-submit-primary" :disabled="isLoading">
                <span v-if="!isLoading">Masuk Sebagai Owner / Direksi &rarr;</span>
                <span v-else class="loading-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-anim">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>Memverifikasi Otoritas...</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: false
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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Jost:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.login-role-page {
  min-height: 100vh;
  width: 100%;
  background: #fffaf5;
  color: #321d16;
  font-family: 'Jost', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* =========================================================
   HERO SECTION (GUESTBOOK STYLE)
========================================================= */
.role-hero {
  height: 480px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('~/assets/assets_digitalbook/kcb.png');
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(37, 20, 13, 0.78) 0%,
    rgba(48, 27, 19, 0.58) 50%,
    rgba(40, 22, 16, 0.86) 100%
  );
}

.top-nav-bar {
  position: absolute;
  top: 24px;
  left: 32px;
  z-index: 10;
}

.btn-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-back-link:hover {
  background: #f49a24;
  color: #2c1a13;
  border-color: #f49a24;
  transform: translateX(-3px);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 92%);
  text-align: center;
  color: white;
  padding-bottom: 50px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #f49a24;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 16px;
}

.brand-line {
  width: 40px;
  height: 2px;
  background: #f49a24;
  opacity: 0.7;
}

.hero-title {
  color: white;
  font-size: clamp(36px, 4.8vw, 56px);
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0;
  font-weight: 500;
}

.hero-title strong {
  display: block;
  color: #f59b24;
  font-weight: 800;
}

.hero-desc {
  max-width: 680px;
  margin: 16px auto 0;
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 105px;
  z-index: 3;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* =========================================================
   FORM SECTION WITH DUAL-TONE SPLIT CARD (OVERLAPPING WAVE)
========================================================= */
.form-section {
  background: #fffaf5;
  padding-bottom: 80px;
  width: 100%;
}

.form-container {
  width: min(940px, calc(100% - 40px));
  margin: -120px auto 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.login-card-split {
  width: 100%;
  background: white;
  border: 1px solid rgba(62, 36, 25, 0.08);
  border-radius: 28px;
  padding: 36px 40px;
  box-shadow:
    0 30px 80px rgba(48, 28, 20, 0.14),
    0 10px 25px rgba(48, 28, 20, 0.05);
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 36px;
  align-items: center;
}

/* Left Column: Soft Warm Cream Panel */
.card-left-info {
  background: linear-gradient(135deg, #FAF6F0 0%, #F5EDE2 100%);
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 36px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 16px rgba(44, 26, 19, 0.03);
}

.brand-logo-centered {
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
}

.brand-logo-img {
  max-height: 48px;
  width: auto;
  object-fit: contain;
}

.info-title {
  font-size: 22px;
  font-weight: 800;
  color: #351f17;
  margin: 0 0 10px 0;
  line-height: 1.25;
}

.info-desc {
  font-size: 13.5px;
  color: #8d7b72;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.autofill-box {
  width: 100%;
}

.btn-autofill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1.5px solid #e4dad3;
  color: #432a20;
  padding: 11px 18px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.03);
}

.btn-autofill:hover {
  background: #fdf4eb;
  border-color: #e99a32;
  color: #b45309;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(233, 154, 50, 0.15);
}

.bolt-icon {
  font-size: 14px;
}

/* Right Column: Clean White Form */
.card-right-form {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
}

.form-header {
  margin-bottom: 20px;
}

.form-title {
  font-size: 21px;
  font-weight: 800;
  color: #351f17;
  margin: 0 0 4px 0;
}

.form-subtitle {
  font-size: 13px;
  color: #8d7b72;
  margin: 0;
}

.clean-auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13.5px;
  font-weight: 700;
  color: #432a20;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.help-link {
  font-size: 12px;
  font-weight: 700;
  color: #e99a32;
  text-decoration: none;
}

.help-link:hover {
  text-decoration: underline;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: #a28d82;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.field-input {
  width: 100%;
  padding: 13px 16px 13px 46px;
  background: #FAF7F2;
  border: 1px solid #e4dad3;
  border-radius: 14px;
  font-size: 14px;
  color: #352017;
  font-family: inherit;
  font-weight: 600;
  outline: none;
  transition: all 0.2s ease;
}

.field-input::placeholder {
  color: #b7aaa3;
}

.field-input:focus {
  background: #FFFFFF;
  border-color: #e99a32;
  box-shadow: 0 0 0 4px rgba(233, 154, 50, 0.12);
}

.btn-toggle-eye {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
  padding: 4px;
}

.remember-row {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.custom-checkbox {
  accent-color: #e99a32;
  width: 15px;
  height: 15px;
}

.checkbox-text {
  font-size: 12.5px;
  font-weight: 600;
  color: #6E442B;
}

.btn-submit-primary {
  background: #351f17;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 14px;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  box-shadow: 0 4px 14px rgba(53, 31, 23, 0.18);
}

.btn-submit-primary:hover:not(:disabled) {
  background: #e99a32;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(233, 154, 50, 0.3);
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 860px) {
  .login-card-split {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 20px;
  }

  .role-hero {
    height: 380px;
  }

  .form-container {
    margin-top: -80px;
  }
}
</style>
