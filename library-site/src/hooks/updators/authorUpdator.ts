// Import axios for making HTTP requests
import axios from 'axios';

// Define an async function to update an author by ID
export const updateAuthorById = async (id: string): Promise<void> => {
  try {
    // Make a PATCH request to the /authors/{id} endpoint
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`);

    // Redirect to the /authors/{id} page
    window.location.href = `/authors/${id}`;
  } catch (error) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(error);
    // Rethrow the error
    throw error;
  }
};
