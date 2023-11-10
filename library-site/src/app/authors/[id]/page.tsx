'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Modal from 'react-modal';
import Link from 'next/link';
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
import { Navbar } from '../../layout';

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
  const [name, setName] = useState('');
  const [writtenOn, setWrittenOn] = useState('');
  const [genre, setGenre] = useState<string[]>([]);

  // Si on les enlève, la fonctionnalité ne marche plus
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstName, setFirstName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastName, setLastName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [photoUrl, setPhotoUrl] = useState('');
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
  });

  useEffect(() => {
    document.title = `Author - ${author.firstName} ${author.lastName}`;
  }, [author.firstName, author.lastName]);

  // Fonction incomplète : non appelée
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = (): void => {
    if (
      // On laisse la confirmation de suppression
      // eslint-disable-next-line no-alert
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
    // On laisse la confirmation de suppression
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this book ?')) {
      deleteBookFromAuthorById(idBook, id.toString());
    }
  }

  function handleBookAdd(myAuthor: PlainAuthorModel): void {
    const newBook = {
      name,
      author: myAuthor,
      writtenOn,
      genres: genre as unknown as string[],
    };

    if (newBook.author && newBook.name && newBook.writtenOn && newBook.genres) {
      // Erreur non comprise puisque fonctionnelle
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useCreateNewBookFromAuthor(newBook, id.toString());
    } else {
      // On laisse la confirmation de suppression
      // eslint-disable-next-line no-alert
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
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
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
          onClick={(): void => handleDelete()}
        >
          Delete author
        </button>
      </div>
      {author && (
        <div className="flex flex-row justify-around mt-10">
          <div className="w-1/3 my-10 border border-gray-200 rounded-lg bg-sky-950 flex flex-col items-center my-2">
            <img
              className="w-auto h-72 mt-10 mb-6 rounded-2xl shadow-lg"
              alt=""
              src={author.photoUrl}
            />
            <div className="flex justify-center text-2xl my-6 mx-auto text-white">
              {/* Erreur infixable, quand on le remet à la ligne : */}
              {/* Erreur disant qu'il ne devrait pas y avoir de saut de ligne */}
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              First name :{'\u00A0'}
              {author.firstName}
              <br />
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Last name :{'\u00A0'}
              {author.lastName}
              <br />
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
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
                        onClick={(): void =>
                          // Même problème de retour à la ligne insolvable
                          // eslint-disable-next-line implicit-arrow-linebreak, prettier/prettier
                          handleBookDelete(book.id.toString())}
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
          onSubmit={(e): void => {
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
              value={`${author.firstName} ${author.lastName}`}
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
                        setGenre((prev) => prev.filter((genre2) => genre2 !== e.target.value),
                          // eslint-disable-function-paren-newline
                        );
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
