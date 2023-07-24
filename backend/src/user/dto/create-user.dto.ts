/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { BookingStatus } from '../schemas/booking.schema';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsNotEmpty, IsString, IsEmpty } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';

/* this will be all the fields expected from user */
export class CreateUserDto {

  /*
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
   */

  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client;

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
  
  @IsString()
  readonly duration: string;  /* You can use a string to represent hours, days, weeks, etc. */
  
  readonly bookingStatus: BookingStatus;


  /* will booking info be needed as dto since user will enter booking info  */
  
}