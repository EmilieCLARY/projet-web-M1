// Import the BookModel and PlainBookModel from the models
import { BookModel, PlainBookModel } from 'library-api/src/models';

// Define a type alias PlainBookUseCasesOutput that is equivalent to PlainBookModel
export type PlainBookUseCasesOutput = PlainBookModel;

// Define a type alias BookUseCasesOutput that is equivalent to BookModel
export type BookUseCasesOutput = BookModel;

// Define a type alias CreateBookUseCasesInput equivalent to PlainBookModel
// but without the 'id' property
export type CreateBookUseCasesInput = Omit<PlainBookModel, 'id'>;
