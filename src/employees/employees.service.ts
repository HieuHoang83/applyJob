import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateEmployeeDto,
  GetEmployeeEducationDto,
} from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEmployeeEducation(params: GetEmployeeEducationDto) {
    try {
      const result = await this.prismaService.$queryRaw`
        EXEC dbo.sp_GetEmployeeEducation 
          @minAge = ${params.minAge || null},
          @gender = ${params.gender || null},
          @schoolName = ${params.schoolName || null}
      `;

      return result;
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }
  async getApplicationStats(id: number) {
    try {
      const result = await this.prismaService.$queryRaw`
        SELECT * FROM dbo.CalculateApplicationSuccess(${id})
      `;

      const stats = result[0];
      if (!stats) {
        throw new NotFoundException(
          'Employee not found or has no applications',
        );
      }

      return {
        id: stats.id,
        name: stats.name,
        totalApplications: stats.TotalApplications,
        successfulApplications: stats.SuccessfulApplications,
        successRate: stats.SuccessRate,
        performance: stats.Performance,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }
  async findEmail(email: string) {
    const result = await this.prismaService.$queryRaw`
      SELECT id, email,name FROM dbo.Employee WHERE email = ${email} 
    `;
    return result;
  }
  hashpassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      // Hash password before storing
      const hashedPassword = this.hashpassword(createEmployeeDto.password);

      const result = await this.prismaService.$executeRaw`
        EXEC dbo.sp_CreateEmployee 
          @phone = ${createEmployeeDto.phone},
          @address = ${createEmployeeDto.address},
          @email = ${createEmployeeDto.email},
          @name = ${createEmployeeDto.name},
          @gender = ${createEmployeeDto.gender},
          @age = ${createEmployeeDto.age},
          @avatar = ${createEmployeeDto.avatar},
          @password = ${hashedPassword}
      `;

      return this.findEmail(createEmployeeDto.email);
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      if (
        errorMessage.includes(
          'Hoạt động đáng ngờ: Nhiều tài khoản được tạo từ cùng domain trong 1h',
        )
      ) {
        throw new BadRequestException(
          'Nhiều tài khoản được tạo từ cùng domain trong 1h',
        );
      }
      throw new BadRequestException(errorMessage);
    }
  }

  async findAll() {
    const result = await this.prismaService.$queryRaw`
      SELECT 
        id,
        phone,
        address,
        email,
        name,
        gender,
        age,
        avatar
      FROM dbo.Employee
      WHERE isBanned = 0
    `;

    return result;
  }

  async findOne(id: number) {
    const result = await this.prismaService.$queryRaw`
      SELECT 
        id,
        phone,
        address,
        email,
        name,
        gender,
        age,
        avatar
      FROM dbo.Employee
      WHERE id = ${id} AND isBanned = 0
    `;

    const employee = result[0];
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      await this.prismaService.$executeRaw`
        EXEC dbo.sp_UpdateEmployee 
          @id = ${id},
          @phone = ${updateEmployeeDto.phone},
          @address = ${updateEmployeeDto.address},
          @email = ${updateEmployeeDto.email},
          @name = ${updateEmployeeDto.name},
          @gender = ${updateEmployeeDto.gender},
          @age = ${updateEmployeeDto.age},
          @avatar = ${updateEmployeeDto.avatar}
      `;

      return this.findOne(id);
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.$executeRaw`
        EXEC dbo.sp_DeleteEmployee @id = ${id}
      `;
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      const errorMessage =
        error.message.match(/Message: `([^`]+)`/)?.[1] || error.message;
      throw new BadRequestException(errorMessage);
    }
  }
  CheckUserpassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async login(email: string, password: string) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Employee WHERE email =${email} `;
      if (result[0] === undefined) {
        throw new BadRequestException('not found');
      }
      if (!this.CheckUserpassword(password, result[0].password)) {
        throw new BadRequestException('wrong password');
      }
      return result[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
