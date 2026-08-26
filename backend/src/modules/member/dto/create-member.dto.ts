import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TipeMember, MemberStatus } from '../../../database/entities/member.entity';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  whatsapp!: string;

  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsString()
  @IsOptional()
  domisili?: string;

  @IsEnum(TipeMember)
  @IsOptional()
  tipeMember?: TipeMember;

  @IsEnum(MemberStatus)
  @IsOptional()
  status?: MemberStatus;

  @IsNumber()
  @IsOptional()
  totalSpend?: number;

  @IsString()
  @IsOptional()
  tanggalDaftar?: string;
}
