import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";
import { Client } from "./schemas/client.schema"
import { AuthService } from "./auth.service";



@Injectable() 
/* The JwtStrategy class is a Passport strategy that extracts the bearer token from the request header
and uses it to authenticate and authorize clients using JSON Web Tokens (JWTs). */
export class JwtStrategy extends PassportStrategy(Strategy) {


/**
 * Constructor initializes authentication strategy for JWT tokens in TypeScript application.
 * 
 * @param clientModel - `clientModel` is an instance of `Model<Client>` class. 
 * Used to interact with database and perform CRUD operations on the `Client` model. 
 * Using `@InjectModel(Client.name)` decorator, provided by NestJS.
 * 
 * @param {AuthService} authService - `authService` is an instance of the `AuthService` class.
 * Injected into constructor using dependency injection,
 * allowing class to have access to the methods and properties of the `AuthService` class
 * Typically used for authentication and authorization purposes.
 */
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<Client>,
    private readonly authService: AuthService
  ) {
    super({
      /* extracting bearer header from token */ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    })
  }


  /* overwriting validate function */
/**
 * Function validates a payload by checking if token is blacklisted 
 * and if the client exists, and returns the client's id, username, and email.
 * 
 * @param payload - payload object contains information extracted from a token. 
 * Payload is expected to have a property called id, name, emial,
 * 
 * @returns object with the properties "id", "username", and "email". 
 * Values are obtained from "client" object.
 */
  async validate(payload) {

    // getting id from token payload 
    const { id } = payload;

    // extract token and check if token is blacklisted 
    // const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    if (this.authService.isTokenBlacklisted(id)) {
      throw new UnauthorizedException('Token has been invalidated')
    }
    
    // checking if exists and throwing error if doesn't exist 
    const client = await this.clientModel.findById(id);

    if (!client) {
      throw new UnauthorizedException('Login first to access')
    }

    return { id: client._id, username: client.name, email: client.email};
    
  }

}