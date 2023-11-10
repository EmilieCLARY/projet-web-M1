// Import axios for making HTTP requests and useState for state management
import axios from 'axios';
import { useState } from 'react';
// Import the UserModel from the models
import { UserModel } from '@/models';

// Define a type for the response of the useListUsers function
type UseListUsersProvider = {
  users: UserModel[];
  load: () => void;
};

// Define a function to fetch a list of users
export const useListUsers = (): UseListUsersProvider => {
  // Initialize the users state
  const [users, setUsers] = useState<UserModel[]>([]);

  // Define a function to fetch the users
  const fetchUsers = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((data) => setUsers(data.data))
      // Log the error to the console
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the users and the fetchUsers function
  return { users, load: fetchUsers };
};

// Define a type for the users providers
type UsersProviders = {
  useListUsers: () => UseListUsersProvider;
};

// Define a function to use the users providers
export const useUsersProviders = (): UsersProviders => ({
  useListUsers,
});

/* ------------------------------ */

// Define a type for the response of the UseUserById function
type UseUserProviderById = {
  user: UserModel;
  load: (id: string) => void;
};

// Define a function to fetch a user by ID
export const UseUserById = (): UseUserProviderById => {
  // Initialize the user state
  const [user, setUser] = useState<UserModel>({} as UserModel);

  // Define a function to fetch the user
  const fetchUsers = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
      .then((data) => setUser(data.data))
      // Log the error to the console
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the user and the fetchUsers function
  return { user, load: fetchUsers };
};

// Define a type for the user provider by ID
type UserProviderById = {
  UseUserById: () => UseUserProviderById;
};

// Define a function to use the user provider by ID
export const useUserProviderById = (): UserProviderById => ({
  UseUserById,
});
