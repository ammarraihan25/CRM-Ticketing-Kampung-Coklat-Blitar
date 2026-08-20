<template>
  <div class="ticket-breakdown-card">
    <div class="card-top-accent"></div>

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
      <span class="badge-total-sold">{{ totalTicketsSold.toLocaleString('id-ID') }} Tiket Terjual</span>
    </div>

    <!-- 4 Aesthetic Horizontal Slates -->
    <div class="ticket-slates-list">
      <div 
        v-for="(item, idx) in ticketItems" 
        :key="item.id" 
        class="ticket-slate-row"
        :class="{ 'is-slate-lead': idx === 0 }"
        :style="{ '--slate-color': item.color }"
      >
        <div class="slate-identity">
          <div class="slate-name-group">
            <div class="slate-title-line">
              <span class="slate-name">{{ item.name }}</span>
              <span v-if="idx === 0" class="top-tag">Terlaris</span>
            </div>
            <span class="slate-desc">{{ item.description }}</span>
          </div>
        </div>

        <div class="slate-progress-col">
          <div class="slate-progress-header">
            <span class="progress-lbl">Porsi</span>
            <span class="progress-pct-val" :style="{ color: item.color }">{{ item.percentage }}%</span>
          </div>
          <div class="slate-track-bg">
            <div 
              class="slate-track-fill" 
              :style="{ width: `${item.percentage * 1.8}%`, backgroundColor: item.color }"
            ></div>
          </div>
        </div>

        <div class="slate-metrics-group">
          <div class="metric-block text-right">
            <span class="metric-tiny-title">VOLUME</span>
            <span class="metric-val-dark">{{ item.qty.toLocaleString('id-ID') }} <small>pax</small></span>
          </div>

          <div class="metric-block text-right">
            <span class="metric-tiny-title">TOTAL OMZET</span>
            <span class="metric-val-amber">{{ formatRupiah(item.totalGtv) }}</span>
          </div>

          <div class="slate-price-pill">
            <span>@ {{ formatRupiah(item.price) }}</span>
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
      <span class="ribbon-dot">&bull;</span>
      <div class="ribbon-stat">
        <span class="ribbon-lbl">Total Pendapatan:</span>
        <span class="ribbon-val-gold">{{ formatRupiah(totalGtvAmount) }}</span>
      </div>
      <span class="ribbon-dot">&bull;</span>
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
  padding: 20px 22px;
  box-shadow: 0 10px 30px -4px rgba(44, 26, 19, 0.07), 0 2px 6px rgba(44, 26, 19, 0.03);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s ease;
}

.ticket-breakdown-card:hover {
  box-shadow: 0 16px 36px -6px rgba(44, 26, 19, 0.12);
  border-color: rgba(245, 158, 11, 0.4);
}

.card-top-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2C1A13 0%, #D97706 50%, #F59E0B 100%);
}

.card-header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #FEF3C7;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title {
  font-size: 15.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.2px;
}

.card-subtitle {
  font-size: 11.5px;
  color: #78655C;
  margin: 0;
}

.badge-total-sold {
  font-size: 11.5px;
  font-weight: 800;
  background: #2C1A13;
  color: #FBBF24;
  padding: 4px 10px;
  border-radius: 7px;
  border: 1px solid #F59E0B;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.ticket-slates-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.ticket-slate-row {
  background: #FFFDF9;
  border: 1px solid #EFEAE2;
  border-radius: 13px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.2s ease;
}

.ticket-slate-row:hover {
  background: #FFFFFF;
  border-color: var(--slate-color, #F59E0B);
  transform: translateX(3px);
  box-shadow: 0 4px 14px rgba(44, 26, 19, 0.06);
}

.is-slate-lead {
  background: #FFFCF7;
  border-color: #F59E0B;
}

.slate-identity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
  flex: 1.1;
}

.slate-name-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.slate-title-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.slate-name {
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
  white-space: nowrap;
}

.top-tag {
  font-size: 9px;
  font-weight: 800;
  color: #B45309;
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  padding: 1px 5px;
  border-radius: 4px;
}

.slate-desc {
  font-size: 10.5px;
  color: #8C786E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slate-progress-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 90px;
  flex-shrink: 0;
}

.slate-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
}

.progress-lbl {
  color: #8C786E;
  font-weight: 700;
}

.progress-pct-val {
  font-weight: 800;
}

.slate-track-bg {
  width: 100%;
  height: 5px;
  background: #EFEAE2;
  border-radius: 4px;
  overflow: hidden;
}

.slate-track-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.slate-metrics-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.metric-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.text-right {
  text-align: right;
}

.metric-tiny-title {
  font-size: 8.5px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
}

.metric-val-dark {
  font-size: 12.5px;
  font-weight: 800;
  color: #2C1A13;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.metric-val-dark small {
  font-size: 10px;
  color: #8C786E;
  font-weight: 600;
}

.metric-val-amber {
  font-size: 13px;
  font-weight: 900;
  color: #D97706;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.slate-price-pill {
  background: #FFFFFF;
  border: 1px solid #E5DDD3;
  border-radius: 6px;
  padding: 3px 6px;
  font-size: 10.5px;
  font-weight: 700;
  color: #5A4034;
  white-space: nowrap;
}

.ticket-footer-ribbon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FDFBF7;
  border: 1px dashed #E2D9CE;
  border-radius: 8px;
  padding: 6px 12px;
}

.ribbon-stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 11px;
}

.ribbon-lbl {
  font-weight: 700;
  color: #78655C;
}

.ribbon-val {
  font-weight: 800;
  color: #2C1A13;
}

.ribbon-val-gold {
  font-weight: 900;
  color: #D97706;
}

.ribbon-dot {
  color: #D6CCC2;
  font-size: 10px;
}
</style>
