import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StockSecurity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  공모주이름: string;

  @Column({ type: 'varchar', length: 45 })
  증권사이름: string;

  @Column({ type: 'float', nullable: true })
  일반경쟁률?: number;

  @Column({ type: 'float', nullable: true })
  비례경쟁률?: number;

  @Column({ type: 'integer', nullable: true })
  총청약건수?: number;

  @Column({ type: 'integer', nullable: true })
  일반균등물량?: number;

  @Column({ type: 'integer', nullable: true })
  일반비례물량?: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
