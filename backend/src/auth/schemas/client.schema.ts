import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator'; 
import { Document } from 'mongoose';

export enum ClientRole {
  ADMIN = 'Admin',
  USER = 'User'
}

@Schema({
  timestamps: true,
})
export class Client extends Document {
  
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  @IsNotEmpty({ message: 'Please add a password' })
  password: string;

  @Prop({ type: String, enum: ClientRole, default: ClientRole.USER })
  role: ClientRole;


}


export const ClientSchema = SchemaFactory.createForClass(Client);