import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDateString, IsEmail, IsTimeZone, IsBoolean, IsString } from 'class-validator';


export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export class BookingDetails {
      
  @Prop({ required: true })
  /* todo: get the date as a string from user, @IsDateString() */
  bookingStartDate: string;

  @Prop({ required: true })
  /* todo: get the timezone for user, change @IsString() to @IsTimeZone() */
  bookingStartTime: string

  @Prop({ required: true })
  bookingEndDate: string;

  @Prop({ required: true })
  /* todo: get the timezone for user, change @IsString() to @IsTimeZone() */
  bookingEndTime: string

  @Prop()
  /* should also include @IsEmail() for attendees */
  attendees: string;

  /* todo: need to create a function that calculates the reminder dates and times based on duration */
  @Prop()
  @IsBoolean()
  reminder: boolean;

  /* todo: activate this field when a user has created/updated/deleted a booking */
  /*
  @Prop({ required: true })
  bookingStatus: BookingStatus;
  */

}

export const BookingDetailsSchema = SchemaFactory.createForClass(BookingDetails);