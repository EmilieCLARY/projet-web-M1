'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../layout';
import {
  useBookProviderById,
  deleteBookById,
} from '@/hooks';

const BookDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseBookById } = useBookProviderById();
  const { book, load: loadBook } = UseBookById();

  useEffect(() => {
    loadBook(id.toString());
  }, [loadBook]);

  function getListOfGenres() {
    return book.genres?.map((genre) => genre.name).join(", ");
  }

  const handleDelete = () => {
    deleteBookById(id.toString());
  };


  return (
    <main className="bg-cyan-200">
      <Navbar />
      <h1 className="flex justify-center text-sky-950 text-6xl font-bold mt-5">
        Book Details
      </h1>

      {book.name}

      {book.author?.firstName}
      {book.author?.lastName}
      {book.author?.photoUrl}

      {book.writtenOn}
      {getListOfGenres()}

      <button onClick={handleDelete} type='button'>Delete</button>

    </main>
  );
};

export default BookDetailsPage;
