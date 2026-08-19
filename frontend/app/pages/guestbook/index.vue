<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="guestbook-container">
    <h1>Buku Tamu (Digital Guest Book)</h1>
    <p>Silakan isi data diri Anda untuk pendaftaran jamaah pengajian / member baru.</p>
    
    <form @submit.prevent class="guest-form">
      <div class="form-group">
        <label>Nama Lengkap</label>
        <input type="text" placeholder="Masukkan nama Anda" />
      </div>
      <div class="form-group">
        <label>Nomor WhatsApp</label>
        <input type="tel" placeholder="08xxxx" />
      </div>
      <div class="form-group">
        <label>Domisili</label>
        <input type="text" placeholder="Kota Domisili" />
      </div>
      <SharedBaseButton text="Daftar & Request OTP" />
    </form>
  </div>
</template>

<style scoped>
.guestbook-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.guest-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.form-group label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.form-group input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
