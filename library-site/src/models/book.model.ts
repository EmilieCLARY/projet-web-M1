import { AuthorModel } from './author.model';

export type PlainBookModel = {
  author: AuthorModel;
  id: string;
  name: string;
  writtenOn: string;
  genre: string[];
};

export type CreateBookModel = {
  name: string;
  writtenOn: Date;
  author: AuthorModel;
  genres: string[];
};