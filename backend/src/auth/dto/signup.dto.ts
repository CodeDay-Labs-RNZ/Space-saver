import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


/**
 * SignUpDto TypeScript class represents data transfer object for signing up,
 * Props: name, email, password. 
 */
export class SignUpDto{
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

}