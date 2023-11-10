// Import axios for making HTTP requests
import axios from 'axios';
// Import the UserModel from the models
import { UserModel } from '@/models';

// Define a type for the response of the createNewUser function
type CreateUserProvider = {
  user: UserModel;
};

// Define an async function to create a new user
export const createNewUser = async (
  user: UserModel,
): Promise<CreateUserProvider> => {
  try {
    // Make a POST request to the /user endpoint with the user data
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    // Redirect to the /users page
    window.location.href = '/users';

    // Return the user data
    return { user };
  } catch (err) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(err);
    // Rethrow the error
    throw err;
  }
};
