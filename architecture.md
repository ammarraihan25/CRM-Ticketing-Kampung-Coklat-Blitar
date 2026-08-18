# Dokumen Arsitektur & Aturan Pengembangan (Architecture & Conventions)
**Sistem Ticketing & CRM - Kampung Coklat Blitar**

Dokumen ini disusun berdasarkan BRD (Business Requirements Document) dan PRD (Product Requirements Document) V1.4, sebagai panduan teknis bagi kolaborasi Tim Backend dan Tim Frontend.

---

## 1. Daftar API Backend (API Contract Draft)

Berikut adalah daftar RESTful API yang harus disiapkan oleh Tim Backend untuk digunakan oleh Tim Frontend:

### A. Modul Autentikasi & OTP
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Login bagi Kasir, Marketing, dan Admin/Owner. Mengembalikan JWT. |
| `POST` | `/api/v1/auth/otp/request` | Meminta kode OTP via WhatsApp untuk registrasi Digital Guest Book (Jamaah Pengajian). |
| `POST` | `/api/v1/auth/otp/verify` | Memverifikasi OTP dari WA. |

### B. Modul Membership & CRM
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/v1/members` | Registrasi member baru (Walk-in Kasir / Guest Book) dengan input WA, Nama, Domisili, dan Tipe Member (PR/PP/PT). |
| `GET` | `/api/v1/members` | Mengambil daftar member untuk tabel CRM. Mendukung filter *query param*: `?tipe_member=PP&domisili=Blitar`. |
| `GET` | `/api/v1/members/:nomor_whatsapp` | Mengambil detail spesifik member dan riwayat transaksi/voucher mereka. |

### C. Modul Transaksi POS (Penjualan Tiket & Payment Gateway)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/v1/pos/checkout` | Proses pembayaran tiket, integrasi Payment Gateway (generate QRIS), update DB `pos_transactions` & `tickets`, dan men-generate e-ticket WA. |
| `POST` | `/api/v1/pos/webhook` | Endpoint *Callback/Webhook* yang dipanggil oleh server Payment Gateway (Midtrans/Xendit) untuk memberitahu status pembayaran sudah lunas (PAID). |
| `GET` | `/api/v1/pos/transactions` | Daftar riwayat transaksi per shift kasir untuk kebutuhan rekonsiliasi. |

### D. Modul Validasi Akses Gate
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/v1/gate/scan` | Menerima payload enkripsi dari QR Scanner. Memvalidasi status tiket (Anti-passback) dan mengubah status menjadi `USED`. Mengembalikan respon sukses/gagal (< 2 detik). |

### E. Modul Voucher & Benefit
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/v1/vouchers/:nomor_whatsapp` | Mengecek daftar voucher diskon / *free ticket* aktif yang dimiliki oleh member. |
| `POST` | `/api/v1/vouchers/redeem` | Menandai voucher sebagai `CLAIMED` saat digunakan di Kasir POS. |

### F. Modul Marketing (Blast WA)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `POST` | `/api/v1/marketing/blast` | Memicu pengiriman pesan blast promo ke segmen member terpilih setelah konfirmasi dari UI. |

### G. Modul Reporting & Dashboard
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/v1/reports/gtv` | Laporan Gross Transaction Value (GTV) harian/bulanan. |
| `GET` | `/api/v1/reports/demographics` | Statistik pengelompokan berdasarkan *domisili* dan *tipe_member*. |

---

## 2. Struktur Direktori Proyek

### A. Struktur Backend (NestJS)
Pendekatan yang digunakan adalah **Modular Architecture** agar setiap domain bisnis (Auth, Member, Ticket) terpisah rapi.

```text
backend/
├── src/
│   ├── config/          # Konfigurasi env, database (TypeORM), dan konstanta sistem.
│   ├── common/          # Modul yang dipakai global: filters (Error handling), guards (JWT Role), decorators.
│   ├── database/        # Definisi Entities PostgreSQL dan file Migrations.
│   ├── modules/         # Modul-modul fitur utama (Business Logic):
│   │   ├── auth/        # Controller & Service untuk Login & OTP
│   │   ├── member/      # Controller & Service untuk CRM Membership (WA PK, Domisili, Tipe Member)
│   │   ├── pos/         # Controller & Service Kasir, Checkout, Rekonsiliasi
│   │   ├── gate/        # Controller & Service Scanner & Turnstile Gate
│   │   └── voucher/     # Logika benefit tiket gratis & diskon
│   ├── app.module.ts    # Root modul yang mengimpor seluruh module.
│   └── main.ts          # Entry point (menggunakan Fastify Adapter).
└── package.json
```

### B. Struktur Frontend (NuxtJS 3)
Pendekatan direktori standar Nuxt 3 untuk pengembangan *Progressive Web App (PWA)*.

```text
frontend/
├── app/
│   ├── router.options.ts# Opsi routing tambahan jika diperlukan.
├── assets/              # Gambar statis, logo, dan styling CSS global.
├── components/          # Komponen UI Vue yang dapat digunakan ulang (reusable):
│   │   ├── pos/         # Komponen khusus halaman kasir (Numpad, Cart)
│   │   ├── crm/         # Komponen tabel member, modal filter, tombol blast
│   │   └── shared/      # Alert, Button, Modal global
├── composables/         # Hooks global (auto-imported) untuk State Management & Fetch API:
│   │   ├── useAuth.ts   # Logika login & simpan token
│   │   └── usePosApi.ts # Wrapper pemanggilan API POS Backend
├── layouts/             # Wrapper tampilan: `admin.vue` (Sidebar), `pos.vue` (Full screen), `blank.vue` (Guest Book).
├── pages/               # Halaman utama aplikasi (berbasis file routing Nuxt):
│   │   ├── index.vue    # Dashboard utama (KPI / GTV)
│   │   ├── pos.vue      # Halaman Tablet Kasir POS
│   │   ├── gate.vue     # Halaman Web Scanner untuk Gate
│   │   └── guestbook/   # Form registrasi Jamaah Pengajian
├── public/              # File publik (favicon, robots.txt, manifest PWA).
├── utils/               # Fungsi helper standar (format Rupiah, format tanggal).
└── nuxt.config.ts       # Konfigurasi Nuxt (modul PWA, proxy ke backend).
```

---

## 3. Aturan Main & Konvensi Tim (Rules)

Agar kolaborasi berjalan lancar tanpa *conflict* yang memusingkan, kedua tim wajib mematuhi aturan berikut:

### 🌟 Aturan Komunikasi API (API Contract)
1. **Standar Respon API**: Backend **wajib** mengembalikan format JSON yang konsisten baik sukses maupun *error*. Contoh:
   ```json
   {
     "success": true,
     "message": "Transaksi berhasil diproses",
     "data": { ... }
   }
   ```
2. **Penanganan Error (Error Handling)**: Jika gagal, berikan *HTTP Status Code* yang sesuai (400 untuk Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
3. **CORS (Cross-Origin Resource Sharing)**: Backend harus mengizinkan CORS untuk *origin* URL Frontend berjalan.

### 🌟 Aturan Kode (Coding Standards)
1. **Strict Type Scripting**: Kedua tim menggunakan TypeScript. Sebisa mungkin hindari penggunaan tipe `any`. Buatkan *interface* atau *DTO (Data Transfer Object)* yang jelas.
2. **Kerahasiaan (.env)**: JANGAN PERNAH melakukan *commit* pada file `.env`. Gunakan file `.env.example` untuk membagikan contoh variabel konfigurasi.
3. **Format Penamaan**:
   - URL & Endpoint API menggunakan *kebab-case* (huruf kecil & dipisah strip, contoh: `/api/v1/auth/otp-verify`).
   - Variabel dan fungsi dalam kode menggunakan *camelCase*.
   - Nama class / interface menggunakan *PascalCase*.
   - Database kolom menggunakan *snake_case* (contoh: `nomor_whatsapp`, `tipe_member`).

### 🌟 Aturan Git & Repositori
1. **Branching Strategy**: Dilarang melakukan *commit* langsung ke *branch* `main`.
   - Gunakan `main` hanya untuk kode produksi (stabil).
   - Buat *branch* fitur dengan format `feature/nama-fitur` (contoh: `feature/pos-checkout`).
   - Buat *branch* perbaikan *bug* dengan format `bugfix/nama-bug` (contoh: `bugfix/login-error`).
2. **Pull Request (PR)**: *Merge* kode ke `main` harus melalui proses *Pull Request* dan ideally di-review oleh anggota tim lain.
3. **Pesan Commit yang Jelas**: Gunakan metode *Conventional Commits*, contoh:
   - `feat: menambahkan endpoint pendaftaran guestbook`
   - `fix: memperbaiki error CORS saat panggil api scan gate`
   - `docs: mengupdate file readme`
