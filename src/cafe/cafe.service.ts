import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cafe from './cafe.entity';
import { CreateCafeDto } from './createCafe.dto';

@Injectable()
export class CafeService {
  @InjectRepository(Cafe)
  private readonly repository: Repository<Cafe>;

  public createCafe(body: CreateCafeDto): Promise<Cafe> {
    const cafe: Cafe = new Cafe();

    cafe.name = body.name;
    cafe.description = body.description;
    cafe.location = body.location;
    cafe.logo = body.logo;

    return this.repository.save(cafe);
  }
}
