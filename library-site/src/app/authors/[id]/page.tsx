'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Modal from 'react-modal';
import Link from 'next/link';
import { Navbar } from '../../layout';
import {
  useBooksProviders,
  deleteAuthorById,
  useAuthorProviderById,
  updateAuthorById,
  deleteBookFromAuthorById,
  useGenresProviders,
} from '@/hooks';
import { useCreateNewBookFromAuthor } from '@/hooks/creators/bookCreator';
import { PlainAuthorModel } from '@/models';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseAuthorById } = useAuthorProviderById();
  const { author, load: loadAuthor } = UseAuthorById();
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();
  const { useListGenres } = useGenresProviders();
  const { genres, load: loadGenres } = useListGenres();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState('');
  const [writtenOn, setWrittenOn] = useState('');
  const [genre, setGenre] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgb(8 47 73)',
      border: 'rounded',
    },
  };

  useEffect(() => {
    loadAuthor(id.toString());
    loadBooks();
    loadGenres();
  }, []);

  useEffect(() => {
    document.title = `Author - ${author.firstName} ${author.lastName}`;
  }, [author.firstName, author.lastName]);

  const handleDelete = (): void => {
    if (
      window.confirm(
        'Are you sure you want to delete this author and all of his books ?',
      )
    ) {
      deleteAuthorById(id.toString());
    }
  };

  const handleEdit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await updateAuthorById(id.toString());
    setIsModalOpen(false);
  };

  function handleBookDelete(idBook: string): void {
    if (window.confirm('Are you sure you want to delete this book ?')) {
      deleteBookFromAuthorById(idBook, id.toString());
    }
  }

  function handleBookAdd(myAuthor: PlainAuthorModel): void {
    const newBook = {
      name,
      author: myAuthor,
      writtenOn,
      genres: [genre],
    };

    if (newBook.author && newBook.name && newBook.writtenOn && newBook.genres) {
      useCreateNewBookFromAuthor(newBook, id.toString());
    } else {
      alert('Please fill all the fields');
    }
    setIsModalOpen(false);
  }

  function GetNumberOfBooks(authorId: string): number {
    const numberOfBooks = books.filter(
      (book) => book.author.id === authorId,
    ).length;
    return numberOfBooks;
  }

  const requestSort = (key: string): void => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredBooks = [...books]
    .filter((book) => book.author.id === id)
    .sort((a, b) => {
      const key = sortConfig.key as keyof typeof a; // Add this line
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <main className="h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <div className="text-white flex justify-around items-center my-6">
        <h1 className="text-sky-950 text-5xl font-bold">Author Details</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={(): void => setIsAddModalOpen(true)}
        >
          Add a Book
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={(): void => console.log('edit')}
        >
          Edit author
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={(): void => setIsModalOpen(true)}
        >
          Delete author
        </button>
      </div>
      {author && (
        <div className="flex flex-row justify-around mt-10">
          <div className="w-1/3 my-10 border border-gray-200 rounded-lg bg-sky-950 flex flex-col items-center my-2 flex-start">
            <img
              className="w-auto h-72 mt-10 mb-6 rounded-2xl shadow-lg"
              alt=""
              src={author.photoUrl}
            />
            <div className="flex justify-center text-2xl my-6 mx-auto text-white">
              First name :{'\u00A0'}
              {author.firstName}
              {/* eslint-disable-next-line max-len */}
              {/* Désactivé car eslint demande quelque chose dans la balise br alors qu'elle sert juste à faire sauter une ligne */}
              {/* eslint-disable-next-line react/self-closing-comp */}
              <br></br>
              Last name :{'\u00A0'}
              {author.lastName}
              {/* eslint-disable-next-line react/self-closing-comp */}
              <br></br>
              Books written :{'\u00A0'}
              {GetNumberOfBooks(author.id)}
            </div>
          </div>
          <div className="mr-10 bg-cyan-500 rounded-xl">
            <table className="table-auto my-8">
              <thead>
                <tr>
                  <th
                    className="border px-4 py-6 hover:underline cursor-pointer"
                    onClick={(): void => requestSort('name')}
                  >
                    Book Name
                  </th>
                  <th
                    className="border px-4 py-6 hover:underline cursor-pointer"
                    onClick={(): void => requestSort('genre')}
                  >
                    Genre
                  </th>
                  <th
                    className="border px-4 py-6 hover:underline cursor-pointer"
                    onClick={(): void => requestSort('writtenOn')}
                  >
                    Date Written
                  </th>
                  <th className="border px-4 py-6">Remove Book</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="text-white text-center">
                    <td className="border px-4 py-6">
                      <Link
                        href={`/books/${book.id}`}
                        className="hover:underline"
                      >
                        {book.name}
                      </Link>
                    </td>
                    <td className="border px-4 py-6">{book.genres}</td>
                    <td className="border px-4 py-6">
                      {book.writtenOn.toString()}
                    </td>
                    <td className="border px-4 py-6">
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleBookDelete(book.id.toString())}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        onRequestClose={(): void => setIsModalOpen(false)}
        contentLabel="Modifier Auteur"
        style={customStyles}
      >
        <h1 className="flex justify-center text-lg mb-4 text-white text-2xl">
          Modify Author
        </h1>
        <hr className="mb-2" />
        <form onSubmit={handleEdit}>
          <label htmlFor="firstName" className="block mb-2 text-white">
            First Name
            <input
              id="firstName"
              type="text"
              placeholder={author.firstName}
              onFocus={(e): void => setFirstName(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <label htmlFor="lastName" className="block mb-2 text-white">
            Last Name
            <input
              type="text"
              placeholder={author.lastName}
              onFocus={(e): void => setLastName(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <label htmlFor="photoURL" className="block mb-2 text-white">
            Photo URL
            <input
              type="text"
              placeholder={author.photoUrl}
              onFocus={(e): void => setPhotoUrl(e.target.value)}
              className="mt-1 p-2 w-full border-sky-950 text-black rounded-lg"
            />
          </label>
          <div className="flex justify-between text-white">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Modify Author
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
      <Modal
        isOpen={isAddModalOpen}
        ariaHideApp={false}
        onRequestClose={(): void => setIsAddModalOpen(false)}
        contentLabel="Ajouter Livre"
        style={customStyles}
      >
        <h1 className="flex justify-center text-xl mb-4 text-white">
          Add a new Book
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleBookAdd(author);
          }}
        >
          <label htmlFor="author" className="block mb-2 text-white">
            Select Author
            <input
              type="text"
              readOnly
              placeholder="..."
              value={author.firstName + ' ' + author.lastName}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black bg-white rounded-lg"
            />
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
          <label htmlFor="genre" className="block mb-2 text-white">
            Select Genre
            <select
              value={genre}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg bg-white"
              onChange={(e): void => setGenre(e.target.value)}
            >
              {genres.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
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
              onClick={(): void => setIsAddModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default AuthorDetailsPage;
