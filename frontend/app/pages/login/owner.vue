<template>
  <div class="dedicated-login-root" :style="{ backgroundImage: `url(${bgPortal})` }">
    <!-- Dark Cocoa Vignette Overlay -->
    <div class="vignette-scrim"></div>

    <!-- Central Seamless Glass Card (No Harsh White Box) -->
    <div class="seamless-glass-login-card glass-owner-border">
      <!-- Card Top Bar with Back Link & Security Badge -->
      <div class="card-header-bar">
        <NuxtLink to="/login" class="back-pill-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Pilih Peran Lain</span>
        </NuxtLink>

        <span class="role-badge-pill pill-owner">
          👑 Executive Board Level
        </span>
      </div>

      <!-- Hero Header for Owner -->
      <div class="role-hero-section">
        <div class="brand-avatar-flex">
          <div class="golden-logo-chip">
            <img :src="logoImg" alt="Kampung Coklat" class="chip-logo-img" />
          </div>
          <div class="role-icon-box avatar-owner">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
            </svg>
          </div>
        </div>

        <div class="role-text-group">
          <h1 class="role-title">Login Owner &amp; Direksi</h1>
          <p class="role-desc">
            Portal Eksekutif Direksi — Ringkasan Bisnis, Omzet GTV, Tiket, Pengunjung &amp; Demografi.
          </p>
        </div>
      </div>

      <!-- Quick Fill Demo Button (Glass Style) -->
      <div class="demo-fill-container">
        <button type="button" class="btn-glass-autofill fill-owner" @click="fillOwnerCredentials">
          <span class="sparkle-icon">⚡</span>
          <span>Auto-fill Kredensial Owner (H. Kholid Mustofa)</span>
        </button>
      </div>

      <!-- Form Login (Dark Glass Inputs) -->
      <form class="glass-login-form" @submit.prevent="handleLogin">
        <div class="form-field-group">
          <label for="owner-email">Alamat Email Direksi / Owner</label>
          <div class="dark-input-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input 
              id="owner-email"
              v-model="email" 
              type="email" 
              class="glass-input-control" 
              placeholder="owner@kampungcoklat.id" 
              required
            />
          </div>
        </div>

        <div class="form-field-group">
          <div class="label-row-split">
            <label for="owner-password">Kata Sandi</label>
            <a href="#" class="forgot-link-gold" @click.prevent="alertHelp">Bantuan Akses</a>
          </div>
          <div class="dark-input-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input 
              id="owner-password"
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="glass-input-control" 
              placeholder="••••••••" 
              required
            />
            <button 
              type="button" 
              class="btn-eye-toggle" 
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div class="checkbox-remember-row">
          <label class="glass-checkbox-label">
            <input v-model="rememberMe" type="checkbox" />
            <span>Ingat sesi Owner di perangkat pribadi ini</span>
          </label>
        </div>

        <button type="submit" class="btn-submit-action btn-submit-owner" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-ring"></span>
          <span>{{ isSubmitting ? 'Membuka Portal Eksekutif...' : 'Masuk Sebagai Owner / Direksi' }}</span>
        </button>
      </form>

      <div class="card-bottom-footnote">
        <span>Akses Eksekutif: Dilengkapi proteksi Read-Only untuk integritas data finansial.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'
import bgPortal from '~/assets/assets_POS/bg_portal.png'

definePageMeta({
  layout: 'blank'
})

const { loginAs } = useAuth()

const email = ref('owner@kampungcoklat.id')
const password = ref('password123')
const rememberMe = ref(true)
const showPassword = ref(false)
const isSubmitting = ref(false)

const fillOwnerCredentials = () => {
  email.value = 'owner@kampungcoklat.id'
  password.value = 'password123'
}

const handleLogin = () => {
  isSubmitting.value = true
  setTimeout(() => {
    loginAs('owner')
    isSubmitting.value = false
    navigateTo('/dashboard')
  }, 400)
}

const alertHelp = () => {
  alert('Untuk bantuan reset autentikasi akun Direksi, hubungi IT Administrator.')
}
</script>

<style scoped>
.dedicated-login-root {
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  font-family: 'Jost', sans-serif;
  position: relative;
  overflow: hidden;
}

.vignette-scrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(20, 8, 4, 0.45) 0%, rgba(10, 4, 2, 0.9) 100%);
  pointer-events: none;
}

/* Seamless Dark Glass Card */
.seamless-glass-login-card {
  width: 100%;
  max-width: 460px;
  background: linear-gradient(180deg, rgba(28, 14, 8, 0.82) 0%, rgba(16, 7, 4, 0.92) 100%);
  border-radius: 22px;
  padding: 32px 30px;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(245, 158, 11, 0.15);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  position: relative;
  z-index: 2;
}

.glass-owner-border {
  border: 1.5px solid rgba(251, 191, 36, 0.45);
}

.card-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.back-pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #D3C9C2;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 5px 12px;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.back-pill-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #FFFFFF;
  border-color: #FBBF24;
}

.role-badge-pill {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}

.pill-owner {
  background: rgba(120, 53, 15, 0.8);
  color: #FDE68A;
  border: 1px solid rgba(251, 191, 36, 0.55);
}

.role-hero-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.brand-avatar-flex {
  display: flex;
  align-items: center;
  gap: 12px;
}

.golden-logo-chip {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #FFFFFF;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  border: 2px solid #F29727;
}

.chip-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.role-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
}

.avatar-owner {
  background: linear-gradient(135deg, #D97706 0%, #F59E0B 100%);
  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
}

.role-text-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.role-title {
  font-size: 26px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
  letter-spacing: -0.5px;
}

.role-desc {
  font-size: 13px;
  color: #D3C9C2;
  margin: 0;
  line-height: 1.45;
}

/* Demo Auto-fill */
.demo-fill-container {
  margin-bottom: 18px;
}

.btn-glass-autofill {
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  padding: 9px 12px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-family: inherit;
}

.fill-owner {
  background: rgba(245, 158, 11, 0.15);
  border: 1px dashed rgba(251, 191, 36, 0.5);
  color: #FDE68A;
}

.fill-owner:hover {
  background: rgba(245, 158, 11, 0.25);
  border-color: #FBBF24;
  color: #FFFFFF;
}

/* Form Fields */
.glass-login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-field-group label {
  font-size: 12px;
  font-weight: 600;
  color: #E5E7EB;
}

.label-row-split {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot-link-gold {
  font-size: 11.5px;
  color: #F29727;
  text-decoration: none;
  font-weight: 600;
}

.forgot-link-gold:hover { text-decoration: underline; }

.dark-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #A89489;
}

.glass-input-control {
  width: 100%;
  height: 44px;
  padding: 8px 12px 8px 38px;
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  font-size: 13.5px;
  color: #FFFFFF;
  font-family: inherit;
  transition: all 0.2s ease;
}

.glass-input-control:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: #FBBF24;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
}

.btn-eye-toggle {
  position: absolute;
  right: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-remember-row {
  display: flex;
  align-items: center;
}

.glass-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #C9B8AF;
  cursor: pointer;
}

.btn-submit-action {
  height: 46px;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 4px;
}

.btn-submit-owner {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 18px rgba(217, 119, 6, 0.4);
}

.btn-submit-owner:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.55);
}

.spinner-ring {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.card-bottom-footnote {
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 14px;
  text-align: center;
  font-size: 11px;
  color: #8C7569;
}
</style>
