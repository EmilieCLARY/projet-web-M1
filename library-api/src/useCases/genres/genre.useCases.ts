// Import necessary modules and types
import { Injectable } from '@nestjs/common';
import { GenreId } from 'library-api/src/entities';
// Import necessary but keep saying unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GenreRepository } from 'library-api/src/repositories';
import { PlainGenreUseCasesOutput } from 'library-api/src/useCases/genres/genre.useCases.type';

// Define GenreUseCases class that is Injectable (can be injected as a dependency)
@Injectable()
export class GenreUseCases {
  // Constructor that takes a GenreRepository as a dependency

  // Same problem as the eslint ignore above
  // eslint-disable-next-line no-shadow
  constructor(private readonly GenreRepository: GenreRepository) {}

  public async getAllPlain(): Promise<PlainGenreUseCasesOutput[]> {
    // Call the getAllPlain method of the GenreRepository and return the result
    return this.GenreRepository.getAllPlain();
  }

  public async getById(id: GenreId): Promise<PlainGenreUseCasesOutput> {
    // Call the getById method of the GenreRepository with the given id and return the result
    return this.GenreRepository.getById(id);
  }

  public async createNewGenre(input): Promise<PlainGenreUseCasesOutput> {
    // Call createNewGenre method of GenreRepository with the given input and return the result
    return this.GenreRepository.createNewGenre(input);
  }

  public async deletebyid(id: GenreId): Promise<void> {
    // Get the genre by id
    const genre = await this.getById(id);
    // Call the deletebyid method of the GenreRepository with the genre's id
    await this.GenreRepository.deletebyid(genre.id);
  }
}
