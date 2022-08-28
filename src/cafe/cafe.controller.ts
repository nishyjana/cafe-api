/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HostParam,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import Cafe from './Entity/cafe.entity';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './Dto/createCafe.dto';
import { GetCafeByLocationDtoResponse } from './Dto/getCafeByLocation.dto';
import { UpdateCafeDto } from './dto/updateCafe.dto';
import { DeleteCafeDto } from './dto/deleteCafe.dto';

@Controller('cafe')
export class CafeController {
  @Inject(CafeService)
  private readonly cafeService: CafeService;

  @Post()
  public createCafe(@Body() body: CreateCafeDto): Promise<Cafe> {
    return this.cafeService.createCafe(body);
  }

  @Put()
  public updateCafe(@Body() body: UpdateCafeDto): Promise<void> {
    return this.cafeService.updateCafe(body);
  }

  @Get('/cafes?')
  public getCafe(
    @Query('location') location: string,
  ): Promise<GetCafeByLocationDtoResponse> {
    return this.cafeService.getCafeByLocation(location);
  }

  @Delete()
  public deleteCafe(@Body() body: DeleteCafeDto): Promise<void> {
    return this.cafeService.deleteCafe(body);
  }
}
