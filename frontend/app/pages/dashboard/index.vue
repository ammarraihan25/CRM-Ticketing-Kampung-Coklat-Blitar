<template>
  <div class="dashboard-container" @click="handleGlobalClick">
    <!-- =====================================================================
         1. ULTRA-LUXURY EXECUTIVE COMMAND BANNER & HORIZONTAL PERIOD SLIDER
         ===================================================================== -->
    <header class="executive-command-header">
      <div class="header-top-ambient-glow"></div>
      <div class="header-ambient-orb-right"></div>
      
      <!-- Main Row: Brand Info & Tab Slider Controls -->
      <div class="header-inner-flex">
        <!-- 1. Left: Luxury Brand Identity & Executive Title (Clean 2-Line Layout) -->
        <div class="brand-hero-col">
          <div class="brand-crest-wrapper">
            <div class="brand-logo-3d-box">
              <img :src="logoImg" alt="Kampung Coklat" class="brand-logo-img" />
              <span class="active-radar-beacon" title="Sistem Aktif &amp; Terhubung Real-Time">
                <span class="radar-ping-ring"></span>
                <span class="radar-center-dot"></span>
              </span>
            </div>
          </div>

          <div class="brand-text-wrapper">
            <!-- Line 1: Title + Live Status Pill Inline -->
            <div class="title-with-status-row">
              <h1 class="header-main-title">
                <span>Dashboard Overview</span>
                <span class="title-accent-amp">&amp;</span>
                <span class="title-highlight">Finansial</span>
              </h1>
              <span class="live-status-pill">
                <span class="live-pulse-dot"></span>
                <span>Live POS &amp; Gate</span>
              </span>
            </div>
            
            <!-- Line 2: Clean Metadata Line -->
            <div class="header-meta-clean-line">
              <span class="meta-brand-tag">KAMPUNG COKLAT BLITAR</span>
              <span class="meta-sep">&bull;</span>
              <span class="meta-time-text">Sesi Kasir: 08:00 - 17:00 WIB</span>
              <span class="meta-sep">&bull;</span>
              <span class="meta-loc-text">Wisata Edukasi</span>
            </div>
          </div>
        </div>

        <!-- 2. Right: Modern Tab Slider + Dedicated Calendar + Matching Sync Button -->
        <div class="controls-hero-col">
          <!-- Excel / Google Sheets-Style Sliding Tab Bar -->
          <div class="excel-tabs-slider-bar">
            <!-- Left Arrow Nav Button -->
            <button 
              type="button" 
              class="excel-tab-nav-btn prev-btn" 
              title="Geser Tab ke Kiri"
              @click="scrollExcelTabs('left')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <!-- Scrollable Excel Sheet Tabs -->
            <div class="excel-tab-strip-scroll" ref="excelTabStripRef">
              <button 
                v-for="opt in periodOptions" 
                :key="opt.value"
                type="button"
                class="excel-sheet-tab"
                :class="{ 'is-active': selectedPeriod === opt.value }"
                @click="selectPeriodOption(opt.value, $event)"
              >
                <span v-if="opt.value === 'today'" class="sheet-live-dot"></span>
                <span class="sheet-tab-label">{{ opt.label }}</span>
                <span v-if="selectedPeriod === opt.value" class="sheet-active-underline"></span>
              </button>
            </div>

            <!-- Right Arrow Nav Button -->
            <button 
              type="button" 
              class="excel-tab-nav-btn next-btn" 
              title="Geser Tab ke Kanan"
              @click="scrollExcelTabs('right')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <!-- Dedicated Custom Date Range Popover Trigger & Floating Window -->
          <div class="custom-date-popover-wrapper">
            <button 
              type="button" 
              class="btn-custom-date-icon-only"
              :class="{ 'is-active': selectedPeriod === 'custom' || showCustomDateModal }"
              title="Pilih Rentang Tanggal Manual"
              @click="showCustomDateModal = !showCustomDateModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span v-if="selectedPeriod === 'custom'" class="custom-active-dot"></span>
            </button>

            <!-- Small, Compact, Floating Calendar Window (Beside / Below Button in Empty Space) -->
            <transition name="popover-fade">
              <div v-if="showCustomDateModal" class="mini-calendar-floating-card">
                <!-- Mini Header -->
                <div class="mini-card-header">
                  <div class="mini-card-title-row">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span class="mini-card-title">Rentang Waktu</span>
                  </div>
                  <button type="button" class="btn-mini-close" @click="showCustomDateModal = false">&times;</button>
                </div>

                <!-- Mini Inputs -->
                <div class="mini-card-body">
                  <div class="mini-date-row">
                    <span class="mini-label">Dari:</span>
                    <input type="date" v-model="customStartDate" class="mini-date-input" />
                  </div>
                  <div class="mini-date-row">
                    <span class="mini-label">Sampai:</span>
                    <input type="date" v-model="customEndDate" class="mini-date-input" />
                  </div>
                </div>

                <!-- Mini Actions -->
                <div class="mini-card-footer">
                  <button type="button" class="btn-mini-cancel" @click="showCustomDateModal = false">Batal</button>
                  <button type="button" class="btn-mini-apply" @click="applyCustomDateRange">Terapkan</button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Dedicated Quick Refresh Button (Matching 44x44px Squircle) -->
          <button 
            type="button" 
            class="btn-header-refresh-icon"
            title="Sinkronisasi Data Real-Time"
            :disabled="isLoading"
            @click="refreshData"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" :class="{ 'spin-anim': isLoading }">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- =====================================================================
         2. 4 TOP KPI CARDS GRID (Bento Pill Structure)
         ===================================================================== -->
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

    <!-- =====================================================================
         3. FULL-WIDTH: Tren Pendapatan & Tiket (1 Kolom Penuh)
         ===================================================================== -->
    <section class="trend-full-section">
      <!-- GTV & Revenue Trend Chart (Ultra-Smooth Bezier Gradient Spline) -->
      <div class="bento-card main-chart-elevated">
        <div class="bento-card-header">
          <div class="header-title-group">
            <div class="title-with-badge">
              <div class="bento-icon-chip chip-amber">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 class="bento-card-title">Tren Pendapatan &amp; Tiket</h3>
              <span class="peak-beacon-chip">
                <span class="beacon-dot"></span>
                <span>Puncak: 13:00 WIB</span>
              </span>
            </div>
            <span class="bento-card-subtitle">
              {{ currentPeriodDetail.label }}: Distribusi fluktuasi omzet dan volume tiket tervalidasi gerbang.
            </span>
          </div>

          <div class="header-right-controls">
            <!-- Custom Legend Badges (Matching User Design) -->
            <div class="chart-legend-pills">
              <div class="legend-pill pill-gtv">
                <span class="color-dot color-gtv"></span>
                <span>Pendapatan GTV</span>
              </div>
              <div class="legend-pill pill-comp">
                <span class="color-dot color-comp"></span>
                <span>Volume Tiket</span>
              </div>
            </div>

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

        <!-- 3-Column Highlight Cards Strip (Formal Minimal SVG Icons) -->
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
    </section>

    <!-- =====================================================================
         4. 2-COLUMN GRID: Segmentasi Member CRM & Penjualan Tiket per Kategori
         ===================================================================== -->
    <section class="crm-ticket-grid">
      <!-- Member Segmentation Concentric Radial Rings Card (Original CRM Data & Colors - Rich Bento) -->
      <div class="bento-card radial-rings-card-elevated">
        <div class="bento-card-header">
          <div class="header-title-group">
            <div class="title-with-badge">
              <div class="bento-icon-chip chip-brown">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="bento-card-title">Segmentasi Member CRM</h3>
            </div>
            <span class="bento-card-subtitle">Proporsi kategori pelanggan &amp; loyalitas terdaftar</span>
          </div>
          <span class="crm-total-pill">
            <span class="pulse-crm-dot"></span>
            <span>{{ memberSegmentTotal.toLocaleString('id-ID') }} Kontak</span>
          </span>
        </div>

        <!-- 2-Column Body: Left Rich Segment Rows & Right Concentric Radial Rings with Metric Container -->
        <div class="radial-gauge-flex-body">
          <!-- Left Column: Rich Items List with Sub-metrics and Progress Tracks -->
          <div class="radial-legend-list">
            <div 
              v-for="seg in memberSegments" 
              :key="seg.code" 
              class="radial-legend-card-row"
              :class="{ 'is-hovered': activeHoverSegment === seg.code }"
              @mouseenter="activeHoverSegment = seg.code"
              @mouseleave="activeHoverSegment = null"
            >
              <div class="legend-card-top">
                <div class="legend-left-meta">
                  <span class="legend-color-dot" :style="{ backgroundColor: seg.color }"></span>
                  <span class="legend-code-tag">{{ seg.code }}</span>
                  <span class="legend-name-text">{{ seg.title }}</span>
                </div>
                <div class="legend-right-score">
                  <span class="legend-count-val">{{ seg.count.toLocaleString('id-ID') }}</span>
                  <span class="legend-pct-val" :style="{ color: seg.color }">({{ seg.percentage }}%)</span>
                </div>
              </div>

              <!-- Progress Track Fill -->
              <div class="legend-track-bg">
                <div 
                  class="legend-track-fill" 
                  :style="{ width: `${seg.percentage}%`, backgroundColor: seg.color }"
                ></div>
              </div>

              <!-- Sub-metric detail row for solid fullness -->
              <div class="legend-card-subinfo">
                <span class="subinfo-item">Vol: <strong>{{ seg.count.toLocaleString('id-ID') }} Member</strong></span>
                <span class="subinfo-sep">&bull;</span>
                <span class="subinfo-item">Kontribusi: <strong>{{ seg.percentage }}%</strong></span>
              </div>
            </div>
          </div>

          <!-- Right Column: Multi-Ring Concentric SVG Chart & Total Member Metric Capsule -->
          <div class="radial-rings-chart-container">
            <svg viewBox="0 0 200 200" class="concentric-rings-svg">
              <g v-for="(seg, idx) in memberSegments" :key="seg.code">
                <!-- Track Background Circle -->
                <circle 
                  cx="100" 
                  cy="100" 
                  :r="78 - idx * 22" 
                  class="ring-track" 
                  stroke-width="12" 
                  fill="none" 
                />
                <!-- Active Progress Arc -->
                <circle 
                  cx="100" 
                  cy="100" 
                  :r="78 - idx * 22" 
                  class="ring-active" 
                  :stroke="seg.color" 
                  stroke-width="12" 
                  fill="none" 
                  stroke-linecap="round"
                  :stroke-dasharray="2 * Math.PI * (78 - idx * 22)"
                  :stroke-dashoffset="2 * Math.PI * (78 - idx * 22) * (1 - seg.percentage / 100)"
                  transform="rotate(-90 100 100)"
                />
              </g>
            </svg>

            <!-- Total Member Metric Display Placed Below Circular Rings -->
            <div class="rings-bottom-metric">
              <div class="rings-bottom-total-row">
                <span class="bottom-total-label">Total Member:</span>
                <span class="bottom-total-val">{{ memberSegmentTotal.toLocaleString('id-ID') }}</span>
              </div>
              <span class="bottom-active-badge">
                <span class="hub-live-dot"></span>
                <span>92% Aktif Terdaftar</span>
              </span>
            </div>
          </div>
        </div>

        <!-- CRM Multi-Metric Insight Matrix (3 Solid Bento Capsules) -->
        <div class="crm-insight-matrix-3">
          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              <span>Member Baru</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">+215 Org</span>
              <span class="matrix-sub-pct text-green">+18.4%</span>
            </div>
          </div>

          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              <span>Retensi Repeat</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">74.8%</span>
              <span class="matrix-sub-badge">Tinggi</span>
            </div>
          </div>

          <div class="crm-matrix-card">
            <div class="matrix-card-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span>Rata-rata Transaksi</span>
            </div>
            <div class="matrix-card-body">
              <span class="matrix-main-val">Rp 45.000</span>
              <span class="matrix-sub-sub">/ member</span>
            </div>
          </div>
        </div>

        <!-- Quick Link to CRM Reports -->
        <div class="crm-card-footer">
          <NuxtLink to="/reports" class="btn-see-more">
            <span>Buka Direktori WhatsApp Member</span>
            <span class="arrow-sym">&rarr;</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Ticket Sales Breakdown Table Component -->
      <div class="ticket-sales-col">
        <TicketSalesTable :ticket-items="currentTicketBreakdown" />
      </div>
    </section>

    <!-- =====================================================================
         5. FULL-WIDTH: Demografi Asal Pengunjung (1 Kolom Penuh)
         ===================================================================== -->
    <!-- =====================================================================
         5. FULL-WIDTH: Demografi & Sebaran Asal Pengunjung (Luxury Geospatial Hub)
         ===================================================================== -->
    <!-- =====================================================================
         5. FULL-WIDTH: Demografi Asal Pengunjung (Peta Sebaran Interaktif)
         ===================================================================== -->
    <section class="demographic-full-section">
      <div class="bento-card demographic-card-luxury">
        <!-- 1. Header with Title, Live Badge, and Aggregate Summary -->
        <div class="bento-card-header demo-header-wrap">
          <div class="header-title-group">
            <div class="title-with-badge">
              <div class="bento-icon-chip chip-amber">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                  <line x1="8" y1="2" x2="8" y2="18"/>
                  <line x1="16" y1="6" x2="16" y2="22"/>
                </svg>
              </div>
              <h3 class="bento-card-title">Demografi Asal Pengunjung</h3>
              <span class="badge-corridor-lead">
                <span class="beacon-dot"></span>
                <span>Dominasi: 78.1% Blitar Raya &amp; Kediri</span>
              </span>
            </div>
            <span class="bento-card-subtitle">
              Peta sebaran asal daerah wisatawan berbasis data integrasi transaksi POS Kasir &amp; kontak CRM WhatsApp
            </span>
          </div>

          <!-- Top Right Aggregate Summary Pill -->
          <div class="demo-top-summary-pills">
            <div class="summary-pill-item">
              <span class="pill-dot dot-gold"></span>
              <span>Total Terpetakan: <strong>2.450 Pax</strong></span>
            </div>
            <div class="summary-pill-item">
              <span class="pill-dot dot-green"></span>
              <span>5 Koridor Asal Utama</span>
            </div>
          </div>
        </div>

        <!-- 2. Full-Width Interactive Geographic Map Canvas -->
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
          <!-- Floating Zoom, Pan & Recenter Controls -->
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

          <!-- Pannable & Zoomable Map Container -->
          <div 
            class="map-pan-zoom-container"
            :style="{ transform: `translate(${mapPanX}px, ${mapPanY}px) scale(${mapZoom})` }"
          >
            <!-- Distance Concentric Radar Guides -->
            <div class="radar-ring ring-center-core"></div>
            <div class="radar-ring ring-10km"></div>
            <div class="radar-ring ring-30km"></div>
            <div class="radar-ring ring-60km"></div>
            <div class="radar-ring ring-120km"></div>

            <!-- Stylized East Java Topographic & Route Overlay SVG (ViewBox 1000 x 500) -->
            <svg 
              class="map-vector-canvas" 
              :class="{ 'has-active-hover': activeHoverCity !== null }"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1000 500" 
              preserveAspectRatio="none" 
              fill="none"
            >
              <!-- Laser Routes from Each City into Central Epicenter (450, 270) -->
              <!-- 1. Kota Blitar -> Center (Gold) -->
              <path 
                d="M 450 170 L 450 270" 
                stroke="#D97706" 
                stroke-width="3" 
                stroke-linecap="round"
                stroke-dasharray="6 4" 
                class="laser-route-path"
                :class="{ 'laser-active': activeHoverCity === 'blitar-kota' }"
              />
              <!-- 2. Kab. Blitar -> Center (Amber) -->
              <path 
                d="M 620 360 Q 535 340 450 270" 
                stroke="#F59E0B" 
                stroke-width="2.8" 
                stroke-linecap="round"
                stroke-dasharray="8 6" 
                class="laser-route-path"
                :class="{ 'laser-active': activeHoverCity === 'blitar-kab' }"
              />
              <!-- 3. Kediri Raya -> Center (Blue) -->
              <path 
                d="M 240 110 Q 330 180 450 270" 
                stroke="#2563EB" 
                stroke-width="2.5" 
                stroke-linecap="round"
                stroke-dasharray="8 6" 
                class="laser-route-path"
                :class="{ 'laser-active': activeHoverCity === 'kediri' }"
              />
              <!-- 4. Tulungagung -> Center (Green) -->
              <path 
                d="M 180 350 Q 300 330 450 270" 
                stroke="#059669" 
                stroke-width="2.5" 
                stroke-linecap="round"
                stroke-dasharray="8 6" 
                class="laser-route-path"
                :class="{ 'laser-active': activeHoverCity === 'tulungagung' }"
              />
              <!-- 5. Malang & Surabaya -> Center (Purple) -->
              <path 
                d="M 800 130 Q 640 185 450 270" 
                stroke="#7C3AED" 
                stroke-width="2.5" 
                stroke-linecap="round"
                stroke-dasharray="8 6" 
                class="laser-route-path"
                :class="{ 'laser-active': activeHoverCity === 'malang-sby' }"
              />

              <!-- Topographic Curves & Terrain Guides -->
              <path d="M40,240 Q200,180 400,220 T750,210 T950,250" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M80,350 Q260,300 450,330 T820,360" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M320,70 Q420,170 470,280 T520,460" stroke="#E5DDD3" stroke-width="1.5" stroke-dasharray="6 6"/>
              <path d="M140,110 Q280,220 430,260 T680,370" stroke="#DCD3C7" stroke-width="1.2"/>
            </svg>

            <!-- Central Epicenter: Kampung Coklat Blitar (Well Spaced at Center) -->
            <div class="map-epicenter-marker">
              <span class="epicenter-pulse-ring"></span>
              <span class="epicenter-core-dot"></span>
              <div class="epicenter-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24" stroke="currentColor" stroke-width="1.5" class="epicenter-svg-icon">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" fill="#2C1A13"/>
                </svg>
                <span class="epicenter-title">KAMPUNG COKLAT</span>
                <span class="epicenter-tag">EPISENTRUM</span>
              </div>
            </div>

            <!-- 5 Distinct, Non-Overlapping Interactive Floating City Pins -->
            <div 
              v-for="city in originCitiesList"
              :key="city.id"
              class="map-pin-marker"
              :class="[
                `pin-${city.id}`,
                { 'is-hovered': activeHoverCity === city.id }
              ]"
              :style="city.position"
              @mouseenter="activeHoverCity = city.id"
              @mouseleave="activeHoverCity = null"
            >
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

        <!-- 3. Bottom 5 Detailed Origin City Bento Metric Cards -->
        <div class="demo-bottom-cities-grid">
          <div 
            v-for="(city, idx) in originCitiesList" 
            :key="city.id" 
            class="city-metric-slate"
            :class="[
              { 'is-lead-city': idx === 0 },
              { 'is-hover-highlight': activeHoverCity === city.id }
            ]"
            @mouseenter="activeHoverCity = city.id"
            @mouseleave="activeHoverCity = null"
          >
            <div class="slate-top-row">
              <div class="slate-rank-wrap">
                <span class="slate-rank-badge" :class="{ 'badge-crown': idx === 0 }">#{{ idx + 1 }}</span>
                <span class="slate-city-name">{{ city.name }}</span>
              </div>
              <span class="slate-pct-pill" :style="{ backgroundColor: `${city.color}18`, color: city.color, borderColor: `${city.color}40` }">
                {{ city.percentage }}%
              </span>
            </div>

            <div class="slate-metrics-row">
              <div class="slate-metric-block">
                <span class="slate-meta-label">PENGUNJUNG</span>
                <span class="slate-meta-val-dark">{{ city.pax.toLocaleString('id-ID') }} <small>pax</small></span>
              </div>
              <div class="slate-metric-block text-right">
                <span class="slate-meta-label">TOTAL GTV</span>
                <span class="slate-meta-val-amber">{{ formatRupiah(city.gtv) }}</span>
              </div>
            </div>

            <!-- Proportion fill line -->
            <div class="slate-track-line">
              <div class="slate-fill-line" :style="{ width: `${city.percentage * 2}%`, backgroundColor: city.color }"></div>
            </div>

            <div class="slate-bottom-sub">
              <span>{{ city.character }}</span>
            </div>
          </div>
        </div>

        <!-- 4. Executive Geospatial Strategic Takeaway Footer -->
        <div class="demographic-footer-luxury">
          <div class="insight-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div class="insight-text-group">
            <span class="insight-main-title">Insight Strategis Geospasial:</span>
            <span class="insight-body">
              <strong>78.1%</strong> total wisatawan berasal dari koridor aglomerasi Blitar Raya &amp; Kediri (&lt; 45 km). Peluang peningkatan omzet terbesar berada pada penetrasi paket rombongan bus wisata koridor Malang-Surabaya dan promosi digital di jalur lintas selatan (Tulungagung-Trenggalek).
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================================
         5. OPERATIONS GRID: Payment Methods & POS Shift Summary
         ===================================================================== -->
    <section class="operations-grid">
      <!-- Payment Methods Summary (Matching Screenshot Layout) -->
      <div class="bento-card payment-card">
        <div class="bento-card-header">
          <div class="header-title-left">
            <div class="header-icon-squircle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div class="header-text-group">
              <h3 class="bento-card-title">Ringkasan Metode Pembayaran</h3>
              <span class="bento-card-subtitle">Volume &amp; proporsi transaksi kanal pembayaran</span>
            </div>
          </div>
          <span class="badge-total-pill">{{ formatRupiah(totalPaymentAmount) }}</span>
        </div>

        <!-- Top Multi-Channel Distribution Proportion Strip with Legend -->
        <div class="payment-distribution-wrap">
          <div class="payment-distribution-bar">
            <div 
              v-for="pay in currentPaymentMethods" 
              :key="pay.id"
              class="dist-segment"
              :style="{ width: `${pay.percentage}%`, backgroundColor: pay.color }"
              :title="`${pay.name}: ${pay.percentage}%`"
            ></div>
          </div>
          <div class="payment-legend-row">
            <div 
              v-for="pay in currentPaymentMethods" 
              :key="pay.id" 
              class="legend-item"
            >
              <span class="legend-dot" :style="{ backgroundColor: pay.color }"></span>
              <span class="legend-name">{{ pay.name }}:</span>
              <span class="legend-pct" :style="{ color: pay.color }">{{ pay.percentage }}%</span>
            </div>
          </div>
        </div>

        <!-- 4 Distinct Outlined Payment Channel Cards (Spacious & Zero Overlap) -->
        <div class="payment-slates-stack">
          <div 
            v-for="(pay, idx) in currentPaymentMethods" 
            :key="pay.id" 
            class="pay-channel-slate"
            :class="{ 'is-lead-pay': idx === 0 }"
            :style="{ '--pay-brand': pay.color, '--pay-tint': pay.bgLight }"
          >
            <!-- Top Line: Icon + Title + Amount + Share Badge -->
            <div class="pay-card-main-row">
              <div class="pay-slate-left">
                <div class="pay-brand-squircle" :style="{ backgroundColor: pay.bgLight, color: pay.color }">
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

                <div class="pay-slate-title-group">
                  <div class="pay-title-badge-row">
                    <span class="pay-channel-title">{{ pay.name }}</span>
                    <span v-if="idx === 0" class="pay-top-tag">Dominan</span>
                  </div>
                  <span class="pay-tx-sub">{{ pay.transactions.toLocaleString('id-ID') }} Transaksi</span>
                </div>
              </div>

              <div class="pay-slate-right">
                <span class="pay-slate-amount">{{ formatRupiah(pay.amount) }}</span>
                <span class="pay-slate-share" :style="{ backgroundColor: pay.bgLight, color: pay.color, borderColor: pay.color }">
                  {{ pay.percentage }}% Porsi
                </span>
              </div>
            </div>

            <!-- Bottom Line: Clean Full-Width Progress Track (Never Overlaps) -->
            <div class="pay-mini-track">
              <div class="pay-mini-fill" :style="{ width: `${pay.percentage}%`, backgroundColor: pay.color }"></div>
            </div>
          </div>
        </div>

        <!-- Payment Settlement Verification Banner -->
        <div class="payment-settlement-strip">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="settle-icon">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Semua transaksi telah terekonsiliasi &amp; tersinkronisasi otomatis dengan perbankan.</span>
        </div>
      </div>

      <!-- Cashier / Shift Summary Component -->
      <div class="shift-wrapper">
        <ShiftSummaryCard 
          :shift-data="currentShiftData" 
          :shifts-list="allShiftList"
        />
      </div>
    </section>




  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

// Subcomponents
import KpiCard from '~/components/dashboard/KpiCard.vue'
import TicketSalesTable from '~/components/dashboard/TicketSalesTable.vue'
import ShiftSummaryCard from '~/components/dashboard/ShiftSummaryCard.vue'

// Register Chart.js modules
Chart.register(...registerables)

// Meta Configuration
definePageMeta({
  layout: 'admin'
})

// Current Role
const currentRole = ref<'admin' | 'owner'>('admin')

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
  {
    id: 'blitar-kota',
    name: 'Kota Blitar',
    region: 'Pusat Kota & Wisatawan Lokal',
    pax: 940,
    percentage: 38.4,
    gtv: 18800000,
    character: 'Wisatawan Keluarga & Repeat Member',
    color: '#D97706',
    dotClass: 'dot-gold',
    badgeClass: 'bubble-gold',
    travelTime: '< 15 Menit',
    position: { top: '34%', left: '45%' }
  },
  {
    id: 'blitar-kab',
    name: 'Kab. Blitar',
    region: 'Wlingi, Kanigoro & Sekitar',
    pax: 580,
    percentage: 23.7,
    gtv: 11600000,
    character: 'Keluarga, Anak & Santri Akhir Pekan',
    color: '#F59E0B',
    dotClass: 'dot-amber',
    badgeClass: 'bubble-amber',
    travelTime: '20 - 40 Menit',
    position: { top: '72%', left: '62%' }
  },
  {
    id: 'kediri',
    name: 'Kediri Raya',
    region: 'Koridor Mataraman Utara',
    pax: 390,
    percentage: 15.9,
    gtv: 7800000,
    character: 'Wisata Edukasi & Rombongan Komunitas',
    color: '#2563EB',
    dotClass: 'dot-blue',
    badgeClass: 'bubble-blue',
    travelTime: '45 - 60 Menit',
    position: { top: '22%', left: '24%' }
  },
  {
    id: 'tulungagung',
    name: 'Tulungagung & Trenggalek',
    region: 'Koridor Jalur Lintas Selatan (JLS)',
    pax: 290,
    percentage: 11.8,
    gtv: 5800000,
    character: 'Paket Terusan Wahana Edukasi Coklat',
    color: '#059669',
    dotClass: 'dot-green',
    badgeClass: 'bubble-green',
    travelTime: '45 - 60 Menit',
    position: { top: '70%', left: '18%' }
  },
  {
    id: 'malang-sby',
    name: 'Malang & Surabaya',
    region: 'Regional Jawa Timur & Tol Trans-Jawa',
    pax: 250,
    percentage: 10.2,
    gtv: 5000000,
    character: 'Rombongan Bus Study Tour & Biro Wisata',
    color: '#7C3AED',
    dotClass: 'dot-purple',
    badgeClass: 'bubble-purple',
    travelTime: '90 - 150 Menit',
    position: { top: '26%', left: '80%' }
  }
])

// -------------------------------------------------------------------------
type PeriodType = 
  | 'today' 
  | 'yesterday' 
  | 'week' 
  | 'last_week' 
  | 'month' 
  | 'last_month' 
  | 'quarter' 
  | 'year' 
  | 'custom'

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
  // Presisi Harian
  { value: 'today', label: 'Hari Ini', subtitle: '19 Agustus 2026', group: 'daily', badge: 'Live' },
  { value: 'yesterday', label: 'Kemarin', subtitle: '18 Agustus 2026', group: 'daily' },
  
  // Mingguan & Bulanan
  { value: 'week', label: '7 Hari Terakhir', subtitle: '13 - 19 Agu 2026', group: 'periodic', badge: 'Populer' },
  { value: 'last_week', label: 'Minggu Lalu', subtitle: '06 - 12 Agu 2026', group: 'periodic' },
  { value: 'month', label: 'Bulan Ini', subtitle: '01 - 19 Agu 2026', group: 'periodic' },
  { value: 'last_month', label: 'Bulan Lalu', subtitle: '01 - 31 Jul 2026', group: 'periodic' },
  
  // Kuartal & Tahunan
  { value: 'quarter', label: 'Kuartal Q3', subtitle: 'Juli - September 2026', group: 'annual' },
  { value: 'year', label: 'Tahun 2026', subtitle: '01 Jan - 19 Agu 2026', group: 'annual', badge: 'YTD' }
]

const currentPeriodDetail = computed(() => {
  if (selectedPeriod.value === 'custom') {
    return {
      value: 'custom' as PeriodType,
      label: 'Kustom Tanggal',
      subtitle: `${customStartDate.value} s/d ${customEndDate.value}`,
      group: 'periodic' as const,
      badge: 'Rentang Kustom'
    }
  }
  const found = periodOptions.find(p => p.value === selectedPeriod.value)
  return found || periodOptions[0]
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
  showCustomDateModal.value = true
}

const scrollExcelTabs = (direction: 'left' | 'right') => {
  const currentIndex = periodOptions.findIndex(p => p.value === selectedPeriod.value)
  if (currentIndex !== -1) {
    if (direction === 'left' && currentIndex > 0) {
      selectedPeriod.value = periodOptions[currentIndex - 1].value
    } else if (direction === 'right' && currentIndex < periodOptions.length - 1) {
      selectedPeriod.value = periodOptions[currentIndex + 1].value
    }
  } else {
    selectedPeriod.value = direction === 'left' ? periodOptions[0].value : periodOptions[periodOptions.length - 1].value
  }
  
  refreshCharts()

  nextTick(() => {
    const activeEl = excelTabStripRef.value?.querySelector('.is-active') as HTMLElement | null
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    } else if (excelTabStripRef.value) {
      const scrollAmount = 140
      excelTabStripRef.value.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  })
}

const applyCustomDateRange = () => {
  selectedPeriod.value = 'custom'
  showCustomDateModal.value = false
  refreshCharts()
}

const setPresetRange = (type: number | 'this_month') => {
  const now = new Date(2026, 7, 19) // 19 August 2026
  const formatYMD = (d: Date) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  customEndDate.value = formatYMD(now)

  if (typeof type === 'number') {
    const past = new Date(now)
    past.setDate(past.getDate() - type + 1)
    customStartDate.value = formatYMD(past)
  } else if (type === 'this_month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    customStartDate.value = formatYMD(startOfMonth)
  }

  applyCustomDateRange()
}

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: METRICS DATA]
// -------------------------------------------------------------------------
const mockMetricsMap: Record<string, {
  totalGtv: number
  gtvComparison: string
  totalTickets: number
  ticketsComparison: string
  totalVisitors: number
  visitorsComparison: string
  newMembers: number
  newMembersComparison: string
}> = {
  today: {
    totalGtv: 48750000,
    gtvComparison: '+14.4% vs kemarin (Rp 42.6 Jt)',
    totalTickets: 2450,
    ticketsComparison: '+320 tiket vs kemarin',
    totalVisitors: 2180,
    visitorsComparison: '89.0% check-in rate (Gate)',
    newMembers: 215,
    newMembersComparison: '+38 member vs kemarin'
  },
  yesterday: {
    totalGtv: 42600000,
    gtvComparison: '+8.1% vs rata-rata harian',
    totalTickets: 2130,
    ticketsComparison: '+140 tiket vs H-2',
    totalVisitors: 1940,
    visitorsComparison: '91.1% check-in rate (Gate)',
    newMembers: 177,
    newMembersComparison: '+22 member'
  },
  week: {
    totalGtv: 312500000,
    gtvComparison: '+18.2% vs 7 hari sebelumnya',
    totalTickets: 15625,
    ticketsComparison: '+2.410 tiket vs 7 hari sebelumnya',
    totalVisitors: 14280,
    visitorsComparison: '91.4% check-in rate (Gate)',
    newMembers: 1420,
    newMembersComparison: '+280 member vs 7 hari sebelumnya'
  },
  last_week: {
    totalGtv: 264300000,
    gtvComparison: '+11.5% vs minggu sebelumnya',
    totalTickets: 13215,
    ticketsComparison: '+1.350 tiket',
    totalVisitors: 12050,
    visitorsComparison: '91.2% check-in rate (Gate)',
    newMembers: 1140,
    newMembersComparison: '+195 member'
  },
  month: {
    totalGtv: 1280000000,
    gtvComparison: '+24.5% vs bulan lalu',
    totalTickets: 64200,
    ticketsComparison: '+11.200 tiket vs bulan lalu',
    totalVisitors: 59800,
    visitorsComparison: '93.1% check-in rate (Gate)',
    newMembers: 5850,
    newMembersComparison: '+1.150 member vs bulan lalu'
  },
  last_month: {
    totalGtv: 1028000000,
    gtvComparison: '+16.0% vs Juni 2026',
    totalTickets: 53000,
    ticketsComparison: '+8.400 tiket',
    totalVisitors: 49200,
    visitorsComparison: '92.8% check-in rate (Gate)',
    newMembers: 4700,
    newMembersComparison: '+820 member'
  },
  quarter: {
    totalGtv: 2308000000,
    gtvComparison: '+21.4% vs Q2 2026',
    totalTickets: 117200,
    ticketsComparison: '+19.600 tiket vs Q2',
    totalVisitors: 109000,
    visitorsComparison: '93.0% check-in rate (Gate)',
    newMembers: 10550,
    newMembersComparison: '+1.970 member vs Q2'
  },
  year: {
    totalGtv: 9480000000,
    gtvComparison: '+28.6% vs periode sama 2025',
    totalTickets: 474000,
    ticketsComparison: '+84.000 tiket vs 2025',
    totalVisitors: 442000,
    visitorsComparison: '93.2% check-in rate (Gate)',
    newMembers: 42600,
    newMembersComparison: '+8.400 member vs 2025'
  },
  custom: {
    totalGtv: 785000000,
    gtvComparison: 'Rentang 1 - 19 Agustus 2026',
    totalTickets: 39250,
    ticketsComparison: '39.250 tiket tervalidasi',
    totalVisitors: 36500,
    visitorsComparison: '93.0% check-in rate',
    newMembers: 3580,
    newMembersComparison: '3.580 member baru'
  }
}

const currentMetrics = computed(() => {
  return mockMetricsMap[selectedPeriod.value] || mockMetricsMap.today
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: CRM MEMBER SEGMENTS & RESONANCE SCORES]
// -------------------------------------------------------------------------
const memberSegments = ref([
  { code: 'PR', title: 'Reguler Kasir POS', count: 8640, percentage: 58.3, color: '#F29727' },
  { code: 'PP', title: 'Promo WhatsApp', count: 4320, percentage: 29.2, color: '#2C1A13' },
  { code: 'PT', title: 'Paket Terusan Edukasi', count: 1860, percentage: 12.5, color: '#10B981' }
])

const memberSegmentTotal = computed(() => {
  return memberSegments.value.reduce((acc, seg) => acc + seg.count, 0)
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: TICKET SALES BREAKDOWN (4 COMPLETE CATEGORIES)]
// -------------------------------------------------------------------------
const mockTicketBreakdownMap: Record<string, any[]> = {
  today: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 1650, totalGtv: 33000000, percentage: 50.2, color: '#F29727', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 495, totalGtv: 17325000, percentage: 26.4, color: '#2C1A13', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 390, totalGtv: 9750000, percentage: 14.8, color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 375, totalGtv: 5625000, percentage: 8.6, color: '#059669', bgLight: '#ECFDF5' }
  ],
  week: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 10450, totalGtv: 209000000, percentage: 50.5, color: '#F29727', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 3120, totalGtv: 109200000, percentage: 26.4, color: '#2C1A13', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 2450, totalGtv: 61250000, percentage: 14.8, color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 2320, totalGtv: 34800000, percentage: 8.3, color: '#059669', bgLight: '#ECFDF5' }
  ],
  month: [
    { id: 'tiket-reguler', code: 'REGULER', name: 'Tiket Masuk Reguler', description: 'Akses wahana edukasi utama & kebun coklat', price: 20000, qty: 42800, totalGtv: 856000000, percentage: 50.8, color: '#F29727', bgLight: '#FEF3C7' },
    { id: 'tiket-terusan', code: 'TERUSAN', name: 'Tiket Masuk Terusan', description: 'Termasuk wahana bermain & mini bioskop 3D', price: 35000, qty: 12600, totalGtv: 441000000, percentage: 26.1, color: '#2C1A13', bgLight: '#F3EFEA' },
    { id: 'wisata-edukasi', code: 'EDUKASI', name: 'Wisata Edukasi Coklat', description: 'Cooking class mini & cetak coklat kreasi', price: 25000, qty: 10050, totalGtv: 251250000, percentage: 14.9, color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'paket-tour', code: 'TOUR', name: 'Paket Rombongan Tour', description: 'Pemandu tur khusus, souvenir & tasting', price: 15000, qty: 9150, totalGtv: 137250000, percentage: 8.2, color: '#059669', bgLight: '#ECFDF5' }
  ]
}

const currentTicketBreakdown = computed(() => {
  return mockTicketBreakdownMap[selectedPeriod.value] || mockTicketBreakdownMap.month
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: DEMOGRAPHIC ORIGIN CITIES]
// -------------------------------------------------------------------------
const mockDemographicsMap: Record<string, any[]> = {
  today: [
    { name: 'Kota Blitar', visitors: 940, percentage: 38.4, isLocal: true, color: '#F29727' },
    { name: 'Kabupaten Blitar', visitors: 580, percentage: 23.7, isLocal: true, color: '#D97706' },
    { name: 'Kediri & Sekitarnya', visitors: 390, percentage: 15.9, isLocal: false, color: '#2C1A13' },
    { name: 'Tulungagung & Trenggalek', visitors: 290, percentage: 11.8, isLocal: false, color: '#4B5563' },
    { name: 'Malang & Surabaya', visitors: 250, percentage: 10.2, isLocal: false, color: '#9CA3AF' }
  ],
  week: [
    { name: 'Kota Blitar', visitors: 5800, percentage: 37.1, isLocal: true, color: '#F29727' },
    { name: 'Kabupaten Blitar', visitors: 3950, percentage: 25.3, isLocal: true, color: '#D97706' },
    { name: 'Kediri & Sekitarnya', visitors: 2580, percentage: 16.5, isLocal: false, color: '#2C1A13' },
    { name: 'Tulungagung & Trenggalek', visitors: 1850, percentage: 11.8, isLocal: false, color: '#4B5563' },
    { name: 'Malang & Surabaya', visitors: 1445, percentage: 9.3, isLocal: false, color: '#9CA3AF' }
  ],
  month: [
    { name: 'Kota Blitar', visitors: 23800, percentage: 37.1, isLocal: true, color: '#F29727' },
    { name: 'Kabupaten Blitar', visitors: 16200, percentage: 25.2, isLocal: true, color: '#D97706' },
    { name: 'Kediri & Sekitarnya', visitors: 10800, percentage: 16.8, isLocal: false, color: '#2C1A13' },
    { name: 'Tulungagung & Trenggalek', visitors: 7600, percentage: 11.8, isLocal: false, color: '#4B5563' },
    { name: 'Malang & Surabaya', visitors: 5800, percentage: 9.1, isLocal: false, color: '#9CA3AF' }
  ]
}

const currentDemographics = computed(() => {
  return mockDemographicsMap[selectedPeriod.value] || mockDemographicsMap.month
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: PAYMENT METHODS SUMMARY]
// -------------------------------------------------------------------------
const mockPaymentMethodsMap: Record<string, any[]> = {
  today: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 23850000, transactions: 1195, percentage: 49, status: 'Settled', color: '#059669', bgLight: '#ECFDF5' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 17200000, transactions: 860, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFBEB' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 5850000, transactions: 295, percentage: 12, status: 'Settled', color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 1850000, transactions: 100, percentage: 4, status: 'Settled', color: '#7C3AED', bgLight: '#F5F3FF' }
  ],
  week: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 153125000, transactions: 7655, percentage: 49, status: 'Settled', color: '#059669', bgLight: '#ECFDF5' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 109375000, transactions: 5470, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFBEB' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 37500000, transactions: 1875, percentage: 12, status: 'Settled', color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 12500000, transactions: 625, percentage: 4, status: 'Settled', color: '#7C3AED', bgLight: '#F5F3FF' }
  ],
  month: [
    { id: 'qris', name: 'QRIS (BCA, Mandiri, GoPay)', subname: 'Statis & Dinamis', amount: 627200000, transactions: 31450, percentage: 49, status: 'Settled', color: '#059669', bgLight: '#ECFDF5' },
    { id: 'cash', name: 'Cash / Tunai Kasir POS', subname: 'Loket Tiket Utama', amount: 448000000, transactions: 22470, percentage: 35, status: 'Settled', color: '#D97706', bgLight: '#FFFBEB' },
    { id: 'debit', name: 'EDC Debit BCA / Mandiri', subname: 'Mesin EDC Loket', amount: 153600000, transactions: 7700, percentage: 12, status: 'Settled', color: '#2563EB', bgLight: '#EFF6FF' },
    { id: 'transfer', name: 'Transfer Bank (B2B)', subname: 'Invoice Rombongan', amount: 51200000, transactions: 2580, percentage: 4, status: 'Settled', color: '#7C3AED', bgLight: '#F5F3FF' }
  ]
}

const currentPaymentMethods = computed(() => {
  return mockPaymentMethodsMap[selectedPeriod.value] || mockPaymentMethodsMap.month
})

const totalPaymentAmount = computed(() => {
  return currentPaymentMethods.value.reduce((acc, pay) => acc + pay.amount, 0)
})

// -------------------------------------------------------------------------
// [API INTEGRATION POINT: CASHIER SHIFT SUMMARY DATA]
// -------------------------------------------------------------------------
interface ShiftInfo {
  id: string
  shiftName: string
  terminalName: string
  cashierName: string
  cashierId: string
  date: string
  startTime: string
  endTime: string
  totalTransactions: number
  totalTicketsSold: number
  cashReceived: number
  nonCashReceived: number
  reconciliationStatus: 'balanced' | 'surplus' | 'deficit'
  statusLabel: string
  reconciliationNotes: string
  variance: number
  isClosed: boolean
}

const allShiftList = ref<ShiftInfo[]>([
  {
    id: 'ALL',
    shiftName: 'Agregat Operasional Hari Ini',
    terminalName: '4 Loket Aktif (Utama & 3 Wahana)',
    cashierName: 'Semua Loket (1 Utama + 3 Wahana)',
    cashierId: 'ALL-POS',
    date: '19 Agustus 2026',
    startTime: '08:00',
    endTime: '17:00',
    totalTransactions: 1254,
    totalTicketsSold: 2450,
    cashReceived: 17200000,
    nonCashReceived: 31550000,
    reconciliationStatus: 'balanced',
    statusLabel: '4 Loket Beroperasi (Live)',
    reconciliationNotes: 'Seluruh pencatatan laci kasir keempat loket klop 100% tanpa selisih.',
    variance: 0,
    isClosed: false
  },
  {
    id: 'LOKET-UTAMA',
    shiftName: 'Shift 1 (Pagi)',
    terminalName: 'Loket Utama (Main Gate)',
    cashierName: 'Siti Rahmawati',
    cashierId: 'KASIR-01',
    date: '19 Agustus 2026',
    startTime: '08:00',
    endTime: '17:00',
    totalTransactions: 782,
    totalTicketsSold: 1650,
    cashReceived: 11450000,
    nonCashReceived: 21550000,
    reconciliationStatus: 'balanced',
    statusLabel: 'Loket Beroperasi (Live)',
    reconciliationNotes: 'Pencatatan kas fisik laci sesuai dengan struk tiket masuk reguler.',
    variance: 0,
    isClosed: false
  },
  {
    id: 'LOKET-WAHANA-1',
    shiftName: 'Shift Reguler',
    terminalName: 'Loket Wahana 1 (Cooking Class & Edukasi)',
    cashierName: 'Dewi Lestari',
    cashierId: 'KASIR-02',
    date: '19 Agustus 2026',
    startTime: '08:30',
    endTime: '17:00',
    totalTransactions: 205,
    totalTicketsSold: 345,
    cashReceived: 2500000,
    nonCashReceived: 4400000,
    reconciliationStatus: 'balanced',
    statusLabel: 'Loket Beroperasi (Live)',
    reconciliationNotes: 'Laci kasir terverifikasi klop dengan tiket Cooking Class & Edukasi Coklat.',
    variance: 0,
    isClosed: false
  },
  {
    id: 'LOKET-WAHANA-2',
    shiftName: 'Shift Reguler',
    terminalName: 'Loket Wahana 2 (Kereta Safari & Feeding)',
    cashierName: 'Rian Pratama',
    cashierId: 'KASIR-03',
    date: '19 Agustus 2026',
    startTime: '08:30',
    endTime: '17:00',
    totalTransactions: 152,
    totalTicketsSold: 275,
    cashReceived: 1950000,
    nonCashReceived: 3200000,
    reconciliationStatus: 'balanced',
    statusLabel: 'Loket Beroperasi (Live)',
    reconciliationNotes: 'Laci kasir terverifikasi klop dengan tiket Kereta Safari & Animal Feeding.',
    variance: 0,
    isClosed: false
  },
  {
    id: 'LOKET-WAHANA-3',
    shiftName: 'Shift Reguler',
    terminalName: 'Loket Wahana 3 (Playground & Kolam Coklat)',
    cashierName: 'Anita Widya',
    cashierId: 'KASIR-04',
    date: '19 Agustus 2026',
    startTime: '08:30',
    endTime: '17:00',
    totalTransactions: 115,
    totalTicketsSold: 180,
    cashReceived: 1300000,
    nonCashReceived: 2400000,
    reconciliationStatus: 'balanced',
    statusLabel: 'Loket Beroperasi (Live)',
    reconciliationNotes: 'Laci kasir terverifikasi klop dengan wahana Playground & Kolam Coklat.',
    variance: 0,
    isClosed: false
  }
])

const currentShiftData = computed(() => {
  return allShiftList.value[0]
})

// =========================================================================
// CHART.JS INSTANCES & RENDERING (Ultra-Smooth Bezier Gradient Spline)
// =========================================================================
const revenueChartCanvas = ref<HTMLCanvasElement | null>(null)
const memberChartCanvas = ref<HTMLCanvasElement | null>(null)

let revenueChartInstance: Chart | null = null
let memberChartInstance: Chart | null = null

// Chart Data Configuration based on period
const getChartLabels = (period: PeriodType) => {
  if (period === 'today' || period === 'yesterday') {
    return ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
  } else if (period === 'week' || period === 'last_week') {
    return ['Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Senin', 'Selasa', 'Rabu']
  } else if (period === 'month' || period === 'last_month' || period === 'custom') {
    return ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']
  } else if (period === 'quarter') {
    return ['Bulan 1', 'Bulan 2', 'Bulan 3']
  } else {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu']
  }
}

const getChartGtvData = (period: PeriodType) => {
  if (period === 'today') {
    return [2400000, 4100000, 7800000, 8900000, 5200000, 6800000, 7200000, 4100000, 1850000, 400000]
  } else if (period === 'yesterday') {
    return [2100000, 3600000, 6900000, 7800000, 4800000, 6100000, 6500000, 3200000, 1400000, 200000]
  } else if (period === 'week') {
    return [32000000, 36500000, 68000000, 74500000, 28000000, 24750000, 48750000]
  } else if (period === 'last_week') {
    return [28000000, 31000000, 59000000, 62000000, 24000000, 21000000, 39300000]
  } else if (period === 'quarter') {
    return [680000000, 780000000, 848000000]
  } else if (period === 'year') {
    return [850000000, 920000000, 1140000000, 1280000000, 1340000000, 1410000000, 1260000000, 1280000000]
  } else {
    return [280000000, 340000000, 375000000, 285000000]
  }
}

const getChartTicketData = (period: PeriodType) => {
  if (period === 'today') {
    return [140, 260, 480, 560, 310, 420, 450, 240, 110, 25]
  } else if (period === 'yesterday') {
    return [120, 220, 410, 480, 280, 370, 400, 190, 80, 15]
  } else if (period === 'week') {
    return [1950, 2200, 4100, 4550, 1700, 1500, 2980]
  } else if (period === 'last_week') {
    return [1650, 1850, 3550, 3750, 1450, 1250, 2350]
  } else if (period === 'quarter') {
    return [38000, 43500, 47800]
  } else if (period === 'year') {
    return [48000, 52000, 64000, 72000, 75500, 79000, 71000, 72000]
  } else {
    return [17500, 21000, 23500, 17800]
  }
}

const initRevenueChart = () => {
  if (!revenueChartCanvas.value) return
  if (revenueChartInstance) revenueChartInstance.destroy()

  const labels = getChartLabels(selectedPeriod.value)
  const gtvData = getChartGtvData(selectedPeriod.value)
  const ticketData = getChartTicketData(selectedPeriod.value)

  const ctx = revenueChartCanvas.value.getContext('2d')
  let gtvLineGradient: any = 'rgba(245, 158, 11, 0.25)'
  let ticketLineGradient: any = 'transparent'
  let gtvBarGradient: any = '#F59E0B'
  let ticketBarGradient: any = '#2C1A13'

  if (ctx) {
    // Line Chart Glowing Area Fill (Primary Series)
    gtvLineGradient = ctx.createLinearGradient(0, 0, 0, 320)
    gtvLineGradient.addColorStop(0, 'rgba(245, 158, 11, 0.42)')
    gtvLineGradient.addColorStop(0.6, 'rgba(245, 158, 11, 0.10)')
    gtvLineGradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)')

    // 3D Rounded Pill Bar Vertical Gradients (Side-by-side)
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
          label: 'Pendapatan GTV',
          data: gtvData,
          borderColor: '#F59E0B',
          backgroundColor: isLine ? gtvLineGradient : gtvBarGradient,
          borderWidth: isLine ? 3.5 : 0,
          tension: 0.42,
          fill: isLine,
          yAxisID: 'y',
          pointRadius: isLine ? 5 : 0,
          pointHoverRadius: isLine ? 8.5 : 0,
          pointBackgroundColor: '#FFFFFF',
          pointBorderColor: '#F59E0B',
          pointBorderWidth: 2.5,
          borderRadius: !isLine ? { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 } : 0,
          borderSkipped: false,
          barPercentage: 0.72,
          categoryPercentage: 0.68
        },
        {
          label: 'Volume Tiket',
          data: ticketData,
          borderColor: '#2C1A13',
          backgroundColor: isLine ? 'transparent' : ticketBarGradient,
          borderWidth: isLine ? 2.8 : 0,
          borderDash: isLine ? [6, 4] : undefined,
          tension: 0.42,
          fill: false,
          yAxisID: 'y1',
          pointRadius: isLine ? 4.5 : 0,
          pointHoverRadius: isLine ? 7.5 : 0,
          pointBackgroundColor: '#2C1A13',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          borderRadius: !isLine ? { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 } : 0,
          borderSkipped: false,
          barPercentage: 0.72,
          categoryPercentage: 0.68
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
          backgroundColor: 'rgba(28, 14, 8, 0.96)',
          titleColor: '#FBBF24',
          titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12.5, weight: 'bold' },
          bodyColor: '#FFFDF9',
          bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 11.5, weight: '600' },
          padding: 14,
          cornerRadius: 12,
          borderColor: '#F59E0B',
          borderWidth: 1.5,
          displayColors: true,
          boxWidth: 8,
          boxHeight: 8,
          boxPadding: 6,
          usePointStyle: false,
          callbacks: {
            title: (items) => {
              if (items.length) {
                return `Waktu: ${items[0].label} WIB`
              }
              return ''
            },
            label: (ctx) => {
              const label = ctx.dataset.label || ''
              const val = ctx.parsed.y as number
              if (label === 'Pendapatan GTV') {
                return ` ${label}: ${formatRupiah(val)}`
              }
              return ` ${label}: ${val.toLocaleString('id-ID')} Pax`
            },
            afterBody: (items) => {
              if (items.length >= 2) {
                const gtv = items[0].parsed.y as number
                const tickets = items[1].parsed.y as number
                if (tickets > 0) {
                  const avgPerTicket = Math.round(gtv / tickets)
                  return `\n• Rata-rata / Tiket: ${formatRupiah(avgPerTicket)}`
                }
              }
              return ''
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
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 11, weight: '600' },
            color: '#78655C'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 10.5, weight: '600' },
            color: '#78655C',
            callback: (val) => {
              const num = val as number
              if (num >= 1000000000) return `Rp ${(num / 1000000000).toFixed(1)} M`
              if (num >= 1000000) return `Rp ${(num / 1000000).toFixed(0)} Jt`
              if (num >= 1000) return `Rp ${(num / 1000).toFixed(0)} Rb`
              return `Rp ${num}`
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: true,
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 10.5, weight: '600' },
            color: '#2C1A13',
            callback: (val) => {
              const num = val as number
              if (num >= 1000) return `${(num / 1000).toFixed(0)}k Pax`
              return `${num} Pax`
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

const refreshCharts = () => {
  nextTick(() => {
    initRevenueChart()
  })
}

const refreshData = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    refreshCharts()
  }, 400)
}

onMounted(() => {
  initRevenueChart()
})

watch(selectedPeriod, () => {
  refreshCharts()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

/* =========================================================================
   1. ULTRA-LUXURY EXECUTIVE COMMAND BANNER & FILTER
   ========================================================================= */
.executive-command-header {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFDF9 50%, #FAF5ED 100%);
  border: 1.5px solid rgba(230, 220, 208, 0.95);
  border-radius: 24px;
  padding: 22px 28px;
  box-shadow: 0 14px 36px -4px rgba(44, 26, 19, 0.09), 0 3px 8px rgba(44, 26, 19, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  z-index: 50;
}

.executive-command-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #F29727 0%, #D97706 50%, #2C1A13 100%);
  border-radius: 24px 24px 0 0;
}

.header-top-ambient-glow {
  position: absolute;
  top: -20px;
  right: 25%;
  width: 380px;
  height: 140px;
  background: radial-gradient(circle, rgba(242, 151, 39, 0.12) 0%, rgba(242, 151, 39, 0) 70%);
  pointer-events: none;
}

.header-ambient-orb-right {
  position: absolute;
  top: -30px;
  right: -20px;
  width: 260px;
  height: 140px;
  background: radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, rgba(217, 119, 6, 0) 70%);
  pointer-events: none;
}

.header-inner-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

/* Left: Brand Hero Profile */
.brand-hero-col {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-crest-wrapper {
  position: relative;
  flex-shrink: 0;
}

.brand-logo-3d-box {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 60%, #FEF3C7 100%);
  border: 1.5px solid #FDE68A;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.18), 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 4px;
}

.brand-logo-3d-box:hover {
  transform: scale(1.06) rotate(-2deg);
}

.brand-logo-img {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

.active-radar-beacon {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-ping-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.4);
  animation: radar-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.radar-center-dot {
  width: 9px;
  height: 9px;
  background: #10B981;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  box-shadow: 0 0 8px #10B981;
}

@keyframes radar-ping {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.brand-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Line 1: Title + Status Pill Inline */
.title-with-status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.header-main-title {
  font-size: 24px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.5px;
  line-height: 1.15;
  display: flex;
  align-items: center;
  gap: 6px;
}

.title-accent-amp {
  color: #F29727;
  font-weight: 400;
  font-family: Georgia, serif;
  font-size: 22px;
}

.title-highlight {
  background: linear-gradient(135deg, #2C1A13 0%, #D97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.live-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #ECFDF5;
  color: #047857;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid #A7F3D0;
  box-shadow: 0 1px 3px rgba(4, 120, 87, 0.08);
}

.live-pulse-dot {
  width: 6px;
  height: 6px;
  background-color: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
  animation: pulse-green 1.5s infinite;
}

@keyframes pulse-green {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Line 2: Clean Metadata Line */
.header-meta-clean-line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #8C786E;
  flex-wrap: wrap;
}

.meta-brand-tag {
  color: #B45309;
  font-weight: 800;
  letter-spacing: 0.6px;
  font-size: 11px;
}

.meta-sep {
  color: #D6CCC2;
  font-size: 10px;
}

.meta-time-text {
  color: #6B5A52;
}

.meta-loc-text {
  color: #8C786E;
}

/* Right: Controls Hero Col */
.controls-hero-col {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* =========================================================================
   EXCEL / SPREADSHEET-STYLE SLIDING TAB BAR (Clean Flex Layout)
   ========================================================================= */
.excel-tabs-slider-bar {
  background: #F4EFEA;
  border: 1.5px solid #E2D9CE;
  border-radius: 14px;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 440px;
  box-shadow: inset 0 1px 3px rgba(44, 26, 19, 0.04);
  height: 44px;
  box-sizing: border-box;
}

.excel-tab-nav-btn {
  width: 28px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #E2D9CE;
  background: #FFFFFF;
  color: #5A4034;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.06);
}

.excel-tab-nav-btn:hover {
  background: #2C1A13;
  color: #FBBF24;
  border-color: #2C1A13;
  transform: scale(1.06);
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.2);
}

.excel-tab-strip-scroll {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 0 2px;
  flex: 1;
  min-width: 0;
}

.excel-tab-strip-scroll::-webkit-scrollbar {
  display: none;
}

.excel-sheet-tab {
  height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: #6B5A52;
  white-space: nowrap;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.excel-sheet-tab:hover {
  color: #2C1A13;
  background: rgba(44, 26, 19, 0.08);
}

.excel-sheet-tab.is-active {
  background: #2C1A13;
  color: #FFFFFF;
  border-color: #2C1A13;
  box-shadow: 0 3px 8px rgba(44, 26, 19, 0.25);
}

.sheet-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 6px #10B981;
  flex-shrink: 0;
}

.sheet-tab-label {
  font-weight: 700;
}

.excel-sheet-tab.is-active .sheet-tab-label {
  font-weight: 800;
}

.sheet-active-underline {
  position: absolute;
  bottom: 2px;
  left: 20%;
  right: 20%;
  height: 2px;
  background: #F29727;
  border-radius: 2px;
}

/* Dedicated Custom Date Button (Icon Only) */
.btn-custom-date-icon-only {
  width: 44px;
  height: 44px;
  background: #FFFFFF;
  border: 1.5px solid #E2D9CE;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #5A4034;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.04);
  flex-shrink: 0;
  position: relative;
}

.btn-custom-date-icon-only:hover {
  border-color: #D97706;
  background: #FFFDF9;
  color: #D97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);
}

.btn-custom-date-icon-only.is-active {
  background: #2C1A13;
  border-color: #2C1A13;
  color: #FBBF24;
  box-shadow: 0 4px 12px rgba(44, 26, 19, 0.25);
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

/* Matching 44x44 Squircle Refresh Button */
.btn-header-refresh-icon {
  width: 44px;
  height: 44px;
  background: #FFFFFF;
  border: 1.5px solid #E2D9CE;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #D97706;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.04);
  flex-shrink: 0;
}

.btn-header-refresh-icon:hover:not(:disabled) {
  border-color: #D97706;
  background: #FFFDF9;
  color: #B45309;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);
}

.btn-header-refresh-icon:active:not(:disabled) {
  transform: translateY(0);
}

.btn-header-refresh-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}



/* Top-Right Corner Floating Sync Button (Soft & Subtle) */
.header-top-corner-sync {
  position: absolute;
  top: 14px;
  right: 22px;
  z-index: 10;
}

.btn-corner-sync {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  font-size: 11px;
  font-weight: 800;
  font-family: inherit;
  background: linear-gradient(135deg, #FFFDF9 0%, #FAF4EB 100%);
  color: #6B442A;
  border: 1px solid #FCD34D;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.1), inset 0 1px 0 #FFFFFF;
}

.btn-corner-sync:hover:not(:disabled) {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-color: #F59E0B;
  color: #92400E;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
}

.btn-corner-sync:active:not(:disabled) {
  transform: translateY(0);
}

.btn-corner-sync:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-corner-sync svg {
  color: #D97706;
}

.btn-corner-sync:hover:not(:disabled) svg {
  color: #B45309;
}

.sync-live-dot {
  width: 5px;
  height: 5px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 4px #10B981;
}

.sync-text {
  letter-spacing: 0.3px;
}

.spin-anim {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Popover Transition */
.popover-fade-enter-active,
.popover-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.popover-fade-enter-from,
.popover-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

/* =========================================================================
   2. 4 TOP KPI CARDS GRID (Bento Pill Grid)
   ========================================================================= */
.kpi-cards-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* =========================================================================
   3. BENTO CARD CONTAINER & CHARTS ROW
   ========================================================================= */
.bento-card {
  background: #FFFFFF;
  border: 1.5px solid rgba(230, 220, 208, 0.95);
  border-radius: 24px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 12px 32px -4px rgba(44, 26, 19, 0.08), 0 3px 8px rgba(44, 26, 19, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 22px 45px -6px rgba(44, 26, 19, 0.14), 0 6px 16px rgba(44, 26, 19, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(242, 151, 39, 0.55);
}

.bento-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.header-title-group {
  display: flex;
  flex-direction: column;
  gap: 3px;
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
.chip-brown { background: #F5F3EF; color: #2C1A13; }
.chip-green { background: #ECFDF5; color: #059669; }
.chip-blue  { background: #EFF6FF; color: #2563EB; }

.bento-card-title {
  font-size: 16.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.peak-beacon-chip {
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

.beacon-dot {
  width: 6px;
  height: 6px;
  background: #F59E0B;
  border-radius: 50%;
  box-shadow: 0 0 6px #F59E0B;
}

.bento-card-subtitle {
  font-size: 12px;
  color: #78655C;
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
  color: #2C1A13;
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

.color-gtv { 
  background: #F59E0B; 
  box-shadow: 0 0 4px rgba(245, 158, 11, 0.4);
}

.color-comp, .color-tickets { 
  background: #2C1A13; 
}

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
  background: #2C1A13;
  color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.25);
}

.trend-full-section {
  width: 100%;
}

.chart-canvas-container {
  position: relative;
  height: 290px;
  width: 100%;
}

/* 3-Column Highlight Cards Strip (Inspired by Image 2) */
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

.highlight-label {
  font-size: 10px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.highlight-val {
  font-size: 12.5px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.text-amber { color: #D97706; }
.text-cocoa { color: #2C1A13; }
.text-green { color: #059669; }

/* Donut Member Card */
.crm-total-pill {
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

/* =========================================================================
   CONCENTRIC RADIAL RINGS MEMBER CARD (Rich Bento Layout)
   ========================================================================= */
.radial-gauge-flex-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin: 14px 0 10px 0;
}

/* Left Column: Rich Items List */
.radial-legend-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1.35;
  min-width: 0;
}

.radial-legend-card-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #FFFDF9;
  border: 1px solid #F0EAE2;
  border-radius: 12px;
  padding: 10px 12px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.radial-legend-card-row:hover,
.radial-legend-card-row.is-hovered {
  background: #FFFFFF;
  border-color: #F29727;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(44, 26, 19, 0.06);
}

.legend-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.legend-left-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.legend-color-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.legend-code-tag {
  font-weight: 900;
  color: #2C1A13;
  background: #F4EFEA;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 10.5px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.legend-name-text {
  font-size: 12.5px;
  font-weight: 700;
  color: #2C1A13;
  line-height: 1.2;
}

.legend-right-score {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.legend-count-val {
  font-size: 13.5px;
  font-weight: 900;
  color: #1C0E08;
}

.legend-pct-val {
  font-size: 11px;
  font-weight: 800;
}

.legend-track-bg {
  width: 100%;
  height: 5px;
  background: #EFE8DF;
  border-radius: 10px;
  overflow: hidden;
}

.legend-track-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Right Column: Multi-Ring Concentric SVG with Metric Below */
.radial-rings-chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 190px;
  gap: 8px;
}

.concentric-rings-svg {
  width: 155px;
  height: 155px;
  filter: drop-shadow(0 6px 16px rgba(44, 26, 19, 0.07));
}

.ring-track {
  stroke: #F3EFE9;
}

.ring-active {
  transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.25s ease;
}

.radial-rings-card-elevated:hover .ring-active {
  stroke-width: 13;
}

/* Metric Display Below Circular Rings */
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

.bottom-total-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #6B5A52;
}

.bottom-total-val {
  font-size: 15px;
  font-weight: 900;
  color: #2C1A13;
  letter-spacing: -0.3px;
}

.bottom-active-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9.5px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  padding: 1px 7px;
  border-radius: 8px;
  border: 1px solid #A7F3D0;
}

.hub-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 5px #10B981;
}

.legend-card-subinfo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #78655C;
  margin-top: 1px;
}

.subinfo-item strong {
  color: #2C1A13;
  font-weight: 700;
}

.subinfo-sep {
  color: #D6CCC2;
  font-size: 8px;
}

/* CRM Multi-Metric Insight Matrix (3 Solid Bento Capsules) */
.crm-insight-matrix-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1.5px dashed #EBE4DB;
}

.crm-matrix-card {
  background: #FFFDF9;
  border: 1px solid #F0EAE2;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s ease;
}

.crm-matrix-card:hover {
  background: #FFFFFF;
  border-color: #F29727;
  transform: translateY(-1px);
}

.matrix-card-header {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 700;
  color: #78655C;
}

.matrix-card-header svg {
  color: #D97706;
  flex-shrink: 0;
}

.matrix-card-body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
}

.matrix-main-val {
  font-size: 13.5px;
  font-weight: 800;
  color: #2C1A13;
  font-variant-numeric: tabular-nums;
}

.matrix-sub-pct {
  font-size: 10.5px;
  font-weight: 800;
}

.matrix-sub-badge {
  font-size: 9.5px;
  font-weight: 800;
  color: #047857;
  background: #ECFDF5;
  padding: 1px 5px;
  border-radius: 4px;
}

.matrix-sub-sub {
  font-size: 10px;
  color: #8C786E;
}

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

.btn-see-more:hover {
  transform: translateX(4px);
  color: #D97706;
}

.arrow-sym {
  font-size: 14px;
}

/* =========================================================================
   4. 2-COLUMN GRID (CRM Member Segmentation + Ticket Sales Table)
   ========================================================================= */
.crm-ticket-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.ticket-sales-col {
  height: 100%;
}

/* =========================================================================
   5. FULL-WIDTH LUXURY DEMOGRAPHIC GEOSPATIAL HUB
   ========================================================================= */
.demographic-full-section {
  width: 100%;
}

.demographic-card-luxury {
  background: #FFFFFF;
  border: 1.5px solid rgba(230, 220, 208, 0.95);
  border-radius: 24px;
  padding: 22px 26px;
  box-shadow: 0 12px 32px -4px rgba(44, 26, 19, 0.08), 0 3px 8px rgba(44, 26, 19, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.demographic-card-luxury:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 45px -6px rgba(44, 26, 19, 0.13), 0 6px 16px rgba(44, 26, 19, 0.04);
  border-color: rgba(242, 151, 39, 0.5);
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

.summary-pill-item strong {
  color: #2C1A13;
}

.pill-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

/* Map Canvas Container - Full Width & Clean */
.demographic-map-luxury {
  position: relative;
  height: 380px;
  width: 100%;
  background: radial-gradient(circle at 45% 54%, #FFFDF8 0%, #FAF4E8 50%, #F5ECDD 100%);
  border: 1.5px solid #EAE2D8;
  border-radius: 18px;
  overflow: hidden;
  display: block;
  cursor: grab;
  user-select: none;
  box-shadow: inset 0 2px 10px rgba(44, 26, 19, 0.05);
}

.demographic-map-luxury.is-panning {
  cursor: grabbing;
}

/* Pannable & Zoomable Container - Critical 100% Dimensions */
.map-pan-zoom-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  pointer-events: auto;
}

.map-vector-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Floating Controls */
.map-controls-floating {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
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
  border: 1px solid #E5DDD3;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 10.5px;
  font-weight: 800;
  color: #5A4034;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.08);
}

.pulse-gold-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #F59E0B;
  box-shadow: 0 0 6px #F59E0B;
  animation: radar-ping 1.8s infinite;
}

.map-zoom-buttons-group {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border: 1px solid #E5DDD3;
  border-radius: 10px;
  padding: 3px;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.08);
  pointer-events: auto;
}

.map-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid #EAE2D8;
  background: #FAF7F2;
  color: #5A4034;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.map-btn:hover {
  background: #2C1A13;
  color: #FBBF24;
  border-color: #2C1A13;
}

.zoom-level-text {
  font-size: 10.5px;
  font-weight: 800;
  color: #5A4034;
  min-width: 34px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

/* Map Elements & Radar Rings centered at (45%, 54%) */
.radar-ring {
  position: absolute;
  border: 1px dashed rgba(217, 119, 6, 0.22);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.ring-center-core {
  width: 44px;
  height: 44px;
  top: 54%;
  left: 45%;
  border: 1.5px solid rgba(245, 158, 11, 0.6);
  background: rgba(245, 158, 11, 0.04);
}

.ring-10km  { width: 140px; height: 140px; top: 54%; left: 45%; border-color: rgba(245, 158, 11, 0.3); }
.ring-30km  { width: 280px; height: 280px; top: 54%; left: 45%; border-color: rgba(217, 119, 6, 0.2); }
.ring-60km  { width: 440px; height: 440px; top: 54%; left: 45%; border-color: rgba(44, 26, 19, 0.15); }
.ring-120km { width: 620px; height: 620px; top: 54%; left: 45%; border-color: rgba(44, 26, 19, 0.08); }

@keyframes laserFlow {
  from { stroke-dashoffset: 28; }
  to { stroke-dashoffset: 0; }
}

.laser-route-path {
  animation: laserFlow 1.6s linear infinite;
  opacity: 0.6;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.map-vector-canvas.has-active-hover .laser-route-path:not(.laser-active) {
  opacity: 0.18;
  stroke-dasharray: 4 6;
}

.laser-route-path.laser-active {
  opacity: 1;
  stroke-width: 4.8px;
  filter: drop-shadow(0 0 8px currentColor);
}

/* Central Epicenter Marker at (45%, 54%) */
.map-epicenter-marker {
  position: absolute;
  top: 54%;
  left: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 30;
  pointer-events: none;
}

.epicenter-pulse-ring {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.4);
  animation: radar-ping 1.6s infinite;
}

.epicenter-core-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2C1A13;
  border: 2.5px solid #FBBF24;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
  z-index: 2;
}

.epicenter-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  color: #FFFFFF;
  border: 1.5px solid #F59E0B;
  border-radius: 20px;
  padding: 3px 9px;
  font-size: 10.5px;
  font-weight: 800;
  box-shadow: 0 4px 14px rgba(44, 26, 19, 0.3);
  margin-top: 4px;
  white-space: nowrap;
}

.epicenter-tag {
  font-size: 8.5px;
  background: #D97706;
  color: #FFFFFF;
  padding: 1px 4px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

/* Map Pins */
.map-pin-marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
  transform: translate(-50%, -50%);
}

.map-pin-marker:hover,
.map-pin-marker.is-hovered {
  transform: translate(-50%, -50%) scale(1.1) translateY(-3px);
  z-index: 40;
}

.map-pin-marker.is-dimmed {
  opacity: 0.35;
  filter: grayscale(40%);
}

.pin-beacon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-bottom: 2px;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.pin-card-bubble {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(6px);
  border: 1.5px solid #E5DDD3;
  border-radius: 20px;
  padding: 4px 10px;
  box-shadow: 0 4px 14px rgba(44, 26, 19, 0.1);
  font-size: 11.5px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.bubble-gold   { border-color: #F59E0B; background: linear-gradient(135deg, #FFFDF8 0%, #FEF9EE 100%); box-shadow: 0 4px 14px rgba(245, 158, 11, 0.22); }
.bubble-amber  { border-color: #F59E0B; }
.bubble-blue   { border-color: #93C5FD; }
.bubble-green  { border-color: #A7F3D0; }
.bubble-purple { border-color: #DDD6FE; }

.pin-glyph-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-gold   { background: #D97706; }
.dot-amber  { background: #F59E0B; }
.dot-blue   { background: #2563EB; }
.dot-green  { background: #059669; }
.dot-purple { background: #7C3AED; }

.pin-city { font-weight: 800; color: #2C1A13; }
.pin-divider { color: #D6CCC2; font-size: 9px; }
.pin-visitors { font-weight: 900; color: #D97706; font-variant-numeric: tabular-nums; }
.pin-share { font-size: 10.5px; color: #78655C; font-weight: 700; }

/* 3. Bottom 5 Detailed Origin City Bento Metric Cards */
.demo-bottom-cities-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.city-metric-slate {
  background: #FFFDF9;
  border: 1.5px solid #EFEAE2;
  border-radius: 14px;
  padding: 11px 13px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.city-metric-slate:hover,
.city-metric-slate.is-hover-highlight {
  background: #FFFFFF;
  border-color: #F59E0B;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(44, 26, 19, 0.08);
}

.city-metric-slate.is-lead-city {
  border-color: #F59E0B;
  background: linear-gradient(135deg, #FFFDF9 0%, #FEF9EE 100%);
}

.slate-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.slate-rank-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.slate-rank-badge {
  font-size: 10px;
  font-weight: 900;
  color: #8C786E;
  background: #F3EFEA;
  padding: 1px 5px;
  border-radius: 5px;
}

.slate-rank-badge.badge-crown {
  background: #2C1A13;
  color: #FBBF24;
}

.slate-city-name {
  font-size: 12.5px;
  font-weight: 800;
  color: #2C1A13;
  white-space: nowrap;
}

.slate-pct-pill {
  font-size: 10px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 6px;
  border: 1px solid;
  font-variant-numeric: tabular-nums;
}

.slate-metrics-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.slate-metric-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.slate-meta-label {
  font-size: 8.5px;
  font-weight: 700;
  color: #8C786E;
  text-transform: uppercase;
}

.slate-meta-val-dark {
  font-size: 12px;
  font-weight: 800;
  color: #2C1A13;
  font-variant-numeric: tabular-nums;
}

.slate-meta-val-dark small {
  font-size: 9.5px;
  color: #78655C;
}

.slate-meta-val-amber {
  font-size: 12px;
  font-weight: 900;
  color: #D97706;
  font-variant-numeric: tabular-nums;
}

.slate-track-line {
  width: 100%;
  height: 4px;
  background: #EFE8DF;
  border-radius: 4px;
  overflow: hidden;
}

.slate-fill-line {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.slate-bottom-sub {
  font-size: 9.5px;
  color: #8C786E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 4. Executive Geospatial Takeaway Footer */
.demographic-footer-luxury {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #FFFDF8;
  border: 1px dashed #E2D9CE;
  border-radius: 12px;
  padding: 10px 14px;
}

.insight-icon-box {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #FEF3C7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.insight-text-group {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 11.5px;
  line-height: 1.45;
}

.insight-main-title {
  font-weight: 800;
  color: #B45309;
}

.insight-body {
  color: #5A4034;
}

.insight-body strong {
  color: #2C1A13;
}

/* =========================================================================
   5. OPERATIONS GRID (Payment Methods + Cashier Shift)
   ========================================================================= */
.operations-grid {
  display: grid;
  grid-template-columns: 5.5fr 6.5fr;
  gap: 20px;
}

.badge-total-pill {
  font-size: 12px;
  font-weight: 800;
  background-color: #2C1A13;
  color: #FBBF24;
  padding: 4px 10px;
  border-radius: 8px;
  font-variant-numeric: tabular-nums;
  border: 1px solid #F59E0B;
}

/* Top Multi-Channel Distribution Proportion Strip with Legend */
.payment-distribution-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  background: #FFFDF9;
  border: 1px solid #EFEAE2;
  border-radius: 14px;
  padding: 9px 14px;
}

.payment-distribution-bar {
  display: flex;
  height: 6px;
  border-radius: 10px;
  overflow: hidden;
  gap: 2px;
  background: #F3ECE2;
}

.dist-segment {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s ease;
}

.payment-legend-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.legend-name {
  color: #78655C;
  font-weight: 700;
}

.legend-pct {
  font-weight: 800;
}

/* 4 Distinct Outlined Payment Channel Cards (Spacious & Zero Overlap) */
.payment-slates-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.pay-channel-slate {
  background: #FFFDF9;
  border: 1.5px solid #EFEAE2;
  border-radius: 14px;
  padding: 10px 14px 8px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
}

.pay-channel-slate:hover {
  background: #FFFFFF;
  border-color: var(--pay-brand, #F59E0B);
  transform: translateX(3px);
  box-shadow: 0 4px 14px rgba(44, 26, 19, 0.06);
}

.is-lead-pay {
  background: #FFFCF7;
  border-color: #F59E0B;
}

.pay-card-main-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pay-slate-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.pay-brand-squircle {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pay-svg {
  width: 17px;
  height: 17px;
}

.pay-slate-title-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.pay-title-badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pay-channel-title {
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
  white-space: nowrap;
}

.pay-top-tag {
  font-size: 9px;
  font-weight: 800;
  color: #B45309;
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  padding: 1px 5px;
  border-radius: 4px;
}

.pay-tx-sub {
  font-size: 11px;
  color: #8C786E;
  white-space: nowrap;
}

.pay-slate-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.pay-slate-amount {
  font-size: 13.5px;
  font-weight: 900;
  color: #2C1A13;
  font-variant-numeric: tabular-nums;
}

.pay-slate-share {
  font-size: 10.5px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 5px;
  border: 1px solid;
  font-variant-numeric: tabular-nums;
  min-width: 40px;
  text-align: center;
}

.pay-mini-track {
  width: 100%;
  height: 4px;
  background: #EFEAE2;
  border-radius: 6px;
  overflow: hidden;
}

.pay-mini-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.5s ease;
}

.payment-settlement-strip {
  display: flex;
  align-items: center;
  gap: 7px;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 700;
  color: #047857;
  margin-top: 6px;
}

.settle-icon {
  color: #059669;
  flex-shrink: 0;
}

.text-green { color: #059669; }
.text-amber { color: #D97706; }
.font-medium { font-weight: 600; }
.font-bold { font-weight: 800; }

/* =========================================================================
   6. SHIFT LOG MODAL DIALOG
   ========================================================================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(44, 26, 19, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(44, 26, 19, 0.35);
  border: 1.5px solid #EAE2D8;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1.5px solid #F0EAE2;
  padding-bottom: 14px;
}

.modal-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.modal-kicker {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #D97706;
  text-transform: uppercase;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.btn-close {
  background: #F8F5F0;
  border: 1px solid #EAE2D8;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  color: #6B5A52;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #2C1A13;
  color: #FFFFFF;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13.5px;
}

.modal-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #FFFDF9;
  border: 1px solid #F0EAE2;
  border-radius: 8px;
}

.info-label {
  color: #78655C;
  font-size: 12.5px;
}

.info-val {
  color: #2C1A13;
  font-variant-numeric: tabular-nums;
}

.alert-info-box {
  background-color: #FEF3C7;
  border: 1px solid #FDE68A;
  color: #92400E;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1.5px solid #F0EAE2;
  padding-top: 14px;
}

.btn-action-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  background: #FFFFFF;
  color: #3D2214;
  border: 1.5px solid #E2D9CE;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-secondary:hover {
  background: #F8F5F0;
  border-color: #D97706;
}

/* =========================================================================
   6B. RIGHT-SIDE SLIDE-OVER CALENDAR PANEL
   ========================================================================= */
.side-panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 26, 19, 0.45);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
}

/* =========================================================================
   6B. MINI FLOATING CALENDAR POPOVER (Simple, Small & Clean in Open Space)
   ========================================================================= */
.custom-date-popover-wrapper {
  position: relative;
  display: inline-flex;
}

.mini-calendar-floating-card {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
  background: #FFFFFF;
  border: 1.5px solid #F59E0B;
  border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 16px 36px -4px rgba(44, 26, 19, 0.18), 0 3px 8px rgba(0, 0, 0, 0.04);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: miniPopIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes miniPopIn {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.mini-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #F0EAE2;
  padding-bottom: 8px;
}

.mini-card-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mini-cal-icon {
  font-size: 14px;
}

.mini-card-title {
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
}

.btn-mini-close {
  background: transparent;
  border: none;
  font-size: 18px;
  line-height: 1;
  color: #8C786E;
  cursor: pointer;
  padding: 0 4px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.btn-mini-close:hover {
  color: #2C1A13;
}

.mini-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mini-date-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFDF9;
  border: 1.5px solid #E5DDD3;
  border-radius: 10px;
  padding: 6px 10px;
  gap: 8px;
  transition: all 0.18s ease;
}

.mini-date-row:focus-within {
  border-color: #F59E0B;
  background: #FFFFFF;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.15);
}

.mini-label {
  font-size: 11px;
  font-weight: 800;
  color: #78655C;
  min-width: 46px;
}

.mini-date-input {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: #2C1A13;
  outline: none;
  cursor: pointer;
  width: 100%;
}

.mini-card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #F0EAE2;
  padding-top: 10px;
}

.btn-mini-cancel {
  background: #F8F5F0;
  border: 1px solid #E2D9CE;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 11.5px;
  font-weight: 700;
  color: #6B5A52;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s ease;
}

.btn-mini-cancel:hover {
  background: #EBE3D7;
  color: #2C1A13;
}

.btn-mini-apply {
  background: linear-gradient(135deg, #2C1A13 0%, #4A2E22 100%);
  color: #FFFFFF;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 5px 14px;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s ease;
  box-shadow: 0 2px 6px rgba(44, 26, 19, 0.15);
}

.btn-mini-apply:hover {
  background: #D97706;
  border-color: #B45309;
}

/* =========================================================================
   7. RESPONSIVE BREAKPOINTS (Desktop -> Tablet -> Mobile)
   ========================================================================= */
@media (max-width: 1280px) {
  .kpi-cards-grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-bottom-cities-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .crm-ticket-grid,
  .operations-grid {
    grid-template-columns: 1fr;
  }

  .demo-bottom-cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .header-inner-flex {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .controls-hero-col {
    justify-content: space-between;
  }

  .excel-tabs-slider-bar {
    max-width: 100%;
    flex: 1;
  }
}

@media (max-width: 640px) {
  .controls-hero-col {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-period-pill {
    width: 100%;
    justify-content: space-between;
  }

  .kpi-cards-grid-4 {
    grid-template-columns: 1fr;
  }

  .demo-bottom-cities-grid {
    grid-template-columns: 1fr;
  }

  .demo-header-wrap {
    flex-direction: column;
    align-items: stretch;
  }

  .chart-highlight-strip {
    grid-template-columns: 1fr;
  }

  .header-main-title {
    font-size: 20px;
  }
}
</style>
