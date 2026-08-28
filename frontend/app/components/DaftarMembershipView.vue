<script setup lang="ts">
import { ref, computed, watch } from 'vue'



type MembershipStatus = 'Pending' | 'Approved' | 'Rejected'

interface MembershipApplication {
  id: number
  name: string
  idNumber: string
  phone: string
  address: string
  type: string
  date: string
  status: MembershipStatus
  historyCheckIn?: number
}

// Dummy data representing self-service membership registrations
const membershipList = ref<MembershipApplication[]>([
  {
    id: 1,
    name: 'Budi Santoso',
    idNumber: '3505123456789012',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 1, Blitar',
    type: 'Regular',
    date: '2024-05-12',
    status: 'Pending',
    historyCheckIn: 3
  },
  {
    id: 2,
    name: 'Siti Aminah',
    idNumber: '3505987654321098',
    phone: '085712345678',
    address: 'Jl. Mawar No. 10, Kediri',
    type: 'Pengajian',
    date: '2024-06-01',
    status: 'Pending',
    historyCheckIn: 12
  },
  {
    id: 3,
    name: 'Andi Saputra',
    idNumber: '3505678901234567',
    phone: '081987654321',
    address: 'Jl. Melati No. 5, Malang',
    type: 'Tour',
    date: '2024-06-15',
    status: 'Approved',
    historyCheckIn: 0
  }
])

const getTypeClass = (type: string) => {
  if (type === 'Pengajian') return 'badge-pengajian'
  if (type === 'Tour') return 'badge-tour'
  return 'badge-regular'
}

const getStatusClass = (status: MembershipStatus) => {
  if (status === 'Approved') return 'status-approved'
  if (status === 'Rejected') return 'status-rejected'
  return 'status-pending'
}

// Metrics
const countPending = computed(() => membershipList.value.filter(m => m.status === 'Pending').length)
const countApproved = computed(() => membershipList.value.filter(m => m.status === 'Approved').length)
const countTotal = computed(() => membershipList.value.length)

// Search & Debounce
const searchQuery = ref('')
const debouncedSearch = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = newVal
  }, 400)
})

const filteredMembershipList = computed(() => {
  if (!debouncedSearch.value) return membershipList.value
  const q = debouncedSearch.value.toLowerCase()
  return membershipList.value.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.idNumber.toLowerCase().includes(q)
  )
})

// Modal State
const isModalOpen = ref(false)
const selectedApp = ref<MembershipApplication | null>(null)

const openReviewModal = (member: MembershipApplication) => {
  selectedApp.value = member
  isModalOpen.value = true
}

const closeReviewModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedApp.value = null
  }, 300)
}

const handleApprove = () => {
  if (selectedApp.value) {
    const index = membershipList.value.findIndex(m => m.id === selectedApp.value?.id)
    if (index !== -1) {
      membershipList.value[index].status = 'Approved'
    }
  }
  closeReviewModal()
}

const handleReject = () => {
  if (selectedApp.value) {
    const index = membershipList.value.findIndex(m => m.id === selectedApp.value?.id)
    if (index !== -1) {
      membershipList.value[index].status = 'Rejected'
    }
  }
  closeReviewModal()
}
</script>

<template>
  <div class="daftar-membership-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Validasi Pendaftaran Membership</h1>
        <p class="page-subtitle">Verifikasi data pendaftar dari mesin kiosk Self-Service sebelum disetujui menjadi Member.</p>
      </div>
    </header>

    <!-- Metrics Cards -->
    <div class="metrics-grid">
      <div class="metric-card border-orange">
        <div class="metric-icon bg-orange-light text-orange">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="metric-content">
          <p class="metric-label">Menunggu Validasi</p>
          <h2 class="metric-value">{{ countPending }} <span class="metric-unit">Antrean</span></h2>
        </div>
      </div>

      <div class="metric-card border-green">
        <div class="metric-icon bg-green-light text-green">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
        </div>
        <div class="metric-content">
          <p class="metric-label">Disetujui Hari Ini</p>
          <h2 class="metric-value">{{ countApproved }} <span class="metric-unit">Member Baru</span></h2>
        </div>
      </div>

      <div class="metric-card border-blue">
        <div class="metric-icon bg-blue-light text-blue">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <div class="metric-content">
          <p class="metric-label">Total Pendaftaran Masuk</p>
          <h2 class="metric-value">{{ countTotal }} <span class="metric-unit">Data</span></h2>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-card">
      <div class="table-toolbar">
        <h2 class="table-title">Daftar Antrean Verifikasi</h2>
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input v-model="searchQuery" type="text" placeholder="Cari nama atau No. Identitas..." class="search-input" />
        </div>
      </div>
      
      <div class="table-responsive">
        <table class="membership-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Informasi Pendaftar</th>
              <th>Kontak & Domisili</th>
              <th>Pengajuan Tipe</th>
              <th>Waktu Submit</th>
              <th>Status Verifikasi</th>
              <th width="100">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredMembershipList.length === 0">
              <td colspan="7" class="text-center">
                <span v-if="searchQuery">Tidak ada hasil ditemukan untuk "{{ searchQuery }}"</span>
                <span v-else>Belum ada data pendaftaran membership.</span>
              </td>
            </tr>
            <tr v-for="member in filteredMembershipList" :key="member.id">
              <td class="font-bold">#{{ member.id }}</td>
              <td>
                <div class="info-group">
                  <span class="info-primary">{{ member.name }}</span>
                  <span class="info-secondary font-mono">ID: {{ member.idNumber }}</span>
                </div>
              </td>
              <td>
                <div class="info-group">
                  <span class="info-primary font-mono">{{ member.phone }}</span>
                  <span class="info-secondary truncate-address">{{ member.address }}</span>
                </div>
              </td>
              <td>
                <span class="type-badge" :class="getTypeClass(member.type)">{{ member.type }}</span>
              </td>
              <td class="text-gray">{{ member.date }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(member.status)">
                  <span class="status-dot"></span>
                  {{ member.status }}
                </span>
              </td>
              <td>
                <button v-if="member.status === 'Pending'" class="btn-review" @click="openReviewModal(member)">
                  Review
                </button>
                <button v-else class="btn-view-only" @click="openReviewModal(member)">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Slide-over Modal -->
    <div class="modal-backdrop" :class="{ 'is-open': isModalOpen }" @click="closeReviewModal">
      <div class="slide-panel" :class="{ 'is-open': isModalOpen }" @click.stop>
        
        <div v-if="selectedApp" class="panel-inner">
          <div class="panel-header">
            <div>
              <h3 class="panel-title">Review Pendaftaran</h3>
              <p class="panel-subtitle">Verifikasi kebenaran identitas</p>
            </div>
            <button class="btn-close-modal" @click="closeReviewModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="panel-content">
            <!-- Alert if checking Guestbook matching -->
            <div class="guestbook-alert" v-if="selectedApp.historyCheckIn && selectedApp.historyCheckIn > 0">
              <svg class="gb-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <div>
                <strong>Terkoneksi ke Guestbook</strong>
                <p>Nomor HP ini memiliki {{ selectedApp.historyCheckIn }} riwayat kedatangan di sistem.</p>
              </div>
            </div>

            <!-- Identitas Card -->
            <div class="detail-section">
              <h4 class="section-heading">DATA PEMOHON</h4>
              <div class="data-grid">
                <div class="data-group">
                  <label>Nama Lengkap</label>
                  <p>{{ selectedApp.name }}</p>
                </div>
                <div class="data-group">
                  <label>Tipe Membership</label>
                  <p><span class="type-badge" :class="getTypeClass(selectedApp.type)">{{ selectedApp.type }}</span></p>
                </div>
                <div class="data-group">
                  <label>No. Identitas (KTP/KIA)</label>
                  <p class="font-mono" style="letter-spacing: 1px;">{{ selectedApp.idNumber }}</p>
                </div>
                <div class="data-group">
                  <label>No. Whatsapp</label>
                  <p class="font-mono">{{ selectedApp.phone }}</p>
                </div>
                <div class="data-group full-width">
                  <label>Alamat Lengkap</label>
                  <p>{{ selectedApp.address }}</p>
                </div>
              </div>
            </div>

            <!-- Simulasi KTP Placeholder -->
            <div class="detail-section">
              <h4 class="section-heading">LAMPIRAN IDENTITAS</h4>
              <div class="ktp-placeholder">
                <div class="ktp-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:10px; opacity:0.5;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <p>Salinan Identitas Tersimpan di Server</p>
                  <span class="ktp-status">Telah di-scan via Kiosk 1</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="panel-footer" v-if="selectedApp.status === 'Pending'">
            <button class="btn-reject-full" @click="handleReject">
              Tolak Data
            </button>
            <button class="btn-approve-full" @click="handleApprove">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Setujui & Buat Kartu Digital
            </button>
          </div>
          <div class="panel-footer" v-else>
            <div class="status-banner" :class="selectedApp.status === 'Approved' ? 'bg-green-light text-green' : 'bg-red-light text-red'">
              Pendaftaran ini telah berstatus <strong>{{ selectedApp.status }}</strong>.
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.daftar-membership-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100%;
  margin: 0;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  color: #6B7280;
  font-size: 12px;
  margin: 0;
}

.btn-outline {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #D1D5DB;
  color: #374151;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #F9FAFB;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #E5E7EB;
  border-left-width: 4px;
}
.metric-card.border-orange { border-left-color: #F59E0B; }
.metric-card.border-green { border-left-color: #10B981; }
.metric-card.border-blue { border-left-color: #3B82F6; }

.metric-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg-orange-light { background: #FEF3C7; } .text-orange { color: #D97706; }
.bg-green-light { background: #D1FAE5; } .text-green { color: #059669; }
.bg-blue-light { background: #DBEAFE; } .text-blue { color: #2563EB; }
.bg-red-light { background: #FEE2E2; } .text-red { color: #DC2626; }

.metric-label {
  font-size: 12.5px;
  font-weight: 600;
  color: #6B7280;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.metric-unit {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
}


/* Table */
.table-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.table-toolbar {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E5E7EB;
}

.table-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #8BA3CB;
  pointer-events: none;
}

.search-input {
  padding: 8px 16px 8px 36px;
  background-color: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 99px;
  font-size: 14px;
  font-weight: 400;
  color: #1E293B;
  min-width: 240px;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
  height: 38px;
}

.search-input::placeholder {
  color: #8BA3CB;
  font-weight: 400;
}

.search-input:focus {
  background-color: #FFFFFF;
  border-color: #D97706;
  box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
}

.table-responsive {
  overflow-x: auto;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.membership-table {
  width: 100%;
  border-collapse: collapse;
}

.membership-table th {
  background-color: #F9FAFB;
  padding: 14px 20px;
  text-align: left;
  font-size: 10.5px;
  font-weight: 700;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #E5E7EB;
  white-space: nowrap;
}

.membership-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 12px;
  color: #374151;
  vertical-align: middle;
  white-space: nowrap;
}

.membership-table tr:last-child td { border-bottom: none; }
.membership-table tr:hover { background: #F9FAFB; }

.info-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.info-primary {
  font-weight: 600;
  color: #111827;
}
.info-secondary {
  font-size: 12.5px;
  color: #6B7280;
}
.truncate-address {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.font-bold { font-weight: 700; color: #111827; }
.font-mono { font-family: inherit; font-size: inherit !important; letter-spacing: 0px; }
.text-gray { color: #6B7280; font-size: 13px; }
.text-center { text-align: center; color: #6B7280; padding: 40px !important; }

/* Badges */
.type-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
.badge-regular { background: #FEF3C7; color: #B45309; }
.badge-pengajian { background: #DBEAFE; color: #1D4ED8; }
.badge-tour { background: #EDE9FE; color: #6D28D9; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.status-pending { background: #F3F4F6; color: #4B5563; }
.status-pending .status-dot { background: #9CA3AF; }

.status-approved { background: #D1FAE5; color: #065F46; }
.status-approved .status-dot { background: #10B981; }

.status-rejected { background: #FEE2E2; color: #991B1B; }
.status-rejected .status-dot { background: #EF4444; }


/* Buttons */
.btn-review {
  background: #111827;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-review:hover { background: #374151; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

.btn-view-only {
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 7px 13px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-view-only:hover { background: #F9FAFB; }


/* ================= Slide-over Modal ================= */
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}
.modal-backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

.slide-panel {
  position: absolute;
  top: 0; right: -500px;
  width: 480px;
  height: 100%;
  background: #F8FAFC;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}
.slide-panel.is-open { right: 0; }

.panel-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  padding: 24px 32px;
  background: white;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.panel-title {
  font-size: 20px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 4px 0;
}
.panel-subtitle {
  font-size: 12px;
  color: #64748B;
  margin: 0;
}
.btn-close-modal {
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}
.btn-close-modal:hover { background: #F1F5F9; color: #0F172A; }

.panel-content {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

.guestbook-alert {
  display: flex;
  gap: 16px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  color: #1E3A8A;
}
.guestbook-alert .gb-icon { color: #2563EB; flex-shrink: 0; margin-top: 2px; }
.guestbook-alert strong { display: block; font-size: 12px; font-weight: 700; margin-bottom: 4px; }
.guestbook-alert p { font-size: 13px; margin: 0; opacity: 0.9; }


.detail-section {
  margin-bottom: 32px;
}
.section-heading {
  font-size: 12px;
  font-weight: 800;
  color: #94A3B8;
  margin: 0 0 16px 0;
  letter-spacing: 1px;
}

.data-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}
.data-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.data-group.full-width { grid-column: 1 / -1; }

.data-group label {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
}
.data-group p {
  font-size: 14.5px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.ktp-placeholder {
  background: white;
  border: 2px dashed #CBD5E1;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.ktp-inner p {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  margin: 0 0 6px 0;
}
.ktp-status {
  font-size: 12px;
  color: #10B981;
  font-weight: 600;
}

.panel-footer {
  padding: 24px 32px;
  background: white;
  border-top: 1px solid #E2E8F0;
  display: flex;
  gap: 12px;
}

.btn-reject-full {
  flex: 1;
  background: white;
  border: 1px solid #E2E8F0;
  color: #475569;
  font-size: 14.5px;
  font-weight: 700;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-reject-full:hover { background: #FEE2E2; color: #DC2626; border-color: #FECACA; }

.btn-approve-full {
  flex: 2;
  background: #10B981;
  color: white;
  border: none;
  font-size: 14.5px;
  font-weight: 700;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}
.btn-approve-full:hover { background: #059669; transform: translateY(-1px); }

.status-banner {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
}
</style>
