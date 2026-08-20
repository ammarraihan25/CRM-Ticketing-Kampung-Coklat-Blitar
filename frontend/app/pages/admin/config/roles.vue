<template>
  <div class="roles-page">
    <!-- Header Section -->
    <header class="config-header">
      <div class="header-left">
        <h1 class="page-title">Manajemen Role &amp; Permission Matrix</h1>
        <p class="page-subtitle">
          Pengaturan akun pengguna staf internal, penetapan role (Admin, Manager, Kasir, Owner), dan matriks hak akses.
        </p>
      </div>

      <div class="header-actions">
        <button 
          v-if="canManageConfig"
          type="button" 
          class="btn-primary-action"
          @click="openAddUserModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          <span>Tambah Akun Staf</span>
        </button>

        <div v-else class="read-only-pill">
          🔒 Mode Read-Only (Role: {{ user.roleTitle }})
        </div>
      </div>
    </header>

    <!-- Role Warning if not Admin -->
    <div v-if="!canManageConfig" class="role-warning-banner">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <div>
        <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Penambahan akun staf dan perubahan hak akses permission hanya dapat dikelola oleh Super Admin.
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- SECTION 1: DAFTAR AKUN PENGGUNA STAF (CLEAN & AESTHETIC CARD TABLE)       -->
    <!-- ========================================================================= -->
    <section class="section-widget-frame">
      <div class="section-head-bar">
        <div class="section-head-left">
          <div class="section-title-badge">
            <span class="sec-icon">👥</span>
            <h2 class="sec-title">Daftar Akun Pengguna Staf</h2>
          </div>
          <p class="sec-subtitle">Daftar petugas POS, tim manajemen, dan dewan direksi yang terdaftar di sistem</p>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="aesthetic-staff-table">
          <thead>
            <tr>
              <th>NAMA PENGGUNA</th>
              <th>EMAIL / LOGIN ID</th>
              <th>DEPARTEMEN / UNIT</th>
              <th>ROLE AKSES</th>
              <th>STATUS AKUN</th>
              <th class="text-right">AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usersList" :key="u.id" class="staff-row">
              <td>
                <div class="user-cell-wrap">
                  <div class="avatar-disc-staff">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="staff-avatar-svg">
                      <circle cx="24" cy="24" r="23" fill="#FAF3E8"/>
                      <path d="M12 42 C12 33 18 30 24 30 C30 30 36 33 36 42 Z" fill="#3D2214"/>
                      <circle cx="24" cy="19" r="8" fill="#D97706"/>
                    </svg>
                  </div>
                  <div class="user-meta-col">
                    <strong class="user-name-txt">{{ u.name }}</strong>
                    <span class="user-id-chip">ID: {{ u.id }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="email-code-pill">{{ u.email }}</span>
              </td>
              <td>
                <span class="dept-text">{{ u.department }}</span>
              </td>
              <td>
                <span class="role-pill-badge" :class="`role-${u.role}`">
                  {{ u.roleTitle }}
                </span>
              </td>
              <td>
                <span class="status-pill-badge" :class="u.isActive ? 'status-active' : 'status-locked'">
                  <span class="status-dot-mini"></span>
                  <span>{{ u.isActive ? 'Aktif' : 'Terkunci' }}</span>
                </span>
              </td>
              <td class="text-right">
                <button 
                  type="button" 
                  class="btn-action-edit"
                  :disabled="!canManageConfig"
                  @click="editUser(u)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <span>Edit Akun</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- SECTION 2: MATRIKS HAK AKSES & PERMISSION (CLEAN RBAC MATRIX)             -->
    <!-- ========================================================================= -->
    <section class="section-widget-frame">
      <div class="section-head-bar">
        <div class="section-head-left">
          <div class="section-title-badge">
            <span class="sec-icon">🛡️</span>
            <h2 class="sec-title">Matriks Hak Akses Role (RBAC)</h2>
          </div>
          <p class="sec-subtitle">Struktur hak baca (Read), tulis (Write), dan eksekusi per peran pengguna internal</p>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="aesthetic-matrix-table">
          <thead>
            <tr>
              <th style="width: 320px;">MODUL / FITUR SISTEM</th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">👑 Super Admin</span>
                  <span class="th-role-sub">Full System Control</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">👔 Manager</span>
                  <span class="th-role-sub">Monitoring &amp; Evaluasi</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">🧾 Kasir Front Office</span>
                  <span class="th-role-sub">Frontliner POS</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">🏛️ Owner / Direksi</span>
                  <span class="th-role-sub">Executive Read-Only</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in permissionMatrix" :key="item.module" class="matrix-row">
              <td>
                <div class="module-title-txt">{{ item.module }}</div>
                <div class="module-desc-txt">{{ item.description }}</div>
              </td>
              <td class="text-center">
                <span class="matrix-tag tag-full">
                  <span class="tag-icon">✓</span>
                  <span>Full Akses</span>
                </span>
              </td>
              <td class="text-center">
                <span class="matrix-tag" :class="item.manager === 'READ' ? 'tag-read' : item.manager ? 'tag-full' : 'tag-locked'">
                  <span class="tag-icon">{{ item.manager === 'READ' ? '👁️' : item.manager ? '✓' : '✕' }}</span>
                  <span>{{ item.manager === 'READ' ? 'Read-Only' : item.manager ? 'Full Akses' : 'Terkunci' }}</span>
                </span>
              </td>
              <td class="text-center">
                <span class="matrix-tag" :class="item.kasir ? 'tag-pos' : 'tag-locked'">
                  <span class="tag-icon">{{ item.kasir ? '⚡' : '✕' }}</span>
                  <span>{{ item.kasir ? 'POS Kasir' : 'Terkunci' }}</span>
                </span>
              </td>
              <td class="text-center">
                <span class="matrix-tag" :class="item.owner === 'READ' ? 'tag-read' : item.owner ? 'tag-full' : 'tag-locked'">
                  <span class="tag-icon">{{ item.owner === 'READ' ? '👁️' : item.owner ? '✓' : '✕' }}</span>
                  <span>{{ item.owner === 'READ' ? 'Read-Only' : item.owner ? 'Full Akses' : 'Terkunci' }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal User Form -->
    <div v-if="showUserModal" class="modal-backdrop" @click.self="showUserModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-col">
            <img :src="logoImg" alt="Kampung Coklat" class="modal-mini-logo" />
            <h3>{{ isEditing ? `Edit Akun: ${userForm.name}` : 'Tambah Akun Staf Baru' }}</h3>
          </div>
          <button class="btn-close" @click="showUserModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveUser">
          <div class="modal-body">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input v-model="userForm.name" type="text" class="input-control" required />
            </div>

            <div class="form-group">
              <label>Alamat Email / ID Login</label>
              <input v-model="userForm.email" type="email" class="input-control" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Role Pengguna</label>
                <select v-model="userForm.role" class="filter-select full-width">
                  <option value="admin">Super Admin</option>
                  <option value="manager">Operational Manager</option>
                  <option value="kasir">Kasir Front Office</option>
                  <option value="owner">Owner / Direksi</option>
                </select>
              </div>

              <div class="form-group">
                <label>Departemen</label>
                <input v-model="userForm.department" type="text" class="input-control" required />
              </div>
            </div>

            <div class="form-group">
              <label>Status Akun</label>
              <select v-model="userForm.isActive" class="filter-select full-width">
                <option :value="true">Aktif (Dapat Login)</option>
                <option :value="false">Nonaktif / Terkunci</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showUserModal = false">Batal</button>
            <button type="submit" class="btn-primary-modal">Simpan Akun Staf</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth, type UserRole } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'admin'
})

const { user, canManageConfig } = useAuth()

interface StaffAccount {
  id: string
  name: string
  email: string
  role: UserRole
  roleTitle: string
  department: string
  avatar: string
  isActive: boolean
}

const usersList = ref<StaffAccount[]>([
  {
    id: 'USR-ADM-01',
    name: 'Bagus Prakoso',
    email: 'admin@kampungcoklat.id',
    role: 'admin',
    roleTitle: 'Super Admin',
    department: 'IT & System Operations',
    avatar: '👨💼',
    isActive: true
  },
  {
    id: 'USR-MGR-02',
    name: 'Rina Indrawati',
    email: 'manager@kampungcoklat.id',
    role: 'manager',
    roleTitle: 'Operational Manager',
    department: 'Operational Management',
    avatar: '👩💼',
    isActive: true
  },
  {
    id: 'USR-POS-01',
    name: 'Siti Aminah',
    email: 'kasir1@kampungcoklat.id',
    role: 'kasir',
    roleTitle: 'Kasir Front Office',
    department: 'Ticketing & POS Terminal 1',
    avatar: '🧕',
    isActive: true
  },
  {
    id: 'USR-POS-02',
    name: 'Dwi Prasetyo',
    email: 'kasir2@kampungcoklat.id',
    role: 'kasir',
    roleTitle: 'Kasir Front Office',
    department: 'Ticketing & POS Terminal 2',
    avatar: '👨🌾',
    isActive: true
  },
  {
    id: 'USR-OWN-01',
    name: 'H. Kholid Mustofa',
    email: 'owner@kampungcoklat.id',
    role: 'owner',
    roleTitle: 'Owner / Direksi',
    department: 'Executive Board',
    avatar: '👑',
    isActive: true
  }
])

const permissionMatrix = ref([
  {
    module: 'Dashboard Finansial & GTV',
    description: 'Akses ringkasan eksekutif, grafik tren, dan metrik revenue',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Audit Rekonsiliasi Shift Kasir',
    description: 'Approval selisih kas fisik dan validasi serah terima shift',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Konfigurasi Tarif Tiket & Wahana',
    description: 'Ubah harga tiket masuk, paket edukasi, dan status operasional',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Pengaturan Diskon & Promo CRM',
    description: 'Pembuatan voucher diskon, free ticket majlis (PP), dan blast WA',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Terminal Transaksi POS Kasir',
    description: 'Input penjualan tiket, cetak barcode wristband, refund & void',
    admin: true,
    manager: false,
    kasir: true,
    owner: false
  },
  {
    module: 'Laporan & Ekspor Data (PDF / Excel)',
    description: 'Download riwayat transaksi, demografi, dan log audit staf',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Manajemen Role & Staf (RBAC)',
    description: 'Tambah staf baru, ganti role pengguna, dan reset password',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  }
])

const showUserModal = ref(false)
const isEditing = ref(false)

const userForm = reactive({
  id: '',
  name: '',
  email: '',
  role: 'kasir' as UserRole,
  department: '',
  isActive: true
})

const getRoleTitle = (role: UserRole): string => {
  switch (role) {
    case 'admin': return 'Super Admin'
    case 'manager': return 'Operational Manager'
    case 'kasir': return 'Kasir Front Office'
    case 'owner': return 'Owner / Direksi'
    default: return 'Staff'
  }
}

const getAvatar = (role: UserRole): string => {
  switch (role) {
    case 'admin': return '👨💼'
    case 'manager': return '👩💼'
    case 'kasir': return '🧾'
    case 'owner': return '👑'
    default: return '👤'
  }
}

const openAddUserModal = () => {
  isEditing.value = false
  userForm.id = `USR-${Math.floor(100 + Math.random() * 900)}`
  userForm.name = ''
  userForm.email = ''
  userForm.role = 'kasir'
  userForm.department = 'Ticketing POS'
  userForm.isActive = true
  showUserModal.value = true
}

const editUser = (u: StaffAccount) => {
  isEditing.value = true
  userForm.id = u.id
  userForm.name = u.name
  userForm.email = u.email
  userForm.role = u.role
  userForm.department = u.department
  userForm.isActive = u.isActive
  showUserModal.value = true
}

const saveUser = () => {
  if (isEditing.value) {
    const idx = usersList.value.findIndex(u => u.id === userForm.id)
    if (idx !== -1) {
      usersList.value[idx] = {
        ...usersList.value[idx],
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        roleTitle: getRoleTitle(userForm.role),
        department: userForm.department,
        avatar: getAvatar(userForm.role),
        isActive: userForm.isActive
      }
    }
  } else {
    usersList.value.push({
      id: userForm.id,
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      roleTitle: getRoleTitle(userForm.role),
      department: userForm.department,
      avatar: getAvatar(userForm.role),
      isActive: userForm.isActive
    })
  }

  showUserModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@600;700&display=swap');

/* ========================================================================= */
/* PAGE ROOT CONTAINER                                                       */
/* ========================================================================= */
.roles-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 1380px;
  width: 100%;
  font-family: 'Jost', sans-serif;
}

/* ========================================================================= */
/* HEADER BANNER WITH COCOA & CHOCOLATE ART                                  */
/* ========================================================================= */
.config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  min-height: 75px;
  padding: 6px 0 10px 0;
  position: relative;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 680px;
  position: relative;
  z-index: 2;
}

.page-title {
  font-family: 'Cinzel', serif;
  font-size: 26px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.3px;
}

.page-subtitle {
  font-size: 13.5px;
  font-weight: 600;
  color: #6E442B;
  margin: 0;
  line-height: 1.4;
}

.header-right-group {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.btn-primary-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3D2214;
  color: #FAF5EE;
  border: none;
  padding: 9px 20px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(61, 34, 20, 0.2);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.btn-primary-action:hover {
  background: #D97706;
  transform: translateY(-1px);
}

.read-only-pill {
  background-color: #FAF3E8;
  color: #92400E;
  border: 1px solid #EADBCC;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  position: relative;
  z-index: 2;
}

/* Header Right Cocoa & Chocolate Decorative Graphic */
.header-cocoa-decor {
  position: absolute;
  right: 0;
  top: -15px;
  bottom: -15px;
  width: 280px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
}

.botanical-leaves-bg {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

.chocolate-pieces-art {
  position: absolute;
  right: 10px;
  top: 0;
  width: 140px;
  height: 100px;
}

.choc-svg {
  width: 100%;
  height: 100%;
}

.role-warning-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FEF3C7;
  border: 1.5px solid #F59E0B;
  color: #92400E;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
}

/* ========================================================================= */
/* SECTION WIDGET FRAMES & AESTHETIC TABLES                                  */
/* ========================================================================= */
.section-widget-frame {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 24px;
  padding: 22px 26px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 4px 16px rgba(61, 34, 20, 0.04);
}

.section-head-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #F0E5D8;
  padding-bottom: 12px;
}

.section-head-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-title-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sec-icon {
  font-size: 18px;
}

.sec-title {
  font-family: 'Cinzel', serif;
  font-size: 17.5px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
}

.sec-subtitle {
  font-size: 12px;
  color: #7A5034;
  margin: 0;
}

.table-responsive-box {
  width: 100%;
  overflow-x: auto;
}

/* Table 1: Staff Table */
.aesthetic-staff-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

.aesthetic-staff-table thead th {
  padding: 10px 14px;
  font-size: 10.5px;
  font-weight: 800;
  color: #8C6D58;
  letter-spacing: 0.5px;
  text-align: left;
  border-bottom: 1px solid #EFE4D6;
}

.staff-row {
  background: #FFFFFF;
  border: 1px solid #EFE4D6;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.staff-row:hover {
  background: #FAF5EE;
  box-shadow: 0 4px 12px rgba(61, 34, 20, 0.05);
}

.staff-row td {
  padding: 12px 14px;
  font-size: 13px;
  vertical-align: middle;
}

.staff-row td:first-child {
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border-left: 1px solid #EFE4D6;
}

.staff-row td:last-child {
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  border-right: 1px solid #EFE4D6;
}

.user-cell-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-disc-staff {
  width: 36px;
  height: 36px;
  background: #FAF3E8;
  border: 1.5px solid #EADBCC;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.user-meta-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.user-name-txt {
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #2C1A13;
}

.user-id-chip {
  font-size: 10px;
  color: #8C6D58;
  font-weight: 700;
}

.email-code-pill {
  font-family: 'JetBrains Mono', monospace;
  background: #FAF3E8;
  border: 1px solid #EADBCC;
  color: #5A2E17;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11.5px;
}

.dept-text {
  font-size: 12.5px;
  color: #5A2E17;
  font-weight: 600;
}

.role-pill-badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 800;
}

.role-admin { background: #3D2214; color: #FAF5EE; }
.role-manager { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.role-kasir { background: #DBEAFE; color: #1E40AF; border: 1px solid #BFDBFE; }
.role-owner { background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0; }

.status-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
}

.status-active { background: #D1FAE5; color: #065F46; }
.status-locked { background: #FEE2E2; color: #991B1B; }

.status-dot-mini {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.btn-action-edit {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FAF3E8;
  border: 1px solid #EADBCC;
  color: #3D2214;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 11.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-edit:hover:not(:disabled) {
  background: #3D2214;
  color: #FAF5EE;
}

/* Table 2: RBAC Matrix Table */
.aesthetic-matrix-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

.aesthetic-matrix-table thead th {
  padding: 12px 14px;
  border-bottom: 1.5px solid #EFE4D6;
}

.role-th-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.th-role-name {
  font-family: 'Cinzel', serif;
  font-size: 12px;
  font-weight: 900;
  color: #2C1A13;
}

.th-role-sub {
  font-size: 9.5px;
  color: #8C6D58;
  font-weight: 600;
}

.matrix-row {
  background: #FFFFFF;
  border: 1px solid #EFE4D6;
  border-radius: 14px;
  transition: all 0.2s ease;
}

.matrix-row:hover {
  background: #FAF5EE;
}

.matrix-row td {
  padding: 14px 16px;
  vertical-align: middle;
}

.matrix-row td:first-child {
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border-left: 1px solid #EFE4D6;
}

.matrix-row td:last-child {
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
  border-right: 1px solid #EFE4D6;
}

.module-title-txt {
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #2C1A13;
  margin-bottom: 2px;
}

.module-desc-txt {
  font-size: 11px;
  color: #7A5034;
}

.matrix-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
}

.tag-full { background: #D1FAE5; color: #065F46; }
.tag-read { background: #FEF3C7; color: #92400E; }
.tag-pos { background: #DBEAFE; color: #1E40AF; }
.tag-locked { background: #F3F4F6; color: #9CA3AF; }

.text-right { text-align: right; }
.text-center { text-align: center; }

/* ========================================================================= */
/* MODAL STYLING                                                             */
/* ========================================================================= */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(36, 20, 13, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: #FFFDF9;
  border: 2px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  padding: 22px 24px;
  box-shadow: 0 20px 50px rgba(44, 26, 19, 0.35);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.5px solid #EFE4D6;
  padding-bottom: 12px;
  margin-bottom: 14px;
}

.modal-title-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-mini-logo {
  max-height: 24px;
}

.modal-header h3 {
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #8C6D58;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 11px;
  font-weight: 700;
  color: #5A3A28;
  text-transform: uppercase;
}

.input-control, .filter-select {
  border: 1.5px solid #C4AA8F;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 7px 11px;
  font-size: 13px;
  color: #2C1A13;
  outline: none;
}

.input-control:focus, .filter-select:focus {
  border-color: #D97706;
}

.modal-footer {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-secondary {
  background: #FAF3E8;
  border: 1.5px solid #C4AA8F;
  color: #5A3A28;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
}

.btn-primary-modal {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  color: #FFFFFF;
  border: none;
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header-cocoa-decor {
    display: none;
  }
}
</style>
