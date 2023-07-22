import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
  /* creating constructor to inject our model for getting/using data from db */
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}


  // find all user
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }


  // find user
  async findUserById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId);
    // checking for user
    if (!user) {
      throw new NotFoundException("User not found")
    } 
    return user || null;
  }

  
  // creating a user
  async createUser(user: CreateUserDto): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }


  // update user
  async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
    // updating user info
    return await this.userModel.findByIdAndUpdate(userId, user, {
      new: true,
      reunValidators: true,
    });
  }


  // delete user
  async deleteUser(userId: string): Promise<User> {
    // delete user 
    return await this.userModel.findByIdAndDelete(userId);
  }
  


}
