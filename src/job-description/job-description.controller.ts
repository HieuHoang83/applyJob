import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobDescriptionService } from './job-description.service';
import { CreateJobDescriptionDto } from './dto/create-job-description.dto';
import { UpdateJobDescriptionDto } from './dto/update-job-description.dto';
import { Public } from 'src/decorators/customize';

@Controller('job-description')
export class JobDescriptionController {
  constructor(private readonly jobDescriptionService: JobDescriptionService) {}

  @Public()
  @Post()
  create(@Body() createJobDescriptionDto: CreateJobDescriptionDto) {
    return this.jobDescriptionService.create(createJobDescriptionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.jobDescriptionService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobDescriptionService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDescriptionDto: UpdateJobDescriptionDto,
  ) {
    return this.jobDescriptionService.update(+id, updateJobDescriptionDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDescriptionService.remove(+id);
  }
}
