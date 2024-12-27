import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app/app.module';
import { SubscriptionEntity } from '../db/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [
    forwardRef(() => AppModule),
    TypeOrmModule.forFeature([SubscriptionEntity]),
  ],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
  exports: [],
})
export class SubscriptionModule {}
