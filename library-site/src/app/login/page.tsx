'use client';

import React, { FC, useEffect, useState } from 'react';
import { useUsersProviders, createNewUser } from '@/hooks';
import { PlainUserModel } from '@/models';

const LoginPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { users, load: loadUsers } = useListUsers();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  function checkUser(userToTest: PlainUserModel): void {
    const isFound = users.some(
      (user) =>
        // Erreur impossible à fix
        // eslint-disable-next-line  prettier/prettier, implicit-arrow-linebreak
        userToTest.firstname === user.firstname
        // eslint-disable-next-line prettier/prettier
        && userToTest.lastname === user.lastname,
    );

    if (isFound) {
      window.location.href = '/';
    } else if (userToTest.firstname === '' || userToTest.lastname === '') {
      // On garde l'alert pour que alerter l'utilisateur de remplir tous les champs
      // eslint-disable-next-line no-alert
      alert('Please fill all the fields');
    } else if (
      // On garde l'alert pour que l'utilisateur puisse vérifier ses informations
      // eslint-disable-next-line no-alert
      window.confirm(
        'Are you sure you want to create an account with these information ?',
      )
    ) {
      createNewUser(userToTest);
      window.location.href = '/';
    }
  }

  const handleLogin = (event: React.FormEvent): void => {
    event.preventDefault();
    const UserToTest = {
      id: (users.length + 1).toString(),
      firstname,
      lastname,
    };

    checkUser(UserToTest);
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-cyan-200 to-blue-300 h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
          <div className="bg-blue-500 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-4 md:p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </div>
          <form className="p-12 md:p-24" onSubmit={handleLogin}>
            <h1 className="text-sky-950 text-center text-2xl mb-4">
              Hello there, Reader !
            </h1>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
              </svg>
              <input
                type="text"
                id="firstname"
                placeholder="First Name"
                onChange={(e): void => setFirstname(e.target.value)}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full text-black"
              />
            </div>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
              </svg>
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                onChange={(e): void => setLastname(e.target.value)}
                className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 md:p-4 uppercase w-full rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
