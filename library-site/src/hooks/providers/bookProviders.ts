// Import axios for making HTTP requests and useState for state management
import axios from 'axios';
import { useState } from 'react';
// Import the PlainBookModel from the models
import { PlainBookModel } from '@/models';

// Define a type for the response of the useListBooks function
type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

// Define a function to fetch a list of books
export const useListBooks = (): UseListBooksProvider => {
  // Initialize the books state
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  // Define a function to fetch the books
  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  };

  // Return the books and the fetchBooks function
  return { books, load: fetchBooks };
};

// Define a type for the books providers
type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

// Define a function to use the books providers
export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});

/* ------------------------------ */

// Define a type for the response of the UseBookById function
type UseBookProviderById = {
  book: PlainBookModel;
  load: (id: string) => void;
};

// Define a function to fetch a book by ID
export const UseBookById = (): UseBookProviderById => {
  // Initialize the book state
  const [book, setBook] = useState<PlainBookModel>({} as PlainBookModel);

  // Define a function to fetch the book
  const fetchBooks = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => setBook(data.data))
      // Log the error to the console
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the book and the fetchBooks function
  return { book, load: fetchBooks };
};

// Define a type for the book provider by ID
type BookProviderById = {
  UseBookById: () => UseBookProviderById;
};

// Define a function to use the book provider by ID
export const useBookProviderById = (): BookProviderById => ({
  UseBookById,
});
