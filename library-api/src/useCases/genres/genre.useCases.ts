import { Injectable } from '@nestjs/common';
import { GenreId } from 'library-api/src/entities';
import { GenreRepository } from 'library-api/src/repositories';
import { PlainGenreUseCasesOutput } from 'library-api/src/useCases/genres/genre.useCases.type';

@Injectable()
export class GenreUseCases {
  constructor(private readonly GenreRepository: GenreRepository) {}

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<PlainGenreUseCasesOutput[]> {
    return this.GenreRepository.getAllPlain();
  }

  /**
   * Get an genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<PlainGenreUseCasesOutput> {
    return this.GenreRepository.getById(id);
  }

  /**
   * Create a new Genre
   * @Param input Data to create the new genre
   * @returns Created Genre
   */
  public async createNewGenre(input) {
    return this.GenreRepository.createNewGenre(input);
  }
  /**
   * Delete an genre from Database
   * @param id Genre's ID
   * @throws NotFoundException : no genre found
   */
  public async deletebyid(id: GenreId): Promise<void> {
    const genre = await this.getById(id);
    await this.GenreRepository.deletebyid(genre.id);
  }
}
