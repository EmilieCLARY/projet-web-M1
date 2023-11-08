import { Genre } from 'library-api/src/entities';
import { PlainGenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';

export const adaptGenreEntityToPlainGenreModel = (
  genre: Genre,
): PlainGenreRepositoryOutput => ({
  ...genre,
});

