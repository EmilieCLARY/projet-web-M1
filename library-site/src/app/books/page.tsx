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
      <main>
        <Navbar />
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-3xl font-bold mb-4">Books</h1>
        </div>
      </main>

      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </>
  );
};

export default BooksPage;
