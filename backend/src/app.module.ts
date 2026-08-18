import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './modules/member/member.module';
import { PosModule } from './modules/pos/pos.module';
import { GateModule } from './modules/gate/gate.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'moobi_kcb'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MemberModule,
    PosModule,
    GateModule,
    VoucherModule,
    ReportsModule,
  ],
})
export class AppModule {}