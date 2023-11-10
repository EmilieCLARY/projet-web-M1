// Import axios for making HTTP requests and useState for state management
import axios from 'axios';
import { useState } from 'react';
// Import the PlainAuthorModel from the models
import { PlainAuthorModel } from '@/models';

// Define a type for the response of the useListAuthors function
type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  load: () => void;
};

// Define a function to fetch a list of authors
export const useListAuthors = (): UseListAuthorsProvider => {
  // Initialize the authors state
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  // Define a function to fetch the authors
  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      // On laisse le console.error pour pouvoir détecter une potentielle erreur
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the authors and the fetchAuthors function
  return { authors, load: fetchAuthors };
};

// Define a type for the authors providers
type AuthorsProviders = {
  useListAuthors: () => UseListAuthorsProvider;
};

// Define a function to use the authors providers
export const useAuthorsProviders = (): AuthorsProviders => ({
  useListAuthors,
});

/* ------------------------------ */

// Define a type for the response of the UseAuthorById function
type UseAuthorProviderById = {
  author: PlainAuthorModel;
  load: (id: string) => void;
};

// Define a function to fetch an author by ID
export const UseAuthorById = (): UseAuthorProviderById => {
  // Initialize the author state
  const [author, setAuthor] = useState<PlainAuthorModel>(
    {} as PlainAuthorModel,
  );

  // Define a function to fetch the author
  const fetchAuthors = (id: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((data) => setAuthor(data.data))
      // On laisse le console.error pour pouvoir détecter une potentielle erreur
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the author and the fetchAuthors function
  return { author, load: fetchAuthors };
};

// Define a type for the author provider by ID
type AuthorProviderById = {
  UseAuthorById: () => UseAuthorProviderById;
};

// Define a function to use the author provider by ID
export const useAuthorProviderById = (): AuthorProviderById => ({
  UseAuthorById,
});
