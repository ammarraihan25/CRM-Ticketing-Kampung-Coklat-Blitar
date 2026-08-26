const dataSource = require('./src/database/data-source.ts').default;

async function seed() {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.query(`
    INSERT INTO members (id, nama, whatsapp, domisili, "tipeMember", status, "totalSpend", "tanggalDaftar")
    VALUES 
      (1, 'Callista Danis', '628123456789', 'Blitar', 'PR', 'Aktif', 4250000, '12 Oktober 2022'),
      (2, 'Budi Santoso', '6285711223344', 'Kediri', 'PP', 'Aktif', 2750000, '18 Januari 2023'),
      (3, 'Siti Khadijah', '6281999887766', 'Malang', 'PT', 'Tidak Aktif', 1850000, '03 Maret 2023'),
      (4, 'Rizky Maulana', '6282255512345', 'Surabaya', 'PR', 'Aktif', 3250000, '20 April 2023'),
      (5, 'Nadia Putri', '6281334567890', 'Tulungagung', 'PP', 'Aktif', 4100000, '11 Mei 2023'),
      (6, 'Fajar Hidayat', '6285788812345', 'Kediri', 'PR', 'Aktif', 2150000, '09 Juni 2023'),
      (7, 'Aulia Rahma', '6281239988776', 'Blitar', 'PT', 'Aktif', 5600000, '21 Juli 2023'),
      (8, 'Dimas Pratama', '6282145678901', 'Malang', 'PR', 'Tidak Aktif', 1250000, '14 Agustus 2023')
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log("Seeded successfully");
  await dataSource.destroy();
}
seed().catch(console.error);
