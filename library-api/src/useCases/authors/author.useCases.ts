import { Injectable } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorRepository } from 'library-api/src/repositories';
import {
  PlainAuthorUseCasesOutput,
  CreateAuthorUseCasesInput,
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get an author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create a new Author
   * @Param input Data to create the new author
   * @returns Created Author
   */
  public async create(
    input: CreateAuthorUseCasesInput,
  ): Promise<PlainAuthorUseCasesOutput> {
    return this.authorRepository.createAuthor(input);
  }

  /**
   * Delete an author from Database
   * @param id Author's ID
   * @throws NotFoundException : no author found
   */
  public async deletebyid(id: AuthorId): Promise<void> {
    const author = await this.getById(id);
    await this.authorRepository.deletebyid(author.id);
  }

  // Ici, on a un problème de typage, car on ne peut pas retourner un PlainAuthorModel
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async updateById(input) {
    return this.authorRepository.updateById(input);
  }
}
