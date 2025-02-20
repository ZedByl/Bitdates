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
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './event.service';
import { Event } from '../db/event.entity';
import {
  GetEventsBodyDto,
  GetEventsDBDto,
  GetEventsDto,
} from './dto/get-events.dto';
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
    if (!body.title) {
      throw new NotFoundException(`Body not found`);
    }

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
    return { body: result };
  }

  @Get()
  async getAllEventsAdmin(@Query() queryDto: GetEventsDBDto) {
    return await this.eventsService.getAllEventsDB(queryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEvent(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Изменение события с загрузкой изображения',
    type: CreateEventDto,
  })
  @UsePipes(new ParseFormDataJsonPipe())
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Param('id', ParseIntPipe) id: string,
    @Body() updateData: Partial<Event>,
  ): Promise<Event> {
    if (image) {
      const domain = this.appService.getDomain();
      updateData.image_url = `${domain}/api/uploads/images/${image.filename}`;
    }

    return this.eventsService.updateEvent(id, updateData);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<{ statusCode: HttpStatus.OK; message: 'Deleted successfully' }> {
    await this.eventsService.deleteEvent(id);
    return { statusCode: HttpStatus.OK, message: 'Deleted successfully' };
  }
}
