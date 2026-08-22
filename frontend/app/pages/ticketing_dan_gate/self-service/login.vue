<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

definePageMeta({
  layout: false
})

const router = useRouter()
const isUserLoggedIn = useState('selfServiceAuth', () => false)

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isUserLoggedIn.value = true
    router.push('/ticketing_dan_gate/self-service')
  }, 1000)
}

const goToRegister = () => {
  router.push('/ticketing_dan_gate/self-service/register')
}
</script>

<template>
  <div class="guestbook-page">

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="hero">

      <div class="hero-image"></div>

      <div class="hero-overlay"></div>

      <div class="hero-content">

        <div class="brand-label">
          <span class="brand-line"></span>
          <span>#KAMPUNGCOKLAT</span>
          <span class="brand-line"></span>
        </div>

        <h1>
          Selamat Datang di
          <strong>Portal Self-Service</strong>
        </h1>

        <p>
          Masuk ke akun Anda untuk melanjutkan pesanan tiket wisata edukasi tanpa antre.
        </p>

      </div>

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


    <!-- =====================================================
         FORM SECTION
    ====================================================== -->
    <section class="form-section">
      <div class="form-container">
        <div class="guestbook-card">

          <div class="form-heading" style="text-align: center; margin-bottom: 30px;">
            <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Logo Kampung Coklat" style="height: 50px; margin-bottom: 16px;" />
            <h2 style="font-size: 28px; font-weight: 800; color: #0F172A; margin: 0;">Selamat Datang</h2>
            <p style="color: #64748B; margin-top: 8px;">Masuk untuk melanjutkan pesanan Anda</p>
          </div>

          <form class="guest-form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label>Email atau No. Handphone</label>
              <div class="input-wrapper">
                <div class="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <input 
                  v-model="email" 
                  type="text" 
                  placeholder="manager@temucoffee.com" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="input-wrapper">
                <div class="icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input 
                  v-model="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <div style="text-align: right; margin-top: 12px;">
                <a href="#" style="color: #D97706; font-size: 14px; text-decoration: none; font-weight: 600;">Lupa Password?</a>
              </div>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
              style="margin-top: 32px;"
            >
              <span>
                {{ isLoading ? 'Memproses...' : 'Masuk' }}
              </span>
            </button>

            <div style="text-align: center; margin-top: 24px; font-size: 14px; color: #64748B;">
              Belum punya akun? <a href="#" @click.prevent="goToRegister" style="color: #D97706; font-weight: 700; text-decoration: none;">Daftar Sekarang</a>
            </div>
          </form>

        </div>
      </div>
    </section>

    <!-- =====================================================
         CTA
    ====================================================== -->
    <section class="cta-section">
      <div class="cta-content">
        <span class="cta-label">KAMPUNG COKLAT</span>
        <h2>
          Belum punya akun
          <span>Sobat Coklat?</span>
        </h2>
        <p>
          Daftar sekarang dan nikmati kemudahan pembelian tiket, diskon F&B, serta fasilitas jalur prioritas.
        </p>
        <button @click="goToRegister" class="cta-button" style="border: none; cursor: pointer; font-family: inherit;">
          Daftar Sekarang
          <span>→</span>
        </button>
      </div>
    </section>

    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">Kampung Coklat</div>
          <p>Destinasi wisata edukasi dan pengalaman cokelat di Blitar.</p>
        </div>
        <div class="footer-copy">
          © {{ new Date().getFullYear() }} Kampung Coklat. All rights reserved.
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* =========================================================
   BASE
========================================================= */
* {
  box-sizing: border-box;
}

.guestbook-page {
  min-height: 100vh;
  background: #fffaf5;
  color: #321d16;
  overflow-x: hidden;
  font-family: inherit;
}

/* =========================================================
   HERO
========================================================= */
.hero {
  height: 520px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  position: absolute;
  inset: 0;
  background-image: url('~/assets/assets_digitalbook/kcb.png');
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(37, 20, 13, 0.76) 0%, rgba(48, 27, 19, 0.55) 50%, rgba(40, 22, 16, 0.84) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 92%);
  text-align: center;
  color: white;
  padding-bottom: 45px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #f49a24;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 26px;
}

.brand-line {
  width: 50px;
  height: 2px;
  background: #f49a24;
  opacity: 0.7;
}

.hero h1 {
  color: white;
  font-size: clamp(40px, 5vw, 68px);
  line-height: 1.04;
  letter-spacing: -1.5px;
  margin: 0;
  font-weight: 500;
}

.hero h1 strong {
  display: block;
  color: #f59b24;
  font-weight: 800;
}

.hero p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 19px;
  line-height: 1.7;
  max-width: 580px;
  margin: 22px auto 0;
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 3;
}

.hero-wave svg {
  width: 100%;
  height: clamp(60px, 8vw, 120px);
  display: block;
}

/* =========================================================
   FORM SECTION
========================================================= */
.form-section {
  position: relative;
  z-index: 10;
  margin-top: -90px;
  padding-bottom: 120px;
}

.form-container {
  width: min(650px, 92%);
  margin: 0 auto;
}

.guestbook-card {
  background: white;
  border-radius: 28px;
  padding: 55px 50px 65px;
  box-shadow: 0 35px 80px rgba(42, 22, 14, 0.08);
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: 16px;
  color: #94A3B8;
  display: flex;
  align-items: center;
}

.form-group input {
  width: 100%;
  height: 52px;
  background: #EFF6FF; /* light blue */
  border: none;
  border-radius: 12px;
  padding: 0 20px 0 46px; /* Space for icon */
  font-size: 15px;
  color: #0F172A;
  font-family: inherit;
  transition: 0.25s;
}

.form-group input::placeholder {
  color: #94A3B8;
}

.form-group input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #DBEAFE;
}

.submit-button {
  width: 100%;
  height: 56px;
  background: #D97706; /* Orange button */
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
}

.submit-button:hover:not(:disabled) {
  background: #B45309;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(217, 119, 6, 0.25);
}

.button-arrow {
  font-size: 24px;
  font-weight: 400;
}

/* =========================================================
   CTA
========================================================= */
.cta-section {
  background: linear-gradient(120deg, #351f17, #4b2a1e);
  padding: 120px 20px;
  text-align: center;
}

.cta-content {
  max-width: 820px;
  margin: auto;
}

.cta-label {
  color: #f39a27;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 4px;
}

.cta-content h2 {
  color: white;
  font-size: clamp(40px, 5vw, 62px);
  line-height: 1.08;
  margin: 20px 0;
  font-weight: 800;
}

.cta-content h2 span {
  color: #f39a27;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.72);
  font-size: 18px;
  line-height: 1.8;
  margin: 0 auto 35px;
  max-width: 600px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 17px 30px;
  background: #f39a27;
  color: #351f17;
  text-decoration: none;
  border-radius: 15px;
  font-size: 19px;
  font-weight: 800;
  transition: 0.25s;
}

.cta-button span {
  font-size: 25px;
}

.cta-button:hover {
  transform: translateY(-3px);
  background: #ffab3d;
}

/* =========================================================
   FOOTER
========================================================= */
.footer {
  background: #281711;
  color: white;
  padding: 45px 0;
}

.footer-inner {
  width: min(1400px, calc(100% - 80px));
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.footer-logo {
  color: #f39a27;
  font-size: 24px;
  font-weight: 800;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.55);
  font-size: 15px;
  margin-top: 8px;
}

.footer-copy {
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
}

@media (max-width: 768px) {
  .guestbook-card {
    padding: 40px 25px 45px;
  }
  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
