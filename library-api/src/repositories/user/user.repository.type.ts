// Import the PlainUserModel and UserModel from the user.model file
import { PlainUserModel, UserModel } from 'library-api/src/models/user.model';

// Define a type alias PlainUserRepositoryOutput that is equivalent to PlainUserModel
export type PlainUserRepositoryOutput = PlainUserModel;

// Define a type alias UserRepositoryOutput that is equivalent to UserModel
export type UserRepositoryOutput = UserModel;

// Define a type alias CreateUserRepositoryInput that is equivalent to PlainUserModel
// but without the 'id' property
export type CreateUserRepositoryInput = Omit<PlainUserModel, 'id'>;
