import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Public } from 'src/decorators/customize';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Public()
  @Post()
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.employersService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employersService.update(+id, updateEmployerDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}
