import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { PrismaService } from 'prisma/prisma.service';
import { EmployeesService } from 'src/employees/employees.service';
@Module({
  controllers: [RecordsController],
  providers: [RecordsService, PrismaService, EmployeesService],
})
export class RecordsModule {}
