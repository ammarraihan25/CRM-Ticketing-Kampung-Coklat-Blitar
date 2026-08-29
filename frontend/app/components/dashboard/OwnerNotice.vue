<template>
  <div class="role-access-banner" :class="`role-${activeRole}`">
    <div class="banner-left">
      <div class="role-icon-box">
        <!-- Crown / Key / Shield icon based on role -->
        <svg v-if="activeRole === 'owner'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="role-icon">
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
        <svg v-else-if="activeRole === 'manager'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="role-icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="role-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      <div class="banner-text">
        <div class="role-title-row">
          <span class="role-badge">{{ roleLabel }}</span>
          <span class="view-mode-tag" :class="isReadOnly ? 'tag-readonly' : 'tag-editable'">
            {{ isReadOnly ? '● Read-Only Executive View' : '● Full Operational Access' }}
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
          class="switch-btn" 
          :class="{ active: activeRole === 'owner' }"
          @click="selectRole('owner')"
        >
          Owner
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth, type UserRole } from '~/composables/useAuth'

const { currentRole, setRole, isReadOnly } = useAuth()

const activeRole = computed(() => currentRole.value)

const roleLabel = computed(() => {
  switch (activeRole.value) {
    case 'owner': return '👑 Mode Eksekutif: Owner'
    case 'manager': return '📋 Mode Operasional: Manager'
    default: return '⚡ Mode Penuh: Administrator'
  }
})

const selectRole = (role: UserRole) => {
  setRole(role)
}
</script>

<style scoped>
.role-access-banner {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 20px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 14px rgba(61, 34, 20, 0.04);
  transition: all 0.2s ease;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.role-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-admin .role-icon-box { background: #FEF3C7; color: #B45309; }
.role-manager .role-icon-box { background: #EDE9FE; color: #5B21B6; }
.role-owner .role-icon-box { background: #FEF08A; color: #854D0E; }

.role-icon {
  width: 22px;
  height: 22px;
}

.banner-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.role-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.role-badge {
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
}

.view-mode-tag {
  font-size: 10.5px;
  font-weight: 800;
  padding: 2.5px 8px;
  border-radius: 12px;
}

.tag-readonly {
  background: #FEF3C7;
  color: #92400E;
}

.tag-editable {
  background: #D1FAE5;
  color: #065F46;
}

.role-description {
  font-size: 12.5px;
  color: #6E442B;
  margin: 0;
  line-height: 1.45;
}

.role-switcher {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.switcher-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #8C6D58;
  text-transform: uppercase;
}

.switcher-buttons {
  display: flex;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  padding: 3px;
  border-radius: 14px;
  gap: 3px;
}

.switch-btn {
  background: transparent;
  border: none;
  padding: 5px 12px;
  border-radius: 10px;
  font-size: 11.5px;
  font-weight: 800;
  color: #7A5034;
  cursor: pointer;
  transition: all 0.2s ease;
}

.switch-btn:hover {
  color: #2C1A13;
}

.switch-btn.active {
  background: #3D2214;
  color: #FAF5EE;
  box-shadow: 0 2px 6px rgba(61, 34, 20, 0.2);
}

@media (max-width: 768px) {
  .role-access-banner {
    flex-direction: column;
    align-items: stretch;
  }
  .role-switcher {
    align-items: stretch;
  }
  .switcher-buttons {
    justify-content: center;
  }
}
</style>
