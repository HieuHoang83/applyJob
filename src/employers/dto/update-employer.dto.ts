import { PartialType } from '@nestjs/swagger';
import { CreateEmployerDto } from './create-employer.dto';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateEmployerDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  provider?: string = 'credentials';

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean = false;

  @IsOptional()
  @IsDate()
  hiringDate?: Date;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsBoolean()
  isBanned?: boolean = false;
}
