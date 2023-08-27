import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { BookingStatus } from '../schemas/bookingDetails.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsNotEmpty, IsString, IsEmpty, isEmail, IsDate, IsTimeZone, IsBoolean } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';


export class CreateBookingDto {
  
  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client; 
  
  @IsOptional()
  @IsString()
  clientName: string;

  @IsOptional()
  @IsEmail()
  clientEmail: string;

  @IsOptional()
  @IsString()
  readonly company: string;

  @IsNotEmpty()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;
    
  /* booking details */
  @Prop({ required: true })
  /* todo: get the date as a string from user, @IsDateString() */
  readonly bookingStartDate: string;

  @Prop({ required: true })
  /* todo: get the timezone for user, @IsTimeZone() */
  readonly bookingStartTime: string

  @Prop({ required: true })
  /* todo: get the date as a string from user, @IsDateString() */
  readonly bookingEndDate: string;

  @Prop({ required: true })
  /* todo: get the timezone for user, @IsTimeZone() */
  readonly bookingEndTime: string

  @IsOptional()
  /*  todo: include @IsEmail() for extra attendees */
  readonly attendees: string;

  /* todo: need to create a function that calculates the reminder dates and times based on duration */
  @IsOptional()
  @IsBoolean()
  readonly reminder: boolean;

  /* todo: activate this field when a user has created/updated/deleted a booking */
  /*
  @Prop({ required: true })
  bookingStatus: BookingStatus;
  */

}

