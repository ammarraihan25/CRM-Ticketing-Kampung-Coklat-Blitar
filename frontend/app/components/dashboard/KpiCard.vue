<template>
  <div class="pop-kpi-card" :class="`theme-${theme}`">
    <div class="pop-icon-box" :class="`icon-${theme}`">
      <svg v-if="icon === 'currency'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>

      <svg v-else-if="icon === 'ticket'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M12 4v16" />
        <rect x="6" y="8" width="4" height="8" />
      </svg>

      <svg v-else-if="icon === 'users'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>

      <svg v-else-if="icon === 'user-plus' || icon === 'user-check' || icon === 'home'" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path v-if="icon === 'home'" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline v-if="icon === 'home'" points="9 22 9 12 15 12 15 22" />
        
        <path v-if="icon !== 'home'" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle v-if="icon !== 'home'" cx="9" cy="7" r="4" />
        <polyline v-if="icon === 'user-plus'" points="16 11 18 13 22 9" />
      </svg>
    </div>

    <div class="card-content-col">
      <span class="pop-title">{{ title }}</span>
      <div class="pop-value-row">
        <span class="pop-number" :class="{ 'long-num': isLongValue }">{{ value }}</span>
        <span v-if="trendValue" class="pop-trend-text">{{ trendValue }}</span>
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
  icon: 'currency' | 'ticket' | 'users' | 'user-check' | 'user-plus' | 'home'
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
.pop-kpi-card {
  background: #FFFFFF;
  border: 1px solid #F0EAE2;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  transition: all 0.2s ease;
  min-width: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.pop-kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(44, 26, 19, 0.06);
  border-color: #E2D9CE;
}

.pop-icon-box {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.icon-orange { background: #FEF3C7; color: #D97706; }
.icon-black { background: #FDE6D6; color: #D97706; }
.icon-brown { background: #ECFDF5; color: #047857; }
.icon-green { background: #F5F3EF; color: #2C1A13; }
.icon-blue { background: #EFF6FF; color: #2563EB; }

.card-content-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pop-title {
  font-size: 11.5px;
  font-weight: 700;
  color: #6B5A52;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pop-value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.pop-number {
  font-size: 24px;
  font-weight: 800;
  color: #1F120B;
  letter-spacing: -0.5px;
  font-variant-numeric: tabular-nums;
}

.pop-number.long-num {
  font-size: 20px;
}

.pop-trend-text {
  font-size: 13.5px;
  font-weight: 700;
  color: #047857; /* Green positive trend */
}

@media (max-width: 1360px) {
  .pop-number { font-size: 22px; }
  .pop-number.long-num { font-size: 18px; }
  .pop-kpi-card { padding: 20px 16px; gap: 14px; }
  .pop-icon-box { width: 44px; height: 44px; }
}
</style>
