/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteEmployeeDto {
  @IsNumber()
  @IsInt()
  public id: number;
}
