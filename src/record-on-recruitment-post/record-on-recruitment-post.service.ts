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

  async findMany(
    recruitmentPostId: number,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const offset = (page - 1) * pageSize; // Tính toán offset

    // Lấy tổng số bản ghi
    const totalRecords = await this.prismaService.$queryRaw`
      SELECT COUNT(*) AS total 
      FROM [dbo].[RecordOnRecruitmentPost] ror
      INNER JOIN [dbo].[RecruitmentPost] rp ON rp.id = ror.recruitmentPostId
      INNER JOIN [dbo].[Employee] e ON e.id = rp.employerId
      WHERE ror.[recruitmentPostId] = ${recruitmentPostId};
    `;
    const totalPosts = totalRecords[0].total;

    // Truy vấn dữ liệu phân trang
    const result = await this.prismaService.$queryRaw`
      SELECT 
        ror.createdAt as appliedDate,
        ror.status as applicationStatus,
        ror.recruitmentPostId as recruitmentPostId,
        rp.title,
        ror.recordId as recordId,
        e.id as employeeId,
        e.name AS employeeName,
        e.email AS employeeEmail
      FROM [dbo].[RecordOnRecruitmentPost] ror, [dbo].[RecruitmentPost] rp, [dbo].[Employee] e ,Record 
       
       
      WHERE ror.[recruitmentPostId] = ${recruitmentPostId} and rp.id = ror.recruitmentPostId and e.id = Record.ownerId and Record.id=ror.recordId
      ORDER BY ror.createdAt DESC  -- Bạn có thể thay đổi thứ tự sắp xếp theo nhu cầu
      OFFSET ${offset} ROWS
      FETCH NEXT ${pageSize} ROWS ONLY;
    `;
    const title = await this.prismaService.$queryRaw`
    SELECT 
      rp.title
    FROM [dbo].[RecruitmentPost] rp
   
    WHERE rp.id = ${recruitmentPostId}
 

 
    `;
    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalPosts / pageSize);

    return {
      totalPosts,
      totalPages,
      result,
      title: title[0]?.title,
    };
  }

  async update(updateRecordOnPostDto: UpdateRecordOnPostDto) {
    const record = await this.findOne(
      updateRecordOnPostDto.recordId,
      updateRecordOnPostDto.recruitmentPostId,
    );

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
