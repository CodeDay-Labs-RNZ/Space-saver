import { Injectable } from '@nestjs/common';

/* services file handles all our logic (get/save data from db, etc.,) */

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
