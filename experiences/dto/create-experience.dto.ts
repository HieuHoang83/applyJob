import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateExperienceDto {

  @ApiProperty()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  employeeId: number;
}
