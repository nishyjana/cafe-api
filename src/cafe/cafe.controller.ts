import { Body, Controller, Inject, Post } from '@nestjs/common';
import Cafe from './cafe.entity';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './createCafe.dto';

@Controller('cafe')
export class CafeController {
  @Inject(CafeService)
  private readonly cafeService: CafeService;

  @Post()
  public createUser(@Body() body: CreateCafeDto): Promise<Cafe> {
    return this.cafeService.createCafe(body);
  }
}
