# PRODUCT REQUIREMENTS DOCUMENT (PRD)
**Moobi Ticketing & CRM Membership — Kampung Coklat Blitar Edition**

**PT ABSYSTEM TECHNOLOGY SOLUTION**

| No. Dok. | No. Rev. | Tanggal | Effective Date | Hal./Page |
| :--- | :--- | :--- | :--- | :--- |
| KCB-PRD-PRD-2026-001 | 05 | 18 Agustus 2026 | 18 August 2026 | 1 of 11 |

## 1. Document Information & Approvals

### 1.1 Document Revisions
| Date | Version | Document Changes |
| :--- | :--- | :--- |
| 18 Agustus 2026 | 1.0 | Initial Release — Product Requirements Document (PRD) Digitalisasi Tiket & CRM Membership Kampung Coklat Blitar |
| 18 Agustus 2026 | 1.3 | Direct Visual Diagram Embedding — Penyajian Gambar Visual DFD Level 0 & Level 1 Murni Tanpa Tautan Link External |
| 19 Agustus 2026 | 1.4 | B2B & Commission Flow Update — Menambahkan sistem Booking B2B (Down Payment), harga berjenjang (Tier Pricing), Komisi Uang Tunai, dan Role BD (Business Development) |

### 1.2 Approvals
| PIC Role | Nama | Signature | Date |
| :--- | :--- | :--- | :--- |
| PIC Bisnis Moobi | Lathiful Amri | Signed (digital) | 18 Agustus 2026 |
| PIC Teknis Moobi | Aziz Abdullah | Signed (digital) | 18 Agustus 2026 |
| Lead Product Analyst Intern | Mahasiswa Magang TRPL | Signed (digital) | 18 Agustus 2026 |

## 2. Product Overview & Vision

### 2.1 Product Summary
| | |
| :--- | :--- |
| **Nama Produk** | Moobi Ticketing & CRM Membership — Kampung Coklat Blitar Edition |
| **Versi Produk** | V1.3 (Digitalisasi Tiket Wisata & CRM Membership) |
| **Visi Produk** | Membangun ekosistem operasional tiket digital yang 100% cashless, transparan, dan data-driven untuk meningkatkan retensi pengunjung Kampung Coklat. |
| **Platform UI** | PWA Responsive Web App (Kasir POS Tablet & Admin CRM Dashboard) + Web Gate Scanner |
| **Target Pengguna** | Kasir POS, Jamaah Pengajian, Pengunjung Reguler, Agen Tour B2B, Tim Marketing, Owner |
| **Delivery Milestone** | Minggu 1: Interactive Prototype Demo \| Bulan 1 (4 Minggu): Full-Stack Production System |
| **Jangka Waktu Sprint** | 1 Minggu Front-End Prototype Demo + 4 Minggu Full-Stack Development (Total 5 Minggu) |
| **Core Identifier** | Nomor WhatsApp (`nomor_whatsapp`) sebagai Primary Key Unik & Kota/Kabupaten (`domisili`) |
| **Benefit Model** | Voucher Diskon Tiket, Free Ticket Promo, dan Komisi Uang Tunai Khusus B2B (PT) |

### 2.2 Product Vision & Goals
Produk Moobi Ticketing & CRM dirancang untuk menyelesaikan dua isu krusial di Kampung Coklat Blitar: kebocoran kas akibat tiket kertas manual dan lenyapnya profil pengunjung. Produk ini menargetkan 4 indikator keberhasilan utama (Product Goals):
* **PG-01 (Sentralisasi Tiket Digital)**: Menghilangkan antrean tiket kertas dan memotong waktu rekonsiliasi kasir dari 2–3 jam menjadi < 30 menit per shift.
* **PG-02 (Akuisisi Database CRM)**: Merekam data pengunjung (Nomor WA PK & Kota/Kabupaten Domisili) dengan target 10.000+ member terdaftar dalam 1 tahun.
* **PG-03 (Digitalisasi Audiens Pengajian)**: Mendata ribuan jamaah pengajian & tamu hall via Digital Guest Book WA OTP serta memberikan insentif Diskon Tiket / Free Ticket.
* **PG-04 (Marketing Broadcast Readiness)**: Menyediakan antarmuka tabel membership dengan Tombol Blast WA (UI Button Placeholder) untuk pemicuan pesan retargeting promo.

## 3. User Personas & Target Actors

| User Role | Goals & Needs | Pain Points Existing | Product Expectation |
| :--- | :--- | :--- | :--- |
| **Kasir POS (Frontliner)** | Transaksi cepat < 3 detik, pendaftaran member otomatis saat checkout, rekonsiliasi kasir instan. | Harus menghitung karcis kertas manual, rentan selisih kas tunai di penutupan shift. | Layar POS sentuh lebar (tablet), tombol paket tiket besar, otomatis kirim e-ticket WA. |
| **Jamaah Pengajian (PP)** | Masuk area acara cepat, mendaftar member mudah di HP, dapat voucher diskon tiket / free ticket. | Sama sekali tidak terdata, tidak pernah mendapat info promo kunjungan berikutnya. | Scan QR Banner -> Form WA + Domisili singkat -> OTP WA -> Terima Voucher WA. |
| **Pengunjung Reguler (PR)** | Beli tiket tanpa antre panjang, e-ticket aman di HP, masuk gate tinggal scan. | Karcis kertas sering hilang/basah, antre pemeriksaan visual di gate utama. | Dynamic QR E-Ticket di HP, scan di Web Scanner Gate terbuka < 2 detik. |
| **Agen Tour B2B (PT)** | Membuat booking dengan harga sesuai tier pax, bisa DP, dan dapat komisi tunai. | Harga tiket rombongan kaku, booking manual via chat/telepon, tidak ada tracking komisi. | Web portal booking B2B dengan auto-tier pricing dan dashboard saldo komisi. |
| **Business Development (BD)** | Mengatur tabel harga tier, persentase komisi agen, dan mencairkan (withdraw) komisi. | Pusing menghitung komisi manual per agen, sering salah hitung. | Halaman admin BD untuk master data tier dan verifikasi pencairan saldo agen. |
| **Tim Marketing** | Memfilter member berdasar Domisili (Blitar/Kediri/dll) & Tipe Member (PR/PP/PT), memicu promo. | Tidak ada database pengunjung, marketing mandul tanpa kontak audiens. | Dashboard CRM visual, filter domisili, tabel member, Tombol Blast WA UI. |
| **Management / Owner** | Melihat real-time GTV penjualan tiket, grafik demografi domisili, dan kontrol kasir. | Laporan rekap kertas manual datang terlambat di akhir hari. | Owner Mobile Dashboard (read-only), laporan pendapatan otomatis per shift. |

## 4. Product Scope & Feature Requirements

| Feat ID | Module | Feature Name | Description | Priority | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FEAT-01** | POS Tiket | Input Tiket Walk-in | Melayani penjualan tiket reguler & rombongan: input WA + Domisili, tentukan Tipe Member (PR/PP/PT). | Must Have | Transaksi POS tersimpan real-time. |
| **FEAT-02** | POS Tiket | Dynamic QR Ticket | Penerbitan e-ticket QR Code dinamis berenkripsi (berubah per 30 detik). | Must Have | Tiket anti-screenshot. |
| **FEAT-03** | POS Tiket | Redeem Voucher Diskon | Kasir me-redeem voucher diskon tiket / free ticket yang dimiliki member. | Must Have | Potongan harga tiket di struk. |
| **FEAT-04** | POS Tiket | Rekonsiliasi Shift | Laporan penutupan kasir shift: rekap tunai, QRIS, total void, dan selisih. | Must Have | Rekonsiliasi < 30 menit. |
| **FEAT-05** | Access Gate | Web Ticket Scanner | Validasi QR Code e-ticket melalui aplikasi web scanner petugas gate (response < 2 detik). | Must Have | Status tiket ter-update 'USED'. |
| **FEAT-06** | Access Gate | Anti-Passback Rule | Tiket yang sudah discan tidak bisa dipakai ulang di gate pada hari yang sama. | Must Have | Mencegah kebocoran gate. |
| **FEAT-07** | Guest Book | Digital Guest Book | Form registrasi cepat berbasis QR Banner (WA + Domisili -> Auto Member PP). | Must Have | Pendataan jamaah pengajian. |
| **FEAT-08** | Guest Book | WhatsApp OTP Verification | Verifikasi keaslian nomor WA via kode OTP singkat sebelum member PP dibuat. | Must Have | Integritas database WA. |
| **FEAT-09** | Guest Book | Free Ticket / Discount WA | Pesan ucapan selamat datang + Voucher Diskon Tiket / Free Ticket ke WA member. | Must Have | Insentif instant |
| **FEAT-10** | CRM Loyalty | Database WA PK & Domisili | Penyimpanan data member terpusat dengan Nomor WA (PK) dan Domisili. | Must Have | Arsitektur data terpusat. |
| **FEAT-11** | CRM Loyalty | Klasifikasi Tipe Member | Pengelompokkan member berdasarkan Tipe Pengunjung: Reguler (PR), Pengajian (PP), Tour (PT). | Must Have | Segmentasi pengunjung. |
| **FEAT-12** | CRM Loyalty | Discount & Free Ticket Benefit | Sistem penerbitan benefit member berupa Voucher Diskon Tiket & Free Ticket. | Must Have | Direct benefit model. |
| **FEAT-13** | CRM Loyalty | Tombol Blast WA (UI Only) | Tombol aksi 'Blast WA' pada tabel data member / header segmen di UI Membership. | Must Have | UI Trigger Placeholder. |
| **FEAT-14** | CRM Loyalty | Filter Segmen Member & Domisili | Filter data member berdasarkan Tipe Member (PR/PP/PT) dan Kota/Kabupaten asal. | Must Have | Filter demografi visual. |
| **FEAT-15** | WA Notif | Automated WA Welcome | Pesan WA otomatis setelah pendaftaran member berisi ucapan & link e-ticket. | Must Have | Customer onboarding. |
| **FEAT-16** | WA Notif | Confirmation Popup UI | Pop-up konfirmasi di UI saat Tombol Blast WA diklik ('Kirim Promo ke X Member?'). | Must Have | Feedback antarmuka UI. |
| **FEAT-17** | Financial | Laporan Pendapatan GTV | Ringkasan total GTV harian, mingguan, bulanan breakdown per tiket. | Must Have | Kontrol finansial harian. |
| **FEAT-18** | Financial | Laporan Demografi Domisili | Grafik persentase domisili pengunjung & perbandingan member PR vs PP vs PT. | Must Have | Analitik pemasaran. |
| **FEAT-19** | Admin Config | Setup Tiket & Rates | Manajemen harga tiket reguler, rombongan, persentase diskon member PR/PP/PT. | Must Have | Konfigurasi tarif. |
| **FEAT-20** | Admin Config | Role & Permission | Pengaturan hak akses: Admin, Manager, Kasir FO, Marketing, Owner. | Must Have | RBAC Security. |
| **FEAT-21** | Integrasi | WhatsApp Gateway | Koneksi ke official WhatsApp API Gateway untuk OTP & pesan e-ticket/voucher. | Must Have | Kanal komunikasi WA. |
| **FEAT-22** | Integrasi | Payment Gateway QRIS | Koneksi ke PG Midtrans/Xendit/BRI untuk penerbitan QRIS dinamis di POS. | Must Have | Pembayaran cashless. |
| **FEAT-23** | Integrasi | Web Scanner Module | Aplikasi pemindai QR berbasis web responsive untuk petugas verifikator pintu masuk. | Must Have | Verifikasi tiket pintu. |
| **FEAT-24** | B2B Portal | DP Booking Engine | Agen bisa melakukan booking tiket berdasarkan tanggal & pax dengan pembayaran Down Payment (DP) wajib 30% atau Lunas. | Must Have | Terbentuk status booking DP. |
| **FEAT-25** | CRM Loyalty | Cash Commission System | Sistem hitung otomatis & dompet saldo komisi agen tetap 10% dari total transaksi. | Must Have | Saldo komisi agen bertambah. |
| **FEAT-26** | Admin BD | Commission Withdrawal | Fitur approval pencairan komisi oleh BD. | Must Have | Saldo komisi cair ke agen. |

## 5. Functional Requirements (FR)

### FR-001: Pendaftaran Member via POS Kasir
* **Deskripsi**: Sistem POS kasir harus dapat mendaftarkan pengunjung menjadi member bersamaan dengan transaksi beli tiket pertama.
* **Trigger**: Kasir mengklik tombol 'Checkout' di POS.
* **Input Data**: Nomor WhatsApp, Nama Lengkap, Domisili (Kota/Kabupaten), Tipe Member (PR/PP/PT), Pembayaran.
* **Proses/Behavior**: Jika nomor WA belum ada di DB `members`, buat record baru (`nomor_whatsapp` PK, `domisili`, `tipe_member`). Buat invoice POS & terbitkan Dynamic QR E-Ticket.
* **Output**: Profil Member terbentuk & struk keluar + E-ticket terkirim ke WhatsApp.
* **Business Rule**: Nomor WhatsApp bersifat unik dan wajib format E.164 (628xxxxxxxxxx).

### FR-002: Pemindaian QR & Verifikasi Tiket Pintu Masuk Utama
* **Deskripsi**: Sistem Web Scanner harus me-validate payload Dynamic QR Code e-ticket dan meng-update status tiket menjadi USED.
* **Trigger**: Petugas pintu masuk men-scan layar HP pengunjung menggunakan scanner web app.
* **Input Data**: Encrypted QR Payload + Timestamp.
* **Proses/Behavior**: Dekripsi payload -> Cek timestamp (< 30 detik) -> Cek status tiket di DB `tickets` ('ACTIVE') -> Update status 'USED'.
* **Output**: Layar Scanner menampilkan status HIJAU 'TIKET VALID - SILAKAN MASUK'.
* **Business Rule**: Tiket yang sudah berstatus 'USED' ditolak dengan respon MERAH 'TIKET SUDAH DIPAKAI' (Anti-passback).

### FR-003: Digital Guest Book Pengajian & Verification WA OTP
* **Deskripsi**: Sistem harus menyediakan form web ringan berbasis QR Banner untuk pendaftaran mandiri jamaah pengajian dengan verifikasi OTP WA.
* **Trigger**: Jamaah me-scan QR Banner di hall lokasi pengajian.
* **Input Data**: Nomor WhatsApp, Nama Lengkap, Domisili.
* **Proses/Behavior**: Kirim kode OTP via WhatsApp -> Jamaah menginput OTP -> Buat profil member tipe 'PP' (Pengunjung Pengajian) -> Issue Voucher Diskon Tiket / Free Ticket Promo.
* **Output**: Halaman Sukses 'Registrasi Berhasil' + Pesan WhatsApp berisi Voucher.
* **Business Rule**: Jamaah pengajian otomatis terkategori sebagai `tipe_member = 'PP'`.

### FR-004: Manajemen Membership & Tombol Blast WA UI Placeholder
* **Deskripsi**: Dashboard CRM Membership harus menampilkan tabel data member (dengan filter Tipe Member & Domisili) serta Tombol 'Blast WA' pada interface UI.
* **Trigger**: Tim Marketing membuka menu CRM Membership di Admin Dashboard.
* **Input Data**: Filter Tipe Member (PR/PP/PT), Filter Domisili (Blitar/Kediri/dll).
* **Proses/Behavior**: Sistem menampilkan list member terfilter. Saat Marketing mengklik **Tombol 'Blast WA'**, UI memicu Modal Pop-up Konfirmasi Trigger Broadcast.
* **Output**: Modal Pop-up 'Konfirmasi Kirim Pesan Promo ke X Member Tipe Y Domisili Z'.
* **Business Rule**: Pada V1.0, tombol ini berfungsi sebagai UI Placeholder Trigger untuk konfirmasi aksi broadcast.

### FR-005: Booking B2B dengan Sistem Down Payment (DP)
* **Deskripsi**: Agen B2B membuat pemesanan awal tiket rombongan, sistem otomatis menentukan persentase diskon tiket berdasarkan Tier Pax (20-49, 50-99, 100+) lalu agen membayar DP 30% atau Lunas.
* **Trigger**: Agen menekan tombol 'Buat Booking Baru' pada portal B2B.
* **Input Data**: Tanggal Kunjungan, Estimasi Pax.
* **Proses/Behavior**: Hitung Harga Total setelah diskon tier -> Tagihkan DP (30%) -> Agen bayar DP -> Status menjadi `DP_PAID`.
* **Output**: Bukti konfirmasi Booking berstatus DP_PAID dengan Sisa Tagihan.
* **Business Rule**: Pelunasan sisa tagihan wajib dilakukan sebelum H-1 atau di hari-H sebelum cetak tiket. Komisi tetap 10% otomatis ditambahkan ke saldo agen setelah status lunas.

## 6. User Stories & Acceptance Criteria

### US-001: Kasir POS Registrasi Cepat
* **User Story**: Sebagai Kasir POS, saya ingin mendaftarkan member baru cukup dengan menginput nomor WA & Domisili saat checkout, sehingga antrean tiket tidak tersendat.
* **Acceptance Criteria**:
  * **Given**: Kasir berada di modul Checkout POS Kasir.
  * **When**: Kasir memasukkan nomor WA '08123456789' dan Domisili 'Blitar', lalu menekan 'Bayar'.
  * **Then**: Sistem menyimpan '628123456789' sebagai profil member baru (tipe: PR, domisili: Blitar) dan langsung menerbitkan e-ticket QR ke WhatsApp pengunjung.

### US-002: Jamaah Guest Book Pengajian
* **User Story**: Sebagai Jamaah Pengajian, saya ingin mendaftar member via scan QR Banner cukup dengan HP saya, sehingga saya mendapat Voucher Diskon Tiket tanpa antre.
* **Acceptance Criteria**:
  * **Given**: Jamaah memindai QR Banner di hall pengajian.
  * **When**: Jamaah menginput Nomor WA & Domisili 'Kediri' lalu memasukkan kode OTP WA.
  * **Then**: Sistem menyimpan profil member tipe PP (domisili: Kediri) dan otomatis mengirimkan Voucher Diskon Tiket ke pesan WhatsApp jamaah.

### US-003: Verifikasi Tiket Web Scanner Pintu Masuk
* **User Story**: Sebagai Petugas Gate, saya ingin men-scan QR tiket pengunjung menggunakan web scanner di HP/tablet saya agar status validasi tiket langsung terlihat.
* **Acceptance Criteria**:
  * **Given**: Petugas Gate membuka aplikasi Web Scanner.
  * **When**: Petugas me-scan Dynamic QR E-Ticket pengunjung.
  * **Then**: Layar web scanner memvalidasi QR < 2 detik dan menampilkan indikator HIJAU 'TIKET VALID'.

### US-004: Marketing Filter Domisili & Tombol Blast WA
* **User Story**: Sebagai Tim Marketing, saya ingin memfilter member berdasarkan Kota Domisili dan menekan Tombol Blast WA untuk menyiapkan kampanye promosi.
* **Acceptance Criteria**:
  * **Given**: Tim Marketing berada di menu CRM Membership.
  * **When**: Marketing memilih Filter Domisili 'Kediri' dan menekan Tombol 'Blast WA'.
  * **Then**: UI menampilkan Pop-up Konfirmasi 'Kirim Pesan Promo ke 250 Member asal Kediri?' sebagai pemicu interaksi broadcast.

## 7. Database Schema & Data Dictionary (Primary Key: Nomor WhatsApp)
Arsitektur basis data Moobi Ticketing & CRM dirancang dengan menempatkan Nomor WhatsApp (`nomor_whatsapp`) sebagai Primary Key utama, `domisili` sebagai atribut demografi wajib, dan `tipe_member` sebagai pengelompokkan jenis pengunjung utama pada tabel `members`.

### Tabel 7.1: `members` (Master Data Member CRM — Main Table)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `nomor_whatsapp` | VARCHAR(20) | PRIMARY KEY | Nomor WA format E.164 (misal: 628123456789) |
| `nama_lengkap` | VARCHAR(100) | NOT NULL | Nama lengkap pengunjung / jamaah |
| `domisili` | VARCHAR(100) | NOT NULL | Kota / Kabupaten asal (misal: 'Blitar', 'Kediri', 'Tulungagung') |
| `tipe_member` | ENUM | NOT NULL | 'PR' (Pengunjung Reguler), 'PP' (Pengunjung Pengajian), 'PT' (Pengunjung Tour/Travel) |
| `total_spend` | DECIMAL(12,2) | DEFAULT 0 | Total akumulasi pembelian tiket di KC (Rp) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Waktu pendaftaran pertama kali |

### Tabel 7.2: `tickets` (Data Tiket & E-Ticket QR)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `ticket_id` | UUID | PRIMARY KEY | ID unik tiket |
| `nomor_whatsapp` | VARCHAR(20) | FOREIGN KEY | Ref: `members.nomor_whatsapp` |
| `ticket_code` | VARCHAR(50) | UNIQUE, NOT NULL | Payload QR Code Dinamis terenkripsi |
| `paket_id` | VARCHAR(20) | NOT NULL | ID Paket Tiket (Reguler / Group / Edukasi) |
| `status_tiket` | ENUM | DEFAULT 'ACTIVE' | 'ACTIVE', 'USED', 'EXPIRED', 'CANCELLED' |
| `valid_until` | TIMESTAMP | NOT NULL | Batas waktu berlaku tiket |

### Tabel 7.3: `vouchers` (Katalog Voucher Diskon Tiket & Free Ticket)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `voucher_code` | VARCHAR(50) | PRIMARY KEY | Kode unik voucher promo member |
| `nomor_whatsapp` | VARCHAR(20) | FOREIGN KEY | Ref: `members.nomor_whatsapp` |
| `voucher_type` | ENUM | NOT NULL | 'DISCOUNT' (Diskon Tiket %), 'FREE_TICKET' (Tiket Gratis) |
| `benefit_value` | DECIMAL(10,2) | NOT NULL | Nominal diskon (Rp / %) atau kuota tiket gratis |
| `status_claim` | ENUM | DEFAULT 'ISSUED' | 'ISSUED', 'CLAIMED', 'EXPIRED' |
| `expiry_date` | DATE | NOT NULL | Masa tenggang berlaku voucher |

### Tabel 7.4: `pos_transactions` (Header Transaksi Penjualan Kasir POS)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `pos_trx_id` | UUID | PRIMARY KEY | ID unik transaksi POS |
| `nomor_whatsapp` | VARCHAR(20) | FOREIGN KEY | Ref: `members.nomor_whatsapp` |
| `cashier_id` | VARCHAR(50) | NOT NULL | ID Kasir yang bertugas |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Total nominal transaksi tiket setelah diskon (Rp) |
| `payment_method` | ENUM | NOT NULL | 'CASH', 'QRIS', 'DEBIT', 'TRANSFER' |
| `payment_status` | ENUM | DEFAULT 'PAID' | 'PAID', 'REFUNDED', 'VOID' |

### Tabel 7.5: `bookings` (Data Pemesanan DP Agen B2B)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `booking_id` | UUID | PRIMARY KEY | ID unik booking B2B |
| `nomor_whatsapp` | VARCHAR(20) | FOREIGN KEY | Agen pemesan (Ref: `members.nomor_whatsapp`) |
| `visit_date` | DATE | NOT NULL | Tanggal kunjungan |
| `total_pax` | INT | NOT NULL | Jumlah peserta/rombongan |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Harga * Pax (setelah diskon Tier) |
| `dp_amount` | DECIMAL(12,2) | NOT NULL | Nominal DP yang dibayarkan (min 30%) |
| `status` | ENUM | DEFAULT 'PENDING' | 'PENDING', 'DP_PAID', 'FULLY_PAID', 'CANCELLED' |

### Tabel 7.6: `tier_pricings` (Master Data Harga Bertingkat B2B)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `tier_id` | INT | PRIMARY KEY, AUTO INC | ID unik tier harga |
| `min_pax` | INT | NOT NULL | Batas bawah jumlah peserta |
| `max_pax` | INT | NULL | Batas atas jumlah peserta (NULL = tak hingga) |
| `discount_percentage` | DECIMAL(5,2) | NOT NULL | Persentase diskon per tiket (%) |

### Tabel 7.7: `agent_commissions` (Riwayat Transaksi Saldo Komisi Agen)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `trx_id` | UUID | PRIMARY KEY | ID mutasi komisi |
| `nomor_whatsapp` | VARCHAR(20) | FOREIGN KEY | Agen penerima (Ref: `members.nomor_whatsapp`) |
| `trx_type` | ENUM | NOT NULL | 'CREDIT' (Komisi masuk), 'DEBIT' (Pencairan/Withdrawal) |
| `amount` | DECIMAL(12,2) | NOT NULL | Nominal mutasi (Rp) |
| `status` | ENUM | DEFAULT 'PENDING' | 'PENDING', 'APPROVED', 'REJECTED' (Khusus Withdrawal oleh BD) |

## 8. System Architecture & Data Flow Diagram (DFD)

### 8.1 Diagram Konteks Visual (DFD Level 0)
Diagram Konteks memperlihatkan interaksi antara 8 entitas luar (Pengunjung/Member, Jamaah Pengajian, Kasir POS, Petugas Gate Verifikator, WhatsApp API, Payment Gateway QRIS, Tim Marketing, dan Owner) dengan Sistem Utama Moobi Tiket & CRM.

### 8.2 Data Flow Diagram Level 1 (DFD Level 1)
DFD Level 1 menguraikan 6 sub-proses utama (Registrasi Member 1.0, Penjualan POS 2.0, Validasi Gate 3.0, Guest Book Pengajian 4.0, CRM Membership 5.0, dan Financial Reporting 6.0) serta alur penyimpanan data ke 4 Data Store (`members`, `tickets`, `vouchers`, `pos_transactions`).

## 9. Non-Functional Requirements (NFR)

| Kategori NFR | Spesifikasi Standar | Mekanisme Pengujian / Verifikasi |
| :--- | :--- | :--- |
| **Performance** | Scan QR E-Ticket & pemindaian Web Scanner latency < 2 detik. Response time POS Kasir < 3 detik per transaksi. | Load testing 500 transaksi simultan via JMeter. |
| **Availability** | SLA Uptime server cloud minimum 99.5% selama jam operasional wisata (07.00 - 18.00 WIB). | CloudWatch uptime monitoring & auto-restart. |
| **Security & PDP** | Enkripsi data nomor WhatsApp (AES-256) sesuai UU Perlindungan Data Pribadi (PDP). HTTPS enforced. | Security audit & penetration testing ringan. |
| **Data Integrity** | Nomor WhatsApp unik sebagai Primary Key. Tidak diperbolehkan duplikasi record member di DB. | Database UNIQUE constraint & E.164 validator. |
| **Usability / UI UX** | UI POS Kasir dioptimalkan untuk layar Tablet sentuh (landscape). UI Guest Book mobile-first. | Usability testing dengan kasir loket Kampung Coklat. |

## 10. Release & Timeline Plan
Pelaksanaan proyek terbagi menjadi dua milestone utama: Minggu 1 (Interactive Prototype Demo) dan Bulan 1 / 4 Minggu (Full-Stack System Production).

| Tahap / Periode | Durasi | Deliverable Inti & Target Milestone | Status Target |
| :--- | :--- | :--- | :--- |
| **Tahap 1 (Minggu 1)** | 1 Minggu | Penyelesaian UI/UX Interactive Prototype Demo (POS Kasir, Digital Guest Book, Access Gate Web Scanner, Dashboard CRM dengan Tipe Member PR/PP/PT & Tombol Blast WA). Demonstrasi ke Stakeholder Kampung Coklat. | Demo Ready |
| **Tahap 2 (Bulan 1 - Phase A)** | 2 Minggu | Full-Stack Dev Phase A: Cloud DB Setup (WA PK, Domisili, Tipe Member), Rest API Backend, POS Kasir Tiket, Web Ticket Scanner Module Integration. | Full-Stack Sprint 1 |
| **Tahap 2 (Bulan 1 - Phase B)** | 2 Minggu | Full-Stack Dev Phase B: Digital Guest Book WA OTP, Benefit Engine Diskon Tiket & Free Ticket, CRM Filter Tipe Member & Domisili, UI Blast WA, & Financial Summary. | Full-Stack Sprint 2 |
| **Tahap 3 (Akhir Bulan 1)** | 1 Minggu | QC Internal, UAT Simulation dengan Staf Kasir & Gate Kampung Coklat, Staff Training, Bug Fixing, & Go-Live Production. | QA & Go-Live |

## 11. Document Sign-off & Kesimpulan
Dokumen Product Requirements Document (PRD) ini menjadi panduan teknis resmi bagi seluruh tim pengembang (Developer, QA, UI/UX Designer, dan Analyst Intern) dalam merealisasikan software Moobi Ticketing & CRM Platform sesuai acuan kebutuhan bisnis (BRD).

Blitar, 18 Agustus 2026

**Disiapkan Oleh:**
Lead Product Analyst (Intern)
_______________________
Tim Magang TRPL

**Dinegosiasi & Disetujui Oleh:**
PIC Bisnis Moobi Platform
_______________________
Lathiful Amri
