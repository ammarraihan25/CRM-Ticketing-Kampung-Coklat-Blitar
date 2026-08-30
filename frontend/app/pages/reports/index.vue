<template>
  <div class="reports-container">
    <!-- 1. FLAT EXECUTIVE HEADER (Seamless) -->
    <header class="executive-command-header">
      <!-- Left: Clean Title & Subtitle -->
      <div class="brand-text-wrapper">
        <h1 class="header-main-title">Reports & Data Analytics</h1>
        <div class="header-meta-clean-line">
          Data historis transaksi, verifikasi tiket pintu, database CRM, dan demografi pengunjung Kampung Coklat.
        </div>
      </div>

      <!-- Right: Clean Dropdown & Controls -->
      <div class="controls-hero-col">
        <button 
          type="button" 
          class="btn-download-report"
          title="Unduh Lembar Kerja Excel"
          @click="openExportModal('excel')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Export Excel
        </button>

        <button 
          type="button" 
          class="btn-download-report"
          title="Unduh Dokumen Laporan PDF"
          @click="openExportModal('pdf')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Export PDF Laporan
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
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Filter Bar (Global for Reports) -->
    <div class="filter-toolbar">
      <div class="filter-left">
        <div class="filter-group" style="display: flex; align-items: center; gap: 8px;">
          <label style="font-size: 13px; font-weight: 700; color: #4B5563;">Rentang Waktu:</label>
          <div style="min-width: 220px;">
            <AppSelect 
              v-model="selectedPeriod" 
              :options="periodOptions" 
              @change="handleFilterChange"
            />
          </div>
        </div>

        <div v-if="selectedPeriod === 'custom'" class="date-range-inputs" style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 170px;">
            <AppDatePicker v-model="customStartDate" placeholder="Mulai..." />
          </div>
          <span style="font-size: 12px; font-weight: 700; color: #9CA3AF;">s/d</span>
          <div style="width: 170px;">
            <AppDatePicker v-model="customEndDate" placeholder="Selesai..." />
          </div>
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
          <span class="rev-label">Total Transaksi (Kanal Terpadu)</span>
          <div class="rev-val">{{ revenueData.totalTransactions.toLocaleString('id-ID') }} Struk</div>
          <span class="rev-sub">POS: 64% &bull; Self-Service: 36%</span>
        </div>

        <div class="rev-kpi-card">
          <span class="rev-label">Total Diskon &amp; Voucher</span>
          <div class="rev-val text-red">{{ formatRupiah(revenueData.totalDiscounts) }}</div>
          <span class="rev-sub">{{ revenueData.discountCount }} voucher promo diredeem</span>
        </div>
      </div>

      <!-- 2-Channel Sales Distribution Mini Banner -->
      <div class="channel-distribution-strip">
        <div class="channel-box channel-box-pos">
          <div class="c-badge">🟠 POS Kasir Loket</div>
          <div class="c-val">{{ formatRupiah(revenueData.posGtv) }} <small>(64.0% &bull; {{ revenueData.posTickets.toLocaleString('id-ID') }} Tiket)</small></div>
        </div>
        <div class="channel-box channel-box-self">
          <div class="c-badge">🔵 Pemesanan Mandiri (Kiosk)</div>
          <div class="c-val">{{ formatRupiah(revenueData.selfGtv) }} <small>(36.0% &bull; {{ revenueData.selfTickets.toLocaleString('id-ID') }} Tiket)</small></div>
        </div>
      </div>

      <!-- Chart: Revenue Distribution -->
      <div class="content-card">
        <div class="card-head">
          <div>
            <h3 class="card-title">Kurva Fluktuasi Pendapatan GTV</h3>
            <span class="card-subtitle">Historis akumulasi penjualan tiket reguler, terusan, edukasi, dan wahana</span>
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
          <h3 class="card-title">Breakdown Pendapatan per Kategori Produk &amp; Layanan</h3>
        </div>
        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>Kategori Produk / Layanan</th>
                <th>Harga Dasar</th>
                <th class="text-right">Volume Transaksi</th>
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
    <!-- TAB 2: TICKET & GATE REPORT (Active, Used, Expired, Free Ticket & Log) -->
    <!-- =================================================================== -->
    <section v-else-if="activeTab === 'tickets'" class="tab-content">
      <!-- Ticket Status Counters -->
      <div class="ticket-status-grid">
        <div class="ticket-stat-card border-all">
          <span class="t-stat-label">Total Diterbitkan</span>
          <span class="t-stat-val">{{ ticketReportData.totalIssued.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">POS (64%) &bull; Kiosk (36%)</span>
        </div>

        <div class="ticket-stat-card border-green">
          <span class="t-stat-label">Sudah Digunakan (USED)</span>
          <span class="t-stat-val text-green">{{ ticketReportData.used.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Scan valid di Turnstile Gate In</span>
        </div>

        <div class="ticket-stat-card border-blue">
          <span class="t-stat-label">Tiket Aktif (ACTIVE)</span>
          <span class="t-stat-val text-blue">{{ ticketReportData.active.toLocaleString('id-ID') }}</span>
          <span class="t-stat-sub">Belum scan di gate masuk</span>
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

      <!-- Ticket Transaction Table with Search & Channel Filter -->
      <div class="content-card">
        <div class="card-head search-head">
          <div>
            <h3 class="card-title">Detail Log Tiket &amp; Verifikasi Turnstile Gate</h3>
            <span class="card-subtitle">Pencatatan barcode tiket terintegrasi kasir POS, Kiosk mandiri, dan gate turnstile</span>
          </div>

          <div class="ticket-filter-row">
            <select v-model="ticketChannelFilter" class="filter-select">
              <option value="ALL">Semua Kanal Penjualan</option>
              <option value="POS">POS Kasir Loket</option>
              <option value="Self-Service">Pemesanan Mandiri (Kiosk)</option>
            </select>

            <div class="search-input-box">
              <input 
                v-model="ticketSearchQuery" 
                type="text" 
                class="search-input" 
                placeholder="Cari No. WhatsApp / Kode Tiket / Invoice..."
              />
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th>ID Tiket / Barcode</th>
                <th>Kanal</th>
                <th>No Invoice</th>
                <th>Pengunjung (No WA)</th>
                <th>Tipe Tiket</th>
                <th>Tipe Member</th>
                <th>Lokasi Gate</th>
                <th>Status Tiket</th>
                <th>Waktu Beli</th>
                <th>Waktu Scan Gate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTicketList" :key="t.id">
                <td class="font-mono font-bold">{{ t.ticketCode }}</td>
                <td>
                  <span class="channel-pill-tag" :class="t.channel === 'Self-Service' ? 'channel-self' : 'channel-pos'">
                    {{ t.channel }}
                  </span>
                </td>
                <td>{{ t.invoiceNo }}</td>
                <td>
                  <strong>{{ t.buyerName }}</strong>
                  <div class="text-xs text-muted">{{ t.whatsapp }}</div>
                </td>
                <td>{{ t.ticketType }}</td>
                <td><span class="member-tag" :class="`tag-${t.memberType.toLowerCase()}`">{{ formatMemberType(t.memberType) }}</span></td>
                <td class="font-medium text-xs">{{ t.gateLocation }}</td>
                <td>
                  <span class="status-pill" :class="`pill-${t.status.toLowerCase()}`">
                    {{ t.status }}
                  </span>
                </td>
                <td class="text-xs">{{ t.issuedAt }}</td>
                <td class="text-xs">{{ t.scannedAt || '-' }}</td>
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
          <span class="rev-sub">Primary Key: Nomor WhatsApp</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Member Reguler (PR)</span>
          <div class="rev-val">{{ memberReportData.prCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">50% dari total basis data</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Jamaah Pengajian (PP)</span>
          <div class="rev-val text-amber">{{ memberReportData.ppCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">25% &bull; Gratis Tiket Masuk</span>
        </div>
        <div class="rev-kpi-card">
          <span class="rev-label">Agen Tour / B2B (PT)</span>
          <div class="rev-val">{{ memberReportData.ptCount.toLocaleString('id-ID') }}</div>
          <span class="rev-sub">25% kemitraan rombongan</span>
        </div>
      </div>

      <!-- Member CRM Table with Filter & Blast WA Action Placeholder -->
      <div class="content-card">
        <div class="card-head search-head">
          <div>
            <h3 class="card-title">Direktori Database Member Loyalitas CRM</h3>
            <span class="card-subtitle">Profil WhatsApp, asal domisili terverifikasi, akumulasi spend, dan status voucher</span>
          </div>

          <div class="member-filter-row">
            <select v-model="memberSegmentFilter" class="filter-select">
              <option value="ALL">Semua Segmen CRM</option>
              <option value="PR">PR - Pengunjung Reguler (50%)</option>
              <option value="PP">PP - Jamaah Pengajian (25%)</option>
              <option value="PT">PT - Pengunjung Tour B2B (25%)</option>
              <option value="NON_MEMBER">Buku Tamu / Walk-in POS</option>
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
                <th>Nama Member / Kontak</th>
                <th>Nomor WhatsApp (PK)</th>
                <th>Domisili (Kata Kunci)</th>
                <th>Tipe Member</th>
                <th>Akumulasi Spend (GTV)</th>
                <th>Total Kunjungan</th>
                <th>Status Voucher</th>
                <th>Sumber Pendaftaran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredMemberList" :key="m.whatsapp">
                <td class="font-medium">{{ m.name }}</td>
                <td class="font-mono text-cocoa font-bold">{{ m.whatsapp }}</td>
                <td class="font-medium text-gray">{{ m.domisili }}</td>
                <td><span class="member-tag" :class="`tag-${m.type.toLowerCase()}`">{{ formatMemberType(m.type) }}</span></td>
                <td class="font-bold text-amber">{{ formatRupiah(m.totalSpend) }}</td>
                <td>{{ m.visits }} Kali</td>
                <td>
                  <span v-if="m.hasActiveVoucher" class="badge-voucher">Voucher Aktif</span>
                  <span v-else class="text-xs text-muted">Tidak ada</span>
                </td>
                <td class="text-xs text-muted">{{ m.source || 'Membership Online' }}</td>
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
              <h3 class="card-title">Perbandingan Rasio Segmen CRM</h3>
              <span class="card-subtitle">Komposisi basis data audiens Kampung Coklat (PR, PP, PT)</span>
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
              <span class="card-subtitle">Integrasi kata kunci domisili kontak CRM WhatsApp</span>
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
          <h3 class="card-title">Tabel Akumulasi Pengunjung per Wilayah Domisili CRM</h3>
        </div>
        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th style="width: 80px;">Peringkat</th>
                <th>Wilayah Kota / Kabupaten</th>
                <th>Kata Kunci Domisili</th>
                <th>Kategori Wilayah</th>
                <th class="text-right">Kontak CRM Terdata</th>
                <th class="text-right">Total Pengunjung (Pax)</th>
                <th class="text-right">Total Transaksi GTV</th>
                <th class="text-right" style="width: 100px;">Persentase</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(city, idx) in demographicTableData" :key="city.name">
                <td class="font-bold">#{{ idx + 1 }}</td>
                <td class="font-medium">{{ city.name }}</td>
                <td class="font-bold text-blue">"{{ city.keyword }}"</td>
                <td class="text-gray">{{ city.isLocal ? 'Lokal Blitar Raya' : 'Regional Jawa Timur' }}</td>
                <td class="text-right font-medium">{{ city.crmCount }} Kontak</td>
                <td class="text-right font-medium">{{ city.visitors.toLocaleString('id-ID') }} Pax</td>
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
            <div>
              <h3>{{ exportFormat === 'pdf' ? 'Unduh Laporan Format PDF' : 'Unduh Rekap Laporan Excel (.xlsx)' }}</h3>
              <p class="modal-sub">Dokumen siap cetak dengan logo resmi &amp; struktur data terekonsiliasi.</p>
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
              <span class="doc-tag">{{ exportFormat === 'pdf' ? 'Format: PDF Dokumen Resmi A4' : 'Format: Microsoft Excel Spreadsheet (.csv)' }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>Cakupan Modul Laporan:</label>
            <select v-model="exportScope" class="filter-select full-width">
              <option value="current">Halaman Aktif ({{ reportTabs.find(t => t.id === activeTab)?.label }})</option>
              <option value="all">Seluruh Modul (GTV + Tiket/Gate + CRM + Demografi)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Format &amp; Legalitas Header Cetak:</label>
            <div class="checkbox-row">
              <input type="checkbox" checked disabled />
              <span>Sertakan Logo Resmi, QR Pengesahan, &amp; Kop Surat Perusahaan</span>
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
import AppDatePicker from '~/components/shared/AppDatePicker.vue'
import AppSelect from '~/components/shared/AppSelect.vue'

definePageMeta({
  layout: 'admin'
})

Chart.register(...registerables)

type TabType = 'revenue' | 'tickets' | 'members' | 'demographics'

const activeTab = ref<TabType>('revenue')
const selectedPeriod = ref('this_month')
const customStartDate = ref('2026-08-01')
const customEndDate = ref('2026-08-19')

const periodOptions = [
  { value: 'today', label: 'Hari Ini (Real-Time)' },
  { value: 'this_week', label: 'Minggu Ini (7 Hari Terakhir)' },
  { value: 'this_month', label: 'Bulan Ini (Agustus 2026)' },
  { value: 'last_month', label: 'Bulan Lalu (Juli 2026)' },
  { value: 'custom', label: 'Kustom Rentang Tanggal' }
]

const showExportModal = ref(false)
const exportFormat = ref<'pdf' | 'excel'>('pdf')
const exportScope = ref('current')
const isExporting = ref(false)

const ticketSearchQuery = ref('')
const ticketChannelFilter = ref('ALL')
const memberSegmentFilter = ref('ALL')

const reportTabs = [
  { id: 'revenue' as TabType, label: 'Revenue Report (GTV)' },
  { id: 'tickets' as TabType, label: 'Ticket & Gate Report' },
  { id: 'members' as TabType, label: 'Member / CRM Report' },
  { id: 'demographics' as TabType, label: 'Demographic Report' }
]

// =========================================================================
// [API INTEGRATION POINT: MODUL GTV, TICKET & GATE, CRM, DEMOGRAFI]
// =========================================================================

// 1. Revenue Report Data (Integrasi POS Front Office + Self-Service Kiosk)
const revenueData = ref({
  totalGtv: 1280000000,
  dailyAverage: 42666667,
  totalTransactions: 24500,
  posGtv: 819200000,
  posTickets: 40960,
  selfGtv: 460800000,
  selfTickets: 23040,
  avgBasketSize: 52245,
  totalDiscounts: 42500000,
  discountCount: 1850,
  ticketBreakdown: [
    { category: 'Tiket Masuk Reguler (Rp 20.000)', price: 20000, qty: 37500, gtv: 750000000, discounts: 22500000, net: 727500000, share: 58 },
    { category: 'Tiket Terusan Edukasi & Wahana (Rp 35.000)', price: 35000, qty: 13200, gtv: 462000000, discounts: 12000000, net: 450000000, share: 36 },
    { category: 'Paket Edukasi Cooking Class & Coklat (Rp 50.000)', price: 50000, qty: 4000, gtv: 200000000, discounts: 0, net: 200000000, share: 15 },
    { category: 'Wahana Individual (Golf Car, Bom Bom, Trampolin)', price: 15000, qty: 11200, gtv: 168000000, discounts: 5000000, net: 163000000, share: 13 },
    { category: 'Sewa Hall & Gedung VIP (Majapahit, Singosari)', price: 2500000, qty: 18, gtv: 45000000, discounts: 0, net: 45000000, share: 4 },
    { category: 'Paket Rombongan Biro Wisata B2B (Rp 18.000)', price: 18000, qty: 9500, gtv: 171000000, discounts: 8000000, net: 163000000, share: 13 }
  ]
})

// 2. Ticket & Gate In Report Data (Integrasi POS, Kiosk & Turnstile Barcode Gate)
const ticketReportData = ref({
  totalIssued: 64000,
  used: 61200,
  active: 2100,
  expired: 700,
  freeVoucher: 3120,
  list: [
    { id: '1', ticketCode: 'TCK-20260819-0012', invoiceNo: 'INV-20260819-001', channel: 'POS', buyerName: 'Ahmad Fauzi', whatsapp: '081234567890', ticketType: 'Tiket Reguler', memberType: 'PR', gateLocation: 'Gate 1 - Turnstile Utama', status: 'USED', issuedAt: '19/08/2026 08:15', scannedAt: '19/08/2026 08:22' },
    { id: '2', ticketCode: 'TCK-20260819-0013', invoiceNo: 'INV-20260819-002', channel: 'POS', buyerName: 'Hj. Aminah (Jamaah)', whatsapp: '085678912345', ticketType: 'Tiket Reguler (Free Voucher)', memberType: 'PP', gateLocation: 'Gate 2 - Turnstile Barat', status: 'USED', issuedAt: '19/08/2026 08:30', scannedAt: '19/08/2026 08:45' },
    { id: '3', ticketCode: 'TCK-20260819-0014', invoiceNo: 'INV-20260819-003', channel: 'Self-Service', buyerName: 'Budi Santoso', whatsapp: '082198765432', ticketType: 'Tiket Terusan', memberType: 'PR', gateLocation: 'Gate 1 - Turnstile Utama', status: 'ACTIVE', issuedAt: '19/08/2026 10:10', scannedAt: null },
    { id: '4', ticketCode: 'TCK-20260819-0015', invoiceNo: 'INV-20260819-004', channel: 'POS', buyerName: 'SMPN 1 Kediri (Tour)', whatsapp: '081345678901', ticketType: 'Paket Edukasi Sekolah', memberType: 'PT', gateLocation: 'Gate 3 - Wahana & Edukasi', status: 'USED', issuedAt: '19/08/2026 09:00', scannedAt: '19/08/2026 09:15' },
    { id: '5', ticketCode: 'TCK-20260819-0016', invoiceNo: 'INV-20260819-005', channel: 'Self-Service', buyerName: 'Rina Wijaya', whatsapp: '087812345678', ticketType: 'Tiket Terusan', memberType: 'PR', gateLocation: 'Gate 1 - Turnstile Utama', status: 'USED', issuedAt: '19/08/2026 10:45', scannedAt: '19/08/2026 11:02' },
    { id: '6', ticketCode: 'TCK-20260819-0017', invoiceNo: 'INV-20260819-006', channel: 'POS', buyerName: 'Keluarga Sutrisno', whatsapp: '081298761234', ticketType: 'Tiket Reguler', memberType: 'PR', gateLocation: 'Gate 1 - Turnstile Utama', status: 'EXPIRED', issuedAt: '18/08/2026 16:30', scannedAt: null },
    { id: '7', ticketCode: 'TCK-20260819-0018', invoiceNo: 'INV-20260819-007', channel: 'Self-Service', buyerName: 'Rizky Maulana', whatsapp: '082255512345', ticketType: 'Tiket Terusan Unlimited', memberType: 'PR', gateLocation: 'Gate 1 - Turnstile Utama', status: 'USED', issuedAt: '19/08/2026 11:15', scannedAt: '19/08/2026 11:20' },
    { id: '8', ticketCode: 'TCK-20260819-0019', invoiceNo: 'INV-20260819-008', channel: 'POS', buyerName: 'Nadia Putri', whatsapp: '081334567890', ticketType: 'Paket Terusan Edukasi', memberType: 'PP', gateLocation: 'Gate 2 - Turnstile Barat', status: 'USED', issuedAt: '19/08/2026 11:40', scannedAt: '19/08/2026 11:55' }
  ]
})

const filteredTicketList = computed(() => {
  let list = ticketReportData.value.list
  if (ticketChannelFilter.value !== 'ALL') {
    list = list.filter(t => t.channel === ticketChannelFilter.value)
  }
  if (ticketSearchQuery.value.trim()) {
    const q = ticketSearchQuery.value.toLowerCase()
    list = list.filter(t => 
      t.ticketCode.toLowerCase().includes(q) || 
      t.buyerName.toLowerCase().includes(q) || 
      t.whatsapp.includes(q) ||
      t.invoiceNo.toLowerCase().includes(q) ||
      t.ticketType.toLowerCase().includes(q)
    )
  }
  return list
})

// 3. Member & CRM WhatsApp Report Data (Sinkron CRM Database)
const memberReportData = ref({
  totalMembers: 14820,
  prCount: 7410,
  ppCount: 3705,
  ptCount: 3705,
  list: [
    { name: 'Callista Danis', whatsapp: '628123456789', domisili: 'Kota Blitar', type: 'PR', totalSpend: 4250000, visits: 8, registeredAt: '12/10/2022', hasActiveVoucher: true, source: 'Membership Online' },
    { name: 'Budi Santoso', whatsapp: '6285711223344', domisili: 'Kediri Raya', type: 'PP', totalSpend: 2750000, visits: 7, registeredAt: '18/01/2023', hasActiveVoucher: true, source: 'Digital Guestbook' },
    { name: 'Siti Khadijah', whatsapp: '6281999887766', domisili: 'Malang Raya', type: 'PT', totalSpend: 1850000, visits: 5, registeredAt: '03/03/2023', hasActiveVoucher: false, source: 'B2B Mitra Wisata' },
    { name: 'Rizky Maulana', whatsapp: '6282255512345', domisili: 'Surabaya Metropolitan', type: 'PR', totalSpend: 3250000, visits: 6, registeredAt: '20/04/2023', hasActiveVoucher: true, source: 'Self-Service Kiosk' },
    { name: 'Nadia Putri', whatsapp: '6281334567890', domisili: 'Tulungagung', type: 'PP', totalSpend: 4100000, visits: 11, registeredAt: '11/05/2023', hasActiveVoucher: true, source: 'POS Kasir Loket' },
    { name: 'Fajar Hidayat', whatsapp: '6285788812345', domisili: 'Kediri Raya', type: 'PR', totalSpend: 2150000, visits: 3, registeredAt: '09/06/2023', hasActiveVoucher: false, source: 'Membership Online' },
    { name: 'Aulia Rahma', whatsapp: '6281239988776', domisili: 'Kab. Blitar', type: 'PT', totalSpend: 5600000, visits: 14, registeredAt: '21/07/2023', hasActiveVoucher: true, source: 'B2B Mitra Wisata' },
    { name: 'Dimas Pratama', whatsapp: '6282145678901', domisili: 'Malang Raya', type: 'PR', totalSpend: 1250000, visits: 2, registeredAt: '14/08/2023', hasActiveVoucher: false, source: 'POS Kasir Loket' },
    { name: 'Ahmad Faisal', whatsapp: '6281234567810', domisili: 'Surabaya Metropolitan', type: 'NON_MEMBER', totalSpend: 150000, visits: 1, registeredAt: '19/08/2026', hasActiveVoucher: false, source: 'Buku Tamu / Walk-in' },
    { name: 'Sinta Kirana', whatsapp: '6285712312312', domisili: 'Malang Raya', type: 'NON_MEMBER', totalSpend: 75000, visits: 1, registeredAt: '19/08/2026', hasActiveVoucher: false, source: 'Self-Service Kiosk' },
    { name: 'Rafa Pratama', whatsapp: '6281399881122', domisili: 'Kota Blitar', type: 'NON_MEMBER', totalSpend: 50000, visits: 1, registeredAt: '19/08/2026', hasActiveVoucher: false, source: 'POS Kasir Loket' },
    { name: 'Hj. Maryam', whatsapp: '6282133445566', domisili: 'Kediri Raya', type: 'NON_MEMBER', totalSpend: 200000, visits: 1, registeredAt: '19/08/2026', hasActiveVoucher: false, source: 'Buku Tamu / Walk-in' }
  ]
})

const filteredMemberList = computed(() => {
  if (memberSegmentFilter.value === 'ALL') return memberReportData.value.list
  return memberReportData.value.list.filter(m => m.type === memberSegmentFilter.value)
})

// 4. Demographic Report Data (Integrasi Sebaran Domisili CRM & Pax GTV)
const demographicTableData = ref([
  { name: 'Kota Blitar', keyword: 'Blitar', crmCount: 3, visitors: 14200, gtv: 284000000, percentage: 38.4, isLocal: true },
  { name: 'Kabupaten Blitar', keyword: 'Blitar', crmCount: 2, visitors: 9500, gtv: 190000000, percentage: 23.7, isLocal: true },
  { name: 'Kediri Raya (Kota & Kab)', keyword: 'Kediri', crmCount: 3, visitors: 6200, gtv: 124000000, percentage: 15.9, isLocal: false },
  { name: 'Tulungagung & Trenggalek', keyword: 'Tulungagung', crmCount: 1, visitors: 4600, gtv: 92000000, percentage: 11.8, isLocal: false },
  { name: 'Malang & Surabaya Metropolitan', keyword: 'Malang / Surabaya', crmCount: 5, visitors: 4000, gtv: 80000000, percentage: 10.2, isLocal: false }
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

const generateReportHtmlContent = (scope: string) => {
  const periodLabel = selectedPeriod.value === 'today' ? 'Hari Ini (Real-Time)' :
                      selectedPeriod.value === 'this_week' ? 'Minggu Ini (7 Hari Terakhir)' :
                      selectedPeriod.value === 'this_month' ? 'Bulan Ini (Agustus 2026)' :
                      selectedPeriod.value === 'last_month' ? 'Bulan Lalu (Juli 2026)' : 'Kustom Rentang Tanggal'
  const dateStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  let contentHtml = ''

  // 1. REVENUE REPORT
  if (scope === 'all' || activeTab.value === 'revenue') {
    contentHtml += `
      <div class="report-section">
        <h2 style="color: #2C1A13; border-bottom: 2px solid #F59E0B; padding-bottom: 6px; margin-top: 24px;">1. LAPORAN PENDAPATAN & GTV (REVENUE REPORT)</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 14px 0;">
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Total GTV (Omzet Kotor)</div>
            <div style="font-size: 16px; font-weight: bold; color: #B45309;">${formatRupiah(revenueData.value.totalGtv)}</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">POS Kasir Loket (64%)</div>
            <div style="font-size: 16px; font-weight: bold; color: #111827;">${formatRupiah(revenueData.value.posGtv)}</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Pemesanan Mandiri Kiosk (36%)</div>
            <div style="font-size: 16px; font-weight: bold; color: #111827;">${formatRupiah(revenueData.value.selfGtv)}</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Total Diskon Promo</div>
            <div style="font-size: 16px; font-weight: bold; color: #DC2626;">-${formatRupiah(revenueData.value.totalDiscounts)}</div>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;" border="1" cellpadding="6">
          <thead>
            <tr style="background: #FAF8F5; text-align: left;">
              <th>Kategori Produk / Layanan</th>
              <th>Harga Dasar</th>
              <th style="text-align: right;">Volume Transaksi</th>
              <th style="text-align: right;">Total GTV (Rp)</th>
              <th style="text-align: right;">Total Diskon (Rp)</th>
              <th style="text-align: right;">Pendapatan Bersih (Net)</th>
              <th style="text-align: right;">Kontribusi</th>
            </tr>
          </thead>
          <tbody>
            ${revenueData.value.ticketBreakdown.map(i => `
              <tr>
                <td>${i.category}</td>
                <td>${formatRupiah(i.price)}</td>
                <td style="text-align: right;">${i.qty.toLocaleString('id-ID')}</td>
                <td style="text-align: right; font-weight: bold;">${formatRupiah(i.gtv)}</td>
                <td style="text-align: right; color: #DC2626;">-${formatRupiah(i.discounts)}</td>
                <td style="text-align: right; font-weight: bold; color: #B45309;">${formatRupiah(i.net)}</td>
                <td style="text-align: right;">${i.share}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  // 2. TICKET & GATE REPORT
  if (scope === 'all' || activeTab.value === 'tickets') {
    contentHtml += `
      <div class="report-section">
        <h2 style="color: #2C1A13; border-bottom: 2px solid #3B82F6; padding-bottom: 6px; margin-top: 24px;">2. LAPORAN TIKET & VERIFIKASI GATE TURNSTILE</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 14px 0;">
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Total Diterbitkan</div>
            <div style="font-size: 16px; font-weight: bold;">${ticketReportData.value.totalIssued.toLocaleString('id-ID')} Tiket</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Sudah Digunakan (USED)</div>
            <div style="font-size: 16px; font-weight: bold; color: #047857;">${ticketReportData.value.used.toLocaleString('id-ID')} Tiket</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Tiket Aktif (ACTIVE)</div>
            <div style="font-size: 16px; font-weight: bold; color: #1D4ED8;">${ticketReportData.value.active.toLocaleString('id-ID')} Tiket</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Free Voucher Pengajian</div>
            <div style="font-size: 16px; font-weight: bold; color: #B45309;">${ticketReportData.value.freeVoucher.toLocaleString('id-ID')} Tiket</div>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;" border="1" cellpadding="6">
          <thead>
            <tr style="background: #FAF8F5; text-align: left;">
              <th>ID Tiket / Barcode</th>
              <th>Kanal</th>
              <th>No Invoice</th>
              <th>Pengunjung (No WA)</th>
              <th>Tipe Tiket</th>
              <th>Tipe Member</th>
              <th>Lokasi Gate</th>
              <th>Status</th>
              <th>Waktu Beli</th>
              <th>Waktu Scan</th>
            </tr>
          </thead>
          <tbody>
            ${ticketReportData.value.list.map(t => `
              <tr>
                <td style="font-family: monospace; font-weight: bold;">${t.ticketCode}</td>
                <td>${t.channel}</td>
                <td>${t.invoiceNo}</td>
                <td>${t.buyerName} (${t.whatsapp})</td>
                <td>${t.ticketType}</td>
                <td>${formatMemberType(t.memberType)}</td>
                <td>${t.gateLocation}</td>
                <td><strong>${t.status}</strong></td>
                <td>${t.issuedAt}</td>
                <td>${t.scannedAt || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  // 3. MEMBER & CRM REPORT
  if (scope === 'all' || activeTab.value === 'members') {
    contentHtml += `
      <div class="report-section">
        <h2 style="color: #2C1A13; border-bottom: 2px solid #8B5CF6; padding-bottom: 6px; margin-top: 24px;">3. LAPORAN DATABASE MEMBER & CRM WHATSAPP</h2>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 14px 0;">
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Total Basis Data CRM</div>
            <div style="font-size: 16px; font-weight: bold; color: #2C1A13;">${memberReportData.value.totalMembers.toLocaleString('id-ID')} Kontak</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Member Reguler (PR - 50%)</div>
            <div style="font-size: 16px; font-weight: bold;">${memberReportData.value.prCount.toLocaleString('id-ID')} Kontak</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Jamaah Pengajian (PP - 25%)</div>
            <div style="font-size: 16px; font-weight: bold; color: #B45309;">${memberReportData.value.ppCount.toLocaleString('id-ID')} Kontak</div>
          </div>
          <div style="background: #FFFDF9; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px;">
            <div style="font-size: 11px; color: #6B7280;">Agen Tour B2B (PT - 25%)</div>
            <div style="font-size: 16px; font-weight: bold;">${memberReportData.value.ptCount.toLocaleString('id-ID')} Kontak</div>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;" border="1" cellpadding="6">
          <thead>
            <tr style="background: #FAF8F5; text-align: left;">
              <th>Nama Member / Kontak</th>
              <th>Nomor WhatsApp (PK)</th>
              <th>Domisili (Kota/Kab)</th>
              <th>Tipe Member</th>
              <th style="text-align: right;">Akumulasi Spend (GTV)</th>
              <th>Total Kunjungan</th>
              <th>Status Voucher</th>
              <th>Sumber Pendaftaran</th>
            </tr>
          </thead>
          <tbody>
            ${memberReportData.value.list.map(m => `
              <tr>
                <td style="font-weight: 500;">${m.name}</td>
                <td style="font-family: monospace; font-weight: bold;">${m.whatsapp}</td>
                <td>${m.domisili}</td>
                <td>${formatMemberType(m.type)}</td>
                <td style="text-align: right; font-weight: bold; color: #B45309;">${formatRupiah(m.totalSpend)}</td>
                <td>${m.visits} Kali</td>
                <td>${m.hasActiveVoucher ? 'Voucher Aktif' : 'Tidak ada'}</td>
                <td>${m.source || 'Membership Online'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  // 4. DEMOGRAPHIC REPORT
  if (scope === 'all' || activeTab.value === 'demographics') {
    contentHtml += `
      <div class="report-section">
        <h2 style="color: #2C1A13; border-bottom: 2px solid #10B981; padding-bottom: 6px; margin-top: 24px;">4. LAPORAN DEMOGRAFI ASAL PENGUNJUNG</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px;" border="1" cellpadding="6">
          <thead>
            <tr style="background: #FAF8F5; text-align: left;">
              <th style="width: 80px;">Peringkat</th>
              <th>Wilayah Kota / Kabupaten</th>
              <th>Kata Kunci Domisili</th>
              <th>Kategori Wilayah</th>
              <th style="text-align: right;">Kontak CRM Terdata</th>
              <th style="text-align: right;">Total Pengunjung (Pax)</th>
              <th style="text-align: right;">Total Transaksi GTV</th>
              <th style="text-align: right;">Persentase</th>
            </tr>
          </thead>
          <tbody>
            ${demographicTableData.value.map((c, idx) => `
              <tr>
                <td style="font-weight: bold;">#${idx + 1}</td>
                <td style="font-weight: 500;">${c.name}</td>
                <td style="color: #1D4ED8; font-weight: bold;">"${c.keyword}"</td>
                <td>${c.isLocal ? 'Lokal Blitar Raya' : 'Regional Jawa Timur'}</td>
                <td style="text-align: right;">${c.crmCount} Kontak</td>
                <td style="text-align: right; font-weight: 500;">${c.visitors.toLocaleString('id-ID')} Pax</td>
                <td style="text-align: right; font-weight: bold; color: #B45309;">${formatRupiah(c.gtv)}</td>
                <td style="text-align: right; font-weight: bold;">${c.percentage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Laporan Resmi Kampung Coklat - ${scope.toUpperCase()}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1F2937; margin: 20px; font-size: 12px; }
        .header-kop { border-bottom: 2.5px solid #2C1A13; padding-bottom: 12px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
        .company-title { font-size: 18px; font-weight: 900; color: #2C1A13; letter-spacing: 0.5px; }
        .company-sub { font-size: 11px; color: #6B7280; margin-top: 2px; }
        .meta-box { font-size: 11px; text-align: right; color: #4B5563; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #D1D5DB; padding: 7px 10px; }
        th { background-color: #F9FAFB; font-weight: 700; }
        .signatures { margin-top: 40px; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; font-size: 11.5px; page-break-inside: avoid; }
        .sign-space { height: 60px; }
        @media print {
          body { margin: 0; padding: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header-kop">
        <div>
          <div class="company-title">WISATA EDUKASI KAMPUNG COKLAT BLITAR</div>
          <div class="company-sub">PT ABSYSTEM &bull; Jl. Banteng - Blorok No. 18, Plosorejo, Kademangan, Blitar, Jawa Timur</div>
          <div class="company-sub">Sistem Manajemen Terpadu CRM & Ticketing Gate Terintegrasi</div>
        </div>
        <div class="meta-box">
          <div><strong>Periode Laporan:</strong> ${periodLabel}</div>
          <div><strong>Dicetak Pada:</strong> ${dateStr}</div>
          <div><strong>Status Dokumen:</strong> RESMI / TERVALIDASI</div>
        </div>
      </div>

      ${contentHtml}

      <div class="signatures">
        <div>
          <div>Disiapkan Oleh,</div>
          <div class="sign-space"></div>
          <div><strong>( Admin Operasional )</strong></div>
          <div style="font-size: 10px; color: #6B7280;">Front Office & Kasir POS</div>
        </div>
        <div>
          <div>Diperiksa Oleh,</div>
          <div class="sign-space"></div>
          <div><strong>( Manager Operasional )</strong></div>
          <div style="font-size: 10px; color: #6B7280;">Head of Ticketing & CRM</div>
        </div>
        <div>
          <div>Disahkan Oleh,</div>
          <div class="sign-space"></div>
          <div><strong>( Direktur Utama )</strong></div>
          <div style="font-size: 10px; color: #6B7280;">PT ABSYSTEM / Kampung Coklat</div>
        </div>
      </div>
    </body>
    </html>
  `
}

const generateCsvContent = (scope: string): string => {
  const periodLabel = selectedPeriod.value === 'today' ? 'Hari Ini (Real-Time)' :
                      selectedPeriod.value === 'this_week' ? 'Minggu Ini (7 Hari Terakhir)' :
                      selectedPeriod.value === 'this_month' ? 'Bulan Ini (Agustus 2026)' :
                      selectedPeriod.value === 'last_month' ? 'Bulan Lalu (Juli 2026)' : 'Kustom Rentang Tanggal'
  const dateStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const lines: string[] = []
  lines.push(`"WISATA EDUKASI KAMPUNG COKLAT BLITAR"`)
  lines.push(`"PT ABSYSTEM - SISTEM MANAJEMEN TERPADU CRM & TICKETING"`)
  lines.push(`"Periode Laporan","${periodLabel}","Dicetak Pada","${dateStr}","Status","RESMI / TERVALIDASI"`)
  lines.push(``)

  // 1. REVENUE REPORT
  if (scope === 'all' || activeTab.value === 'revenue') {
    lines.push(`"=== 1. LAPORAN PENDAPATAN & GTV (REVENUE REPORT) ==="`)
    lines.push(`"Total GTV (Omzet Kotor)","${revenueData.value.totalGtv}","POS Kasir Loket (64%)","${revenueData.value.posGtv}","Pemesanan Mandiri Kiosk (36%)","${revenueData.value.selfGtv}"`)
    lines.push(`"Total Transaksi","${revenueData.value.totalTransactions}","Total Diskon Promo","${revenueData.value.totalDiscounts}"`)
    lines.push(``)
    lines.push(`"Kategori Produk / Layanan","Harga Dasar (Rp)","Volume Transaksi","Total GTV (Rp)","Diskon Promo (Rp)","Pendapatan Bersih Net (Rp)","Kontribusi (%)"`)
    revenueData.value.ticketBreakdown.forEach(item => {
      lines.push(`"${item.category}","${item.price}","${item.qty}","${item.gtv}","${item.discounts}","${item.net}","${item.share}%"`)
    })
    lines.push(``)
  }

  // 2. TICKET & GATE REPORT
  if (scope === 'all' || activeTab.value === 'tickets') {
    lines.push(`"=== 2. LAPORAN TIKET & VERIFIKASI GATE TURNSTILE ==="`)
    lines.push(`"Total Tiket Diterbitkan","${ticketReportData.value.totalIssued}","Sudah Digunakan (USED)","${ticketReportData.value.used}","Tiket Aktif (ACTIVE)","${ticketReportData.value.active}"`)
    lines.push(`"Kedaluwarsa (EXPIRED)","${ticketReportData.value.expired}","Klaim Free Voucher (PP)","${ticketReportData.value.freeVoucher}"`)
    lines.push(``)
    lines.push(`"ID Tiket / Barcode","Kanal","No Invoice","Nama Pengunjung","No WhatsApp","Tipe Tiket","Tipe Member","Lokasi Gate In","Status Tiket","Waktu Beli","Waktu Scan Gate"`)
    ticketReportData.value.list.forEach(t => {
      lines.push(`"${t.ticketCode}","${t.channel}","${t.invoiceNo}","${t.buyerName}","${t.whatsapp}","${t.ticketType}","${formatMemberType(t.memberType)}","${t.gateLocation}","${t.status}","${t.issuedAt}","${t.scannedAt || '-'}"`)
    })
    lines.push(``)
  }

  // 3. MEMBER & CRM REPORT
  if (scope === 'all' || activeTab.value === 'members') {
    lines.push(`"=== 3. LAPORAN DATABASE MEMBER & CRM WHATSAPP ==="`)
    lines.push(`"Total Basis Data CRM","${memberReportData.value.totalMembers}","Member Reguler (PR 50%)","${memberReportData.value.prCount}","Jamaah Pengajian (PP 25%)","${memberReportData.value.ppCount}","Agen Tour B2B (PT 25%)","${memberReportData.value.ptCount}"`)
    lines.push(``)
    lines.push(`"Nama Member / Kontak","No WhatsApp (PK)","Domisili","Tipe Member","Akumulasi Spend GTV (Rp)","Total Kunjungan","Status Voucher","Sumber Pendaftaran"`)
    memberReportData.value.list.forEach(m => {
      lines.push(`"${m.name}","\t${m.whatsapp}","${m.domisili}","${formatMemberType(m.type)}","${m.totalSpend}","${m.visits} Kali","${m.hasActiveVoucher ? 'Voucher Aktif' : 'Tidak Ada'}","${m.source || 'Membership Online'}"`)
    })
    lines.push(``)
  }

  // 4. DEMOGRAPHIC REPORT
  if (scope === 'all' || activeTab.value === 'demographics') {
    lines.push(`"=== 4. LAPORAN DEMOGRAFI ASAL PENGUNJUNG ==="`)
    lines.push(`"Peringkat","Wilayah Kota / Kabupaten","Kata Kunci Domisili CRM","Kategori Wilayah","Kontak CRM Terdata","Total Pengunjung (Pax)","Total Transaksi GTV (Rp)","Persentase (%)"`)
    demographicTableData.value.forEach((c, idx) => {
      lines.push(`"#${idx + 1}","${c.name}","${c.keyword}","${c.isLocal ? 'Lokal Blitar Raya' : 'Regional Jawa Timur'}","${c.crmCount} Kontak","${c.visitors}","${c.gtv}","${c.percentage}%"`)
    })
    lines.push(``)
  }

  return '\uFEFF' + lines.join('\r\n')
}

const handleExecuteExport = () => {
  isExporting.value = true
  
  const scope = exportScope.value // 'current' or 'all'
  const filename = `LAPORAN_${scope === 'all' ? 'SEMUA_MODUL' : activeTab.value.toUpperCase()}_${new Date().toISOString().slice(0,10)}`

  if (exportFormat.value === 'excel') {
    // Generate native CSV with UTF-8 BOM - 100% compatible with MS Excel without corruption warnings
    const csvContent = generateCsvContent(scope)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    
    isExporting.value = false
    showExportModal.value = false
  } else {
    // Generate PDF (Printable official window)
    const htmlDoc = generateReportHtmlContent(scope)
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.open()
      printWindow.document.write(htmlDoc)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.focus()
        printWindow.print()
      }, 400)
    }
    isExporting.value = false
    showExportModal.value = false
  }
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

const formatMemberType = (code: string): string => {
  const map: Record<string, string> = {
    'PR': 'Pengunjung Reguler',
    'PP': 'Pengunjung Pengajian',
    'PT': 'Pengunjung Tour B2B',
    'NON_MEMBER': 'Buku Tamu / Walk-in'
  }
  return map[code] || code
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
}

.executive-command-header {
  background: transparent;
  padding: 10px 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.brand-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-main-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

.header-meta-clean-line {
  font-size: 14px;
  font-weight: 500;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
}

.controls-hero-col {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-download-report {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid #E2D9CE;
  color: #1F120B;
  padding: 0 16px;
  height: 42px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.btn-download-report:hover {
  background: #FFFDF9;
  border-color: #D97706;
  color: #D97706;
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
  color: #374151;
  font-size: 11.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 12px 16px;
  border-bottom: 1.5px solid #E5E7EB;
  text-align: left;
  white-space: nowrap;
}

.report-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  color: #111827;
  white-space: nowrap;
  vertical-align: middle;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
}

.tag-pr { background-color: #DCE6F5; color: #1A365D; }
.tag-pp { background-color: #FEF08A; color: #422006; }
.tag-pt { background-color: #C4DCFB; color: #1A365D; }

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

.channel-distribution-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 2px;
}

.channel-box {
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #E5E7EB;
}

.channel-box-pos {
  background: #FFFDF9;
  border-color: #FED7AA;
}

.channel-box-self {
  background: #F0F9FF;
  border-color: #BAE6FD;
}

.c-badge {
  font-size: 12.5px;
  font-weight: 800;
  color: #111827;
}

.c-val {
  font-size: 13.5px;
  font-weight: 800;
  color: #111827;
}

.c-val small {
  font-size: 11.5px;
  color: #6B7280;
  font-weight: 600;
}

.channel-pill-tag {
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  white-space: nowrap;
}

.channel-pos {
  background: #FFF7ED;
  color: #C2410C;
  border: 1px solid #FFEDD5;
}

.channel-self {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #DBEAFE;
}

.badge-domisili-tag {
  display: inline-flex;
  align-items: center;
  font-size: 10.5px;
  font-weight: 700;
  color: #1E40AF;
  background: #EFF6FF;
  border: 1px solid #DBEAFE;
  padding: 2px 8px;
  border-radius: 6px;
}

.ticket-filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 1024px) {
  .revenue-kpi-row,
  .ticket-status-grid,
  .channel-distribution-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-grid-row {
    grid-template-columns: 1fr;
  }
}
</style>
