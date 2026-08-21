<template>
  <div class="dashboard-container">
    <!-- =====================================================================
         1. FLAT EXECUTIVE HEADER (Seamless)
         ===================================================================== -->
    <header class="executive-command-header">
      <!-- Left: Clean Title & Subtitle -->
      <div class="brand-text-wrapper">
        <h1 class="header-main-title">Dashboard</h1>
        <div class="header-meta-clean-line">
          Selamat datang kembali, Ticketing Admin &mdash; Dashboard Kampung Coklat
        </div>
      </div>

        <!-- 2. Right: Clean Dropdown & Controls -->
        <div class="controls-hero-col">
          <div class="period-dropdown-wrapper">
            <select v-model="selectedPeriod" class="period-select-clean" @change="refreshCharts">
              <option v-for="opt in periodOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>


          <button type="button" class="btn-download-report">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Unduh Laporan
          </button>
        </div>
    </header>

    <!-- Section Title: Ringkasan Penjualan -->
    <div class="section-header-title">
      <div class="section-icon-dash"></div>
      <h2>Ringkasan Penjualan</h2>
    </div>

    <!-- 4 KPI Cards Grid (GTV, Tiket Terjual, Pengunjung Gate In, Member Baru) -->
    <section class="kpi-cards-grid-4">
      <!-- 1. Total GTV -->
      <KpiCard
        title="TOTAL GTV (PENDAPATAN)"
        :value="formatRupiah(currentMetrics.totalGtv)"
        theme="orange"
        icon="currency"
        tag="REALTIME"

        :comparison="currentMetrics.gtvComparison"
        subtitle="Gross Transaction Value"
      />

      <!-- 2. Total Tiket Terjual -->
      <KpiCard
        title="TOTAL TIKET TERJUAL"
        :value="`${currentMetrics.totalTickets.toLocaleString('id-ID')} Tiket`"
        theme="black"
        icon="ticket"

        :comparison="currentMetrics.ticketsComparison"
        subtitle="Reguler, Rombongan &amp; Paket"
      />

      <!-- 3. Total Pengunjung (Gate In) -->
      <KpiCard
        title="TOTAL PENGUNJUNG (GATE IN)"
        :value="`${currentMetrics.totalVisitors.toLocaleString('id-ID')} Pax`"
        theme="brown"
        icon="users"

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

        :comparison="currentMetrics.newMembersComparison"
        subtitle="Guestbook PP &amp; POS Kasir"
      />
    </section>

    <!-- Charts & Table Split Section -->
    <section class="dashboard-split-layout">
      <!-- Left: Chart -->
      <div class="split-left-col">
      <div class="bento-card main-chart-elevated">
        <div class="bento-card-header">
          <div class="header-title-group">
            <div class="title-with-badge">
              <h3 class="bento-card-title">Tren Pendapatan &amp; Tiket</h3>
            </div>
            <span class="bento-card-subtitle">
              {{ currentPeriodDetail.label }}: Distribusi fluktuasi omzet dan volume tiket tervalidasi gerbang.
            </span>
          </div>

          <div class="header-right-controls">
            <!-- Custom Legend Badges removed per user request -->
            <!-- Segmented Chart Toggle -->
            <div class="chart-type-pill">
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

        <!-- 3-Column Highlight Cards Strip -->
        <div class="chart-highlight-strip">
          <div class="highlight-bento-box">
            <div class="highlight-icon-circle bg-amber-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <div class="highlight-meta">
              <span class="highlight-label">Rata-rata Transaksi</span>
              <span class="highlight-val text-amber">Rp 20.000 / tiket</span>
            </div>
          </div>
          <div class="highlight-bento-box">
            <div class="highlight-icon-circle bg-cocoa-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="highlight-meta">
              <span class="highlight-label">Jam Kunjungan Teramai</span>
              <span class="highlight-val text-cocoa">10:00 - 14:00 WIB</span>
            </div>
          </div>
          <div class="highlight-bento-box">
            <div class="highlight-icon-circle bg-green-soft">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div class="highlight-meta">
              <span class="highlight-label">Konversi Gate Check-in</span>
              <span class="highlight-val text-green">89.0% Pax Tervalidasi</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Right: Recent Transactions Table -->
      <div class="split-right-col">
        <div class="bento-card recent-tx-card">
          <div class="tx-card-header">
            <h3 class="bento-card-title">Transaksi Terakhir</h3>
            <a href="#" class="tx-view-all">Lihat Semua</a>
          </div>
          
          <div class="tx-table-wrapper">
            <table class="tx-table">
              <thead>
                <tr>
                  <th>WAKTU</th>
                  <th>TIPE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10:45 AM</td>
                  <td class="td-type">Tiket Terusan</td>
                  <td>4</td>
                  <td class="td-total">Rp 300.000</td>
                  <td><span class="status-badge lunas">Lunas</span></td>
                </tr>
                <tr>
                  <td>10:42 AM</td>
                  <td class="td-type">B2B - SDN 1 Blitar</td>
                  <td>150</td>
                  <td class="td-total">Rp 3.000.000</td>
                  <td><span class="status-badge lunas">Lunas</span></td>
                </tr>
                <tr>
                  <td>10:35 AM</td>
                  <td class="td-type">Tiket Reguler</td>
                  <td>2</td>
                  <td class="td-total">Rp 40.000</td>
                  <td><span class="status-badge lunas">Lunas</span></td>
                </tr>
                <tr>
                  <td>10:15 AM</td>
                  <td class="td-type">Sewa Hall A</td>
                  <td>1</td>
                  <td class="td-total">Rp 2.500.000</td>
                  <td><span class="status-badge dp">DP 50%</span></td>
                </tr>
                <tr>
                  <td>09:50 AM</td>
                  <td class="td-type">Paket Edukasi Basic</td>
                  <td>20</td>
                  <td class="td-total">Rp 500.000</td>
                  <td><span class="status-badge lunas">Lunas</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Member Segmentation & Ticket Sales Grid -->
    <section class="crm-ticket-grid">
      <!-- Member Segmentation Concentric Radial Rings Card -->
      <div class="bento-card radial-rings-card-elevated">
        <div class="bento-card-header">
          <div class="header-title-left">
            <div class="header-icon-squircle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="header-text-group">
              <h3 class="bento-card-title">Segmentasi Member CRM</h3>
              <span class="bento-card-subtitle">Proporsi kategori pelanggan &amp; loyalitas terdaftar</span>
            </div>
          </div>
        </div>

        <div class="radial-gauge-flex-body">
          <div class="radial-rings-chart-container">
            <div class="donut-chart-wrapper" style="position: relative; width: 100%; height: 200px;">
              <canvas ref="segmentDonutCanvas"></canvas>
            </div>
            <div class="rings-bottom-metric">
              <div class="rings-bottom-total-row">
                <span class="bottom-total-label">Total Member:</span>
                <span class="bottom-total-val">{{ memberSegmentTotal.toLocaleString('id-ID') }}</span>
              </div>
            </div>

            <!-- Active badge below SVG -->
            <span class="bottom-active-badge" style="margin-top: 10px;">
              <span class="hub-live-dot"></span>
              <span>92% Aktif Terdaftar</span>
            </span>
          </div>

          <!-- Clean modern Legend -->
          <div class="radial-legend-modern">
            <div 
              v-for="seg in memberSegments" 
              :key="seg.code" 
              class="legend-modern-row"
              :class="{ 'is-hovered': activeHoverSegment === seg.code }"
              @mouseenter="activeHoverSegment = seg.code"
              @mouseleave="activeHoverSegment = null"
            >
              <div class="legend-modern-header">
                <span class="legend-color-indicator" :style="{ backgroundColor: seg.color }"></span>
                <span class="legend-modern-title">{{ seg.title }}</span>
                <span class="legend-modern-pct">{{ seg.percentage }}%</span>
              </div>
              <div class="legend-modern-desc">
                {{ seg.desc }}
              </div>
              <div class="legend-modern-bar">
                <div class="legend-modern-bar-fill" :style="{ width: `${seg.percentage}%`, backgroundColor: seg.color }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="crm-insight-matrix-3">
          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              <span>Member Baru</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">+215 Org</span>
              <span class="matrix-sub-pct text-green">+18.4%</span>
            </div>
          </div>
          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
              <span>Retensi Repeat</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">74.8%</span>
              <span class="matrix-sub-badge">Tinggi</span>
            </div>
          </div>
          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              <span>Rata-rata Transaksi</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">Rp 45.000</span>
              <span class="matrix-sub-sub">/ member</span>
            </div>
          </div>
        </div>

        <div class="crm-card-footer">
          <NuxtLink to="/reports" class="btn-see-more">
            <span>Buka Direktori WhatsApp Member</span>
            <span class="arrow-sym">&rarr;</span>
          </NuxtLink>
        </div>
      </div>


    </section>

    <!-- Operations Grid -->
    <section class="operations-grid" style="margin-bottom: 24px;">
      <div class="ticket-sales-col">
        <TicketSalesTable :ticket-items="currentTicketBreakdown" />
      </div>

      <div class="shift-wrapper">
        <ShiftSummaryCard 
          :shift-data="currentShiftData" 
          :shifts-list="allShiftList"
          :is-read-only="currentRole === 'owner'"
          @view-details="handleViewShiftLog"
          @close-shift="handleCloseShift"
        />
      </div>
    </section>

    <!-- Demografi Asal Pengunjung -->
    <section class="demographic-full-section">
      <div class="bento-card demographic-card-luxury">
        <div class="bento-card-header demo-header-wrap">
          <div class="header-title-left">
            <div class="header-icon-squircle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
            </div>
            <div class="header-text-group">
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 class="bento-card-title">Demografi Asal Pengunjung</h3>
              </div>
              <span class="bento-card-subtitle">
                Peta sebaran asal daerah wisatawan berbasis data integrasi transaksi POS Kasir &amp; kontak CRM WhatsApp
              </span>
            </div>
          </div>


        </div>

        <div 
          class="demographic-map-area demographic-map-luxury"
          :class="{ 'is-panning': isMapDragging }"
          @wheel.prevent="handleMapWheel"
          @mousedown="startMapPan"
          @mousemove="doMapPan"
          @mouseup="stopMapPan"
          @mouseleave="stopMapPan"
          @touchstart.passive="startMapTouch"
          @touchmove.passive="doMapTouch"
          @touchend="stopMapPan"
        >
          <div class="map-controls-floating">
            <div class="coords-indicator">
              <span class="pulse-gold-dot"></span>
              <span>8.1620° S, 112.1670° E &bull; Jawa Timur</span>
            </div>
            <div class="map-zoom-buttons-group">
              <button type="button" class="map-btn" title="Perbesar Peta" @click.stop="handleMapZoomIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <span class="zoom-level-text">{{ Math.round(mapZoom * 100) }}%</span>
              <button type="button" class="map-btn" title="Perkecil Peta" @click.stop="handleMapZoomOut">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <button type="button" class="map-btn map-btn-reset" title="Reset Posisi Peta" @click.stop="handleMapReset">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
            </div>
          </div>

          <div class="map-pan-zoom-container" :style="{ transform: `translate(${mapPanX}px, ${mapPanY}px) scale(${mapZoom})` }">
            <div class="radar-ring ring-center-core"></div>
            <div class="radar-ring ring-10km"></div>
            <div class="radar-ring ring-30km"></div>
            <div class="radar-ring ring-60km"></div>
            <div class="radar-ring ring-120km"></div>

            <svg class="map-vector-canvas" :class="{ 'has-active-hover': activeHoverCity !== null }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" preserveAspectRatio="none" fill="none">
              <path d="M 450 170 L 450 270" stroke="#D97706" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 4" class="laser-route-path" :class="{ 'laser-active': activeHoverCity === 'blitar-kota' }" />
              <path d="M 620 360 Q 535 340 450 270" stroke="#F59E0B" stroke-width="2.8" stroke-linecap="round" stroke-dasharray="8 6" class="laser-route-path" :class="{ 'laser-active': activeHoverCity === 'blitar-kab' }" />
              <path d="M 240 110 Q 330 180 450 270" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="8 6" class="laser-route-path" :class="{ 'laser-active': activeHoverCity === 'kediri' }" />
              <path d="M 180 350 Q 300 330 450 270" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="8 6" class="laser-route-path" :class="{ 'laser-active': activeHoverCity === 'tulungagung' }" />
              <path d="M 800 130 Q 640 185 450 270" stroke="#7C3AED" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="8 6" class="laser-route-path" :class="{ 'laser-active': activeHoverCity === 'malang-sby' }" />
              <path d="M40,240 Q200,180 400,220 T750,210 T950,250" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M80,350 Q260,300 450,330 T820,360" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M320,70 Q420,170 470,280 T520,460" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M140,110 Q280,220 430,260 T680,370" stroke="#DCD3C7" stroke-width="1.2"/>
            </svg>

            <div class="map-epicenter-marker">
              <span class="epicenter-pulse-ring"></span>
              <span class="epicenter-core-dot"></span>
              <div class="epicenter-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24" stroke="currentColor" stroke-width="1.5" class="epicenter-svg-icon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#111111"/></svg>
                <span class="epicenter-title">KAMPUNG COKLAT</span>
                <span class="epicenter-tag">EPISENTRUM</span>
              </div>
            </div>

            <div v-for="city in originCitiesList" :key="city.id" class="map-pin-marker" :class="[`pin-${city.id}`, { 'is-hovered': activeHoverCity === city.id }]" :style="city.position" @mouseenter="activeHoverCity = city.id" @mouseleave="activeHoverCity = null">
              <span class="pin-beacon" :class="city.dotClass"></span>
              <div class="pin-card-bubble" :class="city.badgeClass">
                <span class="pin-glyph-dot" :class="city.dotClass"></span>
                <span class="pin-city">{{ city.name }}</span>
                <span class="pin-divider">&bull;</span>
                <span class="pin-visitors">{{ city.pax }} Pax</span>
                <span class="pin-share">({{ city.percentage }}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="demo-bottom-cities-grid">
          <div v-for="(city, idx) in originCitiesList" :key="city.id" class="city-metric-slate" :class="[{ 'is-lead-city': idx === 0 }, { 'is-hover-highlight': activeHoverCity === city.id }]" @mouseenter="activeHoverCity = city.id" @mouseleave="activeHoverCity = null">
            <div class="slate-top-row">
              <div class="slate-rank-wrap">
                <span class="slate-rank-badge" :class="{ 'badge-crown': idx === 0 }">#{{ idx + 1 }}</span>
                <span class="slate-city-name">{{ city.name }}</span>
              </div>
              <span class="slate-pct-text" :style="{ color: city.color }">{{ city.percentage }}%</span>
            </div>

            <div class="slate-metrics-clean">
              <span class="slate-val-pax">{{ city.pax.toLocaleString('id-ID') }} <small>pax</small></span>
              <span class="slate-val-divider">&bull;</span>
              <span class="slate-val-gtv">{{ formatRupiah(city.gtv) }}</span>
            </div>

            <div class="slate-track-line">
              <div class="slate-fill-line" :style="{ width: `${city.percentage * 2}%`, backgroundColor: city.color }"></div>
            </div>
            
            <div class="slate-bottom-sub">
              {{ city.character }}
            </div>
          </div>
        </div>


      </div>
    </section>



    <!-- Shift Log Modal Dialog -->
    <div v-if="showShiftModal" class="modal-backdrop" @click.self="showShiftModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">Audit Rekonsiliasi Kasir</span>
            <h3>Log Shift: {{ currentShiftData.shiftName }}</h3>
          </div>
          <button class="btn-close" @click="showShiftModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-info-row">
            <span class="info-label">Kasir POS</span>
            <span class="info-val">{{ currentShiftData.cashierName }} ({{ currentShiftData.cashierId }})</span>
          </div>
          <div class="modal-info-row">
            <span class="info-label">Terminal / Lokasi</span>
            <span class="info-val">{{ currentShiftData.terminalName }}</span>
          </div>
          <div class="modal-info-row">
            <span class="info-label">Waktu Operasional</span>
            <span class="info-val">{{ currentShiftData.date }}, {{ currentShiftData.startTime }} WIB - {{ currentShiftData.endTime }} WIB</span>
          </div>
          <div class="modal-info-row">
            <span class="info-label">Total Tiket Terjual</span>
            <span class="info-val">{{ currentShiftData.totalTicketsSold }} Tiket</span>
          </div>
          <div class="modal-info-row">
            <span class="info-label">Total Kas Fisik Diterima</span>
            <span class="info-val">{{ formatRupiah(currentShiftData.cashReceived) }}</span>
          </div>
          <div class="modal-info-row">
            <span class="info-label">Total Non-Tunai / QRIS</span>
            <span class="info-val">{{ formatRupiah(currentShiftData.nonCashReceived) }}</span>
          </div>
          <div class="alert-info-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span><strong>Catatan Sistem:</strong> {{ currentShiftData.reconciliationNotes }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-action-secondary" @click="showShiftModal = false">Tutup Laporan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

// Subcomponents
import KpiCard from '~/components/dashboard/KpiCard.vue'
import OwnerNotice from '~/components/dashboard/OwnerNotice.vue'
import TicketSalesTable, { type TicketCategoryItem } from '~/components/dashboard/TicketSalesTable.vue'
import ShiftSummaryCard, { type ShiftInfo } from '~/components/dashboard/ShiftSummaryCard.vue'

import { useAuth, type UserRole } from '~/composables/useAuth'

// Register Chart.js modules
Chart.register(...registerables)

// Meta Configuration
definePageMeta({
  layout: 'admin'
})

// Current Role
const { currentRole } = useAuth()

// CRM Segment Hover State
const activeHoverSegment = ref<string | null>(null)

// Format Rupiah Helper
const formatRupiah = (val: number | undefined | null) => {
  if (!val && val !== 0) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}

// -------------------------------------------------------------------------
// INTERACTIVE DEMOGRAPHIC MAP STATE & CONTROLS (Pan & Zoom)
// -------------------------------------------------------------------------
const mapZoom = ref(1)
const mapPanX = ref(0)
const mapPanY = ref(0)
const isMapDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

const handleMapZoomIn = () => {
  if (mapZoom.value < 2.5) {
    mapZoom.value = Number((mapZoom.value + 0.25).toFixed(2))
  }
}

const handleMapZoomOut = () => {
  if (mapZoom.value > 0.75) {
    mapZoom.value = Number((mapZoom.value - 0.25).toFixed(2))
  }
}

const handleMapReset = () => {
  mapZoom.value = 1
  mapPanX.value = 0
  mapPanY.value = 0
}

const handleMapWheel = (e: WheelEvent) => {
  if (e.deltaY < 0) {
    handleMapZoomIn()
  } else {
    handleMapZoomOut()
  }
}

const startMapPan = (e: MouseEvent) => {
  isMapDragging.value = true
  dragStartX.value = e.clientX - mapPanX.value
  dragStartY.value = e.clientY - mapPanY.value
}

const doMapPan = (e: MouseEvent) => {
  if (!isMapDragging.value) return
  mapPanX.value = e.clientX - dragStartX.value
  mapPanY.value = e.clientY - dragStartY.value
}

const stopMapPan = () => {
  isMapDragging.value = false
}

const startMapTouch = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    isMapDragging.value = true
    dragStartX.value = e.touches[0].clientX - mapPanX.value
    dragStartY.value = e.touches[0].clientY - mapPanY.value
  }
}

const doMapTouch = (e: TouchEvent) => {
  if (!isMapDragging.value || e.touches.length !== 1) return
  mapPanX.value = e.touches[0].clientX - dragStartX.value
  mapPanY.value = e.touches[0].clientY - dragStartY.value
}

// -------------------------------------------------------------------------
// REGIONAL DEMOGRAPHIC ORIGIN CITIES
// -------------------------------------------------------------------------
interface OriginCityData {
  id: string
  name: string
  region: string
  pax: number
  percentage: number
  gtv: number
  character: string
  color: string
  dotClass: string
  badgeClass: string
  travelTime: string
  position: { top: string; left: string }
}

const activeHoverCity = ref<string | null>(null)

const originCitiesList = computed<OriginCityData[]>(() => [
  { id: 'blitar-kota', name: 'Kota Blitar', region: 'Pusat Kota & Wisatawan Lokal', pax: 940, percentage: 38.4, gtv: 18800000, character: 'Wisatawan Keluarga & Repeat Member', color: '#D97706', dotClass: 'dot-gold', badgeClass: 'bubble-gold', travelTime: '< 15 Menit', position: { top: '34%', left: '45%' } },
  { id: 'blitar-kab', name: 'Kab. Blitar', region: 'Wlingi, Kanigoro & Sekitar', pax: 580, percentage: 23.7, gtv: 11600000, character: 'Keluarga, Anak & Santri Akhir Pekan', color: '#F59E0B', dotClass: 'dot-amber', badgeClass: 'bubble-amber', travelTime: '20 - 40 Menit', position: { top: '72%', left: '62%' } },
  { id: 'kediri', name: 'Kediri Raya', region: 'Koridor Mataraman Utara', pax: 390, percentage: 15.9, gtv: 7800000, character: 'Wisata Edukasi & Rombongan Komunitas', color: '#2563EB', dotClass: 'dot-blue', badgeClass: 'bubble-blue', travelTime: '45 - 60 Menit', position: { top: '22%', left: '24%' } },
  { id: 'tulungagung', name: 'Tulungagung & Trenggalek', region: 'Koridor Jalur Lintas Selatan (JLS)', pax: 290, percentage: 11.8, gtv: 5800000, character: 'Paket Terusan Wahana Edukasi Coklat', color: '#059669', dotClass: 'dot-green', badgeClass: 'bubble-green', travelTime: '45 - 60 Menit', position: { top: '70%', left: '18%' } },
  { id: 'malang-sby', name: 'Malang & Surabaya', region: 'Regional Jawa Timur & Tol Trans-Jawa', pax: 250, percentage: 10.2, gtv: 5000000, character: 'Rombongan Bus Study Tour & Biro Wisata', color: '#7C3AED', dotClass: 'dot-purple', badgeClass: 'bubble-purple', travelTime: '90 - 150 Menit', position: { top: '26%', left: '80%' } }
])

// -------------------------------------------------------------------------
type PeriodType = 'today' | 'yesterday' | 'week' | 'last_week' | 'month' | 'last_month' | 'quarter' | 'year' | 'custom'

interface PeriodOption {
  value: PeriodType
  label: string
  subtitle: string
  group: 'daily' | 'periodic' | 'annual'
  badge?: string
}

const selectedPeriod = ref<PeriodType>('today')
const isPeriodMenuOpen = ref(false)
const chartType = ref<'line' | 'bar'>('line')
const isLoading = ref(false)
const showShiftModal = ref(false)
const showCustomDateModal = ref(false)

const customStartDate = ref('2026-08-01')
const customEndDate = ref('2026-08-19')
const excelTabStripRef = ref<HTMLElement | null>(null)

const periodOptions: PeriodOption[] = [
  { value: 'today', label: 'Hari Ini', subtitle: '19 Agustus 2026', group: 'daily', badge: 'Live' },
  { value: 'yesterday', label: 'Kemarin', subtitle: '18 Agustus 2026', group: 'daily' },
  { value: 'week', label: '7 Hari Terakhir', subtitle: '13 - 19 Agu 2026', group: 'periodic', badge: 'Populer' },
  { value: 'last_week', label: 'Minggu Lalu', subtitle: '06 - 12 Agu 2026', group: 'periodic' },
  { value: 'month', label: 'Bulan Ini', subtitle: '01 - 19 Agu 2026', group: 'periodic' },
  { value: 'last_month', label: 'Bulan Lalu', subtitle: '01 - 31 Jul 2026', group: 'periodic' },
  { value: 'quarter', label: 'Kuartal Q3', subtitle: 'Juli - September 2026', group: 'annual' },
  { value: 'year', label: 'Tahun 2026', subtitle: '01 Jan - 19 Agu 2026', group: 'annual', badge: 'YTD' }
]

const currentPeriodDetail = computed(() => {
  if (selectedPeriod.value === 'custom') {
    return { value: 'custom' as PeriodType, label: 'Kustom Tanggal', subtitle: `${customStartDate.value} s/d ${customEndDate.value}`, group: 'periodic' as const, badge: 'Rentang Kustom' }
  }
  return periodOptions.find(p => p.value === selectedPeriod.value) || periodOptions[0]
})

const selectPeriodOption = (val: PeriodType, event?: MouseEvent) => {
  selectedPeriod.value = val
  if (event && event.currentTarget) {
    const target = event.currentTarget as HTMLElement
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
  refreshCharts()
}

const toggleCustomDate = () => {
  refreshCharts()
}

const applyCustomDateRange = () => {
  selectedPeriod.value = 'custom'
  showCustomDateModal.value = false
  refreshCharts()
}

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: METRICS DATA]
// -------------------------------------------------------------------------
const mockMetricsMap: Record<string, { totalGtv: number, gtvComparison: string, totalTickets: number, ticketsComparison: string, totalVisitors: number, visitorsComparison: string, newMembers: number, newMembersComparison: string }> = {
  today: { totalGtv: 48750000, gtvComparison: '+14.4% vs kemarin (Rp 42.6 Jt)', totalTickets: 2450, ticketsComparison: '+320 tiket vs kemarin', totalVisitors: 2180, visitorsComparison: '89.0% check-in rate (Gate)', newMembers: 215, newMembersComparison: '+38 member vs kemarin' },
  yesterday: { totalGtv: 42600000, gtvComparison: '+8.1% vs rata-rata harian', totalTickets: 2130, ticketsComparison: '+140 tiket vs H-2', totalVisitors: 1940, visitorsComparison: '91.1% check-in rate (Gate)', newMembers: 177, newMembersComparison: '+22 member' },
  week: { totalGtv: 312500000, gtvComparison: '+18.2% vs 7 hari sebelumnya', totalTickets: 15625, ticketsComparison: '+2.410 tiket vs 7 hari sebelumnya', totalVisitors: 14280, visitorsComparison: '91.4% check-in rate (Gate)', newMembers: 1420, newMembersComparison: '+280 member vs 7 hari sebelumnya' },
  last_week: { totalGtv: 264300000, gtvComparison: '+11.5% vs minggu sebelumnya', totalTickets: 13215, ticketsComparison: '+1.350 tiket', totalVisitors: 12050, visitorsComparison: '91.2% check-in rate (Gate)', newMembers: 1140, newMembersComparison: '+195 member' },
  month: { totalGtv: 1280000000, gtvComparison: '+24.5% vs bulan lalu', totalTickets: 64200, ticketsComparison: '+11.200 tiket vs bulan lalu', totalVisitors: 59800, visitorsComparison: '93.1% check-in rate (Gate)', newMembers: 5850, newMembersComparison: '+1.150 member vs bulan lalu' },
  last_month: { totalGtv: 1028000000, gtvComparison: '+16.0% vs Juni 2026', totalTickets: 53000, ticketsComparison: '+8.400 tiket', totalVisitors: 49200, visitorsComparison: '92.8% check-in rate (Gate)', newMembers: 4700, newMembersComparison: '+820 member' },
  quarter: { totalGtv: 2308000000, gtvComparison: '+21.4% vs Q2 2026', totalTickets: 117200, ticketsComparison: '+19.600 tiket vs Q2', totalVisitors: 109000, visitorsComparison: '93.0% check-in rate (Gate)', newMembers: 10550, newMembersComparison: '+1.970 member vs Q2' },
  year: { totalGtv: 9480000000, gtvComparison: '+28.6% vs periode sama 2025', totalTickets: 474000, ticketsComparison: '+84.000 tiket vs 2025', totalVisitors: 442000, visitorsComparison: '93.2% check-in rate (Gate)', newMembers: 42600, newMembersComparison: '+8.400 member vs 2025' },
  custom: { totalGtv: 785000000, gtvComparison: 'Rentang 1 - 19 Agustus 2026', totalTickets: 39250, ticketsComparison: '39.250 tiket tervalidasi', totalVisitors: 36500, visitorsComparison: '93.0% check-in rate', newMembers: 3580, newMembersComparison: '3.580 member baru' }
}

const currentMetrics = computed(() => {
  return mockMetricsMap[selectedPeriod.value] || mockMetricsMap.today
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: CRM MEMBER SEGMENTS & RESONANCE SCORES]
// -------------------------------------------------------------------------
const memberSegments = ref([
  { code: 'PR', title: 'Reguler Kasir POS', count: 8640, percentage: 58.3, color: '#F97316', desc: 'Pelanggan langsung (walk-in) yang melakukan transaksi reguler di loket kasir utama dan wahana.' },
  { code: 'PP', title: 'Promo WhatsApp', count: 4320, percentage: 29.2, color: '#271710', desc: 'Pelanggan aktif hasil konversi dari kampanye broadcast diskon & promo tiket via WhatsApp Official.' },
  { code: 'PT', title: 'Paket Terusan Edukasi', count: 1860, percentage: 12.5, color: '#684534', desc: 'Pelanggan VIP prioritas yang mereservasi paket lengkap (termasuk wahana bermain & mini bioskop 3D).' }
])

const memberSegmentTotal = computed(() => memberSegments.value.reduce((acc, seg) => acc + seg.count, 0))

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: TICKET SALES BREAKDOWN (4 COMPLETE CATEGORIES)]
// -------------------------------------------------------------------------
const mockTicketBreakdownMap: Record<string, any[]> = {
  today: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 1650, totalGtv: 33000000, percentage: 50.2, color: '#F97316', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 495, totalGtv: 17325000, percentage: 26.4, color: '#271710', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 390, totalGtv: 9750000, percentage: 14.8, color: '#684534', bgLight: '#F9F8F6' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 375, totalGtv: 5625000, percentage: 8.6, color: '#D1D5DB', bgLight: '#F3F4F6' }
  ],
  week: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 10450, totalGtv: 209000000, percentage: 50.5, color: '#F97316', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 3120, totalGtv: 109200000, percentage: 26.4, color: '#271710', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 2450, totalGtv: 61250000, percentage: 14.8, color: '#684534', bgLight: '#F9F8F6' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 2320, totalGtv: 34800000, percentage: 8.3, color: '#D1D5DB', bgLight: '#F3F4F6' }
  ],
  month: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 42800, totalGtv: 856000000, percentage: 50.8, color: '#F97316', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 12600, totalGtv: 441000000, percentage: 26.1, color: '#271710', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 10050, totalGtv: 251250000, percentage: 14.9, color: '#684534', bgLight: '#F9F8F6' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 9150, totalGtv: 137250000, percentage: 8.2, color: '#D1D5DB', bgLight: '#F3F4F6' }
  ],
  year: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 428000, totalGtv: 8560000000, percentage: 50.8, color: '#F97316', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 126000, totalGtv: 4410000000, percentage: 26.1, color: '#271710', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 100500, totalGtv: 2512500000, percentage: 14.9, color: '#684534', bgLight: '#F9F8F6' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 91500, totalGtv: 1372500000, percentage: 8.2, color: '#D1D5DB', bgLight: '#F3F4F6' }
  ]
}

const currentTicketBreakdown = computed(() => mockTicketBreakdownMap[selectedPeriod.value] || mockTicketBreakdownMap.month)

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: DEMOGRAPHIC ORIGIN CITIES]
// -------------------------------------------------------------------------
const mockDemographicsMap: Record<string, any[]> = {
  today: [
    { name: 'Kota Blitar', visitors: 940, percentage: 38.4, isLocal: true, color: '#D97706' },
    { name: 'Kabupaten Blitar', visitors: 580, percentage: 23.7, isLocal: true, color: '#F59E0B' },
    { name: 'Kediri & Sekitarnya', visitors: 390, percentage: 15.9, isLocal: false, color: '#8C786E' },
    { name: 'Tulungagung & Trenggalek', visitors: 290, percentage: 11.8, isLocal: false, color: '#D4C9BD' },
    { name: 'Malang & Surabaya', visitors: 250, percentage: 10.2, isLocal: false, color: '#E5E7EB' }
  ],
  week: [
    { name: 'Kota Blitar', visitors: 5800, percentage: 37.1, isLocal: true, color: '#D97706' },
    { name: 'Kabupaten Blitar', visitors: 3950, percentage: 25.2, isLocal: true, color: '#F59E0B' },
    { name: 'Kediri & Sekitarnya', visitors: 2450, percentage: 15.6, isLocal: false, color: '#8C786E' },
    { name: 'Tulungagung & Trenggalek', visitors: 1850, percentage: 11.8, isLocal: false, color: '#D4C9BD' },
    { name: 'Malang & Surabaya', visitors: 1590, percentage: 10.1, isLocal: false, color: '#E5E7EB' }
  ],
  month: [
    { name: 'Kota Blitar', visitors: 24500, percentage: 37.5, isLocal: true, color: '#D97706' },
    { name: 'Kabupaten Blitar', visitors: 16800, percentage: 25.7, isLocal: true, color: '#F59E0B' },
    { name: 'Kediri & Sekitarnya', visitors: 9800, percentage: 15.0, isLocal: false, color: '#8C786E' },
    { name: 'Tulungagung & Trenggalek', visitors: 7600, percentage: 11.6, isLocal: false, color: '#D4C9BD' },
    { name: 'Malang & Surabaya', visitors: 6500, percentage: 9.9, isLocal: false, color: '#E5E7EB' }
  ]
}

const currentDemographics = computed(() => mockDemographicsMap[selectedPeriod.value] || mockDemographicsMap.month)

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: PAYMENT METHODS SUMMARY]
// -------------------------------------------------------------------------
const mockPaymentMethodsMap: Record<string, any[]> = {
  today: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 23850000, transactions: 1195, percentage: 49, status: 'Settled', color: '#B45309', bgLight: '#FFFDF9' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 17200000, transactions: 860, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFDF9' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 5850000, transactions: 295, percentage: 12, status: 'Settled', color: '#8C786E', bgLight: '#FFFDF9' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 1850000, transactions: 100, percentage: 4, status: 'Settled', color: '#D6CCC2', bgLight: '#FFFDF9' }
  ],
  week: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 153125000, transactions: 7655, percentage: 49, status: 'Settled', color: '#B45309', bgLight: '#FFFDF9' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 109375000, transactions: 5468, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFDF9' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 37500000, transactions: 1875, percentage: 12, status: 'Settled', color: '#8C786E', bgLight: '#FFFDF9' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 12500000, transactions: 625, percentage: 4, status: 'Settled', color: '#D6CCC2', bgLight: '#FFFDF9' }
  ],
  month: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 612500000, transactions: 30625, percentage: 49, status: 'Settled', color: '#B45309', bgLight: '#FFFDF9' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 437500000, transactions: 21875, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFDF9' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 150000000, transactions: 7500, percentage: 12, status: 'Settled', color: '#8C786E', bgLight: '#FFFDF9' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 50000000, transactions: 2500, percentage: 4, status: 'Settled', color: '#D6CCC2', bgLight: '#FFFDF9' }
  ]
}

const currentPaymentMethods = computed(() => mockPaymentMethodsMap[selectedPeriod.value] || mockPaymentMethodsMap.month)
const totalPaymentAmount = computed(() => currentPaymentMethods.value.reduce((acc, pay) => acc + pay.amount, 0))

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: CASHIER SHIFT SUMMARY DATA]
// -------------------------------------------------------------------------
const allShiftList = ref<ShiftInfo[]>([
  {
    id: 'ALL', shiftName: 'Agregat Operasional Hari Ini', terminalName: '4 Loket Aktif (Utama & 3 Wahana)', cashierName: 'Semua Loket (1 Utama + 3 Wahana)', cashierId: 'ALL-POS', date: '19 Agustus 2026', startTime: '08:00', endTime: '17:00', totalTransactions: 1254, totalTicketsSold: 2450, cashReceived: 17200000, nonCashReceived: 31550000, reconciliationStatus: 'balanced', statusLabel: '4 Loket Beroperasi (Live)', reconciliationNotes: 'Seluruh pencatatan laci kasir keempat loket klop 100% tanpa selisih.', variance: 0, isClosed: false
  },
  {
    id: 'LOKET-UTAMA', shiftName: 'Shift 1 (Pagi)', terminalName: 'Loket Utama (Main Gate)', cashierName: 'Siti Rahmawati', cashierId: 'KASIR-01', date: '19 Agustus 2026', startTime: '08:00', endTime: '17:00', totalTransactions: 782, totalTicketsSold: 1650, cashReceived: 11450000, nonCashReceived: 21550000, reconciliationStatus: 'balanced', statusLabel: 'Loket Beroperasi (Live)', reconciliationNotes: 'Pencatatan kas fisik laci sesuai dengan struk tiket masuk reguler.', variance: 0, isClosed: false
  }
])

const currentShiftData = computed(() => allShiftList.value[0])

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

// =========================================================================
// CHART.JS INSTANCES & RENDERING (Ultra-Smooth Bezier Gradient Spline)
// =========================================================================
const revenueChartCanvas = ref<HTMLCanvasElement | null>(null)
const memberChartCanvas = ref<HTMLCanvasElement | null>(null)
let revenueChartInstance: Chart | null = null
let memberChartInstance: Chart | null = null

const getChartLabels = (period: PeriodType) => {
  if (period === 'today' || period === 'yesterday') return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  else if (period === 'week' || period === 'last_week') return ['Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu']
  else if (period === 'quarter') return ['Bulan 1', 'Bulan 2', 'Bulan 3']
  else if (period === 'year') return ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
  return ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
}

const getChartGtvData = (period: PeriodType) => {
  if (period === 'today') return [2400000, 4100000, 7800000, 8900000, 5200000, 6800000, 7200000, 4100000, 1850000, 400000]
  else if (period === 'yesterday') return [2100000, 3600000, 6900000, 7800000, 4800000, 6100000, 6500000, 3200000, 1400000, 200000]
  else if (period === 'week') return [32000000, 36500000, 68000000, 74500000, 28000000, 24750000, 48750000]
  else if (period === 'last_week') return [28000000, 31000000, 59000000, 62000000, 24000000, 21000000, 39300000]
  else if (period === 'quarter') return [680000000, 780000000, 848000000]
  else if (period === 'year') return [850000000, 920000000, 1140000000, 1280000000, 1340000000, 1410000000, 1260000000, 1280000000]
  return [280000000, 340000000, 375000000, 285000000]
}

const getChartTicketData = (period: PeriodType) => {
  if (period === 'today') return [140, 260, 480, 560, 310, 420, 450, 240, 110, 25]
  else if (period === 'yesterday') return [120, 220, 410, 480, 280, 370, 400, 190, 80, 15]
  else if (period === 'week') return [1950, 2200, 4100, 4550, 1700, 1500, 2980]
  else if (period === 'last_week') return [1650, 1850, 3550, 3750, 1450, 1250, 2350]
  else if (period === 'quarter') return [38000, 43500, 47800]
  else if (period === 'year') return [48000, 52000, 64000, 72000, 75500, 79000, 71000, 72000]
  return [17500, 21000, 23500, 17800]
}

const initRevenueChart = () => {
  if (!revenueChartCanvas.value) return
  if (revenueChartInstance) revenueChartInstance.destroy()

  const labels = getChartLabels(selectedPeriod.value)
  const gtvData = getChartGtvData(selectedPeriod.value)
  const ticketData = getChartTicketData(selectedPeriod.value)

  const ctx = revenueChartCanvas.value.getContext('2d')
  let gtvLineGradient: any = 'rgba(245, 158, 11, 0.25)'
  let gtvBarGradient: any = '#F59E0B'
  let ticketBarGradient: any = '#111111'

  if (ctx) {
    gtvLineGradient = ctx.createLinearGradient(0, 0, 0, 320)
    gtvLineGradient.addColorStop(0, 'rgba(245, 158, 11, 0.42)')
    gtvLineGradient.addColorStop(0.6, 'rgba(245, 158, 11, 0.10)')
    gtvLineGradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)')

    gtvBarGradient = ctx.createLinearGradient(0, 0, 0, 290)
    gtvBarGradient.addColorStop(0, '#FBBF24')
    gtvBarGradient.addColorStop(0.3, '#F59E0B')
    gtvBarGradient.addColorStop(1, '#B45309')

    ticketBarGradient = ctx.createLinearGradient(0, 0, 0, 290)
    ticketBarGradient.addColorStop(0, '#5A3525')
    ticketBarGradient.addColorStop(0.4, '#381C10')
    ticketBarGradient.addColorStop(1, '#1A0B05')
  }

  const isLine = chartType.value === 'line'

  revenueChartInstance = new Chart(revenueChartCanvas.value, {
    type: chartType.value,
    data: {
      labels,
      datasets: [
        {
          label: 'Pendapatan GTV', data: gtvData, borderColor: '#F59E0B', backgroundColor: isLine ? gtvLineGradient : gtvBarGradient, borderWidth: isLine ? 3.5 : 0, tension: 0.42, fill: isLine, yAxisID: 'y', pointRadius: isLine ? 5 : 0, pointHoverRadius: isLine ? 8.5 : 0, pointBackgroundColor: '#FFFFFF', pointBorderColor: '#F59E0B', pointBorderWidth: 2.5, borderRadius: !isLine ? { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 } : 0, borderSkipped: false, barPercentage: 0.72, categoryPercentage: 0.68
        },
        {
          label: 'Volume Tiket', data: ticketData, borderColor: '#111111', backgroundColor: isLine ? 'transparent' : ticketBarGradient, borderWidth: isLine ? 2.8 : 0, tension: 0.42, fill: false, yAxisID: 'y1', pointRadius: isLine ? 4.5 : 0, pointHoverRadius: isLine ? 7.5 : 0, pointBackgroundColor: '#111111', pointBorderColor: '#FFFFFF', pointBorderWidth: 2, borderRadius: !isLine ? { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 } : 0, borderSkipped: false, barPercentage: 0.72, categoryPercentage: 0.68
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#FFFFFF', titleColor: '#111111', titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: 'bold' }, bodyColor: '#5A4034', bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 11.5, weight: '600' }, padding: 12, cornerRadius: 8, borderColor: '#E2D9CE', borderWidth: 1, displayColors: true, boxWidth: 6, boxHeight: 6, boxPadding: 6, usePointStyle: true, titleMarginBottom: 6, bodySpacing: 4,
          callbacks: {
            title: (items) => items.length ? `Waktu: ${items[0].label} WIB` : '',
            label: (ctx) => {
              const label = ctx.dataset.label || ''
              const val = ctx.parsed.y as number
              return label === 'Pendapatan GTV' ? ` ${label}: ${formatRupiah(val)}` : ` ${label}: ${val.toLocaleString('id-ID')} Pax`
            },
            afterBody: (items) => {
              if (items.length >= 2) {
                const gtv = items[0].parsed.y as number
                const tickets = items[1].parsed.y as number
                if (tickets > 0) return `\nRata-rata/Tiket: ${formatRupiah(Math.round(gtv / tickets))}`
              }
              return ''
            }
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(0, 0, 0, 0.04)' }, ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' }, color: '#78655C' } },
        y: { type: 'linear', display: true, position: 'left', beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 10.5, weight: '600' }, color: '#78655C', callback: (val) => { const num = val as number; if (num >= 1000000000) return `Rp ${(num / 1000000000).toFixed(1)} M`; if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(0)} Jt`; if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)} Rb`; return `Rp ${num}` } } },
        y1: { type: 'linear', display: true, position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 10.5, weight: '600' }, color: '#111111', callback: (val) => { const num = val as number; if (num >= 1000) return `${(num / 1000).toFixed(0)}k Pax`; return `${num} Pax` } } }
      }
    }
  })
}

const setChartType = (type: 'line' | 'bar') => {
  chartType.value = type
  initRevenueChart()
}

const refreshCharts = () => {
  nextTick(() => {
    initRevenueChart()
    initSegmentDonutChart()
  })
}

const refreshData = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    refreshCharts()
  }, 400)
}

// -------------------------------------------------------------------------
// CHART-BASED SEGMENT DONUT
// -------------------------------------------------------------------------
const segmentDonutCanvas = ref<HTMLCanvasElement | null>(null)
let segChart: Chart | null = null

const initSegmentDonutChart = () => {
  if (segmentDonutCanvas.value) {
    if (segChart) segChart.destroy()
    segChart = new Chart(segmentDonutCanvas.value, {
      type: 'doughnut',
      data: {
        labels: memberSegments.value.map(s => `${s.code} - ${s.title.split(' ')[0]} (${s.percentage}%)`),
        datasets: [{
          data: memberSegments.value.map(s => s.count),
          backgroundColor: memberSegments.value.map(s => s.color),
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '55%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                return ` ${context.formattedValue} Members`
              }
            }
          }
        }
      }
    })
  }
}

onMounted(() => {
  initRevenueChart()
  initSegmentDonutChart()
})

watch(selectedPeriod, () => {
  refreshCharts()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

.dashboard-container {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.executive-command-header {
  background: transparent;
  margin: -24px -36px 24px -36px;
  padding: 24px 36px;
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

.title-with-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.section-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -6px;
  margin-bottom: 0px;
}

.section-icon-dash {
  width: 12px;
  height: 4px;
  border-radius: 4px;
  background: #F59E0B;
}

.section-header-title h2 {
  font-size: 16px;
  font-weight: 800;
  color: #5A4034;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
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

.period-dropdown-wrapper {
  position: relative;
}

.period-select-clean {
  appearance: none;
  background: #FFFFFF;
  border: 1px solid #E2D9CE;
  color: #1F120B;
  padding: 10px 40px 10px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  outline: none;
  transition: all 0.2s ease;
}

.period-select-clean:hover {
  border-color: #D97706;
  background: #FFFDF9;
}

.period-dropdown-wrapper::after {
  content: '';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-20%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #1F120B;
  pointer-events: none;
}

.btn-custom-date-icon-only {
  width: 42px;
  height: 42px;
  background: #FFFFFF;
  border: 1px solid #E2D9CE;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5A4034;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
  position: relative;
}

.btn-custom-date-icon-only:hover {
  border-color: #D97706;
  background: #FFFDF9;
  color: #D97706;
  transform: translateY(-1px);
}

.btn-custom-date-icon-only.is-active {
  background: #FFF8F1;
  border-color: #D97706;
  color: #D97706;
}

.custom-active-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #F29727;
  box-shadow: 0 0 6px #F29727;
}

.btn-header-refresh-icon {
  width: 42px;
  height: 42px;
  background: #FFFFFF;
  border: 1px solid #E2D9CE;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5A4034;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
}

.btn-header-refresh-icon:hover:not(:disabled) {
  border-color: #D97706;
  background: #FFFDF9;
  color: #D97706;
  transform: translateY(-1px);
}

.btn-header-refresh-icon:active:not(:disabled) {
  transform: translateY(0);
}

.btn-header-refresh-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.popover-fade-enter-active,
.popover-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.popover-fade-enter-from,
.popover-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.kpi-cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.bento-card {
  background: #FFFFFF;
  border: 1px solid #EFEAE2;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.bento-card:hover {
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.08);
  border-color: #D4C9BD;
}

.bento-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 12px;
  flex-wrap: wrap;
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.header-title-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-squircle {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #FFFDF9;
  border: 1px solid #EFEAE2;
  color: #D97706;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-squircle svg {
  width: 20px;
  height: 20px;
}

.header-text-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.bento-icon-chip {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chip-amber { background: #FEF3C7; color: #D97706; }
.chip-brown { background: #F5F3EF; color: #111111; }
.chip-green { background: #ECFDF5; color: #059669; }
.chip-blue  { background: #EFF6FF; color: #2563EB; }

.bento-card-title {
  font-size: 17px;
  font-weight: 800;
  color: #111111;
  margin: 0;
  letter-spacing: -0.3px;
}

.peak-beacon-chip {
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

.beacon-dot {
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
}

.bento-card-subtitle {
  font-size: 13.5px;
  font-weight: 600;
  color: #111111;
  margin: 2px 0 0 0;
  line-height: 1.5;
}

.header-right-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

.chart-legend-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

.legend-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 11px;
  border-radius: 8px;
  border: 1px solid #E8DFD5;
  background: #FFFDF9;
  color: #111111;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
  transition: all 0.2s ease;
}

.legend-pill:hover {
  background: #FFFFFF;
  border-color: #F59E0B;
  transform: translateY(-1px);
}

.color-dot {
  width: 8px;
  height: 8px;
  border-radius: 2.5px;
  flex-shrink: 0;
}

.color-gtv { background: #F59E0B; box-shadow: 0 0 4px rgba(245, 158, 11, 0.4); }
.color-comp, .color-tickets { background: #111111; }

.chart-type-pill {
  display: inline-flex;
  background: #F4EFEA;
  padding: 3px;
  border-radius: 10px;
  gap: 2px;
  border: 1.5px solid #E5DDD3;
  flex-shrink: 0;
}

.type-btn {
  padding: 5px 12px;
  font-size: 11.5px;
  font-weight: 800;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #78655C;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.type-btn.active {
  background: #111111;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.25);
}

.trend-full-section { width: 100%; }

.chart-canvas-container {
  position: relative;
  height: 290px;
  width: 100%;
  margin: 10px 0;
}

.chart-highlight-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1.5px dashed #EBE4DB;
}

.highlight-bento-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFDF9;
  border: 1px solid #F0EAE2;
  border-radius: 14px;
  padding: 10px 12px;
  transition: all 0.2s ease;
}

.highlight-bento-box:hover {
  background: #FFFFFF;
  border-color: #F29727;
  transform: translateY(-2px);
}

.highlight-icon-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.bg-amber-soft { background: #FEF3C7; }
.bg-cocoa-soft { background: #F5F3EF; }
.bg-green-soft { background: #ECFDF5; }

.highlight-meta {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.kpi-title-text {
  font-size: 12px;
  font-weight: 800;
  color: #111111;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.matrix-card-header {
  font-size: 12px;
  font-weight: 800;
  color: #111111;
}

.highlight-val {
  font-size: 12.5px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.text-amber { color: #B45309; }
.text-cocoa { color: #3D2214; }
.text-green { color: #047857; }

.crm-total-pill {
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

.radial-gauge-flex-body {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  margin: 20px 0 10px 0;
}

.svg-total-val {
  font-size: 26px;
  font-weight: 900;
  fill: #111827;
  letter-spacing: -0.5px;
}

.svg-total-label {
  font-size: 11px;
  font-weight: 600;
  fill: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.svg-ring-dimmed {
  opacity: 0.2;
}

.svg-ring-hovered .ring-active {
  stroke-width: 16;
  filter: brightness(1.1);
}

.radial-rings-chart-container {
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-chart-wrapper {
  margin-bottom: 12px;
}

.rings-bottom-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  text-align: center;
}

.rings-bottom-total-row {
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.bottom-total-label { font-size: 11.5px; font-weight: 700; color: #6B5A52; }
.bottom-total-val { font-size: 15px; font-weight: 900; color: #111111; letter-spacing: -0.3px; }

.concentric-rings-svg {
  width: 240px;
  height: 240px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.04));
}

.ring-track { stroke: #F3F4F6; }
.ring-active { transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.25s ease; }

.bottom-active-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  padding: 2px 8px;
  border-radius: 10px;
  border: 1px solid #A7F3D0;
}

.hub-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 5px #10B981;
}

.radial-legend-modern {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.legend-modern-row {
  padding: 14px 18px;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.legend-modern-row:hover,
.legend-modern-row.is-hovered {
  border-color: #D97706;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);
  transform: translateY(-2px);
}

.legend-modern-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.legend-color-indicator {
  width: 14px;
  height: 14px;
  border-radius: 4px;
}

.legend-modern-title {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  flex: 1;
}

.legend-modern-pct {
  font-size: 16px;
  font-weight: 900;
  color: #111827;
}

.legend-modern-desc {
  font-size: 12.5px;
  color: #4B5563;
  line-height: 1.5;
  margin-bottom: 12px;
  padding-left: 26px;
}

.legend-modern-bar {
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
  margin-left: 26px;
}

.legend-modern-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease-out;
}

.crm-insight-matrix-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 20px;
  border-top: 1px solid #E5E7EB;
}

.crm-matrix-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.crm-matrix-card:hover {
  border-color: #D97706;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.06);
  transform: translateY(-2px);
}

.matrix-card-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 800;
  color: #111827;
}

.matrix-card-header svg { color: #D97706; flex-shrink: 0; }

.matrix-card-body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
}

.matrix-main-val {
  font-size: 16px;
  font-weight: 900;
  color: #111827;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.3px;
}

.matrix-sub-pct { font-size: 12px; font-weight: 800; }
.matrix-sub-badge {
  font-size: 10.5px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  padding: 2px 6px;
  border-radius: 6px;
}
.matrix-sub-sub { font-size: 10px; color: #8C786E; }

.crm-card-footer {
  margin-top: 12px;
  border-top: 1px solid #F3EFEA;
  padding-top: 10px;
  text-align: center;
}

.btn-see-more {
  font-size: 12px;
  font-weight: 700;
  color: #B45309;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: transform 0.2s ease;
}

.btn-see-more:hover { transform: translateX(4px); color: #D97706; }
.arrow-sym { font-size: 14px; }

.crm-ticket-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.ticket-sales-col { height: 100%; }

.demographic-full-section { width: 100%; }

.demographic-card-luxury {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  padding: 24px 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.demographic-card-luxury:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px -4px rgba(44, 26, 19, 0.08);
}

.demo-header-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.badge-corridor-lead {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 12px;
}

.demo-top-summary-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.summary-pill-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFDF9;
  border: 1.5px solid #E5DDD3;
  border-radius: 12px;
  padding: 5px 12px;
  font-size: 11.5px;
  font-weight: 700;
  color: #6B5A52;
}

.summary-pill-item strong { color: #111111; }
.pill-dot { width: 7px; height: 7px; border-radius: 50%; }

.demographic-map-luxury {
  position: relative;
  height: 380px;
  width: 100%;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 18px;
  overflow: hidden;
  display: block;
  cursor: grab;
  user-select: none;
}

.demographic-map-luxury.is-panning { cursor: grabbing; }

.map-pan-zoom-container {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  transform-origin: center center;
  pointer-events: auto;
}

.map-vector-canvas {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
}

.map-controls-floating {
  position: absolute;
  top: 12px; left: 12px; right: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  pointer-events: none;
}

.coords-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border: 1px solid #E5E7EB;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 800;
  color: #4B5563;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pulse-gold-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #F97316; box-shadow: 0 0 6px #F97316;
  animation: radar-ping 1.8s infinite;
}

.map-zoom-buttons-group {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
}

.map-btn {
  width: 26px; height: 26px; border-radius: 6px; border: 1px solid #E5E7EB; background: #FFFFFF;
  color: #4B5563; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s ease;
}

.map-btn:hover { background: #111827; color: #FFFFFF; border-color: #111827; }
.zoom-level-text { font-size: 11px; font-weight: 800; color: #111827; min-width: 34px; text-align: center; font-variant-numeric: tabular-nums; }

.radar-ring {
  position: absolute; border: 1px dashed rgba(249, 115, 22, 0.22); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%);
}
.ring-center-core { width: 44px; height: 44px; top: 54%; left: 45%; border: 1.5px solid rgba(249, 115, 22, 0.6); background: rgba(249, 115, 22, 0.04); }
.ring-10km  { width: 140px; height: 140px; top: 54%; left: 45%; border-color: rgba(249, 115, 22, 0.3); }
.ring-30km  { width: 280px; height: 280px; top: 54%; left: 45%; border-color: rgba(249, 115, 22, 0.2); }
.ring-60km  { width: 440px; height: 440px; top: 54%; left: 45%; border-color: rgba(17, 24, 39, 0.15); }
.ring-120km { width: 620px; height: 620px; top: 54%; left: 45%; border-color: rgba(17, 24, 39, 0.08); }

@keyframes laserFlow { from { stroke-dashoffset: 28; } to { stroke-dashoffset: 0; } }
.laser-route-path { animation: laserFlow 1.6s linear infinite; opacity: 0.6; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.map-vector-canvas.has-active-hover .laser-route-path:not(.laser-active) { opacity: 0.18; stroke-dasharray: 4 6; }
.laser-route-path.laser-active { opacity: 1; stroke-width: 4.8px; filter: drop-shadow(0 0 8px currentColor); }

.map-epicenter-marker {
  position: absolute; top: 54%; left: 45%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; z-index: 30; pointer-events: none;
}
.epicenter-pulse-ring { position: absolute; width: 28px; height: 28px; border-radius: 50%; background: rgba(249, 115, 22, 0.4); animation: radar-ping 1.6s infinite; }
.epicenter-core-dot { width: 14px; height: 14px; border-radius: 50%; background: #111827; border: 2.5px solid #F97316; box-shadow: 0 0 10px rgba(249, 115, 22, 0.6); z-index: 2; }
.epicenter-badge { display: flex; align-items: center; gap: 5px; background: #111827; color: #FFFFFF; border: 1.5px solid #F97316; border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 800; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15); margin-top: 4px; white-space: nowrap; }
.epicenter-tag { font-size: 9px; background: #F97316; color: #FFFFFF; padding: 2px 5px; border-radius: 4px; letter-spacing: 0.5px; }

.map-pin-marker { position: absolute; display: flex; flex-direction: column; align-items: center; z-index: 20; cursor: pointer; transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease; transform: translate(-50%, -50%); }
.map-pin-marker:hover, .map-pin-marker.is-hovered { transform: translate(-50%, -50%) scale(1.1) translateY(-3px); z-index: 40; }
.map-pin-marker.is-dimmed { opacity: 0.35; filter: grayscale(40%); }
.pin-beacon { width: 8px; height: 8px; border-radius: 50%; margin-bottom: 2px; box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06); }
.pin-card-bubble { display: flex; align-items: center; gap: 5px; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(6px); border: 1px solid #E5E7EB; border-radius: 20px; padding: 5px 12px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06); font-size: 12px; white-space: nowrap; transition: all 0.2s ease; }
.bubble-gold   { border-color: #F97316; }
.bubble-amber  { border-color: #F97316; }
.bubble-blue   { border-color: #93C5FD; }
.bubble-green  { border-color: #A7F3D0; }
.bubble-purple { border-color: #DDD6FE; }
.pin-glyph-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.dot-gold   { background: #F97316; }
.dot-amber  { background: #F97316; }
.dot-blue   { background: #3B82F6; }
.dot-green  { background: #10B981; }
.dot-purple { background: #8B5CF6; }
.pin-city { font-weight: 800; color: #111827; }
.pin-divider { color: #E5E7EB; font-size: 10px; margin: 0 2px; }
.pin-visitors { font-weight: 900; color: #F97316; font-variant-numeric: tabular-nums; }
.pin-share { font-size: 11px; color: #6B7280; font-weight: 700; }

.demo-bottom-cities-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.city-metric-slate { background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 14px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer; }
.city-metric-slate:hover, .city-metric-slate.is-hover-highlight { background: #FFFFFF; border-color: #D1D5DB; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04); }
.city-metric-slate.is-lead-city { border-color: #F97316; background: #FFFFFF; }
.slate-top-row { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.slate-rank-wrap { display: flex; align-items: center; gap: 6px; }
.slate-rank-badge { font-size: 10px; font-weight: 900; color: #4B5563; background: #E5E7EB; padding: 2px 6px; border-radius: 5px; }
.slate-rank-badge.badge-crown { background: #111827; color: #F97316; }
.slate-city-name { font-size: 13.5px; font-weight: 800; color: #111827; white-space: nowrap; }
.slate-pct-text { font-size: 14px; font-weight: 900; font-variant-numeric: tabular-nums; }
.slate-metrics-clean { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.slate-val-pax { font-size: 13.5px; font-weight: 800; color: #111827; font-variant-numeric: tabular-nums; }
.slate-val-pax small { font-size: 10.5px; color: #6B7280; }
.slate-val-divider { color: #D1D5DB; font-size: 10px; }
.slate-val-gtv { font-size: 13.5px; font-weight: 900; color: #F97316; font-variant-numeric: tabular-nums; }
.slate-track-line { width: 100%; height: 5px; background: #E5E7EB; border-radius: 4px; overflow: hidden; margin-top: 4px; margin-bottom: 4px; }
.slate-fill-line { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
.slate-bottom-sub { font-size: 10.5px; color: #6B7280; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.4; }

.demographic-footer-luxury { display: flex; align-items: flex-start; gap: 10px; background: #FFFDF8; border: 1px dashed #E2D9CE; border-radius: 12px; padding: 10px 14px; }
.insight-icon-box { width: 26px; height: 26px; border-radius: 8px; background: #FEF3C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
.insight-text-group { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; font-size: 11.5px; line-height: 1.45; }
.insight-body { font-size: 13.5px; font-weight: 600; line-height: 1.5; color: #111111; }
.insight-body strong { color: #000000; font-weight: 900; }

.operations-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: stretch; }
  .ticket-sales-col, .shift-wrapper { display: flex; flex-direction: column; }
  .ticket-sales-col > *, .shift-wrapper > * { flex: 1; }
.badge-total-pill { font-size: 12px; font-weight: 800; background-color: #111111; color: #FBBF24; padding: 4px 10px; border-radius: 8px; font-variant-numeric: tabular-nums; border: 1px solid #F59E0B; }
.payment-distribution-wrap { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; background: #FFFDF9; border: 1px solid #EFEAE2; border-radius: 14px; padding: 9px 14px; }
.payment-distribution-bar { display: flex; height: 6px; border-radius: 10px; overflow: hidden; gap: 2px; background: #F3ECE2; }
.dist-segment { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
.payment-legend-row { display: grid; grid-template-columns: 1fr 1fr; row-gap: 12px; column-gap: 20px; background: #FFFDF8; border: 1px dashed #E2D9CE; border-radius: 12px; padding: 14px; }
.legend-item { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; color: #111111; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-name { color: #111111; font-weight: 700; flex: 1; }
.legend-pct { font-weight: 800; color: #111111; font-variant-numeric: tabular-nums; text-align: right; }
.payment-slates-stack { display: flex; flex-direction: column; flex: 1; }
.pay-channel-slate { padding: 12px 4px; display: flex; flex-direction: column; gap: 8px; border-bottom: 1px solid #F5EFE6; transition: background-color 0.2s ease; }
.pay-channel-slate:last-child { border-bottom: none; }
.pay-channel-slate:hover { background: #FFFCF7; border-radius: 8px; padding-left: 12px; padding-right: 12px; margin-left: -8px; margin-right: -8px; }
.is-lead-pay {}
.pay-card-main-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.pay-slate-left { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
.pay-brand-squircle { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pay-svg { width: 17px; height: 17px; }
.pay-slate-title-group { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.pay-title-badge-row { display: flex; align-items: center; gap: 6px; }
.pay-channel-title { font-size: 13px; font-weight: 800; color: #111111; white-space: nowrap; }
.pay-top-tag { font-size: 9px; font-weight: 800; color: #B45309; background: #FEF3C7; border: 1px solid #F59E0B; padding: 1px 5px; border-radius: 4px; }
.pay-tx-sub { font-size: 12.5px; font-weight: 600; color: #111111; white-space: nowrap; }
.pay-slate-right { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; flex-shrink: 0; }
.pay-slate-amount { font-size: 13.5px; font-weight: 800; color: #111111; font-variant-numeric: tabular-nums; }
.pay-slate-share { font-size: 12.5px; font-weight: 800; color: #111111; font-variant-numeric: tabular-nums; text-align: right; }
.pay-mini-track { width: 100%; height: 4px; background: #EFEAE2; border-radius: 6px; overflow: hidden; }
.pay-mini-fill { height: 100%; border-radius: 6px; transition: width 0.5s ease; }
.payment-settlement-strip { display: flex; align-items: center; gap: 7px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 10px; padding: 8px 12px; font-size: 11px; font-weight: 700; color: #047857; margin-top: 6px; }
.settle-icon { color: #059669; flex-shrink: 0; }

.modal-backdrop { position: fixed; inset: 0; background-color: rgba(44, 26, 19, 0.65); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal-card { background: #FFFFFF; border-radius: 20px; width: 100%; max-width: 520px; padding: 24px; box-shadow: 0 25px 50px -12px rgba(44, 26, 19, 0.35); border: 1.5px solid #EAE2D8; display: flex; flex-direction: column; gap: 16px; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1.5px solid #F0EAE2; padding-bottom: 14px; }
.modal-title-group { display: flex; flex-direction: column; gap: 2px; }
.modal-kicker { font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #D97706; text-transform: uppercase; }
.modal-header h3 { font-size: 18px; font-weight: 800; color: #111111; margin: 0; }
.btn-close { background: #F8F5F0; border: 1px solid #EAE2D8; width: 32px; height: 32px; border-radius: 8px; font-size: 20px; line-height: 1; cursor: pointer; color: #6B5A52; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
.btn-close:hover { background: #111111; color: #FFFFFF; }
.modal-body { display: flex; flex-direction: column; gap: 10px; font-size: 13.5px; }
.modal-info-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #FFFDF9; border: 1px solid #F0EAE2; border-radius: 8px; }
.info-label { color: #78655C; font-size: 12.5px; }
.info-val { color: #111111; font-variant-numeric: tabular-nums; }
.alert-info-box { background-color: #FEF3C7; border: 1px solid #FDE68A; color: #92400E; padding: 10px 12px; border-radius: 10px; font-size: 12px; display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.modal-footer { display: flex; justify-content: flex-end; gap: 8px; border-top: 1.5px solid #F0EAE2; padding-top: 14px; }
.btn-action-secondary { display: inline-flex; align-items: center; gap: 6px; height: 38px; padding: 0 14px; font-size: 12px; font-weight: 700; font-family: inherit; background: #FFFFFF; color: #3D2214; border: 1.5px solid #E2D9CE; border-radius: 10px; cursor: pointer; transition: all 0.2s ease; }
.btn-action-secondary:hover { background: #F8F5F0; border-color: #D97706; }
.custom-date-popover-wrapper { position: relative; display: inline-flex; }
.mini-calendar-floating-card { position: absolute; top: calc(100% + 10px); right: 0; width: 280px; background: #FFFFFF; border: 1.5px solid #F59E0B; border-radius: 16px; padding: 14px 16px; box-shadow: 0 16px 36px -4px rgba(44, 26, 19, 0.18), 0 3px 8px rgba(0, 0, 0, 0.04); z-index: 999; display: flex; flex-direction: column; gap: 12px; font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; animation: miniPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes miniPopIn { from { opacity: 0; transform: translateY(-6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
.mini-card-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F0EAE2; padding-bottom: 8px; }
.mini-card-title-row { display: flex; align-items: center; gap: 6px; }
.mini-cal-icon { font-size: 14px; }
.mini-card-title { font-size: 13px; font-weight: 800; color: #111111; }
.btn-mini-close { background: transparent; border: none; font-size: 18px; line-height: 1; color: #8C786E; cursor: pointer; padding: 0 4px; border-radius: 4px; transition: color 0.15s ease; }
.btn-mini-close:hover { color: #111111; }
.mini-card-body { display: flex; flex-direction: column; gap: 8px; }
.mini-date-row { display: flex; align-items: center; justify-content: space-between; background: #FFFDF9; border: 1.5px solid #E5DDD3; border-radius: 10px; padding: 6px 10px; gap: 8px; transition: all 0.18s ease; }
.mini-date-row:focus-within { border-color: #F59E0B; background: #FFFFFF; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.15); }
.mini-label { font-size: 11px; font-weight: 800; color: #78655C; min-width: 46px; }
.mini-date-input { border: none; background: transparent; font-family: inherit; font-size: 12px; font-weight: 700; color: #111111; outline: none; cursor: pointer; width: 100%; }
.mini-card-footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; border-top: 1px solid #F0EAE2; padding-top: 10px; }
.btn-mini-cancel { background: #F8F5F0; border: 1px solid #E2D9CE; border-radius: 8px; padding: 5px 10px; font-size: 11.5px; font-weight: 700; color: #6B5A52; cursor: pointer; font-family: inherit; transition: all 0.15s ease; }
.btn-mini-cancel:hover { background: #EBE3D7; color: #111111; }
.btn-mini-apply { background: linear-gradient(135deg, #111111 0%, #4A2E22 100%); color: #FFFFFF; border: 1px solid #F59E0B; border-radius: 8px; padding: 5px 14px; font-size: 11.5px; font-weight: 800; cursor: pointer; font-family: inherit; transition: all 0.15s ease; box-shadow: 0 2px 6px rgba(44, 26, 19, 0.15); }
.btn-mini-apply:hover { background: #D97706; border-color: #B45309; }

/* =======================================================
   DASHBOARD SPLIT LAYOUT (Chart + Table)
   ======================================================= */
.dashboard-split-layout {
  display: grid;
  grid-template-columns: 60% calc(40% - 20px);
  gap: 20px;
  align-items: stretch;
}

.split-left-col, .split-right-col {
  display: flex;
  flex-direction: column;
}

.recent-tx-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
}

.tx-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tx-view-all {
  font-size: 13px;
  font-weight: 700;
  color: #D97706;
  text-decoration: none;
}

.tx-view-all:hover {
  text-decoration: underline;
}

.tx-table-wrapper {
  overflow-x: auto;
  flex-grow: 1;
}

.tx-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.tx-table th {
  padding: 14px 8px;
  color: #8C786E;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  border-bottom: 1px solid #E2D9CE;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.tx-table td {
  padding: 14px 8px;
  color: #111111;
  font-weight: 600;
  border-bottom: 1px solid #F5EFE9;
  vertical-align: middle;
  white-space: nowrap;
}

.tx-table th:nth-child(3),
.tx-table td:nth-child(3) {
  text-align: center;
}

.tx-table th:nth-child(4),
.tx-table td:nth-child(4) {
  text-align: right;
}

.tx-table th:nth-child(5),
.tx-table td:nth-child(5) {
  text-align: center;
}

.tx-table td:first-child {
  color: #5A4034;
}

.td-type {
  color: #111111;
  font-weight: 700;
  white-space: normal;
}

.td-total {
  font-weight: 800 !important;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.status-badge.lunas {
  background: #ECFDF5;
  color: #059669;
  border: 1px solid #D1FAE5;
}

.status-badge.dp {
  background: #FFFBEB;
  color: #D97706;
  border: 1px solid #FEF3C7;
}

@media (max-width: 1280px) {
  .kpi-cards-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .demo-bottom-cities-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 1024px) {
  .dashboard-split-layout { grid-template-columns: 1fr; }
  .crm-ticket-grid, .operations-grid { grid-template-columns: 1fr; }
  .demo-bottom-cities-grid { grid-template-columns: repeat(2, 1fr); }
  .header-inner-flex { flex-direction: column; align-items: stretch; gap: 16px; }
  .controls-hero-col { justify-content: space-between; }
  .excel-tabs-slider-bar { max-width: 100%; flex: 1; }
}

@media (max-width: 640px) {
  .controls-hero-col { flex-direction: column; align-items: flex-start; }
  .kpi-cards-grid-4, .demo-bottom-cities-grid, .chart-highlight-strip { grid-template-columns: 1fr; }
  .demo-header-wrap { flex-direction: column; align-items: stretch; }
  .header-main-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}
}
</style>
