import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum RideStatus {
  BUKA = 'BUKA',
  MAINTENANCE = 'MAINTENANCE',
  TUTUP = 'TUTUP',
}

export enum RideCategory {
  TERUSAN = 'terusan',
  PAID = 'paid',
  WATER = 'water',
}

@Entity('rides')
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'boolean', default: false })
  isFreeTerusan: boolean;

  @Column({ type: 'enum', enum: RideStatus, default: RideStatus.BUKA })
  status: RideStatus;

  @Column({ type: 'int', default: 1 })
  capacity: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  duration: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  playedToday: number;

  @Column({ type: 'enum', enum: RideCategory, default: RideCategory.TERUSAN })
  category: RideCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
