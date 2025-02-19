import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetEventsDto {
  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Maximum number of events per page',
    minimum: 1,
    maximum: 75,
    default: 16,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(75)
  max?: number = 16;

  @ApiPropertyOptional({
    description: 'Start date (format like 2023-11-25)',
  })
  @IsOptional()
  @IsString()
  dateRangeStart?: string;

  @ApiPropertyOptional({
    description: 'End date (format like 2022-11-25)',
  })
  @IsOptional()
  @IsString()
  dateRangeEnd?: string;

  @ApiPropertyOptional({
    description: 'Coins ID (comma-separated or single)',
    example: 'bitcoin,ethereum',
  })
  @IsOptional()
  @IsString()
  coins?: string;

  @ApiPropertyOptional({
    description: 'Categories ID (comma-separated or single)',
  })
  @IsOptional()
  @IsString()
  categories?: string;

  @ApiPropertyOptional({
    description:
      'Sort by specific criteria (hot_events, trending_events, etc.)',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Show only hot_events, trending_events, or significant_events',
  })
  @IsOptional()
  @IsString()
  showOnly?: string;

  @ApiPropertyOptional({
    description: 'Show views or not (true/false)',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  showViews?: boolean;

  @ApiPropertyOptional({
    description: 'Show votes or not (true/false)',
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  showVotes?: boolean;

  @ApiPropertyOptional({
    description: 'Translation language (en, ko, ru, etc.)',
  })
  @IsOptional()
  @IsString()
  translations?: string;
}

export class GetEventsBodyDto {
  @ApiPropertyOptional({
    description: 'Array of numeric IDs to exclude',
    type: [Number],
    example: [1, 2, 15],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  excludeIds?: number[];
}

export class GetEventDto {
  @ApiPropertyOptional({
    description: 'Id event',
  })
  @IsString()
  id?: string;
}

export class GetEventsDBDto {
  @ApiPropertyOptional({
    description: 'Page number',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  _page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limit',
    minimum: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(10)
  _limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort by specific criteria',
    default: 'id',
  })
  @IsOptional()
  @Type(() => String)
  _sort?: string = 'id';

  @ApiPropertyOptional({
    description: 'Order by createdAt',
    default: 'ASC',
  })
  @IsOptional()
  @Type(() => String)
  _order?: string = 'ASC';
}
