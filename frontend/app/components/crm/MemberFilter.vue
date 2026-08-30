<script setup lang="ts">
import AppSelect from '~/components/shared/AppSelect.vue'

const filters = defineModel<{
  tipeMember: string
  domisili: string
  kategoriUmur: string
}>({
  default: () => ({
    tipeMember: '',
    domisili: '',
    kategoriUmur: ''
  })
})

const tipeOptions = [
  { value: '', label: 'Semua Tipe Member' },
  { value: 'Member Pengajian', label: 'Member Pengajian' },
  { value: 'Member Reguler', label: 'Member Reguler' },
  { value: 'Member Tour', label: 'Member Tour' }
]

const umurOptions = [
  { value: '', label: 'Semua Kategori Umur' },
  { value: 'Anak-Anak', label: 'Anak-Anak (< 12 th)' },
  { value: 'Remaja', label: 'Remaja / Pelajar (12-24 th)' },
  { value: 'Dewasa', label: 'Dewasa / Keluarga (25-49 th)' },
  { value: 'Lansia', label: 'Lansia / Senior (50+ th)' }
]

</script>


<template>

  <div class="filter-wrapper">

    <!-- TIPE MEMBER -->

    <div class="field">

      <label>
        Tipe Member
      </label>

      <div>
        <AppSelect
          v-model="filters.tipeMember"
          :options="tipeOptions"
          placeholder="Semua Tipe Member"
        />
      </div>

    </div>


    <!-- KATEGORI UMUR -->

    <div class="field">

      <label>
        Segmentasi Umur
      </label>

      <div>
        <AppSelect
          v-model="filters.kategoriUmur"
          :options="umurOptions"
          placeholder="Semua Kategori Umur"
        />
      </div>

    </div>


    <!-- DOMISILI -->

    <div class="field">

      <label>
        Domisili
      </label>

      <div class="input-wrapper">

        <span class="input-icon">
          📍
        </span>

        <input
          v-model="filters.domisili"
          type="text"
          class="input"
          placeholder="Cari berdasarkan kota..."
        />

      </div>

    </div>

  </div>

</template>


<style scoped>

.filter-wrapper {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 15px;
}

.field {
  display: flex;

  flex-direction: column;

  gap: 7px;
}

.field label {
  color: #66584e;

  font-size: 11px;

  font-weight: 600;
}

.input-wrapper {
  position: relative;

  display: flex;

  align-items: center;
}

.input-icon {
  position: absolute;

  left: 13px;

  color: #967d6a;

  font-size: 14px;

  pointer-events: none;
}

.input {
  width: 100%;

  min-height: 42px;

  box-sizing: border-box;

  padding:
    0
    13px
    0
    38px;

  border: 1px solid #e5dcd4;

  border-radius: 9px;

  outline: none;

  background: #fcfaf8;

  color: #4c3022;

  font-family: inherit;

  font-size: 12px;

  transition: 0.2s;
}

.input::placeholder {
  color: #b1a69e;
}

.input:focus {
  border-color: #9b6b4b;

  background: white;

  box-shadow:
    0 0 0 3px
    rgba(155, 107, 75, 0.08);
}

select.input {
  cursor: pointer;
}


@media (max-width: 600px) {

  .filter-wrapper {
    grid-template-columns: 1fr;
  }

}

</style>