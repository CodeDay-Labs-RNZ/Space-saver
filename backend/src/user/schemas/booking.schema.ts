import { Prop, SchemaFactory } from '@nestjs/mongoose';

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export class Booking {

  /* use google calendar's api for start/end dates */
  @Prop({ required: true })
  bookingStartDate: Date;

  @Prop({ required: true })
  bookingEndDate: Date;

  @Prop({ required: true })
  duration: string; /* You can use a string to represent hours, days, weeks, etc. */

  @Prop()
  capacity: number;

  @Prop({ required: true })
  bookingStatus: BookingStatus;

  @Prop({ unique: true })
  bookingID: string; /* A unique identifier for each booking */


  /* are below 5 fields necessary? 
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  transactionID: string;

  @Prop()
  paymentMethod: string;
  */

}


export const BookingSchema = SchemaFactory.createForClass(Booking);