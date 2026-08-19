import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateController } from './gate.controller';
import { GateService } from './gate.service';
import { Ticket } from '../../database/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [GateController],
  providers: [GateService],
})
export class GateModule {}
