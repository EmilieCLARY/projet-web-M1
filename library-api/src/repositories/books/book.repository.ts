import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Book, BookId, BookGenre, Genre } from 'library-api/src/entities';
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

// Define a service that provides methods for interacting with the 'Books' table in the database
@Injectable()
export class BookRepository extends Repository<Book> {
  // The constructor initializes the base class with the Book entity and a new entity manager
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  // This method retrieves all books and maps them to plain book models
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });
    return books.map(adaptBookEntityToPlainBookModel);
  }

  // This method retrieves a book by its ID and maps it to a book model
  // If the book is not found, it throws a NotFoundError
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

  // This method retrieves a book by its ID and maps it to a plain book model
  // If the book is not found, it throws a NotFoundError
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

  // This method creates a new book in the database
  // Takes input object of type CreateBookRepositoryInput, which contains the data for the new book
  // Returns Promise that resolves to a PlainBookRepositoryOutput, which represents the created book
  public async createNewBook(
    input: CreateBookRepositoryInput,
  ): Promise<PlainBookRepositoryOutput> {
    // Start a new transaction
    const id = await this.dataSource.transaction(async (manager) => {
      // Create a new Book entity and save it to the database
      const newBook = await manager.save<Book>(
        manager.create<Book>(Book, {
          ...input,
          id: v4(),
          bookGenres: undefined, // Reset book genres
        }),
      );

      // If the book was not created successfully, throw an error
      if (!newBook) {
        throw new NotFoundException('An error occured creating new Book');
      } else {
        // Find the genres specified in the input and create new BookGenre entities for them
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.genres),
          },
        });

        // Save the new BookGenre entities to the database
        await manager.save<BookGenre>(
          // Erreur insolvable de retour à la ligne
          // eslint-disable-next-line prettier/prettier
          newGenres.map((genre) => manager.create<BookGenre>(BookGenre, {
                id: v4(),
                book: { id: newBook.id },
                genre,
              }),
            // eslint-disable-next-line function-paren-newline
          ),
        );
      }

      // Return the ID of the created book
      return newBook.id;
    });

    // Retrieve the created book and return it
    return this.getPlainById(id);
  }

  // This method deletes a book from the database
  // It takes the ID of the book to delete
  // It does not return anything
  public async deletebyid(id: BookId): Promise<void> {
    await this.delete(id);
  }
}
