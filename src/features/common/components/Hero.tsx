import React from 'react';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-verdolaga-oscuro via-verdolaga-principal to-verdolaga-oscuro text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center shadow-inner">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
          Pasión Verdolaga en cada producto
        </h1>
        <p className="text-base sm:text-xl text-emerald-100 max-w-2xl mx-auto mb-8 font-light">
          Descubre artículos temáticos y piezas de colección inspiradas en la historia, títulos y colores de Atlético Nacional.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="#productos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-verdolaga-oscuro font-bold text-base shadow-md hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200"
          >
            Ver productos
          </Link>
          <Link
            href="#categorias"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-bold text-base hover:bg-white/10 transition-all duration-200"
          >
            Explorar categorías
          </Link>
        </div>
      </div>
    </section>
  );
};
