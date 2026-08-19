import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Member } from './member.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  DP_PAID = 'DP_PAID',
  FULLY_PAID = 'FULLY_PAID',
  CANCELLED = 'CANCELLED',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id!: string;

  @Column({ type: 'varchar', length: 20 })
  nomor_whatsapp!: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'nomor_whatsapp' })
  agent!: Member;

  @Column({ type: 'date' })
  visit_date!: Date;

  @Column({ type: 'int' })
  total_pax!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  total_amount!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  dp_amount!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status!: BookingStatus;

  @CreateDateColumn()
  created_at!: Date;
}
