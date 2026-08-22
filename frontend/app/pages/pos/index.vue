<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'pos'
})

// State manajemen untuk fungsionalitas (Siap diintegrasikan dengan API)
const isLoading = ref(true)
const chartMode = ref('Line') // Toggle Bar/Line default ke Line sesuai request
const rekapMode = ref('Semua Loket')

// Data statis untuk grafik
const chartData = ref([
  { time: '08:00', val1: 45, val2: 30 },
  { time: '09:00', val1: 65, val2: 50 },
  { time: '10:00', val1: 90, val2: 85 },
  { time: '11:00', val1: 100, val2: 95 },
  { time: '12:00', val1: 60, val2: 55 },
  { time: '13:00', val1: 75, val2: 70 },
  { time: '14:00', val1: 85, val2: 80 },
])

// Model data yang terstruktur untuk Kasir
const kasirStats = ref({
  saldoTunai: 5250000,
  totalTransaksi: 124,
  tiketTerjual: 350,
  statusShift: 'Aktif'
})

const paymentSummary = ref({
  tunai: { total: 5250000, count: 45 },
  qris: { total: 8400000, count: 56 },
  edc: { total: 4150000, count: 23 },
  totalPendapatan: 17800000
})

const recentTransactions = ref([
  { id: 'TRX-2045', time: '14:02', type: 'Tiket Terusan', qty: 4, total: 300000, payment: 'QRIS', status: 'LUNAS' },
  { id: 'TRX-2044', time: '13:55', type: 'Tiket Reguler', qty: 2, total: 40000, payment: 'Tunai', status: 'LUNAS' },
  { id: 'TRX-2043', time: '13:40', type: 'Golf Car', qty: 1, total: 150000, payment: 'EDC', status: 'LUNAS' },
  { id: 'TRX-2042', time: '13:15', type: 'Tiket Reguler', qty: 5, total: 100000, payment: 'Tunai', status: 'LUNAS' },
  { id: 'TRX-2041', time: '12:50', type: 'Tiket Terusan', qty: 2, total: 150000, payment: 'QRIS', status: 'LUNAS' },
])

const rekapShift = ref({
  kasFisik: 17200000,
  nonTunai: 31550000,
  persenKas: 35,
  persenNonTunai: 65,
  totalTransaksi: 1254,
  paxTerbit: 2450,
  totalOmzet: 48750000
})

// Utility format Rupiah
const formatRp = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}
// Utility format angka ribuan
const formatNum = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 600)
})

const handleCloseShift = () => {
  alert('Modul Rekapitulasi Shift akan dijalankan. Mengirim data ke server...')
}
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-text">
        <h1 class="page-title">Dashboard Kasir</h1>
        <p class="page-subtitle">Terhubung secara live dengan server. Shift saat ini: <strong>19 Agustus 2026</strong></p>
      </div>
      <button class="btn-tutup-shift" @click="handleCloseShift">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Tutup Shift & Cetak Rekap
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      Memuat data dari server...
    </div>

    <div v-else>
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #FEF3C7;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">SALDO KAS LACI (TUNAI)</span>
            <h3 class="stat-value">{{ formatRp(kasirStats.saldoTunai) }}</h3>
          </div>
        </div>
        
        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #FFEDD5;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL TRANSAKSI</span>
            <h3 class="stat-value">{{ kasirStats.totalTransaksi }} Struk</h3>
          </div>
        </div>

        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #D1FAE5;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TIKET TERJUAL</span>
            <h3 class="stat-value">{{ kasirStats.tiketTerjual }} Pax</h3>
          </div>
        </div>

        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #F3F4F6;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">STATUS SHIFT</span>
            <h3 class="stat-value" style="color: #10B981;">{{ kasirStats.statusShift }}</h3>
          </div>
        </div>
      </div>

      <!-- Main Content Area: Chart (Left) & Payment Summary (Right) -->
      <div class="content-grid">
        
        <!-- Left: Chart (Gaya CRM) -->
        <div class="elegant-widget">
          <div class="widget-header">
            <div>
              <h3 class="widget-title">Aktivitas Transaksi per Jam</h3>
              <p class="widget-subtitle">Hari Ini: Distribusi fluktuasi omzet dan volume tiket di kasir Anda.</p>
            </div>
            <div class="toggle-pill">
              <div class="toggle-option" :class="{active: chartMode==='Bar'}" @click="chartMode='Bar'">Bar</div>
              <div class="toggle-option" :class="{active: chartMode==='Line'}" @click="chartMode='Line'">Line</div>
            </div>
          </div>
          
          <div class="widget-body" style="padding-bottom: 24px;">
            <div class="mock-chart-advanced">
              <!-- Y Axis -->
              <div class="y-axis">
                <span>Rp 9 Jt</span><span>Rp 7 Jt</span><span>Rp 5 Jt</span><span>Rp 3 Jt</span><span>Rp 1 Jt</span><span>Rp 0</span>
              </div>
              
              <!-- Bars Area -->
              <div v-if="chartMode === 'Bar'" class="chart-bars">
                <!-- Grid Lines -->
                <div class="grid-lines">
                  <div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div>
                </div>
                
                <!-- Static Rendered Bars -->
                <div class="bar-group" v-for="item in chartData" :key="item.time">
                  <div class="double-bar">
                    <div class="bar-1" :style="{height: item.val1 + '%'}"></div>
                    <div class="bar-2" :style="{height: item.val2 + '%'}"></div>
                  </div>
                  <span class="x-label">{{ item.time }}</span>
                </div>
              </div>

              <!-- Smooth Line Area -->
              <div v-else class="chart-bars" style="position: relative;">
                <!-- Grid Lines -->
                <div class="grid-lines">
                  <div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div>
                </div>

                <!-- SVG Area & Smooth Line -->
                <svg preserveAspectRatio="none" viewBox="0 0 100 100" style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 24px); z-index: 1;">
                  <defs>
                    <linearGradient id="areaOrange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.3" />
                      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M7.1,55 C12,55 16,35 21.4,35 C26,35 30,10 35.7,10 C41,10 45,0 50,0 C55,0 59,40 64.3,40 C69,40 73,25 78.6,25 C84,25 88,15 92.9,15 L92.9,100 L7.1,100 Z" fill="url(#areaOrange)" />
                  <path d="M7.1,70 C12,70 16,50 21.4,50 C26,50 30,15 35.7,15 C41,15 45,5 50,5 C55,5 59,45 64.3,45 C69,45 73,30 78.6,30 C84,30 88,20 92.9,20" fill="none" stroke="#451A03" stroke-width="2" vector-effect="non-scaling-stroke" />
                  <path d="M7.1,55 C12,55 16,35 21.4,35 C26,35 30,10 35.7,10 C41,10 45,0 50,0 C55,0 59,40 64.3,40 C69,40 73,25 78.6,25 C84,25 88,15 92.9,15" fill="none" stroke="#F59E0B" stroke-width="3" vector-effect="non-scaling-stroke" />
                </svg>

                <!-- HTML Divs for Dots -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 24px); z-index: 2;">
                  <div class="dot-brown" style="left: 7.1%; top: 70%;"></div>
                  <div class="dot-brown" style="left: 21.4%; top: 50%;"></div>
                  <div class="dot-brown" style="left: 35.7%; top: 15%;"></div>
                  <div class="dot-brown" style="left: 50%; top: 5%;"></div>
                  <div class="dot-brown" style="left: 64.3%; top: 45%;"></div>
                  <div class="dot-brown" style="left: 78.6%; top: 30%;"></div>
                  <div class="dot-brown" style="left: 92.9%; top: 20%;"></div>

                  <div class="dot-orange" style="left: 7.1%; top: 55%;"></div>
                  <div class="dot-orange" style="left: 21.4%; top: 35%;"></div>
                  <div class="dot-orange" style="left: 35.7%; top: 10%;"></div>
                  <div class="dot-orange" style="left: 50%; top: 0%;"></div>
                  <div class="dot-orange" style="left: 64.3%; top: 40%;"></div>
                  <div class="dot-orange" style="left: 78.6%; top: 25%;"></div>
                  <div class="dot-orange" style="left: 92.9%; top: 15%;"></div>
                </div>

                <div class="bar-group" v-for="item in chartData" :key="'line'+item.time">
                  <div class="double-bar"><div class="bar-1" style="height:0"></div></div>
                  <span class="x-label">{{ item.time }}</span>
                </div>
              </div>
            </div>

            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-box" style="background-color: #F59E0B;"></span>
                <span class="legend-text">Pendapatan (Rupiah)</span>
              </div>
              <div class="legend-item">
                <span class="legend-box" style="background-color: #451A03;"></span>
                <span class="legend-text">Tiket Terjual (Volume)</span>
              </div>
            </div>

            <!-- 3 Mini Cards Explanations Below Chart -->
            <div class="mini-cards-row">
              <div class="mini-card">
                <div class="mc-icon tunai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Rata-rata Transaksi</span>
                  <strong class="mc-val tunai-val">Rp 20.000 / tiket</strong>
                </div>
              </div>
              
              <div class="mini-card">
                <div class="mc-icon qris"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Jam Kunjungan Teramai</span>
                  <strong class="mc-val">10:00 - 14:00 WIB</strong>
                </div>
              </div>
              
              <div class="mini-card">
                <div class="mc-icon edc"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Konversi Gate Check-in</span>
                  <strong class="mc-val success-val">89.0% Pax Tervalidasi</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Ringkasan Omzet -->
        <div class="elegant-widget">
          <div class="widget-header">
            <h3 class="widget-title">Ringkasan Shift Anda</h3>
          </div>
          <div class="widget-body summary-body">
            
            <div class="summary-list">
              <div class="summary-item">
                <div class="sum-left">
                  <div class="sum-icon" style="background:#FEF3C7; color:#D97706;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  </div>
                  <div class="sum-text">
                    <span class="sum-name">Tunai</span>
                    <span class="sum-count">{{ paymentSummary.tunai.count }} Transaksi</span>
                  </div>
                </div>
                <strong class="sum-val">{{ formatRp(paymentSummary.tunai.total) }}</strong>
              </div>

              <div class="summary-item">
                <div class="sum-left">
                  <div class="sum-icon" style="background:#F3F4F6; color:#4B5563;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                  </div>
                  <div class="sum-text">
                    <span class="sum-name">QRIS</span>
                    <span class="sum-count">{{ paymentSummary.qris.count }} Transaksi</span>
                  </div>
                </div>
                <strong class="sum-val">{{ formatRp(paymentSummary.qris.total) }}</strong>
              </div>

              <div class="summary-item">
                <div class="sum-left">
                  <div class="sum-icon" style="background:#DBEAFE; color:#1D4ED8;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  </div>
                  <div class="sum-text">
                    <span class="sum-name">EDC / Kartu</span>
                    <span class="sum-count">{{ paymentSummary.edc.count }} Transaksi</span>
                  </div>
                </div>
                <strong class="sum-val">{{ formatRp(paymentSummary.edc.total) }}</strong>
              </div>
            </div>

            <div class="summary-total-box">
              <span class="total-label">TOTAL PENDAPATAN</span>
              <h2 class="total-h2">{{ formatRp(paymentSummary.totalPendapatan) }}</h2>
            </div>
            
          </div>
        </div>

      </div>

      <!-- Bottom Layout: Table (Left) + Rekapitulasi Shift (Right) -->
      <div class="bottom-grid">
        
        <!-- Bottom Left: Transactions Table -->
        <div class="elegant-widget">
          <div class="widget-header" style="padding-bottom: 16px;">
            <h3 class="widget-title">Riwayat Transaksi (Terbaru)</h3>
            <button class="btn-link">Lihat Semua</button>
          </div>
          <div class="widget-body" style="padding: 0;">
            <table class="simple-table">
              <thead>
                <tr>
                  <th>WAKTU</th>
                  <th>TIPE</th>
                  <th>QTY</th>
                  <th>METODE</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trx in recentTransactions" :key="trx.id">
                  <td class="td-time">{{ trx.time }} AM</td>
                  <td class="td-type">{{ trx.type }}</td>
                  <td class="td-qty">{{ trx.qty }}</td>
                  <td class="td-method">{{ trx.payment }}</td>
                  <td class="td-total">{{ formatRp(trx.total) }}</td>
                  <td>
                    <span class="status-badge success">{{ trx.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Bottom Right: Rekapitulasi Shift Kasir (Berdasarkan Screenshot) -->
        <div class="elegant-widget widget-rekap">
          <div class="widget-header align-start">
            <div class="wh-left">
              <div class="wh-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              </div>
              <div>
                <h3 class="widget-title">Rekapitulasi Shift Kasir</h3>
                <p class="widget-subtitle">Monitoring aliran kas & validasi sistem</p>
              </div>
            </div>
            <div class="toggle-pill compact-pill">
              <div class="toggle-option" :class="{active: rekapMode === 'Semua Loket'}" @click="rekapMode = 'Semua Loket'">Semua Loket</div>
              <div class="toggle-option" :class="{active: rekapMode === 'Utama'}" @click="rekapMode = 'Utama'">Utama</div>
            </div>
          </div>
          
          <div class="widget-body rekap-body">
            
            <!-- Loket Status -->
            <div class="loket-card">
              <div class="lk-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div class="lk-text">
                <h4 class="lk-title">Semua Loket (1 Utama + 3 Wahana)</h4>
                <p class="lk-sub">Sesi Aktif: 08:00 - 17:00 WIB</p>
              </div>
            </div>

            <!-- Split Cards: Tunai vs Digital -->
            <div class="recap-2col">
              <div class="rc-card">
                <div class="rc-head">
                  <span class="rc-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" style="margin-right:4px;vertical-align:-2px;"><rect x="2" y="5" width="20" height="14" rx="2"></rect><circle cx="12" cy="12" r="3"></circle></svg> Kas Fisik (Tunai)</span>
                  <span class="badge badge-yellow">{{ rekapShift.persenKas }}%</span>
                </div>
                <h2 class="rc-val">Rp {{ formatNum(rekapShift.kasFisik) }}</h2>
                <div class="rc-progress"><div class="rc-fill bg-orange" :style="{width: rekapShift.persenKas + '%'}"></div></div>
                <p class="rc-desc">Uang tunai dalam laci kasir</p>
              </div>
              
              <div class="rc-card">
                <div class="rc-head">
                  <span class="rc-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" style="margin-right:4px;vertical-align:-2px;"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg> Non-Tunai (Digital)</span>
                  <span class="badge badge-gray">{{ rekapShift.persenNonTunai }}%</span>
                </div>
                <h2 class="rc-val">Rp {{ formatNum(rekapShift.nonTunai) }}</h2>
                <div class="rc-progress"><div class="rc-fill bg-brown" :style="{width: rekapShift.persenNonTunai + '%'}"></div></div>
                <p class="rc-desc">QRIS & EDC Mesin tervalidasi</p>
              </div>
            </div>

            <!-- Stats (Transaksi & Pax) -->
            <div class="rc-stats-card">
              <div class="rc-stat">
                <h3>{{ formatNum(rekapShift.totalTransaksi) }}</h3>
                <span>TRANSAKSI</span>
              </div>
              <div class="rc-divider"></div>
              <div class="rc-stat">
                <h3 class="text-orange">{{ formatNum(rekapShift.paxTerbit) }}</h3>
                <span>PAX TERBIT</span>
              </div>
            </div>

            <!-- Dark Banner -->
            <div class="rc-dark-banner">
              <div>
                <h4 class="banner-title">Total Omzet Keseluruhan</h4>
                <p class="banner-sub">Gabungan 4 Loket</p>
              </div>
              <h2 class="banner-total">{{ formatRp(rekapShift.totalOmzet) }}</h2>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  background-color: #F8F9FA;
  padding: 30px 40px 100px 40px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  overflow-y: auto;
  height: calc(100vh - 60px);
  box-sizing: border-box;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #6B7280;
  margin: 0;
}

.btn-tutup-shift {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #111827;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-tutup-shift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.loading-state {
  text-align: center;
  padding: 100px;
  color: #6B7280;
  font-weight: 600;
}

/* 1. Top Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.elegant-stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(229, 231, 235, 0.6);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.stat-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

/* 2. Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.5fr 1.3fr;
  gap: 24px;
  margin-top: 24px;
}

.elegant-widget {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(229, 231, 235, 0.6);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
}

/* 3. Headers */
.widget-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.widget-header.align-start {
  align-items: center;
}

.wh-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wh-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #FCD34D;
  background: #FFFBEB;
  display: flex;
  align-items: center;
  justify-content: center;
}

.widget-title {
  font-size: 17px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px 0;
}

.widget-subtitle {
  font-size: 13px;
  color: #6B7280;
  margin: 0;
  font-weight: 500;
}

.toggle-pill {
  display: flex;
  background: #F3F4F6;
  border-radius: 8px;
  padding: 4px;
}
.compact-pill {
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: #ffffff;
}

.toggle-option {
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  color: #6B7280;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.toggle-option.active {
  background: #111827;
  color: #ffffff;
}
.compact-pill .toggle-option.active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.btn-link {
  background: none;
  border: none;
  color: #F59E0B;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.widget-body {
  padding: 0 24px 24px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Chart Styles */
.mock-chart-advanced {
  display: flex;
  height: 250px;
  margin-top: 10px;
  position: relative;
}
.y-axis { display: flex; flex-direction: column; justify-content: space-between; padding-bottom: 24px; padding-right: 16px; height: 100%; }
.y-axis span { font-size: 11px; color: #9CA3AF; font-weight: 600; }
.chart-bars { flex: 1; position: relative; display: flex; justify-content: space-around; padding-bottom: 24px; }
.grid-lines { position: absolute; top: 0; left: 0; right: 0; bottom: 24px; display: flex; flex-direction: column; justify-content: space-between; z-index: 0; }
.g-line { border-top: 1px dashed #E5E7EB; width: 100%; }
.bar-group { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; }
.double-bar { display: flex; align-items: flex-end; gap: 2px; height: 100%; width: 32px; }
.bar-1 { flex: 1; background-color: #F59E0B; border-radius: 2px 2px 0 0; transition: height 0.5s ease; }
.bar-2 { flex: 1; background-color: #451A03; border-radius: 2px 2px 0 0; transition: height 0.5s ease; }
.x-label { position: absolute; bottom: -24px; font-size: 11px; color: #6B7280; font-weight: 600; }

.dot-brown { position: absolute; width: 9px; height: 9px; background-color: #451A03; border: 1.5px solid #ffffff; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 10; }
.dot-orange { position: absolute; width: 12px; height: 12px; background-color: #ffffff; border: 3px solid #F59E0B; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2); z-index: 11; }

.chart-legend { display: flex; align-items: center; gap: 24px; margin-top: 24px; padding-top: 16px; border-top: 1px dashed #E5E7EB; }
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-box { width: 12px; height: 12px; border-radius: 3px; }
.legend-text { font-size: 12px; font-weight: 600; color: #4B5563; }

.mini-cards-row { display: flex; gap: 16px; margin-top: 16px; }
.mini-card { flex: 1; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 12px; }
.mc-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.mc-icon.tunai { background: #FEF3C7; }
.mc-icon.qris { background: #F3F4F6; }
.mc-icon.edc { background: #D1FAE5; }
.mc-text { display: flex; flex-direction: column; gap: 4px; }
.mc-title { font-size: 12px; color: #6B7280; font-weight: 600; }
.mc-val { font-size: 13.5px; font-weight: 800; color: #111827; }
.mc-val.tunai-val { color: #D97706; }
.mc-val.success-val { color: #059669; }

/* Summary Right Column */
.summary-body { display: flex; flex-direction: column; justify-content: space-between; }
.summary-list { display: flex; flex-direction: column; gap: 20px; margin-top: 10px; }
.summary-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px dashed #E5E7EB; }
.summary-item:last-child { border-bottom: none; }
.sum-left { display: flex; align-items: center; gap: 12px; }
.sum-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.sum-text { display: flex; flex-direction: column; }
.sum-name { font-size: 14px; font-weight: 700; color: #111827; }
.sum-count { font-size: 12px; color: #6B7280; }
.sum-val { font-size: 15px; font-weight: 800; color: #111827; }
.summary-total-box { background: #FFFBEB; border: 1px solid #FEF3C7; border-radius: 12px; padding: 20px; text-align: center; margin-top: 20px; }
.total-label { font-size: 12px; font-weight: 700; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
.total-h2 { font-size: 26px; font-weight: 900; color: #78350F; margin: 0; }

/* Table */
.simple-table { width: 100%; border-collapse: collapse; }
.simple-table th { text-align: left; padding: 16px 24px; font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #E5E7EB; background: #F9FAFB; }
.simple-table td { padding: 16px 24px; border-bottom: 1px solid #F3F4F6; }
.simple-table tbody tr:hover { background: #F9FAFB; }
.simple-table tbody tr:last-child td { border-bottom: none; }
.td-time { font-size: 13px; color: #4B5563; font-weight: 500; }
.td-type { font-size: 13.5px; color: #111827; font-weight: 700; }
.td-qty { font-size: 13.5px; color: #4B5563; }
.td-method { font-size: 13.5px; font-weight: 600; color: #6B7280; }
.td-total { font-size: 14px; font-weight: 800; color: #111827; }
.status-badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; }
.status-badge.success { background: #D1FAE5; color: #059669; }

/* --- NEW: REKAPITULASI SHIFT KASIR --- */
.rekap-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loket-card {
  background: #F9FAFB;
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.lk-icon {
  width: 44px;
  height: 44px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E7EB;
}
.lk-text {
  display: flex;
  flex-direction: column;
}
.lk-title { margin: 0; font-size: 15px; font-weight: 800; color: #111827; }
.lk-sub { margin: 4px 0 0 0; font-size: 13px; color: #6B7280; font-weight: 500; }

.recap-2col {
  display: flex;
  gap: 16px;
}
.rc-card {
  flex: 1;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  background: #ffffff;
}
.rc-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.rc-label {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}
.badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
}
.badge-yellow { background: #FEF3C7; color: #B45309; }
.badge-gray { background: #F3F4F6; color: #4B5563; }

.rc-val {
  font-size: 22px;
  font-weight: 900;
  color: #111827;
  margin: 0 0 16px 0;
  letter-spacing: -0.5px;
}
.rc-progress {
  height: 6px;
  background: #F3F4F6;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 12px;
}
.rc-fill {
  height: 100%;
  border-radius: 10px;
}
.bg-orange { background: #F59E0B; }
.bg-brown { background: #78350F; }

.rc-desc {
  margin: 0;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
}

.rc-stats-card {
  display: flex;
  background: #F9FAFB;
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  padding: 20px;
  align-items: center;
}
.rc-stat {
  flex: 1;
  text-align: center;
}
.rc-stat h3 {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 900;
  color: #111827;
}
.rc-stat h3.text-orange {
  color: #D97706;
}
.rc-stat span {
  font-size: 12px;
  font-weight: 700;
  color: #6B7280;
  letter-spacing: 0.5px;
}
.rc-divider {
  width: 1px;
  height: 40px;
  background: #E5E7EB;
}

.rc-dark-banner {
  background: #111827;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  margin-top: 4px;
}
.banner-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #9CA3AF;
}
.banner-sub {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #6B7280;
}
.banner-total {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  color: #F59E0B;
}
</style>
