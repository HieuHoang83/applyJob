import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RecruitmentPostService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateRecruitmentPostDto) {
    const recruitmentPost = await this.prismaService.$queryRaw`
  INSERT INTO RecruitmentPost (title, description, employerId, datePosted, deadline)
  OUTPUT INSERTED.id
  VALUES (${data.title}, ${data.description}, ${data.employerId}, ${data.datePosted}, ${data.deadline});
`;

    // Lấy id từ bản ghi vừa chèn
    const id = recruitmentPost[0].id; // Giả sử kết quả trả về là một mảng

    // Trả về dữ liệu kèm theo id
    return { ...data, id };
  }
  async countTotalPosts() {
    const count = await this.prismaService.$queryRaw`
      SELECT COUNT(*) as total FROM "RecruitmentPost";
    `;
    return count[0].total; // Số lượng bản ghi
  }
  async findPaginatedPosts(page: number, pageSize: number) {
    const CURRENT_DATE = new Date().toISOString();
    const offset = (page - 1) * pageSize;

    // Lấy tổng số bản ghi
    const totalPosts = await this.countTotalPosts();

    // Lấy dữ liệu phân trang
    const recruitmentPosts = await this.prismaService.$queryRaw`
    SELECT rp.id,
           rp.title,
           rp.description,
           rp.datePosted,
           rp.deadline,
           jd.location,
           jd.experience,
           jd.level,
           jd.salary,
           jd.quantity,
           jd.employmentType,
           jd.gender 
    FROM "RecruitmentPost" rp
    LEFT JOIN "JobDescription" jd ON rp.id = jd."recruitmentPostId"
    WHERE rp.datePosted < ${CURRENT_DATE}  
      or rp.deadline > ${CURRENT_DATE}     
    ORDER BY rp.createdAt DESC               -- Đảm bảo có ORDER BY
    OFFSET ${offset} ROWS
    FETCH NEXT ${pageSize} ROWS ONLY; 
  `;
    // Tính số trang
    const totalPages = Math.ceil(totalPosts / pageSize);

    return {
      totalPosts,
      totalPages,
      recruitmentPosts,
    };
  }

  async findOne(id: number) {
    const CURRENT_DATE = new Date().toISOString();
    const recruitmentPost = await this.prismaService.$queryRaw`
  SELECT rp.id,
         rp.title,
         rp.description,
         rp.datePosted,
         rp.deadline,
         jd.location,
         jd.experience,
         jd.level,
         jd.salary,
         jd.quantity,
         jd.employmentType,
         jd.gender 
  FROM "RecruitmentPost" rp
  LEFT JOIN "JobDescription" jd ON rp.id = jd."recruitmentPostId"
  WHERE rp.id = ${id}  
  and rp.datePosted < ${CURRENT_DATE}  
  -- and rp.deadline > ${CURRENT_DATE}    
`;

    return recruitmentPost;
  }

  async update(id: number, data: UpdateRecruitmentPostDto) {
    // Start with the base query
    try {
      const fieldsToUpdate = [];

      if (data.title) {
        fieldsToUpdate.push(`title = '${data.title}'`);
      }
      if (data.description) {
        fieldsToUpdate.push(`description = '${data.description}'`);
      }

      if (data.deadline) {
        fieldsToUpdate.push(`deadline = '${data.deadline}'`);
      }
      const date = new Date().toISOString(); // Get current date in ISO format
      fieldsToUpdate.push(`updatedAt = '${date}'`);
      const updateQuery = `
        UPDATE RecruitmentPost
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ${id};
      `;

      await this.prismaService.$executeRawUnsafe(updateQuery);
      return { message: `RecruitmentPost with id ${id} updated successfully.` };
    } catch (error) {
      throw new BadRequestException(
        `Failed to update company with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    const CURRENT_DATE_MINUS_ONE_YEAR = currentDate.toISOString();
    await this.prismaService.$executeRaw`
      UPDATE RecruitmentPost
      SET deadline = ${CURRENT_DATE_MINUS_ONE_YEAR} , updatedAt = ${currentDate}
      WHERE id = ${id};  
    `;
  }

  async analyzeTrends(industry?: string, minRating: number = 3.0) {
    try {
      const result = (await this.prismaService.$queryRaw`
        SELECT * FROM dbo.AnalyzeRecruitmentTrends(
          ${industry || null},
          ${minRating}
        )
      `) as any[];

      return result.map((item) => ({
        industry: item.industry,
        companyName: item.CompanyName,
        postId: Number(item.PostId), // Convert BigInt to Number
        jobTitle: item.JobTitle,
        salary: item.salary,
        experience: item.experience,
        level: item.level,
        totalApplications: Number(item.TotalApplications), // Convert BigInt to Number
        averageRating: Number(item.AverageRating.toFixed(2)),
        industryRank: Number(item.IndustryRank), // Convert BigInt to Number
        competitionLevel: item.CompetitionLevel,
        attractivenessLevel: item.AttractivenessLevel,
      }));
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }

  async getRecruitmentStatsByCompany(
    minRating?: number,
    minApplications?: number,
    industry?: string,
  ) {
    try {
      const result = (await this.prismaService.$queryRaw`
        EXEC [dbo].[sp_GetRecruitmentStatsByCompany]
          @minRating = ${minRating || null},
          @minApplications = ${minApplications || null},
          @industry = ${industry || null}
      `) as any[];

      return result.map((item) => ({
        companyName: item.CompanyName,
        industry: item.industry,
        totalApplications: Number(item.TotalApplications),
        averageRating: Number(item.AverageRating.toFixed(2)),
        totalPosts: Number(item.TotalPosts),
      }));
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }
}
