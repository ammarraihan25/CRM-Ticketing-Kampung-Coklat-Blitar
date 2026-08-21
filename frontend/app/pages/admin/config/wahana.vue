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
          <span>Total {{ ridesList.length }} wahana terdaftar</span>
        </div>

        <div class="control-bar-right">
          <!-- Category Select Pill -->
          <div class="category-dropdown-wrapper">
            <select v-model="rideFilterCategory" class="category-select-pill">
              <option value="ALL">Semua Kategori Wahana</option>
              <option value="terusan">Free Tiket Terusan</option>
              <option value="paid">Tiket Satuan (Add-on)</option>
              <option value="water">Wahana Air &amp; Kolam</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="select-chevron">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          <!-- Add Wahana Button -->
          <button 
            v-if="canManageConfig"
            type="button" 
            class="btn-add-wahana-pill"
            @click="openAddRideModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Tambah Wahana Baru</span>
          </button>
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

            <!-- Top-Left Category Tag Ribbon -->
            <div class="wahana-top-ribbon" :class="ride.isFreeTerusan ? 'ribbon-terusan' : 'ribbon-paid'">
              <span>{{ ride.isFreeTerusan ? 'TIKET TERUSAN' : 'TIKET SATUAN' }}</span>
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

    <!-- ========================================================================= -->
    <!-- BOTTOM SAFETY BANNER                                                      -->
    <!-- ========================================================================= -->
    <section class="safety-banner-reference">
      <div class="safety-banner-left">
        <div class="safety-emblem-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="leaf-icon">
            <path d="M11 20A7 7 0 0 1 4 13C4 7 11 2 11 2s7 5 7 11a7 7 0 0 1-7 7Z"/>
            <path d="M11 2v18"/>
          </svg>
        </div>
        <div class="safety-banner-texts">
          <h4 class="safety-title">Safety is our Priority</h4>
          <p class="safety-desc">
            Pastikan semua wahana dalam kondisi aman dan siap digunakan untuk kenyamanan pengunjung.
          </p>
        </div>
      </div>

      <div class="safety-banner-right-art">
        <svg class="plantation-gazebo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none">
          <path d="M140 10 L80 35 L90 75 L190 75 L200 35 Z" stroke="#D6BFA8" stroke-width="1.5" />
          <path d="M140 10 L140 75" stroke="#D6BFA8" stroke-width="1.2" stroke-dasharray="2 2" />
          <path d="M100 42 L180 42" stroke="#D6BFA8" stroke-width="1.2" />
          <path d="M115 50 L115 75 M140 50 L140 75 M165 50 L165 75" stroke="#D6BFA8" stroke-width="1.2" />
          <path d="M20 75 L260 75" stroke="#D6BFA8" stroke-width="1.5" />
          <circle cx="50" cy="65" r="12" stroke="#E2D4C3" stroke-width="1.2" />
          <circle cx="65" cy="60" r="10" stroke="#E2D4C3" stroke-width="1.2" />
          <circle cx="225" cy="62" r="11" stroke="#E2D4C3" stroke-width="1.2" />
        </svg>
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
import { ref, computed, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'

// Wahana
import imgAnimalFeeding from '~/assets/assets_POS/POS/wahana/Animal-Feeding_idr.2k.jpg'
import imgAnimalToys from '~/assets/assets_POS/POS/wahana/animal_toys_idr.15k_freeterusan.png'
import imgAtv from '~/assets/assets_POS/POS/wahana/atv_idr.25k.jpg'
import imgBomBomCar from '~/assets/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png'
import imgFlyingFox from '~/assets/assets_POS/POS/wahana/flying-fox_idr.20k.jpg'
import imgGolfCar from '~/assets/assets_POS/POS/wahana/golf_car_idr.25k.jpg'
import imgIstanaBalon from '~/assets/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png'
import imgKarausel from '~/assets/assets_POS/POS/wahana/Karausel_idr.15k.png'
import imgKeretaMonorel from '~/assets/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png'
import imgKeretaLokomotif from '~/assets/assets_POS/POS/wahana/kereta_lokomotif_idr.15k_freeterusan.jpg'
import imgKolamAnak from '~/assets/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png'
import imgKolamDewasa from '~/assets/assets_POS/POS/wahana/kolam_renang_dewasa_idr.10k_freeterusan.jpg'
import imgMiniGolf from '~/assets/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg'
import imgPerahuCeria from '~/assets/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg'
import imgPlayground from '~/assets/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg'
import imgSepedaListrik from '~/assets/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png'
import imgTerapiIkan from '~/assets/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg'
import imgTrampolin from '~/assets/assets_POS/POS/wahana/Trampolin_idr.10k_freeterusan.jpg'

// Sewa Tempat
import imgBaleCoklat from '~/assets/assets_POS/POS/sewa_tempat/bale_coklat.jpg'
import imgCoklatCaffe from '~/assets/assets_POS/POS/sewa_tempat/coklat_caffe.jpg'
import imgCoklatGarden from '~/assets/assets_POS/POS/sewa_tempat/coklat_garden.jpg'
import imgJogloJatimarto from '~/assets/assets_POS/POS/sewa_tempat/joglo_jatimarto.jpg'
import imgKampungCoklatHall from '~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg'
import imgPBK from '~/assets/assets_POS/POS/sewa_tempat/private_business_keep(PBK).png'
import imgRuangPertemuan from '~/assets/assets_POS/POS/sewa_tempat/ruang_pertemuan_R1.jpeg'
import imgTamanEdel from '~/assets/assets_POS/POS/sewa_tempat/taman_edel.png'
import imgTheobromine from '~/assets/assets_POS/POS/sewa_tempat/theobromine_hall.jpg'
import imgTrinitario from '~/assets/assets_POS/POS/sewa_tempat/trinitario_hall.jpg'
import imgWismaCriollo from '~/assets/assets_POS/POS/sewa_tempat/wisma_criollo.jpg'

// Paket Edukasi
import imgEdukasiTK from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png'
import imgEdukasiSD from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'
import imgEdukasiSMP from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png'
import imgEdukasiSMA from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png'

// Generic
import imgPaketMajlis from '~/assets/tickets/paket_majlis.jpg'

definePageMeta({
  layout: 'admin'
})

const { user, canManageConfig } = useAuth()

const viewMode = ref<'grid' | 'list'>('grid')
const rideFilterCategory = ref('ALL')
const showTicketModal = ref(false)
const showRideModal = ref(false)
const isEditingRide = ref(false)

const activeTicketCategory = ref('gate')

// 1. Ticket Rates Data (Per Jenis Tiket)
interface TicketRate {
  id: string
  category: 'gate' | 'wahana' | 'venue' | 'edukasi' | 'rombongan'
  name: string
  imageUrl: string
  price: number
  description: string
  isActive: boolean
}

const ticketRates = ref<TicketRate[]>([
  // Gate
  {
    id: 'gate-1', category: 'gate', name: 'Tiket Reguler', imageUrl: imgKolamAnak,
    price: 20000, description: '[PROMO] WEEKDAY\nAkses masuk area wisata Kampung Coklat. Menikmati indahnya kebun kakao dan edukasi dasar.', isActive: true
  },
  {
    id: 'gate-2', category: 'gate', name: 'Tiket Terusan', imageUrl: imgKeretaLokomotif,
    price: 75000, description: 'ALL ACCESS\nAkses masuk bebas + 5 Wahana Pilihan sepuasnya untuk pengalaman liburan tanpa batas.', isActive: true
  },

  // Wahana
  {
    id: 'wh-1', category: 'wahana', name: 'Animal Feeding', imageUrl: imgAnimalFeeding,
    price: 2000, description: 'Bermain sambil belajar dan berinteraksi langsung dengan hewan-hewan lucu.', isActive: true
  },
  {
    id: 'wh-2', category: 'wahana', name: 'Animal Toys', imageUrl: imgAnimalToys,
    price: 15000, description: 'Mainan hewan tunggang yang seru untuk anak-anak mengelilingi area.', isActive: true
  },
  {
    id: 'wh-3', category: 'wahana', name: 'ATV Ride', imageUrl: imgAtv,
    price: 25000, description: 'Pacu adrenalin Anda di lintasan ATV Kampung Coklat yang menantang.', isActive: true
  },
  {
    id: 'wh-4', category: 'wahana', name: 'Bom-Bom Car', imageUrl: imgBomBomCar,
    price: 15000, description: 'Mobil listrik tabrakan di arena dengan helm anak & dewasa.', isActive: true
  },
  {
    id: 'wh-5', category: 'wahana', name: 'Flying Fox', imageUrl: imgFlyingFox,
    price: 20000, description: 'Wahana seluncur tali melintasi kebun kakao.', isActive: true
  },
  {
    id: 'wh-6', category: 'wahana', name: 'Golf Car', imageUrl: imgGolfCar,
    price: 25000, description: 'Sewa mobil golf keliling area wisata dengan supir.', isActive: true
  },
  {
    id: 'wh-7', category: 'wahana', name: 'Istana Balon', imageUrl: imgIstanaBalon,
    price: 10000, description: 'Wahana balon raksasa untuk anak-anak melompat & bermain.', isActive: true
  },
  {
    id: 'wh-8', category: 'wahana', name: 'Karausel', imageUrl: imgKarausel,
    price: 15000, description: 'Wahana kuda putar klasik yang disukai anak-anak.', isActive: true
  },
  {
    id: 'wh-9', category: 'wahana', name: 'Kereta Monorel', imageUrl: imgKeretaMonorel,
    price: 15000, description: 'Menikmati pemandangan kebun dari atas monorel.', isActive: true
  },
  {
    id: 'wh-10', category: 'wahana', name: 'Kereta Thomas', imageUrl: imgKeretaLokomotif,
    price: 10000, description: 'Wahana kereta rel mini untuk anak-anak.', isActive: true
  },
  {
    id: 'wh-11', category: 'wahana', name: 'Kolam Renang Anak', imageUrl: imgKolamAnak,
    price: 10000, description: 'Kolam renang dangkal untuk anak-anak bermain air.', isActive: true
  },
  {
    id: 'wh-12', category: 'wahana', name: 'Kolam Renang Dewasa', imageUrl: imgKolamDewasa,
    price: 15000, description: 'Kolam renang dewasa dengan fasilitas lengkap.', isActive: true
  },
  {
    id: 'wh-13', category: 'wahana', name: 'Mini Golf', imageUrl: imgMiniGolf,
    price: 15000, description: 'Bermain golf mini di lapangan hijau buatan.', isActive: true
  },
  {
    id: 'wh-14', category: 'wahana', name: 'Perahu Ceria', imageUrl: imgPerahuCeria,
    price: 10000, description: 'Wahana perahu kayu melintasi kolam buatan.', isActive: true
  },
  {
    id: 'wh-15', category: 'wahana', name: 'Playground', imageUrl: imgPlayground,
    price: 15000, description: 'Area bermain anak dengan berbagai macam permainan.', isActive: true
  },
  {
    id: 'wh-16', category: 'wahana', name: 'Sepeda Listrik', imageUrl: imgSepedaListrik,
    price: 35000, description: 'Sewa sepeda listrik berkeliling area wisata.', isActive: true
  },
  {
    id: 'wh-17', category: 'wahana', name: 'Terapi Ikan', imageUrl: imgTerapiIkan,
    price: 5000, description: 'Terapi ikan garra rufa untuk kesehatan kulit kaki.', isActive: true
  },
  {
    id: 'wh-18', category: 'wahana', name: 'Trampolin', imageUrl: imgTrampolin,
    price: 10000, description: 'Wahana trampolin untuk melompat bebas.', isActive: true
  },

  // Venue
  {
    id: 'vn-1', category: 'venue', name: 'Bale Coklat', imageUrl: imgBaleCoklat,
    price: 500000, description: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas atau acara santai keluarga besar.', isActive: true
  },
  {
    id: 'vn-2', category: 'venue', name: 'Coklat Caffe', imageUrl: imgCoklatCaffe,
    price: 300000, description: 'Kafe bernuansa alam untuk acara bersantai atau kumpul komunitas.', isActive: true
  },
  {
    id: 'vn-3', category: 'venue', name: 'Coklat Garden', imageUrl: imgCoklatGarden,
    price: 400000, description: 'Area taman terbuka yang hijau, ideal untuk pesta kebun atau acara outdoor.', isActive: true
  },
  {
    id: 'vn-4', category: 'venue', name: 'Joglo Jatimarto', imageUrl: imgJogloJatimarto,
    price: 750000, description: 'Pendopo tradisional bernuansa klasik Jawa untuk acara keluarga atau pertemuan.', isActive: true
  },
  {
    id: 'vn-5', category: 'venue', name: 'Kampung Coklat Hall', imageUrl: imgKampungCoklatHall,
    price: 1500000, description: 'Ruangan indoor eksklusif untuk acara besar pernikahan atau seminar perusahaan.', isActive: true
  },
  {
    id: 'vn-6', category: 'venue', name: 'Private Business Room (PBR)', imageUrl: imgPBK,
    price: 1000000, description: 'Ruang pertemuan VIP eksklusif untuk rapat bisnis dan negosiasi.', isActive: true
  },
  {
    id: 'vn-7', category: 'venue', name: 'Ruang Pertemuan R1', imageUrl: imgRuangPertemuan,
    price: 500000, description: 'Ruang rapat skala menengah dengan fasilitas meeting lengkap.', isActive: true
  },
  {
    id: 'vn-8', category: 'venue', name: 'Taman Edel', imageUrl: imgTamanEdel,
    price: 350000, description: 'Taman eksotis dengan pepohonan rindang untuk acara santai bersama keluarga.', isActive: true
  },
  {
    id: 'vn-9', category: 'venue', name: 'Theobromine Hall', imageUrl: imgTheobromine,
    price: 1200000, description: 'Hall megah dengan arsitektur menawan untuk perayaan atau konferensi.', isActive: true
  },
  {
    id: 'vn-10', category: 'venue', name: 'Trinitario Hall', imageUrl: imgTrinitario,
    price: 2000000, description: 'Hall paling luas dan premium dengan dekorasi mewah untuk resepsi.', isActive: true
  },
  {
    id: 'vn-11', category: 'venue', name: 'Wisma Criollo', imageUrl: imgWismaCriollo,
    price: 850000, description: 'Gedung pertemuan eksklusif bernuansa elegan untuk acara VIP atau korporat.', isActive: true
  },

  // Edukasi
  {
    id: 'ed-1', category: 'edukasi', name: 'Paket Edukasi TK / PAUD', imageUrl: imgEdukasiTK,
    price: 35000, description: 'Paket Reguler:\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Kokurikuler (Binatang/Tumbuhan): Rp 39.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Kemah Ceria Prasiaga:\n• Kemah Ceria 1: Rp 50.000 | 2: Rp 37.000 | 3: Rp 32.000\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
  },
  {
    id: 'ed-2', category: 'edukasi', name: 'Paket Edukasi SD', imageUrl: imgEdukasiSD,
    price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax\n• Industri Coklat: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
  },
  {
    id: 'ed-3', category: 'edukasi', name: 'Paket Edukasi SMP', imageUrl: imgEdukasiSMP,
    price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
  },
  {
    id: 'ed-4', category: 'edukasi', name: 'Paket Edukasi SMA / Mahasiswa', imageUrl: imgEdukasiSMA,
    price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
  },

  // Rombongan
  {
    id: 'rom-1', category: 'rombongan', name: 'Booking Rombongan Agen', imageUrl: imgPaketMajlis,
    price: 0, description: 'Pilih tiket khusus rombongan dengan harga berjenjang (tier) berdasarkan jumlah Pax.\n\nFormulir Input Pax dan perhitungan tier harga otomatis akan ditampilkan di sini.', isActive: true
  }
])

const getCategoryName = (cat: string) => {
  switch (cat) {
    case 'gate': return 'Tiket Masuk (Gate)'
    case 'wahana': return 'Fasilitas Wahana'
    case 'venue': return 'Sewa Tempat'
    case 'edukasi': return 'Wisata Edukasi'
    case 'rombongan': return 'Booking Rombongan'
    default: return 'Lainnya'
  }
}

const filteredTicketRates = computed(() => {
  return ticketRates.value.filter(t => t.category === activeTicketCategory.value)
})

const selectedTicket = ref<TicketRate | null>(null)
const ticketForm = reactive({
  name: '',
  category: 'gate' as 'gate' | 'wahana' | 'venue' | 'edukasi' | 'rombongan',
  price: 20000,
  description: '',
  isActive: true
})

const openAddTicketModal = () => {
  selectedTicket.value = null
  ticketForm.name = ''
  ticketForm.category = activeTicketCategory.value as 'gate' | 'wahana' | 'venue' | 'edukasi' | 'rombongan'
  ticketForm.price = 0
  ticketForm.description = ''
  ticketForm.isActive = true
  showTicketModal.value = true
}

const editTicketPrice = (ticket: TicketRate) => {
  selectedTicket.value = ticket
  ticketForm.name = ticket.name
  ticketForm.category = ticket.category
  ticketForm.price = ticket.price
  ticketForm.description = ticket.description
  ticketForm.isActive = ticket.isActive
  showTicketModal.value = true
}

const saveTicketPrice = () => {
  if (selectedTicket.value) {
    selectedTicket.value.name = ticketForm.name
    selectedTicket.value.category = ticketForm.category
    selectedTicket.value.price = ticketForm.price
    selectedTicket.value.description = ticketForm.description
    selectedTicket.value.isActive = ticketForm.isActive
  } else {
    ticketRates.value.push({
      id: `custom-${Date.now()}`,
      category: ticketForm.category,
      name: ticketForm.name,
      imageUrl: imgTicketReguler,
      price: ticketForm.price,
      description: ticketForm.description,
      isActive: ticketForm.isActive
    })
  }
  showTicketModal.value = false
}

// 2. Rides Catalog Data
interface RideItem {
  id: string
  name: string
  imageUrl: string
  price: number
  isFreeTerusan: boolean
  status: 'BUKA' | 'MAINTENANCE' | 'TUTUP'
  capacity: number
  duration: string
  description: string
  playedToday: number
  category: 'terusan' | 'paid' | 'water'
}

const ridesList = ref<RideItem[]>([
  {
    id: 'ride-1',
    name: 'Bom-Bom Car Seru',
    imageUrl: imgBomBomCar,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 16,
    duration: '10 Menit',
    description: 'Mobil listrik tabrakan arena dengan pengaman helm anak & dewasa.',
    playedToday: 420,
    category: 'terusan'
  },
  {
    id: 'ride-2',
    name: 'Kereta Monorel Gantung',
    imageUrl: imgKeretaMonorel,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 24,
    duration: '1 Putaran (15 Mnt)',
    description: 'Menikmati pemandangan kebun kakao dari atas jalur monorel.',
    playedToday: 680,
    category: 'terusan'
  },
  {
    id: 'ride-3',
    name: 'Istana Balon Ceria',
    imageUrl: imgIstanaBalon,
    price: 10000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 30,
    duration: '30 Menit',
    description: 'Wahana playground balon elastis warna-warni untuk balita dan anak-anak.',
    playedToday: 350,
    category: 'terusan'
  },
  {
    id: 'ride-4',
    name: 'Kolam Renang Anak & Waterboom',
    imageUrl: imgKolamAnak,
    price: 10000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 50,
    duration: 'Sepuasnya',
    description: 'Wahana air seru dengan seluncuran, ember tumpah, dan air mancur sejuk.',
    playedToday: 510,
    category: 'water'
  },
  {
    id: 'ride-5',
    name: 'ATV Safari Adventure',
    imageUrl: imgAtv,
    price: 25000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 8,
    duration: '15 Menit (4 Lap)',
    description: 'Trek tanah menantang mengitari perkebunan kakao alam terbuka.',
    playedToday: 195,
    category: 'paid'
  },
  {
    id: 'ride-6',
    name: 'Flying Fox Ekstrem 120M',
    imageUrl: imgFlyingFox,
    price: 20000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 4,
    duration: '1 Kali Luncur',
    description: 'Meluncur di atas kanopi kebun coklat dengan standar keamanan safety harness ganda.',
    playedToday: 140,
    category: 'paid'
  },
  {
    id: 'ride-7',
    name: 'Mini Golf 9 Holes',
    imageUrl: imgMiniGolf,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 20,
    duration: '45 Menit',
    description: 'Padang golf mini dengan berbagai rintangan bukit dan terowongan coklat.',
    playedToday: 110,
    category: 'terusan'
  },
  {
    id: 'ride-8',
    name: 'Perahu Ceria Dayung',
    imageUrl: imgPerahuCeria,
    price: 10000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 12,
    duration: '20 Menit',
    description: 'Menyusuri danau buatan dengan perahu kayuh angsa bersama keluarga.',
    playedToday: 260,
    category: 'water'
  },
  {
    id: 'ride-9',
    name: 'Playground Taman Kakao',
    imageUrl: imgPlayground,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 40,
    duration: 'Sepuasnya',
    description: 'Ayunan, perosotan, dan panjatan seru di bawah rindangnya pohon coklat.',
    playedToday: 480,
    category: 'terusan'
  },
  {
    id: 'ride-10',
    name: 'Terapi Ikan Garra Rufa',
    imageUrl: imgTerapiIkan,
    price: 5000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 35,
    duration: '20 Menit',
    description: 'Relaksasi alami dengan gigitan lembut ikan terapi pembersih kulit.',
    playedToday: 620,
    category: 'water'
  },
  {
    id: 'ride-11',
    name: 'Golf Car Keliling Kebun',
    imageUrl: imgGolfCar,
    price: 25000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 6,
    duration: '20 Menit',
    description: 'Tur keliling area 5 hektar Kampung Coklat didampingi pengemudi ramah.',
    playedToday: 85,
    category: 'paid'
  },
  {
    id: 'ride-12',
    name: 'Sepeda Listrik Wisata',
    imageUrl: imgSepedaListrik,
    price: 35000,
    isFreeTerusan: false,
    status: 'MAINTENANCE',
    capacity: 10,
    duration: '30 Menit',
    description: 'E-bike ramah lingkungan untuk eksplorasi mandiri jalur pedestrian kebun.',
    playedToday: 45,
    category: 'paid'
  }
])

const filteredRides = computed(() => {
  if (rideFilterCategory.value === 'ALL') return ridesList.value
  return ridesList.value.filter(r => r.category === rideFilterCategory.value)
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

const rideForm = reactive({
  id: '',
  name: '',
  price: 15000,
  capacity: 16,
  duration: '15 Menit',
  isFreeTerusan: true,
  status: 'BUKA' as 'BUKA' | 'MAINTENANCE' | 'TUTUP'
})

const toggleRideStatus = (ride: RideItem) => {
  if (ride.status === 'MAINTENANCE') {
    ride.status = 'BUKA'
  } else {
    ride.status = 'MAINTENANCE'
  }
}

const openAddRideModal = () => {
  isEditingRide.value = false
  rideForm.id = `ride-${Date.now()}`
  rideForm.name = ''
  rideForm.price = 15000
  rideForm.capacity = 20
  rideForm.duration = '15 Menit'
  rideForm.isFreeTerusan = true
  rideForm.status = 'BUKA'
  showRideModal.value = true
}

const editRide = (ride: RideItem) => {
  isEditingRide.value = true
  rideForm.id = ride.id
  rideForm.name = ride.name
  rideForm.price = ride.price
  rideForm.capacity = ride.capacity
  rideForm.duration = ride.duration
  rideForm.isFreeTerusan = ride.isFreeTerusan
  rideForm.status = ride.status
  showRideModal.value = true
}

const saveRide = () => {
  const idx = ridesList.value.findIndex(r => r.id === rideForm.id)
  if (idx !== -1) {
    ridesList.value[idx] = {
      ...ridesList.value[idx],
      name: rideForm.name,
      price: rideForm.price,
      capacity: rideForm.capacity,
      duration: rideForm.duration,
      isFreeTerusan: rideForm.isFreeTerusan,
      status: rideForm.status
    }
  } else {
    ridesList.value.unshift({
      id: rideForm.id,
      name: rideForm.name,
      imageUrl: imgKarausel,
      price: rideForm.price,
      capacity: rideForm.capacity,
      duration: rideForm.duration,
      isFreeTerusan: rideForm.isFreeTerusan,
      status: rideForm.status,
      description: 'Wahana rekreasi baru di kawasan Kampung Coklat.',
      playedToday: 0,
      category: rideForm.isFreeTerusan ? 'terusan' : 'paid'
    })
  }
  showRideModal.value = false
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
