import { PlainBookModel } from './book.model';

export type PlainUserModel = {
  id: string;
  firstname: string;
  lastname: string;
};

export type UserModel = {
  id: string;
  firstname: string;
  lastname: string;
  books?: PlainBookModel[];
};

export type CreateUserModel = {
  firstname: string;
  lastname: string;
  books?: PlainBookModel[];
};
  