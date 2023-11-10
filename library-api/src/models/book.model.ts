import { Author, BookId } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models/author.model';
import { GenreModel } from 'library-api/src/models/genre.model';

// Define a type for plain book models
// Represents basic information of book, including a plain author model and an array of genre names
export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: string;
  author: PlainAuthorModel;
  genres: string[];
};

// Define a type for book models
// Represents the complete information of book, including an Author and array of GenreModel entities
export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: string;
  author: Author;
  genres: GenreModel[];
};
