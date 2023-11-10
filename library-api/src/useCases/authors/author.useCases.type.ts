// Import the PlainAuthorModel from the models
import { PlainAuthorModel } from 'library-api/src/models';

// Import CreateAuthorRepositoryInput and UpdateAuthorRepositoryInput types from author repository
import {
  CreateAuthorRepositoryInput,
  UpdateAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';

// Define a type alias PlainAuthorUseCasesOutput that is equivalent to PlainAuthorModel
export type PlainAuthorUseCasesOutput = PlainAuthorModel;

// Define a type alias CreateAuthorUseCasesInput that is equivalent to CreateAuthorRepositoryInput
export type CreateAuthorUseCasesInput = CreateAuthorRepositoryInput;

// Define a type alias UpdateAuthorUseCasesInput that is equivalent to UpdateAuthorRepositoryInput
export type UpdateAuthorUseCasesInput = UpdateAuthorRepositoryInput;
