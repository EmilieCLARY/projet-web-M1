import { Module } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories/authors/author.repository';
import { BookRepository } from 'library-api/src/repositories/books/book.repository';
import { GenreRepository } from 'library-api/src/repositories/genres/genre.repository';
import { UserRepository } from './user/user.repository';

// Define an array of repository classes
const repositories = [
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
];

// Define a NestJS module for the repositories
@Module({
  // Providers array tells NestJS to create instance of each repository and provide it for injection
  providers: [...repositories],
  // The exports array tells NestJS to make these instances available for injection in other modules
  exports: [...repositories],
})
export class RepositoryModule {}
