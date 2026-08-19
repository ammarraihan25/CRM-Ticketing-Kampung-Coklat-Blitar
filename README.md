# Sistem Ticketing & CRM - Kampung Coklat Blitar

Proyek ini adalah repositori utama (monorepo) untuk sistem Ticketing dan Customer Relationship Management (CRM) Kampung Coklat, Blitar. Proyek ini dibagi menjadi dua bagian utama:
- **Backend**: Menggunakan NestJS, Fastify, TypeORM, dan PostgreSQL.
- **Frontend**: Menggunakan NuxtJS (Vue 3).

---

## 🛠️ Persyaratan Sistem (Prerequisites)

Sebelum memulai instalasi, pastikan sistem Anda sudah terinstal:
- **Node.js** (versi 18.x atau lebih baru)
- **npm** (biasanya sudah termasuk dalam instalasi Node.js)
- **PostgreSQL** (untuk database backend)
- **Git**

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini sesuai dengan bagian aplikasi yang ingin Anda jalankan.

### 1. Kloning Repositori
Langkah pertama untuk semua anggota tim adalah mengkloning repositori ke komputer lokal:
```bash
git clone https://github.com/devannoap31/CRM-Ticketing-Kampung-Coklat-Blitar.git
cd CRM-Ticketing-Kampung-Coklat-Blitar
```

---

### 💻 Untuk Tim Backend (NestJS + Fastify)

**1. Masuk ke folder backend:**
```bash
cd backend
```

**2. Instal semua dependensi:**
```bash
npm install
```

**3. Konfigurasi Database:**
Pastikan layanan PostgreSQL Anda sudah berjalan dan buat database bernama `kampung_coklat`.
Ganti nama file `.env.example` menjadi `.env` (atau _copy_ isinya) di dalam folder `backend/`, lalu isi *credentials* database Anda. Contoh isi `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_postgres_anda
DB_NAME=kampung_coklat
```

**4. Migrasi Database:**
Kita menggunakan sistem Migrasi dari TypeORM untuk mempermudah sinkronisasi struktur tabel antar anggota tim. Jangan mengubah skema secara manual di pgAdmin!
- Menjalankan migrasi terbaru: `npm run migration:run`
- Membuat migrasi baru setelah mengedit *entity*: `npm run migration:generate src/database/migrations/NamaPerubahan`

**5. Seeder Database:**
Untuk mengisi data awal / *dummy* ke database, jalankan perintah:
```bash
npm run seed:run
```
*Tips Membut Data Seeder Baru:*
Anda bisa menambahkan file seeder baru berformat `nama.seeder.ts` di dalam folder `src/database/seeds/`. Di dalam file tersebut, panggil `dataSource.getRepository()` lalu gunakan fungsi `insert()`.

**6. Jalankan Server Backend (Mode Development):**
```bash
npm run start:dev
```
Backend akan berjalan di port `3000` (atau port lain jika Anda mengaturnya). Anda bisa mengakses API di `http://localhost:3000`.

---

### 🎨 Untuk Tim Frontend (NuxtJS)

**1. Masuk ke folder frontend:**
```bash
cd frontend
```

**2. Instal semua dependensi:**
```bash
npm install
```

**3. Jalankan Server Frontend (Mode Development):**
```bash
npm run dev
```
Frontend akan berjalan dan bisa diakses melalui browser di alamat:
`http://localhost:3000` (atau port `3001` jika port `3000` sudah dipakai oleh backend).

---

## 🏗️ Struktur Direktori

```text
CRM-Ticketing-Kampung-Coklat-Blitar/
├── backend/            # Source code API NestJS
│   ├── src/
│   ├── test/
│   ├── package.json
│   └── ...
├── frontend/           # Source code UI NuxtJS
│   ├── app/
│   ├── public/
│   ├── nuxt.config.ts
│   ├── package.json
│   └── ...
├── .gitignore          # Konfigurasi ignore file utama
├── architecture.md     # Arsitektur sistem, struktur folder & daftar API
├── BRD.md              # Business Requirements Document (Kebutuhan Bisnis)
├── PRD.md              # Product Requirements Document (Kebutuhan Fitur Sistem)
└── README.md           # Panduan instalasi (File ini)
```

## 📚 Dokumentasi Proyek
Untuk memahami alur bisnis, fitur, dan arsitektur kode secara lebih mendalam, seluruh anggota tim wajib membaca dokumen berikut:
1. **[Business Requirements Document (BRD)](./BRD.md)** - Panduan objektif bisnis, ruang lingkup (Scope), dan User Journey.
2. **[Product Requirements Document (PRD)](./PRD.md)** - Detail spesifikasi fitur sistem, kebutuhan fungsional (FR), dan User Stories.
3. **[Architecture & Conventions](./architecture.md)** - Daftar Endpoint API, penjelasan detail struktur folder, serta aturan main (Branching Git, Format Commit, dll) yang **harus dipatuhi**.

## 📝 Catatan Tambahan
- Pastikan untuk selalu membuat *branch* baru saat mengerjakan fitur baru (`git checkout -b nama-fitur`).
- Jangan lupa melakukan `git pull origin main` secara berkala untuk mendapatkan pembaruan terbaru dari rekan tim lain.
