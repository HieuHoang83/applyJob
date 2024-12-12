import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRecruitmentPostDto } from './create-recruitment-post.dto';
import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecruitmentPostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => Date)
  deadline: Date;
}
