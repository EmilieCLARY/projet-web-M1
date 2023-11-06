'use client';

import { FC, useEffect } from 'react';
import { Navbar } from '../layout';

const UsersPage: FC = () => {
  useEffect(() => {
    document.title = 'Liste des utilisateurs';
  }, []);

  return (
    <main>
      <Navbar />
    </main>
  );
};

export default UsersPage;
