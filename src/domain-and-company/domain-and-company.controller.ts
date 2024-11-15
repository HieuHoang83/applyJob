import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DomainAndCompanyService } from './domain-and-company.service';
import { CreateDomainAndCompanyDto } from './dto/create-domain-and-company.dto';
import { UpdateDomainAndCompanyDto } from './dto/update-domain-and-company.dto';
import { Public } from 'src/decorators/customize';
import { DomainsService } from 'src/domains/domains.service';
import { DeleteDto } from './dto/deleteDto';

@Controller('domain-and-company')
export class DomainAndCompanyController {
  constructor(
    private readonly domainAndCompanyService: DomainAndCompanyService,
  ) {}

  @Public()
  @Post()
  create(@Body() createDomainAndCompanyDto: CreateDomainAndCompanyDto) {
    return this.domainAndCompanyService.create(createDomainAndCompanyDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.domainAndCompanyService.findAll();
  }
  @Public()
  @Get(':companyId')
  findDomainOfCompany(@Param('companyId') companyId: string) {
    return this.domainAndCompanyService.findDomainOfCompany(+companyId);
  }
  @Public()
  @Delete('')
  remove(@Body() deleteDto: DeleteDto) {
    return this.domainAndCompanyService.remove(deleteDto);
  }
}
