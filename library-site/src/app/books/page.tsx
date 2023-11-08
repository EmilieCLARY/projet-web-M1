'use client';

import { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import { Navbar } from '../layout';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load, [load]);

  useEffect(() => {
    document.title = 'Liste des livres';
  }, []);

  return (
    <>
      <main>
        <Navbar />
        <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-bold mb-4">Books</h1>
        </div>
{/*     <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light cursor-pointer"
              onClick={() => toggleSort('firstName')}
            >
              First Name
            </th>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light cursor-pointer"
              onClick={() => toggleSort('lastName')}
            >
              Last Name
            </th>
            <th
              className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              onClick={() => toggleSort('numberofbooks')}
            >
              Number of Books
            </th>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
              Photo URL
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAuthors.map((author) => (
            <tr className="hover:bg-grey-lighter" key={author.id}>
              <td className="py-4 px-6 border-b border-grey-light">
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.firstName}
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <Link
                  href={`/authors/${author.id}`}
                  className="hover:underline"
                >
                  {author.lastName}
                </Link>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <p>{numberofbooks(Number(author.id))}</p>
              </td>
              <td className="py-4 px-6 border-b border-grey-light">
                <img
                  src={author.photoUrl}
                  alt={`${author.firstName} ${author.lastName}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          */}
      </main>

      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
    </>
  );
};

export default BooksPage;
