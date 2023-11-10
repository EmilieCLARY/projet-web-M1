import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from 'library-api/src/entities/User';

// Re-export everything from the entity modules
// This allows other modules to import entities directly from this module
export * from './Author';
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';

// Define an array of the entity classes
// This can be used when setting up a database connection, for example
export const entities = [Author, Book, BookGenre, Genre, User];
