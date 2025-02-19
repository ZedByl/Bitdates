import { CoinApi } from "@/models/coin.ts";
import { CategoryApi } from "@/models/category.ts";

export interface LocalizedString {
    en: string;
}

export interface EventCreateData {
  [key: string]: any;
  id?: string;
  title: LocalizedString | string; // Название события (локализованное)
  description: LocalizedString | string; // Описание события (локализованное)
  date_event: string; // Дата события (ISO 8601)
  proof?: string; // Доказательство (URL или текст)
  user_id?: string; // ID пользователя, создавшего событие

  // Категориb событиz
  categories: CategoryApi[];

  // Связанные токены и монеты
  coins: CoinApi[]; // Список связанных монет

  // Дополнительные поля для категорий
  exchange?: string; // Биржа (Listing)
  trading_pair?: string; // Торговая пара (Listing)
  trading_start_time?: string; // Время начала торгов (Listing)

  participation_requirements?: string; // Требования для участия (Airdrop)
  token_amount?: number; // Количество токенов (Airdrop)
  total_airdrop_pool?: number; // Общий пул (Airdrop)
  distribution_date?: string; // Дата распределения (Airdrop)
  airdrop_link?: string; // Ссылка на airdrop (Airdrop)

  minimum_staking_amount?: number; // Минимальная сумма стейкинга (Staking)
  apy?: number; // Годовая доходность (Staking)
  lock_up_period?: string; // Период блокировки (Staking)
  reward_type?: string; // Тип вознаграждения (Staking)
  withdrawal_conditions?: string; // Условия вывода (Staking)

  changes_updates?: string; // Обновления (Hard Fork)
  required_user_actions?: string; // Действия пользователей (Hard Fork)
  networks_affected?: string; // Затронутые сети (Hard Fork)

  voting_topic?: string; // Тема голосования (Voting)
  staking_requirements?: string; // Требования для голосования (Voting)
  voting_period?: string; // Период голосования (Voting)

  connection_guide?: string; // Гид по подключению (Testnet/Mainnet/Nod)
  key_features?: string; // Основные особенности (Testnet/Mainnet/Nod)
  participation_rewards?: string; // Награды за участие (Testnet/Mainnet/Nod)

  total_supply?: number; // Общий объем предложения (Tokenomics)
  circulating_supply?: number; // Количество в обороте (Tokenomics)
  token_allocation?: string; // Распределение токенов (Tokenomics)
  unlock_schedule?: string; // Расписание разблокировки (Tokenomics)
  token_utility?: string; // Использование токена (Tokenomics)

  parties_involved?: string; // Участники партнерства (Partnerships)
  goals?: string; // Цели партнерства (Partnerships)
  partnership_duration?: string; // Длительность партнерства (Partnerships)

  // Изображение
  image_url?: string; // URL загруженного изображения
  image?: { rawFile: File } | null; // Файл изображения (jpeg/png/webp)
}
