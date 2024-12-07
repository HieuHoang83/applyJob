import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';

@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Public()
  @Post()
  @ResponseMessage('Certificate created successfully')
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Public()
  @Get()
  @ResponseMessage('List of certificates')
  findAll(@Query() paginateInfo: PaginateInfo) {
    return this.certificatesService.findAll(paginateInfo);
  }

  @Public()
  @Get('employee/:id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Certificates found successfully')
  findMany(@Param('id') id: string) {
    return this.certificatesService.findEmployee(+id);
  }

  @Public()
  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Certificate found successfully')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Certificate updated successfully')
  update(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
    return this.certificatesService.update(+id, updateCertificateDto);
  }

  @Public()
  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Certificate deleted successfully')
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
