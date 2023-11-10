import { Module } from '@nestjs/common';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { AuthorUseCases } from 'library-api/src/useCases/authors/author.useCases';
import { BookUseCases } from 'library-api/src/useCases/books/book.useCases';
import { GenreUseCases } from 'library-api/src/useCases/genres/genre.useCases';
import { UserUseCases } from './user/user.useCase';

// Define an array of use case classes
const useCases = [AuthorUseCases, BookUseCases, GenreUseCases, UserUseCases];

// Define a NestJS module for the use cases
@Module({
  // The imports array tells NestJS that this module depends on the RepositoryModule
  imports: [RepositoryModule],
  // Providers array tells NestJS to create an instance of each use case and provide for injection
  providers: [...useCases],
  // The exports array tells NestJS to make these instances available for injection in other modules
  exports: [...useCases],
})
export class UseCasesModule {}
