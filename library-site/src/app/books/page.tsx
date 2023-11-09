'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import { Navbar } from '../layout';
import { useParams } from 'next/navigation';
import React, { FC, useState, useEffect } from 'react';
import {
  useBooksProviders,
  useAuthorsProviders,
  useGenresProviders
} from '@/hooks';
import { createNewBook } from '@/hooks/creators/bookCreator';
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handleAddBook = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newBook = {
      id: (books.length + 1).toString(),
      name,
      author: author as unknown as AuthorModel,
      writtenOn,
      genre,
      // genre: genre as unknown as PlainGenreModel,
    };

    await createNewBook(newBook);
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

  return (
    <>
      <main className="bg-cyan-200">
        <Navbar />
        <div className="flex flex-col items-center mt-7">
          <h1 className="text-5xl font-bold mb-10 text-sky-950">Books</h1>
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => setIsModalOpen(true)}
        >
          Add Books
        </button>
      </main>
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={(): void => setIsModalOpen(false)}
        contentLabel="Ajouter Auteur"
        style={customStyles}
      >
        <h1 className="flex justify-center text-lg mb-4">Add Books</h1>
        <form onSubmit={handleAddBook}>
          <label htmlFor="author" className="block mb-2">
            Select Author 
            <select value={author} onChange={(e): void => setAuthor(e.target.value)}>
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
              onChange={(e): void => setName(e.target.value)}
              className="mt-1 p-2 w-full"
            />
          </label>
          <label htmlFor="writtenOn" className="block mb-2">
            Written On
            <input
              type="text"
              value={writtenOn}
              onChange={(e): void => setWrittenOn(e.target.value)}
              className="mt-1 p-2 w-full"
            />
          </label>
          <label htmlFor="genre" className="block mb-2">
            Select Author 
            <select value={genre} onChange={(e): void => setGenre(e.target.value)}>
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

    </>
  );
};

export default BooksPage;
