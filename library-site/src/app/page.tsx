'use client';

import { FC, ReactElement, useEffect, useState } from 'react';
import './globals.css';
import { Navbar } from './layout';
import { useBooksProviders } from '@/hooks';
import { PlainBookModel } from '@/models';

const Home: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();

  const [randomBook, setRandomBook] = useState<PlainBookModel | null>(null);

  useEffect(() => {
    loadBooks();
    setTimeout(() => {
      loadBooks();
    }, 90000);
  }, [loadBooks]);

  useEffect(() => {
    if (books.length > 0) {
      setRandomBook(books[Math.floor(Math.random() * books.length)]);
    
      const interval = setInterval(() => {
      if (books.length > 0) {
        setRandomBook(books[Math.floor(Math.random() * books.length)]);
      }
    }, 500000);
    }
  }, [books]);

  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main className="bg-cyan-200">
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center">
        <h2 className="text-lg text-sky-950">Welcome to</h2>
        <h1 className="text-5xl font-bold text-sky-950">The Readers Oasis</h1>

      </div>
    </main>
  );
};

export default Home;
