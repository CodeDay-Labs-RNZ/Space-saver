import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


/**
 * SignInDto TypeScript class represents data transfer object for signing in,
 * Props: email, password. 
 */
export class SignInDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

}