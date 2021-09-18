import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  이름: string;

  @Column({ type: 'varchar', length: 45 })
  업종: string;

  @Column({ type: 'float', nullable: true })
  최종청약경쟁률: number;

  @Column({ type: 'integer', nullable: true })
  확정공모가: number;

  @Column({ type: 'integer', nullable: true })
  상장일종가: number;

  @Column({ type: 'integer' })
  희망공모가상단: number;

  @Column({ type: 'integer' })
  희망공모가하단: number;

  @Column({ type: 'float', nullable: true })
  기관경쟁률: number;

  @Column({ type: 'float' })
  증거금비율: number;

  @Column({ type: 'float', nullable: true })
  총의무보유확약비율: number;

  @Column({ type: 'json', nullable: true })
  수요예측: { 구분: string; 비율: number }[];

  @Column({ type: 'varchar', length: 45, nullable: true })
  현재가: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
