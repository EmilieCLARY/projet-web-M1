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
        <>
          <div className="w-full max-w-sm border border-gray-200 rounded-lg bg-sky-950 shadow dark:border-gray-700 m-10">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg mt-2"
                alt=""
                src={author.photoUrl}
              />
              <h5
                className="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                id="authorName"
              >
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  Firstname :
                  {author.firstName}
                  {'\u00A0'}
                  {author.lastName}
                </Link>
              </h5>
              <p id="numberBooks">{GetNumberOfBooks(author.id)}</p>
            </div>
          </div>
          <button onClick={handleDelete} type='button'>Delete</button>
          <button onClick={() => console.log('edit')}>Edit</button>
          <table className="table-auto w-full">
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
                    {(book.writtenOn).toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default AuthorDetailsPage;
