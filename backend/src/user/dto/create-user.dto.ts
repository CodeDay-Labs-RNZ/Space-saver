/* data transfer object(dto), will ensure that user has correct data type when passing data thru body */

import { TypeOfSpaceNeeded } from '../schemas/user.schema'
import { BookingStatus } from '../schemas/booking.schema'

/* this will be all the fields expected from user */
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly typeOfSpaceNeeded: TypeOfSpaceNeeded;
  readonly price: number;
  readonly bookingStartDate: Date;
  readonly bookingEndDate: Date;
  /* You can use a string to represent hours, days, weeks, etc. */
  readonly duration: string; 
  readonly bookingStatus: BookingStatus;


  /* will booking info be needed as dto since user will enter booking info  */
  
}