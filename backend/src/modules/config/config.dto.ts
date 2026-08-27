import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TicketCategory } from './entities/ticket-rate.entity';
import { RideStatus, RideCategory } from './entities/ride.entity';

export class CreateTicketRateDto {
  @IsEnum(TicketCategory)
  category: TicketCategory;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(2000000000)
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  isActive: boolean;
}

export class UpdateTicketRateDto extends PartialType(CreateTicketRateDto) {}

export class CreateRideDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(2000000000)
  price: number;

  @IsBoolean()
  isFreeTerusan: boolean;

  @IsEnum(RideStatus)
  status: RideStatus;

  @IsNumber()
  capacity: number;

  @IsString()
  duration: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(RideCategory)
  category: RideCategory;
}

export class UpdateRideDto extends PartialType(CreateRideDto) {}
