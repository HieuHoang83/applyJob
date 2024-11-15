import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDomainAndCompanyDto } from './dto/create-domain-and-company.dto';
import { UpdateDomainAndCompanyDto } from './dto/update-domain-and-company.dto';
import { PrismaService } from 'prisma/prisma.service';
import { DomainsService } from 'src/domains/domains.service';
import { CompanyService } from 'src/company/company.service';
import { DeleteDto } from './dto/deleteDto';

@Injectable()
export class DomainAndCompanyService {
  constructor(
    private prismaService: PrismaService,
    private domainsService: DomainsService,
    private companyService: CompanyService,
  ) {}
  async create(createDomainAndCompanyDto: CreateDomainAndCompanyDto) {
    let domainexist = await this.domainsService.checkDomainById(
      createDomainAndCompanyDto.domainId,
    );
    let companyexist = await this.companyService.checkCompanyById(
      createDomainAndCompanyDto.companyId,
    );
    if (!domainexist) {
      throw new BadRequestException('Domain not found');
    }
    if (!companyexist) {
      throw new BadRequestException('Company not found');
    }
    try {
      await this.prismaService
        .$queryRaw` INSERT INTO DomainOnCompany (companyId, domainId)
    VALUES (${createDomainAndCompanyDto.companyId},${createDomainAndCompanyDto.domainId});`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async createMultipleDomains(createDomainDtos: CreateDomainAndCompanyDto[]) {
    // Xây dựng chuỗi `VALUES` từ mảng các đối tượng
    const values = createDomainDtos
      .map(
        (domain) =>
          `('${domain.companyId}', ${domain.domainId}'
          })`,
      )
      .join(', ');

    // Xây dựng truy vấn SQL
    const query = `INSERT INTO DomainOnCompany (companyId, domainId) VALUES ${values};`;

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
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM DomainOnCompany `;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findDomainOfCompany(companyId: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM DomainOnCompany WHERE companyId = ${companyId}`;
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async FindOne(companyId: number, domainId: number) {
    try {
      let result = await this.prismaService
        .$queryRaw`SELECT * FROM DomainOnCompany WHERE companyId = ${companyId} AND domainId = ${domainId}`;
      if (result[0] === undefined) {
        throw new BadRequestException('Domain not found');
      }
      return result[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async remove(deleteDto: DeleteDto) {
    if (
      (await this.FindOne(deleteDto.companyId, deleteDto.domainId)) === null
    ) {
      throw new BadRequestException('not found');
    }
    return await this.prismaService
      .$queryRaw`DELETE FROM DomainOnCompany WHERE companyId = ${deleteDto.companyId} AND domainId = ${deleteDto.domainId}`;
  }
}
