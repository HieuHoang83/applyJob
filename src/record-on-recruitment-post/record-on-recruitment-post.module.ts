import { Module } from '@nestjs/common';
import { RecordsOnPostService } from './record-on-recruitment-post.service';
import { RecordsOnPostController } from './record-on-recruitment-post.controller';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  controllers: [RecordsOnPostController],
  providers: [RecordsOnPostService, PrismaService],
})
export class RecordsOnPostModule {}
