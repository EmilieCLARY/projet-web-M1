import axios from 'axios';
import { CreateBookModel, PlainAuthorModel } from '@/models';

type CreateBookProvider = {
  book: CreateBookModel;
  author: PlainAuthorModel;
};

export const useCreateNewBook = async (
  book: CreateBookModel,
): Promise<CreateBookProvider> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      author: book.author,
      name: book.name,
      writtenOn: book.writtenOn,
      genres: book.genres,
    });

    window.location.href = '/books';

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const useCreateNewBookFromAuthor = async (
  book: CreateBookModel, idAuthor: string
): Promise<CreateBookProvider> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      author: book.author,
      name: book.name,
      writtenOn: book.writtenOn,
      genres: book.genres,
    });

    window.location.href = `${idAuthor}`;

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
