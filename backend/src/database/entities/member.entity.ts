import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum TipeMember {
  REGULER = 'PR',
  PENGAJIAN = 'PP',
  TRAVEL = 'PT',
}

export enum MemberTier {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

@Entity('members')
export class Member {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  nomor_whatsapp: string; // Primary Key E.164 (misal: 628123456789)

  @Column({ type: 'varchar', length: 100 })
  nama_lengkap: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  domisili: string;

  @Column({ type: 'enum', enum: TipeMember, default: TipeMember.REGULER })
  tipe_member: TipeMember;

  @Column({ type: 'int', default: 0 })
  current_points: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_spend: number;

  @Column({ type: 'enum', enum: MemberTier, default: MemberTier.BRONZE })
  tier: MemberTier;

  @CreateDateColumn()
  created_at: Date;
}