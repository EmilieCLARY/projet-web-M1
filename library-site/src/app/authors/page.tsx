'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import React, { FC, useEffect, useState } from 'react';
import { useAuthorsProviders, useBooksProviders } from '@/hooks';
import { Navbar } from '../layout';
import { createNewAuthor } from '@/hooks/creators/authorCreator';

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, load: loadAuthor } = useListAuthors();
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgb(8 47 73)',
      border: 'round',
    },
  };

  const handleAddAuthor = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newAuthor = {
      id: (authors.length + 1).toString(),
      firstName,
      lastName,
      photoUrl,
    };

    await createNewAuthor(newAuthor);
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadBooks();
    loadAuthor();
  }, [loadBooks, loadAuthor]);

  useEffect(() => {
    document.title = 'Authors';
  }, []);

  function GetNumberOfBooks(authorId: string) {
    const numberOfBooks = books.filter(
      (book) => book.author.id === authorId).length;
    return numberOfBooks;
  }

  const filteredAuthors = authors
    .filter((author) =>
      `${author.firstName} ${author.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
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

  const toggleSort = (field: string): void => {
    setSortField(field);
    setSortDirection(
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc',
    );
  };

  return (
    <main className="bg-cyan-200">
      <Navbar />
      <div className="flex flex-col items-center mt-7">
        <h1 className="text-5xl font-bold mb-10 text-sky-950">Authors</h1>
      </div>
      <div className="flex justify-around items-center mb-4">
        <input
          className="text-black bg-white outline-none pl-4 pr-10 py-2 rounded-full mb-4"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e): void => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => setIsModalOpen(true)}
        >
          Add Authors
        </button>
      </div>
      <div className="flex justify-around items-center mb-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('lastName')}
        >
          Sort by Last Name
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('firstName')}
        >
          Sort by First Name
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('numberOfBooks')}
        >
          Sort by number of Books
        </button>
      </div>

      <div className="flex justify-around flex-wrap ">
        {filteredAuthors.map((author) => (
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg bg-sky-950 shadow dark:border-gray-700 m-10">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt=""
                src={author.photoUrl}
              />
              <h5
                className="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                id="authorName"
              >
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.firstName}
                  {'\u00A0'}
                  {author.lastName}
                </Link>
              </h5>
              <p id="numberBooks">{GetNumberOfBooks(author.id)}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={(): void => setIsModalOpen(false)}
        contentLabel="Ajouter Auteur"
        style={customStyles}
      >
        <h1 className="flex justify-center text-lg mb-4 text-white text-2xl">
          Add Authors
        </h1>
        <hr className="mb-2"></hr>
        <form onSubmit={handleAddAuthor}>
          <label htmlFor="firstName" className="block mb-2 text-white">
            First Name
            <input
              id="firstName"
              type="text"
              placeholder="..."
              value={firstName}
              onChange={(e): void => setFirstName(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <label htmlFor="lastName" className="block mb-2 text-white">
            Last Name
            <input
              type="text"
              placeholder="..."
              value={lastName}
              onChange={(e): void => setLastName(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <label htmlFor="photoURL" className="block mb-2 text-white">
            Photo URL
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={photoUrl}
              onChange={(e): void => setPhotoUrl(e.target.value)}
              className="mt-1 p-2 w-full border-sky-950 text-black rounded-lg"
            />
          </label>
          <div className="flex justify-between text-white">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Add Author
            </button>
            <button
              type="button"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              onClick={(): void => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default AuthorsPage;
