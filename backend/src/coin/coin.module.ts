import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from '../db/coin.entity';
import { AppModule } from '../app/app.module';
import { CoinsService } from './coin.service';
import { CoinsController } from './coin.controller';

@Module({
  imports: [forwardRef(() => AppModule), TypeOrmModule.forFeature([Coin])],
  providers: [CoinsService],
  controllers: [CoinsController],
})
export class CoinsModule {}
