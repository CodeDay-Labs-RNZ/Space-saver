import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking.schema'
import mongoose, { Document, Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsEmail } from 'class-validator'; 
import { Client, ClientSchema } from '../../auth/schemas/client.schema';


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


  /* instead of forcing client to enter info, just import client info and post */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client: Client; 

  /* Virtual property for the client's name/email (derived from the client schema) */
  @Prop({ type: String, ref: 'Client', autopopulate: true })
  clientName: string;

  @Prop({ type: String, ref: 'Client', autopopulate: { select: 'email' } })
  @IsEmail()
  clientEmail: string;

  @Prop()
  company: String;

  @Prop()
  @IsEnum(TypeOfSpaceNeeded, { message: 'Please enter valid option'})
  TypeOfSpaceNeeded: TypeOfSpaceNeeded;

  @Prop()
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @Prop({ type: [BookingSchema] }) /* embedding booking subdoc as an array */
  bookings: Booking[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(require('mongoose-autopopulate'));