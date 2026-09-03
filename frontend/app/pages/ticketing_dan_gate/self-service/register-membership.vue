<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useState } from '#app'
import AppDatePicker from '~/components/shared/AppDatePicker.vue'

definePageMeta({
  layout: false
})

const router = useRouter()
const route = useRoute()

const membershipType = ref(route.query.type || 'Regular')
const activeMemberships = useState<string[]>('selfServiceMembership', () => [])
const savedUserName = useState('selfServiceUserName', () => 'Sobat Coklat')

const form = ref({
  name: savedUserName.value,
  idNumber: '',
  birthDate: '',
  address: ''
})

const isLoading = ref(false)

const handleRegisterMembership = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    const type = membershipType.value as string
    if (!activeMemberships.value.includes(type)) {
      activeMemberships.value.push(type)
    }
    router.push('/ticketing_dan_gate/self-service/membership')
  }, 1000)
}

const goBack = () => {
  router.push('/ticketing_dan_gate/self-service/membership')
}
</script>

<template>
  <div class="login-role-page">
    <section class="form-section">
      <div class="form-container">
        <div class="login-card-split">
          
          <!-- Left Column: Article Panel with Image -->
          <div class="card-left-article">
            <h2 class="article-title">Member {{ membershipType }}</h2>
            <p class="article-content">Lengkapi pendaftaran Anda untuk mendapatkan berbagai keuntungan eksklusif dari Kampung Coklat.</p>
          </div>

          <!-- Right Column: Form -->
          <div class="card-right-form relative-form">
            
            <!-- Back Button -->
            <button @click="goBack" class="back-btn-new" title="Kembali">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>

            <!-- Header -->
            <div class="form-header-unified">
              <h2 class="info-title">Pendaftaran Keanggotaan</h2>
              <p class="info-desc">Lengkapi data tambahan untuk aktivasi Member {{ membershipType }}</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleRegisterMembership" class="clean-auth-form">
              
              <div class="form-group">
                <label for="name" class="field-label">Nama Sesuai Identitas</label>
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

              <div class="form-row-2">
                <div class="form-group">
                  <label for="idNumber" class="field-label">Nomor Identitas (KTP/KIA)</label>
                  <div class="input-wrap">
                    <span class="input-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </span>
                    <input 
                      type="text" 
                      id="idNumber" 
                      v-model="form.idNumber" 
                      class="field-input"
                      placeholder="Masukkan No. Identitas"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="birthDate" class="field-label">Tanggal Lahir</label>
                  <AppDatePicker 
                    v-model="form.birthDate" 
                    placeholder="Pilih Tanggal Lahir"
                    popover-placement="bottom-right"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="address" class="field-label">Alamat Lengkap</label>
                <div class="input-wrap align-top">
                  <span class="input-icon" style="top: 13px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </span>
                  <textarea 
                    id="address" 
                    v-model="form.address" 
                    class="field-input custom-textarea"
                    placeholder="Masukkan alamat domisili"
                    required
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <button type="submit" class="btn-submit-primary" :disabled="isLoading">
                <span v-if="!isLoading">Daftar Member {{ membershipType }} &rarr;</span>
                <span v-else class="loading-state">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-anim"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
                  <span>Mendaftarkan...</span>
                </span>
              </button>

            </form>

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
  min-height: 100vh;
  width: 100%;
  background: #fffaf5;
  color: #321d16;
  font-family: 'Jost', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.form-section {
  background: #fffaf5;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.form-container {
  width: 100%;
  max-width: 1000px;
  padding: 0 16px;
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
  box-shadow: 0 20px 40px rgba(44, 26, 19, 0.06), 0 4px 12px rgba(44, 26, 19, 0.03);
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  overflow: visible;
  min-height: 580px;
}

.card-left-article {
  background-image: 
    linear-gradient(145deg, rgba(44, 26, 19, 0.7) 0%, rgba(23, 13, 9, 0.88) 100%),
    url('~/assets/assets_POS/kamcok1.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 60px 44px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 24px 0 0 24px;
}

.article-title {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 12px 0;
  line-height: 1.25;
}

.article-content {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
}

.card-right-form {
  padding: 36px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #FFFFFF;
  position: relative;
  border-radius: 0 24px 24px 0;
}

.relative-form {
  position: relative;
}

.back-btn-new {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  color: #4B5563;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.back-btn-new:hover {
  background: #E5E7EB;
  color: #111827;
  transform: scale(1.05);
}

.form-header-unified {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  padding-top: 6px;
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
  font-size: 13.5px;
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
  font-size: 12.5px;
  font-weight: 700;
  color: #374151;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.input-wrap.align-top {
  align-items: flex-start;
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
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-size: 14px;
  color: #111827;
  font-weight: 500;
  outline: none;
  transition: all 0.2s ease;
  height: 46px;
  box-sizing: border-box;
}

.custom-textarea {
  resize: vertical;
  height: auto;
  min-height: 80px;
}

.field-input::placeholder { color: #9CA3AF; }
.field-input:focus { border-color: #D97706; box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.12); }

.btn-submit-primary {
  font-family: 'Jost', 'Plus Jakarta Sans', sans-serif;
  background: #2C1A13;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  box-shadow: 0 3px 6px rgba(44, 26, 19, 0.12);
  min-height: 48px;
  width: 100%;
}

.btn-submit-primary:hover:not(:disabled) {
  background: #D97706;
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.25);
  transform: translateY(-1px);
}
.btn-submit-primary:disabled {
  background: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
  box-shadow: none;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spin-anim { animation: spin 0.8s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

@media (max-width: 860px) {
  .form-section {
    padding: 24px 14px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    max-width: 460px;
    width: 100%;
    padding: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-card-split {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 24px;
    box-shadow: 0 16px 36px rgba(44, 26, 19, 0.08), 0 4px 12px rgba(44, 26, 19, 0.04);
    margin: auto;
    width: 100%;
  }

  .card-left-article {
    display: flex !important;
    height: 190px;
    min-height: 190px;
    padding: 28px 22px 20px 22px;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 24px 24px 0 0;
  }

  .article-title {
    font-size: 26px;
    margin-bottom: 6px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
  }

  .article-content {
    font-size: 13px;
    line-height: 1.45;
    max-width: 320px;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .card-right-form {
    padding: 24px 20px 28px 20px;
    border-radius: 0 0 24px 24px;
  }

  .back-btn-new {
    top: 18px;
    left: 18px;
    width: 38px;
    height: 38px;
  }

  .form-header-unified {
    margin-bottom: 20px;
    padding-top: 4px;
    padding-left: 28px;
    padding-right: 28px;
  }

  .info-title {
    font-size: 22px;
    font-weight: 800;
  }

  .info-desc {
    font-size: 13px;
    line-height: 1.4;
  }
}

@media (max-width: 640px) {
  .form-row-2 {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .form-section {
    padding: 12px 10px;
  }

  .card-right-form {
    padding: 22px 16px 26px 16px;
  }

  .field-input {
    font-size: 14px;
    height: 46px;
    border-radius: 12px;
  }

  .btn-submit-primary {
    min-height: 48px;
    font-size: 15px;
    border-radius: 12px;
  }
}
</style>

