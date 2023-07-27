/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { BookingStatus } from '../schemas/booking.schema';
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

  @IsNumber()
  readonly price: number;

  @IsDateString()
  readonly bookingStartDate: Date;

  @IsDateString()
  readonly bookingEndDate: Date;

  @IsString()
  readonly duration: string;  /* You can use a string to represent hours, days, weeks, etc. */
  
  readonly bookingStatus: BookingStatus;

  /* will booking info be needed as dto since user will enter booking info  */
  
}