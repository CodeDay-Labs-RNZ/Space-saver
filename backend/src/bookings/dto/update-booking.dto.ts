import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { IsOptional, IsEmail, IsEnum, IsString, IsEmpty, IsBoolean, IsNotEmpty, ValidateNested, IsDateString } from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';


/** 
 * `UpdateBookingDto` data transfer object used for updating an existing booking. 
 * Props: `clientName`, `clientEmail`, `company`,`typeOfSpaceNeeded`, 
 * `bookingStartDate`, `bookingStartTime`, `bookingEndDate`, `bookingEndTime`, and `reminder`. 
 * Class-validator decorators ensure data passed to create a booking is valid. 
 */
export class UpdateBookingDto {
  

  // client details (not editable, data passed to create a booking)
  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client; 

  @IsOptional()
  @IsEmail()
  readonly clientEmail: string;

  @IsOptional()
  @IsString()
  readonly clientName: string;

  @IsString()
  readonly bookingStartDate: string;

  @IsString()
  readonly bookingStartTime: string;

  @IsString()
  readonly bookingEndDate: string;

  @IsString()
  readonly bookingEndTime: string;


  // booking details (data passed to create a booking)
  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  typeOfSpaceNeeded: TypeOfSpaceNeeded;

  @IsBoolean()
  readonly reminder: boolean;


  /* additional fields to be added to the schema:

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BookingDetailsDto)
  readonly bookings: BookingDetailsDto[];
  
  @Prop({ required: true })
  bookingStatus: BookingStatus;

  */

}

