import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GongmoModule } from './gongmo/gongmo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('DATABASE_URL'),
        entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
        // logging: process.env.NODE_ENV !== 'production',
        // synchronize: true,
        // dropSchema: true
      }),
    }),
    GongmoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
