/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cafe from './Entity/cafe.entity';
import { CreateCafeDto } from './Dto/createCafe.dto';
import { GetCafeByLocationDtoResponse } from './Dto/getCafeByLocation.dto';
import { Employee } from 'src/employee/Entity/employee.entity';
import { UpdateCafeDto } from './dto/updateCafe.dto';
import { DeleteCafeDto } from './dto/deleteCafe.dto';

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

  public async updateCafe(body: UpdateCafeDto): Promise<void> {
    const cafeDetail = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.id = :id', { id: body.id })
      .getOne();

    const cafeBody = {
      id: cafeDetail?.id,
      name: body?.name,
      logo: body?.logo,
      location: body?.location,
      description: body?.description,
      updatedAt: cafeDetail?.updatedAt,
      employees: cafeDetail?.employees,
    };

    if (cafeDetail && cafeBody) {
      // return await this.repository.save(cafeBody);
      await this.repository.manager.update(
        Cafe,
        { id: body?.id },
        { ...cafeBody },
      );
    } else {
      throw new HttpException('Cafe not found', HttpStatus.NOT_FOUND);
    }
  }

  public async deleteCafe(body: DeleteCafeDto): Promise<void> {
    const cafeDetail = await this.repository.manager
      .createQueryBuilder(Cafe, 'cafe')
      .where('cafe.id = :id', { id: body?.id })
      .getOne();

    if (cafeDetail) {
      // return await this.repository.save(cafeBody);
      await this.repository.manager.delete(Cafe, body?.id);
    } else {
      throw new HttpException('Cafe not found', HttpStatus.NOT_FOUND);
    }
  }
}
