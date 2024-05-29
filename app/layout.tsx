import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import './globals.css';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const inter = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TurboSeek.io',
  description: 'Get answers fast',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex flex-col justify-between min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
