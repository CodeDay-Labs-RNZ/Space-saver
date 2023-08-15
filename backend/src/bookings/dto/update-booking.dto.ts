import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { BookingStatus } from '../schemas/bookingDetails.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsString, IsEmpty, isEmail, IsDate, IsTimeZone, IsBoolean } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';


export class UpdateBookingDto {
  
  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client; 

  @IsOptional()
  @IsEmail()
  readonly clientEmail: string;

  @IsOptional()
  @IsString()
  readonly clientName: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  typeOfSpaceNeeded: TypeOfSpaceNeeded;
    
  @IsOptional()
  @IsString()
  bookingStartDate: string;

  @IsOptional()
  @IsTimeZone()
  bookingStartTime: string

  @IsOptional()
  @IsString()
  bookingEndDate: string;

  @IsOptional()
  @IsTimeZone()
  bookingEndTime: string

  @IsOptional()
  @IsEmail()
  attendees: string;

  /* need to create a function that calculates the reminder dates and times based on duration */
  @IsOptional()
  @IsBoolean()
  reminder: boolean;

  /* todo: activate this field when a user has created/updated/deleted a booking */
  /*
  @IsOptional()
  bookingStatus: BookingStatus;
  */

}

