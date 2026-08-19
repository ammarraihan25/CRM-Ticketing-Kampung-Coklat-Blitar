<template>
  <div class="role-access-banner" :class="`role-${activeRole}`">
    <div class="banner-left">
      <div class="role-icon-box">
        <!-- Crown / Key / Shield icon based on role -->
        <svg v-if="activeRole === 'owner'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="role-icon">
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
        <svg v-else-if="activeRole === 'manager'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="role-icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="role-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      <div class="banner-text">
        <div class="role-title-row">
          <span class="role-badge">{{ roleLabel }}</span>
          <span class="view-mode-tag" :class="isReadOnly ? 'tag-readonly' : 'tag-editable'">
            {{ isReadOnly ? 'Read-Only Executive View' : 'Full Operational Access' }}
          </span>
        </div>
        <p class="role-description">
          <template v-if="activeRole === 'owner'">
            <strong>Akses Owner Aktif:</strong> Tampilan eksekutif khusus ringkasan finansial dan analitik. Fitur manipulasi data kasir, rekonsiliasi manual, dan konfigurasi sistem dinonaktifkan demi integritas audit.
          </template>
          <template v-else-if="activeRole === 'manager'">
            <strong>Akses Manager:</strong> Pengawasan operasional harian, audit rekonsiliasi shift kasir, dan peninjauan segmentasi CRM.
          </template>
          <template v-else>
            <strong>Akses Administrator:</strong> Hak penuh konfigurasi tarif tiket, manajemen kasir POS, rekonsiliasi kas, dan blast promo CRM.
          </template>
        </p>
      </div>
    </div>

    <!-- Role Switcher for Live Demo / Testing -->
    <div class="role-switcher">
      <span class="switcher-label">Simulasi Hak Akses:</span>
      <div class="switcher-buttons">
        <button 
          type="button"
          class="switch-btn" 
          :class="{ active: activeRole === 'admin' }"
          @click="selectRole('admin')"
        >
          Admin
        </button>
        <button 
          type="button"
          class="switch-btn" 
          :class="{ active: activeRole === 'manager' }"
          @click="selectRole('manager')"
        >
          Manager
        </button>
        <button 
          type="button"
          class="switch-btn switch-owner" 
          :class="{ active: activeRole === 'owner' }"
          @click="selectRole('owner')"
        >
          Owner (Read-Only)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth, type UserRole } from '~/composables/useAuth'

interface Props {
  modelValue?: UserRole
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', role: UserRole): void
}>()

const { currentRole, loginAs } = useAuth()

const activeRole = computed(() => props.modelValue || currentRole.value)
const isReadOnly = computed(() => activeRole.value === 'owner')

const roleLabel = computed(() => {
  switch (activeRole.value) {
    case 'owner': return 'Role: Owner / Komisaris'
    case 'manager': return 'Role: Operational Manager'
    case 'admin': default: return 'Role: Super Admin'
  }
})

const selectRole = (role: UserRole) => {
  loginAs(role)
  emit('update:modelValue', role)
}
</script>

<style scoped>
.role-access-banner {
  background-color: var(--color-neutral, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--rounded-md, 8px);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  transition: all 0.25s ease;
}

.role-access-banner.role-owner {
  background: linear-gradient(135deg, #fffdf8 0%, #fff6e5 100%);
  border-color: #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.12);
}

.role-access-banner.role-manager {
  background: linear-gradient(135deg, #fafafa 0%, #f0f4f8 100%);
  border-color: #3b82f6;
}

.role-access-banner.role-admin {
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  border-color: var(--color-primary-20, #c9b3a8);
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.role-icon-box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-owner .role-icon-box {
  background-color: rgba(245, 158, 11, 0.15);
  color: #b45309;
}

.role-manager .role-icon-box {
  background-color: rgba(59, 130, 246, 0.15);
  color: #1d4ed8;
}

.role-admin .role-icon-box {
  background-color: rgba(44, 26, 19, 0.1);
  color: var(--color-primary, #2c1a13);
}

.role-icon {
  width: 22px;
  height: 22px;
}

.banner-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.role-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.role-badge {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary, #2c1a13);
}

.view-mode-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.tag-readonly {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.tag-editable {
  background-color: #e0f2fe;
  color: #0369a1;
  border: 1px solid #bae6fd;
}

.role-description {
  font-size: 12.5px;
  color: var(--color-muted, #6b5a52);
  margin: 0;
  line-height: 1.4;
}

.role-switcher {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.switcher-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-muted, #6b5a52);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.switcher-buttons {
  display: inline-flex;
  background-color: #f3f4f6;
  padding: 3px;
  border-radius: 6px;
  gap: 2px;
}

.switch-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #4b5563;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.switch-btn:hover {
  color: #111827;
}

.switch-btn.active {
  background-color: #ffffff;
  color: var(--color-primary, #2c1a13);
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.switch-btn.switch-owner.active {
  background-color: #f59e0b;
  color: #ffffff;
}

@media (max-width: 900px) {
  .role-access-banner {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .role-switcher {
    align-items: flex-start;
    width: 100%;
  }

  .switcher-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .switch-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
