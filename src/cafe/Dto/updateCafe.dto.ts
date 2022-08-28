/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCafeDto {
  @IsNumber()
  @IsInt()
  public id: number;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public logo: string;

  @IsString()
  public location: string;
}
