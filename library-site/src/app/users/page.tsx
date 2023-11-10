'use client';

import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { useUsersProviders } from '@/hooks';
import { Navbar } from '../layout';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { users, load: loadUsers } = useListUsers();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    document.title = 'Users List';
  }, []);

  return (
    <main>
      <Navbar />
      <div className="flex justify-around flex-wrap ">
        {users.map((user) => (
          <div className="w-full max-w-sm border border-gray-200 rounded-lg bg-sky-950 shadow dark:border-gray-700 m-10">
            <div className="flex flex-col items-center pb-10">
              <h5
                className="mb-1 text-xl font-medium text-gray-900 text-white"
                id="authorName"
              >
                <Link
                  href={`/users/${user.id}`}
                  className="hover:underline"
                >
                  {user.firstname}
                  {'\u00A0'}
                  {user.lastname}
                </Link>
              </h5>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UsersPage;
