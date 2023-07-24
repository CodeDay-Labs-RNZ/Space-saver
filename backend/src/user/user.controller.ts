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


  /* Get user by id */
  @Get()
  async findAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.findAll(query);
  }


  /* Get user by id */
  @Get(':id')
  async findAUser(@Param('id') userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }
  

  /* Post user */
    /* getting user from body of request. user type is of create user dto */
    /* protecting account creation route using guards */
  @Post()
  @UseGuards(AuthGuard())
  async createNewUser(@Body() user: CreateUserDto, @Req() req): Promise<User> {
    return this.userService.createUser(user, req.user);
  }


  /* Update user */
  /* getting user from body of request. user type is of create user dto */
  @Put(':id')
  async createUser(@Param('id') id: string, 
                  @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, user);
  }


  /* Get user by id */
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteUser(userId);
  }

}
