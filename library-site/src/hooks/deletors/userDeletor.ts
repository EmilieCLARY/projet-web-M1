// Import axios for making HTTP requests
import axios from 'axios';

// Define an async function to delete a user by ID
export const deleteUserById = async (id: string): Promise<void> => {
  try {
    // Make a DELETE request to the /user/{id} endpoint
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
    );

    // Redirect to the /users page
    window.location.href = '/users';
  } catch (error) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(error);
    // Rethrow the error
    throw error;
  }
};
