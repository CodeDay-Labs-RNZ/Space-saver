import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";
import { Client } from "./schemas/client.schema"
import { AuthService } from "./auth.service";



@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
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
  async validate(payload) {
    /* getting id from token payload */ 
    const { id } = payload;

    /* extract token and check if token is blacklisted */
    // const token = ExtractJwt.fromAuthHeaderAsBearerToken();
    if (this.authService.isTokenBlacklisted(id)) {
      throw new UnauthorizedException('Token has been invalidated')
    }
    
    /* checking if exists and throwing error if doesn't exist */ 
    const client = await this.clientModel.findById(id);

    if (!client) {
      throw new UnauthorizedException('Login first to access')
    }

    return { id: client._id, username: client.name, email: client.email};
  }

}