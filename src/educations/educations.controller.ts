import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('educations')
@Controller('educations')
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  @ResponseMessage('Create a education successfully!')
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationsService.create(createEducationDto);
  }

  @Get()
  @ResponseMessage('Get all educations successfully!')
  findAll() {
    return this.educationsService.findAll();
  }

  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get a education successfully!')
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Update a education successfully!')
  update(@Param('id') id: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationsService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Delete a education successfully!')
  remove(@Param('id') id: string) {
    return this.educationsService.remove(+id);
  }
}
