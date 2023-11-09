'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../layout';
import Link from 'next/link';
import {
  useBooksProviders,
  deleteAuthorById,
  useAuthorProviderById
} from '@/hooks';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseAuthorById } = useAuthorProviderById();
  const { author, load: loadAuthor } = UseAuthorById();
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();

  useEffect(() => {
    loadAuthor(id.toString());
    loadBooks();
  }, [loadAuthor, loadBooks]);

  useEffect(() => {
    document.title = `Author - ${author.firstName} ${author.lastName}`;
  }, [author.firstName, author.lastName]);

  const handleDelete = () => {
    deleteAuthorById(id.toString());
  };

  function GetNumberOfBooks(authorId: string): number {
    const numberOfBooks = books.filter(
      (book) => book.author.id === authorId,
    ).length;
    return numberOfBooks;
  }

  const filteredBooks = books.filter((book) => book.author.id === id);

  return (
    <main className="bg-cyan-200">
      <Navbar />
      <h1 className="flex justify-center text-sky-950 text-6xl font-bold mt-5">
        Author Details
      </h1>
      {author && (
        <div className="flex">
          <div className="w-2/5 mx-auto my-10 border border-gray-200 rounded-lg bg-sky-950 ">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-auto h-72 mt-10 mb-6 rounded-2xl shadow-lg"
                alt=""
                src={author.photoUrl}
              />
              <div className="flex items-center text-2xl my-4 mx-auto text-white">
                First name :{'\u00A0'}
                {author.firstName}
                {/* eslint-disable-next-line max-len */}
                {/* Désactivé car eslint demande quelque chose dans la balise br alors qu'elle sert juste à faire sauter une ligne */}
                {/* eslint-disable-next-line react/self-closing-comp */}
                <br></br>
                Last name :{'\u00A0'}
                {author.lastName}
                {/* eslint-disable-next-line react/self-closing-comp */}
                <br></br>
                Books written :{'\u00A0'}
                {GetNumberOfBooks(author.id)}
              </div>
              <div className="flex justify-around">
                <button type="button" onClick={handleDelete}>
                  Delete author
                </button>
                <button type="button" onClick={() => console.log('edit')}>
                  Edit author
                </button>
              </div>
            </div>
          </div>
          <table className="table-auto w-full my-8">
            <thead>
              <tr>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Author Name</th>
                <th className="px-4 py-2">Date Written</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="bg-gray-100">
                  <td className="border px-4 py-2">{book.name}</td>
                  <td className="border px-4 py-2">{`${author.firstName} ${author.lastName}`}</td>
                  <td className="border px-4 py-2">
                    {book.writtenOn.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AuthorDetailsPage;
