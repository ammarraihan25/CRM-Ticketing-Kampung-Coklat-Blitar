<template>
  <div class="shift-card-elevated">
    <!-- Top Luxury Accent Bar -->
    <div class="shift-top-bar"></div>

    <!-- Header Section -->
    <div class="shift-header">
      <div class="shift-title-group">
        <div class="shift-icon-squircle">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <div class="shift-title-meta">
          <div class="title-row">
            <h3 class="shift-title">Ringkasan Shift Kasir POS</h3>
            <span class="terminal-badge">{{ shiftData.terminalName }}</span>
          </div>
          <span class="shift-subtitle">{{ shiftData.shiftName }} &bull; {{ shiftData.date }}</span>
        </div>
      </div>

      <!-- Status Pill -->
      <div class="status-pill-wrap">
        <span class="status-pill-live" :class="statusClass">
          <span class="live-dot-pulse"></span>
          <span>{{ shiftData.statusLabel }}</span>
        </span>
      </div>
    </div>

    <!-- 4 Key Shift Metrics (Distinctive 2x2 Grid) -->
    <div class="shift-metrics-grid">
      <!-- 1. Kasir Bertugas -->
      <div class="metric-box box-cashier">
        <div class="box-icon-label">
          <span class="box-icon">👤</span>
          <span class="box-label">Kasir Bertugas</span>
        </div>
        <div class="box-main-val">{{ shiftData.cashierName }}</div>
        <div class="box-sub-val">ID: {{ shiftData.cashierId }}</div>
      </div>

      <!-- 2. Waktu Operasional -->
      <div class="metric-box box-time">
        <div class="box-icon-label">
          <span class="box-icon">⏰</span>
          <span class="box-label">Waktu Operasional</span>
        </div>
        <div class="box-main-val">{{ shiftData.startTime }} - {{ shiftData.endTime }}</div>
        <div class="box-sub-val">Sesi Buka Kasir Aktif</div>
      </div>

      <!-- 3. Total Transaksi -->
      <div class="metric-box box-tx">
        <div class="box-icon-label">
          <span class="box-icon">🧾</span>
          <span class="box-label">Total Transaksi POS</span>
        </div>
        <div class="box-main-val text-cocoa-bold">{{ shiftData.totalTransactions }} Transaksi</div>
        <div class="box-sub-val">{{ shiftData.totalTicketsSold }} Tiket Diterbitkan</div>
      </div>

      <!-- 4. Kas Fisik & Digital -->
      <div class="metric-box box-money">
        <div class="box-icon-label">
          <span class="box-icon">💵</span>
          <span class="box-label">Penerimaan Kas</span>
        </div>
        <div class="box-main-val text-amber-bold">{{ formatRupiah(shiftData.cashReceived) }}</div>
        <div class="box-sub-val">Digital / Non-Tunai: {{ formatRupiah(shiftData.nonCashReceived) }}</div>
      </div>
    </div>

    <!-- Reconciliation Status Alert Banner -->
    <div class="reconciliation-banner" :class="`banner-${shiftData.reconciliationStatus}`">
      <div class="reconcile-left">
        <span class="reconcile-status-icon">
          {{ shiftData.reconciliationStatus === 'balanced' ? '✅' : '⚠️' }}
        </span>
        <div class="reconcile-text">
          <span class="reconcile-title">Status Rekonsiliasi:</span>
          <span class="reconcile-detail">{{ shiftData.reconciliationNotes }}</span>
        </div>
      </div>

      <div class="reconcile-right">
        <span class="var-title">Selisih Kas:</span>
        <span class="var-value" :class="shiftData.variance === 0 ? 'var-zero' : 'var-diff'">
          {{ shiftData.variance === 0 ? 'Rp 0 (Cocok/Balanced)' : formatRupiah(shiftData.variance) }}
        </span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="shift-footer-actions">
      <button 
        type="button" 
        class="btn-shift-secondary"
        :title="isReadOnly ? 'Hanya dapat melihat detail (Read-Only Owner)' : 'Lihat rincian transaksi kasir'"
        @click="$emit('view-details', shiftData)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>Audit Log Transaksi</span>
      </button>

      <button 
        v-if="!isReadOnly"
        type="button" 
        class="btn-shift-primary"
        :disabled="shiftData.isClosed"
        @click="$emit('close-shift', shiftData)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{{ shiftData.isClosed ? 'Shift Telah Ditutup' : 'Tutup & Rekonsiliasi Shift' }}</span>
      </button>

      <div v-else class="owner-lock-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Aksi Tutup Shift Dinonaktifkan (Role Owner)</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
  reconciliationStatus: 'balanced' | 'pending' | 'discrepancy'
  statusLabel: string
  reconciliationNotes: string
  variance: number
  isClosed: boolean
}

interface Props {
  shiftData: ShiftInfo
  isReadOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isReadOnly: false
})

defineEmits<{
  (e: 'view-details', shift: ShiftInfo): void
  (e: 'close-shift', shift: ShiftInfo): void
}>()

const statusClass = computed(() => {
  if (props.shiftData.isClosed) return 'status-closed'
  return 'status-active'
})

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
</script>

<style scoped>
.shift-card-elevated {
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFDF9 100%);
  border: 1.5px solid rgba(217, 119, 6, 0.35);
  border-radius: 18px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 24px -4px rgba(44, 26, 19, 0.08), 0 0 0 1px rgba(242, 151, 39, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.28s ease;
  height: 100%;
}

.shift-card-elevated:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px -4px rgba(180, 83, 9, 0.16);
  border-color: #F29727;
}

.shift-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3.5px;
  background: linear-gradient(90deg, #D97706 0%, #F59E0B 50%, #2C1A13 100%);
}

.shift-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.shift-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.shift-icon-squircle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  border: 1.5px solid rgba(242, 151, 39, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F29727;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.2);
}

.shift-title-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.shift-title {
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.terminal-badge {
  background: rgba(242, 151, 39, 0.14);
  color: #B45309;
  border: 1px solid rgba(242, 151, 39, 0.35);
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  text-transform: uppercase;
}

.shift-subtitle {
  font-size: 12px;
  color: #78655C;
}

.status-pill-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
}

.status-active {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.status-closed {
  background: #F3F4F6;
  color: #4B5563;
  border: 1px solid #D1D5DB;
}

.live-dot-pulse {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
  animation: pulse-dot 1.5s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* 4 Metrics Grid */
.shift-metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.metric-box {
  background: #FFFDF9;
  border: 1px solid #F2ECE4;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all 0.2s ease;
}

.metric-box:hover {
  background: #FFFFFF;
  border-color: #F29727;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.05);
}

.box-icon-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.box-icon {
  font-size: 13px;
}

.box-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.box-main-val {
  font-size: 13.5px;
  font-weight: 800;
  color: #1C0E08;
}

.text-cocoa-bold { color: #2C1A13; }
.text-amber-bold { color: #D97706; }

.box-sub-val {
  font-size: 11px;
  color: #8C786E;
}

/* Reconciliation Banner */
.reconciliation-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 16px;
  gap: 10px;
  flex-wrap: wrap;
}

.banner-balanced {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
}

.banner-pending {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
}

.banner-discrepancy {
  background: #FEF2F2;
  border: 1px solid #FECACA;
}

.reconcile-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reconcile-status-icon {
  font-size: 16px;
}

.reconcile-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.reconcile-title {
  font-size: 10.5px;
  font-weight: 800;
  color: #166534;
  text-transform: uppercase;
}

.reconcile-detail {
  font-size: 11.5px;
  color: #374151;
}

.reconcile-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.var-title {
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
}

.var-value {
  font-size: 12px;
  font-weight: 800;
}

.var-zero { color: #15803D; }
.var-diff { color: #DC2626; }

/* Footer Action Buttons */
.shift-footer-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #F3EFEA;
}

.btn-shift-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  background: #F5F3EF;
  color: #44403C;
  border: 1px solid #E6E1DA;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-shift-secondary:hover {
  background: #EAE6DF;
  color: #2C1A13;
}

.btn-shift-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  color: #FFFFFF;
  border: 1px solid #F29727;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.25);
  transition: all 0.2s ease;
}

.btn-shift-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #4A2E22 0%, #5E3B2D 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.35);
}

.btn-shift-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.owner-lock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  color: #B45309;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  padding: 6px 12px;
  border-radius: 8px;
}
</style>
