<template>
  <div class="premium-shift-card">
    
    <!-- Top Header -->
    <div class="shift-header">
      <div class="shift-title-group">
        <div class="shift-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <div class="shift-title-meta">
          <h3 class="shift-title">Rekapitulasi Shift Kasir</h3>
          <span class="shift-subtitle">Monitoring aliran kas &amp; validasi sistem</span>
        </div>
      </div>

      <!-- Segmented Control -->
      <div class="segmented-control" v-if="shiftsList && shiftsList.length > 1">
        <button 
          v-for="s in shiftsList" 
          :key="s.id"
          type="button"
          class="seg-btn"
          :class="{ active: selectedShiftId === s.id }"
          @click="selectedShiftId = s.id"
        >
          <span v-if="s.id === 'ALL'">Semua Loket</span>
          <span v-else-if="s.id === 'LOKET-UTAMA'">Utama</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-1'">Wahana 1</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-2'">Wahana 2</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-3'">Wahana 3</span>
          <span v-else>{{ s.terminalName }}</span>
        </button>
      </div>
      <div v-else class="status-indicator">
        <span class="pulse-dot"></span>
        {{ activeShift.statusLabel }}
      </div>
    </div>

    <!-- Cashier & Session Profile Bar -->
    <div class="profile-bar">
      <div class="profile-left">
        <div class="avatar-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="profile-meta">
          <div class="profile-name-row">
            <span class="cashier-name">{{ activeShift.cashierName }}</span>
            <span class="terminal-badge">{{ activeShift.id === 'ALL' ? '4 Loket Aktif' : activeShift.terminalName }}</span>
          </div>
          <span class="session-time">Sesi Aktif: {{ activeShift.startTime }} - {{ activeShift.endTime }} WIB</span>
        </div>
      </div>

      <div class="profile-stats">
        <div class="stat-group">
          <span class="stat-val">{{ activeShift.totalTransactions.toLocaleString('id-ID') }}</span>
          <span class="stat-lbl">Transaksi</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-group">
          <span class="stat-val text-amber">{{ activeShift.totalTicketsSold.toLocaleString('id-ID') }}</span>
          <span class="stat-lbl">Pax Terbit</span>
        </div>
      </div>
    </div>

    <!-- Financial Split Metrics (Bento-style) -->
    <div class="metrics-grid">
      <!-- Kas Fisik Card -->
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-title-group">
            <div class="metric-icon bg-amber-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <span class="metric-name">Kas Fisik (Tunai)</span>
          </div>
          <span class="metric-pct bg-amber-light text-amber">{{ Math.round((activeShift.cashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100) }}%</span>
        </div>
        
        <div class="metric-value-group">
          <span class="metric-currency">Rp</span>
          <span class="metric-amount">{{ formatRupiah(activeShift.cashReceived).replace('Rp', '').trim() }}</span>
        </div>

        <div class="metric-progress-wrapper">
          <div class="metric-progress-track">
            <div class="metric-progress-fill bg-amber" :style="{ width: `${Math.round((activeShift.cashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100)}%` }"></div>
          </div>
          <span class="metric-desc">Uang tunai dalam laci kasir</span>
        </div>
      </div>

      <!-- Kas Digital Card -->
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-title-group">
            <div class="metric-icon bg-gray-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B5A52" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <span class="metric-name">Non-Tunai (Digital)</span>
          </div>
          <span class="metric-pct bg-gray-light text-gray">{{ Math.round((activeShift.nonCashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100) }}%</span>
        </div>
        
        <div class="metric-value-group">
          <span class="metric-currency">Rp</span>
          <span class="metric-amount">{{ formatRupiah(activeShift.nonCashReceived).replace('Rp', '').trim() }}</span>
        </div>

        <div class="metric-progress-wrapper">
          <div class="metric-progress-track">
            <div class="metric-progress-fill bg-gray" :style="{ width: `${Math.round((activeShift.nonCashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100)}%` }"></div>
          </div>
          <span class="metric-desc">QRIS &amp; EDC Mesin tervalidasi</span>
        </div>
      </div>
    </div>

    <!-- Grand Total Highlight Bar -->
    <div class="grand-total-bar">
      <div class="total-left">
        <span class="total-lbl">Total Omzet Keseluruhan</span>
        <span class="total-scope">{{ activeShift.id === 'ALL' ? 'Gabungan 4 Loket' : activeShift.terminalName }}</span>
      </div>
      <div class="total-right">
        <span class="total-amount">{{ formatRupiah(activeShift.cashReceived + activeShift.nonCashReceived) }}</span>
      </div>
    </div>


    <!-- Actions -->
    <div class="action-footer">
      <button type="button" class="btn-outline" @click="$emit('view-details', activeShift)">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        Audit Log Transaksi
      </button>
      <button type="button" class="btn-solid" :disabled="activeShift.isClosed" @click="$emit('close-shift', activeShift)">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        {{ activeShift.isClosed ? 'Shift Telah Ditutup' : 'Tutup & Rekonsiliasi Shift' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface ShiftInfo {
  id: string
  shiftName: string
  terminalName: string
  cashierName: string
  cashierId: string
  date: string
  startTime: string
  endTime: string
  totalTransactions: number
  totalTicketsSold: number
  cashReceived: number
  nonCashReceived: number
  reconciliationStatus: 'balanced' | 'surplus' | 'deficit'
  statusLabel: string
  reconciliationNotes: string
  variance: number
  isClosed: boolean
}

interface Props {
  shiftData?: ShiftInfo
  shiftsList?: ShiftInfo[]
}

const props = defineProps<Props>()
const emit = defineEmits(['view-details', 'close-shift'])
const selectedShiftId = ref('ALL')

watch(() => props.shiftData, (newVal) => {
  if (newVal) {
    selectedShiftId.value = newVal.id
  }
}, { immediate: true })

const activeShift = computed<ShiftInfo>(() => {
  if (props.shiftsList && props.shiftsList.length > 0) {
    const found = props.shiftsList.find(s => s.id === selectedShiftId.value)
    return found || props.shiftsList[0]
  }
  return props.shiftData || {} as ShiftInfo
})

const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}
</script>

<style scoped>
/* Main Container */
.premium-shift-card {
  background: #FFFFFF;
  border: 1px solid #EFEAE2;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  box-shadow: 0 4px 20px -2px rgba(44, 26, 19, 0.03);
  transition: box-shadow 0.3s ease;
}

.premium-shift-card:hover {
  box-shadow: 0 12px 30px -4px rgba(44, 26, 19, 0.08);
}

/* Header */
.shift-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.shift-title-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.shift-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #FFFDF9;
  border: 1px solid #EFEAE2;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shift-title-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shift-title {
  font-size: 17px;
  font-weight: 800;
  color: #111111;
  margin: 0;
  letter-spacing: -0.3px;
}

.shift-subtitle {
  font-size: 13.5px;
  font-weight: 600;
  color: #111111;
  margin: 2px 0 0 0;
  line-height: 1.5;
}

/* Segmented Control */
.segmented-control {
  display: flex;
  align-items: center;
  background: #F8F5F0;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #EFEAE2;
}

.seg-btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #8C786E;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seg-btn:hover:not(.active) {
  color: #111111;
}

.seg-btn.active {
  background: #FFFFFF;
  color: #111111;
  font-weight: 800;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ECFDF5;
  color: #047857;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
.pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #10B981; }

/* Profile Bar */
.profile-bar {
  background: #FDFBF7;
  border: 1px solid #EFEAE2;
  border-radius: 16px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar-ring {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid #EFEAE2;
  color: #78655C;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cashier-name {
  font-size: 14.5px;
  font-weight: 800;
  color: #111111;
}

.terminal-badge {
  font-size: 10.5px;
  font-weight: 700;
  color: #8C786E;
  background: #EFEAE2;
  padding: 2px 8px;
  border-radius: 6px;
}

.session-time {
  font-size: 11.5px;
  color: #8C786E;
}

.profile-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-val {
  font-size: 16px;
  font-weight: 800;
  color: #111111;
}

.text-amber { color: #D97706; }

.stat-lbl {
  font-size: 10px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: #EAE2D8;
}

/* Metrics Grid (Bento) */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.metric-card {
  background: #FFFFFF;
  border: 1px solid #EFEAE2;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.metric-card:hover {
  border-color: #EAE2D8;
  background: #FDFBF7;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.metric-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-amber-light { background: #FEF3C7; }
.text-amber { color: #D97706; }
.bg-gray-light { background: #F3ECE2; }
.text-gray { color: #6B5A52; }

.metric-name {
  font-size: 13px;
  font-weight: 700;
  color: #5A4034;
}

.metric-pct {
  font-size: 11.5px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
}

.metric-value-group {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.metric-currency {
  font-size: 16px;
  font-weight: 700;
  color: #8C786E;
}

.metric-amount {
  font-size: 26px;
  font-weight: 900;
  color: #111111;
  letter-spacing: -0.5px;
}

.metric-progress-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-progress-track {
  width: 100%;
  height: 5px;
  background: #F0EBE1;
  border-radius: 4px;
  overflow: hidden;
}

.metric-progress-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-amber { background: #F59E0B; }
.bg-gray { background: #8C786E; }

.metric-desc {
  font-size: 11px;
  color: #8C786E;
}

/* Grand Total Bar */
.grand-total-bar {
  background: linear-gradient(135deg, #111111 0%, #000000 100%);
  border-radius: 16px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  color: #FFFFFF;
}

.total-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.total-lbl {
  font-size: 13px;
  font-weight: 600;
  color: #D6CCC2;
}

.total-scope {
  font-size: 11.5px;
  color: #A49389;
}

.total-right {
  display: flex;
  align-items: baseline;
}

.total-amount {
  font-size: 24px;
  font-weight: 900;
  color: #FBBF24;
  letter-spacing: -0.5px;
}

/* Reconciliation Alert */
.recon-alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-radius: 12px;
}

.alert-success {
  background: #ECFDF5;
  border: 1px solid #D1FAE5;
}

.alert-danger {
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
}

.alert-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.alert-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-success .alert-icon { color: #059669; }
.alert-danger .alert-icon { color: #DC2626; }

.alert-text {
  display: flex;
  flex-direction: column;
}

.alert-title {
  font-size: 13px;
  font-weight: 800;
}

.alert-success .alert-title { color: #065F46; }
.alert-danger .alert-title { color: #991B1B; }

.alert-desc {
  font-size: 11.5px;
  color: #6B7280;
}

.alert-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.variance-lbl {
  font-size: 12px;
  font-weight: 700;
  color: #4B5563;
}

.variance-val {
  font-size: 14px;
  font-weight: 800;
}

.alert-success .variance-val { color: #059669; }
.alert-danger .variance-val { color: #DC2626; }

/* Actions */
.action-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;
}

.btn-outline, .btn-solid {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-outline {
  background: #FFFFFF;
  border: 1.5px solid #EFEAE2;
  color: #5A4034;
}

.btn-outline:hover {
  background: #FDFBF7;
  border-color: #D97706;
}

.btn-solid {
  background: #D97706;
  border: 1.5px solid #D97706;
  color: #FFFFFF;
}

.btn-solid:hover:not(:disabled) {
  background: #B45309;
  border-color: #B45309;
}

.btn-solid:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
