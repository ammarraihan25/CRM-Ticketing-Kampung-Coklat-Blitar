<template>
  <div class="kpi-card-v3" :class="`theme-${theme}`">
    <!-- Top Colored Cap Header with Modern Glass Highlight -->
    <div class="card-cap" :class="`cap-${theme}`">
      <!-- Left Squircle Icon Container -->
      <div class="cap-icon-squircle">
        <!-- Currency (GTV) -->
        <svg v-if="icon === 'currency'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M14.5 9.5C14.5 8.4 13.4 7.5 12 7.5C10.6 7.5 9.5 8.4 9.5 9.5C9.5 10.6 10.6 11.5 12 11.5C13.4 11.5 14.5 12.4 14.5 13.5C14.5 14.6 13.4 15.5 12 15.5C10.6 15.5 9.5 14.6 9.5 13.5"/>
          <path d="M12 6V7.5M12 15.5V17"/>
        </svg>

        <!-- Ticket (Sales) -->
        <svg v-else-if="icon === 'ticket'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="3"/>
          <path d="M3 11a2 2 0 0 1 0 2M21 11a2 2 0 0 0 0 2M13 6v2M13 16v2M13 11v2"/>
        </svg>

        <!-- Users (Gate In) -->
        <svg v-else-if="icon === 'users'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>

        <!-- User Check (Database Member) -->
        <svg v-else-if="icon === 'user-check'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>

        <!-- User Plus (New Member) -->
        <svg v-else-if="icon === 'user-plus'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      </div>

      <!-- Right Tag / Trend Badge -->
      <div class="cap-meta-right">
        <span v-if="tag" class="meta-tag-label">{{ tag }}</span>
        <span v-if="trendValue" class="meta-trend-chip">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="trend-arrow-svg">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          <span>{{ trendValue }}</span>
        </span>
      </div>
    </div>

    <!-- Main Card Body -->
    <div class="card-inner-body">
      <div class="title-wrap">
        <span class="card-metric-title">{{ title }}</span>
      </div>

      <div class="value-wrap">
        <div class="card-metric-number" :class="{ 'long-digit': isLongValue }">
          {{ value }}
        </div>
      </div>

      <!-- Subtle Accent Divider Line -->
      <div class="accent-divider-line" :class="`divider-${theme}`"></div>

      <!-- Bottom Metric Details -->
      <div class="card-metric-footer">
        <span v-if="comparison" class="metric-comp-line" :title="comparison">{{ comparison }}</span>
        <span v-if="subtitle" class="metric-sub-line" :title="subtitle">{{ subtitle }}</span>
      </div>
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
</script>

<style scoped>
.kpi-card-v3 {
  background: #FFFFFF;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 16px -2px rgba(44, 26, 19, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
  border: 1.5px solid rgba(235, 230, 224, 0.9);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 0;
  width: 100%;
}

.kpi-card-v3:hover {
  transform: translateY(-4px);
}

/* Individual Card Hover Shadows per Theme */
.theme-orange:hover {
  box-shadow: 0 16px 32px -6px rgba(245, 158, 11, 0.22);
  border-color: rgba(245, 158, 11, 0.4);
}

.theme-black:hover {
  box-shadow: 0 16px 32px -6px rgba(28, 25, 23, 0.25);
  border-color: rgba(28, 25, 23, 0.4);
}

.theme-brown:hover {
  box-shadow: 0 16px 32px -6px rgba(180, 83, 9, 0.22);
  border-color: rgba(180, 83, 9, 0.4);
}

.theme-green:hover {
  box-shadow: 0 16px 32px -6px rgba(16, 185, 129, 0.22);
  border-color: rgba(16, 185, 129, 0.4);
}

.theme-blue:hover {
  box-shadow: 0 16px 32px -6px rgba(59, 130, 246, 0.22);
  border-color: rgba(59, 130, 246, 0.4);
}

/* Top Colored Header Cap */
.card-cap {
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px 16px 0 0;
  position: relative;
}

.cap-orange {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #FFFFFF;
}

.cap-black {
  background: linear-gradient(135deg, #1C1917 0%, #0F0D0C 100%);
  color: #FFFFFF;
}

.cap-brown {
  background: linear-gradient(135deg, #B45309 0%, #78350F 100%);
  color: #FFFFFF;
}

.cap-green {
  background: linear-gradient(135deg, #10B981 0%, #047857 100%);
  color: #FFFFFF;
}

.cap-blue {
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: #FFFFFF;
}

/* Squircle Icon */
.cap-icon-squircle {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.kpi-card-v3:hover .cap-icon-squircle {
  transform: scale(1.06);
}

.cap-black .cap-icon-squircle {
  background: #F3F4F6;
  color: #1F2937;
  border-color: #FFFFFF;
}

/* Right Meta Label & Trend */
.cap-meta-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.meta-tag-label {
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.meta-trend-chip {
  background: #FFFFFF;
  color: #059669;
  font-size: 10.5px;
  font-weight: 800;
  padding: 1.5px 7px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.trend-arrow-svg {
  stroke-width: 3;
}

/* Card Body Content */
.card-inner-body {
  padding: 10px 10px 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  justify-content: space-between;
  background: linear-gradient(180deg, #FFFFFF 0%, #FFFDFB 100%);
}

.title-wrap {
  min-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card-metric-title {
  font-size: 10px;
  font-weight: 800;
  color: #2C1A13;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  line-height: 1.2;
}

.value-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0 4px 0;
}

.card-metric-number {
  font-size: 19.5px;
  font-weight: 800;
  color: #1C0E08;
  letter-spacing: -0.5px;
  line-height: 1.15;
  white-space: nowrap;
}

.card-metric-number.long-digit {
  font-size: 15.5px;
  letter-spacing: -0.5px;
}

/* Accent Divider Line */
.accent-divider-line {
  width: 36px;
  height: 2.5px;
  border-radius: 4px;
  margin: 4px 0 8px 0;
  opacity: 0.85;
}

.divider-orange { background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%); }
.divider-black { background: linear-gradient(90deg, #1C1917 0%, #44403C 100%); }
.divider-brown { background: linear-gradient(90deg, #B45309 0%, #D97706 100%); }
.divider-green { background: linear-gradient(90deg, #10B981 0%, #34D399 100%); }
.divider-blue { background: linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%); }

/* Footer Details */
.card-metric-footer {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.metric-comp-line {
  color: #3D2218;
  font-weight: 600;
  font-size: 10.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.metric-sub-line {
  color: #8C786E;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1360px) {
  .card-metric-number { font-size: 18px; }
  .card-metric-number.long-digit { font-size: 15px; }
  .card-cap { padding: 10px 12px; }
  .cap-icon-squircle { width: 32px; height: 32px; }
}
</style>
