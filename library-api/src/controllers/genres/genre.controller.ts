import { Controller, Get, Param } from '@nestjs/common';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCases } from 'library-api/src/useCases';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: GenreId): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.getById(id);

    return GenrePresenter.from(genre);
  }
}
