import { useState } from '#app'

export interface NonMemberVisitor {
  id: number
  nama: string
  whatsapp: string
  domisili: string
  source: 'POS' | 'Self-Service'
  totalSpend: number
  tanggalKunjungan: string
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
      tanggalKunjungan: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    },
    {
      id: 102,
      nama: 'Sinta Kirana',
      whatsapp: '6285712312312',
      domisili: 'Malang',
      source: 'Self-Service',
      totalSpend: 75000,
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
