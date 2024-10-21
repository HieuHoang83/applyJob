import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { Public } from 'src/decorators/customize';

@Controller('recruitment-post')
export class RecruitmentPostController {
  constructor(private readonly recruitmentPostService: RecruitmentPostService) {}

  @Post()
  @Public()
  create(@Body() createRecruitmentPostDto: CreateRecruitmentPostDto) {
    return this.recruitmentPostService.create(createRecruitmentPostDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitmentPostService.findOne(+id);
  }

  @Get()
  @Public()
  findAll() {
    return this.recruitmentPostService.findAll();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
    return this.recruitmentPostService.update(+id, updateRecruitmentPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitmentPostService.remove(+id);
  }
}
