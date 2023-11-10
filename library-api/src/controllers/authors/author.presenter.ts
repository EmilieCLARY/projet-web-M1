import { AuthorId } from 'library-api/src/entities';
import { PlainAuthorModel } from 'library-api/src/models';

// Define a presenter for plain author data
export class PlainAuthorPresenter {
  id: AuthorId; // The ID of the author

  firstName: string; // The first name of the author

  lastName: string; // The last name of the author

  photoUrl: string; // The URL of the author's photo

  // A private constructor that assigns the provided data to this instance
  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates new PlainAuthorPresenter instance from a PlainAuthorModel instance
  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
    });
  }
}

// Define a presenter for author data
export class AuthorPresenter {
  firstName: string; // The first name of the author

  lastName: string; // The last name of the author

  // A private constructor that assigns the provided data to this instance
  private constructor(data: AuthorPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates new AuthorPresenter instance from a PlainAuthorModel instance
  public static from(data: PlainAuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}
