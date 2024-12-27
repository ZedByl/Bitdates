import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [ImagesController],
  exports: [],
})
export class UploadsModule {}
