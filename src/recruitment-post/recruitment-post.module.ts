import { Module } from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { RecruitmentPostController } from './recruitment-post.controller';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { EmployersModule } from 'src/employers/employers.module';
import { EmployersService } from 'src/employers/employers.service';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [PrismaModule, CompanyModule],
  controllers: [RecruitmentPostController],
  providers: [RecruitmentPostService, PrismaService, EmployersService],
})
export class RecruitmentPostModule {}
