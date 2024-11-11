import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}
  async create() {
    try {
      await this.prismaService
        .$queryRaw`INSERT INTO Admin (email, name, gender, age, avatar, password, verificationCode)
    VALUES ('example7@example.com', 'John Doe1', 'male', 25, 'avatar_url', 'hashed_password', 'verification_code')`;
      return this.findOneByEmail('example3@example.com');
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }

  findAll() {
    return `This action returns all employees`;
  }

  async findOneById(id: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Admin WHERE id =${id}`;

      console.log(result);
      return result[0];
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }
  async findOneByEmail(email: string) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Admin WHERE email =${email}`;

      console.log(result);
      return result[0];
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
