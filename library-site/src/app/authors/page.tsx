'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import { AuthorController } from 'library-api/src/controllers/authors/author.controller';
import { FC, useEffect, useState } from 'react';
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
      <h1 className="text-2xl font-bold mb-4">Author</h1>
      <input
        className="flex-grow text-black bg-white outline-none px-4 py-2 rounded-full mb-4"
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

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light cursor-pointer"
              onClick={() => toggleSort('firstName')}
            >
              First Name
            </th>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light cursor-pointer"
              onClick={() => toggleSort('lastName')}
            >
              Last Name
            </th>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              onClick={() => toggleSort('numberofbooks')}
            >
              Number of Books
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Photo URL
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAuthors.map((author) => (
            <tr className="hover:bg-grey-lighter" key={author.id}>
              <td className="py-4 px-6 border-b border-grey-light">
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.firstName}
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.lastName}
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <p>{numberofbooks(Number(author.id))}</p>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <img
                  src={author.photoUrl}
                  alt={`${author.firstName} ${author.lastName}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
