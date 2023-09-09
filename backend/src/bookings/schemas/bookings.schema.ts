import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsString, IsEnum, IsEmail, IsBoolean } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';


/**
 * BookingStatus string constants representing possible status values for a booking: 
 * `ROOMRENTAL`, `DESKRENTAL`, `FLOORRENTAL`. 
export enum BookingStatus {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}
*/


/**
 * TypeOfSpaceNeeded string constants needed for a booking: 
 * `ROOMRENTAL`, `DESKRENTAL`, `FLOORRENTAL`. 
*/
export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}


@Schema({
  // created/updated timestamps 
  timestamps: true
})

/** 
 * `Booking` class represents booking document in database  
 * defined by mongoose schema using the `@nestjs/mongoose` package. 
 * Props: client details, company, type of space needed, 
 * booking dates and times, and reminder flag. 
 * Extends `Document` class, indicating  document representation in database. 
*/

export class 
Booking extends Document {

  
  // client details (not editable)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client; 

  @Prop({ type: String, ref: 'Client', autopopulate: true })
  clientName: string;

  @Prop({ type: String, ref: 'Client', autopopulate: { select: 'email' } })
  @IsEmail()
  clientEmail: string;


  // booking details (editable)
  @Prop()
  @IsString()
  company: String;

  @Prop()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  typeOfSpaceNeeded: TypeOfSpaceNeeded;

  @Prop({ required: true })
  bookingStartDate: string;

  @Prop({ required: true })
  bookingStartTime: string

  @Prop({ required: true })
  bookingEndDate: string;

  @Prop({ required: true })
  bookingEndTime: string
  

  // todo:  create a function calculating the reminder dates/times based on users reminder selection. 
  //        (ex: remind in: 5 days before, 1 day before, 1 hour before, 15 minutes before)
  @Prop()
  @IsBoolean()
  reminder: boolean;
  

  /* additional fields to be added to the schema:

  // comma-separated list of emails (send emails to all attendees)
  @Prop()
  attendees: string; 

  // enum field checking booking status (update field based on users booking status created: bookging=true, updated: bookging=true, deleted: bookging=true )
  @Prop({ required: true })
  bookingStatus: BookingStatus; 
  
  */
  
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.plugin(require('mongoose-autopopulate'));

