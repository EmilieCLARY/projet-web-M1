import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Genre, GenreId } from 'library-api/src/entities';
import {
  InternalServerError,
  NotFoundError,
} from 'library-api/src/common/errors';
import { GenreRepositoryOutput } from './genre.repository.type';
import { adaptGenreEntityToPlainGenreModel } from './genre.utils';

// Define a service that provides methods for interacting with the 'Genres' table in the database
@Injectable()
export class GenreRepository extends Repository<Genre> {
  // The constructor initializes the base class with the Genre entity and a new entity manager
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  // This method retrieves all genres and maps them to plain genre models
  public async getAllPlain(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find({});
    return genres.map(adaptGenreEntityToPlainGenreModel);
  }

  // This method retrieves a genre by its ID and maps it to a genre model
  // If the genre is not found, it throws a NotFoundError
  public async getById(id: GenreId): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({ where: { id } });
    if (!genre) {
      throw new NotFoundError(`Genre - '${id}'`);
    }
    return adaptGenreEntityToPlainGenreModel(genre);
  }

  // This method creates a new genre in the database
  // Takes an input object of type GenreRepositoryOutput, which contains data for the new genre
  // Returns a Promise that resolves to a GenreRepositoryOutput, which represents the created genre
  public async createNewGenre(
    input: GenreRepositoryOutput,
  ): Promise<GenreRepositoryOutput> {
    // Start a new transaction
    const id = await this.dataSource.transaction(async (manager) => {
      // Create a new Genre entity and save it to the database
      const [newGenre] = await manager.save<Genre>([
        manager.create<Genre>(Genre, { ...input }),
      ]);

      // If the genre was not created successfully, throw an error
      if (!newGenre) {
        throw new InternalServerError('An error occured creating new Genre');
      }

      // Return the ID of the created genre
      return newGenre.id;
    });

    // Retrieve the created genre and return it
    return this.getById(id);
  }

  // This method deletes a genre from the database
  // It takes the ID of the genre to delete
  // It does not return anything
  public async deletebyid(id: GenreId): Promise<void> {
    await this.delete(id);
  }
}
