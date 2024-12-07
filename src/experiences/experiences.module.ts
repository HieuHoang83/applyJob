import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, PrismaService]
})
export class ExperiencesModule {}
