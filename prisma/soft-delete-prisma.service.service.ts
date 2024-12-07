import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from './custom-prisma-client';

@Injectable()
export class SoftDeletePrismaService
  extends PrismaClientExtended // we now extending PrismaClientExtended
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}