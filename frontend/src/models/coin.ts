export interface CoinApi {
	id: string;          // Уникальный идентификатор монеты (например, "bitcoin")
	name: string;        // Название монеты (например, "Bitcoin")
	rank: number;        // Ранг монеты
	trending_index: number; // Индекс популярности или трендов
	upcoming: number;    // Количество предстоящих событий
	symbol: string;      // Символ монеты (например, "BTC")
	fullname: string;    // Полное название монеты (например, "Bitcoin (BTC)")
}
