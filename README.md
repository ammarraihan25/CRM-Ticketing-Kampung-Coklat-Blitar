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
Pastikan layanan PostgreSQL Anda sudah berjalan. Buat database baru bernama `kampung_coklat` (atau sesuai konfigurasi). 
Jika Anda perlu mengubah *username* atau *password* default, Anda bisa mengubahnya sementara di file `src/app.module.ts`. *(Catatan: Ke depannya kita akan menggunakan file `.env` untuk manajemen konfigurasi yang lebih aman).*

**4. Jalankan Server Backend (Mode Development):**
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
└── README.md           # Panduan instalasi (File ini)
```

## 📝 Catatan Tambahan
- Pastikan untuk selalu membuat *branch* baru saat mengerjakan fitur baru (`git checkout -b nama-fitur`).
- Jangan lupa melakukan `git pull origin main` secara berkala untuk mendapatkan pembaruan terbaru dari rekan tim lain.
