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
      VALUES (${data.title}, ${data.description}, ${data.employerId}, ${data.datePosted}, ${data.deadline});
    `;

    return data;
  }

  async findAll() {
    const recruitmentPost = await this.prismaService.$queryRaw`
    SELECT * FROM RecruitmentPost ;
  `;
    return recruitmentPost;
  }

  async findOne(id: number) {
    const recruitmentPost = await this.prismaService.$queryRaw`
    SELECT * FROM RecruitmentPost WHERE id = ${id};
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
    await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPostPosition WHERE recruitmentPostId = ${id}`;
    const deletedPost = await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPost WHERE id = ${id} RETURNING * `;
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
