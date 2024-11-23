import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, GetEmployeeEducationDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Public, ResponseMessage } from 'src/decorators/customize';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Public()
  @Post()
  @UsePipes(new ValidationPipe({ 
    transform: true,  // Thêm option này
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  @ResponseMessage('Create a new Employee')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Public()
  @Get()
  @ResponseMessage('Get all Employees')
  findAll() {
    return this.employeesService.findAll();
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get a Employee')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Public()
  @Patch(':id')
  @ResponseMessage('Update a Employee')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Public()
  @Delete(':id')
  @ResponseMessage('Delete a Employee')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }

  @Public()
  @Get('education/search')
  @ResponseMessage('Get Employee Education')
  @UsePipes(new ValidationPipe({ 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  getEmployeeEducation(@Query() query: GetEmployeeEducationDto) {
    return this.employeesService.getEmployeeEducation(query);
    // GET /employees/education/search?minAge=25&gender=Nam&schoolName=Harvard
  }


  @Public()
  @Get(':id/application-stats')
  @ResponseMessage('Get Employee Application Statistics')
  getApplicationStats(@Param('id') id: string) {
    return this.employeesService.getApplicationStats(+id);
    // GET /employees/1/application-stats
  }
  
}
