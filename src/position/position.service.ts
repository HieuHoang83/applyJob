import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PositionService {
  constructor(private prismaService: PrismaService) {}
  async create(createPositionDto: CreatePositionDto) {
    const { name } = createPositionDto;

    const query = `
      INSERT INTO Position (name) 
      VALUES (?)`;

    const result = await this.prismaService
      .$queryRaw`INSERT INTO Position (name) VALUES (${name})`;

    return result;
  }
  async findAll() {
    const positions = await this.prismaService
      .$queryRaw`SELECT * FROM Position`;

    return positions;
  }

  async findOne(id: number) {
    const position = await this.prismaService
      .$queryRaw`SELECT * FROM Position WHERE id = ${id}`;

    return position;
  }

  async update(id: number, name: string) {
    const result = await this.prismaService
      .$queryRaw`UPDATE Position SET name = ${name} WHERE id = ${id}`;
    return result;
  }

  async remove(id: number) {
    const result = await this.prismaService
      .$queryRaw`DELETE FROM Position WHERE id = ${id}`;
    return result;
  }
}
