<template>
  <div class="kpi-card-reference" :class="`theme-${theme}`">
    <!-- Top Cap Row -->
    <div class="kpi-top-row">
      <!-- Icon Squircle -->
      <div class="kpi-icon-squircle" :class="`icon-${theme}`">
        <!-- Currency (GTV) -->
        <svg v-if="icon === 'currency'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M14.5 9.5C14.5 8.4 13.4 7.5 12 7.5C10.6 7.5 9.5 8.4 9.5 9.5C9.5 10.6 10.6 11.5 12 11.5C13.4 11.5 14.5 12.4 14.5 13.5C14.5 14.6 13.4 15.5 12 15.5C10.6 15.5 9.5 14.6 9.5 13.5"/>
          <path d="M12 6V7.5M12 15.5V17"/>
        </svg>

        <!-- Ticket (Sales) -->
        <svg v-else-if="icon === 'ticket'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="3"/>
          <path d="M3 11a2 2 0 0 1 0 2M21 11a2 2 0 0 0 0 2M13 6v2M13 16v2M13 11v2"/>
        </svg>

        <!-- Users (Gate In) -->
        <svg v-else-if="icon === 'users'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>

        <!-- User Plus (New Member) -->
        <svg v-else-if="icon === 'user-plus'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>

        <!-- Default User Check -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      </div>

      <!-- Right Meta Pill -->
      <div class="kpi-top-meta">
        <span v-if="tag" class="kpi-tag-pill">{{ tag }}</span>
        <span v-if="trendValue" class="kpi-trend-pill" :class="`trend-${theme}`">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
          <span>{{ trendValue }}</span>
        </span>
      </div>
    </div>

    <!-- Metric Title & Value -->
    <div class="kpi-main-content">
      <span class="kpi-title-text">{{ title }}</span>
      <div class="kpi-value-text" :class="{ 'long-val': isLongValue }">
        {{ value }}
      </div>
    </div>

    <!-- Soft Rounded Bottom Sub-Box (Matching Reference Sub-Stats) -->
    <div class="kpi-sub-footer">
      <div class="sub-col">
        <span class="sub-label">Komparasi:</span>
        <span class="sub-val">{{ comparison || 'Periode Berjalan' }}</span>
      </div>
      <div v-if="subtitle" class="sub-divider"></div>
      <div v-if="subtitle" class="sub-col">
        <span class="sub-label">Detail:</span>
        <span class="sub-val">{{ subtitle }}</span>
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@600;700;800;900&family=Jost:wght@400;500;600;700;800;900&display=swap');

.kpi-card-reference {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 22px;
  padding: 18px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04), 0 1px 3px rgba(61, 34, 20, 0.02);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.kpi-card-reference:hover {
  transform: translateY(-4px);
  border-color: #D97706;
  box-shadow: 0 12px 24px rgba(61, 34, 20, 0.08);
}

/* Top Row */
.kpi-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kpi-icon-squircle {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-orange { background: #FEF3C7; color: #B45309; }
.icon-black { background: #3D2214; color: #FAF5EE; }
.icon-brown { background: #F5EBE1; color: #5A2E17; }
.icon-green { background: #D1FAE5; color: #047857; }
.icon-blue { background: #EDE9FE; color: #5B21B6; }

.kpi-top-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.kpi-tag-pill {
  font-size: 9.5px;
  font-weight: 800;
  text-transform: uppercase;
  background: #F0E5D8;
  color: #7A5034;
  padding: 3px 8px;
  border-radius: 12px;
  letter-spacing: 0.3px;
}

.kpi-trend-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 12px;
}

.trend-orange { background: #FEF3C7; color: #92400E; }
.trend-black { background: #EDE2D4; color: #2C1A13; }
.trend-brown { background: #F5EBE1; color: #5A2E17; }
.trend-green { background: #D1FAE5; color: #065F46; }
.trend-blue { background: #EDE9FE; color: #5B21B6; }

/* Main Content */
.kpi-main-content {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.kpi-title-text {
  font-size: 11.5px;
  font-weight: 700;
  color: #8C6D58;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.kpi-value-text {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 900;
  color: #2C1A13;
  line-height: 1.15;
}

.kpi-value-text.long-val {
  font-size: 20px;
}

/* Soft Rounded Bottom Sub-Box */
.kpi-sub-footer {
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 14px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sub-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.sub-label {
  font-size: 9px;
  font-weight: 700;
  color: #8C6D58;
  text-transform: uppercase;
}

.sub-val {
  font-size: 11px;
  font-weight: 800;
  color: #3D2214;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-divider {
  width: 1px;
  height: 20px;
  background: #E6D7C3;
}
</style>
