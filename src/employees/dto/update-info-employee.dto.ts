import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'utils/constant';

export class UpdateInfoEmployees {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  provider: string;

  @IsOptional()
  @IsBoolean()
  emailVerified: boolean;
}
