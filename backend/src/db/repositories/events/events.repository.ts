import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../base/base.abstract.repository';
import { EventsRepositoryInterface } from './events.repository.interface';
import { Event } from '../../event.entity';

@Injectable()
export class EventsRepository
  extends BaseAbstractRepository<Event>
  implements EventsRepositoryInterface
{
  constructor(
    @InjectRepository(Event)
    private readonly EventRepository: Repository<Event>,
  ) {
    super(EventRepository);
  }
}
