import { Controller, Get, Inject } from '@nestjs/common';
import { GongmoService } from './gongmo.service';

@Controller('gongmo')
export class GongmoController {
  @Inject() gongmoService: GongmoService;

  @Get('/stocks')
  getStockLists() {
    return ['hi', 'hi'];
  }
}
