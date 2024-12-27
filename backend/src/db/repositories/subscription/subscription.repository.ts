import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../base/base.abstract.repository';
import { SubscriptionRepositoryInterface } from './subscription.repository.interface';
import { SubscriptionEntity } from '../../subscription.entity';

@Injectable()
export class SubscriptionRepository
  extends BaseAbstractRepository<SubscriptionEntity>
  implements SubscriptionRepositoryInterface
{
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly SubscriptionRepository: Repository<SubscriptionEntity>,
  ) {
    super(SubscriptionRepository);
  }
}
