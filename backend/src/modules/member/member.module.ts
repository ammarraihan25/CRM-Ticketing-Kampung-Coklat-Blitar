import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from '../../database/entities/member.entity';
import { Ticket } from '../../database/entities/ticket.entity';
import { PosTransaction } from '../../database/entities/pos-transaction.entity';
import { Voucher } from '../../database/entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Ticket, PosTransaction, Voucher])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
