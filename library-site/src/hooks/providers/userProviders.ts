import axios from 'axios';
import { useState } from 'react';
import { UserModel } from '@/models';

type UseListUsersProvider = {
  users: UserModel[];
  load: () => void;
};

export const useListUsers = (): UseListUsersProvider => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const fetchUsers = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.error(err));
  };

  return { users, load: fetchUsers };
};

type UsersProviders = {
  useListUsers: () => UseListUsersProvider;
};

export const useUsersProviders = (): UsersProviders => ({
  useListUsers,
});

/* ------------------------------ */

type UseUserProviderById = {
  user: UserModel;
  load: (id: string) => void;
};

export const UseUserById = (): UseUserProviderById => {
  const [user, setUser] = useState<UserModel>(
    {} as UserModel,
  );

  const fetchUsers = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.error(err));
  };

  return { user, load: fetchUsers };
};

type UserProviderById = {
  UseUserById: () => UseUserProviderById;
};

export const useUserProviderById = (): UserProviderById => ({
  UseUserById,
});
