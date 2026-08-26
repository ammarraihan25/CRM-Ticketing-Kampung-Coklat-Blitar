import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TicketCategory {
  GATE = 'gate',
  WAHANA = 'wahana',
  VENUE = 'venue',
  EDUKASI = 'edukasi',
  ROMBONGAN = 'rombongan',
}

@Entity('ticket_rates')
export class TicketRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: TicketCategory.GATE })
  category: TicketCategory;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
