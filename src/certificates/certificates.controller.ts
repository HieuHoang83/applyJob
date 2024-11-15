import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';

@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @ResponseMessage('Certificate created successfully')
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Get()
  @ResponseMessage('List of certificates')
  findAll(paginateInfo: PaginateInfo) {
    return this.certificatesService.findAll(paginateInfo);
  }

  // @Get(':id')
  // @UseGuards(CheckValidId)
  // @ResponseMessage('Certificate found successfully')
  // findOne(@Param('id') id: string) {
  //   return this.certificatesService.findOne(+id);
  // }

  // @Patch(':id')
  // @UseGuards(CheckValidId)
  // @ResponseMessage('Certificate updated successfully')
  // update(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
  //   return this.certificatesService.update(+id, updateCertificateDto);
  // }

  // @Delete(':id')
  // @UseGuards(CheckValidId)
  // @ResponseMessage('Certificate deleted successfully')
  // remove(@Param('id') id: string) {
  //   return this.certificatesService.remove(+id);
  // }
}
