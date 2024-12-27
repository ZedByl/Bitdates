import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from '../db/db.module';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../guards/auth.guard';
import { EventsModule } from '../event/event.module';
import { UploadsModule } from '../uploads/uploads.module';
import { CoinsModule } from '../coin/coin.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available across all modules
      envFilePath: './.env',
    }),
    DBModule,
    AuthModule,
    EventsModule,
    CoinsModule,
    UploadsModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'auth/info',
        method: RequestMethod.GET,
      },
      {
        path: 'events/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
