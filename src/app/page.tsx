'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Hero } from '@/features/common/components/Hero';
import { CategoriasSection } from '@/features/catalogo/components/CategoriasSection';
import { ProductCard } from '@/features/catalogo/components/ProductCard';
import { Pagination } from '@/features/common/components/Pagination';
import { useProductos } from '@/features/catalogo/hooks/useProductos';
import { Producto } from '@/features/catalogo/domain/Producto';

const CATEGORIAS_FILTRO = [
  { id: 'camisetas', label: 'Camisetas' },
  { id: 'accesorios', label: 'Accesorios' },
  { id: 'coleccionables', label: 'Coleccionables' },
  { id: 'todos', label: 'Todos' },
];

function CatalogoContenido() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Leer estado de la URL (?page=1&categoria=camisetas)
  const categoriaActual = searchParams.get('categoria') || 'camisetas';
  const paginaActual = Number(searchParams.get('page')) || 1;

  // Consumir la API a través del hook useProductos
  const { productos, pagination, isLoading, error, recargar } = useProductos({
    page: paginaActual,
    limit: 9,
    categoria: categoriaActual,
  });

  const cambiarCategoria = (nuevaCat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('categoria', nuevaCat);
    params.set('page', '1');
    router.push(`/?${params.toString()}#productos`, { scroll: false });
  };

  const cambiarPagina = (nuevaPagina: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(nuevaPagina));
    router.push(`/?${params.toString()}#productos`, { scroll: false });
  };

  const handlePedir = (prod: Producto) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('tienda_verdolaga_token');
      if (!token) {
        router.push('/login?redirect=pedido');
        return;
      }
    }
    alert(`Has seleccionado: ${prod.nombre}. En el siguiente commit se procesa el pedido en la base de datos.`);
  };

  return (
    <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-verdolaga-oscuro">
          Productos Verdolagas
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Encuentra camisetas exclusivas, accesorios urbanos y coleccionables históricos.
        </p>
      </div>

      {/* Botones de Filtro por Categoría con URL sincronizada */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {CATEGORIAS_FILTRO.map((cat) => {
          const isActive = categoriaActual === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => cambiarCategoria(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-verdolaga-principal text-white shadow-md'
                  : 'bg-white text-verdolaga-oscuro border-2 border-verdolaga-principal hover:bg-verdolaga-suave'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* 1. Estado de CARGANDO */}
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-verdolaga-principal border-t-transparent mb-4"></div>
          <p className="text-sm font-medium text-gray-600">Cargando catálogo desde la API...</p>
        </div>
      )}

      {/* 2. Estado de ERROR */}
      {!isLoading && error && (
        <div className="max-w-lg mx-auto my-8 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
          <span className="text-3xl mb-2 block">⚠️</span>
          <h3 className="text-base font-bold text-red-800 mb-1">No se pudo cargar el catálogo</h3>
          <p className="text-xs sm:text-sm text-red-600 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => recargar()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* 3. Estado VACÍO */}
      {!isLoading && !error && productos.length === 0 && (
        <div className="max-w-md mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-xs text-center">
          <span className="text-4xl mb-3 block">📦</span>
          <h3 className="text-base font-bold text-gray-800 mb-1">No hay productos en esta categoría</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Actualmente no se encontraron artículos disponibles bajo el filtro seleccionado.
          </p>
          <button
            type="button"
            onClick={() => cambiarCategoria('todos')}
            className="px-4 py-2 bg-verdolaga-principal text-white rounded-lg text-xs font-semibold hover:bg-verdolaga-oscuro transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      )}

      {/* 4. Estado CON DATOS (Grid de tarjetas) */}
      {!isLoading && !error && productos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onPedir={handlePedir}
              />
            ))}
          </div>

          {/* Paginador sincronizado */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={cambiarPagina}
            />
          )}
        </>
      )}
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-verdolaga-principal border-t-transparent mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Cargando Tienda Verdolaga...</p>
          </div>
        }
      >
        <CatalogoContenido />
      </Suspense>
      <CategoriasSection />
    </>
  );
}
