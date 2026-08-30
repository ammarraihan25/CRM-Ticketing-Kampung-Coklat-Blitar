<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePosTransactions } from '~/composables/usePosTransactions'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'pos'
})

const {
  transactions: recentTransactions,
  kasirProfile,
  totalTransaksi,
  tiketTerjual,
  paymentSummary,
  saldoKasLaci,
  categoryDistribution,
  hourlyChartData,
  rataRataPerStruk,
  jamKunjunganTeramai,
  addCashFlow,
  resetShift
} = usePosTransactions()

// State manajemen untuk UI Dashboard Kasir
const isLoading = ref(true)
const chartMode = ref<'Line' | 'Bar'>('Line')
const rekapMode = ref('Semua Loket')
const activeTrxFilter = ref('Semua')
const searchTrx = ref('')
const hoveredHour = ref<any>(null)

// Modal States
const showCloseShiftModal = ref(false)
const showReceiptModal = ref(false)
const showPdfReportModal = ref(false)
const selectedReceipt = ref<any>(null)

// Closing Shift Form
const initialFloat = ref<number>(500000)
const countedCash = ref<number>(saldoKasLaci.value + initialFloat.value)

// Dynamic Y Axis labels based on actual maximum hourly revenue
const yAxisLabels = computed(() => {
  const maxRev = Math.max(...hourlyChartData.value.map(h => h.revenue), 1000000)
  const step = maxRev / 5
  return [
    formatRp(maxRev),
    formatRp(Math.round(step * 4)),
    formatRp(Math.round(step * 3)),
    formatRp(Math.round(step * 2)),
    formatRp(Math.round(step * 1)),
    'Rp 0'
  ]
})

// Dynamic SVG Line Points & Paths
const linePointsRevenue = computed(() => {
  const data = hourlyChartData.value
  if (!data || data.length === 0) return []
  return data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = Math.max(5, Math.min(95, 100 - item.val1))
    return { x, y, item }
  })
})

const linePointsPax = computed(() => {
  const data = hourlyChartData.value
  if (!data || data.length === 0) return []
  return data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = Math.max(5, Math.min(95, 100 - item.val2))
    return { x, y, item }
  })
})

const svgPathRevenue = computed(() => {
  const pts = linePointsRevenue.value
  if (pts.length === 0) return ''
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cx = ((prev.x + curr.x) / 2).toFixed(1)
    d += ` C${cx},${prev.y.toFixed(1)} ${cx},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`
  }
  return d
})

const svgAreaRevenue = computed(() => {
  const pts = linePointsRevenue.value
  if (pts.length === 0) return ''
  const lineD = svgPathRevenue.value
  return `${lineD} L${pts[pts.length - 1].x.toFixed(1)},100 L${pts[0].x.toFixed(1)},100 Z`
})

const svgPathPax = computed(() => {
  const pts = linePointsPax.value
  if (pts.length === 0) return ''
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cx = ((prev.x + curr.x) / 2).toFixed(1)
    d += ` C${cx},${prev.y.toFixed(1)} ${cx},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`
  }
  return d
})

// Filtered Live Transactions
const filteredTransactions = computed(() => {
  return recentTransactions.value.filter(t => {
    const matchCategory = activeTrxFilter.value === 'Semua' || t.category === activeTrxFilter.value
    const matchSearch = !searchTrx.value || 
      t.id.toLowerCase().includes(searchTrx.value.toLowerCase()) || 
      t.customer.toLowerCase().includes(searchTrx.value.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTrx.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const rekapShift = computed(() => {
  const kasFisik = saldoKasLaci.value + initialFloat.value
  const nonTunai = paymentSummary.value.qris.total + paymentSummary.value.edc.total
  const totalOmzet = paymentSummary.value.totalPendapatan
  const persenKas = totalOmzet > 0 ? Math.round((saldoKasLaci.value / totalOmzet) * 100) : 50
  const persenNonTunai = 100 - persenKas

  return {
    kasFisik,
    nonTunai,
    persenKas,
    persenNonTunai,
    totalTransaksi: totalTransaksi.value,
    paxTerbit: tiketTerjual.value,
    totalOmzet
  }
})

// Utility format Rupiah
const formatRp = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value || 0)
}

// Utility format angka ribuan
const formatNum = (value: number) => {
  return new Intl.NumberFormat('id-ID').format(value || 0)
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

// Handlers
const handleOpenReceipt = (trx: any) => {
  selectedReceipt.value = trx
  showReceiptModal.value = true
}

const handlePrintReceipt = () => {
  const receiptEl = document.getElementById('printable-thermal-receipt')
  if (!receiptEl) {
    window.print()
    return
  }
  const printWin = window.open('', '_blank', 'width=420,height=600')
  if (!printWin) {
    window.print()
    return
  }
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Struk_${selectedReceipt.value?.id || 'POS'}</title>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Courier New', monospace; padding: 10px; margin: 0; color: #000; }
          .receipt-paper { width: 100%; max-width: 300px; margin: 0 auto; }
          .receipt-header { text-align: center; }
          .rh-brand { font-size: 15px; font-weight: bold; margin: 0; }
          .rh-address { font-size: 10px; margin: 2px 0; }
          .rh-divider { margin: 6px 0; text-align: center; }
          .rm-row, .ri-bottom, .rt-row { display: flex; justify-content: space-between; font-size: 11px; margin: 2px 0; }
          .ri-top { font-weight: bold; font-size: 11px; margin-top: 4px; }
          .rt-row strong { font-size: 13px; }
          .receipt-footer { text-align: center; margin-top: 8px; font-size: 10px; }
          .barcode-line { letter-spacing: 2px; }
          @page { size: auto; margin: 4mm; }
        </style>
      </head>
      <body>
        <div class="receipt-paper">${receiptEl.innerHTML}</div>
      </body>
    </html>
  `)
  printWin.document.close()
  printWin.focus()
  setTimeout(() => {
    printWin.print()
    printWin.close()
  }, 300)
}

const handlePrintPdfReport = () => {
  const reportEl = document.getElementById('printable-pos-report')
  if (!reportEl) {
    window.print()
    return
  }
  const printWin = window.open('', '_blank', 'width=1000,height=800')
  if (!printWin) {
    window.print()
    return
  }
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Laporan_Shift_Kasir_${kasirProfile.value.shiftDate.replace(/\\s+/g, '_')}</title>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: 'Plus Jakarta Sans', Arial, sans-serif; 
            margin: 0; 
            padding: 20px 24px; 
            color: #1e293b; 
            background: #fff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .doc-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
          .doc-brand { display: flex; align-items: center; gap: 12px; }
          .brand-logo { font-size: 32px; }
          .doc-company { font-size: 17px; font-weight: 800; color: #451a03; margin: 0 0 3px 0; }
          .doc-address { font-size: 11px; color: #64748b; margin: 0 0 2px 0; }
          .doc-contact { font-size: 10.5px; color: #94a3b8; margin: 0; }
          .doc-badge-status { text-align: right; }
          .doc-title-badge { background: #fef3c7; color: #b45309; font-size: 11.5px; font-weight: 800; padding: 5px 10px; border-radius: 6px; border: 1px solid #fde68a; display: inline-block; margin-bottom: 4px; }
          .doc-docnum { font-size: 10px; color: #64748b; font-family: monospace; display: block; }
          .doc-divider-thick { border: none; border-top: 2px solid #cbd5e1; margin: 12px 0 16px 0; }
          .doc-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px; }
          .meta-item { display: flex; flex-direction: column; gap: 2px; }
          .meta-lbl { font-size: 9.5px; font-weight: 700; color: #64748b; text-transform: uppercase; }
          .meta-val { font-size: 11px; font-weight: 700; color: #0f172a; }
          .text-green { color: #059669; }
          .doc-summary-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
          .dsc-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; }
          .dsc-box.primary { background: #fffbeb; border-color: #fcd34d; }
          .dsc-lbl { font-size: 9.5px; font-weight: 700; color: #64748b; text-transform: uppercase; }
          .dsc-val { font-size: 15px; font-weight: 800; color: #0f172a; margin: 3px 0 1px 0; }
          .dsc-box.primary .dsc-val { color: #b45309; }
          .dsc-sub { font-size: 9px; color: #94a3b8; }
          .doc-2col-tables { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
          .dt-title { font-size: 11.5px; font-weight: 800; color: #334155; margin: 0 0 6px 0; }
          table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
          th { background: #f1f5f9; color: #475569; font-weight: 700; padding: 6px 8px; text-align: left; border: 1px solid #cbd5e1; }
          td { padding: 6px 8px; border: 1px solid #e2e8f0; color: #334155; }
          tfoot th { background: #f8fafc; color: #0f172a; font-weight: 800; padding: 8px; }
          .report-badge { background: #eff6ff; color: #1d4ed8; font-size: 9.5px; font-weight: 700; padding: 2px 5px; border-radius: 4px; }
          .doc-signatures { display: flex; justify-content: space-around; margin-top: 24px; padding-top: 12px; border-top: 1px dashed #cbd5e1; page-break-inside: avoid; }
          .sig-col { text-align: center; font-size: 11px; color: #475569; }
          .sig-space { height: 45px; }
          .sig-col strong { font-size: 11.5px; color: #0f172a; display: block; }
          .sig-col span { font-size: 9.5px; color: #94a3b8; }
          @page { size: portrait; margin: 10mm; }
        </style>
      </head>
      <body>
        ${reportEl.innerHTML}
      </body>
    </html>
  `)
  printWin.document.close()
  printWin.focus()
  setTimeout(() => {
    printWin.print()
    printWin.close()
  }, 350)
}

const handleOpenCloseShift = () => {
  countedCash.value = saldoKasLaci.value + initialFloat.value
  showCloseShiftModal.value = true
}

const handleConfirmCloseShift = () => {
  alert('Shift kasir berhasil ditutup dan struk rekapitulasi shift dikirim ke printer thermal!')
  resetShift()
  showCloseShiftModal.value = false
}
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- Header -->
    <div class="dashboard-header">
      <div class="header-text">
        <h1 class="page-title">Dashboard Kasir</h1>
        <p class="page-subtitle">Terhubung secara live dengan server. Shift saat ini: <strong>{{ kasirProfile.shiftDate }}</strong> (Mulai {{ kasirProfile.shiftStart }})</p>
      </div>
      <div class="header-actions">
        <button class="btn-download-pdf" @click="showPdfReportModal = true" title="Download / Cetak Rekap Laporan Penjualan Shift (PDF)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Download Laporan PDF
        </button>
        <button class="btn-tutup-shift" @click="handleOpenCloseShift">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Tutup Shift & Cetak Rekap
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Memuat sinkronisasi data kasir & transaksi...</p>
    </div>

    <div v-else>
      <!-- Stats Grid (4 Cards sesuai screenshot) -->
      <div class="stats-grid">
        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #FEF3C7;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL PENDAPATAN</span>
            <h3 class="stat-value">{{ formatRp(paymentSummary.totalPendapatan) }}</h3>
          </div>
        </div>
        
        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #FFEDD5;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL TRANSAKSI</span>
            <h3 class="stat-value">{{ totalTransaksi }} Struk</h3>
          </div>
        </div>

        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #D1FAE5;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TIKET TERJUAL</span>
            <h3 class="stat-value">{{ tiketTerjual }} Pax</h3>
          </div>
        </div>

        <div class="elegant-stat-card">
          <div class="stat-icon-box" style="background-color: #F3F4F6;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">STATUS SHIFT</span>
            <div class="status-shift-wrapper">
              <span class="pulse-indicator"></span>
              <h3 class="stat-value" style="color: #10B981;">{{ kasirProfile.statusShift }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area: Chart (Left) & Payment Summary (Right) -->
      <div class="content-grid">
        
        <!-- Left: Chart (Gaya CRM / Interactive) -->
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
                <span v-for="lbl in yAxisLabels" :key="lbl">{{ lbl }}</span>
              </div>
              
              <!-- Bars Area -->
              <div v-if="chartMode === 'Bar'" class="chart-bars">
                <!-- Grid Lines -->
                <div class="grid-lines">
                  <div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div><div class="g-line"></div>
                </div>
                
                <!-- Dynamic Rendered Bars -->
                <div 
                  class="bar-group" 
                  v-for="item in hourlyChartData" 
                  :key="item.time"
                  @mouseenter="hoveredHour = item"
                  @mouseleave="hoveredHour = null"
                >
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
                  
                  <path :d="svgAreaRevenue" fill="url(#areaOrange)" />
                  <path :d="svgPathPax" fill="none" stroke="#451A03" stroke-width="2.5" vector-effect="non-scaling-stroke" />
                  <path :d="svgPathRevenue" fill="none" stroke="#F59E0B" stroke-width="3" vector-effect="non-scaling-stroke" />
                </svg>

                <!-- Dynamic HTML Divs for Dots with hover interaction -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: calc(100% - 24px); z-index: 2;">
                  <div 
                    v-for="(pt, idx) in linePointsPax" 
                    :key="'dot-pax-'+idx"
                    class="dot-brown" 
                    :style="{ left: pt.x + '%', top: pt.y + '%' }"
                  ></div>

                  <div 
                    v-for="(pt, idx) in linePointsRevenue" 
                    :key="'dot-rev-'+idx"
                    class="dot-orange" 
                    :style="{ left: pt.x + '%', top: pt.y + '%' }"
                  ></div>
                </div>

                <div 
                  class="bar-group" 
                  v-for="item in hourlyChartData" 
                  :key="'line'+item.time"
                  @mouseenter="hoveredHour = item"
                  @mouseleave="hoveredHour = null"
                >
                  <div class="double-bar"><div class="bar-1" style="height:0"></div></div>
                  <span class="x-label">{{ item.time }}</span>
                </div>
              </div>
            </div>

            <!-- Hovered Hour Tooltip Info Banner -->
            <div class="hover-info-banner" v-if="hoveredHour">
              <span>🕒 Jam <strong>{{ hoveredHour.time }} WIB</strong>:</span>
              <span>Omzet: <strong>{{ formatRp(hoveredHour.revenue) }}</strong></span>
              <span>Volume: <strong>{{ hoveredHour.pax }} Tiket/Pax</strong></span>
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

            <!-- 3 Mini Cards Explanations Below Chart (Dynamically Synced!) -->
            <div class="mini-cards-row">
              <div class="mini-card">
                <div class="mc-icon tunai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Rata-rata per Struk</span>
                  <strong class="mc-val tunai-val">{{ formatRp(rataRataPerStruk) }} / trx</strong>
                </div>
              </div>
              
              <div class="mini-card">
                <div class="mc-icon qris"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Jam Kunjungan Teramai</span>
                  <strong class="mc-val">{{ jamKunjunganTeramai }}</strong>
                </div>
              </div>
              
              <div class="mini-card">
                <div class="mc-icon edc"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
                <div class="mc-text">
                  <span class="mc-title">Kecepatan Struk POS</span>
                  <strong class="mc-val success-val">⚡ 1.8 dtk / struk</strong>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Ringkasan Shift Anda -->
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

            <!-- Breakdown Per Kategori Tiket di Bawah Total -->
            <div class="category-breakdown-box">
              <span class="cbb-title">Distribusi Kategori Layanan:</span>
              <div class="cbb-list">
                <div v-for="cat in categoryDistribution" :key="cat.name" class="cbb-item">
                  <div class="cbb-top">
                    <span class="cbb-name">{{ cat.name }}</span>
                    <span class="cbb-val">{{ formatRp(cat.revenue) }} ({{ cat.percentage }}%)</span>
                  </div>
                  <div class="cbb-bar-bg">
                    <div class="cbb-bar-fill" :style="{ width: cat.percentage + '%', backgroundColor: cat.color }"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      <!-- Bottom Layout: Live Feed Transactions (Left) + Rekapitulasi Shift (Right) -->
      <div class="bottom-grid">
        
        <!-- Bottom Left: Live Activity Feed Transactions Table -->
        <div class="elegant-widget">
          <div class="widget-header table-header-flex">
            <div>
              <h3 class="widget-title">Aktivitas Transaksi Kasir (Live Feed)</h3>
              <p class="widget-subtitle">Daftar struk tiket yang baru diterbitkan kasir ini</p>
            </div>
            <div class="table-tools">
              <div class="filter-pills-row">
                <button 
                  v-for="flt in ['Semua', 'Tiket Masuk', 'Wahana', 'Sewa Hall', 'Edukasi']" 
                  :key="flt"
                  class="flt-btn"
                  :class="{ active: activeTrxFilter === flt }"
                  @click="activeTrxFilter = flt"
                >
                  {{ flt }}
                </button>
              </div>
              <div class="search-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" v-model="searchTrx" placeholder="Cari struk / nama..." />
              </div>
            </div>
          </div>
          
          <div class="widget-body" style="padding: 0; flex: 1; min-height: 0; display: flex; flex-direction: column;">
            <div class="table-scroll-container">
              <table class="simple-table">
                <thead>
                  <tr>
                    <th>NO. STRUK</th>
                    <th>WAKTU</th>
                    <th>PRODUK / LAYANAN</th>
                    <th>CUSTOMER</th>
                    <th>QTY</th>
                    <th>METODE</th>
                    <th>TOTAL</th>
                    <th>STATUS</th>
                    <th style="text-align:center;">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="trx in filteredTransactions" :key="trx.id">
                    <td class="td-id">
                      <strong>{{ trx.id }}</strong>
                    </td>
                    <td class="td-time">{{ trx.time }} WIB</td>
                    <td class="td-type">
                      <span class="td-prod-title">{{ trx.type }}</span>
                      <span class="td-prod-cat">{{ trx.category }}</span>
                    </td>
                    <td class="td-customer">{{ trx.customer }}</td>
                    <td class="td-qty">{{ trx.qty }} pax</td>
                    <td class="td-method">
                      <span class="pay-tag" :class="trx.payment.toLowerCase().replace(/[^a-z]/g, '')">
                        {{ trx.payment }}
                      </span>
                    </td>
                    <td class="td-total">{{ formatRp(trx.total) }}</td>
                    <td>
                      <span class="status-badge success">{{ trx.status }}</span>
                    </td>
                    <td style="text-align:center;">
                      <button class="btn-action-print" @click="handleOpenReceipt(trx)" title="Cetak Ulang Struk Thermal">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        Struk
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredTransactions.length === 0">
                    <td colspan="9" class="td-empty">
                      Tidak ada transaksi yang cocok dengan filter.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Bottom Right: Rekapitulasi Shift Kasir -->
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
                <p class="lk-sub">Sesi Aktif: 08:00 - 17:00 WIB • Kasir: Budi Santoso</p>
              </div>
            </div>

            <!-- Split Cards: Tunai vs Digital (100% Match Live Feed) -->
            <div class="recap-2col">
              <div class="rc-card">
                <div class="rc-head">
                  <span class="rc-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" style="margin-right:4px;vertical-align:-2px;"><rect x="2" y="5" width="20" height="14" rx="2"></rect><circle cx="12" cy="12" r="3"></circle></svg> Penjualan Tunai</span>
                  <span class="badge badge-yellow">{{ rekapShift.persenKas }}%</span>
                </div>
                <h2 class="rc-val">{{ formatRp(saldoKasLaci) }}</h2>
                <div class="rc-progress"><div class="rc-fill bg-orange" :style="{width: rekapShift.persenKas + '%'}"></div></div>
                <p class="rc-desc">+ Modal Awal: {{ formatRp(initialFloat) }} (Fisik: {{ formatRp(rekapShift.kasFisik) }})</p>
              </div>
              
              <div class="rc-card">
                <div class="rc-head">
                  <span class="rc-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" style="margin-right:4px;vertical-align:-2px;"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg> Non-Tunai (Digital)</span>
                  <span class="badge badge-gray">{{ rekapShift.persenNonTunai }}%</span>
                </div>
                <h2 class="rc-val">{{ formatRp(rekapShift.nonTunai) }}</h2>
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

            <!-- Dark Banner (100% Harmonious with Ringkasan Shift) -->
            <div class="rc-dark-banner">
              <div>
                <h4 class="banner-title">Total Pendapatan Shift</h4>
                <p class="banner-sub">Akumulasi Seluruh Layanan POS Live</p>
              </div>
              <h2 class="banner-total">{{ formatRp(rekapShift.totalOmzet) }}</h2>
            </div>
            
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL: TUTUP SHIFT & CETAK REKAPITULASI -->
    <div v-if="showCloseShiftModal" class="pos-modal-backdrop" @click.self="showCloseShiftModal = false">
      <div class="pos-modal-card">
        <div class="pm-header">
          <div class="pm-title-group">
            <h3 class="pm-title">Tutup Shift Kasir & Rekonsiliasi Kas</h3>
            <p class="pm-subtitle">Shift {{ kasirProfile.shiftDate }} • {{ kasirProfile.kasirName }} ({{ kasirProfile.kasirRole }})</p>
          </div>
          <button class="pm-close-btn" @click="showCloseShiftModal = false">✕</button>
        </div>

        <div class="pm-body">
          <div class="shift-recon-grid">
            <div class="recon-item">
              <span class="recon-label">Modal Kas Awal</span>
              <strong class="recon-val">{{ formatRp(initialFloat) }}</strong>
            </div>
            <div class="recon-item">
              <span class="recon-label">Penjualan Tunai Laci</span>
              <strong class="recon-val text-amber">+ {{ formatRp(saldoKasLaci) }}</strong>
            </div>
            <div class="recon-item highlight">
              <span class="recon-label">Target Kas Fisik Sistem</span>
              <strong class="recon-val text-emerald">{{ formatRp(saldoKasLaci + initialFloat) }}</strong>
            </div>
            <div class="recon-item">
              <span class="recon-label">Total Penjualan Non-Tunai</span>
              <strong class="recon-val text-blue">{{ formatRp(paymentSummary.qris.total + paymentSummary.edc.total) }}</strong>
            </div>
          </div>

          <div class="pm-form-group">
            <label class="pm-label">Hitungan Fisik Uang Kas di Laci (Rp):</label>
            <div class="input-money-wrapper">
              <span class="input-rp">Rp</span>
              <input 
                type="number" 
                v-model.number="countedCash" 
                class="pm-input-money" 
                placeholder="Masukkan total fisik kas laci"
              />
            </div>
            <div class="cash-diff-banner" :class="{ 'is-match': countedCash === (saldoKasLaci + initialFloat), 'is-diff': countedCash !== (saldoKasLaci + initialFloat) }">
              <span v-if="countedCash === (saldoKasLaci + initialFloat)">
                ✅ <strong>Kas Pas (Sesuai Sistem):</strong> Selisih Rp 0
              </span>
              <span v-else-if="countedCash > (saldoKasLaci + initialFloat)">
                ⚠️ <strong>Lebih Kas:</strong> + {{ formatRp(countedCash - (saldoKasLaci + initialFloat)) }}
              </span>
              <span v-else>
                ⚠️ <strong>Kurang Kas:</strong> - {{ formatRp((saldoKasLaci + initialFloat) - countedCash) }}
              </span>
            </div>
          </div>
        </div>

        <div class="pm-footer">
          <button class="pm-btn secondary" @click="showCloseShiftModal = false">Batal</button>
          <button class="pm-btn primary" @click="handleConfirmCloseShift">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Konfirmasi & Cetak Struk Rekap
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: PREVIEW CETAK STRUK THERMAL -->
    <div v-if="showReceiptModal && selectedReceipt" class="pos-modal-backdrop" @click.self="showReceiptModal = false">
      <div class="pos-receipt-modal">
        <div class="receipt-paper" id="printable-thermal-receipt">
          <div class="receipt-header">
            <h2 class="rh-brand">KAMPUNG COKLAT</h2>
            <p class="rh-address">Jl. Banteng Blorok No. 18, Plosorejo, Kademangan, Blitar</p>
            <p class="rh-address">Telp: (0342) 817111 • WhatsApp: 0812-3456-7890</p>
            <div class="rh-divider">================================</div>
          </div>

          <div class="receipt-meta">
            <div class="rm-row"><span>No. Struk:</span><strong>{{ selectedReceipt.id }}</strong></div>
            <div class="rm-row"><span>Waktu:</span><span>{{ selectedReceipt.time }} WIB</span></div>
            <div class="rm-row"><span>Kasir:</span><span>{{ kasirProfile.kasirName }}</span></div>
            <div class="rm-row"><span>Customer:</span><span>{{ selectedReceipt.customer }}</span></div>
            <div class="rh-divider">--------------------------------</div>
          </div>

          <div class="receipt-items">
            <div v-for="(item, idx) in selectedReceipt.items" :key="idx" class="ri-item">
              <div class="ri-top">
                <span>{{ item.name }}</span>
              </div>
              <div class="ri-bottom">
                <span>{{ item.qty }} x {{ formatRp(item.price) }}</span>
                <strong>{{ formatRp(item.qty * item.price) }}</strong>
              </div>
            </div>
            <div class="rh-divider">--------------------------------</div>
          </div>

          <div class="receipt-total">
            <div class="rt-row"><span>TOTAL:</span><strong>{{ formatRp(selectedReceipt.total) }}</strong></div>
            <div class="rt-row"><span>Metode Bayar:</span><span>{{ selectedReceipt.payment }}</span></div>
            <div class="rt-row"><span>Status:</span><strong>{{ selectedReceipt.status }}</strong></div>
          </div>

          <div class="receipt-footer">
            <div class="rh-divider">================================</div>
            <div class="barcode-box">
              <div class="barcode-line">||||||||||||||||||||||||||||||||||||||||||||</div>
              <span class="barcode-num">{{ selectedReceipt.id }}-VALID-GATE</span>
            </div>
            <p class="rf-thanks">Terima Kasih Atas Kunjungan Anda!</p>
            <p class="rf-note">Tiket resmi berlaku untuk akses gate & wahana terdaftar.</p>
          </div>
        </div>

        <div class="receipt-actions">
          <button class="pm-btn secondary" @click="showReceiptModal = false">Tutup</button>
          <button class="pm-btn primary" @click="handlePrintReceipt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Cetak Struk Thermal
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: DOWNLOAD / CETAK LAPORAN PDF -->
    <div v-if="showPdfReportModal" class="pos-modal-backdrop" @click.self="showPdfReportModal = false">
      <div class="pos-modal-card report-pdf-card">
        <div class="pm-header">
          <div class="pm-title-group">
            <h3 class="pm-title">Laporan Rekapitulasi Shift Kasir (PDF)</h3>
            <p class="pm-subtitle">Wisata Edukasi Kampung Coklat Blitar • Shift {{ kasirProfile.shiftDate }}</p>
          </div>
          <button class="pm-close-btn" @click="showPdfReportModal = false">✕</button>
        </div>

        <div class="pm-body report-pdf-body">
          <!-- Official Report Paper -->
          <div class="official-report-paper" id="printable-pos-report">
            <!-- Header Surat / Dokumen -->
            <div class="doc-header">
              <div class="doc-brand">
                <img :src="logoImg" alt="Kampung Coklat" class="brand-doc-logo" />
                <div>
                  <h2 class="doc-company">WISATA EDUKASI KAMPUNG COKLAT</h2>
                  <p class="doc-address">Jl. Banteng - Blorok No. 18, Plosorejo, Kademangan, Blitar, Jawa Timur</p>
                  <p class="doc-contact">Telp: (0342) 811234 • Email: info@kampungcoklat.id</p>
                </div>
              </div>
              <div class="doc-badge-status">
                <span class="doc-title-badge">LAPORAN REKAPITULASI KASIR POS</span>
                <span class="doc-docnum">No: POS-REP/{{ kasirProfile.shiftDate.replace(/ /g, '') }}/01</span>
              </div>
            </div>

            <hr class="doc-divider-thick" />

            <!-- Meta Shift Information Grid -->
            <div class="doc-meta-grid">
              <div class="meta-item">
                <span class="meta-lbl">Nama Petugas Kasir</span>
                <strong class="meta-val">{{ kasirProfile.kasirName }} ({{ kasirProfile.kasirRole }})</strong>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Tanggal & Jam Shift</span>
                <strong class="meta-val">{{ kasirProfile.shiftDate }} • {{ kasirProfile.shiftStart }} - Selesai</strong>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Status Rekapitulasi</span>
                <strong class="meta-val text-green">TERVALIDASI SISTEM POS (LIVE)</strong>
              </div>
              <div class="meta-item">
                <span class="meta-lbl">Waktu Cetak Dokumen</span>
                <strong class="meta-val">{{ new Date().toLocaleString('id-ID') }} WIB</strong>
              </div>
            </div>

            <!-- Executive Summary Cards -->
            <div class="doc-summary-cards">
              <div class="dsc-box primary">
                <span class="dsc-lbl">TOTAL PENDAPATAN</span>
                <h3 class="dsc-val">{{ formatRp(paymentSummary.totalPendapatan) }}</h3>
                <span class="dsc-sub">100% Seluruh Transaksi Shift</span>
              </div>
              <div class="dsc-box">
                <span class="dsc-lbl">TOTAL TRANSAKSI</span>
                <h3 class="dsc-val">{{ totalTransaksi }} Struk</h3>
                <span class="dsc-sub">Tiket/Layanan Selesai</span>
              </div>
              <div class="dsc-box">
                <span class="dsc-lbl">TOTAL TIKET TERJUAL</span>
                <h3 class="dsc-val">{{ tiketTerjual }} Pax</h3>
                <span class="dsc-sub">Pengunjung Terdaftar</span>
              </div>
              <div class="dsc-box">
                <span class="dsc-lbl">RATA-RATA / STRUK</span>
                <h3 class="dsc-val">{{ formatRp(rataRataPerStruk) }}</h3>
                <span class="dsc-sub">Nilai Pembelian Rata-rata</span>
              </div>
            </div>

            <!-- Breakdown Pembayaran & Kategori -->
            <div class="doc-2col-tables">
              <div class="doc-table-box">
                <h4 class="dt-title">1. Rincian Berdasarkan Metode Pembayaran</h4>
                <table class="doc-table">
                  <thead>
                    <tr>
                      <th>Metode Pembayaran</th>
                      <th style="text-align:center;">Jumlah Trx</th>
                      <th style="text-align:right;">Total Omzet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tunai (Cash)</td>
                      <td style="text-align:center;">{{ paymentSummary.tunai.count }} trx</td>
                      <td style="text-align:right; font-weight:700;">{{ formatRp(paymentSummary.tunai.total) }}</td>
                    </tr>
                    <tr>
                      <td>QRIS (Dinamis / Statis)</td>
                      <td style="text-align:center;">{{ paymentSummary.qris.count }} trx</td>
                      <td style="text-align:right; font-weight:700;">{{ formatRp(paymentSummary.qris.total) }}</td>
                    </tr>
                    <tr>
                      <td>Mesin EDC / Kartu Debit</td>
                      <td style="text-align:center;">{{ paymentSummary.edc.count }} trx</td>
                      <td style="text-align:right; font-weight:700;">{{ formatRp(paymentSummary.edc.total) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>TOTAL PENJUALAN MURNI</th>
                      <th style="text-align:center;">{{ totalTransaksi }} trx</th>
                      <th style="text-align:right;">{{ formatRp(paymentSummary.totalPendapatan) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div class="doc-table-box">
                <h4 class="dt-title">2. Distribusi Kategori Layanan</h4>
                <table class="doc-table">
                  <thead>
                    <tr>
                      <th>Kategori Layanan</th>
                      <th style="text-align:center;">Pax</th>
                      <th style="text-align:right;">Total Penjualan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cat in categoryDistribution" :key="cat.name">
                      <td>{{ cat.name }}</td>
                      <td style="text-align:center;">{{ cat.count }} pax</td>
                      <td style="text-align:right; font-weight:700;">{{ formatRp(cat.revenue) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>TOTAL AKUMULASI</th>
                      <th style="text-align:center;">{{ tiketTerjual }} pax</th>
                      <th style="text-align:right;">{{ formatRp(paymentSummary.totalPendapatan) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <!-- Detail Transaksi Masuk -->
            <div class="doc-table-box" style="margin-top: 20px;">
              <h4 class="dt-title">3. Rekam Rincian Transaksi Kasir (Live Log)</h4>
              <table class="doc-table log-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>No. Struk</th>
                    <th>Waktu</th>
                    <th>Kategori</th>
                    <th>Layanan & Produk</th>
                    <th>Pelanggan</th>
                    <th style="text-align:center;">Qty</th>
                    <th>Metode</th>
                    <th style="text-align:right;">Total (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tx, idx) in recentTransactions" :key="tx.id">
                    <td>{{ idx + 1 }}</td>
                    <td><strong>{{ tx.id }}</strong></td>
                    <td>{{ tx.time }}</td>
                    <td><span class="report-badge">{{ tx.category }}</span></td>
                    <td>{{ tx.type }}</td>
                    <td>{{ tx.customer }}</td>
                    <td style="text-align:center;">{{ tx.qty }}</td>
                    <td>{{ tx.payment }}</td>
                    <td style="text-align:right; font-weight:700;">{{ formatRp(tx.total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Signature Area -->
            <div class="doc-signatures">
              <div class="sig-col">
                <p>Petugas Kasir,</p>
                <div class="sig-space"></div>
                <strong>( {{ kasirProfile.kasirName }} )</strong>
                <span>ID: KSR-{{ kasirProfile.shiftDate.replace(/ /g, '') }}-01</span>
              </div>
              <div class="sig-col">
                <p>Supervisor Operasional POS,</p>
                <div class="sig-space"></div>
                <strong>( H. Agus Santoso, S.E. )</strong>
                <span>NIP: KC-SPV-0081</span>
              </div>
            </div>

          </div>
        </div>

        <div class="pm-footer report-pdf-footer">
          <button class="pm-btn secondary" @click="showPdfReportModal = false">Tutup</button>
          <button class="pm-btn primary" @click="handlePrintPdfReport">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Cetak / Download Dokumen PDF
          </button>
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
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-download-pdf {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1.5px solid #D97706;
  color: #B45309;
  padding: 11px 20px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
}

.btn-download-pdf:hover {
  background: #FFFBEB;
  border-color: #B45309;
  color: #78350F;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);
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
  box-shadow: 0 4px 14px rgba(17, 24, 39, 0.25);
}

.btn-tutup-shift:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(17, 24, 39, 0.35);
}

.loading-state {
  text-align: center;
  padding: 100px;
  color: #6B7280;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #E5E7EB;
  border-top-color: #F59E0B;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 1. Top Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
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
  transition: transform 0.2s, box-shadow 0.2s;
}

.elegant-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.04);
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

.status-shift-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulseGreen 1.8s infinite;
}

@keyframes pulseGreen {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* 2. Content Grid (Tinggi widget kiri & kanan otomatis sama persis) */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1.5fr 1.3fr;
  gap: 24px;
  margin-top: 24px;
  align-items: stretch;
}

.elegant-widget {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(229, 231, 235, 0.6);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
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
.bar-group { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; cursor: pointer; }
.double-bar { display: flex; align-items: flex-end; gap: 2px; height: 100%; width: 32px; }
.bar-1 { flex: 1; background-color: #F59E0B; border-radius: 2px 2px 0 0; transition: height 0.5s ease, filter 0.2s; }
.bar-2 { flex: 1; background-color: #451A03; border-radius: 2px 2px 0 0; transition: height 0.5s ease, filter 0.2s; }
.bar-group:hover .bar-1, .bar-group:hover .bar-2 { filter: brightness(1.15); }
.x-label { position: absolute; bottom: -24px; font-size: 11px; color: #6B7280; font-weight: 600; }

.dot-brown { position: absolute; width: 9px; height: 9px; background-color: #451A03; border: 1.5px solid #ffffff; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 10; }
.dot-orange { position: absolute; width: 12px; height: 12px; background-color: #ffffff; border: 3px solid #F59E0B; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2); z-index: 11; }

.hover-info-banner {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12.5px;
  color: #92400E;
  margin-top: 14px;
}

.chart-legend { display: flex; align-items: center; gap: 24px; margin-top: 20px; padding-top: 16px; border-top: 1px dashed #E5E7EB; }
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-box { width: 12px; height: 12px; border-radius: 3px; }
.legend-text { font-size: 12px; font-weight: 600; color: #4B5563; }

.mini-cards-row { display: flex; gap: 14px; margin-top: 16px; }
.mini-card { flex: 1; background: #ffffff; border: 1px solid #E5E7EB; border-radius: 12px; padding: 14px 12px; display: flex; align-items: center; gap: 10px; min-width: 0; }
.mc-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mc-icon.tunai { background: #FEF3C7; }
.mc-icon.qris { background: #F3F4F6; }
.mc-icon.edc { background: #D1FAE5; }
.mc-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.mc-title { font-size: 11.5px; color: #6B7280; font-weight: 600; white-space: nowrap; }
.mc-val { font-size: 13px; font-weight: 800; color: #111827; white-space: nowrap; }
.mc-val.tunai-val { color: #D97706; }
.mc-val.success-val { color: #059669; }

/* Summary Right Column */
.summary-body { 
  display: flex; 
  flex-direction: column; 
  gap: 16px; 
}
.summary-list { display: flex; flex-direction: column; gap: 10px; margin-top: 2px; }
.summary-item { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 10px 14px; 
  background: #F8FAFC;
  border: 1px solid #F1F5F9;
  border-radius: 10px;
  transition: all 0.2s ease;
}
.summary-item:hover {
  background: #F1F5F9;
  border-color: #E2E8F0;
}
.sum-left { display: flex; align-items: center; gap: 12px; }
.sum-icon { width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sum-text { display: flex; flex-direction: column; gap: 1px; }
.sum-name { font-size: 13.5px; font-weight: 700; color: #111827; }
.sum-count { font-size: 11.5px; color: #6B7280; font-weight: 500; }
.sum-val { font-size: 15px; font-weight: 800; color: #111827; }
.summary-total-box { background: #FFFBEB; border: 1px solid #FEF3C7; border-radius: 12px; padding: 14px 18px; text-align: center; }
.total-label { font-size: 11px; font-weight: 800; color: #B45309; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px; }
.total-h2 { font-size: 22px; font-weight: 900; color: #78350F; margin: 0; }

/* Breakdown Box */
.category-breakdown-box {
  padding-top: 14px;
  border-top: 1px dashed #E5E7EB;
}
.cbb-title {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #4B5563;
  margin-bottom: 10px;
}
.cbb-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cbb-top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}
.cbb-bar-bg {
  height: 6px;
  background: #F3F4F6;
  border-radius: 6px;
  overflow: hidden;
}
.cbb-bar-fill {
  height: 100%;
  border-radius: 6px;
}

/* Table Header & Search */
.table-header-flex {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.table-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
}
.filter-pills-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.flt-btn {
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.15s ease;
}
.flt-btn.active {
  background: #111827;
  border-color: #111827;
  color: #FFFFFF;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  border-radius: 8px;
}
.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 12.5px;
  width: 150px;
}

/* Table */
.table-scroll-container {
  overflow-x: auto;
  overflow-y: auto;
  flex: 1 1 0;
  min-height: 0;
  height: 100%;
  position: relative;
}

.table-scroll-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.table-scroll-container::-webkit-scrollbar-track {
  background: #F8FAFC;
}
.table-scroll-container::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}
.table-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

.simple-table { 
  width: 100%; 
  border-collapse: separate; 
  border-spacing: 0;
  min-width: 680px; 
}
.simple-table th { 
  position: sticky;
  top: 0;
  z-index: 10;
  text-align: left; 
  padding: 13px 18px; 
  font-size: 11px; 
  font-weight: 800; 
  color: #64748B; 
  text-transform: uppercase; 
  letter-spacing: 0.5px; 
  background: #F8FAFC;
  box-shadow: inset 0 -1px 0 #E2E8F0;
}
.simple-table td { padding: 13px 18px; border-bottom: 1px solid #F1F5F9; vertical-align: middle; }
.simple-table tbody tr:hover { background: #F9FAFB; }
.simple-table tbody tr:last-child td { border-bottom: none; }
.td-id { font-size: 12.5px; color: #1E40AF; }
.td-time { font-size: 12.5px; color: #4B5563; font-weight: 500; }
.td-type { display: flex; flex-direction: column; gap: 2px; }
.td-prod-title { font-size: 13px; font-weight: 700; color: #111827; }
.td-prod-cat { font-size: 11px; color: #6B7280; }
.td-customer { font-size: 12.5px; color: #374151; font-weight: 500; }
.td-qty { font-size: 13px; color: #4B5563; }
.pay-tag { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; }
.pay-tag.tunai { background: #FEF3C7; color: #92400E; }
.pay-tag.qris { background: #EFF6FF; color: #1E40AF; }
.pay-tag.edckartu { background: #F3E8FF; color: #6B21A8; }
.td-total { font-size: 13.5px; font-weight: 800; color: #111827; }
.status-badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; }
.status-badge.success { background: #D1FAE5; color: #059669; }
.td-empty { text-align: center; color: #9CA3AF; padding: 30px; font-weight: 600; }

.btn-action-print {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-action-print:hover {
  background: #F3F4F6;
  color: #111827;
  border-color: #9CA3AF;
}

/* --- REKAPITULASI SHIFT KASIR --- */
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

/* ==========================================================================
   MODALS: CLOSE SHIFT, THERMAL RECEIPT, CASH FLOW
   ========================================================================== */
.pos-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 99999;
}

.pos-modal-card {
  background: #FFFFFF;
  border-radius: 20px;
  width: 540px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.pm-header {
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.pm-title { margin: 0 0 4px 0; font-size: 18px; font-weight: 800; color: #111827; }
.pm-subtitle { margin: 0; font-size: 13px; color: #6B7280; }
.pm-close-btn {
  background: #F3F4F6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pm-body {
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.shift-recon-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.recon-item {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  padding: 12px 14px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.recon-item.highlight {
  background: #ECFDF5;
  border-color: #A7F3D0;
}
.recon-label { font-size: 11px; font-weight: 700; color: #6B7280; text-transform: uppercase; }
.recon-val { font-size: 15px; font-weight: 800; color: #111827; }
.text-amber { color: #D97706; }
.text-emerald { color: #059669; }
.text-blue { color: #2563EB; }

.pm-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pm-label { font-size: 13px; font-weight: 700; color: #374151; }

.input-money-wrapper {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  border: 2px solid #D1D5DB;
  border-radius: 10px;
  overflow: hidden;
}
.input-money-wrapper:focus-within { border-color: #F59E0B; }
.input-rp { padding: 12px 16px; background: #F3F4F6; font-size: 14px; font-weight: 800; color: #4B5563; }
.pm-input-money {
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: 800;
  outline: none;
}
.pm-input-text {
  border: 1.5px solid #D1D5DB;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13.5px;
  outline: none;
}
.pm-input-text:focus { border-color: #F59E0B; }

.cash-diff-banner {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
.cash-diff-banner.is-match { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; }
.cash-diff-banner.is-diff { background: #FFFBEB; color: #92400E; border: 1px solid #FCD34D; }

.pm-footer {
  padding: 16px 24px;
  background: #F9FAFB;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.pm-btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.pm-btn.secondary { background: #FFFFFF; border: 1px solid #D1D5DB; color: #4B5563; }
.pm-btn.secondary:hover { background: #F3F4F6; }
.pm-btn.primary { background: #111827; border: none; color: #FFFFFF; }
.pm-btn.primary:hover { background: #1F2937; }

/* Thermal Receipt Paper Modal */
.pos-receipt-modal {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  width: 380px;
  max-width: 95vw;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Courier New', Courier, monospace;
}
.receipt-paper {
  background: #FAFAFA;
  border: 1px dashed #CBD5E1;
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
  color: #1E293B;
}
.receipt-header { text-align: center; }
.rh-brand { font-size: 16px; font-weight: 900; margin: 0 0 4px 0; letter-spacing: 1px; }
.rh-address { font-size: 10px; margin: 2px 0; color: #64748B; }
.rh-divider { color: #94A3B8; font-size: 10px; margin: 6px 0; text-align: center; overflow: hidden; }

.receipt-meta { display: flex; flex-direction: column; gap: 3px; font-size: 11px; }
.rm-row { display: flex; justify-content: space-between; }

.receipt-items { display: flex; flex-direction: column; gap: 6px; margin: 6px 0; }
.ri-item { display: flex; flex-direction: column; gap: 2px; }
.ri-top { font-weight: 700; font-size: 11.5px; }
.ri-bottom { display: flex; justify-content: space-between; color: #475569; font-size: 11px; }

.receipt-total { display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
.rt-row { display: flex; justify-content: space-between; }
.rt-row strong { font-size: 14px; }

.receipt-footer { text-align: center; margin-top: 6px; }
.barcode-box { margin: 8px 0; }
.barcode-line { font-size: 14px; letter-spacing: 1px; color: #1E293B; }
.barcode-num { font-size: 9px; color: #64748B; }
.rf-thanks { font-weight: 800; margin: 4px 0 2px 0; font-size: 11px; }
.rf-note { font-size: 9px; color: #64748B; margin: 0; }

.receipt-actions { display: flex; justify-content: space-between; gap: 10px; }

/* Responsive adjustments */
@media (max-width: 1024px) {
  .content-grid, .bottom-grid {
    grid-template-columns: 1fr;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .dashboard-wrapper {
    padding: 20px 16px 80px 16px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  .btn-tutup-shift {
    width: 100%;
    justify-content: center;
  }
  .recap-2col {
    flex-direction: column;
  }
  .mini-cards-row {
    flex-direction: column;
  }
  .shift-recon-grid {
    grid-template-columns: 1fr;
  }
}

/* =========================================================
   REPORT PDF & PRINTABLE STYLES
   ========================================================= */
.report-pdf-card {
  max-width: 900px !important;
  width: 95% !important;
  max-height: 90vh !important;
  display: flex !important;
  flex-direction: column !important;
}

.report-pdf-body {
  overflow-y: auto;
  max-height: calc(90vh - 140px);
  padding: 24px !important;
  background: #F1F5F9;
}

.official-report-paper {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid #E2E8F0;
  color: #1E293B;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 16px;
}

.brand-doc-logo {
  height: 48px;
  max-width: 140px;
  object-fit: contain;
}

.doc-company {
  font-size: 18px;
  font-weight: 800;
  color: #451A03;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
}

.doc-address {
  font-size: 11px;
  color: #64748B;
  margin: 0 0 2px 0;
}

.doc-contact {
  font-size: 11px;
  color: #94A3B8;
  margin: 0;
}

.doc-badge-status {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.doc-title-badge {
  background: #FEF3C7;
  color: #B45309;
  font-size: 12px;
  font-weight: 800;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #FDE68A;
}

.doc-docnum {
  font-size: 10.5px;
  color: #64748B;
  font-family: monospace;
}

.doc-divider-thick {
  border: none;
  border-top: 2px solid #CBD5E1;
  margin: 16px 0 20px 0;
}

.doc-meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: #F8FAFC;
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid #E2E8F0;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.meta-lbl {
  font-size: 10.5px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
}

.meta-val {
  font-size: 12px;
  color: #0F172A;
}

.text-green {
  color: #059669;
}

.doc-summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.dsc-box {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
}

.dsc-box.primary {
  background: #FFFBEB;
  border-color: #FCD34D;
}

.dsc-lbl {
  font-size: 10.5px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
  display: block;
}

.dsc-val {
  font-size: 18px;
  font-weight: 800;
  color: #0F172A;
  margin: 4px 0 2px 0;
}

.dsc-box.primary .dsc-val {
  color: #B45309;
}

.dsc-sub {
  font-size: 10px;
  color: #94A3B8;
}

.doc-2col-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.dt-title {
  font-size: 12.5px;
  font-weight: 800;
  color: #334155;
  margin: 0 0 8px 0;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11.5px;
}

.doc-table th {
  background: #F1F5F9;
  color: #475569;
  font-weight: 700;
  padding: 8px 10px;
  text-align: left;
  border: 1px solid #CBD5E1;
}

.doc-table td {
  padding: 8px 10px;
  border: 1px solid #E2E8F0;
  color: #334155;
}

.doc-table tfoot th {
  background: #F8FAFC;
  color: #0F172A;
  font-weight: 800;
  padding: 10px;
  border: 1px solid #CBD5E1;
}

.log-table th, .log-table td {
  font-size: 11px;
  padding: 7px 9px;
}

.report-badge {
  background: #EFF6FF;
  color: #1D4ED8;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.doc-signatures {
  display: flex;
  justify-content: space-around;
  margin-top: 36px;
  padding-top: 16px;
  border-top: 1px dashed #CBD5E1;
}

.sig-col {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11.5px;
  color: #475569;
}

.sig-space {
  height: 60px;
}

.sig-col strong {
  font-size: 12.5px;
  color: #0F172A;
}

.sig-col span {
  font-size: 10.5px;
  color: #94A3B8;
}

.report-pdf-footer {
  padding: 14px 24px !important;
  background: #FFFFFF;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media print {
  body * {
    visibility: hidden;
  }
  #printable-pos-report, #printable-pos-report * {
    visibility: visible;
  }
  #printable-pos-report {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border: none;
    box-shadow: none;
    padding: 0;
  }
}
</style>
