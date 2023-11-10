import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import {
  GenrePresenter,
  PlainGenrePresenter,
} from 'library-api/src/controllers/genres/genre.presenter';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCases } from 'library-api/src/useCases';
import { CreateGenreDto } from './genre.dto';

// Define a controller for the 'genres' route
@Controller('genres')
export class GenreController {
  // Inject the GenreUseCases service into the controller
  constructor(private readonly genreUseCases: GenreUseCases) {}

  // Define a GET route for '/'
  // This route will return all genres
  @Get('/')
  public async getAll(): Promise<PlainGenrePresenter[]> {
    // Get all genres from the use case
    const genres = await this.genreUseCases.getAllPlain();

    // Map the genres to the PlainGenrePresenter format and return them
    return genres.map(PlainGenrePresenter.from);
  }

  // Define a GET route for '/:id'
  // This route will return the genre with the given id
  @Get('/:id')
  public async getById(@Param('id') id: GenreId): Promise<PlainGenrePresenter> {
    // Get the genre with the given id from the use case
    const genre = await this.genreUseCases.getById(id);

    // Convert the genre to the PlainGenrePresenter format and return it
    return PlainGenrePresenter.from(genre);
  }

  // Define a POST route for '/'
  // This route will create a new genre
  @Post('/')
  public async createNewGenre(
    @Body() input: CreateGenreDto,
  ): Promise<GenrePresenter> {
    // Create a new genre with the given data using the use case
    return this.genreUseCases.createNewGenre(input);
  }

  // Define a DELETE route for '/:id'
  // This route will delete the genre with the given id
  @Delete('/:id')
  public async deletebyid(@Param('id') id: GenreId): Promise<void> {
    // Delete the genre with the given id using the use case
    return this.genreUseCases.deletebyid(id);
  }
}
