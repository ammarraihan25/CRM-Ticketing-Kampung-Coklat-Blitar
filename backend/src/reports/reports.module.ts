import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosTransaction } from '../database/entities/pos-transaction.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([PosTransaction])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
