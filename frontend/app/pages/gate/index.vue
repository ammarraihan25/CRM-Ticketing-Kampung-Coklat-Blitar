<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const scanStatus = ref<'idle' | 'success' | 'error'>('idle')
const manualCode = ref('')

const checkTicket = () => {
  if (manualCode.value === 'TIX-123') {
    scanStatus.value = 'success'
  } else {
    scanStatus.value = 'error'
  }
  
  // Auto reset after 3 seconds
  setTimeout(() => {
    scanStatus.value = 'idle'
    manualCode.value = ''
  }, 3000)
}
</script>

<template>
  <div class="gate-container">
    <div class="header">
      <h1>Gate Access Scanner</h1>
      <p>Scan tiket pengunjung di sini</p>
    </div>

    <div class="scanner-box card" :class="{'bg-success-light': scanStatus === 'success', 'bg-error-light': scanStatus === 'error'}">
      <div class="camera-placeholder" :class="{'scanning': scanStatus === 'idle'}">
        <p v-if="scanStatus === 'idle'">📷 Kamera Scanner Aktif...</p>
        <p v-else-if="scanStatus === 'success'" class="text-success" style="font-size: 64px;">✅</p>
        <p v-else class="text-error" style="font-size: 64px;">❌</p>
      </div>
      
      <div class="manual-input">
        <label>Atau masukkan kode tiket manual:</label>
        <div class="input-group">
          <input type="text" class="input" v-model="manualCode" placeholder="Contoh: TIX-123" @keyup.enter="checkTicket" />
          <button class="btn-primary" @click="checkTicket">Cek Tiket</button>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="scanStatus === 'success'" class="status-box card success-status">
      <h2>✅ TIKET VALID</h2>
      <p>Akses Masuk Diizinkan</p>
    </div>
    
    <div v-if="scanStatus === 'error'" class="status-box card error-status">
      <h2>❌ TIKET TIDAK VALID</h2>
      <p>Tiket tidak ditemukan atau sudah digunakan (Passback).</p>
    </div>
  </div>
</template>

<style scoped>
.gate-container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: var(--spacing-lg);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.scanner-box {
  margin-bottom: var(--spacing-md);
}

.camera-placeholder {
  background-color: var(--color-primary-20);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--rounded-md);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
  font-weight: 500;
  font-size: var(--text-body-lg);
}

.manual-input {
  margin-top: var(--spacing-md);
}

.manual-input label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.input-group {
  display: flex;
  gap: var(--spacing-sm);
}

.status-box {
  text-align: center;
  margin-top: var(--spacing-lg);
  border: 2px solid var(--color-border);
}

.success-status {
  border-color: #2ecc71; /* Green success color */
  background-color: #eafaf1;
}

.success-status h2 {
  color: #27ae60;
}

.error-status {
  border-color: var(--color-error);
  background-color: #fdecea;
}

.error-status h2 {
  color: var(--color-error);
}
</style>
