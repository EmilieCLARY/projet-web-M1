// Import axios for making HTTP requests
import axios from 'axios';
// Import the CreateBookModel and PlainAuthorModel from the models
import { CreateBookModel, PlainAuthorModel } from '@/models';

// Define a type for the response of the create new book functions
type CreateBookProvider = {
  book: CreateBookModel;
  author: PlainAuthorModel;
};

// Define an async function to create a new book
export const useCreateNewBook = async (
  book: CreateBookModel,
): Promise<CreateBookProvider> => {
  try {
    // Make a POST request to the /books endpoint with the book data
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/books`,
      {
        author: book.author,
        name: book.name,
        writtenOn: book.writtenOn,
        genres: book.genres,
      },
    );

    // Redirect to the /books page
    window.location.href = '/books';

    // Return the response data
    return response.data;
  } catch (err) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(err);
    // Rethrow the error
    throw err;
  }
};

// Define an async function to create a new book from an author
export const useCreateNewBookFromAuthor = async (
  book: CreateBookModel,
  idAuthor: string,
): Promise<CreateBookProvider> => {
  try {
    // Make a POST request to the /books endpoint with the book data
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/books`,
      {
        author: book.author,
        name: book.name,
        writtenOn: book.writtenOn,
        genres: book.genres,
      },
    );

    // Redirect to the author's page
    window.location.href = `${idAuthor}`;

    // Return the response data
    return response.data;
  } catch (err) {
    // Log the error to the console
    // eslint-disable-next-line no-console
    console.error(err);
    // Rethrow the error
    throw err;
  }
};
