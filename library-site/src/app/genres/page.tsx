'use client';

import React, { FC, useEffect } from 'react';
import { useGenresProviders } from '@/hooks';
import { Navbar } from '../layout';

const GenresPage: FC = () => {
  const { useListGenres } = useGenresProviders();
  const { genres, load } = useListGenres();

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Genres list';
  }, []);

  console.log('test', genres);

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center mt-7">
        <h1 className="text-5xl font-bold mb-10">Genres</h1>
      </div>

      <div className="flex justify-around flex-wrap ">
        {genres.map((genre) => (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-10">
            <div className="flex flex-col items-center pb-10">
              <p>{genre.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default GenresPage;
