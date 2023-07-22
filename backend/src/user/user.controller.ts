import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  /* inject user service here */
  constructor(private userService: UserService) {}


  /* Get user by id */
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }


  /* Get user by id */
  @Get(':id')
  async findAUser(@Param('id') userId: string): Promise<User | null> {
    return this.userService.findUserById(userId);
  }
  

  /* Post user */
    /* getting user from body of request. user type is of create user dto */
  @Post()
  async createNewUser(
    @Body() 
    user: CreateUserDto
  ): Promise<User> {
    return this.userService.createUser(user);
  }


  /* Update user */
  /* getting user from body of request. user type is of create user dto */
  @Put(':id')
  async createUser(
    @Param('id') 
    id: string,
    @Body() 
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }


  /* Get user by id */
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User | null> {
    return this.userService.deleteUser(userId);
  }


}
