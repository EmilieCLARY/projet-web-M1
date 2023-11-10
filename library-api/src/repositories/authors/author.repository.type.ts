import { PlainAuthorModel, UpdateAuthorModel } from 'library-api/src/models';

// Define a type for the output of the repository when retrieving plain authors
// This type is the same as the PlainAuthorModel type
export type PlainAuthorRepositoryOutput = PlainAuthorModel;

// Define a type for the input to the repository when creating authors
// This type is the same as the PlainAuthorModel type, but without the 'id' property
export type CreateAuthorRepositoryInput = Omit<PlainAuthorModel, 'id'>;

// Define a type for the input to the repository when updating authors
// This type is the same as the UpdateAuthorModel type
export type UpdateAuthorRepositoryInput = UpdateAuthorModel;
