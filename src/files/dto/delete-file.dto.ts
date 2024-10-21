import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteFileDto {
  @ApiProperty()
  @IsNotEmpty()
  filePath: string;
}
