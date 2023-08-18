import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  /* inject user service here */
  constructor(private userService: UserService) {}


  /* GET, all users */
  @Get()
  async findAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }


  /* GET, user by id */
  @Get(':id')
  async findAUser(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }
  

  /* POST, create new user */
    /* getting user from body of request. user type is of create user dto */
    /* protecting account creation route using guards */
  @Post()
  @UseGuards(AuthGuard())
  async createNewUser(@Body() user: CreateUserDto, 
                      @Req() req): Promise<{ message: string, user: User }> {
    const newUser = await this.userService.createUser(user, req.user);
    return {message: 'New user created', user: newUser };
  }


  /* PUT, update user by id */
  /* getting user from body of request. user type is of create user dto */
  @Put(':id')
  async updateUser(@Param('id') id: string, 
                  @Body() user: UpdateUserDto): Promise<{ message: string, user: User }> {
    const updatedUser = await this.userService.updateUserById(id, user);
    return { message: 'User updated successfully', user: updatedUser };
  }


  /* DELETE, user by id */
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<{ message: string, user: User }> {
    const deletedUser = await this.userService.deleteUserById(userId);
    return { message: 'User deleted successfully', user: deletedUser };
  }

}


/*  
import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
*/

/*
// need to change words user to booking

@Controller('user')
export class BookingController {
  // inject user service here 
  constructor(private userService: UserService) {}


  // Get users
  @Get()
  async findAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }


  // Get user by id 
  @Get(':id')
  async findAUser(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }
  

  // Post user 
    // getting user from body of request. user type is of create user dto 
    // protecting account creation route using guards 
  @Post()
  @UseGuards(AuthGuard())
  async createNewUser(@Body() user: CreateUserDto, @Req() req): Promise<User> {
    return this.userService.createUser(user, req.user);
  }


  // Update user by id
  // getting user from body of request. user type is of create user dto 
  @Put(':id')
  async createUser(@Param('id') id: string, 
                  @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }


  // Delete user by id 
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }

} 

*/