/* eslint-disable prefer-destructuring */
// Destructuring is not working here (pageName and pageName2)
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { currentUser } from './login/page';

const inter = Inter({ subsets: ['latin'] });

function CustomSeparator(): ReactElement {
  let pageName = '';
  if (typeof window !== 'undefined') {
    pageName = window.location.pathname.split('/')[1];
  }

  let breadcrumbs = [];

  if (pageName === '') {
    pageName = 'Home';
    breadcrumbs = [
      <Link underline="hover" key="1" color="white" href="/">
        Home
      </Link>,
    ];
  } else {
    breadcrumbs = [
      <Link underline="hover" key="1" color="white" href="/">
        Home
      </Link>,
      <Link underline="hover" key="2" color="white" href={`/${pageName}`}>
        {pageName}
      </Link>,
    ];
  }
  let pageName2 = '';
  if (typeof window !== 'undefined') {
    pageName2 = window.location.pathname.split('/')[2];
  }
  if (pageName2 !== '' && pageName2 !== undefined) {
    breadcrumbs = [
      <Link underline="hover" key="1" color="white" href="/">
        Home
      </Link>,
      <Link underline="hover" key="2" color="white" href={`/${pageName}`}>
        {pageName}
      </Link>,
      <Link
        underline="hover"
        key="3"
        color="white"
        href={`/${pageName}/${pageName2}`}
      >
        {pageName2}
      </Link>,
    ];
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="/" aria-label="breadcrumb" color="white">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const Navbar: React.FC = () => (
  <nav className="z-10 top-0 sticky bg-sky-950">
    <div className="flex flex-wrap justify-between items-center p-4">
      <a href="/" className="flex items-center text-white text-2xl mx-5">
        The Readers&apos; Oasis
      </a>
      <a href="/" className="flex items-center text-white text-2xl mx-5">
        {/* Encore une erreur de retour à la ligne obligatoire puis interdit */}
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {currentUser.firstname} - {currentUser.lastname}
      </a>
      <CustomSeparator />
      <div
        className="hidden w-full md:block md:w-auto mx-10"
        id="navbar-default"
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-12 md:mt-0 md:border-0  bg-sky-950">
          <li>
            <a
              href="/"
              className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700   md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/books"
              className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700   md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Books
            </a>
          </li>
          <li>
            <a
              href="/authors"
              className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white   md:dark:hover:bg-transparent"
            >
              Authors
            </a>
          </li>
          <li>
            <a
              href="/genres"
              className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white   md:dark:hover:bg-transparent"
            >
              Genres
            </a>
          </li>
          <li>
            <a
              href="/users"
              className="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700   md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white   md:dark:hover:bg-transparent"
            >
              Users
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
