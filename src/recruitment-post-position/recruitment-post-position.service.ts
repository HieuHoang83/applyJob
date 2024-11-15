import { Injectable } from '@nestjs/common';
import { CreateRecruitmentPostPositionDto } from './dto/create-recruitment-post-position.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RecruitmentPostPositionService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateRecruitmentPostPositionDto) {
    const { recruitmentPostId, positionId } = data;

    const result = await this.prismaService.$queryRaw`
      INSERT INTO RecruitmentPostPosition (recruitmentPostId, positionId)
      VALUES (${recruitmentPostId}, ${positionId})
      RETURNING *;
    `;

    return result; // Trả về bản ghi mới được tạo
  }

  async findAll() {
    const result = await this.prismaService
      .$queryRaw`SELECT * FROM RecruitmentPostPosition;`;

    return result; // Trả về tất cả mối quan hệ
  }

  async findPositionsByRecruitmentPost(recruitmentPostId: number) {
    const query = `
      SELECT * FROM RecruitmentPostPosition
      WHERE recruitmentPostId = ${recruitmentPostId};
    `;

    const result = await this.prismaService.$queryRaw`
      SELECT * FROM RecruitmentPostPosition
      WHERE recruitmentPostId = ${recruitmentPostId};
    `;

    return result; // Trả về các vị trí liên kết với bài đăng tuyển dụng
  }

  async findRecruitmentPostsByPosition(positionId: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT * FROM RecruitmentPostPosition
      WHERE positionId = ${positionId};
    `;

    return result; // Trả về các bài đăng tuyển dụng liên kết với vị trí
  }
  async findByIds(recruitmentPostId: number, positionId: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT * 
      FROM RecruitmentPostPosition 
      WHERE recruitmentPostId = ${recruitmentPostId} AND positionId = ${positionId};
    `;
    return result;
  }
  async remove(recruitmentPostId: number, positionId: number) {
    const query = `
      DELETE FROM RecruitmentPostPosition
      WHERE recruitmentPostId = ${recruitmentPostId} AND positionId = ${positionId}
      RETURNING *;
    `;

    const result = await this.prismaService.$queryRaw`
    DELETE FROM RecruitmentPostPosition
    WHERE recruitmentPostId = ${recruitmentPostId} AND positionId = ${positionId}
    RETURNING *;
  `;

    return result; // Trả về bản ghi đã bị xóa
  }
}
