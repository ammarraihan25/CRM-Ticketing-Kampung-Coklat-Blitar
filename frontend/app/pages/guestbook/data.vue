<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

type VisitType =
  | 'pengajian'
  | 'hall'
  | 'b2b'

interface GuestBookRecord {

  id: string

  nama: string

  whatsapp: string

  domisili: string

  tipeKunjungan: VisitType

  createdAt: string

  status: 'terdaftar' | 'terverifikasi'

}


/* =========================================================
   DATA SEMENTARA
========================================================= */

const guestBooks = ref<GuestBookRecord[]>([

  {
    id: 'GB-0001',
    nama: 'Ahmad Fauzan',
    whatsapp: '081234567890',
    domisili: 'Blitar',
    tipeKunjungan: 'pengajian',
    createdAt: '21 Agustus 2026, 08:15',
    status: 'terverifikasi'
  },

  {
    id: 'GB-0002',
    nama: 'Siti Aminah',
    whatsapp: '082234567891',
    domisili: 'Kediri',
    tipeKunjungan: 'pengajian',
    createdAt: '21 Agustus 2026, 08:22',
    status: 'terverifikasi'
  },

  {
    id: 'GB-0003',
    nama: 'Budi Santoso',
    whatsapp: '083334567892',
    domisili: 'Malang',
    tipeKunjungan: 'hall',
    createdAt: '21 Agustus 2026, 09:05',
    status: 'terverifikasi'
  },

  {
    id: 'GB-0004',
    nama: 'PT Wisata Nusantara',
    whatsapp: '084434567893',
    domisili: 'Surabaya',
    tipeKunjungan: 'b2b',
    createdAt: '21 Agustus 2026, 09:30',
    status: 'terverifikasi'
  },

  {
    id: 'GB-0005',
    nama: 'Dewi Lestari',
    whatsapp: '085534567894',
    domisili: 'Tulungagung',
    tipeKunjungan: 'hall',
    createdAt: '21 Agustus 2026, 10:10',
    status: 'terverifikasi'
  }

])


/* =========================================================
   FILTER
========================================================= */

const search = ref('')

const selectedType = ref<VisitType | ''>('')

const selectedStatus = ref('')


/* =========================================================
   LABEL
========================================================= */

function getTypeLabel(type: VisitType) {

  const labels = {
    pengajian: 'Pengajian',
    hall: 'Hall / Event',
    b2b: 'B2B / Travel'
  }

  return labels[type]

}


function getTypeClass(type: VisitType) {

  return `type-${type}`

}


/* =========================================================
   FILTERED DATA
========================================================= */

const filteredGuestBooks = computed(() => {

  return guestBooks.value.filter((item) => {

    const keyword = search.value
      .toLowerCase()
      .trim()

    const matchSearch =
      !keyword ||
      item.nama.toLowerCase().includes(keyword) ||
      item.whatsapp.includes(keyword) ||
      item.domisili.toLowerCase().includes(keyword)

    const matchType =
      !selectedType.value ||
      item.tipeKunjungan === selectedType.value

    const matchStatus =
      !selectedStatus.value ||
      item.status === selectedStatus.value

    return (
      matchSearch &&
      matchType &&
      matchStatus
    )

  })

})


/* =========================================================
   SUMMARY
========================================================= */

const totalGuest = computed(() => {

  return guestBooks.value.length

})


const totalPengajian = computed(() => {

  return guestBooks.value.filter(
    item => item.tipeKunjungan === 'pengajian'
  ).length

})


const totalHall = computed(() => {

  return guestBooks.value.filter(
    item => item.tipeKunjungan === 'hall'
  ).length

})


const totalB2B = computed(() => {

  return guestBooks.value.filter(
    item => item.tipeKunjungan === 'b2b'
  ).length

})


/* =========================================================
   RESET FILTER
========================================================= */

function resetFilter() {

  search.value = ''

  selectedType.value = ''

  selectedStatus.value = ''

}

</script>


<template>

  <div class="guestbook-data-page">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="page-header">

      <div>

        <div class="breadcrumb">
          Guest Book
          <span>/</span>
          Data Guest Book
        </div>

        <h1>
          Data Guest Book
        </h1>

        <p>
          Kelola dan pantau data pengunjung yang
          melakukan registrasi melalui Digital Guest Book.
        </p>

      </div>


      <NuxtLink
        to="/guestbook"
        class="primary-button"
      >
        + Isi Guest Book
      </NuxtLink>

    </div>


    <!-- =====================================================
         SUMMARY
    ====================================================== -->

    <div class="summary-grid">

      <div class="summary-card">

        <div class="summary-icon">
          👥
        </div>

        <div>

          <span>
            Total Pengunjung
          </span>

          <strong>
            {{ totalGuest }}
          </strong>

        </div>

      </div>


      <div class="summary-card">

        <div class="summary-icon orange">
          🕌
        </div>

        <div>

          <span>
            Pengajian
          </span>

          <strong>
            {{ totalPengajian }}
          </strong>

        </div>

      </div>


      <div class="summary-card">

        <div class="summary-icon brown">
          🏛️
        </div>

        <div>

          <span>
            Hall / Event
          </span>

          <strong>
            {{ totalHall }}
          </strong>

        </div>

      </div>


      <div class="summary-card">

        <div class="summary-icon gold">
          🤝
        </div>

        <div>

          <span>
            B2B / Travel
          </span>

          <strong>
            {{ totalB2B }}
          </strong>

        </div>

      </div>

    </div>


    <!-- =====================================================
         TABLE CARD
    ====================================================== -->

    <div class="table-card">


      <!-- FILTER HEADER -->

      <div class="table-toolbar">

        <div>

          <h2>
            Riwayat Guest Book
          </h2>

          <span>
            {{ filteredGuestBooks.length }}
            data ditemukan
          </span>

        </div>


        <div class="filters">

          <!-- SEARCH -->

          <div class="search-box">

            <span>
              🔍
            </span>

            <input
              v-model="search"
              type="text"
              placeholder="Cari nama, WhatsApp, domisili..."
            />

          </div>


          <!-- TYPE -->

          <select
            v-model="selectedType"
            class="filter-select"
          >

            <option value="">
              Semua Tipe
            </option>

            <option value="pengajian">
              Pengajian
            </option>

            <option value="hall">
              Hall / Event
            </option>

            <option value="b2b">
              B2B / Travel
            </option>

          </select>


          <!-- STATUS -->

          <select
            v-model="selectedStatus"
            class="filter-select"
          >

            <option value="">
              Semua Status
            </option>

            <option value="terverifikasi">
              Terverifikasi
            </option>

            <option value="terdaftar">
              Terdaftar
            </option>

          </select>


          <button
            class="reset-button"
            @click="resetFilter"
          >
            Reset
          </button>

        </div>

      </div>


      <!-- ===================================================
           TABLE
      ==================================================== -->

      <div class="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Pengunjung
              </th>

              <th>
                WhatsApp
              </th>

              <th>
                Domisili
              </th>

              <th>
                Tipe Kunjungan
              </th>

              <th>
                Waktu
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>


          <tbody>

            <tr
              v-for="item in filteredGuestBooks"
              :key="item.id"
            >

              <td>

                <span class="guest-id">
                  {{ item.id }}
                </span>

              </td>


              <td>

                <div class="guest-name">

                  <div class="avatar">
                    {{ item.nama.charAt(0).toUpperCase() }}
                  </div>

                  <strong>
                    {{ item.nama }}
                  </strong>

                </div>

              </td>


              <td>
                {{ item.whatsapp }}
              </td>


              <td>
                {{ item.domisili }}
              </td>


              <td>

                <span
                  class="type-badge"
                  :class="getTypeClass(item.tipeKunjungan)"
                >
                  {{ getTypeLabel(item.tipeKunjungan) }}
                </span>

              </td>


              <td>

                <span class="date-text">
                  {{ item.createdAt }}
                </span>

              </td>


              <td>

                <span
                  class="status-badge"
                  :class="item.status"
                >

                  <span class="status-dot"></span>

                  {{ item.status === 'terverifikasi'
                    ? 'Terverifikasi'
                    : 'Terdaftar'
                  }}

                </span>

              </td>

            </tr>


            <!-- EMPTY -->

            <tr
              v-if="filteredGuestBooks.length === 0"
            >

              <td
                colspan="7"
                class="empty-state"
              >

                <div>
                  🔍
                </div>

                <strong>
                  Data tidak ditemukan
                </strong>

                <span>
                  Coba ubah kata kunci atau filter.
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</template>


<style scoped>

* {
  box-sizing: border-box;
}

.guestbook-data-page {
  min-height: 100vh;

  padding: 32px;

  background: #f8f5f2;

  color: #342118;
}


/* =========================================================
   HEADER
========================================================= */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  gap: 30px;

  margin-bottom: 30px;
}

.breadcrumb {
  display: flex;

  gap: 8px;

  color: #9a8a81;

  font-size: 14px;

  margin-bottom: 10px;
}

.breadcrumb span {
  color: #c8bbb3;
}

.page-header h1 {
  margin: 0;

  color: #321d16;

  font-size: 34px;

  font-weight: 800;
}

.page-header p {
  margin: 8px 0 0;

  color: #8b7970;

  font-size: 15px;
}

.primary-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 13px 20px;

  border-radius: 12px;

  background: #382117;

  color: white;

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;

  transition: 0.2s ease;
}

.primary-button:hover {
  background: #4c2b1d;

  transform: translateY(-2px);
}


/* =========================================================
   SUMMARY
========================================================= */

.summary-grid {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 18px;

  margin-bottom: 24px;
}

.summary-card {
  display: flex;

  align-items: center;

  gap: 15px;

  padding: 20px;

  background: white;

  border: 1px solid #eadfd8;

  border-radius: 16px;

  box-shadow:
    0 5px 20px rgba(45, 27, 19, 0.04);
}

.summary-icon {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;

  background: #f3ebe5;

  font-size: 22px;
}

.summary-icon.orange {
  background: #fff0dc;
}

.summary-icon.brown {
  background: #eee4df;
}

.summary-icon.gold {
  background: #fff4d9;
}

.summary-card span {
  display: block;

  color: #8e7c73;

  font-size: 13px;

  margin-bottom: 4px;
}

.summary-card strong {
  display: block;

  color: #342017;

  font-size: 26px;

  font-weight: 800;
}


/* =========================================================
   TABLE CARD
========================================================= */

.table-card {
  overflow: hidden;

  background: white;

  border: 1px solid #eadfd8;

  border-radius: 18px;

  box-shadow:
    0 8px 25px rgba(45, 27, 19, 0.05);
}


/* =========================================================
   TOOLBAR
========================================================= */

.table-toolbar {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 25px;

  padding: 22px 24px;

  border-bottom: 1px solid #eee5df;
}

.table-toolbar h2 {
  margin: 0;

  color: #342017;

  font-size: 19px;

  font-weight: 800;
}

.table-toolbar > div:first-child span {
  display: block;

  margin-top: 5px;

  color: #a08f86;

  font-size: 13px;
}

.filters {
  display: flex;

  align-items: center;

  gap: 10px;
}

.search-box {
  width: 260px;

  height: 42px;

  display: flex;

  align-items: center;

  gap: 8px;

  padding: 0 13px;

  border: 1px solid #ded3cc;

  border-radius: 10px;

  background: white;
}

.search-box span {
  font-size: 15px;
}

.search-box input {
  width: 100%;

  border: none;

  outline: none;

  background: transparent;

  color: #39251d;

  font-size: 13px;
}

.search-box input::placeholder {
  color: #afa29b;
}

.filter-select {
  height: 42px;

  padding: 0 12px;

  border: 1px solid #ded3cc;

  border-radius: 10px;

  background: white;

  color: #5b463c;

  font-size: 13px;

  outline: none;

  cursor: pointer;
}

.reset-button {
  height: 42px;

  padding: 0 14px;

  border: 1px solid #ded3cc;

  border-radius: 10px;

  background: #faf7f5;

  color: #705e55;

  font-size: 13px;

  cursor: pointer;
}

.reset-button:hover {
  background: #f3ece7;
}


/* =========================================================
   TABLE
========================================================= */

.table-wrapper {
  width: 100%;

  overflow-x: auto;
}

table {
  width: 100%;

  min-width: 1050px;

  border-collapse: collapse;
}

thead {
  background: #faf7f5;
}

th {
  padding: 15px 20px;

  text-align: left;

  color: #8a786f;

  font-size: 12px;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.5px;

  white-space: nowrap;
}

td {
  padding: 17px 20px;

  border-top: 1px solid #f0e9e4;

  color: #5c4940;

  font-size: 14px;

  white-space: nowrap;
}

tbody tr:hover {
  background: #fffaf6;
}


/* =========================================================
   GUEST
========================================================= */

.guest-id {
  color: #a08d84;

  font-family: monospace;

  font-size: 13px;
}

.guest-name {
  display: flex;

  align-items: center;

  gap: 11px;
}

.avatar {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #f5e9df;

  color: #7d4d36;

  font-size: 13px;

  font-weight: 800;
}

.guest-name strong {
  color: #38241c;

  font-size: 14px;
}


/* =========================================================
   TYPE BADGE
========================================================= */

.type-badge {
  display: inline-flex;

  align-items: center;

  padding: 6px 10px;

  border-radius: 8px;

  font-size: 12px;

  font-weight: 700;
}

.type-pengajian {
  background: #fff0dd;

  color: #bd6a0e;
}

.type-hall {
  background: #eee7e2;

  color: #65483a;
}

.type-b2b {
  background: #fff5d9;

  color: #8a6719;
}


/* =========================================================
   STATUS
========================================================= */

.status-badge {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding: 6px 10px;

  border-radius: 8px;

  font-size: 12px;

  font-weight: 700;
}

.status-badge.terverifikasi {
  background: #eaf7ef;

  color: #26834c;
}

.status-badge.terdaftar {
  background: #fff4df;

  color: #b36b0d;
}

.status-dot {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: currentColor;
}


/* =========================================================
   DATE
========================================================= */

.date-text {
  color: #85746b;

  font-size: 13px;
}


/* =========================================================
   EMPTY
========================================================= */

.empty-state {
  height: 280px;

  text-align: center;

  color: #9a8980;
}

.empty-state div {
  font-size: 36px;

  margin-bottom: 10px;
}

.empty-state strong {
  display: block;

  color: #5e493f;

  font-size: 16px;

  margin-bottom: 5px;
}

.empty-state span {
  font-size: 13px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 1200px) {

  .summary-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .table-toolbar {
    align-items: flex-start;

    flex-direction: column;
  }

  .filters {
    width: 100%;

    flex-wrap: wrap;
  }

}


@media (max-width: 700px) {

  .guestbook-data-page {
    padding: 20px;
  }

  .page-header {
    align-items: flex-start;

    flex-direction: column;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    align-items: stretch;

    flex-direction: column;
  }

  .search-box,
  .filter-select,
  .reset-button {
    width: 100%;
  }

}

</style>