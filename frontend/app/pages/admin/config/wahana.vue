<template>
  <div class="katalog-page">
    <!-- Header Section -->
    <header class="katalog-header">
      <div class="header-left">
        <h1 class="page-title">Pengaturan Tarif Tiket &amp; Wahana</h1>
        <p class="page-subtitle">
          Kelola harga tiket masuk, paket edukasi, dan status operasional wahana rekreasi kawasan Kampung Coklat.
        </p>
      </div>
    </header>

    <!-- Role Warning if not Admin -->
    <div v-if="!canManageConfig" class="role-warning-banner">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <div>
        <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Pembaruan harga tiket dan status operasional dibatasi hanya untuk Super Admin.
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- ========================================================================= -->
    <!-- SECTION 2: KATALOG WAHANA & STATUS OPERASIONAL (1:1 REFERENCE DESIGN)     -->
    <!-- ========================================================================= -->
    <section class="section-widget-frame">
      <div class="section-head-bar">
        <div class="section-head-left">
          <div class="section-title-badge">
              <h2 class="sec-title">Katalog &amp; Status Operasional Wahana</h2>
          </div>
          <p class="sec-subtitle">Kelola wahana rekreasi di kawasan Kampung Coklat</p>
        </div>
      </div>

      <!-- Controls: Total count + View toggle + Category selector + Add button -->
      <div class="katalog-control-bar">
        <div class="total-wahana-pill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Total {{ filteredRides.length }} wahana terdaftar</span>
        </div>

        <div class="control-bar-right">
          <!-- Category Select Pill -->
          <div class="category-dropdown-wrapper">
            <select v-model="rideFilterCategory" class="category-select-pill">
              <option value="ALL">Semua Kategori</option>
              <option value="wahana">Fasilitas Wahana</option>
              <option value="venue">Sewa Tempat</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="select-chevron">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 4-Column Compact & Proportional Wahana Cards Grid -->
      <div class="wahana-reference-grid">
        <div 
          v-for="ride in filteredRides" 
          :key="ride.id" 
          class="wahana-card-ref"
        >
          <!-- Top Photo Box with Ribbon, Floating Icon & Status -->
          <div class="wahana-photo-box">
            <img 
              :src="ride.imageUrl" 
              :alt="ride.name"
              class="wahana-img"
              loading="lazy"
            />

            <!-- Top-Left Category Tag Ribbon (Only for Terusan) -->
            <div v-if="ride.isFreeTerusan" class="wahana-top-ribbon ribbon-terusan">
              <span>TIKET TERUSAN</span>
            </div>

            <!-- Top-Right Status Toggle Pill -->
            <button 
              type="button" 
              class="wahana-status-pill"
              :class="`status-${ride.status.toLowerCase()}`"
              :disabled="!canManageConfig"
              @click.stop="toggleRideStatus(ride)"
              title="Klik untuk ubah status operasional"
            >
              <span class="status-dot"></span>
              <span>{{ ride.status }}</span>
            </button>
          </div>

          <!-- Card Content Body (Compact & Harmonious) -->
          <div class="wahana-content-body">
            <h3 class="wahana-title">{{ ride.name }}</h3>

            

            <!-- Sleek Action Buttons Bar -->
            <div class="wahana-action-bar-compact">
              

              <button 
                type="button" 
                class="btn-wahana-pill btn-pill-maint"
                :class="{ 'is-maint-active': ride.status === 'MAINTENANCE' }"
                :disabled="!canManageConfig"
                @click.stop="toggleRideStatus(ride)"
                :title="ride.status === 'MAINTENANCE' ? 'Kembalikan ke status Buka Operasional' : 'Ubah status ke Mode Maintenance'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <span>{{ ride.status === 'MAINTENANCE' ? 'Set Buka' : 'Maintenance' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Edit Harga Tiket -->
    <div v-if="showTicketModal" class="modal-backdrop" @click.self="showTicketModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-col">
            <img :src="logoImg" alt="Kampung Coklat" class="modal-mini-logo" />
            <h3>{{ selectedTicket ? 'Ubah Tarif: ' + selectedTicket.name : 'Tambah Tiket Baru' }}</h3>
          </div>
          <button class="btn-close" @click="showTicketModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveTicketPrice">
          <div class="modal-body">
            <div class="form-group">
              <label>Kategori Utama</label>
              <select v-model="ticketForm.category" class="filter-select full-width">
                <option value="gate">Tiket Masuk (Gate)</option>
                <option value="wahana">Fasilitas Wahana</option>
                <option value="venue">Sewa Tempat / Venue</option>
                <option value="edukasi">Paket Edukasi</option>
                <option value="rombongan">Booking Rombongan</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nama Tiket / Kategori</label>
              <input v-model="ticketForm.name" type="text" class="input-control" required placeholder="Contoh: Tiket Khusus Event" />
            </div>

            <div class="form-group">
              <label>Harga Satuan (Rp)</label>
              <input v-model.number="ticketForm.price" type="number" step="1000" class="input-control" required />
            </div>

            <div class="form-group">
              <label>Deskripsi Struk / E-Ticket</label>
              <textarea v-model="ticketForm.description" class="textarea-control" rows="2"></textarea>
            </div>

            <div class="form-group">
              <label>Status Tiket</label>
              <select v-model="ticketForm.isActive" class="filter-select full-width">
                <option :value="true">Aktif (Tampil di POS)</option>
                <option :value="false">Non-Aktif (Disembunyikan)</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showTicketModal = false">Batal</button>
            <button type="submit" class="btn-primary-modal">Simpan Perubahan Tarif</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit / Tambah Wahana -->
    <div v-if="showRideModal" class="modal-backdrop" @click.self="showRideModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-col">
            <img :src="logoImg" alt="Kampung Coklat" class="modal-mini-logo" />
            <h3>{{ isEditingRide ? `Edit Wahana: ${rideForm.name}` : 'Tambah Wahana Rekreasi Baru' }}</h3>
          </div>
          <button class="btn-close" @click="showRideModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveRide">
          <div class="modal-body">
            <div class="form-group">
              <label>Nama Wahana Rekreasi</label>
              <input v-model="rideForm.name" type="text" class="input-control" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Tarif Satuan (Rp)</label>
                <input v-model.number="rideForm.price" type="number" step="1000" class="input-control" required />
              </div>
              <div class="form-group">
                <label>Kapasitas (Orang)</label>
                <input v-model.number="rideForm.capacity" type="number" class="input-control" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Durasi Sesi</label>
                <input v-model="rideForm.duration" type="text" class="input-control" placeholder="10 Menit" required />
              </div>
              <div class="form-group">
                <label>Status Operasional</label>
                <select v-model="rideForm.status" class="filter-select full-width">
                  <option value="BUKA">BUKA (Normal)</option>
                  <option value="MAINTENANCE">MAINTENANCE (Servis)</option>
                  <option value="TUTUP">TUTUP (Off)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-row">
                <input v-model="rideForm.isFreeTerusan" type="checkbox" />
                <span>Termasuk dalam Paket Tiket Terusan (Free Wahana)</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showRideModal = false">Batal</button>
            <button type="submit" class="btn-primary-modal">Simpan Wahana</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigSync } from '~/composables/useConfigSync'
import { toRaw, computed, ref, reactive } from 'vue'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

definePageMeta({
  layout: 'admin'
})

const { user, canManageConfig } = useAuth()
const { ticketRates, rides: ridesList, refetch: fetchConfig } = useConfigSync()

const viewMode = ref<'grid' | 'list'>('grid')
const rideFilterCategory = ref('ALL')
const showTicketModal = ref(false)
const showRideModal = ref(false)
const isEditingRide = ref(false)

const activeTicketCategory = ref('gate')

// Kita satukan data fisik wahana (rides) dengan data tiket (ticketRates)
const filteredRides = computed(() => {
  const validCategories = ['wahana', 'venue']
  const relevantTickets = ticketRates.value.filter(t => validCategories.includes(t.category) && t.isActive)
  
  const mapped = relevantTickets.map(t => {
    const ridePhysical = ridesList.value.find(r => r.name.toLowerCase() === t.name.toLowerCase())
    return {
      id: t.id, // ID ini adalah ID Tiket!
      ridePhysicalId: ridePhysical?.id || null, // Jika null, berarti belum punya entri fisik
      name: t.name,
      imageUrl: t.imageUrl,
      price: t.price,
      isFreeTerusan: ridePhysical?.isFreeTerusan ?? false,
      status: ridePhysical?.status || 'BUKA',
      capacity: ridePhysical?.capacity || 0,
      duration: ridePhysical?.duration || '-',
      description: t.description || ridePhysical?.description || '',
      playedToday: ridePhysical?.playedToday || 0,
      category: t.category, // 'wahana' atau 'venue'
      rideCategory: ridePhysical?.category || (t.category === 'wahana' ? 'paid' : 'terusan')
    }
  })
  
  if (rideFilterCategory.value === 'ALL') return mapped
  return mapped.filter(r => r.category === rideFilterCategory.value)
})

const getRideIcon = (name: string) => {
  const n = name.toLowerCase()
  if (n.includes('bom-bom') || n.includes('car')) return '🚗'
  if (n.includes('kereta') || n.includes('monorel')) return '🚂'
  if (n.includes('balon') || n.includes('istana')) return '🎈'
  if (n.includes('kolam') || n.includes('waterboom') || n.includes('perahu') || n.includes('ikan')) return '🏊'
  if (n.includes('atv')) return '🏎️'
  if (n.includes('flying')) return '🧗'
  if (n.includes('golf')) return '⛳'
  if (n.includes('sepeda')) return '🚲'
  return '🎡'
}

const toggleRideStatus = async (ride: any) => {
  const newStatus = ride.status === 'MAINTENANCE' ? 'BUKA' : 'MAINTENANCE'
  
  try {
    if (ride.ridePhysicalId) {
      // Mesin fisik sudah ada di DB
      await $fetch(`http://localhost:3001/api/v1/config/rides/${ride.ridePhysicalId}`, {
        method: 'PUT',
        body: { status: newStatus }
      })
    } else {
      // Mesin fisik belum terdaftar! Buat baru agar sinkron.
      await $fetch(`http://localhost:3001/api/v1/config/rides`, {
        method: 'POST',
        body: {
          name: ride.name,
          price: ride.price,
          capacity: 20,
          duration: '15 Menit',
          isFreeTerusan: false,
          status: newStatus,
          imageUrl: ride.imageUrl,
          category: 'paid'
        }
      })
    }
    await fetchConfig()
  } catch (error) {
    console.error('Failed to toggle status', error)
  }
}

const rideForm = reactive({
  id: '',
  ridePhysicalId: null as string | null,
  name: '',
  price: 15000,
  capacity: 16,
  duration: '15 Menit',
  isFreeTerusan: true,
  status: 'BUKA' as 'BUKA' | 'MAINTENANCE' | 'TUTUP' | string,
  imageMode: 'url' as 'url' | 'upload',
  imageUrl: '',
  imageFile: null as File | null
})

const onRideFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    rideForm.imageFile = target.files[0]
  } else {
    rideForm.imageFile = null
  }
}

const openAddRideModal = () => {
  isEditingRide.value = false
  rideForm.id = ''
  rideForm.ridePhysicalId = null
  rideForm.name = ''
  rideForm.price = 15000
  rideForm.capacity = 20
  rideForm.duration = '15 Menit'
  rideForm.isFreeTerusan = true
  rideForm.status = 'BUKA'
  rideForm.imageMode = 'url'
  rideForm.imageUrl = ''
  rideForm.imageFile = null
  showRideModal.value = true
}

// Meskipun template mungkin tidak punya tombol edit, kita sediakan logikanya
const editRide = (ride: any) => {
  isEditingRide.value = true
  rideForm.id = ride.id
  rideForm.ridePhysicalId = ride.ridePhysicalId
  rideForm.name = ride.name
  rideForm.price = ride.price
  rideForm.capacity = ride.capacity
  rideForm.duration = ride.duration
  rideForm.isFreeTerusan = ride.isFreeTerusan
  rideForm.status = ride.status
  rideForm.imageMode = 'url'
  rideForm.imageUrl = ride.imageUrl.startsWith('http') ? ride.imageUrl.replace('http://localhost:3001', '') : ride.imageUrl
  rideForm.imageFile = null
  showRideModal.value = true
}

const saveRide = async () => {
  let finalImageUrl = rideForm.imageUrl
  
  if (rideForm.imageMode === 'upload' && rideForm.imageFile) {
    const formData = new FormData()
    formData.append('file', toRaw(rideForm.imageFile))
    try {
      const uploadRes = await $fetch<{ url: string }>('http://localhost:3001/api/v1/config/upload', {
        method: 'POST',
        body: formData
      })
      finalImageUrl = uploadRes.url
    } catch (e) {
      console.error('File upload failed', e)
      return
    }
  }

  // 1. Simpan/Update Ticket Rate (sumber utama)
  const ticketPayload = {
    name: rideForm.name,
    category: 'wahana',
    price: rideForm.price,
    isActive: true,
    imageUrl: finalImageUrl
  }
  
  try {
    if (isEditingRide.value && rideForm.id) {
      await $fetch(`http://localhost:3001/api/v1/config/tickets/${rideForm.id}`, {
        method: 'PUT',
        body: ticketPayload
      })
    } else {
      await $fetch('http://localhost:3001/api/v1/config/tickets', {
        method: 'POST',
        body: ticketPayload
      })
    }
    
    // 2. Simpan/Update Physical Ride
    const ridePayload = {
      name: rideForm.name,
      price: rideForm.price,
      capacity: rideForm.capacity,
      duration: rideForm.duration,
      isFreeTerusan: rideForm.isFreeTerusan,
      status: rideForm.status,
      imageUrl: finalImageUrl,
      category: rideForm.isFreeTerusan ? 'terusan' : 'paid'
    }
    
    if (rideForm.ridePhysicalId) {
       await $fetch(`http://localhost:3001/api/v1/config/rides/${rideForm.ridePhysicalId}`, {
         method: 'PUT',
         body: ridePayload
       })
    } else {
       // Buat baru fisik
       await $fetch(`http://localhost:3001/api/v1/config/rides`, {
         method: 'POST',
         body: ridePayload
       })
    }

    await fetchConfig()
    showRideModal.value = false
    alert('Wahana berhasil disimpan di kedua tabel secara sinkron!');
  } catch (error) {
    console.error('Failed to save unified ride', error)
  }
}

// Untuk ticket rates Modal (jika masih digunakan di wahana.vue)
const ticketForm = reactive({
  id: '',
  name: '',
  category: 'gate' as 'gate' | 'wahana' | 'venue' | 'edukasi' | 'rombongan' | string,
  price: 20000,
  description: '',
  isActive: true,
  imageMode: 'url' as 'url' | 'upload',
  imageUrl: '',
  imageFile: null as File | null
})

const saveTicketPrice = async () => {
  // Hanya simpan tiket (tanpa fisik)
  let finalImageUrl = ticketForm.imageUrl
  if (ticketForm.imageMode === 'upload' && ticketForm.imageFile) {
    const formData = new FormData()
    formData.append('file', toRaw(ticketForm.imageFile))
    const uploadRes = await $fetch<{ url: string }>('http://localhost:3001/api/v1/config/upload', {
      method: 'POST',
      body: formData
    })
    finalImageUrl = uploadRes.url
  }
  const payload = {
    name: ticketForm.name,
    category: ticketForm.category,
    price: ticketForm.price,
    description: ticketForm.description,
    isActive: ticketForm.isActive,
    imageUrl: finalImageUrl
  }
  try {
    if (ticketForm.id) {
      await $fetch(`http://localhost:3001/api/v1/config/tickets/${ticketForm.id}`, { method: 'PUT', body: payload })
    } else {
      await $fetch('http://localhost:3001/api/v1/config/tickets', { method: 'POST', body: payload })
    }
    await fetchConfig()
    showTicketModal.value = false
  } catch (error) {
    console.error('Failed to save ticket', error)
  }
}

const formatRupiah = (val: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@500;600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');

/* ========================================================================= */
/* PAGE ROOT CONTAINER                                                       */
/* ========================================================================= */
.katalog-page {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
}

/* ========================================================================= */
/* HEADER BANNER WITH COCOA & CHOCOLATE ART                                  */
/* ========================================================================= */
.katalog-header {
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 75px;
  padding: 6px 0 10px 0;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 680px;
  position: relative;
  z-index: 2;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3D2214;
  color: #FAF5EE;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.mini-chip-img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #FAF3E8;
  color: #B45309;
  border: 1px solid #EADBCC;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 500;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
}

/* Header Right Cocoa & Chocolate Decorative Graphic */
.header-cocoa-decor {
  position: absolute;
  right: 0;
  top: -15px;
  bottom: -15px;
  width: 280px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
}

.botanical-leaves-bg {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

.chocolate-pieces-art {
  position: absolute;
  right: 10px;
  top: 0;
  width: 140px;
  height: 100px;
}

.choc-svg {
  width: 100%;
  height: 100%;
}

.role-warning-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #FEF3C7;
  border: 1.5px solid #F59E0B;
  color: #92400E;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 700;
}

/* ========================================================================= */
/* SECTION WIDGET FRAME (TARIF TIKET & KATALOG WAHANA)                       */
/* ========================================================================= */
.section-widget-frame {
  background: #FFFDF9;
  border: 1.5px solid #EFE4D6;
  border-radius: 24px;
  padding: 20px 22px 22px 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(61, 34, 20, 0.04);
}

.section-head-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

.section-head-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-title-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sec-icon {
  font-size: 18px;
}

.sec-title {
  font-size: 24px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
}

.sec-subtitle {
  font-size: 12px;
  color: #7A5034;
  margin: 0;
}

/* ========================================================================= */
/* 1. TARIF TIKET MASUK CARDS GRID (COMPACT & PROPORTIONAL CLEAN DESIGN)     */
/* ========================================================================= */
/* =========================================================
   TICKET CATEGORY TABS & HORIZONTAL LIST
   ========================================================= */
.ticket-category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 12px;
  overflow-x: auto;
}

.ticket-tab-btn {
  background: transparent;
  border: none;
  font-weight: 600;
  font-size: 14px;
  color: #64748B;
  padding: 8px 16px;
  border-radius: 99px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.ticket-tab-btn:hover {
  background: #F1F5F9;
  color: #334155;
}
.ticket-tab-btn.active {
  background: #111827;
  color: #FBBF24;
}

.ticket-rates-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 10px;
}

.horizontal-ticket-card {
  display: flex;
  background: transparent;
  gap: 24px;
  position: relative;
  align-items: flex-start;
}

/* Header Row */
.clean-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
}

.clean-tag-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.3px;
}

.tag-gate { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.tag-wahana { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.tag-hall { background: #F5F3FF; color: #6D28D9; border: 1px solid #DDD6FE; }
.tag-edukasi { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
.tag-rombongan { background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3; }
.tag-custom { background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; }

.clean-ticket-code {
  font-size: 12px;
  font-weight: 800;
  color: #8C6D58;
  background: #FAF7F2;
  border: 1px solid #EFE4D6;
  padding: 4px 8px;
  border-radius: 5px;
  letter-spacing: 0.4px;
}

/* Title & Description */
.clean-title-desc-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.clean-rate-name {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  line-height: 1.25;
}

.card-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-theme-gate { background: #FEF3C7; color: #F59E0B; }
.icon-theme-wahana { background: #EFF6FF; color: #3B82F6; }
.icon-theme-hall { background: #F5F3FF; color: #8B5CF6; }
.icon-theme-edukasi { background: #ECFDF5; color: #10B981; }
.icon-theme-rombongan { background: #FFF1F2; color: #F43F5E; }
.icon-theme-custom { background: #F1F5F9; color: #64748B; }

.clean-rate-desc {
  font-size: 13px;
  color: #4B5563;
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* High Contrast Price Box */
.clean-price-box {
  background: #111827;
  border: 1px solid #1F2937;
  letter-spacing: 0.5px;
}

.htc-title {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
}

.htc-desc {
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 20px 0;
  white-space: pre-line;
}

.htc-price-row {
  margin-top: auto;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.htc-price-val {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

@media (max-width: 768px) {
  .horizontal-ticket-card {
    flex-direction: column;
  }
  .htc-image-box {
    width: 100%;
    height: 200px;
  }
  .card-type-edukasi .htc-image-box {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.414;
  }
}

.btn-clean-edit-rate {
  background: #FFF;
  border: 1px solid #E2E8F0;
  color: #475569;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
}
.btn-clean-edit-rate:hover:not(:disabled) {
  background: #F8FAFC;
  border-color: #CBD5E1;
  color: #0F172A;
}
.btn-clean-edit-rate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Rules Checklist */
.clean-rules-box {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0;
}

.clean-rule-item {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
  line-height: 1.3;
}

.clean-check-icon {
  color: #059669;
  font-weight: 900;
  font-size: 14px;
  flex-shrink: 0;
}

.clean-rule-txt {
  flex: 1;
}

/* Action Button */
.btn-clean-edit-rate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: #FFFFFF;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-clean-edit-rate:hover:not(:disabled) {
  background: #F9FAFB;
  color: #111827;
  border-color: #9CA3AF;
}

.btn-edit-rate:hover:not(:disabled) {
  background: #D97706;
}

/* ========================================================================= */
/* 2. CONTROL BAR (WAHANA SECTION)                                           */
/* ========================================================================= */
.katalog-control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.total-wahana-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  color: #374151;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.control-bar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.view-mode-toggle {
  display: flex;
  background: #FAF3E8;
  border: 1px solid #EFE4D6;
  border-radius: 16px;
  padding: 3px;
  gap: 2px;
}

.btn-mode-pill {
  background: transparent;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7A5034;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-mode-pill:hover {
  color: #2C1A13;
}

.btn-mode-pill.active {
  background: #3D2214;
  color: #FAF5EE;
  box-shadow: 0 2px 8px rgba(61, 34, 20, 0.2);
}

.category-dropdown-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.category-select-pill {
  appearance: none;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  color: #374151;
  padding: 8px 32px 8px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease;
}

.category-select-pill:focus {
  border-color: #D97706;
}

.select-chevron {
  position: absolute;
  right: 12px;
  pointer-events: none;
  color: #9CA3AF;
}

.btn-add-wahana-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #111827;
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.btn-add-wahana-pill:hover {
  background: #374151;
  transform: translateY(-1px);
}

/* ========================================================================= */
/* WAHANA CARDS GRID (COMPACT & PROPORTIONAL 4-COLUMN)                       */
/* ========================================================================= */
.wahana-reference-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.wahana-card-ref {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.wahana-card-ref:hover {
  transform: translateY(-2px);
  border-color: #D1D5DB;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Top Photo Box */
.wahana-photo-box {
  width: 100%;
  height: 126px;
  border-radius: 13px;
  position: relative;
  overflow: hidden;
}

.wahana-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.wahana-card-ref:hover .wahana-img {
  transform: scale(1.05);
}

/* Top-Left Ribbon */
.wahana-top-ribbon {
    position: absolute;
    top: 8px;
    left: 8px;
    background: #F8F2EA;
    color: #C67215;
    border: none;
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 900;
    box-shadow: none;
    z-index: 2;
  }
  
  .wahana-top-ribbon.ribbon-paid {
    background: #FFF1F2;
    color: #BE123C;
  }

/* Top-Right Status Pill */
.wahana-status-pill {
    position: absolute;
    top: 8px;
    right: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 900;
    cursor: pointer;
    box-shadow: none;
    transition: transform 0.15s ease;
    z-index: 2;
  }

.wahana-status-pill:hover {
  transform: scale(1.06);
}

.status-buka {
  background: #D1FAE5;
  color: #065F46;
}

.status-maintenance {
  background: #FEF3C7;
  color: #92400E;
}

.status-tutup {
  background: #FEE2E2;
  color: #991B1B;
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

/* Floating Circular Icon Overlapping Bottom-Left */
.wahana-floating-icon-circle {
  width: 32px;
  height: 32px;
  background: #3D2214;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  bottom: -8px;
  box-shadow: 0 3px 6px rgba(61, 34, 20, 0.25);
  font-size: 14px;
  z-index: 2;
}

/* Content Body */
.wahana-content-body {
  padding: 14px 2px 0 2px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.wahana-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  line-height: 1.25;
  min-height: 34px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wahana-meta-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-top: 1px;
}

.wahana-price-val {
  font-size: 14.5px;
  font-weight: 900;
  color: #C2410C;
}

.wahana-capacity-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 700;
  color: #7A5034;
  background: #FAF3E8;
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid #EADBCC;
}

/* Compact Metrics Strip */
.wahana-metrics-strip {
  background: #FAF5EE;
  border: 1px solid #EFE4D6;
  border-radius: 8px;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  color: #6E442B;
  margin-top: 2px;
}

.metric-item {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.metric-lbl {
  font-size: 9.5px;
  color: #8C6D58;
  font-weight: 600;
}

.metric-val {
  font-size: 11px;
  font-weight: 800;
  color: #2C1A13;
}

.metric-dot-sep {
  color: #C4AA8F;
  font-size: 10px;
}

/* Sleek Action Buttons Bar */
.wahana-action-bar-compact {
    display: flex;
    gap: 8px;
    margin-top: auto;
  }
  .btn-pill-maint {
    width: 100%;
    justify-content: center;
  }

.btn-wahana-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.btn-pill-edit {
  background: #FFFFFF;
  border-color: #D1D5DB;
  color: #374151;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-pill-edit:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #9CA3AF;
  color: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.btn-pill-maint {
  background: #FFFFFF;
  border-color: #D1D5DB;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-pill-maint:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #9CA3AF;
  color: #111827;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.btn-pill-maint.is-maint-active {
  background: #ECFDF5;
  border-color: #A7F3D0;
  color: #065F46;
}

.btn-pill-maint.is-maint-active:hover:not(:disabled) {
  background: #10B981;
  color: #FFFFFF;
  border-color: #10B981;
}

/* ========================================================================= */
/* BOTTOM SAFETY BANNER (Heritage Manor Gazebo Line Art)                     */
/* ========================================================================= */
.safety-banner-reference {
  background: #FAF3E8;
  border: 1.5px solid #EADBCC;
  border-radius: 22px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(61, 34, 20, 0.03);
}

.safety-banner-left {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 680px;
  position: relative;
  z-index: 2;
}

.safety-emblem-circle {
  width: 48px;
  height: 48px;
  background: #3D2214;
  color: #FAF5EE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(61, 34, 20, 0.15);
}

.leaf-icon {
  color: #F59E0B;
}

.safety-title {
  font-size: 15.5px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0 0 2px 0;
}

.safety-desc {
  font-size: 12px;
  color: #6E442B;
  margin: 0;
  line-height: 1.45;
}

.safety-banner-right-art {
  width: 240px;
  height: 70px;
  position: relative;
  z-index: 1;
}

.plantation-gazebo-svg {
  width: 100%;
  height: 100%;
}

/* ========================================================================= */
/* MODAL STYLING                                                             */
/* ========================================================================= */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(36, 20, 13, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  padding: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.modal-title-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-mini-logo {
  max-height: 24px;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-control, .filter-select, .textarea-control {
  border: 1px solid #D1D5DB;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #111827;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.input-control:focus, .filter-select:focus, .textarea-control:focus {
  border-color: #111827;
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #374151;
  cursor: pointer;
}

.modal-footer {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-secondary {
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  color: #374151;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

.btn-primary-modal {
  background: #111827;
  color: #FFFFFF;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.btn-primary-modal:hover {
  background: #374151;
}

.ticket-rates-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
}

.horizontal-ticket-card {
  display: flex;
  background: transparent;
  gap: 20px;
  position: relative;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #E2E8F0;
}
.horizontal-ticket-card:last-child {
  border-bottom: none;
}

/* Header Row */
.clean-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
}

.clean-tag-badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.3px;
}

.tag-gate { background: #FEF3C7; color: #B45309; border: 1px solid #FDE68A; }
.tag-wahana { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.tag-hall { background: #F5F3FF; color: #6D28D9; border: 1px solid #DDD6FE; }
.tag-edukasi { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
.tag-rombongan { background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3; }
.tag-custom { background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; }

.clean-ticket-code {
  font-size: 12px;
  font-weight: 800;
  color: #8C6D58;
  background: #FAF7F2;
  border: 1px solid #EFE4D6;
  padding: 4px 8px;
  border-radius: 5px;
  letter-spacing: 0.4px;
}

/* Title & Description */
.clean-title-desc-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.clean-rate-name {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  line-height: 1.25;
}

.card-icon-box {
  width: 36px;
  height: 36px;
  background: #F8FAFC;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 1px solid #E2E8F0;
  flex-shrink: 0;
}

.clean-rate-desc {
  font-size: 13px;
  color: #64748B;
  margin: 0;
  white-space: pre-line;
  line-height: 1.4;
}

/* Price Section */
.clean-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.price-col {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 11px;
  color: #64748B;
  font-weight: 600;
  margin-bottom: 2px;
}

.price-value {
  font-size: 18px;
  font-weight: 800;
  color: #0F172A;
}

/* 1:1 REPLICATION STYLES for Horizontal Card */

@media (max-width: 1200px) {
  .ticket-rates-grid, .wahana-reference-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ticket-rates-grid, .wahana-reference-grid {
    grid-template-columns: 1fr;
  }
  .header-cocoa-decor {
    display: none;
  }
  .katalog-control-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .control-bar-right {
    flex-wrap: wrap;
  }
  .safety-banner-reference {
    flex-direction: column;
    align-items: flex-start;
  }
  .safety-banner-right-art {
    display: none;
  }
  
  .ticket-rates-list {
    grid-template-columns: 1fr;
  }
  .horizontal-ticket-card {
    flex-direction: column;
    gap: 16px;
  }
  .htc-image-box {
    width: 100% !important;
    height: 200px !important;
  }
  .card-type-edukasi .htc-image-box {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 / 1.414;
  }
}

.btn-clean-edit-rate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: #FFFFFF;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-clean-edit-rate:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #9CA3AF;
  color: #111827;
}

.htc-image-box {
  width: 180px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.card-type-edukasi .htc-image-box {
  width: 180px;
  height: auto;
  aspect-ratio: 1 / 1.414; /* A4 Poster ratio */
}

.htc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.htc-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 106px;
  padding-bottom: 0px;
}
.htc-category-label {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  text-transform: capitalize;
  display: block;
  margin-bottom: 4px;
}
.htc-title {
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #0F172A;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}
.htc-divider {
  height: 1px;
  width: 32px;
  background: #CBD5E1;
  margin-bottom: 8px;
}
.htc-desc {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: #64748B;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
}
.htc-bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 12px;
}
.htc-price-val {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.htc-curr {
  font-size: 12px;
  font-weight: 700;
  color: #94A3B8;
  margin-right: 2px;
}
.htc-amt {
  font-size: 18px;
  font-weight: 800;
  color: #0F172A;
}

.btn-tambahkan {
  background: #FFF;
  border: 1px solid #CBD5E1;
  color: #475569;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}
.btn-tambahkan:hover {
  background: #F8FAFC;
  color: #0F172A;
  border-color: #94A3B8;
}

/* ========================================================================= */
/* RESPONSIVE (< 1200px & < 768px)                                           */
/* ========================================================================= */
@media (max-width: 1200px) {
  .ticket-rates-grid, .wahana-reference-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ticket-rates-grid, .wahana-reference-grid {
    grid-template-columns: 1fr;
  }
  .header-cocoa-decor {
    display: none;
  }
  .katalog-control-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .control-bar-right {
    flex-wrap: wrap;
  }
  .safety-banner-reference {
    flex-direction: column;
    align-items: flex-start;
  }
  .safety-banner-right-art {
    display: none;
  }
  
  .horizontal-ticket-card {
    flex-direction: column;
  }
  .htc-image-box {
    width: 100%;
    height: 200px;
  }
  .card-type-edukasi .htc-image-box {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1.414;
  }
}
</style>
