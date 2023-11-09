import axios from 'axios';
import { AuthorModel, PlainBookModel, GenreModel } from '@/models';

type CreateBookProvider = {
  author: AuthorModel;
  book: PlainBookModel;
  // genre: GenreModel;
};

export const createNewBook = async (
  book: PlainBookModel,
): Promise<CreateBookProvider> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      author: book.author,
      name: book.name,
      writtenOn: book.writtenOn,
      genre: book.genre,
    });

    window.location.href = '/books';

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};