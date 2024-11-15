import { Module } from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { RecruitmentPostController } from './recruitment-post.controller';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecruitmentPostController],
  providers: [RecruitmentPostService, PrismaService],
})
export class RecruitmentPostModule {}
