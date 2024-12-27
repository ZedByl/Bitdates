import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtSecretRefresh(): string {
    return this.configService.get<string>('JWT_SECRET_REFRESH');
  }

  getEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getDomain(): string {
    return this.configService.get<string>('WEB_APP_URL');
  }

  async getCoinMarketApi(url: string): Promise<any> {
    const apiUrl = this.configService.get<string>('API_COIN_URL');
    const apiKey = this.configService.get<string>('API_COIN_TOKEN');

    const response = await axios.get(`${apiUrl}/v1${url}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        'x-api-key': apiKey,
      },
    });

    return response?.data;
  }
}
