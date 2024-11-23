import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';
import { GetPaginateInfo } from 'src/decorators/customize';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}
  @Public()
  @Post()
  @ResponseMessage('Create evaluation successfully!')
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationsService.create(createEvaluationDto);
  }

  @Public()
  @Get()
  @ResponseMessage('Get all evaluations successfully!')
  findAll(
    @GetPaginateInfo() paginateInfo: PaginateInfo
  ) {
    return this.evaluationsService.findAll(paginateInfo);
  }

  @Public()
  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get evaluation by id successfully!')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(+id);
  }

  @Public()
  @Get('employee/:id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get evaluation by employee id successfully!')
  findByEmployeeId(@Param('id') id: string) {
    return this.evaluationsService.findByEmployeeId(+id);
  }

  @Public()
  @Get('post/:id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get evaluation by recruitment post id successfully!')
  findByRecruitmentPostId(@Param('id') id: string) {
    return this.evaluationsService.findByRecruitmentPostId(+id);
  }

  @Public()
  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Update evaluation by id successfully!')
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationsService.update(+id, updateEvaluationDto);
  }

  @Public()
  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Remove evaluation by id successfully!')
  remove(@Param('id') id: string) {
    return this.evaluationsService.remove(+id);
  }
}
