<script setup lang="ts">
import type { Member } from '~/composables/useCrmApi'

definePageMeta({
  layout: 'admin'
})

const { getMembers } = useCrmApi()

const filters = ref({
  tipeMember: '',
  domisili: ''
})

const page = ref(1)
const perPage = 10

const members = ref<Member[]>([])
const total = ref(0)

const selected = ref<number[]>([])
const showBlastModal = ref(false)
const isLoading = ref(false)

async function loadMembers() {
  isLoading.value = true

  try {
    const res = await getMembers({
      page: page.value,
      ...filters.value
    })

    members.value = res.data
    total.value = res.total
  } catch (error) {
    console.error('Gagal memuat data member:', error)

    members.value = []
    total.value = 0
  } finally {
    isLoading.value = false
  }
}

watch(
  filters,
  () => {
    page.value = 1
    loadMembers()
  },
  { deep: true }
)

watch(page, loadMembers)

onMounted(loadMembers)

function handleBlastSent() {
  showBlastModal.value = false
  selected.value = []
}

function resetFilter() {
  filters.value = {
    tipeMember: '',
    domisili: ''
  }
}

const totalMember = computed(() => total.value)

const totalAktif = computed(() => {
  return members.value.length
})

const totalWhatsApp = computed(() => {
  return members.value.filter(
    member => !!member.whatsapp
  ).length
})
</script>

<template>
  <div class="crm-page">

    <!-- =========================================
         PAGE HEADER
    ========================================== -->

    <div class="page-header">

      <div class="header-content">

        <div class="breadcrumb">
          <span>CRM</span>
          <span>/</span>
          <strong>Data Member</strong>
        </div>

        <div class="title-wrapper">

          <div class="title-icon">
            <span>👥</span>
          </div>

          <div>
            <h1>Data Member</h1>

            <p>
              Kelola data dan hubungan dengan member
              Kampung Coklat.
            </p>
          </div>

        </div>

      </div>


      <button
        class="blast-button"
        :disabled="selected.length === 0"
        @click="showBlastModal = true"
      >
        <span class="wa-icon">◉</span>

        <span>Blast WhatsApp</span>

        <span
          v-if="selected.length"
          class="selected-count"
        >
          {{ selected.length }}
        </span>
      </button>

    </div>


    <!-- =========================================
         STATISTICS
    ========================================== -->

    <div class="stats-grid">

      <!-- TOTAL MEMBER -->

      <div class="stat-card">

        <div class="stat-icon stat-brown">
          👥
        </div>

        <div class="stat-content">

          <span>Total Member</span>

          <strong>
            {{ totalMember }}
          </strong>

          <small>
            Member terdaftar
          </small>

        </div>

      </div>


      <!-- MEMBER AKTIF -->

      <div class="stat-card">

        <div class="stat-icon stat-gold">
          ✓
        </div>

        <div class="stat-content">

          <span>Member Aktif</span>

          <strong>
            {{ totalAktif }}
          </strong>

          <small>
            Data pada halaman ini
          </small>

        </div>

      </div>


      <!-- WHATSAPP -->

      <div class="stat-card">

        <div class="stat-icon stat-green">
          💬
        </div>

        <div class="stat-content">

          <span>Kontak WhatsApp</span>

          <strong>
            {{ totalWhatsApp }}
          </strong>

          <small>
            Memiliki nomor WhatsApp
          </small>

        </div>

      </div>

    </div>


    <!-- =========================================
         MAIN CONTENT
    ========================================== -->

    <div class="content-card">

      <!-- CONTENT HEADER -->

      <div class="content-header">

        <div>

          <h2>Daftar Member</h2>

          <p>
            Lihat dan kelola informasi member
            Kampung Coklat.
          </p>

        </div>

        <div class="member-total">
          {{ total }} Member
        </div>

      </div>


      <!-- =====================================
           FILTER
      ====================================== -->

      <div class="filter-section">

        <div class="filter-title">

          <div class="filter-title-icon">
            ⚙
          </div>

          <div>
            <strong>Filter Member</strong>

            <span>
              Cari berdasarkan tipe dan domisili
            </span>
          </div>

        </div>


        <div class="filter-fields">

          <!-- TIPE -->

          <div class="filter-field">

            <label>
              Tipe Member
            </label>

            <div class="select-wrapper">

              <select
                v-model="filters.tipeMember"
              >
                <option value="">
                  Semua Tipe Member
                </option>

                <option value="Member Pengajian">
                  Member Pengajian
                </option>

                <option value="Member Reguler">
                  Member Reguler
                </option>

                <option value="Member Tour">
                  Member Tour
                </option>
              </select>

              <span>⌄</span>

            </div>

          </div>


          <!-- DOMISILI -->

          <div class="filter-field">

            <label>
              Domisili
            </label>

            <div class="input-wrapper">

              <span class="search-icon">
                🔍
              </span>

              <input
                v-model="filters.domisili"
                type="text"
                placeholder="Cari kota atau domisili..."
              />

            </div>

          </div>


          <!-- RESET -->

          <button
            class="reset-button"
            @click="resetFilter"
          >
            ↻
            Reset
          </button>

        </div>

      </div>


      <!-- =====================================
           SELECTED TOOLBAR
      ====================================== -->

      <div
        v-if="selected.length"
        class="selected-toolbar"
      >

        <div>

          <span class="selected-dot"></span>

          <strong>
            {{ selected.length }} member dipilih
          </strong>

          <span>
            Siap dikirimi pesan WhatsApp
          </span>

        </div>

        <button
          @click="showBlastModal = true"
        >
          💬 Kirim WhatsApp
        </button>

      </div>


      <!-- =====================================
           TABLE
      ====================================== -->

      <div class="table-wrapper">

        <div
          v-if="isLoading"
          class="loading-state"
        >

          <div class="loader"></div>

          <span>
            Memuat data member...
          </span>

        </div>


        <CrmMemberTable
          v-else
          v-model:selected="selected"
          :members="members"
          :page="page"
          :per-page="perPage"
          :total="total"
          @page-change="page = $event"
        />

      </div>

    </div>


    <!-- =========================================
         BLAST MODAL
    ========================================== -->

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
  padding: 30px;

  background:
    #f8f5f1;
}


/* =========================================
   HEADER
========================================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 25px;

  margin-bottom: 25px;
}

.header-content {
  flex: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;

  gap: 7px;

  margin-bottom: 12px;

  color: #a09389;

  font-size: 11px;
}

.breadcrumb strong {
  color: #6b4a37;
}

.title-wrapper {
  display: flex;
  align-items: center;

  gap: 14px;
}

.title-icon {
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  background: #eadbcf;

  color: #5b3826;

  font-size: 22px;
}

.title-wrapper h1 {
  margin: 0;

  color: #43291d;

  font-size: 28px;
  font-weight: 750;

  letter-spacing: -0.5px;
}

.title-wrapper p {
  margin: 5px 0 0;

  color: #8d8178;

  font-size: 12px;
}


/* =========================================
   BLAST BUTTON
========================================= */

.blast-button {
  min-height: 44px;

  display: flex;
  align-items: center;

  gap: 9px;

  padding: 0 16px;

  border: none;
  border-radius: 10px;

  background: #5b3826;

  color: white;

  font-family: inherit;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 6px 16px
    rgba(91, 56, 38, 0.18);

  transition: all 0.2s ease;
}

.blast-button:hover:not(:disabled) {
  background: #492d20;
  transform: translateY(-1px);
}

.blast-button:disabled {
  opacity: 0.45;

  cursor: not-allowed;

  box-shadow: none;
}

.wa-icon {
  width: 21px;
  height: 21px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    rgba(255,255,255,0.13);
}

.selected-count {
  min-width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #d4a04d;

  font-size: 10px;
}


/* =========================================
   STATISTICS
========================================= */

.stats-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 15px;

  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;

  gap: 14px;

  padding: 18px;

  border:
    1px solid #eee7df;

  border-radius: 15px;

  background: white;

  box-shadow:
    0 4px 16px
    rgba(70, 48, 33, 0.045);
}

.stat-icon {
  width: 45px;
  height: 45px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  font-size: 18px;
  font-weight: 700;
}

.stat-brown {
  background: #f0e3d8;
}

.stat-gold {
  background: #f6ead1;

  color: #8a682e;
}

.stat-green {
  background: #e5f0e8;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-content span {
  color: #91857c;

  font-size: 10px;
  font-weight: 600;
}

.stat-content strong {
  margin-top: 2px;

  color: #4a2d20;

  font-size: 23px;
  line-height: 1.2;
}

.stat-content small {
  margin-top: 3px;

  color: #aaa098;

  font-size: 10px;
}


/* =========================================
   CONTENT CARD
========================================= */

.content-card {
  overflow: hidden;

  border:
    1px solid #eee7df;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 4px 18px
    rgba(70, 48, 33, 0.045);
}

.content-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;

  border-bottom:
    1px solid #f0ebe6;
}

.content-header h2 {
  margin: 0;

  color: #4a2d20;

  font-size: 16px;
}

.content-header p {
  margin: 4px 0 0;

  color: #9a8f86;

  font-size: 11px;
}

.member-total {
  padding: 7px 11px;

  border-radius: 20px;

  background: #f5ede6;

  color: #67442f;

  font-size: 10px;
  font-weight: 600;
}


/* =========================================
   FILTER
========================================= */

.filter-section {
  padding: 18px 20px;

  background: #fcfaf8;

  border-bottom:
    1px solid #eee7df;
}

.filter-title {
  display: flex;
  align-items: center;

  gap: 10px;

  margin-bottom: 15px;
}

.filter-title-icon {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #eee1d6;

  color: #65422d;

  font-size: 14px;
}

.filter-title > div:last-child {
  display: flex;
  flex-direction: column;

  gap: 2px;
}

.filter-title strong {
  color: #5a3b29;

  font-size: 12px;
}

.filter-title span {
  color: #9d9289;

  font-size: 10px;
}

.filter-fields {
  display: grid;

  grid-template-columns:
    1fr 1fr auto;

  align-items: end;

  gap: 12px;
}

.filter-field {
  display: flex;
  flex-direction: column;

  gap: 6px;
}

.filter-field label {
  color: #66584e;

  font-size: 10px;
  font-weight: 600;
}

.select-wrapper,
.input-wrapper {
  position: relative;

  height: 40px;
}

.select-wrapper select,
.input-wrapper input {
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  border:
    1px solid #e3dad2;

  border-radius: 9px;

  outline: none;

  background: white;

  color: #5a4030;

  font-family: inherit;

  font-size: 11px;

  transition: 0.2s;
}

.select-wrapper select {
  appearance: none;

  padding: 0 35px 0 12px;

  cursor: pointer;
}

.select-wrapper > span {
  position: absolute;

  top: 50%;
  right: 12px;

  transform: translateY(-50%);

  color: #947e6c;

  pointer-events: none;
}

.input-wrapper input {
  padding: 0 12px 0 35px;
}

.input-wrapper input::placeholder {
  color: #b2a79f;
}

.select-wrapper select:focus,
.input-wrapper input:focus {
  border-color: #9c6d4c;

  box-shadow:
    0 0 0 3px
    rgba(156,109,76,0.08);
}

.search-icon {
  position: absolute;

  left: 12px;
  top: 50%;

  transform: translateY(-50%);

  font-size: 12px;

  pointer-events: none;
}

.reset-button {
  height: 40px;

  padding: 0 13px;

  border:
    1px solid #e0d6ce;

  border-radius: 9px;

  background: white;

  color: #725845;

  font-family: inherit;

  font-size: 10px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;
}

.reset-button:hover {
  background: #f7f1eb;
}


/* =========================================
   SELECTED TOOLBAR
========================================= */

.selected-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;

  background: #faf4ee;

  border-bottom:
    1px solid #eaded3;
}

.selected-toolbar > div {
  display: flex;
  align-items: center;

  gap: 7px;
}

.selected-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #8a5c3b;
}

.selected-toolbar strong {
  color: #62422f;

  font-size: 11px;
}

.selected-toolbar span:last-child {
  color: #a09288;

  font-size: 10px;
}

.selected-toolbar button {
  padding: 7px 11px;

  border: none;

  border-radius: 8px;

  background: #5b3826;

  color: white;

  font-family: inherit;

  font-size: 10px;
  font-weight: 600;

  cursor: pointer;
}


/* =========================================
   TABLE
========================================= */

.table-wrapper {
  min-height: 250px;
}


/* =========================================
   LOADING
========================================= */

.loading-state {
  min-height: 280px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

  color: #958a81;

  font-size: 11px;
}

.loader {
  width: 26px;
  height: 26px;

  border:
    3px solid #eadfd6;

  border-top-color: #65412b;

  border-radius: 50%;

  animation:
    spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 900px) {

  .crm-page {
    padding: 20px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .blast-button {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .filter-fields {
    grid-template-columns: 1fr;
  }

  .reset-button {
    width: 100%;
  }
}


@media (max-width: 600px) {

  .crm-page {
    padding: 15px;
  }

  .title-wrapper h1 {
    font-size: 24px;
  }

  .content-header {
    align-items: flex-start;
    flex-direction: column;

    gap: 10px;
  }

  .selected-toolbar {
    align-items: flex-start;
    flex-direction: column;

    gap: 10px;
  }

  .selected-toolbar button {
    width: 100%;
  }

}

</style>