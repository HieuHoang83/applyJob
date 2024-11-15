import { IsNumber } from 'class-validator';

export class CreateDomainAndCompanyDto {
  @IsNumber()
  domainId: number;

  @IsNumber()
  companyId: number;
}
export class CreateMultipleDomainAndCompanyDto {
  domains: CreateDomainAndCompanyDto[];
}
