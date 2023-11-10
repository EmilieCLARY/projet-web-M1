// Import axios for making HTTP requests
import axios from 'axios';

// Define an async function to delete a book by ID
export const deleteBookById = async (id: string): Promise<void> => {
  try {
    // Make a DELETE request to the /books/{id} endpoint
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);

    // Redirect to the /books page
    window.location.href = '/books';
  } catch (error) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(error);
    // Rethrow the error
    throw error;
  }
};

// Define an async function to delete a book from an author by ID
export const deleteBookFromAuthorById = async (
  idBook: string,
  idAuthor: string,
): Promise<void> => {
  try {
    // Make a DELETE request to the /books/{idBook} endpoint
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${idBook}`);

    // Redirect to the author's page
    window.location.href = `${idAuthor}`;
  } catch (error) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(error);
    // Rethrow the error
    throw error;
  }
};
