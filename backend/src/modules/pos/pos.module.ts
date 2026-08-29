import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmModule } from '../../crm/crm.module';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';
import { Member } from '../../database/entities/member.entity';
import { Ticket } from '../../database/entities/ticket.entity';
import { WaGatewayModule } from '../wa-gateway/wa-gateway.module';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PosTransaction, Member, Ticket]),
    WaGatewayModule,
    CrmModule,
  ],
  controllers: [PosController],
  providers: [PosService],
  exports: [PosService],
})
export class PosModule {}
