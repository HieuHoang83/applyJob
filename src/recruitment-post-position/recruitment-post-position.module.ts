import { Module } from '@nestjs/common';
import { RecruitmentPostPositionService } from './recruitment-post-position.service';
import { RecruitmentPostPositionController } from './recruitment-post-position.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [RecruitmentPostPositionController],
  providers: [RecruitmentPostPositionService, PrismaService],
})
export class RecruitmentPostPositionModule {}
