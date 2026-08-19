import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MemberTier } from '../../database/entities/member.entity';

export class BlastWaDto {
  @IsEnum(MemberTier, { message: 'target_tier must be one of: Bronze, Silver, Gold' })
  target_tier: MemberTier;

  @IsString()
  @IsNotEmpty({ message: 'pesan_promo is required' })
  pesan_promo: string;
}
