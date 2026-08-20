<template>
  <div class="pop-kpi-card" :class="`theme-${theme}`">
    <!-- Ambient Radial Glow Halo -->
    <div class="card-glow-halo" :class="`glow-${theme}`"></div>
    <div class="card-glass-shine"></div>

    <!-- Top Row: 3D Pop Icon + Tag & Trend Badge -->
    <div class="card-top-row">
      <div class="pop-icon-box" :class="`icon-${theme}`">
        <!-- Currency (GTV) -->
        <svg v-if="icon === 'currency'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
          <circle cx="12" cy="12" r="9"/>
          <path d="M14.5 9.5C14.5 8.4 13.4 7.5 12 7.5C10.6 7.5 9.5 8.4 9.5 9.5C9.5 10.6 10.6 11.5 12 11.5C13.4 11.5 14.5 12.4 14.5 13.5C14.5 14.6 13.4 15.5 12 15.5C10.6 15.5 9.5 14.6 9.5 13.5"/>
          <path d="M12 6V7.5M12 15.5V17"/>
        </svg>

        <!-- Ticket (Sales) -->
        <svg v-else-if="icon === 'ticket'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <rect x="3" y="6" width="18" height="12" rx="3"/>
          <path d="M3 11a2 2 0 0 1 0 2M21 11a2 2 0 0 0 0 2M13 6v2M13 16v2M13 11v2"/>
        </svg>

        <!-- Users (Gate In) -->
        <svg v-else-if="icon === 'users'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>

        <!-- User Plus (New Member) -->
        <svg v-else-if="icon === 'user-plus' || icon === 'user-check'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      </div>

      <div class="card-badges-row">
        <span v-if="tag" class="pop-tag-pill" :class="`tag-${theme}`">{{ tag }}</span>
        <span v-if="trendValue" class="pop-trend-chip">
          <span class="trend-arrow-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </span>
          <span>{{ trendValue }}</span>
        </span>
      </div>
    </div>

    <!-- Center Content: Title + Big Pop Value -->
    <div class="card-metric-body">
      <span class="pop-title">{{ title }}</span>
      <div class="pop-value-row">
        <div class="pop-number" :class="{ 'long-num': isLongValue }">
          {{ value }}
        </div>
      </div>

      <!-- Integrated Mini Sparkline Wave -->
      <div class="sparkline-wave-wrap">
        <svg viewBox="0 0 160 36" preserveAspectRatio="none" class="sparkline-svg" :class="`spark-${theme}`">
          <defs>
            <linearGradient :id="`grad-${theme}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="sparkColors.fill" stop-opacity="0.35"/>
              <stop offset="100%" :stop-color="sparkColors.fill" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path :d="sparkPath" :fill="`url(#grad-${theme})`" />
          <path :d="sparkLineOnly" fill="none" :stroke="sparkColors.stroke" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <!-- Bottom Pop Capsule: Comparison & Subtitle -->
    <div class="pop-bottom-pill">
      <div v-if="comparison" class="pill-context-line">
        <span class="pulse-beacon-dot" :class="`dot-${theme}`"></span>
        <span class="comparison-text">{{ comparison }}</span>
      </div>
      <span v-if="subtitle" class="subtitle-text">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: string | number
  theme: 'orange' | 'black' | 'brown' | 'green' | 'blue'
  icon: 'currency' | 'ticket' | 'users' | 'user-check' | 'user-plus'
  tag?: string
  trendValue?: string
  comparison?: string
  subtitle?: string
}

const props = defineProps<Props>()

const isLongValue = computed(() => {
  return String(props.value).length > 13
})

// Dynamic SVG Sparkline generator for visual flair
const sparkColors = computed(() => {
  switch (props.theme) {
    case 'orange': return { stroke: '#F59E0B', fill: '#F59E0B' }
    case 'black': return { stroke: '#5A4034', fill: '#78523E' }
    case 'brown': return { stroke: '#D97706', fill: '#D97706' }
    case 'green': return { stroke: '#10B981', fill: '#10B981' }
    case 'blue': return { stroke: '#3B82F6', fill: '#3B82F6' }
    default: return { stroke: '#F59E0B', fill: '#F59E0B' }
  }
})

const sparkLineOnly = computed(() => {
  if (props.theme === 'orange') return 'M0 28 Q 30 32, 60 18 T 110 14 T 160 4'
  if (props.theme === 'black') return 'M0 26 Q 40 12, 80 20 T 130 8 T 160 2'
  if (props.theme === 'brown') return 'M0 30 Q 35 22, 70 24 T 120 10 T 160 5'
  return 'M0 32 Q 40 28, 80 16 T 125 12 T 160 3'
})

const sparkPath = computed(() => {
  return `${sparkLineOnly.value} L 160 36 L 0 36 Z`
})
</script>

<style scoped>
.pop-kpi-card {
  background: linear-gradient(155deg, #FFFFFF 0%, #FFFDF9 50%, #FAF4EB 100%);
  border-radius: 24px;
  padding: 22px;
  border: 1.5px solid rgba(230, 220, 208, 0.95);
  box-shadow: 0 12px 32px -4px rgba(44, 26, 19, 0.09), 0 3px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  position: relative;
  transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;
  overflow: hidden;
}

/* 3D Top Accent Line */
.pop-kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 24px 24px 0 0;
}

.theme-orange::before { background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, transparent 100%); }
.theme-black::before { background: linear-gradient(90deg, #2C1A13 0%, #78523E 50%, transparent 100%); }
.theme-brown::before { background: linear-gradient(90deg, #B45309 0%, #F59E0B 50%, transparent 100%); }
.theme-green::before { background: linear-gradient(90deg, #059669 0%, #34D399 50%, transparent 100%); }
.theme-blue::before { background: linear-gradient(90deg, #2563EB 0%, #60A5FA 50%, transparent 100%); }

/* Ambient Glow Halo */
.card-glow-halo {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 170px;
  height: 170px;
  pointer-events: none;
  transition: all 0.35s ease;
  opacity: 0.65;
  filter: blur(8px);
}

.glow-orange { background: radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%); }
.glow-black { background: radial-gradient(circle, rgba(44, 26, 19, 0.14) 0%, transparent 70%); }
.glow-brown { background: radial-gradient(circle, rgba(180, 83, 9, 0.2) 0%, transparent 70%); }
.glow-green { background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%); }
.glow-blue { background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%); }

/* Glass Shine Reflection */
.card-glass-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

/* POP UP HOVER EFFECT */
.pop-kpi-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 24px 48px -6px rgba(44, 26, 19, 0.16), 0 6px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border-color: rgba(242, 151, 39, 0.65);
}

.pop-kpi-card:hover .card-glow-halo {
  opacity: 1;
  transform: scale(1.2);
}

/* Top Row */
.card-top-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 3;
}

.pop-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.pop-kpi-card:hover .pop-icon-box {
  transform: scale(1.12) rotate(-5deg);
  box-shadow: 0 6px 18px rgba(245, 158, 11, 0.25);
}

.icon-orange {
  background: linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 50%, #FEF3C7 100%);
  color: #D97706;
  border: 1.5px solid #FDE68A;
}

.icon-black {
  background: linear-gradient(135deg, #FFFFFF 0%, #F9F6F0 50%, #EFE9DF 100%);
  color: #2C1A13;
  border: 1.5px solid #E2D9CE;
}

.icon-brown {
  background: linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 50%, #FDE68A 100%);
  color: #92400E;
  border: 1.5px solid #FCD34D;
}

.icon-green {
  background: linear-gradient(135deg, #FFFFFF 0%, #ECFDF5 50%, #D1FAE5 100%);
  color: #059669;
  border: 1.5px solid #A7F3D0;
}

.icon-blue {
  background: linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 50%, #DBEAFE 100%);
  color: #2563EB;
  border: 1.5px solid #BFDBFE;
}

.card-badges-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pop-tag-pill {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  color: #8C786E;
  background: #FFFFFF;
  padding: 4px 9px;
  border-radius: 9px;
  border: 1px solid #E8E0D5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.pop-trend-chip {
  background: #ECFDF5;
  color: #047857;
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 9px;
  border-radius: 12px;
  border: 1.5px solid #A7F3D0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(4, 120, 87, 0.1);
}

.trend-arrow-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10B981;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Metric Body */
.card-metric-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 3;
}

.pop-title {
  font-size: 11.5px;
  font-weight: 800;
  color: #78655C;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.pop-value-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 2px;
}

.pop-number {
  font-size: 26px;
  font-weight: 900;
  color: #1F120B;
  letter-spacing: -0.8px;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.pop-number.long-num {
  font-size: 20px;
  letter-spacing: -0.5px;
}

/* Sparkline Wave Container */
.sparkline-wave-wrap {
  width: 100%;
  height: 28px;
  margin-top: 6px;
  overflow: hidden;
  border-radius: 6px;
  opacity: 0.85;
  transition: opacity 0.25s ease;
}

.pop-kpi-card:hover .sparkline-wave-wrap {
  opacity: 1;
}

.sparkline-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Bottom Pill Capsule */
.pop-bottom-pill {
  background: rgba(255, 255, 255, 0.9);
  border: 1.5px solid #EFE6DA;
  border-radius: 14px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.03);
  backdrop-filter: blur(6px);
}

.pill-context-line {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pulse-beacon-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-orange { background: #F59E0B; box-shadow: 0 0 8px #F59E0B; }
.dot-black { background: #2C1A13; box-shadow: 0 0 8px #2C1A13; }
.dot-brown { background: #B45309; box-shadow: 0 0 8px #B45309; }
.dot-green { background: #10B981; box-shadow: 0 0 8px #10B981; }
.dot-blue { background: #3B82F6; box-shadow: 0 0 8px #3B82F6; }

.comparison-text {
  font-size: 12px;
  font-weight: 800;
  color: #2C1A13;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.subtitle-text {
  font-size: 10.5px;
  font-weight: 600;
  color: #8C786E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1360px) {
  .pop-number { font-size: 21px; }
  .pop-number.long-num { font-size: 17px; }
}
</style>
