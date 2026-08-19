import { Module } from '@nestjs/common';
import { WaGatewayService } from './wa-gateway.service';

@Module({
  providers: [WaGatewayService],
  exports: [WaGatewayService], // Biar bisa dipakai oleh PosModule, MemberModule, dll
})
export class WaGatewayModule {}