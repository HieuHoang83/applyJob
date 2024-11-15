import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'prisma/prisma.service';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      // Chèn dữ liệu vào bảng Company
      await this.prismaService.$queryRaw`
        INSERT INTO Company (name, description, url, industry, size, address, logo) 
        VALUES (
          ${createCompanyDto.name}, 
          ${createCompanyDto.description}, 
          ${createCompanyDto.url}, 
          ${createCompanyDto.industry}, 
          ${createCompanyDto.size}, 
          ${createCompanyDto.address}, 
          ${createCompanyDto.logoId ?? null}
        );
      `;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        `Failed to create company: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return await this.prismaService.$queryRaw`
        SELECT * FROM Company;
      `;
    } catch (error) {
      throw new BadRequestException(
        `Failed to retrieve companies: ${error.message}`,
      );
    }
  }
  async findOne(id: number) {
    try {
      const company = await this.prismaService.$queryRaw`
        SELECT * FROM Company WHERE id = ${id};
      `;
      return company[0] || null; // Vì query trả về mảng, nên lấy phần tử đầu tiên
    } catch (error) {
      throw new BadRequestException(
        `Failed to find company with id ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const fieldsToUpdate = [];

      if (updateCompanyDto.name) {
        fieldsToUpdate.push(`name = '${updateCompanyDto.name}'`);
      }
      if (updateCompanyDto.description) {
        fieldsToUpdate.push(`description = '${updateCompanyDto.description}'`);
      }
      if (updateCompanyDto.url) {
        fieldsToUpdate.push(`url = '${updateCompanyDto.url}'`);
      }
      if (updateCompanyDto.industry) {
        fieldsToUpdate.push(`industry = '${updateCompanyDto.industry}'`);
      }
      if (updateCompanyDto.size) {
        fieldsToUpdate.push(`size = '${updateCompanyDto.size}'`);
      }
      if (updateCompanyDto.address) {
        fieldsToUpdate.push(`address = '${updateCompanyDto.address}'`);
      }
      if (updateCompanyDto.logoId) {
        fieldsToUpdate.push(`logo = '${updateCompanyDto.logoId}'`);
      }

      const updateQuery = `
        UPDATE Company
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ${id};
      `;

      await this.prismaService.$executeRawUnsafe(updateQuery);
      return { message: `Company with id ${id} updated successfully.` };
    } catch (error) {
      throw new BadRequestException(
        `Failed to update company with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    const res = await this.findOne(id);
    if (!res) {
      throw new HttpException('Bài Đăng k tìm thấy', HttpStatus.NOT_FOUND);
    }
    return this.prismaService.company.delete({
      where: {
        id,
      },
    });
  }
  async checkListCompanyById(arrayId: number[]) {
    const result: number[] = await this.prismaService
      .$queryRaw`SELECT 1 FROM Company WHERE id IN (${arrayId.join(',')})`;
    return result.length === arrayId.length;
  }
  async checkCompanyById(id: number) {
    if ((await this.findOne(id)) == null) {
      return false;
    }
    return true;
  }
}
