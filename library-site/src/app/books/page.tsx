'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import { Navbar } from '../layout';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <>
      <ul>
        <li>Home</li>
        <li>Books</li>
      </ul>
      <main>
        <Navbar />
      </main>

      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </>
  );
};

export default BooksPage;
