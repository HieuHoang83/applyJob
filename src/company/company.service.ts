import { Injectable } from '@nestjs/common';
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
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
