import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class BlastWaDto {
  @IsString()
  @IsOptional()
  target_tier?: string;

  @IsString()
  @IsNotEmpty({ message: 'pesan_promo is required' })
  pesan_promo: string;
}
