import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/user/user.presenter';
import { UserId } from 'library-api/src/entities';
import { PlainUserModel, UserModel } from 'library-api/src/models';
import { UserUseCases } from 'library-api/src/useCases';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const user = await this.userUseCases.getAllPlain();

    return user.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const users = await this.userUseCases.getById(id);

    return UserPresenter.from(users);
  }

  @Post('/')
  public async create(@Body() user: UserModel): Promise<object> {
    const newUser = await this.userUseCases.create(user);
    const plainUser: PlainUserModel = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    };
    return plainUser;
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.deleteById(id);
  }
}
