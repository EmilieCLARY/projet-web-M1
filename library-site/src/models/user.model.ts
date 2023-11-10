// Import the PlainBookModel type from the book.model file
import { PlainBookModel } from './book.model';

// Define a type for a plain user model
export type PlainUserModel = {
  id: string; // The ID of the user
  firstname: string; // The first name of the user
  lastname: string; // The last name of the user
};

// Define a type for a user model
export type UserModel = {
  id: string; // The ID of the user
  firstname: string; // The first name of the user
  lastname: string; // The last name of the user
  books?: PlainBookModel[]; // The books associated with the user, which are optional
};

// Define a type for a create user model
export type CreateUserModel = {
  firstname: string; // The first name of the user
  lastname: string; // The last name of the user
  books?: PlainBookModel[]; // The books associated with the user, which are optional
};
