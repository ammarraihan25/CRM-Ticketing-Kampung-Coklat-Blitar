import { Controller, Post, Body } from '@nestjs/common';
import { PosService } from './pos.service';
import { CheckoutPosDto } from './dto/checkout-pos.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';

@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('checkout')
  async checkout(@Body() dto: CheckoutPosDto) {
    return this.posService.checkout(dto);
  }

  @Post('webhook/payment')
  async handleWebhook(@Body() dto: PaymentWebhookDto) {
    return this.posService.handlePaymentWebhook(dto);
  }
}