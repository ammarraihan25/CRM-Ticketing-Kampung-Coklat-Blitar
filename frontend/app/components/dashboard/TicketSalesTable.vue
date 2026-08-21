<template>
  <div class="ticket-breakdown-card">

    <!-- Header Section -->
    <div class="card-header-flex">
      <div class="header-left">
        <div class="header-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <rect x="3" y="6" width="18" height="12" rx="2"/>
            <line x1="3" y1="11" x2="21" y2="11"/>
            <line x1="8" y1="6" x2="8" y2="18"/>
          </svg>
        </div>
        <div class="header-text">
          <h3 class="card-title">Penjualan Tiket per Kategori</h3>
          <p class="card-subtitle">Volume transaksi real-time &amp; kontribusi omzet</p>
        </div>
      </div>
    </div>

    <!-- Clean Table List -->
    <div class="clean-table-container">
      
      <!-- Table Header -->
      <div class="clean-table-header">
        <div class="th-cell th-name">Kategori &amp; Akses</div>
        <div class="th-cell th-vol text-right">Volume</div>
        <div class="th-cell th-omzet text-right">Total Omzet</div>
      </div>

      <!-- Table Rows -->
      <div class="ticket-slates-list">
        <div 
          v-for="(item, idx) in ticketItems" 
          :key="item.id" 
          class="ticket-slate-row"
        >
          <div class="td-cell td-name">
            <span class="slate-name">{{ item.name }}</span>
            <span class="slate-desc">{{ item.description }}</span>
          </div>

          <div class="td-cell td-vol text-right">
            <span class="metric-val-dark">{{ item.qty.toLocaleString('id-ID') }} <small>pax</small></span>
          </div>

          <div class="td-cell td-omzet text-right">
            <span class="metric-val-amber">{{ formatRupiah(item.totalGtv) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Summary Ribbon -->
    <div class="ticket-footer-ribbon">
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Total Volume</span>
        <span class="ribbon-val">{{ totalTicketsSold.toLocaleString('id-ID') }} Pax</span>
      </div>
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Total Pendapatan</span>
        <span class="ribbon-val-gold">{{ formatRupiah(totalGtvAmount) }}</span>
      </div>
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Rata-rata</span>
        <span class="ribbon-val">{{ totalTicketsSold > 0 ? formatRupiah(Math.round(totalGtvAmount / totalTicketsSold)) : 'Rp 0' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TicketCategoryItem {
  id: string
  code?: string
  name: string
  description: string
  price: number
  qty: number
  totalGtv: number
  percentage: number
  color: string
  bgLight?: string
}

interface Props {
  ticketItems: TicketCategoryItem[]
}

const props = defineProps<Props>()

const totalTicketsSold = computed(() => {
  return props.ticketItems.reduce((acc, item) => acc + item.qty, 0)
})

const totalGtvAmount = computed(() => {
  return props.ticketItems.reduce((acc, item) => acc + item.totalGtv, 0)
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
.ticket-breakdown-card {
  background: #FFFFFF;
  border: 1.5px solid #EFEAE2;
  border-radius: 20px;
  padding: 24px 28px;
  box-shadow: 0 10px 30px -4px rgba(44, 26, 19, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header-flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #FFFDF9;
  border: 1px solid #EFEAE2;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.card-title {
  font-size: 16px;
  font-weight: 800;
  color: #111111;
  margin: 0;
  letter-spacing: -0.2px;
}

.card-subtitle {
  font-size: 13.5px;
  font-weight: 600;
  color: #111111;
  margin: 2px 0 0 0;
  line-height: 1.5;
}

/* Table Architecture */
.clean-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.clean-table-header {
  display: flex;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 12px;
}

.th-cell {
  font-size: 11.5px;
  font-weight: 800;
  color: #111827;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ticket-slates-list {
  display: flex;
  flex-direction: column;
}

.ticket-slate-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #E5E7EB;
  transition: background-color 0.2s ease;
}

.ticket-slate-row:last-child {
  border-bottom: none;
}

.ticket-slate-row:hover {
  background: #F9FAFB;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: -10px;
  margin-right: -10px;
}

/* Grid Columns Strategy */
.th-name, .td-name { flex: 2; min-width: 140px; padding-right: 12px; }
.th-vol, .td-vol { flex: 1; min-width: 80px; }
.th-omzet, .td-omzet { flex: 1.2; min-width: 100px; padding-left: 12px; }

.td-cell {
  display: flex;
  align-items: center;
}

.text-right {
  text-align: right;
  justify-content: flex-end;
}

/* Content Styling */
.td-name {
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.slate-name {
  font-size: 14.5px;
  font-weight: 800;
  color: #111827;
}

.slate-desc {
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.metric-val-amber {
  font-size: 14.5px;
  font-weight: 800;
  color: #D97706;
}

.metric-val-dark {
  font-size: 14.5px;
  font-weight: 800;
  color: #111827;
}

.metric-val-dark small {
  font-size: 11px;
  color: #6B7280;
  font-weight: 600;
}

/* Footer Ribbon */
.ticket-footer-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: #111827;
  border-top: none;
  padding: 16px 20px;
  border-radius: 0 0 16px 16px;
  margin: 0 -28px -24px -28px;
}

.ribbon-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.ribbon-lbl {
  font-size: 10.5px;
  font-weight: 800;
  color: #9CA3AF;
  text-transform: uppercase;
}

.ribbon-val {
  font-size: 14px;
  font-weight: 800;
  color: #FFFFFF;
}

.ribbon-val-gold {
  font-size: 14.5px;
  font-weight: 900;
  color: #FBBF24;
}
</style>
