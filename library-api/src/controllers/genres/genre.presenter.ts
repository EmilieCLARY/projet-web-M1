import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';

// Define a presenter for genre data
export class GenrePresenter {
  name: string; // The name of the genre

  // A private constructor that assigns the provided data to this instance
  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new GenrePresenter instance from a GenreModel instance
  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      name: data.name,
    });
  }
}

// Define a presenter for plain genre data
export class PlainGenrePresenter {
  id: GenreId; // The ID of the genre

  name: string; // The name of the genre

  // A private constructor that assigns the provided data to this instance
  private constructor(data: PlainGenrePresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new PlainGenrePresenter instance from a GenreModel instance
  public static from(data: GenreModel): PlainGenrePresenter {
    return new PlainGenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
