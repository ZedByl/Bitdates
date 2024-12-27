import { CoinApi } from '@/models/coin.ts';
import { CategoryApi } from '@/models/category.ts';

export interface EventAPI {
	id: number;
	title: LocalizedString;
	coins: CoinApi[];
	date_event: string; // ISO 8601 дата
	can_occur_before: boolean;
	created_date: string; // ISO 8601 дата
	displayed_date: string;
	description: LocalizedString;
	percentage: number;
	is_hot: boolean;
	hot_index: number;
	categories: CategoryApi[];
	alert_count: number;
	original_source: string;
	proof: string;
	source: string;
	image_url?: string;
	page_id?: string;
}

// Тип для локализованных строк
interface LocalizedString {
	en: string;
}
