import { BadRequestException, Injectable } from '@nestjs/common';
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

    // Kiểm tra và thêm các trường cần cập nhật vào truy vấn
    if (data.location) {
      fieldsToUpdate.push(`location = N'${data.location.replace(/'/g, "''")}'`);
    }
    if (data.level) {
      fieldsToUpdate.push(`level = N'${data.level.replace(/'/g, "''")}'`);
    }
    if (data.experience) {
      fieldsToUpdate.push(
        `experience = N'${data.experience.replace(/'/g, "''")}'`,
      );
    }
    if (data.salary !== null) {
      // Chỉ cập nhật nếu salary có giá trị (không phải null)
      fieldsToUpdate.push(`salary = ${data.salary}`);
    }
    if (data.quantity !== undefined) {
      // Kiểm tra quantity có phải undefined không
      fieldsToUpdate.push(`quantity = ${data.quantity}`);
    }
    if (data.employmentType) {
      fieldsToUpdate.push(
        `employmentType = N'${data.employmentType.replace(/'/g, "''")}'`,
      );
    }
    if (data.gender) {
      fieldsToUpdate.push(`gender = N'${data.gender.replace(/'/g, "''")}'`);
    }

    // Nếu không có trường nào để cập nhật, trả về lỗi
    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('Không có trường nào để cập nhật.');
    }

    // Hoàn thiện truy vấn SQL
    query += fieldsToUpdate.join(', ');
    query += ` WHERE id = ${id}`;

    // Log truy vấn để debug nếu cần
    console.log('Query:', query);

    // Chạy truy vấn với Prisma
    try {
      await this.prismaService.$executeRawUnsafe(query);
      return this.findOne(id); // Trả về dữ liệu đã cập nhật
    } catch (error) {
      throw new BadRequestException(
        `Không thể cập nhật JobDescription với id ${id}: ${error.message}`,
      );
    }
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
