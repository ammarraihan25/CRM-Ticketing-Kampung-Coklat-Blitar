<template>
  <div class="ticket-breakdown-card">
    <div class="card-header">
      <div>
        <h3 class="card-title">Penjualan Tiket per Kategori</h3>
        <span class="card-subtitle">Komposisi penjualan tiket reguler, rombongan, terusan & paket edukasi</span>
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
  background-color: var(--color-neutral, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--rounded-md, 8px);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary, #2c1a13);
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: var(--color-muted, #6b5a52);
}

.badge-total {
  font-size: 12px;
  font-weight: 600;
  background-color: rgba(242, 151, 39, 0.12);
  color: #b45309;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid rgba(242, 151, 39, 0.25);
}

.table-responsive {
  overflow-x: auto;
}

.breakdown-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.breakdown-table th {
  background-color: #faf8f5;
  color: var(--color-muted, #6b5a52);
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  text-align: left;
}

.breakdown-table td {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
  color: var(--color-primary, #2c1a13);
}

.breakdown-table tr:hover td {
  background-color: #fdfbf7;
}

.ticket-type-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-indicator {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  flex-shrink: 0;
}

.category-name {
  font-weight: 600;
  color: var(--color-primary, #2c1a13);
}

.category-desc {
  font-size: 11px;
  color: var(--color-muted, #6b5a52);
}

.cell-price {
  color: #4b5563;
}

.text-right {
  text-align: right;
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: 700;
}

.text-amber {
  color: #b45309;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar-bg {
  flex: 1;
  height: 7px;
  background-color: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.4s ease;
}

.percentage-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-muted, #6b5a52);
  width: 32px;
  text-align: right;
}

.total-row td {
  background-color: #f9f8f6;
  border-top: 2px solid var(--color-border, #e5e7eb);
  border-bottom: none;
  padding: 12px;
}
</style>
