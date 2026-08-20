<template>
  <div class="config-page">
    <!-- Header -->
    <header class="config-header">
      <div class="header-left">
        <div class="header-badge-row">
          <div class="brand-mini-chip">
            <img :src="logoImg" alt="Kampung Coklat" class="mini-chip-img" />
            <span>Kampung Coklat Blitar</span>
          </div>
          <div class="badge-tag">
            <span class="live-dot"></span>
            <span>Konfigurasi Sistem Operasional</span>
          </div>
        </div>
        <h1 class="page-title">Pengaturan Tarif Tiket &amp; Wahana</h1>
        <p class="page-subtitle">
          Kelola harga tiket masuk, paket edukasi, dan status operasional wahana rekreasi Kampung Coklat.
        </p>
      </div>

      <div class="header-actions">
        <!-- Read-only protection for Manager / Owner -->
        <button 
          v-if="canManageConfig"
          type="button" 
          class="btn-primary"
          @click="openAddRideModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Tambah Wahana Baru</span>
        </button>

        <div v-else class="read-only-pill">
          🔒 Mode Read-Only (Role: {{ user.roleTitle }})
        </div>
      </div>
    </header>

    <!-- Role Warning Banner if not Admin -->
    <div v-if="!canManageConfig" class="role-warning-banner">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <div>
        <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Anda dapat memantau katalog dan tarif wahana, namun perubahan harga dan status operasional hanya dapat dikelola oleh Super Admin.
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- WIDGET 1: TARIF TIKET MASUK & PAKET KUNJUNGAN (Dedicated Frame)           -->
    <!-- ========================================================================= -->
    <section class="section-widget-card">
      <div class="widget-header-row">
        <div class="widget-header-left">
          <div class="widget-chip-title">
            <span class="widget-icon">🎟️</span>
            <h2 class="widget-title">Tarif Tiket Masuk &amp; Paket Kunjungan</h2>
          </div>
          <p class="widget-subtitle">Struktur harga tiket pada POS Kasir dan Digital Guestbook</p>
        </div>
      </div>

      <div class="ticket-cards-grid">
        <div v-for="ticket in ticketRates" :key="ticket.id" class="ticket-card-v2">
          <!-- Top Photo Banner with status chip -->
          <div class="ticket-banner-box">
            <img :src="ticket.imageUrl" :alt="ticket.name" class="ticket-banner-img" />
            <div class="ticket-category-tag">{{ ticket.tag }}</div>
            <span class="ticket-status-pill" :class="ticket.isActive ? 'pill-active' : 'pill-inactive'">
              ● {{ ticket.isActive ? 'Aktif' : 'Non-Aktif' }}
            </span>
          </div>

          <!-- Body Content -->
          <div class="ticket-card-body">
            <h3 class="ticket-title">{{ ticket.name }}</h3>
            <p class="ticket-desc">{{ ticket.description }}</p>

            <!-- Center Price Box -->
            <div class="ticket-price-box">
              <span class="price-box-label">TARIF SAAT INI</span>
              <div class="price-box-val">{{ formatRupiah(ticket.price) }}</div>
              <span class="price-box-unit">per pax / pengunjung</span>
            </div>

            <!-- Rules Checklist -->
            <div class="ticket-rules-box">
              <div class="ticket-rule-row">
                <span class="check-icon">✓</span>
                <span class="rule-text">{{ ticket.quotaRule }}</span>
              </div>
              <div class="ticket-rule-row">
                <span class="check-icon">✓</span>
                <span class="rule-text">{{ ticket.accessRule }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <button 
              type="button" 
              class="btn-ticket-action"
              :disabled="!canManageConfig"
              @click="editTicketPrice(ticket)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>{{ canManageConfig ? 'Ubah Tarif Tiket' : 'Lihat Ketentuan' }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================================================= -->
    <!-- WIDGET 2: KATALOG WAHANA & STATUS OPERASIONAL (Dedicated Frame)           -->
    <!-- ========================================================================= -->
    <section class="section-widget-card">
      <div class="widget-header-row">
        <div class="widget-header-left">
          <div class="widget-chip-title">
            <span class="widget-icon">🎡</span>
            <h2 class="widget-title">Katalog Wahana &amp; Status Operasional</h2>
          </div>
          <p class="widget-subtitle">Total {{ ridesList.length }} wahana rekreasi terdaftar di kawasan Kampung Coklat</p>
        </div>

        <!-- Filter Dropdown -->
        <div class="widget-header-right">
          <select v-model="rideFilterCategory" class="filter-select-cute">
            <option value="ALL">Semua Kategori Wahana</option>
            <option value="terusan">Free Tiket Terusan</option>
            <option value="paid">Tiket Satuan (Add-on)</option>
            <option value="water">Wahana Air &amp; Kolam</option>
          </select>
        </div>
      </div>

      <div class="rides-grid">
        <div v-for="ride in filteredRides" :key="ride.id" class="ride-card-v2">
          <!-- Ride Photo Banner -->
          <div class="ride-photo-box">
            <img 
              :src="ride.imageUrl" 
              :alt="ride.name"
              class="ride-photo-img"
              loading="lazy"
            />
            <!-- Top-Left Ribbon -->
            <div class="ride-ribbon-tag" :class="ride.isFreeTerusan ? 'ribbon-terusan' : 'ribbon-paid'">
              {{ ride.isFreeTerusan ? '★ FREE TIKET TERUSAN' : 'TIKET TAMBAHAN' }}
            </div>
            <!-- Bottom-Right Status Tag -->
            <span class="ride-status-badge" :class="`badge-${ride.status.toLowerCase()}`">
              ● {{ ride.status }}
            </span>
          </div>

          <!-- Ride Card Body -->
          <div class="ride-card-body">
            <h3 class="ride-title">{{ ride.name }}</h3>

            <!-- Price and Capacity Row -->
            <div class="ride-price-cap-row">
              <span class="ride-price-text">{{ ride.price === 0 ? 'Gratis' : formatRupiah(ride.price) }}</span>
              <span class="ride-capacity-text">Kapasitas: {{ ride.capacity }} Org</span>
            </div>

            <p class="ride-desc-text">{{ ride.description }}</p>

            <!-- 2-Column Info Strip Box -->
            <div class="ride-info-strip">
              <div class="info-strip-col">
                <span class="strip-lbl">Total Dimainkan Hari Ini</span>
                <span class="strip-val">{{ ride.playedToday.toLocaleString('id-ID') }} Kali</span>
              </div>
              <div class="info-strip-col">
                <span class="strip-lbl">Durasi Sesi</span>
                <span class="strip-val">{{ ride.duration }}</span>
              </div>
            </div>

            <!-- 2 Action Buttons Row -->
            <div class="ride-actions-row">
              <button 
                type="button" 
                class="btn-ride-status"
                :class="{ 'btn-status-maintenance': ride.status === 'MAINTENANCE' }"
                :disabled="!canManageConfig"
                @click="toggleRideStatus(ride)"
              >
                <span>{{ ride.status === 'BUKA' ? 'Set Maintenance' : 'Set BUKA' }}</span>
              </button>

              <button 
                type="button" 
                class="btn-ride-edit"
                :disabled="!canManageConfig"
                @click="editRide(ride)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Edit</span>
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
          <h3>Ubah Tarif: {{ selectedTicket?.name }}</h3>
          <button class="btn-close" @click="showTicketModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveTicketPrice">
          <div class="modal-body">
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
            <button type="submit" class="btn-primary">Simpan Perubahan Tarif</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Edit / Tambah Wahana -->
    <div v-if="showRideModal" class="modal-backdrop" @click.self="showRideModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ isEditingRide ? `Edit Wahana: ${rideForm.name}` : 'Tambah Wahana Rekreasi Baru' }}</h3>
          <button class="btn-close" @click="showRideModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveRide">
          <div class="modal-body">
            <div class="form-group">
              <label>Nama Wahana</label>
              <input v-model="rideForm.name" type="text" class="input-control" required />
            </div>

            <div class="form-group">
              <label>Harga Satuan (Rp) (0 = Gratis / Termasuk Terusan)</label>
              <input v-model.number="rideForm.price" type="number" step="1000" class="input-control" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Kapasitas (Pax)</label>
                <input v-model.number="rideForm.capacity" type="number" class="input-control" required />
              </div>
              <div class="form-group">
                <label>Durasi Sesi</label>
                <input v-model="rideForm.duration" type="text" class="input-control" placeholder="15 Menit" required />
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-row">
                <input v-model="rideForm.isFreeTerusan" type="checkbox" />
                <span>Termasuk dalam Paket Tiket Terusan (Free Wahana)</span>
              </label>
            </div>

            <div class="form-group">
              <label>Status Operasional</label>
              <select v-model="rideForm.status" class="filter-select full-width">
                <option value="BUKA">BUKA (Operasional Normal)</option>
                <option value="MAINTENANCE">MAINTENANCE (Sedang Servis)</option>
                <option value="TUTUP">TUTUP (Off-season)</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showRideModal = false">Batal</button>
            <button type="submit" class="btn-primary">Simpan Wahana</button>
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

// Import photos for rides
import imgBomBomCar from '~/assets/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png'
import imgMonorel from '~/assets/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png'
import imgIstanaBalon from '~/assets/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png'
import imgKolamAnak from '~/assets/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png'
import imgAtv from '~/assets/assets_POS/POS/wahana/atv_idr.25k.jpg'
import imgFlyingFox from '~/assets/assets_POS/POS/wahana/flying-fox_idr.20k.jpg'
import imgMiniGolf from '~/assets/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg'
import imgPerahuCeria from '~/assets/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg'
import imgPlayground from '~/assets/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg'
import imgTerapiIkan from '~/assets/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg'
import imgGolfCar from '~/assets/assets_POS/POS/wahana/golf_car_idr.25k.jpg'
import imgSepedaListrik from '~/assets/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png'
import imgKarausel from '~/assets/assets_POS/POS/wahana/Karausel_idr.15k.png'

// Import ticket banner photos
import imgTamanEdel from '~/assets/assets_POS/POS/sewa_tempat/taman_edel.png'
import imgHallBale from '~/assets/assets_POS/POS/sewa_tempat/bale_coklat.jpg'
import imgKampungHall from '~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg'
import imgFlyerSD from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'

definePageMeta({
  layout: 'admin'
})

const { user, canManageConfig } = useAuth()

const rideFilterCategory = ref('ALL')
const showTicketModal = ref(false)
const showRideModal = ref(false)
const isEditingRide = ref(false)

// 1. Ticket Rates Data with Banner Photos
interface TicketRate {
  id: string
  name: string
  imageUrl: string
  tag: string
  price: number
  description: string
  quotaRule: string
  accessRule: string
  isActive: boolean
}

const ticketRates = ref<TicketRate[]>([
  {
    id: 'reguler',
    name: 'Tiket Masuk Reguler',
    imageUrl: imgTamanEdel,
    tag: 'REGULER',
    price: 20000,
    description: 'Akses masuk kawasan wisata edukasi coklat, spot foto & galeri',
    quotaRule: 'Berlaku 1 orang dewasa/anak',
    accessRule: 'Single Scan Turnstile Utama',
    isActive: true
  },
  {
    id: 'terusan',
    name: 'Tiket Terusan Wahana',
    imageUrl: imgKarausel,
    tag: 'ALL-ACCESS',
    price: 35000,
    description: 'Tiket masuk + akses gratis 10+ wahana terusan terdaftar',
    quotaRule: 'Termasuk voucher cooking class',
    accessRule: 'All-Access Scan Turnstile & Wahana',
    isActive: true
  },
  {
    id: 'rombongan',
    name: 'Tiket Rombongan B2B',
    imageUrl: imgKampungHall,
    tag: 'GROUP B2B',
    price: 18000,
    description: 'Khusus instansi, bus pariwisata, dan travel agent (min. 30 pax)',
    quotaRule: 'Minimal pembelian 30 tiket',
    accessRule: 'Group Barcode + Free Driver Ticket',
    isActive: true
  },
  {
    id: 'edukasi',
    name: 'Paket Edukasi Sekolah',
    imageUrl: imgFlyerSD,
    tag: 'EDUKASI',
    price: 50000,
    description: 'Panduan tutor kakao, praktek mencetak coklat, dan sertifikat',
    quotaRule: 'TK/PAUD, SD, SMP, SMA & Universitas',
    accessRule: 'Hall Edukasi & Free Cooking Set',
    isActive: true
  }
])

// 2. Rides Catalog Data with Real Photos
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
    imageUrl: imgMonorel,
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
    description: 'Arena trampolin udara tematik kastil untuk anak balita & TK.',
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
    description: 'Kolam air jernih dengan perosotan ramah anak dan ember tumpah.',
    playedToday: 510,
    category: 'water'
  },
  {
    id: 'ride-5',
    name: 'ATV Adventure Track',
    imageUrl: imgAtv,
    price: 25000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 8,
    duration: '15 Menit',
    description: 'Petualangan motor roda 4 melintasi rute tanah perkebunan kakao.',
    playedToday: 180,
    category: 'paid'
  },
  {
    id: 'ride-6',
    name: 'Flying Fox Outbound',
    imageUrl: imgFlyingFox,
    price: 20000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 10,
    duration: '1 Luncuran',
    description: 'Sensasi meluncur di udara melintasi kanopi pohon coklat.',
    playedToday: 240,
    category: 'paid'
  },
  {
    id: 'ride-7',
    name: 'Mini Golf 9 Hole',
    imageUrl: imgMiniGolf,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 18,
    duration: '20 Menit',
    description: 'Area ketangkasan stick golf keluarga dengan rintangan tematik.',
    playedToday: 160,
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
    duration: '15 Menit',
    description: 'Mendayung santai di danau buatan dengan bebek kayuh keluarga.',
    playedToday: 290,
    category: 'water'
  },
  {
    id: 'ride-9',
    name: 'Playground Ceria Anak',
    imageUrl: imgPlayground,
    price: 15000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 40,
    duration: 'Sepuasnya',
    description: 'Kompleks ayunan, perosotan, dan rumah pohon aman berkarpet.',
    playedToday: 450,
    category: 'terusan'
  },
  {
    id: 'ride-10',
    name: 'Terapi Ikan Garra Rufa',
    imageUrl: imgTerapiIkan,
    price: 5000,
    isFreeTerusan: true,
    status: 'BUKA',
    capacity: 25,
    duration: '15 Menit',
    description: 'Relaksasi pijat alami kaki oleh ratusan ikan Garra Rufa.',
    playedToday: 380,
    category: 'terusan'
  },
  {
    id: 'ride-11',
    name: 'Golf Car Rental',
    imageUrl: imgGolfCar,
    price: 25000,
    isFreeTerusan: false,
    status: 'MAINTENANCE',
    capacity: 6,
    duration: '30 Menit',
    description: 'Mobil golf ramah lingkungan untuk rombongan keluarga lansia.',
    playedToday: 0,
    category: 'paid'
  },
  {
    id: 'ride-12',
    name: 'Sepeda Listrik Matic',
    imageUrl: imgSepedaListrik,
    price: 35000,
    isFreeTerusan: false,
    status: 'BUKA',
    capacity: 10,
    duration: '30 Menit',
    description: 'E-bike modern untuk berkeliling area kampung dengan santai.',
    playedToday: 95,
    category: 'paid'
  }
])

const filteredRides = computed(() => {
  if (rideFilterCategory.value === 'ALL') return ridesList.value
  if (rideFilterCategory.value === 'terusan') return ridesList.value.filter(r => r.isFreeTerusan)
  if (rideFilterCategory.value === 'paid') return ridesList.value.filter(r => !r.isFreeTerusan)
  if (rideFilterCategory.value === 'water') return ridesList.value.filter(r => r.category === 'water')
  return ridesList.value
})

// Modal Ticket Price State
const selectedTicket = ref<TicketRate | null>(null)
const ticketForm = reactive({
  price: 20000,
  description: '',
  isActive: true
})

const editTicketPrice = (ticket: TicketRate) => {
  selectedTicket.value = ticket
  ticketForm.price = ticket.price
  ticketForm.description = ticket.description
  ticketForm.isActive = ticket.isActive
  showTicketModal.value = true
}

const saveTicketPrice = () => {
  if (selectedTicket.value) {
    selectedTicket.value.price = ticketForm.price
    selectedTicket.value.description = ticketForm.description
    selectedTicket.value.isActive = ticketForm.isActive
    showTicketModal.value = false
    alert(`[BERHASIL] Tarif ${selectedTicket.value.name} telah diperbarui ke ${formatRupiah(ticketForm.price)}!`)
  }
}

// Modal Ride State
const rideForm = reactive({
  id: '',
  name: '',
  price: 15000,
  isFreeTerusan: true,
  status: 'BUKA' as 'BUKA' | 'MAINTENANCE' | 'TUTUP',
  capacity: 20,
  duration: '15 Menit',
  description: '',
  imageUrl: imgKarausel
})

const openAddRideModal = () => {
  isEditingRide.value = false
  rideForm.id = `ride-${Date.now()}`
  rideForm.name = ''
  rideForm.price = 15000
  rideForm.isFreeTerusan = true
  rideForm.status = 'BUKA'
  rideForm.capacity = 20
  rideForm.duration = '15 Menit'
  rideForm.description = ''
  rideForm.imageUrl = imgKarausel
  showRideModal.value = true
}

const editRide = (ride: RideItem) => {
  isEditingRide.value = true
  rideForm.id = ride.id
  rideForm.name = ride.name
  rideForm.price = ride.price
  rideForm.isFreeTerusan = ride.isFreeTerusan
  rideForm.status = ride.status
  rideForm.capacity = ride.capacity
  rideForm.duration = ride.duration
  rideForm.description = ride.description
  rideForm.imageUrl = ride.imageUrl
  showRideModal.value = true
}

const saveRide = () => {
  if (isEditingRide.value) {
    const existing = ridesList.value.find(r => r.id === rideForm.id)
    if (existing) {
      existing.name = rideForm.name
      existing.price = rideForm.price
      existing.isFreeTerusan = rideForm.isFreeTerusan
      existing.status = rideForm.status
      existing.capacity = rideForm.capacity
      existing.duration = rideForm.duration
    }
  } else {
    ridesList.value.unshift({
      id: rideForm.id,
      name: rideForm.name,
      imageUrl: rideForm.imageUrl,
      price: rideForm.price,
      isFreeTerusan: rideForm.isFreeTerusan,
      status: rideForm.status,
      capacity: rideForm.capacity,
      duration: rideForm.duration,
      description: rideForm.description || 'Wahana rekreasi Kampung Coklat',
      playedToday: 0,
      category: rideForm.isFreeTerusan ? 'terusan' : 'paid'
    })
  }
  showRideModal.value = false
  alert('[SUKSES] Konfigurasi data wahana berhasil disimpan!')
}

const toggleRideStatus = (ride: RideItem) => {
  ride.status = ride.status === 'BUKA' ? 'MAINTENANCE' : 'BUKA'
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
.config-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
}

/* Header */
.config-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.header-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
  flex-wrap: wrap;
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  border: 1px solid rgba(242, 151, 39, 0.3);
  border-radius: 20px;
  padding: 2px 10px 2px 4px;
  font-size: 11.5px;
  font-weight: 700;
  color: #2C1A13;
  box-shadow: 0 1px 4px rgba(44, 26, 19, 0.04);
}

.mini-chip-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 50%;
  background: #FFF;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(242, 151, 39, 0.15);
  color: #B45309;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background-color: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10B981;
  animation: pulse-green 1.5s infinite;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
  letter-spacing: -0.4px;
}

.page-subtitle {
  font-size: 13px;
  color: #6B5A52;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.read-only-pill {
  background-color: #FEF3C7;
  color: #92400E;
  border: 1px solid #FDE68A;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 6px;
}

.role-warning-banner {
  background-color: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
}

/* ========================================================================= */
/* DEDICATED SECTION WIDGET CARD (No Old Numbering)                          */
/* ========================================================================= */
.section-widget-card {
  background: #FFFFFF;
  border: 1px solid #EAE5DF;
  border-radius: 16px;
  padding: 22px 24px 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 2px 12px rgba(44, 26, 19, 0.04);
}

.widget-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid #F3EFEA;
  padding-bottom: 14px;
}

.widget-header-left {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.widget-chip-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.widget-icon {
  font-size: 18px;
}

.widget-title {
  font-size: 18px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  letter-spacing: -0.3px;
}

.widget-subtitle {
  font-size: 12.5px;
  color: #6B5A52;
  margin: 0;
}

.filter-select-cute {
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  background: #FAF8F5;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #2C1A13;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.filter-select-cute:focus {
  border-color: #F29727;
  background: #FFFFFF;
}

/* ========================================================================= */
/* TICKET CARDS GRID (Reference 1 Concept)                                  */
/* ========================================================================= */
.ticket-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.ticket-card-v2 {
  background: #FFFDF9;
  border: 1px solid #EAE5DF;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.ticket-card-v2:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(44, 26, 19, 0.08);
  border-color: #F29727;
}

/* Top Banner Image */
.ticket-banner-box {
  width: 100%;
  height: 125px;
  position: relative;
  overflow: hidden;
  background: #EAE5DF;
}

.ticket-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ticket-card-v2:hover .ticket-banner-img {
  transform: scale(1.05);
}

.ticket-category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(44, 26, 19, 0.85);
  backdrop-filter: blur(4px);
  color: #F29727;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(242, 151, 39, 0.4);
}

.ticket-status-pill {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.pill-active {
  background: rgba(16, 185, 129, 0.9);
  color: #FFFFFF;
}

.pill-inactive {
  background: rgba(239, 68, 68, 0.9);
  color: #FFFFFF;
}

/* Ticket Body */
.ticket-card-body {
  padding: 14px 14px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: space-between;
}

.ticket-title {
  font-size: 15px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  line-height: 1.25;
}

.ticket-desc {
  font-size: 11.5px;
  color: #6B5A52;
  margin: 0;
  line-height: 1.35;
  min-height: 32px;
}

/* Center Price Box */
.ticket-price-box {
  background: #FFF8EE;
  border: 1px solid #FFE0B2;
  border-radius: 10px;
  padding: 8px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.price-box-label {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #B45309;
}

.price-box-val {
  font-size: 20px;
  font-weight: 800;
  color: #2C1A13;
  letter-spacing: -0.5px;
}

.price-box-unit {
  font-size: 10.5px;
  color: #78350F;
  font-weight: 600;
}

/* Rules Checklist */
.ticket-rules-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 0;
}

.ticket-rule-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11.5px;
  color: #374151;
  line-height: 1.3;
}

.check-icon {
  color: #10B981;
  font-weight: 800;
  font-size: 12px;
}

/* Action Button */
.btn-ticket-action {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 9px 12px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ticket-action:hover:not(:disabled) {
  background: #4A2E22;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(44, 26, 19, 0.2);
}

/* ========================================================================= */
/* RIDES CATALOG GRID (Reference 2 Concept)                                  */
/* ========================================================================= */
.rides-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.ride-card-v2 {
  background: #FFFFFF;
  border: 1px solid #EAE5DF;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(44, 26, 19, 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.ride-card-v2:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(44, 26, 19, 0.08);
  border-color: #F29727;
}

/* Ride Photo Banner */
.ride-photo-box {
  width: 100%;
  height: 140px;
  position: relative;
  overflow: hidden;
  background: #2C1A13;
}

.ride-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.ride-card-v2:hover .ride-photo-img {
  transform: scale(1.06);
}

.ride-ribbon-tag {
  position: absolute;
  top: 10px;
  left: 0;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 3px 10px 3px 8px;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.ribbon-terusan {
  background: #D97706;
  color: #FFFFFF;
}

.ribbon-paid {
  background: #2C1A13;
  color: #F29727;
  border: 1px solid rgba(242, 151, 39, 0.4);
}

.ride-status-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 10.5px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.badge-buka {
  background: rgba(255, 255, 255, 0.92);
  color: #059669;
  border: 1px solid #10B981;
}

.badge-maintenance {
  background: rgba(255, 255, 255, 0.92);
  color: #D97706;
  border: 1px solid #F59E0B;
}

.badge-tutup {
  background: rgba(255, 255, 255, 0.92);
  color: #DC2626;
  border: 1px solid #EF4444;
}

/* Ride Card Body */
.ride-card-body {
  padding: 14px 14px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: space-between;
}

.ride-title {
  font-size: 15px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
  line-height: 1.25;
}

.ride-price-cap-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ride-price-text {
  font-size: 15px;
  font-weight: 800;
  color: #B45309;
}

.ride-capacity-text {
  font-size: 11px;
  color: #6B5A52;
  font-weight: 600;
}

.ride-desc-text {
  font-size: 11.5px;
  color: #6B5A52;
  margin: 0;
  line-height: 1.35;
  min-height: 32px;
}

/* 2-Column Info Strip Box */
.ride-info-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #FAF8F5;
  border: 1px solid #EAE5DF;
  border-radius: 8px;
  padding: 6px 8px;
  gap: 6px;
}

.info-strip-col {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.strip-lbl {
  font-size: 9.5px;
  color: #6B5A52;
}

.strip-val {
  font-size: 11.5px;
  font-weight: 700;
  color: #2C1A13;
}

/* 2 Action Buttons */
.ride-actions-row {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.btn-ride-status {
  flex: 1;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-ride-status:hover:not(:disabled) {
  background: #4A2E22;
}

.btn-status-maintenance {
  background: #D97706;
}

.btn-status-maintenance:hover:not(:disabled) {
  background: #B45309;
}

.btn-ride-edit {
  background: #F29727;
  color: #2C1A13;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ride-edit:hover:not(:disabled) {
  background: #FFB04D;
  transform: translateY(-1px);
}

/* Modals */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
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
  color: var(--color-primary, #2C1A13);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.input-control, .textarea-control, .filter-select {
  padding: 8px 10px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #E5E7EB;
  padding: 12px 20px;
}

@media (max-width: 1280px) {
  .ticket-cards-grid,
  .rides-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .ticket-cards-grid,
  .rides-grid {
    grid-template-columns: 1fr;
  }
}
</style>
