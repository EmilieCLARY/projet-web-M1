import { Genre } from 'library-api/src/entities';
import { GenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';

// Define a function that adapts a Genre entity to a plain genre model
// This function takes a Genre entity as input and returns a GenreRepositoryOutput
// The returned object that includes all the properties of the input Genre entity
export const adaptGenreEntityToPlainGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});
