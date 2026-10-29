import React from 'react';
import Image from 'next/image';
import { Producto } from '../domain/Producto';
import { Button } from '../../common/components/Button';

interface ProductCardProps {
  producto: Producto;
  onPedir?: (producto: Producto) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ producto, onPedir }) => {
  const precioFormateado = `$${producto.precio.toLocaleString('es-CO')}`;

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-verdolaga-suave hover:shadow-verdolaga-elevada hover:-translate-y-1 transition-all duration-200 text-left">
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-verdolaga-suave text-verdolaga-oscuro shadow-xs">
          {producto.categoria}
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-verdolaga-principal transition-colors line-clamp-1">
            {producto.nombre}
          </h3>
          <span className="shrink-0 text-sm font-extrabold text-verdolaga-principal bg-verdolaga-suave/80 px-2.5 py-0.5 rounded-full">
            {precioFormateado}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
          {producto.descripcion}
        </p>

        {onPedir && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onPedir(producto)}
            className="w-full mt-auto"
          >
            Hacer pedido
          </Button>
        )}
      </div>
    </article>
  );
};
