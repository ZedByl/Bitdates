import { Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Raw, Repository } from 'typeorm';
import { Event } from '../db/event.entity';
import {
  GetEventsBodyDto,
  GetEventsDBDto,
  GetEventsDto,
} from './dto/get-events.dto';
import { AppService } from '../app/app.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @Inject(AppService) private appService: AppService,
  ) {}

  async createEvent(data: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(data);
    return this.eventRepository.save(event);
  }

  async getAllEventsDB(@Query() queryDto: GetEventsDBDto) {
    const { _page = 1, _limit = 10, _sort, _order } = queryDto;

    const [data, total] = await this.eventRepository.findAndCount({
      order: { [_sort]: _order.toUpperCase() as 'ASC' | 'DESC' },
      skip: (_page - 1) * _limit,
      take: _limit,
    });

    return { items: data, total };
  }

  async getAllEvents(
    dto: GetEventsDto,
    body: GetEventsBodyDto,
  ): Promise<any[]> {
    const externalQuery = this.buildExternalQuery(dto);

    const externalData = await this.appService.getCoinMarketApi(
      `/events${externalQuery}`,
    );
    const externalEvents: Event[] = externalData?.body ?? [];

    const externalEventIds = new Set(externalEvents.map((event) => event.id));

    const dbFilter = this.buildDbFilter(dto);
    const dbEvents = await this.eventRepository.find({
      where: dbFilter,
      order: { date_event: 'ASC' },
    });

    const filteredDbEvents = dbEvents.filter((dbEvent) => {
      return !externalEventIds.has(Number(dbEvent.id));
    });

    let mergedEvents = [...externalEvents, ...filteredDbEvents];

    if (body.excludeIds && body.excludeIds.length > 0) {
      mergedEvents = mergedEvents.filter((event) => {
        return !body.excludeIds.includes(event.id);
      });
    }

    return mergedEvents;
  }

  /**
   * Преобразуем наш DTO в query-строку для внешнего API.
   */
  private buildExternalQuery(dto: GetEventsDto): string {
    const params = new URLSearchParams();

    // Параметры пагинации (по документации coinmarketcal)
    // Если API coinmarketcal принимает page и max, добавляем:
    if (dto.page) {
      params.set('page', String(dto.page));
    }
    if (dto.max) {
      params.set('max', String(dto.max));
    }

    // dateRangeStart, dateRangeEnd
    if (dto.dateRangeStart) {
      params.set('dateRangeStart', dto.dateRangeStart);
    }
    if (dto.dateRangeEnd) {
      params.set('dateRangeEnd', dto.dateRangeEnd);
    }

    // coins, categories
    if (dto.coins) {
      params.set('coins', dto.coins);
    }
    if (dto.categories) {
      params.set('categories', dto.categories);
    }

    // sortBy, showOnly
    if (dto.sortBy) {
      params.set('sortBy', dto.sortBy);
    }
    if (dto.showOnly) {
      params.set('showOnly', dto.showOnly);
    }

    // showViews, showVotes
    if (dto.showViews !== undefined) {
      params.set('showViews', String(dto.showViews));
    }
    if (dto.showVotes !== undefined) {
      params.set('showVotes', String(dto.showVotes));
    }

    // translations
    if (dto.translations) {
      params.set('translations', dto.translations);
    }

    // Генерируем итоговую query-строку
    const queryString = params.toString(); // например: "page=2&max=20&coins=bitcoin"
    return queryString ? `?${queryString}` : '';
  }

  private buildDbFilter(dto: GetEventsDto): FindOptionsWhere<Event> {
    const filter: FindOptionsWhere<Event> = {};

    // Categories is a JSONB array of objects, e.g. [{ id: number, name: string }]
    if (dto.categories) {
      const catId = Number(dto.categories);
      if (!isNaN(catId)) {
        /**
         * Postgres JSONB "contains" operator (@>) example:
         *  `alias @> '[{"id": 123}]'` checks that the JSON array
         *   in this column contains an object with {id:123}.
         */
        filter.categories = Raw((alias) => `${alias} @> '[{"id": ${catId}}]'`);
      }
    }

    // Coins is also a JSONB array of objects, e.g. [{ id: number, name: string }]
    if (dto.coins) {
      const coinId = Number(dto.coins);
      if (!isNaN(coinId)) {
        filter.coins = Raw((alias) => `${alias} @> '[{"id": ${coinId}}]'`);
      }
    }

    // Date range filtering
    // If you only store the date part, consider using a "date" column + Between().
    if (dto.dateRangeStart && dto.dateRangeEnd) {
      // Convert to Date objects if needed
      filter.date_event = Between(
        new Date(dto.dateRangeStart),
        new Date(dto.dateRangeEnd),
      );
    } else if (dto.dateRangeStart) {
      // One-sided range
      filter.date_event = Raw((alias) => `${alias} >= :start`, {
        start: new Date(dto.dateRangeStart),
      });
    } else if (dto.dateRangeEnd) {
      filter.date_event = Raw((alias) => `${alias} <= :end`, {
        end: new Date(dto.dateRangeEnd),
      });
    }

    return filter;
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: Number(id) },
    });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  async updateEvent(id: string, updateData: Partial<Event>): Promise<Event> {
    const event = await this.getEvent(id); // throws if not found
    Object.assign(event, updateData);
    return this.eventRepository.save(event);
  }

  async deleteEvent(id: string): Promise<void> {
    const event = await this.getEvent(id);

    const result = await this.eventRepository.delete(event.page_id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
  }
}
