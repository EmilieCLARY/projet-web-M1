import axios from 'axios';
import { UserModel } from '@/models';

type CreateUserProvider = {
  user: UserModel;
};

export const createNewUser = async (
  user: UserModel,
): Promise<CreateUserProvider> => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    window.location.href = '/users';

    return { user };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
