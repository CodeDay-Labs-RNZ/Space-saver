/* this file is the entry point into backend */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config(); /* loading environment variables from .env file */
  
  /* when passing a type to NestFactory.create() method.. 
  ..the app object will have methods available exclusively for that specific platform */
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('BACKENDPORT');

  app.useGlobalPipes(new ValidationPipe())

  /* enabling cors for all routes */
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
