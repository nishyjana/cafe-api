import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from './employee.enum';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email_address: string;

  @IsString()
  public phone_number: string;

  @IsString()
  @IsEnum(Gender)
  public gender: Gender;
}
