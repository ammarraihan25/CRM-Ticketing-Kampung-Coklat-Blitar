<template>
  <div 
    class="custom-datepicker-wrapper" 
    ref="wrapperRef" 
    :class="[
      { 'is-open': isOpen, 'is-disabled': disabled },
      `size-${size}`
    ]"
    style="position: relative; display: block; width: 100%;"
  >
    <!-- Trigger Input -->
    <div 
      class="datepicker-trigger" 
      :class="[customClass, `trigger-${size}`, { 'has-value': !!modelValue, 'is-focused': isOpen }]"
      @click="togglePicker"
      tabindex="0"
      @keydown.space.prevent="togglePicker"
      @keydown.enter.prevent="togglePicker"
      @keydown.esc="closePicker"
    >
      <div class="trigger-left">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="calendar-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span class="date-text" :class="{ 'placeholder-text': !modelValue }">
          {{ formattedDisplayDate || placeholder }}
        </span>
      </div>

      <div class="trigger-right">
        <button 
          v-if="modelValue && clearable" 
          type="button" 
          class="btn-clear-date" 
          @click.stop="clearDate" 
          title="Hapus tanggal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="chevron-indicator" :class="{ 'is-flipped': isOpen }">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Calendar Popover Menu -->
    <Transition name="fade-slide">
      <div 
        v-if="isOpen" 
        class="calendar-popover" 
        :class="dynamicPlacement"
        style="position: absolute; top: calc(100% + 6px); z-index: 99999;"
      >
        <!-- Calendar Header -->
        <div class="calendar-header">
          <button type="button" class="nav-month-btn" @click.stop="prevMonth" title="Bulan Sebelumnya">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="header-selectors">
            <select v-model="viewMonth" class="header-select month-select" @click.stop>
              <option v-for="(m, idx) in monthsList" :key="idx" :value="idx">{{ m }}</option>
            </select>
            <select v-model="viewYear" class="header-select year-select" @click.stop>
              <option v-for="y in yearsList" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>

          <button type="button" class="nav-month-btn" @click.stop="nextMonth" title="Bulan Berikutnya">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Days of Week Header -->
        <div class="calendar-weekdays">
          <span v-for="d in weekdaysList" :key="d" class="weekday-item">{{ d }}</span>
        </div>

        <!-- Calendar Days Grid -->
        <div class="calendar-grid">
          <button
            v-for="cell in calendarDays"
            :key="`${cell.year}-${cell.month}-${cell.day}`"
            type="button"
            class="calendar-day-cell"
            :class="{
              'other-month': !cell.isCurrentMonth,
              'is-today': cell.isToday,
              'is-selected': cell.isSelected,
              'is-disabled': cell.isDisabled
            }"
            :disabled="cell.isDisabled"
            @click.stop="selectDate(cell)"
          >
            <span class="day-number">{{ cell.day }}</span>
            <span v-if="cell.isToday && !cell.isSelected" class="today-dot"></span>
          </button>
        </div>

        <!-- Calendar Quick Action Footer -->
        <div class="calendar-footer">
          <button type="button" class="btn-footer-action btn-clear" @click.stop="clearDate">
            Reset
          </button>
          <button type="button" class="btn-footer-action btn-today" @click.stop="selectToday">
            Hari Ini
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  min?: string
  max?: string
  customClass?: string
  size?: 'sm' | 'md' | 'lg'
  popoverPlacement?: 'bottom-left' | 'bottom-right'
}>(), {
  modelValue: '',
  placeholder: 'Pilih Tanggal...',
  clearable: true,
  disabled: false,
  customClass: '',
  size: 'md',
  popoverPlacement: 'bottom-left'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const wrapperRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const monthsList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const weekdaysList = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

// Calendar view date state
const today = new Date()
const currentYear = today.getFullYear()
const viewYear = ref(currentYear)
const viewMonth = ref(today.getMonth())

const yearsList = computed(() => {
  const years: number[] = []
  const startYear = currentYear - 80
  const endYear = currentYear + 10
  for (let y = endYear; y >= startYear; y--) {
    years.push(y)
  }
  return years
})

// Sync view when modelValue changes
const syncFromModelValue = () => {
  if (props.modelValue) {
    const parts = props.modelValue.split('-')
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10)
      const m = parseInt(parts[1], 10) - 1
      if (!isNaN(y) && !isNaN(m)) {
        viewYear.value = y
        viewMonth.value = m
      }
    }
  } else {
    viewYear.value = today.getFullYear()
    viewMonth.value = today.getMonth()
  }
}

watch(() => props.modelValue, () => {
  syncFromModelValue()
}, { immediate: true })

const formattedDisplayDate = computed(() => {
  if (!props.modelValue) return ''
  const parts = props.modelValue.split('-')
  if (parts.length !== 3) return props.modelValue
  const y = parseInt(parts[0], 10)
  const m = parseInt(parts[1], 10) - 1
  const d = parseInt(parts[2], 10)
  if (isNaN(y) || isNaN(m) || isNaN(d)) return props.modelValue
  
  return `${d} ${monthsList[m]} ${y}`
})

interface DayCell {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  dateString: string
}

const calendarDays = computed<DayCell[]>(() => {
  const year = viewYear.value
  const month = viewMonth.value

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInCurrentMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay() // 0 is Sunday

  const prevMonthLastDay = new Date(year, month, 0).getDate()

  const days: DayCell[] = []

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  const formatCellDate = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

  const todayStr = formatCellDate(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedStr = props.modelValue

  // Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const dateStr = formatCellDate(prevYear, prevMonth, day)
    
    let isDisabled = false
    if (props.min && dateStr < props.min) isDisabled = true
    if (props.max && dateStr > props.max) isDisabled = true

    days.push({
      day,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedStr,
      isDisabled,
      dateString: dateStr
    })
  }

  // Current month days
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const dateStr = formatCellDate(year, month, day)
    
    let isDisabled = false
    if (props.min && dateStr < props.min) isDisabled = true
    if (props.max && dateStr > props.max) isDisabled = true

    days.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedStr,
      isDisabled,
      dateString: dateStr
    })
  }

  // Next month leading days to complete the 42-cell or 35-cell grid
  const remainingCells = 42 - days.length
  for (let day = 1; day <= remainingCells; day++) {
    const nextM = month === 11 ? 0 : month + 1
    const nextY = month === 11 ? year + 1 : year
    const dateStr = formatCellDate(nextY, nextM, day)

    let isDisabled = false
    if (props.min && dateStr < props.min) isDisabled = true
    if (props.max && dateStr > props.max) isDisabled = true

    days.push({
      day,
      month: nextM,
      year: nextY,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      isSelected: dateStr === selectedStr,
      isDisabled,
      dateString: dateStr
    })
  }

  return days
})

const prevMonth = () => {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

const nextMonth = () => {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

const selectDate = (cell: DayCell) => {
  if (cell.isDisabled) return
  emit('update:modelValue', cell.dateString)
  emit('change', cell.dateString)
  isOpen.value = false
}

const selectToday = () => {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  const dateStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
  emit('update:modelValue', dateStr)
  emit('change', dateStr)
  syncFromModelValue()
  isOpen.value = false
}

const clearDate = () => {
  emit('update:modelValue', '')
  emit('change', '')
  isOpen.value = false
}

const dynamicPlacement = ref(props.popoverPlacement)

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    syncFromModelValue()
    if (wrapperRef.value) {
      const rect = wrapperRef.value.getBoundingClientRect()
      const spaceRight = window.innerWidth - rect.left
      if (spaceRight < 330 || props.popoverPlacement === 'bottom-right') {
        dynamicPlacement.value = 'bottom-right'
      } else {
        dynamicPlacement.value = 'bottom-left'
      }
    }
  }
}

const closePicker = () => {
  isOpen.value = false
}

// Click outside detection
const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.custom-datepicker-wrapper {
  position: relative !important;
  display: block !important;
  width: 100%;
  box-sizing: border-box;
}

.custom-datepicker-wrapper.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Trigger Input Box */
.datepicker-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 42px;
  padding: 8px 14px;
  background: #FFFFFF;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  user-select: none;
  box-sizing: border-box;
}

.datepicker-trigger.trigger-lg {
  min-height: 62px;
  height: 62px;
  padding: 0 20px;
  border-radius: 16px;
  border-color: #e4dad3;
}

.datepicker-trigger.trigger-lg .date-text {
  font-size: 17px;
}

.datepicker-trigger.trigger-lg .calendar-icon {
  width: 22px;
  height: 22px;
}

.datepicker-trigger.trigger-sm {
  min-height: 36px;
  padding: 4px 10px;
  border-radius: 8px;
}

.datepicker-trigger:hover {
  border-color: #D97706;
  background: #FFFDF9;
}

.datepicker-trigger.is-focused {
  border-color: #D97706;
  box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.15);
  background: #FFFFFF;
}

.trigger-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.calendar-icon {
  color: #D97706;
  flex-shrink: 0;
}

.date-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-text.placeholder-text {
  color: #9CA3AF;
  font-weight: 500;
}

.trigger-right {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.btn-clear-date {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #F3F4F6;
  border: none;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-clear-date:hover {
  background: #FEE2E2;
  color: #DC2626;
}

.chevron-indicator {
  color: #9CA3AF;
  transition: transform 0.25s ease;
}

.chevron-indicator.is-flipped {
  transform: rotate(180deg);
  color: #D97706;
}

/* ========================================================================= */
/* CALENDAR POPOVER FLOATING CARD                                            */
/* ========================================================================= */
.calendar-popover {
  position: absolute;
  top: calc(100% + 6px);
  z-index: 9999;
  width: 310px;
  background: #FFFFFF;
  border: 1.5px solid #F3EDE6;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 14px 34px -4px rgba(44, 26, 19, 0.15), 0 6px 14px -3px rgba(44, 26, 19, 0.08);
  box-sizing: border-box;
}

.calendar-popover.bottom-left {
  left: 0;
  right: auto;
}

.calendar-popover.bottom-right {
  right: 0;
  left: auto;
}

/* Calendar Header */
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 6px;
}

.nav-month-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #FDF8F3;
  border: 1px solid #F1E5D8;
  color: #78350F;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.nav-month-btn:hover {
  background: #FEF3C7;
  border-color: #F59E0B;
  color: #92400E;
  transform: translateY(-1px);
}

.header-selectors {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-select {
  background: #FDF8F3;
  border: 1px solid #F1E5D8;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 700;
  color: #5B2C10;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.header-select:hover, .header-select:focus {
  border-color: #D97706;
  background: #FFFFFF;
}

.month-select {
  min-width: 100px;
}

.year-select {
  min-width: 75px;
}

/* Weekdays */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 8px;
}

.weekday-item {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 0;
}

/* Days Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  margin-bottom: 12px;
}

.calendar-day-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  font-size: 13px;
  font-weight: 600;
  color: #1F2937;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  box-sizing: border-box;
}

.calendar-day-cell:hover:not(.is-disabled):not(.is-selected) {
  background: #FEF3C7;
  color: #92400E;
  border-color: #FDE68A;
  transform: translateY(-1px);
}

.calendar-day-cell.other-month {
  color: #D1D5DB;
  font-weight: 500;
}

.calendar-day-cell.is-today:not(.is-selected) {
  border-color: #D97706;
  background: #FFFDF7;
  color: #B45309;
  font-weight: 700;
}

.today-dot {
  position: absolute;
  bottom: 3px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #D97706;
}

.calendar-day-cell.is-selected {
  background: linear-gradient(135deg, #D97706, #B45309);
  color: #FFFFFF;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(180, 83, 9, 0.35);
}

.calendar-day-cell.is-disabled {
  color: #E5E7EB;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Footer Action Buttons */
.calendar-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #F3EDE6;
}

.btn-footer-action {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
}

.btn-clear {
  background: transparent;
  border: 1px solid #E5E7EB;
  color: #6B7280;
}

.btn-clear:hover {
  background: #F9FAFB;
  color: #374151;
  border-color: #D1D5DB;
}

.btn-today {
  background: #FEF3C7;
  border: 1px solid #FDE68A;
  color: #92400E;
}

.btn-today:hover {
  background: #FDE68A;
  border-color: #F59E0B;
  color: #78350F;
}

/* Responsive */
@media (max-width: 480px) {
  .calendar-popover {
    width: min(300px, 92vw);
    padding: 12px;
  }
}

/* Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
