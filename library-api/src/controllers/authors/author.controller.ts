import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { PlainAuthorModel } from 'library-api/src/models';
import { AuthorModel, UpdateAuthorModel } from 'library-api/src/models/author.model';
import { UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return PlainAuthorPresenter.from(author);
  }

  @Post('/')
  public async create(@Body() author: AuthorModel): Promise<object> {
    const newAuthor = await this.authorUseCases.create(author);
    const plainAuthor: PlainAuthorModel = {
      id: newAuthor.id,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
    };
    return plainAuthor;
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deletebyid(id);
  }

  @Patch('/:id')
  public async updateById(
    @Body() input: UpdateAuthorDto,
  ): Promise<PlainAuthorModel> {
    return this.authorUseCases.updateById(input);
  }
}
