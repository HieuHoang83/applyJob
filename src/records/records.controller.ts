import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { GetPaginateInfo, User } from 'src/decorators/customize';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(
    @Body() createRecordDto: CreateRecordDto,
    @User() user: IUser
  ) {
    return this.recordsService.create(createRecordDto, user);
  }

  @Get()
  findAll(
    @GetPaginateInfo() paginateInfo: PaginateInfo
  ) {
    return this.recordsService.findAll(paginateInfo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateRecordDto: UpdateRecordDto,
    @User() user: IUser
  ) {
    return this.recordsService.update(+id, updateRecordDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(+id);
  }
}
