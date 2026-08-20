import { IsEnum, IsOptional } from 'class-validator';
import { MemberTier, TipeMember } from '../../database/entities/member.entity';

export class GetMembersQueryDto {
  @IsOptional()
  @IsEnum(MemberTier, { message: 'tier must be one of: Bronze, Silver, Gold' })
  tier?: MemberTier;

  @IsOptional()
  @IsEnum(TipeMember, { message: 'tipe_member must be one of: PR, PP, PT' })
  tipe_member?: TipeMember;
}
