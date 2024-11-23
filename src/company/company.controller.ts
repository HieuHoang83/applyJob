import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  GetPaginateInfo,
  Public,
  ResponseMessage,
} from 'src/decorators/customize';
import { ApiTags } from '@nestjs/swagger';
import { CheckValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { CheckAccessToRoute } from 'src/core/role.guard';
import { Role } from 'utils/constant';

@ApiTags('companies')
@Controller({ path: 'companies', version: '1' })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  @ResponseMessage('Create a new Company')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Public()
  @Get()
  @ResponseMessage('Get all Companies')
  findAll() {
    return this.companyService.findAll();
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get Company by ID')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @ResponseMessage('Update Company by ID')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Public()
  @Delete(':id')
  @ResponseMessage('Delete Company by ID')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
