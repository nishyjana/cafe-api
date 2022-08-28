import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './Entity/employee.create.dto';
import { Employee } from './Entity/employee.entity';

@Injectable()
export class EmployeeService {
  @InjectRepository(Employee)
  private readonly repository: Repository<Employee>;

  public async createEmployee(body: CreateEmployeeDto): Promise<Employee> {
    const employee: Employee = new Employee();

    employee.name = body.name;
    employee.email_address = body.email_address;
    employee.gender = body.gender;
    employee.phone_number = body.phone_number;
    employee.cafe = body.cafe;

    return await this.repository.save(employee);
  }
}
