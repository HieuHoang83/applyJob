import { IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class CreateRecruitmentPostPositionDto {
  @IsNotEmpty()
  @IsNumber()
  recruitmentPostId: number;
  @IsNotEmpty()
  @IsNumber()
  positionId: number;
}
