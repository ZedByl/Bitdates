import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { version } from '../package.json';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  setupSwagger(app);

  app.enableCors({
    origin: [process.env.VITE_WEB_APP_URL],
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
