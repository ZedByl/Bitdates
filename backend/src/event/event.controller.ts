import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  Inject,
  UsePipes,
  Req,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { Event } from '../db/event.entity';
import { GetEventsBodyDto, GetEventsDto } from './dto/get-events.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../app/app.service';
import { ParseFormDataJsonPipe } from '../utils/parseFormDataJsonPipe';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    @Inject(AppService) private appService: AppService,
  ) {}

  @Post('create')
  @ApiCreatedResponse({
    type: Event,
    description: 'Successfully created Event',
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Создание события с загрузкой изображения',
    type: CreateEventDto,
  })
  @UsePipes(new ParseFormDataJsonPipe())
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreateEventDto,
  ): Promise<Event> {
    if (image) {
      const domain = this.appService.getDomain();
      body.image_url = `${domain}/api/uploads/images/${image.filename}`;
    }

    return this.eventsService.createEvent(body);
  }

  @Post()
  async getAllEvents(
    @Query() queryDto: GetEventsDto,
    @Body() bodyDto: GetEventsBodyDto,
  ) {
    const result = await this.eventsService.getAllEvents(queryDto, bodyDto);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    console.log(123);
    return this.eventsService.getEvent(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateData: Partial<Event>,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateData);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @Req() req: any,
  ): Promise<void> {
    return this.eventsService.deleteEvent(id, req?.userId);
  }
}
