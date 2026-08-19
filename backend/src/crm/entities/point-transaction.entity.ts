import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Member } from '../../database/entities/member.entity';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';

export enum TrxType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
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

  @Column({ type: 'uuid' })
  pos_trx_id: string;

  @ManyToOne(() => PosTransaction)
  @JoinColumn({ name: 'pos_trx_id' })
  posTransaction: PosTransaction;

  @Column({ type: 'enum', enum: TrxType })
  trx_type: TrxType;

  @Column({ type: 'int' })
  points_amount: number;

  @CreateDateColumn()
  created_at: Date;
}
