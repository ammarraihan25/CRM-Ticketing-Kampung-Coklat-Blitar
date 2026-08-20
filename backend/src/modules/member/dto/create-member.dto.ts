import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TipeMember } from '../../../database/entities/member.entity';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  nomor_whatsapp!: string;

  @IsString()
  @IsNotEmpty()
  nama_lengkap!: string;

  @IsString()
  @IsOptional()
  domisili?: string;

  @IsEnum(TipeMember)
  @IsOptional()
  tipe_member?: TipeMember;
}
