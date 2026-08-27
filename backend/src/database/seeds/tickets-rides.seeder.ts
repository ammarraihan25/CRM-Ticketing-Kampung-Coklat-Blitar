import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TicketRate, TicketCategory } from '../../modules/config/entities/ticket-rate.entity';
import { Ride, RideStatus, RideCategory } from '../../modules/config/entities/ride.entity';

export default class TicketsRidesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const ticketRateRepository = dataSource.getRepository(TicketRate);
    const rideRepository = dataSource.getRepository(Ride);

    // Seed Ticket Rates
    const ticketRatesData = [
      // Gate
      {
        category: TicketCategory.GATE, name: 'Tiket Reguler', imageUrl: '/uploads/images/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png',
        price: 20000, description: '[PROMO] WEEKDAY\nAkses masuk area wisata Kampung Coklat. Menikmati indahnya kebun kakao dan edukasi dasar.', isActive: true
      },
      {
        category: TicketCategory.GATE, name: 'Tiket Terusan', imageUrl: '/uploads/images/assets_POS/POS/wahana/kereta_lokomotif_idr.15k_freeterusan.jpg',
        price: 35000, description: 'ALL ACCESS\nAkses masuk bebas + 5 Wahana Pilihan sepuasnya untuk pengalaman liburan tanpa batas.', isActive: true
      },
      // Wahana
      {
        category: TicketCategory.WAHANA, name: 'Animal Feeding', imageUrl: '/uploads/images/assets_POS/POS/wahana/Animal-Feeding_idr.2k.jpg',
        price: 2000, description: 'Bermain sambil belajar dan berinteraksi langsung dengan hewan-hewan lucu.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Animal Toys', imageUrl: '/uploads/images/assets_POS/POS/wahana/animal_toys_idr.15k_freeterusan.png',
        price: 15000, description: 'Mainan hewan tunggang yang seru untuk anak-anak mengelilingi area.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'ATV Ride', imageUrl: '/uploads/images/assets_POS/POS/wahana/atv_idr.25k.jpg',
        price: 25000, description: 'Pacu adrenalin Anda di lintasan ATV Kampung Coklat yang menantang.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Bom-Bom Car', imageUrl: '/uploads/images/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png',
        price: 15000, description: 'Mobil listrik tabrakan di arena dengan helm anak & dewasa.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Flying Fox', imageUrl: '/uploads/images/assets_POS/POS/wahana/flying-fox_idr.20k.jpg',
        price: 20000, description: 'Wahana seluncur tali melintasi kebun kakao.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Golf Car', imageUrl: '/uploads/images/assets_POS/POS/wahana/golf_car_idr.25k.jpg',
        price: 25000, description: 'Sewa mobil golf keliling area wisata dengan supir.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Istana Balon', imageUrl: '/uploads/images/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png',
        price: 10000, description: 'Wahana balon raksasa untuk anak-anak melompat & bermain.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Karausel', imageUrl: '/uploads/images/assets_POS/POS/wahana/Karausel_idr.15k.png',
        price: 15000, description: 'Wahana kuda putar klasik yang disukai anak-anak.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Kereta Monorel', imageUrl: '/uploads/images/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png',
        price: 15000, description: 'Menikmati pemandangan kebun dari atas monorel.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Kereta Thomas', imageUrl: '/uploads/images/assets_POS/POS/wahana/kereta_lokomotif_idr.15k_freeterusan.jpg',
        price: 10000, description: 'Wahana kereta rel mini untuk anak-anak.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Kolam Renang Anak', imageUrl: '/uploads/images/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png',
        price: 10000, description: 'Kolam renang dangkal untuk anak-anak bermain air.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Kolam Renang Dewasa', imageUrl: '/uploads/images/assets_POS/POS/wahana/kolam_renang_dewasa_idr.10k_freeterusan.jpg',
        price: 15000, description: 'Kolam renang dewasa dengan fasilitas lengkap.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Mini Golf', imageUrl: '/uploads/images/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg',
        price: 15000, description: 'Bermain golf mini di lapangan hijau buatan.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Perahu Ceria', imageUrl: '/uploads/images/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg',
        price: 10000, description: 'Wahana perahu kayu melintasi kolam buatan.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Playground', imageUrl: '/uploads/images/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg',
        price: 15000, description: 'Area bermain anak dengan berbagai macam permainan.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Sepeda Listrik', imageUrl: '/uploads/images/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png',
        price: 35000, description: 'Sewa sepeda listrik berkeliling area wisata.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Terapi Ikan', imageUrl: '/uploads/images/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg',
        price: 5000, description: 'Terapi ikan garra rufa untuk kesehatan kulit kaki.', isActive: true
      },
      {
        category: TicketCategory.WAHANA, name: 'Trampolin', imageUrl: '/uploads/images/assets_POS/POS/wahana/Trampolin_idr.10k_freeterusan.jpg',
        price: 10000, description: 'Wahana trampolin untuk melompat bebas.', isActive: true
      },
      // Venue
      {
        category: TicketCategory.VENUE, name: 'Bale Coklat', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/bale_coklat.jpg',
        price: 500000, description: 'Area semi-outdoor yang luas, cocok untuk gathering komunitas atau acara santai keluarga besar.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Coklat Caffe', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/coklat_caffe.jpg',
        price: 300000, description: 'Kafe bernuansa alam untuk acara bersantai atau kumpul komunitas.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Coklat Garden', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/coklat_garden.jpg',
        price: 400000, description: 'Area taman terbuka yang hijau, ideal untuk pesta kebun atau acara outdoor.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Joglo Jatimarto', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/joglo_jatimarto.jpg',
        price: 750000, description: 'Pendopo tradisional bernuansa klasik Jawa untuk acara keluarga atau pertemuan.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Kampung Coklat Hall', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/kampung_coklat_hall.jpg',
        price: 1500000, description: 'Ruangan indoor eksklusif untuk acara besar pernikahan atau seminar perusahaan.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Private Business Room (PBR)', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/private_business_keep(PBK).png',
        price: 1000000, description: 'Ruang pertemuan VIP eksklusif untuk rapat bisnis dan negosiasi.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Ruang Pertemuan R1', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/ruang_pertemuan_R1.jpeg',
        price: 500000, description: 'Ruang rapat skala menengah dengan fasilitas meeting lengkap.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Taman Edel', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/taman_edel.png',
        price: 350000, description: 'Taman eksotis dengan pepohonan rindang untuk acara santai bersama keluarga.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Theobromine Hall', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/theobromine_hall.jpg',
        price: 1200000, description: 'Hall megah dengan arsitektur menawan untuk perayaan atau konferensi.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Trinitario Hall', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/trinitario_hall.jpg',
        price: 2000000, description: 'Hall paling luas dan premium dengan dekorasi mewah untuk resepsi.', isActive: true
      },
      {
        category: TicketCategory.VENUE, name: 'Wisma Criollo', imageUrl: '/uploads/images/assets_POS/POS/sewa_tempat/wisma_criollo.jpg',
        price: 850000, description: 'Gedung pertemuan eksklusif bernuansa elegan untuk acara VIP atau korporat.', isActive: true
      },
      // Edukasi
      {
        category: TicketCategory.EDUKASI, name: 'Paket Edukasi TK / PAUD', imageUrl: '/uploads/images/assets_POS/POS/paket_edukasi/FLYER-PAKET-TK-PAUD.png',
        price: 35000, description: 'Paket Reguler:\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Kokurikuler (Binatang/Tumbuhan): Rp 39.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Kemah Ceria Prasiaga:\n• Kemah Ceria 1: Rp 50.000 | 2: Rp 37.000 | 3: Rp 32.000\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
      },
      {
        category: TicketCategory.EDUKASI, name: 'Paket Edukasi SD', imageUrl: '/uploads/images/assets_POS/POS/paket_edukasi/FLYER-PAKET-SD.png',
        price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax\n• Industri Coklat: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 38.000/pax\n• Fun Cooking: Rp 35.000/pax\n\nPaket Outbound:\n• Criollo Fun & Edu (P1-P3): Rp 47.000 - Rp 97.000\n• Theo Fun Outbound (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
      },
      {
        category: TicketCategory.EDUKASI, name: 'Paket Edukasi SMP', imageUrl: '/uploads/images/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMP.png',
        price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
      },
      {
        category: TicketCategory.EDUKASI, name: 'Paket Edukasi SMA / Mahasiswa', imageUrl: '/uploads/images/assets_POS/POS/paket_edukasi/FLYER-PAKET-SMA-UNIV-1.png',
        price: 32000, description: 'Paket Reguler:\n• Santripreneur: Rp 32.000/pax | Industri Coklat: Rp 35.000/pax\n• Kewirausahaan: Rp 37.000/pax | Fun Cooking: Rp 35.000/pax\n• Pembelajaran Mendalam: Rp 40.000/pax\n\nPaket LDKS:\n• Paket A: Rp 165.000 | Paket B: Rp 155.000 | Paket C: Rp 85.000\n\nPaket Outbound:\n• Criollo (P1-P3): Rp 47.000 - Rp 97.000\n• Theo (P1-P5): Rp 103.000 - Rp 152.000', isActive: true
      },
      // Rombongan
      {
        category: TicketCategory.ROMBONGAN, name: 'Booking Rombongan Agen', imageUrl: '/uploads/images/tickets/paket_majlis.jpg',
        price: 0, description: 'Pilih tiket khusus rombongan dengan harga berjenjang (tier) berdasarkan jumlah Pax.\n\nFormulir Input Pax dan perhitungan tier harga otomatis akan ditampilkan di sini.', isActive: true
      }
    ];

    for (const data of ticketRatesData) {
      const exists = await ticketRateRepository.findOneBy({ name: data.name });
      if (!exists) {
        const ticketRate = ticketRateRepository.create(data);
        await ticketRateRepository.save(ticketRate);
      }
    }

    // Seed Rides
    const ridesData = [
      {
        name: 'Bom-Bom Car Seru',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/bom-bom-car_idr.15k_freeterusan.png',
        price: 15000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 16,
        duration: '10 Menit',
        description: 'Mobil listrik tabrakan arena dengan pengaman helm anak & dewasa.',
        playedToday: 420,
        category: RideCategory.TERUSAN
      },
      {
        name: 'Kereta Monorel Gantung',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/kereta_monorel_idr.15k_free-terusan.png',
        price: 15000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 24,
        duration: '1 Putaran (15 Mnt)',
        description: 'Menikmati pemandangan kebun kakao dari atas jalur monorel.',
        playedToday: 680,
        category: RideCategory.TERUSAN
      },
      {
        name: 'Istana Balon Ceria',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/Istana_Balon_idr.10k_freeterusan.png',
        price: 10000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 30,
        duration: '30 Menit',
        description: 'Wahana playground balon elastis warna-warni untuk balita dan anak-anak.',
        playedToday: 350,
        category: RideCategory.TERUSAN
      },
      {
        name: 'Kolam Renang Anak & Waterboom',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/kolam_renang_anak_idr.10k_freeterusan.png',
        price: 10000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 50,
        duration: 'Sepuasnya',
        description: 'Wahana air seru dengan seluncuran, ember tumpah, dan air mancur sejuk.',
        playedToday: 510,
        category: RideCategory.WATER
      },
      {
        name: 'ATV Safari Adventure',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/atv_idr.25k.jpg',
        price: 25000,
        isFreeTerusan: false,
        status: RideStatus.BUKA,
        capacity: 8,
        duration: '15 Menit (4 Lap)',
        description: 'Trek tanah menantang mengitari perkebunan kakao alam terbuka.',
        playedToday: 195,
        category: RideCategory.PAID
      },
      {
        name: 'Flying Fox Ekstrem 120M',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/flying-fox_idr.20k.jpg',
        price: 20000,
        isFreeTerusan: false,
        status: RideStatus.BUKA,
        capacity: 4,
        duration: '1 Kali Luncur',
        description: 'Meluncur di atas kanopi kebun coklat dengan standar keamanan safety harness ganda.',
        playedToday: 140,
        category: RideCategory.PAID
      },
      {
        name: 'Mini Golf 9 Holes',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/Mini-Golf_idr.15k_freeterusan.jpg',
        price: 15000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 20,
        duration: '45 Menit',
        description: 'Padang golf mini dengan berbagai rintangan bukit dan terowongan coklat.',
        playedToday: 110,
        category: RideCategory.TERUSAN
      },
      {
        name: 'Perahu Ceria Dayung',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/Perahu_ceria_idr.10k_freeterusan.jpg',
        price: 10000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 12,
        duration: '20 Menit',
        description: 'Menyusuri danau buatan dengan perahu kayuh angsa bersama keluarga.',
        playedToday: 260,
        category: RideCategory.WATER
      },
      {
        name: 'Playground Taman Kakao',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/Playground_B_idr.15k_freeterusan.jpg',
        price: 15000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 40,
        duration: 'Sepuasnya',
        description: 'Ayunan, perosotan, dan panjatan seru di bawah rindangnya pohon coklat.',
        playedToday: 480,
        category: RideCategory.TERUSAN
      },
      {
        name: 'Terapi Ikan Garra Rufa',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/terapi_ikan_idr.5k_freeterusan.jpg',
        price: 5000,
        isFreeTerusan: true,
        status: RideStatus.BUKA,
        capacity: 35,
        duration: '20 Menit',
        description: 'Relaksasi alami dengan gigitan lembut ikan terapi pembersih kulit.',
        playedToday: 620,
        category: RideCategory.WATER
      },
      {
        name: 'Golf Car Keliling Kebun',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/golf_car_idr.25k.jpg',
        price: 25000,
        isFreeTerusan: false,
        status: RideStatus.BUKA,
        capacity: 6,
        duration: '20 Menit',
        description: 'Tur keliling area 5 hektar Kampung Coklat didampingi pengemudi ramah.',
        playedToday: 85,
        category: RideCategory.PAID
      },
      {
        name: 'Sepeda Listrik Wisata',
        imageUrl: '/uploads/images/assets_POS/POS/wahana/sepeda_listrik_idr.35k.png',
        price: 35000,
        isFreeTerusan: false,
        status: RideStatus.MAINTENANCE,
        capacity: 10,
        duration: '30 Menit',
        description: 'E-bike ramah lingkungan untuk eksplorasi mandiri jalur pedestrian kebun.',
        playedToday: 45,
        category: RideCategory.PAID
      }
    ];

    for (const data of ridesData) {
      const exists = await rideRepository.findOneBy({ name: data.name });
      if (!exists) {
        const ride = rideRepository.create(data);
        await rideRepository.save(ride);
      }
    }
  }
}
