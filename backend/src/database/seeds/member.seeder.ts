import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Member, TipeMember, MemberTier } from '../entities/member.entity';

export default class MemberSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Member);
    
    // Insert a dummy member to test the POS system
    const dummyMember: Partial<Member> = {
      nomor_whatsapp: '6281234567890',
      nama_lengkap: 'Budi Santoso (Dummy)',
      domisili: 'Blitar',
      tipe_member: TipeMember.REGULER,
      current_points: 0,
      total_spend: 0,
      tier: MemberTier.BRONZE,
    };

    const exists = await repository.findOneBy({ nomor_whatsapp: dummyMember.nomor_whatsapp });
    if (!exists) {
      await repository.insert(dummyMember);
      console.log('Successfully seeded dummy member.');
    } else {
      console.log('Dummy member already exists.');
    }
  }
}
