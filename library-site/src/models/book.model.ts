import { AuthorModel } from './author.model';
import { PlainGenreModel } from './genre.model';

export type PlainBookModel = {
  author: AuthorModel;
  id: string;
  name: string;
  writtenOn: string;
  genre: PlainGenreModel;
};
