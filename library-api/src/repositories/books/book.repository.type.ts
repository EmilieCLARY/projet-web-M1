import { BookModel, PlainBookModel } from 'library-api/src/models/book.model';

// Define a type for plain book repository outputs
// This type is the same as the PlainBookModel type
export type PlainBookRepositoryOutput = PlainBookModel;

// Define a type for book repository outputs
// This type is the same as the BookModel type
export type BookRepositoryOutput = BookModel;

// Define a type for inputs to the create book repository method
// This type is the same as the PlainBookModel type, but without the 'id' property
export type CreateBookRepositoryInput = Omit<PlainBookModel, 'id'>;

// Define a type for inputs to the update book repository method
// Type is the same as PlainBookModel type, but without the 'id', and all properties are optional
export type UpdateBookRepositoryInput = Partial<Omit<PlainBookModel, 'id'>>;
