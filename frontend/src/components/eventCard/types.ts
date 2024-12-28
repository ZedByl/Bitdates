import { EventAPI } from '@/models/event.ts';
import {CategorySelectState} from "@/components/categorySelect/typings.ts";

export interface EventCardProps extends EventAPI {
    selectedCategory?: CategorySelectState;
    categoryId?: number;
}
