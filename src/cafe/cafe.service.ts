/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cafe from './cafe.entity';
import { CreateCafeDto } from './createCafe.dto';

@Injectable()
export class CafeService {
  @InjectRepository(Cafe)
  private readonly repository: Repository<Cafe>;

  public async createCafe(body: CreateCafeDto): Promise<Cafe> {
    const cafe: Cafe = new Cafe();

    cafe.name = body.name;
    cafe.description = body.description;
    cafe.location = body.location;
    cafe.logo = body.logo;

    return await this.repository.save(cafe);
  }

  public async getCafeByLocation(location: string): Promise<Cafe[]> {
    const response = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.location = :location', { location: location })
      .getMany();
    return response;
  }
}
