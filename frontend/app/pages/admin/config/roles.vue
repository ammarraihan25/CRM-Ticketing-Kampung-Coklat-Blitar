<template>
  <div class="roles-page">
    <!-- Header -->
    <header class="config-header">
      <div>
        <div class="badge-tag">
          <span>👥 Keamanan & Hak Akses (RBAC)</span>
        </div>
        <h1 class="page-title">Manajemen Role & Permission Matrix</h1>
        <p class="page-subtitle">
          Pengaturan akun pengguna staf internal, penetapan role (Admin, Manager, Kasir, Owner), dan matriks hak akses.
        </p>
      </div>

      <div class="header-actions">
        <button 
          v-if="canManageConfig"
          type="button" 
          class="btn-primary"
          @click="openAddUserModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Penambahan akun dan perubahan hak akses permission sistem hanya dapat dilakukan oleh Super Admin.
      </div>
    </div>

    <!-- Section 1: Staff Accounts Table -->
    <section class="config-section">
      <div class="section-head">
        <div>
          <h2 class="section-title">1. Daftar Akun Pengguna Staf</h2>
          <span class="section-subtitle">Daftar petugas POS, tim manajemen, dan dewan direksi yang terdaftar di sistem</span>
        </div>
      </div>

      <div class="content-card">
        <div class="table-responsive">
          <table class="config-table">
            <thead>
              <tr>
                <th>Nama Pengguna</th>
                <th>Email ID</th>
                <th>Departemen / Unit</th>
                <th>Role Akses</th>
                <th>Status Akun</th>
                <th class="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in usersList" :key="u.id">
                <td>
                  <div class="user-cell">
                    <span class="avatar-sm">{{ u.avatar }}</span>
                    <div>
                      <strong class="user-name">{{ u.name }}</strong>
                      <div class="user-id">ID: {{ u.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="font-mono">{{ u.email }}</td>
                <td>{{ u.department }}</td>
                <td>
                  <span class="role-badge-pill" :class="`pill-role-${u.role}`">
                    {{ u.roleTitle }}
                  </span>
                </td>
                <td>
                  <span class="status-indicator" :class="u.isActive ? 'active' : 'inactive'">
                    ● {{ u.isActive ? 'Aktif' : 'Terkunci' }}
                  </span>
                </td>
                <td class="text-right">
                  <button 
                    type="button" 
                    class="btn-secondary btn-sm"
                    :disabled="!canManageConfig"
                    @click="editUser(u)"
                  >
                    Edit Akun
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Section 2: Permission Matrix Grid -->
    <section class="config-section">
      <div class="section-head">
        <div>
          <h2 class="section-title">2. Matriks Hak Akses & Kewenangan Fitur (Permission Matrix)</h2>
          <span class="section-subtitle">Struktur hak baca (Read), tulis (Write), dan eksekusi per peran pengguna</span>
        </div>
      </div>

      <div class="content-card">
        <div class="table-responsive">
          <table class="matrix-table">
            <thead>
              <tr>
                <th style="width: 280px;">Modul / Fitur Sistem</th>
                <th class="text-center role-th th-admin">
                  <div class="role-header-box">
                    <span>👨💼 Admin</span>
                    <small>Full System Control</small>
                  </div>
                </th>
                <th class="text-center role-th th-manager">
                  <div class="role-header-box">
                    <span>👔 Manager</span>
                    <small>Monitoring & Evaluasi</small>
                  </div>
                </th>
                <th class="text-center role-th th-kasir">
                  <div class="role-header-box">
                    <span>🧾 Kasir FO</span>
                    <small>Frontliner POS</small>
                  </div>
                </th>
                <th class="text-center role-th th-owner">
                  <div class="role-header-box">
                    <span>👑 Owner</span>
                    <small>Executive Read-Only</small>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in permissionMatrix" :key="item.module">
                <td>
                  <div class="module-title">{{ item.module }}</div>
                  <div class="module-desc">{{ item.description }}</div>
                </td>
                <td class="text-center">
                  <span class="perm-tag" :class="item.admin ? 'perm-yes' : 'perm-no'">
                    {{ item.admin ? '✓ Full Akses' : '✕ Tidak Ada' }}
                  </span>
                </td>
                <td class="text-center">
                  <span class="perm-tag" :class="item.manager === 'READ' ? 'perm-read' : item.manager ? 'perm-yes' : 'perm-no'">
                    {{ item.manager === 'READ' ? '👁️ Read-Only' : item.manager ? '✓ Full Akses' : '✕ Terkunci' }}
                  </span>
                </td>
                <td class="text-center">
                  <span class="perm-tag" :class="item.kasir ? 'perm-yes' : 'perm-no'">
                    {{ item.kasir ? '✓ Operasional' : '✕ Terkunci' }}
                  </span>
                </td>
                <td class="text-center">
                  <span class="perm-tag" :class="item.owner === 'READ' ? 'perm-read' : item.owner ? 'perm-yes' : 'perm-no'">
                    {{ item.owner === 'READ' ? '👁️ Read-Only' : item.owner ? '✓ Full Akses' : '✕ Terkunci' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Modal User Form -->
    <div v-if="showUserModal" class="modal-backdrop" @click.self="showUserModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ isEditing ? `Edit Akun: ${userForm.name}` : 'Tambah Akun Staf Baru' }}</h3>
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
            <button type="submit" class="btn-primary">Simpan Akun Staf</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth, type UserRole } from '~/composables/useAuth'

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
    id: 'USR-MGR-01',
    name: 'Dewi Lestari, S.E.',
    email: 'manager.ops@kampungcoklat.id',
    role: 'manager',
    roleTitle: 'Operational Manager',
    department: 'Manajemen Operasional',
    avatar: '👔',
    isActive: true
  },
  {
    id: 'USR-OWN-01',
    name: 'H. Kholid Mustofa',
    email: 'owner@kampungcoklat.id',
    role: 'owner',
    roleTitle: 'Owner / Direksi Utama',
    department: 'Dewan Eksekutif',
    avatar: '👑',
    isActive: true
  },
  {
    id: 'USR-KAS-04',
    name: 'Siti Rahmawati',
    email: 'kasir.gate1@kampungcoklat.id',
    role: 'kasir',
    roleTitle: 'Kasir Front Office',
    department: 'Front Office POS',
    avatar: '🧾',
    isActive: true
  },
  {
    id: 'USR-KAS-05',
    name: 'Rudi Hartono',
    email: 'kasir.terusan@kampungcoklat.id',
    role: 'kasir',
    roleTitle: 'Kasir Front Office',
    department: 'POS Terusan & Wahana',
    avatar: '🧾',
    isActive: true
  }
])

const permissionMatrix = [
  {
    module: 'Executive Dashboard & Overview',
    description: 'Melihat ringkasan metrik KPI harian, grafik tren pendapatan, dan live gate-in.',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Reports & Evaluasi Finansial (GTV)',
    description: 'Akses penuh laporan pendapatan historis, omzet tiket, dan ekspor PDF/Excel.',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'Database CRM & Segmentasi Member',
    description: 'Melihat direktori kontak WhatsApp, domisili, dan memicu broadcast promo.',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    module: 'POS Kasir & Checkout Transaksi',
    description: 'Melayani penjualan tiket walk-in, input domisili, dan redeem voucher.',
    admin: true,
    manager: false,
    kasir: true,
    owner: false
  },
  {
    module: 'Web QR Gate Scanner (Turnstile)',
    description: 'Memindai tiket dinamis QR code pengunjung di gerbang masuk.',
    admin: true,
    manager: false,
    kasir: true,
    owner: false
  },
  {
    module: 'Atur Tarif & Harga Tiket Masuk',
    description: 'Konfigurasi harga tiket reguler, terusan, rombongan B2B, dan edukasi.',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  },
  {
    module: 'Atur Katalog Wahana & Atraksi',
    description: 'Menambah wahana baru, status operasional (Buka/Maintenance), dan kuota.',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  },
  {
    module: 'Atur Diskon & Promo CRM',
    description: 'Membuat kupon diskon persentase dan promo Free Ticket Pengajian.',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  },
  {
    module: 'Manajemen User & Hak Akses Role',
    description: 'Membuat akun staf baru dan mengatur izin permission RBAC.',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  }
]

const showUserModal = ref(false)
const isEditing = ref(false)

const userForm = reactive({
  id: '',
  name: '',
  email: '',
  role: 'kasir' as UserRole,
  department: 'Front Office POS',
  avatar: '🧾',
  isActive: true
})

const openAddUserModal = () => {
  isEditing.value = false
  userForm.id = `USR-${Date.now().toString().slice(-4)}`
  userForm.name = ''
  userForm.email = ''
  userForm.role = 'kasir'
  userForm.department = 'Front Office POS'
  userForm.avatar = '🧾'
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
  userForm.avatar = u.avatar
  userForm.isActive = u.isActive
  showUserModal.value = true
}

const saveUser = () => {
  const getRoleTitle = (r: UserRole) => {
    switch (r) {
      case 'admin': return 'Super Admin'
      case 'manager': return 'Operational Manager'
      case 'owner': return 'Owner / Direksi'
      case 'kasir': default: return 'Kasir Front Office'
    }
  }

  const getAvatar = (r: UserRole) => {
    switch (r) {
      case 'admin': return '👨💼'
      case 'manager': return '👔'
      case 'owner': return '👑'
      case 'kasir': default: return '🧾'
    }
  }

  if (isEditing.value) {
    const existing = usersList.value.find(u => u.id === userForm.id)
    if (existing) {
      existing.name = userForm.name
      existing.email = userForm.email
      existing.role = userForm.role
      existing.roleTitle = getRoleTitle(userForm.role)
      existing.department = userForm.department
      existing.avatar = getAvatar(userForm.role)
      existing.isActive = userForm.isActive
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
  alert('[SUKSES] Akun staf berhasil disimpan!')
}
</script>

<style scoped>
.roles-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
}

.config-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(242, 151, 39, 0.15);
  color: #B45309;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 4px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.page-subtitle {
  font-size: 13px;
  color: #6B5A52;
  margin: 0;
}

.read-only-pill {
  background-color: #FEF3C7;
  color: #92400E;
  border: 1px solid #FDE68A;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
}

.role-warning-banner {
  background-color: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-head {
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 8px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.section-subtitle {
  font-size: 12.5px;
  color: #6B5A52;
}

.content-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
}

.table-responsive { overflow-x: auto; }

.config-table, .matrix-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.config-table th, .matrix-table th {
  background-color: #FAF8F5;
  color: #6B5A52;
  font-size: 11.5px;
  text-transform: uppercase;
  padding: 10px 12px;
  border-bottom: 1px solid #E5E7EB;
  text-align: left;
}

.config-table td, .matrix-table td {
  padding: 12px;
  border-bottom: 1px solid #F3F4F6;
  color: var(--color-primary, #2C1A13);
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-sm { font-size: 20px; }
.user-name { color: var(--color-primary, #2C1A13); font-size: 13.5px; }
.user-id { font-size: 11px; color: #9CA3AF; }

.role-badge-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.pill-role-admin { background-color: #ECFDF5; color: #047857; }
.pill-role-manager { background-color: #EFF6FF; color: #1D4ED8; }
.pill-role-owner { background-color: #FEF3C7; color: #92400E; }
.pill-role-kasir { background-color: #F3F4F6; color: #374151; }

.status-indicator { font-size: 12px; font-weight: 600; }
.status-indicator.active { color: #047857; }
.status-indicator.inactive { color: #DC2626; }

/* Permission Matrix Specific Styles */
.role-header-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.role-header-box span { font-weight: 700; color: var(--color-primary, #2C1A13); }
.role-header-box small { font-size: 10px; color: #6B5A52; text-transform: none; }

.module-title { font-weight: 600; color: var(--color-primary, #2C1A13); font-size: 13.5px; }
.module-desc { font-size: 11px; color: #6B5A52; line-height: 1.3; }

.perm-tag {
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
}

.perm-yes { background-color: #ECFDF5; color: #047857; }
.perm-read { background-color: #FEF3C7; color: #92400E; }
.perm-no { background-color: #F3F4F6; color: #9CA3AF; }

.text-center { text-align: center; }
.text-right { text-align: right; }
.font-mono { font-family: monospace; }
.btn-sm { height: 32px; font-size: 12px; padding: 0 12px; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(44, 26, 19, 0.65);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  padding: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 10px;
}

.modal-header h3 {
  font-size: 16px;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary, #2C1A13);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.input-control, .filter-select {
  padding: 8px 10px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
}

.full-width { width: 100%; }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #E5E7EB;
  padding-top: 12px;
}
</style>
