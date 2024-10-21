import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        ... createRecruitmentPostDto,
       
     },
    });
  }

  findAll() {
    return this.prismaService.jobPost.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.jobPost.findFirst({ where: {
      id
    },});
  }

 async update(id: number, updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException("Bài Đăng k tìm thấy", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.user.update({
      where: {
        id
      },
      data: {
        ...updateRecruitmentPostDto
      }
    })
  }

 async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException("Bài Đăng k tìm thấy", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.user.delete({
      where: {
        id
      }
    })
  }
}
