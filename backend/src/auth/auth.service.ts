import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';


@Injectable()
export class AuthService {
  /* creating routes for login/sign-up */

  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
    private jwtService:  JwtService,
  ) {}


  /* signup route */
  async signUp(signUpDto: SignUpDto): Promise<{ token: string, username: string, email: string }> {
    const { name, email, password } = signUpDto;

    // data validation
    if (!name || !email || !password) {
      throw new BadRequestException('Please add all fields');
    }

    // checking if client already exists
    const clientExists = await this.clientModel.findOne({ email });
    if (clientExists) {
      throw new BadRequestException('Client already exists');
    }

    // generate a salt to encrypt password then hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* after hashing password, save client in db */
    const client = await this.clientModel.create({
      name, 
      email, 
      password: hashedPassword,
    })

    /* assigning jwt token to client (sign funct. helps generate jwt token)
      sign funct. will contain payload, client's data that's saved to the token */
    const token = this.jwtService.sign({ 
      id: client._id,
      username: client.name,
      email: client.email
    })

    return { token, username: client.name, email: client.email };
  }


  /* signin route */
  async signIn(signInDto: SignInDto): Promise<{ token: string, username: string, email: string }> {
    const { email, password } = signInDto;

    /* check if client exists thru email */
    const client = await this.clientModel.findOne({ email })
    if (!client) {
      throw new UnauthorizedException('Invalid email or password');
    }

     /* Ensure client has a valid password before attempting to compare */
    if (!client.password) {
      throw new InternalServerErrorException('Client password is missing.');
    }
 
    /* if client exists, check password with password in db */
    const isPasswordMatched = await bcrypt.compare(password, client.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ 
      id: client._id,
      username: client.name,
      email: client.email
    })

    return { token, username: client.name, email: client.email };
  }


  /* adding a set to store blacklisted tokens */
  private readonly blacklistedTokens = new Set<string>();

  /* adding a method to blacklist a token and checking token */
  blacklistToken(token: string): void {
    this.blacklistedTokens.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }


}
