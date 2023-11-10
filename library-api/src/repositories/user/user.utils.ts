// Import the User entity and the output types from the user repository
import { User } from 'library-api/src/entities';
import {
  UserRepositoryOutput,
  PlainUserRepositoryOutput,
} from 'library-api/src/repositories/user/user.repository.type';

// Define a function to adapt a User entity to a PlainUserRepositoryOutput
// This function takes a User object and returns a new object with the same properties
export const adaptUserEntityToPlainUserModel = (
  user: User,
): PlainUserRepositoryOutput => ({
  ...user,
});

// Define a function to adapt a User entity to a UserRepositoryOutput
// This function takes a User object and returns a new object with the same properties
export const adaptUserEntityToUserModel = (
  user: User,
): UserRepositoryOutput => ({
  ...user,
});
