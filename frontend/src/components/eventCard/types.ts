import { EventAPI } from '@/models/event.ts';

export interface EventCardProps extends EventAPI {
    categoryId?: number;
}
