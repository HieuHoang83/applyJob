import { NotFoundException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class EvaluationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEvaluationDto: CreateEvaluationDto) {
    try {
    const evaluation = await this.prismaService.$queryRaw`
    INSERT INTO Evaluation (rating, saved, employeeId, recruitmentPostId)
    
    VALUES (
    ${createEvaluationDto.rating}, 
    ${createEvaluationDto.saved}, 
    ${createEvaluationDto.employeeId},
    ${createEvaluationDto.recruitmentPostId})
    
    SELECT * FROM [dbo].[Evaluation]
      WHERE [id] = SCOPE_IDENTITY();
    `
    ;
      return evaluation[0];
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
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

  async findByEmployeeId(employeeId: number) {
    return await this.prismaService.evaluation.findMany({
      where: {
        employeeId: employeeId,
      },
    });
  }

  async findByRecruitmentPostId(recruitmentPostId: number) {
    return await this.prismaService.evaluation.findMany({
      where: {
        recruitmentPostId: recruitmentPostId,
      },
    });
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const evaluation = await this.findOne(id);
    
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[Evaluation]
      SET
        [rating] = COALESCE(${updateEvaluationDto.rating}, [rating]),
        [saved] = COALESCE(${updateEvaluationDto.saved}, [saved]),
        [employeeId] = COALESCE(${updateEvaluationDto.rating}, [employeeId]),
        [recruitmentPostId] = COALESCE(${updateEvaluationDto.rating}, [recruitmentPostId])
      WHERE [id] = ${id};

      SELECT * FROM [dbo].[Evaluation]
      WHERE [id] = ${id};
    `;
    return result[0];
  }

  async remove(id: number) {
    const evaluation = await this.findOne(id);
    
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[Evaluation]
      WHERE [id] = ${id};
    `;

    return evaluation;
  }
}
