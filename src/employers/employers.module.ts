import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { PrismaService } from 'prisma/prisma.service';
import { CompanyService } from 'src/company/company.service';
import { PrismaModule } from 'prisma/prisma.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [PrismaModule, CompanyModule],

  controllers: [EmployersController],
  providers: [EmployersService, PrismaService, CompanyService],
  exports: [EmployersService],
})
export class EmployersModule {}
