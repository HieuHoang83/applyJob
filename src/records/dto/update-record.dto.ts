import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  
}
