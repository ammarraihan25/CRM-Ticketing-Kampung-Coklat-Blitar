import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';
import { Member } from '../../database/entities/member.entity';
import { Ticket } from '../../database/entities/ticket.entity';
import { WaGatewayModule } from '../wa-gateway/wa-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PosTransaction, Member, Ticket]),
    WaGatewayModule, // Inject WA Gateway Module
  ],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}