import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator'; 


@Schema({
  timestamps: true,
})
export class User {
  
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


export const UserSchema = SchemaFactory.createForClass(User);