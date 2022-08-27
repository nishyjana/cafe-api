import { Body, Controller, Inject, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './Entity/employee.create.dto';
import { Employee } from './Entity/employee.entity';

@Controller('employee')
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @Post()
  public createUser(@Body() body: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.createEmployee(body);
  }
}
