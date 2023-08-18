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

  @Prop({ type: [BookingDetailsSchema] }) /* embedding booking subdoc as an array */
  bookings: BookingDetails[];
  
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.plugin(require('mongoose-autopopulate'));


