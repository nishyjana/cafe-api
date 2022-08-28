import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEmployeeByCafeDtoResponse } from './Dto/GetEmployeeResponse.dto';
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

  public async getEmployeesByCafe(
    cafe: string,
  ): Promise<GetEmployeeByCafeDtoResponse> {
    const employee = await this.repository.manager
      .createQueryBuilder(Employee, 'employee')
      .leftJoinAndSelect('employee.cafe', 'cafe')
      .where('employee.cafe = :cafe', { cafe: cafe })
      .select(['employee', 'cafe.name', 'cafe.name'])
      .getRawMany();
    const dto = new GetEmployeeByCafeDtoResponse();
    dto.employee = employee;

    return dto;
  }
}
