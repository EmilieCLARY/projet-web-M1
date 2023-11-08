import axios from 'axios';
import { useState } from 'react';
import { GenreModel } from '@/models';

type UseListGenresProvider = {
  genres: GenreModel[];
  load: () => void;
};

export const useListGenres = (): UseListGenresProvider => {
  const [genres, setGenres] = useState<GenreModel[]>([]);

  const fetchGenres = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/genres`)
      .then((data) => setGenres(data.data))
      .catch((err) => console.error(err));
  };

  return { genres: genres, load: fetchGenres };
};

type GenreProviders = {
    useListGenres: () => UseListGenresProvider;
};

export const useGenresProviders = (): GenreProviders => ({
    useListGenres,
});
