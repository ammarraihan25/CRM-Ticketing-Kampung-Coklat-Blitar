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

export const useAuth = () => {
  const currentRole = useState<UserRole>('auth_role', () => 'admin')
  const token = useState<string | null>('auth_token', () => 'dummy-jwt-token-kampung-coklat')

  const user = computed<UserProfile>(() => mockUsers[currentRole.value])

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => currentRole.value === 'admin')
  const isManager = computed(() => currentRole.value === 'manager')
  const isOwner = computed(() => currentRole.value === 'owner')
  const isKasir = computed(() => currentRole.value === 'kasir')
  const isReadOnly = computed(() => currentRole.value === 'owner')

  // Permission helpers
  const canManageConfig = computed(() => currentRole.value === 'admin')
  const canViewReports = computed(() => ['admin', 'manager', 'owner'].includes(currentRole.value))
  const canManagePOS = computed(() => ['admin', 'kasir'].includes(currentRole.value))
  const canExportData = computed(() => ['admin', 'manager', 'owner'].includes(currentRole.value))

  const loginAs = (role: UserRole) => {
    currentRole.value = role
    token.value = `dummy-jwt-${role}-token`
  }

  const logout = () => {
    token.value = null
    currentRole.value = 'admin'
    navigateTo('/login')
  }

  return {
    currentRole,
    user,
    token,
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
    loginAs,
    logout
  }
}
