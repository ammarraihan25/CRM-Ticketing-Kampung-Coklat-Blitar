import { IsNotEmpty, IsString, IsArray, IsEnum, IsNumber, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/pos.entity';

// Struct item tiket yang dibeli
export class TicketItemDto {
  @IsString()
  @IsNotEmpty()
  paket_id: string; // Misal: "PAKET-REGULER"

  @IsNumber()
  @Min(1)
  harga: number;

  @IsNumber()
  @Min(1)
  qty: number;
}

// Struct utama payload Checkout Kasir
export class CreatePosDto {
  @IsString()
  @IsNotEmpty()
  nomor_whatsapp: string; // Format E.164 (misal: "628123456789")

  @IsString()
  @IsNotEmpty()
  cashier_id: string; // ID Kasir bertugas

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod; // CASH / QRIS / DEBIT / TRANSFER

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketItemDto)
  items: TicketItemDto[];
}