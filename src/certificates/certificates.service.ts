import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CertificatesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCertificateDto: CreateCertificateDto) {
    return await this.prismaService.certificate.create({
      data: createCertificateDto,
    });
  }

  async findAll(paginateInfo: PaginateInfo) {
    const {
      offset,
      defaultLimit,
      sort,
      projection,
      population,
      filter,
      currentPage,
    } = paginateInfo;

    // Get total items count
    const totalItems = await this.prismaService.certificate.count({
      where: filter,
    });
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Retrieve data with Prisma
    const data = await this.prismaService.certificate.findMany({
      where: filter,
      skip: offset,
      take: defaultLimit,
      // orderBy: sort,
      // select: projection,
      // include: population,
    });

    return {
      meta: {
        totalCertificates: totalItems,
        certificateCount: data.length,
        certificatesPerPage: defaultLimit,
        totalPages,
        currentPage,
      },
      result: data,
    };
  }

  async findOne(id: number) {
    return await this.prismaService.certificate.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return await this.prismaService.certificate.update({
      where: { id },
      data: updateCertificateDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.certificate.delete({
      where: { id },
    });
  }
}
