import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class RecruitmentPostService {
  constructor(private prismaService: PrismaService) {}
  create(createRecruitmentPostDto: CreateRecruitmentPostDto, user: IUser) {
    return this.prismaService.jobPost.create({
      data: {
        ...createRecruitmentPostDto,
        employerId: user.id,
      }
    });
  }

  async findAll(
    info: PaginateInfo
  ) {
    const {
      offset,
      defaultLimit,
      sort,
      projection,
      population,
      filter,
      currentPage,
    } = info;

    // Get total items count
    const totalItems = await this.prismaService.jobPost.count({
      where: filter,
    });
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Retrieve data with Prisma
    const data = await this.prismaService.jobPost.findMany({
      where: filter,
      skip: offset,
      take: defaultLimit,
      // orderBy: sort,
      // select: projection,
      // include: population,
      include: {
        employer: {
          include: {
            company:{
              select: {
                logo: true,
                name: true
              }
            }
          }
        }
      }
    });

    return {
      meta: {
        totalJobPosts: totalItems,
        jobPostCount: data.length,
        jobPostsPerPage: defaultLimit,
        totalPages,
        currentPage,
      },
      result: data,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.jobPost.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException('Bài Đăng k tìm thấy', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateRecruitmentPostDto,
      },
    });
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException('Bài Đăng k tìm thấy', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
