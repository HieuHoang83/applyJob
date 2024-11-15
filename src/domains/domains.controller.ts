import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Public } from 'src/decorators/customize';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Public()
  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.domainsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainsService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return updateDomainDto;
    return this.domainsService.update(+id, updateDomainDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(+id);
  }
}
