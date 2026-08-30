<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '#app'
import AppDatePicker from '~/components/shared/AppDatePicker.vue'

definePageMeta({
  layout: false
})

const router = useRouter()
const authCookie = useCookie('selfServiceAuth')
const userCookie = useCookie('selfServiceUserName')

const form = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
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
    authCookie.value = 'true'
    userCookie.value = form.value.name || 'Sobat Coklat'
    
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
  <div class="login-role-page">
    <section class="form-section">
      <div class="form-container">
        <div class="login-card-split">
          
          <!-- Left Column: Article Panel with Image -->
          <div class="card-left-article">
            <h2 class="article-title">Kampung Coklat</h2>
            <p class="article-content">Bergabunglah bersama kami dan dapatkan berbagai promo menarik setiap harinya.</p>
          </div>

          <!-- Right Column: Form -->
          <div class="card-right-form relative-form">
            
            <!-- Back Button -->
            <button @click="goBack" class="back-btn-new" title="Kembali">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>

            <!-- Header -->
            <div class="form-header-unified">
              <h2 class="info-title">Daftar Akun Baru</h2>
              <p class="info-desc">Lengkapi data diri Anda untuk menikmati layanan kami</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleRegister" class="clean-auth-form">
              
              <div class="form-group">
                <label for="name" class="field-label">Nama Lengkap</label>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    class="field-input"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="field-label">Email</label>
                <div class="input-wrap">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    class="field-input"
                    placeholder="Masukkan alamat email"
                    required
                  />
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="phone" class="field-label">No. WhatsApp</label>
                  <div class="input-wrap">
                    <span class="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="form.phone" 
                      class="field-input"
                      placeholder="081234567890"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="birthDate" class="field-label">Tanggal Lahir</label>
                  <AppDatePicker 
                    v-model="form.birthDate" 
                    placeholder="Pilih Tanggal Lahir"
                  />
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="password" class="field-label">Password</label>
                  <div class="input-wrap">
                    <span class="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </span>
                    <input 
                      type="password" 
                      id="password" 
                      v-model="form.password" 
                      class="field-input"
                      placeholder="Minimal 6 karakter"
                      required
                      minlength="6"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="passwordConfirm" class="field-label">Konfirmasi Password</label>
                  <div class="input-wrap">
                    <span class="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </span>
                    <input 
                      type="password" 
                      id="passwordConfirm" 
                      v-model="form.passwordConfirm" 
                      class="field-input"
                      placeholder="Ulangi password"
                      required
                      minlength="6"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" class="btn-submit-primary" :disabled="isLoading">
                <span v-if="!isLoading">Daftar &rarr;</span>
                <span v-else class="loading-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-anim"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
                  <span>Mendaftarkan...</span>
                </span>
              </button>
            </form>
            
            <!-- Footer -->
            <div class="footer-section text-center mt-4">
              <p class="text-gray text-sm">
                Sudah punya akun? 
                <a href="#" @click.prevent="goToLogin" class="text-orange font-bold">Masuk di sini</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Jost:wght@400;500;600;700;800&display=swap');

* { box-sizing: border-box; }

.login-role-page {
  height: 100vh;
  width: 100%;
  background: #fffaf5;
  color: #321d16;
  font-family: 'Jost', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.form-section {
  background: #fffaf5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 1040px;
  padding: 0 24px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.login-card-split {
  width: 100%;
  background: white;
  border: 1px solid rgba(44, 26, 19, 0.08);
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 24px 48px rgba(44, 26, 19, 0.08), 0 8px 16px rgba(44, 26, 19, 0.04);
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  overflow: hidden;
  min-height: 600px;
}

.card-left-article {
  background-image: 
    linear-gradient(145deg, rgba(44, 26, 19, 0.65) 0%, rgba(23, 13, 9, 0.82) 100%),
    url('~/assets/assets_POS/kamcok1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 60px 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.article-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  line-height: 1.25;
}

.article-content {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
}

.card-right-form {
  padding: 40px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #FFFFFF;
}

.relative-form {
  position: relative;
}

.back-btn-new {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #F3F4F6;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back-btn-new:hover {
  background: #E5E7EB;
  color: #111827;
}

.form-header-unified {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
}

.info-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0 0 6px 0;
}

.info-desc {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.clean-auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.field-input {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100%;
  padding: 10px 14px 10px 42px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  font-size: 13.5px;
  color: #111827;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.01) inset;
  height: 44px;
  box-sizing: border-box;
}

.date-input {
  padding-right: 12px;
  color: #374151;
}

@media (max-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}

.field-input::placeholder { color: #9CA3AF; }
.field-input:focus { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }

.btn-submit-primary {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  background: #2C1A13;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(44, 26, 19, 0.1);
  min-height: 44px;
}

.btn-submit-primary:hover:not(:disabled) {
  background: #F59E0B;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  transform: translateY(-1px);
}
.btn-submit-primary:disabled {
  background: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
  box-shadow: none;
}

.text-center { text-align: center; }
.mt-4 { margin-top: 16px; }
.text-sm { font-size: 13px; }
.font-bold { font-weight: 700; }
.text-orange { color: #F59E0B; text-decoration: none; }
.text-orange:hover { text-decoration: underline; }
.text-gray { color: #6B7280; }

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim { animation: spin 0.8s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

@media (max-width: 860px) {
  .login-card-split {
    grid-template-columns: 1fr;
  }
}
</style>
