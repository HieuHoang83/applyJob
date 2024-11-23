import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateRecordOnPostDto {
  @ApiProperty()
  @IsNotEmpty()
  recordId: number;

  @ApiProperty()
  @IsNotEmpty()
  recruitmentPostId: number;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
