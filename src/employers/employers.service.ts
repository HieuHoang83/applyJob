import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CompanyService } from 'src/company/company.service';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class EmployersService {
  constructor(
    private prismaService: PrismaService,
    private companyService: CompanyService,
  ) {}
  hashpassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(data: CreateEmployerDto) {
    const { email, name, password, department, position, companyId } = data;

    try {
      let companyexist = await this.companyService.checkCompanyById(companyId);
      if (!companyexist) {
        throw new BadRequestException('Company not found');
      }
      const result = await this.prismaService.$queryRaw`
          INSERT INTO Employer (email, name, password, department, position, companyId, isBanned)
          OUTPUT inserted.id, inserted.name
          VALUES (${email}, ${name}, ${this.hashpassword(
        password,
      )}, ${department}, ${position}, ${companyId}, 0)  ;
         ;
        `;

      return result;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error inserting Employer:');
    }
  }

  async findAll() {
    try {
      const result = await this.prismaService.$queryRaw`SELECT * FROM Employer`;
      return result;
    } catch (error) {
      throw new BadRequestException('Error fetching all employers:');
    }
  }

  async findByIdCompany(companyId: string) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT * FROM Employer WHERE companyId = ${companyId}`;
      if (result[0] === undefined) {
        throw new BadRequestException('Employer not found');
      }

      return result[0];
    } catch (error) {
      throw new BadRequestException('Error fetching all employers:');
    }
  }
  async findByCompanyName(companyName: string) {
    let companyId = await this.companyService.findOneByName(companyName);

    try {
      const result = await this.prismaService.$queryRaw`
        SELECT id FROM Employer WHERE companyId = ${companyId.id}`;
      if (result[0] === undefined) {
        throw new BadRequestException('Employer not found');
      }

      return result;
    } catch (error) {
      throw new BadRequestException('Error fetching all employers:');
    }
  }
  // Lấy một Employer theo ID
  async findOne(id: number) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT * FROM Employer WHERE id = ${id}`;
      if (result[0] === undefined) {
        throw new BadRequestException('Employer not found');
      }

      return result[0];
    } catch (error) {
      throw new BadRequestException('Error fetching all employers:');
    }
  }
  async findOneByEmail(email: string) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT * FROM Employer WHERE email = ${email}`;
      return result || null;
    } catch (error) {
      throw error;
    }
  }
  // Cập nhật một Employer
  async update(id: number, updateEmployerDto: UpdateEmployerDto) {
    try {
      // Xây dựng câu truy vấn động dựa trên các trường được cung cấp trong `updateEmployerDto`
      const updates = [];
      if (updateEmployerDto.name)
        updates.push(`name = ${updateEmployerDto.name}`);
      if (updateEmployerDto.gender)
        updates.push(`gender = ${updateEmployerDto.gender}`);
      if (updateEmployerDto.age !== undefined)
        updates.push(`age = ${updateEmployerDto.age}`);
      if (updateEmployerDto.avatar)
        updates.push(`avatar = ${updateEmployerDto.avatar}`);
      if (updateEmployerDto.provider)
        updates.push(`provider = ${updateEmployerDto.provider}`);
      if (updateEmployerDto.emailVerified !== undefined)
        updates.push(`emailVerified = ${updateEmployerDto.emailVerified}`);
      if (updateEmployerDto.hiringDate)
        updates.push(`hiringDate = ${updateEmployerDto.hiringDate}`);
      if (updateEmployerDto.department)
        updates.push(`department = ${updateEmployerDto.department}`);
      if (updateEmployerDto.position)
        updates.push(`position = ${updateEmployerDto.position}`);
      if (updateEmployerDto.companyId !== undefined)
        updates.push(`companyId = ${updateEmployerDto.companyId}`);
      if (updateEmployerDto.isBanned !== undefined)
        updates.push(`isBanned = ${updateEmployerDto.isBanned}`);

      if (updates.length === 0) {
        throw new Error('No fields to update');
      }

      const updateQuery = updates.join(', ');

      const result = await this.prismaService.$queryRawUnsafe(`
        UPDATE Employer
        SET ${updateQuery}
        WHERE id = ${id}
        RETURNING *;
      `);

      return result;
    } catch (error) {
      console.error(`Error updating employer with id ${id}:`, error);
      throw error;
    }
  }
  // Xóa một Employer
  async remove(id: number) {
    try {
      const result = await this.prismaService.$queryRaw`
        DELETE FROM Employer WHERE id = ${id} RETURNING *`;
      return result;
    } catch (error) {
      console.error(`Error deleting employer with id ${id}:`, error);
      throw error;
    }
  }
  CheckUserpassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async login(email: string, password: string) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Employer WHERE email =${email} `;
      console.log(result[0]);
      if (result[0] === undefined) {
        throw new BadRequestException('not found');
      }
      // if (!this.CheckUserpassword(password, result[0].password)) {
      //   throw new BadRequestException('Sai password');
      // }

      return result[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
