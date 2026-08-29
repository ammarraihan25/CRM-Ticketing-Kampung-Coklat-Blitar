import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Member, TipeMember, MemberStatus } from '../entities/member.entity';

export default class MemberSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Member);
    
    const dummyMembers: Partial<Member>[] = [
      { id: 1, nama: 'Callista Danis', whatsapp: '628123456789', domisili: 'Blitar', tipeMember: TipeMember.REGULER, status: MemberStatus.AKTIF, totalSpend: 4250000, tanggalDaftar: '12 Oktober 2022' },
      { id: 2, nama: 'Budi Santoso', whatsapp: '6285711223344', domisili: 'Kediri', tipeMember: TipeMember.PENGAJIAN, status: MemberStatus.AKTIF, totalSpend: 2750000, tanggalDaftar: '18 Januari 2023' },
      { id: 3, nama: 'Siti Khadijah', whatsapp: '6281999887766', domisili: 'Malang', tipeMember: TipeMember.TRAVEL, status: MemberStatus.TIDAK_AKTIF, totalSpend: 1850000, tanggalDaftar: '03 Maret 2023' },
      { id: 4, nama: 'Rizky Maulana', whatsapp: '6282255512345', domisili: 'Surabaya', tipeMember: TipeMember.REGULER, status: MemberStatus.AKTIF, totalSpend: 3250000, tanggalDaftar: '20 April 2023' },
      { id: 5, nama: 'Nadia Putri', whatsapp: '6281334567890', domisili: 'Tulungagung', tipeMember: TipeMember.PENGAJIAN, status: MemberStatus.AKTIF, totalSpend: 4100000, tanggalDaftar: '11 Mei 2023' },
      { id: 6, nama: 'Fajar Hidayat', whatsapp: '6285788812345', domisili: 'Kediri', tipeMember: TipeMember.REGULER, status: MemberStatus.AKTIF, totalSpend: 2150000, tanggalDaftar: '09 Juni 2023' },
      { id: 7, nama: 'Aulia Rahma', whatsapp: '6281239988776', domisili: 'Blitar', tipeMember: TipeMember.TRAVEL, status: MemberStatus.AKTIF, totalSpend: 5600000, tanggalDaftar: '21 Juli 2023' },
      { id: 8, nama: 'Dimas Pratama', whatsapp: '6282145678901', domisili: 'Malang', tipeMember: TipeMember.REGULER, status: MemberStatus.TIDAK_AKTIF, totalSpend: 1250000, tanggalDaftar: '14 Agustus 2023' }
    ];

    for (const data of dummyMembers) {
      const exists = await repository.findOneBy({ whatsapp: data.whatsapp });
      if (!exists) {
        await repository.insert(data);
      }
    }
    
    console.log('Successfully seeded dummy members from frontend.');
  }
}
