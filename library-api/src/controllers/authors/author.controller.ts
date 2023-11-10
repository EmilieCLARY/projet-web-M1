import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { PlainAuthorModel } from 'library-api/src/models';
import { AuthorModel } from 'library-api/src/models/author.model';
import { UpdateAuthorDto } from './author.dto';

// Define a controller for the 'authors' route
@Controller('authors')
export class AuthorController {
  // Inject the AuthorUseCases service into the controller
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  // Define a GET route for '/'
  // This route will return all authors
  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    // Get all authors from the use case
    const authors = await this.authorUseCases.getAllPlain();

    // Map the authors to the PlainAuthorPresenter format and return them
    return authors.map(PlainAuthorPresenter.from);
  }

  // Define a GET route for '/:id'
  // This route will return the author with the given id
  @Get('/:id')
  public async getById(
    @Param('id') id: AuthorId,
  ): Promise<PlainAuthorPresenter> {
    // Get the author with the given id from the use case
    const author = await this.authorUseCases.getById(id);

    // Convert the author to the PlainAuthorPresenter format and return it
    return PlainAuthorPresenter.from(author);
  }

  // Define a POST route for '/'
  // This route will create a new author
  @Post('/')
  public async create(@Body() author: AuthorModel): Promise<object> {
    // Create a new author with the given data using the use case
    const newAuthor = await this.authorUseCases.create(author);

    // Create a plain author model from the new author
    const plainAuthor: PlainAuthorModel = {
      id: newAuthor.id,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
    };

    // Return the plain author model
    return plainAuthor;
  }

  // Define a DELETE route for '/:id'
  // This route will delete the author with the given id
  @Delete('/:id')
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    // Delete the author with the given id using the use case
    await this.authorUseCases.deletebyid(id);
  }

  // Define a PATCH route for '/:id'
  // This route will update the author with the given id
  @Patch('/:id')
  public async updateById(
    @Body() input: UpdateAuthorDto,
  ): Promise<PlainAuthorModel> {
    // Update the author with the given id and data using the use case
    // The updated author is returned in the PlainAuthorModel format
    return this.authorUseCases.updateById(input);
  }
}
