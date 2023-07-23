/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema';
import { BookingStatus } from '../schemas/booking.schema';
import { IsOptional, IsEmail, IsEnum, IsDateString, IsNumber, IsString } from 'class-validator';

/* this will be all the fields expected from user */
export class UpdateUserDto {

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly company: string;

  @IsOptional()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsDateString()
  readonly bookingStartDate: Date;

  @IsOptional()
  @IsDateString()
  readonly bookingEndDate: Date;
  
  @IsOptional()
  @IsString()
  readonly duration: string;  /* You can use a string to represent hours, days, weeks, etc. */
  
  readonly bookingStatus: BookingStatus;


  /* will booking info be needed as dto since user will enter booking info  */
  
}