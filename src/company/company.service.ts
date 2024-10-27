import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class CompanyService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.prismaService.company.create({
      data: {
        ...createCompanyDto,
      },
    });
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
    const totalItems = await this.prismaService.company.count({
      where: filter,
    });
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Retrieve data with Prisma
    const data = await this.prismaService.company.findMany({
      where: filter,
      skip: offset,
      take: defaultLimit,
      // orderBy: sort,
      // select: projection,
      // include: population,
    });

    return {
      meta: {
        totalCompanies: totalItems,
        companyCount: data.length,
        companiesPerPage: defaultLimit,
        totalPages,
        currentPage,
      },
      result: data,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.company.findFirst({ where: {
      id
    },});
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException("Bài Đăng k tìm thấy", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.company.update({
      where: {
        id
      },
      data: {
        ...updateCompanyDto
      }
    })
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException("Bài Đăng k tìm thấy", HttpStatus.NOT_FOUND);
    }
    return this.prismaService.company.delete({
      where: {
        id
      }
    })
  }
}
