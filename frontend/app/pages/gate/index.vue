<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { usePosTransactions } from '~/composables/usePosTransactions'

definePageMeta({
  layout: 'blank'
})

const { transactions } = usePosTransactions()

interface ScanRecord {
  code: string
  ticketName: string
  channel: 'POS Kasir' | 'Self-Service' | 'Online / WA'
  visitorName: string
  qty: number
  timestamp: string
  status: 'GRANTED' | 'REJECTED'
  reason?: string
}

const scanStatus = ref<'idle' | 'success' | 'error'>('idle')
const manualCode = ref('')
const isCameraActive = ref(true)
const lastDetectedCode = ref('')
const statusMessage = ref('')
const verifiedTicket = ref<{
  code: string
  name: string
  channel: string
  customer: string
  qty: number
  time: string
} | null>(null)

// History of scans in this session
const scanLogs = ref<ScanRecord[]>([
  {
    code: 'TRX-2045',
    ticketName: 'Tiket Terusan Unlimited',
    channel: 'Self-Service',
    visitorName: 'Ibu Ratna & Keluarga',
    qty: 4,
    timestamp: '14:05:12',
    status: 'GRANTED'
  },
  {
    code: 'TRX-2044',
    ticketName: 'Tiket Reguler Masuk',
    channel: 'POS Kasir',
    visitorName: 'Pak Hendra (Umum)',
    qty: 2,
    timestamp: '13:58:40',
    status: 'GRANTED'
  }
])

// Set of already scanned codes to simulate Anti-Passback protection
const scannedCodes = ref<Set<string>>(new Set(['TRX-2045', 'TRX-2044']))

// Web Audio API beep generator for Gate buzzer / chime
const playGateSound = (type: 'success' | 'error') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()

    if (type === 'success') {
      // Pleasant high double chime (Ding-Dong)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(880, ctx.currentTime) // A5
      gain1.gain.setValueAtTime(0.3, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start(ctx.currentTime)
      osc1.stop(ctx.currentTime + 0.15)

      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.12) // E6
      gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.12)
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start(ctx.currentTime + 0.12)
      osc2.stop(ctx.currentTime + 0.35)
    } else {
      // Low warning buzz
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      osc.frequency.setValueAtTime(160, ctx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.3, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.3)
    }
  } catch (e) {
    // Audio context not allowed or failed, silently ignore
  }
}

const onDetect = (detectedCodes: any[]) => {
  if (detectedCodes.length > 0) {
    const rawVal = detectedCodes[0].rawValue || ''
    const code = String(rawVal).trim()
    if (code && code !== lastDetectedCode.value && scanStatus.value === 'idle') {
      lastDetectedCode.value = code
      manualCode.value = code
      isCameraActive.value = false
      verifyAndOpenGate(code)
    }
  }
}

const verifyAndOpenGate = async (rawCode?: string) => {
  const code = (rawCode || manualCode.value || '').trim()
  if (!code) return

  const now = new Date()
  const timeString = now.toTimeString().split(' ')[0]
  const upperCode = code.toUpperCase()

  // 1. Check Anti-Passback (if scanned within active session)
  if (scannedCodes.value.has(upperCode)) {
    scanStatus.value = 'error'
    statusMessage.value = 'Akses Ditolak (Anti-Passback): Tiket sudah digunakan!'
    playGateSound('error')
    scanLogs.value.unshift({
      code: upperCode,
      ticketName: 'Tiket Gate Masuk',
      channel: upperCode.startsWith('KC-TIX') ? 'Self-Service' : 'POS Kasir',
      visitorName: 'Pengunjung',
      qty: 1,
      timestamp: timeString,
      status: 'REJECTED',
      reason: 'Anti-Passback: Sudah Digunakan'
    })
    resetScannerWithDelay()
    return
  }

  // 2. Try Backend API Verification
  let isBackendSuccess = false
  try {
    const res = await $fetch<{ success: boolean; message?: string; data?: any }>('http://localhost:8000/api/v1/gate/scan', {
      method: 'POST',
      body: { encrypted_payload: code },
      timeout: 2000
    })
    if (res && res.success) {
      isBackendSuccess = true
    }
  } catch (err: any) {
    // If backend returns specific 400 rejection (like expired or passback), handle it
    if (err.data && err.data.message) {
      scanStatus.value = 'error'
      statusMessage.value = err.data.message
      playGateSound('error')
      scanLogs.value.unshift({
        code: upperCode,
        ticketName: 'Tiket Gate',
        channel: 'POS Kasir',
        visitorName: 'Pengunjung',
        qty: 1,
        timestamp: timeString,
        status: 'REJECTED',
        reason: err.data.message
      })
      resetScannerWithDelay()
      return
    }
    // Else continue to local POS/Self-Service ticket resolution
  }

  // 3. Match against Local POS / Self-Service Transactions
  const matchingTrx = transactions.value.find(t => 
    t.id.toUpperCase() === upperCode || 
    upperCode.includes(t.id.toUpperCase())
  )

  // 4. Validate Pattern Formats:
  // - POS Kasir: TRX-..., POS-..., TCK-...
  // - Self-Service: KC-TIX-..., SS-..., SS-TRX-...
  // - Gate Valid Prefixes: TIX-..., TICKET-..., GATE-...
  const isValidFormat = 
    isBackendSuccess ||
    !!matchingTrx ||
    upperCode.startsWith('TRX-') ||
    upperCode.startsWith('KC-TIX-') ||
    upperCode.startsWith('TIX-') ||
    upperCode.startsWith('POS-') ||
    upperCode.startsWith('SS-') ||
    upperCode.startsWith('TCK-') ||
    upperCode.startsWith('TICKET-') ||
    upperCode.startsWith('GATE-')

  if (isValidFormat) {
    // Determine metadata
    let ticketName = 'Tiket Masuk Reguler'
    let channel: 'POS Kasir' | 'Self-Service' | 'Online / WA' = 'POS Kasir'
    let visitorName = 'Pengunjung Umum'
    let qty = 1

    if (matchingTrx) {
      ticketName = matchingTrx.type || matchingTrx.items?.[0]?.name || 'Tiket Wisata'
      channel = matchingTrx.channel === 'Self-Service' ? 'Self-Service' : 'POS Kasir'
      visitorName = matchingTrx.customer || 'Pengunjung'
      qty = matchingTrx.qty || 1
    } else if (upperCode.startsWith('KC-TIX') || upperCode.startsWith('SS-')) {
      channel = 'Self-Service'
      ticketName = 'Tiket Wisata Kios Mandiri'
      visitorName = 'Pengunjung Self-Service'
      qty = 2
    } else if (upperCode.startsWith('TRX-')) {
      channel = 'POS Kasir'
      ticketName = 'Tiket Masuk & Wahana POS'
      visitorName = 'Pengunjung Loket Kasir'
      qty = 1
    } else {
      channel = 'Online / WA'
      ticketName = 'Tiket Reservasi Digital'
      visitorName = 'Pengunjung Terverifikasi'
      qty = 1
    }

    verifiedTicket.value = {
      code: upperCode,
      name: ticketName,
      channel,
      customer: visitorName,
      qty,
      time: timeString
    }

    scannedCodes.value.add(upperCode)
    scanStatus.value = 'success'
    statusMessage.value = 'Akses Masuk Diizinkan • Gate Terbuka'
    playGateSound('success')

    scanLogs.value.unshift({
      code: upperCode,
      ticketName,
      channel,
      visitorName,
      qty,
      timestamp: timeString,
      status: 'GRANTED'
    })
  } else {
    scanStatus.value = 'error'
    statusMessage.value = 'Akses Ditolak: Kode QR Tidak Dikenali'
    playGateSound('error')

    scanLogs.value.unshift({
      code: upperCode,
      ticketName: 'Format Tidak Dikenal',
      channel: 'POS Kasir',
      visitorName: 'Tidak Diketahui',
      qty: 0,
      timestamp: timeString,
      status: 'REJECTED',
      reason: 'Format QR Tidak Terdaftar'
    })
  }

  resetScannerWithDelay()
}

const resetScannerWithDelay = () => {
  setTimeout(() => {
    scanStatus.value = 'idle'
    manualCode.value = ''
    lastDetectedCode.value = ''
    isCameraActive.value = true
    verifiedTicket.value = null
  }, 3500)
}

const testQuickCode = (code: string) => {
  manualCode.value = code
  verifyAndOpenGate(code)
}

const onInit = (promise: Promise<void>) => {
  promise.catch((error) => {
    console.warn("Camera Init Note:", error)
  })
}
</script>

<template>
  <div class="gate-page-wrapper">
    <!-- Top Brand Navbar -->
    <header class="gate-navbar">
      <div class="nav-brand">
        <img src="~/assets/assets_POS/KAMPUNGCOKLAT.png" alt="Kampung Coklat" class="brand-logo" />
        <div class="brand-text">
          <span class="brand-title">Turnstile Gate Access</span>
          <span class="brand-sub">Sistem Validasi Tiket Masuk • Gate 01 Utama</span>
        </div>
      </div>
      <div class="nav-status">
        <span class="pulse-indicator"></span>
        <span class="status-badge">GATE ONLINE</span>
      </div>
    </header>

    <div class="gate-container">
      <!-- Title & Instruction Header -->
      <div class="header-section">
        <h1 class="main-title">Turnstile Gate Scanner</h1>
        <p class="subtitle">
          Arahkan QR Code Tiket (dari <strong>POS Kasir</strong> maupun <strong>Kios Self-Service</strong>) ke kamera pemindai.
        </p>
      </div>

      <!-- Main Scanner Card -->
      <div class="scanner-card">
        <div class="camera-viewport">
          <ClientOnly>
            <div class="camera-wrapper">
              <!-- QrcodeStream Video Stream -->
              <QrcodeStream 
                :paused="!isCameraActive" 
                @detect="onDetect" 
                @init="onInit" 
                :track="true" 
              />

              <!-- Laser Scanning Animation Line (Active when Idle) -->
              <div v-if="isCameraActive && scanStatus === 'idle'" class="laser-scanner-line"></div>
              
              <!-- Scanning Target Frame Guide -->
              <div v-if="scanStatus === 'idle'" class="scanner-target-frame">
                <div class="corner top-left"></div>
                <div class="corner top-right"></div>
                <div class="corner bottom-left"></div>
                <div class="corner bottom-right"></div>
                <span class="guide-text">Posisikan Kode QR di dalam kotak</span>
              </div>

              <!-- Overlay Status: Memproses -->
              <div v-if="!isCameraActive && scanStatus === 'idle'" class="overlay-status loading-overlay">
                <div class="scanner-spinner"></div>
                <p class="overlay-text">Memvalidasi Tiket...</p>
              </div>

              <!-- Overlay Status: Success (TIKET VALID) -->
              <div v-if="scanStatus === 'success'" class="overlay-status success-overlay">
                <div class="status-card-inner">
                  <div class="status-icon-bubble success-bubble">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h2 class="status-heading text-success">TIKET VALID</h2>
                  <p class="status-subtext">{{ statusMessage }}</p>
                  
                  <div v-if="verifiedTicket" class="ticket-detail-box">
                    <div class="td-row">
                      <span class="td-lbl">Kode Tiket:</span>
                      <span class="td-val font-mono font-bold">{{ verifiedTicket.code }}</span>
                    </div>
                    <div class="td-row">
                      <span class="td-lbl">Jenis:</span>
                      <span class="td-val">{{ verifiedTicket.name }}</span>
                    </div>
                    <div class="td-row">
                      <span class="td-lbl">Kanal:</span>
                      <span class="td-badge" :class="verifiedTicket.channel === 'Self-Service' ? 'badge-ss' : 'badge-pos'">
                        {{ verifiedTicket.channel }}
                      </span>
                    </div>
                    <div class="td-row">
                      <span class="td-lbl">Pengunjung:</span>
                      <span class="td-val">{{ verifiedTicket.customer }} ({{ verifiedTicket.qty }} Orang)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Overlay Status: Error (AKSES DITOLAK) -->
              <div v-if="scanStatus === 'error'" class="overlay-status error-overlay">
                <div class="status-card-inner">
                  <div class="status-icon-bubble error-bubble">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <h2 class="status-heading text-error">AKSES DITOLAK</h2>
                  <p class="status-subtext">{{ statusMessage }}</p>
                  <p class="error-code-badge">Kode: {{ manualCode }}</p>
                </div>
              </div>
            </div>
            
            <template #fallback>
              <div class="camera-loading-fallback">
                <div class="scanner-spinner"></div>
                <p>Menyiapkan Kamera Pemindai Gate...</p>
              </div>
            </template>
          </ClientOnly>
        </div>
        
        <!-- Manual Code Input & Fast Simulation Buttons -->
        <div class="manual-input-section" :class="{'is-disabled': scanStatus !== 'idle'}">
          <div class="input-header">
            <label for="manualInput">Atau Masukkan / Scan Kode Tiket Barcode:</label>
            <span class="input-tag">Mendukung Format: TRX-*, KC-TIX-*, TIX-*</span>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="input-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <input 
                id="manualInput"
                type="text" 
                class="gate-input" 
                v-model="manualCode" 
                placeholder="Contoh: TRX-45697051 atau KC-TIX-89240182" 
                @keyup.enter="() => verifyAndOpenGate()" 
                :disabled="scanStatus !== 'idle'" 
              />
            </div>
            <button 
              class="btn-verify" 
              @click="() => verifyAndOpenGate()" 
              :disabled="scanStatus !== 'idle' || !manualCode"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span>Verifikasi Gate</span>
            </button>
          </div>

          <!-- Quick Test Badges for Easy Simulator Testing -->
          <div class="quick-chips-row">
            <span class="chips-label">Simulasi Cepat:</span>
            <button type="button" class="chip-btn chip-pos" @click="testQuickCode('TRX-45697051')">
              🎫 POS: TRX-45697051
            </button>
            <button type="button" class="chip-btn chip-ss" @click="testQuickCode('KC-TIX-89240182')">
              📱 Kios: KC-TIX-89240182
            </button>
            <button type="button" class="chip-btn chip-pos" @click="testQuickCode('TRX-2043')">
              🎡 POS: TRX-2043
            </button>
            <button type="button" class="chip-btn chip-invalid" @click="testQuickCode('INVALID-8899')">
              🚫 Uji Tiket Palsu
            </button>
          </div>
        </div>
      </div>

      <!-- Real-time Scan History Log Table -->
      <div class="history-card">
        <div class="history-header">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Riwayat Pemindaian Gate Sesi Ini
          </h3>
          <span class="history-count">{{ scanLogs.length }} Aktivitas</span>
        </div>

        <div class="table-responsive">
          <table class="history-table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Kode Tiket</th>
                <th>Jenis Tiket</th>
                <th>Kanal Asal</th>
                <th>Pengunjung</th>
                <th>Status Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, idx) in scanLogs" :key="idx" :class="log.status === 'GRANTED' ? 'row-granted' : 'row-rejected'">
                <td class="font-mono">{{ log.timestamp }}</td>
                <td class="font-mono font-bold">{{ log.code }}</td>
                <td>{{ log.ticketName }}</td>
                <td>
                  <span class="channel-pill" :class="log.channel === 'Self-Service' ? 'pill-ss' : 'pill-pos'">
                    {{ log.channel }}
                  </span>
                </td>
                <td>{{ log.visitorName }} ({{ log.qty }} Pax)</td>
                <td>
                  <span class="status-pill" :class="log.status === 'GRANTED' ? 'pill-granted' : 'pill-rejected'">
                    {{ log.status === 'GRANTED' ? '✅ DIBUKA' : '❌ DITOLAK' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gate-page-wrapper {
  min-height: 100vh;
  background: #FDFBF7;
  color: #2C1A13;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  padding-bottom: 60px;
}

/* Navbar */
.gate-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 36px;
  background: #FFFFFF;
  border-bottom: 1.5px solid #F1E8DF;
  box-shadow: 0 2px 10px rgba(44, 26, 19, 0.03);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-logo {
  height: 40px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 17px;
  font-weight: 800;
  color: #2C1A13;
  letter-spacing: -0.2px;
}

.brand-sub {
  font-size: 12px;
  color: #7A6256;
  font-weight: 500;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  padding: 6px 14px;
  border-radius: 20px;
}

.pulse-indicator {
  width: 9px;
  height: 9px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulseGreen 1.8s infinite;
}

@keyframes pulseGreen {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 7px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.status-badge {
  font-size: 11.5px;
  font-weight: 800;
  color: #065F46;
  letter-spacing: 0.5px;
}

/* Container */
.gate-container {
  max-width: 820px;
  margin: 32px auto 0;
  padding: 0 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 28px;
}

.main-title {
  font-size: 32px;
  font-weight: 800;
  color: #2C1A13;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 15px;
  color: #6B5549;
  line-height: 1.5;
}

/* Scanner Card */
.scanner-card {
  background: #FFFFFF;
  border: 1.5px solid #F0E6DC;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 12px 36px rgba(44, 26, 19, 0.06);
}

.camera-viewport {
  background-color: #1A100B;
  height: 380px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
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

/* Target Guide Frame */
.scanner-target-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 220px;
  height: 220px;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: #F59E0B;
}

.corner.top-left { top: 0; left: 0; border-top: 4px solid #F59E0B; border-left: 4px solid #F59E0B; border-top-left-radius: 10px; }
.corner.top-right { top: 0; right: 0; border-top: 4px solid #F59E0B; border-right: 4px solid #F59E0B; border-top-right-radius: 10px; }
.corner.bottom-left { bottom: 0; left: 0; border-bottom: 4px solid #F59E0B; border-left: 4px solid #F59E0B; border-bottom-left-radius: 10px; }
.corner.bottom-right { bottom: 0; right: 0; border-bottom: 4px solid #F59E0B; border-right: 4px solid #F59E0B; border-bottom-right-radius: 10px; }

.guide-text {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.55);
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: -30px;
  white-space: nowrap;
}

/* Laser Scanning Line Animation */
.laser-scanner-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(245, 158, 11, 0) 0%, rgba(245, 158, 11, 1) 50%, rgba(245, 158, 11, 0) 100%);
  box-shadow: 0 0 14px 3px rgba(245, 158, 11, 0.8);
  animation: laserScan 2.4s ease-in-out infinite;
  z-index: 5;
}

@keyframes laserScan {
  0% { top: 15%; opacity: 0.8; }
  50% { top: 85%; opacity: 1; }
  100% { top: 15%; opacity: 0.8; }
}

/* Overlays */
.overlay-status {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(8px);
  animation: fadeInPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 24px;
}

@keyframes fadeInPop {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.loading-overlay {
  background: rgba(26, 16, 11, 0.8);
  color: #FFFFFF;
}

.success-overlay {
  background: rgba(16, 185, 129, 0.92);
  color: #FFFFFF;
}

.error-overlay {
  background: rgba(239, 68, 68, 0.92);
  color: #FFFFFF;
}

.status-card-inner {
  background: rgba(255, 255, 255, 0.18);
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  padding: 24px 32px;
  text-align: center;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  max-width: 440px;
  width: 100%;
}

.status-icon-bubble {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.success-bubble {
  background: #FFFFFF;
  color: #10B981;
}

.error-bubble {
  background: #FFFFFF;
  color: #EF4444;
}

.status-heading {
  font-size: 26px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 4px;
  letter-spacing: -0.3px;
}

.status-subtext {
  font-size: 14px;
  opacity: 0.95;
  margin: 0 0 14px;
  font-weight: 600;
}

.ticket-detail-box {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 12px 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.td-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.td-lbl {
  opacity: 0.8;
}

.td-val {
  font-weight: 600;
}

.td-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
}

.badge-ss {
  background: #F59E0B;
  color: #1E293B;
}

.badge-pos {
  background: #3B82F6;
  color: #FFFFFF;
}

.error-code-badge {
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-family: monospace;
  font-weight: 700;
  display: inline-block;
  margin: 0;
}

.camera-loading-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #FFFFFF;
  font-size: 14px;
  gap: 12px;
}

.scanner-spinner {
  width: 36px;
  height: 36px;
  border: 3.5px solid rgba(255, 255, 255, 0.2);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Manual Input Section */
.manual-input-section {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1.5px dashed #F0E6DC;
  transition: opacity 0.2s;
}

.manual-input-section.is-disabled {
  opacity: 0.55;
  pointer-events: none;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.input-header label {
  font-size: 14px;
  font-weight: 700;
  color: #2C1A13;
}

.input-tag {
  font-size: 11.5px;
  color: #92400E;
  background: #FEF3C7;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.input-group {
  display: flex;
  gap: 12px;
}

.input-wrapper {
  position: relative;
  flex: 1;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
}

.gate-input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 42px;
  background: #FAFAFA;
  border: 1.5px solid #E5E7EB;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  color: #1F2937;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.gate-input:focus {
  border-color: #D97706;
  background: #FFFFFF;
  box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.12);
}

.btn-verify {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  height: 48px;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-verify:hover:not(:disabled) {
  background: #D97706;
  transform: translateY(-1px);
}

.btn-verify:disabled {
  background: #D1D5DB;
  cursor: not-allowed;
}

/* Quick Chips Simulator */
.quick-chips-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.chips-label {
  font-size: 12px;
  font-weight: 700;
  color: #7A6256;
}

.chip-btn {
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s;
}

.chip-pos {
  background: #EFF6FF;
  border-color: #BFDBFE;
  color: #1E40AF;
}

.chip-pos:hover {
  background: #DBEAFE;
}

.chip-ss {
  background: #FFFBEB;
  border-color: #FDE68A;
  color: #92400E;
}

.chip-ss:hover {
  background: #FEF3C7;
}

.chip-invalid {
  background: #FEF2F2;
  border-color: #FECACA;
  color: #991B1B;
}

.chip-invalid:hover {
  background: #FEE2E2;
}

/* History Card */
.history-card {
  margin-top: 32px;
  background: #FFFFFF;
  border: 1.5px solid #F0E6DC;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(44, 26, 19, 0.04);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.history-header h3 {
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.history-count {
  font-size: 12px;
  font-weight: 700;
  color: #7A6256;
  background: #F4EBE2;
  padding: 3px 10px;
  border-radius: 12px;
}

.table-responsive {
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.history-table th {
  background: #FBF8F5;
  color: #6B5549;
  font-weight: 700;
  padding: 10px 14px;
  border-bottom: 1.5px solid #EFE4DA;
}

.history-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #F4EBE2;
  color: #1F2937;
}

.channel-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
}

.pill-ss {
  background: #FEF3C7;
  color: #92400E;
}

.pill-pos {
  background: #DBEAFE;
  color: #1E40AF;
}

.status-pill {
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
}

.pill-granted {
  background: #D1FAE5;
  color: #065F46;
}

.pill-rejected {
  background: #FEE2E2;
  color: #991B1B;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.font-bold {
  font-weight: 700;
}
</style>
