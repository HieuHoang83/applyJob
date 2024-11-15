import { IsNotEmpty, IsNumber, isNumber, IsOptional } from 'class-validator';

export class SearchRecruitmentPostPositionDto {
  @IsOptional()
  @IsNumber()
  recruitmentPostId: number;
  @IsOptional()
  @IsNumber()
  positionId: number;
}
