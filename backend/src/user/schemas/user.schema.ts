import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema'
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'; 


export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}


@Schema({
  /* creating timestamps for doc in db */
  timestamps: true
})
export class User extends Document {
  
  /* @Prop decorator indicates this prop should be treated as a field in the db schema/document
      can specify data types for each prop. w/out any args, defaults to string. 
      additional options: `{ required: true }` enforces field to be mandatory, `{ unique: true }` enforces uniqueness, `{ default: 'default value' }` default value */


  /* todo: instead of forcing user to enter info, just import user info and post 
      (User naming issue, need to refactor)
      can also add this into create-user-dto
  ex:  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User; 
  */

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: String;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: String;

  @Prop({ required: true })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: String;

  @Prop()
  company: String;

  @Prop()
  TypeOfSpaceNeeded: TypeOfSpaceNeeded;

  @Prop()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @Prop({ type: [BookingSchema] }) /* embedding booking subdoc as an array */
  bookings: Booking[];
}

export const UserSchema = SchemaFactory.createForClass(User);