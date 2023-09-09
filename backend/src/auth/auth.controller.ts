import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request, Response } from 'express';


/* The AuthController class is a controller responsible for handling authentication-related requests. */
@Controller('auth')
export class AuthController {

  /**
   * Constructor takes an instance of AuthService class and assigns to private authService property.
   * 
   * @param {AuthService} authService - authService is an instance of AuthService class
   * Private property of the constructor. Can only be accessed within class.
   */
  constructor( private authService: AuthService) {}


// @Post('/signup') defines/handles post routes for creating new users '/auth/signup' endpoint 
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string, username: string, email: string }> {
    return this.authService.signUp(signUpDto);
  }


// @Post('/signin') defines/handles post routes for signing in new users '/auth/signin' endpoint 
  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string, username: string, email: string }> {
    return this.authService.signIn(signInDto);
  }


// @Post('/signout') defines/handles post routes for signing out new users '/auth/signout' endpoint 
  @Post('/signout')
  signout(@Req() req: Request, @Res() res: Response): Response {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      this.authService.blacklistToken(token);
      return res.status(200).json({ message: 'Logged out successfully' });
    }

    return res.status(400).json({ message: 'No token provided' });
  }

}
