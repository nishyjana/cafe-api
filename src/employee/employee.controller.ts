/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { GetEmployeeByCafeDtoResponse } from './Dto/GetEmployeeResponse.dto';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './Dto/employee.create.dto';
import { Employee } from './Entity/employee.entity';

@Controller('employee')
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @Post()
  public createUser(@Body() body: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.createEmployee(body);
  }
  @Get('/employees?')
  public getUser(
    @Query('cafe') cafe: string,
  ): Promise<GetEmployeeByCafeDtoResponse> {
    return this.employeeService.getEmployeesByCafe(cafe);
  }
}
