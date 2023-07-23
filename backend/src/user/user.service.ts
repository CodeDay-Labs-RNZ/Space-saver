import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'express-serve-static-core';


@Injectable()
export class UserService {
  /* creating constructor to inject our model for getting/using data from db */
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}


  /* find all user */
  async findAll(query: Query): Promise<User[]> {
    /* pagination funcationality breaking up content blocks into navigable pgs */
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    /* querying functionality for finding user by email using regex, 
        if not found return empty object */ /* $options: 'i' (case insensitive)  */
    const keyword = query.keyword ? {
      email: {
        $regex: query.keyword,
        $options: 'i'
      }
    } : {}

    const users = await this.userModel.find({ ...keyword }).limit(resPerPage).skip(skip);
    return users;
  }


  /* find user */
  async findUserById(userId: string): Promise<User> {
    /* validating user */
    const isValidId = mongoose.isValidObjectId(userId);
    if (!isValidId) {
      throw new BadRequestException("Please enter correct id")
    } 
    /* checking for user */
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found")
    } 
    return user;
  }

  
  /* creating a user */
  async createUser(user: CreateUserDto): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }


  /* update user */
  async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, user, {
      new: true,
      reunValidators: true,
    });
  }


  /* delete user */
  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId);
  }
  


}
