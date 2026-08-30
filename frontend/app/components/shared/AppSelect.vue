<template>
  <div 
    class="custom-select-wrapper" 
    ref="selectRef" 
    :class="[customClass, { 'is-open': isOpen, 'is-disabled': disabled, 'has-value': !!modelValue }]"
  >
    <!-- Trigger Button -->
    <div 
      class="select-trigger" 
      :class="{ 'is-active': isOpen }"
      tabindex="0"
      @click="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.esc="closeDropdown"
      @keydown.up.prevent="navigateOption(-1)"
      @keydown.down.prevent="navigateOption(1)"
    >
      <div class="trigger-label">
        <slot name="prefix"></slot>
        <span class="selected-text" :class="{ 'placeholder-text': !selectedLabel }">
          {{ selectedLabel || placeholder }}
        </span>
      </div>

      <div class="trigger-icons">
        <button 
          v-if="clearable && modelValue" 
          type="button" 
          class="btn-clear-select" 
          @click.stop="clearSelection"
          title="Hapus Pilihan"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="15" 
          height="15" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2.3" 
          class="chevron-arrow"
          :class="{ 'is-flipped': isOpen }"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>

    <!-- Options Dropdown Menu Card -->
    <Transition name="dropdown-pop">
      <div v-if="isOpen" class="select-dropdown-menu" :class="menuPlacement">
        <div class="options-list">
          <div
            v-for="(opt, idx) in normalizedOptions"
            :key="opt.value"
            class="option-item"
            :class="{ 
              'is-selected': isOptionSelected(opt.value), 
              'is-highlighted': highlightedIndex === idx 
            }"
            @click.stop="selectOption(opt.value)"
            @mouseenter="highlightedIndex = idx"
          >
            <div class="option-content">
              <span class="option-label">{{ opt.label }}</span>
              <span v-if="opt.sublabel" class="option-sublabel">{{ opt.sublabel }}</span>
            </div>

            <!-- Checkmark Indicator -->
            <div v-if="isOptionSelected(opt.value)" class="option-check-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <div v-if="normalizedOptions.length === 0" class="no-options-message">
            Tidak ada pilihan
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface SelectOption {
  value: any
  label: string
  sublabel?: string
}

const props = withDefaults(defineProps<{
  modelValue?: any
  options?: Array<SelectOption | string>
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  customClass?: string
  menuPlacement?: 'bottom-left' | 'bottom-right'
}>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Pilih salah satu...',
  disabled: false,
  clearable: false,
  customClass: '',
  menuPlacement: 'bottom-left'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: any): void
  (e: 'change', val: any): void
}>()

const selectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)

// Normalize options to { value, label }
const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    return opt
  })
})

const selectedLabel = computed(() => {
  if (props.modelValue === '' || props.modelValue === null || props.modelValue === undefined) {
    return ''
  }
  const match = normalizedOptions.value.find(opt => opt.value === props.modelValue)
  return match ? match.label : String(props.modelValue)
})

const isOptionSelected = (val: any) => {
  return props.modelValue === val
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    const idx = normalizedOptions.value.findIndex(o => o.value === props.modelValue)
    highlightedIndex.value = idx >= 0 ? idx : 0
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (val: any) => {
  emit('update:modelValue', val)
  emit('change', val)
  isOpen.value = false
}

const clearSelection = () => {
  emit('update:modelValue', '')
  emit('change', '')
  isOpen.value = false
}

const navigateOption = (delta: number) => {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }
  const len = normalizedOptions.value.length
  if (len === 0) return
  highlightedIndex.value = (highlightedIndex.value + delta + len) % len
}

// Click outside detection
const handleClickOutside = (e: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
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
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

.custom-select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: 'Plus Jakarta Sans', sans-serif;
  user-select: none;
}

.custom-select-wrapper.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Trigger Box */
.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  padding: 8px 14px;
  background: #FFFFFF;
  border: 1.5px solid #E5E7EB;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
  outline: none;
}

.select-trigger:hover {
  border-color: #D97706;
  background: #FFFDF9;
}

.select-trigger.is-active,
.select-trigger:focus {
  border-color: #D97706;
  box-shadow: 0 0 0 3.5px rgba(217, 119, 6, 0.14);
  background: #FFFFFF;
}

.trigger-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.selected-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #1F2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selected-text.placeholder-text {
  color: #6B7280;
  font-weight: 500;
}

.trigger-icons {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.btn-clear-select {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #F3F4F6;
  border: none;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-clear-select:hover {
  background: #FEE2E2;
  color: #DC2626;
}

.chevron-arrow {
  color: #9CA3AF;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.chevron-arrow.is-flipped {
  transform: rotate(180deg);
  color: #D97706;
}

/* ========================================================================= */
/* DROPDOWN MENU CARD                                                        */
/* ========================================================================= */
.select-dropdown-menu {
  position: absolute;
  top: calc(100% + 5px);
  z-index: 9999;
  min-width: 100%;
  width: max-content;
  max-width: 340px;
  background: #FFFFFF;
  border: 1.5px solid #F3EDE6;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 12px 28px -4px rgba(44, 26, 19, 0.14), 0 4px 12px -2px rgba(44, 26, 19, 0.06);
  box-sizing: border-box;
}

.select-dropdown-menu.bottom-left {
  left: 0;
}

.select-dropdown-menu.bottom-right {
  right: 0;
}

.options-list {
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Custom Scrollbar */
.options-list::-webkit-scrollbar {
  width: 5px;
}

.options-list::-webkit-scrollbar-track {
  background: transparent;
}

.options-list::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 4px;
}

.options-list::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}

/* Option Items */
.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  gap: 12px;
}

.option-item:hover,
.option-item.is-highlighted {
  background: #FEF3C7;
  color: #92400E;
}

.option-item.is-selected {
  background: #FFFBEB;
  color: #92400E;
  font-weight: 700;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.option-label {
  font-size: 13px;
  font-weight: 600;
  color: inherit;
  white-space: nowrap;
}

.option-sublabel {
  font-size: 11px;
  color: #6B7280;
}

.option-check-icon {
  display: flex;
  align-items: center;
  color: #D97706;
  flex-shrink: 0;
}

.no-options-message {
  padding: 12px;
  text-align: center;
  font-size: 12.5px;
  color: #9CA3AF;
}

/* Transition Animations */
.dropdown-pop-enter-active,
.dropdown-pop-leave-active {
  transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-pop-enter-from,
.dropdown-pop-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}
</style>
