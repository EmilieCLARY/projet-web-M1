import { UserId, Book } from 'library-api/src/entities';

// Define a type for plain user models
// This type represents the basic information of a user
export type PlainUserModel = {
  id: UserId;
  firstname: string;
  lastname: string;
};

// Define a type for user models
// This type represents the complete information of a user, including an optional Book entity
export type UserModel = {
  id: UserId;
  firstname: string;
  lastname: string;
  book?: Book;
};
