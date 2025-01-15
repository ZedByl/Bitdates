import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from '../app/app.service';
import { SubscriptionEntity } from '../db/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @Inject(AppService) private appService: AppService,
  ) {}

  async createSubscriptionEmail(
    data: Partial<SubscriptionEntity>,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepository.findOneBy({
      email: data.email,
    });

    if (subscription) {
      throw new BadRequestException('Such an email already exists');
    }

    const event = this.subscriptionRepository.create(data);
    return this.subscriptionRepository.save(event);
  }

  async deleteSubscriptionEmail(id: string): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscription Email with id ${id} not found`);
    }
  }
}
