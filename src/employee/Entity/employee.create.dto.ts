import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import Cafe from '../../cafe/Entity/cafe.entity';
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

  @IsNumber()
  @IsNotEmpty()
  public cafe: Cafe;
}
