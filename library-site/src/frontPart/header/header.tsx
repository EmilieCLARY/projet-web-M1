import { FC, useState } from 'react';

const books = () => {
  window.location.href = '/books';
};

const authors = () => {
  window.location.href = '/authors';
};

export const Header: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-16">
      <div className="flex items-center justify-center h-full relative">
        <div className="absolute top-16 left-0 w-full bg-rose-project">
          <ul className="py-2 text-gray-project font-outfit font-semibold text-center text-white cursor-pointer">
            <li onClick={authors} className="px-4 py-2 hover:animate-bounce">
              Auteurs
            </li>
          </ul>
        </div>
        <span className="font-outfit text-gray-project font-semibold text-3xl w-full">
          <p className="text-center">OUAIS</p>
        </span>
      </div>
    </div>
  );
};
