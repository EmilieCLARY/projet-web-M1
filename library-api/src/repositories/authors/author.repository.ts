import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Author, AuthorId } from 'library-api/src/entities';
import {
  InternalServerError,
  NotFoundError,
} from 'library-api/src/common/errors';
import {
  CreateAuthorRepositoryInput,
  PlainAuthorRepositoryOutput,
  UpdateAuthorRepositoryInput,
} from './author.repository.type';
import { adaptAuthorEntityToPlainAuthorModel } from './author.utils';

// Define a service that provides methods for interacting with the 'Authors' table in the database
@Injectable()
export class AuthorRepository extends Repository<Author> {
  // The constructor initializes the base class with the Author entity and a new entity manager
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  // This method retrieves all authors and maps them to plain author models
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({});
    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  // This method retrieves an author by its ID and maps it to a plain author model
  // If the author is not found, it throws a NotFoundError
  public async getById(id: AuthorId): Promise<PlainAuthorRepositoryOutput> {
    const author = await this.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }
    return adaptAuthorEntityToPlainAuthorModel(author);
  }

  // This method creates a new author and returns the created author as a plain author model
  public async createAuthor(
    input: CreateAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newAuthor] = await manager.save<Author>([
        manager.create<Author>(Author, { ...input }),
      ]);
      if (!newAuthor) {
        throw new InternalServerError('An error occured creating new Author');
      }
      return newAuthor.id;
    });
    return this.getById(id);
  }

  // This method deletes an author by its ID
  public async deletebyid(id: AuthorId): Promise<void> {
    await this.delete(id);
  }

  // This method updates an author and returns the updated author as a plain author model
  public async updateById(
    input: UpdateAuthorRepositoryInput,
  ): Promise<PlainAuthorRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const author = await this.findOne({ where: { id: input.id } });
      if (!author) {
        throw new NotFoundError(`Author - '${input.id}'`);
      }
      await manager.save({ ...author, ...input });
      return { ...author, ...input }.id;
    });
    return this.getById(id);
  }
}
