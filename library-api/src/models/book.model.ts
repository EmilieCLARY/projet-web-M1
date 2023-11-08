import { Author, BookId } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models/author.model';
import { PlainGenreModel } from 'library-api/src/models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: string[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: Author;
  genres: PlainGenreModel[];
};
