import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { BookingStatus } from '../schemas/bookingDetails.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsEmail, IsEnum, IsNotEmpty, IsString, IsEmpty, IsBoolean, ValidateNested } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';
import { BookingDetailsDto } from './booking-details.dto';
import { Type } from 'class-transformer';


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
    
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BookingDetailsDto)
  readonly bookings: BookingDetailsDto[];

  /* todo: activate this field when a user has created/updated/deleted a booking */
  /*
  @Prop({ required: true })
  bookingStatus: BookingStatus;
  */

}

