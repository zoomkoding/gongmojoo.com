import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entity/stock.entity';

import { GongmoController } from './gongmo.controller';
import { GongmoService } from './gongmo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [GongmoService],
  exports: [TypeOrmModule],
  controllers: [GongmoController],
})
export class GongmoModule {}
