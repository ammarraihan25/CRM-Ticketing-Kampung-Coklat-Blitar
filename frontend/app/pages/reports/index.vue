<template>
  <div class="reports-container">
    <!-- Header Section -->
    <header class="reports-header">
      <div class="header-left">
        <h1 class="page-title">Reports & Data Analytics</h1>
        <p class="page-subtitle">
          Data historis transaksi, verifikasi tiket pintu, database CRM, dan demografi pengunjung Kampung Coklat.
        </p>
      </div>

      <!-- Cute & Aesthetic Export Actions -->
      <div class="header-actions">
        <button 
          type="button" 
          class="btn-export-cute btn-cute-excel"
          title="Unduh Lembar Kerja Excel"
          @click="openExportModal('excel')"
        >
          <span class="btn-cute-emoji">📊</span>
          <span class="btn-cute-text">Export Excel</span>
          <span class="btn-cute-tag">.xlsx</span>
        </button>

        <button 
          type="button" 
          class="btn-export-cute btn-cute-pdf"
          title="Unduh Dokumen Laporan PDF"
          @click="openExportModal('pdf')"
        >
          <span class="btn-cute-emoji">📄</span>
          <span class="btn-cute-text">Export PDF Laporan</span>
          <span class="sparkle-spark">✨</span>
        </button>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <div class="tabs-nav-bar">
      <button 
        v-for="tab in reportTabs" 
        :key="tab.id"
        type="button"
        class="tab-nav-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Filter Bar (Global for Reports) -->
    <div class="filter-toolbar">
      <div class="filter-left">
        <div class="filter-group">
          <label>Rentang Waktu:</label>
          <select v-model="selectedPeriod" class="filter-select" @change="handleFilterChange">
            <option value="today">Hari Ini (Real-Time)</option>
            <option value="this_week">Minggu Ini (7 Hari Terakhir)</option>
            <option value="this_month">Bulan Ini (Agustus 2026)</option>
            <option value="last_month">Bulan Lalu (Juli 2026)</option>
            <option value="custom">Kustom Rentang Tanggal</option>
          </select>
        </div>

        <div v-if="selectedPeriod === 'custom'" class="date-range-inputs">
          <input type="date" class="date-input" value="2026-08-01" />
          <span>s/d</span>
          <input type="date" class="date-input" value="2026-08-19" />
        </div>
      </div>

      <div class="filter-right">
        <span class="data-count-tag">
          Data Terupdate: <strong>19 Agustus 2026, 11:45 WIB</strong>
        </span>
      </div>
    </div>

    <!-- =================================================================== -->
    <!-- TAB 1: REVENUE REPORT (GTV Harian, Mingguan, Bulanan & Breakdown) -->
    <!-- =================================================================== -->
    <section v-if="activeTab === 'revenue'" class="tab-content">
      <!-- Revenue Summary KPI Row -->
      <div class="revenue-kpi-row">
        <div class="rev-kpi-card">
          <span class="rev-label">Total GTV (Omzet Kotor)</span>
          <div class="rev-val text-amber">{{ formatRupiah(revenueData.totalGtv) }}</div>
          <span class="rev-sub text-green">▲ +14.2% vs periode sebelumnya</span>
        </div>

        <div class="rev-kpi-card">
          <span class="rev-label">GTV Harian (Rata-rata)</span>
          <div class="rev-val">{{ formatRupiah(revenueData.dailyAverage) }}</div>
          <span class="rev-sub">Berdasarkan 30 hari kalender</span>
        </div>

        <div class="rev-kpi-card">
          <span class="rev-label">Total Transaksi POS</span>
          <div class="rev-val">{{ revenueData.totalTransactions.toLocaleString('id-ID') }} Struk</div>
          <span class="rev-sub">Rata-rata {{ formatRupiah(revenueData.avgBasketSize) }}/struk</span>
        </div>

        <div class="rev-kpi-card">
          <span class="rev-label">Total Diskon & Voucher</span>
          <div class="rev-val text-red">{{ formatRupiah(revenueData.totalDiscounts) }}</div>
          <span class="rev-sub">{{ revenueData.discountCount }} voucher diredeem</span>
        </div>
      </div>

      <!-- Chart: Revenue Distribution -->
      <div class="content-card">
        <div class="card-head">
          <div>
            <h3 class="card-title">Kurva Fluktuasi Pendapatan GTV</h3>
            <span class="card-subtitle">Historis akumulasi penjualan tiket dan paket edukasi</span>
          </div>
          <span class="badge-amber">Trend Analysis</span>
        </div>
        <div class="chart-box">
          <canvas ref="revenueReportChartCanvas"></canvas>
        </div>
      </div>

      <!-- Table: Revenue Breakdown by Ticket Category -->
      <div class="content-card">
        <div class="card-head">
          <h3 class="card-title">Breakdown Pendapatan per Kategori Tiket</h3>
        </div>
        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>Kategori Tiket</th>
                <th>Harga Satuan</th>
                <th class="text-right">Volume Tiket</th>
                <th class="text-right">Total GTV (Rp)</th>
                <th class="text-right">Total Diskon (Rp)</th>
                <th class="text-right">Pendapatan Bersih (Net)</th>
                <th class="text-right">Kontribusi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in revenueData.ticketBreakdown" :key="item.category">
                <td class="font-medium">{{ item.category }}</td>
                <td>{{ formatRupiah(item.price) }}</td>
                <td class="text-right font-medium">{{ item.qty.toLocaleString('id-ID') }}</td>
                <td class="text-right font-bold">{{ formatRupiah(item.gtv) }}</td>
                <td class="text-right text-red">-{{ formatRupiah(item.discounts) }}</td>
                <td class="text-right font-bold text-amber">{{ formatRupiah(item.net) }}</td>
                <td class="text-right">{{ item.share }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- TAB 2: TICKET REPORT (Active, Used, Expired, Free Ticket & Log) -->
    <!-- =================================================================== -->
    <section v-else-if="activeTab === 'tickets'" class="tab-content">
      <!-- Ticket Status Counters -->
      <div class="ticket-status-grid">
        <div class="ticket-stat-card border-all">
          <span class="t-stat-label">Total Diterbitkan</span>
          <span class="t-stat-val">{{ ticketReportData.totalIssued.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">100% dari transaksi POS</span>
        </div>

        <div class="ticket-stat-card border-green">
          <span class="t-stat-label">Sudah Digunakan (USED)</span>
          <span class="t-stat-val text-green">{{ ticketReportData.used.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Scan valid di pintu masuk</span>
        </div>

        <div class="ticket-stat-card border-blue">
          <span class="t-stat-label">Tiket Aktif (ACTIVE)</span>
          <span class="t-stat-val text-blue">{{ ticketReportData.active.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Belum scan di gate</span>
        </div>

        <div class="ticket-stat-card border-gray">
          <span class="t-stat-label">Kedaluwarsa (EXPIRED)</span>
          <span class="t-stat-val text-gray">{{ ticketReportData.expired.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Melewati jam operasional</span>
        </div>

        <div class="ticket-stat-card border-amber">
          <span class="t-stat-label">Free Promo / Voucher</span>
          <span class="t-stat-val text-amber">{{ ticketReportData.freeVoucher.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Klaim Pengajian (PP)</span>
        </div>
      </div>

      <!-- Ticket Transaction Table with Search -->
      <div class="content-card">
        <div class="card-head search-head">
          <div>
            <h3 class="card-title">Detail Log Tiket & Verifikasi Gate</h3>
            <span class="card-subtitle">Pencatatan real-time barcode tiket dan anti-passback rule</span>
          </div>

          <div class="search-input-box">
            <input 
              v-model="ticketSearchQuery" 
              type="text" 
              class="search-input" 
              placeholder="Cari No. WhatsApp / Kode Tiket..."
            />
          </div>
        </div>

        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>ID Tiket / QR</th>
                <th>No Invoice POS</th>
                <th>Pengunjung (No WA)</th>
                <th>Tipe Tiket</th>
                <th>Tipe Member</th>
                <th>Status Tiket</th>
                <th>Waktu Pembelian</th>
                <th>Waktu Scan Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTicketList" :key="t.id">
                <td class="font-mono">{{ t.ticketCode }}</td>
                <td>{{ t.invoiceNo }}</td>
                <td>
                  <strong>{{ t.buyerName }}</strong>
                  <div class="text-xs text-muted">{{ t.whatsapp }}</div>
                </td>
                <td>{{ t.ticketType }}</td>
                <td><span class="member-tag" :class="`tag-${t.memberType.toLowerCase()}`">{{ t.memberType }}</span></td>
                <td>
                  <span class="status-pill" :class="`pill-${t.status.toLowerCase()}`">
                    {{ t.status }}
                  </span>
                </td>
                <td>{{ t.issuedAt }}</td>
                <td>{{ t.scannedAt || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- TAB 3: MEMBER / CRM REPORT (PR vs PP vs PT, Domisili, Registration) -->
    <!-- =================================================================== -->
    <section v-else-if="activeTab === 'members'" class="tab-content">
      <!-- Member Overview Counters -->
      <div class="revenue-kpi-row">
        <div class="rev-kpi-card">
          <span class="rev-label">Total Database Member CRM</span>
          <div class="rev-val text-cocoa">{{ memberReportData.totalMembers.toLocaleString('id-ID') }} Kontak</div>
          <span class="rev-sub">Primary Key: No. WhatsApp</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Member Reguler (PR)</span>
          <div class="rev-val">{{ memberReportData.prCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">52% dari total basis data</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Jamaah Pengajian (PP)</span>
          <div class="rev-val text-amber">{{ memberReportData.ppCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">33% via Digital Guest Book</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Agen Tour / B2B (PT)</span>
          <div class="rev-val">{{ memberReportData.ptCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">15% kemitraan rombongan</span>
        </div>
      </div>

      <!-- Member CRM Table with Filter & Blast WA Action Placeholder -->
      <div class="content-card">
        <div class="card-head search-head">
          <div>
            <h3 class="card-title">Direktori Database Member Loyalitas CRM</h3>
            <span class="card-subtitle">Profil WhatsApp, asal kota domisili, dan riwayat kunjungan</span>
          </div>

          <div class="member-filter-row">
            <select v-model="memberSegmentFilter" class="filter-select">
              <option value="ALL">Semua Segmen (PR, PP, PT)</option>
              <option value="PR">PR - Pengunjung Reguler</option>
              <option value="PP">PP - Jamaah Pengajian</option>
              <option value="PT">PT - Pengunjung Tour B2B</option>
            </select>

            <button type="button" class="btn-primary btn-sm" @click="handleBlastWaPlaceholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-.6c-.2-.7-.5-1.4-1-2-1.5-1.8-3.9-2.4-6-1.5-1.8.8-3 2.5-3.1 4.4H6c-2.2 0-4 1.8-4 4 0 1.5.8 2.8 2 3.4" />
                <path d="m9 18 3 3 3-3" />
                <path d="M12 12v9" />
              </svg>
              <span>Blast WA Promo (UI Trigger)</span>
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>Nama Member</th>
                <th>Nomor WhatsApp (PK)</th>
                <th>Domisili (Kota/Kab)</th>
                <th>Tipe Member</th>
                <th>Total Kunjungan</th>
                <th>Tanggal Registrasi</th>
                <th>Status Voucher</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredMemberList" :key="m.whatsapp">
                <td class="font-medium">{{ m.name }}</td>
                <td class="font-mono text-cocoa font-bold">{{ m.whatsapp }}</td>
                <td>{{ m.domisili }}</td>
                <td><span class="member-tag" :class="`tag-${m.type.toLowerCase()}`">{{ m.type }}</span></td>
                <td>{{ m.visits }} Kali</td>
                <td>{{ m.registeredAt }}</td>
                <td>
                  <span v-if="m.hasActiveVoucher" class="badge-voucher">Voucher Aktif</span>
                  <span v-else class="text-xs text-muted">Tidak ada</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- TAB 4: DEMOGRAPHIC REPORT (Domisili, Ratio PR/PP/PT, Origin Map) -->
    <!-- =================================================================== -->
    <section v-else-if="activeTab === 'demographics'" class="tab-content">
      <div class="demo-grid-row">
        <!-- Donut Member Segment Proportion -->
        <div class="content-card">
          <div class="card-head">
            <div>
              <h3 class="card-title">Perbandingan Rasio PR vs PP vs PT</h3>
              <span class="card-subtitle">Komposisi basis data audiens Kampung Coklat</span>
            </div>
          </div>
          <div class="chart-box-donut">
            <canvas ref="demoSegmentChartCanvas"></canvas>
          </div>
        </div>

        <!-- Demographic Bar Ranking -->
        <div class="content-card">
          <div class="card-head">
            <div>
              <h3 class="card-title">Distribusi Domisili Pengunjung Terbanyak</h3>
              <span class="card-subtitle">Kota/Kabupaten asal pembeli tiket</span>
            </div>
          </div>
          <div class="chart-box-bar">
            <canvas ref="demoCityChartCanvas"></canvas>
          </div>
        </div>
      </div>

      <!-- Domisili Breakdown Table -->
      <div class="content-card">
        <div class="card-head">
          <h3 class="card-title">Tabel Akumulasi Pengunjung per Wilayah Domisili</h3>
        </div>
        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Wilayah Kota / Kabupaten</th>
                <th>Kategori Wilayah</th>
                <th class="text-right">Total Pengunjung</th>
                <th class="text-right">Total Transaksi GTV</th>
                <th class="text-right">Persentase</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(city, idx) in demographicTableData" :key="city.name">
                <td class="font-bold">#{{ idx + 1 }}</td>
                <td class="font-medium">{{ city.name }}</td>
                <td>
                  <span class="region-badge" :class="city.isLocal ? 'badge-local' : 'badge-intercity'">
                    {{ city.isLocal ? 'Lokal Blitar Raya' : 'Luar Kota / Antar-Kabupaten' }}
                  </span>
                </td>
                <td class="text-right font-medium">{{ city.visitors.toLocaleString('id-ID') }} Orang</td>
                <td class="text-right font-bold text-amber">{{ formatRupiah(city.gtv) }}</td>
                <td class="text-right font-bold">{{ city.percentage }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- =================================================================== -->
    <!-- EXPORT MODAL DIALOG (LUXURY GLASSMORPHISM POPUP) -->
    <!-- =================================================================== -->
    <div v-if="showExportModal" class="modal-backdrop" @click.self="showExportModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-head-title">
            <span class="modal-icon-badge">{{ exportFormat === 'pdf' ? '📄' : '📊' }}</span>
            <div>
              <h3>{{ exportFormat === 'pdf' ? 'Unduh Laporan Format PDF' : 'Unduh Rekap Laporan Excel (.xlsx)' }}</h3>
              <p class="modal-sub">Dokumen siap cetak dengan logo resmi & struktur data terekonsiliasi.</p>
            </div>
          </div>
          <button class="btn-close" @click="showExportModal = false">&times;</button>
        </div>

        <div class="modal-body">
          <div class="export-preview-box">
            <div class="preview-logo-box">
              <img :src="logoImg" alt="Kampung Coklat" class="preview-logo" />
            </div>
            <div class="preview-meta">
              <div class="doc-title text-cocoa">
                LAPORAN_{{ activeTab.toUpperCase() }}_{{ selectedPeriod.toUpperCase() }}_{{ new Date().toISOString().slice(0,10) }}
              </div>
              <div class="doc-sub">Kop Resmi: PT ABSYSTEM &bull; Wisata Edukasi Kampung Coklat Blitar</div>
              <span class="doc-tag">{{ exportFormat === 'pdf' ? 'Format: PDF Vector A4' : 'Format: Microsoft Excel Spreadsheet' }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>Cakupan Modul Laporan:</label>
            <select v-model="exportScope" class="filter-select full-width">
              <option value="current">Halaman Aktif ({{ reportTabs.find(t => t.id === activeTab)?.label }})</option>
              <option value="all">Seluruh Modul (Revenue + Tiket + CRM + Demografi)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Format & Legalitas Header Cetak:</label>
            <div class="checkbox-row">
              <input type="checkbox" checked disabled />
              <span>Sertakan Logo Resmi, QR Pengesahan, & Kop Surat Perusahaan</span>
            </div>
          </div>

          <div class="alert-info">
            File akan diunduh secara instan ke direktori browser Anda tanpa membebani server.
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secondary" @click="showExportModal = false">Batal</button>
          <button type="button" class="btn-primary" :disabled="isExporting" @click="handleExecuteExport">
            <span v-if="isExporting" class="spinner-inline"></span>
            <span>{{ isExporting ? 'Memproses Ekspor Dokumen...' : 'Unduh Dokumen Sekarang' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'admin'
})

Chart.register(...registerables)

type TabType = 'revenue' | 'tickets' | 'members' | 'demographics'

const activeTab = ref<TabType>('revenue')
const selectedPeriod = ref('this_month')
const showExportModal = ref(false)
const exportFormat = ref<'pdf' | 'excel'>('pdf')
const exportScope = ref('current')
const isExporting = ref(false)

const ticketSearchQuery = ref('')
const memberSegmentFilter = ref('ALL')

const reportTabs = [
  { id: 'revenue' as TabType, label: 'Revenue Report (GTV)', icon: '💰' },
  { id: 'tickets' as TabType, label: 'Ticket & Gate Report', icon: '🎟️' },
  { id: 'members' as TabType, label: 'Member / CRM Report', icon: '👥' },
  { id: 'demographics' as TabType, label: 'Demographic Report', icon: '📍' }
]

// =========================================================================
// [API INTEGRATION POINT: DUMMY REPORT DATASETS]
// =========================================================================

// 1. Revenue Report Data
const revenueData = ref({
  totalGtv: 1280000000,
  dailyAverage: 42666667,
  totalTransactions: 24500,
  avgBasketSize: 52245,
  totalDiscounts: 42500000,
  discountCount: 1850,
  ticketBreakdown: [
    { category: 'Tiket Masuk Reguler (Rp 20.000)', price: 20000, qty: 37500, gtv: 750000000, discounts: 22500000, net: 727500000, share: 58 },
    { category: 'Tiket Terusan Wahana (Rp 35.000)', price: 35000, qty: 13200, gtv: 462000000, discounts: 12000000, net: 450000000, share: 36 },
    { category: 'Tiket Rombongan B2B (Rp 18.000)', price: 18000, qty: 9500, gtv: 171000000, discounts: 8000000, net: 163000000, share: 13 },
    { category: 'Paket Edukasi Sekolah (Rp 50.000)', price: 50000, qty: 4000, gtv: 200000000, discounts: 0, net: 200000000, share: 15 }
  ]
})

// 2. Ticket Report Data
const ticketReportData = ref({
  totalIssued: 64200,
  used: 61800,
  active: 1850,
  expired: 550,
  freeVoucher: 3120,
  list: [
    { id: '1', ticketCode: 'TCK-20260819-0012', invoiceNo: 'INV-20260819-001', buyerName: 'Ahmad Fauzi', whatsapp: '081234567890', ticketType: 'Tiket Reguler', memberType: 'PR', status: 'USED', issuedAt: '19/08/2026 08:15', scannedAt: '19/08/2026 08:22' },
    { id: '2', ticketCode: 'TCK-20260819-0013', invoiceNo: 'INV-20260819-002', buyerName: 'Hj. Aminah (Jamaah)', whatsapp: '085678912345', ticketType: 'Tiket Reguler (Free Voucher)', memberType: 'PP', status: 'USED', issuedAt: '19/08/2026 08:30', scannedAt: '19/08/2026 08:45' },
    { id: '3', ticketCode: 'TCK-20260819-0014', invoiceNo: 'INV-20260819-003', buyerName: 'Budi Santoso', whatsapp: '082198765432', ticketType: 'Tiket Terusan', memberType: 'PR', status: 'ACTIVE', issuedAt: '19/08/2026 10:10', scannedAt: null },
    { id: '4', ticketCode: 'TCK-20260819-0015', invoiceNo: 'INV-20260819-004', buyerName: 'SMPN 1 Kediri (Tour)', whatsapp: '081345678901', ticketType: 'Paket Edukasi Sekolah', memberType: 'PT', status: 'USED', issuedAt: '19/08/2026 09:00', scannedAt: '19/08/2026 09:15' },
    { id: '5', ticketCode: 'TCK-20260819-0016', invoiceNo: 'INV-20260819-005', buyerName: 'Rina Wijaya', whatsapp: '087812345678', ticketType: 'Tiket Terusan', memberType: 'PR', status: 'USED', issuedAt: '19/08/2026 10:45', scannedAt: '19/08/2026 11:02' },
    { id: '6', ticketCode: 'TCK-20260819-0017', invoiceNo: 'INV-20260819-006', buyerName: 'Keluarga Sutrisno', whatsapp: '081298761234', ticketType: 'Tiket Reguler', memberType: 'PR', status: 'EXPIRED', issuedAt: '18/08/2026 16:30', scannedAt: null }
  ]
})

const filteredTicketList = computed(() => {
  if (!ticketSearchQuery.value.trim()) return ticketReportData.value.list
  const q = ticketSearchQuery.value.toLowerCase()
  return ticketReportData.value.list.filter(t => 
    t.ticketCode.toLowerCase().includes(q) || 
    t.buyerName.toLowerCase().includes(q) || 
    t.whatsapp.includes(q) ||
    t.invoiceNo.toLowerCase().includes(q)
  )
})

// 3. Member / CRM Report Data
const memberReportData = ref({
  totalMembers: 14820,
  prCount: 7706,
  ppCount: 4891,
  ptCount: 2223,
  list: [
    { name: 'Budi Santoso', whatsapp: '08123456789', domisili: 'Kota Blitar', type: 'PR', visits: 4, registeredAt: '12/05/2026', hasActiveVoucher: true },
    { name: 'Hj. Aminah (Jamaah Majlis)', whatsapp: '08567891234', domisili: 'Kab. Kediri', type: 'PP', visits: 7, registeredAt: '18/06/2026', hasActiveVoucher: true },
    { name: 'Agung Travel B2B', whatsapp: '08134567890', domisili: 'Kab. Tulungagung', type: 'PT', visits: 12, registeredAt: '01/04/2026', hasActiveVoucher: false },
    { name: 'Siti Maryam (Jamaah)', whatsapp: '08781234567', domisili: 'Kab. Blitar', type: 'PP', visits: 5, registeredAt: '22/07/2026', hasActiveVoucher: false },
    { name: 'Denny Prasetya', whatsapp: '08219876543', domisili: 'Kota Malang', type: 'PR', visits: 2, registeredAt: '05/08/2026', hasActiveVoucher: true },
    { name: 'Rombongan SD Insan Mulia', whatsapp: '08198765432', domisili: 'Kab. Nganjuk', type: 'PT', visits: 3, registeredAt: '10/08/2026', hasActiveVoucher: false }
  ]
})

const filteredMemberList = computed(() => {
  if (memberSegmentFilter.value === 'ALL') return memberReportData.value.list
  return memberReportData.value.list.filter(m => m.type === memberSegmentFilter.value)
})

// 4. Demographic Table Data
const demographicTableData = ref([
  { name: 'Kabupaten Blitar', visitors: 24500, gtv: 490000000, percentage: 38, isLocal: true },
  { name: 'Kota Blitar', visitors: 14200, gtv: 284000000, percentage: 22, isLocal: true },
  { name: 'Kabupaten Kediri', visitors: 10900, gtv: 218000000, percentage: 17, isLocal: false },
  { name: 'Kabupaten Tulungagung', visitors: 7100, gtv: 142000000, percentage: 11, isLocal: false },
  { name: 'Kota & Kab. Malang', visitors: 4500, gtv: 90000000, percentage: 7, isLocal: false },
  { name: 'Luar Wilayah (Surabaya, Nganjuk, dll)', visitors: 3000, gtv: 56000000, percentage: 5, isLocal: false }
])

// =========================================================================
// CHART INSTANCES
// =========================================================================
const revenueReportChartCanvas = ref<HTMLCanvasElement | null>(null)
const demoSegmentChartCanvas = ref<HTMLCanvasElement | null>(null)
const demoCityChartCanvas = ref<HTMLCanvasElement | null>(null)

let revChart: Chart | null = null
let segmentChart: Chart | null = null
let cityChart: Chart | null = null

const initRevenueReportChart = () => {
  if (!revenueReportChartCanvas.value) return
  if (revChart) revChart.destroy()

  revChart = new Chart(revenueReportChartCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      datasets: [
        {
          label: 'Tiket Reguler',
          data: [160000000, 195000000, 210000000, 185000000],
          backgroundColor: '#2C1A13',
          borderRadius: 4
        },
        {
          label: 'Tiket Terusan',
          data: [98000000, 120000000, 134000000, 110000000],
          backgroundColor: '#F29727',
          borderRadius: 4
        },
        {
          label: 'Paket Edukasi & B2B',
          data: [42000000, 55000000, 68000000, 45000000],
          backgroundColor: '#5A4034',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: {
          stacked: true,
          ticks: {
            callback: (val) => `Rp ${(Number(val)/1000000).toFixed(0)} Jt`
          }
        }
      }
    }
  })
}

const initDemographicCharts = () => {
  if (demoSegmentChartCanvas.value) {
    if (segmentChart) segmentChart.destroy()
    segmentChart = new Chart(demoSegmentChartCanvas.value, {
      type: 'doughnut',
      data: {
        labels: ['PR - Reguler (52%)', 'PP - Pengajian (33%)', 'PT - Tour B2B (15%)'],
        datasets: [{
          data: [7706, 4891, 2223],
          backgroundColor: ['#2C1A13', '#F29727', '#5A4034'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }

  if (demoCityChartCanvas.value) {
    if (cityChart) cityChart.destroy()
    cityChart = new Chart(demoCityChartCanvas.value, {
      type: 'bar',
      data: {
        labels: ['Kab. Blitar', 'Kota Blitar', 'Kediri', 'Tulungagung', 'Malang', 'Lainnya'],
        datasets: [{
          label: 'Jumlah Pengunjung (Orang)',
          data: [24500, 14200, 10900, 7100, 4500, 3000],
          backgroundColor: '#F29727',
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    })
  }
}

const handleFilterChange = () => {
  nextTick(() => {
    if (activeTab.value === 'revenue') initRevenueReportChart()
    if (activeTab.value === 'demographics') initDemographicCharts()
  })
}

watch(activeTab, (newTab) => {
  nextTick(() => {
    if (newTab === 'revenue') initRevenueReportChart()
    if (newTab === 'demographics') initDemographicCharts()
  })
})

const openExportModal = (format: 'pdf' | 'excel') => {
  exportFormat.value = format
  showExportModal.value = true
}

const handleExecuteExport = () => {
  isExporting.value = true
  setTimeout(() => {
    isExporting.value = false
    showExportModal.value = false
    alert(`[SUKSES] Dokumen Laporan (${exportFormat.value.toUpperCase()}) berhasil dibuat dan diunduh!`)
  }, 700)
}

const handleBlastWaPlaceholder = () => {
  alert(`[UI TRIGGER] Konfirmasi Blast WA: Siap mengirimkan voucher promo ke seluruh kontak member terfilter (${memberSegmentFilter.value})!`)
}

const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}

onMounted(() => {
  initRevenueReportChart()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

.reports-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 1380px;
  width: 100%;
  font-family: 'Jost', sans-serif;
}

/* Header */
.reports-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  min-height: 75px;
  padding: 6px 0 10px 0;
  position: relative;
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0 0 4px 0;
  letter-spacing: 0.3px;
}

.page-subtitle {
  font-size: 13.5px;
  font-weight: 600;
  color: #6E442B;
  margin: 0;
  line-height: 1.4;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Cute & Aesthetic Export Buttons */
.btn-export-cute {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 20px;
  font-family: 'Jost', sans-serif;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1.5px solid transparent;
  height: 38px;
}

.btn-cute-excel {
  background: #F0FDF4;
  color: #15803D;
  border-color: #BBF7D0;
  box-shadow: 0 2px 6px rgba(22, 101, 52, 0.08);
}

.btn-cute-excel:hover {
  background: #DCFCE7;
  border-color: #86EFAC;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(22, 101, 52, 0.15);
}

.btn-cute-tag {
  font-size: 10px;
  background: #DCFCE7;
  color: #166534;
  padding: 1px 6px;
  border-radius: 6px;
  font-weight: 800;
}

.btn-cute-pdf {
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  color: #FFFFFF;
  border-color: #F29727;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.2);
}

.btn-cute-pdf:hover {
  background: linear-gradient(135deg, #4A2E22 0%, #633E2E 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(242, 151, 39, 0.3);
}

.sparkle-spark {
  font-size: 11px;
}

/* Tab Navigation */
.tabs-nav-bar {
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  overflow-x: auto;
}

.tab-nav-btn {
  flex: 1;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #6B5A52;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tab-nav-btn:hover {
  background-color: #F9FAFB;
  color: var(--color-primary, #2C1A13);
}

.tab-nav-btn.active {
  background-color: var(--color-primary, #2C1A13);
  color: #FFFFFF;
  font-weight: 600;
}

/* Filter Toolbar */
.filter-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 10px 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #6B5A52;
}

.filter-select {
  padding: 6px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
  color: var(--color-primary, #2C1A13);
  background-color: #FFFFFF;
}

.date-range-inputs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.date-input {
  padding: 5px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-family: inherit;
  font-size: 12px;
}

.data-count-tag {
  font-size: 12px;
  color: #6B5A52;
}

/* Tab Content */
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* KPI Rows */
.revenue-kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.rev-kpi-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rev-label {
  font-size: 11.5px;
  color: #6B5A52;
  text-transform: uppercase;
  font-weight: 500;
}

.rev-val {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
}

.rev-sub {
  font-size: 11.5px;
  color: #9CA3AF;
}

/* Content Cards */
.content-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: #6B5A52;
}

.badge-amber {
  background-color: rgba(242, 151, 39, 0.15);
  color: #B45309;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}

.chart-box {
  height: 280px;
  position: relative;
}

.chart-box-donut, .chart-box-bar {
  height: 240px;
  position: relative;
}

/* Tables */
.table-responsive {
  overflow-x: auto;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.report-table th {
  background-color: #FAF8F5;
  color: #6B5A52;
  font-size: 11.5px;
  text-transform: uppercase;
  padding: 10px 12px;
  border-bottom: 1px solid #E5E7EB;
  text-align: left;
}

.report-table td {
  padding: 11px 12px;
  border-bottom: 1px solid #F3F4F6;
  color: var(--color-primary, #2C1A13);
}

.text-right { text-align: right; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.font-mono { font-family: monospace; }
.text-amber { color: #B45309; }
.text-cocoa { color: var(--color-primary, #2C1A13); }
.text-green { color: #047857; }
.text-blue { color: #1D4ED8; }
.text-gray { color: #6B7280; }
.text-red { color: #DC2626; }
.text-xs { font-size: 11px; }
.text-muted { color: #9CA3AF; }

/* Status Pills */
.status-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}

.pill-used { background-color: #ECFDF5; color: #047857; }
.pill-active { background-color: #EFF6FF; color: #1D4ED8; }
.pill-expired { background-color: #F3F4F6; color: #6B7280; }

.member-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.tag-pr { background-color: #F3F4F6; color: #374151; }
.tag-pp { background-color: #FEF3C7; color: #92400E; }
.tag-pt { background-color: #E0E7FF; color: #3730A3; }

.badge-voucher {
  background-color: #ECFDF5;
  color: #047857;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Ticket Status Grid */
.ticket-status-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.ticket-stat-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.border-green { border-top: 3px solid #10B981; }
.border-blue { border-top: 3px solid #3B82F6; }
.border-gray { border-top: 3px solid #9CA3AF; }
.border-amber { border-top: 3px solid #F29727; }
.border-all { border-top: 3px solid var(--color-primary, #2C1A13); }

.t-stat-label { font-size: 11px; color: #6B5A52; text-transform: uppercase; font-weight: 500; }
.t-stat-val { font-size: 22px; font-weight: 700; }
.t-stat-sub { font-size: 11px; color: #9CA3AF; }

/* Demographic Rows */
.demo-grid-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
}

.region-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.badge-local { background-color: #FFF6E8; color: #B45309; border: 1px solid #FDE68A; }
.badge-intercity { background-color: #F3F4F6; color: #4B5563; }

/* Search Head */
.search-head {
  flex-wrap: wrap;
  gap: 12px;
}

.search-input {
  padding: 6px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 12.5px;
  width: 260px;
}

.member-filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12.5px;
  height: 34px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(44, 26, 19, 0.65);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
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
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 10px;
}

.modal-header h3 {
  font-size: 16px;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
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
  background: #FFFFFF;
  border: 1px solid rgba(242, 151, 39, 0.3);
  padding: 2px 8px 2px 4px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #2C1A13;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.mini-chip-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.modal-head-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-icon-badge {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #FFF6E8;
  border: 1px solid #FDE68A;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-sub {
  font-size: 12px;
  color: #6B5A52;
  margin: 0;
}

.export-preview-box {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #FFFDF9 0%, #FFF8EE 100%);
  border: 1.5px solid rgba(242, 151, 39, 0.3);
  border-radius: 8px;
  padding: 12px 14px;
}

.preview-logo-box {
  width: 48px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E7EB;
  flex-shrink: 0;
}

.preview-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.doc-title {
  font-size: 13.5px;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: -0.2px;
}

.doc-sub {
  font-size: 11px;
  color: #6B5A52;
}

.doc-tag {
  font-size: 10px;
  font-weight: 600;
  color: #B45309;
  background: rgba(242, 151, 39, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
  width: fit-content;
  margin-top: 2px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #E5E7EB;
  padding-top: 12px;
}

@media (max-width: 1024px) {
  .revenue-kpi-row,
  .ticket-status-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-grid-row {
    grid-template-columns: 1fr;
  }
}
</style>
