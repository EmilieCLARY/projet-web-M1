import { Book, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';

// Define a presenter for plain user data
export class PlainUserPresenter {
  id: UserId; // The ID of the user

  firstname: string; // The first name of the user

  lastname: string; // The last name of the user

  // A private constructor that assigns the provided data to this instance
  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new PlainUserPresenter instance from a PlainUserModel instance
  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
    });
  }
}

// Define a presenter for user data
export class UserPresenter {
  id: string; // The ID of the user

  firstname: string; // The first name of the user

  lastname: string; // The last name of the user

  book?: Book; // The book associated with the user, if any

  // A private constructor that assigns the provided data to this instance
  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  // A static method that creates a new UserPresenter instance from a UserModel instance
  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      book: data.book,
    });
  }
}
