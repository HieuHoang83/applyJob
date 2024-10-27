import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateEvaluationDto {
  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  saved: boolean;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  recruitmentPostId: number;
}
