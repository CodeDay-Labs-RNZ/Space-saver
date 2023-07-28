import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsString } from 'class-validator';

export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export class Booking {

  /* use google calendar's api for start/end dates or use react calendar picker: 
    https://reactjsexample.com/tag/calendar/
    https://mui.com/x/react-date-pickers/date-calendar/
    https://www.npmjs.com/package/react-calendar */
    
  @Prop({ required: true })
  @IsDateString()
  bookingStartDate: Date;

  @Prop({ required: true })
  @IsDateString()
  bookingEndDate: Date;

  @Prop({ required: true })
  @IsString()
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