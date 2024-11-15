import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateAdminDto } from 'src/admins/dto/update-admin.dto';

@Injectable()
export class DomainsService {
  constructor(private prismaService: PrismaService) {}
  async create(createDomainDto: CreateDomainDto) {
    try {
      await this.prismaService.$queryRaw` INSERT INTO Domain (name,description) 
    VALUES (${createDomainDto.name},${createDomainDto.description});`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async createMultipleDomains(createDomainDtos: CreateDomainDto[]) {
    // Xây dựng chuỗi `VALUES` từ mảng các đối tượng
    const values = createDomainDtos
      .map(
        (domain) =>
          `('${domain.name}', ${
            domain.description ? `'${domain.description}'` : 'NULL'
          })`,
      )
      .join(', ');

    // Xây dựng truy vấn SQL
    const query = `INSERT INTO Domain (name, description) VALUES ${values};`;

    try {
      // Thực thi truy vấn
      await this.prismaService.$executeRawUnsafe(query);
    } catch (error) {
      throw new BadRequestException(
        'Failed to insert domains: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      let result = await this.prismaService.$queryRaw`SELECT * FROM Domain `;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Domain WHERE id =${id} `;
      if (result[0] === undefined) {
        throw new BadRequestException('not found');
      }
      return result[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findOneById(id: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Domain WHERE id =${id} `;

      if (result[0] === undefined) {
        return null;
      }

      return result[0];
    } catch (error) {
      throw new BadRequestException('lỗi');
    }
  }
  async update(id: number, updateDomainDto: any) {
    try {
      const fieldsToUpdate = [];

      if (updateDomainDto.name) {
        fieldsToUpdate.push(`name = '${updateDomainDto.name}'`);
      }
      if (updateDomainDto.description) {
        fieldsToUpdate.push(`description = '${updateDomainDto.description}'`);
      }

      if (fieldsToUpdate.length === 0) {
        throw new BadRequestException('No fields to update');
      }

      const updateQuery = `
        UPDATE Domain
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ${id};
      `;

      await this.prismaService.$executeRawUnsafe(updateQuery);
      return { message: `Domain with id ${id} updated successfully.` };
    } catch (error) {
      throw new BadRequestException(
        `Failed to update domain with id ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    if ((await this.findOneById(id)) === null) {
      throw new BadRequestException('Domain not found');
    }
    return await this.prismaService
      .$queryRaw`DELETE FROM Domain WHERE id = ${id}`;
  }
  async checkListDomainById(arrayId: number[]) {
    const result: number[] = await this.prismaService
      .$queryRaw`SELECT 1 FROM Domain WHERE id IN (${arrayId.join(',')})`;
    return result.length === arrayId.length;
  }
  async checkDomainById(id: number) {
    if ((await this.findOneById(id)) == null) {
      return false;
    }
    return true;
  }
}
