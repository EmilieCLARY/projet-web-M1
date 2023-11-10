import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto } from './book.dto';

// Define a controller for the 'books' route
@Controller('books')
export class BookController {
  // Inject the BookUseCases service into the controller
  constructor(private readonly bookUseCases: BookUseCases) {}

  // Define a GET route for '/'
  // This route will return all books
  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    // Get all books from the use case
    const books = await this.bookUseCases.getAllPlain();

    // Map the books to the PlainBookPresenter format and return them
    return books.map(PlainBookPresenter.from);
  }

  // Define a GET route for '/:id'
  // This route will return the book with the given id
  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    // Get the book with the given id from the use case
    const book = await this.bookUseCases.getById(id);

    // Convert the book to the BookPresenter format and return it
    return BookPresenter.from(book);
  }

  // Define a POST route for '/'
  // This route will create a new book
  @Post('/')
  public async createNewBook(
    @Body() input: CreateBookDto,
  ): Promise<PlainBookPresenter> {
    // Create a new book with the given data using the use case
    const book = await this.bookUseCases.createNewBook(input);

    // Convert the new book to the PlainBookPresenter format and return it
    return PlainBookPresenter.from(book);
  }

  // Define a DELETE route for '/:id'
  // This route will delete the book with the given id
  @Delete('/:id')
  public async deleteById(@Param('id') id: BookId): Promise<void> {
    // Delete the book with the given id using the use case
    await this.bookUseCases.deletebyid(id);
  }
}
