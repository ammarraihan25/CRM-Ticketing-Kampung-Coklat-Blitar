<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { GuestBookPayload, GuestBookRecord, GuestBookMember } from '~/composables/useGuestBookApi'
import AppDatePicker from '~/components/shared/AppDatePicker.vue'

definePageMeta({
  layout: false
})

const { requestOtp } = useGuestBookApi()

// Steps: 'event' (Step 1) | 'members' (Step 2) | 'success' (Step 3)
const step = ref<'event' | 'members' | 'success'>('event')

// Helper for today's date in YYYY-MM-DD
const getTodayDateStr = () => {
  const now = new Date()
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

// STEP 1 FORM STATE
const form = ref({
  tipeKunjungan: 'pengajian' as 'pengajian' | 'hall' | 'b2b' | '',
  namaAcara: '',
  tanggalKunjungan: getTodayDateStr(),
  namaPic: '',
  whatsappPic: '',
  domisiliPic: '',
  tanggalLahirPic: '',
  jumlahRombongan: undefined as number | undefined
})

// MEMBER INTERFACE
export interface MemberItem {
  id: string | number
  nama: string
  whatsapp: string
  domisili: string
  tanggalLahir?: string
  isSaved: boolean
  isPic?: boolean
}

// STEP 2: STATE FOR SINGLE CARD NAVIGATION
const memberList = ref<MemberItem[]>([])
const currentIndex = ref(0) // Active member card index being displayed

// Temporary form buffer for current active card
const currentCardForm = ref({
  nama: '',
  whatsapp: '',
  domisili: '',
  tanggalLahir: ''
})

// MODAL REKAP STATE
const isRekapModalOpen = ref(false)

// POPUP TOAST NOTIFICATION
const memoryToast = ref<{
  show: boolean
  title: string
  message: string
}>({
  show: false,
  title: '',
  message: ''
})
let toastTimeout: any = null

const showToast = (title: string, message: string) => {
  if (toastTimeout) clearTimeout(toastTimeout)
  memoryToast.value = {
    show: true,
    title,
    message
  }
  toastTimeout = setTimeout(() => {
    memoryToast.value.show = false
  }, 2600)
}

const isLoading = ref(false)
const errorMessage = ref('')
const savedRecord = ref<GuestBookRecord | null>(null)

// STEP NUMBER COMPUTED
const stepNumber = computed(() => {
  return step.value === 'event' ? 1
    : step.value === 'members' ? 2
    : 3
})

// DYNAMIC AGE & CATEGORY CALCULATOR FOR PIC
const picAgeInfo = computed(() => {
  if (!form.value.tanggalLahirPic) return null
  const birth = new Date(form.value.tanggalLahirPic)
  if (isNaN(birth.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  if (age < 0 || age > 130) return null
  let category = 'Dewasa'
  if (age >= 50) category = 'Lansia'
  else if (age >= 25) category = 'Dewasa'
  else if (age >= 13) category = 'Remaja'
  else category = 'Anak-anak'
  return { age, category }
})

// HELPER TO CALCULATE AGE FROM BIRTHDATE STRING
const calculateAge = (birthDateStr?: string) => {
  if (!birthDateStr) return '-'
  const birth = new Date(birthDateStr)
  if (isNaN(birth.getTime())) return '-'
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  if (age < 0 || age > 130) return '-'
  return `${age} Thn`
}

// Synchronize currentCardForm when currentIndex or memberList changes
const loadCurrentMemberToForm = () => {
  const currentMember = memberList.value[currentIndex.value]
  if (currentMember) {
    currentCardForm.value = {
      nama: currentMember.nama || '',
      whatsapp: currentMember.whatsapp || '',
      domisili: currentMember.domisili || '',
      tanggalLahir: currentMember.tanggalLahir || ''
    }
  }
}

watch(currentIndex, () => {
  loadCurrentMemberToForm()
})

// =====================================================
// STEP 1 -> STEP 2 TRANSITION
// =====================================================
function handleStep1Submit() {
  errorMessage.value = ''

  if (!form.value.tipeKunjungan) {
    errorMessage.value = 'Silakan pilih Tujuan Kunjungan terlebih dahulu.'
    return
  }
  
  if (!form.value.namaAcara.trim()) {
    errorMessage.value = 'Silakan isi Nama Acara / Rombongan.'
    return
  }

  if (!form.value.tanggalKunjungan) {
    errorMessage.value = 'Silakan isi Tanggal Kunjungan.'
    return
  }

  if (!form.value.namaPic.trim()) {
    errorMessage.value = 'Silakan isi Nama PIC (Penanggung Jawab).'
    return
  }

  if (!form.value.whatsappPic.trim()) {
    errorMessage.value = 'Silakan isi Nomor WhatsApp PIC.'
    return
  }

  if (!form.value.domisiliPic.trim()) {
    errorMessage.value = 'Silakan isi Kota Domisili PIC.'
    return
  }

  // Determine number of initial cards needed
  const targetCount = (form.value.jumlahRombongan && form.value.jumlahRombongan > 0)
    ? Math.min(Math.max(form.value.jumlahRombongan, 1), 300)
    : 1

  if (memberList.value.length === 0) {
    const list: MemberItem[] = []
    
    // Member #1 is PIC Utama
    list.push({
      id: Date.now(),
      nama: form.value.namaPic,
      whatsapp: form.value.whatsappPic,
      domisili: form.value.domisiliPic,
      tanggalLahir: form.value.tanggalLahirPic,
      isSaved: true,
      isPic: true
    })

    // Additional members if count > 1
    for (let i = 1; i < targetCount; i++) {
      list.push({
        id: Date.now() + i,
        nama: '',
        whatsapp: '',
        domisili: form.value.domisiliPic,
        tanggalLahir: '',
        isSaved: false,
        isPic: false
      })
    }
    memberList.value = list
  } else {
    // Sync PIC info on member 1 if edited
    if (memberList.value[0] && memberList.value[0].isPic) {
      memberList.value[0].nama = form.value.namaPic
      memberList.value[0].whatsapp = form.value.whatsappPic
      memberList.value[0].domisili = form.value.domisiliPic
      memberList.value[0].tanggalLahir = form.value.tanggalLahirPic
    }
  }

  currentIndex.value = 0
  loadCurrentMemberToForm()
  step.value = 'members'

  if (process.client) {
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }
}

// =====================================================
// STEP 2: SINGLE CARD ACTIONS (AUTO-SAVE ON NEXT)
// =====================================================

// 1. Simpan di Memori
function saveCurrentCardToMemory(showNotification = true) {
  const currentMember = memberList.value[currentIndex.value]
  if (!currentMember) return false

  if (!currentCardForm.value.nama.trim()) {
    return false
  }

  currentMember.nama = currentCardForm.value.nama.trim()
  currentMember.whatsapp = currentCardForm.value.whatsapp.trim()
  currentMember.domisili = currentCardForm.value.domisili.trim()
  currentMember.tanggalLahir = currentCardForm.value.tanggalLahir
  currentMember.isSaved = true

  if (showNotification) {
    showToast(
      'Data Berhasil Disimpan!',
      `Data anggota "${currentMember.nama}" otomatis tersimpan di memori.`
    )
  }
  return true
}

// 2. Tombol Selanjutnya (Otomatis Simpan di Memori & Tambah Anggota jika Kartu Terakhir)
function handleNextCard() {
  if (!currentCardForm.value.nama.trim()) {
    alert(`Mohon masukkan Nama Lengkap untuk Anggota #${currentIndex.value + 1} terlebih dahulu.`)
    return
  }

  // Otomatis simpan ke memori saat klik selanjutnya
  saveCurrentCardToMemory(true)

  if (currentIndex.value < memberList.value.length - 1) {
    currentIndex.value++
  } else {
    // Jika berada di kartu terakhir, langsung tambahkan anggota baru tanpa popup konfirmasi
    addNewMember()
  }
}

// 3. Tombol Selesai & Kirim di Bawah Form (Buka Modal Rekap Data untuk Tinjauan & Validasi)
function handleOpenRekapSubmit() {
  // Simpan kartu aktif jika nama sudah terisi
  if (currentCardForm.value.nama.trim()) {
    saveCurrentCardToMemory(false)
  }

  // Validasi minimal ada 1 anggota yang terisi
  const validMembers = memberList.value.filter(m => m.nama && m.nama.trim())
  if (validMembers.length === 0) {
    alert('Mohon isi minimal 1 data anggota rombongan terlebih dahulu.')
    return
  }

  // Buka modal rekap data
  isRekapModalOpen.value = true
}

// Add New Member (from card or modal)
function addNewMember() {
  const newMember: MemberItem = {
    id: Date.now() + Math.random(),
    nama: '',
    whatsapp: '',
    domisili: form.value.domisiliPic || '',
    tanggalLahir: '',
    isSaved: false,
    isPic: false
  }
  memberList.value.push(newMember)
  currentIndex.value = memberList.value.length - 1
  loadCurrentMemberToForm()
  isRekapModalOpen.value = false

  showToast('Kartu Baru Ditambahkan', `Membuka isian untuk Anggota #${memberList.value.length}.`)
}

// Edit Member from Modal
function editMemberFromModal(index: number) {
  currentIndex.value = index
  loadCurrentMemberToForm()
  isRekapModalOpen.value = false
}

// Delete Member from Modal
function deleteMemberFromModal(index: number) {
  if (memberList.value.length <= 1) {
    alert('Minimal harus ada 1 data anggota rombongan.')
    return
  }

  const target = memberList.value[index]
  const name = target.nama || `Anggota #${index + 1}`
  if (confirm(`Hapus data ${name} dari daftar?`)) {
    memberList.value.splice(index, 1)
    if (currentIndex.value >= memberList.value.length) {
      currentIndex.value = memberList.value.length - 1
    }
    loadCurrentMemberToForm()
    showToast('Data Dihapus', `${name} telah dihapus dari memori.`)
  }
}

// =====================================================
// STEP 2 -> STEP 3: SUBMIT TO SERVER
// =====================================================
async function handleFinalSubmit() {
  errorMessage.value = ''

  // Auto-save current active card if it has a name
  if (currentCardForm.value.nama.trim()) {
    saveCurrentCardToMemory(true)
  }

  // Filter out any completely empty member cards
  const validMembers = memberList.value.filter(m => m.nama.trim().length > 0)

  if (validMembers.length === 0) {
    alert('Mohon isi dan simpan minimal 1 data anggota rombongan.')
    return
  }

  memberList.value = validMembers
  isRekapModalOpen.value = false
  isLoading.value = true

  try {
    const membersData: GuestBookMember[] = memberList.value.map(m => ({
      nama: m.nama,
      whatsapp: m.whatsapp,
      domisili: m.domisili
    }))

    const payload: GuestBookPayload = {
      nama: form.value.namaPic,
      whatsapp: form.value.whatsappPic,
      domisili: form.value.domisiliPic,
      tipeKunjungan: form.value.tipeKunjungan as GuestBookPayload['tipeKunjungan'],
      namaAcara: form.value.namaAcara,
      tanggalKunjungan: form.value.tanggalKunjungan,
      tanggalLahir: form.value.tanggalLahirPic,
      jumlahRombongan: memberList.value.length,
      anggota: membersData
    }

    // Simulate network latency for demo
    await new Promise(resolve => setTimeout(resolve, 800))
    const res = await requestOtp(payload)
    savedRecord.value = res.data

    step.value = 'success'

    if (process.client) {
      window.scrollTo({ top: 350, behavior: 'smooth' })
    }
  } catch (err) {
    console.error('Submit error:', err)
    errorMessage.value = 'Gagal menyimpan data ke server. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// RESET FORM
function resetForm() {
  step.value = 'event'
  form.value = {
    tipeKunjungan: 'pengajian',
    namaAcara: '',
    tanggalKunjungan: getTodayDateStr(),
    namaPic: '',
    whatsappPic: '',
    domisiliPic: '',
    tanggalLahirPic: '',
    jumlahRombongan: undefined
  }
  memberList.value = []
  currentIndex.value = 0
  savedRecord.value = null
  errorMessage.value = ''
  isRekapModalOpen.value = false

  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function handlePrint() {
  if (process.client) {
    window.print()
  }
}
</script>

<template>
  <div class="guestbook-page">

    <!-- =====================================================
         HERO SECTION
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
          Buku Tamu Digital
          <strong>Kampung Coklat</strong>
        </h1>

        <p>
          Isi Buku Tamu Digital rombongan dan nikmati berbagai kemudahan, fasilitas, serta benefit khusus pengunjung.
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
         FORM SECTION (MULTI-STEP WIZARD)
    ====================================================== -->
    <section id="guestbook" class="form-section">
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
               HALAMAN 1 (STEP 1): INFO KUNJUNGAN & PIC
          ================================================== -->
          <template v-if="step === 'event'">
            <div class="form-heading">
              <h2>Data Kunjungan & PIC</h2>
              <p>Lengkapi informasi acara rombongan serta data penanggung jawab (PIC) kunjungan.</p>
            </div>

            <form class="guest-form" @submit.prevent="handleStep1Submit">

              <!-- TUJUAN KUNJUNGAN (WAJIB) -->
              <div class="form-group">
                <label>
                  Tujuan Kunjungan <span class="required-star">*</span>
                </label>
                <div class="visit-type-grid">
                  <label class="visit-type-card pengajian-card" :class="{ selected: form.tipeKunjungan === 'pengajian' }">
                    <input v-model="form.tipeKunjungan" type="radio" value="pengajian" />
                    <div class="visit-type-content">
                      <strong>Pengajian</strong>
                      <span>Jamaah pengajian / majelis taklim</span>
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
                      <strong>B2B / Travel Agent</strong>
                      <span>Biro wisata, sekolah, atau instansi mitra</span>
                    </div>
                    <div class="visit-type-check">✓</div>
                  </label>
                </div>
              </div>

              <!-- NAMA ACARA / ROMBONGAN (WAJIB) -->
              <div class="form-group">
                <label for="namaAcara">
                  Nama Acara / Rombongan <span class="required-star">*</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    id="namaAcara" 
                    v-model="form.namaAcara" 
                    type="text" 
                    placeholder="Contoh: Rombongan Pengajian Al-Ikhlas / Study Tour SMA 1" 
                    required 
                  />
                </div>
              </div>

              <!-- TANGGAL KUNJUNGAN (DEFAULT HARI INI & WAJIB) -->
              <div class="form-group">
                <label for="tanggalKunjungan">
                  Tanggal Kunjungan <span class="required-star">*</span>
                </label>
                <AppDatePicker 
                  v-model="form.tanggalKunjungan" 
                  size="lg"
                  placeholder="Pilih Tanggal Kunjungan..." 
                />
                <span class="input-hint">Secara otomatis terisi tanggal hari ini (dapat disesuaikan jika reservasi hari lain).</span>
              </div>

              <div class="form-section-divider">
                <span>Data Penanggung Jawab (PIC)</span>
              </div>

              <!-- NAMA PIC (WAJIB) -->
              <div class="form-group">
                <label for="namaPic">
                  Nama PIC / Ketua Rombongan <span class="required-star">*</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    id="namaPic" 
                    v-model="form.namaPic" 
                    type="text" 
                    placeholder="Nama lengkap penanggung jawab" 
                    required 
                  />
                </div>
              </div>

              <!-- NO WHATSAPP PIC (WAJIB) -->
              <div class="form-group">
                <label for="whatsappPic">
                  No. WhatsApp PIC <span class="required-star">*</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    id="whatsappPic" 
                    v-model="form.whatsappPic" 
                    type="tel" 
                    inputmode="numeric"
                    placeholder="Contoh: 081234567890" 
                    required 
                  />
                </div>
                <span class="input-hint">Digunakan untuk konfirmasi registrasi & komunikasi PIC rombongan.</span>
              </div>

              <!-- KOTA DOMISILI PIC (WAJIB) -->
              <div class="form-group">
                <label for="domisiliPic">
                  Kota / Kabupaten Domisili PIC <span class="required-star">*</span>
                </label>
                <div class="input-wrapper">
                  <input 
                    id="domisiliPic" 
                    v-model="form.domisiliPic" 
                    type="text" 
                    placeholder="Contoh: Blitar / Surabaya / Malang / Kediri" 
                    required 
                  />
                </div>
              </div>

              <!-- TANGGAL LAHIR PIC (OPSIONAL & OTOMATIS HITUNG UMUR) -->
              <div class="form-group">
                <div class="label-with-badge">
                  <label for="tanggalLahirPic">Tanggal Lahir PIC</label>
                  <span v-if="picAgeInfo" class="age-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="badge-svg-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>Umur: <strong>{{ picAgeInfo.age }} Tahun</strong> ({{ picAgeInfo.category }})</span>
                  </span>
                  <span v-else class="optional-tag">Opsional</span>
                </div>
                <AppDatePicker 
                  v-model="form.tanggalLahirPic" 
                  size="lg"
                  placeholder="Pilih Tanggal Lahir PIC..." 
                />
                <span class="input-hint">
                  Umur dihitung otomatis saat tanggal lahir diisi. Digunakan untuk promo & benefit hari ulang tahun.
                </span>
              </div>

              <!-- JUMLAH ROMBONGAN (OPSIONAL) -->
              <div class="form-group">
                <div class="label-with-badge">
                  <label for="jumlahRombongan">Jumlah Rombongan</label>
                  <span class="optional-tag">Opsional</span>
                </div>
                <div class="input-wrapper">
                  <input 
                    id="jumlahRombongan" 
                    v-model.number="form.jumlahRombongan" 
                    type="number" 
                    min="1" 
                    placeholder="Contoh: 5 (menghasilkan 5 data anggota)" 
                  />
                </div>
                <span class="input-hint">
                  Inputan ini berfungsi untuk menyiapkan data anggota rombongan di halaman selanjutnya (jika tidak diisi, default 1 data).
                </span>
              </div>

              <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

              <button type="submit" class="submit-button">
                <span>Lanjut ke Data Diri (Step 2)</span>
                <span class="button-arrow">→</span>
              </button>

            </form>
          </template>


          <!-- =================================================
               HALAMAN 2 (STEP 2): SINGLE CARD (NEXT-NEXT UX)
          ================================================== -->
          <template v-else-if="step === 'members'">
            
            <!-- HEADER WITH REKAP DATA BUTTON IN TOP RIGHT -->
            <div class="single-card-header-row">
              <div class="sch-left">
                <h2 class="card-main-title">Data Diri</h2>
                <p class="card-main-subtitle">
                  Lengkapi data diri untuk mencatat kunjungan Anda di Kampung Coklat.
                </p>
              </div>

              <!-- BUTTON "LIHAT REKAP DATA" IN TOP RIGHT OF CARD -->
              <button 
                type="button" 
                class="btn-rekap-top" 
                @click="isRekapModalOpen = true"
                title="Lihat Rekap Data yang Tersimpan"
              >
                <div class="brt-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <line x1="9" y1="12" x2="15" y2="12"></line>
                    <line x1="9" y1="16" x2="13" y2="16"></line>
                  </svg>
                </div>
                <div class="brt-text">
                  <span>Lihat Rekap Data</span>
                  <small>{{ memberList.filter(m => m.isSaved).length }} / {{ memberList.length }} Tersimpan</small>
                </div>
              </button>
            </div>

            <!-- MEMBER COUNTER -->
            <div class="member-nav-pills">
              <div class="mn-info">
                <span class="mn-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="badge-crown-svg"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span>{{ memberList[currentIndex]?.isPic ? 'PIC UTAMA' : `ANGGOTA #${currentIndex + 1}` }}</span>
                </span>
                <span class="mn-count">Data ke-<strong>{{ currentIndex + 1 }}</strong> dari {{ memberList.length }} Orang</span>
              </div>
            </div>

            <!-- FORM SINGLE CARD -->
            <div class="single-member-form">
              
              <!-- NAMA LENGKAP -->
              <div class="form-group">
                <label>Nama Lengkap <span class="required-star">*</span></label>
                <div class="input-wrapper">
                  <input 
                    v-model="currentCardForm.nama" 
                    type="text" 
                    placeholder="Masukkan nama lengkap" 
                    required 
                  />
                </div>
              </div>

              <!-- NOMOR WHATSAPP -->
              <div class="form-group">
                <label>Nomor WhatsApp</label>
                <div class="input-wrapper">
                  <input 
                    v-model="currentCardForm.whatsapp" 
                    type="tel" 
                    placeholder="08xxxxxxxxxx" 
                  />
                </div>
                <span class="input-hint">Nomor WhatsApp digunakan untuk verifikasi & voucher.</span>
              </div>

              <!-- DOMISILI -->
              <div class="form-group">
                <label>Domisili</label>
                <div class="input-wrapper">
                  <input 
                    v-model="currentCardForm.domisili" 
                    type="text" 
                    placeholder="Contoh: Blitar / Malang / Kediri" 
                  />
                </div>
              </div>

              <!-- TANGGAL LAHIR -->
              <div class="form-group">
                <label>Tanggal Lahir</label>
                <AppDatePicker 
                  v-model="currentCardForm.tanggalLahir" 
                  size="lg"
                  placeholder="Pilih Tanggal Lahir..." 
                />
                <span class="input-hint">Opsional: Dapatkan voucher promo & reward di hari ulang tahun Anda.</span>
              </div>

              <!-- ACTION BUTTON: SELANJUTNYA (OTOMATIS SIMPAN & LANJUT/TAMBAH) -->
              <div class="card-action-bar-single">
                <button 
                  type="button" 
                  class="btn-act-next-main" 
                  @click="handleNextCard"
                >
                  <span>Selanjutnya</span>
                  <span class="btn-arrow-icon">→</span>
                </button>
              </div>

              <!-- BOTTOM FINISH BAR (MEMUNCULKAN MODAL REKAP DATA) -->
              <div class="card-bottom-finish">
                <button type="button" class="btn-back-step1" @click="step = 'event'">
                  ← Ubah Info Kunjungan
                </button>

                <button 
                  type="button" 
                  class="btn-submit-final" 
                  :disabled="isLoading || memberList.length === 0"
                  @click="handleOpenRekapSubmit"
                >
                  <span>
                    {{ `Selesai & Kirim ke Server (${memberList.length} Orang) →` }}
                  </span>
                </button>
              </div>

              <p class="privacy-note">
                Data yang Anda berikan digunakan untuk pencatatan kunjungan dan kebutuhan layanan Kampung Coklat.
              </p>

            </div>

          </template>


          <!-- =================================================
               HALAMAN 3 (STEP 3): STATUS PENYIMPANAN SERVER
          ================================================== -->
          <template v-else-if="step === 'success'">
            <div class="success-state">

              <div class="success-circle">
                ✓
              </div>

              <span class="success-label">REGISTRASI BERHASIL</span>

              <h2>Data Kunjungan Berhasil Disimpan ke Server!</h2>

              <p>
                Terima kasih, data kunjungan rombongan Anda di <strong>Kampung Coklat Blitar</strong> telah resmi tercatat di database.
              </p>

              <!-- BOOKING RECEIPT SUMMARY (ID DISEMBUNYIKAN UNTUK INTERNAL) -->
              <div class="booking-receipt-card">
                <div class="br-header">
                  <div class="br-header-left">
                    <div class="br-icon-info">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div>
                      <span class="br-label">Ringkasan Kunjungan</span>
                      <h3 class="br-title">{{ savedRecord?.namaAcara || form.namaAcara }}</h3>
                    </div>
                  </div>
                  <div class="br-status-pill">
                    ● Tersimpan di Server
                  </div>
                </div>

                <div class="br-divider"></div>

                <!-- DETAILS LIST -->
                <div class="br-details-grid">
                  <div class="br-col">
                    <span class="br-item-label">Nama Acara / Rombongan:</span>
                    <strong class="br-item-val">{{ savedRecord?.namaAcara || form.namaAcara }}</strong>
                  </div>

                  <div class="br-col">
                    <span class="br-item-label">Tujuan Kunjungan:</span>
                    <strong class="br-item-val" style="text-transform: capitalize;">{{ savedRecord?.tipeKunjungan || form.tipeKunjungan }}</strong>
                  </div>

                  <div class="br-col">
                    <span class="br-item-label">Tanggal Kunjungan:</span>
                    <strong class="br-item-val">{{ savedRecord?.tanggalKunjungan || form.tanggalKunjungan }}</strong>
                  </div>

                  <div class="br-col">
                    <span class="br-item-label">PIC Rombongan:</span>
                    <strong class="br-item-val">{{ savedRecord?.nama || form.namaPic }} ({{ form.whatsappPic }})</strong>
                  </div>

                  <div class="br-col">
                    <span class="br-item-label">Domisili:</span>
                    <strong class="br-item-val">{{ savedRecord?.domisili || form.domisiliPic }}</strong>
                  </div>

                  <div class="br-col">
                    <span class="br-item-label">Total Anggota Terdaftar:</span>
                    <strong class="br-item-val text-amber-highlight">{{ memberList.length }} Orang</strong>
                  </div>
                </div>

                <!-- MEMBERS LIST PREVIEW -->
                <div class="registered-members-box">
                  <span class="rm-title">Daftar Anggota Rombongan ({{ memberList.length }}):</span>
                  <div class="rm-tags-wrap">
                    <div 
                      v-for="(m, idx) in memberList" 
                      :key="m.id" 
                      class="rm-tag"
                    >
                      <span class="rm-num">{{ idx + 1 }}</span>
                      <span class="rm-name">{{ m.nama }}</span>
                      <small v-if="m.domisili" class="rm-city">({{ m.domisili }})</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ACTION BUTTONS: HANYA KEMBALI KE BERANDA (RESET KE /guestbook) -->
              <div class="success-actions-row">
                <button type="button" class="btn-action-home-main" @click="resetForm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Kembali ke Beranda</span>
                </button>
              </div>

            </div>
          </template>

        </div>

      </div>
    </section>


    <!-- =====================================================
         MODAL REKAP DATA (LAYOUT SESUAI SCREENSHOT)
    ====================================================== -->
    <Transition name="modal-fade">
      <div v-if="isRekapModalOpen" class="modal-backdrop" @click="isRekapModalOpen = false">
        <div class="modal-dialog-rekap" @click.stop>

          <!-- MODAL HEADER -->
          <div class="modal-rekap-header">
            <div class="mrh-left">
              <div class="mrh-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 class="mrh-title">Detail Acara: {{ form.namaAcara || 'Rombongan' }}</h3>
                <p class="mrh-sub">
                  {{ form.tanggalKunjungan }} | {{ memberList.length }} Peserta
                </p>
              </div>
            </div>

            <div class="mrh-right">
              <!-- TOMBOL "TAMBAH DATA" DI BAGIAN ATAS MODAL -->
              <button type="button" class="btn-modal-add" @click="addNewMember">
                + Tambah Data
              </button>

              <!-- CLOSE BUTTON (X) -->
              <button type="button" class="btn-modal-close" @click="isRekapModalOpen = false" title="Tutup Modal">
                ✕
              </button>
            </div>
          </div>

          <!-- MODAL TABLE -->
          <div class="modal-table-wrap">
            <table class="rekap-table">
              <thead>
                <tr>
                  <th style="width: 40px;"><input type="checkbox" checked disabled /></th>
                  <th>NAMA LENGKAP</th>
                  <th>WHATSAPP</th>
                  <th>DOMISILI</th>
                  <th>USIA</th>
                  <th>STATUS</th>
                  <th style="text-align: right; width: 140px;">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(m, idx) in memberList" :key="m.id" :class="{ 'row-active': idx === currentIndex }">
                  <td>
                    <input type="checkbox" :checked="m.isSaved" />
                  </td>
                  <td>
                    <div class="table-name-cell">
                      <strong>{{ m.nama || `(Anggota #${idx + 1} - Belum diisi)` }}</strong>
                      <span v-if="m.isPic" class="badge-pic-table">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>PIC Utama</span>
                      </span>
                    </div>
                  </td>
                  <td class="table-mono">{{ m.whatsapp || '-' }}</td>
                  <td class="table-caps">{{ m.domisili || '-' }}</td>
                  <td class="table-age-val">{{ calculateAge(m.tanggalLahir) }}</td>
                  <td>
                    <span v-if="m.isSaved" class="badge-status-saved">
                      Tersimpan
                    </span>
                    <span v-else class="badge-status-pending">
                      Belum Disimpan
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div class="table-action-btns">
                      <!-- EDIT BUTTON -->
                      <button 
                        type="button" 
                        class="btn-tbl-edit" 
                        @click="editMemberFromModal(idx)" 
                        title="Edit Data Ini"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Edit</span>
                      </button>

                      <!-- DELETE BUTTON -->
                      <button 
                        type="button" 
                        class="btn-tbl-delete" 
                        @click="deleteMemberFromModal(idx)" 
                        title="Hapus Data Ini"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- MODAL FOOTER -->
          <div class="modal-rekap-footer">
            <span class="mrf-count">
              Total <strong>{{ memberList.length }}</strong> Anggota ({{ memberList.filter(m => m.isSaved).length }} Tersimpan)
            </span>

            <div class="mrf-actions">
              <button type="button" class="btn-mrf-close" @click="isRekapModalOpen = false">
                Tutup Rekap
              </button>
              <button type="button" class="btn-mrf-submit" @click="handleFinalSubmit">
                Kirim Semua Data ke Server →
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>


    <!-- =====================================================
         POPUP TOAST (SAVED IN MEMORY)
    ====================================================== -->
    <Transition name="toast-fade">
      <div v-if="memoryToast.show" class="memory-toast-overlay" @click="memoryToast.show = false">
        <div class="memory-toast-card" @click.stop>
          <div class="toast-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="toast-body">
            <h4>{{ memoryToast.title }}</h4>
            <p>{{ memoryToast.message }}</p>
          </div>
          <button class="toast-close-btn" @click="memoryToast.show = false">✕</button>
        </div>
      </div>
    </Transition>


    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">Kampung Coklat Blitar</div>
          <p>Destinasi wisata edukasi dan pengalaman cokelat keluarga di Blitar, Jawa Timur.</p>
        </div>
        <div class="footer-copy">
          © {{ new Date().getFullYear() }} Kampung Coklat. All rights reserved.
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* =========================================================
   BASE STYLES
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
  position: relative;
}

.section-container {
  width: min(1400px, calc(100% - 80px));
  margin: 0 auto;
}

/* =========================================================
   HERO
========================================================= */
.hero {
  height: 480px;
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
  background: linear-gradient(
    180deg,
    rgba(37, 20, 13, 0.78) 0%,
    rgba(48, 27, 19, 0.62) 50%,
    rgba(40, 22, 16, 0.88) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: min(900px, 92%);
  text-align: center;
  color: white;
  padding-bottom: 35px;
}

.brand-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #f49a24;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 5px;
  margin-bottom: 18px;
}

.brand-line {
  width: 50px;
  height: 2px;
  background: #f49a24;
  opacity: 0.7;
}

.hero h1 {
  color: white;
  font-size: clamp(38px, 4.5vw, 62px);
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin: 0;
  font-weight: 500;
}

.hero h1 strong {
  display: block;
  color: #f59b24;
  font-weight: 800;
}

.hero-content p {
  max-width: 650px;
  margin: 18px auto 0;
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.92);
}

.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 85px;
  z-index: 3;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* =========================================================
   FORM CONTAINER & CARD
========================================================= */
.form-section {
  background: #fffaf5;
  padding-bottom: 110px;
}

.form-container {
  width: min(650px, calc(100% - 32px));
  margin: -110px auto 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.guestbook-card {
  width: 100%;
  background: white;
  border: 1px solid rgba(62, 36, 25, 0.08);
  border-radius: 28px;
  padding: 44px 46px 50px;
  box-shadow:
    0 30px 80px rgba(48, 28, 20, 0.12),
    0 10px 25px rgba(48, 28, 20, 0.05);
}

/* =========================================================
   STEP INDICATOR
========================================================= */
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.step span {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f1ec;
  border: 1px solid #e8ddd5;
  color: #a28d82;
  font-size: 16px;
  font-weight: 800;
  transition: all 0.3s ease;
}

.step small {
  color: #8b7569;
  font-size: 13px;
  font-weight: 700;
  max-width: 110px;
  line-height: 1.25;
}

.step.active span {
  background: #f39421;
  color: white;
  border-color: #f39421;
  box-shadow: 0 8px 20px rgba(243, 148, 33, 0.35);
}

.step.completed span {
  background: #3b231a;
  color: white;
}

.step-connector {
  width: 65px;
  height: 3px;
  background: #eadfd7;
  margin: 0 10px 20px;
  transition: all 0.3s ease;
}

.step-connector.active {
  background: #f39421;
}

/* =========================================================
   FORM HEADING & INPUTS
========================================================= */
.form-heading {
  text-align: center;
  margin-bottom: 28px;
}

.form-heading h2 {
  color: #351f17;
  margin: 0;
  font-size: 32px;
  font-weight: 800;
}

.form-heading p {
  max-width: 520px;
  margin: 10px auto 0;
  color: #8d7b72;
  font-size: 15.5px;
  line-height: 1.6;
}

.guest-form, .single-member-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label {
  color: #351f17;
  font-size: 15px;
  font-weight: 700;
}

.required-star {
  color: #e53e3e;
  margin-left: 2px;
}

.label-with-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.age-badge {
  background: #fef3c7;
  color: #92400e;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  border: 1px solid #fde68a;
}

.optional-tag {
  background: #f1f5f9;
  color: #64748b;
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  border: 1.5px solid #e4dad3;
  border-radius: 12px;
  background: white;
  color: #352017;
  font-size: 15.5px;
  font-family: inherit;
  outline: none;
  transition: 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #b7aaa3;
}

.input-wrapper input:focus {
  border-color: #f39421;
  box-shadow: 0 0 0 3px rgba(243, 148, 33, 0.15);
}

.input-hint {
  font-size: 12.5px;
  color: #8f7d74;
  line-height: 1.4;
}

.form-section-divider {
  display: flex;
  align-items: center;
  margin: 12px 0 4px;
}

.form-section-divider span {
  font-size: 13.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #c05621;
  background: #fffaf0;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px dashed #fbd38d;
}

/* =========================================================
   BUTTONS
========================================================= */
.submit-button {
  height: 54px;
  width: 100%;
  border: none;
  border-radius: 12px;
  background: #351f17;
  color: white;
  font-size: 16.5px;
  font-weight: 800;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.25s ease;
  margin-top: 8px;
}

.submit-button:hover:not(:disabled) {
  background: #4a291e;
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(53, 31, 23, 0.25);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-arrow {
  color: #f49a24;
  font-size: 20px;
}

/* =========================================================
   VISIT TYPE RADIO CARDS
========================================================= */
.visit-type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.visit-type-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 14px;
  border: 2px solid transparent;
  border-radius: 14px;
  background: #2a1a14;
  cursor: pointer;
  transition: all 0.25s ease;
  min-height: 110px;
  overflow: hidden;
}

.visit-type-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(3px) brightness(0.55);
  transition: all 0.3s ease;
  z-index: 0;
}

.pengajian-card::before { background-image: url('~/assets/assets_POS/pengajian.png'); }
.hall-card::before { background-image: url('~/assets/assets_POS/hall.jpg'); }
.b2b-card::before { background-image: url('~/assets/assets_POS/b2b.png'); }

.visit-type-card:hover {
  border-color: #f39421;
  transform: translateY(-2px);
}

.visit-type-card.selected {
  border-color: #f39421;
  box-shadow: 0 8px 20px rgba(243, 148, 33, 0.3);
}

.visit-type-card.selected::before {
  filter: blur(0px) brightness(0.7);
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
  gap: 4px;
  padding-right: 18px;
}

.visit-type-content strong {
  color: white;
  font-size: 14.5px;
  font-weight: 800;
}

.visit-type-content span {
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  line-height: 1.35;
}

.visit-type-check {
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  color: transparent;
  font-size: 10px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.visit-type-card.selected .visit-type-check {
  background: #f39421;
  border-color: #f39421;
  color: white;
}

/* =========================================================
   STEP 2: SINGLE CARD HEADER WITH "LIHAT REKAP DATA"
========================================================= */
.single-card-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
  padding-bottom: 18px;
  border-bottom: 1.5px solid #f1e9e3;
}

.card-main-title {
  font-size: 34px;
  font-weight: 900;
  color: #351f17;
  margin: 0;
  letter-spacing: -0.5px;
}

.card-main-subtitle {
  font-size: 14.5px;
  color: #8d7b72;
  margin: 6px 0 0;
  max-width: 320px;
  line-height: 1.5;
}

.btn-rekap-top {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff8f0;
  border: 1.5px solid #fbd38d;
  padding: 8px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  text-align: left;
}

.btn-rekap-top:hover {
  background: #fef3c7;
  border-color: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
}

.brt-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #f59e0b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brt-text span {
  display: block;
  font-size: 13.5px;
  font-weight: 800;
  color: #78350f;
}

.brt-text small {
  display: block;
  font-size: 11.5px;
  font-weight: 600;
  color: #b45309;
}

/* MEMBER PAGINATION PILLS */
.member-nav-pills {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: #faf7f4;
  padding: 10px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #eee4dd;
}

.mn-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mn-badge {
  background: #f59e0b;
  color: #27130b;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.mn-count {
  font-size: 13.5px;
  color: #5c3c2e;
}

.mn-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mn-dot-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  border: 1.5px solid #d7c4b7;
  color: #5c3c2e;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.mn-dot-btn.saved {
  border-color: #86efac;
  background: #f0fdf4;
  color: #166534;
}

.mn-dot-btn.active {
  background: #351f17;
  border-color: #351f17;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(53, 31, 23, 0.25);
}

.mn-add-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fef3c7;
  border: 1.5px dashed #f59e0b;
  color: #b45309;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.mn-add-btn:hover {
  background: #f59e0b;
  color: white;
  border-style: solid;
}

/* CARD ACTION BUTTON (SELANJUTNYA - AUTO SAVE) */
.card-action-bar-single {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

.btn-act-prev {
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  color: #475569;
  height: 54px;
  padding: 0 20px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
  white-space: nowrap;
}

.btn-act-prev:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.btn-act-next-main {
  flex: 1;
  background: #351f17;
  color: white;
  border: none;
  height: 54px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: 0.25s ease;
  box-shadow: 0 8px 20px rgba(53, 31, 23, 0.18);
}

.btn-act-next-main:hover {
  background: #4a291e;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(53, 31, 23, 0.25);
}

.btn-arrow-icon {
  color: #f49a24;
  font-size: 20px;
  transition: transform 0.2s ease;
}

.btn-act-next-main:hover .btn-arrow-icon {
  transform: translateX(3px);
}

/* BOTTOM FINISH BAR */
.card-bottom-finish {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding-top: 18px;
  border-top: 1px dashed #e8ddd5;
}

.btn-back-step1 {
  background: transparent;
  border: none;
  color: #8d7b72;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  padding: 6px 0;
}

.btn-back-step1:hover {
  color: #351f17;
  text-decoration: underline;
}

.btn-submit-final {
  background: #f59e0b;
  color: #27130b;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-submit-final:hover:not(:disabled) {
  background: #d97706;
  color: white;
  transform: translateY(-1px);
}

.privacy-note {
  text-align: center;
  font-size: 13px;
  color: #a79a93;
  line-height: 1.6;
  margin: 12px 0 0;
}

/* =========================================================
   MODAL REKAP DATA (LAYOUT SESUAI SCREENSHOT)
========================================================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(30, 18, 13, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
}

.modal-dialog-rekap {
  background: #ffffff;
  border-radius: 20px;
  width: min(880px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: modalScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* MODAL HEADER */
.modal-rekap-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #ffffff;
  border-bottom: 1px solid #f1e9e3;
}

.mrh-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.mrh-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #fff8f0;
  border: 1.5px solid #fed7aa;
  color: #5b21b6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mrh-title {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #1e1b18;
}

.mrh-sub {
  margin: 4px 0 0;
  font-size: 13.5px;
  color: #78716c;
  font-weight: 600;
}

.mrh-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-modal-add {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f59e0b;
  color: #27130b;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-modal-add:hover {
  background: #d97706;
  color: white;
}

.btn-modal-close {
  background: #f5f5f4;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #57534e;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.btn-modal-close:hover {
  background: #fee2e2;
  color: #dc2626;
}

/* MODAL TABLE */
.modal-table-wrap {
  overflow-y: auto;
  padding: 8px 24px;
  max-height: 52vh;
}

.rekap-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.rekap-table th {
  padding: 14px 12px;
  font-size: 12px;
  font-weight: 800;
  color: #8b7569;
  letter-spacing: 0.6px;
  border-bottom: 2px solid #f5ede6;
}

.rekap-table td {
  padding: 14px 12px;
  font-size: 14px;
  color: #2e1810;
  border-bottom: 1px solid #f8f2ec;
  vertical-align: middle;
}

.rekap-table tr:hover td {
  background: #fffdfa;
}

.rekap-table tr.row-active td {
  background: #fefcf9;
}

.table-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge-pic-table {
  background: #fef3c7;
  color: #b45309;
  border: 1px solid #fde68a;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
}

.table-mono {
  font-family: inherit;
  font-weight: 700;
  color: #1e293b;
}

.table-caps {
  text-transform: uppercase;
  font-size: 13px;
  color: #475569;
}

.table-age-val {
  font-weight: 700;
  color: #475569;
  font-size: 13.5px;
}

.badge-status-saved {
  background: #dcfce7;
  color: #15803d;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
}

.badge-status-pending {
  background: #fef3c7;
  color: #b45309;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
}

.table-action-btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.btn-tbl-edit {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.15s ease;
}

.btn-tbl-edit:hover {
  background: #e2e8f0;
  color: #0f172a;
}

.btn-tbl-delete {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.15s ease;
}

.btn-tbl-delete:hover {
  background: #fecaca;
}

/* MODAL FOOTER */
.modal-rekap-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #faf7f4;
  border-top: 1px solid #f1e9e3;
}

.mrf-count {
  font-size: 13.5px;
  color: #5c3c2e;
}

.mrf-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-mrf-close {
  background: white;
  border: 1px solid #d7c4b7;
  color: #5c3c2e;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
}

.btn-mrf-submit {
  background: #16a34a;
  color: white;
  border: none;
  padding: 9px 18px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-mrf-submit:hover {
  background: #15803d;
}

/* =========================================================
   POPUP TOAST (SAVED IN MEMORY)
========================================================= */
.memory-toast-overlay {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100000;
}

.memory-toast-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border: 1.5px solid #86efac;
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 14px 34px rgba(22, 101, 52, 0.16);
  max-width: 400px;
}

.toast-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-body h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: #15803d;
}

.toast-body p {
  margin: 3px 0 0;
  font-size: 12.5px;
  color: #374151;
  line-height: 1.35;
}

.toast-close-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 15px;
  cursor: pointer;
  align-self: flex-start;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.95);
}

/* =========================================================
   STEP 3: STATUS PENYIMPANAN
========================================================= */
.success-state {
  text-align: center;
}

.success-circle {
  width: 86px;
  height: 86px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #16a34a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 900;
  box-shadow: 0 14px 32px rgba(22, 163, 74, 0.3);
}

.success-label {
  color: #15803d;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 2.5px;
}

.success-state h2 {
  font-size: 32px;
  margin: 10px 0;
  color: #27130b;
}

.success-state > p {
  font-size: 16.5px;
  color: #715b51;
  max-width: 540px;
  margin: 0 auto 30px;
  line-height: 1.65;
}

.booking-receipt-card {
  background: #fffdfa;
  border: 1.5px solid #eedfce;
  border-radius: 20px;
  padding: 26px 28px;
  text-align: left;
  margin-bottom: 28px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
}

.br-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.br-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.br-icon-info {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fff8f0;
  border: 1.5px solid #fed7aa;
  color: #ea580c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.br-label {
  font-size: 12px;
  font-weight: 700;
  color: #9a6b57;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.br-title {
  margin: 3px 0 0;
  font-size: 20px;
  font-weight: 900;
  color: #27130b;
}

.br-status-pill {
  background: #dcfce7;
  color: #15803d;
  font-size: 12.5px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #bbf7d0;
  flex-shrink: 0;
}

.br-divider {
  height: 1px;
  background: #eedfce;
  margin: 20px 0;
}

.br-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.br-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.br-item-label {
  font-size: 12px;
  font-weight: 700;
  color: #9a6b57;
}

.br-item-val {
  font-size: 15px;
  color: #27130b;
}

.text-amber-highlight {
  color: #d97706;
}

.registered-members-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
}

.rm-title {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #475569;
  margin-bottom: 10px;
}

.rm-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rm-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid #cbd5e1;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 13px;
}

.rm-num {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f39421;
  color: white;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rm-name {
  font-weight: 700;
  color: #1e293b;
}

.rm-city {
  color: #64748b;
}

.badge-svg-icon {
  margin-right: 2px;
  vertical-align: -1px;
}

.badge-crown-svg {
  margin-right: 3px;
  vertical-align: -1px;
}

/* SUCCESS ACTIONS */
.success-actions-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.btn-action-home-main {
  background: #351f17;
  color: white;
  border: none;
  padding: 16px 36px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s ease;
  box-shadow: 0 10px 24px rgba(53, 31, 23, 0.2);
  width: 100%;
  max-width: 360px;
}

.btn-action-home-main:hover {
  background: #4a291e;
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(53, 31, 23, 0.28);
}

/* =========================================================
   BENEFIT / MEMBERSHIP SECTION
========================================================= */
.benefit-section {
  background: linear-gradient(180deg, #f6f1ec 0%, #fffaf5 100%);
  padding: 110px 0;
  position: relative;
}

.section-heading {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.section-label {
  display: inline-block;
  color: #ed8d1d;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.section-heading h2 {
  color: #2f1a12;
  font-size: clamp(38px, 4vw, 56px);
  line-height: 1.1;
  margin: 0;
  font-weight: 800;
}

.section-heading h2 span {
  color: #e79022;
}

.section-heading p {
  margin: 18px auto 0;
  font-size: 18px;
  line-height: 1.7;
  color: #7a685f;
}

.membership-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.membership-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(58, 34, 23, 0.08);
  border-radius: 22px;
  padding: 30px;
  transition: 0.3s ease;
  box-shadow: 0 10px 30px rgba(46, 24, 16, 0.05);
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
  transform: translateY(-6px);
  box-shadow: 0 20px 45px rgba(46, 24, 16, 0.1);
}

.featured-card {
  background: linear-gradient(145deg, #2f1710, #4a2416);
  color: white;
  transform: translateY(-4px);
}

.featured-card::before {
  background: #ffb347;
}

.popular-badge {
  position: absolute;
  top: 16px;
  right: 18px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f39a27;
  color: #2f1710;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.membership-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.membership-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #fff2df;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.dark-icon {
  background: rgba(255, 255, 255, 0.12);
}

.membership-code {
  color: #321d16;
  font-size: 32px;
  font-weight: 900;
}

.featured-card .membership-code {
  color: white;
}

.membership-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.membership-card h3 {
  font-size: 22px;
  margin: 0;
  color: #2f1a12;
  font-weight: 800;
}

.featured-card h3 {
  color: white;
}

.membership-tag {
  background: #fff3df;
  color: #df8618;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 10.5px;
  font-weight: 900;
}

.dark-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #ffc46d;
}

.card-subtitle {
  font-size: 14.5px;
  line-height: 1.55;
  color: #8b7a72;
  margin: 0;
  min-height: 44px;
}

.featured-card .card-subtitle {
  color: rgba(255, 255, 255, 0.75);
}

.card-divider {
  width: 100%;
  height: 1px;
  background: #eee4dd;
  margin: 18px 0;
}

.featured-card .card-divider {
  background: rgba(255, 255, 255, 0.12);
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #5b463d;
}

.featured-card .card-list li {
  color: rgba(255, 255, 255, 0.88);
}

.check-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff2df;
  color: #e79022;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 900;
}

.featured-card .check-icon {
  background: rgba(255, 255, 255, 0.15);
  color: #ffc56c;
}

/* =========================================================
   FOOTER
========================================================= */
.footer {
  background: #281711;
  color: white;
  padding: 40px 0;
}

.footer-inner {
  width: min(1400px, calc(100% - 80px));
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.footer-logo {
  color: #f39a27;
  font-size: 20px;
  font-weight: 800;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
  margin-top: 6px;
}

.footer-copy {
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
}

/* =========================================================
   RESPONSIVE DESIGN
========================================================= */
@media (max-width: 900px) {
  .membership-grid {
    grid-template-columns: 1fr;
  }
  .visit-type-grid {
    grid-template-columns: 1fr;
  }
  .br-details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .hero {
    height: 420px;
  }
  .guestbook-card {
    padding: 30px 20px;
  }
  .step-connector {
    width: 25px;
    margin: 0 4px 18px;
  }
  .step span {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
  .step small {
    font-size: 11px;
    max-width: 80px;
  }
  .single-card-header-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-rekap-top {
    width: 100%;
    justify-content: space-between;
  }
  .card-action-bar {
    grid-template-columns: 1fr;
  }
  .nav-next-group {
    grid-column: span 1;
  }
  .modal-rekap-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .mrh-right {
    width: 100%;
    justify-content: space-between;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>