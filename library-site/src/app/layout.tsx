import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import * as React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export const Navbar: React.FC = () => (
  <div className="menu">
    <div className="menu-row" id="menu-row">
      <a href="/" className="button-row">
        Home
      </a>
      <a href="/authors" className="button-n">
        Authors
      </a>
      <a href="/books" className="button-row">
        Books
      </a>
      <a href="/users" className="button-row">
        Users
      </a>
    </div>
  </div>
);
