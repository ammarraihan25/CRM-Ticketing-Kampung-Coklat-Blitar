import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

export enum MemberType {
  REGULAR = 'PR',
  PENGAJIAN = 'PP',
  TRAVEL = 'PT',
}

@Entity('members')
export class Member {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  nomor_whatsapp: string; // E.164 (628123456789)

  @Column({ type: 'varchar', length: 100 })
  nama_lengkap: string;

  @Column({ type: 'varchar', length: 100 })
  domisili: string; // Kota/Kabupaten (cth: 'Blitar', 'Kediri')

  @Column({ type: 'enum', enum: MemberType, default: MemberType.REGULAR })
  tipe_member: MemberType;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_spend: number;

  @CreateDateColumn()
  created_at: Date;
}