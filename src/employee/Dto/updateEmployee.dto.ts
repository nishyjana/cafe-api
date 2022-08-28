/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsNumber()
  @IsInt()
  public id: number;

  @IsString()
  public name: string;

  @IsEmail()
  public email_address: string;

  @IsString()
  public phone_number: string;

  @IsString()
  public gender!: string;

  @IsNumber()
  @IsInt()
  public cafe: number;
}
