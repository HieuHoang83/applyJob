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

  update(id: number, updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    return `This action updates a #${id} recruitmentPost`;
  }

  async remove(id: number) {
    await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPostPosition WHERE recruitmentPostId = ${id}`;
    const deletedPost = await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPost WHERE id = ${id} RETURNING * `;
  }
}
