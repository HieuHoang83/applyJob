import { Injectable } from '@nestjs/common';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RecruitmentPostService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateRecruitmentPostDto) {
    const recruitmentPost = await this.prismaService.$queryRaw`
      INSERT INTO RecruitmentPost (title, description, employerId, datePosted, deadline,createdAt, updatedAt)
      VALUES (${data.title}, ${data.description}, ${data.employerId}, ${
      data.datePosted
    }, ${data.deadline},${Date.now()},${Date.now()})
      RETURNING *;
    `;

    // if (data.positionIds && data.positionIds.length > 0) {
    //   for (const positionId of data.positionIds) {
    //     await this.prismaService.$queryRaw`
    //       INSERT INTO RecruitmentPostPosition (recruitmentPostId, positionId)
    //       VALUES (${recruitmentPost.id}, ${positionId});
    //     `;
    //   }
    // }

    return recruitmentPost;
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
    let query = `UPDATE RecruitmentPost SET `;
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    // Dynamically add fields based on presence in the DTO
    if (data.title !== undefined) {
      fieldsToUpdate.push(`title = ?`);
      values.push(data.title);
    }

    if (data.description !== undefined) {
      fieldsToUpdate.push(`description = ?`);
      values.push(data.description);
    }

    if (data.deadline !== undefined) {
      fieldsToUpdate.push(`deadline = ?`);
      values.push(data.deadline);
    }

    // Construct the final query by joining dynamic fields
    query += fieldsToUpdate.join(', ');
    query += ` WHERE id = ?`;
    values.push(id);

    // Execute the raw query with the dynamic values
    await this.prismaService.$queryRawUnsafe(query, ...values);

    // Return the updated recruitment post
    return this.prismaService.recruitmentPost.findUnique({ where: { id } });
  }

  async remove(id: number) {
    await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPostPosition WHERE recruitmentPostId = ${id}`;
    const deletedPost = await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPost WHERE id = ${id} RETURNING * `;
  }
}
