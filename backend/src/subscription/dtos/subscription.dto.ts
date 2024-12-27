import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SubscriptionDto {
  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;
}
