import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class EvaluationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEvaluationDto: CreateEvaluationDto) {
    return await this.prismaService.evaluation.create({
      data: {
        ...createEvaluationDto,
      },
    });
  }

  async findAll(paginateInfo: PaginateInfo) {
    const {
      offset,
      defaultLimit,
      sort,
      projection,
      population,
      filter,
      currentPage,
    } = paginateInfo;

    // Get total items count
    const totalItems = await this.prismaService.evaluation.count({
      where: filter,
    });
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Retrieve data with Prisma
    const data = await this.prismaService.evaluation.findMany({
      where: filter,
      skip: offset,
      take: defaultLimit,
      // orderBy: sort,
      // select: projection,
      // include: population,
    });

    return {
      meta: {
        totalEvaluations: totalItems,
        evaluationCount: data.length,
        evaluationsPerPage: defaultLimit,
        totalPages,
        currentPage,
      },
      result: data,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.evaluation.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return await this.prismaService.evaluation.update({
      where: {
        id,
      },
      data: {
        ...updateEvaluationDto,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.evaluation.delete({
      where: {
        id,
      },
    });
  }
}
