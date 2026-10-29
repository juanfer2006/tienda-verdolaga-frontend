import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageItem = (page: number) => {
    const isCurrent = page === currentPage;
    const baseClasses =
      'px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors duration-150 border';
    const activeClasses = isCurrent
      ? 'bg-verdolaga-principal text-white border-verdolaga-principal shadow-sm'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-verdolaga-suave hover:text-verdolaga-oscuro';

    if (baseUrl) {
      const url = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${page}`;
      return (
        <Link
          key={page}
          href={url}
          className={`${baseClasses} ${activeClasses}`}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {page}
        </Link>
      );
    }

    return (
      <button
        key={page}
        type="button"
        onClick={() => onPageChange && onPageChange(page)}
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {page}
      </button>
    );
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginación de resultados">
      {/* Botón anterior */}
      {currentPage > 1 && (
        baseUrl ? (
          <Link
            href={`${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${currentPage - 1}`}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            ← Anterior
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            ← Anterior
          </button>
        )
      )}

      {/* Páginas numeradas */}
      <div className="flex items-center gap-1">
        {pages.map(renderPageItem)}
      </div>

      {/* Botón siguiente */}
      {currentPage < totalPages && (
        baseUrl ? (
          <Link
            href={`${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${currentPage + 1}`}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Siguiente →
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className="px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Siguiente →
          </button>
        )
      )}
    </nav>
  );
};
