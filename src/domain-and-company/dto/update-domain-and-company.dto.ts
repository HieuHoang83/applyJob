import { PartialType } from '@nestjs/swagger';
import { CreateDomainAndCompanyDto } from './create-domain-and-company.dto';

export class UpdateDomainAndCompanyDto extends PartialType(CreateDomainAndCompanyDto) {}
