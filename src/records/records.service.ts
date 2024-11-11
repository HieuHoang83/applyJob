import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IUser } from 'src/interface/users.interface';
import { RecordStatus } from 'utils/constant';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class RecordsService {
  constructor(private prismaService: PrismaService) {}
  // async create(createRecordDto: CreateRecordDto, user: IUser) {
  //   const record = await this.prismaService.record.create({
  //     data: {
  //       ... createRecordDto,
  //     }
  //   });
  //   await this.prismaService.historyStatus.create({
  //     data: {
  //       status: RecordStatus.PENDING,
  //       recordId: record.id,
  //       updatedById: record.ownerId
  //     }
  //   })
  //   return record;
  // }

  // async findAll(paginateInfo: PaginateInfo) {
  //   const { offset, defaultLimit, sort, projection, population, filter, currentPage } = paginateInfo;

  //   // Get total items count
  //   const totalItems = await this.prismaService.record.count({
  //     where: filter,
  //   });
  //   const totalPages = Math.ceil(totalItems / defaultLimit);

  //   // Retrieve data with Prisma
  //   const data = await this.prismaService.record.findMany({
  //     where: filter,
  //     skip: offset,
  //     take: defaultLimit,
  //     // orderBy: sort,
  //     // select: projection,
  //     // include: population,
  //   });

  //   return {
  //     meta: {
  //       totalRecords: totalItems,
  //       recordCount: data.length,
  //       recordsPerPage: defaultLimit,
  //       totalPages,
  //       currentPage,
  //     },
  //     result: data
  //   };
  // }

  // async findOne(id: number) {
  //   return await this.prismaService.record.findFirst({
  //     where: {
  //       id
  //     }
  //   });
  // }

  // async update(id: number, updateRecordDto: UpdateRecordDto, user: IUser) {
  //   await this.prismaService.historyStatus.create({
  //     data: {
  //       status: updateRecordDto.status,
  //       recordId: id,
  //       updatedById: user.id
  //     }
  //   })
  //   return await this.prismaService.record.update({
  //     where: {
  //       id
  //     },
  //     data: {
  //       ... updateRecordDto
  //     }
  //   });
  // }

  // async remove(id: number) {
  //   return await this.prismaService.record.delete({
  //     where: {
  //       id
  //     }
  //   });
  // }
}
