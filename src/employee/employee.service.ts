import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cafe from '../cafe/Entity/cafe.entity';
import { Repository } from 'typeorm';
import { GetEmployeeByCafeDtoResponse } from './Dto/GetEmployeeResponse.dto';
import { CreateEmployeeDto } from './Dto/employee.create.dto';
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

    const employeDetail = await this.repository.manager
      .createQueryBuilder(Employee, 'emloyee')
      .where('emloyee.name = :name', { name: body?.name })
      .getOne();

    if (employeDetail) {
      throw new HttpException(
        'Employee name is already there, try a different name',
        HttpStatus.CONFLICT,
      );
    } else {
      return await this.repository.save(employee);
    }
  }

  public async getEmployeesByCafe(
    cafe: string,
  ): Promise<GetEmployeeByCafeDtoResponse> {
    const date = Date.now();

    const employees = await this.repository.manager
      .createQueryBuilder(Employee, 'employee')
      .leftJoinAndSelect('employee.cafe', 'cafe')
      .where('employee.cafe = :cafe', { cafe: cafe })
      .getMany();

    const cafeDetail = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.id = :id', { id: cafe })
      .getOne();

    const dto = new GetEmployeeByCafeDtoResponse();

    dto.employee = employees?.map((employee) => ({
      id: employee?.id,
      name: employee?.name,
      email_address: employee?.email_address,
      phone_number: employee?.phone_number,
      cafe: cafeDetail?.name,
      days_worked: Math.ceil(
        Math.abs(date.valueOf() - employee.updatedAt.valueOf()) /
          (1000 * 3600 * 24),
      ),
    }));

    return dto;
  }
}
