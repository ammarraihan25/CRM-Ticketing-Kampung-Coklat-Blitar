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
    </header>

    <!-- Role Warning if not Admin -->
    <div v-if="!canManageConfig" class="role-warning-banner">
      <div class="rwb-text-col">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div>
          <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Penambahan akun staf dan perubahan hak akses permission hanya dapat dikelola oleh Super Admin.
        </div>
      </div>
      <button type="button" class="btn-return-admin" @click="setRole('admin')">
        ⚡ Beralih ke Super Admin
      </button>
    </div>

    <!-- ========================================================================= -->
    <!-- SECTION 1: DAFTAR AKUN PENGGUNA STAF (CLEAN & AESTHETIC CARD TABLE)       -->
    <!-- ========================================================================= -->
    <section class="section-widget-frame">
      <div class="section-head-bar">
        <div class="section-head-left">
          <div class="section-title-badge">
            <h2 class="sec-title">Daftar Akun Pengguna Staf</h2>
          </div>
          <p class="sec-subtitle">Daftar petugas POS, tim manajemen, dan dewan direksi yang terdaftar di sistem</p>
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
              <th class="text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usersList" :key="u.id" class="staff-row">
              <td>
                <div class="user-cell-wrap">
                  <div class="avatar-disc-staff">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="staff-avatar-svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
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
              <td class="text-center">
                <button 
                  type="button" 
                  class="btn-action-edit"
                  :disabled="!canManageConfig"
                  @click="editUser(u)"
                  title="Edit data akun staf"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <span>Edit</span>
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
            <h2 class="sec-title">Matriks Hak Akses Role (RBAC)</h2>
          </div>
          <p class="sec-subtitle">Struktur hak baca (Read), tulis (Write), dan eksekusi per peran pengguna internal</p>
        </div>
        <div class="header-actions">
          <template v-if="!isEditingMatrix">
            <button 
              v-if="canManageConfig"
              type="button" 
              class="btn-primary-action"
              @click="openEditRoleMatrix"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Edit Role Akses</span>
            </button>
          </template>
          <template v-else>
            <div class="edit-actions-group">
              <button type="button" class="btn-outline-action" @click="cancelEditMatrix">Batal</button>
              <button type="button" class="btn-primary-action" @click="saveMatrix">Simpan Perubahan</button>
            </div>
          </template>
        </div>
      </div>

      <div class="table-responsive-box">
        <table class="aesthetic-matrix-table">
          <thead>
            <tr>
              <th style="width: 380px;">MODUL / FITUR SISTEM</th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">Super Admin</span>
                  <span class="th-role-sub">Full System Control</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">Manager</span>
                  <span class="th-role-sub">Monitoring &amp; Evaluasi</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">Kasir Front Office</span>
                  <span class="th-role-sub">Frontliner POS</span>
                </div>
              </th>
              <th class="text-center role-th">
                <div class="role-th-card">
                  <span class="th-role-name">Owner / Direksi</span>
                  <span class="th-role-sub">Executive Read-Only</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in permissionMatrix" :key="item.module" class="matrix-row">
              <td>
                <div class="module-title-txt" style="margin-bottom: 0;">{{ item.module }}</div>
              </td>
              <td class="text-center">
                <span class="matrix-tag tag-full">
                  <span>Full Akses</span>
                </span>
              </td>
              <td class="text-center">
                <template v-if="!isEditingMatrix">
                  <span class="matrix-tag" :class="item.manager === 'READ' ? 'tag-read' : item.manager ? 'tag-full' : 'tag-locked'">
                    <span>{{ item.manager === 'READ' ? 'Read-Only' : item.manager ? 'Full Akses' : 'Terkunci' }}</span>
                  </span>
                </template>
                <template v-else>
                  <select v-model="item.manager" class="matrix-inline-select" :class="item.manager === 'READ' ? 'select-read' : item.manager ? 'select-full' : 'select-locked'">
                    <option :value="true">Full Akses</option>
                    <option value="READ">Read-Only</option>
                    <option :value="false">Terkunci</option>
                  </select>
                </template>
              </td>
              <td class="text-center">
                <template v-if="!isEditingMatrix">
                  <span class="matrix-tag" :class="item.kasir === 'READ' ? 'tag-read' : item.kasir ? (item.id === 'pos_terminal' ? 'tag-pos' : 'tag-full') : 'tag-locked'">
                    <span>{{ item.kasir === 'READ' ? 'Read-Only' : item.kasir ? (item.id === 'pos_terminal' ? 'POS Kasir' : 'Full Akses') : 'Terkunci' }}</span>
                  </span>
                </template>
                <template v-else>
                  <select v-model="item.kasir" class="matrix-inline-select" :class="item.kasir === 'READ' ? 'select-read' : item.kasir ? (item.id === 'pos_terminal' ? 'select-pos' : 'select-full') : 'select-locked'">
                    <option :value="true">{{ item.id === 'pos_terminal' ? 'POS Kasir (Full)' : 'Full Akses' }}</option>
                    <option value="READ">Read-Only</option>
                    <option :value="false">Terkunci</option>
                  </select>
                </template>
              </td>
              <td class="text-center">
                <template v-if="!isEditingMatrix">
                  <span class="matrix-tag" :class="item.owner === 'READ' ? 'tag-read' : item.owner ? 'tag-full' : 'tag-locked'">
                    <span>{{ item.owner === 'READ' ? 'Read-Only' : item.owner ? 'Full Akses' : 'Terkunci' }}</span>
                  </span>
                </template>
                <template v-else>
                  <select v-model="item.owner" class="matrix-inline-select" :class="item.owner === 'READ' ? 'select-read' : item.owner ? 'select-full' : 'select-locked'">
                    <option :value="true">Full Akses</option>
                    <option value="READ">Read-Only</option>
                    <option :value="false">Terkunci</option>
                  </select>
                </template>
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
import { ref, reactive, watch } from 'vue'
import { useAuth, type UserRole, type RbacPermissionItem } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'admin'
})

const { user, currentRole, setRole, canManageConfig, rbacMatrix, updateRbacMatrix } = useAuth()

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

const permissionMatrix = ref<RbacPermissionItem[]>([])

const syncMatrixFromAuth = () => {
  if (rbacMatrix.value && Array.isArray(rbacMatrix.value) && rbacMatrix.value.length > 0) {
    permissionMatrix.value = JSON.parse(JSON.stringify(rbacMatrix.value))
  }
}

syncMatrixFromAuth()

watch(rbacMatrix, () => {
  if (!isEditingMatrix.value) {
    syncMatrixFromAuth()
  }
}, { deep: true })

const showUserModal = ref(false)
const isEditing = ref(false)
const isEditingMatrix = ref(false)
const originalMatrix = ref<any[]>([])

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

const openEditRoleMatrix = () => {
  isEditingMatrix.value = true
  originalMatrix.value = JSON.parse(JSON.stringify(permissionMatrix.value))
}

const cancelEditMatrix = () => {
  permissionMatrix.value = JSON.parse(JSON.stringify(originalMatrix.value))
  isEditingMatrix.value = false
}

const saveMatrix = () => {
  try {
    isEditingMatrix.value = false
    updateRbacMatrix(permissionMatrix.value)
    alert('[SUKSES] Matriks hak akses role (RBAC) berhasil diperbarui dan disinkronkan ke seluruh menu & hak akses sistem!')
  } catch (err) {
    console.error('Error saving matrix:', err)
  }
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
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
  gap: 8px;
  max-width: 680px;
  position: relative;
  z-index: 2;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
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
  gap: 8px;
  background: #3D2214;
  color: #FFFFFF;
  border: 1px solid transparent;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(61, 34, 20, 0.1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.btn-primary-action:hover {
  background: #502D1A;
}

.edit-actions-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-outline-action {
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  color: #3D2214;
  border: 1.5px solid #E2D9CE;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline-action:hover {
  background: #F8F5F0;
  border-color: #D6C3B1;
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
  justify-content: space-between;
  gap: 16px;
  background: #FFFBEB;
  border: 1.5px solid #FDE68A;
  color: #92400E;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(180, 83, 9, 0.06);
}

.rwb-text-col {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-return-admin {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3D2214;
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(61, 34, 20, 0.18);
}

.btn-return-admin:hover {
  background: #502D1A;
  transform: translateY(-1px);
}

/* ========================================================================= */
/* SECTION WIDGET FRAMES & AESTHETIC TABLES                                  */
/* ========================================================================= */
.section-widget-frame {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
}

.section-head-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E5E7EB;
}

.section-head-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 21px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.sec-subtitle {
  font-size: 14.5px;
  color: #7A5034;
  margin: 0;
  line-height: 1.5;
}

.table-responsive-box {
  width: 100%;
  overflow-x: auto;
}

/* Table 1: Staff Table */
.aesthetic-staff-table {
  width: 100%;
  border-collapse: collapse;
}

.aesthetic-staff-table thead th {
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #6B5A52;
  background: #FAF8F5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  border-bottom: 1px solid #E5E7EB;
}

.staff-row {
  background: #FFFFFF;
  border-bottom: 1px solid #F3F4F6;
  transition: all 0.2s ease;
}

.staff-row:hover {
  background: #F9FAFB;
}

.staff-row td {
  padding: 16px 20px;
  font-size: 14px;
  vertical-align: middle;
  color: #2C1A13;
}

.user-cell-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-disc-staff {
  width: 36px;
  height: 36px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748B;
}

.user-meta-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name-txt {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 15.5px;
  font-weight: 700;
  color: #0F172A;
}

.user-id-chip {
  font-size: 11.5px;
  color: #64748B;
  font-weight: 600;
}

.email-code-pill {
  color: #334155;
  font-size: 14.5px;
  font-weight: 500;
}

.dept-text {
  font-size: 14px;
  color: #334155;
  font-weight: 500;
}

.role-pill-badge {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
}

.role-admin { background: #E2E8F0; color: #0F172A; }
.role-manager { background: #FEF08A; color: #0F172A; }
.role-kasir { background: #BFDBFE; color: #0F172A; }
.role-owner { background: #BBF7D0; color: #0F172A; }

.status-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
}

.status-active { background: #BBF7D0; color: #0F172A; }
.status-locked { background: #FECACA; color: #0F172A; }

.status-dot-mini {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.btn-action-edit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1px solid #EADBCC;
  color: #5A3A28;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(61, 34, 20, 0.05);
}

.btn-action-edit:hover:not(:disabled) {
  background: #FAF5EE;
  border-color: #D6C3B1;
  color: #3D2214;
}

/* Table 2: RBAC Matrix Table */
.aesthetic-matrix-table {
  width: 100%;
  border-collapse: collapse;
}

.aesthetic-matrix-table thead th {
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #6B5A52;
  background: #FAF8F5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
  border-bottom: 1px solid #E5E7EB;
}

.role-th-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.th-role-name {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #111111;
}

.th-role-sub {
  font-size: 11px;
  color: #4B5563;
  font-weight: 600;
}

.matrix-row {
  background: #FFFFFF;
  border-bottom: 1px solid #F3F4F6;
  transition: all 0.2s ease;
}

.matrix-row:hover {
  background: #F9FAFB;
}

.matrix-row td {
  padding: 16px 20px;
  font-size: 14px;
  vertical-align: middle;
  color: #2C1A13;
}

.module-title-txt {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 6px;
}

.module-desc-txt {
  font-size: 12.5px;
  color: #64748B;
  line-height: 1.5;
  padding-right: 12px;
}

.matrix-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
}

.tag-full { background: #BBF7D0; color: #0F172A; }
.tag-read { background: #FEF08A; color: #0F172A; }
.tag-pos { background: #BFDBFE; color: #0F172A; }
.tag-locked { background: #F1F5F9; color: #64748B; }

.text-right { text-align: right !important; }
.text-center { text-align: center !important; }

.matrix-inline-select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #E2D9CE;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: #3D2214;
  background-color: #FFFFFF;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 6px center;
  background-size: 14px;
  padding-right: 28px;
}

.select-full { background-color: #BBF7D0; color: #0F172A; border-color: #86EFAC; }
.select-read { background-color: #FEF08A; color: #0F172A; border-color: #FDE047; }
.select-pos { background-color: #BFDBFE; color: #0F172A; border-color: #93C5FD; }
.select-locked { background-color: #F1F5F9; color: #64748B; border-color: #E2E8F0; }

.matrix-inline-select:focus {
  border-color: #F59E0B;
}

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

.modal-kicker {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.modal-header h3 {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
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
  background: #FFFFFF;
  border: 1px solid #D6C3B1;
  color: #5A3A28;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #FAF5EE;
}

.btn-primary-modal {
  background: #3D2214;
  color: #FFFFFF;
  border: 1px solid transparent;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(61, 34, 20, 0.1);
}

.btn-primary-modal:hover {
  background: #502D1A;
}

@media (max-width: 768px) {
  .header-cocoa-decor {
    display: none;
  }
}
</style>
