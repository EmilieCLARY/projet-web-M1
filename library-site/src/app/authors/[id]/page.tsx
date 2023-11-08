'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

  const handleDelete = () => {
    deleteAuthorById(id.toString());
  };

  const filteredBooks = books.filter((book) => book.author.id === id);

  return (
    <>
      author details page:
      {author && (
        <>
          <p>
            Firstname: {author.firstName}
            Lastname: {author.lastName}
            Picture: <img src={author.photoUrl} alt="" />
          </p>
          <button onClick={handleDelete}>Delete</button>
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
    </>
  );
};

export default AuthorDetailsPage;
