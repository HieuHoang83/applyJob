import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, AddTagToJobPostDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ResponseMessage } from 'src/decorators/customize';
import { CheckValidId } from 'src/core/id.guard';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ResponseMessage('Create tag successfully!')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ResponseMessage('Get all tags successfully!')
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Get tag by id successfully!')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Update tag by id successfully!')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(CheckValidId)
  @ResponseMessage('Remove tag by id successfully!')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }

  @Post('/tag-job-post')
  @ResponseMessage('Add tag to jobPost successfully!')
  addTagToJobPost(@Body() addTagToJobPostDto: AddTagToJobPostDto) {
    return this.tagsService.addTagToJobPost(addTagToJobPostDto);
  }
}
