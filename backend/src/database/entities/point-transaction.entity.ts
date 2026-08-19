import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';

export enum TrxType {
  EARN = 'EARN',
  BURN = 'BURN',
}

@Entity('point_transactions')
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  trx_id: string;

  @Column({ type: 'varchar', length: 20 })
  nomor_whatsapp: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'nomor_whatsapp' })
  member: Member;

  @Column({ type: 'enum', enum: TrxType })
  trx_type: TrxType;

  @Column({ type: 'int' })
  points_amount: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @CreateDateColumn()
  created_at: Date;
}