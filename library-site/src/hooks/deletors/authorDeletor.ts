// Import axios for making HTTP requests
import axios from 'axios';

// Define an async function to delete an author by ID
export const deleteAuthorById = async (id: string): Promise<void> => {
  try {
    // Make a DELETE request to the /authors/{id} endpoint
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`);

    // Redirect to the /authors page
    window.location.href = '/authors';
  } catch (error) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(error);
    // Rethrow the error
    throw error;
  }
};
