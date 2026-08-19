# ALUR B2B (VERSI TERBARU)

1. Agen mengajukan booking (tanggal kunjungan + jumlah pax) lewat sistem
2. Sistem otomatis hitung harga dari tabel tier default (berdasarkan jumlah pax) — tidak ada proses approval BD
3. Sistem tampilkan total tagihan, agen bayar DP untuk mengunci booking
4. Booking berstatus "Terkonfirmasi (DP)", data otomatis masuk ke sistem kasir
5. Sebelum hari-H, agen konfirmasi jumlah pax final (kalau berubah, tagihan disesuaikan otomatis)
6. Agen melunasi sisa pembayaran sebelum/saat hari-H
7. Setelah status berubah jadi "Lunas", kasir cetak tiket rombongan & aktivasi kartu membership
8. Sistem hitung komisi otomatis (total transaksi × persen komisi) masuk ke saldo komisi agen
9. Laporan kunjungan & saldo komisi tersimpan otomatis, bisa diakses BD maupun agen
10. Tiap periode (misal akhir bulan), BD verifikasi & cairkan komisi terkumpul ke agen (transfer manual, status diubah "sudah dibayar" di sistem)

## TABEL TIER DEFAULT

| Tier   | Minimal Pax | Maksimal Pax  | Harga per Tiket |
| ------ | ----------- | ------------- | --------------- |
| Tier 1 | 1           | 19            | Rp 25.000       |
| Tier 2 | 20          | 49            | Rp 20.000       |
| Tier 3 | 50          | ~ (tak terbatas)| Rp 17.500       |

## UPDATE DETAIL PER PERAN

### 1. User/Agen
* Ajukan booking baru (tanggal, jumlah pax) → harga muncul otomatis dari tier default, tanpa nunggu siapa pun
* Bayar DP untuk mengunci booking
* Update jumlah pax final sebelum batas waktu (H-3/H-1)
* Lunasi sisa pembayaran
* Lihat status booking (DP/Lunas/Selesai), riwayat kunjungan, dan saldo komisi

### 2. BD
* Tetap kelola & update tabel tier default kalau ada perubahan kebijakan harga umum
* Set persen komisi per agen (ini tetap perlu, karena komisi biasanya beda tiap agen tergantung kesepakatan awal)
* Verifikasi & approve pencairan komisi tiap periode
* Pantau laporan performa tiap agen untuk evaluasi kerja sama

### 3. Kasir/Admin
* Terima data booking otomatis begitu DP masuk
* Pantau status pembayaran tiap booking (DP saja vs Lunas)
* Cetak tiket rombongan **hanya setelah status "Lunas"**
* Aktivasi kartu membership rombongan di hari-H
