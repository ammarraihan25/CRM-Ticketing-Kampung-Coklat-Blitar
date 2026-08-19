<script setup lang="ts">

const filters = defineModel<{
  tipeMember: string
  domisili: string
}>({
  default: () => ({
    tipeMember: '',
    domisili: ''
  })
})

const tipeOptions = [
  'Member Pengajian',
  'Member Reguler',
  'Member Tour'
]

</script>


<template>

  <div class="filter-wrapper">

    <!-- TIPE MEMBER -->

    <div class="field">

      <label>
        Tipe Member
      </label>

      <div class="input-wrapper">

        <span class="input-icon">
          👥
        </span>

        <select
          v-model="filters.tipeMember"
          class="input"
        >

          <option value="">
            Semua Tipe Member
          </option>

          <option
            v-for="tipe in tipeOptions"
            :key="tipe"
            :value="tipe"
          >
            {{ tipe }}
          </option>

        </select>

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
    1fr 1fr;

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