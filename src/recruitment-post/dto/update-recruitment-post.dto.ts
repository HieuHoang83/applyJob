import { PartialType } from '@nestjs/swagger';
import { CreateRecruitmentPostDto } from './create-recruitment-post.dto';
import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateRecruitmentPostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  deadline: Date;
}
