import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Public()
  @Get('/audit-log')
  @ResponseMessage('Get audit log')
  findAuditLog() {
    return this.adminsService.findAuditLog();
  }
  @Public()
  @Post()
  @ResponseMessage('create new admin')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOneById(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
