import { IsNotEmpty, IsString, IsArray, ValidateNested, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../../../database/entities/pos-transaction.entity';

export class CheckoutItemDto {
  @IsNotEmpty()
  @IsString()
  paket_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  harga: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty: number;
}

export class CheckoutPosDto {
  @IsNotEmpty()
  @IsString()
  nomor_whatsapp: string;

  @IsNotEmpty()
  @IsString()
  cashier_id: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}