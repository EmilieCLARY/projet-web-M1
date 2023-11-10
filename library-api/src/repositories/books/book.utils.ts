import { Book } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';

// Define a function that adapts a Book entity to a plain book model
// This function takes a Book entity as input and returns a PlainBookRepositoryOutput
// The genres property of the output is an array of genre names
export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre.name),
});

// Define a function that adapts a Book entity to a book model
// This function takes a Book entity as input and returns a BookRepositoryOutput
// The genres property of the output is an array of genre entities
export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.bookGenres.map((bookGenre) => bookGenre.genre),
});
