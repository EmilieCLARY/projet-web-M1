import { AuthorModel } from './author.model';

export type PlainBookModel = {
  author: AuthorModel;
  id: string;
  name: string;
  writtenOn: string;
  genres: string[];
};

export type CreateBookModel = {
  name: string;
  writtenOn: string;
  author: AuthorModel;
  genres: string[];
};
