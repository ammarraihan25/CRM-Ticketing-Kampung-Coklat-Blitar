<script setup lang="ts">
definePageMeta({
  layout: 'pos'
})

const stats = [
  { label: 'Tiket Terjual Hari Ini', value: '1,245', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>', trend: '+15%', color: '#fdf3eb', text: '#d35400' },
  { label: 'Total Pendapatan', value: 'Rp 45.2M', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>', trend: '+8%', color: '#fef9c3', text: '#b45309' },
  { label: 'Rombongan B2B', value: '12 Grup', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>', trend: '+2 Grup', color: '#eefcf1', text: '#166534' },
  { label: 'Sewa Fasilitas', value: '3 Hall', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>', trend: 'Penuh', color: '#f3ece7', text: '#4a2c1d' },
]

const recentTransactions = [
  { id: 'TRX-1092', time: '10:45 AM', type: 'Tiket Terusan', qty: 4, total: 'Rp 300.000', status: 'Lunas' },
  { id: 'TRX-1091', time: '10:42 AM', type: 'B2B - SDN 1 Blitar', qty: 150, total: 'Rp 3.000.000', status: 'Lunas' },
  { id: 'TRX-1090', time: '10:35 AM', type: 'Tiket Reguler', qty: 2, total: 'Rp 40.000', status: 'Lunas' },
  { id: 'TRX-1089', time: '10:15 AM', type: 'Sewa Hall A', qty: 1, total: 'Rp 2.500.000', status: 'DP 50%' },
  { id: 'TRX-1088', time: '09:50 AM', type: 'Paket Edukasi Basic', qty: 20, total: 'Rp 500.000', status: 'Lunas' },
]
</script>

<template>
  <div class="dashboard-wrapper">
    <!-- Header Area -->
    <div class="dashboard-header">
      <div>
        <h1 class="page-title">Dashboard Kasir</h1>
        <p class="page-subtitle">Ringkasan operasional dan penjualan hari ini: <strong>19 Agustus 2026</strong></p>
      </div>
      <div class="header-actions">
        <button class="btn-outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Unduh Laporan
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card" v-for="(stat, index) in stats" :key="index">
        <div class="stat-icon-wrapper" :style="{ backgroundColor: stat.color, color: stat.text }" v-html="stat.icon">
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ stat.label }}</span>
          <div class="stat-value-row">
            <h3 class="stat-value">{{ stat.value }}</h3>
            <span class="stat-trend" :style="{ color: stat.text }">{{ stat.trend }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-grid">
      <!-- Left Column: Chart -->
      <div class="chart-section">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Grafik Kunjungan Hari Ini</h3>
            <select class="select-filter">
              <option>Per Jam</option>
            </select>
          </div>
          <div class="card-body">
            <div class="mock-chart">
              <!-- Simple CSS Bar Chart -->
              <div class="bar-col">
                <div class="bar" style="height: 30%;"></div>
                <span>08:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 50%;"></div>
                <span>09:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 90%; background: #f29727;"></div>
                <span style="font-weight: bold; color: #f29727;">10:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 70%;"></div>
                <span>11:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 40%;"></div>
                <span>12:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 60%;"></div>
                <span>13:00</span>
              </div>
              <div class="bar-col">
                <div class="bar" style="height: 80%;"></div>
                <span>14:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Transactions -->
      <div class="transactions-section">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Transaksi Terakhir</h3>
            <button class="btn-text">Lihat Semua</button>
          </div>
          <div class="card-body" style="padding: 0;">
            <table class="trx-table">
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Tipe</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trx in recentTransactions" :key="trx.id">
                  <td>{{ trx.time }}</td>
                  <td style="font-weight: 600;">{{ trx.type }}</td>
                  <td>{{ trx.qty }}</td>
                  <td style="font-weight: 700;">{{ trx.total }}</td>
                  <td>
                    <span :class="['status-badge', trx.status === 'Lunas' ? 'status-success' : 'status-warning']">
                      {{ trx.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Sales Section -->
    <div class="details-section" style="margin-top: 30px;">
      <h3 class="section-title" style="font-size: 20px; font-weight: 800; color: #2c1a13; margin-bottom: 20px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f29727" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: bottom;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Rincian Penjualan Hari Ini
      </h3>
      <div class="content-grid" style="grid-template-columns: repeat(3, 1fr);">
        <!-- Tiket Masuk Detail -->
        <div class="card detail-card">
          <div class="card-header"><h3 class="card-title">Penjualan Tiket Masuk</h3></div>
          <div class="card-body">
            <div class="detail-row"><span>Tiket Reguler</span><strong>850 Orang</strong></div>
            <div class="detail-row"><span>Tiket Terusan</span><strong>395 Orang</strong></div>
            <div class="detail-divider"></div>
            <div class="detail-row total"><span style="color: #6b7280; font-size: 13px;">Subtotal Pendapatan</span><strong style="color: #d35400;">Rp 46.625.000</strong></div>
          </div>
        </div>
        
        <!-- Wahana Detail -->
        <div class="card detail-card">
          <div class="card-header"><h3 class="card-title">Wahana & Fasilitas</h3></div>
          <div class="card-body">
            <div class="detail-row"><span>Golf Car</span><strong>45 Unit</strong></div>
            <div class="detail-row"><span>Mini Jeep</span><strong>32 Unit</strong></div>
            <div class="detail-row"><span>Sewa Hall</span><strong>3 Gedung</strong></div>
            <div class="detail-divider"></div>
            <div class="detail-row total"><span style="color: #6b7280; font-size: 13px;">Subtotal Pendapatan</span><strong style="color: #d35400;">Rp 12.850.000</strong></div>
          </div>
        </div>
        
        <!-- Edukasi & B2B Detail -->
        <div class="card detail-card">
          <div class="card-header"><h3 class="card-title">Rombongan & Edukasi</h3></div>
          <div class="card-body">
            <div class="detail-row"><span>Paket Edukasi TK</span><strong>5 Grup (250 Peserta)</strong></div>
            <div class="detail-row"><span>Paket Edukasi SD</span><strong>7 Grup (320 Peserta)</strong></div>
            <div class="detail-divider"></div>
            <div class="detail-row total"><span style="color: #6b7280; font-size: 13px;">Subtotal Pendapatan</span><strong style="color: #d35400;">Rp 18.990.000</strong></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 30px 40px 100px 40px; /* Added bottom padding to prevent cutoff */
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #2c1a13;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.page-subtitle strong {
  color: #374151;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  border: 1px solid #f3f4f6;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.04);
}

.stat-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 13px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.stat-trend {
  font-size: 13px;
  font-weight: 700;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  height: 100%;
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.select-filter {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  outline: none;
}

.btn-text {
  background: none;
  border: none;
  color: #f29727;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}

.btn-text:hover {
  text-decoration: underline;
}

.card-body {
  padding: 24px;
}

/* Mock Chart Styling */
.mock-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 250px;
  padding-top: 20px;
}

.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  height: 100%;
  justify-content: flex-end;
  flex: 1;
}

.bar {
  width: 36px;
  background-color: #e5e7eb;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
}

.bar:hover {
  background-color: #d1d5db;
}

.bar-col span {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
}

/* Table Styling */
.trx-table {
  width: 100%;
  border-collapse: collapse;
}

.trx-table th {
  text-align: left;
  padding: 16px 24px;
  font-size: 12px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.trx-table td {
  padding: 16px 24px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.trx-table tbody tr:last-child td {
  border-bottom: none;
}

.trx-table tbody tr:hover {
  background-color: #f9fafb;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}

.status-success {
  background-color: #dcfce7;
  color: #166534;
}

.status-warning {
  background-color: #fef9c3;
  color: #854d0e;
}

/* Detail Card Styling */
.detail-card {
  border: 1px solid #fce4ce;
  background: #fffdf5;
  box-shadow: 0 4px 12px rgba(242, 151, 39, 0.05);
}
.detail-card .card-header {
  background: #fdfaf0;
  border-bottom: 1px dashed #fce4ce;
}
.detail-card .card-title {
  color: #2c1a13;
}
.detail-card .card-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #374151;
}
.detail-row span {
  color: #5c4538;
  font-weight: 500;
}
.detail-row strong {
  color: #2c1a13;
  font-weight: 700;
}
.detail-divider {
  height: 1px;
  background-color: #fce4ce;
  margin: 8px 0;
}
.detail-row.total {
  font-size: 16px;
}
.detail-row.total strong {
  font-weight: 800;
}
</style>
