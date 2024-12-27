import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetCoinsBodyDto {
  @ApiProperty({
    description: 'Полное название монеты (например, "Bitcoin (BTC)")',
    example: 'Bitcoin (BTC)',
  })
  @IsNotEmpty()
  @IsString()
  search: string;
}
