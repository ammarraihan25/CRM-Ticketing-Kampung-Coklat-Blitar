<script setup lang="ts">

import type { Member } from '~/composables/useCrmApi'


definePageMeta({
  layout: 'admin'
})


const route = useRoute()

const {
  getMemberById
} = useCrmApi()


const member =
  ref<Member | null>(null)

const isLoading =
  ref(true)


onMounted(async () => {

  try {

    member.value =
      await getMemberById(
        Number(route.params.id)
      )

  } finally {

    isLoading.value = false

  }

})


function getInitial(name: string) {

  return (
    name
      ?.charAt(0)
      ?.toUpperCase()
    || '?'
  )

}


function getMemberClass(tipe: string) {

  return (
    tipe
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      || 'member-reguler'
  )

}

</script>


<template>

  <div class="detail-page">


    <!-- BACK -->

    <NuxtLink
      to="/crm"
      class="back-link"
    >
      ← Kembali ke Data Member
    </NuxtLink>


    <!-- LOADING -->

    <div
      v-if="isLoading"
      class="loading-card"
    >

      <div class="loader"></div>

      <span>
        Memuat data member...
      </span>

    </div>


    <!-- NOT FOUND -->

    <div
      v-else-if="!member"
      class="not-found"
    >

      <div>
        👥
      </div>

      <strong>
        Member tidak ditemukan
      </strong>

      <span>
        Data member yang kamu cari
        tidak tersedia.
      </span>

    </div>


    <!-- DETAIL -->

    <template v-else>


      <!-- PROFILE HEADER -->

      <section class="profile-card">

        <div class="profile-avatar">

          {{
            getInitial(
              member.nama
            )
          }}

        </div>


        <div class="profile-info">

          <div class="profile-name-row">

            <h1>
              {{ member.nama }}
            </h1>

            <span
              class="member-badge"
              :class="
                getMemberClass(
                  member.tipeMember
                )
              "
            >

              {{ member.tipeMember }}

            </span>

          </div>

          <p>
            Member #{{ member.id }}
          </p>

        </div>

      </section>


      <!-- INFORMATION -->

      <section class="info-card">

        <div class="section-title">

          <div>
            <h2>
              Informasi Member
            </h2>

            <p>
              Informasi dasar member Kampung Coklat.
            </p>
          </div>

        </div>


        <div class="info-grid">

          <div class="info-item">

            <span>
              Nama Lengkap
            </span>

            <strong>
              {{ member.nama }}
            </strong>

          </div>


          <div class="info-item">

            <span>
              No. WhatsApp
            </span>

            <strong>
              {{ member.whatsapp }}
            </strong>

          </div>


          <div class="info-item">

            <span>
              Domisili
            </span>

            <strong>
              {{ member.domisili || '-' }}
            </strong>

          </div>


          <div class="info-item">

            <span>
              Tipe Member
            </span>

            <strong>
              {{ member.tipeMember }}
            </strong>

          </div>

        </div>

      </section>


      <!-- BENEFIT -->

      <section class="benefit-card">

        <div class="section-title">

          <div>

            <h2>
              Benefit Member
            </h2>

            <p>
              Status voucher dan tiket yang dimiliki member.
            </p>

          </div>

        </div>


        <div class="benefit-empty">

          <div class="benefit-icon">
            🎁
          </div>

          <strong>
            Data benefit belum tersedia
          </strong>

          <span>
            Informasi voucher diskon dan tiket gratis
            akan ditampilkan setelah endpoint benefit
            dari backend tersedia.
          </span>

        </div>

      </section>


    </template>

  </div>

</template>


<style scoped>

.detail-page {

  min-height: 100%;

  padding: 30px;

  background: #f8f5f1;

}


/* BACK */

.back-link {

  display: inline-flex;

  margin-bottom: 18px;

  color: #72523c;

  font-size: 12px;

  font-weight: 600;

  text-decoration: none;

}

.back-link:hover {

  color: #4b2e20;

}


/* PROFILE */

.profile-card {

  display: flex;

  align-items: center;

  gap: 16px;

  margin-bottom: 17px;

  padding: 22px;

  border:
    1px solid #eee7df;

  border-radius: 15px;

  background: white;

  box-shadow:
    0 4px 15px
    rgba(70,48,33,0.04);

}

.profile-avatar {

  width: 58px;
  height: 58px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: #eadbcf;

  color: #5b3826;

  font-size: 22px;

  font-weight: 700;

}

.profile-info {

  display: flex;

  flex-direction: column;

  gap: 3px;

}

.profile-name-row {

  display: flex;

  align-items: center;

  gap: 10px;

}

.profile-name-row h1 {

  margin: 0;

  color: #4b2e20;

  font-size: 22px;

}

.profile-info p {

  margin: 0;

  color: #9a8e84;

  font-size: 11px;

}


/* BADGE */

.member-badge {

  padding:
    6px
    10px;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 600;

}

.member-badge.member-pengajian {

  background: #f3e7d9;

  color: #80532f;

}

.member-badge.member-reguler {

  background: #eeeae5;

  color: #665d55;

}

.member-badge.member-tour {

  background: #e5f0e8;

  color: #427052;

}


/* CARD */

.info-card,
.benefit-card {

  margin-bottom: 17px;

  border:
    1px solid #eee7df;

  border-radius: 15px;

  background: white;

  box-shadow:
    0 4px 15px
    rgba(70,48,33,0.04);

}

.section-title {

  padding:
    19px
    20px;

  border-bottom:
    1px solid #f0ebe6;

}

.section-title h2 {

  margin: 0;

  color: #4b2e20;

  font-size: 15px;

}

.section-title p {

  margin: 4px 0 0;

  color: #9a8f86;

  font-size: 11px;

}


/* INFO */

.info-grid {

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 0;

}

.info-item {

  display: flex;

  flex-direction: column;

  gap: 6px;

  padding: 18px 20px;

  border-right:
    1px solid #f0ebe6;

}

.info-item:last-child {

  border-right: none;

}

.info-item span {

  color: #a0968d;

  font-size: 10px;

}

.info-item strong {

  color: #59483c;

  font-size: 12px;

}


/* BENEFIT */

.benefit-empty {

  min-height: 210px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 7px;

  padding: 25px;

  text-align: center;

}

.benefit-icon {

  width: 54px;
  height: 54px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 4px;

  border-radius: 16px;

  background: #f7ecd9;

  font-size: 22px;

}

.benefit-empty strong {

  color: #5b3826;

  font-size: 13px;

}

.benefit-empty span {

  max-width: 410px;

  color: #a0968d;

  font-size: 11px;

  line-height: 1.6;

}


/* LOADING */

.loading-card {

  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 10px;

  color: #958a81;

  font-size: 12px;

}

.loader {

  width: 27px;
  height: 27px;

  border: 3px solid #eadfd6;

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


/* NOT FOUND */

.not-found {

  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 7px;

  color: #8f8379;

  text-align: center;

}

.not-found > div {

  width: 55px;
  height: 55px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 5px;

  border-radius: 15px;

  background: #f5ede6;

  font-size: 22px;

}

.not-found strong {

  color: #5b3826;

  font-size: 14px;

}

.not-found span {

  font-size: 11px;

}


/* RESPONSIVE */

@media (max-width: 900px) {

  .detail-page {

    padding: 20px;

  }

  .info-grid {

    grid-template-columns:
      repeat(2, 1fr);

  }

  .info-item:nth-child(2) {

    border-right: none;

  }

}

@media (max-width: 600px) {

  .detail-page {

    padding: 15px;

  }

  .profile-name-row {

    align-items: flex-start;

    flex-direction: column;

  }

  .info-grid {

    grid-template-columns: 1fr;

  }

  .info-item {

    border-right: none;

    border-bottom:
      1px solid #f0ebe6;

  }

  .info-item:last-child {

    border-bottom: none;

  }

}

</style>