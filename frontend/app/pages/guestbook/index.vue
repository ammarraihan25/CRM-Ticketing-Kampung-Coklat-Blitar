<script setup lang="ts">
import type { GuestBookPayload } from '~/composables/useGuestBookApi'

definePageMeta({
  layout: false
})

const { requestOtp, verifyOtp } = useGuestBookApi()

const step = ref<'event' | 'form' | 'success'>('event')

const form = ref({
  tipeKunjungan: '',
  namaAcara: '',
  tanggalKunjungan: '',
  nama: '',
  whatsapp: '',
  domisili: '',
  tanggalLahir: ''
})

const isLoading = ref(false)
const errorMessage = ref('')

const stepNumber = computed(() => {
  return step.value === 'event' ? 1
    : step.value === 'form' ? 2
    : 3
})

function handleEventSubmit() {
  errorMessage.value = ''

  if (!form.value.tipeKunjungan) {
    errorMessage.value = 'Silakan pilih tujuan kunjungan terlebih dahulu.'
    return
  }
  
  if (!form.value.namaAcara) {
    errorMessage.value = 'Silakan isi nama acara.'
    return
  }

  if (!form.value.tanggalKunjungan) {
    errorMessage.value = 'Silakan isi tanggal kunjungan.'
    return
  }

  step.value = 'form'
}

async function handleSubmit() {
  errorMessage.value = ''

  isLoading.value = true

  try {
    const payload: GuestBookPayload = {
      ...form.value,
      tipeKunjungan: form.value.tipeKunjungan as GuestBookPayload['tipeKunjungan']
    }

    await requestOtp(payload)

    step.value = 'success'
  } catch (error) {
    console.error(error)

    errorMessage.value =
      'Gagal menyimpan data. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

function resetForm() {
  step.value = 'event'

  form.value = {
    tipeKunjungan: '',
    namaAcara: '',
    tanggalKunjungan: '',
    nama: '',
    whatsapp: '',
    domisili: ''
  }

  errorMessage.value = ''
}
</script>

<template>
  <div class="guestbook-page">

    <!-- =====================================================
         HERO
    ====================================================== -->
    <section class="hero">

      <div class="hero-image"></div>

      <div class="hero-overlay"></div>

      <div class="hero-content">

        <div class="brand-label">
          <span class="brand-line"></span>
          <span>#KAMPUNGCOKLAT</span>
          <span class="brand-line"></span>
        </div>

        <h1>
          Selamat Datang di
          <strong>Kampung Coklat</strong>
        </h1>

        <p>
          Isi Buku Tamu Digital dan nikmati berbagai
          benefit menarik khusus untuk pengunjung.
        </p>

      </div>

      <div class="hero-wave">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 55C180 110 360 110 540 65C720 20 900 20 1080 60C1260 100 1350 95 1440 65V120H0Z"
            fill="#fffaf5"
          />
        </svg>
      </div>

    </section>


    <!-- =====================================================
         FORM SECTION
    ====================================================== -->
    <section
      id="guestbook"
      class="form-section"
    >

      <div class="form-container">

        <div class="guestbook-card">

          <!-- STEP INDICATOR -->
          <div class="step-indicator">

            <div class="step" :class="{ active: stepNumber >= 1, completed: stepNumber > 1 }">
              <span>1</span>
              <small>Info Kunjungan</small>
            </div>

            <div class="step-connector" :class="{ active: stepNumber > 1 }"></div>

            <div class="step" :class="{ active: stepNumber >= 2, completed: stepNumber > 2 }">
              <span>2</span>
              <small>Data Diri</small>
            </div>

            <div class="step-connector" :class="{ active: stepNumber > 2 }"></div>

            <div class="step" :class="{ active: stepNumber >= 3 }">
              <span>3</span>
              <small>Selesai</small>
            </div>

          </div>


          <!-- =================================================
               STEP 1: EVENT
          ================================================== -->
          <template v-if="step === 'event'">

            <div class="form-heading">
              <h2>Info Kunjungan</h2>
              <p>Lengkapi informasi acara atau tujuan kunjungan Anda di Kampung Coklat.</p>
            </div>

            <form class="guest-form" @submit.prevent="handleEventSubmit">

              <div class="form-group">
                <label>Tujuan Kunjungan</label>
                <div class="visit-type-grid">

                  <label class="visit-type-card pengajian-card" :class="{ selected: form.tipeKunjungan === 'pengajian' }">
                    <input v-model="form.tipeKunjungan" type="radio" value="pengajian" />
                    <div class="visit-type-content">
                      <strong>Pengajian</strong>
                      <span>Jamaah pengajian Kampung Coklat</span>
                    </div>
                    <div class="visit-type-check">✓</div>
                  </label>

                  <label class="visit-type-card hall-card" :class="{ selected: form.tipeKunjungan === 'hall' }">
                    <input v-model="form.tipeKunjungan" type="radio" value="hall" />
                    <div class="visit-type-content">
                      <strong>Pengguna Hall / Event</strong>
                      <span>Tamu acara, seminar, gathering, dan lainnya</span>
                    </div>
                    <div class="visit-type-check">✓</div>
                  </label>

                  <label class="visit-type-card b2b-card" :class="{ selected: form.tipeKunjungan === 'b2b' }">
                    <input v-model="form.tipeKunjungan" type="radio" value="b2b" />
                    <div class="visit-type-content">
                      <strong>B2B / Travel</strong>
                      <span>Travel agent atau mitra bisnis</span>
                    </div>
                    <div class="visit-type-check">✓</div>
                  </label>

                </div>
              </div>

              <div class="form-group">
                <label for="namaAcara">Nama Acara / Rombongan</label>
                <div class="input-wrapper">
                  <input id="namaAcara" v-model="form.namaAcara" type="text" placeholder="Contoh: Pengajian Akbar / Study Tour" required />
                </div>
              </div>

              <div class="form-group">
                <label for="tanggalKunjungan">Tanggal Kunjungan</label>
                <div class="input-wrapper">
                  <input id="tanggalKunjungan" v-model="form.tanggalKunjungan" type="date" required />
                </div>
              </div>

              <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

              <button type="submit" class="submit-button">
                <span>Lanjut Data Diri</span>
                <span class="button-arrow">→</span>
              </button>

            </form>
          </template>

          <!-- =================================================
               STEP 2: FORM DATA DIRI
          ================================================== -->
          <template v-else-if="step === 'form'">

            <div class="form-heading">
              <h2>Data Diri</h2>
              <p>Lengkapi data diri untuk mencatat kunjungan Anda di Kampung Coklat.</p>
            </div>

            <form class="guest-form" @submit.prevent="handleSubmit">


    <!-- =================================================
         NAMA
    ================================================== -->

    <div class="form-group">

      <label for="nama">
        Nama Lengkap
      </label>

      <div class="input-wrapper">
        <input
          id="nama"
          v-model="form.nama"
          type="text"
          placeholder="Masukkan nama lengkap"
          autocomplete="name"
          required
        />
      </div>

    </div>


    <!-- =================================================
         WHATSAPP
    ================================================== -->

    <div class="form-group">

      <label for="whatsapp">
        Nomor WhatsApp
      </label>

      <div class="input-wrapper">
        <input
          id="whatsapp"
          v-model="form.whatsapp"
          type="tel"
          inputmode="numeric"
          placeholder="08xxxxxxxxxx"
          autocomplete="tel"
          required
        />
      </div>

      <span class="input-hint">
        Nomor WhatsApp digunakan untuk verifikasi OTP.
      </span>

    </div>


    <!-- =================================================
         DOMISILI
    ================================================== -->

    <div class="form-group">

      <label for="domisili">
        Domisili
      </label>

      <div class="input-wrapper">
        <input
          id="domisili"
          v-model="form.domisili"
          type="text"
          placeholder="Contoh: Blitar"
          autocomplete="address-level2"
          required
        />
      </div>

    </div>


    <!-- =================================================
         TANGGAL LAHIR
    ================================================== -->

    <div class="form-group">

      <label for="tanggalLahir">
        Tanggal Lahir
      </label>

      <div class="input-wrapper">
        <input
          id="tanggalLahir"
          v-model="form.tanggalLahir"
          type="date"
        />
      </div>

      <span class="input-hint">
        Opsional: Dapatkan voucher promo & reward di hari ulang tahun Anda.
      </span>

    </div>


    <!-- =================================================
         ERROR
    ================================================== -->

    <p
      v-if="errorMessage"
      class="error-text"
    >
      {{ errorMessage }}
    </p>


    <!-- =================================================
         BUTTON
    ================================================== -->

    <button
      type="submit"
      class="submit-button"
      :disabled="isLoading"
    >

      <span>
        {{
          isLoading
            ? 'Menyimpan...'
            : 'Simpan Data'
        }}
      </span>

      <span class="button-arrow">
        →
      </span>

    </button>


    <p class="privacy-note">
      Data yang Anda berikan digunakan untuk pencatatan
      kunjungan dan kebutuhan layanan Kampung Coklat.
    </p>

  </form>

</template>


          <!-- =================================================
               STEP 3: SELESAI
          ================================================== -->
          <template v-else>

            <div class="success-state">

              <div class="success-circle">
                ✓
              </div>

              <h2>
                Data Berhasil Disimpan
              </h2>

              <p>
                Terimakasih atas kunjungannya di
                <strong>Kampung Coklat</strong>.
              </p>

            </div>

          </template>

        </div>

      </div>

    </section>


    

 

    <!-- =====================================================
         CTA
    ====================================================== -->
    <section class="cta-section">

      <div class="cta-content">

        <span class="cta-label">
          KAMPUNG COKLAT
        </span>

        <h2>
          Siap menikmati pengalaman
          <span>lebih istimewa?</span>
        </h2>

        <p>
          Daftar sekarang dan jangan lewatkan
          benefit spesial untuk pengunjung Kampung Coklat.
        </p>

        <a
          href="#guestbook"
          class="cta-button"
        >
          Mulai Daftar
          <span>→</span>
        </a>

      </div>

    </section>


    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer class="footer">

      <div class="footer-inner">

        <div class="footer-brand">

          <div class="footer-logo">
            Kampung Coklat
          </div>

          <p>
            Destinasi wisata edukasi dan pengalaman
            cokelat di Blitar.
          </p>

        </div>

        <div class="footer-copy">
          © {{ new Date().getFullYear() }}
          Kampung Coklat.
          All rights reserved.
        </div>

      </div>

    </footer>

  </div>
</template>


<style scoped>

/* =========================================================
   BASE
========================================================= */

* {
  box-sizing: border-box;
}

.guestbook-page {
  min-height: 100vh;
  background: #fffaf5;
  color: #321d16;
  overflow-x: hidden;
  font-family: inherit;
}

.section-container {
  width: min(1400px, calc(100% - 80px));
  margin: 0 auto;
}


/* =========================================================
   HERO
========================================================= */

.hero {
  height: 620px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  position: absolute;
  inset: 0;

  background-image: url('~/assets/assets_digitalbook/kcb.png');
  background-size: cover;
  background-position: center;

  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(37, 20, 13, 0.76) 0%,
      rgba(48, 27, 19, 0.55) 50%,
      rgba(40, 22, 16, 0.84) 100%
    );
}

.hero-content {
  position: relative;
  z-index: 2;

  width: min(900px, 92%);
  text-align: center;

  color: white;
  padding-bottom: 45px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  color: #f49a24;

  font-size: 16px;
  font-weight: 800;

  letter-spacing: 5px;

  margin-bottom: 26px;
}

.brand-line {
  width: 50px;
  height: 2px;

  background: #f49a24;
  opacity: 0.7;
}

.hero h1 {
  color: white;

  font-size: clamp(50px, 6vw, 82px);
  line-height: 1.04;

  letter-spacing: -2px;

  margin: 0;

  font-weight: 500;
}

.hero h1 strong {
  display: block;

  color: #f59b24;

  font-weight: 800;
}

.hero-content p {
  max-width: 700px;

  margin: 30px auto 0;

  font-size: clamp(19px, 2vw, 23px);

  line-height: 1.75;

  color: rgba(255, 255, 255, 0.92);
}

.hero-wave {
  position: absolute;

  bottom: -1px;
  left: 0;

  width: 100%;
  height: 105px;

  z-index: 3;
}

.hero-wave svg {
  display: block;

  width: 100%;
  height: 100%;
}


/* =========================================================
   FORM
========================================================= */

.form-section {
  background: #fffaf5;

  padding-bottom: 110px;
}

.form-container {
  width: min(1200px, calc(100% - 60px));

  margin: -135px auto 0;

  display: flex;
  justify-content: center;

  position: relative;
  z-index: 5;
}

.guestbook-card {
  width: 100%;
  max-width: 650px;

  background: white;

  border: 1px solid rgba(62, 36, 25, 0.08);

  border-radius: 28px;

  padding: 55px;

  box-shadow:
    0 30px 80px rgba(48, 28, 20, 0.15),
    0 10px 25px rgba(48, 28, 20, 0.06);
}


/* =========================================================
   STEP INDICATOR
========================================================= */

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 48px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
}

.step span {
  width: 48px;
  height: 48px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f6f1ec;

  border: 1px solid #e8ddd5;

  color: #a28d82;

  font-size: 17px;
  font-weight: 800;
}

.step small {
  color: #8b7569;

  font-size: 15px;
  font-weight: 600;
}

.step.active span {
  background: #f39421;

  color: white;

  border-color: #f39421;

  box-shadow:
    0 8px 22px rgba(243, 148, 33, 0.3);
}

.step.completed span {
  background: #3b231a;
  color: white;
}

.step-connector {
  width: 85px;
  height: 3px;

  background: #eadfd7;

  margin: 0 12px 25px;
}

.step-connector.active {
  background: #f39421;
}


/* =========================================================
   FORM HEADING
========================================================= */

.form-heading {
  text-align: center;
}

.heading-icon {
  width: 72px;
  height: 72px;

  margin: 0 auto 20px;

  border-radius: 20px;

  background: #fff1df;

  color: #ed8d1d;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 34px;
}

.heading-icon.otp-icon {
  background: #f1ebe7;
  color: #3c241b;
}

.form-heading h2 {
  color: #351f17;

  margin: 0;

  font-size: 42px;

  font-weight: 800;
}

.form-heading p {
  max-width: 480px;

  margin: 16px auto 38px;

  color: #8d7b72;

  font-size: 19px;

  line-height: 1.8;
}


/* =========================================================
   INPUT
========================================================= */

.guest-form {
  display: flex;
  flex-direction: column;

  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 10px;
}

.form-group label {
  color: #432a20;

  font-size: 18px;

  font-weight: 700;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;

  left: 20px;
  top: 50%;

  transform: translateY(-50%);

  color: #a28d82;

  font-size: 24px;

  z-index: 2;
}

.input-wrapper input {
  width: 100%;

  height: 66px;

  padding: 0 20px;

  border: 1px solid #e4dad3;

  border-radius: 16px;

  background: white;

  color: #352017;

  font-size: 18px;

  outline: none;

  transition: 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #b7aaa3;
}

.input-wrapper input:focus {
  border-color: #e99a32;

  box-shadow:
    0 0 0 4px rgba(233, 154, 50, 0.12);
}

.input-hint {
  font-size: 14px;

  color: #a18f86;
}


/* =========================================================
   BUTTON
========================================================= */

.submit-button {
  height: 66px;
  width: 100%;

  border: none;

  border-radius: 16px;

  background: #351f17;

  color: white;

  font-size: 19px;

  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 14px;

  cursor: pointer;

  transition: 0.25s ease;
}

.submit-button:hover:not(:disabled) {
  background: #4a291e;

  transform: translateY(-3px);

  box-shadow:
    0 14px 28px rgba(53, 31, 23, 0.2);
}

.submit-button:disabled {
  opacity: 0.55;

  cursor: not-allowed;
}

.button-arrow {
  color: #f49a24;

  font-size: 26px;
}

.privacy-note {
  text-align: center;

  font-size: 14px;

  color: #a79a93;

  line-height: 1.7;
}


/* =========================================================
   OTP
========================================================= */

.otp-area {
  text-align: center;

  padding: 12px 0 24px;
}

.otp-info {
  color: #9b8a81;

  font-size: 16px;

  margin-top: 20px;
}

.back-button {
  display: block;

  margin: 20px auto 0;

  border: none;

  background: none;

  color: #72594d;

  font-size: 17px;

  cursor: pointer;
}

.back-button:hover {
  color: #ed8d1d;
}


/* =========================================================
   ERROR
========================================================= */

.error-text {
  color: #c84632;

  background: #fff1ef;

  border: 1px solid #f5d2cd;

  border-radius: 12px;

  padding: 14px;

  font-size: 15px;
}

.center {
  text-align: center;
}


/* =========================================================
   SUCCESS
========================================================= */

.success-state {
  text-align: center;
}

.success-circle {
  width: 100px;
  height: 100px;

  margin: 0 auto 24px;

  border-radius: 50%;

  background: #f39a27;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 44px;

  box-shadow:
    0 14px 35px rgba(243, 154, 39, 0.28);
}

.success-label {
  color: #ed8d1d;

  font-size: 14px;

  font-weight: 800;

  letter-spacing: 2px;
}

.success-state h2 {
  font-size: 42px;

  margin: 12px 0;
}

.success-state > p {
  font-size: 18px;

  color: #8f7d74;

  line-height: 1.7;
}

.success-message {
  display: flex;

  align-items: center;

  gap: 18px;

  text-align: left;

  background: #faf5f0;

  border: 1px solid #eee3db;

  border-radius: 16px;

  padding: 18px;

  margin-top: 26px;
}

.success-message-icon {
  width: 54px;
  height: 54px;

  flex-shrink: 0;

  border-radius: 14px;

  background: #25a55a;

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;

  font-weight: 800;
}

.success-message strong {
  display: block;

  font-size: 16px;
}

.success-message span {
  display: block;

  font-size: 14px;

  color: #99887f;

  margin-top: 5px;
}

.success-hint {
  font-size: 15px !important;

  margin-top: 22px;
}


/* =========================================================
   MEMBERSHIP
========================================================= */

.benefit-section {
  background:
    linear-gradient(
      180deg,
      #f6f1ec 0%,
      #fffaf5 100%
    );

  padding: 125px 0;

  position: relative;

  overflow: hidden;
}

.benefit-section::before {
  content: '';

  position: absolute;

  width: 600px;
  height: 600px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(243, 154, 39, 0.08),
      transparent 70%
    );

  top: -220px;
  right: -160px;
}


/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
  text-align: center;

  max-width: 900px;

  margin: 0 auto 75px;

  position: relative;

  z-index: 2;
}

.section-label {
  display: inline-block;

  color: #ed8d1d;

  font-size: 15px;

  font-weight: 800;

  letter-spacing: 4px;

  margin-bottom: 20px;
}

.section-heading h2 {
  color: #2f1a12;

  font-size: clamp(46px, 5vw, 70px);

  line-height: 1.08;

  margin: 0;

  font-weight: 800;

  letter-spacing: -1.5px;
}

.section-heading h2 span {
  color: #e79022;
}

.section-heading p {
  margin: 28px auto 0;

  max-width: 780px;

  font-size: 20px;

  line-height: 1.8;

  color: #7a685f;
}


/* =========================================================
   MEMBERSHIP GRID
========================================================= */

.membership-grid {
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 28px;

  position: relative;

  z-index: 2;
}


/* =========================================================
   MEMBERSHIP CARD
========================================================= */

.membership-card {
  position: relative;

  min-height: 390px;

  background: #ffffff;

  border: 1px solid rgba(58, 34, 23, 0.08);

  border-radius: 24px;

  padding: 32px 38px 34px;

  overflow: hidden;

  transition: 0.35s ease;

  box-shadow:
    0 12px 35px rgba(46, 24, 16, 0.05);
}

.membership-card::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 4px;

  background: #f39a27;
}

.membership-card:hover {
  transform: translateY(-8px);

  box-shadow:
    0 25px 50px rgba(46, 24, 16, 0.12);
}


/* =========================================================
   FEATURED CARD
========================================================= */

.featured-card {
  background:
    linear-gradient(
      145deg,
      #2f1710,
      #4a2416
    );

  color: white;

  transform: translateY(-4px);

  box-shadow:
    0 25px 55px rgba(52, 25, 16, 0.22);
}

.featured-card::before {
  background: #ffb347;
}

.featured-card:hover {
  transform: translateY(-12px);
}


/* =========================================================
   POPULAR BADGE
========================================================= */

.popular-badge {
  position: absolute;

  top: 18px;
  right: 20px;

  display: flex;
  align-items: center;

  gap: 7px;

  background: #f39a27;

  color: #2f1710;

  padding: 9px 15px;

  border-radius: 999px;

  font-size: 12px;

  font-weight: 900;

  letter-spacing: 0.7px;
}

.popular-badge span {
  font-size: 17px;
}


/* =========================================================
   MEMBERSHIP TOP
========================================================= */

.membership-top {
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 26px;
}

.membership-icon {
  width: 70px;
  height: 70px;

  border-radius: 20px;

  background: #fff2df;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 38px;

  box-shadow:
    0 8px 18px rgba(46, 24, 16, 0.05);
}

.dark-icon {
  background: rgba(255, 255, 255, 0.12);
}

.membership-code {
  color: #321d16;

  font-size: 38px;

  font-weight: 900;

  letter-spacing: 2px;

  line-height: 1;
}

.featured-card .membership-code {
  color: white;
}


/* =========================================================
   TITLE
========================================================= */

.membership-title-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  margin-bottom: 12px;
}

.membership-card h3 {
  font-size: 28px;

  line-height: 1.2;

  margin: 0;

  color: #2f1a12;

  font-weight: 800;
}

.featured-card h3 {
  color: white;
}

.membership-tag {
  flex-shrink: 0;

  background: #fff3df;

  color: #df8618;

  border-radius: 7px;

  padding: 6px 10px;

  font-size: 11px;

  font-weight: 900;

  letter-spacing: 0.5px;
}

.dark-tag {
  background: rgba(255, 255, 255, 0.1);

  color: #ffc46d;
}


/* =========================================================
   CARD SUBTITLE
========================================================= */

.card-subtitle {
  font-size: 17px;

  line-height: 1.65;

  margin: 0;

  min-height: 56px;

  color: #8b7a72;
}

.featured-card .card-subtitle {
  color: rgba(255, 255, 255, 0.72);
}


/* =========================================================
   DIVIDER
========================================================= */

.card-divider {
  width: 100%;

  height: 1px;

  background: #eee4dd;

  margin: 22px 0;
}

.featured-card .card-divider {
  background: rgba(255, 255, 255, 0.12);
}


/* =========================================================
   BENEFIT LIST
========================================================= */

.card-list {
  list-style: none;

  padding: 0;
  margin: 0;

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  column-gap: 25px;

  row-gap: 18px;
}

.card-list li {
  display: flex;

  align-items: flex-start;

  gap: 10px;

  font-size: 15px;

  line-height: 1.55;

  color: #5b463d;
}

.featured-card .card-list li {
  color: rgba(255, 255, 255, 0.86);
}

.check-icon {
  flex-shrink: 0;

  width: 22px;
  height: 22px;

  border-radius: 50%;

  background: #fff2df;

  color: #e79022;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;

  font-weight: 900;

  margin-top: 1px;
}

.featured-card .check-icon {
  background: rgba(255, 255, 255, 0.13);

  color: #ffc56c;
}


/* =========================================================
   HOW IT WORKS
========================================================= */

.how-section {
  background: #fffaf5;

  padding: 125px 0;
}

.how-layout {
  display: grid;

  grid-template-columns: 0.8fr 1.2fr;

  gap: 80px;

  align-items: center;
}


/* LEFT */

.how-content {
  max-width: 530px;
}

.how-content h2 {
  color: #351f17;

  font-size: clamp(48px, 5vw, 70px);

  line-height: 1.03;

  letter-spacing: -1.5px;

  margin: 0;

  font-weight: 800;
}

.how-content h2 span {
  color: #e99021;
}

.how-content p {
  color: #85746b;

  font-size: 20px;

  line-height: 1.8;

  margin-top: 28px;
}


/* RIGHT */

.process-list {
  display: grid;

  grid-template-columns: 1fr auto 1fr auto 1fr;

  align-items: stretch;

  gap: 18px;
}

.process-item {
  position: relative;

  padding: 28px 22px;

  background: white;

  border: 1px solid #eee2d9;

  border-radius: 22px;

  min-height: 245px;

  box-shadow:
    0 12px 30px rgba(53, 31, 23, 0.05);
}

.process-number {
  color: #e99021;

  font-size: 21px;

  font-weight: 900;

  margin-bottom: 18px;
}

.process-icon {
  width: 70px;
  height: 70px;

  border-radius: 20px;

  background: #fff2df;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 39px;

  margin-bottom: 20px;
}

.process-text h3 {
  font-size: 22px;

  margin: 0 0 9px;

  color: #351f17;
}

.process-text p {
  font-size: 15px;

  line-height: 1.65;

  color: #8c7a71;

  margin: 0;
}

.process-arrow {
  align-self: center;

  color: #e99021;

  font-size: 36px;

  font-weight: 700;
}


/* =========================================================
   CTA
========================================================= */

.cta-section {
  background:
    linear-gradient(
      120deg,
      #351f17,
      #4b2a1e
    );

  padding: 120px 20px;

  text-align: center;
}

.cta-content {
  max-width: 820px;

  margin: auto;
}

.cta-label {
  color: #f39a27;

  font-size: 14px;

  font-weight: 800;

  letter-spacing: 4px;
}

.cta-content h2 {
  color: white;

  font-size: clamp(46px, 5vw, 68px);

  line-height: 1.08;

  margin: 20px 0;

  font-weight: 800;
}

.cta-content h2 span {
  color: #f39a27;
}

.cta-content p {
  color: rgba(255, 255, 255, 0.72);

  font-size: 20px;

  line-height: 1.8;

  margin: 0 auto 35px;
}

.cta-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 15px;

  padding: 17px 30px;

  background: #f39a27;

  color: #351f17;

  text-decoration: none;

  border-radius: 15px;

  font-size: 19px;

  font-weight: 800;

  transition: 0.25s;
}

.cta-button span {
  font-size: 25px;
}

.cta-button:hover {
  transform: translateY(-3px);

  background: #ffab3d;
}


/* =========================================================
   FOOTER
========================================================= */

.footer {
  background: #281711;

  color: white;

  padding: 45px 0;
}

.footer-inner {
  width: min(1400px, calc(100% - 80px));

  margin: auto;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;
}

.footer-logo {
  color: #f39a27;

  font-size: 24px;

  font-weight: 800;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.55);

  font-size: 15px;

  margin-top: 8px;
}

.footer-copy {
  color: rgba(255, 255, 255, 0.45);

  font-size: 14px;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1150px) {

  .section-container {
    width: min(1100px, calc(100% - 50px));
  }

  .membership-grid {
    grid-template-columns: 1fr;
  }

  .membership-card {
    min-height: auto;
  }

  .featured-card {
    transform: none;
  }

  .featured-card:hover {
    transform: translateY(-8px);
  }

  .how-layout {
    grid-template-columns: 1fr;

    gap: 60px;
  }

  .how-content {
    max-width: 700px;
  }

  .process-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .process-arrow {
    display: none;
  }
}


/* =========================================================
   TABLET SMALL
========================================================= */

@media (max-width: 800px) {

  .hero {
    height: 530px;
  }

  .hero h1 {
    font-size: 48px;
  }

  .hero-content p {
    font-size: 18px;
  }

  .form-container {
    margin-top: -95px;

    width: min(650px, calc(100% - 35px));
  }

  .guestbook-card {
    padding: 40px 30px;
  }

  .section-container {
    width: calc(100% - 40px);
  }

  .benefit-section,
  .how-section {
    padding: 90px 0;
  }

  .section-heading {
    margin-bottom: 55px;
  }

  .section-heading p {
    font-size: 18px;
  }

  .membership-card {
    padding: 30px;
  }

  .process-list {
    grid-template-columns: 1fr;
  }

  .process-item {
    min-height: auto;
  }

  .process-arrow {
    display: none;
  }

  .footer-inner {
    flex-direction: column;

    align-items: flex-start;
  }
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 560px) {

  .hero {
    height: 450px;
  }

  .hero h1 {
    font-size: 38px;

    letter-spacing: -1px;
  }

  .hero-content p {
    font-size: 16px;

    line-height: 1.7;
  }

  .brand-label {
    font-size: 11px;

    letter-spacing: 3px;

    gap: 10px;
  }

  .brand-line {
    width: 30px;
  }

  .form-container {
    width: calc(100% - 24px);

    margin-top: -70px;
  }

  .guestbook-card {
    padding: 30px 20px;

    border-radius: 22px;
  }

  .step-connector {
    width: 30px;

    margin-left: 6px;
    margin-right: 6px;
  }

  .step span {
    width: 42px;
    height: 42px;
  }

  .step small {
    font-size: 12px;
  }

  .form-heading h2 {
    font-size: 34px;
  }

  .form-heading p {
    font-size: 16px;
  }

  .input-wrapper input {
    height: 60px;

    font-size: 16px;
  }

  .section-container {
    width: calc(100% - 30px);
  }

  .section-heading h2 {
    font-size: 43px;
  }

  .section-heading p {
    font-size: 17px;
  }

  .membership-title-row {
    align-items: flex-start;
  }

  .membership-card h3 {
    font-size: 25px;
  }

  .card-list {
    grid-template-columns: 1fr;
  }

  .membership-icon {
    width: 64px;
    height: 64px;

    font-size: 34px;
  }

  .membership-code {
    font-size: 34px;
  }

  .how-content h2 {
    font-size: 45px;
  }

  .how-content p {
    font-size: 17px;
  }

  .cta-section {
    padding: 85px 20px;
  }

  .cta-content h2 {
    font-size: 43px;
  }

  .cta-content p {
    font-size: 17px;
  }
}

/* =========================================================
   VISIT TYPE
========================================================= */

.visit-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.visit-type-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 24px 20px;
  border: 2px solid transparent;
  border-radius: 16px;
  background: #2a1a14;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 150px;
  overflow: hidden;
}

.visit-type-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(4px) brightness(0.55);
  transition: all 0.4s ease;
  z-index: 0;
  transform: scale(1.05);
}

.pengajian-card::before {
  background-image: url('~/assets/assets_POS/pengajian.png');
}

.hall-card::before {
  background-image: url('~/assets/assets_POS/hall.jpg');
}

.b2b-card::before {
  background-image: url('~/assets/assets_POS/b2b.png');
}

.visit-type-card:hover {
  border-color: #e9a04a;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(233, 160, 74, 0.2);
}

.visit-type-card:hover::before {
  filter: blur(2px) brightness(0.65);
  transform: scale(1.08);
}

.visit-type-card.selected {
  border-color: #f39421;
  background: #3b241a;
  box-shadow: 0 8px 24px rgba(243, 148, 33, 0.25);
}

.visit-type-card.selected::before {
  filter: blur(0px) brightness(0.75);
  transform: scale(1.0);
}

.visit-type-card input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.visit-type-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding-right: 28px;
}

.visit-type-content strong {
  color: #ffffff;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.visit-type-content span {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13.5px;
  line-height: 1.45;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

.visit-type-check {
  position: absolute;
  z-index: 1;
  top: 22px;
  right: 20px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: transparent;
  font-size: 12px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.2);
}

.visit-type-card.selected .visit-type-check {
  background: #f39421;
  border-color: #f39421;
  color: white;
}


/* =========================================================
   MOBILE VISIT TYPE
========================================================= */

@media (max-width: 560px) {

  .visit-type-grid {
    grid-template-columns: 1fr;
  }

  .visit-type-card {
    padding: 15px;

    gap: 12px;
  }

  .visit-type-icon {
    width: 44px;
    height: 44px;

    border-radius: 12px;

    font-size: 22px;
  }

  .visit-type-content strong {
    font-size: 15px;
  }

  .visit-type-content span {
    font-size: 12px;
  }

  .visit-type-check {
    width: 22px;
    height: 22px;
  }

}
</style>