import { Entity, PrimaryColumn, Column } from 'typeorm';

export enum VoucherType {
  DISCOUNT = 'DISCOUNT',
  FREE_TICKET = 'FREE_TICKET',
}

export enum ClaimStatus {
  ISSUED = 'ISSUED',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
}

@Entity('vouchers')
export class Voucher {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  voucher_code: string;

  @Column({ type: 'varchar', length: 20 })
  nomor_whatsapp: string;

  @Column({ type: 'enum', enum: VoucherType })
  voucher_type: VoucherType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  benefit_value: number;

  @Column({ type: 'enum', enum: ClaimStatus, default: ClaimStatus.ISSUED })
  status_claim: ClaimStatus;

  @Column({ type: 'date' })
  expiry_date: Date;
}