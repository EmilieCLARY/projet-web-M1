import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';

// Define a presenter for plain book data
export class PlainBookPresenter {
  id: BookId; // The ID of the book

  name: string; // The name of the book

  writtenOn: string; // The date the book was written on

  author: PlainAuthorPresenter; // The author of the book, presented in a plain format

  genres: string[]; // The genres of the book

  // A private constructor that assigns the provided data to this instance
  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new PlainBookPresenter instance from a PlainBookModel instance
  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
    });
  }
}

// Define a presenter for book data
export class BookPresenter {
  id: string; // The ID of the book

  name: string; // The name of the book

  author: PlainAuthorPresenter; // The author of the book, presented in a plain format

  writtenOn: string; // The date the book was written on

  genres: GenrePresenter[]; // The genres of the book, each presented in a GenrePresenter format

  // A private constructor that assigns the provided data to this instance
  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new BookPresenter instance from a BookModel instance
  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      // Convert the author to the PlainAuthorPresenter format
      author: PlainAuthorPresenter.from(data.author),
      // Convert each genre to the GenrePresenter format
      genres: data.genres.map(GenrePresenter.from),
    });
  }
}
