import { Type } from 'class-transformer';
import {
  IsEmail,
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

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  role:string;

}

export class CreateEmployerDto {
  
  @IsString()
  specialization: string;

  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

}

export class CreateEmployee {
  
  @IsString()
  skills: string;
  @IsString()
  certifications: string;
  
  @IsNotEmpty()
  @IsNumber()
  userId: number;

}

export class RefreshTokenDTO {
  @IsNotEmpty({ message: 'refreshToken k duoc de trong' })
  refreshToken: string;
  @IsNotEmpty({ message: 'accessToken k duoc de trong' })
  accessToken: string;
}
