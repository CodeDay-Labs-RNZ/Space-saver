// Services file handles all our logic (get/save data from db, etc.,) 
import { Injectable } from '@nestjs/common';


/* The AppService class is a TypeScript Injectable class that provides a method to return the string
"Hello World!". */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
