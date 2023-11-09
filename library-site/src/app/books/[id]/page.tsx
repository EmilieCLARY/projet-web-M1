'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../layout';
import { useBookProviderById, deleteBookById } from '@/hooks';

const BookDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseBookById } = useBookProviderById();
  const { book, load: loadBook } = UseBookById();

  useEffect(() => {
    loadBook(id.toString());
  }, [loadBook]);

  useEffect(() => {
    document.title = `Books - ${book.name}`;
  }, [book.name]);

  function getListOfGenres(): string {
    return book.genres?.map((genre) => genre.name).join(', ');
  }

  const handleDelete = (): void => {
    if (window.confirm('Are you sure you want to delete this book ?')) {
      deleteBookById(id.toString());
    }
  };

  return (
    <main className="h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <h1 className="flex justify-around items-center text-sky-950 text-5xl font-bold my-6">
        Book Details
      </h1>
      <div className="flex justify-center">
        <div className="w-1/3 my-10 border border-gray-200 rounded-lg bg-sky-950 flex flex-col items-center my-2 flex-start">
          <img
            className="w-auto h-80 mt-10 rounded-2xl shadow-lg"
            alt=""
            src={book.author?.photoUrl}
          />
          <div className="flex justify-center text-2xl my-6 mx-auto text-white">
            {book.author?.firstName}
            {'\u00A0'}
            {book.author?.lastName}
          </div>
        </div>
        <div className="flex flex-col text-2xl ml-5 mt-4 text-sky-950">
          <h1 className="text-sky-950 text-3xl font-bold">{book.name}</h1>
          <br></br>
          <p>Genre : {getListOfGenres()}</p>
          <p>Edited date : {book.writtenOn}</p>
        </div>
      </div>
      <div className="text-white flex justify-around items-center my-6">
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
