import { BaseInterfaceRepository } from '../base/base.interface.repository';

import { SubscriptionEntity } from '../../subscription.entity';

export interface SubscriptionRepositoryInterface
  extends BaseInterfaceRepository<SubscriptionEntity> {}
