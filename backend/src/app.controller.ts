import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* controller file will handle all incoming request(GET/POST/UPDATE/DELETE,etc.,)..
  ..sending a response back to user from this file */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
