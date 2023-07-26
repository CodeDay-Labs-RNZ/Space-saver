import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'express-serve-static-core';
import { Client } from '../auth/schemas/client.schema';


@Injectable()
export class UserService {
  /* creating constructor to inject our model for getting/using data from db */
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Client.name)
    private clientModel: mongoose.Model<Client>,
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

    console.log(users);
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
    console.log(user);
    return user;
  }
 
  
  /* creating a user */
  async createUser(newUserDto: CreateUserDto, client: Client): Promise<User> {
    /* checking if user exists in db and throwing error (or returning existing user) */
    const existingUser = await this.userModel.findOne({ 'clientEmail': newUserDto.clientEmail });
    if (existingUser) {
      throw new Error('User with this email already exists.');
      /* Alternatively, return existing user: return existingUser; */
    }
    /*  Create newUser object and set the properties from the dto */
    const newUser = new this.userModel();
    newUser.client = client._id;
    newUser.company = newUserDto.company;
    newUser.TypeOfSpaceNeeded = newUserDto.typeOfSpaceNeeded;
    newUser.price = newUserDto.price;
    newUser.bookings = [];
    /* Save new user to db and populate clientName/clientEmail fields, then return */
    await newUser.save();
    const populatedUser = await this.userModel
      .findOne({ _id: newUser._id })
      .populate({ path: 'client', select: 'name email' })
      .exec();

    console.log(populatedUser)
    return populatedUser;
  }


  /* update user */
  async updateUserById(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    /*  Update user with the updated dto, then check if user exists in db */
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { 
      new: true, 
      runValidators: true 
    }).exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    /* once user is updated, populate clientName/clientEmail fields, then return */
    const populatedUser = await this.userModel
    .findOne({ _id: updatedUser._id })
    .populate({ path: 'client', select: 'name email' })
    .exec();

    console.log(populatedUser)
    return populatedUser;
  }



  /* delete user */
  async deleteUserById(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException("User not found");
    }
    console.log(deletedUser)
    return deletedUser;
  }
  
}
