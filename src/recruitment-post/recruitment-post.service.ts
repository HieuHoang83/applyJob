import { Injectable } from '@nestjs/common';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RecruitmentPostService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  create(createRecruitmentPostDto: CreateRecruitmentPostDto) {
    return this.prismaService.jobPost.create({
     data: {
        ... createRecruitmentPostDto
     },
    });
  }

  findAll() {
    return `This action returns all recruitmentPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitmentPost`;
  }

  update(id: number, updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    return `This action updates a #${id} recruitmentPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitmentPost`;
  }
}
