import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @Column({ type: 'uuid' })
  pos_trx_id: string;

  @Column({ type: 'enum', enum: TrxType, default: TrxType.EARN })
  trx_type: TrxType;

  @Column({ type: 'int' })
  points_amount: number;

  @CreateDateColumn()
  created_at: Date;
}