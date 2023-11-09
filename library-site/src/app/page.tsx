'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { Navbar } from './layout';

const Home: FC = (): ReactElement => {
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
