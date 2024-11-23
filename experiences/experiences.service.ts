import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createExperienceDto: CreateExperienceDto) {
    const result = await this.prismaService.$queryRaw`
      INSERT INTO [dbo].[Experience] (
        [employeeId],
        [company],
        [position],
        [description],
        [url],
        [image],
        [startDate],
        [endDate]
      )
      VALUES (
        ${createExperienceDto.employeeId},
        ${createExperienceDto.company},
        ${createExperienceDto.position},
        ${createExperienceDto.description},
        ${createExperienceDto.url},
        ${createExperienceDto.image},
        ${createExperienceDto.startDate},
        ${createExperienceDto.endDate}
      );

      SELECT * FROM [dbo].[Experience]
      WHERE [id] = SCOPE_IDENTITY();
    `;
    return result[0];
  }

  async findAll() {
    return await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Experience];
    `;
  }

  async findOne(id: number) {
    const experience = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Experience]
      WHERE [id] = ${id};
    `;

    if (!experience[0]) {
      throw new NotFoundException('Experience not found');
    }

    return experience[0];
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.findOne(id);
    
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[Experience]
      SET
        [company] = COALESCE(${updateExperienceDto.company}, [company]),
        [position] = COALESCE(${updateExperienceDto.position}, [position]),
        [description] = COALESCE(${updateExperienceDto.description}, [description]),
        [url] = COALESCE(${updateExperienceDto.url}, [url]),
        [image] = COALESCE(${updateExperienceDto.image}, [image]),
        [startDate] = COALESCE(${updateExperienceDto.startDate}, [startDate]),
        [endDate] = COALESCE(${updateExperienceDto.endDate}, [endDate])
      WHERE [id] = ${id} AND [employeeId] = ${experience.employeeId};

      SELECT * FROM [dbo].[Experience]
      WHERE [id] = ${id};
    `;
    return result[0];
  }

  async remove(id: number) {
    const experience = await this.findOne(id);
    
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[ExperienceOnRecord]
      WHERE [experienceId] = ${id};

      DELETE FROM [dbo].[Experience]
      WHERE [id] = ${id} AND [employeeId] = ${experience.employeeId};
    `;

    return experience;
  }
}
