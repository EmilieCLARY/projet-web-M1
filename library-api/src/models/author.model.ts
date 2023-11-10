import { AuthorId } from 'library-api/src/entities';

// Define a type for plain author models
// This type represents the basic information of an author
export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

// Define a type for author models
// This type represents the complete information of an author
export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

// Define a type for updating author models
// This type represents the information that can be updated for an author
// All properties are optional, because it's not necessary to update all properties at once
export type UpdateAuthorModel = {
  id: AuthorId;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
};
