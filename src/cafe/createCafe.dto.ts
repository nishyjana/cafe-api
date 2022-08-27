import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCafeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public description: string;

  @IsString()
  public logo: string;

  @IsString()
  public location: string;
}
