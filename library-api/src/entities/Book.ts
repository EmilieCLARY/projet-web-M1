// Erreur si on les enlève
/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { Author } from './Author';

// Define a type for book IDs
// This is a branded type that helps ensure that book IDs are not mixed up with other types of IDs
export type BookId = string & { __brand: 'Book' };

// Define an entity for books
// This entity corresponds to the 'Books' table in the database
@Entity('Books')
export class Book extends BaseEntity {
  // The ID of the book
  // This is a primary column that is generated automatically
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  // The name of the book
  @Column()
  name: string;

  // The date the book was written on
  @Column()
  writtenOn: string;

  // The author of the book
  // This is a many-to-one relationship: many books can have one author
  // When the author is deleted, the book is also deleted (onDelete: 'CASCADE')
  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  // The genres of the book
  // This is a one-to-many relationship: one book can have many genres
  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];
}
