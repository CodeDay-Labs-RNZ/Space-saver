import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schemas/bookings.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ClientSchema } from 'src/auth/schemas/client.schema';

@Module({
  /* registering our model by importing userschema */
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: 'Booking', schema: BookingSchema},
      {name: 'Client', schema: ClientSchema}
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
