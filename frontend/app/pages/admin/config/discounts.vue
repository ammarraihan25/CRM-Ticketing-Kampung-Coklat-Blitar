<template>
  <div class="discounts-page">
    <!-- Header Section -->
    <header class="config-header">
      <div class="header-left">
        <h1 class="page-title">Pengaturan Diskon &amp; Promo Tiket</h1>
        <p class="page-subtitle">
          Kelola skema voucher diskon persentase, promo Free Ticket jamaah pengajian (PP), dan kampanye loyalitas WhatsApp.
        </p>
      </div>

      <div class="header-actions">
        <button 
          v-if="canManageConfig"
          type="button" 
          class="btn-primary-action"
          @click="openAddVoucherModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Buat Voucher Promo Baru</span>
        </button>

        <div v-else class="read-only-pill">
          🔒 Mode Read-Only (Role: {{ user.roleTitle }})
        </div>
      </div>
    </header>

    <!-- Role Warning if not Admin -->
    <div v-if="!canManageConfig" class="role-warning-banner">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <div>
        <strong>Akses Terbatas:</strong> Anda sedang masuk sebagai <u>{{ user.roleTitle }}</u>. Pembuatan dan aktivasi kupon diskon promo dibatasi hanya untuk Super Admin.
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- DIRECT PHYSICAL VOUCHER TICKETS (BOLD TYPOGRAPHY, SEAMLESS NOTCH) -->
    <!-- ================================================================= -->
    <div class="physical-vouchers-grid">
      <div 
        v-for="v in vouchersList" 
        :key="v.id" 
        class="pure-voucher-ticket"
        :class="[`theme-accent-${v.targetSegment.toLowerCase()}`, { 'ticket-disabled': !v.isActive }]"
      >
        <!-- Serrated/Scalloped Teeth Punch Holes on Left Outer Silhouette -->
        <div class="voucher-sawtooth-teeth">
          <span v-for="n in 11" :key="n" class="sawtooth-bite"></span>
        </div>

        <!-- ============================================================= -->
        <!-- 1. MAIN TICKET BODY (SEAMLESS NOTCHED MASK)                   -->
        <!-- ============================================================= -->
        <div class="voucher-main-body">
          <!-- Far Left Vertical Date -->
          <div class="ticket-vertical-edge">
            <span class="vertical-date-text">{{ v.validUntil }}</span>
          </div>

          <!-- Tiled Logo Watermark -->
          <div class="ticket-watermark-bg" :style="{ backgroundImage: `url(${logoImg})` }"></div>

          <!-- Main Text Content Area (Bold & Legible) -->
          <div class="ticket-text-content">
            <!-- Top Row: Segment Tag & Brand Logo -->
            <div class="content-header-row">
              <div class="segment-pill-tag" :class="`pill-${v.targetSegment.toLowerCase()}`">
                <span>{{ v.targetSegmentLabel }}</span>
              </div>
              <img :src="logoImg" alt="Kampung Coklat" class="ref-mini-logo" />
            </div>

            <!-- Big Bold Title with Decorative Accent Bar -->
            <div class="content-title-area">
              <h2 class="bold-ticket-title">{{ v.name }}</h2>
              <div class="title-underline-bar"></div>
            </div>

            <!-- Bold Crisp 2-Line Description -->
            <p class="concise-desc-text">{{ v.description }}</p>

            <!-- Bottom Row: Code & Detail Button -->
            <div class="ticket-action-footer">
              <div class="code-copy-badge" @click="copyCode(v.code)" title="Klik untuk menyalin kode">
                <span class="code-prefix">KODE:</span>
                <span class="code-mono">{{ v.code }}</span>
                <span class="copy-glyph">📋</span>
              </div>

              <button 
                type="button" 
                class="btn-detail-link"
                @click="openDetailModal(v)"
                title="Lihat Rincian &amp; Kuota Promo"
              >
                <span>Detail Info</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- 2. TEAR-OFF COUPON STUB (SEAMLESS NOTCHED MASK)              -->
        <!-- ============================================================= -->
        <div class="voucher-stub-body">
          <!-- Top Mini Logo -->
          <div class="stub-top-logo">
            <span class="stub-brand-kcb">KAMPUNG COKLAT</span>
            <span class="stub-tag-kcb">OFFICIAL VOUCHER</span>
          </div>

          <!-- Big Stub Callout Title -->
          <div class="stub-main-callout">
            <span class="stub-callout-text">{{ v.discountType === 'percentage' ? `${v.discountValue}% OFF` : 'FREE TIKET' }}</span>
          </div>

          <!-- Clean Crisp QR Code Graphic -->
          <div class="stub-qr-card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="#2C1A13" class="qr-code-vector">
              <rect x="2" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="5" y="5" width="4" height="4" fill="#2C1A13"/>
              <rect x="24" y="2" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="27" y="5" width="4" height="4" fill="#2C1A13"/>
              <rect x="2" y="24" width="10" height="10" rx="1.5" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <rect x="5" y="27" width="4" height="4" fill="#2C1A13"/>
              <rect x="16" y="4" width="4" height="4" fill="#2C1A13"/>
              <rect x="16" y="16" width="6" height="6" fill="#2C1A13"/>
              <rect x="26" y="16" width="6" height="4" fill="#2C1A13"/>
              <rect x="16" y="26" width="4" height="6" fill="#2C1A13"/>
              <rect x="24" y="24" width="8" height="8" fill="none" stroke="#2C1A13" stroke-width="2"/>
              <circle cx="28" cy="28" r="1.5" fill="#2C1A13"/>
            </svg>
          </div>

          <!-- Bottom Date & Quick Action Buttons -->
          <div class="stub-bottom-info">
            <span class="stub-date-val">{{ v.validUntil }}</span>
            
            <div class="stub-hover-actions">
              <button 
                type="button" 
                class="btn-stub-toggle-status"
                :class="v.isActive ? 'is-active' : 'is-inactive'"
                :disabled="!canManageConfig"
                @click="toggleVoucherStatus(v)"
              >
                {{ v.isActive ? '● Aktif' : '○ Nonaktif' }}
              </button>

              <button 
                type="button" 
                class="btn-stub-edit-quick"
                :disabled="!canManageConfig"
                @click="editVoucher(v)"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- MODAL DETAIL INFO VOUCHER (POPUP LENGKAP)                         -->
    <!-- ================================================================= -->
    <div v-if="showDetailModal && selectedDetailVoucher" class="modal-backdrop" @click.self="showDetailModal = false">
      <div class="modal-card modal-detail-card">
        <div class="modal-landscape-header">
          <div class="modal-brand-side">
            <img :src="logoImg" alt="Kampung Coklat" class="modal-brand-logo-img" />
            <div class="modal-title-col">
              <h3>Rincian Lengkap Voucher Promo</h3>
              <p class="modal-subtitle-text">Spesifikasi kuota klaim, target demografi, dan masa berlaku kampanye</p>
            </div>
          </div>
          <button class="btn-close-modal" @click="showDetailModal = false">&times;</button>
        </div>

        <div class="modal-detail-body">
          <div class="detail-hero-box">
            <div class="detail-code-banner">
              <span class="banner-lbl">KODE KUPON</span>
              <span class="banner-code">{{ selectedDetailVoucher.code }}</span>
            </div>
            <div class="detail-discount-tag">
              {{ selectedDetailVoucher.discountType === 'percentage' ? `${selectedDetailVoucher.discountValue}% OFF` : '100% FREE TIKET' }}
            </div>
          </div>

          <h3 class="detail-promo-title">{{ selectedDetailVoucher.name }}</h3>
          <p class="detail-promo-desc">{{ selectedDetailVoucher.description }}</p>

          <!-- Metrics Breakdown Grid -->
          <div class="detail-specs-grid">
            <div class="spec-item">
              <span class="spec-icon">🎯</span>
              <div>
                <span class="spec-label">Target Segmen</span>
                <span class="spec-value">{{ selectedDetailVoucher.targetSegmentLabel }}</span>
              </div>
            </div>
            <div class="spec-item">
              <span class="spec-icon">📍</span>
              <div>
                <span class="spec-label">Target Domisili Kota</span>
                <span class="spec-value">{{ selectedDetailVoucher.targetCity }}</span>
              </div>
            </div>
            <div class="spec-item">
              <span class="spec-icon">🎫</span>
              <div>
                <span class="spec-label">Minimal Pembelian</span>
                <span class="spec-value">{{ selectedDetailVoucher.minTickets }} Lembar Tiket</span>
              </div>
            </div>
            <div class="spec-item">
              <span class="spec-icon">📅</span>
              <div>
                <span class="spec-label">Masa Berlaku Kupon</span>
                <span class="spec-value">{{ selectedDetailVoucher.validUntil }}</span>
              </div>
            </div>
          </div>

          <!-- Quota Progress Card -->
          <div class="detail-quota-card">
            <div class="quota-head-row">
              <span class="quota-head-title">📊 Penggunaan Kuota Promo Real-Time</span>
              <span class="quota-head-stat">
                <strong>{{ selectedDetailVoucher.claimedCount.toLocaleString() }}</strong> dari {{ selectedDetailVoucher.maxQuota.toLocaleString() }} Kupon ({{ Math.round((selectedDetailVoucher.claimedCount / selectedDetailVoucher.maxQuota) * 100) }}%)
              </span>
            </div>
            <div class="quota-detail-track">
              <div 
                class="quota-detail-fill"
                :style="{ width: `${Math.min(100, (selectedDetailVoucher.claimedCount / selectedDetailVoucher.maxQuota) * 100)}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="modal-landscape-footer">
          <div class="footer-tip">
            <span>Status Voucher: <strong :style="{ color: selectedDetailVoucher.isActive ? '#10B981' : '#EF4444' }">{{ selectedDetailVoucher.isActive ? 'Aktif di POS & Tiket Online' : 'Non-Aktif Sementara' }}</strong></span>
          </div>
          <div class="footer-btn-group">
            <button type="button" class="btn-cancel" @click="showDetailModal = false">Tutup</button>
            <button 
              v-if="canManageConfig"
              type="button" 
              class="btn-save-primary"
              @click="editFromDetail(selectedDetailVoucher)"
            >
              ✏️ Edit Voucher
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ================================================================= -->
    <!-- LANDSCAPE CREATE / EDIT MODAL                                     -->
    <!-- ================================================================= -->
    <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
      <div class="modal-card modal-landscape">
        <!-- Landscape Header with Clean Brand Logo -->
        <div class="modal-landscape-header">
          <div class="modal-brand-side">
            <img :src="logoImg" alt="Kampung Coklat" class="modal-brand-logo-img" />
            <div class="modal-title-col">
              <h3>{{ isEditing ? `Edit Voucher: ${form.code}` : 'Formulir Buat Voucher Promo Baru' }}</h3>
              <p class="modal-subtitle-text">Konfigurasi nilai diskon, target audiens, dan batas kuota kampanye tiket</p>
            </div>
          </div>
          <button class="btn-close-modal" @click="showModal = false">&times;</button>
        </div>

        <form @submit.prevent="saveVoucher">
          <div class="modal-landscape-body">
            <!-- Left Form Column: Identity & Rules -->
            <div class="modal-form-col">
              <div class="col-section-title">
                <span>1. Identitas &amp; Nilai Kupon</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Kode Voucher (Kupon)</label>
                  <input v-model="form.code" type="text" class="input-control font-mono" placeholder="MISAL: KEDIRI-PROMO15" required />
                </div>
                <div class="form-group">
                  <label>Tipe Diskon</label>
                  <AppSelect 
                    v-model="form.discountType" 
                    :options="discountTypeOptions" 
                    placeholder="Pilih Tipe Diskon"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Nama Program Promo</label>
                <input v-model="form.name" type="text" class="input-control" placeholder="Contoh: Voucher Diskon Rombongan Pelajar" required />
              </div>

              <div class="form-group">
                <label>Deskripsi Ketentuan &amp; Penjelasan</label>
                <textarea v-model="form.description" class="input-control textarea-control" rows="2" placeholder="Jelaskan mekanisme klaim voucher..."></textarea>
              </div>
            </div>

            <!-- Right Form Column: Audience & Limits -->
            <div class="modal-form-col">
              <div class="col-section-title">
                <span>2. Target Audiens &amp; Kuota</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Besaran Nilai (% / Free)</label>
                  <input v-model.number="form.discountValue" type="number" class="input-control" required />
                </div>
                <div class="form-group">
                  <label>Target Segmen Member</label>
                  <AppSelect 
                    v-model="form.targetSegment" 
                    :options="targetSegmentOptions" 
                    placeholder="Pilih Target Segmen"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Target Domisili Kota</label>
                  <input v-model="form.targetCity" type="text" class="input-control" placeholder="Semua Kota / Kediri" required />
                </div>
                <div class="form-group">
                  <label>Maksimum Kuota Klaim</label>
                  <input v-model.number="form.maxQuota" type="number" class="input-control" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Minimal Pembelian Tiket</label>
                  <input v-model.number="form.minTickets" type="number" class="input-control" min="1" required />
                </div>
                <div class="form-group">
                  <label>Masa Berlaku Kupon</label>
                  <input v-model="form.validUntil" type="text" class="input-control" placeholder="Contoh: 31 Des 2026" required />
                </div>
              </div>
            </div>
          </div>

          <!-- Landscape Footer -->
          <div class="modal-landscape-footer">
            <div class="footer-tip">
              <span>💡 Perubahan voucher promo akan langsung aktif di kasir POS dan sistem ticketing online.</span>
            </div>
            <div class="footer-btn-group">
              <button type="button" class="btn-cancel" @click="showModal = false">Batal</button>
              <button type="submit" class="btn-save-primary">Simpan Voucher Promo</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import logoImg from '~/assets/assets_POS/KAMPUNGCOKLAT.png'
import AppSelect from '~/components/shared/AppSelect.vue'

definePageMeta({
  layout: 'admin'
})

const discountTypeOptions = [
  { value: 'percentage', label: 'Potongan Persentase (%)' },
  { value: 'free', label: 'Free Ticket (100% Gratis)' }
]

const targetSegmentOptions = [
  { value: 'ALL', label: 'Semua Pengunjung' },
  { value: 'PP', label: 'PP - Jamaah Pengajian' },
  { value: 'PR', label: 'PR - Pengunjung Reguler' },
  { value: 'PT', label: 'PT - Agen Tour B2B' }
]

const { user, canManageConfig } = useAuth()

interface VoucherItem {
  id: string
  code: string
  name: string
  description: string
  discountType: 'percentage' | 'free'
  discountValue: number
  targetSegment: 'PP' | 'PR' | 'PT' | 'ALL'
  targetSegmentLabel: string
  targetCity: string
  minTickets: number
  maxQuota: number
  claimedCount: number
  validUntil: string
  isActive: boolean
}

const vouchersList = ref<VoucherItem[]>([
  {
    id: 'v-1',
    code: 'PENGAJIAN-FREE',
    name: 'VOUCHER FREE TIKET JAMAAH PENGAJIAN',
    description: 'Diberikan otomatis setelah scan QR Banner Digital Guestbook di hall pengajian.',
    discountType: 'free',
    discountValue: 100,
    targetSegment: 'PP',
    targetSegmentLabel: 'PP (Jamaah Pengajian)',
    targetCity: 'Semua Kota Asal',
    minTickets: 1,
    maxQuota: 5000,
    claimedCount: 3120,
    validUntil: '08.06.2026',
    isActive: true
  },
  {
    id: 'v-2',
    code: 'KEDIRI-SERU15',
    name: 'PROMO DOMISILI KEDIRI RAYA 15%',
    description: 'Potongan harga tiket masuk reguler khusus pengunjung domisili Kab & Kota Kediri.',
    discountType: 'percentage',
    discountValue: 15,
    targetSegment: 'PR',
    targetSegmentLabel: 'PR (Pengunjung Reguler)',
    targetCity: 'Kediri & Sekitarnya',
    minTickets: 2,
    maxQuota: 1000,
    claimedCount: 450,
    validUntil: '30.09.2026',
    isActive: true
  },
  {
    id: 'v-3',
    code: 'TOUR-BUS-20',
    name: 'INSENTIF ROMBONGAN TRAVEL AGENT 20%',
    description: 'Khusus kemitraan B2B dengan minimal pembelian 50 lembar tiket terusan wahana.',
    discountType: 'percentage',
    discountValue: 20,
    targetSegment: 'PT',
    targetSegmentLabel: 'PT (Rombongan B2B)',
    targetCity: 'Jawa Timur',
    minTickets: 50,
    maxQuota: 500,
    claimedCount: 180,
    validUntil: '31.12.2026',
    isActive: true
  },
  {
    id: 'v-4',
    code: 'WEEKDAY-COCOA10',
    name: 'FLASH PROMO HARI KERJA (SELASA - KAMIS)',
    description: 'Diskon 10% tiket reguler untuk meratakan traffic kunjungan di hari kerja.',
    discountType: 'percentage',
    discountValue: 10,
    targetSegment: 'ALL',
    targetSegmentLabel: 'Semua Pengunjung',
    targetCity: 'Nasional',
    minTickets: 1,
    maxQuota: 2000,
    claimedCount: 890,
    validUntil: '15.10.2026',
    isActive: true
  }
])

const activeVouchersCount = computed(() => vouchersList.value.filter(v => v.isActive).length)
const totalClaimedCount = computed(() => vouchersList.value.reduce((acc, v) => acc + v.claimedCount, 0))

const showModal = ref(false)
const isEditing = ref(false)
const showDetailModal = ref(false)
const selectedDetailVoucher = ref<VoucherItem | null>(null)

const form = reactive({
  id: '',
  code: '',
  name: '',
  description: '',
  discountType: 'percentage' as 'percentage' | 'free',
  discountValue: 15,
  targetSegment: 'PR' as 'PP' | 'PR' | 'PT' | 'ALL',
  targetCity: 'Semua Kota',
  minTickets: 1,
  maxQuota: 1000,
  validUntil: '31.12.2026'
})

const getPodFill = (segment: string) => {
  switch (segment) {
    case 'PP': return '#E76F51'
    case 'PR': return '#F4A261'
    case 'PT': return '#E9C46A'
    default: return '#D97706'
  }
}

const openDetailModal = (v: VoucherItem) => {
  selectedDetailVoucher.value = v
  showDetailModal.value = true
}

const editFromDetail = (v: VoucherItem) => {
  showDetailModal.value = false
  editVoucher(v)
}

const openAddVoucherModal = () => {
  isEditing.value = false
  form.id = `v-${Date.now()}`
  form.code = ''
  form.name = ''
  form.description = ''
  form.discountType = 'percentage'
  form.discountValue = 10
  form.targetSegment = 'PR'
  form.targetCity = 'Semua Kota'
  form.minTickets = 1
  form.maxQuota = 1000
  form.validUntil = '31.12.2026'
  showModal.value = true
}

const editVoucher = (v: VoucherItem) => {
  isEditing.value = true
  form.id = v.id
  form.code = v.code
  form.name = v.name
  form.description = v.description
  form.discountType = v.discountType
  form.discountValue = v.discountValue
  form.targetSegment = v.targetSegment
  form.targetCity = v.targetCity
  form.minTickets = v.minTickets
  form.maxQuota = v.maxQuota
  form.validUntil = v.validUntil
  showModal.value = true
}

const saveVoucher = () => {
  const segmentLabels: Record<string, string> = {
    PP: 'PP (Jamaah Pengajian)',
    PR: 'PR (Pengunjung Reguler)',
    PT: 'PT (Rombongan B2B)',
    ALL: 'Semua Pengunjung'
  }

  if (isEditing.value) {
    const idx = vouchersList.value.findIndex(v => v.id === form.id)
    if (idx !== -1) {
      vouchersList.value[idx] = {
        ...vouchersList.value[idx],
        code: form.code.toUpperCase(),
        name: form.name.toUpperCase(),
        description: form.description,
        discountType: form.discountType,
        discountValue: form.discountValue,
        targetSegment: form.targetSegment,
        targetSegmentLabel: segmentLabels[form.targetSegment] || 'Semua Pengunjung',
        targetCity: form.targetCity,
        minTickets: form.minTickets,
        maxQuota: form.maxQuota,
        validUntil: form.validUntil
      }
    }
  } else {
    vouchersList.value.unshift({
      id: form.id,
      code: form.code.toUpperCase(),
      name: form.name.toUpperCase(),
      description: form.description,
      discountType: form.discountType,
      discountValue: form.discountValue,
      targetSegment: form.targetSegment,
      targetSegmentLabel: segmentLabels[form.targetSegment] || 'Semua Pengunjung',
      targetCity: form.targetCity,
      minTickets: form.minTickets,
      maxQuota: form.maxQuota,
      claimedCount: 0,
      validUntil: form.validUntil,
      isActive: true
    })
  }

  showModal.value = false
}

const toggleVoucherStatus = (v: VoucherItem) => {
  v.isActive = !v.isActive
}

const copyCode = (code: string) => {
  navigator.clipboard.writeText(code)
  alert(`Kode voucher "${code}" telah disalin ke clipboard!`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Outfit:wght@600;700;800;900&family=Jost:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@700;800;900&display=swap');

/* ========================================================================= */
/* CONTAINER LAYOUT                                                          */
/* ========================================================================= */
.discounts-page {
  width: 100%;
  max-width: 1380px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
}

/* Header */
.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  min-height: 75px;
  padding: 6px 0 10px 0;
  position: relative;
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
}

.brand-mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #3D2214;
  color: #FFFDF9;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 800;
}

.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(217, 119, 6, 0.12);
  color: #B45309;
  border: 1px solid rgba(217, 119, 6, 0.3);
  padding: 3px 10px;
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

.header-right-group {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.btn-primary-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #3D2214;
  color: #FAF5EE;
  border: none;
  padding: 9px 20px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(61, 34, 20, 0.2);
  transition: all 0.2s ease;
  position: relative;
  z-index: 2;
}

.btn-primary-action:hover {
  background: #D97706;
  transform: translateY(-1px);
}

.read-only-pill {
  background: #FAF3E8;
  color: #92400E;
  border: 1px solid #EADBCC;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  position: relative;
  z-index: 2;
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
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
}

/* ========================================================================= */
/* PURE PHYSICAL VOUCHER SILHOUETTES WITH MATHEMATICAL NOTCH CUTOUTS         */
/* ========================================================================= */
.physical-vouchers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 24px;
}

/* Root Voucher Card Silhouette */
.pure-voucher-ticket {
  display: flex;
  position: relative;
  filter: drop-shadow(0 8px 18px rgba(44, 26, 19, 0.12));
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), filter 0.28s ease;
  min-height: 215px;
}

.pure-voucher-ticket:hover {
  transform: translateY(-5px);
  filter: drop-shadow(0 16px 30px rgba(44, 26, 19, 0.22));
}

.ticket-disabled {
  opacity: 0.6;
  filter: grayscale(0.4);
}

/* Left Scalloped Serrated Teeth */
.voucher-sawtooth-teeth {
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 6;
  pointer-events: none;
}

.sawtooth-bite {
  width: 7px;
  height: 9px;
  background: #F8F5F0; /* Canvas Background */
  border-radius: 0 10px 10px 0;
  box-shadow: inset -1px 0 1.5px rgba(0, 0, 0, 0.2);
}

/* 1. Main Voucher Body (Left) */
.voucher-main-body {
  flex: 1;
  background: #FFFFFF;
  border-radius: 20px 0 0 20px;
  position: relative;
  display: flex;
  padding: 18px 18px 16px 0;
  overflow: hidden;
  mask-image: 
    radial-gradient(circle 11px at 100% 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 100% 100%, transparent 11px, black 11.5px);
  mask-composite: intersect;
  -webkit-mask-image: 
    radial-gradient(circle 11px at 100% 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 100% 100%, transparent 11px, black 11.5px);
  -webkit-mask-composite: source-in;
}

/* 2. Right Contrasting Tear Stub */
.voucher-stub-body {
  width: 144px;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 18px 12px;
  text-align: center;
  border-left: 2px dashed rgba(255, 255, 255, 0.5);
  mask-image: 
    radial-gradient(circle 11px at 0 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 0 100%, transparent 11px, black 11.5px);
  mask-composite: intersect;
  -webkit-mask-image: 
    radial-gradient(circle 11px at 0 0, transparent 11px, black 11.5px),
    radial-gradient(circle 11px at 0 100%, transparent 11px, black 11.5px);
  -webkit-mask-composite: source-in;
}

/* ========================================================================= */
/* THEME ACCENTS                                                             */
/* ========================================================================= */
/* 1. PP Theme: Deep Forest Emerald */
.theme-accent-pp .voucher-stub-body {
  background: linear-gradient(145deg, #064E3B 0%, #065F46 100%);
  color: #FFFFFF;
}
.theme-accent-pp .bold-ticket-title { color: #064E3B; }
.theme-accent-pp .title-underline-bar { background: #065F46; }
.theme-accent-pp .pill-pp { background: #D1FAE5; color: #065F46; border: 1.5px solid #6EE7B7; }

/* 2. PR Theme: Deep Rich Roasted Cocoa */
.theme-accent-pr .voucher-stub-body {
  background: linear-gradient(145deg, #2C1A13 0%, #442212 100%);
  color: #FFFFFF;
}
.theme-accent-pr .bold-ticket-title { color: #2C1A13; }
.theme-accent-pr .title-underline-bar { background: #D97706; }
.theme-accent-pr .pill-pr { background: #FEF3C7; color: #92400E; border: 1.5px solid #FCD34D; }

/* 3. PT Theme: Deep Indigo Royal Navy */
.theme-accent-pt .voucher-stub-body {
  background: linear-gradient(145deg, #1E1B4B 0%, #312E81 100%);
  color: #FFFFFF;
}
.theme-accent-pt .bold-ticket-title { color: #1E1B4B; }
.theme-accent-pt .title-underline-bar { background: #6366F1; }
.theme-accent-pt .pill-pt { background: #EDE9FE; color: #5B21B6; border: 1.5px solid #C4B5FD; }

/* 4. ALL Theme: Warm Terracotta Coffee */
.theme-accent-all .voucher-stub-body {
  background: linear-gradient(145deg, #7C2D12 0%, #9A3412 100%);
  color: #FFFFFF;
}
.theme-accent-all .bold-ticket-title { color: #7C2D12; }
.theme-accent-all .title-underline-bar { background: #EA580C; }
.theme-accent-all .pill-all { background: #FFEDD5; color: #9A3412; border: 1.5px solid #FDBA74; }

/* Far Left Vertical Date Strip (Bolder) */
.ticket-vertical-edge {
    position: relative;
    z-index: 1;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid #D6BFA8;
  margin-left: 10px;
  margin-right: 14px;
}

.vertical-date-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.8px;
  color: #2C1A13;
}

/* Floating Soft Cocoa Pod Illustration */
.ticket-watermark-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.12;
  background-size: 80px auto;
  background-repeat: repeat;
  background-position: center;
  z-index: 0;
  pointer-events: none;
}

/* Text Content Area */
.ticket-text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  padding-left: 14px;
}

/* Top Row */
.content-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.segment-pill-tag {
  font-size: 13.5px;
  font-weight: 900;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 12px;
  letter-spacing: 0.4px;
}

.ref-mini-logo {
  max-width: 92px;
  max-height: 24px;
  object-fit: contain;
}

/* Title Area (Bolder) */
.content-title-area {
  margin-bottom: 4px;
}

.bold-ticket-title {
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0 0 5px 0;
  line-height: 1.25;
}

.title-underline-bar {
  width: 56px;
  height: 3.5px;
  border-radius: 3px;
}

/* Description (Bolder & Darker) */
.concise-desc-text {
  font-size: 12.5px;
  font-weight: 700;
  color: #3D2214;
  margin: 0 0 10px 0;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Bottom Action Footer */
.ticket-action-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.code-copy-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FAF5ED;
  border: 1.8px dashed #B45309;
  border-radius: 7px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.code-copy-badge:hover {
  background: #FEF3C7;
  border-color: #D97706;
  transform: scale(1.03);
}

.code-prefix {
  font-size: 13px;
  font-weight: 900;
  color: #8C6D58;
}

.code-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  font-weight: 900;
  color: #B45309;
  letter-spacing: 0.6px;
}

.copy-glyph { font-size: 13.5px; }

.btn-detail-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #2C1A13;
  color: #FFFFFF;
  border: none;
  border-radius: 7px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail-link:hover {
  background: #D97706;
  transform: translateY(-1px);
}

/* Right Stub Inner Elements (Bolder) */
.stub-top-logo {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stub-brand-kcb {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.6px;
  color: #FFFFFF;
}

.stub-tag-kcb {
  font-size: 13.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.3px;
}

.stub-main-callout {
  margin: 2px 0;
}

.stub-callout-text {
  font-size: 14.5px;
  font-weight: 900;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #FBBF24;
}

.stub-qr-card {
  width: 54px;
  height: 54px;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
}

.qr-code-vector {
  width: 100%;
  height: 100%;
}

.stub-bottom-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.stub-date-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: 0.8px;
}

.stub-hover-actions {
  display: flex;
  gap: 4px;
  width: 100%;
}

.btn-stub-toggle-status {
  flex: 1;
  border: none;
  padding: 4px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-stub-toggle-status.is-active {
  background: #D1FAE5;
  color: #065F46;
}

.btn-stub-toggle-status.is-inactive {
  background: #FEE2E2;
  color: #991B1B;
}

.btn-stub-edit-quick {
  flex: 1;
  background: #FFFFFF;
  border: none;
  color: #2C1A13;
  padding: 4px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-stub-edit-quick:hover {
  background: #FEF3C7;
  color: #B45309;
}

/* ========================================================================= */
/* DETAIL MODAL STYLING                                                      */
/* ========================================================================= */
.modal-detail-card {
  background: #FFFDF9;
  border: 2.5px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 680px;
  box-shadow: 0 25px 60px rgba(44, 26, 19, 0.35);
  overflow: hidden;
  animation: modalPop 0.25s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-detail-body {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
}

.detail-hero-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FAF4EB;
  border: 1.5px solid #D6BFA8;
  border-radius: 12px;
  padding: 12px 18px;
}

.detail-code-banner {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.banner-lbl {
  font-size: 13px;
  font-weight: 800;
  color: #8C6D58;
}

.banner-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 900;
  color: #B45309;
  letter-spacing: 0.5px;
}

.detail-discount-tag {
  background: #2C1A13;
  color: #F59E0B;
  font-size: 16px;
  font-weight: 900;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #F59E0B;
}

.detail-promo-title {
  font-size: 18px;
  font-weight: 800;
  color: #2C1A13;
  margin: 0;
}

.detail-promo-desc {
  font-size: 13px;
  color: #5A3A28;
  margin: 0;
  line-height: 1.5;
  font-weight: 600;
}

.detail-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #FFFFFF;
  border: 1px solid #E6D7C3;
  border-radius: 10px;
  padding: 10px 12px;
}

.spec-icon { font-size: 18px; }

.spec-label {
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  color: #8C6D58;
}

.spec-value {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #2C1A13;
}

.detail-quota-card {
  background: #FFFFFF;
  border: 1px solid #E6D7C3;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quota-head-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
}

.quota-head-title {
  font-weight: 700;
  color: #5A3A28;
}

.quota-head-stat {
  color: #7A5034;
}

.quota-head-stat strong {
  color: #2C1A13;
}

.quota-detail-track {
  width: 100%;
  height: 8px;
  background: #EAE0D0;
  border-radius: 10px;
  overflow: hidden;
}

.quota-detail-fill {
  height: 100%;
  background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
}

/* ========================================================================= */
/* LANDSCAPE CREATE / EDIT MODAL STYLING                                     */
/* ========================================================================= */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(36, 20, 13, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-landscape {
  background: #FFFDF9;
  border: 2.5px solid #8B5738;
  border-radius: 20px;
  width: 100%;
  max-width: 860px;
  box-shadow: 
    0 25px 60px rgba(44, 26, 19, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  overflow: hidden;
  animation: modalPop 0.25s ease-out;
  display: flex;
  flex-direction: column;
}

@keyframes modalPop {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.modal-landscape-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #FAF4EB 0%, #EDE0CF 100%);
  border-bottom: 1.5px solid #D6BFA8;
}

.modal-brand-side {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-brand-logo-img {
  max-width: 140px;
  max-height: 42px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(44, 26, 19, 0.15));
}

.modal-title-col h3 {
  font-size: 17px;
  font-weight: 900;
  color: #2C1A13;
  margin: 0;
  letter-spacing: 0.4px;
}

.modal-subtitle-text {
  font-size: 11.5px;
  color: #6E442B;
  margin: 2px 0 0 0;
  font-weight: 600;
}

.btn-close-modal {
  background: transparent;
  border: none;
  font-size: 26px;
  color: #6E442B;
  cursor: pointer;
  line-height: 1;
  transition: transform 0.2s ease;
}

.btn-close-modal:hover {
  transform: scale(1.15) rotate(90deg);
  color: #B45309;
}

/* Dual Column Landscape Layout */
.modal-landscape-body {
  padding: 22px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-height: 70vh;
  overflow-y: auto;
  background: #FFFDF9;
}

.modal-form-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-section-title {
  font-size: 11.5px;
  font-weight: 800;
  text-transform: uppercase;
  color: #B45309;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #E6D7C3;
  padding-bottom: 4px;
  margin-bottom: 2px;
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
  font-size: 13.5px;
  font-weight: 700;
  color: #5A3A28;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.input-control {
  border: 1.5px solid #C4AA8F;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 7px 11px;
  font-family: inherit;
  font-size: 13px;
  color: #2C1A13;
  outline: none;
  transition: all 0.2s ease;
  font-weight: 600;
}

.input-control:focus {
  border-color: #D97706;
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
}

.filter-select {
  border: 1.5px solid #C4AA8F;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 7px 11px;
  font-family: inherit;
  font-size: 13px;
  color: #2C1A13;
  outline: none;
  font-weight: 600;
}

.filter-select:focus {
  border-color: #D97706;
}

.textarea-control {
  resize: vertical;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Landscape Footer */
.modal-landscape-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: #FAF4EB;
  border-top: 1.5px solid #D6BFA8;
  gap: 16px;
}

.footer-tip {
  font-size: 13.5px;
  color: #6E442B;
  max-width: 500px;
  font-weight: 600;
}

.footer-btn-group {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.btn-cancel {
  background: #FFFFFF;
  border: 1.5px solid #C4AA8F;
  color: #5A3A28;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #FAF4EB;
  border-color: #8B5738;
}

.btn-save-primary {
  background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
  color: #FFFFFF;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(217, 119, 6, 0.3);
  transition: all 0.2s ease;
}

.btn-save-primary:hover {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  transform: translateY(-1px);
}

/* ========================================================================= */
/* RESPONSIVE (< 768px)                                                      */
/* ========================================================================= */
@media (max-width: 768px) {
  .physical-vouchers-grid {
    grid-template-columns: 1fr;
  }
  .pure-voucher-ticket {
    flex-direction: column;
  }
  .voucher-main-body {
    border-radius: 20px 20px 0 0;
    padding-left: 0;
    mask-image: none !important;
    -webkit-mask-image: none !important;
  }
  .voucher-stub-body {
    width: 100%;
    border-radius: 0 0 20px 20px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    border-left: none;
    border-top: 2px dashed rgba(255, 255, 255, 0.45);
    mask-image: none !important;
    -webkit-mask-image: none !important;
  }
  .voucher-sawtooth-teeth {
    display: none;
  }
  .ticket-text-content {
    padding-left: 14px;
  }
  .ticket-illustration-art {
    display: none;
  }
  .detail-specs-grid {
    grid-template-columns: 1fr;
  }
  .modal-landscape-body {
    grid-template-columns: 1fr;
  }
  .modal-landscape-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .footer-btn-group {
    justify-content: flex-end;
  }
}
</style>
