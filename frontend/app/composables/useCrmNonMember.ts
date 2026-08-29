import { useState } from '#app'

export interface NonMemberVisitor {
  id: number
  nama: string
  whatsapp: string
  domisili: string
  source: 'POS' | 'Self-Service'
  totalSpend: number
  tanggalKunjungan: string
  tanggalLahir?: string
  umur?: number
  kategoriUmur?: string
  status?: string
}

export const useCrmNonMember = () => {
  // Gunakan state global agar tersinkronisasi antar navigasi
  const visitors = useState<NonMemberVisitor[]>('crm_non_members', () => [
    {
      id: 101,
      nama: 'Ahmad Faisal',
      whatsapp: '6281234567810',
      domisili: 'Surabaya',
      source: 'POS',
      totalSpend: 150000,
      tanggalLahir: '1995-03-21',
      umur: 31,
      kategoriUmur: 'Dewasa',
      status: 'Aktif',
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    {
      id: 102,
      nama: 'Sinta Kirana',
      whatsapp: '6285712312312',
      domisili: 'Malang',
      source: 'Self-Service',
      totalSpend: 75000,
      tanggalLahir: '2005-08-14',
      umur: 21,
      kategoriUmur: 'Remaja',
      status: 'Aktif',
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    {
      id: 103,
      nama: 'Rafa Pratama',
      whatsapp: '6281399881122',
      domisili: 'Blitar',
      source: 'POS',
      totalSpend: 50000,
      tanggalLahir: '2016-05-10',
      umur: 10,
      kategoriUmur: 'Anak-Anak',
      status: 'Aktif',
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    {
      id: 104,
      nama: 'Hj. Maryam',
      whatsapp: '6282133445566',
      domisili: 'Kediri',
      source: 'POS',
      totalSpend: 200000,
      tanggalLahir: '1965-12-05',
      umur: 61,
      kategoriUmur: 'Lansia',
      status: 'Aktif',
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    }
  ])

  const addVisitor = (data: Omit<NonMemberVisitor, 'id' | 'tanggalKunjungan'>) => {
    const newVisitor: NonMemberVisitor = {
      ...data,
      id: Math.floor(Math.random() * 1000000),
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    }
    // Simpan ke array awal agar yang terbaru di atas
    visitors.value.unshift(newVisitor)
  }

  return {
    visitors,
    addVisitor
  }
}
