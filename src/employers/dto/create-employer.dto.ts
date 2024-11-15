import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsEnum,
  Min,
} from 'class-validator';
import { Gender } from 'utils/constant';

export class CreateEmployerDto {
  @IsEmail()
  email: string;

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

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  provider?: string = 'credentials';

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean = false;

  @IsOptional()
  @IsDate()
  hiringDate?: Date;

  @IsString()
  department: string;

  @IsString()
  position: string;

  @IsNotEmpty()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsBoolean()
  isBanned?: boolean = false;
}
