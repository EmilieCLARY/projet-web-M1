import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Genre, GenreId } from 'library-api/src/entities';
import {
  InternalServerError,
  NotFoundError,
} from 'library-api/src/common/errors';
import { GenreRepositoryOutput } from './genre.repository.type';
import { adaptGenreEntityToPlainGenreModel } from './genre.utils';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<GenreRepositoryOutput[]> {
    const genres = await this.find({});

    return genres.map(adaptGenreEntityToPlainGenreModel);
  }

  /**
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */

  public async getById(id: GenreId): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundError(`Genre - '${id}'`);
    }
    return adaptGenreEntityToPlainGenreModel(genre);
  }
  /**
   * Create a new Genre
   * @Param input Data to create the new genre
   * @returns Created Genre
   */

  public async createNewGenre(
    input: GenreRepositoryOutput,
  ): Promise<GenreRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newGenre] = await manager.save<Genre>([
        manager.create<Genre>(Genre, { ...input }),
      ]);
      if (!newGenre) {
        throw new InternalServerError('An error occured creating new Genre');
      }

      return newGenre.id;
    });
    return this.getById(id);
  }

  /**
   * Delete an genre from database
   * @param id Genre's id
   */
  public async deletebyid(id: GenreId): Promise<void> {
    await this.delete(id);
  }
}
