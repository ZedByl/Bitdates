import { Inject, Injectable } from '@nestjs/common';
import { AppService } from '../app/app.service';
import { Coin } from '../db/coin.entity';

@Injectable()
export class CoinsService {
  constructor(@Inject(AppService) private appService: AppService) {}

  async getAllCoins(search: string): Promise<Coin[]> {
    const externalData = await this.appService.getCoinMarketApi(`/coins`);
    const externalCoins: Coin[] = externalData?.body ?? [];

    return externalCoins.filter((coin) =>
      coin.fullname.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
