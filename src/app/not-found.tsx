import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-4 font-extrabold text-verdolaga-principal">404</span>
      <h1 className="text-2xl sm:text-3xl font-bold text-verdolaga-oscuro mb-2">
        Página no encontrada
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        La sección que estás buscando no existe o fue movida de lugar dentro de Tienda Verdolaga.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-verdolaga-principal text-white font-semibold rounded-lg shadow-sm hover:bg-verdolaga-oscuro transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
