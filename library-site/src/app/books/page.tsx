'use client';

import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import { Navbar } from '../layout';
import { useParams } from 'next/navigation';
import {
  useBooksProviders,
  useAuthorsProviders,
  useGenresProviders,
} from '@/hooks';
import { useCreateNewBook } from '@/hooks/creators/bookCreator';
import { AuthorModel, GenreModel } from '@/models';

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
  const [genre, setGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

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

  const handleAddBook = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newBook = {
      name,
      author: author as unknown as AuthorModel,
      writtenOn,
      genres:[genre],
      // genre: genre as unknown as PlainGenreModel,
    };

    useCreateNewBook(newBook);
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadBooks();
    loadAuthor();
    loadGenres();
  }, [loadBooks, loadAuthor, loadGenres]);

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
          comparison = new Date(a.writtenOn).getTime() - new Date(b.writtenOn).getTime();
          break;
        default:
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    })
    .filter(
      (book) => book.name.toLowerCase().includes(searchTerm.toLowerCase())
        || `${book.author.firstName} ${book.author.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    );

  return (
    <main className="bg-cyan-200 bg-cover">
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
      </div>
      <div className="flex flex-wrap justify-around items-center">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex flex-col justify-around items-center bg-white rounded-lg shadow-lg p-6 m-8 min-w-max max-w-xs min-h-max border-2 border-sky-950"
          >
            <Link href={`/books/${book.id}`}>
              <p className="text-2xl font-bold text-sky-950">{book.name}</p>
            </Link>
            <p className="text-lg text-sky-950">
              {book.author.firstName}
              {'\u00A0'}
              {book.author.lastName}
            </p>
            <p className="text-lg text-sky-950">{book.writtenOn}</p>
            <p className="text-lg text-sky-950">{book.genre}</p>
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
        <h1 className="flex justify-center text-lg mb-4">Add Books</h1>
        <form onSubmit={handleAddBook}>
          <label htmlFor="author" className="block mb-2">
            Select Author
            <select
              value={author}
              className="text-black mx-10"
              onChange={(e): void => setAuthor(e.target.value)}
            >
              {authors.map(item => {
                return (<option key={item.id} value={item.id}>{item.firstName} - {item.lastName}</option>);
              })}
          </select>
          </label>
          <label htmlFor="name" className="block mb-2">
            Book Name
            <input
              type="text"
              value={name}
              placeholder="Write a name..."
              onChange={(e): void => setName(e.target.value)}
              className="mt-1 p-2 w-2/3"
            />
          </label>
          <label htmlFor="writtenOn" className="block mb-2">
            Written On
            <input
              type="text"
              value={writtenOn}
              placeholder="Write a year..."
              onChange={(e): void => setWrittenOn(e.target.value)}
              className="mt-1 p-2 w-2/3"
            />
          </label>
          <label htmlFor="genre" className="block mb-2">
            Select Genre 
            <select
              value={genre}
              className="text-black mx-10"
              onChange={(e): void =>
              setGenre(e.target.value)}>
              {genres.map(item => {
                  return (<option key={item.id} value={item.name}>{item.name}</option>);
              })}
            </select>
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Add Book
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

export default BooksPage;
