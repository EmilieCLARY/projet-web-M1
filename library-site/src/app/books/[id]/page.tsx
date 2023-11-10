'use client';

import React, { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from '@mui/material/Link';
import { useBookProviderById, deleteBookById } from '@/hooks';
import { Navbar } from '../../layout';

const BookDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseBookById } = useBookProviderById();
  const { book, load: loadBook } = UseBookById();

  useEffect(() => {
    loadBook(id.toString());
  });

  useEffect(() => {
    document.title = `Books - ${book.name}`;
  }, [book.name]);

  function getListOfGenres(): string {
    // Erreur impossible à résoudre (cela empêche la récupération du nom des genres)
    return book.genres?.map((genre) => genre.name).join(', ');
  }

  const handleDelete = (): void => {
    // On utilise une fenêtre de confirmation pour éviter les suppressions accidentelles
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this book ?')) {
      deleteBookById(id.toString());
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <h1 className="flex justify-around items-center text-sky-950 text-5xl font-bold my-6">
        Book Details
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-1/3 my-10 border border-gray-200 rounded-lg bg-sky-950 flex flex-col items-center my-2 flex-start">
          {/* Warning insolvable (image pourtant nécessaire pour l'auteur) */}
          <img
            className="w-auto h-80 mt-10 rounded-2xl shadow-lg"
            alt=""
            src={book.author?.photoUrl}
          />
          <div className="flex justify-center text-2xl my-6 mx-auto text-white">
            <Link
              underline="hover"
              color="white"
              href={`/authors/${book.author?.id}`}
            >
              {book.author?.firstName}
              {'\u00A0'}
              {book.author?.lastName}
            </Link>
          </div>
        </div>
        <div className="flex flex-col text-2xl ml-8 text-sky-950 items-center">
          <h1 className="text-sky-950 text-3xl font-bold">{book.name}</h1>
          <br />
          {/* Même problème de retour à la ligne */}
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <p>Genre : {getListOfGenres()}</p>
          {/* Même problème de retour à la ligne */}
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          <p>Edited date : {book.writtenOn}</p>
        </div>
      </div>
      <div className="text-white flex justify-around items-center my-6 mb-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={handleDelete}
        >
          Delete book
        </button>
      </div>
    </main>
  );
};

export default BookDetailsPage;
