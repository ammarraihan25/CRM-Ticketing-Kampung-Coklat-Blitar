<template>
  <div class="dashboard-container">
    <!-- Header Section (Unified with Reports Header Architecture) -->
    <header class="dashboard-header">
      <div class="header-left">
        <div class="header-badge-row">
          <div class="brand-mini-chip">
            <img :src="logoImg" alt="Kampung Coklat" class="mini-chip-img" />
            <span>Kampung Coklat Blitar</span>
          </div>
          <div class="badge-tag">
            <span class="live-dot"></span>
            <span>Sistem Operasional Real-Time</span>
          </div>
        </div>
        <h1 class="page-title">Dashboard Overview &amp; Finansial</h1>
        <p class="page-subtitle">
          Ringkasan eksekutif penjualan tiket, kinerja kasir POS, omzet GTV, dan segmentasi CRM Kampung Coklat.
        </p>
      </div>

      <!-- Header Actions (Period Filter + Action Buttons) -->
      <div class="header-actions">
        <!-- Segmented Period Filter Pill -->
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
          class="btn-secondary"
          title="Muat Ulang Data"
          :disabled="isLoading"
          @click="refreshData"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" :class="{ 'spin-anim': isLoading }">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>Refresh Data</span>
        </button>
      </div>
    </header>

    <!-- 3. 4 KPI Cards Grid (GTV, Tiket Terjual, Pengunjung Gate In, Member Baru) -->
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
        subtitle="Gross Transaction Value kotor"
      />

      <!-- 2. Total Tiket Terjual -->
      <KpiCard
        title="TOTAL TIKET TERJUAL"
        :value="`${currentMetrics.totalTickets.toLocaleString('id-ID')} Tiket`"
        theme="black"
        icon="ticket"
        trend-value="+15.0%"
        :comparison="currentMetrics.ticketsComparison"
        subtitle="Reguler, Rombongan & Paket"
      />

      <!-- 3. Total Pengunjung (Gate In) -->
      <KpiCard
        title="TOTAL PENGUNJUNG (GATE IN)"
        :value="`${currentMetrics.totalVisitors.toLocaleString('id-ID')} Pax`"
        theme="brown"
        icon="users"
        trend-value="+12.8%"
        :comparison="currentMetrics.visitorsComparison"
        subtitle="Scan barcode valid di turnstile"
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
        subtitle="Dari Guestbook PP & Kasir PR"
      />
    </section>

    <!-- 2. Charts Section: GTV Trend & Member Segmentation (Revamped Luxury Widgets) -->
    <section class="charts-row">
      <!-- GTV & Revenue Trend Chart (Line / Bar) -->
      <div class="chart-card main-chart-elevated">
        <div class="chart-top-accent"></div>
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
        <div class="chart-top-accent"></div>
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

    <!-- 3. Tables & Secondary Analytics Grid -->
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
              <h3 class="card-title">Demografi Asal Pengunjung (Domisili)</h3>
              <span class="card-subtitle">Top 5 Kota/Kabupaten asal member & tiket</span>
            </div>
            <span class="badge-filter">Data WA & POS</span>
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
              Sebanyak <strong>78%</strong> pengunjung berasal dari wilayah aglomerasi Blitar Raya & Kediri.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Payment Methods & Cashier Shift Overview -->
    <section class="operations-grid">
      <!-- Payment Methods Summary -->
      <div class="payment-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Ringkasan Metode Pembayaran</h3>
            <span class="card-subtitle">Volume & proporsi transaksi per kanal kasir</span>
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

// =========================================================================
// [API INTEGRATION POINT: DUMMY DATA STORE]
// Catatan: Ganti seluruh struktur data di bawah dengan pemanggilan API backend:
// contoh: const { data: dashboardData } = await useFetch('/api/v1/dashboard/summary', { query: { period: selectedPeriod.value } })
// =========================================================================

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
    totalTickets: 15680,
    ticketsComparison: 'vs minggu lalu (14.200 tiket)',
    ticketsGrowth: '+10.4%',
    totalVisitors: 14920,
    visitorsComparison: '95% tingkat kedatangan',
    visitorsGrowth: '+8.9%',
    totalMembers: 14820,
    membersComparison: 'Total member tercatat',
    membersGrowth: '+7.4%',
    newMembers: 1420,
    newMembersComparison: '890 Pengajian + 530 Reguler',
    newMembersGrowth: '+18.5%'
  },
  month: {
    totalGtv: 1280000000,
    gtvComparison: 'vs bulan lalu (Rp 1.150.000.000)',
    gtvGrowth: '+11.3%',
    totalTickets: 64200,
    ticketsComparison: 'vs bulan lalu (58.400 tiket)',
    ticketsGrowth: '+9.9%',
    totalVisitors: 61800,
    visitorsComparison: 'Rata-rata 2.060 pax/hari',
    visitorsGrowth: '+10.2%',
    totalMembers: 14820,
    membersComparison: 'Basis data CRM tersentralisasi',
    membersGrowth: '+12.6%',
    newMembers: 4850,
    newMembersComparison: '3.120 Pengajian + 1.730 POS',
    newMembersGrowth: '+24.8%'
  }
}

const currentMetrics = computed(() => mockMetrics[selectedPeriod.value])

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: TICKET BREAKDOWN DATA]
// -------------------------------------------------------------------------
const mockTicketBreakdowns: Record<PeriodType, TicketCategoryItem[]> = {
  today: [
    {
      id: 'reguler',
      name: 'Tiket Masuk Reguler',
      description: 'Akses kawasan wisata + edukasi coklat',
      price: 20000,
      qty: 1420,
      totalGtv: 28400000,
      percentage: 58,
      color: '#2C1A13'
    },
    {
      id: 'terusan',
      name: 'Tiket Terusan Wahana',
      description: 'Termasuk cooking class coklat & perahu',
      price: 35000,
      qty: 480,
      totalGtv: 16800000,
      percentage: 34,
      color: '#F29727'
    },
    {
      id: 'rombongan',
      name: 'Tiket Rombongan (B2B)',
      description: 'Minimal 30 pax (Agen Tour / Instansi)',
      price: 18000,
      qty: 350,
      totalGtv: 6300000,
      percentage: 13,
      color: '#5A4034'
    },
    {
      id: 'edukasi',
      name: 'Paket Edukasi Sekolah',
      description: 'Materi pembibitan kakao + praktek',
      price: 50000,
      qty: 200,
      totalGtv: 10000000,
      percentage: 20,
      color: '#10B981'
    }
  ],
  week: [
    {
      id: 'reguler',
      name: 'Tiket Masuk Reguler',
      description: 'Akses kawasan wisata + edukasi coklat',
      price: 20000,
      qty: 9200,
      totalGtv: 184000000,
      percentage: 59,
      color: '#2C1A13'
    },
    {
      id: 'terusan',
      name: 'Tiket Terusan Wahana',
      description: 'Termasuk cooking class coklat & perahu',
      price: 35000,
      qty: 3100,
      totalGtv: 108500000,
      percentage: 35,
      color: '#F29727'
    },
    {
      id: 'rombongan',
      name: 'Tiket Rombongan (B2B)',
      description: 'Minimal 30 pax (Agen Tour / Instansi)',
      price: 18000,
      qty: 2380,
      totalGtv: 42840000,
      percentage: 14,
      color: '#5A4034'
    },
    {
      id: 'edukasi',
      name: 'Paket Edukasi Sekolah',
      description: 'Materi pembibitan kakao + praktek',
      price: 50000,
      qty: 1000,
      totalGtv: 50000000,
      percentage: 16,
      color: '#10B981'
    }
  ],
  month: [
    {
      id: 'reguler',
      name: 'Tiket Masuk Reguler',
      description: 'Akses kawasan wisata + edukasi coklat',
      price: 20000,
      qty: 37500,
      totalGtv: 750000000,
      percentage: 58,
      color: '#2C1A13'
    },
    {
      id: 'terusan',
      name: 'Tiket Terusan Wahana',
      description: 'Termasuk cooking class coklat & perahu',
      price: 35000,
      qty: 13200,
      totalGtv: 462000000,
      percentage: 36,
      color: '#F29727'
    },
    {
      id: 'rombongan',
      name: 'Tiket Rombongan (B2B)',
      description: 'Minimal 30 pax (Agen Tour / Instansi)',
      price: 18000,
      qty: 9500,
      totalGtv: 171000000,
      percentage: 13,
      color: '#5A4034'
    },
    {
      id: 'edukasi',
      name: 'Paket Edukasi Sekolah',
      description: 'Materi pembibitan kakao + praktek',
      price: 50000,
      qty: 4000,
      totalGtv: 200000000,
      percentage: 15,
      color: '#10B981'
    }
  ]
}

const currentTicketBreakdown = computed(() => mockTicketBreakdowns[selectedPeriod.value])

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: MEMBER SEGMENTATION (PR vs PP vs PT)]
// -------------------------------------------------------------------------
interface MemberSegment {
  code: 'PR' | 'PP' | 'PT'
  title: string
  description: string
  count: number
  percentage: number
  color: string
}

const memberSegments = ref<MemberSegment[]>([
  {
    code: 'PR',
    title: 'Pengunjung Reguler',
    description: 'Wisatawan keluarga & perorangan (POS Walk-in)',
    count: 7706,
    percentage: 52,
    color: '#2C1A13' // Cocoa Brown
  },
  {
    code: 'PP',
    title: 'Pengunjung Pengajian',
    description: 'Jamaah majlis taklim & digital guestbook WA',
    count: 4891,
    percentage: 33,
    color: '#F29727' // Amber Gold
  },
  {
    code: 'PT',
    title: 'Pengunjung Tour / B2B',
    description: 'Rombongan bus travel agent & sekolah',
    count: 2223,
    percentage: 15,
    color: '#5A4034' // Warm Medium Brown
  }
])

const memberSegmentTotal = computed(() => {
  return memberSegments.value.reduce((acc, item) => acc + item.count, 0)
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: DEMOGRAPHICS / TOP 5 DOMISILI]
// -------------------------------------------------------------------------
interface DemographicItem {
  name: string
  visitors: number
  percentage: number
  isLocal: boolean
  color: string
}

const mockDemographics: Record<PeriodType, DemographicItem[]> = {
  today: [
    { name: 'Kab. Blitar', visitors: 980, percentage: 40, isLocal: true, color: '#2C1A13' },
    { name: 'Kota Blitar', visitors: 540, percentage: 22, isLocal: true, color: '#5A4034' },
    { name: 'Kab. Kediri', visitors: 390, percentage: 16, isLocal: false, color: '#F29727' },
    { name: 'Kab. Tulungagung', visitors: 270, percentage: 11, isLocal: false, color: '#FFB04D' },
    { name: 'Kota/Kab. Malang', visitors: 170, percentage: 7, isLocal: false, color: '#C9B3A8' },
    { name: 'Lainnya (Surabaya, Nganjuk, dll)', visitors: 100, percentage: 4, isLocal: false, color: '#9CA3AF' }
  ],
  week: [
    { name: 'Kab. Blitar', visitors: 6200, percentage: 39, isLocal: true, color: '#2C1A13' },
    { name: 'Kota Blitar', visitors: 3500, percentage: 22, isLocal: true, color: '#5A4034' },
    { name: 'Kab. Kediri', visitors: 2650, percentage: 17, isLocal: false, color: '#F29727' },
    { name: 'Kab. Tulungagung', visitors: 1750, percentage: 11, isLocal: false, color: '#FFB04D' },
    { name: 'Kota/Kab. Malang', visitors: 1100, percentage: 7, isLocal: false, color: '#C9B3A8' },
    { name: 'Lainnya (Surabaya, Trenggalek)', visitors: 620, percentage: 4, isLocal: false, color: '#9CA3AF' }
  ],
  month: [
    { name: 'Kab. Blitar', visitors: 24500, percentage: 38, isLocal: true, color: '#2C1A13' },
    { name: 'Kota Blitar', visitors: 14200, percentage: 22, isLocal: true, color: '#5A4034' },
    { name: 'Kab. Kediri', visitors: 10900, percentage: 17, isLocal: false, color: '#F29727' },
    { name: 'Kab. Tulungagung', visitors: 7100, percentage: 11, isLocal: false, color: '#FFB04D' },
    { name: 'Kota/Kab. Malang', visitors: 4500, percentage: 7, isLocal: false, color: '#C9B3A8' },
    { name: 'Lainnya (Jawa Timur & Nasional)', visitors: 3000, percentage: 5, isLocal: false, color: '#9CA3AF' }
  ]
}

const currentDemographics = computed(() => mockDemographics[selectedPeriod.value])

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: PAYMENT METHOD BREAKDOWN]
// -------------------------------------------------------------------------
interface PaymentMethodItem {
  id: string
  name: string
  amount: number
  transactions: number
  percentage: number
  status: 'Settled' | 'Pending'
  color: string
  bgLight: string
}

const mockPaymentMethods: Record<PeriodType, PaymentMethodItem[]> = {
  today: [
    {
      id: 'qris',
      name: 'QRIS Dynamic (Midtrans / BRI)',
      amount: 23400000,
      transactions: 1180,
      percentage: 48,
      status: 'Settled',
      color: '#059669',
      bgLight: '#ECFDF5'
    },
    {
      id: 'cash',
      name: 'Cash / Tunai Kasir POS',
      amount: 17550000,
      transactions: 890,
      percentage: 36,
      status: 'Settled',
      color: '#D97706',
      bgLight: '#FFFBEB'
    },
    {
      id: 'debit',
      name: 'EDC Debit BCA / Mandiri',
      amount: 5850000,
      transactions: 280,
      percentage: 12,
      status: 'Settled',
      color: '#2563EB',
      bgLight: '#EFF6FF'
    },
    {
      id: 'transfer',
      name: 'Transfer Bank (Invoice B2B)',
      amount: 1950000,
      transactions: 100,
      percentage: 4,
      status: 'Settled',
      color: '#7C3AED',
      bgLight: '#F5F3FF'
    }
  ],
  week: [
    {
      id: 'qris',
      name: 'QRIS Dynamic (Midtrans / BRI)',
      amount: 153125000,
      transactions: 7680,
      percentage: 49,
      status: 'Settled',
      color: '#059669',
      bgLight: '#ECFDF5'
    },
    {
      id: 'cash',
      name: 'Cash / Tunai Kasir POS',
      amount: 109375000,
      transactions: 5490,
      percentage: 35,
      status: 'Settled',
      color: '#D97706',
      bgLight: '#FFFBEB'
    },
    {
      id: 'debit',
      name: 'EDC Debit BCA / Mandiri',
      amount: 37500000,
      transactions: 1880,
      percentage: 12,
      status: 'Settled',
      color: '#2563EB',
      bgLight: '#EFF6FF'
    },
    {
      id: 'transfer',
      name: 'Transfer Bank (Invoice B2B)',
      amount: 12500000,
      transactions: 630,
      percentage: 4,
      status: 'Settled',
      color: '#7C3AED',
      bgLight: '#F5F3FF'
    }
  ],
  month: [
    {
      id: 'qris',
      name: 'QRIS Dynamic (Midtrans / BRI)',
      amount: 627200000,
      transactions: 31450,
      percentage: 49,
      status: 'Settled',
      color: '#059669',
      bgLight: '#ECFDF5'
    },
    {
      id: 'cash',
      name: 'Cash / Tunai Kasir POS',
      amount: 448000000,
      transactions: 22470,
      percentage: 35,
      status: 'Settled',
      color: '#D97706',
      bgLight: '#FFFBEB'
    },
    {
      id: 'debit',
      name: 'EDC Debit BCA / Mandiri',
      amount: 153600000,
      transactions: 7700,
      percentage: 12,
      status: 'Settled',
      color: '#2563EB',
      bgLight: '#EFF6FF'
    },
    {
      id: 'transfer',
      name: 'Transfer Bank (Invoice B2B)',
      amount: 51200000,
      transactions: 2580,
      percentage: 4,
      status: 'Settled',
      color: '#7C3AED',
      bgLight: '#F5F3FF'
    }
  ]
}

const currentPaymentMethods = computed(() => mockPaymentMethods[selectedPeriod.value])

const totalPaymentAmount = computed(() => {
  return currentPaymentMethods.value.reduce((acc, pay) => acc + pay.amount, 0)
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: CASHIER SHIFT SUMMARY DATA]
// -------------------------------------------------------------------------
const currentShiftData = ref<ShiftInfo>({
  id: 'SHIFT-20260819-01',
  shiftName: 'Shift 1 (Pagi)',
  terminalName: 'POS Terminal 01 (Main Gate)',
  cashierName: 'Siti Rahmawati',
  cashierId: 'KASIR-04',
  date: '19 Agustus 2026',
  startTime: '08:00',
  endTime: '15:00',
  totalTransactions: 384,
  totalTicketsSold: 742,
  cashReceived: 8240000,
  nonCashReceived: 10420000,
  reconciliationStatus: 'balanced',
  statusLabel: 'Shift Berjalan (Aktif)',
  reconciliationNotes: 'Seluruh pencatatan fisik sesuai dengan struk register mesin kasir.',
  variance: 0,
  isClosed: false
})

// =========================================================================
// CHART.JS INSTANCES & RENDERING
// =========================================================================
const revenueChartCanvas = ref<HTMLCanvasElement | null>(null)
const memberChartCanvas = ref<HTMLCanvasElement | null>(null)

let revenueChartInstance: Chart | null = null
let memberChartInstance: Chart | null = null

// Chart Data Configuration based on period
const getChartLabels = (period: PeriodType) => {
  if (period === 'today') {
    return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  } else if (period === 'week') {
    return ['Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu (Hari Ini)']
  } else {
    return ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
  }
}

const getChartGtvData = (period: PeriodType) => {
  if (period === 'today') {
    return [2400000, 4100000, 7800000, 8900000, 5200000, 6800000, 7200000, 4100000, 1850000, 400000]
  } else if (period === 'week') {
    return [32000000, 36500000, 68000000, 74500000, 28000000, 24750000, 48750000]
  } else {
    return [280000000, 340000000, 375000000, 285000000]
  }
}

const getChartTicketsData = (period: PeriodType) => {
  if (period === 'today') {
    return [120, 205, 390, 445, 260, 340, 360, 205, 95, 30]
  } else if (period === 'week') {
    return [1600, 1825, 3400, 3725, 1400, 1280, 2450]
  } else {
    return [14000, 17000, 18800, 14400]
  }
}

const initRevenueChart = () => {
  if (!revenueChartCanvas.value) return
  if (revenueChartInstance) revenueChartInstance.destroy()

  const labels = getChartLabels(selectedPeriod.value)
  const gtvData = getChartGtvData(selectedPeriod.value)
  const ticketsData = getChartTicketsData(selectedPeriod.value)

  revenueChartInstance = new Chart(revenueChartCanvas.value, {
    type: chartType.value,
    data: {
      labels,
      datasets: [
        {
          label: 'Pendapatan GTV (Rp)',
          data: gtvData,
          borderColor: '#F29727',
          backgroundColor: chartType.value === 'line' ? 'rgba(242, 151, 39, 0.12)' : 'rgba(242, 151, 39, 0.85)',
          borderWidth: 2.5,
          tension: 0.35,
          fill: chartType.value === 'line',
          yAxisID: 'yGtv',
          borderRadius: chartType.value === 'bar' ? 4 : 0
        },
        {
          label: 'Tiket Terjual (Pax)',
          data: ticketsData,
          borderColor: '#2C1A13',
          backgroundColor: chartType.value === 'line' ? 'rgba(44, 26, 19, 0.05)' : 'rgba(44, 26, 19, 0.75)',
          borderWidth: 2,
          borderDash: chartType.value === 'line' ? [4, 4] : undefined,
          tension: 0.35,
          fill: false,
          yAxisID: 'yTickets',
          borderRadius: chartType.value === 'bar' ? 4 : 0
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
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#2C1A13',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFDF9',
          padding: 10,
          borderColor: '#F29727',
          borderWidth: 1,
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) {
                return ` Pendapatan: ${formatRupiah(ctx.parsed.y as number)}`
              }
              return ` Tiket: ${(ctx.parsed.y as number).toLocaleString('id-ID')} Pax`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.04)'
          },
          ticks: {
            font: { family: 'Jost', size: 12 },
            color: '#6B5A52'
          }
        },
        yGtv: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: 'rgba(0, 0, 0, 0.06)'
          },
          ticks: {
            font: { family: 'Jost', size: 11 },
            color: '#6B5A52',
            callback: (val) => {
              const num = val as number
              if (num >= 1000000000) return `Rp ${(num / 1000000000).toFixed(1)} M`
              if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(0)} Jt`
              if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)} Rb`
              return `Rp ${num}`
            }
          }
        },
        yTickets: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            font: { family: 'Jost', size: 11 },
            color: '#6B5A52',
            callback: (val) => `${val} pax`
          }
        }
      }
    }
  })
}

const initMemberDonutChart = () => {
  if (!memberChartCanvas.value) return
  if (memberChartInstance) memberChartInstance.destroy()

  const labels = memberSegments.value.map(s => `${s.code} (${s.title})`)
  const data = memberSegments.value.map(s => s.count)
  const bgColors = memberSegments.value.map(s => s.color)

  memberChartInstance = new Chart(memberChartCanvas.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: bgColors,
          borderWidth: 3,
          borderColor: '#FFFFFF',
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#2C1A13',
          padding: 10,
          callbacks: {
            label: (ctx) => {
              const val = ctx.parsed as number
              const total = memberSegmentTotal.value
              const pct = ((val / total) * 100).toFixed(1)
              return ` ${ctx.label}: ${val.toLocaleString('id-ID')} member (${pct}%)`
            }
          }
        }
      }
    }
  })
}

const setChartType = (type: 'line' | 'bar') => {
  chartType.value = type
  initRevenueChart()
}

const changePeriod = (period: PeriodType) => {
  selectedPeriod.value = period
  refreshCharts()
}

const refreshCharts = () => {
  nextTick(() => {
    initRevenueChart()
  })
}

const refreshData = () => {
  isLoading.value = true
  // Simulating API fetch delay
  setTimeout(() => {
    isLoading.value = false
    refreshCharts()
  }, 500)
}

const exportReport = () => {
  alert(`[EXPORT MODUL] Mengunduh ringkasan laporan periode: ${selectedPeriod.value.toUpperCase()} (Format PDF/Excel siap dicetak)`)
}

const handleViewShiftLog = (shift: ShiftInfo) => {
  showShiftModal.value = true
}

const handleCloseShift = (shift: ShiftInfo) => {
  if (confirm(`Konfirmasi penutupan kasir ${shift.shiftName}? Sistem akan membekukan register transaksi kasir.`)) {
    shift.isClosed = true
    shift.statusLabel = 'Shift Selesai (Closed)'
    alert('Shift kasir berhasil ditutup dan direkonsiliasi.')
  }
}

const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}

onMounted(() => {
  initRevenueChart()
  initMemberDonutChart()
})

watch(selectedPeriod, () => {
  refreshCharts()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1440px;
  margin: 0 auto;
  font-family: 'Jost', sans-serif;
}

/* Header (Matching Reports Header Architecture) */
.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1px solid rgba(242, 151, 39, 0.3);
  border-radius: 20px;
  padding: 2px 10px 2px 4px;
  font-size: 11.5px;
  font-weight: 700;
  color: #2C1A13;
  box-shadow: 0 1px 4px rgba(44, 26, 19, 0.04);
}

.mini-chip-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 50%;
  background: #FFF;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(242, 151, 39, 0.15);
  color: #B45309;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background-color: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
  animation: pulse-green 1.5s infinite;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.4px;
}

.page-subtitle {
  font-size: 13px;
  color: #6B5A52;
  margin: 0;
  line-height: 1.4;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Period Segmented Pill */
.period-segmented-pill {
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 3px 4px 3px 10px;
  gap: 6px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
  height: 40px;
}

.period-label-text {
  font-size: 12px;
  color: #6B5A52;
  font-weight: 600;
}

.seg-btn-group {
  display: inline-flex;
  gap: 2px;
}

.seg-pill-btn {
  border: none;
  background: transparent;
  padding: 6px 11px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #6B5A52;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
}

.seg-pill-btn:hover {
  color: #2C1A13;
  background: #F9FAFB;
}

.seg-pill-btn.active {
  background: #2C1A13;
  color: #FFFFFF;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.2);
}

/* 3. 5 KPI Cards Grid */
.kpi-cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 4px;
}

@media (max-width: 1200px) {
  .kpi-cards-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .kpi-cards-grid-4 {
    grid-template-columns: 1fr;
  }
  .main-heading { font-size: 26px; }
}

.period-btn {
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  background: transparent;
  color: var(--color-muted, #6b5a52);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn:hover {
  background-color: #f3f4f6;
  color: var(--color-primary, #2c1a13);
}

.period-btn.active {
  background-color: var(--color-primary, #2c1a13);
  color: var(--color-neutral, #ffffff);
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon {
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  font-size: 13px;
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 20px;
}

.chart-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(235, 230, 224, 0.9);
  border-radius: 18px;
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 20px -2px rgba(44, 26, 19, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.chart-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px -4px rgba(44, 26, 19, 0.09);
  border-color: rgba(242, 151, 39, 0.4);
}

.chart-top-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #F29727 0%, #D97706 50%, #2C1A13 100%);
}

.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.chart-title-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.chart-title-with-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.chart-title {
  font-size: 16.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.peak-hour-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FEF3C7;
  color: #B45309;
  border: 1px solid #FDE68A;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.chip-dot {
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
  box-shadow: 0 0 6px #F59E0B;
}

.chart-subtitle {
  font-size: 12px;
  color: #78655C;
}

.chart-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chart-legend-pills {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  background: #FAFAF9;
  color: #44403C;
}

.legend-color-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.color-gtv { background: #F29727; }
.color-tickets { background: #2C1A13; }

.chart-type-toggle-pill {
  display: inline-flex;
  background: #F5F3EF;
  padding: 3px;
  border-radius: 8px;
  gap: 2px;
  border: 1px solid #E6E1DA;
}

.type-btn {
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 700;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #78655C;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.type-btn.active {
  background: #2C1A13;
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.25);
}

.chart-canvas-container {
  position: relative;
  height: 270px;
  width: 100%;
}

/* 3-Column Key Operational Insights Strip */
.chart-insight-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1.5px dashed #EBE6E0;
}

.insight-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #FFFDF9;
  border: 1px solid #F2ECE4;
  border-radius: 10px;
  padding: 8px 6px;
}

.insight-label {
  font-size: 10px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 2px;
}

.insight-val {
  font-size: 12.5px;
  font-weight: 800;
}

.text-amber { color: #D97706; }
.text-cocoa { color: #2C1A13; }
.text-green { color: #059669; }

/* Donut Chart Widget Elevated */
.crm-total-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
}

.pulse-crm-dot {
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
  box-shadow: 0 0 6px #F59E0B;
  animation: pulse-green 1.5s infinite;
}

.donut-canvas-container {
  position: relative;
  height: 175px;
  width: 100%;
  margin: 6px 0 12px 0;
}

/* Donut Breakdown List with Progress Bars */
.segment-breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid #F3EFEA;
  padding-top: 14px;
}

.segment-row-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #FFFDFB;
  border: 1px solid #F3ECE4;
  border-radius: 8px;
  padding: 8px 10px;
  transition: all 0.2s ease;
}

.segment-row-box:hover {
  background: #FFFFFF;
  border-color: #F29727;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.05);
}

.seg-row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.seg-badge-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.seg-dot-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.seg-code-bold {
  font-size: 12px;
  color: #2C1A13;
}

.seg-numbers-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.seg-count-num {
  font-size: 12.5px;
  font-weight: 800;
  color: #1C0E08;
}

.seg-pct-tag {
  font-size: 11px;
  font-weight: 700;
}

.seg-track-bg {
  width: 100%;
  height: 5px;
  background: #EFE9E2;
  border-radius: 10px;
  overflow: hidden;
}

.seg-track-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.crm-card-footer {
  margin-top: 14px;
  border-top: 1px solid #F3EFEA;
  padding-top: 10px;
  text-align: center;
}

.btn-crm-link {
  font-size: 11.5px;
  font-weight: 700;
  color: #B45309;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.2s ease;
}

.btn-crm-link:hover {
  transform: translateX(4px);
  color: #D97706;
}

/* Breakdown Grid (Ticket table & Demographics) */
.breakdown-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 20px;
}

/* Demographic Card */
.demographic-card {
  background-color: var(--color-neutral, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--rounded-md, 8px);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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

.badge-filter {
  font-size: 11px;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 3px 8px;
  border-radius: 12px;
}

.demographic-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 14px;
}

.city-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.city-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.city-rank-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rank-badge {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.city-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary, #2c1a13);
}

.local-pill {
  font-size: 10px;
  font-weight: 600;
  background-color: rgba(242, 151, 39, 0.15);
  color: #b45309;
  padding: 1px 6px;
  border-radius: 10px;
}

.city-stat {
  font-size: 12.5px;
  color: var(--color-primary, #2c1a13);
}

.city-percentage {
  color: #9ca3af;
  margin-left: 3px;
  font-size: 11.5px;
}

.city-bar-track {
  height: 6px;
  background-color: #f1f1f1;
  border-radius: 6px;
  overflow: hidden;
}

.city-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.4s ease;
}

.demographic-footer {
  border-top: 1px dashed var(--color-border, #e5e7eb);
  padding-top: 10px;
}

.demographic-insight {
  font-size: 12px;
  color: var(--color-muted, #6b5a52);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-inline {
  color: #F29727;
  flex-shrink: 0;
}

/* Operations Grid (Payment & Shift) */
.operations-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 20px;
}

.payment-card {
  background-color: var(--color-neutral, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--rounded-md, 8px);
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
}

.badge-total {
  font-size: 12px;
  font-weight: 700;
  background-color: rgba(44, 26, 19, 0.08);
  color: var(--color-primary, #2c1a13);
  padding: 4px 10px;
  border-radius: 6px;
}

.payment-methods-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.payment-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: #fcfbfa;
  border: 1px solid #f0eeea;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.payment-row:hover {
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.payment-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.payment-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-svg {
  width: 18px;
  height: 18px;
}

.pay-title {
  font-size: 13.5px;
  color: var(--color-primary, #2c1a13);
}

.pay-tx-count {
  font-size: 11.5px;
  color: var(--color-muted, #6b5a52);
}

.pay-amount {
  font-size: 14px;
  color: var(--color-primary, #2c1a13);
}

.pay-status {
  font-size: 11px;
  font-weight: 600;
}

.text-green { color: #059669; }
.text-amber { color: #d97706; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }

/* Modal Backdrop & Dialog */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(44, 26, 19, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-card {
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
}

.modal-header h3 {
  font-size: 16px;
  color: var(--color-primary, #2c1a13);
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  font-size: 13.5px;
  color: #374151;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.alert-info {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  margin-top: 6px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
}

/* =========================================================================
   RESPONSIVE DESIGN (Desktop -> Tablet -> Mobile)
   ========================================================================= */
@media (max-width: 1280px) {
  .kpi-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .charts-row,
  .breakdown-grid,
  .operations-grid {
    grid-template-columns: 1fr;
  }
  
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-right {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-card {
    justify-content: space-between;
  }

  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
