import { BaseInterfaceRepository } from '../base/base.interface.repository';

import { User } from '../../user.entity';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<User> {}
