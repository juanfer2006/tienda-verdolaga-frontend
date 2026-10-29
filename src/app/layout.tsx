import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { NavbarContainer } from '@/features/common/components/NavbarContainer';
import { Footer } from '@/features/common/components/Footer';

export const metadata: Metadata = {
  title: 'Tienda Verdolaga - Pasión y Coleccionismo',
  description:
    'Sitio web académico de artículos temáticos, recuerdos y coleccionables inspirados en Atlético Nacional.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-verdolaga-fondo text-gray-900 antialiased">
        <NavbarContainer />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
