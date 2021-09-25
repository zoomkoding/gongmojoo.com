import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  getConnection,
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

  @InjectRepository(StockSecurity)
  private stockSecurityRepository: Repository<StockSecurity>;

  async getStockDetails(id: number) {
    const stock = await this.stockRepository.findOne({ id });
    if (!stock) return NotFoundException;
    const stockSecurities = await this.stockSecurityRepository.find({
      공모주이름: stock.이름,
    });
    return { stock, stockSecurities };
  }

  getAllStockIds() {
    return this.stockRepository
      .createQueryBuilder('stock')
      .select(['stock.id'])
      .getMany();
  }

  getStocksUpcoming(options?: FindManyOptions<Stock>) {
    return this.stockRepository.find({
      where: { 공모청약시작일: MoreThan(new Date()) },
      order: { 공모청약시작일: 'ASC' },
      take: 5,
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
    return this.stockRepository
      .createQueryBuilder('stock')
      .where("stock.이름 NOT LIKE '%리츠%'")
      .andWhere("stock.이름 NOT LIKE '%스팩%'")
      .andWhere('stock.상장일 < :date', { date: new Date() })
      .orderBy('stock.상장일', 'DESC')
      .limit(options.take || 8)
      .getMany();
  }

  async getHomePageData() {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const finished = await this.getStocksFinished({ transaction: true });
      const inProgress = await this.getStocksInProgress({ transaction: true });
      const upcoming = await this.getStocksUpcoming({ transaction: true });

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
