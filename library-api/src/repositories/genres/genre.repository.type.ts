import { GenreModel } from 'library-api/src/models/genre.model';

// Define a type for genre repository outputs
// This type is the same as the GenreModel type
export type GenreRepositoryOutput = GenreModel;

// Define a type for inputs to the genre repository methods
// This type is the same as the GenreModel type, but without the 'id' property
export type GenreRepositoryInput = Omit<GenreModel, 'id'>;
