<script setup lang="ts">
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

definePageMeta({
  layout: 'blank'
})

const scanStatus = ref<'idle' | 'success' | 'error'>('idle')
const manualCode = ref('')
const isCameraActive = ref(true)
const lastDetectedCode = ref('')

const onDetect = (detectedCodes: any[]) => {
  if (detectedCodes.length > 0) {
    const code = detectedCodes[0].rawValue
    if (code !== lastDetectedCode.value) {
      lastDetectedCode.value = code
      manualCode.value = code
      isCameraActive.value = false // Pause camera processing
      checkTicket(code)
    }
  }
}

const checkTicket = (codeToVerify?: string) => {
  const code = codeToVerify || manualCode.value
  
  // Optimal Simulation Logic: Prefix 'TIX-' is valid, others invalid
  if (code && code.toUpperCase().startsWith('TIX-')) {
    scanStatus.value = 'success'
  } else {
    scanStatus.value = 'error'
  }
  
  // Auto reset after 3 seconds
  setTimeout(() => {
    scanStatus.value = 'idle'
    manualCode.value = ''
    lastDetectedCode.value = ''
    isCameraActive.value = true
  }, 3000)
}

const onInit = (promise: Promise<void>) => {
  promise.catch((error) => {
    console.error("Camera Init Error:", error)
    if (error.name === 'NotAllowedError') {
      alert("Izin kamera ditolak. Harap izinkan akses kamera di browser Anda.")
    } else if (error.name === 'NotFoundError') {
      alert("Kamera tidak ditemukan di perangkat ini.")
    }
  })
}
</script>

<template>
  <div class="gate-container">
    <div class="header">
      <h1>Gate Access Scanner</h1>
      <p>Scan tiket pengunjung di sini (Kode valid diawali dengan <strong>TIX-</strong>)</p>
    </div>

    <div class="scanner-box card">
      <div class="camera-placeholder">
        <ClientOnly>
          <div class="camera-wrapper">
             <!-- Kamera selalu dirender, cuma dipause deteksinya saat sedang menampilkan pesan -->
             <QrcodeStream :paused="!isCameraActive" @detect="onDetect" @init="onInit" :track="true" />
             
             <!-- Overlay Status: Memproses (saat idle dan !isCameraActive sesaat sebelum success/error) -->
             <div v-if="!isCameraActive && scanStatus === 'idle'" class="overlay-status loading-overlay">
               <div class="spinner"></div>
               <p>Memproses tiket...</p>
             </div>

             <!-- Overlay Status: Success -->
             <div v-if="scanStatus === 'success'" class="overlay-status success-overlay">
                <div class="status-content">
                  <div class="status-icon">✅</div>
                  <h2>TIKET VALID</h2>
                  <p class="status-desc"><strong>Akses Masuk Diizinkan</strong></p>
                  <p class="status-code">Kode: {{ manualCode }}</p>
                </div>
             </div>
             
             <!-- Overlay Status: Error -->
             <div v-if="scanStatus === 'error'" class="overlay-status error-overlay">
                <div class="status-content">
                  <div class="status-icon">❌</div>
                  <h2>TIKET TIDAK VALID</h2>
                  <p class="status-desc"><strong>Akses Ditolak!</strong></p>
                  <p class="status-code">Tiket tidak valid atau Passback.</p>
                </div>
             </div>
          </div>
          
          <template #fallback>
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height: 100%;">
              <div class="spinner"></div>
              <p style="margin-top: 10px;">Memuat Scanner Kamera...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
      
      <div class="manual-input" :class="{'opacity-50': scanStatus !== 'idle'}">
        <label>Atau masukkan kode tiket manual:</label>
        <div class="input-group">
          <input type="text" class="input" v-model="manualCode" placeholder="Contoh: TIX-12345" @keyup.enter="() => checkTicket()" :disabled="scanStatus !== 'idle'" />
          <button class="btn-primary" @click="() => checkTicket()" :disabled="scanStatus !== 'idle'">Cek Tiket</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gate-container {
  max-width: 650px;
  margin: 0 auto;
  padding-top: var(--spacing-lg);
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.header h1 {
  color: #2c1a13;
  font-weight: 800;
  margin-bottom: 8px;
}

.header p {
  color: #5c4538;
}

.scanner-box {
  border: 1px solid #fce4ce;
  background: #fffdf5;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.05);
  padding: 24px;
  border-radius: 20px;
}

.camera-placeholder {
  background-color: #2c1a13;
  height: 340px; /* Ukuran kamera lebih ideal */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

.camera-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.camera-wrapper :deep(.qrcode-stream-camera) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* OVERLAYS */
.overlay-status {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  backdrop-filter: blur(6px);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.loading-overlay {
  background-color: rgba(44, 26, 19, 0.7);
  color: white;
}

.success-overlay {
  background-color: rgba(39, 174, 96, 0.85); /* Hijau transparan */
  color: white;
}

.error-overlay {
  background-color: rgba(192, 57, 43, 0.85); /* Merah transparan */
  color: white;
}

.status-content {
  background: rgba(255, 255, 255, 0.15);
  padding: 24px 48px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

.status-icon {
  font-size: 56px;
  margin-bottom: 12px;
  line-height: 1;
  text-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.overlay-status h2 {
  font-size: 28px;
  margin: 0 0 8px 0;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.status-desc {
  font-size: 16px;
  margin: 0 0 12px 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.status-code {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  background: rgba(0,0,0,0.2);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.manual-input {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed #fce4ce;
  transition: opacity 0.3s;
}

.opacity-50 {
  opacity: 0.5;
  pointer-events: none;
}

.manual-input label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  color: #2c1a13;
}

.input-group {
  display: flex;
  gap: var(--spacing-sm);
}

.input {
  flex: 1;
  padding: 12px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  background: white;
}
.input:focus {
  border-color: #f29727;
}

.btn-primary {
  background: #2c1a13;
  color: #fff;
  border: none;
  padding: 0 24px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.btn-primary:hover:not(:disabled) {
  background: #f29727;
}
.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
