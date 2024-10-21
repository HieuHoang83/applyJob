import { Module } from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { RecruitmentPostController } from './recruitment-post.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [RecruitmentPostController],
  providers: [RecruitmentPostService, PrismaService]
})
export class RecruitmentPostModule {}
