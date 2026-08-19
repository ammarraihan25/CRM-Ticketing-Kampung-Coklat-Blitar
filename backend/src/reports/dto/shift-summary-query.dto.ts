import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ShiftSummaryQueryDto {
  @IsString()
  @IsNotEmpty({ message: 'cashier_id is required' })
  cashier_id: string;

  @IsDateString({}, { message: 'date must be a valid date in YYYY-MM-DD format' })
  @IsNotEmpty({ message: 'date is required' })
  date: string;
}
