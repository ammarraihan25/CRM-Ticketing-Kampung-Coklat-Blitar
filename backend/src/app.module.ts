import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { PosModule } from './modules/pos/pos.module';
import { GateModule } from './modules/gate/gate.module';
import { VoucherModule } from './modules/voucher/voucher.module';

@Module({
  imports: [
    // 1. Load file .env secara global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Konfigurasi Database PostgreSQL & TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_DATABASE', 'kampung_coklat'),
        // Sesuai Dokumen Arsitektur: Entities berada di src/database/entities/
        entities: [__dirname + '/database/entities/*.entity{.ts,.js}'],
        synchronize: true, // Auto-create table di DB (Gunakan false untuk production)
      }),
      inject: [ConfigService],
    }),

    // 3. Import Modul Utama Sesuai Dokumen Arsitektur
    AuthModule,
    MemberModule,
    PosModule,
    GateModule,
    VoucherModule,
  ],
})
export class AppModule {}