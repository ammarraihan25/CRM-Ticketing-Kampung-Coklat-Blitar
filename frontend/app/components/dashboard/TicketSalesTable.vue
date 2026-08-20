<template>
  <div class="ticket-breakdown-card">
    <div class="card-header">
      <div>
        <h3 class="card-title">Penjualan Tiket per Kategori</h3>
        <span class="card-subtitle">Komposisi penjualan tiket reguler, rombongan, terusan &amp; paket edukasi</span>
      </div>
      <span class="badge-total">{{ totalTicketsSold.toLocaleString('id-ID') }} Tiket Total</span>
    </div>

    <div class="table-responsive">
      <table class="breakdown-table">
        <thead>
          <tr>
            <th>Kategori Tiket</th>
            <th>Harga Satuan</th>
            <th class="text-right">Qty Terjual</th>
            <th class="text-right">Total Pendapatan (GTV)</th>
            <th style="width: 140px;">Porsi Penjualan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ticketItems" :key="item.id">
            <td class="cell-category">
              <div class="ticket-type-box">
                <span class="color-indicator" :style="{ backgroundColor: item.color }"></span>
                <div>
                  <div class="category-name">{{ item.name }}</div>
                  <div class="category-desc">{{ item.description }}</div>
                </div>
              </div>
            </td>
            <td class="cell-price">{{ formatRupiah(item.price) }}</td>
            <td class="cell-qty text-right font-medium">{{ item.qty.toLocaleString('id-ID') }}</td>
            <td class="cell-gtv text-right font-bold">{{ formatRupiah(item.totalGtv) }}</td>
            <td class="cell-progress">
              <div class="progress-wrapper">
                <div class="progress-bar-bg">
                  <div 
                    class="progress-bar-fill" 
                    :style="{ width: `${item.percentage}%`, backgroundColor: item.color }"
                  ></div>
                </div>
                <span class="percentage-label">{{ item.percentage }}%</span>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="2" class="font-bold">Total Keseluruhan</td>
            <td class="text-right font-bold">{{ totalTicketsSold.toLocaleString('id-ID') }}</td>
            <td class="text-right font-bold text-amber">{{ formatRupiah(totalGtvAmount) }}</td>
            <td class="text-right font-bold">100%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TicketCategoryItem {
  id: string
  name: string
  description: string
  price: number
  qty: number
  totalGtv: number
  percentage: number
  color: string
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
  background-color: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 20px 22px;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card-title {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: #7A5034;
  margin-top: 2px;
}

.badge-total {
  font-size: 11.5px;
  font-weight: 800;
  background-color: #FAF3E8;
  color: #B45309;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #EADBCC;
}

.table-responsive {
  overflow-x: auto;
}

.breakdown-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.breakdown-table th {
  background-color: #FAF3E8;
  color: #7A5034;
  font-weight: 700;
  padding: 10px 14px;
  border-bottom: 1.5px solid #EADBCC;
  text-align: left;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.breakdown-table th:first-child {
  border-radius: 10px 0 0 10px;
}

.breakdown-table th:last-child {
  border-radius: 0 10px 10px 0;
}

.breakdown-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #F0E5D8;
  color: #2C1A13;
  vertical-align: middle;
}

.cell-category {
  min-width: 180px;
}

.ticket-type-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.category-name {
  font-weight: 800;
  color: #2C1A13;
}

.category-desc {
  font-size: 11px;
  color: #8C6D58;
}

.cell-price {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  color: #5A2E17;
  font-weight: 600;
}

.cell-qty {
  font-weight: 700;
}

.cell-gtv {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #2C1A13;
}

.cell-progress {
  min-width: 130px;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar-bg {
  flex: 1;
  height: 7px;
  background-color: #EDE2D4;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.4s ease;
}

.percentage-label {
  font-size: 11px;
  font-weight: 800;
  color: #7A5034;
  min-width: 32px;
  text-align: right;
}

.total-row td {
  background-color: #FAF3E8;
  border-top: 1.5px solid #D6BFA8;
  border-bottom: none;
  font-size: 13px;
}

.total-row td:first-child {
  border-radius: 10px 0 0 10px;
}

.total-row td:last-child {
  border-radius: 0 10px 10px 0;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: 800;
}

.font-medium {
  font-weight: 600;
}

.text-amber {
  color: #B45309;
}
</style>
