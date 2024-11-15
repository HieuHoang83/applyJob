import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRecruitmentPostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  employerId: number;

  @IsDate()
  datePosted: Date;

  @IsDate()
  deadline: Date;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  positionIds?: number[]; // Array of Position IDs
}
