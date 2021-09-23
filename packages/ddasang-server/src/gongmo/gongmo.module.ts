import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockSecurity } from './entity/stock-security.entity';
import { Stock } from './entity/stock.entity';

import { GongmoController } from './gongmo.controller';
import { GongmoService } from './gongmo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockSecurity])],
  providers: [GongmoService],
  exports: [TypeOrmModule],
  controllers: [GongmoController],
})
export class GongmoModule {}
