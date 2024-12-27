import { BaseInterfaceRepository } from '../base/base.interface.repository';

import { Event } from '../../event.entity';

export interface EventsRepositoryInterface
  extends BaseInterfaceRepository<Event> {}
