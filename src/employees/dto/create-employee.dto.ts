import { IsOptional, IsString, IsInt, IsBoolean, IsEmail, IsDate, IsArray, IsNotEmpty, IsEnum } from 'class-validator';
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
  @IsEnum(Gender)
  gender: string;

  @IsOptional()
  @IsInt()
  age: number;

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
