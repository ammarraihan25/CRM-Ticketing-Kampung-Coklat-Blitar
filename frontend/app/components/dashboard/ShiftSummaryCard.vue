<template>
  <div class="shift-card-elevated">
    <!-- Header Section -->
    <div class="shift-header">
      <div class="shift-title-group">
        <div class="shift-icon-squircle">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <rect x="2" y="4" width="20" height="16" rx="3" />
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

    <!-- 4 Key Shift Metrics (2x2 Rounded Grid) -->
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
        <div class="box-sub-val">Digital: {{ formatRupiah(shiftData.nonCashReceived) }}</div>
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
          {{ shiftData.variance === 0 ? 'Rp 0 (Cocok)' : formatRupiah(shiftData.variance) }}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>{{ shiftData.isClosed ? 'Shift Telah Ditutup' : 'Tutup & Rekonsiliasi Shift' }}</span>
      </button>

      <div v-else class="owner-lock-badge">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
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
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;
  height: 100%;
}

.shift-card-elevated:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(61, 34, 20, 0.08);
  border-color: #D97706;
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
  width: 44px;
  height: 44px;
  background: #3D2214;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F59E0B;
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
}

.shift-title {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.terminal-badge {
  font-size: 10.5px;
  font-weight: 800;
  background: #FAF3E8;
  color: #B45309;
  padding: 2.5px 8px;
  border-radius: 10px;
  border: 1px solid #EADBCC;
}

.shift-subtitle {
  font-size: 12px;
  color: #7A5034;
}

.status-pill-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.status-active {
  background: #D1FAE5;
  color: #065F46;
}

.status-closed {
  background: #FEE2E2;
  color: #991B1B;
}

.live-dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* 4 Key Metrics Grid */
.shift-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.metric-box {
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 16px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.box-icon-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.box-icon {
  font-size: 13px;
}

.box-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #8C6D58;
  text-transform: uppercase;
}

.box-main-val {
  font-size: 14.5px;
  font-weight: 800;
  color: #2C1A13;
}

.box-sub-val {
  font-size: 11px;
  color: #7A5034;
}

.text-cocoa-bold {
  color: #3D2214;
}

.text-amber-bold {
  color: #B45309;
}

/* Reconciliation Banner */
.reconciliation-banner {
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.banner-balanced {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #065F46;
}

.banner-discrepancy {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
}

.banner-pending {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
}

.reconcile-left {
  display: flex;
  align-items: center;
  gap: 10px;
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
  font-size: 11.5px;
  font-weight: 800;
}

.reconcile-detail {
  font-size: 11px;
  opacity: 0.9;
}

.reconcile-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.var-title {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
}

.var-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  font-weight: 900;
}

.var-zero {
  color: #059669;
}

.var-diff {
  color: #DC2626;
}

/* Footer Actions */
.shift-footer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.btn-shift-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1.5px solid #EADBCC;
  color: #5A2E17;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-shift-secondary:hover {
  background: #FAF3E8;
  border-color: #D97706;
}

.btn-shift-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  color: #FFFFFF;
  border: none;
  padding: 9px 18px;
  border-radius: 12px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
  transition: all 0.2s ease;
}

.btn-shift-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  transform: translateY(-1px);
}

.btn-shift-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.owner-lock-badge {
  font-size: 11.5px;
  font-weight: 700;
  color: #92400E;
  background: #FEF3C7;
  padding: 8px 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 600px) {
  .shift-metrics-grid {
    grid-template-columns: 1fr;
  }
  .shift-footer-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
