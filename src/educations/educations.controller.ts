import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('educations')
@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Public()
  @Post()
  @ResponseMessage('Create a education successfully!')
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationsService.create(createEducationDto);
  }

  @Public()
  @Get()
  @ResponseMessage('Get all educations successfully!')
  findAll() {
    return this.educationsService.findAll();
  }

  @Public()
  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get a education successfully!')
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(+id);
  }

  @Public()
  @Get('employee/:id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get a education successfully!')
  findMany(@Param('id') id: string) {
    return this.educationsService.findEmployee(+id);
  }

  @Public()
  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Update a education successfully!')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationsService.update(+id, updateEducationDto);
  }

  @Public()
  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Delete a education successfully!')
  remove(@Param('id') id: string) {
    return this.educationsService.remove(+id);
  }
}
