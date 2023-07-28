/* unit testing for user services */
import { beforeEach, describe } from "node:test";
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, TypeOfSpaceNeeded } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { jest } from '@jest/globals'; 
import { BadRequestException, NotFoundException } from "@nestjs/common";



describe('UserService', () => {
  /* beforeEach will run before every test 
      createTestingModule will compile user controllers/providers/modules */

  let userService: UserService;
  let model: Model<User>;

  const mockUser = {
    /* todo: once schema refactor to include user's name, email, etc., add these fields to this mockUser */
    _id: '64c0bfbfa78ca42759d35e2b',
    booking: [],
    client: {
      _id: '64bed425f327fa20e6bd5ee9',
      name: 'bc',
      email: 'gobcko@gmail.com'
    },
    TypeOfSpaceNeeded: TypeOfSpaceNeeded.ROOMRENTAL,
    price: 110,
  };
  
  const mockUserService = {
    /* this mock service will be passed all functions of a model for specific functions 
    (find/findOne/findById/findByIdAndUpdate/findByIdAndDelete, isValidObjectId, update, create, etc.,)  */
    /* jest.fn() will create our empty function that'll do nothing */
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        /* setting up our UserService model */
        {
          provide: getModelToken(User.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    /*  */
    userService = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  /* with testing, we don't send any request to db and/or we don't 3rd party dependencies (isValidObjectId, findById, etc., (mongoose methods)) 
      instead we'll mock those functions, create fake implementation of those functions/methods */
  

  // describe('findAll', () => {
  //   it('Should return an array of users', async () => {
  //     /* testing resonse of find function by testing find, limit, and skip functions */
  //     const query = { page: '1', keyword: 'test' };

  //     /* creating fake implementaiton of testing functions (find,limit,skip) by chaining
  //      */
  //     jest.spyOn(model, 'find').mockImplementation(
  //       () => 
  //         ({ 
  //             limit: () => ({
  //               skip: jest.fn().mockResolvedValue([mockUser]),
  //             }),
  //           } as any),
  //     );

  //     const result = await userService.findAll(query);

  //     expect(result).toEqual([mockUser]);
  //   });
  // })



  /* with finding the user by their id, there will be three cases to consider (3 diff. unit tests), it'll either... 
      throw a BadRequestException, throw a NotFoundException, or return the user */
  describe('findUserById', () => {

    /** CHECK WHY FAILING test case 1: expecting to get a object with user's info */
    it('should find and return a user by ID', async () => {
      /* we'll spy on function of a model (findById is a function of mongoose model) */
      /* mockResolvedValue() will return resolved value for the function we're checking */
      jest.spyOn(model, 'findById').mockResolvedValue(mockUser);

      /* making a call to findUserById function in userService to find id in our mockUser obj */
      const result = await userService.findUserById(mockUser._id);

      /* making an asseration and an equal statement by matching the result and mongoose model function to mockUser function */
      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
    

    /** CHECK WHY FAILING test case 2: expecting to throw a BadRequestException with provided invalid user id */
    // it('Show throw BadRequestException if invalid ID is passed', async () => {
    //   /* invalid id which we'll pass to 3rd party isValidObjectId mocked function */
    //   const id = 'invalid-id';
    //   /* we're expected to throw a BadRequestException if isValidObjectIdMock is false */
    //   const isValidObjectIdMock = jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
    //   await expect(userService.findUserById(id)).rejects.toThrow(BadRequestException, );

    //   expect(isValidObjectIdMock).toHaveBeenCalledWith(id);
    //   isValidObjectIdMock.mockRestore();
    // });


    /** CHECK WHY FAILING test case 3: expecting to throw a NotFoundException with provided invalid user id */
    // it('Should throw NotFoundException if user is not found', async () => {
    //   jest.spyOn(model, 'findById').mockResolvedValue(null);
    //   await expect(userService.findUserById(mockUser._id)).rejects.toThrow(NotFoundException, );
    //   expect(model.findById).toHaveBeenLastCalledWith(mockUser._id);
    // });

  });
  
});



