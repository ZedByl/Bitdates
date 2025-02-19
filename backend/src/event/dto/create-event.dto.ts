import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
  IsDecimal,
} from 'class-validator';
import { CoinDto } from '../../coin/dto/coin.dto';

export class CreateEventDto {
  @ApiProperty({
    description: 'Title in multiple languages, e.g. { "en": "English title" }',
    example: { en: 'My Event' },
  })
  @IsNotEmpty()
  title: Record<string, string>;

  @ApiProperty({
    description:
      'Description in multiple languages, e.g. { "en": "Event details" }',
    example: { en: 'Some details about the event...' },
  })
  @IsNotEmpty()
  description: Record<string, string>;

  @ApiProperty({
    description: 'Array of categories. Each category has an id and a name.',
    example: [
      { id: 1, name: 'Listing' },
      { id: 2, name: 'Airdrop' },
    ],
  })
  @IsArray()
  categories: { id: number; name: string }[];

  @ApiProperty({
    description: 'Date/time of the event in ISO format',
    example: '2024-02-15T10:00:00.000Z',
  })
  @IsDateString()
  date_event: Date;

  @ApiPropertyOptional({
    description: 'Event link',
    example: 'https://example.com/event',
  })
  @IsOptional()
  @IsUrl()
  event_link?: string;

  @ApiPropertyOptional({
    description: 'Proof URL or text',
    example: 'https://example.com/proof',
  })
  @IsOptional()
  @IsUrl()
  proof?: string;

  @ApiPropertyOptional({
    description: 'User id',
    example: 'f19ca049-5b7a-47eb-b140-59c7023f1351',
  })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiPropertyOptional({
    description: 'Image URL for the event',
    example: 'https://example.com/api/uploads/images/event.png',
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Файл изображения, отправляется через multipart/form-data',
  })
  image?: any;

  @ApiPropertyOptional({
    description: 'Информация о монетах',
    type: [CoinDto],
    example: [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        rank: 1,
        trending_index: 75,
        upcoming: 5,
        symbol: 'BTC',
        fullname: 'Bitcoin (BTC)',
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        rank: 2,
        trending_index: 65,
        upcoming: 3,
        symbol: 'ETH',
        fullname: 'Ethereum (ETH)',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  coins?: CoinDto[];

  // 📌 Дополнительные поля для категорий

  // Listing
  @ApiPropertyOptional({
    description: 'Exchange where the listing occurs',
    example: 'Binance',
  })
  @IsOptional()
  @IsString()
  exchange?: string;

  @ApiPropertyOptional({ description: 'Trading pair', example: 'BTC/USDT' })
  @IsOptional()
  @IsString()
  trading_pair?: string;

  @ApiPropertyOptional({
    description: 'Trading start time in ISO format',
    example: '2024-06-01T12:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  trading_start_time?: Date;

  // Airdrop
  @ApiPropertyOptional({
    description: 'Participation requirements',
    example: 'Hold at least 100 USDT',
  })
  @IsOptional()
  @IsString()
  participation_requirements?: string;

  @ApiPropertyOptional({
    description: 'Token amount to be distributed',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  token_amount?: number;

  @ApiPropertyOptional({ description: 'Total airdrop pool', example: 500000 })
  @IsOptional()
  @IsNumber()
  total_airdrop_pool?: number;

  @ApiPropertyOptional({
    description: 'Distribution date',
    example: '2024-07-20T15:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  distribution_date?: Date;

  @ApiPropertyOptional({
    description: 'Airdrop link',
    example: 'https://example.com/airdrop',
  })
  @IsOptional()
  @IsUrl()
  airdrop_link?: string;

  // Staking
  @ApiPropertyOptional({ description: 'Minimum staking amount', example: 50 })
  @IsOptional()
  @IsNumber()
  minimum_staking_amount?: number;

  @ApiPropertyOptional({
    description: 'APY (Annual Percentage Yield)',
    example: 8.5,
  })
  @IsOptional()
  @IsDecimal()
  apy?: number;

  @ApiPropertyOptional({ description: 'Lock-up period', example: '30 days' })
  @IsOptional()
  @IsString()
  lock_up_period?: string;

  @ApiPropertyOptional({ description: 'Reward type', example: 'DOT tokens' })
  @IsOptional()
  @IsString()
  reward_type?: string;

  @ApiPropertyOptional({
    description: 'Withdrawal conditions',
    example: 'After lock-up period',
  })
  @IsOptional()
  @IsString()
  withdrawal_conditions?: string;

  // Hard Fork
  @ApiPropertyOptional({
    description: 'Changes/updates',
    example: 'New block validation rules',
  })
  @IsOptional()
  @IsString()
  changes_updates?: string;

  @ApiPropertyOptional({
    description: 'Required user actions',
    example: 'Update wallet software',
  })
  @IsOptional()
  @IsString()
  required_user_actions?: string;

  @ApiPropertyOptional({
    description: 'Networks affected',
    example: 'Bitcoin mainnet',
  })
  @IsOptional()
  @IsString()
  networks_affected?: string;

  // Voting
  @ApiPropertyOptional({
    description: 'Voting topic',
    example: 'EIP-1559 gas fee update',
  })
  @IsOptional()
  @IsString()
  voting_topic?: string;

  @ApiPropertyOptional({
    description: 'Staking requirements for voting',
    example: 'Must hold at least 32 ETH',
  })
  @IsOptional()
  @IsString()
  staking_requirements?: string;

  @ApiPropertyOptional({
    description: 'Voting period',
    example: '2024-09-20 to 2024-09-30',
  })
  @IsOptional()
  @IsString()
  voting_period?: string;

  // Partnerships
  @ApiPropertyOptional({
    description: 'Parties involved in the partnership',
    example: 'Cardano, Chainlink',
  })
  @IsOptional()
  @IsString()
  parties_involved?: string;

  @ApiPropertyOptional({
    description: 'Goals of the partnership',
    example: 'Improve DeFi capabilities',
  })
  @IsOptional()
  @IsString()
  goals?: string;

  @ApiPropertyOptional({
    description: 'Partnership duration',
    example: '5 years',
  })
  @IsOptional()
  @IsString()
  partnership_duration?: string;
}
