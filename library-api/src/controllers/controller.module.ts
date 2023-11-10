import { Module } from '@nestjs/common';
import { AuthorController } from 'library-api/src/controllers/authors/author.controller';
import { BookController } from 'library-api/src/controllers/books/book.controller';
import { GenreController } from 'library-api/src/controllers/genres/genre.controller';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { UseCasesModule } from 'library-api/src/useCases/useCases.module';
import { UserController } from './user/user.controller';

// Define a module for the controllers
@Module({
  // Import the UseCasesModule and RepositoryModule
  // These modules provide services that the controllers depend on
  imports: [UseCasesModule, RepositoryModule],

  // Declare the controllers that belong to this module
  // These controllers handle HTTP requests and responses
  controllers: [
    AuthorController,
    BookController,
    GenreController,
    UserController,
  ],
})
export class ControllerModule {}
