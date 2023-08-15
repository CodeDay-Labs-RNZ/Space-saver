/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { Booking, BookingStatus } from '../schemas/booking.schema';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsNotEmpty, IsString, IsEmpty, isEmail } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';
import mongoose from 'mongoose';
import { Prop } from '@nestjs/mongoose';

/* this will be all the fields expected from user */
export class CreateUserDto {
  
  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client; 

  clientEmail: string;

  clientName: string;

  @IsOptional()
  readonly company: string;

  @IsNotEmpty()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsDateString()
  readonly bookingStartDate: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly bookingEndDate: Date;
  
  @IsNotEmpty()
  @IsString()
  readonly duration: string;  /* You can use a string to represent hours, days, weeks, etc. */

  @IsOptional()
  bookings?: Booking[];
  
  readonly bookingStatus: BookingStatus;


  /* will booking info be needed as dto since user will enter booking info  */
  
}



/* imports
import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { BookingStatus } from '../schemas/booking.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsNotEmpty, IsString, IsEmpty, isEmail } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';
*/
/*
{

  // setting up dto's for booking/bookking details 
  
  export class CreateBookingDto {
    
    @IsEmpty({ message: 'Cannot pass client id' })
    readonly client: Client; 

    @IsEmail()
    clientEmail: string;

    @IsString()
    clientName: string;

    @IsOptional()
    @IsString()
    readonly company: string;

    @IsNotEmpty()
    @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
    readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;
      
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

    @IsEnum(BookingStatus)
    bookingStatus: BookingStatus;

  }
  
}
*/
