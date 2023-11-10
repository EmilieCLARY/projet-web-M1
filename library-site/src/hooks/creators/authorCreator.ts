// Import axios for making HTTP requests
import axios from 'axios';
// Import the AuthorModel from the models
import { AuthorModel } from '@/models';

// Define a type for the response of the createNewAuthor function
type CreateAuthorProvider = {
  author: AuthorModel;
};

// Define an async function to create a new author
export const createNewAuthor = async (
  author: AuthorModel,
): Promise<CreateAuthorProvider> => {
  try {
    // Make a POST request to the /authors endpoint with the author data
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
    });

    // Redirect to the /authors page
    window.location.href = '/authors';

    // Return the author data
    return { author };
  } catch (err) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(err);
    // Rethrow the error
    throw err;
  }
};
