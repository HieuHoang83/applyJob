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
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { CheckValidId } from 'src/core/id.guard';
import { ResponseMessage } from 'src/decorators/customize';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @ResponseMessage('Create a experience successfully!')
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  @ResponseMessage('Get all experiences successfully!')
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  @ResponseMessage('Get a experience successfully!')
  @UseGuards(CheckValidId)
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update a experience successfully!')
  @UseGuards(CheckValidId)
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete a experience successfully!')
  @UseGuards(CheckValidId)
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(+id);
  }
}
