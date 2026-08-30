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
  if (tipe === 'Member Pengajian') return 'pengajian'
  if (tipe === 'Member Tour') return 'tour'
  return 'reguler'
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate)
  if (isNaN(birth.getTime())) return 0
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return Math.max(0, age)
}

function getAgeCategory(member: Member) {
  if (member.kategoriUmur) return member.kategoriUmur
  if (!member.umur && !member.tanggalLahir) return '-'
  const age = member.umur ?? calculateAge(member.tanggalLahir!)
  if (age < 12) return 'Anak-Anak'
  if (age <= 24) return 'Remaja'
  if (age <= 49) return 'Dewasa'
  return 'Lansia'
}

function getAgeCategoryBadge(category: string) {
  if (category === 'Anak-Anak') return 'age-anak'
  if (category === 'Remaja') return 'age-remaja'
  if (category === 'Dewasa') return 'age-dewasa'
  if (category === 'Lansia') return 'age-lansia'
  return 'age-default'
}

</script>


<template>

  <div class="table-container">

    <table class="member-table">

      <!-- ================================================= -->
      <!-- HEADER -->
      <!-- ================================================= -->

      <thead>

        <tr>

          <th class="checkbox-column">

            <input
              type="checkbox"
              :checked="allSelected"
              @change="toggleSelectAll"
            >

          </th>

          <th>
            Member
          </th>

          <th>
            WhatsApp
          </th>

          <th>
            Domisili
          </th>

          <th>
            Usia & Kategori
          </th>

          <th>
            Tipe Member
          </th>

          <th>
            Status
          </th>

          <th class="action-column">
            Action
          </th>

        </tr>

      </thead>


      <!-- ================================================= -->
      <!-- BODY -->
      <!-- ================================================= -->

      <tbody>

        <!-- EMPTY -->

        <tr v-if="members.length === 0">

          <td
            colspan="8"
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
                Data member akan muncul setelah
                tersedia dari sistem.
              </span>

            </div>

          </td>

        </tr>


        <!-- MEMBER -->

        <tr
          v-for="member in members"
          :key="member.id"
          :class="{
            selected:
              selected.includes(member.id)
          }"
        >

          <!-- CHECK -->

          <td class="checkbox-column">

            <input
              type="checkbox"
              :checked="
                selected.includes(member.id)
              "
              @change="
                toggleSelect(member.id)
              "
            >

          </td>


          <!-- MEMBER -->

          <td>

            <div class="member-profile">

              <div class="avatar">

                {{ getInitial(member.nama) }}

              </div>

              <div class="member-info">

                <strong>
                  {{ member.nama }}
                </strong>

                <span>
                  Member #{{ member.id }}
                </span>

              </div>

            </div>

          </td>


          <!-- WHATSAPP -->

          <td>

            <div class="whatsapp">

              <span class="whatsapp-icon">
                ◉
              </span>

              <span>
                {{ member.whatsapp || '-' }}
              </span>

            </div>

          </td>


          <!-- DOMISILI -->

          <td>

            <div class="domisili">

              <span>
                ●
              </span>

              {{ member.domisili || '-' }}

            </div>

          </td>


          <!-- USIA & KATEGORI -->

          <td>

            <div class="age-cell">

              <strong class="age-num">
                {{ member.umur ? member.umur + ' th' : (member.tanggalLahir ? calculateAge(member.tanggalLahir) + ' th' : '-') }}
              </strong>

              <span
                v-if="getAgeCategory(member) !== '-'"
                class="age-badge"
                :class="getAgeCategoryBadge(getAgeCategory(member))"
              >
                {{ getAgeCategory(member) }}
              </span>

            </div>

          </td>


          <!-- TYPE -->

          <td>

            <span class="plain-type-text">
              {{ member.tipeMember }}
            </span>

          </td>


          <!-- STATUS -->

          <td>

            <span class="status">

              <span class="status-dot"></span>

              Active

            </span>

          </td>


          <!-- ACTION -->

          <td class="action-column">

            <NuxtLink
              :to="`/crm/${member.id}`"
              class="view-button"
            >

              View

              <span>
                →
              </span>

            </NuxtLink>

          </td>

        </tr>

      </tbody>

    </table>


    <!-- ================================================= -->
    <!-- PAGINATION -->
    <!-- ================================================= -->

    <div class="pagination">

      <span class="pagination-text">

        Showing

        <strong>
          {{
            members.length
              ? ((page - 1) * perPage) + 1
              : 0
          }}
        </strong>

        to

        <strong>
          {{
            Math.min(
              page * perPage,
              total
            )
          }}
        </strong>

        of

        <strong>
          {{ total }}
        </strong>

      </span>


      <div class="pagination-buttons">

        <button
          :disabled="page <= 1"
          @click="
            emit(
              'page-change',
              page - 1
            )
          "
        >
          ← Prev
        </button>

        <div class="page-number">
          {{ page }}
        </div>

        <button
          :disabled="page >= totalPages"
          @click="
            emit(
              'page-change',
              page + 1
            )
          "
        >
          Next →
        </button>

      </div>

    </div>

  </div>

</template>


<style scoped>

.table-container {

  width: 100%;

  overflow-x: auto;

  background: #fffdf9;

  border: 1px solid #e5d2c3;

  border-radius: 12px;

}

.member-table {

  width: 100%;

  min-width: 1100px;

  border-collapse: collapse;

}


/* ================================================= */
/* HEADER */
/* ================================================= */

.member-table th {

  padding:
    17px 22px;

  background: #3c241b;

  border-bottom:
    3px solid #f29727;

  color: #fff7ed;

  font-size: 13px;

  font-weight: 800;

  text-align: left;

  text-transform: uppercase;

  letter-spacing: .7px;

}

.member-table td {

  padding:
    18px 22px;

  border-bottom:
    1px solid #eaded5;

  color: #4e382e;

  font-size: 16px;

  line-height: 1.45;

}

.member-table tbody tr {

  transition:
    background .15s ease;

}

.member-table tbody tr:hover {

  background: #fff8f0;

}

.member-table tbody tr.selected {

  background: #ffeddc;

}

.member-table tbody tr:last-child td {

  border-bottom: none;

}


/* ================================================= */
/* CHECKBOX */
/* ================================================= */

.checkbox-column {

  width: 48px;

  text-align: center !important;

}

input[type="checkbox"] {

  width: 19px;
  height: 19px;

  margin: 0;

  accent-color:
    #c96b1b;

  cursor: pointer;

}


/* ================================================= */
/* MEMBER */
/* ================================================= */

.member-profile {

  display: flex;

  align-items: center;

  gap: 12px;

}

.avatar {

  width: 46px;
  height: 46px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #f3d7b8,
      #d89b62
    );

  color: #4a291d;

  font-size: 15px;

  font-weight: 800;

}

.member-info {

  display: flex;

  flex-direction: column;

  gap: 4px;

}

.member-info strong {

  color: #33251f;

  font-size: 16px;

  font-weight: 750;

}

.member-info span {

  color: #806b5f;

  font-size: 13px;

}


/* ================================================= */
/* WHATSAPP */
/* ================================================= */

.whatsapp {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #59473e;

  font-size: 15px;

  white-space: nowrap;

}

.whatsapp-icon {

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #e9f7ef;

  color: #20a66c;

  font-size: 14px;

}


/* ================================================= */
/* DOMISILI */
/* ================================================= */

.domisili {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #59473e;

  font-size: 15px;

}

.domisili > span {

  font-size: 9px;

  color: #c96b1b;

}


/* ================================================= */
/* BADGE */
/* ================================================= */

.type-badge {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding:
    7px 12px;

  border-radius: 20px;

  font-size: 13px;

  font-weight: 750;

  white-space: nowrap;

}

.badge-dot {

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background:
    currentColor;

}

.type-badge.pengajian {

  background: #fff0df;

  color: #b56620;

}

.type-badge.reguler {

  background: #f0eeec;

  color: #665e59;

}

.type-badge.tour {

  background: #e8f7ef;

  color: #298052;

}


/* ================================================= */
/* STATUS */
/* ================================================= */

.status {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  color: #23945d;

  font-size: 14px;

  font-weight: 700;

}

.status-dot {

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #22b86e;

}


/* ================================================= */
/* ACTION */
/* ================================================= */

.action-column {

  text-align: right !important;

}

.view-button {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  padding:
    10px 14px;

  border:
    1px solid #d7bda9;

  border-radius: 8px;

  background: white;

  color: #4c291d;

  font-size: 14px;

  font-weight: 700;

  text-decoration: none;

  transition: .2s ease;

}

.view-button:hover {

  border-color: #c96b1b;

  background: #fff0df;

  transform: translateX(2px);

}

.view-button span {

  font-size: 18px;

}


/* ================================================= */
/* EMPTY */
/* ================================================= */

.empty-cell {

  padding: 0 !important;

}

.empty-state {

  min-height: 330px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 7px;

}

.empty-icon {

  width: 58px;
  height: 58px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 7px;

  border-radius: 16px;

  background: #f6eee8;

  font-size: 23px;

}

.empty-state strong {

  color: #57382b;

  font-size: 16px;

}

.empty-state span {

  color: #a49a94;

  font-size: 14px;

}


/* ================================================= */
/* PAGINATION */
/* ================================================= */

.pagination {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding:
    18px 22px;

  border-top:
    1px solid #eee9e5;

}

.pagination-text {

  color: #968c85;

  font-size: 14px;

}

.pagination-text strong {

  color: #5c4940;

}

.pagination-buttons {

  display: flex;

  align-items: center;

  gap: 7px;

}

.pagination-buttons button {

  height: 38px;

  padding:
    0 14px;

  border:
    1px solid #d7bda9;

  border-radius: 7px;

  background: white;

  color: #4c291d;

  font-family: inherit;

  font-size: 14px;

  font-weight: 700;

  cursor: pointer;

}

.pagination-buttons button:hover:not(:disabled) {

  background: #faf5f1;

}

.pagination-buttons button:disabled {

  opacity: .4;

  cursor: not-allowed;

}

.page-number {

  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 7px;

  background: #3c241b;

  color: white;

  font-size: 14px;

  font-weight: 800;

}

/* ================================================= */
/* AGE / SEGMENTASI */
.plain-type-text {
  font-size: 13.5px;
  font-weight: 600;
  color: #111827;
}

.age-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-start;
}

.age-num {
  font-size: 13.5px;
  color: #1E293B;
  font-weight: 800;
  line-height: 1.2;
}

.age-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 7px;
  border-radius: 5px;
  font-size: 10.5px;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.2;
}

.age-badge.age-anak,
.age-badge.age-anakanak {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #BFDBFE;
}

.age-badge.age-remaja {
  background: #FEF3C7;
  color: #B45309;
  border: 1px solid #FDE68A;
}

.age-badge.age-dewasa {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
}

.age-badge.age-lansia {
  background: #F3E8FF;
  color: #7E22CE;
  border: 1px solid #E9D5FF;
}

.age-badge.age-default {
  background: #F1F5F9;
  color: #475569;
  border: 1px solid #CBD5E1;
}

</style>