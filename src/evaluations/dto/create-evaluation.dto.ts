import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateEvaluationDto {
  @ApiProperty()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  emotion: string;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  jobPostId: number;
}
