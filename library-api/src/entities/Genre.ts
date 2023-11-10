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

export type GenreId = string & { __brand: 'Genre' };

@Entity('Genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  @Column()
  name: string;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];
}
