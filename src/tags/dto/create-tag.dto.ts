import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}

export class AddTagToJobPostDto {
  @ApiProperty()
  @IsNotEmpty()
  jobPostId: number;

  @ApiProperty()
  @IsNotEmpty()
  tagId: number;
}
