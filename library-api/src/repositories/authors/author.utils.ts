import { Author } from 'library-api/src/entities';
import { PlainAuthorRepositoryOutput } from './author.repository.type';

// Define a function that adapts an Author entity to a plain author model
// This function takes an Author entity as input and returns a PlainAuthorRepositoryOutput
export const adaptAuthorEntityToPlainAuthorModel = (
  author: Author,
): PlainAuthorRepositoryOutput => ({
  ...author,
});
