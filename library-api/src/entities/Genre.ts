import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Erreur si on l'enlève
// eslint-disable-next-line import/no-cycle
import { BookGenre } from './BookGenre';

// Define a type for genre IDs
// This is a branded type that helps ensure that genre IDs are not mixed up with other types of IDs
export type GenreId = string & { __brand: 'Genre' };

// Define an entity for genres
// This entity corresponds to the 'Genres' table in the database
@Entity('Genres')
export class Genre extends BaseEntity {
  // The ID of the genre
  // This is a primary column that is generated automatically
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  // The name of the genre
  @Column()
  name: string;

  // The book genres associated with the genre
  // This is a one-to-many relationship: one genre can be associated with many book genres
  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];
}
