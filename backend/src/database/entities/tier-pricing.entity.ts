import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tier_pricings')
export class TierPricing {
  @PrimaryGeneratedColumn()
  tier_id!: number;

  @Column({ type: 'int' })
  min_pax!: number;

  @Column({ type: 'int', nullable: true })
  max_pax?: number | null; // Null means infinity / unlimited

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_ticket!: number;

  @CreateDateColumn()
  created_at!: Date;
}
