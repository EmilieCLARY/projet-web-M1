'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import { AuthorController } from 'library-api/src/controllers/authors/author.controller';
import { FC, useEffect, useState } from 'react';
import { Card } from './layout';
import { useBooksProviders, useAuthorsProviders } from '@/hooks';
import { Navbar } from '../layout';

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

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, load } = useListAuthors();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [booksByAuthor, setBooksByAuthor] = useState<BookModel[]>([]);
  const { useListBooks } = useBooksProviders();
  const { books } = useListBooks();

  const handleAddAuthor = async (e) => {
    e.preventDefault();
    const newAuthor = {
      id: authors.length + 1,
      firstName,
      lastName,
      photoUrl,
    };
    await createAuthor(newAuthor);
    setIsModalOpen(false);
  };

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des auteurs';
  }, []);

  // eslint-disable-next-line max-len
  /* A FAIRE : AFFICHER LE NOMBRE DE LIVRES ECRIT PAR L'AUTEUR ('books' EST VIDE ICI IL FAUT LE CORRIGER) */
  function numberofbooks(ID: number): number {
    const booksByAuthorFiltered = books.filter((book) => {
      console.log('book.author.id:', book.author.id);
      return book.author.id === ID;
    });
    return booksByAuthorFiltered.length;
  }


  const filteredAuthors = authors
    .filter((author) => `${author.firstName} ${author.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortField === 'firstName') {
        return sortDirection === 'asc'
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName);
      }
      return sortDirection === 'asc'
        ? a.lastName.localeCompare(b.lastName)
        : b.lastName.localeCompare(a.lastName);
    });

  const toggleSort = (field) => {
    setSortField(field);
    setSortDirection(
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc',
    );
  };

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center mt-7">
        <h1 className="text-5xl font-bold mb-10">Page des Auteurs</h1>
      </div>
      <div className="flex justify-around items-center mb-4">
        <input
          className="text-black bg-white outline-none pl-4 pr-10 py-2 rounded-full mb-4"
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Author
        </button>
      </div>

      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" alt="" />
          <h5
            className="mb-1 text-xl font-medium text-gray-900 dark:text-white"
            id="authorName"
          >
            azertyui
          </h5>
          <p id="numberBooks"> </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Ajouter Auteur"
      >
        <h2 className="mb-4">Ajouter Auteur</h2>
        <form onSubmit={handleAddAuthor}>
          <label className="block mb-2">
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Photo URL
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1 p-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Author
          </button>
        </form>
      </Modal>
    </main>
  );
};

export default AuthorsPage;
