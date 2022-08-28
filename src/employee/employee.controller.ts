/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetEmployeeByCafeDtoResponse } from './Dto/GetEmployeeResponse.dto';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './Dto/employee.create.dto';
import { Employee } from './Entity/employee.entity';
import { UpdateCafeDto } from 'src/cafe/dto/updateCafe.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { DeleteEmployeeDto } from './dto/deleteEmployee.dto';

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

  @Put()
  public updateCafe(@Body() body: UpdateEmployeeDto): Promise<void> {
    return this.employeeService.updateEmployee(body);
  }

  @Delete()
  public deleteEmployee(@Body() body: DeleteEmployeeDto): Promise<void> {
    return this.employeeService.deleteEmployee(body);
  }
}
