import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/authContext';
import { Navbar } from '@/components/global-components';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                icon: '✅',
              },
              error: {
                icon: '❌',
              },
            }}
          />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
