import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// import { DatabaseModule } from './database/database.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { RecruitmentPostModule } from './recruitment-post/recruitment-post.module';
import { CompanyModule } from './company/company.module';
import { RecordsModule } from './records/records.module';
import { FilesModule } from './files/files.module';
import { TagsModule } from './tags/tags.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
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
    UsersModule,
    AuthModule,
    RecruitmentPostModule,
    CompanyModule,
    RecordsModule,
    FilesModule,
    TagsModule,
    EvaluationsModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
