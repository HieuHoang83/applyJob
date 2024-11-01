import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createExperienceDto: CreateExperienceDto) {
    return await this.prismaService.experience.create({
      data: createExperienceDto,
    });
  }

  async findAll() {
    return await this.prismaService.experience.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.experience.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return await this.prismaService.experience.update({
      where: {
        id,
      },
      data: updateExperienceDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.experience.delete({
      where: {
        id,
      },
    });
  }
}
