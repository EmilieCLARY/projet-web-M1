// Import axios for making HTTP requests and useState for state management
import axios from 'axios';
import { useState } from 'react';
// Import the GenreModel from the models
import { GenreModel } from '@/models';

// Define a type for the response of the useListGenres function
type UseListGenresProvider = {
  genres: GenreModel[];
  load: () => void;
};

// Define a function to fetch a list of genres
export const useListGenres = (): UseListGenresProvider => {
  // Initialize the genres state
  const [genres, setGenres] = useState<GenreModel[]>([]);

  // Define a function to fetch the genres
  const fetchGenres = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/genres`)
      .then((data) => setGenres(data.data))
      // Log the error to the console
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  };

  // Return the genres and the fetchGenres function
  return { genres, load: fetchGenres };
};

// Define a type for the genres providers
type GenreProviders = {
  useListGenres: () => UseListGenresProvider;
};

// Define a function to use the genres providers
export const useGenresProviders = (): GenreProviders => ({
  useListGenres,
});
