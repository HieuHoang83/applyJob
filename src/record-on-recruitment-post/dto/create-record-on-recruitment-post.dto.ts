import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRecordOnPostDto {
  @ApiProperty()
  @IsNotEmpty()
  recordId: number

  @ApiProperty()
  @IsNotEmpty()
  recruitmentPostId: number

  @ApiProperty()
  @IsNotEmpty()
  job: string
}
