import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GateModule } from './modules/gate/gate.module';
import { MemberModule } from './modules/member/member.module';
import { PosModule } from './modules/pos/pos.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { CrmModule } from './crm/crm.module';
import { ReportsModule } from './reports/reports.module';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    GateModule,
    MemberModule,
    PosModule,
    VoucherModule,
    CrmModule,
    ReportsModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}