import React from 'react';
import { Hero } from '@/features/common/components/Hero';
import { CategoriasSection } from '@/features/catalogo/components/CategoriasSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Sección Catálogo de Productos (UI Base) */}
      <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-verdolaga-oscuro">
            Productos Verdolagas
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Encuentra camisetas exclusivas, accesorios urbanos y coleccionables históricos.
          </p>
        </div>

        {/* Filtros visuales por categoría */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <Link
            href="/#productos"
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-verdolaga-principal text-white shadow-xs"
          >
            Todos
          </Link>
          <Link
            href="/#productos"
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border-2 border-verdolaga-principal text-verdolaga-oscuro bg-white hover:bg-verdolaga-suave transition-colors"
          >
            Camisetas
          </Link>
          <Link
            href="/#productos"
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border-2 border-verdolaga-principal text-verdolaga-oscuro bg-white hover:bg-verdolaga-suave transition-colors"
          >
            Accesorios
          </Link>
          <Link
            href="/#productos"
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border-2 border-verdolaga-principal text-verdolaga-oscuro bg-white hover:bg-verdolaga-suave transition-colors"
          >
            Coleccionables
          </Link>
        </div>

        {/* Placeholder mientras conectamos el hook en el Prompt 4 */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-verdolaga-suave text-center max-w-xl mx-auto">
          <p className="text-gray-700 text-sm font-medium">
            🌱 Frontend base estructurado con éxito. En el siguiente paso este contenedor consumirá dinámicamente tu API REST con paginación real de PostgreSQL.
          </p>
        </div>
      </section>

      <CategoriasSection />
    </>
  );
}
