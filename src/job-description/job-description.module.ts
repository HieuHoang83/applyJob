import { Module } from '@nestjs/common';
import { JobDescriptionService } from './job-description.service';
import { JobDescriptionController } from './job-description.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobDescriptionController],
  providers: [JobDescriptionService, PrismaService],
})
export class JobDescriptionModule {}
