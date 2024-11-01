import { Injectable } from '@nestjs/common';
import {
  CreateEmployee,
  CreateEmployerDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { IUser } from 'src/interface/users.interface';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getHashedPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  };

  async findUserById(id: number) {
    // const res = await this.prismaService.user.findFirst({
    //   where: {
    //     id,
    //   },
    //   // not return password
    //   select: {
    //     id: true,
    //     email: true,
    //     name: true
    //   },
    // });
    // return res;
  }

  async createUser(createUserDto: CreateUserDto) {
    // const hashedMyPassword = this.getHashedPassword(createUserDto.password);
    // delete createUserDto.password;

    // let user = await this.prismaService.user.create({
    //   data: {
    //     ...createUserDto,
    //     password: hashedMyPassword,
    //   },
    // });
    // delete user.password;
    // return user;
  }

  async createEmployer(createEmployerDto: CreateEmployerDto, user: IUser) {
    // const existEmployer = await this.prismaService.employer.findFirst({
    //   where: {
    //     userId: user.id,
    //   },
    // });
    // if (existEmployer) {
    //   throw new HttpException('Employer already exists', HttpStatus.BAD_REQUEST);
    // }
    // await this.prismaService.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     role: 'EMPLOYER',
    //   },
    // })
    // const employer = await this.prismaService.employer.create({
    //   data: {
    //     ...createEmployerDto,
    //     userId: user.id,
    //   },
    // });
    // return employer;
  }

  async createEmployee(createEmployee: CreateEmployee, user: IUser) {
    // const existEmployee = await this.prismaService.employee.findFirst({
    //   where: {
    //     userId: user.id,
    //   },
    // });
    // if (existEmployee) {
    //   throw new HttpException('Employee already exists', HttpStatus.BAD_REQUEST);
    // }
    // await this.prismaService.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     role: 'EMPLOYEE',
    //   },
    // })
    // const employee = await this.prismaService.employee.create({
    //   data: {
    //     ...createEmployee,
    //     userId: user.id,
    //   },
    // });
    // return employee;
  }
  
  async register(registerDto: RegisterDto) {
    // const { password } = registerDto;
    // registerDto.password = this.getHashedPassword(password);
    // let user = await this.prismaService.user.create({
    //   data: {
    //     ...registerDto,
    //   },
    // });
    // delete user.password;
    // return user;
  }

  async findAll(info: PaginateInfo) {
    // const {
    //   offset,
    //   defaultLimit,
    //   sort,
    //   projection,
    //   population,
    //   filter,
    //   currentPage,
    // } = info;

    // // Get total items count
    // const totalItems = await this.prismaService.user.count({
    //   where: filter,
    // });
    // const totalPages = Math.ceil(totalItems / defaultLimit);

    // // Retrieve data with Prisma
    // const data = await this.prismaService.user.findMany({
    //   where: filter,
    //   skip: offset,
    //   take: defaultLimit,
    //   // orderBy: sort,
    //   // select: projection,
    //   // include: population,
    // });

    // return {
    //   meta: {
    //     totalUsers: totalItems,
    //     userCount: data.length,
    //     usersPerPage: defaultLimit,
    //     totalPages,
    //     currentPage,
    //   },
    //   result: data,
    // };
  }

  async findOne(id: number) {
    // const res = await this.findUserById(id);
    // if (!res) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    // return res;
  }

  async findOneByEmail(email: string) {
    // return await this.prismaService.user.findFirst({
    //   where: {
    //     email,
    //   },
    //   // populate role from roleId
    // });
  }

  isValidPasword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // const res = await this.findUserById(id);
    // if (!res) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    // return this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     ...updateUserDto,
    //   },
    // });
  }

  async remove(id: number) {
    // const res = await this.findUserById(id);
    // if (!res) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }
    // return await this.prismaService.user.delete({
    //   where: {
    //     id,
    //   },
    // });
  }

  async updateUserToken(id: number, refreshToken: string) {
    // return await this.prismaService.user.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     refreshToken,
    //   },
    // });
  }

  async findOneByRefreshToken(refreshToken: string) {
    // return await this.prismaService.user.findFirst({
    //   where: {
    //     refreshToken,
    //   },
    // });
  }
}
