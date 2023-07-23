import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';


@Injectable()
export class AuthService {
  /* creating routes for login/sign-up */

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService:  JwtService,
  ) {}


  /* signup route */
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    // data validation
    if (!name || !email || !password) {
      throw new BadRequestException('Please add all fields');
    }

    // checking if user already exists
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // generate a salt to encrypt password then hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* after hashing password, save user in db */
    const user = await this.userModel.create({
      name, 
      email, 
      password: hashedPassword,
    })

    /* assigning jwt token to user (sign funct. helps generate jwt token)
      sign funct. will contain payload, user's data that's saved to the token */
    const token = this.jwtService.sign({ id: user._id })

    return { token };
  }


  /* signin route */
  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    /* check if user exists thru email */
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

     /* Ensure user has a valid password before attempting to compare */
    if (!user.password) {
      throw new InternalServerErrorException('User password is missing.');
    }

    /* if user exists, check password with password in db */
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id })

    return { token };
  }


}
