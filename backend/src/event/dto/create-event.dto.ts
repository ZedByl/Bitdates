import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
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
      { id: 1, name: 'Category A' },
      { id: 2, name: 'Category B' },
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
    description: 'Proof URL or text',
    example: 'https://example.com/proof',
  })
  @IsOptional()
  @IsString()
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
    example:
      'https://example.com/api/uploads/images/1735121615732-794412657.png',
  })
  @IsOptional()
  @IsString()
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
}
