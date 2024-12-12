import {
  NotFoundException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class EvaluationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    try {
      // Thực hiện MERGE để upsert
      await this.prismaService.$executeRaw`
            MERGE INTO Evaluation AS target
            USING (SELECT ${createEvaluationDto.employeeId} AS employeeId, 
                          ${createEvaluationDto.recruitmentPostId} AS recruitmentPostId) AS source
            ON target.employeeId = source.employeeId 
               AND target.recruitmentPostId = source.recruitmentPostId
            WHEN MATCHED THEN 
                UPDATE SET 
                    target.rating = ${createEvaluationDto.rating},
                    target.saved = ${createEvaluationDto.saved}
            WHEN NOT MATCHED THEN 
                INSERT (rating, saved, employeeId, recruitmentPostId)
                VALUES (
                    ${createEvaluationDto.rating}, 
                    ${createEvaluationDto.saved}, 
                    ${createEvaluationDto.employeeId}, 
                    ${createEvaluationDto.recruitmentPostId}
                );
        `;

      // Lấy bản ghi đã chèn hoặc cập nhật
      const evaluation = await this.prismaService.evaluation.findFirst({
        where: {
          employeeId: createEvaluationDto.employeeId,
          recruitmentPostId: createEvaluationDto.recruitmentPostId,
        },
      });

      return evaluation; // Trả về bản ghi
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

  async findByRecruitmentPostId(postId: number, employeeId: number) {
    const result: any = await this.prismaService.$queryRaw`
      SELECT *
      FROM "Evaluation"
      WHERE "recruitmentPostId" = ${postId} AND "employeeId" = ${employeeId}
    `;
    if (result.length > 0) {
      return result[0];
    }
    throw new NotFoundException('Evaluation not found');
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
