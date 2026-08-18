# BUSINESS REQUIREMENTS DOCUMENT (BRD)
**Moobi Ticketing & CRM Membership — Kampung Coklat Blitar Edition**

**PT ABSYSTEM TECHNOLOGY SOLUTION**

| No. Dok. | No. Rev. | Tanggal | Effective Date | Hal./Page |
| :--- | :--- | :--- | :--- | :--- |
| KCB-PRD-BRD-2026-001 | 05 | 18 Agustus 2026 | 18 August 2026 | 1 of 11 |

## 1. Document Revisions

| Date | Version | Document Changes |
| :--- | :--- | :--- |
| 18 Mei 2026 | 0.1 | Initial Draft — Analisa Kebutuhan Awal Tiket & CRM Kampung Coklat |
| 17 Agustus 2026 | 0.2 | Visualized Edition — Problem Statement, Objectives & Actor Mapping |
| 18 Agustus 2026 | 1.0 | Full Standardized Release — Penyesuaian Template Moobi Hotel Lite, Penambahan DFD & Database Schema dengan Primary Key Nomor WhatsApp |
| 18 Agustus 2026 | 1.1 | Scope Refinement — Fokus Murni pada Digitalisasi Tiket & CRM Membership (Menghapus Akses Wahana & Bab Value Added, Penambahan Tombol Blast WA di Membership) |
| 18 Agustus 2026 | 1.2 | Benefit & Timeline Update — Mengubah Benefit Membership menjadi Diskon Tiket / Free Ticket (tanpa poin), Penambahan Kolom 'Domisili' pada Tabel Members, dan Penyesuaian Timeline (1 Minggu Demo Prototype + 1 Bulan Full-Stack Dev) |
| 18 Agustus 2026 | 1.3 | Membership Classification Update — Klasifikasi Membership Dibedakan berdasarkan Tipe Pengunjung (Pengunjung Reguler, Pengunjung Pengajian, Pengunjung Tour) dan Menghapuskan Skema Tiering (Bronze/Silver/Gold) |
| 18 Agustus 2026 | 1.4 | DFD Visual Diagrams Embedding — Menyajikan Diagram Visual DFD Konteks (Level 0) dan DFD Level 1 dalam Bentuk Gambar Visual Beresolusi Tinggi |

## 2. Approvals

| PIC | Nama | Signature | Date |
| :--- | :--- | :--- | :--- |
| PIC Bisnis Moobi | Lathiful Amri | Signed (digital) | 18 Agustus 2026 |
| PIC Teknis Moobi | Aziz Abdullah | Signed (digital) | 18 Agustus 2026 |
| Management KC | Tim Manajemen Kampung Coklat | Pending UAT | 18 Agustus 2026 |
| Lead Analyst Intern | Mahasiswa Magang TRPL | Signed (digital) | 18 Agustus 2026 |

## 3. Product Summary

| | |
| :--- | :--- |
| **Nama Produk** | Ticketing & CRM Membership — Kampung Coklat Blitar Edition |
| **Versi** | V1.4 (Digitalisasi Tiket Wisata & CRM Membership dengan Visual DFD Diagrams) |
| **Target Segmen** | Destinasi Wisata Edukasi, Agrowisata & Event Hall (Kampung Coklat Blitar) |
| **Model** | Cloud SaaS — Self-service POS, Turnstile Gate Middleware, WhatsApp Gateway & QRIS Integrated |
| **Platform** | Web-based Cloud (PWA responsive), POS Tablet Android/Windows, Turnstile Controller Middleware |
| **Delivery Target** | Minggu 1: Interactive Prototype Demo \| Bulan 1 (4 Minggu): Full-Stack Production System |
| **Target Pengerjaan Dev** | 1 Minggu Front-End Prototype Demo + 4 Minggu Full Stack Development (Total 5 Minggu) |
| **PIC Bisnis** | Lathiful Amri (PT ABSystem Technology Solution) |
| **PIC Teknis** | Aziz Abdullah & Lead Engineer |
| **Biaya SaaS Target** | Rp 10.000.000 / bulan (all-in cloud support, SLA 99.5%, maintenance, WA Gateway integration) |

## 4. Introduction

### 4.1 Objectives
Moobi Ticketing & CRM Membership adalah solusi SaaS terpadu berbasis cloud yang dirancang khusus untuk mentransformasi sistem operasional destinasi wisata Kampung Coklat Blitar dari model transaksional konvensional manual menjadi ekosistem digital berbasis data. Fokus proyek ini secara spesifik berorientasi pada 2 pilar utama: Digitalisasi Tiket Wisata dan Manajemen CRM Membership. Inisiatif ini berfokus pada 5 tujuan inti:
1. **Otomatisasi Tiket Masuk 100%**: Mendigitalisasi 100% jalur penjualan tiket di loket dan validasi di pintu masuk utama (Turnstile Gate) guna menghapuskan tiket kertas fisik dan celah kebocoran kas.
2. **Eliminasi Revenue Leakage**: Menutup potensi kebocoran uang tunai (revenue leakage) dan memangkas durasi rekonsiliasi kas harian kasir dari 2–3 jam menjadi kurang dari 30 menit.
3. **Akusisi Member berbasis Tipe Pengunjung & Domisili**: Mengubah pengunjung anonim menjadi member terdaftar dengan mencatat Nomor WhatsApp (Primary Key), Nama, Domisili (Kota/Kabupaten), serta Kategorisasi Tipe Member (Reguler, Pengajian, Tour).
4. **Benefit Diskon Tiket & Free Ticket**: Memberikan benefit langsung berupa Voucher Diskon Tiket dan Tiket Gratis (Free Ticket) yang disesuaikan dengan kategori tipe pengunjung (tanpa skema tiering / poin).
5. **Fitur Blast WA pada Dashboard Membership**: Menyediakan antarmuka manajemen member bagi tim marketing dengan Tombol Blast WA (UI Button Placeholder) untuk memicu pesan promo retargeting ke WhatsApp member sesuai kategori tipe pengunjung dan domisili.

### 4.2 Background
Kampung Coklat Blitar melayani lebih dari 1.000 pengunjung per hari dengan berbagai kategori tiket kunjungan (Reguler, Pengajian, Tour Travel B2B, Edukasi Sekolah, Kemah Ceria, dan Sewa Hall). Evaluasi operasional menunjukkan hambatan mendasar pada dua area utama:
a. **Tiket Kertas & Rekonsiliasi Kasir Manual**: Penjualan tiket masuk di loket mengandalkan karcis kertas dan uang tunai. Kasir manual sangat rentan selisih kas dan membutuhkan waktu lama untuk rekonsiliasi penutupan shift.
b. **Zero Visibility Profil, Domisili & Tipe Pengunjung**: Pengunjung masuk melalui gerbang tanpa pencatatan identitas, domisili, dan kategori tipe kunjungan. Pihak manajemen tidak memiliki data demografi wilayah mana yang menjadi kantong pengunjung terbesar untuk promosi berkala.
c. **Trafik Pengajian Tak Terdata**: Jamaah pengajian dan tamu undangan hall datang dalam jumlah masif (ratusan hingga ribuan per sesi) namun pulang tanpa terdata sebagai Member Pengajian (PP) dan tanpa insentif diskon tiket untuk kunjungan berikutnya.
d. **Pemeriksaan Pintu Masuk Lambat**: Validasi tiket masuk di pintu gerbang utama dilakukan visual satu per satu oleh petugas, memicu antrean panjang pada peak season.

### 4.3 Scope — In vs Out
**IN SCOPE (Moobi Ticketing & CRM Platform):**
* Pembuatan Interactive Prototype Demo dalam 1 minggu pertama untuk alignment stakeholder.
* Modul Kasir POS (Walk-in, Tiket Reguler, Group Booking, Cetak Struk / E-Ticket WA).
* Penerbitan E-Ticket Dynamic QR Code (anti-screenshot).
* Integrasi Pintu Masuk Utama via Turnstile Gate Relay Middleware Controller.
* Modul Digital Guest Book (Form Web Ringan + WA OTP Fast Registration + Input Data Domisili untuk Pengunjung Pengajian & Event Hall).
* Modul CRM Membership Engine (Database WhatsApp PK, Field Domisili, Klasifikasi Tipe Member: Reguler [PR], Pengajian [PP], Tour [PT], Skema Benefit Diskon Tiket & Free Ticket).
* Antarmuka Dashboard Membership dengan **Tombol Blast WA (UI Button Placeholder)** untuk memicu aksi broadcast promosi berdasarkan segmen Tipe Member dan Domisili.
* Dashboard Keuangan Real-time, Laporan Kasir per Shift & Rekapitulasi GTV Harian.
* Development Full-Stack Sistem Siap Produksi dalam durasi 1 Bulan.

**OUT OF SCOPE (Pengembangan Lanjutan / Tidak Termasuk):**
* Skema Tiering Membership (Bronze, Silver, Gold) dan Sistem Perolehan Poin Belanja.
* Akses Wahana / Perangkat EDC Tap Wahana / Pemotongan Saldo Wahana.
* Backend Engine Queuing WhatsApp Mass Broadcast secara otomatis (Hanya disediakan Tombol Blast WA pada UI Membership).
* Integrasi otomatis ke Online Travel Agent (OTA) eksternal (Traveloka, Tiket.com).
* Modul Kasir Food & Beverage (F&B / Kafe internal).
* Pengadaan hardware fisik (Mesin Turnstile Gate, Tablet POS, Printer, Jaringan Internet/WiFi).

### 4.4 Technical Requirements

| | |
| :--- | :--- |
| **Platform** | Web Application — Progressive Web App (PWA), mobile first & POS tablet layout |
| **Frontend** | React.js / Vue.js responsive UI (Optimized for Android/Windows POS & Admin Dashboard) |
| **Backend** | Node.js (Express/NestJS) |
| **Database** | PostgreSQL 14+ / MySQL 8.0+ (Nomor WhatsApp Primary Key + Field Domisili + Tipe Member ENUM) |
| **Hosting** | Cloud VPS (AWS / GCP / DigitalOcean) dengan SSL Enforced |
| **Authentication** | JWT, Multi-device Session Management, Role-Based Access Control (RBAC) |
| **Payment Gateway** | QRIS Integrated (Midtrans / Xendit / BRI Payment Gateway) |
| **WhatsApp API** | Official WhatsApp API Gateway for OTP Verification & Automated E-Ticket / Voucher Delivery |
| **UI Components** | Interactive Membership Table with Domisili & Tipe Member Filter + Action Button 'Kirim Blast WA' |
| **Development Milestone** | Minggu 1: Interactive Front-End Demo \| Bulan 1 (4 Minggu): Full-Stack Production System |

## 5. User Journey & Data Flow

### 5.1 User Journey — Dari Pembelian Tiket Hingga Benefit Diskon & WA Blast
Target: Pengunjung terdaftar ke dalam database CRM berdasarkan kategori Tipe Member (Reguler, Pengajian, Tour) beserta kota/kabupaten domisili dan langsung menerima benefit berupa voucher diskon tiket / free ticket.

| Step | Deskripsi |
| :--- | :--- |
| **01 \| Kedatangan Pengunjung** | Pengunjung tiba di Kampung Coklat via jalur Wisata Reguler, Jamaah Pengajian, atau Rombongan B2B. |
| **02 \| Titik Registrasi / POS** | Pengunjung reguler ke Loket Kasir POS; Jamaah pengajian me-scan QR Banner Digital Guest Book di pintu hall; Tour Agent mendaftar via Portal B2B. |
| **03 \| Input Nomor WA, Domisili & Tipe Member** | Sistem mencatat Nomor WA (`nomor_whatsapp` PK), Nama, Kota/Kabupaten Domisili, dan mengelompokkan Tipe Member: Reguler (`PR`), Pengajian (`PP`), atau Tour (`PT`). |
| **04 \| Penerbitan E-Ticket & Benefit Voucher** | Sistem menerbitkan E-Ticket QR Code serta mengasosiasikan Benefit Member berupa Voucher Diskon Tiket / Free Ticket Promo yang terkirim ke WhatsApp. |
| **05 \| Scan Turnstile Gate Utama** | Pengunjung me-scan Dynamic QR Code di Turnstile Gate Utama. Sensor memvalidasi payload -> Gate terbuka otomatis. |
| **06 \| Penggunaan Benefit Diskon / Free Ticket** | Pada kunjungan berikutnya / pembelian tiket rombongan, member me-redeem Voucher Diskon Tiket atau Free Ticket yang dimiliki sesuai tipe member. |
| **07 \| Filter Tipe Member & Domisili di UI** | Tim Marketing membuka Dashboard CRM Membership, memfilter member berdasarkan Tipe Member (`PR`/`PP`/`PT`) dan Domisili (misal: Pengajian asal Kediri). |
| **08 \| Pemicuan Tombol Blast WA** | Marketing mengklik **Tombol 'Blast WA'** pada UI Membership untuk memicu interaksi pesan promo retargeting. |

### 5.2 Data Flow Diagram (DFD) & Alur Data Sistem
Arsitektur alur data Moobi Ticketing & CRM disajikan secara visual dalam bentuk **Diagram Konteks (DFD Level 0)** dan **DFD Level 1 Diagram** (Diagram disajikan di dokumen aslinya).

#### 5.2.1 Diagram Konteks (DFD Level 0)
Diagram Konteks memperlihatkan entitas luar (Pengunjung, Jamaah Pengajian, Kasir POS, Turnstile Gate, Marketing, Owner, WA API, Payment Gateway) yang berinteraksi secara langsung dengan Sistem Utama Moobi Ticketing & CRM.

#### 5.2.2 Data Flow Diagram Level 1 (DFD Level 1)
DFD Level 1 menguraikan 6 sub-proses utama (Registrasi Member 1.0, POS Tiket 2.0, Turnstile Gate 3.0, Guest Book 4.0, CRM Membership & Blast WA UI 5.0, serta Financial Reporting 6.0) dan alur data ke Data Store (`members`, `tickets`, `vouchers`, `pos_transactions`):

**Rincian Alur Data Sub-Proses DFD Level 1:**
* **Process 1.0 (Registrasi & Autentikasi Member)**: Kasir/Guest Book/Portal B2B menginput `nomor_whatsapp`, `nama`, & `domisili` -> System menetapkan `tipe_member` (`PR`/`PP`/`PT`) -> Simpan ke data store `members` (`nomor_whatsapp` PK).
* **Process 2.0 (Penjualan POS & Reduksi Diskon Tiket)**: Kasir memilih tiket -> System menghitung total (memotong diskon voucher sesuai tipe member jika ada) -> Request PG QRIS -> Status Lunas -> Simpan ke data store `pos_transactions` & `tickets` -> Issue Dynamic QR E-Ticket via WA Gateway.
* **Process 3.0 (Validasi Access Gate Utama)**: Scanner Turnstile membaca QR Code -> Decrypt payload -> Validasi timestamp & status tiket di data store `tickets` -> Jika valid, update status tiket menjadi 'USED' & kirim sinyal relay BUKA GATE ke Turnstile Controller.
* **Process 4.0 (Digital Guest Book & Benefit Member Pengajian)**: Jamaah me-scan QR Banner -> Mengisi `nomor_whatsapp` & `domisili` -> Verifikasi OTP WA -> Simpan member tipe 'PP' (Pengajian) -> Issue Voucher Diskon Tiket / Free Ticket Promo ke data store `vouchers` via WA Gateway.
* **Process 5.0 (CRM Membership, Filter Tipe Member & Tombol Blast WA)**: Marketing memfilter member berdasar Tipe Member (`PR`/`PP`/`PT`) & Domisili pada UI -> Menekan **Tombol 'Blast WA'** pada interface UI -> UI menampilkan Modal Konfirmasi Trigger Broadcast.
* **Process 6.0 (Financial Reporting & Analisis Tipe Member)**: Aggregator menghitung total transaksi dari data store `pos_transactions` -> Menyusun laporan GTV Penjualan Tiket, Rekapitulasi Kasir Shift, Demografi Domisili, dan Distribusi Tipe Member -> Menampilkan ke Owner Dashboard & Kirim Summary Harian via WA.

## 6. Business Requirements — Feature List
Keterangan Priority: Must Have = Wajib V1.4 (MVP) \| Should Have = Prioritas V1.5 \| Nice to Have = Release Selanjutnya

| No. | Module | Feature | Description | Priority | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | Dashboard | KPI Real-time | Total pengunjung harian, GTV penjualan tiket, rekap domisili & tipe member, kasir aktif dalam 1 layar. | **Must Have** | Owner & Manager |
| **1.2** | Dashboard | Owner Mobile View | Akses dashboard KPI ringkas dari smartphone khusus role Owner (read only). | **Must Have** | High value pain point |
| **1.3** | Dashboard | Alert In-App | Notifikasi selisih kas atau antrean gate tinggi. | **Should Have** | System monitoring |
| **2.1** | Ticketing POS | Input Tiket Walk-in | Melayani penjualan tiket reguler & rombongan: input WA + Domisili, tentukan Tipe Member (PR/PP/PT), pilih tiket, bayar. | **Must Have** | Kasir Front Office |
| **2.2** | Ticketing POS | Dynamic QR Ticket | Penerbitan e-ticket QR Code | **Must Have** | Cegah screenshot |
| **2.3** | Ticketing POS | Cetak Struk & WA Ticket | Struk fisik termal + otomatis kirim link e-ticket ke WhatsApp pengunjung. | **Must Have** | Dual delivery |
| **2.4** | Ticketing POS | Redeem Voucher Diskon | Kasir me-redeem voucher diskon tiket / free ticket yang dimiliki member di POS. | **Must Have** | Direct benefit claim |
| **2.5** | Ticketing POS | Rekonsiliasi Kasir Shift | Laporan penutupan kasir shift: rekap tunai, QRIS, total void, dan selisih. | **Must Have** | Memotong waktu rekonsiliasi |
| **3.1** | Access Gate | Turnstile Scanner | Validasi QR Code e-ticket di mesin Turnstile Gate Utama (response < 2 detik). | **Must Have** | Otomatisasi gate |
| **3.2** | Access Gate | Anti-Passback Rule | Tiket yang sudah discan tidak bisa dipakai ulang di gate utama pada hari yang sama. | **Must Have** | Cegah kebocoran |
| **3.3** | Access Gate | Manual Override Gate | Tombol darurat bagi kasir/supervisor untuk membuka gate jika listrik/koneksi padam. | **Must Have** | SOP Fallback |
| **4.1** | Guest Book | Digital Guest Book | Form registrasi cepat berbasis QR Banner untuk jamaah pengajian (WA + Domisili -> Auto Member PP). | **Must Have** | Pendataan pengajian |
| **4.2** | Guest Book | WhatsApp OTP Verification | Verifikasi keaslian nomor WA via kode OTP singkat sebelum member PP dibuat. | **Must Have** | Database hygiene |
| **4.3** | Guest Book | Free Ticket / Discount WA | Pesan ucapan selamat datang + Voucher Diskon Tiket / Free Ticket ke WA jamaah. | **Must Have** | Instant member reward |
| **5.1** | CRM Loyalty | Database WA PK & Domisili | Penyimpanan data member terpusat dengan Nomor WA (PK), Kota/Kabupaten Domisili, dan Tipe Member. | **Must Have** | Core Data Architecture |
| **5.2** | CRM Loyalty | Discount & Free Ticket Benefit | Sistem penerbitan benefit member berupa Voucher Diskon Tiket & Free Ticket Promo yang disesuaikan dengan Tipe Member. | **Must Have** | Direct benefit model |
| **5.3** | CRM Loyalty | Klasifikasi Tipe Member | Pengelompokkan member berdasarkan Tipe Pengunjung: Reguler (PR), Pengajian (PP), Tour Travel (PT) — Menggantikan skema tiering. | **Must Have** | Visitor classification |
| **5.4** | CRM Loyalty | Tombol Blast WA (UI Only) | Tombol aksi 'Blast WA' pada tabel data member / header segmen tipe member di UI Membership. | **Must Have** | UI Placeholder Trigger |
| **5.5** | CRM Loyalty | Filter Segmen Member & Domisili | Filter data member berdasarkan Tipe Member (PR/PP/PT) dan Kota/Kabupaten asal. | **Must Have** | Demographic filter |
| **6.1** | WA Notification | Automated WA Welcome | Pesan WA otomatis setelah pendaftaran member berisi ucapan & link e-ticket/voucher. | **Must Have** | Customer onboarding |
| **6.2** | WA Notification | Confirmation Popup UI | Pop-up konfirmasi di UI saat Tombol Blast WA diklik ('Kirim Pesan Promo ke X Member Tipe Y Domisili Z?'). | **Must Have** | UI feedback |
| **7.1** | Financial | Laporan Pendapatan (GTV) | Ringkasan total GTV harian, mingguan, bulanan breakdown per kategori tiket. | **Must Have** | Financial control |
| **7.2** | Financial | Rekapitulasi Shift | Laporan penerimaan tunai vs QRIS per kasir per shift. | **Must Have** | Audit kas |
| **7.3** | Financial | Laporan Demografi & Tipe Member | Grafik persentase domisili pengunjung & perbandingan proporsi member PR vs PP vs PT. | **Must Have** | Marketing analytics |
| **8.1** | Admin Config | Setup Tiket & Benefit Rates | Manajemen harga tiket reguler, rombongan, persentase diskon member PR/PP/PT, dan free ticket promo. | **Must Have** | Price & benefit config |
| **8.2** | Admin Config | Role & Permission | Pengaturan hak akses: Admin, Manager, Kasir FO, Marketing, Owner. | **Must Have** | RBAC Security |
| **8.3** | Admin Config | Audit Log Permanent | Pencatatan seluruh perubahan harga, void transaksi, dan aktivitas sistem. | **Must Have** | Anti-fraud audit |
| **9.1** | Integrasi | WhatsApp Gateway | Koneksi ke official WhatsApp API Gateway untuk OTP & pesan e-ticket/voucher. | **Must Have** | Core channel |
| **9.2** | Integrasi | Payment Gateway QRIS | Koneksi ke PG Midtrans/Xendit/BRI untuk penerbitan QRIS dinamis di POS. | **Must Have** | Cashless payment |
| **9.3** | Integrasi | Turnstile Hardware | Middleware pengontrol relay Turnstile Gate Utama. | **Must Have** | IoT Gate Hardware |

## 7. Database Schema & Data Dictionary (Primary Key: Nomor WhatsApp)
Arsitektur basis data Moobi Ticketing & CRM dirancang dengan menempatkan **Nomor WhatsApp (`nomor_whatsapp`) sebagai Primary Key utama**, **`domisili` sebagai atribut demografi wajib**, dan **`tipe_member` sebagai pengelompokkan jenis pengunjung utama** pada tabel `members`. Seluruh tabel transaksi tiket, voucher diskon/free ticket, dan POS mengacu pada `nomor_whatsapp` sebagai Foreign Key (FK).

### Tabel 7.1: `members` (Master Data Member CRM — Main Table)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `nomor_whatsapp` | VARCHAR(20) | **PRIMARY KEY** | Nomor WA format E.164 (misal: 628123456789) |
| `nama_lengkap` | VARCHAR(100) | NOT NULL | Nama lengkap pengunjung / jamaah |
| `domisili` | VARCHAR(100) | NOT NULL | Kota / Kabupaten asal (misal: 'Blitar', 'Kediri', 'Tulungagung') |
| `tipe_member` | ENUM | NOT NULL | 'PR' (Pengunjung Reguler), 'PP' (Pengunjung Pengajian), 'PT' (Pengunjung Tour/Travel) |
| `total_spend` | DECIMAL(12,2) | DEFAULT 0 | Total akumulasi pembelian tiket di KC (Rp) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Waktu pendaftaran pertama kali |

### Tabel 7.2: `tickets` (Data Tiket & E-Ticket QR)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `ticket_id` | UUID | **PRIMARY KEY** | ID unik tiket |
| `nomor_whatsapp` | VARCHAR(20) | **FOREIGN KEY** | Ref: `members.nomor_whatsapp` |
| `ticket_code` | VARCHAR(50) | UNIQUE, NOT NULL | Payload QR Code Dinamis terenkripsi |
| `paket_id` | VARCHAR(20) | NOT NULL | ID Paket Tiket (Reguler / Group / Edukasi) |
| `status_tiket` | ENUM | DEFAULT 'ACTIVE' | 'ACTIVE', 'USED', 'EXPIRED', 'CANCELLED' |
| `valid_until` | TIMESTAMP | NOT NULL | Batas waktu berlaku tiket |

### Tabel 7.3: `vouchers` (Katalog Voucher Diskon Tiket & Free Ticket)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `voucher_code` | VARCHAR(50) | **PRIMARY KEY** | Kode unik voucher promo member |
| `nomor_whatsapp` | VARCHAR(20) | **FOREIGN KEY** | Ref: `members.nomor_whatsapp` |
| `voucher_type` | ENUM | NOT NULL | 'DISCOUNT' (Diskon Tiket %), 'FREE_TICKET' (Tiket Gratis) |
| `benefit_value` | DECIMAL(10,2) | NOT NULL | Nominal diskon (Rp / %) atau kuota tiket gratis |
| `status_claim` | ENUM | DEFAULT 'ISSUED' | 'ISSUED', 'CLAIMED', 'EXPIRED' |
| `expiry_date` | DATE | NOT NULL | Masa tenggang berlaku voucher |

### Tabel 7.4: `pos_transactions` (Header Transaksi Penjualan Kasir POS)
| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `pos_trx_id` | UUID | **PRIMARY KEY** | ID unik transaksi POS |
| `nomor_whatsapp` | VARCHAR(20) | **FOREIGN KEY** | Ref: `members.nomor_whatsapp` |
| `cashier_id` | VARCHAR(50) | NOT NULL | ID Kasir yang bertugas |
| `total_amount` | DECIMAL(12,2) | NOT NULL | Total nominal transaksi tiket setelah diskon (Rp) |
| `payment_method` | ENUM | NOT NULL | 'CASH', 'QRIS', 'DEBIT', 'TRANSFER' |
| `payment_status` | ENUM | DEFAULT 'PAID' | 'PAID', 'REFUNDED', 'VOID' |

## 8. Timeline Project
Target waktu pelaksanaan proyek terbagi menjadi dua tahap utama: **1 Minggu Pertama untuk Penyelesaian Interactive Prototype Demo** (walkthrough stakeholder) dan **1 Bulan (4 Minggu) untuk Development System Full-Stack produksi**.

| Tahap / Periode | Durasi | Deliverable Inti & Target Milestone | Status Target |
| :--- | :--- | :--- | :--- |
| **Tahap 1 (Minggu 1)** | 1 Minggu | Penyelesaian UI/UX Interactive Prototype Demo (POS Kasir, Digital Guest Book, Access Gate, Dashboard CRM dengan Tipe Member PR/PP/PT & Tombol Blast WA). Demonstrasi ke Stakeholder Kampung Coklat. | Demo Ready |
| **Tahap 2 (Bulan 1 - Phase A)** | 2 Minggu | Full-Stack Dev Phase A: Cloud DB Setup (WA PK, Domisili, Tipe Member), Rest API Backend, POS Kasir Tiket, Turnstile Gate Middleware Integration. | Full-Stack Sprint 1 |
| **Tahap 2 (Bulan 1 - Phase B)** | 2 Minggu | Full-Stack Dev Phase B: Digital Guest Book WA OTP, Benefit Engine Diskon Tiket & Free Ticket, CRM Filter Tipe Member & Domisili, UI Blast WA, & Financial Summary. | Full-Stack Sprint 2 |
| **Tahap 3 (Akhir Bulan 1)** | 1 Minggu | QC Internal, UAT Simulation dengan Staf Kasir & Gate Kampung Coklat, Staff Training, Bug Fixing, & Go-Live Production. | QA & Go-Live |

## 9. Acceptance Criteria
Moobi Ticketing & CRM Platform dinyatakan Siap Release (Production Ready) apabila memenuhi kriteria pengujian berikut:
1. **Interactive Demo Milestone (Minggu 1)**: Penyelesaian Interactive Prototype Demo disetujui oleh Manajemen Kampung Coklat pada akhir Minggu 1.
2. **Must-Have Feature Pass**: Seluruh fungsi Must Have pada Feature List (POS Tiket, Turnstile Gate, Guest Book dengan Domisili, CRM Tipe Member PR/PP/PT, Diskon/Free Ticket, dan Tombol Blast WA) lulus QC internal.
3. **Speed Regist & Issue Tiket**: Transaksi POS kasir mendaftarkan `nomor_whatsapp`, `domisili`, dan `tipe_member` baru secara otomatis dan menerbitkan E-ticket Dynamic QR dalam < 3 detik.
4. **Benefit Diskon & Free Ticket Claim**: Benefit member berupa Voucher Diskon Tiket / Free Ticket berhasil diterbitkan ke WA dan dapat di-redeem di POS kasir.
5. **Gate Validation Speed**: Scanner Turnstile Gate berhasil membaca Dynamic QR Code dan membuka solenoid relay gate dengan latency < 2 detik.
6. **Tombol Blast WA & Filter Membership**: Tombol 'Blast WA' serta filter Tipe Member & Domisili tampil secara visual pada interface CRM Membership dan memicu dialog konfirmasi interaksi promo.
7. **Full-Stack Go-Live (Bulan 1)**: Development Full-Stack tuntas dalam 1 Bulan dan UAT Sign-off disetujui oleh Tim Manajemen Kampung Coklat dengan passing grade ≥ 85%.

## 10. Document Sign-off & Kesimpulan Strategis
Dokumen Business Requirements Document (BRD) ini menjadi acuan resmi dan mengikat bagi seluruh pemangku kepentingan (Manajemen Kampung Coklat, Tim Pengembang Moobi, dan Mahasiswa Magang TRPL) dalam mengeksekusi proyek Digitalisasi Tiket & CRM Membership.

Blitar, 18 Agustus 2026

**Disiapkan Oleh:**
Lead System Analyst (Intern)
_______________________
Mahasiswa Magang TRPL

**Dinegosiasi & Disetujui Oleh:**
PIC Bisnis Moobi Platform
_______________________
Lathiful Amri

**Disetujui Klien:**
Manajemen Kampung Coklat
_______________________
Tim Manajemen KC
