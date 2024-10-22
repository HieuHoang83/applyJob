import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.prismaService.company.create({
      data: {
        ...createCompanyDto
      }
    
     });
  }

  findAll() {
    return this.prismaService.company.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.company.findFirst({ where: {
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
