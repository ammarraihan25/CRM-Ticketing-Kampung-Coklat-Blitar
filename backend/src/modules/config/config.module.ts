import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { TicketRate } from './entities/ticket-rate.entity';
import { Ride } from './entities/ride.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRate, Ride])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
