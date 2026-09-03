export type GuestBookVisitType =
  | 'pengajian'
  | 'hall'
  | 'b2b'
  | 'reguler'
  | 'edukasi'
  | 'PP'
  | 'PR'
  | 'PT'

export interface GuestBookMember {
  id?: string | number
  nama: string
  whatsapp: string
  domisili: string
}

export interface GuestBookPayload {
  nama: string
  whatsapp: string
  domisili: string
  tipeKunjungan: GuestBookVisitType
  namaAcara: string
  tanggalKunjungan: string
  tanggalLahir?: string
  jumlahRombongan?: number
  anggota?: GuestBookMember[]
  bookingCode?: string
}

export interface GuestBookRecord extends GuestBookPayload {
  id: number
  status: 'terdaftar' | 'terverifikasi'
  umur?: number
  kategoriUmur?: string
  totalSpend?: number
  createdAt?: string
}

export const defaultGuestBookEntries: GuestBookRecord[] = [
  {
    id: 1,
    nama: 'Callista Danis',
    whatsapp: '+628123456789',
    domisili: 'Blitar',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Pengajian Akbar Ahad Pagi',
    tanggalKunjungan: '12 Oktober 2022',
    tanggalLahir: '1972-04-12',
    umur: 54,
    kategoriUmur: 'Lansia'
  },
  {
    id: 2,
    nama: 'Budi Santoso',
    whatsapp: '+6285711223344',
    domisili: 'Kediri',
    tipeKunjungan: 'hall',
    status: 'terdaftar',
    namaAcara: 'Reuni SMA 1 Kediri',
    tanggalKunjungan: '18 Januari 2023',
    tanggalLahir: '1988-11-20',
    umur: 38,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 3,
    nama: 'Siti Khadijah',
    whatsapp: '+6281999887766',
    domisili: 'Malang',
    tipeKunjungan: 'b2b',
    status: 'terverifikasi',
    namaAcara: 'Studi Banding UMKM Malang',
    tanggalKunjungan: '03 Maret 2023',
    tanggalLahir: '1998-06-15',
    umur: 28,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 4,
    nama: 'Rizky Maulana',
    whatsapp: '+6282255512345',
    domisili: 'Surabaya',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Kunjungan Majelis Taklim Surabaya',
    tanggalKunjungan: '20 April 2023',
    tanggalLahir: '2004-09-08',
    umur: 22,
    kategoriUmur: 'Remaja'
  },
  {
    id: 5,
    nama: 'Nadia Putri',
    whatsapp: '+6281334567890',
    domisili: 'Tulungagung',
    tipeKunjungan: 'hall',
    status: 'terdaftar',
    namaAcara: 'Gathering Keluarga Besar Bapak Harun',
    tanggalKunjungan: '11 Mei 2023',
    tanggalLahir: '1990-12-03',
    umur: 36,
    kategoriUmur: 'Dewasa'
  },
  {
    id: 6,
    nama: 'Fajar Hidayat',
    whatsapp: '+6285788812345',
    domisili: 'Kediri',
    tipeKunjungan: 'pengajian',
    status: 'terdaftar',
    namaAcara: 'Pengajian Rutin Muslimat NU',
    tanggalKunjungan: '09 Juni 2023',
    tanggalLahir: '1969-01-25',
    umur: 57,
    kategoriUmur: 'Lansia'
  },
  {
    id: 7,
    nama: 'Aulia Rahma',
    whatsapp: '+6281239988776',
    domisili: 'Blitar',
    tipeKunjungan: 'b2b',
    status: 'terdaftar',
    namaAcara: 'Kunjungan Industri SMK 1 Blitar',
    tanggalKunjungan: '21 Juli 2023',
    tanggalLahir: '2008-08-10',
    umur: 18,
    kategoriUmur: 'Remaja'
  },
  {
    id: 8,
    nama: 'Dimas Pratama',
    whatsapp: '+6282145678901',
    domisili: 'Malang',
    tipeKunjungan: 'pengajian',
    status: 'terverifikasi',
    namaAcara: 'Rombongan Pengajian Masjid Al-Huda',
    tanggalKunjungan: '14 Agustus 2023',
    tanggalLahir: '1975-03-14',
    umur: 51,
    kategoriUmur: 'Lansia'
  }
]

export const useGuestBookApi = () => {
  const records = useState<GuestBookRecord[]>('crm_guestbook_records', () => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('kc_guestbook_records')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed
          }
        }
      } catch {}
    }
    return defaultGuestBookEntries
  })

  // Synchronize on client load
  if (process.client) {
    try {
      const stored = localStorage.getItem('kc_guestbook_records')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          records.value = parsed
        }
      } else {
        localStorage.setItem('kc_guestbook_records', JSON.stringify(records.value))
      }
    } catch {}
  }

  const calculateAgeAndCategory = (birthDateStr?: string): { umur?: number; kategoriUmur?: string } => {
    if (!birthDateStr) return { umur: 32, kategoriUmur: 'Dewasa' }
    const birthDate = new Date(birthDateStr)
    if (isNaN(birthDate.getTime())) return { umur: 32, kategoriUmur: 'Dewasa' }
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    let category = 'Dewasa'
    if (age >= 50) category = 'Lansia'
    else if (age >= 25) category = 'Dewasa'
    else if (age >= 13) category = 'Remaja'
    else category = 'Anak-anak'
    return { umur: age, kategoriUmur: category }
  }

  const formatDisplayDate = (dateStr?: string): string => {
    if (!dateStr) {
      return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const formatWhatsapp = (phone: string): string => {
    if (!phone) return ''
    let clean = phone.replace(/[^0-9]/g, '')
    if (clean.startsWith('0')) clean = '62' + clean.slice(1)
    else if (clean.startsWith('8')) clean = '62' + clean
    if (!clean.startsWith('+')) clean = '+' + clean
    return clean
  }

  // =====================================================
  // ADD GUESTBOOK RECORD
  // =====================================================
  const addGuestBookRecord = (payload: GuestBookPayload): GuestBookRecord => {
    const ageInfo = calculateAgeAndCategory(payload.tanggalLahir)
    const newRecord: GuestBookRecord = {
      id: Date.now(),
      nama: payload.nama,
      whatsapp: formatWhatsapp(payload.whatsapp),
      domisili: payload.domisili,
      tipeKunjungan: payload.tipeKunjungan,
      status: 'terdaftar',
      namaAcara: payload.namaAcara,
      tanggalKunjungan: formatDisplayDate(payload.tanggalKunjungan),
      tanggalLahir: payload.tanggalLahir || '',
      umur: ageInfo.umur,
      kategoriUmur: ageInfo.kategoriUmur,
      jumlahRombongan: payload.jumlahRombongan || (payload.anggota ? payload.anggota.length : 1),
      anggota: payload.anggota || [],
      bookingCode: payload.bookingCode || `KC-GB-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString()
    }

    records.value = [newRecord, ...records.value]

    if (process.client) {
      try {
        localStorage.setItem('kc_guestbook_records', JSON.stringify(records.value))
      } catch (err) {
        console.error('Failed to persist guestbook record:', err)
      }
    }

    return newRecord
  }

  // =====================================================
  // REQUEST OTP / SUBMIT
  // =====================================================
  const requestOtp = async (payload: GuestBookPayload) => {
    const newRecord = addGuestBookRecord(payload)
    return {
      success: true,
      data: newRecord
    }
  }

  // =====================================================
  // VERIFY OTP
  // =====================================================
  const verifyOtp = async (whatsapp: string, code: string) => {
    const clean = formatWhatsapp(whatsapp)
    const found = records.value.find(r => r.whatsapp === clean)
    if (found) {
      found.status = 'terverifikasi'
      if (process.client) {
        try {
          localStorage.setItem('kc_guestbook_records', JSON.stringify(records.value))
        } catch {}
      }
    }
    return {
      success: true
    }
  }

  // =====================================================
  // GET GUEST BOOK DATA
  // =====================================================
  const getGuestBookData = async (filters?: {
    tipeKunjungan?: string
    domisili?: string
    kategoriUmur?: string
    search?: string
    page?: number
    perPage?: number
  }): Promise<{ data: GuestBookRecord[]; total: number }> => {
    if (process.client) {
      try {
        const stored = localStorage.getItem('kc_guestbook_records')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            records.value = parsed
          }
        }
      } catch {}
    }

    let list = [...records.value]

    if (filters?.tipeKunjungan) {
      const typeFilter = filters.tipeKunjungan.toLowerCase()
      list = list.filter(r => {
        const t = (r.tipeKunjungan || '').toLowerCase()
        if (typeFilter === 'pengajian' || typeFilter === 'pp') return t === 'pengajian' || t === 'pp'
        if (typeFilter === 'hall' || typeFilter === 'pr') return t === 'hall' || t === 'pr' || t === 'reguler'
        if (typeFilter === 'b2b' || typeFilter === 'pt') return t === 'b2b' || t === 'pt'
        return t === typeFilter
      })
    }

    if (filters?.kategoriUmur) {
      list = list.filter(r => r.kategoriUmur === filters.kategoriUmur)
    }

    if (filters?.domisili) {
      const kw = filters.domisili.toLowerCase()
      list = list.filter(r => r.domisili && r.domisili.toLowerCase().includes(kw))
    }

    if (filters?.search) {
      const kw = filters.search.toLowerCase()
      list = list.filter(r =>
        (r.nama && r.nama.toLowerCase().includes(kw)) ||
        (r.whatsapp && r.whatsapp.includes(kw)) ||
        (r.namaAcara && r.namaAcara.toLowerCase().includes(kw)) ||
        (r.domisili && r.domisili.toLowerCase().includes(kw))
      )
    }

    return {
      data: list,
      total: list.length
    }
  }

  return {
    records,
    requestOtp,
    verifyOtp,
    getGuestBookData,
    addGuestBookRecord
  }
}