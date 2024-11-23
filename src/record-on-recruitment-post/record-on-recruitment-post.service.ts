import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateRecordOnPostDto } from './dto/create-record-on-recruitment-post.dto';
import { UpdateRecordOnPostDto } from './dto/update-record-on-recruitment-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { RecordStatus } from 'utils/constant';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class RecordsOnPostService {
  constructor(private prismaService: PrismaService) {}
  async create(createRecordOnPostDto: CreateRecordOnPostDto) {
    const result = await this.prismaService.$queryRaw`
      INSERT INTO [dbo].[RecordOnRecruitmentPost] (
        [recordId],
        [recruitmentPostId],
        [job],
        [status]
      )
      VALUES (
        ${createRecordOnPostDto.recordId},
        ${createRecordOnPostDto.recruitmentPostId},
        ${createRecordOnPostDto.job},
        ${RecordStatus.PENDING}
      );

      SELECT * FROM [dbo].[RecordOnRecruitmentPost]
      WHERE [recordId] = ${createRecordOnPostDto.recordId}
      AND [recruitmentPostId] = ${createRecordOnPostDto.recruitmentPostId};
    `;
    return result[0];
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

  async findOne(recordId: number, recruitmentPostId: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[RecordOnRecruitmentPost]
      WHERE [recordId] = ${recordId}
        AND [recruitmentPostId] = ${recruitmentPostId};
    `;

    return result[0];
  }

  async findMany(recruitmentPostId: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[RecordOnRecruitmentPost]
      WHERE [recruitmentPostId] = ${recruitmentPostId};
    `;

    return result;
  }

  async update(updateRecordOnPostDto: UpdateRecordOnPostDto) {
    const record = await this.findOne(updateRecordOnPostDto.recordId, updateRecordOnPostDto.recruitmentPostId);
   
    if (!record) {
      throw new NotFoundException('Record not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[RecordOnRecruitmentPost]
      SET
        [status] = COALESCE(${updateRecordOnPostDto.status}, [status]),
        [updatedAt] = COALESCE(GETDATE(), [updatedAt])
      WHERE [recordId] = ${updateRecordOnPostDto.recordId}
        AND [recruitmentPostId] = ${updateRecordOnPostDto.recruitmentPostId};
      
      SELECT * FROM [dbo].[RecordOnRecruitmentPost] 
      WHERE [recordId] = ${updateRecordOnPostDto.recordId}
        AND [recruitmentPostId] = ${updateRecordOnPostDto.recruitmentPostId};
    `;
    return result[0];
  }

  async remove(record: number, post: number) {
    const object = await this.findOne(record, post);
    
    if (!object) {
      throw new NotFoundException('Not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[RecordOnRecruitmentPost]
      WHERE [recordId] = ${record}
        AND [recruitmentPostId] = ${post};
    `;

    return object;
  }
}
