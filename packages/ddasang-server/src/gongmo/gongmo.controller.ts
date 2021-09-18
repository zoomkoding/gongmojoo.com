import { Controller, Get, Inject, Patch } from '@nestjs/common';
import { GongmoService } from './gongmo.service';

@Controller('gongmo')
export class GongmoController {
  @Inject() gongmoService: GongmoService;

  @Get('/stock')
  getStockList() {
    return [];
  }

  @Get('/stock/:id')
  getStockDetails() {
    return;
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
