import { Type } from 'class-transformer';
import { Role } from 'utils/constant';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role:string;
}

export class CreateEmployerDto {
  @IsNotEmpty()
  hiringDate: Date;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  position: string;

  companyId: number;
}

export class CreateEmployee {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;
}

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'refreshToken k duoc de trong' })
  refreshToken: string;
  @IsNotEmpty({ message: 'accessToken k duoc de trong' })
  accessToken: string;
}
