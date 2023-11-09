import { Genre } from 'library-api/src/entities';
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';

export const adaptGenreEntityToPlainGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});
