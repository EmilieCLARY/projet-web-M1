// Import the AuthorModel type from the author.model file
import { AuthorModel } from './author.model';

// Define a type for a plain book model
export type PlainBookModel = {
  author: AuthorModel; // The author of the book
  id: string; // The ID of the book
  name: string; // The name of the book
  writtenOn: string; // The date the book was written on
  genres: string[]; // The genres of the book
};

// Define a type for a create book model
export type CreateBookModel = {
  name: string; // The name of the book
  writtenOn: string; // The date the book was written on
  author: AuthorModel; // The author of the book
  genres: string[]; // The genres of the book
};
