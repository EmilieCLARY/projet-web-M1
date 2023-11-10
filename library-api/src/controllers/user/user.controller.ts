import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/user/user.presenter';
import { UserId } from 'library-api/src/entities';
import { PlainUserModel, UserModel } from 'library-api/src/models';
import { UserUseCases } from 'library-api/src/useCases';

// Define a controller for the 'user' route
@Controller('user')
export class UserController {
  // Inject the UserUseCases service into the controller
  constructor(private readonly userUseCases: UserUseCases) {}

  // Define a GET route for '/'
  // This route will return all users
  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    // Get all users from the use case
    const user = await this.userUseCases.getAllPlain();

    // Map the users to the PlainUserPresenter format and return them
    return user.map(PlainUserPresenter.from);
  }

  // Define a GET route for '/:id'
  // This route will return the user with the given id
  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    // Get the user with the given id from the use case
    const users = await this.userUseCases.getById(id);

    // Convert the user to the UserPresenter format and return it
    return UserPresenter.from(users);
  }

  // Define a POST route for '/'
  // This route will create a new user
  @Post('/')
  public async create(@Body() user: UserModel): Promise<object> {
    // Create a new user with the given data using the use case
    const newUser = await this.userUseCases.create(user);

    // Create a plain user model from the new user and return it
    const plainUser: PlainUserModel = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    };
    return plainUser;
  }

  // Define a DELETE route for '/:id'
  // This route will delete the user with the given id
  @Delete('/:id')
  public async deleteById(@Param('id') id: UserId): Promise<void> {
    // Delete the user with the given id using the use case
    await this.userUseCases.deleteById(id);
  }
}
