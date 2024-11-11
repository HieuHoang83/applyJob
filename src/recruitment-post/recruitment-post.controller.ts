import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruitmentPostService } from './recruitment-post.service';
import { CreateRecruitmentPostDto } from './dto/create-recruitment-post.dto';
import { UpdateRecruitmentPostDto } from './dto/update-recruitment-post.dto';
import { GetPaginateInfo, Public, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('recruitment-posts')
@Controller('recruitment-post')
export class RecruitmentPostController {
  constructor(
    private readonly recruitmentPostService: RecruitmentPostService,
  ) {}

  // @Post()
  // create(
  //   @Body() createRecruitmentPostDto: CreateRecruitmentPostDto,
  //   @User() user: IUser
  // ) {
  //   return this.recruitmentPostService.create(createRecruitmentPostDto, user);
  // }

  // @Public()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recruitmentPostService.findOne(+id);
  // }

  // @Get()
  // @Public()
  // findAll(
  //   @GetPaginateInfo() paginate: PaginateInfo
  // ) {
  //   return this.recruitmentPostService.findAll(paginate);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecruitmentPostDto: UpdateRecruitmentPostDto) {
  //   return this.recruitmentPostService.update(+id, updateRecruitmentPostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recruitmentPostService.remove(+id);
  // }
}
