<template>
  <div class="discounts-page">
    <!-- Header -->
    <header class="config-header">
      <div>
        <div class="badge-tag">
          <span>🏷️ Modul CRM & Retargeting</span>
        </div>
        <h1 class="page-title">Pengaturan Diskon & Promo Tiket</h1>
        <p class="page-subtitle">
          Kelola skema voucher diskon persentase, promo Free Ticket jamaah pengajian (PP), dan kampanye loyalitas WhatsApp.
        </p>
      </div>

      <div class="header-actions">
        <button 
          v-if="canManageConfig"
          type="button" 
          class="btn-primary"
          @click="openAddVoucherModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    <!-- Active Vouchers Grid -->
    <div class="vouchers-grid">
      <div v-for="v in vouchersList" :key="v.id" class="voucher-card" :class="{ 'card-inactive': !v.isActive }">
        <div class="voucher-top">
          <div class="voucher-badge-type" :class="`badge-target-${v.targetSegment.toLowerCase()}`">
            Target: {{ v.targetSegmentLabel }}
          </div>
          <span class="voucher-status-pill" :class="v.isActive ? 'pill-active' : 'pill-inactive'">
            {{ v.isActive ? '● Aktif' : '● Non-Aktif' }}
          </span>
        </div>

        <div class="voucher-body">
          <div class="voucher-code-box">
            <span class="code-text">{{ v.code }}</span>
            <span class="discount-pill">{{ v.discountType === 'percentage' ? `${v.discountValue}% OFF` : `FREE TIKET` }}</span>
          </div>

          <h3 class="voucher-title">{{ v.name }}</h3>
          <p class="voucher-desc">{{ v.description }}</p>

          <div class="voucher-rules">
            <div class="rule-row">
              <span class="rule-lbl">Minimal Transaksi:</span>
              <span class="rule-val">{{ v.minTickets }} Tiket</span>
            </div>
            <div class="rule-row">
              <span class="rule-lbl">Target Domisili:</span>
              <span class="rule-val">{{ v.targetCity }}</span>
            </div>
            <div class="rule-row">
              <span class="rule-lbl">Masa Berlaku:</span>
              <span class="rule-val">{{ v.validUntil }}</span>
            </div>
          </div>

          <!-- Quota Tracker Progress -->
          <div class="quota-tracker">
            <div class="quota-lbl-row">
              <span>Kuota Terklaim</span>
              <strong>{{ v.claimedCount }} / {{ v.maxQuota }} Voucher</strong>
            </div>
            <div class="quota-bar-track">
              <div 
                class="quota-bar-fill"
                :style="{ width: `${(v.claimedCount / v.maxQuota) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="voucher-footer">
          <button 
            type="button" 
            class="btn-secondary btn-sm"
            :disabled="!canManageConfig"
            @click="toggleVoucherStatus(v)"
          >
            {{ v.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
          </button>

          <button 
            type="button" 
            class="btn-primary btn-sm"
            :disabled="!canManageConfig"
            @click="editVoucher(v)"
          >
            Edit Promo
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Create / Edit Voucher -->
    <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3>{{ isEditing ? `Edit Voucher: ${form.code}` : 'Buat Voucher Promo Baru' }}</h3>
          <button class="btn-close" @click="showModal = false">&times;</button>
        </div>
        <form @submit.prevent="saveVoucher">
          <div class="modal-body">
            <div class="form-row">
              <div class="form-group">
                <label>Kode Voucher (Kupon)</label>
                <input v-model="form.code" type="text" class="input-control font-mono" placeholder="MISAL: PENGAJIAN-FREE" required />
              </div>
              <div class="form-group">
                <label>Tipe Diskon</label>
                <select v-model="form.discountType" class="filter-select full-width">
                  <option value="percentage">Potongan Persentase (%)</option>
                  <option value="free">Free Ticket (100% Gratis)</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Nama Program Promo</label>
              <input v-model="form.name" type="text" class="input-control" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Besaran Nilai (% / Tiket)</label>
                <input v-model.number="form.discountValue" type="number" class="input-control" required />
              </div>
              <div class="form-group">
                <label>Target Segmen Member</label>
                <select v-model="form.targetSegment" class="filter-select full-width">
                  <option value="ALL">Semua Pengunjung</option>
                  <option value="PP">PP - Jamaah Pengajian</option>
                  <option value="PR">PR - Pengunjung Reguler</option>
                  <option value="PT">PT - Agen Tour B2B</option>
                </select>
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

            <div class="form-group">
              <label>Masa Berlaku Kupon</label>
              <input v-model="form.validUntil" type="date" class="input-control" required />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="showModal = false">Batal</button>
            <button type="submit" class="btn-primary">Simpan Voucher Promo</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'admin'
})

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
    name: 'Voucher Free Ticket Jamaah Pengajian',
    description: 'Diberikan otomatis setelah scan QR Banner Digital Guestbook di hall pengajian.',
    discountType: 'free',
    discountValue: 100,
    targetSegment: 'PP',
    targetSegmentLabel: 'PP (Jamaah Pengajian)',
    targetCity: 'Semua Kota Asal',
    minTickets: 1,
    maxQuota: 5000,
    claimedCount: 3120,
    validUntil: '31 Des 2026',
    isActive: true
  },
  {
    id: 'v-2',
    code: 'KEDIRI-SERU15',
    name: 'Promo Domisili Kediri Raya 15%',
    description: 'Potongan harga tiket masuk reguler khusus pengunjung domisili Kab & Kota Kediri.',
    discountType: 'percentage',
    discountValue: 15,
    targetSegment: 'PR',
    targetSegmentLabel: 'PR (Pengunjung Reguler)',
    targetCity: 'Kediri & Sekitarnya',
    minTickets: 2,
    maxQuota: 1000,
    claimedCount: 450,
    validUntil: '30 Sep 2026',
    isActive: true
  },
  {
    id: 'v-3',
    code: 'TOUR-BUS-20',
    name: 'Insentif Rombongan Travel Agent 20%',
    description: 'Khusus kemitraan B2B dengan minimal pembelian 50 lembar tiket terusan.',
    discountType: 'percentage',
    discountValue: 20,
    targetSegment: 'PT',
    targetSegmentLabel: 'PT (Rombongan B2B)',
    targetCity: 'Jawa Timur',
    minTickets: 50,
    maxQuota: 500,
    claimedCount: 180,
    validUntil: '31 Des 2026',
    isActive: true
  },
  {
    id: 'v-4',
    code: 'WEEKDAY-COCOA10',
    name: 'Flash Promo Hari Kerja (Selasa - Kamis)',
    description: 'Diskon 10% tiket reguler untuk meratakan traffic kunjungan di hari kerja.',
    discountType: 'percentage',
    discountValue: 10,
    targetSegment: 'ALL',
    targetSegmentLabel: 'Semua Pengunjung',
    targetCity: 'Nasional',
    minTickets: 1,
    maxQuota: 2000,
    claimedCount: 890,
    validUntil: '15 Okt 2026',
    isActive: true
  }
])

const showModal = ref(false)
const isEditing = ref(false)

const form = reactive({
  id: '',
  code: '',
  name: '',
  discountType: 'percentage' as 'percentage' | 'free',
  discountValue: 15,
  targetSegment: 'PR' as 'PP' | 'PR' | 'PT' | 'ALL',
  targetCity: 'Semua Kota',
  maxQuota: 1000,
  validUntil: '2026-12-31'
})

const openAddVoucherModal = () => {
  isEditing.value = false
  form.id = `v-${Date.now()}`
  form.code = ''
  form.name = ''
  form.discountType = 'percentage'
  form.discountValue = 15
  form.targetSegment = 'PR'
  form.targetCity = 'Semua Kota'
  form.maxQuota = 1000
  form.validUntil = '2026-12-31'
  showModal.value = true
}

const editVoucher = (v: VoucherItem) => {
  isEditing.value = true
  form.id = v.id
  form.code = v.code
  form.name = v.name
  form.discountType = v.discountType
  form.discountValue = v.discountValue
  form.targetSegment = v.targetSegment
  form.targetCity = v.targetCity
  form.maxQuota = v.maxQuota
  form.validUntil = '2026-12-31'
  showModal.value = true
}

const saveVoucher = () => {
  if (isEditing.value) {
    const existing = vouchersList.value.find(v => v.id === form.id)
    if (existing) {
      existing.code = form.code
      existing.name = form.name
      existing.discountType = form.discountType
      existing.discountValue = form.discountValue
      existing.targetSegment = form.targetSegment
      existing.targetCity = form.targetCity
      existing.maxQuota = form.maxQuota
    }
  } else {
    vouchersList.value.unshift({
      id: form.id,
      code: form.code,
      name: form.name,
      description: 'Program promo baru voucher tiket Kampung Coklat',
      discountType: form.discountType,
      discountValue: form.discountValue,
      targetSegment: form.targetSegment,
      targetSegmentLabel: form.targetSegment === 'PP' ? 'PP (Pengajian)' : form.targetSegment === 'PT' ? 'PT (Tour)' : 'PR (Reguler)',
      targetCity: form.targetCity,
      minTickets: 1,
      maxQuota: form.maxQuota,
      claimedCount: 0,
      validUntil: form.validUntil,
      isActive: true
    })
  }
  showModal.value = false
  alert('[SUKSES] Voucher promo berhasil disimpan!')
}

const toggleVoucherStatus = (v: VoucherItem) => {
  v.isActive = !v.isActive
}
</script>

<style scoped>
.discounts-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
}

.config-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
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
  margin-bottom: 4px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.page-subtitle {
  font-size: 13px;
  color: #6B5A52;
  margin: 0;
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

/* Vouchers Grid */
.vouchers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.voucher-card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(44, 26, 19, 0.04);
}

.voucher-card.card-inactive {
  opacity: 0.65;
  background-color: #F9FAFB;
}

.voucher-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.voucher-badge-type {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.badge-target-pp { background-color: #FEF3C7; color: #92400E; }
.badge-target-pr { background-color: #F3F4F6; color: #374151; }
.badge-target-pt { background-color: #E0E7FF; color: #3730A3; }
.badge-target-all { background-color: #ECFDF5; color: #047857; }

.voucher-status-pill {
  font-size: 11px;
  font-weight: 600;
}

.pill-active { color: #047857; }
.pill-inactive { color: #6B7280; }

.voucher-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.voucher-code-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFFDF9;
  border: 1px dashed #F29727;
  padding: 8px 12px;
  border-radius: 6px;
}

.code-text {
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  letter-spacing: 0.5px;
}

.discount-pill {
  background-color: #F29727;
  color: #2C1A13;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.voucher-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.voucher-desc {
  font-size: 12px;
  color: #6B5A52;
  margin: 0;
  line-height: 1.4;
}

.voucher-rules {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11.5px;
  border-top: 1px solid #F3F4F6;
  padding-top: 8px;
}

.rule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rule-lbl { color: #6B5A52; }
.rule-val { font-weight: 600; color: var(--color-primary, #2C1A13); }

.quota-tracker {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.quota-lbl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #6B5A52;
}

.quota-bar-track {
  height: 6px;
  background-color: #F3F4F6;
  border-radius: 6px;
  overflow: hidden;
}

.quota-bar-fill {
  height: 100%;
  background-color: #F29727;
  border-radius: 6px;
}

.voucher-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #F3F4F6;
  padding-top: 12px;
}

.btn-sm { height: 32px; font-size: 12px; padding: 0 12px; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(44, 26, 19, 0.65);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  padding: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 10px;
}

.modal-header h3 {
  font-size: 16px;
  color: var(--color-primary, #2C1A13);
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
}

.modal-body {
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

.input-control, .filter-select {
  padding: 8px 10px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-family: inherit;
  font-size: 13px;
}

.full-width { width: 100%; }

.font-mono { font-family: monospace; }

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #E5E7EB;
  padding-top: 12px;
}

@media (max-width: 1024px) {
  .vouchers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
