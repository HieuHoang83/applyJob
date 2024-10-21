import { Module } from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { RecruitmentPostController } from './recruitment-post.controller';

@Module({
  controllers: [RecruitmentPostController],
  providers: [RecruitmentPostService]
})
export class RecruitmentPostModule {}
