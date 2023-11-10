import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'library-api/src/entities';
import { ControllerModule } from 'library-api/src/controllers/controller.module';

// Define a NestJS module for the application
@Module({
  // Imports array tells NestJS that this module depends on the TypeOrmModule and ControllerModule
  imports: [
    // The TypeOrmModule is configured with the forRoot method, which takes a configuration object
    // Configuration object specifies that SQLite is used as the database type
    // Entities array contains the entity classes for the database, and synchronize is set to true,
    // which means that the database should be auto-created on every application launch
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities,
      synchronize: true,
    }),
    // ControllerModule is also imported, which means that the controllers provided by this module
    // can be used in the application
    ControllerModule,
  ],
})
// The AppModule class represents the root module of the application
export class AppModule {}
