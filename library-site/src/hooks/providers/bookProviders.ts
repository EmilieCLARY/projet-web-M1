import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseListBooksProvider = {
  books: PlainBookModel[];
  load: () => void;
};

export const useListBooks = (): UseListBooksProvider => {
  const [books, setBooks] = useState<PlainBookModel[]>([]);

  const fetchBooks = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.error(err));
  };

  return { books, load: fetchBooks };
};

type BookProviders = {
  useListBooks: () => UseListBooksProvider;
};

export const useBooksProviders = (): BookProviders => ({
  useListBooks,
});

/* ------------------------------ */

type UseBookProviderById = {
  book: PlainBookModel;
  load: (id: string) => void;
};

export const UseBookById = (): UseBookProviderById => {
  const [book, setBook] = useState<PlainBookModel>({} as PlainBookModel);

  const fetchBooks = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((data) => setBook(data.data))
      .catch((err) => console.error(err));
  };

  return { book, load: fetchBooks };
};

type BookProviderById = {
  UseBookById: () => UseBookProviderById;
};

export const useBookProviderById = (): BookProviderById => ({
  UseBookById,
});
