import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { GetPaginateInfo } from 'src/decorators/customize';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  @ResponseMessage('Create evaluation successfully!')
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationsService.create(createEvaluationDto);
  }

  @Get()
  @ResponseMessage('Get all evaluations successfully!')
  findAll(
    @GetPaginateInfo() paginateInfo: PaginateInfo
  ) {
    return this.evaluationsService.findAll(paginateInfo);
  }

  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get evaluation by id successfully!')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Update evaluation by id successfully!')
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationsService.update(+id, updateEvaluationDto);
  }

  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Remove evaluation by id successfully!')
  remove(@Param('id') id: string) {
    return this.evaluationsService.remove(+id);
  }
}
