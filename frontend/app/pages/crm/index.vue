<script setup lang="ts">
import type { Member } from '~/composables/useCrmApi'

definePageMeta({
  layout: 'admin'
})

const { getMembers } = useCrmApi()

/* =========================================================
   TYPES
========================================================= */

type CrmMember = Member & {
  id: number
  nama: string
  whatsapp?: string
  domisili?: string
  tipeMember?: string
  status?: string
  totalSpend?: number
  tanggalDaftar?: string
}

/* =========================================================
   STATE
========================================================= */

const filters = ref({
  tipeMember: '',
  domisili: '',
  search: ''
})

const page = ref(1)
const perPage = 10

const members = ref<CrmMember[]>([])
const total = ref(0)

const selected = ref<number[]>([])

const isLoading = ref(false)
const isDemoData = ref(false)

const showBlastModal = ref(false)

const showDetailModal = ref(false)
const selectedMember = ref<CrmMember | null>(null)

/* =========================================================
   DEMO DATA
   Dipakai sementara kalau API belum punya data.
========================================================= */

const demoMembers: CrmMember[] = [
  {
    id: 1,
    nama: 'Callista Danis',
    whatsapp: '628123456789',
    domisili: 'Blitar',
    tipeMember: 'PR',
    status: 'Aktif',
    totalSpend: 4250000,
    tanggalDaftar: '12 Oktober 2022'
  },
  {
    id: 2,
    nama: 'Budi Santoso',
    whatsapp: '6285711223344',
    domisili: 'Kediri',
    tipeMember: 'PP',
    status: 'Aktif',
    totalSpend: 2750000,
    tanggalDaftar: '18 Januari 2023'
  },
  {
    id: 3,
    nama: 'Siti Khadijah',
    whatsapp: '6281999887766',
    domisili: 'Malang',
    tipeMember: 'PT',
    status: 'Tidak Aktif',
    totalSpend: 1850000,
    tanggalDaftar: '03 Maret 2023'
  },
  {
    id: 4,
    nama: 'Rizky Maulana',
    whatsapp: '6282255512345',
    domisili: 'Surabaya',
    tipeMember: 'PR',
    status: 'Aktif',
    totalSpend: 3250000,
    tanggalDaftar: '20 April 2023'
  },
  {
    id: 5,
    nama: 'Nadia Putri',
    whatsapp: '6281334567890',
    domisili: 'Tulungagung',
    tipeMember: 'PP',
    status: 'Aktif',
    totalSpend: 4100000,
    tanggalDaftar: '11 Mei 2023'
  },
  {
    id: 6,
    nama: 'Fajar Hidayat',
    whatsapp: '6285788812345',
    domisili: 'Kediri',
    tipeMember: 'PR',
    status: 'Aktif',
    totalSpend: 2150000,
    tanggalDaftar: '09 Juni 2023'
  },
  {
    id: 7,
    nama: 'Aulia Rahma',
    whatsapp: '6281239988776',
    domisili: 'Blitar',
    tipeMember: 'PT',
    status: 'Aktif',
    totalSpend: 5600000,
    tanggalDaftar: '21 Juli 2023'
  },
  {
    id: 8,
    nama: 'Dimas Pratama',
    whatsapp: '6282145678901',
    domisili: 'Malang',
    tipeMember: 'PR',
    status: 'Tidak Aktif',
    totalSpend: 1250000,
    tanggalDaftar: '14 Agustus 2023'
  }
]

/* =========================================================
   LOAD DATA
========================================================= */

async function loadMembers() {
  isLoading.value = true

  try {
    const res = await getMembers({
      page: page.value,
      ...filters.value
    })

    const apiData = Array.isArray(res?.data)
      ? res.data
      : []

    if (apiData.length > 0) {
      members.value = apiData as CrmMember[]
      total.value = Number(res.total ?? apiData.length)
      isDemoData.value = false
    } else {
      useDemoData()
    }
  } catch (error) {
    console.warn('API member belum tersedia. Menggunakan data demo.', error)

    useDemoData()
  } finally {
    isLoading.value = false
  }
}

/* =========================================================
   DEMO DATA FILTER
========================================================= */

function useDemoData() {
  let data = [...demoMembers]

  if (filters.value.tipeMember) {
    data = data.filter(
      member =>
        member.tipeMember === filters.value.tipeMember
    )
  }

  if (filters.value.domisili) {
    const keyword =
      filters.value.domisili.toLowerCase()

    data = data.filter(member =>
      member.domisili
        ?.toLowerCase()
        .includes(keyword)
    )
  }

  if (filters.value.search) {
    const keyword =
      filters.value.search.toLowerCase()

    data = data.filter(member =>
      member.nama
        ?.toLowerCase()
        .includes(keyword) ||
      member.whatsapp
        ?.toLowerCase()
        .includes(keyword)
    )
  }

  total.value = data.length

  const start =
    (page.value - 1) * perPage

  members.value =
    data.slice(start, start + perPage)

  isDemoData.value = true
}

/* =========================================================
   WATCH
========================================================= */

watch(
  filters,
  () => {
    page.value = 1
    loadMembers()
  },
  { deep: true }
)

watch(page, () => {
  if (isDemoData.value) {
    useDemoData()
  } else {
    loadMembers()
  }
})

onMounted(() => {
  loadMembers()
})

/* =========================================================
   SELECTION
========================================================= */

const allSelected = computed(() => {
  return (
    members.value.length > 0 &&
    members.value.every(member =>
      selected.value.includes(member.id)
    )
  )
})

function toggleMember(id: number) {
  if (selected.value.includes(id)) {
    selected.value =
      selected.value.filter(item => item !== id)
  } else {
    selected.value = [
      ...selected.value,
      id
    ]
  }
}

function toggleAll() {
  if (allSelected.value) {
    selected.value = selected.value.filter(
      id =>
        !members.value.some(
          member => member.id === id
        )
    )
  } else {
    const ids = members.value.map(
      member => member.id
    )

    selected.value = Array.from(
      new Set([
        ...selected.value,
        ...ids
      ])
    )
  }
}

/* =========================================================
   DETAIL MEMBER
========================================================= */

function openMemberDetail(member: CrmMember) {
  selectedMember.value = member
  showDetailModal.value = true
}

function closeMemberDetail() {
  showDetailModal.value = false
  selectedMember.value = null
}

/* =========================================================
   BLAST
========================================================= */

function openBlast() {
  if (!selected.value.length) {
    window.alert('Pilih minimal satu member terlebih dahulu.')
    return
  }

  showBlastModal.value = true
}

function handleBlastSent() {
  showBlastModal.value = false
  selected.value = []
}

/* =========================================================
   FILTER
========================================================= */

function resetFilter() {
  filters.value = {
    tipeMember: '',
    domisili: '',
    search: ''
  }
}

/* =========================================================
   PAGINATION
========================================================= */

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(total.value / perPage)
  )
})

function previousPage() {
  if (page.value > 1) {
    page.value--
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
  }
}

/* =========================================================
   STATISTICS
========================================================= */

const totalMember = computed(() =>
  total.value
)

const totalAktif = computed(() =>
  members.value.filter(
    member =>
      member.status === 'Aktif'
  ).length
)

const totalWhatsApp = computed(() =>
  members.value.filter(
    member =>
      !!member.whatsapp
  ).length
)

/* =========================================================
   HELPERS
========================================================= */

function getInitial(name?: string) {
  if (!name) return '?'

  return name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function formatWhatsApp(value?: string) {
  if (!value) return '-'

  if (value.startsWith('62')) {
    return `+${value}`
  }

  return value
}

function formatRupiah(value?: number) {
  if (!value) return 'Rp 0'

  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }
  ).format(value)
}

function getMemberTypeLabel(
  type?: string
) {
  const labels: Record<string, string> = {
    PR: 'Pengunjung Reguler',
    PP: 'Pengunjung Pengajian',
    PT: 'Pengunjung Tour'
  }

  return labels[type || ''] || type || '-'
}

function getTypeClass(type?: string) {
  if (type === 'PR') return 'type-pr'
  if (type === 'PP') return 'type-pp'
  if (type === 'PT') return 'type-pt'

  return ''
}
</script>

<template>
  <div class="crm-page">

    <!-- HEADER PATTERN KAMPUNG COKLAT -->
    <header class="executive-command-header">
      <div class="brand-text-wrapper">
        <h1 class="header-main-title">Data Member</h1>
        <div class="header-meta-clean-line">
          Kelola data dan hubungan dengan member Kampung Coklat.
        </div>
      </div>

    </header>

    <!-- STATS -->

    <section class="stats-grid">

      <div class="stat-card">
        <div class="stat-icon purple">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7541bd" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>

        <div>
          <span>Total Members</span>
          <strong>{{ totalMember }}</strong>
          <small>Member terdaftar</small>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#20864e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <polyline points="16 11 18 13 22 9"/>
          </svg>
        </div>

        <div>
          <span>Member Aktif</span>
          <strong>{{ totalAktif }}</strong>
          <small>Member aktif</small>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3869c4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </div>

        <div>
          <span>Kontak WhatsApp</span>
          <strong>{{ totalWhatsApp }}</strong>
          <small>Memiliki nomor WhatsApp</small>
        </div>
      </div>

    </section>

    <!-- MAIN -->

    <section class="members-card">

      <div class="members-header">

        <div>
          <h2>
            Member Directory
          </h2>

          <p>
            Daftar seluruh member Kampung Coklat.
          </p>
        </div>

        <div class="directory-count">
          {{ total }} Members
        </div>

      </div>

      <div class="table-container">

        <!-- SEARCH / FILTER -->
        <div class="filter-area">
          <div class="search-box">
            <span>🔍</span>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Cari nama atau nomor WhatsApp..."
            >
          </div>
          <select
            v-model="filters.tipeMember"
            class="filter-select"
          >
            <option value="">Semua Tipe Member</option>
            <option value="PR">PR — Pengunjung Reguler</option>
            <option value="PP">PP — Pengunjung Pengajian</option>
            <option value="PT">PT — Pengunjung Tour</option>
          </select>
          <input
            v-model="filters.domisili"
            class="filter-input"
            type="text"
            placeholder="Domisili..."
          >
          <button
            class="reset-button"
            @click="resetFilter"
          >
            ↻ Reset
          </button>
        </div>

        <!-- SELECTED TOOLBAR -->
        <div
          v-if="selected.length"
          class="selected-toolbar"
        >
          <div>
            <strong>{{ selected.length }} member dipilih</strong>
            <span>Siap dikirimi pesan WhatsApp</span>
          </div>
          <button
            class="send-button"
            @click="openBlast"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Kirim WhatsApp
          </button>
        </div>

        <div
          v-if="isLoading"
          class="loading-state"
        >
          <div class="loader"></div>
          <span>
            Memuat data member...
          </span>
        </div>

        <template v-else>

          <table>

            <thead>
              <tr>

                <th class="checkbox-column">
                  <input
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleAll"
                  >
                </th>

                <th>
                  MEMBER
                </th>

                <th>
                  WHATSAPP
                </th>

                <th>
                  DOMISILI
                </th>

                <th>
                  TIPE MEMBER
                </th>

                <th>
                  STATUS
                </th>

                <th class="col-action">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              <tr
                v-for="member in members"
                :key="member.id"
              >

                <td>
                  <input
                    type="checkbox"
                    :checked="selected.includes(member.id)"
                    @change="toggleMember(member.id)"
                  >
                </td>

                <td>

                  <div class="member-cell">

                    

                    <div>
                      <strong>
                        {{ member.nama }}
                      </strong>

                      <small>
                        Member #{{ member.id }}
                      </small>
                    </div>

                  </div>

                </td>

                <td class="whatsapp-cell">
                  {{ formatWhatsApp(member.whatsapp) }}
                </td>

                <td>
                  {{ member.domisili || '-' }}
                </td>

                <td>

                  <span
                    class="type-badge"
                    :class="getTypeClass(member.tipeMember)"
                  >
                    {{ getMemberTypeLabel(member.tipeMember) }}
                  </span>

                </td>

                <td>

                  <span
                    class="status-pill-badge"
                    :class="member.status === 'Aktif'
                      ? 'status-active'
                      : 'status-locked'"
                  >
                    
                    <span>{{ member.status || 'Aktif' }}</span>
                  </span>

                </td>

                <td class="col-action-cell">

                  <button
                    class="view-button"
                    @click="openMemberDetail(member)"
                  >
                    View
                    <span>›</span>
                  </button>

                </td>

              </tr>

              <tr v-if="!members.length">

                <td
                  colspan="7"
                  class="empty-state"
                >
                  <div>
                    👥
                  </div>

                  <strong>
                    Belum ada data member
                  </strong>

                  <span>
                    Data member akan muncul setelah
                    tersedia di sistem.
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </template>

      </div>

      <!-- PAGINATION -->

      <div class="pagination">

        <span>
          Showing
          {{
            total === 0
              ? 0
              : ((page - 1) * perPage) + 1
          }}
          -
          {{
            Math.min(
              page * perPage,
              total
            )
          }}
          of {{ total }}
        </span>

        <div class="pagination-buttons">

          <button
            :disabled="page <= 1"
            @click="previousPage"
          >
            ← Prev
          </button>

          <span class="page-number">
            {{ page }}
          </span>

          <button
            :disabled="page >= totalPages"
            @click="nextPage"
          >
            Next →
          </button>

        </div>

      </div>

    </section>

    <!-- DEMO BADGE -->

    <!-- MEMBER DETAIL -->

    <Teleport to="body">

      <div
        v-if="showDetailModal && selectedMember"
        class="detail-overlay"
        @click.self="closeMemberDetail"
      >

        <div class="detail-modal">

          <div class="detail-header">

            <button
              class="back-button"
              @click="closeMemberDetail"
            >
              ←
            </button>

            <div>
              <span>
                MEMBER PROFILE
              </span>

              <h2>
                Detail Member
              </h2>
            </div>

            <button
              class="close-detail"
              @click="closeMemberDetail"
            >
              ×
            </button>

          </div>

          <div class="detail-body">

            <div class="profile-section">

              <div class="large-avatar">
                {{
                  getInitial(
                    selectedMember.nama
                  )
                }}
              </div>

              <div>

                <h2>
                  {{ selectedMember.nama }}
                </h2>

                <div class="profile-meta">

                  <span
                    class="type-badge"
                    :class="
                      getTypeClass(
                        selectedMember.tipeMember
                      )
                    "
                  >
                    {{ getMemberTypeLabel(selectedMember.tipeMember) }}</span>

                  

                </div>

                <p>
                  Member sejak
                  {{
                    selectedMember.tanggalDaftar
                    || '2024'
                  }}
                </p>

              </div>

            </div>

            <div class="detail-grid">

              <div class="detail-info-card">

                <span>WhatsApp</span>

                <strong>
                  {{
                    formatWhatsApp(
                      selectedMember.whatsapp
                    )
                  }}
                </strong>

                <small>
                  Nomor kontak utama
                </small>

              </div>

              <div class="detail-info-card">

                <span>Domisili</span>

                <strong>
                  {{
                    selectedMember.domisili
                    || '-'
                  }}
                </strong>

                <small>
                  Kota / wilayah member
                </small>

              </div>

              <div class="detail-info-card">

                <span>Total Spend</span>

                <strong>
                  {{
                    formatRupiah(
                      selectedMember.totalSpend
                    )
                  }}
                </strong>

                <small>
                  Total transaksi member
                </small>

              </div>

              <div class="detail-info-card">

                <span>Member ID</span>

                <strong>
                  #{{ selectedMember.id }}
                </strong>

                <small>
                  ID member CRM
                </small>

              </div>

            </div>

            <div class="activity-card">

              <div class="activity-header">
                <div>
                  <h3>
                    Member Overview
                  </h3>

                  <p>
                    Informasi ringkas aktivitas member.
                  </p>
                </div>

                <span>
                  ● ACTIVE
                </span>
              </div>

              <div class="activity-row">

                <div>
                  <span>Member Type</span>
                  <strong>
                    {{
                      getMemberTypeLabel(
                        selectedMember.tipeMember
                      )
                    }}
                  </strong>
                </div>

                <div>
                  <span>WhatsApp</span>
                  <strong>
                    {{
                      selectedMember.whatsapp
                        ? 'Tersedia'
                        : 'Tidak tersedia'
                    }}
                  </strong>
                </div>

              </div>

            </div>

          </div>

          <div class="detail-footer">

            <button
              class="secondary-detail-button"
              @click="closeMemberDetail"
            >
              Tutup
            </button>

            <button
              class="primary-detail-button"
              :disabled="
                !selectedMember.whatsapp
              "
              @click="
                selected = [selectedMember.id];
                closeMemberDetail();
                openBlast();
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Kirim WhatsApp
            </button>

          </div>

        </div>

      </div>

    </Teleport>

    <!-- BLAST MODAL -->

    <CrmBlastConfirmModul
      :show="showBlastModal"
      :target-ids="selected"
      :members="members"
      @close="showBlastModal = false"
      @sent="handleBlastSent"
    />

    <!-- FAB WhatsApp Blast -->
    <button
      class="fab-whatsapp-blast"
      @click="openBlast"
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="fab-icon" />
      <span
        v-if="selected.length"
        class="fab-badge"
      >
        {{ selected.length }}
      </span>
    </button>

  </div>
</template>

<style scoped>
.crm-page {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  color: #302019;
  font-size: 17px;
  display: flex;
  flex-direction: column;
}

.executive-command-header {
  background: transparent;
  margin: -24px -36px 24px -36px;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.brand-text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-main-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

.header-meta-clean-line {
  font-size: 14px;
  font-weight: 500;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
}

.controls-hero-col {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* HEADER */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 28px;
}

.breadcrumb {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  color: #8a7c73;
  font-size: 13px;
  font-weight: 600;
}

.breadcrumb span {
  color: #b3a79f;
}

.breadcrumb strong {
  color: #3f281e;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #ead9ca;
  font-size: 27px;
  box-shadow: 0 8px 20px rgba(72, 43, 27, 0.08);
}

.title-row h1 {
  margin: 0;
  color: #321c13;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.7px;
}

.title-row p {
  margin: 5px 0 0;
  color: #81756d;
  font-size: 14px;
}

.blast-main-button {
  flex-shrink: 0;
  margin-left: auto;
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border: 0;
  border-radius: 12px;
  background: #f6a623;
  color: white;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(255, 122, 25, 0.22);
  transition: 0.2s ease;
}

.blast-main-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: #ed6910;
}

.blast-main-button:disabled {
  opacity: 0.42;
  cursor: not-allowed;
  box-shadow: none;
}

.selected-badge {
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.22);
  font-size: 11px;
}

/* STATS */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 21px 24px;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.015);
  transition: box-shadow 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 15px 30px rgba(0,0,0,0.03);
}

.stat-icon {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 22px;
}

.stat-icon.purple {
  background: #f3ecff;
}

.stat-icon.green {
  background: #e0f7e9;
}

.stat-icon.blue {
  background: #e6f0ff;
}

.stat-card > div:last-child {
  display: flex;
  flex-direction: column;
}

.stat-card span {
  color: #44403C;
  font-size: 16px;
  font-weight: 700;
}

.stat-card strong {
  margin-top: 2px;
  color: #1C1917;
  font-size: 27px;
  line-height: 1.2;
}

.stat-card small {
  margin-top: 3px;
  color: #78716C;
  font-size: 14.5px;
  font-weight: 500;
}

/* MAIN CARD */

.members-card {
  overflow: hidden;
  border: 1px solid #e6dfd9;
  border-radius: 18px;
  background: white;
  box-shadow: 0 10px 30px rgba(48, 32, 23, 0.055);
}

.members-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 23px 25px;
  border-bottom: 1px solid #eee8e3;
}

.members-header h2 {
  margin: 0;
  color: #1C1917;
  font-size: 20px;
}

.members-header p {
  margin: 5px 0 0;
  color: #44403C;
  font-size: 15px;
}

.directory-count {
  padding: 9px 14px;
  border-radius: 30px;
  background: #f6ebe1;
  color: #66432e;
  font-size: 15px;
  font-weight: 800;
}

/* FILTER */

.filter-area {
  display: grid;
  grid-template-columns: 1.7fr 1fr 1fr auto;
  gap: 11px;
  padding: 19px 25px;
  background: white;
  border-bottom: 1px solid #eee8e3;
}

.search-box,
.filter-input,
.filter-select {
  height: 44px;
  box-sizing: border-box;
  border: 1px solid #ded6cf;
  border-radius: 10px;
  background: white;
  color: #1C1917;
  font-family: inherit;
  font-size: 16px;
  outline: none;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 13px;
}

.search-box span {
  font-size: 14px;
  opacity: 0.65;
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #3d291f;
  font-family: inherit;
  font-size: 16px;
}

.filter-input {
  width: 100%;
  padding: 0 13px;
}

.filter-select {
  width: 100%;
  padding: 0 11px;
}

.search-box:focus-within,
.filter-input:focus,
.filter-select:focus {
  border-color: #9a6b4c;
  box-shadow: 0 0 0 3px rgba(154,107,76,0.08);
}

.reset-button {
  height: 44px;
  padding: 0 15px;
  border: 1px solid #ddd4cc;
  border-radius: 10px;
  background: white;
  color: #1C1917;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.reset-button:hover {
  background: #f7f1eb;
}

/* SELECTED */

.selected-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 13px 25px;
  background: #fff8f2;
  border-bottom: 1px solid #f0e2d7;
}

.selected-toolbar > div {
  display: flex;
  align-items: center;
  gap: 9px;
}

.selected-toolbar strong {
  color: #1C1917;
  font-size: 16px;
}

.selected-toolbar span {
  color: #44403C;
  font-size: 14px;
}

.send-button {
  height: 37px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  background: #5b3826;
  color: white;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

/* TABLE */

.table-container {
  overflow-x: auto;
  background: white;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    background: #FAFAFA;
    color: #6B7280;
    text-align: left;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  
  td {
    padding: 10px 16px;
    border-bottom: 1px solid #F3F4F6;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    vertical-align: middle;
  }
  
  tbody tr {
    transition: background 0.15s ease;
  }
  
  tbody tr:hover {
    background: #F9FAFB;
  }

th:first-child,
td:first-child {
  width: 42px;
  padding-left: 20px;
}

.col-action { 
  width: 110px; 
  text-align: center;
}
.col-action-cell {
  text-align: center;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #5b3826;
  cursor: pointer;
}

.member-cell {
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

.member-cell > div:last-child {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .member-cell strong {
    color: #111827;
    font-size: 13px;
    font-weight: 700;
  }
  
  .member-cell small {
    color: #6B7280;
    font-size: 11px;
    font-weight: 500;
  }

.whatsapp-cell {
  color: #44403C;
  font-weight: 600;
  white-space: nowrap;
}

.type-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

.type-pr {
  background: #DCE6F5; /* Light blue matching image 2 */
  color: #1A365D;
}

.type-pp {
  background: #FEF08A; /* Yellow matching image 2 */
  color: #422006;
}

.type-pt {
  background: #C4DCFB; /* Slightly distinct blue */
  color: #1A365D;
}

.status-pill-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }

.status-active { background: #D1FAE5; color: #065F46; }
  .status-locked { background: #F3F4F6; color: #6B7280; }

.status-dot-mini {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.view-button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #FFFFFF;
    border: 1px solid #EADBCC;
    color: #5A3A28;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

.view-button:hover {
  background: #FAF5EE;
  border-color: #D6C3B1;
  color: #3D2214;
}

.view-button span {
  font-size: 14px;
}

.empty-state {
  height: 280px;
  text-align: center;
}

.empty-state > div {
  font-size: 30px;
  margin-bottom: 10px;
}

.empty-state strong,
.empty-state span {
  display: block;
}

.empty-state strong {
  color: #51372a;
  font-size: 16px;
}

.empty-state span {
  margin-top: 5px;
  color: #aaa09a;
  font-size: 14px;
}

/* PAGINATION */

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px 25px;
  color: #8f857e;
  font-size: 14px;
}

.pagination-buttons {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pagination-buttons button,
.page-number {
  height: 34px;
  padding: 0 11px;
  border: 1px solid #ddd5cf;
  border-radius: 8px;
  background: white;
  color: #5a493e;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
}

.pagination-buttons button {
  cursor: pointer;
}

.pagination-buttons button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  background: #5b3826;
  border-color: #5b3826;
  color: white;
}

/* DEMO */

.demo-notice {
  position: fixed;
  right: 22px;
  bottom: 20px;
  z-index: 30;
  padding: 9px 13px;
  border: 1px solid #eadfd6;
  border-radius: 10px;
  background: rgba(255,255,255,0.96);
  box-shadow: 0 8px 25px rgba(50,30,20,0.08);
  color: #7e7168;
  font-size: 14px;
}

.demo-notice span {
  color: #d48a2d;
}

/* DETAIL */

.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: rgba(39, 27, 21, 0.55);
  backdrop-filter: blur(7px);
}

.detail-modal {
  width: 600px;
  max-width: 100%;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.detail-header {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  align-items: center;
  gap: 12px;
  padding: 21px 24px;
  border-bottom: 1px solid #E5E7EB;
}

.detail-header > div {
  text-align: center;
}

.detail-header span {
  color: #6B7280;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
}

.detail-header h2 {
  margin: 3px 0 0;
  color: #111827;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.back-button,
.close-detail {
  width: 36px;
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #FFFFFF;
  color: #4B5563;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.back-button:hover,
.close-detail:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
  color: #111827;
}

.close-detail {
  font-size: 21px;
}

.detail-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.large-avatar {
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #FFFBEB;
  color: #B45309;
  font-size: 24px;
  font-weight: 900;
  border: 2px solid #FDE68A;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.08);
}

.profile-section h2 {
  margin: 0;
  color: #111827;
  font-size: 22px;
  font-weight: 800;
}

.profile-section p {
  margin: 4px 0 0;
  color: #6B7280;
  font-size: 13px;
}

.profile-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
}

.detail-info-card {
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: #FAFAFA;
  border-left: 3px solid #D97706;
  transition: all 0.2s ease;
}

.detail-info-card:hover {
  background: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: #D1D5DB;
}

.detail-info-card span,
.detail-info-card strong,
.detail-info-card small {
  display: block;
}

.detail-info-card span {
  color: #4B5563;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 4px;
}

.detail-info-card strong {
  margin-top: 4px;
  color: #111827;
  font-size: 19px;
  font-weight: 900;
  letter-spacing: -0.5px;
  margin-bottom: 2px;
}

.detail-info-card small {
  color: #9CA3AF;
  font-size: 11px;
}

.activity-card {
  margin-top: 16px;
  padding: 16px 20px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: #FFFFFF;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.activity-header h3 {
  margin: 0;
  color: #111827;
  font-size: 16px;
  font-weight: 800;
}

.activity-header p {
  margin: 4px 0 0;
  color: #6B7280;
  font-size: 13.5px;
}

.activity-header > span {
  color: #059669;
  background: #D1FAE5;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.activity-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 14px;
}

.activity-row div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-row span {
  color: #6B7280;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.activity-row strong {
  color: #111827;
  font-size: 16px;
  font-weight: 800;
}



.detail-footer {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  background: #F9FAFB;
}

.secondary-detail-button,
.primary-detail-button {
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.secondary-detail-button {
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  color: #374151;
}

.secondary-detail-button:hover {
  background: #F3F4F6;
  border-color: #9CA3AF;
}

.primary-detail-button {
  border: 0;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);
}

.primary-detail-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(37, 211, 102, 0.3);
}

.primary-detail-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #9CA3AF;
  box-shadow: none;
}

/* LOADING */

.loading-state {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #786b62;
  font-size: 16px;
}

.loader {
  width: 30px;
  height: 30px;
  border: 3px solid #eadfd6;
  border-top-color: #65412b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .crm-page {
    padding: 28px;
  }

  .filter-area {
    grid-template-columns: 1fr 1fr;
  }

  .reset-button {
    width: 100%;
  }
}

@media (max-width: 800px) {
  .hero-content {
    align-items: flex-start;
    flex-direction: column;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .blast-main-button {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
}
}

@media (max-width: 600px) {
  .crm-page {
    padding: 18px;
  }

  .title-row h1 {
    font-size: 26px;
  }

  .filter-area {
    grid-template-columns: 1fr;
  }

  .members-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .selected-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .send-button {
    width: 100%;
  }

  .detail-overlay {
    padding: 10px;
  }

  .detail-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

  .profile-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

  .detail-footer {
  flex-shrink: 0;
    flex-direction: column;
  }

  .secondary-detail-button,
  .primary-detail-button {
    width: 100%;
  }
}

/* Improve readability across the CRM workspace. */
.crm-page {
  font-size: 16px;
}

.breadcrumb,
.stat-card span,
.members-header p,
.directory-count,
.reset-button,
.selected-toolbar strong,
.selected-toolbar span,
.send-button,
td,
.member-cell strong,
.status,
.view-button,
.empty-state strong,
.pagination,
.pagination-buttons button,
.page-number,
.loading-state,
.profile-section p,
.detail-info-card strong,
.activity-header h3,
.activity-row strong,
.secondary-detail-button,
.primary-detail-button {
  font-size: 14px;
}

.stat-card small,
.search-box,
.filter-input,
.filter-select,
.search-box input,
.detail-info-card span,
.activity-header p,
.activity-row span,
.demo-notice,
.empty-state span {
  font-size: 13px;
}

th,
.member-cell small,
.type-badge,
.detail-info-card small,
.activity-header > span,
.detail-header span {
  font-size: 12px;
}

.title-row h1 {
  font-size: 34px;
}

.members-header h2,
.detail-header h2 {
  margin: 3px 0 0;
  color: #111827;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

/* WhatsApp FAB */
.fab-whatsapp-blast {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 65px;
  height: 65px;
  background-color: #25D366;
  border-radius: 50%;
  border: none;
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.fab-whatsapp-blast:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
}

.fab-icon {
  width: 36px;
  height: 36px;
}

.fab-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #EF4444;
  color: white;
  font-size: 12px;
  font-weight: 800;
  min-width: 22px;
  height: 22px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
}
</style>