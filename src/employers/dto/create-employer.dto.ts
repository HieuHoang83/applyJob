import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Gender } from 'utils/constant';

export class CreateEmployerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  refreshToken: string;

  @IsOptional()
  @IsString()
  provider: string;

  @IsOptional()
  @IsBoolean()
  emailVerified: boolean;

  @IsOptional()
  @IsDate()
  hiringDate: Date;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsOptional()
  @IsInt()
  companyId: number;
}
