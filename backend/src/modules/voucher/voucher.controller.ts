import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('validate')
  async validateVoucher(@Body() body: { code: string; whatsapp?: string }) {
    if (!body.code) {
      throw new BadRequestException('Kode voucher wajib diisi');
    }
    return this.voucherService.validate(body.code, body.whatsapp);
  }
}
