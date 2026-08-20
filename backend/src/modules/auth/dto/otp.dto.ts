import { IsString, IsNotEmpty, Length } from 'class-validator';

export class OtpRequestDto {
  @IsString()
  @IsNotEmpty()
  nomor_whatsapp!: string;
}

export class OtpVerifyDto {
  @IsString()
  @IsNotEmpty()
  nomor_whatsapp!: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 6)
  otp_code!: string;
}
