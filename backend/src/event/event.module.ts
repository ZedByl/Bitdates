import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './event.service';
import { EventsController } from './event.controller';
import { Event } from '../db/event.entity';
import { Coin } from '../db/coin.entity';
import { AppModule } from '../app/app.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ParseFormDataJsonPipe } from '../utils/parseFormDataJsonPipe';

@Module({
  imports: [
    forwardRef(() => AppModule),
    TypeOrmModule.forFeature([Event, Coin]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  providers: [EventsService, ParseFormDataJsonPipe],
  controllers: [EventsController],
})
export class EventsModule {}
