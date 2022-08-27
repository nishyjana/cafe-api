import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { Cafe } from './Entity/cafe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe])],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
