import { IsNumber } from 'class-validator';

export class DeleteDto {
  @IsNumber()
  domainId: number;

  @IsNumber()
  companyId: number;
}
