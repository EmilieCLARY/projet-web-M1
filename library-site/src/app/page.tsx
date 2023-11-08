'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { Navbar } from './layout';

const Home: FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center items-center">
        <p className="text-lg">Welcome in your</p>
        <p className="text-4xl font-bold">BiblioTech</p>
      </div>
    </main>
  );
};

export default Home;
