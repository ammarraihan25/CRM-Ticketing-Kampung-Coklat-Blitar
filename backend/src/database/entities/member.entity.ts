import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TipeMember {
  REGULER = 'PR',
  PENGAJIAN = 'PP',
  TRAVEL = 'PT',
}

export enum MemberStatus {
  AKTIF = 'Aktif',
  TIDAK_AKTIF = 'Tidak Aktif',
}

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nama: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  domisili: string;

  @Column({ type: 'enum', enum: TipeMember, default: TipeMember.REGULER })
  tipeMember: TipeMember;

  @Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.AKTIF })
  status: MemberStatus;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalSpend: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tanggalDaftar: string;

  @CreateDateColumn()
  createdAt: Date;
}