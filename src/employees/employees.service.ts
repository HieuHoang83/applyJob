import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) {}
  create() {
    //const result = await prismaService.$queryRaw "INSERT INTO tableName (email, name, gender, age, avatar, password, verificationCode, superAdminId) VALUES  ('example@example.com', 'John Doe', 'male', 25, 'avatar_url', 'hashed_password', 'verification_code', 1)";
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
