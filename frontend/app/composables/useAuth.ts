import { computed } from 'vue'

export type UserRole = 'admin' | 'manager' | 'owner' | 'kasir'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  roleTitle: string
  avatar: string
  department: string
}

export interface RbacPermissionItem {
  id: string
  module: string
  description: string
  admin: boolean | 'READ'
  manager: boolean | 'READ'
  kasir: boolean | 'READ'
  owner: boolean | 'READ'
}

export const defaultRbacMatrix: RbacPermissionItem[] = [
  {
    id: 'dashboard',
    module: 'Dashboard Finansial & GTV',
    description: 'Akses ringkasan eksekutif, grafik tren, dan metrik revenue',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    id: 'audit_shift',
    module: 'Audit Rekonsiliasi Shift Kasir',
    description: 'Approval selisih kas fisik dan validasi serah terima shift',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    id: 'tarif_wahana',
    module: 'Konfigurasi Tarif Tiket & Wahana',
    description: 'Ubah harga tiket masuk, paket edukasi, dan status operasional',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    id: 'diskon_promo',
    module: 'Pengaturan Diskon & Promo CRM',
    description: 'Pembuatan voucher diskon, free ticket majlis (PP), dan blast WA',
    admin: true,
    manager: 'READ',
    kasir: false,
    owner: 'READ'
  },
  {
    id: 'pos_terminal',
    module: 'Terminal Transaksi POS Kasir',
    description: 'Input penjualan tiket, cetak barcode wristband, refund & void',
    admin: true,
    manager: false,
    kasir: true,
    owner: false
  },
  {
    id: 'laporan_ekspor',
    module: 'Laporan & Ekspor Data (PDF / Excel)',
    description: 'Download riwayat transaksi, demografi, dan log audit staf',
    admin: true,
    manager: true,
    kasir: false,
    owner: 'READ'
  },
  {
    id: 'manajemen_rbac',
    module: 'Manajemen Role & Staf (RBAC)',
    description: 'Tambah staf baru, ganti role pengguna, dan reset password',
    admin: true,
    manager: false,
    kasir: false,
    owner: false
  }
]

const mockUsers: Record<UserRole, UserProfile> = {
  admin: {
    id: 'USR-ADM-01',
    name: 'Bagus Prakoso',
    email: 'admin@kampungcoklat.id',
    role: 'admin',
    roleTitle: 'Super Administrator',
    avatar: '👨💼',
    department: 'IT & System Operations'
  },
  manager: {
    id: 'USR-MGR-01',
    name: 'Dewi Lestari, S.E.',
    email: 'manager.ops@kampungcoklat.id',
    role: 'manager',
    roleTitle: 'Operational Manager',
    avatar: '👔',
    department: 'Manajemen Operasional & Keuangan'
  },
  owner: {
    id: 'USR-OWN-01',
    name: 'H. Kholid Mustofa',
    email: 'owner@kampungcoklat.id',
    role: 'owner',
    roleTitle: 'Owner / Direksi Utama',
    avatar: '👑',
    department: 'Dewan Eksekutif'
  },
  kasir: {
    id: 'USR-KAS-04',
    name: 'Siti Rahmawati',
    email: 'kasir.gate1@kampungcoklat.id',
    role: 'kasir',
    roleTitle: 'Front Office Cashier',
    avatar: '🧾',
    department: 'Front Office POS'
  }
}

const normalizeMatrix = (raw: any[]): RbacPermissionItem[] => {
  if (!raw || !Array.isArray(raw) || raw.length === 0) {
    return JSON.parse(JSON.stringify(defaultRbacMatrix))
  }
  return defaultRbacMatrix.map(defaultItem => {
    const existing = raw.find(r => r && (r.id === defaultItem.id || r.module === defaultItem.module))
    if (!existing) return { ...defaultItem }
    return {
      id: defaultItem.id,
      module: defaultItem.module,
      description: defaultItem.description,
      admin: existing.admin !== undefined ? existing.admin : defaultItem.admin,
      manager: existing.manager !== undefined ? existing.manager : defaultItem.manager,
      kasir: existing.kasir !== undefined ? existing.kasir : defaultItem.kasir,
      owner: existing.owner !== undefined ? existing.owner : defaultItem.owner
    }
  })
}

export const useAuth = () => {
  const roleCookie = useCookie<UserRole>('kc_auth_role', { default: () => 'admin', path: '/', watch: true })
  const rbacCookie = useCookie<RbacPermissionItem[]>('kc_rbac_matrix', { default: () => defaultRbacMatrix, path: '/', watch: true })

  const currentRole = useState<UserRole>('auth_role', () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('kc_active_role') as UserRole
        if (stored && ['admin', 'manager', 'kasir', 'owner'].includes(stored)) {
          return stored
        }
      } catch {}
    }
    return roleCookie.value || 'admin'
  })

  const token = useState<string | null>('auth_token', () => `dummy-jwt-${currentRole.value}-token`)
  
  const rbacMatrix = useState<RbacPermissionItem[]>('rbac_matrix', () => {
    return normalizeMatrix(rbacCookie.value)
  })

  // Synchronize from client storage on mount if available
  if (process.client) {
    try {
      const stored = localStorage.getItem('kc_active_role') as UserRole
      if (stored && ['admin', 'manager', 'kasir', 'owner'].includes(stored) && currentRole.value !== stored) {
        currentRole.value = stored
        roleCookie.value = stored
        token.value = `dummy-jwt-${stored}-token`
      }
    } catch {}
  }

  // Keep state synchronized with cookie changes
  watch(roleCookie, (newRole) => {
    if (newRole && currentRole.value !== newRole) {
      currentRole.value = newRole
      token.value = `dummy-jwt-${newRole}-token`
      if (process.client) {
        try { localStorage.setItem('kc_active_role', newRole) } catch {}
      }
    }
  })

  watch(rbacCookie, (newMatrix) => {
    if (newMatrix) {
      rbacMatrix.value = normalizeMatrix(newMatrix)
    }
  }, { deep: true })

  const user = computed<UserProfile>(() => mockUsers[currentRole.value] || mockUsers.admin)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => currentRole.value === 'admin')
  const isManager = computed(() => currentRole.value === 'manager')
  const isOwner = computed(() => currentRole.value === 'owner')
  const isKasir = computed(() => currentRole.value === 'kasir')
  const isReadOnly = computed(() => currentRole.value === 'owner')

  // Dynamic RBAC Evaluator based on reactive rbacMatrix
  const getModuleAccess = (moduleId: string, role?: UserRole): boolean | 'READ' => {
    try {
      const targetRole = role || currentRole.value
      const matrix = (rbacMatrix.value && Array.isArray(rbacMatrix.value)) ? rbacMatrix.value : defaultRbacMatrix
      const found = matrix.find(m => m && (m.id === moduleId || m.module === moduleId))
      if (!found) return targetRole === 'admin'
      const val = found[targetRole]
      if (val === 'READ') return 'READ'
      return val === true || val === 'true'
    } catch {
      return (role || currentRole.value) === 'admin'
    }
  }

  // Can view module (either full or read-only)
  const canAccessModule = (moduleId: string): boolean => {
    const access = getModuleAccess(moduleId)
    return access === true || access === 'READ'
  }

  // Can write / edit / execute on module
  const canWriteModule = (moduleId: string): boolean => {
    return getModuleAccess(moduleId) === true
  }

  // Is module in read-only mode for current user
  const isModuleReadOnly = (moduleId: string): boolean => {
    return getModuleAccess(moduleId) === 'READ'
  }

  // Permission helpers
  const canManageConfig = computed(() => canWriteModule('manajemen_rbac') || canWriteModule('tarif_wahana'))
  const canViewReports = computed(() => canAccessModule('laporan_ekspor'))
  const canManagePOS = computed(() => canAccessModule('pos_terminal'))
  const canExportData = computed(() => canAccessModule('laporan_ekspor'))

  const updateRbacMatrix = (newMatrix: RbacPermissionItem[]) => {
    const sanitized = normalizeMatrix(newMatrix)
    rbacMatrix.value = sanitized
    rbacCookie.value = sanitized
  }

  const resetRbacMatrix = () => {
    const sanitized = JSON.parse(JSON.stringify(defaultRbacMatrix))
    rbacMatrix.value = sanitized
    rbacCookie.value = sanitized
  }

  const setRole = (role: UserRole) => {
    currentRole.value = role
    roleCookie.value = role
    token.value = `dummy-jwt-${role}-token`
    if (process.client) {
      try { localStorage.setItem('kc_active_role', role) } catch {}
    }
  }

  const loginAs = (role: UserRole) => {
    setRole(role)
  }

  const logout = () => {
    token.value = null
    if (process.client) {
      try { localStorage.removeItem('kc_active_role') } catch {}
    }
    navigateTo('/login')
  }

  return {
    currentRole,
    user,
    token,
    rbacMatrix,
    isAuthenticated,
    isAdmin,
    isManager,
    isOwner,
    isKasir,
    isReadOnly,
    canManageConfig,
    canViewReports,
    canManagePOS,
    canExportData,
    getModuleAccess,
    canAccessModule,
    canWriteModule,
    isModuleReadOnly,
    updateRbacMatrix,
    resetRbacMatrix,
    setRole,
    loginAs,
    logout
  }
}
