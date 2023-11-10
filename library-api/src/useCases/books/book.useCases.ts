// Import necessary modules and types
import { Injectable } from '@nestjs/common';
import { BookId } from 'library-api/src/entities';
import { BookRepository } from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
  CreateBookUseCasesInput,
} from 'library-api/src/useCases/books/book.useCases.type';

// Define BookUseCases class that is Injectable (can be injected as a dependency)
@Injectable()
export class BookUseCases {
  // Constructor that takes a BookRepository as a dependency
  constructor(private readonly bookRepository: BookRepository) {}

  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    // Call the getAllPlain method of the bookRepository and return the result
    return this.bookRepository.getAllPlain();
  }

  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    // Call the getById method of the bookRepository with the given id and return the result
    return this.bookRepository.getById(id);
  }

  public async createNewBook(
    input: CreateBookUseCasesInput,
  ): Promise<PlainBookUseCasesOutput> {
    // Call the createNewBook method of bookRepository with the given input and return the result
    return this.bookRepository.createNewBook(input);
  }

  /**
   * Delete an book from Database
   * @param id Book's ID
   * @throws NotFoundException : no book found
   */
  public async deletebyid(id: BookId): Promise<void> {
    // Get the book by id
    const book = await this.getById(id);
    // Call the deletebyid method of the bookRepository with the book's id
    await this.bookRepository.deletebyid(book.id);
  }
}
