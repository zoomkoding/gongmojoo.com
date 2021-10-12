import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { flatten, uniq } from 'lodash';
import { FindManyOptions, getConnection, In, Raw, Repository } from 'typeorm';
import { Security } from './entity/security.entity';
import { StockSecurity } from './entity/stock-security.entity';
import { StockVideo } from './entity/stock-video.entity';
import { Stock } from './entity/stock.entity';

@Injectable()
export class GongmoService {
  @InjectRepository(Stock)
  private stockRepository: Repository<Stock>;

  @InjectRepository(StockSecurity)
  private stockSecurityRepository: Repository<StockSecurity>;

  @InjectRepository(StockVideo)
  private stockVideoRepository: Repository<StockVideo>;

  @InjectRepository(Security)
  private securityRepository: Repository<Security>;

  async getStockDetails(id: number) {
    const stock = await this.stockRepository.findOne({ id });
    if (!stock) return NotFoundException;
    const stockSecurities = await this.stockSecurityRepository.find({
      공모주이름: stock.이름,
    });
    const stockVideos = await this.stockVideoRepository.find({
      공모주이름: stock.이름,
    });
    return { stock, stockSecurities, stockVideos };
  }

  async getPreparePageData() {
    const stocks = await this.getStocksUpcoming();
    const securityNames = uniq(flatten(stocks.map(({ 주간사 }) => 주간사)));
    const securities = await this.securityRepository.find({
      이름: In(securityNames),
    });
    return { stocks, securities };
  }

  getAllStockIds() {
    return this.stockRepository
      .createQueryBuilder('stock')
      .select(['stock.id'])
      .getMany();
  }

  getStocksUpcoming(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      where: { 공모청약시작일: Raw((alias) => `${alias} > NOW()`) },
      order: { 공모청약시작일: 'ASC' },
      take: options?.take,
      ...options,
    });
  }

  getStocksInProgress(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      where: {
        공모청약시작일: Raw((alias) => `${alias} <= NOW()`),
        공모청약종료일: Raw((alias) => `NOW() <= ${alias}`),
      },
      order: { 공모청약시작일: 'DESC' },
      take: options?.take,
      ...options,
    });
  }

  getStocksFinished(options?: FindManyOptions<Stock>) {
    return this.stockRepository
      .createQueryBuilder('stock')
      .where("stock.이름 NOT LIKE '%리츠%'")
      .andWhere("stock.이름 NOT LIKE '%스팩%'")
      .andWhere('stock.상장일 < DATE(NOW())')
      .orderBy('stock.상장일', 'DESC')
      .limit(options.take)
      .getMany();
  }

  getStocks(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      order: { 공모청약시작일: 'DESC' },
      take: 30,
      ...options,
    });
  }

  async getHomePageData() {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const finished = await this.getStocksFinished({
        transaction: true,
        take: 8,
      });
      const inProgress = await this.getStocksInProgress({
        transaction: true,
      });
      const upcoming = await this.getStocksUpcoming({
        transaction: true,
        take: 5,
      });

      await queryRunner.commitTransaction();
      return { stocks: { finished, inProgress, upcoming } };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      return InternalServerErrorException;
    } finally {
      await queryRunner.release();
    }
  }
}
