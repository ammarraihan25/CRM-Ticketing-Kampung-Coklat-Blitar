<script setup lang="ts">
import type { GuestBookRecord } from '~/composables/useGuestBookApi'


const { getGuestBookData } = useGuestBookApi()

/* =========================================================
   TYPES
========================================================= */

type GuestBookRecord = GuestBookRecord & {
  id: number
  nama: string
  whatsapp?: string
  domisili?: string
  tipeKunjungan?: string
  status?: string
  totalSpend?: number
  tanggalKunjungan?: string
  tanggalLahir?: string
  umur?: number
  kategoriUmur?: string
}

interface GroupedEvent {
  id: string
  namaAcara: string
  tanggalKunjungan: string
  tipeKunjungan: string
  picNama: string
  picWhatsapp: string
  picDomisili: string
  status: string
  kategoriUmur?: string
  members: GuestBookRecord[]
}

/* =========================================================
   STATE
========================================================= */

const filters = ref({
  tipeKunjungan: '',
  domisili: '',
  kategoriUmur: '',
  search: ''
})

const page = ref(1)
const perPage = 10

const entries = ref<GuestBookRecord[]>([])
const total = ref(0)

const selected = ref<number[]>([])

const isLoading = ref(false)
const isDemoData = ref(false)

const showBlastModal = ref(false)

const showDetailModal = ref(false)
const selectedGuestBookRecord = ref<GuestBookRecord | null>(null)

/* =========================================================
   DEMO DATA
   Dipakai sementara kalau API belum punya data.
========================================================= */

const demoEntries: GuestBookRecord[] = [
  {
    id: 1,
    nama: 'Callista Danis',
    whatsapp: '628123456789',
    domisili: 'Blitar',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Pengajian Akbar Ahad Pagi',
    tanggalKunjungan: '12 Oktober 2022',
    tanggalLahir: '1972-04-12',
    umur: 54,
    kategoriUmur: 'Lansia'
  },
  {
    id: 2,
    nama: 'Budi Santoso',
    whatsapp: '6285711223344',
    domisili: 'Kediri',
    tipeKunjungan: 'hall',
    status: 'terdaftar',
    namaAcara: 'Reuni SMA 1 Kediri',
    tanggalKunjungan: '18 Januari 2023',
    tanggalLahir: '1988-11-20',
    umur: 38,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 3,
    nama: 'Siti Khadijah',
    whatsapp: '6281999887766',
    domisili: 'Malang',
    tipeKunjungan: 'b2b',
    status: 'terverifikasi',
    namaAcara: 'Studi Banding UMKM Malang',
    tanggalKunjungan: '03 Maret 2023',
    tanggalLahir: '1998-06-15',
    umur: 28,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 4,
    nama: 'Rizky Maulana',
    whatsapp: '6282255512345',
    domisili: 'Surabaya',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Kunjungan Majelis Taklim Surabaya',
    tanggalKunjungan: '20 April 2023',
    tanggalLahir: '2004-09-08',
    umur: 22,
    kategoriUmur: 'Remaja'
  },
  {
    id: 5,
    nama: 'Nadia Putri',
    whatsapp: '6281334567890',
    domisili: 'Tulungagung',
    tipeKunjungan: 'hall',
    status: 'terdaftar',
    namaAcara: 'Gathering Keluarga Besar Bapak Harun',
    tanggalKunjungan: '11 Mei 2023',
    tanggalLahir: '1990-12-03',
    umur: 36,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 6,
    nama: 'Fajar Hidayat',
    whatsapp: '6285788812345',
    domisili: 'Kediri',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Pengajian Rutin Muslimat NU',
    tanggalKunjungan: '09 Juni 2023',
    tanggalLahir: '1969-01-25',
    umur: 57,
    kategoriUmur: 'Lansia'
  },
  {
    id: 7,
    nama: 'Aulia Rahma',
    whatsapp: '6281239988776',
    domisili: 'Blitar',
    tipeKunjungan: 'b2b',
    status: 'terdaftar',
    namaAcara: 'Kunjungan Industri SMK 1 Blitar',
    tanggalKunjungan: '21 Juli 2023',
    tanggalLahir: '2008-08-10',
    umur: 18,
    kategoriUmur: 'Remaja'
  },
  {
    id: 8,
    nama: 'Dimas Pratama',
    whatsapp: '6282145678901',
    domisili: 'Malang',
    tipeKunjungan: 'pengajian',
    status: 'terverifikasi',
    namaAcara: 'Rombongan Pengajian Masjid Al-Huda',
    tanggalKunjungan: '14 Agustus 2023',
    tanggalLahir: '1975-03-14',
    umur: 51,
    kategoriUmur: 'Lansia'
  }
]

/* =========================================================
   LOAD DATA
========================================================= */

async function loadEntries() {
  isLoading.value = true

  try {
    const res = await getGuestBookData({
      page: page.value,
      ...filters.value
    })

    const apiData = Array.isArray(res?.data)
      ? res.data
      : []

    if (apiData.length > 0) {
      entries.value = apiData as GuestBookRecord[]
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
  let data = [...demoEntries]

  if (filters.value.tipeKunjungan) {
    data = data.filter(
      member =>
        member.tipeKunjungan === filters.value.tipeKunjungan
    )
  }

  if (filters.value.kategoriUmur) {
    data = data.filter(
      member =>
        member.kategoriUmur === filters.value.kategoriUmur
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

  entries.value =
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
    loadEntries()
  },
  { deep: true }
)

watch(page, () => {
  if (isDemoData.value) {
    useDemoData()
  } else {
    loadEntries()
  }
})

onMounted(() => {
  loadEntries()
})

/* =========================================================
   GROUPING
========================================================= */

const groupedEvents = computed(() => {
  const groups = new Map<string, GroupedEvent>()
  
  for (const record of entries.value) {
    const key = `${record.namaAcara || 'Tanpa Acara'}-${record.tanggalKunjungan || '-'}`
    if (!groups.has(key)) {
      groups.set(key, {
        id: key,
        namaAcara: record.namaAcara || 'Tanpa Acara',
        tanggalKunjungan: record.tanggalKunjungan || '-',
        tipeKunjungan: record.tipeKunjungan || 'pengajian',
        picNama: record.nama || '-',
        picWhatsapp: record.whatsapp || '-',
        picDomisili: record.domisili || '-',
        status: record.status || 'terdaftar',
        members: []
      })
    }
    groups.get(key)!.members.push(record)
  }
  
  return Array.from(groups.values())
})

/* =========================================================
   SELECTION
========================================================= */

const allSelected = computed(() => {
  return (
    entries.value.length > 0 &&
    entries.value.every(member =>
      selected.value.includes(member.id)
    )
  )
})

function toggleGuestBookRecord(id: number) {
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

function toggleGroupedEvent(evt: GroupedEvent) {
  const evtMemberIds = evt.members.map(m => m.id)
  const isAllSelected = evtMemberIds.every(id => selected.value.includes(id))
  
  if (isAllSelected) {
    selected.value = selected.value.filter(id => !evtMemberIds.includes(id))
  } else {
    const newSelected = [...selected.value]
    evtMemberIds.forEach(id => {
      if (!newSelected.includes(id)) newSelected.push(id)
    })
    selected.value = newSelected
  }
}

function isGroupedEventSelected(evt: GroupedEvent) {
  const evtMemberIds = evt.members.map(m => m.id)
  return evtMemberIds.length > 0 && evtMemberIds.every(id => selected.value.includes(id))
}

function toggleAll() {
  if (allSelected.value) {
    selected.value = selected.value.filter(
      id =>
        !entries.value.some(
          member => member.id === id
        )
    )
  } else {
    const ids = entries.value.map(
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

const selectedEvent = ref<GroupedEvent | null>(null)

function openEventDetail(evt: GroupedEvent) {
  selectedEvent.value = evt
  showDetailModal.value = true
}

function closeEventDetail() {
  showDetailModal.value = false
  selectedEvent.value = null
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
    tipeKunjungan: '',
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


const totalGuestBookRecordPR = computed(() => entries.value.filter(m => m.tipeKunjungan === 'pengajian').length)
const totalGuestBookRecordPP = computed(() => entries.value.filter(m => m.tipeKunjungan === 'hall').length)
const totalGuestBookRecordPT = computed(() => entries.value.filter(m => m.tipeKunjungan === 'b2b').length)

const totalGuestBookRecord = computed(() =>
  total.value
)

const totalAktif = computed(() =>
  entries.value.filter(
    member =>
      member.status === 'terdaftar'
  ).length
)

const totalWhatsApp = computed(() =>
  entries.value.filter(
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

function getVisitTypeLabel(
  type?: string
) {
  const labels: Record<string, string> = {
    PR: 'Reguler',
    PP: 'Pengajian',
    PT: 'B2B / Travel',
    pengajian: 'Pengajian',
    hall: 'Sewa Hall',
    b2b: 'B2B / Travel',
    edukasi: 'Wisata Edukasi',
    reguler: 'Reguler'
  }

  return labels[type || ''] || (type ? type.charAt(0).toUpperCase() + type.slice(1) : '-')
}

function getTypeClass(type?: string) {
  if (type === 'pengajian' || type === 'PP') return 'visit-pengajian'
  if (type === 'hall') return 'visit-hall'
  if (type === 'b2b' || type === 'PT') return 'visit-b2b'
  if (type === 'edukasi') return 'visit-edukasi'

  return 'visit-reguler'
}
</script>

<template>
  <div class="crm-page reports-container">
    <!-- HEADER PATTERN KAMPUNG COKLAT -->
    <header class="executive-command-header">
      <div class="brand-text-wrapper">
        <h1 class="header-main-title">Data Guestbook</h1>
        <div class="header-meta-clean-line">
          Kelola data dan hubungan dengan member Kampung Coklat.
        </div>
      </div>
    </header>
    
      <!-- GuestBookRecord Overview Counters -->
      <div class="metrics-grid">
        <div class="metric-card mc-border-blue">
          <div class="metric-icon bg-blue-light text-blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">TOTAL GUESTBOOK CRM</p>
            <h2 class="metric-value">{{ totalGuestBookRecord.toLocaleString('id-ID') }} <span class="metric-unit">Kontak</span></h2>
          </div>
        </div>

        <div class="metric-card mc-border-orange">
          <div class="metric-icon bg-orange-light text-orange">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">GUESTBOOK REGULER (PR)</p>
            <h2 class="metric-value">{{ totalGuestBookRecordPR.toLocaleString('id-ID') }} <span class="metric-unit">Guest</span></h2>
          </div>
        </div>

        <div class="metric-card mc-border-green">
          <div class="metric-icon bg-green-light text-green">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v2" />
              <path d="M12 4c-3 0-5 3-5 6v8H5v2h14v-2h-2v-8c0-3-2-6-5-6z" />
              <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Jamaah Pengajian (PP)</p>
            <h2 class="metric-value">{{ totalGuestBookRecordPP.toLocaleString('id-ID') }} <span class="metric-unit">Jamaah</span></h2>
          </div>
        </div>

        <div class="metric-card mc-border-red">
          <div class="metric-icon bg-red-light text-red">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>
            </svg>
          </div>
          <div class="metric-content">
            <p class="metric-label">Agen Tour / B2B (PT)</p>
            <h2 class="metric-value">{{ totalGuestBookRecordPT.toLocaleString('id-ID') }} <span class="metric-unit">Agen</span></h2>
          </div>
        </div>
      </div>
      <!-- GuestBookRecord CRM Table with Filter & Blast WA Action Placeholder -->
      <div class="content-card">
        <div class="card-head search-head">
          <div>
            <h3 class="card-title">Direktori Database GuestBookRecord Loyalitas CRM</h3>
            <span class="card-subtitle">Profil WhatsApp, asal kota domisili, dan riwayat kunjungan</span>
          </div>

          <div class="member-filter-row">
            <div class="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                v-model="filters.search"
                type="text"
                class="search-input"
                placeholder="Cari nama atau WA..."
              />
            </div>
            <select v-model="filters.tipeKunjungan" class="filter-select">
              <option value="">Semua Tujuan Kunjungan</option>
              <option value="pengajian">Pengajian</option>
              <option value="hall">Pengguna Hall / Event</option>
              <option value="b2b">B2B / Travel</option>
            </select>

            <select v-model="filters.kategoriUmur" class="filter-select">
              <option value="">Semua Kategori Umur</option>
              <option value="Anak-Anak">Anak-Anak (< 12 th)</option>
              <option value="Remaja">Remaja (12-24 th)</option>
              <option value="Dewasa">Dewasa (25-49 th)</option>
              <option value="Lansia">Lansia (50+ th)</option>
            </select>

            <button type="button" class="whatsapp-box-btn" @click="openBlast">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" class="box-wa-icon" />
              <span>WA Blast Promo</span>
              <span v-if="selected.length" class="box-wa-badge">{{ selected.length }}</span>
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="report-table">
            <thead>
              <tr>
                <th class="checkbox-column">
                  <input
                    type="checkbox"
                    :checked="allSelected"
                    @change="toggleAll"
                  >
                </th>
                <th>Nama Acara</th>
                <th>Nama PIC / Rombongan</th>
                <th>WhatsApp PIC</th>
                <th>Domisili PIC</th>
                <th>Usia PIC & Kategori</th>
                <th>Tujuan Kunjungan</th>
                <th>Tanggal Kunjungan</th>
                <th>Status</th>
                <th class="col-action">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="evt in groupedEvents" :key="evt.id">
                <td>
                  <input
                    type="checkbox"
                    :checked="isGroupedEventSelected(evt)"
                    @change="toggleGroupedEvent(evt)"
                  >
                </td>
                <td class="font-medium">{{ evt.namaAcara }}</td>
                <td>{{ evt.picNama }}</td>
                <td class="font-mono text-cocoa font-bold">{{ formatWhatsApp(evt.picWhatsapp) }}</td>
                <td>{{ evt.picDomisili || '-' }}</td>
                <td>
                  <div class="crm-table-cell-age">
                    <span class="crm-age-val">{{ evt.members[0]?.umur ? evt.members[0].umur + ' th' : '-' }}</span>
                    <span 
                      v-if="evt.members[0]?.kategoriUmur" 
                      class="crm-age-pill" 
                      :class="`age-${evt.members[0].kategoriUmur.toLowerCase().replace(/[^a-z]/g, '')}`"
                    >
                      {{ evt.members[0].kategoriUmur }}
                    </span>
                  </div>
                </td>
                <td>
                  <span class="plain-type-text">{{ getVisitTypeLabel(evt.tipeKunjungan) }}</span>
                </td>
                <td>{{ evt.tanggalKunjungan || '-' }}</td>
                <td>
                  <span v-if="evt.status === 'terdaftar'" class="badge-voucher">Voucher Aktif</span>
                  <span v-else class="text-xs text-muted">Tidak ada</span>
                </td>
                <td class="col-action-cell">
                  <button
                    class="btn-primary btn-sm"
                    style="padding: 4px 8px; font-size: 11px;"
                    @click="openEventDetail(evt)"
                  >
                    View ›
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    

    <!-- MODALS AND OVERLAYS -->
<!-- DEMO BADGE -->

    <!-- MEMBER DETAIL -->

        <Teleport to="body">
      <div v-if="showDetailModal && selectedEvent" class="modal-backdrop" @click.self="closeEventDetail">
        <div class="modal-card" style="max-width: 700px;">
          <div class="modal-header">
            <div class="modal-head-title">
              <div class="modal-icon-badge" style="background-color: #FFF6E8; border: 1px solid #FDE68A; color: #B45309;">👥</div>
              <div>
                <h3>Detail Acara: {{ selectedEvent.namaAcara }}</h3>
                <p class="modal-sub">{{ selectedEvent.tanggalKunjungan }} | {{ selectedEvent.members.length }} Peserta</p>
              </div>
            </div>
            <button class="btn-close" @click="closeEventDetail">×</button>
          </div>
          <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
             <table class="report-table" style="width: 100%; border-collapse: collapse;">
               <thead>
                 <tr>
                   <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee; width: 40px;">
                     <!-- Optional: Select All for this event could be added here, but leaving blank is fine for simplicity -->
                   </th>
                   <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Nama Lengkap</th>
                   <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">WhatsApp</th>
                   <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Domisili</th>
                   <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Status</th>
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="member in selectedEvent.members" :key="member.id">
                   <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
                     <input 
                       type="checkbox" 
                       :checked="selected.includes(member.id)" 
                       @change="toggleGuestBookRecord(member.id)"
                     >
                   </td>
                   <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ member.nama }}</td>
                   <td style="padding: 10px; border-bottom: 1px solid #eee;" class="font-mono text-cocoa font-bold">{{ formatWhatsApp(member.whatsapp) }}</td>
                   <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ member.domisili || '-' }}</td>
                   <td style="padding: 10px; border-bottom: 1px solid #eee;">
                     <span v-if="member.status === 'terdaftar'" class="badge-voucher">Voucher Aktif</span>
                     <span v-else class="text-xs text-muted">Tidak ada</span>
                   </td>
                 </tr>
               </tbody>
             </table>
          </div>
          <div class="modal-footer" style="margin-top: 10px;">
            <button class="btn-sm" style="background: white; color: #6B5A52; border: 1px solid #E5E7EB; border-radius: 6px; cursor: pointer; padding: 0 16px; font-weight: 600;" @click="closeEventDetail">Tutup</button>
            <button class="btn-primary btn-sm" style="border-radius: 6px; padding: 0 16px; background: #25D366; border: none; color: white; display: flex; align-items: center; gap: 6px; font-weight: 600; cursor: pointer;" @click="closeEventDetail(); openBlast();">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> Kirim WA ke Terpilih
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- BLAST MODAL -->

    <CrmBlastConfirmModul
      :show="showBlastModal"
      :target-ids="selected"
      :members="entries"
      @close="showBlastModal = false"
      @sent="handleBlastSent"
    />

    <!-- FAB Removed -->

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

.reports-container {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.executive-command-header {
  background: transparent;
  padding: 10px 0 24px 0;
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

.btn-download-report {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  border: 1px solid #E2D9CE;
  color: #1F120B;
  padding: 0 16px;
  height: 42px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.btn-download-report:hover {
  background: #FFFDF9;
  border-color: #D97706;
  color: #D97706;
}

/* Tab Navigation */
.tabs-nav-bar {
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
  overflow-x: auto;
}

.tab-nav-btn {
  flex: 1;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  border: none;
  background: transparent;
  color: #6B5A52;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.tab-nav-btn:hover {
  background-color: #F9FAFB;
  color: var(--color-primary, #2C1A13);
}

.tab-nav-btn.active {
  background-color: var(--color-primary, #2C1A13);
  color: #FFFFFF;
  font-weight: 600;
}

/* Filter Toolbar */
.filter-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 10px 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #6B5A52;
}

.filter-select {
  padding: 8px 16px;
  border: 1px solid #CBD5E1;
  border-radius: 99px;
  font-family: inherit;
  font-size: 14px;
  color: #8BA3CB;
  background-color: #FFFFFF;
  outline: none;
  cursor: pointer;
  appearance: auto;
  box-sizing: border-box;
  height: 38px;
}

.date-range-inputs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.date-input {
  padding: 5px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-family: inherit;
  font-size: 12px;
}

.data-count-tag {
  font-size: 12px;
  color: #6B5A52;
}

/* Tab Content */
.tab-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* KPI Rows */
.revenue-kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.rev-kpi-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rev-label {
  font-size: 11.5px;
  color: #6B5A52;
  text-transform: uppercase;
  font-weight: 500;
}

.rev-val {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
}

.rev-sub {
  font-size: 11.5px;
  color: #9CA3AF;
}

/* Content Cards */
.content-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.card-subtitle {
  font-size: 12px;
  color: #6B5A52;
}

.badge-amber {
  background-color: rgba(242, 151, 39, 0.15);
  color: #B45309;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}

.chart-box {
  height: 280px;
  position: relative;
}

.chart-box-donut, .chart-box-bar {
  height: 240px;
  position: relative;
}

/* Tables */
.table-responsive {
  overflow-x: auto;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.report-table th {
  background-color: #F9FAFB;
  color: #6B7280;
  font-size: 10.5px !important;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 14px 16px;
  border-bottom: 2px solid #E5E7EB;
  text-align: left;
  
  white-space: nowrap;
}

.report-table td {
  padding: 16px 16px;
  border-bottom: 1px solid #F3F4F6;
  color: #374151;
  vertical-align: middle;
  font-size: 12px !important;
  
  white-space: nowrap;
}

.report-table .col-action,
.report-table .col-action-cell,
.report-table .checkbox-column {
  text-align: center !important;
}
.report-table td:first-child,
.report-table th:first-child {
  text-align: center !important;
}

.text-right { text-align: right; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.font-mono { font-family: inherit; font-size: inherit !important; letter-spacing: 0px; }
.text-amber { color: #B45309; }
.text-cocoa { color: var(--color-primary, #2C1A13); }
.text-green { color: #047857; }
.text-blue { color: #1D4ED8; }
.text-gray { color: #6B7280; }
.text-red { color: #DC2626; }
.text-xs { font-size: 11px; }
.text-muted { color: #9CA3AF; }

/* Status Pills */
.status-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}

.pill-used { background-color: #ECFDF5; color: #047857; }
.pill-active { background-color: #EFF6FF; color: #1D4ED8; }
.pill-expired { background-color: #F3F4F6; color: #6B7280; }

.member-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
}

/* CRM Table Age & Visit Badges (Super Clean & Structured) */
.crm-table-cell-age {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
}

.crm-age-val {
  font-weight: 800;
  font-size: 13.5px;
  color: #1E293B;
  line-height: 1.2;
}

.crm-age-pill {
  display: inline-flex;
  align-items: center;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 5px;
  line-height: 1.2;
}

.crm-age-pill.age-anak,
.crm-age-pill.age-anakanak {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
}

.crm-age-pill.age-remaja {
  background: #FEF3C7;
  color: #B45309;
  border: 1px solid #FDE68A;
}

.crm-age-pill.age-dewasa {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.crm-age-pill.age-lansia {
  background: #F3E8FF;
  color: #7E22CE;
  border: 1px solid #E9D5FF;
}

.plain-type-text {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
}

/* Visit Purpose Badges */
.crm-visit-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

.crm-visit-badge.visit-pengajian,
.crm-visit-badge.visit-pp {
  background: #EEF2FF;
  color: #4338CA;
  border: 1px solid #C7D2FE;
}

.crm-visit-badge.visit-hall,
.crm-visit-badge.visit-sewahall {
  background: #FEF9C3;
  color: #854D0E;
  border: 1px solid #FEF08A;
}

.crm-visit-badge.visit-b2b,
.crm-visit-badge.visit-pt,
.crm-visit-badge.visit-travel {
  background: #E0F2FE;
  color: #0369A1;
  border: 1px solid #BAE6FD;
}

.crm-visit-badge.visit-edukasi {
  background: #ECFDF5;
  color: #065F46;
  border: 1px solid #A7F3D0;
}

.crm-visit-badge.visit-pr,
.crm-visit-badge.visit-reguler {
  background: #F1F5F9;
  color: #475569;
  border: 1px solid #E2E8F0;
}

.badge-voucher {
  background-color: #ECFDF5;
  color: #047857;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Ticket Status Grid */
.ticket-status-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.ticket-stat-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 14px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.border-green { border-top: 3px solid #10B981; }
.border-blue { border-top: 3px solid #3B82F6; }
.border-gray { border-top: 3px solid #9CA3AF; }
.border-amber { border-top: 3px solid #F29727; }
.border-all { border-top: 3px solid var(--color-primary, #2C1A13); }

.t-stat-label { font-size: 11px; color: #6B5A52; text-transform: uppercase; font-weight: 500; }
.t-stat-val { font-size: 22px; font-weight: 700; }
.t-stat-sub { font-size: 11px; color: #9CA3AF; }

/* Demographic Rows */
.demo-grid-row {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
}

.region-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.badge-local { background-color: #FFF6E8; color: #B45309; border: 1px solid #FDE68A; }
.badge-intercity { background-color: #F3F4F6; color: #4B5563; }

/* Search Head */
.search-head {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;
  margin-bottom: 16px;
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

.member-filter-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.member-filter-row .whatsapp-box-btn {
  margin-left: auto;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12.5px;
  height: 34px;
}

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
  font-size: 13px;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1px solid rgba(242, 151, 39, 0.3);
  padding: 2px 8px 2px 4px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #2C1A13;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.mini-chip-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.modal-head-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-icon-badge {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #FFF6E8;
  border: 1px solid #FDE68A;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-sub {
  font-size: 12px;
  color: #6B5A52;
  margin: 0;
}

.export-preview-box {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #FFFDF9 0%, #FFF8EE 100%);
  border: 1.5px solid rgba(242, 151, 39, 0.3);
  border-radius: 8px;
  padding: 12px 14px;
}

.preview-logo-box {
  width: 48px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E5E7EB;
  flex-shrink: 0;
}

.preview-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
}

.doc-title {
  font-size: 13.5px;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: -0.2px;
}

.doc-sub {
  font-size: 11px;
  color: #6B5A52;
}

.doc-tag {
  font-size: 10px;
  font-weight: 600;
  color: #B45309;
  background: rgba(242, 151, 39, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
  width: fit-content;
  margin-top: 2px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #E5E7EB;
  padding-top: 12px;
}

@media (max-width: 1024px) {
  .revenue-kpi-row,
  .ticket-status-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-grid-row {
    grid-template-columns: 1fr;
  }
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

  .entries-header {
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
.entries-header p,
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

.entries-header h2,
.detail-header h2 {
  margin: 3px 0 0;
  color: #111827;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

/* WhatsApp Box Button */
.whatsapp-box-btn {
  height: 38px;
  padding: 0 16px;
  background-color: #25D366;
  color: white;
  border-radius: 8px;
  border: none;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 13px;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
}

.whatsapp-box-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(37, 211, 102, 0.35);
}

.box-wa-icon {
  width: 18px;
  height: 18px;
}

.box-wa-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #EF4444;
  color: white;
  font-size: 10px;
  font-weight: 800;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
}


/* Metrics Grid Sync */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
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
.metric-card.mc-border-orange { border-left-color: #F59E0B; }
.metric-card.mc-border-green { border-left-color: #10B981; }
.metric-card.mc-border-blue { border-left-color: #3B82F6; }
.metric-card.mc-border-red { border-left-color: #EF4444; }

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

.metric-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.metric-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #6B7280;
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  font-size: 14px;
  font-weight: 600;
  color: #9CA3AF;
}

@media (max-width: 1024px) {
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>