'use client';

import { FC, ReactElement, useEffect } from 'react';
import './globals.css';
import { Navbar } from './layout';

const Home: FC = (): ReactElement => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home page
      <Navbar />
    </main>
  );
};

export default Home;
