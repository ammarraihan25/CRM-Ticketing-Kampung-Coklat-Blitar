import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';
import { Member } from '../../database/entities/member.entity';
import { Ticket } from '../../database/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PosTransaction, Member, Ticket])],
  controllers: [PosController],
  providers: [PosService],
})
export class PosModule {}