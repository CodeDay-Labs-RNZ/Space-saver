import { TypeOfSpaceNeeded } from '../schemas/bookings.schema';
import { IsOptional, IsEmail, IsEnum, IsNotEmpty, IsString, IsEmpty, IsBoolean} from 'class-validator';
import { Client } from '../../auth/schemas/client.schema';


export class 

/** 
 * `CreateBookingDto` data transfer object used for creating a new booking. 
 * Props: `clientName`, `clientEmail`, `company`,`typeOfSpaceNeeded`, 
 * `bookingStartDate`, `bookingStartTime`, `bookingEndDate`, `bookingEndTime`, and `reminder`. 
 * Class-validator decorators ensure data passed to create a booking is valid. 
 */
CreateBookingDto {
  

  // client details (not editable, data passed to create a booking)
  @IsEmpty({ message: 'Cannot pass client id' })
  readonly client: Client; 
  
  @IsOptional()
  @IsString()
  clientName: string;

  @IsOptional()
  @IsEmail()
  clientEmail: string;

  @IsString()
  readonly bookingStartDate: string;

  @IsString()
  readonly bookingStartTime: string;

  @IsString()
  readonly bookingEndDate: string;

  @IsString()
  readonly bookingEndTime: string;


  // booking details (editable, data passed to create a booking)
  @IsOptional()
  @IsString()
  readonly company: string;

  @IsNotEmpty()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;

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

