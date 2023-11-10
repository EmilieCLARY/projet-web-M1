// Erreur si on les enlève
/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Genre } from './Genre';
import { Book } from './Book';

// Define a type for book genre IDs
// This is a branded type that helps ensure book genre IDs are not mixed up with other types of IDs
export type BookGenreId = string & { __brand: 'BookGenre' };

// Define an entity for book genres
// This entity corresponds to the 'BookGenres' table in the database
@Entity('BookGenres')
export class BookGenre extends BaseEntity {
  // The ID of the book genre
  // This is a primary column
  @PrimaryColumn()
  id: BookGenreId;

  // The book associated with the book genre
  // This is a many-to-one relationship: many book genres can be associated with one book
  // When the book is deleted, the book genre is also deleted (onDelete: 'CASCADE')
  @ManyToOne(() => Book, (book) => book.bookGenres, {
    onDelete: 'CASCADE',
  })
  book: Book;

  // The genre associated with the book genre
  // This is a many-to-one relationship: many book genres can be associated with one genre
  // When the genre is deleted, the book genre is also deleted (onDelete: 'CASCADE')
  @ManyToOne(() => Genre, (genre) => genre.bookGenres, {
    onDelete: 'CASCADE',
  })
  genre: Genre;
}
