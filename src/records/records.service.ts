import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from 'prisma/prisma.service';
import { IUser } from 'src/interface/users.interface';
import { RecordStatus } from 'utils/constant';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { Prisma } from '@prisma/client';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class RecordsService {
  constructor(
    private prismaService: PrismaService,
    private employeeService: EmployeesService,
  ) {}
  async create(createRecordDto: CreateRecordDto) {
    const result = await this.prismaService.$queryRaw`
      INSERT INTO [dbo].[Record] (
        [title],
        [description],
        [ownerId],
        [fileCvId]
      )
      VALUES (
        ${createRecordDto.title},
        ${createRecordDto.description},
        ${createRecordDto.ownerId},
        ${createRecordDto.fileCvId}
      );

      SELECT * FROM [dbo].[Record]
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
    const validSortColumns = [
      'id',
      'title',
      'description',
      'ownerId',
      'fileCvId',
    ];
    const validSortOrders = ['ASC', 'DESC'];

    let safeSort = '[id] DESC';
    if (sort) {
      const [column, order] = sort.replace(/[\[\]]/g, '').split(' ');
      if (
        validSortColumns.includes(column) &&
        validSortOrders.includes(order)
      ) {
        safeSort = `[${column}] ${order}`;
      }
    }

    // Get total items với prepared statement
    const totalResult = await this.prismaService.$queryRaw`
      SELECT COUNT(*) as total
      FROM [dbo].[Record]
      WHERE 1=1 
      ${filter ? Prisma.sql`AND ${filter}` : Prisma.empty};
    `;
    const totalItems = Number(totalResult[0].total);
    const totalPages = Math.ceil(totalItems / defaultLimit);

    // Get data với prepared statement và pagination
    const data = await this.prismaService.$queryRaw<any[]>`
      SELECT 
        [id],
        [title],
        [description],
        [ownerId],
        [fileCvId]
      FROM [dbo].[Record]
      WHERE 1=1
      ${filter ? Prisma.sql`AND ${filter}` : Prisma.empty}
      ORDER BY ${Prisma.sql([safeSort])}
      OFFSET ${offset} ROWS
      FETCH NEXT ${defaultLimit} ROWS ONLY;
    `;

    return {
      meta: {
        totalRecords: totalItems,
        recordCount: data.length,
        recordsPerPage: defaultLimit,
        totalPages,
        currentPage: Number(currentPage),
      },
      result: data,
    };
  }

  async findOne(id: number) {
    const record = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Record]
      WHERE [id] = ${id};
    `;

    if (!record[0]) {
      throw new NotFoundException('Record not found');
    }

    return record[0];
  }
  async findALlOwn(id: number) {
    const record = await this.prismaService.$queryRaw`
      SELECT id as recordId , title as recordTitle, description, ownerId, fileCvId FROM [dbo].[Record]
      WHERE [ownerId] = ${id};
    `;

    return record;
  }
  async findEmployee(id: number) {
    const record: [] = await this.prismaService.$queryRaw`
      SELECT * FROM [dbo].[Record]
      WHERE [ownerId] = ${id};
    `;

    if (record.length > 0) {
      let result = [];
      for (let i = 0; i < record.length; i++) {
        //@ts-ignore
        let id = record[i]?.id; // Lấy ID của từng bản ghi
        result[i] = await this.employeeService.getApplicationStats(id);
      }
      return result;
    }

    throw new NotFoundException('Record not found');
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    const record = await this.findOne(id);

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    const result = await this.prismaService.$queryRaw`
      UPDATE [dbo].[Record]
      SET
        [title] = COALESCE(${updateRecordDto.title}, [title]),
        [description] = COALESCE(${updateRecordDto.description}, [description]),
        [ownerId] = COALESCE(${updateRecordDto.ownerId}, [ownerId]),
        [fileCvId] = COALESCE(${updateRecordDto.fileCvId}, [fileCvId])
      WHERE [id] = ${id} AND [ownerId] = ${record.ownerId};

      SELECT * FROM [dbo].[Record]
      WHERE [id] = ${id};
    `;
    return result[0];
  }

  async remove(id: number) {
    const record = await this.findOne(id);

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    await this.prismaService.$queryRaw`
      DELETE FROM [dbo].[ExperienceOnRecord]
      WHERE [recordId] = ${id};

      DELETE FROM [dbo].[EducationOnRecord]
      WHERE [recordId] = ${id};

      DELETE FROM [dbo].[CertificateOnRecord]
      WHERE [recordId] = ${id};

      DELETE FROM [dbo].[Record]
      WHERE [id] = ${id} AND [ownerId] = ${record.ownerId};
    `;

    return record;
  }

  async addExperienceToRecord(recordId: number, experienceId: number) {
    return await this.prismaService.$executeRaw`
      INSERT INTO [dbo].[ExperienceOnRecord] (experienceId, recordId)
      VALUES (${experienceId}, ${recordId})
    `;
  }

  async removeExperienceFromRecord(recordId: number, experienceId: number) {
    return await this.prismaService.$executeRaw`
      DELETE FROM [dbo].[ExperienceOnRecord]
      WHERE recordId = ${recordId} AND experienceId = ${experienceId}
    `;
  }

  async addEducationToRecord(recordId: number, educationId: number) {
    return await this.prismaService.$executeRaw`
      INSERT INTO [dbo].[EducationOnRecord] (educationId, recordId)
      VALUES (${educationId}, ${recordId})
    `;
  }

  async getAllExperienceOnRecord(recordId: number) {
    return await this.prismaService.$queryRaw`
    SELECT e.[id],
           e.[company],
           e.[position],
           e.[description],
           e.[url],
           e.[image],
           e.[startDate],
           e.[endDate]
    FROM [dbo].[ExperienceOnRecord] er
    INNER JOIN [dbo].[Experience] e ON er.experienceId = e.id
    WHERE er.recordId = ${recordId};
    `;
  }

  async getAllCertificateOnRecord(recordId: number) {
    return await this.prismaService.$queryRaw`
    SELECT e.[id],
           e.[name],
           e.[organization],
           e.[url],
           e.[image],
           e.[verifiedDate]
    FROM [dbo].[CertificateOnRecord] er
    INNER JOIN [dbo].[Certificate] e ON er.certificateId = e.id
    WHERE er.recordId = ${recordId};
    `;
  }

  async getAllEducationOnRecord(recordId: number) {
    return await this.prismaService.$queryRaw`
    SELECT e.[id],
           e.[school],
           e.[major],
           e.[description],
           e.[startDate],
           e.[endDate]
    FROM [dbo].[EducationOnRecord] er
    INNER JOIN [dbo].[Education] e ON er.educationId = e.id
    WHERE er.recordId = ${recordId};
    `;
  }

  async removeEducationFromRecord(recordId: number, educationId: number) {
    return await this.prismaService.$executeRaw`
      DELETE FROM [dbo].[EducationOnRecord]
      WHERE recordId = ${recordId} AND educationId = ${educationId}
    `;
  }

  async addCertificateToRecord(recordId: number, certificateId: number) {
    return await this.prismaService.$executeRaw`
      INSERT INTO [dbo].[CertificateOnRecord] (certificateId, recordId)
      VALUES (${certificateId}, ${recordId})
    `;
  }

  async removeCertificateFromRecord(recordId: number, certificateId: number) {
    return await this.prismaService.$executeRaw`
      DELETE FROM [dbo].[CertificateOnRecord]
      WHERE recordId = ${recordId} AND certificateId = ${certificateId}
    `;
  }
}
