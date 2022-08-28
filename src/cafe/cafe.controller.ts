/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HostParam,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import Cafe from './Entity/cafe.entity';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './Dto/createCafe.dto';
import { GetCafeByLocationDtoResponse } from './Dto/getCafeByLocation.dto';

@Controller('cafe')
export class CafeController {
  @Inject(CafeService)
  private readonly cafeService: CafeService;

  @Post()
  public createUser(@Body() body: CreateCafeDto): Promise<Cafe> {
    return this.cafeService.createCafe(body);
  }

  @Get('/cafes?')
  public getUser(
    @Query('location') location: string,
  ): Promise<GetCafeByLocationDtoResponse> {
    return this.cafeService.getCafeByLocation(location);
  }
}
