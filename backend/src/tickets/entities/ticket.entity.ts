import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TicketStatus {
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
  nomor_whatsapp: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  ticket_code: string;

  @Column({ type: 'varchar', length: 20 })
  paket_id: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.ACTIVE })
  status_tiket: TicketStatus;

  @Column({ type: 'timestamp' })
  valid_until: Date;
}