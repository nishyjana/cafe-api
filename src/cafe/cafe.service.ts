/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cafe from './Entity/cafe.entity';
import { CreateCafeDto } from './Dto/createCafe.dto';
import { GetCafeByLocationDtoResponse } from './Dto/getCafeByLocation.dto';
import { Employee } from 'src/employee/Entity/employee.entity';

@Injectable()
export class CafeService {
  @InjectRepository(Cafe)
  private readonly repository: Repository<Cafe>;

  public async createCafe(body: CreateCafeDto): Promise<Cafe> {
    const cafe: Cafe = new Cafe();

    cafe.name = body.name;
    cafe.description = body.description;
    cafe.location = body.location.toLowerCase();
    cafe.logo = body.logo;

    const cafeDetail = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.name = :name', { name: body?.name })
      .getOne();

    if (cafeDetail) {
      throw new HttpException(
        'Cafe name is already there, try a different name',
        HttpStatus.CONFLICT,
      );
    } else {
      return await this.repository.save(cafe);
    }
  }

  public async getCafeByLocation(
    location: string,
  ): Promise<GetCafeByLocationDtoResponse> {
    const cafes = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.location = :location', { location: location.toLowerCase() })
      .leftJoinAndSelect('cafe.employees', 'employees')
      .loadRelationCountAndMap('cafe.employees', 'cafe.employees')
      .getMany();

    const dto = new GetCafeByLocationDtoResponse();
    dto.cafes = cafes;
    dto.employees = cafes['employees'];

    return dto;
  }
}
