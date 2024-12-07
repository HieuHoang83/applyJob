import { Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, IsBoolean, IsEmail, IsDate, IsArray, IsNotEmpty, IsEnum, Min } from 'class-validator';
import { Gender } from 'utils/constant';

export class CreateEmployeeDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  // @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @Type(() => Date)
  birthday: Date;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsString()
  @IsNotEmpty()
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
}

export class GetEmployeeEducationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  minAge?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  schoolName?: string;
}
