import { IsDateString, IsString, IsBoolean, IsEmail } from 'class-validator';

export class BookingDetailsDto {
  @IsDateString()
  readonly bookingStartDate: string;

  @IsString()
  // todo: get the timezone for user, @IsTimeZone() 
  readonly bookingStartTime: string;

  @IsDateString()
  readonly bookingEndDate: string;

  @IsString()
  // todo: get the timezone for user, @IsTimeZone() 
  readonly bookingEndTime: string;

  @IsBoolean()
  /* todo: need to create a function that calculates the reminder dates and times based on duration */
  readonly reminder: boolean;

  
  /*
  @IsEmail()
  // todo: include @IsEmail() for extra attendees 
  readonly attendees: string;
  */
}