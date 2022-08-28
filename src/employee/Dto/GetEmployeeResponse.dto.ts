/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from '../Entity/employee.entity';

export class EmployeeResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public email_address: string;

  @IsString()
  public phone_number: string;

  @IsString()
  public cafe: string;

  @IsNumber()
  public days_worked: number;
}

export class GetEmployeeByCafeDtoResponse {
  employee: EmployeeResponse[];
}
