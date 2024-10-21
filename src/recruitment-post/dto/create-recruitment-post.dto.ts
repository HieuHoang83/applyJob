import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  isNumber,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateRecruitmentPostDto {
      @IsNotEmpty()
      title :      string;
      @IsNotEmpty()
      description :  string;
      @IsNotEmpty()

      datePosted : Date;
      @IsNotEmpty()

      location   : string;
      @IsNotEmpty()

      skills    :  string;
      @IsNotEmpty()
      @IsNumber()
      salary    :  number;
      @IsNotEmpty()

      deadline  :  Date;
      @IsNotEmpty()

      companyId :number;
      @IsNotEmpty()

      employerId:number;

}