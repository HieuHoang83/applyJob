import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EducationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEducationDto: CreateEducationDto) {
    return await this.prismaService.education.create({
      data: createEducationDto,
    });
  }

  async findAll() {
    return await this.prismaService.education.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.education.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    return await this.prismaService.education.update({
      where: {
        id,
      },
      data: updateEducationDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.education.delete({
      where: {
        id,
      },
    });
  }
}
