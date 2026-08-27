import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';

export enum StatusTiket {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticket_id: string;

  @Column({ type: 'varchar', length: 20 })
  whatsapp: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'whatsapp', referencedColumnName: 'whatsapp' })
  member: Member;

  @Column({ type: 'varchar', length: 50, unique: true })
  ticket_code: string;

  @Column({ type: 'varchar', length: 20 })
  paket_id: string;

  @Column({ type: 'varchar', default: StatusTiket.ACTIVE })
  status_tiket: StatusTiket;

  @Column({ type: 'timestamp' })
  valid_until: Date;
}