'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { Navbar } from './layout';

const Home: FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 m-8 min-w-max max-w-xs border-2 border-sky-950">
          <h2 className="text-lg text-sky-950 text-center">Welcome to</h2>
          <h1 className="text-5xl font-bold text-sky-950">The Readers&apos; Oasis</h1>
        </div>
      </div>
    </main>
  );
};

export default Home;
