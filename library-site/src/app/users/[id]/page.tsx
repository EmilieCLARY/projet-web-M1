'use client';

import React, { FC, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { deleteUserById, useUserProviderById } from '@/hooks';
import { Navbar } from '../../layout';

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const { UseUserById } = useUserProviderById();
  const { user, load: loadUser } = UseUserById();

  useEffect(() => {
    loadUser(id.toString());
  });

  useEffect(() => {
    document.title = 'Users List';
  }, []);

  const handleDelete = (): void => {
    // On laisse la confirmation de la suppression à l'utilisateur
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete this user ?')) {
      deleteUserById(id.toString());
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-200 to-blue-300">
      <Navbar />
      <div className="flex flex-col justify-center items-center border border-gray-200 rounded-lg bg-sky-950 w-1/3 mx-auto mt-72">
        <h5
          className="mb-1 text-xl font-medium text-gray-900 text-white pb-6 pt-4"
          id="authorName"
        >
          {user.firstname}
          {'\u00A0'}
          {user.lastname}
        </h5>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
          type="button"
          onClick={handleDelete}
        >
          Delete user
        </button>
      </div>
    </main>
  );
};

export default UserDetailsPage;
