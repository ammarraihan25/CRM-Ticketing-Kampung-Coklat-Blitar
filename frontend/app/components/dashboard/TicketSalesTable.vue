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
        <div class="th-cell th-porsi">Porsi Volume</div>
        <div class="th-cell th-vol text-right">Volume</div>
        <div class="th-cell th-omzet text-right">Total Omzet</div>
        <div class="th-cell th-harga text-right">@ Harga</div>
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

          <div class="td-cell td-porsi">
            <div class="slate-track-bg">
              <div 
                class="slate-track-fill" 
                :style="{ width: `${item.percentage * 1.8}%`, backgroundColor: item.color }"
              ></div>
            </div>
            <span class="progress-pct-val">{{ item.percentage }}%</span>
          </div>

          <div class="td-cell td-vol text-right">
            <span class="metric-val-dark">{{ item.qty.toLocaleString('id-ID') }} <small>pax</small></span>
          </div>

          <div class="td-cell td-omzet text-right">
            <span class="metric-val-amber">{{ formatRupiah(item.totalGtv) }}</span>
          </div>

          <div class="td-cell td-harga text-right">
            <span class="slate-price-pill">{{ formatRupiah(item.price) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Summary Ribbon -->
    <div class="ticket-footer-ribbon">
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Total Volume:</span>
        <span class="ribbon-val">{{ totalTicketsSold.toLocaleString('id-ID') }} Pax</span>
      </div>
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Total Pendapatan:</span>
        <span class="ribbon-val-gold">{{ formatRupiah(totalGtvAmount) }}</span>
      </div>
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Rata-rata:</span>
        <span class="ribbon-val">{{ totalTicketsSold > 0 ? formatRupiah(Math.round(totalGtvAmount / totalTicketsSold)) : 'Rp 0' }} / tiket</span>
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
  padding-bottom: 12px;
  border-bottom: 1px solid #EAE2D8;
  margin-bottom: 12px;
}

.th-cell {
  font-size: 11.5px;
  font-weight: 800;
  color: #111111;
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
  padding: 12px 0;
  border-bottom: 1px solid #F5EFE6;
  transition: background-color 0.2s ease;
}

.ticket-slate-row:last-child {
  border-bottom: none;
}

.ticket-slate-row:hover {
  background: #FFFCF7;
  border-radius: 8px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: -8px;
  margin-right: -8px;
}

/* Grid Columns Strategy */
.th-name, .td-name { flex: 2; min-width: 160px; padding-right: 12px; }
.th-porsi, .td-porsi { flex: 1.5; min-width: 120px; padding-right: 12px; }
.th-vol, .td-vol { flex: 1; min-width: 80px; }
.th-omzet, .td-omzet { flex: 1.2; min-width: 100px; padding-left: 12px; }
.th-harga, .td-harga { width: 90px; flex-shrink: 0; padding-left: 12px; }

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
  gap: 2px;
}

.slate-name {
  font-size: 13.5px;
  font-weight: 800;
  color: #111111;
}

.slate-desc {
  font-size: 12.5px;
  font-weight: 600;
  color: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.td-porsi {
  gap: 10px;
}

.slate-track-bg {
  flex: 1;
  height: 6px;
  background: #F0EBE1;
  border-radius: 4px;
  overflow: hidden;
}

.slate-track-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-pct-val {
  font-size: 11px;
  font-weight: 800;
  color: #5A4034;
  width: 32px;
  text-align: right;
}

.metric-val-dark {
  font-size: 13px;
  font-weight: 800;
  color: #111111;
}

.metric-val-dark small {
  font-size: 10px;
  color: #8C786E;
  font-weight: 600;
}

.metric-val-amber {
  font-size: 13px;
  font-weight: 800;
  color: #D97706;
}

.slate-price-pill {
  font-size: 12px;
  font-weight: 700;
  color: #78655C;
  background: #FFFDF9;
  border: 1px solid #EAE2D8;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
}

/* Footer Ribbon */
.ticket-footer-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFCF7;
  border-top: 1px solid #EAE2D8;
  padding: 12px 16px;
  border-radius: 0 0 16px 16px;
  margin: 0 -28px -24px -28px;
}

.ribbon-stat {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.ribbon-lbl {
  font-size: 11px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
}

.ribbon-val {
  font-size: 12.5px;
  font-weight: 800;
  color: #111111;
}

.ribbon-val-gold {
  font-size: 13px;
  font-weight: 900;
  color: #D97706;
}
</style>
