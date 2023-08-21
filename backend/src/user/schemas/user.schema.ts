import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema'
import mongoose, { Document, Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsEmail, IsBoolean, IsTimeZone, IsDate } from 'class-validator'; 
import { Client, ClientSchema } from '../../auth/schemas/client.schema';

export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}

@Schema({
  /* creating timestamps for doc in db */
  timestamps: true
})
export class User extends Document {
  /* @Prop decorator indicates this prop should be treated as a field in the db schema/document
      can specify data types for each prop. w/out any args, defaults to string. 
      additional options: `{ required: true }` enforces field to be mandatory, `{ unique: true }` enforces uniqueness, `{ default: 'default value' }` default value */


  /* instead of forcing client to enter info, just import client info and post */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client; 

  /* Virtual property for the client's name/email (derived from the client schema) */
  @Prop({ type: String, ref: 'Client', autopopulate: true })
  clientName: string;

  @Prop({ type: String, ref: 'Client', autopopulate: { select: 'email' } })
  @IsEmail()
  clientEmail: string;

  @Prop()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  TypeOfSpaceNeeded: TypeOfSpaceNeeded;

  @Prop({ type: [BookingSchema] }) /* embedding booking subdoc as an array */
  bookings: Booking[];

  
  @Prop()
  company: String;

  @Prop()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
    


}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(require('mongoose-autopopulate'));






/* imports
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsDateString, IsString, IsEnum, IsEmail, IsNumber } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';
*/
/*
{

  // setting up schema for booking/bookking details 

  export enum TypeOfSpaceNeeded {
    ROOMRENTAL = 'Rent A Room',
    DESKRENTAL = 'Rent A Desk',
    FLOORRENTAL = 'Rent A Floor',
  }

  export enum BookingStatus {
    CONFIRMED = 'Confirmed',
    PENDING = 'Pending',
    CANCELLED = 'Cancelled',
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
    TypeOfSpaceNeeded: TypeOfSpaceNeeded;

    @Prop() 
    bookingsDetails: {
      
      @Prop({ required: true })
      @IsDate()
      bookingStartDate: Date;
  
      @Prop({ required: true })
      @IsTimeZone()
      bookingStartTime: string
    
      @Prop({ required: true })
      @IsDate()
      bookingEndDate: Date;
  
      @Prop({ required: true })
      @IsTimeZone()
      bookingEndTime: string
    
      @Prop()
      @IsEmail()
      attendees: string;
  
      // need to create a function that calculates the reminder dates and times based on duration 
      @Prop()
      @IsBoolean()
      reminder: boolean;

      @Prop({ required: true })
      bookingStatus: BookingStatus;

    };
  }

  export const BookingSchema = SchemaFactory.createForClass(Booking);
  BookingSchema.plugin(require('mongoose-autopopulate'));
  
}
*/
