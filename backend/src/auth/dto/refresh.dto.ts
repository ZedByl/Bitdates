import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description: 'User Refresh Token',
  })
  @IsString()
  refreshToken: string;
}
