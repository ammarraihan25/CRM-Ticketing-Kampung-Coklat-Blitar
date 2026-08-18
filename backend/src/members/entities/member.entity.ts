import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

export enum MemberType {
  REGULAR = 'PR',
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
  nomor_whatsapp: string;

  @Column({ type: 'varchar', length: 100 })
  nama_lengkap: string;

  @Column({ type: 'enum', enum: MemberType, default: MemberType.REGULAR })
  tipe_member: MemberType;

  @Column({ type: 'int', default: 0 })
  current_points: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  total_spend: number;

  @Column({ type: 'enum', enum: MemberTier, default: MemberTier.BRONZE })
  tier: MemberTier;

  @CreateDateColumn()
  created_at: Date;
}