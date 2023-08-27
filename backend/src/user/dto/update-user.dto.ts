/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { Booking, BookingStatus } from '../schemas/booking.schema';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsString, IsEmpty } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';

/* this will be all the fields expected from user */
export class UpdateUserDto {

  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client;

  /* Optional properties for clientName and clientEmail */ 
  @IsOptional()
  @IsString()
  readonly clientName?: string;

  @IsOptional()
  @IsEmail()
  readonly clientEmail?: string;

  @IsOptional()
  @IsString()
  readonly company: string;

  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;

  @IsOptional()
  bookings?: Booking[];


  /*
  @IsNumber()
  readonly price: number;

  @IsDateString()
  readonly bookingStartDate: Date;

  @IsDateString()
  readonly bookingEndDate: Date;

  @IsString()
  readonly duration: string;  // You can use a string to represent hours, days, weeks, etc. 
  
  readonly bookingStatus: BookingStatus;
  */
  
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
  
  export class UpdateBookingDto {
    
    @IsOptional()
    @IsEmpty({ message: 'Cannot pass client id' })
    readonly client: Client; 

    @IsOptional()
    @IsEmail()
    clientEmail: string;

    @IsOptional()
    @IsString()
    clientName: string;

    @IsOptional()
    readonly company: string;

    @IsOptional()
    @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
    readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;
      
    @IsOptional()
    @IsDate()
    bookingStartDate: Date;

    @IsOptional()
    @IsTimeZone()
    bookingStartTime: string
  
    @IsOptional()
    @IsDate()
    bookingEndDate: Date;

    @IsOptional()
    @IsTimeZone()
    bookingEndTime: string
  
    @IsOptional()
    @IsEmail()
    attendees: string;

    // need to create a function that calculates the reminder dates and times based on duration 
    @IsOptional()
    @IsBoolean()
    reminder: boolean;

    @IsOptional()
    @IsEnum(BookingStatus)
    bookingStatus: BookingStatus;

  }
  
}
*/
