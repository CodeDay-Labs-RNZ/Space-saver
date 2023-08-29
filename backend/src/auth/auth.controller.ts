import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor( private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }


  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }

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
