# PLAN 1: Integrasi Database dan Tampilan Frontend (Tahap Master Data)

Tujuan utama rencana ini adalah untuk menghubungkan Backend (NestJS) dengan UI Frontend (NuxtJS) yang telah disetujui, tanpa mengubah struktur desain maupun *field* di frontend. Perubahan murni dilakukan di Backend.

## 1. Pemetaan Struktur Dummy Data Frontend ke Entitas (Entity) Backend
Kita akan meninjau komponen *Frontend* yang telah dibuat untuk melihat parameter/kolom apa saja yang digunakan (misal: struktur *Tabel Member*, *Tabel Tier B2B*, dll).
* **Langkah:** Menyesuaikan file `.entity.ts` di backend (`src/modules/*/entities/`) agar selaras dengan objek yang diharapkan frontend (termasuk penamaan *CamelCase* vs *snake_case* jika perlu).

## 2. Pembuatan Seeder Sesuai Tampilan Dummy
Agar Frontend tidak terlihat kosong saat di-*load*, kita perlu memastikan isi database (seeder) mewakili data dummy yang sudah dibuat tim Frontend.
* **Langkah:** Mengubah file `*.seeder.ts` di dalam `backend/src/database/seeds/` dengan data simulasi yang kaya (misalnya data member tier Gold/Silver, status aktif, dll).

## 3. Pembangunan CRUD & API Endpoint
Kita akan memastikan Endpoint Master Data sudah tersedia secara utuh:
* GET (List dengan Pagination & Search)
* GET (Detail by ID)
* POST (Create)
* PUT/PATCH (Update)
* DELETE (Hapus data/Soft Delete)
* **Langkah:** Menyesuaikan Controller dan Service di modul `member`, `crm`, `pos`, dll. 

## 4. Validasi Form (Data Transfer Object / DTO)
Mengamankan payload dari *client*. Setiap permintaan POST dan PUT harus divalidasi.
* **Langkah:** Menggunakan `class-validator` dan `class-transformer` di dalam file `*.dto.ts`. Kita memastikan data seperti `nomor_whatsapp` bernilai *string* dan tidak kosong, serta nilai harga bertipe *number*.

## 5. Middleware, Auth Guards, dan Role-Based Security
Setiap *endpoint* harus aman dan tidak bocor ke publik.
* **Langkah:**
  * Menambahkan `JwtAuthGuard` untuk semua akses *dashboard*.
  * Menambahkan `RolesGuard` untuk memisahkan fitur yang hanya boleh diakses "Admin" atau "Kasir".
  * Menyiapkan pelindung dasar seperti `@nestjs/throttler` untuk Rate Limiting pencarian data.

## 6. Persiapan Integrasi (CORS & Endpoints)
Memastikan frontend dapat memanggil backend tanpa masalah CORS.
* **Langkah:** NestJS sudah dipasang `app.enableCors()`, kita akan mengunci konfigurasi ini agar mengizinkan request dari origin NuxtJS (seperti `http://localhost:3000`).

---

**Aturan Emas Selama Pengerjaan Tahap Ini:**
> *"Jangan ubah UI Frontend. Biarkan Backend menyesuaikan struktur respons dan DTO-nya demi menjaga kesesuaian dengan apa yang sudah disetujui Client."*
