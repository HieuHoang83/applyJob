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
  create(@Body() createRecordOnPostDto: CreateRecordOnPostDto) {
    return this.recordsOnPostService.create(createRecordOnPostDto);
  }

  @Public()
  @Get()
  findAll(@GetPaginateInfo() paginateInfo: PaginateInfo) {
    return this.recordsOnPostService.findAll(paginateInfo);
  }
  @Public() // Đánh dấu endpoint này là công khai
  @Get(':post') // Phương thức GET cho đường dẫn này
  async findMany(
    @Query('page') page: string = '1', // Tham số 'page', mặc định là '1'
    @Query('pageSize') pageSize: string = '10', // Tham số 'pageSize', mặc định là '5'
    @Param('post') post: string,  
  ) {
    const pageNumber = parseInt(page, 10); // Chuyển đổi sang số nguyên
    const size = parseInt(pageSize, 10); // Chuyển đổi sang số nguyên

    const result = await this.recordsOnPostService.findMany(
      +post,
      pageNumber,
      size,
    );
    return {
      success: true,
      ...result, // Gộp kết quả từ findPaginatedPosts
    };
  }

  @Public()
  @Patch()
  update(@Body() updateRecordOnPostDto: UpdateRecordOnPostDto) {
    return this.recordsOnPostService.update(updateRecordOnPostDto);
  }

  @Public()
  @Delete('/record/:record/post/:post')
  remove(@Param('record') record: number, @Param('post') post: number) {
    return this.recordsOnPostService.remove(record, post);
  }
}
