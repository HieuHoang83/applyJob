import { Injectable } from '@nestjs/common';
import { CreateTagDto, AddTagToJobPostDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  async create(createTagDto: CreateTagDto) {
    return this.prismaService.tag.create({
      data: {
        ...createTagDto
      }
    })
  }

  async findAll() {
    return await this.prismaService.tag.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.tag.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return await this.prismaService.tag.update({
      where: {
        id
      },
      data: {
        ...updateTagDto
      }
    });
  }

  async remove(id: number) {
    return await this.prismaService.tag.delete({
      where: {
        id
      }
    });
  }

  async addTagToJobPost(addTagToJobPostDto: AddTagToJobPostDto) {
    return await this.prismaService.tagOnJobPost.create({
      data: {
        ... addTagToJobPostDto
      }
    })
  }
}
