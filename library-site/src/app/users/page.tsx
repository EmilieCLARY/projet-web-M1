'use client';

import Link from 'next/link';
import Modal from 'react-modal';
import React, { FC, useEffect, useState } from 'react';
import { useUsersProviders, createNewUser } from '@/hooks';
import { Navbar } from '../layout';
// import { currentUser } from '../login/page';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { users, load: loadUsers } = useListUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgb(8 47 73)',
    },
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    document.title = "Readers' List";
  }, []);

  const handleAddUser = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newUser = {
      id: (users.length + 1).toString(),
      firstname,
      lastname,
    };

    await createNewUser(newUser);
    setIsModalOpen(false);
  };

  const handleSortAndFilter = (key): void => {
    setSortKey(key);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setSearchTerm('');
  };

  const sortedAndFilteredUsers = users
    .filter(
      (user) =>
        // Même erreur de retour à la ligne
        // eslint-disable-next-line implicit-arrow-linebreak, operator-linebreak
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'firstname':
          comparison = a.firstname.localeCompare(b.firstname);
          break;
        case 'lastname':
          comparison = a.lastname.localeCompare(b.lastname);
          break;
        default:
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <h1 className="flex justify-around items-center text-sky-950 text-5xl font-bold my-6">
        Readers&apos; List
      </h1>
      <div className="flex justify-around">
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
          onClick={(): void => handleSortAndFilter('firstname')}
        >
          Sort by First Name
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mb-4"
          onClick={(): void => handleSortAndFilter('lastname')}
        >
          Sort by Last Name
        </button>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => setIsModalOpen(true)}
        >
          Add a new Reader
        </button>
      </div>
      <div className="flex justify-around flex-wrap ">
        {sortedAndFilteredUsers.map((user) => (
          <div className="w-full flex flex-col items-center py-5 max-w-sm border border-gray-200 rounded-lg bg-sky-950 m-10 hover:bg-blue-700">
            <h5
              className="mb-1 text-xl font-medium text-gray-900 text-white text-center"
              id="authorName"
            >
              <Link href={`/users/${user.id}`} className="hover:underline">
                {user.firstname}
                {'\u00A0'}
                {user.lastname}
              </Link>
            </h5>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={(): void => setIsModalOpen(false)}
        contentLabel="Ajouter Auteur"
        style={customStyles}
      >
        <h1 className="flex justify-center text-lg mb-4 text-black text-2xl">
          Add User
        </h1>
        <hr className="mb-2" />
        <form onSubmit={handleAddUser}>
          <label htmlFor="firstName" className="block mb-2 text-white">
            First Name
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e): void => setFirstname(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <label htmlFor="lastName" className="block mb-2 text-white">
            Last Name
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e): void => setLastname(e.target.value)}
              className="flex mt-1 p-2 w-2/3 border-sky-950 text-black rounded-lg"
            />
          </label>
          <div className="flex justify-between text-white">
            <button
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
            >
              Add User
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

export default UsersPage;
