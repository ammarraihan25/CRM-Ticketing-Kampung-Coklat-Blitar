import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Member } from './member.entity';

export enum CommissionTrxType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('agent_commissions')
export class AgentCommission {
  @PrimaryGeneratedColumn('uuid')
  trx_id!: string;

  @Column({ type: 'varchar', length: 20 })
  whatsapp!: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'whatsapp', referencedColumnName: 'whatsapp' })
  agent!: Member;

  @Column({ type: 'enum', enum: CommissionTrxType })
  trx_type!: CommissionTrxType;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: CommissionStatus, default: CommissionStatus.PENDING })
  status!: CommissionStatus;

  @CreateDateColumn()
  created_at!: Date;
}
