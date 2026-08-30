<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// -- WAHANA & ENTRY TICKETS IMAGES --
import imgKolamDewasa from '~/assets/assets_POS/POS/wahana/kolam_renang_dewasa_idr.10k_freeterusan.jpg'
import imgKereta from '~/assets/assets_POS/POS/wahana/kereta_si_choco_idr.15k.jpg'
import imgAnimalFeeding from '~/assets/assets_POS/POS/wahana/Animal-Feeding_idr.2k.jpg'
import imgAnimalToys from '~/assets/assets_POS/POS/wahana/animal_toys_idr.15k_freeterusan.png'
import imgAtv from '~/assets/assets_POS/POS/wahana/atv_idr.25k.jpg'
import imgBomBomCar from '~/assets/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png'
import imgFlyingFox from '~/assets/assets_POS/POS/wahana/flying-fox_idr.20k.jpg'
import imgGolfCar from '~/assets/assets_POS/POS/wahana/golf_car_idr.25k.jpg'
import imgIstanaBalon from '~/assets/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png'
import imgKarausel from '~/assets/assets_POS/POS/wahana/Karausel_idr.15k.png'
import imgKeretaLokomotif from '~/assets/assets_POS/POS/wahana/kereta_lokomotif_idr.15k_freeterusan.jpg'
import imgKeretaMonorel from '~/assets/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png'
import imgKolamPemancingan from '~/assets/assets_POS/POS/wahana/kolam_pemancingan_idr.gratis.png'
import imgKolamRenangAnak from '~/assets/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png'
import imgKursiPijat from '~/assets/assets_POS/POS/wahana/Kursi-Pijat_15menit.jpg'
import imgMiniGolf from '~/assets/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg'
import imgMiniJeep from '~/assets/assets_POS/POS/wahana/mini_jeep_idr.25k.jpg'
import imgMiniSwinger from '~/assets/assets_POS/POS/wahana/mini_swinger_idr.15k.png'
import imgPanahan from '~/assets/assets_POS/POS/wahana/panahan_idr.15k_freeterusan.jpg'
import imgPancinganAnak from '~/assets/assets_POS/POS/wahana/pancingan_anak_idr.10k_freeterusan.jpg'
import imgPerahuCeria from '~/assets/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg'
import imgPerahuDayung from '~/assets/assets_POS/POS/wahana/Perahu_dayung_idr.15k_freeterusan.jpg'
import imgPlayground from '~/assets/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg'
import imgSepedaListrik from '~/assets/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png'
import imgSepedaUdara from '~/assets/assets_POS/POS/wahana/sepeda_udara_idr.20k.jpg'
import imgTerapiIkan from '~/assets/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg'
import imgTrampolin from '~/assets/assets_POS/POS/wahana/Trampolin_idr.10k_freeterusan.jpg'

// -- SEWA TEMPAT & GENERAL VENUE IMAGES --
import bale_coklat from '~/assets/assets_POS/POS/sewa_tempat/bale_coklat.jpg'
import coklat_caffe from '~/assets/assets_POS/POS/sewa_tempat/coklat_caffe.jpg'
import coklat_garden from '~/assets/assets_POS/POS/sewa_tempat/coklat_garden.jpg'
import joglo_jatimarto from '~/assets/assets_POS/POS/sewa_tempat/joglo_jatimarto.jpg'
import kampung_coklat_hall from '~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg'
import pbk from '~/assets/assets_POS/POS/sewa_tempat/private_business_keep(PBK).png'
import ruang_pertemuan from '~/assets/assets_POS/POS/sewa_tempat/ruang_pertemuan_R1.jpeg'
import taman_edel from '~/assets/assets_POS/POS/sewa_tempat/taman_edel.png'
import theobromine_hall from '~/assets/assets_POS/POS/sewa_tempat/theobromine_hall.jpg'
import trinitario_hall from '~/assets/assets_POS/POS/sewa_tempat/trinitario_hall.jpg'
import wisma_criollo from '~/assets/assets_POS/POS/sewa_tempat/wisma_criollo.jpg'

// -- GENERAL FACILITY OVERVIEW & SLIDE IMAGES --
import slide1 from '~/assets/assets_POS/slide/slide1.jpg'
import slide2 from '~/assets/assets_POS/slide/slide2.jpg'
import slide3 from '~/assets/assets_POS/slide/slide3.jpg'
import slide4 from '~/assets/assets_POS/slide/slide4.jpg'
import bangunan1 from '~/assets/assets_POS/bangunan1.jpg'
import hall from '~/assets/assets_POS/hall.jpg'
import kamcok1 from '~/assets/assets_POS/kamcok1.jpg'
import ticket_reguler from '~/assets/tickets/ticket_reguler.jpg'
import ticket_terusan from '~/assets/tickets/ticket_terusan.jpg'

// -- EDUKASI IMAGES --
import paket_tk from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png'
import paket_sd from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png'
import paket_smp from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png'
import paket_sma from '~/assets/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png'

const route = useRoute()
const router = useRouter()
const selectedProduct = ref(route.query.category as string || 'Tiket Masuk')

const showArticleModal = ref(false)
const selectedArticleItem = ref<any>(null)
const currentModalImageIndex = ref(0)

const getModalImages = (item: any): string[] => {
  if (!item) return []
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images
  }
  if (item.image) {
    return [item.image]
  }
  return []
}

const nextModalImage = () => {
  const images = getModalImages(selectedArticleItem.value)
  if (!images.length) return
  currentModalImageIndex.value = (currentModalImageIndex.value + 1) % images.length
}

const prevModalImage = () => {
  const images = getModalImages(selectedArticleItem.value)
  if (!images.length) return
  currentModalImageIndex.value = (currentModalImageIndex.value - 1 + images.length) % images.length
}

const setModalImageIndex = (idx: number) => {
  currentModalImageIndex.value = idx
}

const openArticleModal = (item: any) => {
  currentModalImageIndex.value = 0
  selectedArticleItem.value = item
  showArticleModal.value = true
}

const closeArticleModal = () => {
  showArticleModal.value = false
  setTimeout(() => {
    selectedArticleItem.value = null
    currentModalImageIndex.value = 0
  }, 300)
}

const goToBooking = () => {
  closeArticleModal()
  router.push('/ticketing_dan_gate/self-service#pesan-tiket')
}

const navigateTo = (path: string) => {
  router.push('/ticketing_dan_gate/self-service' + path)
}

import { useConfigSync } from '~/composables/useConfigSync'

const { ticketRates, rides } = useConfigSync()

const defaultEntryTickets = [
  {
    id: 'tiket-reguler',
    name: 'Tiket Masuk Reguler',
    label: 'Tiket Utama',
    tagline: 'Akses Eksplorasi Kawasan Wisata Kampung Coklat',
    desc: 'Akses masuk bebas untuk mengeksplorasi seluruh kawasan wisata Kampung Coklat Blitar. Nikmati pemandangan asri kebun kakao nan rindang, spot foto estetik, galeri edukasi kakao, dan pusat kuliner coklat khas.',
    image: imgKolamDewasa,
    price: 15000,
    benefits: [
      'Akses masuk ke seluruh area kebun kakao yang sejuk dan asri',
      'Kunjungan ke galeri proses pembuatan coklat tradisional & modern',
      'Akses ke ratusan spot foto instagramable di seluruh sudut area',
      'Fasilitas umum: Musholla ber-AC, Toilet bersih & ramah difabel',
      'Live music dan pertunjukan seni di area panggung utama (Weekend)',
      'Free akses ke area taman bermain dan santai di bawah pohon kakao'
    ],
    facilities: ['Toilet Bersih', 'Musholla AC', 'Area Parkir Luas', 'Gazebo Teduh', 'Pusat Kuliner Coklat', 'Pusat Oleh-Oleh']
  },
  {
    id: 'tiket-terusan',
    name: 'Tiket Masuk Terusan',
    label: 'Paket Spesial',
    subLabel: 'ALL-IN WAHANA UNLIMITED',
    tagline: 'Liburan Hemat & Puas Tanpa Batas dengan Puluhan Wahana',
    desc: 'Paket terlengkap dan paling hemat! Termasuk tiket masuk kawasan + akses bebas tanpa batas (Unlimited) ke puluhan wahana permainan favorit keluarga dan anak-anak sepanjang hari.',
    image: imgKolamDewasa,
    price: 35000,
    benefits: [
      'Semua fasilitas & benefit Tiket Masuk Reguler',
      'Free Unlimited bermain di Kolam Renang Anak & Dewasa',
      'Free Unlimited naik Kereta Lokomotif & Kereta Monorel',
      'Free Unlimited bermain Bom Bom Car & Istana Balon',
      'Free Unlimited Terapi Ikan relaksasi di kolam alami',
      'Free Unlimited Animal Feeding, Playground, Mini Golf & Trampolin',
      'Hemat lebih dari 60% dibandingkan membeli tiket wahana satuan'
    ],
    facilities: ['All Access Wahana', 'Toilet Bersih', 'Musholla AC', 'Area Parkir Bus & Mobil', 'Restoran Coklat', 'Spot Foto Estetik']
  }
]

const defaultWahanaTickets = [
  {
    id: 'animal-feeding',
    name: 'Animal Feeding',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Interaksi Langsung & Memberi Makan Satwa Lucu',
    desc: 'Wahana edukatif di mana anak-anak dan keluarga dapat berinteraksi dekat serta memberi makan aneka satwa jinak seperti kelinci, domba hias, burung, dan kura-kura.',
    image: imgAnimalFeeding,
    price: 2000,
    benefits: [
      'Pakan khusus satwa higienis & aman untuk anak',
      'Interaksi langsung melatih kasih sayang terhadap hewan',
      'Didampingi petugas dan pawang satwa berpengalaman',
      'Spot foto menarik bersama satwa-satwa jinak'
    ]
  },
  {
    id: 'animal-toys',
    name: 'Animal Toys',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Hewan Tunggang Elektrik yang Mengasyikkan',
    desc: 'Mainan motorik hewan tunggang elektrik yang seru untuk anak-anak berkeliling di lintasan khusus yang nyaman dan aman.',
    image: imgAnimalToys,
    price: 15000,
    benefits: [
      'Pilihan boneka hewan favorit anak yang lucu dan bersih',
      'Kecepatan aman yang disesuaikan untuk anak-anak',
      'Jalur lintasan khusus berlantai halus dan bebas hambatan'
    ]
  },
  {
    id: 'atv',
    name: 'ATV Ride',
    label: 'Wahana',
    subLabel: 'Wahana Petualangan',
    tagline: 'Pacu Adrenalin di Lintasan Offroad Mini',
    desc: 'Rasakan sensasi mengendarai motor ATV roda empat melintasi lintasan tanah dengan rintangan bergelombang yang menantang dan aman.',
    image: imgAtv,
    price: 25000,
    benefits: [
      'Kendaraan ATV terawat dengan performa mesin prima',
      'Perlengkapan keselamatan lengkap (Helm & Pelindung)',
      'Briefing keselamatan & panduan instruktur profesional',
      'Trek berpasir dan berlumpur yang seru dan menantang'
    ]
  },
  {
    id: 'bom-bom-car',
    name: 'Bom Bom Car',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Sensasi Tabrakan Mobil Listrik Seru & Aman',
    desc: 'Arena permainan bom-bom car elektrik dengan lantai konduktif modern. Nikmati aksi kejar-kejaran dan manuver tabrakan aman bersama teman maupun keluarga.',
    image: imgBomBomCar,
    price: 15000,
    benefits: [
      'Mobil listrik dengan sabuk pengaman dan bumper karet tebal',
      'Arena indoor ber-lighting menarik dan musik ceria',
      'Cocok untuk anak-anak dan remaja',
      'Sistem kendali responsif dan mudah dikemudikan'
    ]
  },
  {
    id: 'flying-fox',
    name: 'Flying Fox',
    label: 'Wahana',
    subLabel: 'Wahana Petualangan',
    tagline: 'Meluncur di Atas Rindangnya Kebun Kakao',
    desc: 'Meluncur bebas dari ketinggian tower melintasi rindangnya pepohonan kakao. Rasakan hembusan angin segar dan pemandangan kawasan dari udara.',
    image: imgFlyingFox,
    price: 20000,
    benefits: [
      'Peralatan tali pengaman & carabiner bersertifikat internasional',
      'Dipandu instruktur outbound bersertifikat',
      'Pemandangan spektakuler kebun kakao dari atas lintasan',
      'Sistem pengereman otomatis yang sangat aman'
    ]
  },
  {
    id: 'golf-car',
    name: 'Golf Car',
    label: 'Wahana',
    subLabel: 'Transportasi Wisata',
    tagline: 'Berkeliling Kawasan Nyaman Tanpa Lelah',
    desc: 'Mobil listrik golf car ramah lingkungan untuk mengantar rombongan keluarga berkeliling menikmati setiap sudut kawasan Kampung Coklat dengan santai.',
    image: imgGolfCar,
    price: 25000,
    benefits: [
      'Kapasitas hingga 6 orang penumpang dalam 1 armada',
      'Didampingi driver ramah yang siap menjelaskan spot-spot wisata',
      'Sangat ramah untuk lansia, ibu hamil, dan balita',
      'Kendaraan ramah lingkungan tanpa emisi suara bising'
    ]
  },
  {
    id: 'istana-balon',
    name: 'Istana Balon',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Arena Melompat Bebas Ceria & Lembut',
    desc: 'Kastil balon raksasa berisi seluncuran, rintangan empuk, dan arena lompat yang dirancang khusus untuk melatih motorik kasar si kecil dengan aman.',
    image: imgIstanaBalon,
    price: 10000,
    benefits: [
      'Bahan vinyl tebal non-alergenik yang selalu dibersihkan',
      'Pengawasan ketat staf penjaga di pintu masuk dan seluncuran',
      'Area empuk meminimalisir risiko cedera pada anak',
      'Warna-warni cerah yang merangsang kreativitas anak'
    ]
  },
  {
    id: 'karausel',
    name: 'Karausel (Komidi Putar)',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Komidi Putar Kuda Klasik Nan Estetik',
    desc: 'Komidi putar bergaya eropa klasik dengan hiasan lampu keemasan dan alunan musik merdu. Menjadi wahana nostalgia dan spot foto estetik.',
    image: imgKarausel,
    price: 15000,
    benefits: [
      'Kuda-kudaan berputar dan bergerak naik turun dengan lembut',
      'Lampu penerangan estetik sangat indah untuk foto sore hari',
      'Sabuk pengaman dan pegangan kokoh untuk anak-anak'
    ]
  },
  {
    id: 'kereta-lokomotif',
    name: 'Kereta Lokomotif',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Keliling Perkebunan Bersama Kereta Ceria',
    desc: 'Kereta mini lokomotif dengan gerbong terbuka yang membawa pengunjung menyusuri jalur rindang kebun coklat sambil mendengarkan suara lonceng kereta.',
    image: imgKeretaLokomotif,
    price: 15000,
    benefits: [
      'Kapasitas besar cocok untuk seluruh anggota keluarga bersamaan',
      'Jalur keliling yang teduh di bawah naungan pohon kakao',
      'Alunan musik wisata yang menyenangkan sepanjang perjalanan'
    ]
  },
  {
    id: 'kereta-monorel',
    name: 'Kereta Monorel',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Pemandangan 360 Derajat dari Ketinggian Rel Monorel',
    desc: 'Wahana kereta rel tunggal di atas ketinggian yang membawa Anda menikmati panorama lanskap Kampung Coklat dari sudut pandang udara.',
    image: imgKeretaMonorel,
    price: 15000,
    benefits: [
      'Rel di ketinggian dengan sudut pandang pemandangan spektakuler',
      'Sistem keselamatan elektrik dan sensor kecepatan otomatis',
      'Sensasi meluncur santai di atas atap galeri dan taman kakao'
    ]
  },
  {
    id: 'kolam-pemancingan',
    name: 'Kolam Pemancingan',
    label: 'Wahana',
    subLabel: 'Gratis Masuk',
    tagline: 'Sensasi Mancing Ikan Air Tawar di Suasana Asri',
    desc: 'Area kolam pemancingan yang luas dan teduh. Tempat ideal untuk melepaskan penat sambil melatih kesabaran menanti sambaran ikan air tawar.',
    image: imgKolamPemancingan,
    price: 0,
    benefits: [
      'Gratis masuk area pemancingan untuk semua pengunjung',
      'Penyewaan alat pancing dan umpan tersedia di lokasi',
      'Hasil tangkapan ikan dapat ditimbang dan dimasak langsung di resto'
    ]
  },
  {
    id: 'kolam-renang-anak',
    name: 'Kolam Renang Anak & Dewasa',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Bermain Air Segar & Water Splash Ceria',
    desc: 'Kolam renang air jernih dengan fasilitas seluncuran waterpark, ember tumpah, dan kedalaman bergradasi yang aman untuk anak maupun dewasa.',
    image: imgKolamRenangAnak,
    price: 10000,
    benefits: [
      'Air kolam terfilter sirkulasi bersih dan bebas bau kaporit menyengat',
      'Fasilitas water splash, perosotan spiral, dan ember tumpah raksasa',
      'Kamar bilas, toilet, dan loker penyimpanan barang bersih',
      'Lifeguard penjaga kolam standby sepanjang jam operasional'
    ]
  },
  {
    id: 'kursi-pijat',
    name: 'Kursi Pijat Relaksasi',
    label: 'Wahana',
    subLabel: 'Relaksasi 15 Menit',
    tagline: 'Segarkan Kembali Tubuh Setelah Berkeliling',
    desc: 'Kursi pijat elektrik zero-gravity berteknologi tinggi yang memijat seluruh tubuh mulai dari leher, punggung, hingga telapak kaki.',
    image: imgKursiPijat,
    price: 15000,
    benefits: [
      'Teknologi pijatan shiatsu dan pemanas inframerah untuk melancarkan darah',
      'Durasi 15 menit penuh untuk mengembalikan energi tubuh',
      'Ruangan relaksasi sejuk dan tenang'
    ]
  },
  {
    id: 'mini-golf',
    name: 'Mini Golf',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Uji Akurasi & Konsentrasi di 9 Hole Menantang',
    desc: 'Arena mini golf berumput sintetis dengan 9 tantangan lubang bergradasi rintangan. Sangat cocok untuk mengasah fokus dan kompetisi seru antar keluarga.',
    image: imgMiniGolf,
    price: 15000,
    benefits: [
      'Peminjaman stik golf (putter) dan bola golf warna-warni',
      'Trek dengan rintangan terowongan, tanjakan, dan belokan seru',
      'Melatih fokus, koordinasi mata-tangan, dan kesabaran'
    ]
  },
  {
    id: 'mini-jeep',
    name: 'Mini Jeep Adventure',
    label: 'Wahana',
    subLabel: 'Petualangan Anak',
    tagline: 'Kemudikan Mobil Jeep Offroad Mini Sendiri',
    desc: 'Kendaraan jeep mini bertenaga baterai yang dapat dikemudikan langsung oleh anak-anak melintasi rute sirkuit khusus layaknya offroader sejati.',
    image: imgMiniJeep,
    price: 25000,
    benefits: [
      'Tersedia kendali remote control untuk orang tua jika anak masih balita',
      'Bodi jeep tangguh dilengkapi sabuk pengaman kuat',
      'Rute sirkuit aman yang dilengkapi pembatas pengaman'
    ]
  },
  {
    id: 'panahan',
    name: 'Panahan (Archery Range)',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Latih Fokus & Ketepatan Membidik Sasaran',
    desc: 'Area panahan standar pemula dengan target sasaran busa tebal. Didampingi instruktur yang mengajarkan teknik memegang busur dan membidik sasaran yang benar.',
    image: imgPanahan,
    price: 15000,
    benefits: [
      'Busur (recurve bow) ringan dan anak panah dengan ujung aman',
      'Pelindung lengan (arm guard) dan pelindung jari (finger tab)',
      'Instruktur memandu teknik dasar memanah hingga mahir'
    ]
  },
  {
    id: 'terapi-ikan',
    name: 'Terapi Ikan (Fish Spa)',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Relaksasi Alami Pijatan Ribuan Ikan Garra Rufa',
    desc: 'Celupkan kaki Anda ke kolam berair jernih dan rasakan sensasi geli menyenangkan saat ribuan ikan terapi membersihkan sel kulit mati dan melancarkan sirkulasi darah.',
    image: imgTerapiIkan,
    price: 5000,
    benefits: [
      'Ribuan ikan Garra Rufa sehat dan aktif',
      'Air kolam alami bersirkulasi terus-menerus sehingga higienis',
      'Mengangkat sel kulit mati secara alami dan meredakan stres',
      'Tempat duduk gazebo teduh di tepi kolam'
    ]
  },
  {
    id: 'playground',
    name: 'Playground Ceria',
    label: 'Wahana',
    subLabel: 'Free Untuk Tiket Terusan',
    tagline: 'Arena Bermain Motorik Anak Terlengkap',
    desc: 'Taman bermain anak outdoor berlantai rumput sintetis empuk, dilengkapi rumah pohon, perosotan tabung, jembatan goyang, dan ayunan ganda.',
    image: imgPlayground,
    price: 15000,
    benefits: [
      'Alat bermain kokoh dan berstandar keamanan anak (SNI)',
      'Rumput sintetis tebal meminimalisir risiko benturan',
      'Banyak wahana variatif yang melatih ketangkasan fisik si kecil'
    ]
  }
]

const defaultEdukasiTickets = [
  {
    id: 'paket-tk-paud',
    name: 'Paket Edukasi TK / PAUD',
    label: 'Wisata Edukasi',
    subLabel: 'PROGRAM BELAJAR & KREATIVITAS USIA DINI',
    tagline: 'Pengenalan Alam, Menghias Coklat & Melatih Motorik Halus',
    price: 35000,
    capacity: 'Min. 20 Peserta',
    desc: 'Program wisata edukasi interaktif khusus siswa PAUD dan Taman Kanak-Kanak. Menggabungkan pengenalan kebun kakao secara menyenangkan, menghias coklat kreasi sendiri, serta aktivitas melatih sensorik dan motorik anak.',
    image: paket_tk,
    benefits: [
      'Pemandu / Kakak Edukator yang ramah, sabar & bersertifikasi',
      'Praktik menghias & mencetak coklat kreasi sendiri (Hasil Coklat Dibawa Pulang)',
      'Tur kebun kakao: mengenal buah coklat, pohon, dan memberi makan satwa jinak',
      'Sertifikat resmi kunjungan wisata edukasi untuk setiap siswa',
      'Free tiket masuk guru & pendamping (Rasio 1 guru gratis per 10 siswa)',
      'Welcome drink es coklat manis segar & snack sehat anak',
      'Foto bersama dokumentasi di spot photo booth eksklusif edukasi'
    ],
    facilities: ['Ruang Kelas Edukasi Nyaman & Bersih', 'Celemek & Topi Koki Cilik', 'Peralatan Coklat Lengkap', 'Musholla & Toilet Khusus Anak', 'Area Parkir Bus Rombongan']
  },
  {
    id: 'paket-sd',
    name: 'Paket Edukasi SD (Sekolah Dasar)',
    label: 'Wisata Edukasi',
    subLabel: 'SAINS COKLAT, BUDIDAYA & FUN COOKING',
    tagline: 'Belajar Sains Pertanian Kakao & Pengolahan Coklat Modern',
    price: 32000,
    capacity: 'Min. 20 Peserta',
    desc: 'Paket pembelajaran kontekstual berbasis kurikulum merdeka untuk siswa SD. Mempelajari siklus hidup pohon kakao, proses fermentasi biji, hingga teknologi pengolahan menjadi coklat batangan yang lezat.',
    image: paket_sd,
    benefits: [
      'Instruktur edukasi edukatif yang memandu seluruh rangkaian aktivitas',
      'Praktik mencetak dan mengemas coklat batangan (Coklat Dibawa Pulang)',
      'Edukasi budidaya kakao: Pembibitan, okulasi, perawatan, dan panen',
      'Kunjungan ke galeri pabrik demo mesin roasting & conching coklat',
      'Lembar kerja siswa (LKS) edukasi & kuis interaktif berhadiah coklat',
      'Sertifikat resmi kunjungan edukasi untuk seluruh peserta',
      'Free tiket masuk pembina/guru dan welcome drink coklat khas'
    ],
    facilities: ['Laboratorium / Gallery Sains Coklat', 'Sound System & Mic Wireless Guide', 'Toilet Higienis & Musholla', 'Pusat Oleh-Oleh Coklat']
  },
  {
    id: 'paket-smp',
    name: 'Paket Edukasi SMP / MTs',
    label: 'Wisata Edukasi',
    subLabel: 'KEWIRAUSAHAAN, SAINS & LDKS',
    tagline: 'Eksplorasi Bisnis Agribisnis & Pembentukan Karakter Siswa',
    price: 32000,
    capacity: 'Min. 25 Peserta',
    desc: 'Program komprehensif bagi siswa SMP yang memadukan materi kewirausahaan (Santripreneur), bioteknologi pangan fermentasi kakao, studi industri coklat, hingga pelatihan kepemimpinan (LDKS).',
    image: paket_smp,
    benefits: [
      'Materi kewirausahaan: Kisah sukses pendirian & manajemen Kampung Coklat',
      'Praktik formulasi dan pembuatan coklat olahan bernilai jual',
      'Studi biologi fermentasi kakao dan kimia rasa coklat',
      'Opsi program LDKS / Outbound kepemimpinan & team building',
      'Sertifikat resmi kompetensi edukasi kewirausahaan & sains',
      'Free tiket masuk pendamping dan souvenir kenang-kenangan sekolah',
      'Welcome drink minuman coklat original & voucher belanja produk'
    ],
    facilities: ['Ruang Seminar / Workshop Ber-AC', 'Fasilitas Presentasi Proyektor & Audio', 'Free Wi-Fi Berkecepatan Tinggi', 'Parkir Bus Luas']
  },
  {
    id: 'paket-sma-univ',
    name: 'Paket Edukasi SMA / Mahasiswa / Umum',
    label: 'Wisata Edukasi',
    subLabel: 'STUDI INDUSTRI & HILIRISASI KAKAO NASIONAL',
    tagline: 'Kajian Mendalam Agribisnis, Riset Pangan & Supply Chain',
    price: 32000,
    capacity: 'Min. 25 Peserta',
    desc: 'Program studi industri tingkat lanjut untuk siswa SMA/SMK, perguruan tinggi, dan instansi. Membahas rantai pasok agribisnis kakao, teknologi industri pangan, riset produk coklat, serta strategi branding agrowisata.',
    image: paket_sma,
    benefits: [
      'Sesi kuliah umum & diskusi interaktif bersama tim manajemen/ahli kakao',
      'Bedah proses rantai pasok hulu ke hilir (Petani Kakao hingga Produk Ritel)',
      'Observasi laboratorium pengolahan dan kontrol kualitas (QC) coklat',
      'Akses data sekunder riset budidaya & ekonomi pariwisata (sesuai izin)',
      'Sertifikat resmi kunjungan industri & riset kelembagaan',
      'Free tiket masuk dosen / panitia rombongan',
      'Welcome drink coklat signature Kampung Coklat & networking session'
    ],
    facilities: ['Auditorium / Convention Hall', 'Screen Proyektor & Wireless Mic', 'Area Diskusi VIP & Wi-Fi', 'Akses Parkir VIP']
  }
]

const defaultSewaTempatTickets = [
  {
    id: 'trinitario-hall',
    name: 'Trinitario Hall (Grand Hall)',
    label: 'Sewa Venue',
    subLabel: 'VENUE TERBESAR & PALING MEWAH',
    tagline: 'Grand Hall Premium untuk Resepsi Pernikahan & Konferensi Akbar',
    price: 2000000,
    capacity: 'Kapasitas 500 - 1.500 Orang',
    desc: 'Hall termegah dan terluas di Kampung Coklat dengan arsitektur elegan modern berpadu aksen kayu alami. Dilengkapi panggung utama megah, tata lampu profesional, dan tata akustik prima untuk event berskala besar.',
    image: trinitario_hall,
    images: [trinitario_hall, kampung_coklat_hall, hall, bangunan1],
    benefits: [
      'Sound System Line-Array Profesional + 4 Wireless Microphone Shure',
      'AC Central dingin merata + Blower bantuan pendingin udara',
      'Panggung utama megah (Dimensi 12 x 6 meter) + Podium eksklusif',
      'Set meja bulat/kotak & kursi banquet VIP (Lengkap dengan Cover & Pita)',
      'Free Tiket Masuk Seluruh Tamu Undangan / Peserta Acara',
      'Akses Ruang VIP / Ruang Rias Pengantin / Transit Ber-AC',
      'Operator audio-visual & tim kebersihan standby selama acara',
      'Akses Parkir VIP khusus mobil pengantin / pejabat penyelenggara',
      'Welcome Drink Coklat Khas Kampung Coklat untuk Tamu VIP'
    ],
    facilities: ['Listrik Daya Besar + Backup Genset Otomatis', 'Toilet VIP Khusus Hall', 'Loading Dock Barang Luas', 'Musholla Terdekat', 'Free Wi-Fi']
  },
  {
    id: 'kampung-coklat-hall',
    name: 'Kampung Coklat Hall',
    label: 'Sewa Venue',
    subLabel: 'INDOOR CONVENTION VENUE',
    tagline: 'Ruang Serbaguna Eksklusif untuk Seminar, Wisuda & Gathering',
    price: 1500000,
    capacity: 'Kapasitas 300 - 800 Orang',
    desc: 'Gedung pertemuan indoor luas dengan pencahayaan terang dan plafon tinggi. Sangat tepat untuk kegiatan wisuda sekolah, rapat akbar tahunan perusahaan, seminar nasional, hingga gathering komunitas.',
    image: kampung_coklat_hall,
    images: [kampung_coklat_hall, hall, theobromine_hall, bangunan1],
    benefits: [
      'Sound System Event Lengkap + 2 Wireless Mic & Mixer Audio',
      'Full AC berkapasitas besar menjaga ruangan tetap sejuk',
      'Panggung standar seminar/wisuda + Stand Backdrop ukuran besar',
      'Kursi banquet bersarung rapi dan meja registrasi tamu di foyer',
      'Free Tiket Masuk Kawasan untuk seluruh peserta kegiatan',
      'Teknisi sound dan petugas kebersihan standby sepanjang acara',
      'Welcome drink coklat hangat/dingin khas Kampung Coklat'
    ],
    facilities: ['Kelistrikan Besar & Genset', 'Toilet Bersih Pria/Wanita', 'Proyektor & Layar Lebar', 'Area Parkir Bus Rombongan']
  },
  {
    id: 'theobromine-hall',
    name: 'Theobromine Hall',
    label: 'Sewa Venue',
    subLabel: 'MEETINGS & EXHIBITIONS',
    tagline: 'Hall Berarsitektur Estetik Bernuansa Hangat',
    price: 1200000,
    capacity: 'Kapasitas 200 - 500 Orang',
    desc: 'Hall bernuansa hangat dengan elemen dinding ekspos dan kayu berkualitas. Sangat cocok untuk pesta perayaan, pameran produk, workshop korporat, maupun reuni akbar.',
    image: theobromine_hall,
    images: [theobromine_hall, coklat_caffe, bangunan1, kampung_coklat_hall],
    benefits: [
      'Sound System Indoor Terkalibrasi + Wireless Mic',
      'Ruangan ber-AC sejuk dengan sirkulasi udara optimal',
      'Panggung presentasi fleksibel & set meja kursi seminar',
      'Free Tiket Masuk Kawasan bagi seluruh peserta undangan',
      'Operator teknis standby dan koordinasi keamanan event'
    ],
    facilities: ['Musholla Ber-AC Dekat Lokasi', 'Toilet Higienis', 'Free Wi-Fi', 'Akses Loading Barang Mudah']
  },
  {
    id: 'pbk',
    name: 'Private Business Room (PBK)',
    label: 'Sewa Venue',
    subLabel: 'VIP EXECUTIVE MEETING',
    tagline: 'Ruang Rapat Eksekutif VIP untuk Negosiasi & Diskusi Strategis',
    price: 1000000,
    capacity: 'Kapasitas 20 - 60 Orang',
    desc: 'Ruangan meeting eksekutif privat kedap suara dengan interior mewah, meja rapat solid wood, dan kursi direksi ergonomis. Menjamin kenyamanan dan kerahasiaan rapat bisnis penting Anda.',
    image: pbk,
    images: [pbk, ruang_pertemuan, kamcok1],
    benefits: [
      'Smart TV Display 75 Inch / Proyektor HDMI untuk Presentasi',
      'Sound System Meeting Konferensi & Mic Meja',
      'Full AC & Interior Eksklusif Kedap Suara',
      'Set Meja Rapat Kayu Jati & Kursi Direksi Nyaman',
      'Free Tiket Masuk & Parkir VIP Mobil untuk Seluruh Peserta Rapat',
      'Layanan Coffeebreak & Coklat Signature langsung di dalam ruangan'
    ],
    facilities: ['Wi-Fi Kecepatan Tinggi Khusus PBK', 'Toilet Privat', 'Papan Whiteboard Glass', 'Dispenser Air Minum']
  },
  {
    id: 'wisma-criollo',
    name: 'Wisma Criollo',
    label: 'Sewa Venue',
    subLabel: 'EXCLUSIVE FUNCTION HOUSE',
    tagline: 'Gedung Pertemuan Bernuansa Klasik Elegan',
    price: 850000,
    capacity: 'Kapasitas 100 - 250 Orang',
    desc: 'Gedung serbaguna berkonsep pavilion klasik yang elegan. Cocok untuk acara lamaran, arisan keluarga besar, gala dinner, ataupun rapat kerja instansi pemerintahan.',
    image: wisma_criollo,
    images: [wisma_criollo, joglo_jatimarto, kamcok1],
    benefits: [
      'Sound System Berkualitas + Wireless Mic',
      'Pendingin Ruangan AC & Kipas Angin Langit-langit',
      'Set Meja & Kursi Banquet Tertata Rapi',
      'Free Tiket Masuk Seluruh Peserta ke Area Wisata',
      'Tim kebersihan dan pendamping acara standby'
    ],
    facilities: ['Toilet Bersih', 'Area Parkir Dekat', 'Musholla Nyaman', 'Free Wi-Fi']
  },
  {
    id: 'joglo-jatimarto',
    name: 'Joglo Jatimarto',
    label: 'Sewa Venue',
    subLabel: 'TRADITIONAL JAVANESE HERITAGE',
    tagline: 'Pendopo Tradisional Jawa Klasik Bernuansa Agung',
    price: 750000,
    capacity: 'Kapasitas 150 - 350 Orang',
    desc: 'Pendopo joglo kayu jati berukir khas Jawa dengan suasana adem dan terbuka. Menghadirkan atmosfer sakral nan agung untuk pernikahan adat, temu kangen, sarasehan budaya, dan pentas seni.',
    image: joglo_jatimarto,
    images: [joglo_jatimarto, bale_coklat, taman_edel, kamcok1],
    benefits: [
      'Sound system standar pendopo dengan jangkauan suara jernih',
      'Suasana semi-outdoor semilir angin alami + Blower sejuk',
      'Set panggung kayu tradisional dan karpet permadani',
      'Free Tiket Masuk Kawasan untuk seluruh tamu yang hadir',
      'Spot foto berlatar arsitektur kayu jati bersejarah'
    ],
    facilities: ['Toilet Dekat Pendopo', 'Musholla', 'Parkir Luas', 'Kelistrikan Memadai']
  },
  {
    id: 'bale-coklat',
    name: 'Bale Coklat',
    label: 'Sewa Venue',
    subLabel: 'SEMI-OUTDOOR GATHERING',
    tagline: 'Bale Kayu Luas Terbuka di Bawah Rindang Pepohonan',
    price: 500000,
    capacity: 'Kapasitas 100 - 300 Orang',
    desc: 'Area bale panggung semi-outdoor yang luas dan santai, dikelilingi taman kakao hijau. Menjadi pilihan terfavorit untuk gathering komunitas motor/mobil, arisan, dan reuni akrab.',
    image: bale_coklat,
    images: [bale_coklat, coklat_garden, taman_edel, kamcok1],
    benefits: [
      'Sound System Standar Gathering + 2 Mic',
      'Panggung semi-permanen untuk MC & Akustik',
      'Meja dan kursi santai yang leluasa diatur sesuai kebutuhan',
      'Free Akses Masuk Seluruh Peserta ke Seluruh Area Wisata',
      'Suasana sejuk alami di bawah naungan pohon kakao'
    ],
    facilities: ['Dekat Food Court & Resto', 'Toilet Bersih', 'Musholla', 'Free Wi-Fi']
  },
  {
    id: 'ruang-pertemuan',
    name: 'Ruang Pertemuan R1',
    label: 'Sewa Venue',
    subLabel: 'CLASSROOM & WORKSHOP',
    tagline: 'Ruang Rapat Skala Menengah Praktis & Lengkap',
    price: 500000,
    capacity: 'Kapasitas 40 - 100 Orang',
    desc: 'Ruang pertemuan format kelas / teater dengan fasilitas audio-visual lengkap. Sangat praktis untuk pelatihan karyawan, bimtek, workshop guru, dan presentasi produk.',
    image: ruang_pertemuan,
    images: [ruang_pertemuan, pbk, bangunan1],
    benefits: [
      'Ruang Ber-AC Sejuk dan Tenang',
      'Sound System Ruangan + 2 Mic Wireless',
      'Layar LCD Proyektor HDMI & Whiteboard',
      'Meja & Kursi Training dengan bantalan empuk',
      'Free Tiket Masuk Area Wisata bagi peserta rapat'
    ],
    facilities: ['Toilet Higienis', 'Stop Kontak di Setiap Deret Meja', 'Wi-Fi Kuat']
  },
  {
    id: 'coklat-garden',
    name: 'Coklat Garden (Taman Terbuka)',
    label: 'Sewa Venue',
    subLabel: 'OUTDOOR GARDEN PARTY',
    tagline: 'Taman Hijau Asri untuk Pesta Kebun & Outbound',
    price: 400000,
    capacity: 'Kapasitas 100 - 400 Orang',
    desc: 'Area taman rumput hijau asri di tengah rindang kebun kakao. Sangat cocok untuk acara pernikahan tema garden party, fun games outbound, pentas seni sekolah, dan BBQ party.',
    image: coklat_garden,
    images: [coklat_garden, taman_edel, bale_coklat, kamcok1],
    benefits: [
      'Area taman rumput terawat bebas becek',
      'Sound System outdoor portable bertenaga tinggi',
      'Free Tiket Masuk Seluruh Peserta ke Area Kampung Coklat',
      'Suasana alam terbuka yang menyegarkan dan estetik untuk foto'
    ],
    facilities: ['Gazebo Istirahat', 'Dekat Toilet & Musholla', 'Pencahayaan Taman Malam Hari']
  },
  {
    id: 'taman-edel',
    name: 'Taman Edel',
    label: 'Sewa Venue',
    subLabel: 'GARDEN LOUNGE',
    tagline: 'Sudut Taman Estetik untuk Pertemuan Santai',
    price: 350000,
    capacity: 'Kapasitas 50 - 150 Orang',
    desc: 'Spot taman dengan dekorasi tanaman hias eksotis dan bangku taman artistik. Pilihan tepat untuk acara komunitas hobi, arisan santai, atau perayaan ulang tahun anak.',
    image: taman_edel,
    images: [taman_edel, coklat_garden, kamcok1],
    benefits: [
      'Sound system mini dan microphone',
      'Suasana santai dikelilingi bunga dan pohon kakao',
      'Free Tiket Masuk Kawasan bagi seluruh undangan'
    ],
    facilities: ['Toilet', 'Musholla', 'Akses Kuliner Cepat']
  },
  {
    id: 'coklat-caffe',
    name: 'Coklat Caffe Venue',
    label: 'Sewa Venue',
    subLabel: 'CAFE & LIVE MUSIC',
    tagline: 'Nuansa Kafe Modern Paduan Aroma Kopi & Coklat',
    price: 300000,
    capacity: 'Kapasitas 40 - 120 Orang',
    desc: 'Area kafe dengan desain interior modern berpadu aroma harum seduhan coklat dan kopi murni. Sangat cocok untuk perayaan ulang tahun, nobar, talkshow santai, dan live performance akustik.',
    image: coklat_caffe,
    images: [coklat_caffe, theobromine_hall, bale_coklat],
    benefits: [
      'Tata suara audio kafe jernih & Mic performance',
      'Dekorasi meja kafe dan kursi bar modern',
      'Free Akses Tiket Masuk Wisata untuk seluruh peserta acara',
      'Menu aneka olahan minuman coklat & dessert lezat tersedia di tempat'
    ],
    facilities: ['Wi-Fi Cepat', 'Toilet Kafe Bersih', 'Stop Kontak Banyak']
  }
]

const findEntryDef = (t: any) => {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const tNorm = norm((t.name || '') + ' ' + (t.id || ''))
  return defaultEntryTickets.find(d => {
    const dNorm = norm(d.name + ' ' + d.id)
    return d.id === t.id || tNorm.includes(norm(d.id)) || dNorm.includes(norm(t.id || ''))
  }) || defaultEntryTickets[0]
}

const findWahanaDef = (t: any) => {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const tNorm = norm((t.name || '') + ' ' + (t.id || ''))
  return defaultWahanaTickets.find(d => {
    const dNorm = norm(d.name + ' ' + d.id)
    return d.id === t.id || tNorm.includes(norm(d.id)) || dNorm.includes(norm(t.name || ''))
  }) || defaultWahanaTickets[0]
}

const findEdukasiDef = (t: any) => {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const tNorm = norm((t.name || '') + ' ' + (t.id || ''))
  return defaultEdukasiTickets.find(d => {
    const dNorm = norm(d.name + ' ' + d.id)
    if (tNorm.includes('tk') || tNorm.includes('paud')) return d.id === 'paket-tk-paud'
    if (tNorm.includes('sd')) return d.id === 'paket-sd'
    if (tNorm.includes('smp') || tNorm.includes('mts')) return d.id === 'paket-smp'
    if (tNorm.includes('sma') || tNorm.includes('smk') || tNorm.includes('univ') || tNorm.includes('mahasiswa')) return d.id === 'paket-sma-univ'
    return d.id === t.id || dNorm.includes(tNorm)
  }) || defaultEdukasiTickets[0]
}

const findVenueDef = (t: any) => {
  const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  const tNorm = norm((t.name || '') + ' ' + (t.id || ''))
  return defaultSewaTempatTickets.find(d => {
    const dNorm = norm(d.name + ' ' + d.id)
    return d.id === t.id || tNorm.includes(norm(d.id)) || dNorm.includes(norm(t.name || ''))
  }) || defaultSewaTempatTickets[0]
}

const entryTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'gate' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const def = findEntryDef(t)
      return {
        id: t.id,
        name: t.name,
        label: 'Tiket Utama',
        price: t.price,
        tagline: def.tagline,
        desc: t.description || def.desc,
        image: def.image,
        benefits: def.benefits,
        facilities: def.facilities
      }
    })
  }
  return defaultEntryTickets
})

const wahanaTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'wahana' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const def = findWahanaDef(t)
      const rideData = rides.value.find(r => r.name.toLowerCase() === t.name.toLowerCase())
      const isMaintenance = rideData?.status === 'MAINTENANCE'
      return {
        id: t.id,
        name: t.name,
        label: 'Wahana',
        subLabel: isMaintenance ? 'SEDANG MAINTENANCE' : def.subLabel,
        tagline: def.tagline,
        price: t.price,
        desc: t.description || def.desc,
        image: def.image,
        isMaintenance,
        benefits: def.benefits
      }
    })
  }
  return defaultWahanaTickets
})

const edukasiTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'edukasi' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const def = findEdukasiDef(t)
      return {
        id: t.id,
        name: t.name,
        label: 'Wisata Edukasi',
        subLabel: def.subLabel,
        tagline: def.tagline,
        price: t.price,
        capacity: def.capacity,
        desc: t.description || def.desc,
        image: def.image,
        benefits: def.benefits,
        facilities: def.facilities
      }
    })
  }
  return defaultEdukasiTickets
})

const sewaTempatTickets = computed(() => {
  const filtered = ticketRates.value.filter(t => t.category === 'venue' && t.isActive)
  if (filtered.length > 0) {
    return filtered.map(t => {
      const def = findVenueDef(t)
      return {
        id: t.id,
        name: t.name,
        label: 'Sewa Venue',
        subLabel: def.subLabel,
        tagline: def.tagline,
        price: t.price,
        capacity: def.capacity,
        desc: t.description || def.desc,
        image: def.image,
        images: def.images || [def.image],
        benefits: def.benefits,
        facilities: def.facilities
      }
    })
  }
  return defaultSewaTempatTickets
})

const formatArticleDesc = (desc: string) => {
  if (!desc) return ''
  if (desc.includes('<div style=') || desc.includes('<ul style=')) return desc

  const sections = desc.split('\n\n')
  return sections
    .map(sec => {
      const lines = sec.split('\n').map(l => l.trim()).filter(Boolean)
      if (lines.length === 0) return ''
      
      let html = '<div class="article-desc-block">'
      lines.forEach(line => {
        if (line.endsWith(':') || (line.startsWith('Paket ') && line.includes(':'))) {
          html += `<div class="article-desc-heading">${line}</div>`
        } else if (line.startsWith('•') || line.startsWith('-')) {
          const cleanText = line.replace(/^[•\-]\s*/, '')
          html += `<div class="article-desc-item"><span class="item-bullet">•</span><span class="item-text">${cleanText}</span></div>`
        } else {
          html += `<p class="article-desc-paragraph">${line}</p>`
        }
      })
      html += '</div>'
      return html
    })
    .join('')
}
</script>

<template>
  <div class="self-service-page catalog-page">
    <SelfServiceNavbar activeMenu="fasilitas" />
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="hashtag">#KAMPUNGCOKLAT</span>
        <h1 class="hero-title">Katalog Wahana<br/>& Informasi</h1>
        <p class="hero-subtitle">
          Eksplorasi ragam fasilitas, wahana seru, dan venue pilihan di Kampung Coklat.
        </p>
        <div class="hero-location mt-4" style="justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#f29727" stroke="#2c1a13" stroke-width="2" style="margin-right:8px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>Jl. Banteng - Blorok No. 18, Kademangan, Blitar</span>
        </div>
      </div>
      <div class="torn-edge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path fill="#ffffff" d="M 0,130 L 0,20 C 50,20 50,110 100,110 C 150,110 150,15 200,15 C 250,15 250,80 300,80 C 350,80 350,25 400,25 C 437,25 437,100 475,100 C 512,100 512,10 550,10 C 600,10 600,90 650,90 C 700,90 700,30 750,30 C 800,30 800,115 850,115 C 900,115 900,20 950,20 C 987,20 987,70 1025,70 C 1062,70 1062,15 1100,15 C 1125,15 1125,95 1150,95 C 1175,95 1175,25 1200,25 L 1200,130 Z"></path>
        </svg>
      </div>
    </section>

    <!-- Main Container -->
    <div class="main-container catalog-container">
      
      <!-- Category Selection Tabs -->
      <div class="category-tabs">
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Tiket Masuk' }" @click="selectedProduct = 'Tiket Masuk'">
          <div class="tab-icon-box">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <span class="tab-text">Tiket Utama</span>
        </button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Wahana Permainan' }" @click="selectedProduct = 'Wahana Permainan'">
          <div class="tab-icon-box">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          <span class="tab-text">Wahana</span>
        </button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Wisata Edukasi' }" @click="selectedProduct = 'Wisata Edukasi'">
          <div class="tab-icon-box">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
          </div>
          <span class="tab-text">Edukasi</span>
        </button>
        <button class="tab-btn" :class="{ 'active': selectedProduct === 'Sewa Tempat' }" @click="selectedProduct = 'Sewa Tempat'">
          <div class="tab-icon-box">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </div>
          <span class="tab-text"> Sewa</span>
        </button>
      </div>

      <!-- Catalog Grid -->
      <div class="catalog-grid">
        <template v-if="selectedProduct === 'Tiket Masuk'">
          <div class="elegant-card" v-for="product in entryTickets" :key="product.id">
            <div class="card-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <div class="card-desc" v-html="formatArticleDesc(product.desc)"></div>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Wahana Permainan'">
          <div class="elegant-card" v-for="product in wahanaTickets" :key="product.id">
            <div class="card-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <div class="card-desc" v-html="formatArticleDesc(product.desc)"></div>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Wisata Edukasi'">
          <div class="elegant-card" v-for="product in edukasiTickets" :key="product.id">
            <div class="card-image-wrapper edukasi-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image edukasi-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <div class="card-desc" v-html="formatArticleDesc(product.desc)"></div>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="selectedProduct === 'Sewa Tempat'">
          <div class="elegant-card" v-for="product in sewaTempatTickets" :key="product.id">
            <div class="card-image-wrapper">
              <img :src="product.image" :alt="product.name" class="card-image" />
            </div>
            <div class="card-content">
              <div class="card-price-label">{{ product.label }}</div>
              <h3 class="card-title">{{ product.name }}</h3>
              <div class="card-divider"></div>
              <div class="card-desc" v-html="formatArticleDesc(product.desc)"></div>
              <div class="card-footer">
                <button class="btn-outline-primary" @click="openArticleModal(product)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </template>
      </div>

    </div>

    <SelfServiceFooter />

    <!-- Center Pop-up Modal (Article & Facilities Modal) -->
    <Teleport to="body">
      <Transition name="cmc-fade">
        <div class="center-modal-backdrop" v-if="showArticleModal" @click.self="closeArticleModal">
          <div class="center-modal-card" v-if="selectedArticleItem" @click.stop>
            
            <!-- Sticky Close Button in Top Right of Card -->
            <button class="cmc-close-btn" @click="closeArticleModal" aria-label="Tutup Informasi">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <!-- Scrollable Container -->
            <div class="cmc-scrollable-content">
              
              <!-- Modal Body Content -->
              <div class="cmc-body">
                
                <!-- Badges Header Row -->
                <div class="cmc-badges-row">
                  <span class="cmc-badge-pill cmc-badge-category">{{ selectedArticleItem.label }}</span>
                  <span v-if="selectedArticleItem.subLabel" class="cmc-badge-pill cmc-badge-sub">{{ selectedArticleItem.subLabel }}</span>
                </div>

                <!-- Title & Price Row -->
                <div class="cmc-header-row">
                  <div class="cmc-title-group">
                    <h2 class="cmc-title">{{ selectedArticleItem.name }}</h2>
                    <p class="cmc-tagline">{{ selectedArticleItem.tagline || 'Wisata Edukasi & Rekreasi Keluarga Kampung Coklat Blitar' }}</p>
                  </div>
                  <div class="cmc-price-box" v-if="selectedArticleItem.price !== undefined">
                    <span class="cmc-price-label">Tarif Tiket / Biaya</span>
                    <span class="cmc-price-val">{{ selectedArticleItem.price === 0 ? 'Gratis' : 'Rp ' + selectedArticleItem.price.toLocaleString('id-ID') }}</span>
                  </div>
                </div>

                <!-- Gambar Slide Bergeser (Gambaran Fasilitas) -->
                <div class="cmc-media-wrapper" v-if="getModalImages(selectedArticleItem).length">
                  <div 
                    class="cmc-slider-container" 
                    :class="{ 'is-edukasi-flyer': selectedProduct === 'Wisata Edukasi' }"
                  >
                    <!-- Slider Track -->
                    <div 
                      class="cmc-slider-track" 
                      :style="{ transform: `translateX(-${currentModalImageIndex * 100}%)` }"
                    >
                      <div 
                        v-for="(imgSrc, imgIdx) in getModalImages(selectedArticleItem)" 
                        :key="imgIdx" 
                        class="cmc-slide-item"
                      >
                        <img 
                          :src="imgSrc" 
                          :alt="`${selectedArticleItem.name} - Foto ${imgIdx + 1}`" 
                          class="cmc-ticket-image" 
                        />
                      </div>
                    </div>

                    <!-- Navigation Controls if > 1 images -->
                    <template v-if="getModalImages(selectedArticleItem).length > 1">
                      <!-- Arrow Prev -->
                      <button 
                        type="button"
                        class="cmc-slider-btn prev" 
                        @click.stop="prevModalImage" 
                        aria-label="Foto Sebelumnya"
                        title="Foto Sebelumnya"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>

                      <!-- Arrow Next -->
                      <button 
                        type="button"
                        class="cmc-slider-btn next" 
                        @click.stop="nextModalImage" 
                        aria-label="Foto Selanjutnya"
                        title="Foto Selanjutnya"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>

                      <!-- Photo Counter Badge -->
                      <div class="cmc-photo-counter">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                        <span>{{ currentModalImageIndex + 1 }} / {{ getModalImages(selectedArticleItem).length }} Foto</span>
                      </div>

                      <!-- Pagination Dots -->
                      <div class="cmc-slider-dots">
                        <button 
                          v-for="(_, dotIdx) in getModalImages(selectedArticleItem)" 
                          :key="dotIdx"
                          type="button"
                          class="cmc-dot-btn"
                          :class="{ active: currentModalImageIndex === dotIdx }"
                          @click.stop="setModalImageIndex(dotIdx)"
                          :aria-label="`Pilih Foto ${dotIdx + 1}`"
                        ></button>
                      </div>
                    </template>
                  </div>

                  <!-- Mini Thumbnail Preview Strip (jika lebih dari 1 gambar) -->
                  <div class="cmc-thumb-strip" v-if="getModalImages(selectedArticleItem).length > 1">
                    <button 
                      v-for="(tImg, tIdx) in getModalImages(selectedArticleItem)" 
                      :key="tIdx"
                      type="button"
                      class="cmc-thumb-btn"
                      :class="{ active: currentModalImageIndex === tIdx }"
                      @click.stop="setModalImageIndex(tIdx)"
                      :aria-label="`Lihat Foto ${tIdx + 1}`"
                    >
                      <img :src="tImg" :alt="`Thumbnail ${tIdx + 1}`" class="cmc-thumb-img" />
                    </button>
                  </div>
                </div>

                <!-- Description Narrative -->
                <div class="cmc-desc-card">
                  <div class="article-rich-content" v-html="formatArticleDesc(selectedArticleItem.desc)"></div>
                </div>

                <!-- Benefits & Inclusions Section -->
                <div class="cmc-section" v-if="(selectedArticleItem.benefits && selectedArticleItem.benefits.length) || selectedArticleItem.capacity">
                  <div class="cmc-section-title">
                    <div class="cmc-title-icon bg-amber">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span>Benefit & Fasilitas yang Diperoleh:</span>
                  </div>
                  <div class="cmc-benefits-grid">
                    <!-- Kapasitas Venue / Peserta -->
                    <div v-if="selectedArticleItem.capacity" class="cmc-benefit-item is-capacity-item">
                      <div class="cmc-benefit-bullet">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <span class="cmc-benefit-text font-bold"><strong>{{ selectedArticleItem.capacity.includes('Kapasitas') || selectedArticleItem.capacity.includes('Min.') ? selectedArticleItem.capacity : 'Kapasitas ' + selectedArticleItem.capacity }}</strong></span>
                    </div>

                    <div v-for="(benefit, bIdx) in selectedArticleItem.benefits" :key="bIdx" class="cmc-benefit-item">
                      <div class="cmc-benefit-bullet">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span class="cmc-benefit-text">{{ benefit }}</span>
                    </div>
                  </div>
                </div>

                <!-- Fasilitas Kawasan Wisata Kampung Coklat -->
                <div class="cmc-section">
                  <div class="cmc-section-title">
                    <div class="cmc-title-icon bg-emerald">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    </div>
                    <span>Fasilitas Kawasan Wisata Tersedia:</span>
                  </div>
                  <div class="cmc-facilities-pills">
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🚻</span>
                      <span>Toilet Bersih & Difabel</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🕌</span>
                      <span>Musholla Utama Ber-AC</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🅿️</span>
                      <span>Area Parkir Bus & Mobil</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🌿</span>
                      <span>Gazebo Teduh Kebun Kakao</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🍫</span>
                      <span>Pusat Kuliner Coklat</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">🛍️</span>
                      <span>Pusat Oleh-Oleh Resmi</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">📶</span>
                      <span>Free Wi-Fi Area</span>
                    </div>
                    <div class="cmc-facility-pill">
                      <span class="pill-ico">📸</span>
                      <span>Spot Foto Instagramable</span>
                    </div>
                  </div>
                </div>

                <!-- Extra Info Note -->
                <div class="cmc-info-card">
                  <div class="cmc-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </div>
                  <div>
                    <div class="cmc-info-heading">Informasi Operasional & Pemesanan</div>
                    <p class="cmc-info-text">
                      Jam Operasional Wisata: <strong>Setiap Hari (08.00 - 16.30 WIB)</strong>.
                      Pemesanan tiket masuk perorangan maupun rombongan dapat dilakukan langsung secara instan dan tanpa antre melalui menu <strong>Pesan Tiket</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Footer Actions (Fixed at bottom) -->
            <div class="cmc-footer">
              <button class="cmc-btn-secondary" @click="closeArticleModal">Tutup Informasi</button>
              <button class="cmc-btn-primary" @click="goToBooking">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
                <span>Pesan Tiket Sekarang</span>
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.catalog-page {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background-color: #f8fafc;
}
.catalog-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 40px;
}
.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}
.tab-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 8px 16px 8px 8px;
  border-radius: 16px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 12px;
}
.tab-icon-box {
  width: 36px;
  height: 36px;
  background: #f8fafc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s;
}
.tab-btn.active {
  background: white;
  color: #1e293b;
  border-color: #f29727;
}
.tab-btn.active .tab-icon-box {
  background: #fffbeb;
  color: #f29727;
}
@media (max-width: 575px) {
  .tab-text {
    display: none;
  }
  .tab-btn {
    padding: 8px;
    border-radius: 16px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tab-icon-box {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
  .category-tabs {
    justify-content: center;
    gap: 12px;
  }
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 576px) {
  .catalog-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
}
@media (min-width: 992px) {
  .catalog-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }
}

/* Elegant Card without Price */
.elegant-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}
.elegant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.1);
}
.card-image-wrapper {
  height: 120px;
  overflow: hidden;
  position: relative;
}
@media (min-width: 576px) {
  .card-image-wrapper { height: 180px; }
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.edukasi-image-wrapper {
  height: auto;
}
.edukasi-image {
  height: auto;
  object-fit: contain;
}
.elegant-card:hover .card-image {
  transform: scale(1.05);
}
.card-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
@media (min-width: 576px) {
  .card-content { padding: 20px; }
}
.card-price-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #f29727;
  margin-bottom: 8px;
}
.card-title {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 8px 0;
  line-height: 1.2;
}
@media (min-width: 576px) {
  .card-title { font-size: 18px; margin: 0 0 12px 0; line-height: 1.3; }
}
.card-divider {
  width: 40px;
  height: 3px;
  background: #e2e8f0;
  border-radius: 3px;
  margin-bottom: 12px;
}
.card-desc {
  font-size: 12.5px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 20px;
  flex: 1;
}

:deep(.article-desc-block) {
  margin-bottom: 8px;
}

:deep(.article-desc-block:last-child) {
  margin-bottom: 0;
}

:deep(.article-desc-heading) {
  font-weight: 700;
  color: #1E293B;
  font-size: 12.5px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: block;
}

:deep(.article-desc-item) {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 12px;
  color: #475569;
  line-height: 1.45;
  margin-bottom: 3px;
}

:deep(.item-bullet) {
  color: #D97706;
  font-weight: 800;
  flex-shrink: 0;
  font-size: 13px;
}

:deep(.item-text) {
  flex: 1;
}

:deep(.article-desc-paragraph) {
  font-size: 12.5px;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 4px 0;
}
.card-footer {
  margin-top: auto;
}
.btn-outline-primary {
  width: 100%;
  padding: 10px;
  border: 2px solid #f29727;
  color: #f29727;
  background: transparent;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-outline-primary:hover {
  background: #f29727;
  color: white;
}

/* ==========================================================================
   CENTER POP-UP MODAL (ARTICLE & FACILITIES POPUP)
   ========================================================================== */
.center-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  z-index: 999999;
}

.center-modal-card {
  width: 740px;
  max-width: 96vw;
  max-height: 90vh;
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  animation: cmcPopIn 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cmcPopIn {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.cmc-fade-enter-active,
.cmc-fade-leave-active {
  transition: opacity 0.25s ease;
}

.cmc-fade-enter-from,
.cmc-fade-leave-to {
  opacity: 0;
}

.cmc-scrollable-content {
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cmc-scrollable-content::-webkit-scrollbar {
  width: 6px;
}
.cmc-scrollable-content::-webkit-scrollbar-track {
  background: #F1F5F9;
}
.cmc-scrollable-content::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}
.cmc-scrollable-content::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

.cmc-media-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.cmc-slider-container {
  position: relative;
  width: 100%;
  height: 380px;
  background: #0F172A;
  border-radius: 18px;
  overflow: hidden;
  border: 1.5px solid #E2E8F0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .cmc-slider-container {
    height: 240px;
    border-radius: 14px;
  }
}

.cmc-slider-container.is-edukasi-flyer {
  height: 480px;
  background: #18110B;
}

@media (max-width: 640px) {
  .cmc-slider-container.is-edukasi-flyer {
    height: 340px;
  }
}

.cmc-slider-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.cmc-slide-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0F172A;
}

.cmc-ticket-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

.is-edukasi-flyer .cmc-ticket-image {
  object-fit: contain;
  background: #18110B;
}

.cmc-slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.cmc-slider-btn:hover {
  background: #F29727;
  border-color: #F29727;
  color: #FFFFFF;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 18px rgba(242, 151, 39, 0.45);
}

.cmc-slider-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.cmc-slider-btn.prev {
  left: 14px;
}

.cmc-slider-btn.next {
  right: 14px;
}

.cmc-photo-counter {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  font-size: 11.5px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.cmc-slider-dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
  background: rgba(15, 23, 42, 0.55);
  padding: 5px 12px;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cmc-dot-btn {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.cmc-dot-btn.active {
  width: 22px;
  border-radius: 10px;
  background: #F29727;
}

.cmc-thumb-strip {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px 2px 6px 2px;
  scrollbar-width: thin;
}

.cmc-thumb-strip::-webkit-scrollbar {
  height: 4px;
}
.cmc-thumb-strip::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}

.cmc-thumb-btn {
  flex: 0 0 72px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #E2E8F0;
  padding: 0;
  background: #0F172A;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.cmc-thumb-btn:hover {
  opacity: 0.9;
  border-color: #CBD5E1;
}

.cmc-thumb-btn.active {
  border-color: #F29727;
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(242, 151, 39, 0.35);
}

.cmc-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cmc-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  z-index: 30;
  color: #1E293B;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.cmc-close-btn:hover {
  background: #FFFFFF;
  transform: scale(1.1) rotate(90deg);
  color: #DC2626;
}

.cmc-body {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #FFFFFF;
}

.cmc-badges-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: -4px;
}

.cmc-badge-category {
  background: #FEF3C7;
  color: #B45309;
  border: 1.5px solid #FDE68A;
  font-size: 11.5px;
  font-weight: 800;
  padding: 5px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.cmc-badge-sub {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1.5px solid #BFDBFE;
  font-size: 11.5px;
  font-weight: 800;
  padding: 5px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cmc-badge-capacity {
  background: #ECFDF5;
  color: #047857;
  border: 1.5px solid #A7F3D0;
  font-size: 11.5px;
  font-weight: 800;
  padding: 5px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cmc-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1.5px solid #F1F5F9;
  padding-bottom: 16px;
}

.cmc-title-group {
  flex: 1;
}

.cmc-title {
  font-size: 24px;
  font-weight: 900;
  color: #1E293B;
  margin: 0 0 6px 0;
  line-height: 1.25;
}

.cmc-tagline {
  font-size: 13.5px;
  font-weight: 600;
  color: #D97706;
  margin: 0;
}

.cmc-price-box {
  background: #F0FDF4;
  border: 1.5px solid #BBF7D0;
  border-radius: 14px;
  padding: 10px 16px;
  text-align: right;
  flex-shrink: 0;
}

.cmc-price-label {
  display: block;
  font-size: 10.5px;
  font-weight: 700;
  color: #15803D;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.cmc-price-val {
  font-size: 18px;
  font-weight: 900;
  color: #166534;
}

.cmc-desc-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 16px 20px;
}

.article-rich-content {
  font-size: 14px;
  line-height: 1.7;
  color: #334155;
}

.cmc-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cmc-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
  color: #1E293B;
}

.cmc-title-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cmc-title-icon.bg-amber {
  background: #FEF3C7;
}

.cmc-title-icon.bg-emerald {
  background: #D1FAE5;
}

.cmc-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px 14px;
}

.cmc-benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  padding: 10px 14px;
  border-radius: 12px;
}

.cmc-benefit-bullet {
  width: 20px;
  height: 20px;
  background: #D97706;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.cmc-benefit-text {
  font-size: 13px;
  font-weight: 600;
  color: #78350F;
  line-height: 1.5;
}

.cmc-facilities-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cmc-facility-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 700;
  color: #334155;
}

.pill-ico {
  font-size: 14px;
}

.cmc-info-card {
  display: flex;
  gap: 14px;
  background: #EFF6FF;
  border: 1.5px solid #BFDBFE;
  border-radius: 16px;
  padding: 14px 18px;
  align-items: flex-start;
}

.cmc-info-icon {
  color: #2563EB;
  flex-shrink: 0;
  margin-top: 2px;
}

.cmc-info-heading {
  font-size: 13.5px;
  font-weight: 800;
  color: #1E40AF;
  margin-bottom: 4px;
}

.cmc-info-text {
  font-size: 12.5px;
  line-height: 1.6;
  color: #1E3A8A;
  margin: 0;
}

.cmc-footer {
  padding: 18px 28px;
  background: #F8FAFC;
  border-top: 1.5px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.cmc-btn-secondary {
  padding: 12px 20px;
  background: #FFFFFF;
  border: 1.5px solid #CBD5E1;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}

.cmc-btn-secondary:hover {
  background: #F1F5F9;
  color: #1E293B;
  border-color: #94A3B8;
}

.cmc-btn-primary {
  padding: 12px 24px;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border: none;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 800;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(217, 119, 6, 0.35);
  transition: all 0.2s;
}

.cmc-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(217, 119, 6, 0.5);
}

.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }

/* Existing Hero CSS from old layout */
.hero-banner {
  position: relative;
  min-height: 380px;
  background-image: url('~/assets/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(29,19,14,0.9), rgba(29,19,14,0.7));
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
  margin-top: -30px;
}
.hashtag {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #f29727;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
  color: #ffffff;
}
.hero-subtitle {
  font-size: 16px;
  color: #e2e8f0;
  max-width: 500px;
  margin: 0 auto 24px auto;
  line-height: 1.6;
}
.hero-location {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
}
.torn-edge {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
}
.torn-edge svg {
  width: 100%;
  height: 100%;
}
</style>
