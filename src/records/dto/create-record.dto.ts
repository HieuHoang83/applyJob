import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  ownerId: number

  @ApiProperty()
  @IsNotEmpty()
  jobId: number

  @ApiProperty()
  @IsNotEmpty()
  fileCvId: number
}
