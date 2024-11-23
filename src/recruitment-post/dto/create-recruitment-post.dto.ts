import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRecruitmentPostDto {
  @ApiProperty({ description: 'The title of the recruitment post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the recruitment post' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The employer ID associated with the post' })
  @IsInt()
  employerId: number;

  @ApiPropertyOptional({
    description: 'The date the post was created',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  datePosted: Date;

  @ApiPropertyOptional({
    description: 'The deadline for the recruitment post',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Type(() => Date)
  deadline: Date;

  @ApiPropertyOptional({ description: 'Array of position IDs', type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  positionIds?: number[];
}
