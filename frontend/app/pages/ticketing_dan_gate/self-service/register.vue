<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'

definePageMeta({
  layout: false
})

const router = useRouter()
const isUserLoggedIn = useState('selfServiceAuth', () => false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: ''
})

const isLoading = ref(false)

const handleRegister = () => {
  if (form.value.password !== form.value.passwordConfirm) {
    alert("Password tidak cocok!")
    return
  }
  
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    isUserLoggedIn.value = true
    router.push('/ticketing_dan_gate/self-service')
  }, 1000)
}

const goToLogin = () => {
  router.push('/ticketing_dan_gate/self-service/login')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="split-layout">
    
    <!-- Left Side: Image / Branding (Hidden on mobile) -->
    <div class="brand-section">
      <div class="brand-overlay"></div>
      <div class="brand-content">
        <h1 class="brand-title">Kampung Coklat</h1>
        <p class="brand-subtitle">Bergabunglah bersama kami dan dapatkan berbagai promo menarik setiap harinya.</p>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="form-section-container">
      <div class="login-container">
        
        <!-- Back Button -->
        <button @click="goBack" class="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <!-- Header -->
        <div class="header-section text-center">
          <h2 class="title">Daftar Akun Baru</h2>
          <p class="subtitle">Lengkapi data diri Anda untuk menikmati layanan kami</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="form-section">
          
          <div class="input-group">
            <label for="name">Nama Lengkap</label>
            <div class="input-wrapper">
              <div class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <div class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                placeholder="Masukkan alamat email"
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="phone">No. WhatsApp</label>
            <div class="input-wrapper">
              <div class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                placeholder="Contoh: 081234567890"
                required
              />
            </div>
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <div class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type="password" 
                id="password" 
                v-model="form.password" 
                placeholder="Buat password"
                required
                minlength="6"
              />
            </div>
          </div>

          <div class="input-group">
            <label for="passwordConfirm">Konfirmasi Password</label>
            <div class="input-wrapper">
              <div class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <input 
                type="password" 
                id="passwordConfirm" 
                v-model="form.passwordConfirm" 
                placeholder="Ulangi password"
                required
                minlength="6"
              />
            </div>
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="!isLoading">Daftar</span>
            <span v-else class="loader"></span>
          </button>

        </form>

        <!-- Footer -->
        <div class="footer-section text-center mt-6">
          <p class="text-gray text-sm">
            Sudah punya akun? 
            <a href="#" @click.prevent="goToLogin" class="text-orange font-bold">Masuk di sini</a>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.split-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #ffffff;
}

/* LEFT SIDE BRANDING */
.brand-section {
  display: none;
  position: relative;
  width: 50%;
  background: url('~/assets/assets_POS/kamcok1.jpg') center/cover no-repeat;
}

@media (min-width: 992px) {
  .brand-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 60px;
  }
}

.brand-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(59, 42, 33, 0.2) 0%, rgba(59, 42, 33, 0.9) 100%);
}

.brand-content {
  position: relative;
  z-index: 2;
  color: #ffffff;
}

.brand-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: -1px;
}

.brand-subtitle {
  font-size: 18px;
  opacity: 0.9;
  line-height: 1.5;
  margin: 0;
  max-width: 80%;
}


/* RIGHT SIDE FORM */
.form-section-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
}

@media (min-width: 992px) {
  .form-section-container {
    width: 50%;
  }
}

.login-container {
  width: 100%;
  max-width: 440px;
}

.back-btn {
  position: absolute;
  top: 32px;
  left: 32px;
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
}
@media (max-width: 991px) {
  .back-btn { top: 20px; left: 20px; }
}

.back-btn:hover {
  background: #E5E7EB;
  color: #111827;
}

.text-center { text-align: center; }
.mt-6 { margin-top: 32px; }
.text-sm { font-size: 14px; }
.font-bold { font-weight: 700; }
.text-orange { color: #D97706; text-decoration: none; }
.text-orange:hover { text-decoration: underline; }
.text-gray { color: #6B7280; }

.header-section {
  margin-bottom: 32px;
  margin-top: 20px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 15px;
  color: #6B7280;
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper .icon {
  position: absolute;
  left: 16px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 15px 16px 15px 44px;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-size: 15px;
  color: #111827;
  transition: all 0.3s ease;
  background: #ffffff;
  font-family: inherit;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #D97706;
  box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
}

.input-wrapper input::placeholder {
  color: #9CA3AF;
}

.btn-primary {
  width: 100%;
  padding: 16px;
  background-color: #D97706;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
}

.btn-primary:hover:not(:disabled) {
  background-color: #B45309;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(180, 83, 9, 0.25);
}

.btn-primary:disabled {
  background-color: #FCD34D;
  cursor: not-allowed;
}

.loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
