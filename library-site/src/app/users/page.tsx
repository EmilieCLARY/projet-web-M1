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

  return (
    <main className="h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <h1 className="flex justify-around items-center text-sky-950 text-5xl font-bold my-6">
        Readers&apos; List
      </h1>
      <div className="flex justify-around">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={(): void => setIsModalOpen(true)}
        >
          Add a new Reader
        </button>
      </div>
      <div className="flex justify-around flex-wrap ">
        {users.map((user) => (
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
