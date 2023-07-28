/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { BookingStatus } from '../schemas/booking.schema';
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
  
  readonly bookingStatus: BookingStatus;


  /* will booking info be needed as dto since user will enter booking info  */
  
}