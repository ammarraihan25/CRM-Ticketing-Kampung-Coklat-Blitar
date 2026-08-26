import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';

export enum VoucherType {
  DISCOUNT = 'DISCOUNT',
  FREE_TICKET = 'FREE_TICKET',
}

export enum StatusClaim {
  ISSUED = 'ISSUED',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
}

@Entity('vouchers')
export class Voucher {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  voucher_code!: string;

  @Column({ type: 'varchar', length: 20 })
  whatsapp!: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'whatsapp', referencedColumnName: 'whatsapp' })
  member!: Member;

  @Column({ type: 'enum', enum: VoucherType })
  voucher_type!: VoucherType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  benefit_value!: number;

  @Column({ type: 'enum', enum: StatusClaim, default: StatusClaim.ISSUED })
  status_claim!: StatusClaim;

  @Column({ type: 'date' })
  expiry_date!: Date;
}
