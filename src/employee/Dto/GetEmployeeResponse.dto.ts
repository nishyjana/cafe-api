/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from '../Entity/employee.entity';

export class GetEmployeeByCafeDtoResponse {
  employee: Employee[];

  @IsString()
  public cafe: string;

  @IsNumber()
  public days_worked: number;
}
