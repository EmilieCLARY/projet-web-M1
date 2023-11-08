import { AuthorModel } from './author.model';

export type PlainBookModel = {
  author: AuthorModel;
  id: string;
  name: string;
};
