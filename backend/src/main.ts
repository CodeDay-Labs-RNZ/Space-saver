import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // when passing a type to NestFactory.create() method.. 
  // ..the app object will have methods available exclusively for that specific platform 
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
