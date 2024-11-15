import { Module } from '@nestjs/common';
import { DomainAndCompanyService } from './domain-and-company.service';
import { DomainAndCompanyController } from './domain-and-company.controller';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { DomainsModule } from 'src/domains/domains.module';
import { DomainsService } from 'src/domains/domains.service';
import { CompanyService } from 'src/company/company.service';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [PrismaModule, DomainsModule, CompanyModule],
  controllers: [DomainAndCompanyController],
  providers: [
    DomainAndCompanyService,
    PrismaService,
    DomainsService,
    CompanyService,
  ],
})
export class DomainAndCompanyModule {}
