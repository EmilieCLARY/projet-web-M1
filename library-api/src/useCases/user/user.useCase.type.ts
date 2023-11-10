// Import the UserModel and PlainUserModel from the models
import { UserModel, PlainUserModel } from 'library-api/src/models';

// Import the CreateUserRepositoryInput from the user repository type
import { CreateUserRepositoryInput } from 'library-api/src/repositories/user/user.repository.type';

// Define a type alias PlainUserUseCasesOutput that is equivalent to PlainUserModel
export type PlainUserUseCasesOutput = PlainUserModel;

// Define a type alias UserUseCasesOutput that is equivalent to UserModel
export type UserUseCasesOutput = UserModel;

// Define a type alias CreateUserUseCasesInput that is equivalent to CreateUserRepositoryInput
export type CreateUserUseCasesInput = CreateUserRepositoryInput;
