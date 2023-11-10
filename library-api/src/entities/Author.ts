import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Erreur si on l'enlève
// eslint-disable-next-line import/no-cycle
import { Book } from './Book';

// Define a type for author IDs
// This is a branded type that helps ensure that author IDs are not mixed up with other types of IDs
export type AuthorId = string & { __brand: 'Author' };

// Define an entity for authors
// This entity corresponds to the 'Authors' table in the database
@Entity('Authors')
export class Author extends BaseEntity {
  // The ID of the author
  // This is a primary column that is generated automatically
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  // The first name of the author
  @Column()
  firstName: string;

  // The last name of the author
  @Column()
  lastName: string;

  // The URL of the author's photo, if any
  @Column()
  photoUrl?: string;

  // The books written by the author
  // This is a one-to-many relationship: one author can write many books
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
