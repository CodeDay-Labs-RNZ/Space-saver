/* controller file will handle all incoming request(GET/POST/UPDATE/DELETE,etc.,)..
  ..sending a response back to user from this file */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


/* The AppController class is a TypeScript controller that handles HTTP GET requests and returns a
string response. */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
