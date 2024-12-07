import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCertificateDto: CreateCertificateDto) {
    const result = await this.prismaService.$queryRaw`
      INSERT INTO [dbo].[Certificate] (
        [name],
        [organization],
        [url],
        [image],
        [verifiedDate],
        [employeeId]
      )
      VALUES (
        ${createCertificateDto.name},
        ${createCertificateDto.organization},
        ${createCertificateDto.url},
        ${createCertificateDto.image},
        ${createCertificateDto.verifiedDate},
        ${createCertificateDto.employeeId}
      );

      SELECT * FROM [dbo].[Certificate]
      WHERE [id] = SCOPE_IDENTITY();
    `;
    return result[0];
  }

  async findAll(paginateInfo: PaginateInfo) {
    // Validate và set default values
    const {
      offset = 0,
      defaultLimit = 10,
      sort = '[id] DESC',
      filter = '',
      currentPage = 1,
    } = paginateInfo;

    // Validate sort để tránh SQL injection
    const validSortColumns = ['id', 'name', 'organization', 'verifiedDate'];
    const validSortOrders = ['ASC', 'DESC'];
    
    let safeSort = '[id] DESC';
    if (sort) {
      const [column, order] = sort.replace(/[\[\]]/g, '').split(' ');
      if (validSortColumns.includes(column) && validSortOrders.includes(order)) {
        safeSort = `[${column}] ${order}`;
      }
    }

    // Get total items với prepared statement
    const totalResult = await this.prismaService.$queryRaw`
      SELECT COUNT(*) as total
      FROM [dbo].[Certificate]
      WHERE 1=1 
      ${filter ? Prisma.sql`AND ${filter}` : Prisma.empty};
    `;
    const totalItems = Number(totalResult[0].total);
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Get data với prepared statement và pagination
    const data = await this.prismaService.$queryRaw<any[]>`
      SELECT 
        [id],
        [name],
        [organization],
        [url],
        [image],
        [verifiedDate],
        [employeeId]
      FROM [dbo].[Certificate]
      WHERE 1=1
      ${filter ? Prisma.sql`AND ${filter}` : Prisma.empty}
      ORDER BY ${Prisma.sql([safeSort])}
      OFFSET ${offset} ROWS
      FETCH NEXT ${defaultLimit} ROWS ONLY;
    `;

    return {
      meta: {
        totalCertificates: totalItems,
        certificateCount: data.length,
        certificatesPerPage: defaultLimit,
        totalPages,
        currentPage: Number(currentPage),
      },
      result: data,
    };
  }

  async findOne(id: number) {
    const certificate = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Certificate]
      WHERE [id] = ${id};
    `;

    if (!certificate[0]) {
      throw new NotFoundException('Certificate not found');
    }

    return certificate[0];
  }

  async findEmployee(id: number) {
    const certificate = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Certificate]
      WHERE [employeeId] = ${id};
    `;

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return certificate;
  }

  async update(id: number, updateCertificateDto: UpdateCertificateDto) {
    const certificate = await this.findOne(id);
    
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[Certificate]
      SET
        [name] = COALESCE(${updateCertificateDto.name}, [name]),
        [organization] = COALESCE(${updateCertificateDto.organization}, [organization]),
        [url] = COALESCE(${updateCertificateDto.url}, [url]),
        [image] = COALESCE(${updateCertificateDto.image}, [image]),
        [verifiedDate] = COALESCE(${updateCertificateDto.verifiedDate}, [verifiedDate])
      WHERE [id] = ${id} AND [employeeId] = ${certificate.employeeId};

      SELECT * FROM [dbo].[Certificate]
      WHERE [id] = ${id};
    `;
    return result[0];
  }

  async remove(id: number) {
    const certificate = await this.findOne(id);
    
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[CertificateOnRecord]
      WHERE [certificateId] = ${id};

      DELETE FROM [dbo].[Certificate]
      WHERE [id] = ${id} AND [employeeId] = ${certificate.employeeId};
    `;

    return certificate;
  }
}
