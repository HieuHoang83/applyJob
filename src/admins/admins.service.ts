import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'prisma/prisma.service';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AdminsService {
  constructor(private prismaService: PrismaService) {}
  hashpassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  CheckUserpassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async create(createAdminDto: CreateAdminDto) {
    try {
      await this.prismaService
        .$queryRaw`INSERT INTO Admin (email, name,password)
    VALUES (${createAdminDto.email}, ${createAdminDto.name},${this.hashpassword(
        createAdminDto.password,
      )})`;
      return this.findOneByEmail(createAdminDto.email);
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }

  async findAll() {
    try {
      let result = await this.prismaService.$queryRaw`SELECT * FROM Admin `;

      return result;
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }
  async findOneById(id: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Admin WHERE id =${id} `;
      if (result[0] === undefined) {
        throw new BadRequestException('not found');
      }
      return result[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findOneByEmail(email: string) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Admin WHERE email =${email} `;

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async login(email: string, password: string) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM Admin WHERE email =${email} `;
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

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      let result = await this.findOneById(id);
      let request = {
        email: updateAdminDto.email || result?.email,
        name: updateAdminDto.name || result?.name,
        password: updateAdminDto.password || result?.password,
      };

      await this.prismaService
        .$queryRaw`UPDATE Admin SET email = ${request.email}, name = ${request.name},password=${request.password} WHERE id = ${id}`;
      return this.findOneById(id);
    } catch (error) {
      throw new BadRequestException(error.meta.message);
    }
  }

  async remove(id: number) {
    this.findOneById(id);
    return await this.prismaService
      .$queryRaw`DELETE FROM Admin WHERE id = ${id}`;
  }
}
