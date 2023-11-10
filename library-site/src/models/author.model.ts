// Define a type for a plain author model
export type PlainAuthorModel = {
  id: string; // The ID of the author
  firstName: string; // The first name of the author
  lastName: string; // The last name of the author
  photoUrl: string; // The URL of the author's photo
};

// Define a type for an author model
export type AuthorModel = {
  id: string; // The ID of the author
  firstName: string; // The first name of the author
  lastName: string; // The last name of the author
  photoUrl?: string; // The URL of the author's photo, which is optional
};

// Define a type for an update author model
export type UpdateAuthorModel = {
  firstName?: string; // The first name of the author, which is optional
  lastName?: string; // The last name of the author, which is optional
  photoUrl?: string; // The URL of the author's photo, which is optional
};
