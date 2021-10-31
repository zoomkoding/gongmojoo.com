import { Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { GongmoService } from './gongmo.service';

@Controller('gongmo')
export class GongmoController {
  @Inject() gongmoService: GongmoService;

  @Get('/home')
  getHomePageData() {
    return this.gongmoService.getHomePageData();
  }

  @Get('/prepare')
  getPreparePageData() {
    return this.gongmoService.getPreparePageData();
  }

  @Get('/stock')
  getAllStocks() {
    return this.gongmoService.getStocks();
  }

  @Get('/stock/id')
  getAllStockIds() {
    return this.gongmoService.getAllStockIds();
  }

  @Get('/stock/:id')
  getStockDetails(@Param('id') id: number) {
    return this.gongmoService.getStockDetails(id);
  }

  @Patch('/stock/:name')
  updateStockDetails() {
    return;
  }

  @Patch('/stock/:stockName/security/:securityName')
  updateStockSecurityDetails() {
    return;
  }

  @Get('/security')
  getSecurityList() {
    return [];
  }

  @Get('/security/:id')
  getSecurityDetails() {
    return;
  }

  @Patch('/security/:name')
  updateSecurityDetails() {
    return;
  }
}
