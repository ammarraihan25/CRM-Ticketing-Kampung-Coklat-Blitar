# Rancang Bangun: Segmentasi Data Berdasarkan Umur pada CRM Kampung Coklat

Dokumen ini memetakan seluruh file dan komponen yang perlu dimodifikasi dan ditambahkan pada sistem Backend (NestJS) dan Frontend (Nuxt 3/Vue) agar data umur/tanggal lahir dapat dicatat dari titik pendaftaran dan diolah di modul CRM.

---

## 1. Alur Masuk Data (Data Flow)

```
[Form Input Pengunjung/Member]
 (Guestbook / Form Pendaftaran Member / POS)
                     │
                     ▼
[Backend DTO & Controller]
 (Validasi tanggalLahir / kategoriUmur)
                     │
                     ▼
[Database (Tabel: members)]
 (Kolom: tanggalLahir / date)
                     │
                     ▼
[CRM Module Backend]
 (Filter query: min_age, max_age, kategori_umur, bulan_lahir)
                     │
                     ▼
[CRM Frontend Module]
 ├── Tabel Member & Detail Profil (Menampilkan Umur & Kategori)
 ├── Filter Segmentasi CRM (Filter Anak/Remaja/Dewasa/Lansia)
 ├── Target Broadcast WA Blast (Kirim promo spesifik segmen)
 └── Dashboard Demografi (Grafik distribusi usia wisatawan)
```

---

## 2. Peta File & Komponen yang Terpengaruh

### A. Backend Layer (NestJS + TypeORM)

| No | File Target | Status | Deskripsi Perubahan |
| :--- | :--- | :---: | :--- |
| 1 | `backend/src/database/entities/member.entity.ts` | **MODIFIKASI** | Menambahkan kolom `tanggalLahir` (tipe `date`, nullable) dan helper virtual/getter untuk `umur` dan `kategoriUmur`. |
| 2 | `backend/src/modules/member/dto/create-member.dto.ts` | **MODIFIKASI** | Menambahkan validasi `@IsOptional() @IsDateString() tanggalLahir?: string`. |
| 3 | `backend/src/modules/member/member.service.ts` | **MODIFIKASI** | Menyimpan field `tanggalLahir` saat pendaftaran member baru. |
| 4 | `backend/src/crm/dto/get-members-query.dto.ts` | **MODIFIKASI** | Menambahkan query parameter: `kategori_umur`, `min_age`, `max_age`, dan `bulan_lahir`. |
| 5 | `backend/src/crm/dto/blast-wa.dto.ts` | **MODIFIKASI** | Menambahkan field filter segmentasi penerima blast: `targetKategoriUmur` (contoh: 'Anak', 'Dewasa', dll). |
| 6 | `backend/src/crm/crm.service.ts` | **MODIFIKASI** | Menambahkan logika kalkulasi umur di query builder `getMembers()` dan filter target broadcast di `triggerBlastWa()`. |

---

### B. Frontend Composable & API Client

| No | File Target | Status | Deskripsi Perubahan |
| :--- | :--- | :---: | :--- |
| 1 | `frontend/app/composables/useCrmApi.ts` | **MODIFIKASI** | Update interface `Member` dengan field `tanggalLahir`, `umur`, dan `kategoriUmur`. Update `MemberQuery` dengan filter umur. |
| 2 | `frontend/app/composables/useGuestBookApi.ts` | **MODIFIKASI** | Menambahkan field `tanggalLahir` pada payload guestbook/pendaftaran. |

---

### C. Frontend Entry Point (Form Input Data Masuk)

| No | File Target | Status | Deskripsi Perubahan |
| :--- | :--- | :---: | :--- |
| 1 | `frontend/app/pages/guestbook/index.vue` | **MODIFIKASI** | Menambahkan input datepicker **"Tanggal Lahir"** pada formulir pengunjung. |
| 2 | `frontend/app/pages/membership/index.vue` & `components/DaftarMembershipView.vue` | **MODIFIKASI** | Menambahkan field input Tanggal Lahir saat pendaftaran mandiri member / form review admin. |

---

### D. Frontend CRM Modul (Pengolahan & Tampilan Data)

| No | File Target | Status | Deskripsi Perubahan |
| :--- | :--- | :---: | :--- |
| 1 | `frontend/app/components/crm/MemberFilter.vue` | **MODIFIKASI** | Menambahkan filter dropdown: **Kategori Umur** (*Semua, Anak-Anak <12, Remaja 12-24, Dewasa 25-49, Lansia 50+*). |
| 2 | `frontend/app/components/crm/MemberTable.vue` | **MODIFIKASI** | Menambahkan kolom **Usia / Kategori Umur** dengan badge warna khusus (misal: Hijau untuk Remaja, Coklat untuk Dewasa). |
| 3 | `frontend/app/components/CrmMainView.vue` | **MODIFIKASI** | Menghubungkan state filter umur ke pemanggilan API data member dan modal detail member. |
| 4 | `frontend/app/components/crm/BlastConfirmModul.vue` | **MODIFIKASI** | Menambahkan pilihan opsi target: *"Kirim ke seluruh member"* vs *"Kirim ke segmen umur tertentu"*. |
| 5 | `frontend/app/pages/crm/[id].vue` | **MODIFIKASI** | Menampilkan tanggal lahir, usia saat ini, dan info reminder ulang tahun di halaman profil detail member. |
| 6 | `frontend/app/pages/reports/` / Dashboard | **TAMBAHAN** | Menambahkan chart demografi piramida/distribusi usia pengunjung menggunakan Chart.js. |

---

## 3. Standar Kategori Segmentasi Umur

| Kode | Kategori | Rentang Usia | Target Program CRM Kampung Coklat |
| :--- | :--- | :--- | :--- |
| `KID` | **Anak-Anak** | < 12 Tahun | Edukasi Cooking Class Coklat, Tiket Wahana, Liburan Sekolah |
| `TEEN` | **Remaja / Pelajar** | 12 – 24 Tahun | Cafe Coklat, Spot Foto Instagramable, Diskon Pelajar |
| `ADULT` | **Dewasa / Keluarga** | 25 – 49 Tahun | Belanja Oleh-Oleh Coklat, Paket Rombongan Keluarga |
| `SENIOR`| **Lansia / Senior** | 50+ Tahun | Rombongan Pengajian / Majelis Taklim, Terapi Coklat & Relaksasi |

---

## 4. Contoh Format Data (JSON Contract)

```json
{
  "id": 101,
  "nama": "Ahmad Fauzi",
  "whatsapp": "081234567890",
  "domisili": "Blitar",
  "tanggalLahir": "1995-08-17",
  "umur": 31,
  "kategoriUmur": "Dewasa",
  "tipeMember": "PR",
  "totalSpend": 450000,
  "status": "Aktif"
}
```
