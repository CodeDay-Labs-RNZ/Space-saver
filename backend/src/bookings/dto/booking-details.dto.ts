import { IsDateString, IsString, IsBoolean } from 'class-validator';


/** 
 * `BookingDetailsDto` data transfer object used for creating/updating new/existing booking. 
 * Props: `bookingStartDate`, `bookingStartTime`, `bookingEndDate`, `bookingEndTime`, and `reminder`. 
 * Class-validator decorators ensure data passed to create a booking is valid. 
 */
export class BookingDetailsDto {

  @IsDateString()
  readonly bookingStartDate: string;

  @IsString()
  readonly bookingStartTime: string;

  @IsDateString()
  readonly bookingEndDate: string;

  @IsString()
  readonly bookingEndTime: string;

  @IsBoolean()
  readonly reminder: boolean;

}