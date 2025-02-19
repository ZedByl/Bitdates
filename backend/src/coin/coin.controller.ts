import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AppService } from '../app/app.service';
import { CoinsService } from './coin.service';
import { GetCoinsBodyDto } from './dto/get-coins.dto';
import { Coin } from '../db/coin.entity';

@ApiTags('coins')
@Controller('coins')
export class CoinsController {
  constructor(
    private readonly coinsService: CoinsService,
    @Inject(AppService) private appService: AppService,
  ) {}

  @Post()
  async findOne(@Body() bodyDto: GetCoinsBodyDto): Promise<Coin[]> {
    return this.coinsService.getAllCoins(bodyDto?.search || '');
  }
}
