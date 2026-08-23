const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'frontend/app/components/CrmMainView.vue');
const destPath = path.join(__dirname, 'frontend/app/components/GuestbookMainView.vue');

let content = fs.readFileSync(srcPath, 'utf8');

// Replacements
content = content.replace(/useCrmApi/g, 'useGuestBookApi');
content = content.replace(/getMembers/g, 'getGuestBookData');
content = content.replace(/Member/g, 'GuestBookRecord');
content = content.replace(/CrmGuestBookRecord/g, 'GuestBookRecord'); // fix the double replacement
content = content.replace(/members/g, 'entries');
content = content.replace(/loadGuestBookRecords/g, 'loadEntries'); // if loadMembers got replaced
content = content.replace(/loadMembers/g, 'loadEntries');
content = content.replace(/tipeMember/g, 'tipeKunjungan');
content = content.replace(/Tipe GuestBookRecord/g, 'Tujuan Kunjungan');
content = content.replace(/Nama GuestBookRecord/g, 'Nama PIC / Rombongan');
content = content.replace(/Nomor WhatsApp \(PK\)/g, 'WhatsApp PIC');
content = content.replace(/Total Transaksi GTV/g, 'Nama Acara');
content = content.replace(/Tanggal Registrasi/g, 'Tanggal Kunjungan');
content = content.replace(/Status Voucher/g, 'Status');
content = content.replace(/Data GuestBookRecord/g, 'Data Guestbook');
content = content.replace(/GuestBookRecord Directory/g, 'Guestbook Directory');
content = content.replace(/m\.totalSpend/g, 'm.namaAcara');
content = content.replace(/m\.tanggalDaftar/g, 'm.tanggalKunjungan');
content = content.replace(/m\.nama/g, 'm.nama');
content = content.replace(/formatRupiah\(m\.namaAcara\)/g, 'm.namaAcara');
content = content.replace(/getGuestBookRecordTypeLabel/g, 'getVisitTypeLabel');
content = content.replace(/getMemberTypeLabel/g, 'getVisitTypeLabel');

// Fix dummy data types and labels
content = content.replace(/'PR'/g, "'pengajian'");
content = content.replace(/'PP'/g, "'hall'");
content = content.replace(/'PT'/g, "'b2b'");
content = content.replace(/'Aktif'/g, "'terdaftar'");
content = content.replace(/'Tidak Aktif'/g, "'terverifikasi'");
content = content.replace(/totalSpend: \d+,/g, "namaAcara: 'Acara Kunjungan',");

// Ensure imports are correct
content = content.replace(/import type \{ GuestBookRecord \} from '~\/composables\/useGuestBookApi'/, "import type { GuestBookRecord } from '~/composables/useGuestBookApi'");
content = content.replace(/import type \{ CrmGuestBookRecord \} from '~\/composables\/useGuestBookApi'/, "import type { GuestBookRecord } from '~/composables/useGuestBookApi'");

// Add the getVisitTypeLabel function
content = content.replace(/function getVisitTypeLabel.*\{[\s\S]*?\}/, `function getVisitTypeLabel(type: string) {
  if (type === 'pengajian') return 'Pengajian';
  if (type === 'hall') return 'Hall / Event';
  if (type === 'b2b') return 'B2B / Travel';
  return type;
}`);

// Add tag classes for new types
content = content.replace(/class="tag-\$\{\(m\.tipeKunjungan \|\| 'pr'\)\.toLowerCase\(\)\}"/g, `class="tag-\${m.tipeKunjungan || 'pengajian'}"`);
content = content.replace(/\.tag-pr \{/g, '.tag-pengajian {');
content = content.replace(/\.tag-pp \{/g, '.tag-hall {');
content = content.replace(/\.tag-pt \{/g, '.tag-b2b {');


fs.writeFileSync(destPath, content);
console.log('Done generating GuestbookMainView.vue');
