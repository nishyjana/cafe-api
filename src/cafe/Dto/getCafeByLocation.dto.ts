/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Cafe from '../Entity/cafe.entity';

export class GetCafeByLocationDtoResponse {
  cafes: Cafe[];

  @IsNumber()
  public employees: number;
}
