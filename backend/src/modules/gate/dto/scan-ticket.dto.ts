import { IsString, IsNotEmpty } from 'class-validator';

export class ScanTicketDto {
  @IsString()
  @IsNotEmpty()
  encrypted_payload!: string;
}
