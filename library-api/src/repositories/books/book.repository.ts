import { Injectable, NotFoundException } from '@nestjs/common';
import {
  NotFoundError,
  InternalServerError,
} from 'library-api/src/common/errors';
import {
  Book,
  BookId,
  BookGenre,
  Genre,
  Author,
} from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
  CreateBookRepositoryInput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, Repository, In } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getPlainById(id: BookId): Promise<PlainBookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: { bookGenres: { genre: true }, author: true },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToPlainBookModel(book);
  }

  /**
   * Create a new Book
   * @Param input Data to create the new book
   * @returns Created Book
   */
  public async createNewBook(
    input: CreateBookRepositoryInput,
  ): Promise<PlainBookRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const newBook = await manager.save<Book>(
        manager.create<Book>(Book, {
          ...input,
          id: v4(),
          bookGenres: undefined, // Réinitialisation des genres de livre
        }),
      );

      if (!newBook) {
        throw new NotFoundException('An error occured creating new Book');
      } else {
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.genres),
          },
        });

        await manager.save<BookGenre>(
          newGenres.map((genre) =>
            manager.create<BookGenre>(BookGenre, {
              id: v4(),
              book: { id: newBook.id },
              genre,
            }),
          ),
        );
      }

      return newBook.id;
    });

    return this.getPlainById(id);
  }

  /**
   * Delete an book from database
   * @param id Book's id
   */
  public async deletebyid(id: BookId): Promise<void> {
    await this.delete(id);
  }
}
