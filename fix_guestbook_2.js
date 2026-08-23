const fs = require('fs');
const path = require('path');

const destPath = path.join(__dirname, 'frontend/app/components/GuestbookMainView.vue');
let content = fs.readFileSync(destPath, 'utf8');

// Fix property names
content = content.replace(/tipeGuestBookRecord/g, 'tipeKunjungan');
content = content.replace(/demoGuestBookRecords/g, 'demoEntries');
content = content.replace(/GuestBookRecordTypeLabel/g, 'VisitTypeLabel');
content = content.replace(/tanggalDaftar/g, 'tanggalKunjungan');
content = content.replace(/Member/g, 'GuestBookRecord');
content = content.replace(/GuestBookRecords/g, 'GuestBookRecords'); 

fs.writeFileSync(destPath, content);
console.log('Fixed property names');
