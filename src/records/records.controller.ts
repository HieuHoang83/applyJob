import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { GetPaginateInfo, Public, ResponseMessage, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Public()
  @ResponseMessage('Record created successfully')
  @Post()
  create(
    @Body() createRecordDto: CreateRecordDto,
  ) {
    return this.recordsService.create(createRecordDto);
  }

  @Public()
  @ResponseMessage('List of records')
  @Get()
  findAll(
    @Query() paginateInfo: PaginateInfo
  ) {
    return this.recordsService.findAll(paginateInfo);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Record found successfully')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @ResponseMessage('Record updated successfully')
  update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto
  ) {
    return this.recordsService.update(+id, updateRecordDto);
  }

  @Public()
  @Delete(':id')
  @ResponseMessage('Record deleted successfully')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }

  @Public()
  @Post(':recordId/experiences/:experienceId')
  @ResponseMessage('Experience added to record successfully')
  addExperienceToRecord(
    @Param('recordId') recordId: string,
    @Param('experienceId') experienceId: string
  ) {
    return this.recordsService.addExperienceToRecord(+recordId, +experienceId);
  }

  @Public()
  @Delete(':recordId/experiences/:experienceId')
  @ResponseMessage('Experience removed from record successfully')
  removeExperienceFromRecord(
    @Param('recordId') recordId: string,
    @Param('experienceId') experienceId: string
  ) {
    return this.recordsService.removeExperienceFromRecord(+recordId, +experienceId);
  }

  @Public()
  @Post(':recordId/educations/:educationId')
  @ResponseMessage('Education added to record successfully')
  addEducationToRecord(
    @Param('recordId') recordId: string,
    @Param('educationId') educationId: string
  ) {
    return this.recordsService.addEducationToRecord(+recordId, +educationId);
  }

  @Public()
  @Delete(':recordId/educations/:educationId')
  @ResponseMessage('Education removed from record successfully')
  removeEducationFromRecord(
    @Param('recordId') recordId: string,
    @Param('educationId') educationId: string
  ) {
    return this.recordsService.removeEducationFromRecord(+recordId, +educationId);
  }

  @Public()
  @Post(':recordId/certificates/:certificateId')
  @ResponseMessage('Certificate added to record successfully')
  addCertificateToRecord(
    @Param('recordId') recordId: string,
    @Param('certificateId') certificateId: string
  ) {
    return this.recordsService.addCertificateToRecord(+recordId, +certificateId);
  }

  @Public()
  @Delete(':recordId/certificates/:certificateId')
  @ResponseMessage('Certificate removed from record successfully')
  removeCertificateFromRecord(
    @Param('recordId') recordId: string,
    @Param('certificateId') certificateId: string
  ) {
    return this.recordsService.removeCertificateFromRecord(+recordId, +certificateId);
  }
}
