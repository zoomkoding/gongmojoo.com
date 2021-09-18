import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Security {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  이름: string;

  @Column({ type: 'tinyint' })
  이십일제한여부: boolean;

  @Column({ type: 'json' })
  연계개설가능은행: string[];

  @Column({ type: 'tinyint' })
  당일개설청약가능여부: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
