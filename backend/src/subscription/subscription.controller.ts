import {
  Controller,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from '../app/app.service';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from '../db/subscription.entity';
import { SubscriptionDto } from './dtos/subscription.dto';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    @Inject(AppService) private appService: AppService,
  ) {}

  @Post('create')
  @ApiCreatedResponse({
    type: SubscriptionEntity,
    description: 'Successfully created Subscription Email',
  })
  @ApiBody({
    description: 'Создание subscription email user',
    type: SubscriptionDto,
  })
  async create(@Body() body: SubscriptionDto): Promise<SubscriptionEntity> {
    return this.subscriptionService.createSubscriptionEmail(body);
  }

  @ApiBearerAuth('access-token')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.subscriptionService.deleteSubscriptionEmail(id);
  }
}
