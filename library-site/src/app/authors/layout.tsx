import { Inter } from 'next/font/google';
import '../globals.css';
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
