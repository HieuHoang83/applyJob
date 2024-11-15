import { Injectable } from '@nestjs/common';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';
import { UpdateJobDescriptionDto } from './dto/update-job-description.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class JobDescriptionService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateJobDescriptionDto) {
    const jobDescription = await this.prismaService.$queryRaw`
      INSERT INTO JobDescription (location, level, experience, salary, quantity, employmentType, gender, recruitmentPostId)
      VALUES (${data.location}, ${data.level || 'staff'}, ${data.experience}, ${
      data.salary
    }, ${data.quantity}, ${data.employmentType}, ${
      data.gender || 'Not required'
    }, ${data.recruitmentPostId})
    `;

    return jobDescription;
  }
  async findAll() {
    const jobDescriptions = await this.prismaService.$queryRaw`
      SELECT * FROM JobDescription;
    `;
    return jobDescriptions;
  }

  async findOne(id: number) {
    const jobDescription = await this.prismaService.$queryRaw`
      SELECT * FROM JobDescription WHERE id = ${id};
    `;
    return jobDescription;
  }

  async update(id: number, data: Partial<CreateJobDescriptionDto>) {
    let query = `UPDATE JobDescription SET `;
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (data.location !== undefined) {
      fieldsToUpdate.push(`location = ?`);
      values.push(data.location);
    }
    if (data.level !== undefined) {
      fieldsToUpdate.push(`level = ?`);
      values.push(data.level);
    }
    if (data.experience !== undefined) {
      fieldsToUpdate.push(`experience = ?`);
      values.push(data.experience);
    }
    if (data.salary !== undefined) {
      fieldsToUpdate.push(`salary = ?`);
      values.push(data.salary);
    }
    if (data.quantity !== undefined) {
      fieldsToUpdate.push(`quantity = ?`);
      values.push(data.quantity);
    }
    if (data.employmentType !== undefined) {
      fieldsToUpdate.push(`employmentType = ?`);
      values.push(data.employmentType);
    }
    if (data.gender !== undefined) {
      fieldsToUpdate.push(`gender = ?`);
      values.push(data.gender);
    }

    query += fieldsToUpdate.join(', ');
    query += ` WHERE id = ?`;
    values.push(id);

    await this.prismaService.$queryRawUnsafe(query, ...values);

    return this.findOne(id);
  }

  async remove(id: number) {
    const jobDescription = await this.findOne(id);
    if (!jobDescription) {
      throw new Error(`JobDescription with id ${id} not found`);
    }

    await this.prismaService.$queryRaw`
      DELETE FROM JobDescription WHERE id = ${id};
    `;

    return jobDescription;
  }
}
