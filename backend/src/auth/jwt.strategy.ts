import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema"



@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
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
    
    /* checking if exists and throwing error if doesn't exist */ 
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access')
    }

    return user;
  }

}