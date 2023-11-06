'use client';

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useBooksProviders } from '@/hooks';

interface AuthorModel {
  id: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
}

interface BookModel {
  id: number;
  name: string;
  author: AuthorModel;
  writtenOn: Date;
}

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<AuthorModel>();
  const [booksByAuthor, setBooksByAuthor] = useState<BookModel[]>([]);
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    const filteredBooks = books.filter((book) => book.author.id === id);
    setBooksByAuthor(filteredBooks);
  }, [books, id]);

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
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Book Name</th>
                <th className="px-4 py-2">Author Name</th>
                <th className="px-4 py-2">Date Written</th>
              </tr>
            </thead>
            <tbody>
              {booksByAuthor.map((book) => (
                <tr key={book.id} className="bg-gray-100">
                  <td className="border px-4 py-2">{book.name}</td>
                  <td className="border px-4 py-2">{`${author.firstName} ${author.lastName}`}</td>
                  <td className="border px-4 py-2">{book.writtenOn}</td>
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
