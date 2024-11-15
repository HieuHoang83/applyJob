import { PartialType } from '@nestjs/mapped-types';
import { CreateDomainDto } from './create-domain.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDomainDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string;
}
