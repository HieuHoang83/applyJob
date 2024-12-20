import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

import { CompanyModule } from './company/company.module';
import { RecordsModule } from './records/records.module';
import { FilesModule } from './files/files.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { CertificatesModule } from './certificates/certificates.module';
import { EducationsModule } from './educations/educations.module';
import { EmployeesModule } from './employees/employees.module';
import { EmployersModule } from './employers/employers.module';
import { AdminsModule } from './admins/admins.module';
import { DomainsModule } from './domains/domains.module';
import { DomainAndCompanyModule } from './domain-and-company/domain-and-company.module';
import { RecruitmentPostModule } from './recruitment-post/recruitment-post.module';
import { PositionModule } from './position/position.module';
import { RecruitmentPostPositionModule } from './recruitment-post-position/recruitment-post-position.module';
import { JobDescriptionModule } from './job-description/job-description.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { RecordsOnPostModule } from './record-on-recruitment-post/record-on-recruitment-post.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //gioi han luot goi api/ 1 may sd
    ThrottlerModule.forRoot([
      {
        ttl: 60000, //mili giay
        limit: 10, //gioi han trong n giay do
      },
    ]),
    // UsersModule,
    AuthModule,
    RecordsOnPostModule,
    CompanyModule,
    RecordsModule,
    FilesModule,
    EvaluationsModule,
    CertificatesModule,
    ExperiencesModule,
    EducationsModule,
    EmployeesModule,
    EmployersModule,
    AdminsModule,
    DomainsModule,
    DomainAndCompanyModule,
    RecruitmentPostModule,
    PositionModule,
    RecruitmentPostPositionModule,
    JobDescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
