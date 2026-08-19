import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../database/entities/member.entity';
import { PosTransaction } from '../database/entities/pos-transaction.entity';
import { PointTransaction } from './entities/point-transaction.entity';
import { CrmController } from './crm.controller';
import { CrmService } from './crm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, PointTransaction, PosTransaction]),
  ],
  controllers: [CrmController],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
