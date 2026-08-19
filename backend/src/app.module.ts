import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GateModule } from './modules/gate/gate.module';
import { MemberModule } from './modules/member/member.module';
import { PosModule } from './modules/pos/pos.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    GateModule,
    MemberModule,
    PosModule,
    VoucherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}