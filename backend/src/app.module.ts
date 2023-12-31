/* this file is the main file containing the configuration for the project module
  nest uses modules to structure the project */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';


/* Defining configuration for the main module of the project. 
It is using `@Module()` decorator from the `@nestjs/common` package to define module. */
@Module({
  imports: [
    /* adding configuration to env file by providing file path and allowing global usage */
    ConfigModule.forRoot({
      envFilePath: '../.env', 
      isGlobal: true,
    }),
    /* passing in .env db uri */
    MongooseModule.forRoot(process.env.MONGO_URI),
    // UserModule,
    AuthModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
