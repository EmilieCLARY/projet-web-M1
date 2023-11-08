import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) => console.error(err));
  };

  return { authors, load: fetchAuthors };
};

type AuthorsProviders = {
  useListAuthors: () => UseListAuthorsProvider;
};

export const useAuthorsProviders = (): AuthorsProviders => ({
  useListAuthors,
});

/* ------------------------------ */

type UseAuthorProviderById = {
  author: PlainAuthorModel;
  load: (id: string) => void;
};

export const UseAuthorById = (): UseAuthorProviderById => {
  const [author, setAuthor] = useState<PlainAuthorModel>(
    {} as PlainAuthorModel,
  );

  const fetchAuthors = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => setAuthor(data.data))
      .catch((err) => console.error(err));
  };

  return { author, load: fetchAuthors };
};

type AuthorProviderById = {
  UseAuthorById: () => UseAuthorProviderById;
};

export const useAuthorProviderById = (): AuthorProviderById => ({
  UseAuthorById,
});
