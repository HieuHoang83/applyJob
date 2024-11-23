import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EducationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEducationDto: CreateEducationDto) {
    const result = await this.prismaService.$queryRaw`
      INSERT INTO [dbo].[Education] (
        [school],
        [major],
        [description],
        [startDate],
        [endDate],
        [employeeId]
      )
      VALUES (
        ${createEducationDto.school},
        ${createEducationDto.major},
        ${createEducationDto.description},
        ${createEducationDto.startDate},
        ${createEducationDto.endDate},
        ${createEducationDto.employeeId}
      );

      SELECT * FROM [dbo].[Education]
      WHERE [id] = SCOPE_IDENTITY();
    `;
    return result[0];
  }

  async findAll() {
    return await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Education];
    `;
  }

  async findOne(id: number) {
    const education = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Education]
      WHERE [id] = ${id};
    `;

    if (!education[0]) {
      throw new NotFoundException('Education not found');
    }

    return education[0];
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const education = await this.findOne(id);
    
    if (!education) {
      throw new NotFoundException('Education not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[Education]
      SET
        [school] = COALESCE(${updateEducationDto.school}, [school]),
        [major] = COALESCE(${updateEducationDto.major}, [major]),
        [description] = COALESCE(${updateEducationDto.description}, [description]),
        [startDate] = COALESCE(${updateEducationDto.startDate}, [startDate]),
        [endDate] = COALESCE(${updateEducationDto.endDate}, [endDate])
      WHERE [id] = ${id} AND [employeeId] = ${education.employeeId};

      SELECT * FROM [dbo].[Education]
      WHERE [id] = ${id};
    `;
    return result[0];
  }

  async remove(id: number) {
    const education = await this.findOne(id);
    
    if (!education) {
      throw new NotFoundException('Education not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[EducationOnRecord]
      WHERE [educationId] = ${id};

      DELETE FROM [dbo].[Education]
      WHERE [id] = ${id} AND [employeeId] = ${education.employeeId};
    `;

    return education;
  }
}
