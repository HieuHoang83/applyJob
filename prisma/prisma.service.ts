import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  // async queryRow(queryRow: string){
  //   const prisma = new PrismaClient()
  //   const result = await prisma.$queryRaw'${queryRow}';
  // }
}
