import { IsNotEmpty, IsString } from 'class-validator';

export class PaymentWebhookDto {
  @IsNotEmpty()
  @IsString()
  pos_trx_id: string;

  @IsNotEmpty()
  @IsString()
  transaction_status: string; // Misal: 'settlement', 'capture', 'pending', 'expire', 'cancel'
}