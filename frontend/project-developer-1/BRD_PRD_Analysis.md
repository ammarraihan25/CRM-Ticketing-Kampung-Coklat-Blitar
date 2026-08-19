# Analisis BRD & PRD: Sistem Ticketing & CRM Kampung Coklat

Ruang kerja ini dikhususkan untuk **Project Frontend Developer 1**. Dokumen ini berisi analisis awal mengenai Business Requirements Document (BRD) dan Product Requirements Document (PRD) untuk sistem Ticketing dan CRM.

---

## 1. Business Requirements Document (BRD)

### 1.1 Latar Belakang & Tujuan
Kampung Coklat membutuhkan sistem manajemen tiket terpusat yang dapat melayani berbagai jalur penjualan (Offline, Online, B2B) serta sistem CRM (Customer Relationship Management) untuk mengelola data pelanggan, meningkatkan retensi, dan mendukung strategi pemasaran yang tepat sasaran.

### 1.2 Ruang Lingkup Bisnis (Business Scope)
- **Ticketing Offline (On-the-spot):** Penjualan langsung di lokasi menggunakan sistem Point of Sales (POS).
- **Ticketing Online Mandiri (B2C):** Penjualan tiket melalui website/aplikasi mandiri untuk pelanggan individu.
- **Ticketing B2B:** Sistem pemesanan untuk mitra bisnis seperti agen travel, instansi pendidikan, atau perusahaan.
- **CRM (Customer Relationship Management):** Pengelolaan data pelanggan yang terpusat dari seluruh saluran penjualan untuk keperluan analitik, segmentasi, dan promosi.

---

## 2. Product Requirements Document (PRD)

### 2.1 Modul Ticketing Offline (On-the-Spot / POS)
Modul ini digunakan oleh kasir di pintu masuk lokasi.
- **Fitur Utama:**
  - Antarmuka Kasir (POS) yang cepat dan responsif.
  - Pilihan jenis tiket (Reguler, Terusan, Rombongan).
  - Integrasi metode pembayaran (Cash, EDC, QRIS).
  - Pencetakan tiket (Thermal printer / barcode / QR Code).
  - Manajemen *Shift* kasir (buka/tutup kasir, rekonsiliasi kas).

### 2.2 Modul Ticketing Online Mandiri (B2C)
Modul ini diakses langsung oleh calon pengunjung melalui website.
- **Fitur Utama:**
  - Registrasi & Login pengguna (Email, Nomor HP, SSO).
  - Pemilihan tanggal kunjungan dan pengecekan ketersediaan kuota.
  - Integrasi *Payment Gateway* (Virtual Account, E-Wallet, QRIS).
  - Pengiriman E-Ticket (berupa QR Code) melalui Email dan WhatsApp.
  - Halaman profil untuk melihat riwayat pemesanan pelanggan.

### 2.3 Modul Ticketing B2B (Mitra, Travel Agent, Instansi)
Modul portal khusus untuk mitra bisnis.
- **Fitur Utama:**
  - Portal Login khusus Mitra / Agen.
  - Manajemen harga khusus (*Custom Pricing* / Diskon).
  - Pemesanan tiket massal (*bulk ordering*).
  - Sistem pembuatan tagihan (*Invoicing*) dan tempo pembayaran.
  - Pelaporan performa agen/mitra.

### 2.4 Modul CRM (Customer Relationship Management) & Pengelompokan
Modul back-office untuk mengelola relasi pelanggan.
- **Fitur Utama:**
  - **Database Pelanggan Sentral:** Menyatukan data dari Offline, Online, dan B2B.
  - **Pengelompokan (Segmentasi) Pelanggan:**
    - Segmentasi berdasarkan tipe: *Individu*, *Keluarga*, *Instansi/Corporate*, *Agen Travel*.
    - Segmentasi berdasarkan frekuensi kunjungan (*New*, *Returning*, *Loyal*).
    - Segmentasi berdasarkan metode booking (Online vs Offline).
  - **Manajemen Kampanye (Campaign):** Fitur broadcast WhatsApp/Email untuk promosi targeted ke kelompok tertentu.
  - **Dashboard Analitik:** Visualisasi data pengunjung, sumber penjualan tiket terbanyak, dan tingkat konversi.

---

## 3. Rekap Pengembangan (Developer 1)

Untuk mencegah terjadinya konflik kode (bentrok) antar developer, halaman-halaman yang sedang dikerjakan telah dikelompokkan ke dalam direktori khusus.

### 3.1 Struktur Direktori Frontend
Seluruh fitur yang berkaitan dengan Ticketing (terutama modul *Self-Service*) dan *Gate Access* disimpan pada *namespace* khusus:

```text
frontend/app/pages/ticketing_dan_gate/
├── self-service/
│   └── index.vue   # Halaman Pemesanan Tiket Online Mandiri (B2C)
└── gate/
    └── index.vue   # Halaman Scanner Gate Access
```

### 3.2 Progres Saat Ini
- **Self-Service Booking**: Tampilan UI/UX telah selesai disesuaikan dengan pedoman `kampungcoklat.id-design.md`. Menyediakan *hero banner*, pilihan tiket/wahana (dengan format harga khusus tiket terusan), dan *sidebar* keranjang yang terintegrasi dengan simulasi QRIS.
- **Gate Access**: Template dasar telah dibuat dan diletakkan dalam *namespace* yang aman untuk kolaborasi.
