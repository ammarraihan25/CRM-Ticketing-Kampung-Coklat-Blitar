<script setup lang="ts">

import type { Member } from '~/composables/useCrmApi'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()

const {
  getMemberById
} = useCrmApi()

const member = ref<Member | null>(null)

const isLoading = ref(true)

const showMessage = ref(false)

onMounted(async () => {

  try {

    member.value =
      await getMemberById(
        Number(route.params.id)
      )

  } catch (error) {

    console.error(
      'Gagal memuat detail member:',
      error
    )

  } finally {

    isLoading.value = false

  }

})


function getInitial(name: string) {

  return (
    name
      ?.charAt(0)
      ?.toUpperCase() || '?'
  )

}


function getMemberClass(tipe: string) {

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

  <div class="detail-page">

    <!-- ================================================= -->
    <!-- TOP -->
    <!-- ================================================= -->

    <div class="detail-top">

      <NuxtLink
        to="/crm"
        class="back-link"
      >
        ←
        <span>
          Back to Member Directory
        </span>
      </NuxtLink>

    </div>


    <!-- ================================================= -->
    <!-- LOADING -->
    <!-- ================================================= -->

    <div
      v-if="isLoading"
      class="loading-state"
    >

      <div class="loader"></div>

      <strong>
        Memuat detail member...
      </strong>

    </div>


    <!-- ================================================= -->
    <!-- NOT FOUND -->
    <!-- ================================================= -->

    <div
      v-else-if="!member"
      class="not-found"
    >

      <div class="not-found-icon">
        👥
      </div>

      <strong>
        Member tidak ditemukan
      </strong>

      <span>
        Data member yang kamu cari tidak tersedia.
      </span>

      <NuxtLink to="/crm">
        Kembali ke Member Directory
      </NuxtLink>

    </div>


    <!-- ================================================= -->
    <!-- DETAIL -->
    <!-- ================================================= -->

    <template v-else>

      <div class="profile-layout">


        <!-- ============================================= -->
        <!-- LEFT PROFILE -->
        <!-- ============================================= -->

        <aside class="profile-card">

          <div class="profile-top">

            <div class="avatar-large">

              {{ getInitial(member.nama) }}

            </div>

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


          <h1>
            {{ member.nama }}
          </h1>

          <p class="member-number">
            Member #{{ member.id }}
          </p>


          <div class="profile-divider"></div>


          <!-- WHATSAPP -->

          <div class="contact-item">

            <div class="contact-icon whatsapp">
              ◉
            </div>

            <div>

              <span>
                WhatsApp
              </span>

              <strong>
                {{ member.whatsapp || '-' }}
              </strong>

            </div>

          </div>


          <!-- DOMISILI -->

          <div class="contact-item">

            <div class="contact-icon location">
              ●
            </div>

            <div>

              <span>
                Domisili
              </span>

              <strong>
                {{ member.domisili || '-' }}
              </strong>

            </div>

          </div>


          <!-- MEMBER TYPE -->

          <div class="contact-item">

            <div class="contact-icon member">
              ◆
            </div>

            <div>

              <span>
                Membership
              </span>

              <strong>
                {{ member.tipeMember }}
              </strong>

            </div>

          </div>


          <button
            class="send-message"
            @click="showMessage = true"
          >

            ◈

            Send WhatsApp

          </button>

        </aside>


        <!-- ============================================= -->
        <!-- RIGHT CONTENT -->
        <!-- ============================================= -->

        <main class="detail-content">


          <!-- INFO -->

          <section class="detail-card">

            <div class="card-header">

              <div>

                <h2>
                  Member Information
                </h2>

                <p>
                  Informasi dasar membership.
                </p>

              </div>

            </div>


            <div class="information-grid">

              <div class="information-item">

                <span>
                  Full Name
                </span>

                <strong>
                  {{ member.nama }}
                </strong>

              </div>


              <div class="information-item">

                <span>
                  WhatsApp
                </span>

                <strong>
                  {{ member.whatsapp || '-' }}
                </strong>

              </div>


              <div class="information-item">

                <span>
                  Domisili
                </span>

                <strong>
                  {{ member.domisili || '-' }}
                </strong>

              </div>


              <div class="information-item">

                <span>
                  Member Type
                </span>

                <strong>
                  {{ member.tipeMember }}
                </strong>

              </div>

            </div>

          </section>


          <!-- BENEFIT -->

          <section class="detail-card">

            <div class="card-header">

              <div>

                <h2>
                  Active Benefits
                </h2>

                <p>
                  Voucher dan benefit yang tersedia.
                </p>

              </div>

              <button class="text-button">
                View All
              </button>

            </div>


            <div class="empty-benefit">

              <div class="benefit-icon">
                🎁
              </div>

              <div>

                <strong>
                  Belum ada data benefit
                </strong>

                <span>
                  Data voucher dan benefit akan
                  muncul ketika endpoint benefit
                  tersedia dari backend.
                </span>

              </div>

            </div>

          </section>


          <!-- ACTIVITY -->

          <section class="detail-card">

            <div class="card-header">

              <div>

                <h2>
                  Member Activity
                </h2>

                <p>
                  Riwayat aktivitas member.
                </p>

              </div>

              <button class="more-button">
                •••
              </button>

            </div>


            <div class="activity-empty">

              <div class="activity-icon">
                ◷
              </div>

              <strong>
                Belum ada riwayat aktivitas
              </strong>

              <span>
                Riwayat kunjungan, tiket,
                dan transaksi akan ditampilkan
                di sini.
              </span>

            </div>

          </section>


        </main>

      </div>

    </template>


    <!-- ================================================= -->
    <!-- SIMPLE MESSAGE MODAL -->
    <!-- ================================================= -->

    <div
      v-if="showMessage && member"
      class="message-overlay"
      @click.self="showMessage = false"
    >

      <div class="message-modal">

        <div class="modal-icon">
          ◈
        </div>

        <h2>
          Kirim WhatsApp
        </h2>

        <p>
          Kirim pesan WhatsApp kepada
          <strong>{{ member.nama }}</strong>.
        </p>

        <textarea
          placeholder="Tulis pesan..."
        ></textarea>

        <div class="modal-actions">

          <button
            class="cancel"
            @click="showMessage = false"
          >
            Batal
          </button>

          <button class="send">
            Kirim WhatsApp
          </button>

        </div>

      </div>

    </div>

  </div>

</template>


<style scoped>

.detail-page {

  --brown: #43271d;
  --brown-dark: #321b14;
  --orange: #f47b20;

  min-height: 100%;

  box-sizing: border-box;

  padding:
    30px
    clamp(28px, 4vw, 64px);

  background: #f7f5f3;

}


/* ================================================= */
/* TOP */
/* ================================================= */

.detail-top {

  margin-bottom: 22px;

}

.back-link {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  color: #776b63;

  font-size: 12px;
  font-weight: 700;

  text-decoration: none;

}

.back-link:hover {
  color: var(--brown);
}


/* ================================================= */
/* LAYOUT */
/* ================================================= */

.profile-layout {

  display: grid;

  grid-template-columns:
    minmax(260px, 320px)
    minmax(0, 1fr);

  align-items: start;

  gap: 20px;

}


/* ================================================= */
/* PROFILE */
/* ================================================= */

.profile-card {

  position: sticky;

  top: 20px;

  padding: 27px 24px;

  border:
    1px solid #e7e0db;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 8px 25px
    rgba(53,35,27,.045);

  text-align: center;

}

.profile-top {

  position: relative;

  display: inline-block;

  margin-bottom: 13px;

}

.avatar-large {

  width: 110px;
  height: 110px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #f0e1d7,
      #e3c9b8
    );

  color: var(--brown);

  font-size: 38px;

  font-weight: 800;

  box-shadow:
    0 8px 20px
    rgba(67,39,29,.1);

}

.member-badge {

  position: absolute;

  right: -8px;
  bottom: 0;

  padding:
    7px 11px;

  border:
    3px solid white;

  border-radius: 20px;

  font-size: 10px;

  font-weight: 800;

}

.member-badge.pengajian {

  background: #fff0df;
  color: #a95e1d;

}

.member-badge.reguler {

  background: #efedeb;
  color: #665e58;

}

.member-badge.tour {

  background: #e7f6ed;
  color: #287b4e;

}

.profile-card h1 {

  margin: 0;

  color: #261a16;

  font-size: 24px;

  font-weight: 800;

  letter-spacing: -.4px;

}

.member-number {

  margin: 5px 0 0;

  color: #9b918a;

  font-size: 11px;

}

.profile-divider {

  height: 1px;

  margin:
    24px 0 19px;

  background: #eee9e5;

}


/* ================================================= */
/* CONTACT */
/* ================================================= */

.contact-item {

  display: flex;

  align-items: center;

  gap: 11px;

  margin-bottom: 17px;

  text-align: left;

}

.contact-icon {

  width: 35px;
  height: 35px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  font-size: 13px;

}

.contact-icon.whatsapp {

  background: #e8f7ef;
  color: #21945d;

}

.contact-icon.location {

  background: #f1eee9;
  color: #786a60;

}

.contact-icon.member {

  background: #fff0df;
  color: #c56a1d;

}

.contact-item div:last-child {

  display: flex;

  flex-direction: column;

  gap: 3px;

}

.contact-item span {

  color: #9a9089;

  font-size: 10px;

}

.contact-item strong {

  color: #382b25;

  font-size: 12px;

}

.send-message {

  width: 100%;

  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  gap: 9px;

  margin-top: 22px;

  border:
    1px solid #ddd4ce;

  border-radius: 9px;

  background: white;

  color: #4c3930;

  font-family: inherit;

  font-size: 12px;
  font-weight: 800;

  cursor: pointer;

  transition: .2s ease;

}

.send-message:hover {

  background: #fff8f3;

  border-color: #c9aa97;

}


/* ================================================= */
/* CONTENT */
/* ================================================= */

.detail-content {

  display: flex;

  flex-direction: column;

  gap: 18px;

}

.detail-card {

  overflow: hidden;

  border:
    1px solid #e7e0db;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 7px 24px
    rgba(53,35,27,.035);

}

.card-header {

  display: flex;

  align-items: center;
  justify-content: space-between;

  padding:
    20px 22px;

  border-bottom:
    1px solid #eee9e5;

}

.card-header h2 {

  margin: 0;

  color: #30221c;

  font-size: 16px;

  font-weight: 800;

}

.card-header p {

  margin: 4px 0 0;

  color: #9a9089;

  font-size: 11px;

}

.text-button {

  border: none;

  background: transparent;

  color: #83766d;

  font-family: inherit;

  font-size: 11px;

  font-weight: 700;

  cursor: pointer;

}

.more-button {

  width: 31px;
  height: 31px;

  border: none;

  border-radius: 50%;

  background: #f8f6f4;

  color: #786b63;

}


/* ================================================= */
/* INFORMATION */
/* ================================================= */

.information-grid {

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

}

.information-item {

  display: flex;

  flex-direction: column;

  gap: 6px;

  padding:
    19px 22px;

  border-bottom:
    1px solid #f0ece9;

}

.information-item:nth-child(odd) {

  border-right:
    1px solid #f0ece9;

}

.information-item span {

  color: #9c928b;

  font-size: 10px;

}

.information-item strong {

  color: #3b2c25;

  font-size: 13px;

}


/* ================================================= */
/* BENEFIT */
/* ================================================= */

.empty-benefit {

  display: flex;

  align-items: center;

  gap: 14px;

  padding: 25px 22px;

}

.benefit-icon {

  width: 47px;
  height: 47px;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 13px;

  background: #fff0df;

  font-size: 20px;

}

.empty-benefit div:last-child {

  display: flex;

  flex-direction: column;

  gap: 5px;

}

.empty-benefit strong {

  color: #50382b;

  font-size: 12px;

}

.empty-benefit span {

  max-width: 500px;

  color: #9c928b;

  font-size: 10px;

  line-height: 1.5;

}


/* ================================================= */
/* ACTIVITY */
/* ================================================= */

.activity-empty {

  min-height: 210px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 7px;

  text-align: center;

}

.activity-icon {

  width: 50px;
  height: 50px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 5px;

  border-radius: 14px;

  background: #f5efea;

  color: #7a675b;

  font-size: 21px;

}

.activity-empty strong {

  color: #52392c;

  font-size: 12px;

}

.activity-empty span {

  max-width: 380px;

  color: #a09791;

  font-size: 10px;

  line-height: 1.5;

}


/* ================================================= */
/* LOADING */
/* ================================================= */

.loading-state {

  min-height: 400px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;

}

.loading-state strong {

  color: var(--brown);

  font-size: 13px;

}

.loader {

  width: 31px;
  height: 31px;

  border:
    3px solid #eee6e0;

  border-top-color:
    var(--orange);

  border-radius: 50%;

  animation:
    spin .75s linear infinite;

}

@keyframes spin {

  to {
    transform: rotate(360deg);
  }

}


/* ================================================= */
/* NOT FOUND */
/* ================================================= */

.not-found {

  min-height: 400px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 8px;

}

.not-found-icon {

  width: 60px;
  height: 60px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 7px;

  border-radius: 16px;

  background: #f5eee8;

  font-size: 24px;

}

.not-found strong {

  color: #52372b;

  font-size: 14px;

}

.not-found span {

  color: #9a9089;

  font-size: 11px;

}

.not-found a {

  margin-top: 7px;

  color: #a45f2a;

  font-size: 11px;
  font-weight: 700;

}


/* ================================================= */
/* MESSAGE MODAL */
/* ================================================= */

.message-overlay {

  position: fixed;

  inset: 0;

  z-index: 100;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 20px;

  background:
    rgba(32,24,20,.58);

  backdrop-filter:
    blur(5px);

}

.message-modal {

  width: min(460px, 100%);

  padding: 25px;

  border-radius: 16px;

  background: white;

  box-shadow:
    0 25px 60px
    rgba(0,0,0,.2);

}

.modal-icon {

  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 13px;

  border-radius: 12px;

  background: #fff0df;

  color: #f47b20;

}

.message-modal h2 {

  margin: 0;

  color: #30221c;

  font-size: 18px;

}

.message-modal p {

  margin: 6px 0 17px;

  color: #8d827b;

  font-size: 12px;

}

.message-modal textarea {

  width: 100%;

  min-height: 130px;

  box-sizing: border-box;

  resize: vertical;

  padding: 13px;

  border:
    1px solid #ddd5cf;

  border-radius: 9px;

  outline: none;

  font-family: inherit;

  font-size: 12px;

}

.modal-actions {

  display: flex;

  justify-content: flex-end;

  gap: 9px;

  margin-top: 15px;

}

.modal-actions button {

  height: 38px;

  padding: 0 14px;

  border-radius: 8px;

  font-family: inherit;

  font-size: 11px;

  font-weight: 800;

  cursor: pointer;

}

.modal-actions .cancel {

  border:
    1px solid #ddd5cf;

  background: white;

  color: #665a52;

}

.modal-actions .send {

  border: none;

  background: var(--brown);

  color: white;

}


/* ================================================= */
/* RESPONSIVE */
/* ================================================= */

@media (max-width: 900px) {

  .profile-layout {

    grid-template-columns: 1fr;

  }

  .profile-card {

    position: static;

  }

}

@media (max-width: 600px) {

  .detail-page {
    padding: 20px;
  }

  .information-grid {

    grid-template-columns: 1fr;

  }

  .information-item:nth-child(odd) {

    border-right: none;

  }

}

</style>