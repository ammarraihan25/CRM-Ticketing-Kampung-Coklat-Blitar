<template>
  <div class="shift-card-elevated">
    <!-- Top Luxury Accent Bar -->
    <div class="shift-top-bar"></div>

    <!-- Header Section -->
    <div class="shift-header">
      <div class="shift-title-group">
        <div class="shift-icon-squircle">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <div class="shift-title-meta">
          <div class="title-row">
            <h3 class="shift-title">Ringkasan Shift &amp; Loket Kasir POS</h3>
          </div>
          <span class="shift-subtitle">Penerimaan kas laci, tiket terbit &amp; audit rekonsiliasi</span>
        </div>
      </div>

      <!-- Segmented Terminal Selector Pills (Semua, Loket Utama, Wahana 1, Wahana 2, Wahana 3) -->
      <div class="shift-segmented-pills" v-if="shiftsList && shiftsList.length > 1">
        <button 
          v-for="s in shiftsList" 
          :key="s.id"
          type="button"
          class="shift-tab-pill"
          :class="{ active: selectedShiftId === s.id }"
          @click="selectedShiftId = s.id"
        >
          <span v-if="s.id === 'ALL'">Semua Loket</span>
          <span v-else-if="s.id === 'LOKET-UTAMA'">Loket Utama</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-1'">Wahana 1</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-2'">Wahana 2</span>
          <span v-else-if="s.id === 'LOKET-WAHANA-3'">Wahana 3</span>
          <span v-else>{{ s.terminalName }}</span>
        </button>
      </div>
      <div v-else class="status-pill-wrap">
        <span class="status-pill-live" :class="statusClass">
          <span class="live-dot-pulse"></span>
          <span>{{ activeShift.statusLabel }}</span>
        </span>
      </div>
    </div>

    <!-- Cashier Profile Header Passcard with Distinct Operational Badges -->
    <div class="cashier-profile-card">
      <div class="cashier-avatar-col">
        <div class="avatar-circle" :class="{ 'avatar-all': activeShift.id === 'ALL' }">
          <svg v-if="activeShift.id === 'ALL'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div class="cashier-info">
          <div class="cashier-name-row">
            <span class="cashier-name">{{ activeShift.cashierName }}</span>
            <span class="cashier-id-tag">{{ activeShift.cashierId }}</span>
            <!-- Clear Operational Scope Badge -->
            <span v-if="activeShift.id === 'ALL'" class="scope-badge badge-all">4 Loket Aktif (100% Omzet)</span>
            <span v-else-if="activeShift.id === 'LOKET-UTAMA'" class="scope-badge badge-main">Tiket Masuk Reguler (67.7% Omzet)</span>
            <span v-else-if="activeShift.id === 'LOKET-WAHANA-1'" class="scope-badge badge-wahana">Cooking Class &amp; Edukasi (14.2% Omzet)</span>
            <span v-else-if="activeShift.id === 'LOKET-WAHANA-2'" class="scope-badge badge-wahana">Kereta Safari &amp; Feeding (10.5% Omzet)</span>
            <span v-else-if="activeShift.id === 'LOKET-WAHANA-3'" class="scope-badge badge-wahana">Playground &amp; Kolam (7.6% Omzet)</span>
            <span v-else class="scope-badge badge-wahana">{{ activeShift.terminalName }}</span>
          </div>
          <span class="cashier-session-meta">
            {{ activeShift.terminalName }} &bull; Sesi: <strong>{{ activeShift.startTime }} - {{ activeShift.endTime }} WIB</strong>
          </span>
        </div>
      </div>

      <div class="cashier-tx-summary">
        <div class="tx-stat-item">
          <span class="tx-stat-label">Total Transaksi</span>
          <span class="tx-stat-val">{{ activeShift.totalTransactions.toLocaleString('id-ID') }} Tx</span>
        </div>
        <div class="tx-stat-sep"></div>
        <div class="tx-stat-item">
          <span class="tx-stat-label">Tiket Terbit</span>
          <span class="tx-stat-val-amber">{{ activeShift.totalTicketsSold.toLocaleString('id-ID') }} Pax</span>
        </div>
      </div>
    </div>

    <!-- Split Flow Financial Bento Cards with Clear Proportion Differences -->
    <div class="shift-money-split-grid">
      <!-- 1. Kas Fisik (Tunai) -->
      <div class="money-flow-box box-cash">
        <div class="flow-box-top">
          <div class="flow-title-wrap">
            <div class="flow-icon-circle bg-amber-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <span class="flow-label">Kas Fisik (Uang Tunai Laci)</span>
          </div>
          <!-- Clear Difference Pill Badge -->
          <span class="flow-diff-pill pill-amber">
            {{ Math.round((activeShift.cashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100) }}% Tunai
          </span>
        </div>
        <div class="flow-amount text-amber-bold">{{ formatRupiah(activeShift.cashReceived) }}</div>
        <div class="flow-progress-line">
          <div 
            class="flow-fill-amber" 
            :style="{ width: `${Math.round((activeShift.cashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100)}%` }"
          ></div>
        </div>
        <span class="flow-subtext">{{ activeShift.id === 'ALL' ? 'Akumulasi uang fisik laci Loket Utama & Wahana' : 'Uang tunai fisik laci kasir terhitung' }}</span>
      </div>

      <!-- 2. Kas Digital / EDC -->
      <div class="money-flow-box box-digital">
        <div class="flow-box-top">
          <div class="flow-title-wrap">
            <div class="flow-icon-circle bg-blue-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <span class="flow-label">Non-Tunai (QRIS &amp; EDC)</span>
          </div>
          <!-- Clear Difference Pill Badge -->
          <span class="flow-diff-pill pill-blue">
            {{ Math.round((activeShift.nonCashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100) }}% Digital
          </span>
        </div>
        <div class="flow-amount text-cocoa-bold">{{ formatRupiah(activeShift.nonCashReceived) }}</div>
        <div class="flow-progress-line">
          <div 
            class="flow-fill-blue" 
            :style="{ width: `${Math.round((activeShift.nonCashReceived / (activeShift.cashReceived + activeShift.nonCashReceived)) * 100)}%` }"
          ></div>
        </div>
        <span class="flow-subtext">{{ activeShift.id === 'ALL' ? 'QRIS & EDC kedua loket tervalidasi bank' : 'QRIS & EDC tervalidasi bank' }}</span>
      </div>
    </div>

    <!-- Total Gross Takings Banner with Clear Difference Comparison -->
    <div class="shift-gross-bar">
      <div class="gross-left">
        <span class="gross-label">Total Omzet Kasir:</span>
        <span class="gross-scope-tag">
          {{ activeShift.id === 'ALL' ? 'Semua Loket (Gabungan)' : activeShift.terminalName }}
        </span>
      </div>
      <div class="gross-right">
        <span class="gross-val">{{ formatRupiah(activeShift.cashReceived + activeShift.nonCashReceived) }}</span>
      </div>
    </div>

    <!-- Reconciliation Status Alert Banner with Clear Balanced Badge -->
    <div class="reconciliation-banner" :class="`banner-${activeShift.reconciliationStatus}`">
      <div class="reconcile-left">
        <span class="reconcile-shield-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </span>
        <div class="reconcile-text">
          <span class="reconcile-title">Status Rekonsiliasi:</span>
          <span class="reconcile-detail">{{ activeShift.reconciliationNotes }}</span>
        </div>
      </div>

      <div class="reconcile-right">
        <span class="var-title">Selisih Kas Fisik:</span>
        <span class="var-badge" :class="activeShift.variance === 0 ? 'badge-zero' : 'badge-diff'">
          {{ activeShift.variance === 0 ? 'Rp 0 (Sesuai)' : formatRupiah(activeShift.variance) }}
        </span>
      </div>
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

const selectedShiftId = ref('ALL')

watch(() => props.shiftData, (newVal) => {
  if (newVal) {
    selectedShiftId.value = newVal.id
  }
}, { immediate: true })

const activeShift = computed<ShiftInfo>(() => {
  if (props.shiftsList && props.shiftsList.length > 0) {
    const found = props.shiftsList.find(s => s.id === selectedShiftId.value)
    if (found) return found
    return props.shiftsList[0]
  }
  return props.shiftData || {
    id: 'ALL',
    shiftName: 'Agregat Operasional Hari Ini',
    terminalName: '4 Loket Aktif (Utama & 3 Wahana)',
    cashierName: 'Semua Loket (1 Utama + 3 Wahana)',
    cashierId: 'ALL-POS',
    date: '19 Agustus 2026',
    startTime: '08:00',
    endTime: '17:00',
    totalTransactions: 1254,
    totalTicketsSold: 2450,
    cashReceived: 17200000,
    nonCashReceived: 31550000,
    reconciliationStatus: 'balanced',
    statusLabel: '4 Loket Beroperasi (Live)',
    reconciliationNotes: 'Seluruh pencatatan laci kasir keempat loket klop 100% tanpa selisih.',
    variance: 0,
    isClosed: false
  }
})

const statusClass = computed(() => {
  if (activeShift.value.isClosed) return 'status-closed'
  return 'status-active'
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
.shift-card-elevated {
  background: #FFFFFF;
  border: 1.5px solid rgba(230, 220, 208, 0.95);
  border-radius: 24px;
  padding: 22px 24px;
  box-shadow: 0 12px 32px -4px rgba(44, 26, 19, 0.08), 0 3px 8px rgba(44, 26, 19, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.shift-card-elevated:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 45px -6px rgba(44, 26, 19, 0.14), 0 6px 16px rgba(44, 26, 19, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(242, 151, 39, 0.55);
}

.shift-top-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #D97706 0%, #2C1A13 100%);
}

.shift-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.shift-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.shift-icon-squircle {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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
  font-size: 16.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.shift-subtitle {
  font-size: 12px;
  color: #78655C;
}

/* Segmented Terminal Selector Pills */
.shift-segmented-pills {
  display: flex;
  align-items: center;
  background: #F5F1EB;
  padding: 3px;
  border-radius: 10px;
  border: 1px solid #E5DDD3;
  gap: 2px;
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none;
  max-width: 100%;
}

.shift-segmented-pills::-webkit-scrollbar {
  display: none;
}

.shift-tab-pill {
  border: none;
  background: transparent;
  padding: 4px 10px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  color: #78655C;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
  white-space: nowrap;
}

.shift-tab-pill:hover:not(.active) {
  color: #2C1A13;
  background: rgba(255, 255, 255, 0.5);
}

.shift-tab-pill.active {
  background: #2C1A13;
  color: #FBBF24;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.18);
}

/* Status Pill */
.status-pill-live {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 14px;
  white-space: nowrap;
}

.status-active {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.status-closed {
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E5E7EB;
}

.live-dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 6px #10B981;
}

/* Cashier Profile Header Passcard */
.cashier-profile-card {
  background: #FFFDF9;
  border: 1.5px solid #EFEAE2;
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.cashier-avatar-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2C1A13;
  color: #FBBF24;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid #F59E0B;
}

.avatar-all {
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  color: #FBBF24;
}

.cashier-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cashier-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.cashier-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #2C1A13;
}

.cashier-id-tag {
  font-size: 10px;
  font-weight: 800;
  color: #D97706;
  background: #FEF3C7;
  padding: 1px 6px;
  border-radius: 5px;
  border: 1px solid #FDE68A;
}

.scope-badge {
  font-size: 10px;
  font-weight: 800;
  padding: 1px 7px;
  border-radius: 6px;
}

.badge-all    { background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; }
.badge-main   { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.badge-wahana { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }

.cashier-session-meta {
  font-size: 11px;
  color: #78655C;
}

.cashier-session-meta strong {
  color: #2C1A13;
}

.cashier-tx-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #EAE2D8;
  border-radius: 10px;
  padding: 6px 12px;
}

.tx-stat-item {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.tx-stat-label {
  font-size: 9.5px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
}

.tx-stat-val {
  font-size: 12.5px;
  font-weight: 800;
  color: #2C1A13;
}

.tx-stat-val-amber {
  font-size: 12.5px;
  font-weight: 800;
  color: #D97706;
}

.tx-stat-sep {
  width: 1px;
  height: 20px;
  background: #EFE8DF;
}

/* Split Flow Financial Bento Cards */
.shift-money-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.money-flow-box {
  background: #FFFDF9;
  border: 1.5px solid #EFEAE2;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease;
}

.money-flow-box:hover {
  background: #FFFFFF;
  border-color: #F59E0B;
  transform: translateY(-2px);
}

.flow-box-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flow-title-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.flow-icon-circle {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-amber-soft { background: #FEF3C7; color: #D97706; }
.bg-blue-soft  { background: #EFF6FF; color: #2563EB; }

.flow-label {
  font-size: 11px;
  font-weight: 700;
  color: #78655C;
}

.flow-diff-pill {
  font-size: 10px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 6px;
  font-variant-numeric: tabular-nums;
}

.pill-amber { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.pill-blue  { background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; }

.flow-amount {
  font-size: 15px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  margin-top: 2px;
}

.text-amber-bold { color: #D97706; }
.text-cocoa-bold { color: #2C1A13; }

.flow-progress-line {
  width: 100%;
  height: 4px;
  background: #EFE8DF;
  border-radius: 6px;
  overflow: hidden;
  margin: 2px 0;
}

.flow-fill-amber {
  height: 100%;
  background: #F59E0B;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.flow-fill-blue {
  height: 100%;
  background: #2563EB;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.flow-subtext {
  font-size: 10px;
  color: #8C786E;
}

/* Total Gross Takings Banner */
.shift-gross-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FDFBF7;
  border: 1px dashed #E2D9CE;
  border-radius: 10px;
  padding: 8px 14px;
}

.gross-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.gross-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #6B5A52;
}

.gross-scope-tag {
  font-size: 10px;
  font-weight: 800;
  background: #F5F1EB;
  color: #2C1A13;
  padding: 1px 6px;
  border-radius: 5px;
}

.gross-val {
  font-size: 14px;
  font-weight: 900;
  color: #2C1A13;
}

/* Reconciliation Banner */
.reconciliation-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 11.5px;
}

.banner-balanced {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
}

.banner-deficit, .banner-surplus {
  background: #FEF2F2;
  border: 1px solid #FECACA;
}

.reconcile-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reconcile-shield-icon {
  color: #059669;
  display: flex;
  align-items: center;
}

.reconcile-text {
  display: flex;
  align-items: baseline;
  gap: 5px;
  flex-wrap: wrap;
}

.reconcile-title {
  font-weight: 800;
  color: #2C1A13;
}

.reconcile-detail {
  color: #4B5563;
}

.reconcile-right {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.var-title {
  font-weight: 700;
  color: #6B5A52;
  font-size: 11px;
}

.var-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
}

.badge-zero {
  background: #DCFCE7;
  color: #15803D;
  border: 1px solid #86EFAC;
}

.badge-diff {
  background: #FEE2E2;
  color: #B91C1C;
  border: 1px solid #FCA5A5;
}
</style>
