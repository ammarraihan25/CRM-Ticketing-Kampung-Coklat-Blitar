<script setup lang="ts">
import type { Member } from '~/composables/useCrmApi'

const props = defineProps<{
  members: Member[]
  page: number
  perPage: number
  total: number
}>()

const selected = defineModel<number[]>('selected', {
  default: () => []
})

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      props.total / props.perPage
    )
  )
})

const allSelected = computed(() => {
  return (
    props.members.length > 0 &&
    props.members.every(
      member =>
        selected.value.includes(member.id)
    )
  )
})

function toggleSelect(id: number) {
  if (selected.value.includes(id)) {
    selected.value =
      selected.value.filter(
        item => item !== id
      )
  } else {
    selected.value = [
      ...selected.value,
      id
    ]
  }
}

function toggleSelectAll() {
  if (allSelected.value) {
    selected.value = []
  } else {
    selected.value =
      props.members.map(
        member => member.id
      )
  }
}

function getInitial(name: string) {
  return (
    name?.charAt(0)?.toUpperCase() ||
    '?'
  )
}

function getBadgeClass(tipe: string) {
  if (tipe === 'Member Pengajian') {
    return 'pengajian'
  }

  if (tipe === 'Member Tour') {
    return 'tour'
  }

  return 'reguler'
}
</script>


<template>

  <div class="table-container">

    <table class="member-table">

      <thead>

        <tr>

          <th class="check-column">

            <input
              type="checkbox"
              :checked="allSelected"
              @change="toggleSelectAll"
            />

          </th>

          <th>Member</th>

          <th>Tipe Member</th>

          <th>Domisili</th>

          <th>WhatsApp</th>

          <th class="action-column">
            Aksi
          </th>

        </tr>

      </thead>


      <tbody>

        <!-- EMPTY -->

        <tr
          v-if="members.length === 0"
        >

          <td
            colspan="6"
            class="empty-cell"
          >

            <div class="empty-state">

              <div class="empty-icon">
                👥
              </div>

              <strong>
                Belum ada data member
              </strong>

              <span>
                Data member akan muncul
                setelah tersedia dari sistem.
              </span>

            </div>

          </td>

        </tr>


        <!-- DATA -->

        <tr
          v-for="member in members"
          :key="member.id"
          :class="{
            selected:
              selected.includes(member.id)
          }"
        >

          <!-- CHECK -->

          <td class="check-column">

            <input
              type="checkbox"
              :checked="
                selected.includes(member.id)
              "
              @change="
                toggleSelect(member.id)
              "
            />

          </td>


          <!-- MEMBER -->

          <td>

            <div class="member-profile">

              <div class="avatar">
                {{ getInitial(member.nama) }}
              </div>

              <div class="member-name">

                <strong>
                  {{ member.nama }}
                </strong>

                <span>
                  ID Member #{{ member.id }}
                </span>

              </div>

            </div>

          </td>


          <!-- TIPE -->

          <td>

            <span
              class="type-badge"
              :class="
                getBadgeClass(
                  member.tipeMember
                )
              "
            >

              <span class="badge-dot"></span>

              {{ member.tipeMember }}

            </span>

          </td>


          <!-- DOMISILI -->

          <td>

            <div class="location">
              <span class="location-icon">
                ●
              </span>

              <span>
                {{ member.domisili || '-' }}
              </span>
            </div>

          </td>


          <!-- WHATSAPP -->

          <td>

            <div class="phone">

              <span class="phone-icon">
                ◉
              </span>

              <span>
                {{ member.whatsapp || '-' }}
              </span>

            </div>

          </td>


          <!-- ACTION -->

          <td class="action-column">

            <NuxtLink
              :to="`/crm/${member.id}`"
              class="detail-link"
            >
              Lihat Detail
              <span>→</span>
            </NuxtLink>

          </td>

        </tr>

      </tbody>

    </table>


    <!-- PAGINATION -->

    <div
      v-if="totalPages > 1"
      class="pagination"
    >

      <button
        class="pagination-button"
        :disabled="page <= 1"
        @click="
          emit(
            'page-change',
            page - 1
          )
        "
      >
        ←
      </button>


      <div class="page-info">

        Halaman

        <strong>
          {{ page }}
        </strong>

        dari
        {{ totalPages }}

      </div>


      <button
        class="pagination-button"
        :disabled="
          page >= totalPages
        "
        @click="
          emit(
            'page-change',
            page + 1
          )
        "
      >
        →
      </button>

    </div>

  </div>

</template>


<style scoped>

.table-container {
  width: 100%;

  overflow-x: auto;
}

.member-table {
  width: 100%;

  min-width: 950px;

  border-collapse: collapse;
}


/* =========================================
   HEADER
========================================= */

.member-table th {
  padding:
    13px 18px;

  background: #fcfaf8;

  border-bottom:
    1px solid #eee7df;

  color: #998e85;

  font-size: 9px;
  font-weight: 700;

  text-align: left;

  text-transform: uppercase;

  letter-spacing: 0.5px;
}

.member-table td {
  padding:
    14px 18px;

  border-bottom:
    1px solid #f1ece7;

  color: #665a51;

  font-size: 11px;
}

.member-table tbody tr {
  transition: background 0.15s ease;
}

.member-table tbody tr:hover {
  background: #fdfaf7;
}

.member-table tbody tr.selected {
  background: #faf4ee;
}

.member-table tbody tr:last-child td {
  border-bottom: none;
}


/* =========================================
   CHECKBOX
========================================= */

.check-column {
  width: 42px;

  text-align: center !important;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;

  margin: 0;

  accent-color: #65412b;

  cursor: pointer;
}


/* =========================================
   MEMBER
========================================= */

.member-profile {
  display: flex;
  align-items: center;

  gap: 10px;
}

.avatar {
  width: 37px;
  height: 37px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #eadbcf;

  color: #5b3826;

  font-size: 12px;
  font-weight: 700;
}

.member-name {
  display: flex;
  flex-direction: column;

  gap: 3px;
}

.member-name strong {
  color: #4b2e20;

  font-size: 11px;
  font-weight: 650;
}

.member-name span {
  color: #aaa097;

  font-size: 9px;
}


/* =========================================
   TYPE BADGE
========================================= */

.type-badge {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding:
    6px 9px;

  border-radius: 20px;

  font-size: 9px;
  font-weight: 600;

  white-space: nowrap;
}

.badge-dot {
  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: currentColor;
}


/* PENGAJIAN */

.type-badge.pengajian {
  background: #f3e7d9;
  color: #80532f;
}


/* REGULER */

.type-badge.reguler {
  background: #efebe7;
  color: #665d55;
}


/* TOUR */

.type-badge.tour {
  background: #e5f0e8;
  color: #427052;
}


/* =========================================
   LOCATION
========================================= */

.location {
  display: flex;
  align-items: center;

  gap: 7px;

  color: #766b62;
}

.location-icon {
  font-size: 7px;

  color: #a97853;
}


/* =========================================
   PHONE
========================================= */

.phone {
  display: flex;
  align-items: center;

  gap: 7px;

  color: #6c6058;
}

.phone-icon {
  font-size: 9px;

  color: #6d9074;
}


/* =========================================
   ACTION
========================================= */

.action-column {
  text-align: right !important;
}

.detail-link {
  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding:
    7px 10px;

  border:
    1px solid #e3dad2;

  border-radius: 7px;

  background: white;

  color: #65442f;

  font-size: 9px;
  font-weight: 600;

  text-decoration: none;

  transition: all 0.2s ease;
}

.detail-link:hover {
  background: #f8f1eb;

  border-color: #cdb8a6;
}

.detail-link span {
  font-size: 12px;
}


/* =========================================
   EMPTY
========================================= */

.empty-cell {
  padding: 0 !important;
}

.empty-state {
  min-height: 250px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 6px;
}

.empty-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 6px;

  border-radius: 14px;

  background: #f5ede6;

  font-size: 20px;
}

.empty-state strong {
  color: #5b3826;

  font-size: 12px;
}

.empty-state span {
  color: #a0968d;

  font-size: 10px;
}


/* =========================================
   PAGINATION
========================================= */

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  padding: 14px;

  border-top:
    1px solid #f0ebe6;
}

.pagination-button {
  width: 29px;
  height: 29px;

  display: flex;
  align-items: center;
  justify-content: center;

  border:
    1px solid #e4dbd3;

  border-radius: 7px;

  background: white;

  color: #684a38;

  cursor: pointer;
}

.pagination-button:hover:not(:disabled) {
  background: #f8f2ed;
}

.pagination-button:disabled {
  opacity: 0.35;

  cursor: not-allowed;
}

.page-info {
  color: #958a81;

  font-size: 10px;
}

.page-info strong {
  color: #5b3826;
}

</style>