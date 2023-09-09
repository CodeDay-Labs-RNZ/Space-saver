import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';


@Injectable()
/**  
 * AuthService class responsible for creating routes for login/sign-up, 
 * and uses Client model and JwtService for authentication and authorization purposes. 
 * Also responsible for handling authentication and authorization logic. 
 */
export class AuthService {


/**
 * Constructor initializes clientModel and jwtService dependencies.
 * 
 * @param clientModel - `clientModel` is an instance of the `Model<Client>` class. 
 * It interacts with database and perform CRUD operations on the `Client` model.
 * 
 * @param {JwtService} jwtService - `jwtService` is an instance of the `JwtService`class. 
 * It generates and verifyies JSON Web Tokens (JWTs) for authentication and authorization purposes in application. 
 */
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
    private jwtService:  JwtService,
  ) {}


/**
 * Asynchronous function takes in SignUpDto object 
 * and creates a new client in the database, 
 * encrypts the password, generates a JWT token, 
 * and returns the token along with the client's username and email.
 * 
 * @param {SignUpDto} signUpDto - `signUpDto` object contains the client data
 * properties: name, email, and password.
 * 
 * @returns object with the properties `token`, `username`, and `email`.
 */
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

    // after hashing password, save client in db 
    const client = await this.clientModel.create({
      name, 
      email, 
      password: hashedPassword,
    })

    // assigning jwt token to client (sign funct. helps generate jwt token)
    // sign funct. will contain payload, client's data that's saved to the token 
    const token = this.jwtService.sign({ 
      id: client._id,
      username: client.name,
      email: client.email
    })

    return { token, username: client.name, email: client.email };
  }


/**
 * SignIn function takes in SignInDto object 
 * containing email and password, checks if client with email exists,
 * verifies password, and returns a token, username, and email if successful.
 * 
 * @param {SignInDto} signInDto - `signInDto` object contains props
 * Props: email and password.
 * 
 * @returns object with three properties: token, username, email 
 */
  async signIn(signInDto: SignInDto): Promise<{ token: string, username: string, email: string }> {
    const { email, password } = signInDto;

    // check if client exists thru email 
    const client = await this.clientModel.findOne({ email })
    if (!client) {
      throw new UnauthorizedException('Invalid email or password');
    }

     // Ensure client has a valid password before attempting to compare 
    if (!client.password) {
      throw new InternalServerErrorException('Client password is missing.');
    }
 
    // if client exists, check password with password in db 
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


  // adding a set to store blacklisted tokens 
  private readonly blacklistedTokens = new Set<string>();

/**
 * Function adds token to set of blacklisted tokens.
 * 
 * @param {string} token - `token` represents token that needs to be added to blacklist.
 */
  blacklistToken(token: string): void {
    this.blacklistedTokens.add(token);
  }

/**
 * Function checks if a given token is blacklisted.
 * 
 * @param {string} token - `token`represents a token
 * 
 * @returns a boolean value.
 */
  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.has(token);
  }


}
