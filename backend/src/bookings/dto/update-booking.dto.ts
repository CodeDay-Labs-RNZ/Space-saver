import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { BookingStatus } from '../schemas/bookingDetails.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsEmail, IsEnum, IsString, IsEmpty, IsBoolean, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Client } from '../../auth/schemas/client.schema';
import { BookingDetailsDto } from './booking-details.dto';


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

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BookingDetailsDto)
  bookings?: BookingDetailsDto[];

  /* todo: activate this field when a user has created/updated/deleted a booking */
  /*
  @IsOptional()
  bookingStatus: BookingStatus;
  */

}

