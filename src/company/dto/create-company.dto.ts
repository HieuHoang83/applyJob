import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  address: string;

  @IsNumber()
  logoId: number;

  @IsArray()
  domains: number[];
}
