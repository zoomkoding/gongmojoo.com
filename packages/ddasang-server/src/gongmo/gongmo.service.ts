import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  getConnection,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { StockSecurity } from './entity/stock-security.entity';
import { Stock } from './entity/stock.entity';

@Injectable()
export class GongmoService {
  @InjectRepository(Stock)
  private stockRepository: Repository<Stock>;

  getStockDetails() {
    return this.stockRepository.findOne({});
  }

  getStocksUpcoming(options?: FindManyOptions<Stock>) {
    return this.stockRepository.findAndCount({
      where: { 공모청약시작일: MoreThan(new Date()) },
      order: { 공모청약시작일: 'ASC' },
      take: 10,
      ...options,
    });
  }

  getStocksInProgress(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      where: {
        공모청약시작일: LessThanOrEqual(new Date()),
        공모청약종료일: MoreThanOrEqual(new Date()),
      },
      order: { 공모청약시작일: 'DESC' },
      take: 5,
      ...options,
    });
  }

  getStocksFinished(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      where: { 공모청약종료일: LessThan(new Date()) },
      order: { 공모청약시작일: 'DESC' },
      take: 5,
      ...options,
    });
  }

  async getHomePageData() {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const finished = await this.getStocksFinished({ transaction: true });
      const inProgress = await this.getStocksInProgress({ transaction: true });
      const upComing = await this.getStocksFinished({ transaction: true });

      await queryRunner.commitTransaction();
      return { stocks: { finished, inProgress, upComing } };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
