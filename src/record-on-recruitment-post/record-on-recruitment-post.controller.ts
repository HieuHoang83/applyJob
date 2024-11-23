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
import { RecordsOnPostService } from './record-on-recruitment-post.service';
import { CreateRecordOnPostDto } from './dto/create-record-on-recruitment-post.dto';
import { UpdateRecordOnPostDto } from './dto/update-record-on-recruitment-post.dto';
import { GetPaginateInfo, Public, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('records-post')
@Controller('records-post')
export class RecordsOnPostController {
  constructor(private readonly recordsOnPostService: RecordsOnPostService) {}
  @Public()
  @Post()
  create(
    @Body() createRecordOnPostDto: CreateRecordOnPostDto,
  ) {
    return this.recordsOnPostService.create(createRecordOnPostDto);
  }

  @Public()
  @Get()
  findAll(
    @GetPaginateInfo() paginateInfo: PaginateInfo
  ) {
    return this.recordsOnPostService.findAll(paginateInfo);
  }

  @Public()
  @Get(':post')
  findMany(@Param('post') post: string) {
    return this.recordsOnPostService.findMany(+post);
  }

  @Public()
  @Patch()
  update(
    @Body() updateRecordOnPostDto: UpdateRecordOnPostDto
  ) {
    return this.recordsOnPostService.update(updateRecordOnPostDto);
  }

  @Public()
  @Delete('/record/:record/post/:post')
  remove(@Param('record') record: number, @Param('post') post: number) {
    return this.recordsOnPostService.remove(record, post);
  }
}
