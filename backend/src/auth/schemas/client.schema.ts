import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator'; 
import { Document } from 'mongoose';


@Schema({
  timestamps: true,
})
export class Client extends Document {
  
  @Prop({ required: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsNotEmpty({ message: 'Please add a password' })
  @IsString()
  password: string;

}


export const ClientSchema = SchemaFactory.createForClass(Client);