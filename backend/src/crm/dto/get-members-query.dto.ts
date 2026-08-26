import { IsEnum, IsOptional } from 'class-validator';
import { TipeMember } from '../../database/entities/member.entity';

export class GetMembersQueryDto {
  @IsOptional()
  tier?: string;

  @IsOptional()
  @IsEnum(TipeMember, { message: 'tipe_member must be one of: PR, PP, PT' })
  tipe_member?: TipeMember;
}
