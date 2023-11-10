'use client';

import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import {
  useBooksProviders,
  useAuthorsProviders,
  useGenresProviders,
} from '@/hooks';
import { useCreateNewBook } from '@/hooks/creators/bookCreator';
import { AuthorModel } from '@/models';
import { Navbar } from '../layout';

const BooksPage: FC = () => {
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();
  const { useListAuthors } = useAuthorsProviders();
  const { authors, load: loadAuthor } = useListAuthors();
  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [writtenOn, setWrittenOn] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState('');

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
      width: '33.33%',
    },
  };

  const handleAddBook = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newBook = {
      name,
      author: author as unknown as AuthorModel,
      writtenOn,
      genres: genre as unknown as string[],
      // genre: genre as unknown as PlainGenreModel,
    };
    if (newBook.author) {
      // Erreur insolvable
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCreateNewBook(newBook);
    } else {
      // On laisse l'alert box d'erreur de sélection d'auteur
      // eslint-disable-next-line no-alert
      alert('Please select an author');
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadBooks();
    loadAuthor();
    loadGenres();
  });

  useEffect(() => {
    document.title = 'Books';
  }, []);

  const toggleSort = (key: string): void => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredBooks = books
    .sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'lastName':
          comparison = a.author.lastName.localeCompare(b.author.lastName);
          break;
        case 'firstName':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'numberOfBooks':
          // Même problème de demande de retour à la ligne, puis interdiction
          // eslint-disable-next-line operator-linebreak
          comparison =
            new Date(a.writtenOn).getTime() - new Date(b.writtenOn).getTime();
          break;
        default:
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    })
    .filter(
      // Même problème de demande de retour à la ligne, puis interdiction
      // eslint-disable-next-line prettier/prettier, operator-linebreak
      (book) => (selectedGenre === '' || book.genres.includes(selectedGenre)) &&
        // eslint-disable-next-line operator-linebreak
        (book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${book.author.firstName} ${book.author.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <div className="flex flex-col items-center mt-7">
        <h1 className="text-5xl font-bold mb-10 text-sky-950">Books</h1>
      </div>
      <div className="flex justify-around items-center">
        <input
          className="text-black bg-white outline-none pl-4 pr-10 py-2 rounded-full mb-4"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e): void => setSearchTerm(e.target.value)}
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mb-4"
          onClick={(): void => setIsModalOpen(true)}
        >
          Add a Book
        </button>
      </div>
      <div className="flex justify-around items-center mb-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('lastName')}
        >
          Sort by Author
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('firstName')}
        >
          Sort by Book name
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => toggleSort('numberOfBooks')}
        >
          Sort by Date
        </button>
        <label htmlFor="genreFilter" className="block mb-2 text-white">
          <select
            id="genreFilter"
            value={selectedGenre}
            className="flex p-2 w-auto border-sky-950 text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-700"
            onChange={(e): void => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap justify-around items-center">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex flex-col justify-around items-center bg-white rounded-lg shadow-lg p-6 m-8 min-w-max max-w-xs min-h-max border-2 border-sky-950"
          >
            <Link href={`/books/${book.id}`}>
              <p className="text-2xl font-bold text-sky-950 hover:underline">
                {book.name}
              </p>
            </Link>
            <Link
              href={`/authors/${book.author.id}`}
              className="hover:underline"
            >
              <p className="text-lg text-sky-950 hover:underline">
                {book.author.firstName}
                {'\u00A0'}
                {book.author.lastName}
              </p>
            </Link>
            <p className="text-lg text-sky-950">{book.writtenOn}</p>
            <p className="text-lg text-sky-950">{book.genres}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        onRequestClose={(): void => setIsModalOpen(false)}
        contentLabel="Ajouter Livre"
        style={customStyles}
      >
        <h1 className="flex justify-center text-xl mb-4 text-white">
          Add a new Book
        </h1>
        <form onSubmit={handleAddBook}>
          <label htmlFor="author" className="block mb-2 text-white">
            Select Author
            <select
              value={author}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black bg-white rounded-lg"
              onChange={(e): void => setAuthor(e.target.value)}
            >
              {authors.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.firstName}
                  {'\u00A0'}
                  {item.lastName}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="name" className="block mb-2 text-white">
            Book Name
            <input
              type="text"
              placeholder="..."
              value={name}
              onChange={(e): void => setName(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black bg-white rounded-lg"
            />
          </label>
          <label htmlFor="writtenOn" className="block mb-2 text-white">
            Written On
            <input
              type="text"
              placeholder="YYYY"
              value={writtenOn}
              onChange={(e): void => setWrittenOn(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black bg-white rounded-lg"
            />
          </label>
          <label htmlFor="genre" className="block mb-2 text-white mt-6">
            Select Genres
            <div className="flex flex-wrap justify-around items-center">
              {genres.map((item) => (
                <label
                  htmlFor="selectGenres"
                  key={item.id}
                  className="inline-flex items-center mt-3"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-white"
                    value={item.name}
                    onChange={(e): void => {
                      if (e.target.checked) {
                        setGenre((prev) => [...prev, e.target.value]);
                      } else {
                        // Même problème de demande de retour à la ligne, puis interdiction
                        // eslint-disable-next-line prettier/prettier
                        setGenre((prev) => prev.filter((genre2) => genre2 !== e.target.value));
                      }
                    }}
                  />
                  <span className="ml-2 mr-10 text-white">{item.name}</span>
                </label>
              ))}
            </div>
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              onClick={(): void => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Add Book
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default BooksPage;
