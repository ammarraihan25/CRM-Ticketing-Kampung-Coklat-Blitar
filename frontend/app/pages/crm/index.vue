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
  if (!selected.value.length) return

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
    <section class="crm-hero">
      <div class="hero-pattern"></div>

      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">
            CRM MEMBERSHIP
          </span>

          <h1>
            Data Member
          </h1>

          <p>
            Kelola data dan hubungan dengan member Kampung Coklat.
          </p>
        </div>

      <button
        class="blast-main-button"
        :disabled="!selected.length"
        @click="openBlast"
      >
        <span>📣</span>

        <span>
          Blast WhatsApp
        </span>

        <span
          v-if="selected.length"
          class="selected-badge"
        >
          {{ selected.length }}
        </span>
      </button>
      </div>
      </section>

    <!-- STATS -->

    <section class="stats-grid">

      <div class="stat-card">
        <div class="stat-icon brown">
          👥
        </div>

        <div>
          <span>Total Members</span>
          <strong>{{ totalMember }}</strong>
          <small>Member terdaftar</small>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          ✓
        </div>

        <div>
          <span>Member Aktif</span>
          <strong>{{ totalAktif }}</strong>
          <small>Member aktif</small>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          💬
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

      <!-- SEARCH / FILTER -->

      <div class="filter-area">

        <div class="search-box">

          <span>
            🔍
          </span>

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
          <option value="">
            Semua Tipe Member
          </option>

          <option value="PR">
            PR — Pengunjung Reguler
          </option>

          <option value="PP">
            PP — Pengunjung Pengajian
          </option>

          <option value="PT">
            PT — Pengunjung Tour
          </option>
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
          <strong>
            {{ selected.length }} member dipilih
          </strong>

          <span>
            Siap dikirimi pesan WhatsApp
          </span>
        </div>

        <button
          class="send-button"
          @click="openBlast"
        >
          💬 Kirim WhatsApp
        </button>

      </div>

      <!-- TABLE -->

      <div class="table-container">

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

                <th class="action-column">
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

                    <div class="avatar">
                      {{ getInitial(member.nama) }}
                    </div>

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
                    {{ member.tipeMember || '-' }}
                  </span>

                </td>

                <td>

                  <span
                    class="status"
                    :class="member.status === 'Aktif'
                      ? 'active'
                      : 'inactive'"
                  >
                    <i></i>

                    {{
                      member.status || 'Aktif'
                    }}
                  </span>

                </td>

                <td>

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

    <div
      v-if="isDemoData"
      class="demo-notice"
    >
      <span>●</span>
      Mode preview — menggunakan data demo karena
      API member belum mengembalikan data.
    </div>

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
                    {{ selectedMember.tipeMember }}
                  </span>

                  <span
                    class="status active"
                  >
                    <i></i>
                    {{
                      selectedMember.status
                      || 'Aktif'
                    }}
                  </span>

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
              💬 Kirim WhatsApp
            </button>

          </div>

        </div>

      </div>

    </Teleport>

    <!-- BLAST MODAL -->

    <CrmBlastConfirmModal
      :show="showBlastModal"
      :target-ids="selected"
      :members="members"
      @close="showBlastModal = false"
      @sent="handleBlastSent"
    />

  </div>
</template>

<style scoped>
.crm-page {
  min-height: 100%;
  padding: 34px 42px 50px;
  color: #302019;
  font-size: 17px;
}

.crm-hero {
  position: relative;
  min-height: 190px;
  overflow: hidden;
  margin-bottom: 28px;
  padding: 34px 38px;
  border-radius: 22px;
  background:
    radial-gradient(circle at 88% 18%, rgba(255, 190, 83, 0.3), transparent 25%),
    linear-gradient(115deg, #3b1e16 0%, #6b351f 56%, #a85d24 100%);
  box-shadow: 0 18px 32px rgba(71, 39, 22, 0.18);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image:
    radial-gradient(circle at 12% 24%, #ffd37c 0 2px, transparent 3px),
    radial-gradient(circle at 26% 72%, #ffd37c 0 3px, transparent 4px),
    radial-gradient(circle at 78% 68%, #ffd37c 0 2px, transparent 3px),
    radial-gradient(circle at 92% 36%, #ffd37c 0 3px, transparent 4px);
  background-size: 110px 110px, 150px 150px, 130px 130px, 170px 170px;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  position: relative;
  z-index: 1;
}

.hero-text {
  min-width: 0;
}

.hero-badge {
  display: inline-flex;
  margin-bottom: 13px;
  padding: 6px 11px;
  border: 1px solid rgba(255, 218, 145, 0.45);
  border-radius: 999px;
  background: rgba(43, 20, 13, 0.28);
  color: #ffe4a8;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.hero-text h1 {
  margin: 0;
  color: #fffaf1;
  font-size: clamp(34px, 4vw, 50px);
  line-height: 1.05;
  letter-spacing: 0;
}

.hero-text p {
  max-width: 640px;
  margin: 11px 0 0;
  color: #f6d9b0;
  font-size: 18px;
  line-height: 1.5;
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
  gap: 18px;
  margin-bottom: 22px;
}

.stat-card {
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 21px;
  border: 1px solid #e9e2dc;
  border-radius: 17px;
  background: white;
  box-shadow: 0 8px 24px rgba(52, 34, 24, 0.045);
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

.stat-icon.brown {
  background: #f0e2d7;
}

.stat-icon.orange {
  background: #fff0d2;
}

.stat-icon.green {
  background: #e2f3e9;
}

.stat-card > div:last-child {
  display: flex;
  flex-direction: column;
}

.stat-card span {
  color: #756961;
  font-size: 16px;
  font-weight: 700;
}

.stat-card strong {
  margin-top: 2px;
  color: #321c13;
  font-size: 27px;
  line-height: 1.2;
}

.stat-card small {
  margin-top: 3px;
  color: #a09791;
  font-size: 14px;
}

/* MAIN CARD */

.members-card {
  overflow: hidden;
}

.members-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
  padding: 23px 25px;
  border: 1px solid #e6dfd9;
  border-radius: 18px;
  background: white;
  box-shadow: 0 10px 30px rgba(48, 32, 23, 0.055);
}

.members-header h2 {
  margin: 0;
  color: #3b2419;
  font-size: 20px;
}

.members-header p {
  margin: 5px 0 0;
  color: #958980;
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
  background: #fcfaf8;
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
  color: #3d291f;
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
  color: #5b493e;
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
  color: #4a2d1e;
  font-size: 16px;
}

.selected-toolbar span {
  color: #978980;
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
  border: 1px solid #e6dfd9;
  border-radius: 18px 18px 0 0;
  background: white;
  box-shadow: 0 10px 30px rgba(48, 32, 23, 0.055);
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th {
  height: 48px;
  padding: 0 16px;
  border-bottom: 1px solid #eee9e5;
  background: #fdfcfb;
  color: #81756e;
  text-align: left;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.4px;
}

td {
  height: 68px;
  padding: 0 16px;
  border-bottom: 1px solid #f0ebe7;
  color: #40342e;
  font-size: 16px;
}

tbody tr {
  transition: background 0.15s ease;
}

tbody tr:hover {
  background: #fffbf8;
}

th:first-child,
td:first-child {
  width: 42px;
  padding-left: 20px;
}

.action-column {
  width: 90px;
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
  gap: 11px;
}

.avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 11px;
  background: #f0e5dd;
  color: #65422e;
  font-size: 11px;
  font-weight: 800;
}

.member-cell > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.member-cell strong {
  color: #33231c;
  font-size: 16px;
}

.member-cell small {
  color: #a19790;
  font-size: 13px;
}

.whatsapp-cell {
  color: #70645c;
  white-space: nowrap;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 800;
}

.type-pr {
  background: #eee3ff;
  color: #7541bd;
}

.type-pp {
  background: #e3edff;
  color: #3869c4;
}

.type-pt {
  background: #e0f7e9;
  color: #20864e;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.status i {
  width: 6px;
  height: 6px;
  display: block;
  border-radius: 50%;
  background: currentColor;
}

.status.active {
  color: #199b50;
}

.status.inactive {
  color: #99918b;
}

.view-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 11px;
  border: 1px solid #ddd5cf;
  border-radius: 8px;
  background: white;
  color: #4d392e;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.view-button:hover {
  border-color: #8e6043;
  background: #faf5f0;
}

.view-button span {
  font-size: 16px;
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
  border: 1px solid #e6dfd9;
  border-top: 0;
  border-radius: 0 0 18px 18px;
  background: white;
  padding: 17px 25px;
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
  width: 850px;
  max-width: 100%;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 30px 90px rgba(34, 22, 15, 0.3);
}

.detail-header {
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  align-items: center;
  gap: 12px;
  padding: 21px 24px;
  border-bottom: 1px solid #eee7e1;
}

.detail-header > div {
  text-align: center;
}

.detail-header span {
  color: #a18e82;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.detail-header h2 {
  margin: 3px 0 0;
  color: #342016;
  font-size: 20px;
}

.back-button,
.close-detail {
  width: 36px;
  height: 36px;
  border: 1px solid #e2d9d2;
  border-radius: 9px;
  background: white;
  color: #59463a;
  font-size: 17px;
  cursor: pointer;
}

.close-detail {
  font-size: 21px;
}

.detail-body {
  max-height: calc(90vh - 145px);
  overflow-y: auto;
  padding: 28px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 19px;
  padding-bottom: 25px;
  border-bottom: 1px solid #eee8e2;
}

.large-avatar {
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: #ead9ca;
  color: #68442e;
  font-size: 25px;
  font-weight: 800;
}

.profile-section h2 {
  margin: 0;
  color: #281a13;
  font-size: 27px;
}

.profile-section p {
  margin: 8px 0 0;
  color: #93867e;
  font-size: 15px;
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
  gap: 13px;
  margin-top: 22px;
}

.detail-info-card {
  padding: 17px;
  border: 1px solid #ebe3dc;
  border-radius: 13px;
  background: #fcfaf8;
}

.detail-info-card span,
.detail-info-card strong,
.detail-info-card small {
  display: block;
}

.detail-info-card span {
  color: #92857c;
  font-size: 14px;
  font-weight: 700;
}

.detail-info-card strong {
  margin-top: 7px;
  color: #352219;
  font-size: 18px;
}

.detail-info-card small {
  margin-top: 4px;
  color: #aaa098;
  font-size: 13px;
}

.activity-card {
  margin-top: 18px;
  padding: 20px;
  border: 1px solid #ebe3dc;
  border-radius: 15px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.activity-header h3 {
  margin: 0;
  color: #352219;
  font-size: 15px;
}

.activity-header p {
  margin: 4px 0 0;
  color: #978b83;
  font-size: 14px;
}

.activity-header > span {
  color: #199b50;
  font-size: 13px;
  font-weight: 800;
}

.activity-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
}

.activity-row div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-row span {
  color: #988b82;
  font-size: 14px;
}

.activity-row strong {
  color: #473329;
  font-size: 16px;
}

.detail-footer {
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  padding: 16px 24px;
  border-top: 1px solid #eee8e2;
}

.secondary-detail-button,
.primary-detail-button {
  height: 40px;
  padding: 0 16px;
  border-radius: 9px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.secondary-detail-button {
  border: 1px solid #ded6cf;
  background: white;
  color: #65544a;
}

.primary-detail-button {
  border: 0;
  background: #5b3826;
  color: white;
}

.primary-detail-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
    grid-template-columns: 1fr;
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
    padding: 20px;
  }

  .profile-section {
    align-items: flex-start;
  }

  .detail-footer {
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
  font-size: 22px;
}

.blast-main-button {
  font-size: 16px;
}
</style>