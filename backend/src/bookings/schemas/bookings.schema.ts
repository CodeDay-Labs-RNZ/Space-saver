import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsDateString, IsString, IsEnum, IsEmail, IsNumber, IsDate, IsTimeZone, IsBoolean } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';
import { BookingDetails, BookingDetailsSchema } from './bookingDetails.schema';


export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}

@Schema({
  // creating timestamps for doc in db 
  timestamps: true
})
export class Booking extends Document {
  // associating user with booking details, should be greyed out so it can't be changed
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client; 

  @Prop({ type: String, ref: 'Client', autopopulate: true })
  clientName: string;

  @Prop({ type: String, ref: 'Client', autopopulate: { select: 'email' } })
  @IsEmail()
  clientEmail: string;

  @Prop()
  @IsString()
  company: String;

  @Prop()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  typeOfSpaceNeeded: TypeOfSpaceNeeded;

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
  
  /* todo: need to create a function that calculates the reminder dates and times based on duration */
  @Prop()
  @IsBoolean()
  reminder: boolean;
  


  // @Prop({ type: [BookingDetailsSchema] }) /* embedding booking subdoc as an array */
  // bookings: BookingDetails[];

  /*
  // should also include @IsEmail() for attendees 
  @Prop()
  attendees: string;
  */
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.plugin(require('mongoose-autopopulate'));


