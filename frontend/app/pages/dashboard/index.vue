<template>
  <div class="dashboard-container">
    <!-- Header Section -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1 class="page-title">Dashboard Overview &amp; Finansial</h1>
        <p class="page-subtitle">
          Ringkasan eksekutif penjualan tiket, kinerja kasir POS, omzet GTV, dan segmentasi CRM Kampung Coklat.
        </p>
      </div>

      <!-- Header Actions: Period Pill Filter + Refresh Button -->
      <div class="header-actions">
        <!-- Segmented Period Filter Pill (Soft Rounded Buttons) -->
        <div class="period-segmented-pill">
          <span class="period-label-text">Periode:</span>
          <div class="seg-btn-group">
            <button 
              v-for="p in periodOptions" 
              :key="p.value"
              type="button"
              class="seg-pill-btn"
              :class="{ active: selectedPeriod === p.value }"
              @click="changePeriod(p.value)"
            >
              {{ p.label }}
            </button>
          </div>
        </div>

        <!-- Refresh Button -->
        <button 
          type="button" 
          class="btn-refresh-soft"
          title="Muat Ulang Data"
          :disabled="isLoading"
          @click="refreshData"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" :class="{ 'spin-anim': isLoading }">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>
    </header>

    <!-- Role Notice / Switcher Banner -->
    <OwnerNotice />

    <!-- 4 KPI Cards Grid (GTV, Tiket Terjual, Pengunjung Gate In, Member Baru) -->
    <section class="kpi-cards-grid-4">
      <!-- 1. Total GTV -->
      <KpiCard
        title="TOTAL GTV (PENDAPATAN)"
        :value="formatRupiah(currentMetrics.totalGtv)"
        theme="orange"
        icon="currency"
        tag="REALTIME"
        trend-value="+14.4%"
        :comparison="currentMetrics.gtvComparison"
        subtitle="Gross Transaction Value"
      />

      <!-- 2. Total Tiket Terjual -->
      <KpiCard
        title="TOTAL TIKET TERJUAL"
        :value="`${currentMetrics.totalTickets.toLocaleString('id-ID')} Tiket`"
        theme="black"
        icon="ticket"
        trend-value="+15.0%"
        :comparison="currentMetrics.ticketsComparison"
        subtitle="Reguler, Rombongan &amp; Paket"
      />

      <!-- 3. Total Pengunjung (Gate In) -->
      <KpiCard
        title="TOTAL PENGUNJUNG (GATE IN)"
        :value="`${currentMetrics.totalVisitors.toLocaleString('id-ID')} Pax`"
        theme="brown"
        icon="users"
        trend-value="+12.8%"
        :comparison="currentMetrics.visitorsComparison"
        subtitle="Scan barcode turnstile"
      />

      <!-- 4. Member Baru Terdaftar -->
      <KpiCard
        title="MEMBER BARU TERDAFTAR"
        :value="`+${currentMetrics.newMembers}`"
        theme="green"
        icon="user-plus"
        tag="ACQUISITION"
        trend-value="+22.0%"
        :comparison="currentMetrics.newMembersComparison"
        subtitle="Guestbook PP &amp; POS Kasir"
      />
    </section>

    <!-- Charts Section: GTV Trend & Member CRM Segmentation -->
    <section class="charts-row">
      <!-- GTV & Revenue Trend Chart (Line / Bar) -->
      <div class="chart-card main-chart-elevated">
        <div class="chart-header">
          <div class="chart-title-group">
            <div class="chart-title-with-badge">
              <h3 class="chart-title">Tren Pendapatan &amp; Penjualan Tiket</h3>
              <span class="peak-hour-chip">
                <span class="chip-dot"></span>
                <span>Puncak: 13:00 WIB</span>
              </span>
            </div>
            <span class="chart-subtitle">
              {{ selectedPeriod === 'today' ? 'Distribusi transaksi per jam operasional (08:00 - 17:00 WIB)' : selectedPeriod === 'week' ? 'Tren fluktuasi harian selama 7 hari terakhir' : 'Akumulasi tren mingguan selama 30 hari terakhir' }}
            </span>
          </div>

          <div class="chart-header-right">
            <!-- Custom Legend Badges -->
            <div class="chart-legend-pills">
              <div class="legend-pill pill-gtv">
                <span class="legend-color-dot color-gtv"></span>
                <span>Pendapatan GTV</span>
              </div>
              <div class="legend-pill pill-tickets">
                <span class="legend-color-dot color-tickets"></span>
                <span>Volume Tiket</span>
              </div>
            </div>

            <!-- Segmented Chart Toggle -->
            <div class="chart-type-toggle-pill">
              <button 
                type="button"
                class="type-btn"
                :class="{ active: chartType === 'line' }"
                @click="setChartType('line')"
              >
                Line
              </button>
              <button 
                type="button"
                class="type-btn"
                :class="{ active: chartType === 'bar' }"
                @click="setChartType('bar')"
              >
                Bar
              </button>
            </div>
          </div>
        </div>

        <div class="chart-canvas-container">
          <canvas ref="revenueChartCanvas"></canvas>
        </div>

        <!-- 3-Column Key Operational Insights Strip -->
        <div class="chart-insight-strip">
          <div class="insight-col">
            <span class="insight-label">Rata-rata Transaksi</span>
            <span class="insight-val text-amber">Rp 20.000 / tiket</span>
          </div>
          <div class="insight-col">
            <span class="insight-label">Jam Kunjungan Teramai</span>
            <span class="insight-val text-cocoa">10:00 - 14:00 WIB</span>
          </div>
          <div class="insight-col">
            <span class="insight-label">Konversi Gate Check-in</span>
            <span class="insight-val text-green">89.0% Pax Tervalidasi</span>
          </div>
        </div>
      </div>

      <!-- Member Segmentation Donut Chart (PR vs PP vs PT) -->
      <div class="chart-card donut-chart-elevated">
        <div class="chart-header">
          <div>
            <h3 class="chart-title">Segmentasi Member CRM</h3>
            <span class="chart-subtitle">Proporsi Kategori Pelanggan</span>
          </div>
          <span class="crm-total-badge">
            <span class="pulse-crm-dot"></span>
            <span>{{ memberSegmentTotal.toLocaleString('id-ID') }} Kontak</span>
          </span>
        </div>

        <div class="donut-canvas-container">
          <canvas ref="memberChartCanvas"></canvas>
        </div>

        <!-- Custom Detail Breakdown List with Progress Bars -->
        <div class="segment-breakdown-list">
          <div v-for="seg in memberSegments" :key="seg.code" class="segment-row-box">
            <div class="seg-row-header">
              <div class="seg-badge-left">
                <span class="seg-dot-indicator" :style="{ backgroundColor: seg.color }"></span>
                <span class="seg-code-bold"><strong>{{ seg.code }}</strong> &bull; {{ seg.title }}</span>
              </div>
              <div class="seg-numbers-right">
                <span class="seg-count-num">{{ seg.count.toLocaleString('id-ID') }}</span>
                <span class="seg-pct-tag" :style="{ color: seg.color }">({{ seg.percentage }}%)</span>
              </div>
            </div>

            <!-- Progress Bar Track -->
            <div class="seg-track-bg">
              <div 
                class="seg-track-fill" 
                :style="{ width: `${seg.percentage}%`, backgroundColor: seg.color }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Quick Link to CRM Reports -->
        <div class="crm-card-footer">
          <NuxtLink to="/reports" class="btn-crm-link">
            <span>Buka Direktori WhatsApp Member &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Tables & Secondary Analytics Grid -->
    <section class="breakdown-grid">
      <!-- Ticket Sales Breakdown Table Component -->
      <div class="grid-left-col">
        <TicketSalesTable :ticket-items="currentTicketBreakdown" />
      </div>

      <!-- Demographic / Domisili Overview Top 5 Origin Cities -->
      <div class="grid-right-col">
        <div class="demographic-card">
          <div class="card-header">
            <div>
              <h3 class="card-title">Demografi Asal Pengunjung</h3>
              <span class="card-subtitle">Top 5 Kota/Kabupaten asal member &amp; tiket</span>
            </div>
            <span class="badge-filter">Data WA &amp; POS</span>
          </div>

          <div class="demographic-list">
            <div v-for="(city, idx) in currentDemographics" :key="city.name" class="city-item">
              <div class="city-header-row">
                <div class="city-rank-name">
                  <span class="rank-badge">{{ idx + 1 }}</span>
                  <span class="city-name">{{ city.name }}</span>
                  <span v-if="city.isLocal" class="local-pill">Lokal Blitar</span>
                </div>
                <div class="city-stat">
                  <span class="city-count font-bold">{{ city.visitors.toLocaleString('id-ID') }} Org</span>
                  <span class="city-percentage">({{ city.percentage }}%)</span>
                </div>
              </div>

              <div class="city-bar-track">
                <div 
                  class="city-bar-fill"
                  :style="{ width: `${city.percentage}%`, backgroundColor: city.color }"
                ></div>
              </div>
            </div>
          </div>

          <div class="demographic-footer">
            <p class="demographic-insight">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-inline">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Sebanyak <strong>78%</strong> pengunjung berasal dari wilayah aglomerasi Blitar Raya &amp; Kediri.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods & Cashier Shift Overview -->
    <section class="operations-grid">
      <!-- Payment Methods Summary -->
      <div class="payment-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Ringkasan Metode Pembayaran</h3>
            <span class="card-subtitle">Volume &amp; proporsi transaksi per kanal kasir</span>
          </div>
          <span class="badge-total">{{ formatRupiah(totalPaymentAmount) }}</span>
        </div>

        <div class="payment-methods-list">
          <div v-for="pay in currentPaymentMethods" :key="pay.id" class="payment-row">
            <div class="payment-left">
              <div class="payment-icon-box" :style="{ backgroundColor: pay.bgLight, color: pay.color }">
                <!-- Method icon -->
                <svg v-if="pay.id === 'qris'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pay-svg">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
                <svg v-else-if="pay.id === 'cash'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pay-svg">
                  <rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
                </svg>
                <svg v-else-if="pay.id === 'debit'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pay-svg">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pay-svg">
                  <path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" /><polyline points="15 3 15 7 9 7" />
                </svg>
              </div>

              <div>
                <div class="pay-title font-medium">{{ pay.name }}</div>
                <div class="pay-tx-count">{{ pay.transactions.toLocaleString('id-ID') }} Transaksi ({{ pay.percentage }}%)</div>
              </div>
            </div>

            <div class="payment-right text-right">
              <div class="pay-amount font-bold">{{ formatRupiah(pay.amount) }}</div>
              <div class="pay-status" :class="pay.status === 'Settled' ? 'text-green' : 'text-amber'">
                ● {{ pay.status }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cashier / Shift Summary Component -->
      <div class="shift-wrapper">
        <ShiftSummaryCard 
          :shift-data="currentShiftData" 
          :is-read-only="currentRole === 'owner'"
          @view-details="handleViewShiftLog"
          @close-shift="handleCloseShift"
        />
      </div>
    </section>

    <!-- Bottom Aesthetic Banner (Safety is our Priority & Operational Quality) -->
    <section class="safety-banner-reference">
      <div class="safety-banner-left">
        <div class="safety-emblem-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="leaf-icon">
            <path d="M11 20A7 7 0 0 1 4 13C4 7 11 2 11 2s7 5 7 11a7 7 0 0 1-7 7Z"/>
            <path d="M11 2v18"/>
          </svg>
        </div>
        <div class="safety-banner-texts">
          <h4 class="safety-title">Safety &amp; Operational Excellence</h4>
          <p class="safety-desc">
            Seluruh wahana, pintu masuk otomatis (turnstile), dan pos kasir beroperasi dalam protokol keamanan standar Kampung Coklat.
          </p>
        </div>
      </div>

      <div class="safety-banner-right-art">
        <svg class="plantation-gazebo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none">
          <!-- Heritage Plantation Architecture Outline Vector -->
          <path d="M140 10 L80 35 L90 75 L190 75 L200 35 Z" stroke="#D6BFA8" stroke-width="1.5" />
          <path d="M140 10 L140 75" stroke="#D6BFA8" stroke-width="1.2" stroke-dasharray="2 2" />
          <path d="M100 42 L180 42" stroke="#D6BFA8" stroke-width="1.2" />
          <path d="M115 50 L115 75 M140 50 L140 75 M165 50 L165 75" stroke="#D6BFA8" stroke-width="1.2" />
          <path d="M20 75 L260 75" stroke="#D6BFA8" stroke-width="1.5" />
          <!-- Small foliage side -->
          <circle cx="50" cy="65" r="12" stroke="#E2D4C3" stroke-width="1.2" />
          <circle cx="65" cy="60" r="10" stroke="#E2D4C3" stroke-width="1.2" />
          <circle cx="225" cy="62" r="11" stroke="#E2D4C3" stroke-width="1.2" />
        </svg>
      </div>
    </section>

    <!-- Shift Log Modal Dialog -->
    <div v-if="showShiftModal" class="modal-backdrop" @click.self="showShiftModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Audit Log Shift: {{ currentShiftData.shiftName }}</h3>
          <button class="btn-close" @click="showShiftModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p><strong>Kasir:</strong> {{ currentShiftData.cashierName }} ({{ currentShiftData.cashierId }})</p>
          <p><strong>Terminal:</strong> {{ currentShiftData.terminalName }}</p>
          <p><strong>Waktu Buka:</strong> {{ currentShiftData.date }}, {{ currentShiftData.startTime }} WIB</p>
          <p><strong>Total Tiket Terjual:</strong> {{ currentShiftData.totalTicketsSold }} Tiket</p>
          <p><strong>Total Kas Fisik:</strong> {{ formatRupiah(currentShiftData.cashReceived) }}</p>
          <p><strong>Status Rekonsiliasi:</strong> {{ currentShiftData.reconciliationNotes }}</p>
          <div class="alert-info">
            Data ini merupakan catatan audit yang tersimpan di basis data log POS kasir.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="showShiftModal = false">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

// Import Dashboard Subcomponents
import KpiCard from '~/components/dashboard/KpiCard.vue'
import OwnerNotice from '~/components/dashboard/OwnerNotice.vue'
import ShiftSummaryCard, { type ShiftInfo } from '~/components/dashboard/ShiftSummaryCard.vue'
import TicketSalesTable, { type TicketCategoryItem } from '~/components/dashboard/TicketSalesTable.vue'

import { useAuth, type UserRole } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

// Set layout to admin
definePageMeta({
  layout: 'admin'
})

// Register Chart.js core components
Chart.register(...registerables)

const { currentRole } = useAuth()

// Period Filter State ('today' | 'week' | 'month')
type PeriodType = 'today' | 'week' | 'month'
const selectedPeriod = ref<PeriodType>('today')
const isLoading = ref(false)
const chartType = ref<'line' | 'bar'>('line')
const showShiftModal = ref(false)

const periodOptions = [
  { label: 'Hari Ini', value: 'today' as PeriodType },
  { label: 'Minggu Ini', value: 'week' as PeriodType },
  { label: 'Bulan Ini', value: 'month' as PeriodType }
]

interface PeriodMetrics {
  totalGtv: number
  gtvComparison: string
  gtvGrowth: string
  totalTickets: number
  ticketsComparison: string
  ticketsGrowth: string
  totalVisitors: number
  visitorsComparison: string
  visitorsGrowth: string
  totalMembers: number
  membersComparison: string
  membersGrowth: string
  newMembers: number
  newMembersComparison: string
  newMembersGrowth: string
}

const mockMetrics: Record<PeriodType, PeriodMetrics> = {
  today: {
    totalGtv: 48750000,
    gtvComparison: 'vs kemarin (Rp 42.600.000)',
    gtvGrowth: '+14.4%',
    totalTickets: 2450,
    ticketsComparison: 'vs kemarin (2.130 tiket)',
    ticketsGrowth: '+15.0%',
    totalVisitors: 2180,
    visitorsComparison: '89% tiket sudah check-in di gate',
    visitorsGrowth: '+12.8%',
    totalMembers: 14820,
    membersComparison: 'Total basis kontak WA aktif',
    membersGrowth: '+3.2%',
    newMembers: 215,
    newMembersComparison: '142 PP Guestbook + 73 POS PR',
    newMembersGrowth: '+22.0%'
  },
  week: {
    totalGtv: 312500000,
    gtvComparison: 'vs minggu lalu (Rp 285.000.000)',
    gtvGrowth: '+9.6%',
    totalTickets: 15600,
    ticketsComparison: 'vs minggu lalu (14.250 tiket)',
    ticketsGrowth: '+9.5%',
    totalVisitors: 14200,
    visitorsComparison: 'Rata-rata 2.028 pax/hari',
    visitorsGrowth: '+8.4%',
    totalMembers: 14820,
    membersComparison: 'Total basis kontak WA aktif',
    membersGrowth: '+3.2%',
    newMembers: 1240,
    newMembersComparison: 'vs minggu lalu (+980 member)',
    newMembersGrowth: '+26.5%'
  },
  month: {
    totalGtv: 1245000000,
    gtvComparison: 'vs bulan lalu (Rp 1.150.000.000)',
    gtvGrowth: '+8.3%',
    totalTickets: 62250,
    ticketsComparison: 'vs bulan lalu (57.500 tiket)',
    ticketsGrowth: '+8.2%',
    totalVisitors: 58900,
    visitorsComparison: 'Tingkat utilisasi wahana 94%',
    visitorsGrowth: '+7.1%',
    totalMembers: 14820,
    membersComparison: 'Total basis kontak WA aktif',
    membersGrowth: '+3.2%',
    newMembers: 4680,
    newMembersComparison: 'Target bulanan: 4.000 member (Tercapai)',
    newMembersGrowth: '+17.0%'
  }
}

const currentMetrics = computed(() => mockMetrics[selectedPeriod.value])

// Ticket Breakdown
const mockTicketBreakdown: Record<PeriodType, TicketCategoryItem[]> = {
  today: [
    { id: 't-1', name: 'Tiket Masuk Reguler (PR)', description: 'Akses masuk perkebunan & galeri', price: 20000, qty: 1450, totalGtv: 29000000, percentage: 59.5, color: '#3D2214' },
    { id: 't-2', name: 'Tiket Terusan Wahana Edukasi', description: 'Termasuk cooking class & petik kakao', price: 35000, qty: 520, totalGtv: 18200000, percentage: 37.3, color: '#D97706' },
    { id: 't-3', name: 'Paket Jamaah Pengajian (PP)', description: 'Khusus jamaah majlis (Free tiket masuk)', price: 0, qty: 380, totalGtv: 0, percentage: 0.0, color: '#10B981' },
    { id: 't-4', name: 'Rombongan Tour Bus (PT)', description: 'Mitra biro wisata & agen travel', price: 15000, qty: 100, totalGtv: 1550000, percentage: 3.2, color: '#6366F1' }
  ],
  week: [
    { id: 't-1', name: 'Tiket Masuk Reguler (PR)', description: 'Akses masuk perkebunan & galeri', price: 20000, qty: 9400, totalGtv: 188000000, percentage: 60.1, color: '#3D2214' },
    { id: 't-2', name: 'Tiket Terusan Wahana Edukasi', description: 'Termasuk cooking class & petik kakao', price: 35000, qty: 3400, totalGtv: 119000000, percentage: 38.1, color: '#D97706' },
    { id: 't-3', name: 'Paket Jamaah Pengajian (PP)', description: 'Khusus jamaah majlis (Free tiket masuk)', price: 0, qty: 2100, totalGtv: 0, percentage: 0.0, color: '#10B981' },
    { id: 't-4', name: 'Rombongan Tour Bus (PT)', description: 'Mitra biro wisata & agen travel', price: 15000, qty: 700, totalGtv: 5500000, percentage: 1.8, color: '#6366F1' }
  ],
  month: [
    { id: 't-1', name: 'Tiket Masuk Reguler (PR)', description: 'Akses masuk perkebunan & galeri', price: 20000, qty: 38500, totalGtv: 770000000, percentage: 61.8, color: '#3D2214' },
    { id: 't-2', name: 'Tiket Terusan Wahana Edukasi', description: 'Termasuk cooking class & petik kakao', price: 35000, qty: 13200, totalGtv: 462000000, percentage: 37.1, color: '#D97706' },
    { id: 't-3', name: 'Paket Jamaah Pengajian (PP)', description: 'Khusus jamaah majlis (Free tiket masuk)', price: 0, qty: 7800, totalGtv: 0, percentage: 0.0, color: '#10B981' },
    { id: 't-4', name: 'Rombongan Tour Bus (PT)', description: 'Mitra biro wisata & agen travel', price: 15000, qty: 2750, totalGtv: 13000000, percentage: 1.1, color: '#6366F1' }
  ]
}

const currentTicketBreakdown = computed(() => mockTicketBreakdown[selectedPeriod.value])

// Demographics
const mockDemographics = {
  today: [
    { name: 'Kab. Blitar & Kota Blitar', visitors: 1180, percentage: 54, isLocal: true, color: '#3D2214' },
    { name: 'Kediri (Kota & Kab)', visitors: 520, percentage: 24, isLocal: false, color: '#D97706' },
    { name: 'Tulungagung', visitors: 260, percentage: 12, isLocal: false, color: '#10B981' },
    { name: 'Malang Raya', visitors: 130, percentage: 6, isLocal: false, color: '#6366F1' },
    { name: 'Kota Lainnya (Jawa Timur)', visitors: 90, percentage: 4, isLocal: false, color: '#8C6D58' }
  ],
  week: [
    { name: 'Kab. Blitar & Kota Blitar', visitors: 7800, percentage: 55, isLocal: true, color: '#3D2214' },
    { name: 'Kediri (Kota & Kab)', visitors: 3400, percentage: 24, isLocal: false, color: '#D97706' },
    { name: 'Tulungagung', visitors: 1700, percentage: 12, isLocal: false, color: '#10B981' },
    { name: 'Malang Raya', visitors: 850, percentage: 6, isLocal: false, color: '#6366F1' },
    { name: 'Kota Lainnya (Jawa Timur)', visitors: 450, percentage: 3, isLocal: false, color: '#8C6D58' }
  ],
  month: [
    { name: 'Kab. Blitar & Kota Blitar', visitors: 31000, percentage: 53, isLocal: true, color: '#3D2214' },
    { name: 'Kediri (Kota & Kab)', visitors: 14500, percentage: 25, isLocal: false, color: '#D97706' },
    { name: 'Tulungagung', visitors: 7200, percentage: 12, isLocal: false, color: '#10B981' },
    { name: 'Malang Raya', visitors: 3800, percentage: 6, isLocal: false, color: '#6366F1' },
    { name: 'Kota Lainnya (Jawa Timur)', visitors: 2400, percentage: 4, isLocal: false, color: '#8C6D58' }
  ]
}

const currentDemographics = computed(() => mockDemographics[selectedPeriod.value])

// Payment Methods
const mockPaymentMethods = {
  today: [
    { id: 'qris', name: 'QRIS Dinamis (BCA / Mandiri / GoPay)', transactions: 1280, amount: 25800000, percentage: 52.9, status: 'Settled', color: '#047857', bgLight: '#D1FAE5' },
    { id: 'cash', name: 'Tunai Kasir (Cash POS)', transactions: 920, amount: 18450000, percentage: 37.8, status: 'Settled', color: '#B45309', bgLight: '#FEF3C7' },
    { id: 'debit', name: 'Debit EDC (BCA / BRI / BNI)', transactions: 210, amount: 4200000, percentage: 8.6, status: 'Settled', color: '#5B21B6', bgLight: '#EDE9FE' },
    { id: 'transfer', name: 'Bank Transfer / VA B2B', transactions: 40, amount: 300000, percentage: 0.7, status: 'Settled', color: '#3D2214', bgLight: '#F5EBE1' }
  ],
  week: [
    { id: 'qris', name: 'QRIS Dinamis (BCA / Mandiri / GoPay)', transactions: 8100, amount: 165000000, percentage: 52.8, status: 'Settled', color: '#047857', bgLight: '#D1FAE5' },
    { id: 'cash', name: 'Tunai Kasir (Cash POS)', transactions: 5900, amount: 118000000, percentage: 37.8, status: 'Settled', color: '#B45309', bgLight: '#FEF3C7' },
    { id: 'debit', name: 'Debit EDC (BCA / BRI / BNI)', transactions: 1350, amount: 26500000, percentage: 8.5, status: 'Settled', color: '#5B21B6', bgLight: '#EDE9FE' },
    { id: 'transfer', name: 'Bank Transfer / VA B2B', transactions: 250, amount: 3000000, percentage: 0.9, status: 'Settled', color: '#3D2214', bgLight: '#F5EBE1' }
  ],
  month: [
    { id: 'qris', name: 'QRIS Dinamis (BCA / Mandiri / GoPay)', transactions: 32500, amount: 658000000, percentage: 52.8, status: 'Settled', color: '#047857', bgLight: '#D1FAE5' },
    { id: 'cash', name: 'Tunai Kasir (Cash POS)', transactions: 23600, amount: 470000000, percentage: 37.8, status: 'Settled', color: '#B45309', bgLight: '#FEF3C7' },
    { id: 'debit', name: 'Debit EDC (BCA / BRI / BNI)', transactions: 5400, amount: 105000000, percentage: 8.4, status: 'Settled', color: '#5B21B6', bgLight: '#EDE9FE' },
    { id: 'transfer', name: 'Bank Transfer / VA B2B', transactions: 750, amount: 12000000, percentage: 1.0, status: 'Settled', color: '#3D2214', bgLight: '#F5EBE1' }
  ]
}

const currentPaymentMethods = computed(() => mockPaymentMethods[selectedPeriod.value])
const totalPaymentAmount = computed(() => currentPaymentMethods.value.reduce((acc, p) => acc + p.amount, 0))

// Shift Data
const currentShiftData = ref<ShiftInfo>({
  id: 'shift-1029',
  shiftName: 'Shift 1 - Pagi Operasional',
  terminalName: 'POS Gate Utama #01',
  cashierName: 'Ahmad Faisal Pratama',
  cashierId: 'KSR-004',
  date: 'Hari Ini, 20 Agustus 2026',
  startTime: '08:00',
  endTime: '14:00',
  totalTransactions: 342,
  totalTicketsSold: 890,
  cashReceived: 18450000,
  nonCashReceived: 30300000,
  reconciliationStatus: 'balanced',
  statusLabel: 'Shift Sedang Aktif',
  reconciliationNotes: 'Selisih kas Rp 0. Fisik laci kas cocok dengan log POS.',
  variance: 0,
  isClosed: false
})

// CRM Member Segmentation
const memberSegments = [
  { code: 'PR', title: 'Pengunjung Reguler', count: 8892, percentage: 60, color: '#3D2214' },
  { code: 'PP', title: 'Jamaah Pengajian (Digital Guestbook)', count: 4446, percentage: 30, color: '#D97706' },
  { code: 'PT', title: 'Agen Tour & Rombongan B2B', count: 1482, percentage: 10, color: '#10B981' }
]

const memberSegmentTotal = computed(() => memberSegments.reduce((acc, s) => acc + s.count, 0))

// Canvas references
const revenueChartCanvas = ref<HTMLCanvasElement | null>(null)
const memberChartCanvas = ref<HTMLCanvasElement | null>(null)
let revenueChartInstance: Chart | null = null
let memberChartInstance: Chart | null = null

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value)
}

const changePeriod = (period: PeriodType) => {
  selectedPeriod.value = period
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    renderRevenueChart()
  }, 200)
}

const refreshData = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    renderRevenueChart()
    renderMemberChart()
  }, 400)
}

const setChartType = (type: 'line' | 'bar') => {
  chartType.value = type
  renderRevenueChart()
}

const handleViewShiftLog = (shift: ShiftInfo) => {
  showShiftModal.value = true
}

const handleCloseShift = (shift: ShiftInfo) => {
  if (confirm(`Apakah Anda yakin ingin menutup ${shift.shiftName}? Sistem akan melakukan rekonsiliasi akhir.`)) {
    shift.isClosed = true
    shift.statusLabel = 'Shift Ditutup & Rekonsiliasi Sukses'
    alert(`Shift ${shift.shiftName} berhasil ditutup. Laporan terkirim ke Manager & Owner.`)
  }
}

// Chart rendering functions
const renderRevenueChart = () => {
  if (!revenueChartCanvas.value) return
  if (revenueChartInstance) {
    revenueChartInstance.destroy()
  }

  let labels: string[] = []
  let gtvData: number[] = []
  let ticketData: number[] = []

  if (selectedPeriod.value === 'today') {
    labels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    gtvData = [1200000, 2800000, 5400000, 7100000, 6800000, 8900000, 7200000, 4800000, 3100000, 1450000]
    ticketData = [60, 140, 270, 355, 340, 445, 360, 240, 155, 75]
  } else if (selectedPeriod.value === 'week') {
    labels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    gtvData = [24000000, 26500000, 31000000, 33500000, 42000000, 78500000, 77000000]
    ticketData = [1200, 1325, 1550, 1675, 2100, 3925, 3850]
  } else {
    labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
    gtvData = [285000000, 295000000, 325000000, 340000000]
    ticketData = [14250, 14750, 16250, 17000]
  }

  const ctx = revenueChartCanvas.value.getContext('2d')
  if (!ctx) return

  revenueChartInstance = new Chart(ctx, {
    type: chartType.value,
    data: {
      labels,
      datasets: [
        {
          label: 'Pendapatan GTV (Rp)',
          data: gtvData,
          borderColor: '#D97706',
          backgroundColor: chartType.value === 'bar' ? 'rgba(217, 119, 6, 0.85)' : 'rgba(217, 119, 6, 0.12)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#D97706',
          pointRadius: 4,
          yAxisID: 'y'
        },
        {
          label: 'Volume Tiket Terjual',
          data: ticketData,
          borderColor: '#3D2214',
          backgroundColor: chartType.value === 'bar' ? 'rgba(61, 34, 20, 0.85)' : 'rgba(61, 34, 20, 0.08)',
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointBackgroundColor: '#3D2214',
          pointRadius: 3.5,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2C1A13',
          titleFont: { size: 12, family: 'Jost', weight: 'bold' },
          bodyFont: { size: 11.5, family: 'Jost' },
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Jost', size: 11 }, color: '#8C6D58' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: '#EFE4D6' },
          ticks: {
            font: { family: 'Jost', size: 10.5 },
            color: '#8C6D58',
            callback: (val) => `Rp ${(Number(val) / 1000000).toFixed(0)}Jt`
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: {
            font: { family: 'Jost', size: 10.5 },
            color: '#3D2214',
            callback: (val) => `${val} Tiket`
          }
        }
      }
    }
  })
}

const renderMemberChart = () => {
  if (!memberChartCanvas.value) return
  if (memberChartInstance) {
    memberChartInstance.destroy()
  }

  const ctx = memberChartCanvas.value.getContext('2d')
  if (!ctx) return

  memberChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: memberSegments.map(s => s.title),
      datasets: [
        {
          data: memberSegments.map(s => s.count),
          backgroundColor: ['#3D2214', '#D97706', '#10B981'],
          borderWidth: 2,
          borderColor: '#FFFFFF',
          hoverOffset: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2C1A13',
          padding: 8,
          cornerRadius: 8
        }
      },
      cutout: '72%'
    }
  })
}

onMounted(() => {
  nextTick(() => {
    renderRevenueChart()
    renderMemberChart()
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

/* ========================================================================= */
/* MAIN DASHBOARD CONTAINER                                                  */
/* ========================================================================= */
.dashboard-container {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Jost', sans-serif;
}

/* ========================================================================= */
/* HEADER BANNER WITH COCOA & CHOCOLATE ILLUSTRATION                         */
/* ========================================================================= */
.dashboard-header {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 24px;
  padding: 24px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(61, 34, 20, 0.04);
}

.header-main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 3;
  gap: 20px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 620px;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3D2214;
  color: #FAF5EE;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.mini-chip-img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FAF3E8;
  color: #B45309;
  border: 1px solid #EADBCC;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.4px;
}

.page-subtitle {
  font-size: 13.5px;
  color: #6E442B;
  margin: 0;
  line-height: 1.5;
}

/* Period Filter & Refresh Action */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.period-segmented-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 20px;
  padding: 4px 6px 4px 12px;
}

.period-label-text {
  font-size: 11.5px;
  font-weight: 800;
  color: #8C6D58;
  text-transform: uppercase;
}

.seg-btn-group {
  display: flex;
  gap: 4px;
}

.seg-pill-btn {
  background: transparent;
  border: none;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 800;
  color: #7A5034;
  cursor: pointer;
  transition: all 0.2s ease;
}

.seg-pill-btn:hover {
  color: #2C1A13;
}

.seg-pill-btn.active {
  background: #3D2214;
  color: #FAF5EE;
  box-shadow: 0 2px 8px rgba(61, 34, 20, 0.2);
}

.btn-refresh-soft {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1.5px solid #EFE4D6;
  color: #5A2E17;
  padding: 9px 16px;
  border-radius: 18px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-refresh-soft:hover {
  background: #FAF3E8;
  border-color: #D97706;
  transform: translateY(-1px);
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Header Right Cocoa & Chocolate Decorative Graphic */
.header-cocoa-decor {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.85;
}

.botanical-leaves-bg {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

.chocolate-pieces-art {
  position: absolute;
  right: 15px;
  top: 10px;
  width: 140px;
  height: 100px;
}

.choc-svg {
  width: 100%;
  height: 100%;
}

/* ========================================================================= */
/* 4 KPI CARDS GRID                                                          */
/* ========================================================================= */
.kpi-cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

/* ========================================================================= */
/* CHARTS ROW (Revenue + Member Donut)                                       */
/* ========================================================================= */
.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-card {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
  flex-wrap: wrap;
}

.chart-title {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.chart-title-with-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.peak-hour-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 10px;
}

.chip-dot {
  width: 5px;
  height: 5px;
  background: #D97706;
  border-radius: 50%;
}

.chart-subtitle {
  font-size: 12px;
  color: #7A5034;
  margin-top: 2px;
}

.chart-header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chart-legend-pills {
  display: flex;
  gap: 8px;
}

.legend-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #5A2E17;
  background: #FAF3E8;
  padding: 3px 8px;
  border-radius: 10px;
}

.legend-color-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.color-gtv { background: #D97706; }
.color-tickets { background: #3D2214; }

.chart-type-toggle-pill {
  display: flex;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 12px;
  padding: 2px;
}

.type-btn {
  background: transparent;
  border: none;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  color: #7A5034;
  cursor: pointer;
}

.type-btn.active {
  background: #3D2214;
  color: #FAF5EE;
}

.chart-canvas-container {
  height: 240px;
  width: 100%;
  position: relative;
  margin: 10px 0;
}

.chart-insight-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 14px;
  padding: 10px 14px;
  margin-top: 10px;
}

.insight-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.insight-label {
  font-size: 9.5px;
  font-weight: 700;
  color: #8C6D58;
  text-transform: uppercase;
}

.insight-val {
  font-size: 12px;
  font-weight: 800;
}

.text-amber { color: #B45309; }
.text-cocoa { color: #3D2214; }
.text-green { color: #047857; }

/* Donut Chart & CRM Breakdown */
.crm-total-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FAF3E8;
  border: 1px solid #EADBCC;
  padding: 3px 10px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 800;
  color: #3D2214;
}

.pulse-crm-dot {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
}

.donut-canvas-container {
  height: 160px;
  width: 100%;
  position: relative;
  margin: 6px 0;
}

.segment-breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.segment-row-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.seg-row-header {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
}

.seg-badge-left {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #2C1A13;
}

.seg-dot-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.seg-numbers-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.seg-count-num {
  font-weight: 800;
  color: #2C1A13;
}

.seg-pct-tag {
  font-weight: 800;
  font-size: 11px;
}

.seg-track-bg {
  width: 100%;
  height: 6px;
  background: #EDE2D4;
  border-radius: 10px;
  overflow: hidden;
}

.seg-track-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.4s ease;
}

.crm-card-footer {
  margin-top: 14px;
  text-align: center;
}

.btn-crm-link {
  font-size: 11.5px;
  font-weight: 800;
  color: #B45309;
  text-decoration: none;
  transition: color 0.2s ease;
}

.btn-crm-link:hover {
  color: #2C1A13;
  text-decoration: underline;
}

/* ========================================================================= */
/* BREAKDOWN GRID (Ticket Table + Demographics)                              */
/* ========================================================================= */
.breakdown-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.demographic-card {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.card-title {
  font-family: 'Cinzel', serif;
  font-size: 15.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.card-subtitle {
  font-size: 11.5px;
  color: #7A5034;
}

.badge-filter {
  font-size: 10.5px;
  font-weight: 800;
  background: #FAF3E8;
  color: #7A5034;
  padding: 3px 8px;
  border-radius: 10px;
  border: 1px solid #EADBCC;
}

.demographic-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.city-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.city-header-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.city-rank-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rank-badge {
  width: 18px;
  height: 18px;
  background: #FAF3E8;
  color: #3D2214;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-name {
  font-weight: 700;
  color: #2C1A13;
}

.local-pill {
  font-size: 9px;
  font-weight: 800;
  background: #D1FAE5;
  color: #065F46;
  padding: 1px 6px;
  border-radius: 8px;
}

.city-stat {
  display: flex;
  align-items: center;
  gap: 4px;
}

.city-count {
  font-weight: 800;
  color: #2C1A13;
}

.city-percentage {
  font-size: 11px;
  color: #7A5034;
}

.city-bar-track {
  width: 100%;
  height: 6px;
  background: #EDE2D4;
  border-radius: 10px;
  overflow: hidden;
}

.city-bar-fill {
  height: 100%;
  border-radius: 10px;
}

.demographic-footer {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid #F0E5D8;
}

.demographic-insight {
  font-size: 11.5px;
  color: #6E442B;
  margin: 0;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* ========================================================================= */
/* OPERATIONS GRID (Payment Methods + Shift Card)                            */
/* ========================================================================= */
.operations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.payment-card {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
}

.badge-total {
  font-size: 12px;
  font-weight: 800;
  background: #FAF3E8;
  color: #B45309;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #EADBCC;
}

.payment-methods-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 14px;
  padding: 10px 14px;
}

.payment-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.payment-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-svg {
  width: 18px;
  height: 18px;
}

.pay-title {
  font-size: 12.5px;
  font-weight: 800;
  color: #2C1A13;
}

.pay-tx-count {
  font-size: 11px;
  color: #7A5034;
}

.pay-amount {
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
}

.pay-status {
  font-size: 10.5px;
  font-weight: 700;
}

/* ========================================================================= */
/* BOTTOM SAFETY BANNER (Heritage Manor Gazebo Line Art)                     */
/* ========================================================================= */
.safety-banner-reference {
  background: #FAF3E8;
  border: 1.5px solid #EADBCC;
  border-radius: 22px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(61, 34, 20, 0.03);
}

.safety-banner-left {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 680px;
  position: relative;
  z-index: 2;
}

.safety-emblem-circle {
  width: 48px;
  height: 48px;
  background: #3D2214;
  color: #FAF5EE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(61, 34, 20, 0.15);
}

.leaf-icon {
  color: #F59E0B;
}

.safety-title {
  font-family: 'Cinzel', serif;
  font-size: 15.5px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0 0 2px 0;
}

.safety-desc {
  font-size: 12px;
  color: #6E442B;
  margin: 0;
  line-height: 1.45;
}

.safety-banner-right-art {
  width: 240px;
  height: 70px;
  position: relative;
  z-index: 1;
}

.plantation-gazebo-svg {
  width: 100%;
  height: 100%;
}

/* ========================================================================= */
/* MODAL STYLING                                                             */
/* ========================================================================= */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(36, 20, 13, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: #FFFDF9;
  border: 2px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  padding: 22px 24px;
  box-shadow: 0 20px 50px rgba(44, 26, 19, 0.35);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #EFE4D6;
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.modal-header h3 {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 22px;
  color: #8C6D58;
  cursor: pointer;
}

.modal-body {
  font-size: 13px;
  color: #2C1A13;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.alert-info {
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 11.5px;
  color: #7A5034;
  margin-top: 8px;
}

.modal-footer {
  margin-top: 18px;
  text-align: right;
}

.btn-secondary {
  background: #FAF3E8;
  border: 1.5px solid #C4AA8F;
  color: #5A3A28;
  padding: 6px 16px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
}

/* ========================================================================= */
/* RESPONSIVE (< 1024px & < 768px)                                           */
/* ========================================================================= */
@media (max-width: 1024px) {
  .charts-row, .breakdown-grid, .operations-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-cocoa-decor {
    display: none;
  }
  .safety-banner-reference {
    flex-direction: column;
    align-items: flex-start;
  }
  .safety-banner-right-art {
    display: none;
  }
}
</style>
