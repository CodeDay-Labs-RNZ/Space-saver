import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';


/**
 * BookingStatus string constants representing possible status values for a booking: 
 * `ROOMRENTAL`, `DESKRENTAL`, `FLOORRENTAL`. 
*/
export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}


export class 

/**  
 * `BookingDetails` class represents details of booking. 
 * Props`bookingStartDate`, `bookingStartTime`, `bookingEndDate`, `bookingEndTime`, 
 * `attendees`, and `reminder`.  
 * Props define necessary info for a booking, the start and end dates/times, 
 * the attendees, and whether a reminder should be set. 
 */

BookingDetails {
      
  @Prop({ required: true })
  bookingStartDate: string;

  @Prop({ required: true })
  bookingStartTime: string

  @Prop({ required: true })
  bookingEndDate: string;

  @Prop({ required: true })
  bookingEndTime: string

  @Prop()
  attendees: string;

  @Prop()
  @IsBoolean()
  reminder: boolean;

}

export const BookingDetailsSchema = SchemaFactory.createForClass(BookingDetails);