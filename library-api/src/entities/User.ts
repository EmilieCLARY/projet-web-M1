import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';

// Define a type for user IDs
// This is a branded type that helps ensure that user IDs are not mixed up with other types of IDs
export type UserId = string & { __brand: 'User' };

// Define an entity for users
// This entity corresponds to the 'Users' table in the database
@Entity('Users')
export class User extends BaseEntity {
  // The ID of the user
  // This is a primary column that is generated automatically
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  // The first name of the user
  @Column()
  firstname: string;

  // The last name of the user
  @Column()
  lastname: string;

  // The book associated with the user
  // Important à garder
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(() => Book, (book) => Book, { onDelete: 'CASCADE' })
  book?: Book;
}
