import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateJobDescriptionDto {
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  level?: string = 'staff';

  @IsString()
  experience: string;

  @IsString()
  salary: string;

  @IsInt()
  quantity: string;

  @IsString()
  employmentType: string;

  @IsOptional()
  @IsString()
  gender?: string = 'Not required';

  @IsInt()
  recruitmentPostId: number;
}
