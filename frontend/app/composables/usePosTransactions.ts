import { ref, computed } from 'vue'

export interface PosTransactionItem {
  id: string
  time: string
  category: 'Tiket Masuk' | 'Wahana' | 'Sewa Hall' | 'Edukasi' | 'B2B'
  type: string
  items: Array<{ name: string; qty: number; price: number }>
  qty: number
  total: number
  payment: string
  customer: string
  status: 'LUNAS' | 'PENDING' | 'BATAL'
  createdAt?: string
}

const DEFAULT_TRANSACTIONS: PosTransactionItem[] = [
  { 
    id: 'TRX-2045', 
    time: '14:02', 
    category: 'Tiket Masuk', 
    type: 'Tiket Terusan', 
    items: [{ name: 'Tiket Terusan Unlimited', qty: 4, price: 75000 }],
    qty: 4, 
    total: 300000, 
    payment: 'QRIS', 
    customer: 'Ibu Ratna & Keluarga',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2044', 
    time: '13:55', 
    category: 'Tiket Masuk', 
    type: 'Tiket Reguler', 
    items: [{ name: 'Tiket Reguler Masuk', qty: 2, price: 20000 }],
    qty: 2, 
    total: 40000, 
    payment: 'Tunai', 
    customer: 'Pak Hendra (Umum)',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2043', 
    time: '13:40', 
    category: 'Wahana', 
    type: 'Golf Car & Bom Bom Car', 
    items: [
      { name: 'Golf Car Wisata (1 Armada)', qty: 1, price: 100000 },
      { name: 'Bom Bom Car', qty: 2, price: 25000 }
    ],
    qty: 3, 
    total: 150000, 
    payment: 'EDC / Kartu', 
    customer: 'Bpk. Dimas Pratama',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2042', 
    time: '13:15', 
    category: 'Tiket Masuk', 
    type: 'Tiket Reguler', 
    items: [{ name: 'Tiket Reguler Masuk', qty: 5, price: 20000 }],
    qty: 5, 
    total: 100000, 
    payment: 'Tunai', 
    customer: 'Rombongan Keluarga Solo',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2041', 
    time: '12:50', 
    category: 'Tiket Masuk', 
    type: 'Tiket Terusan', 
    items: [{ name: 'Tiket Terusan Unlimited', qty: 2, price: 75000 }],
    qty: 2, 
    total: 150000, 
    payment: 'QRIS', 
    customer: 'Sdr. Yoga Prasetyo',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2040', 
    time: '12:30', 
    category: 'Edukasi', 
    type: 'Paket Edukasi TK / PAUD', 
    items: [{ name: 'Paket Edukasi Cilik + Cooking', qty: 25, price: 35000 }],
    qty: 25, 
    total: 875000, 
    payment: 'QRIS', 
    customer: 'PAUD Tunas Harapan Blitar',
    status: 'LUNAS' 
  },
  { 
    id: 'TRX-2039', 
    time: '11:45', 
    category: 'Sewa Hall', 
    type: 'Kampung Coklat Hall (DP)', 
    items: [{ name: 'Sewa Venue Indoor Convention', qty: 1, price: 1500000 }],
    qty: 1, 
    total: 1500000, 
    payment: 'EDC / Kartu', 
    customer: 'Panitia Wisuda SMPN 1',
    status: 'LUNAS' 
  }
]

export const usePosTransactions = () => {
  // Shared state via useState
  const transactions = useState<PosTransactionItem[]>('pos_transactions_list', () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('kc_pos_transactions')
        if (saved) return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    return DEFAULT_TRANSACTIONS
  })

  const kasirProfile = useState('pos_kasir_profile', () => ({
    kasirName: 'Budi Santoso',
    kasirRole: 'Kasir Utama 01',
    shiftStart: '07:30 WIB',
    shiftDate: '19 Agustus 2026',
    statusShift: 'Aktif',
    printerStatus: 'Online (Ready)',
    drawerStatus: 'Terkoneksi',
    initialFloat: 500000
  }))

  const extraCashIn = useState<number>('pos_extra_cash_in', () => 0)
  const extraCashOut = useState<number>('pos_extra_cash_out', () => 0)

  // Save to localStorage helper
  const syncStorage = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem('kc_pos_transactions', JSON.stringify(transactions.value))
      } catch (e) {
        console.error(e)
      }
    }
  }

  // Dynamic calculated stats based strictly on Live Feed
  const totalTransaksi = computed(() => transactions.value.length)
  const tiketTerjual = computed(() => transactions.value.reduce((acc, t) => acc + (t.qty || 0), 0))

  const paymentSummary = computed(() => {
    let tunaiTotal = 0, tunaiCount = 0
    let qrisTotal = 0, qrisCount = 0
    let edcTotal = 0, edcCount = 0

    transactions.value.forEach(t => {
      const p = (t.payment || '').toLowerCase()
      if (p.includes('tunai') || p.includes('cash')) {
        tunaiTotal += t.total
        tunaiCount += 1
      } else if (p.includes('qris')) {
        qrisTotal += t.total
        qrisCount += 1
      } else {
        edcTotal += t.total
        edcCount += 1
      }
    })

    const totalPendapatan = tunaiTotal + qrisTotal + edcTotal

    return {
      tunai: { total: tunaiTotal, count: tunaiCount },
      qris: { total: qrisTotal, count: qrisCount },
      edc: { total: edcTotal, count: edcCount },
      totalPendapatan
    }
  })

  // Saldo Kas Laci = Total Penjualan Tunai + Kas Masuk - Kas Keluar
  const saldoKasLaci = computed(() => {
    return paymentSummary.value.tunai.total + extraCashIn.value - extraCashOut.value
  })

  // Category revenue distribution directly from transactions
  const categoryDistribution = computed(() => {
    const map: Record<string, { revenue: number; count: number; color: string }> = {
      'Tiket Masuk (Gate)': { revenue: 0, count: 0, color: '#F59E0B' },
      'Fasilitas Wahana': { revenue: 0, count: 0, color: '#3B82F6' },
      'Sewa Hall / Venue': { revenue: 0, count: 0, color: '#10B981' },
      'Wisata Edukasi & B2B': { revenue: 0, count: 0, color: '#8B5CF6' }
    }

    transactions.value.forEach(t => {
      if (t.category === 'Tiket Masuk') {
        map['Tiket Masuk (Gate)'].revenue += t.total
        map['Tiket Masuk (Gate)'].count += t.qty
      } else if (t.category === 'Wahana') {
        map['Fasilitas Wahana'].revenue += t.total
        map['Fasilitas Wahana'].count += t.qty
      } else if (t.category === 'Sewa Hall') {
        map['Sewa Hall / Venue'].revenue += t.total
        map['Sewa Hall / Venue'].count += t.qty
      } else {
        map['Wisata Edukasi & B2B'].revenue += t.total
        map['Wisata Edukasi & B2B'].count += t.qty
      }
    })

    const total = paymentSummary.value.totalPendapatan || 1

    return Object.entries(map).map(([name, val]) => ({
      name,
      revenue: val.revenue,
      count: val.count,
      color: val.color,
      percentage: Math.round((val.revenue / total) * 100)
    }))
  })

  // Dynamic Hourly Chart Data computed directly from live feed
  const hourlyChartData = computed(() => {
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    
    // Map transactions to hour slots
    const hourMap: Record<string, { revenue: number; pax: number }> = {}
    hours.forEach(h => {
      hourMap[h] = { revenue: 0, pax: 0 }
    })

    transactions.value.forEach(t => {
      const hStr = (t.time || '').split(':')[0]
      const matchingSlot = hours.find(h => h.startsWith(hStr))
      if (matchingSlot) {
        hourMap[matchingSlot].revenue += t.total
        hourMap[matchingSlot].pax += t.qty
      } else {
        // Fallback to nearest slot
        hourMap['14:00'].revenue += t.total
        hourMap['14:00'].pax += t.qty
      }
    })

    const maxRev = Math.max(...Object.values(hourMap).map(v => v.revenue), 1)
    const maxPax = Math.max(...Object.values(hourMap).map(v => v.pax), 1)

    return hours.map(time => {
      const data = hourMap[time]
      return {
        time,
        revenue: data.revenue,
        pax: data.pax,
        val1: Math.round((data.revenue / maxRev) * 85) + (data.revenue > 0 ? 10 : 0), // % height for revenue bar
        val2: Math.round((data.pax / maxPax) * 75) + (data.pax > 0 ? 10 : 0) // % height for pax bar
      }
    })
  })

  // Dynamic Average per Receipt
  const rataRataPerStruk = computed(() => {
    if (totalTransaksi.value === 0) return 0
    return Math.round(paymentSummary.value.totalPendapatan / totalTransaksi.value)
  })

  // Dynamic Peak Hour
  const jamKunjunganTeramai = computed(() => {
    let bestSlot = '10:00 - 12:00 WIB'
    let maxPax = 0

    hourlyChartData.value.forEach(h => {
      if (h.pax > maxPax) {
        maxPax = h.pax
        const nextHour = parseInt(h.time.split(':')[0]) + 1
        bestSlot = `${h.time} - ${String(nextHour).padStart(2, '0')}:00 WIB`
      }
    })

    return bestSlot
  })

  // Function to add new transaction from ANY POS page
  const addPosTransaction = (tx: {
    id?: string
    category: 'Tiket Masuk' | 'Wahana' | 'Sewa Hall' | 'Edukasi' | 'B2B'
    type: string
    items: Array<{ name: string; qty: number; price: number }>
    qty?: number
    total: number
    payment: string
    customer?: string
  }) => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':')
    const calculatedQty = tx.qty !== undefined ? tx.qty : tx.items.reduce((acc, it) => acc + (it.qty || 1), 0)
    const trxId = tx.id || `TRX-${Math.floor(2050 + Math.random() * 8000)}`

    const newTx: PosTransactionItem = {
      id: trxId,
      time: timeStr,
      category: tx.category,
      type: tx.type,
      items: tx.items,
      qty: calculatedQty,
      total: tx.total,
      payment: tx.payment,
      customer: tx.customer || 'Pengunjung Umum',
      status: 'LUNAS',
      createdAt: now.toISOString()
    }

    // Prepend to top of list
    transactions.value.unshift(newTx)
    syncStorage()

    return newTx
  }

  const addCashFlow = (type: 'in' | 'out', amount: number) => {
    if (type === 'in') extraCashIn.value += amount
    else extraCashOut.value += amount
  }

  const resetShift = () => {
    transactions.value = []
    extraCashIn.value = 0
    extraCashOut.value = 0
    syncStorage()
  }

  return {
    transactions,
    kasirProfile,
    totalTransaksi,
    tiketTerjual,
    paymentSummary,
    saldoKasLaci,
    categoryDistribution,
    hourlyChartData,
    rataRataPerStruk,
    jamKunjunganTeramai,
    addPosTransaction,
    addCashFlow,
    resetShift
  }
}
