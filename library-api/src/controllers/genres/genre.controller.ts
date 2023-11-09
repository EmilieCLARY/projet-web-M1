import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import {
  GenrePresenter,
  PlainGenrePresenter,
} from 'library-api/src/controllers/genres/genre.presenter';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCases } from 'library-api/src/useCases';
import { CreateGenreDto } from './genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainGenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(PlainGenrePresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: GenreId): Promise<PlainGenrePresenter> {
    const genre = await this.genreUseCases.getById(id);

    return PlainGenrePresenter.from(genre);
  }

  @Post('/')
  public async createNewGenre(
    @Body() input: CreateGenreDto,
  ): Promise<GenrePresenter> {
    return this.genreUseCases.createNewGenre(input);
  }

  @Delete('/:id')
  public async deletebyid(@Param('id') id: GenreId): Promise<void> {
    return this.genreUseCases.deletebyid(id);
  }
}
