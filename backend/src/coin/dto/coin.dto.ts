import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CoinDto {
  @ApiProperty({
    description: 'Уникальный идентификатор монеты (например, "bitcoin")',
    example: 'bitcoin',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Название монеты (например, "Bitcoin")',
    example: 'Bitcoin',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Ранг монеты',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  rank: number;

  @ApiProperty({
    description: 'Индекс популярности или трендов',
    example: 75,
  })
  @IsNotEmpty()
  @IsNumber()
  trending_index: number;

  @ApiProperty({
    description: 'Количество предстоящих событий',
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  upcoming: number;

  @ApiProperty({
    description: 'Символ монеты (например, "BTC")',
    example: 'BTC',
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    description: 'Полное название монеты (например, "Bitcoin (BTC)")',
    example: 'Bitcoin (BTC)',
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;
}
