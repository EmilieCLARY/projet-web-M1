'use client';

import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '../../layout';
import Modal from 'react-modal';
import Link from 'next/link';
import {
  useBooksProviders,
  deleteAuthorById,
  useAuthorProviderById,
  updateAuthorById,
} from '@/hooks';

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseAuthorById } = useAuthorProviderById();
  const { author, load: loadAuthor } = UseAuthorById();
  const { useListBooks } = useBooksProviders();
  const { books, load: loadBooks } = useListBooks();
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
      border: 'rounded',
    },
  };

  useEffect(() => {
    loadAuthor(id.toString());
    loadBooks();
  }, []);

  useEffect(() => {
    document.title = `Author - ${author.firstName} ${author.lastName}`;
  }, [author.firstName, author.lastName]);

  const handleDelete = () => {
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

  function GetNumberOfBooks(authorId: string): number {
    const numberOfBooks = books.filter(
      (book) => book.author.id === authorId,
    ).length;
    return numberOfBooks;
  }

  const filteredBooks = books.filter((book) => book.author.id === id);

  return (
    <body className="bg-cyan-200">
      <main className="bg-cyan-200">
        <Navbar />
        <div className="text-white flex justify-around items-center my-6">
          <h1 className="text-sky-950 text-5xl font-bold">Author Details</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
            onClick={() => console.log('edit')}
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
          <div className="flex flex-row justify-around">
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
                    <th className="border px-4 py-6">Book Name</th>
                    <th className="border px-4 py-6">Genre</th>
                    <th className="border px-4 py-6">Date Written</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="text-white">
                      <td className="border px-4 py-6">
                        <Link
                          href={`/books/${book.id}`}
                          className="hover:underline"
                        >
                          {book.name}
                        </Link>
                      </td>
                      <td className="border px-4 py-6">Zizi</td>
                      <td className="border px-4 py-6">
                        {book.writtenOn.toString()}
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
      </main>
    </body>
  );
};

export default AuthorDetailsPage;
